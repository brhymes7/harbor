// Renders the PWA icon set from src/app/icon.svg. Run with `npm run icons` after changing the mark.
import { readFile } from "node:fs/promises";
import sharp from "sharp";

const svg = await readFile(new URL("../src/app/icon.svg", import.meta.url), "utf8");
// Maskable icons need a full-bleed background and the mark inside the central 80% safe zone.
const maskable = svg
  .replace('rx="112" ', "")
  .replace("<g ", '<g transform="translate(51.2 51.2) scale(0.8)" ');
const out = (path) => new URL(`../${path}`, import.meta.url).pathname;

const jobs = [
  [svg, 192, "public/icons/icon-192.png"],
  [svg, 512, "public/icons/icon-512.png"],
  [maskable, 192, "public/icons/maskable-192.png"],
  [maskable, 512, "public/icons/maskable-512.png"],
  [maskable, 180, "public/icons/apple-touch-icon.png"],
  [maskable, 180, "src/app/apple-icon.png"],
];

for (const [source, size, path] of jobs) {
  await sharp(Buffer.from(source)).resize(size, size).png().toFile(out(path));
}
console.log(`Wrote ${jobs.length} icons`);
