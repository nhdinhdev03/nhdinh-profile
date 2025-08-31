import React, { useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useLocation } from 'react-router-dom';
import { usePerformanceOptimization } from '../../hooks/usePerformanceOptimization';

const PageTransition = ({ children }) => {
  const location = useLocation();
  const { shouldReduceAnimations, deviceCapabilities } = usePerformanceOptimization();

  // Memoized variants for better performance
  const pageVariants = useMemo(() => {
    if (shouldReduceAnimations || deviceCapabilities.isLowEndDevice) {
      return {
        initial: { opacity: 0 },
        in: { opacity: 1 },
        out: { opacity: 0 }
      };
    }

    return {
      initial: {
        opacity: 0,
        scale: 0.98,
        y: 10
      },
      in: {
        opacity: 1,
        scale: 1,
        y: 0
      },
      out: {
        opacity: 0,
        scale: 1.02,
        y: -10
      }
    };
  }, [shouldReduceAnimations, deviceCapabilities.isLowEndDevice]);

  const pageTransition = useMemo(() => ({
    type: "tween",
    ease: "easeInOut",
    duration: shouldReduceAnimations ? 0.2 : 0.4
  }), [shouldReduceAnimations]);

  return (
    <AnimatePresence mode="wait" initial={false}>
      <motion.div
        key={location.pathname}
        initial="initial"
        animate="in"
        exit="out"
        variants={pageVariants}
        transition={pageTransition}
        className="w-full"
      >
        {children}
      </motion.div>
    </AnimatePresence>
  );
};

export default PageTransition;
