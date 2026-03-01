// @ts-check
import { defineConfig } from 'astro/config';

import tailwindcss from '@tailwindcss/vite';

// Set BASE_PATH environment variable when building:
// For GitHub Pages: BASE_PATH=/maedchen_und_wolf_public/ npm run build
// For domain root: npm run build (or BASE_PATH=/ npm run build)

export default defineConfig({
  site: process.env.SITE_URL || 'https://klinge01.github.io',
  base: process.env.BASE_PATH || '/',
  vite: {
    plugins: [tailwindcss()]
  }
});