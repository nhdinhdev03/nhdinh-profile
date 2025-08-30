import React from 'react';
import { motion } from 'framer-motion';

const ResponsiveGrid = ({ 
  children, 
  className = '',
  cols = {
    xs: 1,
    sm: 2,
    md: 3,
    lg: 4,
    xl: 4
  },
  gap = 'gap-4 sm:gap-6 lg:gap-8',
  ...props 
}) => {
  const getGridCols = () => {
    const { xs, sm, md, lg, xl } = cols;
    return `grid-cols-${xs} sm:grid-cols-${sm} md:grid-cols-${md} lg:grid-cols-${lg} xl:grid-cols-${xl}`;
  };

  return (
    <motion.div
      className={`grid ${getGridCols()} ${gap} ${className}`}
      {...props}
    >
      {children}
    </motion.div>
  );
};

export default ResponsiveGrid;
