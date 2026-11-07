/**
 * Post-build structural checks. No browser, no network; runs in <1s.
 * Verifies titles, meta, headings, internal links, duplicate ids and stray placeholders.
 */
import { readdir, readFile, stat } from "node:fs/promises";
import path from "node:path";
import { parse } from "node-html-parser";

const dist = path.join(process.cwd(), "dist");
const rawBase = process.env.BASE_PATH ?? "/";
const base = rawBase === "/" ? "" : `/${rawBase.replace(/^\/+|\/+$/g, "")}`;

const errors = [];
const warnings = [];
let pages = 0;

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

function stripBase(url) {
  if (base && (url === base || url.startsWith(`${base}/`))) {
    return url.slice(base.length) || "/";
  }
  return url;
}

async function exists(file) {
  try {
    const info = await stat(file);
    return info.isFile();
  } catch {
    return false;
  }
}

async function resolveTarget(rawHref, fromFile) {
  const href = rawHref.split("#")[0].split("?")[0];
  if (!href || /^(https?:|mailto:|tel:|javascript:|data:|\/\/)/i.test(href)) return null;

  let pathname;
  try {
    pathname = decodeURIComponent(href);
  } catch {
    pathname = href;
  }

  if (pathname.startsWith("/")) {
    pathname = stripBase(pathname);
    const rel = pathname.replace(/^\/+/, "");
    return path.join(dist, rel);
  }

  return path.resolve(path.dirname(fromFile), pathname);
}

async function targetExists(target) {
  if (!target) return true;
  if (await exists(target)) return true;
  if (await exists(path.join(target, "index.html"))) return true;
  if (!path.extname(target) && (await exists(`${target}.html`))) return true;
  return false;
}

async function checkPage(file) {
  pages += 1;
  const rel = path.relative(dist, file).replaceAll(path.sep, "/");
  const html = await readFile(file, "utf8");
  const root = parse(html);
  const fail = (message) => errors.push(`${rel}: ${message}`);

  const lang = root.querySelector("html")?.getAttribute("lang");
  if (!lang) fail("missing <html lang>");

  const title = root.querySelector("title")?.textContent.trim() ?? "";
  if (!title) fail("missing <title>");
  if (title.length < 10) warnings.push(`${rel}: short <title> (${title.length})`);

  const description = root
    .querySelector('meta[name="description"]')
    ?.getAttribute("content")
    ?.trim();
  if (!description) fail("missing meta description");
  if (!root.querySelector('link[rel="canonical"]')) fail("missing canonical");

  const h1s = root.querySelectorAll("h1");
  if (h1s.length !== 1) fail(`expected exactly one <h1>, found ${h1s.length}`);

  const ids = new Map();
  for (const element of root.querySelectorAll("[id]")) {
    const id = element.getAttribute("id");
    if (!id) continue;
    ids.set(id, (ids.get(id) ?? 0) + 1);
  }
  for (const [id, count] of ids) {
    if (count > 1) fail(`duplicate id "${id}" (${count})`);
  }

  for (const link of root.querySelectorAll("a[href]")) {
    const href = link.getAttribute("href");
    if (!href) {
      fail("empty <a href>");
      continue;
    }
    if (href === "#") fail('placeholder href="#"');
    const target = await resolveTarget(href, file);
    if (target && !(await targetExists(target))) fail(`broken internal link: ${href}`);
  }

  for (const element of root.querySelectorAll("[src]")) {
    const src = element.getAttribute("src");
    const target = await resolveTarget(src ?? "", file);
    if (target && !(await targetExists(target))) fail(`missing asset: ${src}`);
  }

  for (const link of root.querySelectorAll("link[href]")) {
    const relType = link.getAttribute("rel") ?? "";
    if (!["stylesheet", "icon", "apple-touch-icon", "manifest", "preload"].includes(relType))
      continue;
    const href = link.getAttribute("href");
    const target = await resolveTarget(href ?? "", file);
    if (target && !(await targetExists(target))) fail(`missing linked asset: ${href}`);
  }

  for (const image of root.querySelectorAll("img")) {
    if (!image.getAttribute("alt")) fail(`<img> without alt: ${image.getAttribute("src")}`);
  }

  const bodyText = root.querySelector("body")?.textContent ?? "";
  for (const marker of ["TODO", "TBD", "[insert", "lorem ipsum", "undefined", "[object Object]"]) {
    if (bodyText.includes(marker)) fail(`visible placeholder text: "${marker}"`);
  }
}

try {
  const files = await walk(dist);
  if (!files.length) {
    console.error("dist is empty — run `npm run build` first.");
    process.exit(1);
  }

  for (const file of files) await checkPage(file);

  if (!(await exists(path.join(dist, "sitemap-index.xml")))) {
    warnings.push("sitemap-index.xml is missing");
  }

  for (const warning of warnings) console.warn(`warn  ${warning}`);
  for (const error of errors) console.error(`error ${error}`);

  if (errors.length) {
    console.error(`\n${errors.length} error(s) across ${files.length} page(s).`);
    process.exit(1);
  }

  console.log(`HTML checks passed: ${pages} page(s), base "${base || "/"}".`);
} catch (error) {
  console.error(error);
  process.exit(1);
}
