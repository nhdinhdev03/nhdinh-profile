import React from 'react';
import { motion } from 'framer-motion';

const ResponsiveText = ({ 
  as: Component = 'p',
  size = 'base',
  className = '',
  children,
  responsive = true,
  ...props 
}) => {
  const getTextSize = () => {
    if (!responsive) return `text-${size}`;
    
    const sizeMap = {
      'xs': 'text-xs sm:text-sm',
      'sm': 'text-sm sm:text-base',
      'base': 'text-base sm:text-lg',
      'lg': 'text-lg sm:text-xl',
      'xl': 'text-xl sm:text-2xl',
      '2xl': 'text-2xl sm:text-3xl',
      '3xl': 'text-3xl sm:text-4xl lg:text-5xl',
      '4xl': 'text-4xl sm:text-5xl lg:text-6xl',
      '5xl': 'text-5xl sm:text-6xl lg:text-7xl',
      '6xl': 'text-6xl sm:text-7xl lg:text-8xl'
    };
    
    return sizeMap[size] || `text-${size}`;
  };

  return (
    <Component
      className={`${getTextSize()} ${className}`}
      {...props}
    >
      {children}
    </Component>
  );
};

export default ResponsiveText;
