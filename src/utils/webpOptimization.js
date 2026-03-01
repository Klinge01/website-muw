// WebP optimization utilities for single-format loading

/**
 * Check if browser supports WebP format
 * @returns {Promise<boolean>} - True if WebP is supported
 */
export function checkWebPSupport() {
  return new Promise((resolve) => {
    const webP = new Image();
    webP.onload = webP.onerror = () => {
      resolve(webP.height === 2);
    };
    webP.src = 'data:image/webp;base64,UklGRjoAAABXRUJQVlA4IC4AAACyAgCdASoCAAIALmk0mk0iIiIiIgBoSygABc6WWgAA/veff/0PP8bA//LwYAAA';
  });
}

/**
 * Optimize images by loading only the supported format
 * @param {string} selector - CSS selector for images to optimize
 */
export async function optimizeImages(selector = '.optimized-image') {
  const webpSupported = await checkWebPSupport();
  const images = document.querySelectorAll(selector);
  
  images.forEach(img => {
    const webpSrc = img.getAttribute('data-webp');
    const fallbackSrc = img.getAttribute('data-fallback');
    
    if (webpSupported && webpSrc) {
      // Load WebP version
      img.src = webpSrc;
    } else if (fallbackSrc) {
      // Load fallback version
      img.src = fallbackSrc;
    }
  });
}

/**
 * Optimize hero background image with high priority
 * Uses the already preloaded image to avoid duplicate requests
 */
export async function optimizeHeroImage() {
  const heroImg = document.getElementById('hero-background');
  if (!heroImg) return;
  
  const webpSupported = await checkWebPSupport();
  const webpSrc = heroImg.getAttribute('data-webp');
  const fallbackSrc = heroImg.getAttribute('data-fallback');
  
  // Use the format that was already preloaded
  if (webpSupported && webpSrc) {
    heroImg.src = webpSrc;
  } else if (fallbackSrc) {
    heroImg.src = fallbackSrc;
  }
}

/**
 * Initialize image optimization for the entire page
 */
export async function initImageOptimization() {
  // Optimize hero image first (highest priority)
  await optimizeHeroImage();
  
  // Then optimize other images
  await optimizeImages();
}

/**
 * Lazy load optimized images with intersection observer
 * @param {string} selector - CSS selector for lazy images
 * @param {Object} options - Intersection observer options
 */
export function lazyLoadOptimizedImages(selector = '.optimized-image[loading="lazy"]', options = {}) {
  const defaultOptions = {
    root: null,
    rootMargin: '50px',
    threshold: 0.1,
    ...options
  };
  
  const imageObserver = new IntersectionObserver(async (entries, observer) => {
    for (const entry of entries) {
      if (entry.isIntersecting) {
        const img = entry.target;
        const webpSrc = img.getAttribute('data-webp');
        const fallbackSrc = img.getAttribute('data-fallback');
        
        if (webpSrc || fallbackSrc) {
          const webpSupported = await checkWebPSupport();
          
          if (webpSupported && webpSrc) {
            img.src = webpSrc;
          } else if (fallbackSrc) {
            img.src = fallbackSrc;
          }
          
          img.classList.remove('lazy');
          observer.unobserve(img);
        }
      }
    }
  }, defaultOptions);
  
  const images = document.querySelectorAll(selector);
  images.forEach(img => imageObserver.observe(img));
  
  return imageObserver;
}

/**
 * Preload critical images
 * @param {Array<string>} imageUrls - Array of image URLs to preload
 */
export function preloadImages(imageUrls) {
  imageUrls.forEach(url => {
    const link = document.createElement('link');
    link.rel = 'preload';
    link.as = 'image';
    link.href = url;
    document.head.appendChild(link);
  });
}
