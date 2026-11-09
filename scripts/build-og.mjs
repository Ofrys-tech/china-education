import { mkdir, writeFile } from "node:fs/promises";
import sharp from "sharp";

const emblem = (size, x, y, opacity = 1) => `
  <g transform="translate(${x} ${y}) scale(${size / 64})" opacity="${opacity}">
    <ellipse cx="32" cy="32" rx="28" ry="10" transform="rotate(-27 32 32)" fill="none" stroke="#C8A45C" stroke-width="1.1" opacity=".55"/>
    <path d="M32 6.2 11.4 56.4h8.1l4.9-11.9h15.2l4.9 11.9h8.1L32 6.2Zm-5.2 31.1 5.2-12.6 5.2 12.6H26.8Z" fill="#C8A45C"/>
    <path d="M53.9 9.2c.5 2.9 1.8 4.2 4.7 4.7-2.9.5-4.2 1.8-4.7 4.7-.5-2.9-1.8-4.2-4.7-4.7 2.9-.5 4.2-1.8 4.7-4.7Z" fill="#E8D4A3"/>
  </g>`;

const og = `
<svg xmlns="http://www.w3.org/2000/svg" width="1200" height="630" viewBox="0 0 1200 630">
  <defs>
    <radialGradient id="glow" cx="80%" cy="35%" r="55%">
      <stop offset="0" stop-color="#C8A45C" stop-opacity=".22"/>
      <stop offset="1" stop-color="#C8A45C" stop-opacity="0"/>
    </radialGradient>
    <linearGradient id="line" x1="0" x2="1">
      <stop offset="0" stop-color="#C8A45C" stop-opacity=".7"/>
      <stop offset="1" stop-color="#C8A45C" stop-opacity="0"/>
    </linearGradient>
  </defs>
  <rect width="1200" height="630" fill="#0C0C0D"/>
  <rect width="1200" height="630" fill="url(#glow)"/>
  <g stroke="#FBF7EE" stroke-opacity=".045">
    ${Array.from({ length: 12 }, (_, i) => `<line x1="${i * 100}" y1="0" x2="${i * 100}" y2="630"/>`).join("")}
    ${Array.from({ length: 7 }, (_, i) => `<line x1="0" y1="${i * 100}" x2="1200" y2="${i * 100}"/>`).join("")}
  </g>
  ${emblem(430, 760, 96, 0.16)}
  <g transform="translate(96 96)">
    ${emblem(62, 0, 0, 1)}
    <text x="86" y="34" font-family="Georgia, serif" font-size="40" letter-spacing="9" fill="#FBF7EE">ADLAS</text>
    <text x="88" y="58" font-family="Arial, sans-serif" font-size="12" letter-spacing="9" fill="#C8A45C">S T U D Y</text>
  </g>
  <text x="96" y="308" font-family="Georgia, serif" font-size="74" fill="#FBF7EE">Education</text>
  <text x="96" y="392" font-family="Georgia, serif" font-size="74" fill="#C8A45C">without borders.</text>
  <line x1="96" y1="452" x2="700" y2="452" stroke="url(#line)"/>
  <text x="96" y="506" font-family="Arial, sans-serif" font-size="22" fill="#FBF7EE" fill-opacity=".66">Universities · Scholarships · Documents · Visa · Arrival</text>
  <text x="96" y="566" font-family="Arial, sans-serif" font-size="16" letter-spacing="4" fill="#C8A45C">ONE WORLD. ONE FAMILY. ONE ADLAS.</text>
  <text x="1104" y="566" text-anchor="end" font-family="Arial, sans-serif" font-size="16" letter-spacing="2" fill="#FBF7EE" fill-opacity=".42">ADLASSTUDY.COM</text>
</svg>`;

const icon = `
<svg xmlns="http://www.w3.org/2000/svg" width="180" height="180" viewBox="0 0 180 180">
  <rect width="180" height="180" rx="42" fill="#0C0C0D"/>
  <g transform="translate(22 22) scale(2.125)">
    <ellipse cx="32" cy="32" rx="28" ry="10" transform="rotate(-27 32 32)" fill="none" stroke="#C8A45C" stroke-width="1.1" opacity=".6"/>
    <path d="M32 6.2 11.4 56.4h8.1l4.9-11.9h15.2l4.9 11.9h8.1L32 6.2Zm-5.2 31.1 5.2-12.6 5.2 12.6H26.8Z" fill="#C8A45C"/>
    <path d="M53.9 9.2c.5 2.9 1.8 4.2 4.7 4.7-2.9.5-4.2 1.8-4.7 4.7-.5-2.9-1.8-4.2-4.7-4.7 2.9-.5 4.2-1.8 4.7-4.7Z" fill="#E8D4A3"/>
  </g>
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
