import { readFile, stat } from "node:fs/promises";
import assert from "node:assert/strict";
import sharp from "sharp";

const load = async (file) => JSON.parse(await readFile(file, "utf8"));
const designs = await load("src/data/designWorks.json");
const frames = await load("src/data/framesImages.json");
assert.equal(
  new Set(designs.map((image) => image.id)).size,
  designs.length,
  "Design IDs must be unique",
);
let checked = 0;
for (const image of designs) {
  assert(
    image.title && image.description && image.category,
    "Each work needs accessible metadata",
  );
  for (const src of [image.thumbnail, image.src, image.full]) {
    const file = `public${src}`;
    assert(
      (await stat(file)).size < 600000,
      `Oversized gallery asset: ${file}`,
    );
    const metadata = await sharp(file).metadata();
    assert(metadata.width > 0 && metadata.height > 0, `Invalid image: ${file}`);
    checked++;
  }
}
for (const image of frames) {
  for (const src of [image.src, image.mobile]) {
    const file = `public${src}`;
    const metadata = await sharp(file).metadata();
    const limit = src === image.mobile ? 768 : 1280;
    assert(
      Math.max(metadata.width, metadata.height) <= limit,
      `Texture exceeds GPU size budget: ${file}`,
    );
    checked++;
  }
}
for (const file of [
  "public/resume.pdf",
  "public/og-image.jpg",
  "public/ascii-art.txt",
])
  assert((await stat(file)).size > 0, `Missing ${file}`);
console.log(
  `Passed: ${checked} image assets, ${designs.length} design pieces, ${frames.length} photographs, and required public files.`,
);
