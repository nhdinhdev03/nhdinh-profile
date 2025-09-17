import { useState, useEffect, useRef, useCallback } from 'react';

/**
 * Custom hook để tối ưu scroll events với requestAnimationFrame
 * @param {Function} callback - Function được gọi khi scroll
 * @param {number} threshold - Ngưỡng scroll để hiển thị button (default: 300)
 * @returns {Object} - { isVisible, scrollProgress }
 */
export const useScrollProgress = (callback, threshold = 300) => {
  const [isVisible, setIsVisible] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);
  const rafRef = useRef();
  const lastValues = useRef({ scrollY: 0, progress: 0, visible: false });

  const handleScroll = useCallback(() => {
    const scrollY = window.pageYOffset;
    
    // Skip nếu scroll không thay đổi đáng kể
    if (Math.abs(scrollY - lastValues.current.scrollY) < 10) return;
    
    const maxScroll = document.documentElement.scrollHeight - window.innerHeight;
    const progress = maxScroll > 0 ? Math.min(scrollY / maxScroll, 1) : 0;
    const visible = scrollY > threshold;
    
    // Chỉ update state khi có thay đổi thực sự
    if (
      visible !== lastValues.current.visible ||
      Math.abs(progress - lastValues.current.progress) > 0.01
    ) {
      setIsVisible(visible);
      setScrollProgress(progress);
      
      lastValues.current = { scrollY, progress, visible };
      
      // Gọi callback nếu có
      if (callback) callback(scrollY, progress);
    }
  }, [callback, threshold]);

  useEffect(() => {
    let ticking = false;

    const onScroll = () => {
      if (!ticking) {
        rafRef.current = requestAnimationFrame(() => {
          handleScroll();
          ticking = false;
        });
        ticking = true;
      }
    };

    // Initial call
    handleScroll();

    window.addEventListener('scroll', onScroll, { passive: true });
    
    return () => {
      window.removeEventListener('scroll', onScroll);
      if (rafRef.current) {
        cancelAnimationFrame(rafRef.current);
      }
    };
  }, [handleScroll]);

  return { isVisible, scrollProgress };
};

/**
 * Hook để smooth scroll tới top với native browser API
 * @returns {Function} scrollToTop function
 */
export const useSmoothScrollToTop = () => {
  return useCallback(() => {
    // Sử dụng native smooth scroll cho performance tốt nhất
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  }, []);
};

export default { useScrollProgress, useSmoothScrollToTop };