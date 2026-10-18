import fs from "node:fs/promises";
import path from "node:path";
import sharp from "sharp";
import { portfolioCards } from "../src/data/portfolioCards.js";

// Originals live in public/portfolio; dist is disposable Vite build output.
const source = path.resolve("public/portfolio");
const output = path.resolve("public/frames");
await fs.mkdir(output, { recursive: true });
const files = (await fs.readdir(source))
  .filter((name) => /\.(jpe?g|png)$/i.test(name))
  .sort();
const images = [];
let before = 0;
let after = 0;
for (const [index, name] of files.entries()) {
  const input = path.join(source, name);
  const filename = `${String(index + 1).padStart(2, "0")}.webp`;
  const destination = path.join(output, filename);
  await sharp(input)
    .rotate()
    .resize({
      width: 1280,
      height: 1280,
      fit: "inside",
      withoutEnlargement: true,
    })
    .webp({ quality: 80, effort: 5 })
    .toFile(destination);
  await sharp(input)
    .rotate()
    .resize({
      width: 768,
      height: 768,
      fit: "inside",
      withoutEnlargement: true,
    })
    .webp({ quality: 78, effort: 5 })
    .toFile(path.join(output, `mobile-${filename}`));
  const card = portfolioCards.find(
    (item) => decodeURIComponent(item.imgSrc).split("/").pop() === name,
  );
  images.push({
    src: `/frames/${filename}`,
    mobile: `/frames/mobile-${filename}`,
    alt: card?.label ?? name.replace(/\.[^.]+$/, "").replace(/[_-]/g, " "),
  });
  before += (await fs.stat(input)).size;
  after += (await fs.stat(destination)).size;
}
await fs.writeFile(
  "src/data/framesImages.json",
  JSON.stringify(images, null, 2) + "\n",
);
console.log(
  `${images.length} images: ${(before / 1048576).toFixed(1)} MB → ${(after / 1048576).toFixed(1)} MB (${(100 - (after / before) * 100).toFixed(1)}% smaller)`,
);
