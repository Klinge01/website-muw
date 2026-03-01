#!/usr/bin/env node

// Remove JPG/JPEG/PNG files from dist/images after build
// since the site now uses WebP exclusively.

import { readdirSync, unlinkSync } from 'fs';
import { join, extname, dirname } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const imagesDir = join(__dirname, '..', 'dist', 'images');

let removed = 0;
for (const file of readdirSync(imagesDir)) {
  if (/\.(jpg|jpeg|png)$/i.test(extname(file))) {
    unlinkSync(join(imagesDir, file));
    removed++;
  }
}

console.log(`🧹 Removed ${removed} JPG/PNG files from dist/images`);
