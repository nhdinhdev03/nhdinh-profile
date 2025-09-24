import { useCallback, useEffect, useRef, useState } from "react";

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

    const maxScroll =
      document.documentElement.scrollHeight - window.innerHeight;
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

    window.addEventListener("scroll", onScroll, { passive: true });

    return () => {
      window.removeEventListener("scroll", onScroll);
      if (rafRef.current) {
        cancelAnimationFrame(rafRef.current);
      }
    };
  }, [handleScroll]);

  return { isVisible, scrollProgress };
};

/**
 * Hook để smooth scroll tới top với hiệu năng tối ưu.
 * API tương thích ngược: useSmoothScrollToTop(duration?: number, options?: UseSmoothOptions)
 * hoặc useSmoothScrollToTop(options?: UseSmoothOptions)
 *
 * @param {number|object} durationOrOptions - Thời gian animation (ms) hoặc options
 * @param {object} [maybeOptions]
 * @param {boolean} [maybeOptions.preferNative=true] - Ưu tiên native smooth scroll nếu hỗ trợ
 * @returns {Function} scrollToTop function (gọi khi click nút)
 */
export const useSmoothScrollToTop = (durationOrOptions = 800, maybeOptions) => {
  // Backward-compatible: allow (duration: number) or (options: object) or (duration, options)
  const duration =
    typeof durationOrOptions === "number" ? durationOrOptions : 800;
  const options =
    typeof durationOrOptions === "object"
      ? durationOrOptions
      : maybeOptions || {};
  const preferNative = options.preferNative ?? true; // default to native for lower CPU

  const isScrollingRef = useRef(false);
  const rafIdRef = useRef(null);
  const cleanupRef = useRef(() => {});

  useEffect(() => {
    // Cleanup any pending rAF if component using this hook unmounts mid-animation
    return () => {
      if (rafIdRef.current) cancelAnimationFrame(rafIdRef.current);
      // run last registered cleanup to remove listeners
      cleanupRef.current();
      isScrollingRef.current = false;
    };
  }, []);

  return useCallback(() => {
    // Respect reduced motion settings: jump to top without animation
    const prefersReduced =
      window.matchMedia &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (prefersReduced) {
      window.scrollTo(0, 0);
      return;
    }

    // If supported and preferred, use native smooth scroll (best perf, cancel-able by user)
    const canUseNative =
      preferNative && "scrollBehavior" in document.documentElement.style;
    if (canUseNative) {
      window.scrollTo({ top: 0, behavior: "smooth" });
      return;
    }

    // Prevent multiple scroll animations
    if (isScrollingRef.current) return;

    const startPosition = window.pageYOffset;
    if (startPosition === 0) return; // Already at top

    const distance = startPosition;
    isScrollingRef.current = true;
    let startTime = null;

    const cancel = () => {
      if (rafIdRef.current) cancelAnimationFrame(rafIdRef.current);
      rafIdRef.current = null;
      isScrollingRef.current = false;
    };

    // Cancel on user interaction to make UX feel responsive
    const onUserInterruption = (e) => {
      // Only cancel if we're mid-animation
      if (!isScrollingRef.current) return;
      cancel();
      removeInteractionListeners();
    };

    const addInteractionListeners = () => {
      const opts = { passive: true };
      window.addEventListener("wheel", onUserInterruption, opts);
      window.addEventListener("touchstart", onUserInterruption, opts);
      window.addEventListener("mousedown", onUserInterruption, opts);
      window.addEventListener("keydown", onUserInterruption, opts);
      cleanupRef.current = removeInteractionListeners;
    };

    const removeInteractionListeners = () => {
      window.removeEventListener("wheel", onUserInterruption);
      window.removeEventListener("touchstart", onUserInterruption);
      window.removeEventListener("mousedown", onUserInterruption);
      window.removeEventListener("keydown", onUserInterruption);
      cleanupRef.current = () => {};
    };

    const easeInOutCubic = (t) =>
      t < 0.5 ? 4 * t * t * t : (t - 1) * (2 * t - 2) * (2 * t - 2) + 1;

    const animateScroll = (currentTime) => {
      if (startTime === null) startTime = currentTime;
      const timeElapsed = currentTime - startTime;
      const progress = Math.min(timeElapsed / duration, 1);
      const ease = easeInOutCubic(progress);

      const currentPosition = startPosition - distance * ease;
      window.scrollTo(0, currentPosition);

      if (progress < 1 && isScrollingRef.current) {
        rafIdRef.current = requestAnimationFrame(animateScroll);
      } else {
        // Ensure we end exactly at top
        window.scrollTo(0, 0);
        removeInteractionListeners();
        isScrollingRef.current = false;
        rafIdRef.current = null;
      }
    };

    addInteractionListeners();
    rafIdRef.current = requestAnimationFrame(animateScroll);
  }, [duration, preferNative]);
};

export default { useScrollProgress, useSmoothScrollToTop };
