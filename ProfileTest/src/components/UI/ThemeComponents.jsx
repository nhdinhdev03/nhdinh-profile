import React from 'react';
import { motion } from 'framer-motion';
import { useTheme } from '../../contexts/ThemeContext';

/**
 * Theme-aware card component with optimized styling
 */
export const ThemeCard = ({ 
  children, 
  className = '', 
  variant = 'default',
  hover = true,
  ...props 
}) => {
  const { isDark } = useTheme();
  
  const variants = {
    default: `backdrop-blur-sm border rounded-xl p-6 transition-all duration-300 ${
      isDark 
        ? 'bg-gray-800/50 border-gray-700 hover:border-gray-600' 
        : 'bg-white/80 border-gray-200 hover:border-gray-300'
    }`,
    glass: `backdrop-blur-lg border rounded-2xl p-6 transition-all duration-300 ${
      isDark 
        ? 'bg-gray-900/30 border-gray-700/50' 
        : 'bg-white/30 border-gray-200/50'
    }`,
    solid: `border rounded-xl p-6 transition-all duration-300 ${
      isDark 
        ? 'bg-gray-800 border-gray-700' 
        : 'bg-white border-gray-200'
    }`,
    gradient: `border rounded-xl p-6 transition-all duration-300 ${
      isDark 
        ? 'bg-gradient-to-br from-gray-800/80 to-gray-900/80 border-gray-700' 
        : 'bg-gradient-to-br from-white/80 to-gray-50/80 border-gray-200'
    }`
  };

  const hoverClasses = hover ? (
    isDark 
      ? 'hover:shadow-lg hover:shadow-cyan-500/10 hover:-translate-y-1' 
      : 'hover:shadow-lg hover:shadow-gray-300/30 hover:-translate-y-1'
  ) : '';

  return (
    <motion.div
      className={`${variants[variant]} ${hoverClasses} ${className}`}
      whileHover={hover ? { scale: 1.02 } : {}}
      transition={{ duration: 0.3, ease: "easeOut" }}
      {...props}
    >
      {children}
    </motion.div>
  );
};

/**
 * Theme-aware button component
 */
export const ThemeButton = ({
  children,
  variant = 'primary',
  size = 'md',
  className = '',
  ...props
}) => {
  const { isDark } = useTheme();

  const variants = {
    primary: `text-white font-semibold transition-all duration-300 transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-offset-2 ${
      isDark 
        ? 'bg-gradient-to-r from-cyan-500 to-purple-500 hover:from-cyan-400 hover:to-purple-400 focus:ring-cyan-400' 
        : 'bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-400 hover:to-purple-400 focus:ring-blue-400'
    }`,
    secondary: `font-semibold transition-all duration-300 transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-offset-2 border-2 ${
      isDark 
        ? 'bg-transparent border-gray-600 text-gray-300 hover:border-cyan-400 hover:text-cyan-400 focus:ring-cyan-400' 
        : 'bg-transparent border-gray-300 text-gray-700 hover:border-blue-400 hover:text-blue-600 focus:ring-blue-400'
    }`,
    ghost: `font-semibold transition-all duration-300 hover:scale-105 focus:outline-none focus:ring-2 focus:ring-offset-2 ${
      isDark 
        ? 'text-gray-300 hover:text-cyan-400 hover:bg-gray-800/50 focus:ring-cyan-400' 
        : 'text-gray-600 hover:text-blue-600 hover:bg-gray-100/50 focus:ring-blue-400'
    }`
  };

  const sizes = {
    sm: 'px-4 py-2 text-sm rounded-lg',
    md: 'px-6 py-3 text-base rounded-xl',
    lg: 'px-8 py-4 text-lg rounded-2xl'
  };

  return (
    <motion.button
      className={`${variants[variant]} ${sizes[size]} ${className}`}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      {...props}
    >
      {children}
    </motion.button>
  );
};

/**
 * Theme-aware text component
 */
export const ThemeText = ({
  children,
  variant = 'body',
  className = '',
  ...props
}) => {
  const { isDark } = useTheme();

  const variants = {
    heading: isDark ? 'text-white font-bold' : 'text-gray-900 font-bold',
    subheading: isDark ? 'text-gray-200 font-semibold' : 'text-gray-800 font-semibold',
    body: isDark ? 'text-gray-300' : 'text-gray-600',
    caption: isDark ? 'text-gray-400 text-sm' : 'text-gray-500 text-sm',
    accent: isDark ? 'text-cyan-400 font-medium' : 'text-blue-600 font-medium',
    muted: isDark ? 'text-gray-500' : 'text-gray-400'
  };

  const Component = variant.includes('heading') ? 'h2' : 'p';

  return (
    <Component
      className={`${variants[variant]} ${className}`}
      {...props}
    >
      {children}
    </Component>
  );
};

/**
 * Theme-aware input component
 */
export const ThemeInput = ({
  className = '',
  ...props
}) => {
  const { isDark } = useTheme();

  const baseClasses = `w-full px-4 py-3 rounded-xl border transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-offset-2 ${
    isDark 
      ? 'bg-gray-800/50 border-gray-700 text-white placeholder-gray-400 focus:border-cyan-400 focus:ring-cyan-400' 
      : 'bg-white border-gray-300 text-gray-900 placeholder-gray-500 focus:border-blue-400 focus:ring-blue-400'
  }`;

  return (
    <input
      className={`${baseClasses} ${className}`}
      {...props}
    />
  );
};

/**
 * Theme toggle widget for settings pages
 */
export const ThemeSelector = ({ className = '' }) => {
  const { themeMode, setTheme, systemTheme, effectiveTheme } = useTheme();

  const options = [
    { value: 'light', label: 'Light', icon: '☀️' },
    { value: 'dark', label: 'Dark', icon: '🌙' },
    { value: 'auto', label: 'System', icon: '💻' }
  ];

  return (
    <div className={`space-y-3 ${className}`}>
      <ThemeText variant="subheading">Theme Preference</ThemeText>
      
      <div className="grid grid-cols-3 gap-2">
        {options.map(({ value, label, icon }) => (
          <motion.button
            key={value}
            onClick={() => setTheme(value)}
            className={`p-3 rounded-xl border-2 transition-all duration-300 text-center ${
              themeMode === value
                ? 'border-cyan-400 bg-cyan-400/10'
                : 'border-gray-300 dark:border-gray-700 hover:border-gray-400 dark:hover:border-gray-600'
            }`}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            <div className="text-2xl mb-1">{icon}</div>
            <div className="text-sm font-medium">
              <ThemeText variant={themeMode === value ? 'accent' : 'body'}>
                {label}
              </ThemeText>
            </div>
            {value === 'auto' && (
              <div className="text-xs mt-1">
                <ThemeText variant="caption">
                  ({systemTheme})
                </ThemeText>
              </div>
            )}
          </motion.button>
        ))}
      </div>
      
      <div className="text-center">
        <ThemeText variant="caption">
          Current: {effectiveTheme} mode
        </ThemeText>
      </div>
    </div>
  );
};

const ThemeComponents = {
  ThemeCard,
  ThemeButton,
  ThemeText,
  ThemeInput,
  ThemeSelector
};

export default ThemeComponents;
