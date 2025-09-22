import { useCallback, useEffect, useRef, useState } from 'react';

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
 * Hook để smooth scroll tới top với custom animation
 * @param {number} duration - Thời gian animation (ms)
 * @returns {Function} scrollToTop function
 */
export const useSmoothScrollToTop = (duration = 800) => {
  const isScrollingRef = useRef(false);

  return useCallback(() => {
    // Prevent multiple scroll animations
    if (isScrollingRef.current) return;

    const startPosition = window.pageYOffset;
    const distance = startPosition;
    
    if (distance === 0) return; // Already at top

    isScrollingRef.current = true;
    let startTime = null;

    const easeInOutCubic = (t) => {
      return t < 0.5 ? 4 * t * t * t : (t - 1) * (2 * t - 2) * (2 * t - 2) + 1;
    };

    const animateScroll = (currentTime) => {
      if (startTime === null) startTime = currentTime;
      
      const timeElapsed = currentTime - startTime;
      const progress = Math.min(timeElapsed / duration, 1);
      const ease = easeInOutCubic(progress);
      
      const currentPosition = startPosition - (distance * ease);
      window.scrollTo(0, currentPosition);
      
      if (progress < 1) {
        requestAnimationFrame(animateScroll);
      } else {
        // Ensure we end exactly at top
        window.scrollTo(0, 0);
        isScrollingRef.current = false;
      }
    };

    requestAnimationFrame(animateScroll);
  }, [duration]);
};

export default { useScrollProgress, useSmoothScrollToTop };