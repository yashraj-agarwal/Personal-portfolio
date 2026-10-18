# Yash Raj Agarwal — Portfolio

React 19, Vite, Tailwind CSS, TypeScript, Framer Motion, and Three.js.

## Pages

- `/` — developer portfolio, interactive GitHub contribution skyline, projects, experience, and contact.
- `/design` — responsive masonry collection of mockups, interfaces, and posters with category filters and an accessible full-screen viewer.
- `/frames` — animated photography archive with wheel, keyboard, and touch navigation; a static gallery is used when WebGL is unavailable or reduced motion is preferred.

## Development

```bash
npm ci
npm run dev
npm run check
npm run preview
```

`npm run check` runs ESLint, TypeScript, asset validation, contribution/statistics checks, and the production build.

## Images

Original photographs are in `public/portfolio/`. Design source images are in `New folder/`. Keep the originals; pages use optimized copies instead.

```bash
npm run optimize:frames
npm run optimize:design
```

The photography pipeline creates 1280-pixel desktop and 768-pixel phone WebP textures plus `src/data/framesImages.json`. The Design pipeline creates responsive 640/1280/2000-pixel WebP images and `src/data/designWorks.json`. Edit titles and categories in `scripts/optimize-design.mjs`, then regenerate.

Design images use native lazy loading, responsive `srcset`, and reserved dimensions. Frames loads independently from the landing page, limits pixel density and visible planes on phones, and pauses rendering offscreen or in a hidden tab. The custom cursor runs only with a mouse and stops when idle.

## Deployment

Build command: `npm run build`. Output directory: `dist/`.

`vercel.json` and `public/_redirects` provide direct-route refresh support for `/design` and `/frames` on Vercel and Netlify. Other static hosts must serve `index.html` for those routes. The development server and Vite preview already do this.

GitHub contributions depend on `github-contributions-api.jogruber.de`; unavailable or slow responses show an error with retry rather than generated activity.

See [the audit record](docs/quality-audit.md) for validation scope and remaining limitations.
