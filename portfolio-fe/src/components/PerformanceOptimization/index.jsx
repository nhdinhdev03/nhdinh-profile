import React, { memo, useMemo } from 'react';
import { useDeviceCapability } from 'hooks/useDeviceCapability';

/**
 * HOC để tối ưu hiệu năng cho components với animations phức tạp
 * @param {React.Component} WrappedComponent - Component cần tối ưu
 * @param {object} options - Tùy chọn tối ưu
 */
export const withPerformanceOptimization = (WrappedComponent, options = {}) => {
  const {
    enableParticles = true,
    enableAnimations = true,
    enableParallax = true,
    name = 'OptimizedComponent'
  } = options;

  const OptimizedComponent = memo((props) => {
    const { isLowPerformance, isMobile, performanceSettings } = useDeviceCapability();

    // Tính toán props tối ưu dựa trên khả năng thiết bị
    const optimizedProps = useMemo(() => {
      const baseProps = { ...props };

      // Tắt particles trên thiết bị yếu
      if (enableParticles && (isLowPerformance || !performanceSettings.enableComplexAnimations)) {
        baseProps.particleCount = 0;
        baseProps.disableParticles = true;
      }

      // Giảm animations trên mobile/low-performance
      if (enableAnimations) {
        baseProps.animationDuration = performanceSettings.animationDuration;
        baseProps.disableComplexAnimations = !performanceSettings.enableComplexAnimations;
      }

      // Tắt parallax trên thiết bị yếu
      if (enableParallax) {
        baseProps.enableParallax = performanceSettings.enableParallax;
      }

      // Thêm performance class
      baseProps.className = `${baseProps.className || ''} ${
        isLowPerformance ? 'low-performance' : ''
      } ${isMobile ? 'mobile-optimized' : ''}`.trim();

      return baseProps;
    }, [props, isLowPerformance, isMobile, performanceSettings]);

    return React.createElement(WrappedComponent, optimizedProps);
  });

  OptimizedComponent.displayName = `withPerformanceOptimization(${name})`;
  return OptimizedComponent;
};

/**
 * Component wrapper cho conditional rendering dựa trên performance
 */
export const PerformanceGate = memo(({ 
  children, 
  fallback = null, 
  requireHighPerformance = false,
  requireDesktop = false 
}) => {
  const { isLowPerformance, isMobile } = useDeviceCapability();

  // Kiểm tra điều kiện render
  const shouldRender = useMemo(() => {
    if (requireHighPerformance && isLowPerformance) return false;
    if (requireDesktop && isMobile) return false;
    return true;
  }, [isLowPerformance, isMobile, requireHighPerformance, requireDesktop]);

  return shouldRender ? children : fallback;
});

PerformanceGate.displayName = 'PerformanceGate';

export default withPerformanceOptimization;