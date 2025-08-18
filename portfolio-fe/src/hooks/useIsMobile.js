import { useState, useEffect, useCallback } from 'react';

// Enhanced hook for device detection with performance optimizations
const useIsMobile = () => {
  const [deviceState, setDeviceState] = useState({
    isMobile: false,
    isTablet: false,
    isTouchDevice: false,
    isDesktop: true,
    screenSize: 'desktop',
    orientation: 'landscape',
    pixelRatio: 1,
    hasReducedMotion: false
  });

  const checkDevice = useCallback(() => {
    const width = window.innerWidth;
    const height = window.innerHeight;
    const pixelRatio = window.devicePixelRatio || 1;
    
    // Enhanced device detection
    const isMobile = width < 768;
    const isTablet = width >= 768 && width <= 1024;
    const isDesktop = width > 1024;
    
    // Touch device detection (more comprehensive)
    const isTouchDevice = 
      'ontouchstart' in window || 
      navigator.maxTouchPoints > 0 || 
      (window.DocumentTouch && document instanceof window.DocumentTouch);
    
    // Screen size categories
    let screenSize = 'desktop';
    if (width < 480) screenSize = 'xs';
    else if (width < 768) screenSize = 'sm';
    else if (width < 1024) screenSize = 'md';
    else if (width < 1280) screenSize = 'lg';
    else screenSize = 'xl';
    
    // Orientation detection
    const orientation = width > height ? 'landscape' : 'portrait';
    
    // Reduced motion preference
    const hasReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    
    setDeviceState({
      isMobile,
      isTablet,
      isTouchDevice,
      isDesktop,
      screenSize,
      orientation,
      pixelRatio,
      hasReducedMotion
    });
  }, []);

  useEffect(() => {
    checkDevice();

    // Optimized resize listener with passive events
    let timeoutId;
    const handleResize = () => {
      clearTimeout(timeoutId);
      timeoutId = setTimeout(checkDevice, 100); // Reduced debounce time
    };

    // Listen for orientation change
    const handleOrientationChange = () => {
      // Small delay to ensure dimensions are updated
      setTimeout(checkDevice, 150);
    };

    // Listen for reduced motion preference changes
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    const handleMotionChange = () => checkDevice();

    window.addEventListener('resize', handleResize, { passive: true });
    window.addEventListener('orientationchange', handleOrientationChange, { passive: true });
    
    // Modern browsers support this
    if (mediaQuery.addEventListener) {
      mediaQuery.addEventListener('change', handleMotionChange);
    } else {
      // Fallback for older browsers
      mediaQuery.addListener(handleMotionChange);
    }

    return () => {
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('orientationchange', handleOrientationChange);
      clearTimeout(timeoutId);
      
      if (mediaQuery.removeEventListener) {
        mediaQuery.removeEventListener('change', handleMotionChange);
      } else {
        mediaQuery.removeListener(handleMotionChange);
      }
    };
  }, [checkDevice]);

  // Helper functions for better UX
  const getOptimalImageSize = useCallback(() => {
    const { screenSize, pixelRatio } = deviceState;
    const multiplier = Math.min(pixelRatio, 2); // Cap at 2x for performance
    
    switch (screenSize) {
      case 'xs': return `${Math.round(320 * multiplier)}w`;
      case 'sm': return `${Math.round(640 * multiplier)}w`;
      case 'md': return `${Math.round(768 * multiplier)}w`;
      case 'lg': return `${Math.round(1024 * multiplier)}w`;
      default: return `${Math.round(1280 * multiplier)}w`;
    }
  }, [deviceState]);

  const shouldReduceAnimations = useCallback(() => {
    return deviceState.hasReducedMotion || (deviceState.isMobile && deviceState.pixelRatio < 2);
  }, [deviceState]);

  const getViewportSize = useCallback(() => {
    return {
      width: window.innerWidth,
      height: window.innerHeight,
      availableHeight: window.innerHeight - (deviceState.isMobile ? 60 : 0) // Account for mobile browsers
    };
  }, [deviceState.isMobile]);

  return { 
    ...deviceState,
    // Helper functions
    getOptimalImageSize,
    shouldReduceAnimations,
    getViewportSize,
    // Backward compatibility
    isMobile: deviceState.isMobile,
    isTablet: deviceState.isTablet,
    isTouchDevice: deviceState.isTouchDevice,
    isDesktop: deviceState.isDesktop
  };
};

export default useIsMobile;
