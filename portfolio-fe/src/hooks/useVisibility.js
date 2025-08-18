import { useEffect, useRef, useState, useCallback } from "react";

function useVisibility(
  options = { threshold: 0.1, root: null, rootMargin: "0px" }
) {
  const elRef = useRef(null);
  const [visible, setVisible] = useState(false);
  const [hasAnimated, setHasAnimated] = useState(false);

  // Enhanced visibility detection with performance optimizations
  const observerCallback = useCallback((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting && !hasAnimated) {
        setVisible(true);
        setHasAnimated(true);
        // Disconnect observer after first visibility for performance
        if (entry.target && entry.target.classList) {
          entry.target.classList.add('visible', 'animate-in');
        }
      }
    });
  }, [hasAnimated]);

  useEffect(() => {
    const node = elRef.current;
    if (!node || hasAnimated) return;

    // Enhanced options for better performance
    const enhancedOptions = {
      threshold: options.threshold || 0.1,
      root: options.root || null,
      rootMargin: options.rootMargin || "50px", // Trigger slightly before visible
    };

    const observer = new IntersectionObserver(observerCallback, enhancedOptions);
    
    // Add initial classes for animation
    if (node.classList) {
      node.classList.add('lazy-load');
    }
    
    observer.observe(node);

    return () => {
      observer.disconnect();
    };
  }, [observerCallback, options, hasAnimated]);

  // GPU acceleration helper
  useEffect(() => {
    const node = elRef.current;
    if (visible && node && node.classList) {
      node.classList.add('gpu-accelerated');
      
      // Remove GPU acceleration after animation completes
      const timer = setTimeout(() => {
        if (node.classList) {
          node.classList.remove('gpu-accelerated');
        }
      }, 1000);
      
      return () => clearTimeout(timer);
    }
  }, [visible]);

  return [elRef, visible, hasAnimated];
}
export default useVisibility;
