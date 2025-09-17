import { useState, useEffect, useMemo } from 'react';

/**
 * Hook để detect khả năng thiết bị và tối ưu performance accordingly
 * @returns {object} Device capability information
 */
export const useDeviceCapability = () => {
  const [deviceInfo, setDeviceInfo] = useState({
    isMobile: false,
    isLowPerformance: false,
    hardwareConcurrency: 4,
    screenWidth: 1920,
    isTouch: false,
  });

  useEffect(() => {
    if (typeof window === 'undefined') return;

    const updateDeviceInfo = () => {
      const width = window.innerWidth;
      const isMobile = width <= 768;
      const hardwareConcurrency = navigator.hardwareConcurrency || 4;
      
      // Detect low performance devices
      const isLowPerformance = 
        hardwareConcurrency <= 4 ||
        /Android|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent) ||
        width <= 480;

      // Detect touch capability
      const isTouch = 'ontouchstart' in window || 
        (navigator && (navigator.maxTouchPoints > 0 || navigator.msMaxTouchPoints > 0));

      setDeviceInfo({
        isMobile,
        isLowPerformance,
        hardwareConcurrency,
        screenWidth: width,
        isTouch,
      });
    };

    // Initial check
    updateDeviceInfo();

    // Listen for resize (debounced)
    let timeoutId;
    const handleResize = () => {
      clearTimeout(timeoutId);
      timeoutId = setTimeout(updateDeviceInfo, 150);
    };

    window.addEventListener('resize', handleResize);
    return () => {
      window.removeEventListener('resize', handleResize);
      clearTimeout(timeoutId);
    };
  }, []);

  // Memoized performance settings
  const performanceSettings = useMemo(() => ({
    // Animation settings based on device capability
    animationDuration: deviceInfo.isLowPerformance ? 0.1 : 0.3,
    particleCount: deviceInfo.isLowPerformance ? 5 : deviceInfo.isMobile ? 8 : 15,
    enableParallax: !deviceInfo.isLowPerformance && !deviceInfo.isMobile,
    enableComplexAnimations: !deviceInfo.isLowPerformance,
    
    // Scroll settings
    scrollBehavior: deviceInfo.isLowPerformance ? 'auto' : 'smooth',
    
    // Rendering optimizations
    shouldReduceMotion: deviceInfo.isLowPerformance || window.matchMedia('(prefers-reduced-motion: reduce)').matches,
    willChangeProperty: deviceInfo.isLowPerformance ? 'auto' : 'transform',
  }), [deviceInfo]);

  return {
    ...deviceInfo,
    performanceSettings,
  };
};

export default useDeviceCapability;