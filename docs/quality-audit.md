# Quality and optimization pass — 19 October 2026

## Validation

- `npm run check`: ESLint, TypeScript, 119 optimized image asset checks, contribution/statistics regression checks, and production build pass.
- `npm audit --omit=dev --audit-level=moderate`: zero production dependency vulnerabilities.
- Responsive browser checks use actual iframe viewport sizes in the embedded Chromium browser, against both Vite development and the production preview.
- Tested widths/heights: 320×640 (Design and viewer), 390×844 (Home and Frames), 768×1024 (Home and Design), 1024×600 (Home), 1440×900 (Home and Design), and 844×390 (Frames landscape).
- Checked document width and text/button bounds for horizontal overflow, navbar containment, gallery image proportions, phone viewer controls, filters, arrow-key image navigation, Escape/focus restoration, and cross-page navigation to home sections.

## Fixes

- ResizeObserver keeps the active navbar pill aligned after viewport and font changes. The stationary glass shell clips the animated shine.
- Phone nav items have 44-pixel touch targets. Hero/contact spacing leaves room for the floating navbar and safe areas.
- Narrow project cards no longer reserve most of their width for decorative ornaments. Phone section headings scale down instead of splitting words across lines.
- Scroll tracking handles lazy-loaded sections and returning from other routes. Hash navigation refreshes Lenis dimensions as the page settles so Contact does not land at an earlier section.
- Cursor animation is mouse-only, respects reduced motion, and stops when idle or hidden. No custom cursor remains on a touch screen or inside the native image dialog.
- Text-scramble timers clean up on unmount; motion preferences are applied to page animations and smooth scrolling.
- Frames uses 768-pixel textures and fewer planes on phones, caps pixel density, pauses WebGL offscreen/hidden, and releases textures/materials on unmount. Shader blur uses nine samples instead of 25.
- Frames includes static-image fallbacks for unavailable WebGL/reduced motion and a boundary for renderer failures. Landscape layout uses available viewport height.
- Lazy page failures show a reload action instead of a blank site. This also handles stale chunks after a deployment replaces a build.
- GitHub activity has a ten-second timeout and retry UI. Clipboard feedback handles failures instead of reporting a false success.
- Added a skip link, keyboard access to the email card, focus outlines, route titles/canonicals, a valid social-preview image, updated sitemap, and Vercel/Netlify route refresh rules.

## Asset budgets

- All 31 desktop photographs: approximately 2.9 MiB, down from 212.3 MiB of originals.
- All 31 phone photographs: approximately 1.11 MiB.
- All 19 Design pieces: approximately 4.7 MiB across **all three** responsive variants; an individual viewport loads a selected variant and lower images are lazy loaded.
- Originals are preserved. Design originals are outside `public/`; the new pages request optimized copies.
- Three.js and gallery code are separate from the landing-page bundle. The main entry is approximately 20 KiB gzipped, excluding shared React/animation vendors.

## Practical limits

These are browser viewport checks, not certification on every physical phone, GPU, browser, or network. Device-specific Safari/touch/GPU performance remains a useful final real-device check. WebGL has a static fallback; GitHub activity and Google Fonts depend on external services.

The full development dependency audit still reports advisories in the Tailwind 3 build chain. Automated compatible fixes were applied. Clearing the remaining development-only findings would require a separate Tailwind 4 migration; production dependencies audit clean.
