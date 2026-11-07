/**
 * Validates the generated-image manifest and the actual PNG bytes.
 * Agents must run this after adding an image: `npm run check:assets`.
 */
import { createHash } from "node:crypto";
import { readdir, readFile } from "node:fs/promises";
import path from "node:path";
import sharp from "sharp";

const dir = path.join(process.cwd(), "src/assets/generated");
const manifestPath = path.join(dir, "manifest.json");
const errors = [];
const warnings = [];

const manifest = JSON.parse(await readFile(manifestPath, "utf8"));
if (manifest.version !== 1) errors.push("manifest.version must be 1");
if (!Array.isArray(manifest.assets)) errors.push("manifest.assets must be an array");

const ids = new Set();
const files = new Set();
let checked = 0;

for (const asset of manifest.assets ?? []) {
  const label = asset.id ?? "(missing id)";
  const fail = (message) => errors.push(`${label}: ${message}`);

  if (!/^[a-z0-9][a-z0-9-]{1,63}$/.test(asset.id ?? "")) fail("id must be kebab-case");
  if (ids.has(asset.id)) fail("duplicate id");
  ids.add(asset.id);
  if (files.has(asset.file)) fail("duplicate file");
  files.add(asset.file);

  if (!["icon", "illustration", "texture", "photo", "logo"].includes(asset.kind)) {
    fail("kind must be icon | illustration | texture | photo | logo");
  }
  if (!asset.prompt || asset.prompt.length < 20) fail("prompt is missing or too short");
  if (!["gpt-image-2", "gpt-image-2.5-sunburst", "gpt-image-2.5-flare"].includes(asset.model)) {
    fail("model must be a supported image model");
  }
  if (!["low", "medium", "high", "xhigh", "max"].includes(asset.quality)) fail("invalid quality");
  if (!/^(auto|\d{3,4}x\d{3,4})$/.test(asset.size ?? "")) fail("size must be auto or WxH");
  if (!["transparent", "opaque", "auto"].includes(asset.background)) fail("invalid background");
  if (!asset.alt || asset.alt.length < 8) fail("alt text is missing or too short");
  if (!Array.isArray(asset.usage) || asset.usage.length === 0)
    fail("usage must name at least one place");
  if (!asset.createdAt || Number.isNaN(Date.parse(asset.createdAt)))
    fail("createdAt must be an ISO date");

  if (!asset.file || asset.file.includes("..") || path.isAbsolute(asset.file)) {
    fail("file must be a relative path inside src/assets/generated");
    continue;
  }

  const filePath = path.join(dir, asset.file);
  let metadata;
  let stats;
  try {
    metadata = await sharp(filePath).metadata();
    stats = await sharp(filePath).stats();
  } catch {
    fail(`file not found or unreadable: ${asset.file}`);
    continue;
  }

  checked += 1;
  if (metadata.format !== "png") fail("asset must be a PNG");
  if (asset.background === "transparent" && !metadata.hasAlpha) {
    fail("background=transparent but the PNG has no alpha channel");
  }
  if (asset.background === "transparent" && metadata.hasAlpha) {
    const alpha = stats.channels[3];
    if (alpha && alpha.min === 255)
      fail("alpha channel is fully opaque; background was not removed");
  }

  const minWidth = asset.kind === "icon" ? 512 : 1200;
  if ((metadata.width ?? 0) < minWidth)
    fail(`width ${metadata.width}px is below the ${minWidth}px floor`);

  const declared = /^(\d+)x(\d+)$/.exec(asset.size ?? "");
  if (declared) {
    const [, width, height] = declared.map(Number);
    if ((metadata.width ?? 0) < width * 0.5 || (metadata.height ?? 0) < height * 0.5) {
      warnings.push(
        `${label}: delivered ${metadata.width}x${metadata.height} for declared ${asset.size}`,
      );
    }
  }

  if (asset.sha256) {
    const hash = createHash("sha256")
      .update(await readFile(filePath))
      .digest("hex");
    if (hash !== asset.sha256) fail("sha256 mismatch (file changed outside the pipeline?)");
  }
}

try {
  const present = (await readdir(dir)).filter((name) => name.endsWith(".png"));
  for (const name of present) {
    if (!files.has(name)) warnings.push(`unreferenced PNG: ${name}`);
  }
} catch {
  // directory always exists in this repo
}

for (const warning of warnings) console.warn(`warn  ${warning}`);
for (const error of errors) console.error(`error ${error}`);

if (errors.length) {
  console.error(`\n${errors.length} asset error(s).`);
  process.exit(1);
}

console.log(`Asset manifest OK: ${manifest.assets.length} asset(s), ${checked} verified.`);
