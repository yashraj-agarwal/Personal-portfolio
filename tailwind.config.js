/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        background: '#050505',
        surface: '#0B0B0B',
        surfaceHighlight: '#111111',
        primary: '#ffffff',
        secondary: '#a1a1aa', // Zinc 400
        muted: '#52525b', // Zinc 600
        accent: {
          blue: '#3B82F6',
          purple: '#8B5CF6',
          cyan: '#06B6D4',
        }
      },
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
        serif: ['Cormorant Garamond', 'serif'],
      },
      backgroundImage: {
        'glass-gradient': 'linear-gradient(180deg, rgba(255, 255, 255, 0.04) 0%, rgba(255, 255, 255, 0) 100%)',
      },
      boxShadow: {
        'glass': 'inset 0 1px 0 0 rgba(255, 255, 255, 0.05)',
        'glow': '0 0 40px -10px var(--tw-shadow-color)',
      }
    },
  },
  plugins: [],
}
