// Performance monitoring utilities for theme system
export class ThemePerformanceMonitor {
  constructor() {
    this.metrics = {
      themeTransitions: [],
      renderTimes: [],
      memoryUsage: []
    };
    this.isMonitoring = process.env.NODE_ENV === 'development';
  }

  // Monitor theme transition performance
  startThemeTransition(fromTheme, toTheme) {
    if (!this.isMonitoring) return null;
    
    const startTime = performance.now();
    const transitionId = `${fromTheme}-${toTheme}-${Date.now()}`;
    
    return {
      id: transitionId,
      startTime,
      fromTheme,
      toTheme,
      end: () => this.endThemeTransition(transitionId, startTime, fromTheme, toTheme)
    };
  }

  endThemeTransition(transitionId, startTime, fromTheme, toTheme) {
    if (!this.isMonitoring) return;
    
    const endTime = performance.now();
    const duration = endTime - startTime;
    
    this.metrics.themeTransitions.push({
      id: transitionId,
      fromTheme,
      toTheme,
      duration,
      timestamp: new Date().toISOString()
    });

    // Log performance warning if transition is slow
    if (duration > 100) {
      console.warn(`🐌 Slow theme transition detected: ${duration.toFixed(2)}ms (${fromTheme} → ${toTheme})`);
    } else {
      console.log(`⚡ Theme transition: ${duration.toFixed(2)}ms (${fromTheme} → ${toTheme})`);
    }

    // Keep only last 50 metrics
    if (this.metrics.themeTransitions.length > 50) {
      this.metrics.themeTransitions = this.metrics.themeTransitions.slice(-50);
    }
  }

  // Monitor component render performance
  measureRender(componentName, renderFn) {
    if (!this.isMonitoring) return renderFn();

    const startTime = performance.now();
    const result = renderFn();
    const endTime = performance.now();
    const duration = endTime - startTime;

    this.metrics.renderTimes.push({
      component: componentName,
      duration,
      timestamp: new Date().toISOString()
    });

    if (duration > 16.67) { // ~60fps threshold
      console.warn(`🐌 Slow render detected: ${componentName} took ${duration.toFixed(2)}ms`);
    }

    return result;
  }

  // Monitor memory usage
  checkMemoryUsage() {
    if (!this.isMonitoring || !performance.memory) return;

    const memory = {
      used: Math.round(performance.memory.usedJSHeapSize / 1024 / 1024),
      total: Math.round(performance.memory.totalJSHeapSize / 1024 / 1024),
      limit: Math.round(performance.memory.jsHeapSizeLimit / 1024 / 1024),
      timestamp: new Date().toISOString()
    };

    this.metrics.memoryUsage.push(memory);

    // Keep only last 100 memory snapshots
    if (this.metrics.memoryUsage.length > 100) {
      this.metrics.memoryUsage = this.metrics.memoryUsage.slice(-100);
    }

    // Warn if memory usage is high
    const usagePercent = (memory.used / memory.limit) * 100;
    if (usagePercent > 80) {
      console.warn(`🚨 High memory usage: ${memory.used}MB (${usagePercent.toFixed(1)}%)`);
    }

    return memory;
  }

  // Get performance report
  getPerformanceReport() {
    if (!this.isMonitoring) return null;

    const avgTransitionTime = this.metrics.themeTransitions.length > 0 
      ? this.metrics.themeTransitions.reduce((sum, t) => sum + t.duration, 0) / this.metrics.themeTransitions.length
      : 0;

    const avgRenderTime = this.metrics.renderTimes.length > 0
      ? this.metrics.renderTimes.reduce((sum, r) => sum + r.duration, 0) / this.metrics.renderTimes.length
      : 0;

    const currentMemory = this.checkMemoryUsage();

    return {
      themeTransitions: {
        total: this.metrics.themeTransitions.length,
        averageTime: avgTransitionTime.toFixed(2) + 'ms',
        slowTransitions: this.metrics.themeTransitions.filter(t => t.duration > 100).length,
        recent: this.metrics.themeTransitions.slice(-5)
      },
      rendering: {
        averageRenderTime: avgRenderTime.toFixed(2) + 'ms',
        slowRenders: this.metrics.renderTimes.filter(r => r.duration > 16.67).length,
        totalRenders: this.metrics.renderTimes.length
      },
      memory: currentMemory,
      recommendations: this.getRecommendations()
    };
  }

