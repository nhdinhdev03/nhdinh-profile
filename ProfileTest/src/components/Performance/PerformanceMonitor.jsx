import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const PerformanceMonitor = () => {
  const [metrics, setMetrics] = useState({
    fps: 0,
    memory: 0,
    loadTime: 0,
    renderTime: 0
  });
  const [showMonitor, setShowMonitor] = useState(false);

  useEffect(() => {
    // Performance observer for measuring render times
    if ('PerformanceObserver' in window) {
      const observer = new PerformanceObserver((list) => {
        const entries = list.getEntries();
        entries.forEach((entry) => {
          if (entry.entryType === 'measure') {
            setMetrics(prev => ({
              ...prev,
              renderTime: Math.round(entry.duration)
            }));
          }
        });
      });
      observer.observe({ entryTypes: ['measure'] });
    }

    // FPS monitoring
    let frameCount = 0;
    let lastTime = performance.now();
    const measureFPS = () => {
      frameCount++;
      const currentTime = performance.now();
      if (currentTime >= lastTime + 1000) {
        setMetrics(prev => ({
          ...prev,
          fps: Math.round((frameCount * 1000) / (currentTime - lastTime))
        }));
        frameCount = 0;
        lastTime = currentTime;
      }
      requestAnimationFrame(measureFPS);
    };
    measureFPS();

    // Memory usage (if available)
    if ('memory' in performance) {
      const updateMemory = () => {
        setMetrics(prev => ({
          ...prev,
          memory: Math.round(performance.memory.usedJSHeapSize / 1048576)
        }));
      };
      const memoryInterval = setInterval(updateMemory, 2000);
      return () => clearInterval(memoryInterval);
    }

    // Page load time
    window.addEventListener('load', () => {
      setMetrics(prev => ({
        ...prev,
        loadTime: Math.round(performance.now())
      }));
    });

    // Toggle monitor with keyboard shortcut
    const handleKeyPress = (e) => {
      if (e.ctrlKey && e.shiftKey && e.key === 'P') {
        setShowMonitor(prev => !prev);
      }
    };
    document.addEventListener('keydown', handleKeyPress);
    return () => document.removeEventListener('keydown', handleKeyPress);
  }, []);

  return (
    <AnimatePresence>
      {showMonitor && (
        <motion.div
          initial={{ opacity: 0, x: 300 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: 300 }}
          className="fixed top-4 right-4 z-[9999] bg-black/80 backdrop-blur-md border border-cyan-500/30 rounded-lg p-4 text-cyan-400 font-mono text-sm"
        >
          <div className="flex items-center justify-between mb-2">
            <h3 className="font-semibold">Performance Monitor</h3>
            <button
              onClick={() => setShowMonitor(false)}
              className="text-gray-400 hover:text-white transition-colors"
            >
              ×
            </button>
          </div>
          <div className="space-y-1">
            <div className="flex justify-between">
              <span>FPS:</span>
              <span className={metrics.fps >= 60 ? 'text-green-400' : metrics.fps >= 30 ? 'text-yellow-400' : 'text-red-400'}>
                {metrics.fps}
              </span>
            </div>
            <div className="flex justify-between">
              <span>Memory:</span>
              <span className={metrics.memory < 50 ? 'text-green-400' : metrics.memory < 100 ? 'text-yellow-400' : 'text-red-400'}>
                {metrics.memory}MB
              </span>
            </div>
            <div className="flex justify-between">
              <span>Load:</span>
              <span className={metrics.loadTime < 2000 ? 'text-green-400' : metrics.loadTime < 4000 ? 'text-yellow-400' : 'text-red-400'}>
                {metrics.loadTime}ms
              </span>
            </div>
            <div className="flex justify-between">
              <span>Render:</span>
              <span className={metrics.renderTime < 16 ? 'text-green-400' : metrics.renderTime < 32 ? 'text-yellow-400' : 'text-red-400'}>
                {metrics.renderTime}ms
              </span>
            </div>
          </div>
          <div className="mt-2 text-xs text-gray-500">
            Ctrl+Shift+P to toggle
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default PerformanceMonitor;
