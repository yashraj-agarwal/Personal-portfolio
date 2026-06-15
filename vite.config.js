import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path';

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],

  // Path alias — replaces vite-tsconfig-paths plugin (Vite 5+ native)
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
    tsconfigPaths: true,
  },

  build: {
    // Raise warning threshold to suppress expected Three.js bundle size notice
    chunkSizeWarningLimit: 2000,

    rollupOptions: {
      output: {
        // Split vendor chunks for better caching (Rolldown requires function form)
        manualChunks(id) {
          if (id.includes('node_modules/react') || id.includes('node_modules/react-dom') || id.includes('node_modules/react-router-dom')) {
            return 'react-vendor';
          }
          if (id.includes('node_modules/three') || id.includes('@react-three')) {
            return 'three-vendor';
          }
          if (id.includes('node_modules/framer-motion') || id.includes('node_modules/lenis')) {
            return 'motion-vendor';
          }
        },
      },
    },
  },
});
