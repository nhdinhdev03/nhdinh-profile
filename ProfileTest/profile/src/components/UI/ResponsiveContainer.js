import React from 'react';
import { motion } from 'framer-motion';

const ResponsiveContainer = ({ 
  children, 
  className = '', 
  maxWidth = 'max-w-7xl',
  padding = 'px-4 sm:px-6 lg:px-8',
  ...props 
}) => {
  return (
    <motion.div
      className={`mx-auto ${maxWidth} ${padding} ${className}`}
      {...props}
    >
      {children}
    </motion.div>
  );
};

export default ResponsiveContainer;
