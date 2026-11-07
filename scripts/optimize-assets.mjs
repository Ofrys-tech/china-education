/**
 * Builds lightweight WebP previews for generated 4K PNGs so agents and humans
 * can inspect them without opening a 20–40 MB file. Full-resolution PNGs stay
 * untouched next to the manifest.
 */
import { mkdir, readFile } from "node:fs/promises";
import path from "node:path";
import sharp from "sharp";

const dir = path.join(process.cwd(), "src/assets/generated");
const previewDir = path.join(dir, "previews");
const manifest = JSON.parse(await readFile(path.join(dir, "manifest.json"), "utf8"));

await mkdir(previewDir, { recursive: true });

for (const asset of manifest.assets ?? []) {
  const source = path.join(dir, asset.file);
  const target = path.join(previewDir, `${asset.id}.webp`);
  await sharp(source)
    .resize({ width: 1024, withoutEnlargement: true })
    .webp({ quality: 82 })
    .toFile(target);
  console.log(`${asset.file} → previews/${asset.id}.webp`);
}
