import fs from "node:fs/promises";
import path from "node:path";
import sharp from "sharp";

const works = [
  [
    "Free_L_Mockups_MacBook_Air.jpg",
    "Portfolio, in perspective",
    "Mockups",
    "A personal portfolio, framed in light and shadow.",
  ],
  [
    "iphone-left-angle-mockup.png",
    "Your next rep",
    "Mockups",
    "A fitness dashboard for workouts and everyday progress.",
  ],
  [
    "Screenshot 2026-06-15 115437.png",
    "Silver sulphide",
    "Interfaces",
    "An editorial exploration of material, type and contrast.",
  ],
  [
    "YOUR OWN PLACE POSTER  - 1.png",
    "Your own place",
    "Posters",
    "A cinematic study in identity and belonging.",
  ],
  [
    "scene_2026-10-18.png",
    "Places worth finding",
    "Mockups",
    "A travel interface, taken off the screen and into the scene.",
  ],
  [
    "iMockup - iPhone 15 Pro Max.png",
    "Welcome back",
    "Mockups",
    "A quiet, focused entry into a mobile experience.",
  ],
  [
    "Screenshot 2026-10-18 005126.png",
    "Dress without limits",
    "Interfaces",
    "An expressive storefront for a world in motion.",
  ],
  [
    "Penchant - 1.png",
    "Penchant",
    "Posters",
    "An editorial composition of stories, photography and type.",
  ],
  [
    "Screenshot 2026-10-19 002653.png",
    "SF, in hand",
    "Mockups",
    "A mobile experience placed in an everyday moment.",
  ],
  [
    "Home Page.png",
    "The connected drive",
    "Interfaces",
    "Navigation, music and vehicle controls in one dashboard.",
  ],
  [
    "image (1).png",
    "Orchid / Batman returns",
    "Posters",
    "A playful magazine cover with a cinematic twist.",
  ],
  [
    "College Page.png",
    "Campus, at a glance",
    "Interfaces",
    "A mobile dashboard for the rhythms of student life.",
  ],
  [
    "Mockuuups Free Isometric iPhone Air Mockup.jpeg",
    "SF / first impressions",
    "Mockups",
    "A warm, minimal welcome on mobile.",
  ],
  [
    "image.png",
    "Choose your drive",
    "Interfaces",
    "A colourful exploration of driving modes and interaction.",
  ],
  [
    "Graduation Invitation Final.png",
    "Commusvere",
    "Posters",
    "A graduation invitation in midnight blue and gold.",
  ],
  [
    "Screenshot 2026-06-08 012750.png",
    "Colour in motion",
    "Interfaces",
    "An earlier portfolio experiment in gradients and atmosphere.",
  ],
  [
    "Red & Yellow Modern Colorful Festive Diwali Celebration Invitation.png",
    "A festival of colour",
    "Posters",
    "A vibrant invitation celebrating Diwali.",
  ],
  [
    "Screenshot 2026-07-03 220504.png",
    "Glass, up close",
    "Interfaces",
    "An exploration of depth, translucency and a mobile lock screen.",
  ],
  [
    "Screenshot 2024-12-30 161226.png",
    "Make your moments matter",
    "Posters",
    "A bold social campaign built around everyday moments.",
  ],
];
await fs.mkdir("public/design", { recursive: true });
let originalBytes = 0,
  optimizedBytes = 0;
const manifest = [];
for (const [i, [file, title, category, description]] of works.entries()) {
  const input = path.join("New folder", file);
  const id = String(i + 1).padStart(2, "0");
  const variants = [];
  for (const width of [640, 1280, 2000]) {
    const target = `public/design/${id}-${width}.webp`;
    const result = await sharp(input)
      .rotate()
      .resize({
        width,
        height: width * 2,
        fit: "inside",
        withoutEnlargement: true,
      })
      .webp({ quality: width === 2000 ? 86 : 80, effort: 5 })
      .toFile(target);
    optimizedBytes += result.size;
    variants.push({
      src: `/design/${id}-${width}.webp`,
      width: result.width,
      height: result.height,
    });
  }
  originalBytes += (await fs.stat(input)).size;
  manifest.push({
    id,
    title,
    category,
    description,
    src: variants[1].src,
    thumbnail: variants[0].src,
    full: variants[2].src,
    width: variants[1].width,
    height: variants[1].height,
    srcSet: [...new Map(variants.map((v) => [v.width, v])).values()]
      .map((v) => `${v.src} ${v.width}w`)
      .join(", "),
  });
}
await fs.writeFile(
  "src/data/designWorks.json",
  JSON.stringify(manifest, null, 2) + "\n",
);
console.log(
  `${works.length} works: ${(originalBytes / 1048576).toFixed(1)} MB originals; ${(optimizedBytes / 1048576).toFixed(1)} MB across all three responsive sizes.`,
);
