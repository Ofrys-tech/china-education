/**
 * Optional external link check. Not part of `verify`: university sites rate-limit
 * and fail transiently. Run before launch or on a schedule.
 */
import { readdir, readFile } from "node:fs/promises";
import path from "node:path";
import { parse } from "node-html-parser";

const dist = path.join(process.cwd(), "dist");
const timeoutMs = Number(process.env.LINK_TIMEOUT_MS ?? 8000);
const concurrency = Number(process.env.LINK_CONCURRENCY ?? 5);

async function walk(dir) {
  const entries = await readdir(dir, { withFileTypes: true });
  const files = [];
  for (const entry of entries) {
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) files.push(...(await walk(full)));
    else if (entry.isFile() && entry.name.endsWith(".html")) files.push(full);
  }
  return files;
}

const files = await walk(dist);
const links = new Map();
for (const file of files) {
  const root = parse(await readFile(file, "utf8"));
  for (const anchor of root.querySelectorAll("a[href]")) {
    const href = anchor.getAttribute("href") ?? "";
    if (!/^https?:\/\//i.test(href)) continue;
    if (!links.has(href)) links.set(href, new Set());
    links.get(href).add(path.relative(dist, file));
  }
}

const urls = [...links.keys()];
console.log(`Checking ${urls.length} external link(s)…`);

async function probe(url) {
  for (let attempt = 0; attempt < 2; attempt += 1) {
    const controller = new AbortController();
    const timer = setTimeout(() => controller.abort(), timeoutMs);
    try {
      const response = await fetch(url, {
        method: "GET",
        redirect: "follow",
        signal: controller.signal,
        headers: {
          "User-Agent": "ChinaPath link checker (+https://github.com/Ofrys-tech)",
          Range: "bytes=0-1024",
        },
      });
      await response.body?.cancel();
      return { url, status: response.status, ok: response.status < 400 };
    } catch (error) {
      if (attempt === 1) {
        return {
          url,
          status: 0,
          ok: false,
          reason: error.name === "AbortError" ? "timeout" : error.message,
        };
      }
    } finally {
      clearTimeout(timer);
    }
  }
  return { url, status: 0, ok: false, reason: "unreachable" };
}

const results = [];
let cursor = 0;
async function worker() {
  while (cursor < urls.length) {
    const url = urls[cursor++];
    results.push(await probe(url));
  }
}
await Promise.all(Array.from({ length: Math.min(concurrency, urls.length) }, worker));

const failed = results.filter((result) => !result.ok);
for (const result of failed) {
  console.error(`FAIL ${result.status || result.reason} ${result.url}`);
  console.error(`     linked from: ${[...(links.get(result.url) ?? [])].join(", ")}`);
}
const blocked = results.filter((result) => result.status === 403);
if (blocked.length) console.warn(`${blocked.length} link(s) returned 403; verify manually.`);

if (failed.length) {
  console.error(`\n${failed.length}/${results.length} external link(s) failed.`);
  process.exit(1);
}
console.log(`External links OK: ${results.length}.`);
