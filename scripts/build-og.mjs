import { mkdir, writeFile } from "node:fs/promises";
import sharp from "sharp";

const seal = (size, x, y) => `
	<g transform="translate(${x} ${y})">
		<rect width="${size}" height="${size}" rx="${size * 0.12}" fill="#B23A2E"/>
		<rect x="${size * 0.08}" y="${size * 0.08}" width="${size * 0.84}" height="${size * 0.84}"
			rx="${size * 0.08}" fill="none" stroke="#F7F3EB" stroke-opacity=".35"/>
		<text x="${size / 2}" y="${size * 0.72}" text-anchor="middle"
			font-family="Songti SC, Noto Serif CJK SC, serif" font-size="${size * 0.62}" fill="#F7F3EB">华</text>
	</g>`;

const og = `
<svg xmlns="http://www.w3.org/2000/svg" width="1200" height="630" viewBox="0 0 1200 630">
	<rect width="1200" height="630" fill="#F7F3EB"/>
	<g stroke="#191512" stroke-opacity=".1">
		${Array.from({ length: 12 }, (_, i) => `<line x1="${i * 100}" y1="0" x2="${i * 100}" y2="630"/>`).join("")}
		${Array.from({ length: 7 }, (_, i) => `<line x1="0" y1="${i * 100}" x2="1200" y2="${i * 100}"/>`).join("")}
	</g>
	<text x="850" y="470" font-family="Songti SC, Noto Serif CJK SC, serif" font-size="420" fill="#191512" opacity=".05">留</text>
	<circle cx="1080" cy="120" r="62" fill="none" stroke="#B23A2E" stroke-width="1"/>
	<text x="1080" y="132" text-anchor="middle" font-family="Songti SC, Noto Serif CJK SC, serif" font-size="46" fill="#B23A2E">留学</text>
	${seal(84, 96, 84)}
	<text x="200" y="146" font-family="Georgia, serif" font-size="40" fill="#191512">ChinaPath</text>
	<text x="96" y="300" font-family="Arial, sans-serif" font-size="76" font-weight="700" fill="#191512">Study in China</text>
	<text x="96" y="386" font-family="Arial, sans-serif" font-size="68" font-weight="700" fill="#B23A2E">without the guesswork.</text>
	<text x="98" y="462" font-family="Arial, sans-serif" font-size="25" fill="#6A6055">University matching · documents · scholarships · visa</text>
	<line x1="96" y1="518" x2="1104" y2="518" stroke="#191512" stroke-opacity=".2"/>
	<text x="96" y="566" font-family="Arial, sans-serif" font-size="19" letter-spacing="3" fill="#6A6055">CHINAPATH · STUDY IN CHINA · 2027 INTAKE</text>
	<text x="1104" y="566" text-anchor="end" font-family="Arial, sans-serif" font-size="19" letter-spacing="2" fill="#6A6055">华路</text>
</svg>`;

const icon = `
<svg xmlns="http://www.w3.org/2000/svg" width="180" height="180" viewBox="0 0 180 180">
	<rect width="180" height="180" rx="40" fill="#B23A2E"/>
	<rect x="16" y="16" width="148" height="148" rx="28" fill="none" stroke="#F7F3EB" stroke-opacity=".35"/>
	<text x="90" y="126" text-anchor="middle" font-family="Songti SC, Noto Serif CJK SC, serif" font-size="106" fill="#F7F3EB">华</text>
</svg>`;

await mkdir("public", { recursive: true });
await writeFile(
  "public/og-default.png",
  await sharp(Buffer.from(og)).png({ compressionLevel: 9 }).toBuffer(),
);
await writeFile(
  "public/apple-touch-icon.png",
  await sharp(Buffer.from(icon)).png({ compressionLevel: 9 }).toBuffer(),
);

console.log("Wrote public/og-default.png and public/apple-touch-icon.png");
