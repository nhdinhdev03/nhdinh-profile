import { useState, useEffect } from 'react';

// Hook to detect mobile devices and optimize performance
const useIsMobile = () => {
  const [isMobile, setIsMobile] = useState(false);
  const [isTablet, setIsTablet] = useState(false);
  const [isTouchDevice, setIsTouchDevice] = useState(false);

  useEffect(() => {
    const checkDevice = () => {
      const width = window.innerWidth;
      
      // Mobile: < 768px
      setIsMobile(width < 768);
      
      // Tablet: 768px - 1024px
      setIsTablet(width >= 768 && width <= 1024);
      
      // Touch device detection
      setIsTouchDevice('ontouchstart' in window || navigator.maxTouchPoints > 0);
    };

    checkDevice();

    // Throttled resize listener
    let timeoutId;
    const handleResize = () => {
      clearTimeout(timeoutId);
      timeoutId = setTimeout(checkDevice, 150);
    };

    window.addEventListener('resize', handleResize, { passive: true });
    return () => {
      window.removeEventListener('resize', handleResize);
      clearTimeout(timeoutId);
    };
  }, []);

  return { 
    isMobile, 
    isTablet, 
    isTouchDevice,
    isDesktop: !isMobile && !isTablet
  };
};

export default useIsMobile;
