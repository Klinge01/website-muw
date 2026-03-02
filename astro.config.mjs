// @ts-check
import { defineConfig } from 'astro/config';

import tailwindcss from '@tailwindcss/vite';

import sitemap from '@astrojs/sitemap';

const isGitHubPages = process.env.GITHUB_PAGES === 'true';

export default defineConfig({
  site: process.env.SITE_URL || 'https://maedchenundwolf.at',
  base: isGitHubPages ? '/website-muw/' : '/',

  vite: {
    plugins: [tailwindcss()]
  },

  integrations: [sitemap()]
});