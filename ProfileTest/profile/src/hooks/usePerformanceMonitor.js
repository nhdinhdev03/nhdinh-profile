import { useState, useEffect } from 'react';

/**
 * Hook để monitor hiệu suất ứng dụng và cung cấp metrics real-time
 */
export const usePerformanceMonitor = () => {
  const [metrics, setMetrics] = useState({
    fps: 0,
    loadTime: 0,
    renderTime: 0,
    memoryUsage: 0,
    isLagging: false
  });

  useEffect(() => {
    let frameCount = 0;
    let lastTime = performance.now();
    let lastMemoryCheck = 0;

    // FPS Counter
    const measureFPS = () => {
      frameCount++;
      const currentTime = performance.now();
      
      if (currentTime - lastTime >= 1000) {
        const fps = Math.round((frameCount * 1000) / (currentTime - lastTime));
        
        setMetrics(prev => ({
          ...prev,
          fps,
          isLagging: fps < 30 // Consider < 30 FPS as lagging
        }));
        
        frameCount = 0;
        lastTime = currentTime;
      }
      
      if (!document.hidden) {
        requestAnimationFrame(measureFPS);
      }
    };

    // Memory Usage Monitor
    const checkMemoryUsage = () => {
      if ('memory' in performance) {
        const memory = performance.memory;
        const memoryUsage = Math.round(memory.usedJSHeapSize / 1024 / 1024);
        
        setMetrics(prev => ({
          ...prev,
          memoryUsage
        }));
      }
    };

    // Performance Observer for Navigation Timing
    const observePerformance = () => {
      try {
        // Measure page load time
        const navigation = performance.getEntriesByType('navigation')[0];
        if (navigation) {
          const loadTime = navigation.loadEventEnd - navigation.navigationStart;
          
          setMetrics(prev => ({
            ...prev,
            loadTime: Math.round(loadTime)
          }));
        }

        // Observe LCP (Largest Contentful Paint)
        if ('PerformanceObserver' in window) {
          const lcpObserver = new PerformanceObserver((list) => {
            const entries = list.getEntries();
            const lastEntry = entries[entries.length - 1];
            
            setMetrics(prev => ({
              ...prev,
              renderTime: Math.round(lastEntry.startTime)
            }));
          });
          
          lcpObserver.observe({ entryTypes: ['largest-contentful-paint'] });
          
          return () => lcpObserver.disconnect();
        }
      } catch (error) {
        console.warn('Performance monitoring not supported:', error);
      }
    };

    // Start monitoring
    requestAnimationFrame(measureFPS);
    observePerformance();
    
    // Check memory usage every 5 seconds
    const memoryInterval = setInterval(checkMemoryUsage, 5000);
    checkMemoryUsage(); // Initial check

    return () => {
      clearInterval(memoryInterval);
    };
  }, []);

  // Performance recommendations based on metrics
  const getRecommendations = () => {
    const recommendations = [];
    
    if (metrics.fps < 30) {
      recommendations.push('Low FPS detected - Consider reducing animations or particle count');
    }
    
    if (metrics.memoryUsage > 100) {
      recommendations.push('High memory usage - Check for memory leaks or large assets');
    }
    
    if (metrics.loadTime > 3000) {
      recommendations.push('Slow load time - Consider code splitting or asset optimization');
    }
    
    if (metrics.renderTime > 2500) {
      recommendations.push('Slow render time - Optimize heavy components or use React.memo');
    }
    
    return recommendations;
  };

  return {
    metrics,
    recommendations: getRecommendations(),
    isPerformant: metrics.fps >= 30 && metrics.memoryUsage < 100 && !metrics.isLagging
  };
};

export default usePerformanceMonitor;
