import { useState, useEffect, useCallback } from 'react';

/**
 * Hook để quản lý việc preload các assets và optimize loading
 */
export const useAssetPreloader = (deviceCapabilities = {}) => {
  const [isLoading, setIsLoading] = useState(true);
  const [loadingProgress, setLoadingProgress] = useState(0);
  const [loadedAssets, setLoadedAssets] = useState(new Set());

  // Preload critical images
  const preloadImage = useCallback((src) => {
    return new Promise((resolve, reject) => {
      const img = new Image();
      img.onload = () => {
        setLoadedAssets(prev => new Set(prev).add(src));
        resolve(img);
      };
      img.onerror = reject;
      img.src = src;
    });
  }, []);

  // Preload fonts
  const preloadFont = useCallback((fontFamily, fontWeight = '400') => {
    return new Promise((resolve) => {
      if (document.fonts && document.fonts.load) {
        document.fonts.load(`${fontWeight} 16px ${fontFamily}`)
          .then(() => {
            setLoadedAssets(prev => new Set(prev).add(`font-${fontFamily}`));
            resolve();
          })
          .catch(() => resolve()); // Fail silently for fonts
      } else {
        // Fallback for older browsers
        setTimeout(resolve, 100);
      }
    });
  }, []);

  // Main preload function
  const preloadAssets = useCallback(async () => {
    try {
      const assetList = [];
      
      // Critical fonts
      assetList.push(preloadFont('Inter', '400'));
      assetList.push(preloadFont('Inter', '600'));
      assetList.push(preloadFont('Inter', '700'));

      // Critical images (adjust based on your actual assets)
      const criticalImages = [
        '/images/hero-bg.jpg',
        '/images/avatar.jpg',
        '/favicon.ico'
      ].filter(Boolean); // Remove undefined/null values

      criticalImages.forEach(src => {
        assetList.push(
          preloadImage(src).catch(() => {
            console.warn(`Failed to preload image: ${src}`);
          })
        );
      });

      // Load assets with progress tracking
      let loadedCount = 0;
      const totalAssets = assetList.length;

      const progressPromises = assetList.map(async (promise) => {
        try {
          await promise;
        } catch (error) {
          console.warn('Asset failed to load:', error);
        } finally {
          loadedCount++;
          setLoadingProgress((loadedCount / totalAssets) * 100);
        }
      });

      // Wait for all assets with timeout
      const loadingTimeout = deviceCapabilities.isLowEndDevice ? 2000 : 3000;
      
      await Promise.race([
        Promise.all(progressPromises),
        new Promise(resolve => setTimeout(resolve, loadingTimeout))
      ]);

      // Minimum loading time for smooth UX
      const minLoadTime = deviceCapabilities.isLowEndDevice ? 800 : 1200;
      await new Promise(resolve => setTimeout(resolve, minLoadTime));

      setIsLoading(false);

    } catch (error) {
      console.error('Error during asset preloading:', error);
      // Even if preloading fails, we should still show the app
      setTimeout(() => setIsLoading(false), 1000);
    }
  }, [deviceCapabilities, preloadImage, preloadFont]);

  useEffect(() => {
    preloadAssets();
  }, [preloadAssets]);

  return {
    isLoading,
    loadingProgress,
    loadedAssets: Array.from(loadedAssets),
    totalAssets: loadedAssets.size
  };
};

export default useAssetPreloader;