  // Get performance recommendations
  getRecommendations() {
    const recommendations = [];
    
    const slowTransitions = this.metrics.themeTransitions.filter(t => t.duration > 100);
    if (slowTransitions.length > 0) {
      recommendations.push({
        type: 'warning',
        message: `${slowTransitions.length} slow theme transitions detected. Consider optimizing CSS transitions.`
      });
    }

    const slowRenders = this.metrics.renderTimes.filter(r => r.duration > 16.67);
    if (slowRenders.length > 5) {
      recommendations.push({
        type: 'warning',
        message: `${slowRenders.length} slow renders detected. Consider using React.memo() or useMemo().`
      });
    }

    const currentMemory = this.metrics.memoryUsage[this.metrics.memoryUsage.length - 1];
    if (currentMemory && (currentMemory.used / currentMemory.limit) > 0.8) {
      recommendations.push({
        type: 'error',
        message: 'High memory usage detected. Check for memory leaks or optimize component lifecycle.'
      });
    }

    if (recommendations.length === 0) {
      recommendations.push({
        type: 'success',
        message: 'Theme system performance is optimal! 🚀'
      });
    }

    return recommendations;
  }

  // Clear all metrics
  clearMetrics() {
    this.metrics = {
      themeTransitions: [],
      renderTimes: [],
      memoryUsage: []
    };
    console.log('📊 Performance metrics cleared');
  }

  // Export metrics for analysis
  exportMetrics() {
    if (!this.isMonitoring) return null;
    
    const report = this.getPerformanceReport();
    const blob = new Blob([JSON.stringify(report, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    
    const a = document.createElement('a');
    a.href = url;
    a.download = `theme-performance-${new Date().getTime()}.json`;
    a.click();
    
    URL.revokeObjectURL(url);
    console.log('📈 Performance metrics exported');
  }
}

// Singleton instance
export const themePerformance = new ThemePerformanceMonitor();

// React hook for performance monitoring
export const useThemePerformance = () => {
  return {
    startTransition: themePerformance.startThemeTransition.bind(themePerformance),
    measureRender: themePerformance.measureRender.bind(themePerformance),
    checkMemory: themePerformance.checkMemoryUsage.bind(themePerformance),
    getReport: themePerformance.getPerformanceReport.bind(themePerformance),
    clearMetrics: themePerformance.clearMetrics.bind(themePerformance),
    exportMetrics: themePerformance.exportMetrics.bind(themePerformance)
  };
};

// Performance optimization utilities
export const optimizeThemeTransition = {
  // Preload theme-specific assets
  preloadThemeAssets: (theme) => {
    if (typeof window === 'undefined') return;
    
    // Preload critical CSS classes for the target theme
    const preloadClasses = theme === 'dark' 
      ? ['bg-gray-900', 'text-white', 'border-gray-700']
      : ['bg-white', 'text-gray-900', 'border-gray-200'];
    
    // Force browser to cache these styles
    const testElement = document.createElement('div');
    preloadClasses.forEach(className => {
      testElement.className = className;
    });
    document.body.appendChild(testElement);
    requestAnimationFrame(() => {
      document.body.removeChild(testElement);
    });
  },

  // Debounce theme changes to prevent rapid switching
  createDebouncedThemeChange: (changeFn, delay = 150) => {
    let timeoutId;
    return (...args) => {
      clearTimeout(timeoutId);
      timeoutId = setTimeout(() => changeFn(...args), delay);
    };
  },

  // Batch DOM updates for theme changes
  batchThemeUpdates: (updates) => {
    if (typeof window === 'undefined') return;
    
    // Use requestAnimationFrame to batch updates
    requestAnimationFrame(() => {
      updates.forEach(update => update());
    });
  }
};

// Development-only performance debugging
if (process.env.NODE_ENV === 'development') {
  // Add global access for debugging
  window.themePerformance = themePerformance;
  
  // Set up automatic memory monitoring
  setInterval(() => {
    themePerformance.checkMemoryUsage();
  }, 10000); // Check every 10 seconds
  
  console.log('🔧 Theme performance monitoring enabled');
  console.log('Use window.themePerformance.getReport() to see metrics');
}
