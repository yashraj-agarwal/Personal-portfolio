# Yash Raj Agarwal — Portfolio

A premium, dark-themed developer portfolio built with **React**, **Three.js**, and **Framer Motion**. Features a 3D laptop model, ASCII art portrait, liquid glass UI, and immersive scroll animations.

## ✨ Features

- 🖥 **3D ASUS ROG laptop model** with real-time cursor parallax (Three.js / R3F)
- 🟢 **ASCII art portrait** rendered as live green monospace text
- 💧 **Liquid glass navbar** with Apple-style frosted blur
- 🎬 **Scroll-driven animations** via Framer Motion and Lenis smooth scroll
- ✍️ **Text scramble role indicator** in the hero section
- 📱 **Fully responsive** — mobile, tablet, and desktop
- ⚡ **Vite** for instant HMR and optimised production builds

## 🗂 Project Structure

```
src/
├── components/          # All UI components
│   ├── ui/              # Reusable primitives (glass-button, TextScramble, …)
│   ├── Hero.jsx         # Landing hero with 3D canvas
│   ├── ThreeMacbook.jsx # R3F laptop model component
│   ├── About.jsx        # About section with ASCII portrait
│   ├── Projects.jsx     # Project cards with 3D tilt
│   ├── Experience.jsx   # Timeline section
│   ├── Skills.jsx       # Skill pills
│   ├── Footer.jsx       # Footer with contact links
│   └── …
├── data/
│   └── portfolioData.js # All portfolio content (projects, experience, skills)
├── styles/
│   └── liquid-glass.css # Custom glassmorphism styles
├── pages/
│   └── Home.jsx         # Main page composition
├── App.jsx              # Router & global layout
├── main.jsx             # React entry point
└── index.css            # Global styles & design tokens
public/
├── ascii-art.txt        # ASCII art source (fetched at runtime)
├── resume.pdf           # Downloadable resume
├── favicon.svg          # Site icon
└── asus_rog_strix_scar_17_2023_g733_gaming_laptop.glb  # 3D model
```

## 🚀 Getting Started

```bash
# Install dependencies
npm install

# Run dev server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview
```

## 🛠 Tech Stack

| Layer        | Technology                                    |
|--------------|-----------------------------------------------|
| Framework    | React 19 + Vite 8                             |
| 3D           | Three.js · @react-three/fiber · @react-three/drei |
| Animation    | Framer Motion · Lenis (smooth scroll)         |
| Styling      | Tailwind CSS · Vanilla CSS                    |
| UI           | Lucide React · Radix UI                       |
| Routing      | React Router DOM v7                           |

## 📄 License

MIT — feel free to use as inspiration but please don't copy the content directly.
