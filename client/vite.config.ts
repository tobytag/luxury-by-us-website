// filepath: /Users/oluwatobigbadamosi/Downloads/LeG/luxury-by-us-website/client/vite.config.ts
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path';

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, 'src'),
    },
  },
  base: './', // important for relative asset paths
  build: {
    outDir: 'dist', // or 'dist/public' if your server expects that
    emptyOutDir: true,
  },
});