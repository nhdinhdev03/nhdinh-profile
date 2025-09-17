import React, { memo, useMemo } from 'react';
import PropTypes from 'prop-types';
import { motion, AnimatePresence } from 'framer-motion';
import { useLocation } from 'react-router-dom';

const PageTransition = memo(({ children }) => {
  const location = useLocation();

  // Detect mobile for performance optimization
  const isMobile = useMemo(() => 
    typeof window !== 'undefined' && window.innerWidth <= 768, 
    []
  );
  
  // Detect low-performance devices
  const isLowPerformance = useMemo(() => 
    typeof navigator !== 'undefined' && 
    (navigator.hardwareConcurrency <= 4 || 
     /Android|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)),
    []
  );

  // Ultra-optimized variants for mobile performance
  const pageVariants = useMemo(() => ({
    initial: {
      opacity: 0,
      y: isMobile || isLowPerformance ? 2 : 4, // Even more minimal movement
    },
    enter: {
      opacity: 1,
      y: 0,
      transition: {
        duration: isMobile || isLowPerformance ? 0.15 : 0.2, // Faster on weak devices
        ease: "easeOut",
      },
    },
    exit: {
      opacity: 0,
      y: isMobile || isLowPerformance ? -1 : -2, // Minimal movement
      transition: {
        duration: isMobile || isLowPerformance ? 0.1 : 0.1, // Very fast exit
        ease: "easeIn",
      },
    },
  }), [isMobile, isLowPerformance]);

  // Use even simpler animations on very weak devices
  const mobileVariants = useMemo(() => ({
    initial: { opacity: 0 },
    enter: { 
      opacity: 1,
      transition: { duration: 0.1, ease: "easeOut" } // Super fast
    },
    exit: { 
      opacity: 0,
      transition: { duration: 0.05, ease: "easeIn" } // Almost instant
    },
  }), []);

  const variants = (isMobile && isLowPerformance) ? mobileVariants : pageVariants;

  return (
    <AnimatePresence mode="wait" initial={false}>
      <motion.div
        key={location.pathname}
        initial="initial"
        animate="enter"
        exit="exit"
        variants={variants}
        style={{
          width: '100%',
          minHeight: '100vh',
          position: 'relative',
          // Optimize for performance based on device capability
          willChange: (isMobile || isLowPerformance) ? 'opacity' : 'transform, opacity',
          transform: 'translateZ(0)', // Force hardware acceleration
          // Prevent layout shifts
          contain: 'layout style',
        }}
      >
        {children}
      </motion.div>
    </AnimatePresence>
  );
});

PageTransition.propTypes = {
  children: PropTypes.node.isRequired,
};

export default PageTransition;
