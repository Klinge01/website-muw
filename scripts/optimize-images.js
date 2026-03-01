#!/usr/bin/env node

import { execSync } from 'child_process';
import { existsSync, mkdirSync, readdirSync, statSync } from 'fs';
import { join, extname, basename, dirname } from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const projectRoot = join(__dirname, '..');

// Check if sharp is available, if not provide instructions
function checkSharp() {
  try {
    require.resolve('sharp');
    return true;
  } catch (e) {
    console.log('⚠️  Sharp not found. Installing...');
    try {
      execSync('npm install sharp --save-dev', { stdio: 'inherit' });
      return true;
    } catch (installError) {
      console.error('❌ Failed to install sharp. Please run: npm install sharp --save-dev');
      return false;
    }
  }
}

// Convert images to WebP
async function convertToWebP(inputPath, outputPath, quality = 85) {
  try {
    const sharp = await import('sharp');
    await sharp.default(inputPath)
      .webp({ quality })
      .toFile(outputPath);
    return true;
  } catch (error) {
    console.error(`❌ Failed to convert ${inputPath}:`, error.message);
    return false;
  }
}

// Optimize JPEG images
async function optimizeJPEG(inputPath, outputPath, quality = 85) {
  try {
    const sharp = await import('sharp');
    await sharp.default(inputPath)
      .jpeg({ quality, progressive: true })
      .toFile(outputPath);
    return true;
  } catch (error) {
    console.error(`❌ Failed to optimize ${inputPath}:`, error.message);
    return false;
  }
}

// Process images in directory
async function processImages(dirPath) {
  if (!existsSync(dirPath)) {
    console.log(`📁 Directory ${dirPath} does not exist, skipping...`);
    return;
  }

  const files = readdirSync(dirPath);
  const imageExtensions = ['.jpg', '.jpeg', '.png'];
  
  for (const file of files) {
    const filePath = join(dirPath, file);
    const stat = statSync(filePath);
    
    if (stat.isDirectory()) {
      await processImages(filePath);
      continue;
    }
    
    const ext = extname(file).toLowerCase();
    if (!imageExtensions.includes(ext)) {
      continue;
    }
    
    const baseName = basename(file, ext);
    
    // Skip already optimized files or webp conversions
    if (baseName.includes('_optimized') || baseName.endsWith('.webp')) {
      console.log(`⏭️  Skipping ${file} (already optimized)`);
      continue;
    }
    
    const webpPath = join(dirPath, `${baseName}.webp`);
    
    // Skip if WebP already exists
    if (existsSync(webpPath)) {
      console.log(`⏭️  Skipping ${file} (WebP already exists)`);
      continue;
    }
    
    console.log(`🔄 Converting ${file} to WebP...`);
    const success = await convertToWebP(filePath, webpPath);
    
    if (success) {
      console.log(`✅ Created ${baseName}.webp`);
    }
  }
}

// Main function
async function main() {
  console.log('🚀 Starting image optimization...');
  
  if (!checkSharp()) {
    process.exit(1);
  }
  
  const imagesDir = join(projectRoot, 'public', 'images');
  await processImages(imagesDir);
  
  console.log('✨ Image optimization complete!');
  console.log('');
  console.log('📋 Next steps:');
  console.log('1. Review the generated WebP files');
  console.log('2. Replace original images with optimized versions if desired');
  console.log('3. Run npm run build to build the site');
}

main().catch(console.error);
