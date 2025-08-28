import { useState, useEffect } from 'react';

// Responsive utilities for optimal device support
export const BREAKPOINTS = {
  MOBILE_SMALL: 320,
  MOBILE_LARGE: 480,
  TABLET: 768,
  LAPTOP: 1024,
  DESKTOP: 1200,
  DESKTOP_LARGE: 1440
};

export const detectDevice = () => {
  const width = window.innerWidth;
  const height = window.innerHeight;
  const userAgent = navigator.userAgent;
  
  return {
    width,
    height,
    isMobile: width <= BREAKPOINTS.TABLET,
    isTablet: width > BREAKPOINTS.TABLET && width <= BREAKPOINTS.LAPTOP,
    isDesktop: width > BREAKPOINTS.LAPTOP,
    isSmallMobile: width <= BREAKPOINTS.MOBILE_LARGE,
    isLandscape: width > height,
    isPortrait: width <= height,
    isTouchDevice: 'ontouchstart' in window || navigator.maxTouchPoints > 0,
    isIOS: /iPad|iPhone|iPod/.test(userAgent),
    isAndroid: /Android/.test(userAgent),
    isHighDPI: window.devicePixelRatio > 1.5,
    hasHover: window.matchMedia('(hover: hover)').matches
  };
};

export const getOptimalSettings = (device) => {
  const { isMobile, isTablet, isSmallMobile, isLandscape, isTouchDevice } = device;
  
  return {
    // Matrix effect settings
    matrix: {
      enabled: !isSmallMobile,
      fontSize: isSmallMobile ? 10 : isMobile ? 12 : isTablet ? 13 : 14,
      opacity: isSmallMobile ? 0.02 : isMobile ? 0.04 : isTablet ? 0.06 : 0.08,
      animationSpeed: isMobile ? 50 : isTablet ? 40 : 35,
      glowFrequency: isMobile ? 0.99 : 0.97
    },
    
    // Particle system settings
    particles: {
      enabled: !isMobile,
      count: isSmallMobile ? 15 : isMobile ? 25 : isTablet ? 40 : 60,
      size: isMobile ? { min: 0.3, max: 1.2 } : { min: 0.5, max: 2 },
      speed: isMobile ? 0.6 : isTablet ? 0.8 : 1,
      opacity: isMobile ? 0.2 : isTablet ? 0.3 : 0.4,
      connections: !isMobile,
      connectionDistance: isMobile ? 80 : isTablet ? 100 : 120
    },
    
    // Floating shapes settings
    shapes: {
      enabled: !isSmallMobile,
      count: isSmallMobile ? 0 : isMobile ? 4 : isTablet ? 6 : 8,
      opacity: isMobile ? 0.1 : isTablet ? 0.15 : 0.2,
      animationDuration: isMobile ? 30 : 25
    },
    
    // UI settings
    ui: {
      typewriterSpeed: {
        typing: isMobile ? 80 : 60,
        erasing: isMobile ? 35 : 25,
        holdDuration: isMobile ? 2000 : 3000
      },
      buttonSize: {
        minTouchTarget: isTouchDevice ? 44 : 32,
        padding: isMobile ? '0.875rem 1.5rem' : '1rem 2rem'
      },
      avatar: {
        size: isSmallMobile ? 180 : isMobile ? 220 : isTablet ? 280 : 350,
        coreSize: isSmallMobile ? 130 : isMobile ? 160 : isTablet ? 200 : 250
      },
      spacing: {
        section: isMobile ? '3rem' : '4rem',
        element: isMobile ? '1.5rem' : '2rem'
      }
    },
    
    // Performance settings
    performance: {
      useRAF: !isMobile, // Use requestAnimationFrame vs setTimeout
      enableBlur: !isSmallMobile,
      enableShadows: !isMobile,
      enableTransforms3D: !isMobile,
      reduceMotion: window.matchMedia('(prefers-reduced-motion: reduce)').matches
    },
    
    // Layout settings
    layout: {
      heroLayout: isMobile || (isTablet && isLandscape) ? 'single-column' : 'two-column',
      statsGrid: isSmallMobile ? 1 : isMobile ? 2 : isTablet ? 2 : 4,
      projectsGrid: isSmallMobile ? 1 : isMobile ? 1 : isTablet ? 2 : 3,
      maxWidth: isSmallMobile ? '100%' : isMobile ? '100%' : isTablet ? '90%' : '1400px'
    }
  };
};

export const useResponsive = () => {
  const [deviceInfo, setDeviceInfo] = useState(() => detectDevice());
  const [settings, setSettings] = useState(() => getOptimalSettings(detectDevice()));

  useEffect(() => {
    const handleResize = () => {
      const newDeviceInfo = detectDevice();
      setDeviceInfo(newDeviceInfo);
      setSettings(getOptimalSettings(newDeviceInfo));
    };

    const handleOrientationChange = () => {
      setTimeout(handleResize, 300); // Delay to ensure dimensions are updated
    };

    window.addEventListener('resize', handleResize);
    window.addEventListener('orientationchange', handleOrientationChange);

    return () => {
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('orientationchange', handleOrientationChange);
    };
  }, []);

  return { deviceInfo, settings };
};

// CSS-in-JS responsive helpers
export const responsive = {
  mobile: (styles) => `@media (max-width: ${BREAKPOINTS.TABLET - 1}px) { ${styles} }`,
  tablet: (styles) => `@media (min-width: ${BREAKPOINTS.TABLET}px) and (max-width: ${BREAKPOINTS.LAPTOP - 1}px) { ${styles} }`,
  desktop: (styles) => `@media (min-width: ${BREAKPOINTS.LAPTOP}px) { ${styles} }`,
  landscape: (styles) => `@media (orientation: landscape) { ${styles} }`,
  portrait: (styles) => `@media (orientation: portrait) { ${styles} }`,
  touch: (styles) => `@media (hover: none) and (pointer: coarse) { ${styles} }`,
  hover: (styles) => `@media (hover: hover) and (pointer: fine) { ${styles} }`,
  retina: (styles) => `@media (-webkit-min-device-pixel-ratio: 2), (min-resolution: 192dpi) { ${styles} }`
};

// Viewport utilities
export const viewport = {
  getVH: (percentage = 100) => `${(window.innerHeight * percentage) / 100}px`,
  getVW: (percentage = 100) => `${(window.innerWidth * percentage) / 100}px`,
  getSafeAreaTop: () => {
    return parseInt(getComputedStyle(document.documentElement).getPropertyValue('--sat')) || 0;
  },
  getSafeAreaBottom: () => {
    return parseInt(getComputedStyle(document.documentElement).getPropertyValue('--sab')) || 0;
  }
};

// Performance monitoring
export const performance = {
  measureFPS: (callback) => {
    let frames = 0;
    let lastTime = performance.now();
    
    const measure = () => {
      frames++;
      const currentTime = performance.now();
      
      if (currentTime - lastTime >= 1000) {
        const fps = Math.round((frames * 1000) / (currentTime - lastTime));
        callback(fps);
        frames = 0;
        lastTime = currentTime;
      }
      
      requestAnimationFrame(measure);
    };
    
    requestAnimationFrame(measure);
  },
  
  isLowEndDevice: () => {
    const device = detectDevice();
    return device.isMobile && !device.isHighDPI && navigator.hardwareConcurrency <= 4;
  }
};

const responsiveUtils = {
  BREAKPOINTS,
  detectDevice,
  getOptimalSettings,
  useResponsive,
  responsive,
  viewport,
  performance
};

export default responsiveUtils;
