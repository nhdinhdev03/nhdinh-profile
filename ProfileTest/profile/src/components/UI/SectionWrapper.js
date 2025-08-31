import React from 'react';
import { motion } from 'framer-motion';

const SectionWrapper = ({ children, className = "" }) => {
  return (
    <motion.div 
      className={`relative min-h-screen ${className}`}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.6 }}
    >
      {/* Background overlay for better contrast */}
      <div className="absolute inset-0 bg-black/10 pointer-events-none" />
      
      {/* Content */}
      <div className="relative z-10">
        {children}
      </div>
    </motion.div>
  );
};

export default SectionWrapper;
