import { useState, useEffect, useCallback } from 'react';

/**
 * Custom hook for optimizing performance based on device capabilities
 * and user preferences
 */
export const usePerformanceOptimization = () => {
  const [performanceMode, setPerformanceMode] = useState('auto');
  const [shouldReduceAnimations, setShouldReduceAnimations] = useState(false);
  const [deviceCapabilities, setDeviceCapabilities] = useState({
    isLowEndDevice: false,
    supportsCSSAnimations: true,
    supportsWebGL: false,
    connectionSpeed: 'fast'
  });

  // Detect device capabilities
  useEffect(() => {
    const checkDeviceCapabilities = () => {
      // Check for low-end device indicators
      const isLowEndDevice = 
        navigator.hardwareConcurrency <= 2 || 
        navigator.deviceMemory <= 4 ||
        /Android.*[23456789]\./i.test(navigator.userAgent);

      // Check WebGL support
      const canvas = document.createElement('canvas');
      const gl = canvas.getContext('webgl') || canvas.getContext('experimental-webgl');
      const supportsWebGL = !!gl;

      // Check connection speed
      const connection = navigator.connection || navigator.mozConnection || navigator.webkitConnection;
      const connectionSpeed = connection ? 
        (connection.effectiveType === '4g' ? 'fast' : 
         connection.effectiveType === '3g' ? 'medium' : 'slow') : 'fast';

      // Check CSS animation support
      const supportsCSSAnimations = 
        'animation' in document.documentElement.style ||
        'webkitAnimation' in document.documentElement.style;

      setDeviceCapabilities({
        isLowEndDevice,
        supportsCSSAnimations,
        supportsWebGL,
        connectionSpeed
      });

      // Auto-adjust performance mode
      if (isLowEndDevice || connectionSpeed === 'slow') {
        setPerformanceMode('performance');
        setShouldReduceAnimations(true);
      }
    };

    checkDeviceCapabilities();

    // Listen for connection changes
    const connection = navigator.connection || navigator.mozConnection || navigator.webkitConnection;
    if (connection) {
      connection.addEventListener('change', checkDeviceCapabilities);
      return () => connection.removeEventListener('change', checkDeviceCapabilities);
    }
  }, []);

  // Check for reduced motion preference
  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    setShouldReduceAnimations(mediaQuery.matches);

    const handleChange = (e) => setShouldReduceAnimations(e.matches);
    mediaQuery.addEventListener('change', handleChange);
    
    return () => mediaQuery.removeEventListener('change', handleChange);
  }, []);

  // Optimize based on visibility
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    const handleVisibilityChange = () => {
      setIsVisible(!document.hidden);
    };

    document.addEventListener('visibilitychange', handleVisibilityChange);
    return () => document.removeEventListener('visibilitychange', handleVisibilityChange);
  }, []);

  // Get optimized animation configs
  const getAnimationConfig = useCallback((baseConfig) => {
    if (shouldReduceAnimations || !isVisible) {
      return { ...baseConfig, duration: 0, transition: { duration: 0 } };
    }

    if (performanceMode === 'performance') {
      return {
        ...baseConfig,
        duration: (baseConfig.duration || 1) * 0.5,
        transition: {
          ...baseConfig.transition,
          duration: (baseConfig.transition?.duration || 1) * 0.5
        }
      };
    }

    return baseConfig;
  }, [shouldReduceAnimations, isVisible, performanceMode]);

  // Get optimized particle count
  const getOptimizedParticleCount = useCallback((baseCount) => {
    if (deviceCapabilities.isLowEndDevice) return Math.floor(baseCount * 0.3);
    if (performanceMode === 'performance') return Math.floor(baseCount * 0.5);
    return baseCount;
  }, [deviceCapabilities.isLowEndDevice, performanceMode]);

  return {
    performanceMode,
    shouldReduceAnimations,
    deviceCapabilities,
    isVisible,
    getAnimationConfig,
    getOptimizedParticleCount,
    setPerformanceMode
  };
};

export default usePerformanceOptimization;
