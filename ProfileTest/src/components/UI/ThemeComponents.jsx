import React from 'react';
import { motion } from 'framer-motion';
import { useTheme } from '../../contexts/ThemeContext';


export const ThemeCard = ({ 
  children, 
  className = '', 
  variant = 'default',
  hover = true,
  ...props 
}) => {
  const variants = {
    default: 'theme-bg-card theme-border border rounded-xl p-6 transition-all duration-300 backdrop-blur-sm',
    glass: 'backdrop-blur-lg border rounded-2xl p-6 transition-all duration-300 bg-white/10 dark:bg-black/20 border-white/20 dark:border-white/10',
    solid: 'theme-bg-card theme-border border rounded-xl p-6 transition-all duration-300',
    gradient: 'theme-bg-card theme-border border rounded-xl p-6 transition-all duration-300 bg-gradient-to-br from-white/80 to-gray-50/80 dark:from-gray-800/80 dark:to-gray-900/80'
  };

  const hoverClasses = hover ? 'hover:shadow-lg hover:-translate-y-1 hover:scale-[1.02]' : '';

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
  const variants = {
    primary: 'text-white font-semibold transition-all duration-300 transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-offset-2 bg-gradient-to-r from-blue-600 to-cyan-500 hover:from-blue-500 hover:to-cyan-400 focus:ring-blue-400',
    secondary: 'theme-text-primary font-semibold transition-all duration-300 transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-offset-2 border-2 theme-border theme-bg-secondary hover:opacity-80',
    ghost: 'theme-text-primary font-semibold transition-all duration-300 hover:theme-bg-secondary focus:outline-none focus:ring-2 focus:ring-offset-2',
    outline: 'font-semibold transition-all duration-300 transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-offset-2 border-2 border-blue-500 text-blue-600 dark:text-blue-400 hover:bg-blue-50 dark:hover:bg-blue-900/20'
  };

  const sizes = {
    sm: 'px-4 py-2 text-sm rounded-lg',
    md: 'px-6 py-3 text-base rounded-xl',
    lg: 'px-8 py-4 text-lg rounded-xl'
  };

  return (
    <motion.button
      className={`${variants[variant]} ${sizes[size]} ${className}`}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      transition={{ duration: 0.2 }}
      {...props}
    >
      {children}
    </motion.button>
  );
};

/**
 * Theme-aware input component
 */
export const ThemeInput = ({
  className = '',
  variant = 'default',
  ...props
}) => {
  const variants = {
    default: 'w-full theme-bg-secondary theme-text-primary theme-border border rounded-xl px-4 py-3 transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500',
    ghost: 'w-full bg-transparent theme-text-primary border-b-2 theme-border px-4 py-3 transition-all duration-300 focus:outline-none focus:border-blue-500',
    filled: 'w-full theme-bg-tertiary theme-text-primary rounded-xl px-4 py-3 transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-blue-500'
  };

  return (
    <motion.input
      className={`${variants[variant]} ${className}`}
      whileFocus={{ scale: 1.02 }}
      transition={{ duration: 0.2 }}
      {...props}
    />
  );
};

/**
 * Theme-aware text component
 */
export const ThemeText = ({
  children,
  variant = 'primary',
  className = '',
  as: Component = 'p',
  ...props
}) => {
  const variants = {
    primary: 'theme-text-primary',
    secondary: 'theme-text-secondary',
    muted: 'theme-text-muted',
    accent: 'theme-text-accent',
    success: 'text-emerald-600 dark:text-emerald-400',
    warning: 'text-amber-600 dark:text-amber-400',
    error: 'text-red-600 dark:text-red-400',
    info: 'text-blue-600 dark:text-blue-400'
  };

  return (
    <Component className={`${variants[variant]} ${className}`} {...props}>
      {children}
    </Component>
  );
};

/**
 * Theme-aware container component
 */
export const ThemeContainer = ({
  children,
  variant = 'default',
  className = '',
  ...props
}) => {
  const variants = {
    default: 'theme-bg-primary',
    surface: 'theme-bg-secondary',
    card: 'theme-bg-card',
    glass: 'backdrop-blur-xl bg-white/10 dark:bg-black/20'
  };

  return (
    <div className={`${variants[variant]} ${className}`} {...props}>
      {children}
    </div>
  );
};

/**
 * Theme toggle component
 */
export const ThemeToggle = ({ className = '', ...props }) => {
  const { isDark, toggleTheme } = useTheme();

  return (
    <motion.button
      onClick={toggleTheme}
      className={`p-3 rounded-xl theme-bg-secondary theme-text-primary theme-border border transition-all duration-300 hover:scale-110 focus:outline-none focus:ring-2 focus:ring-blue-500 ${className}`}
      whileHover={{ scale: 1.1, rotate: 180 }}
      whileTap={{ scale: 0.9 }}
      transition={{ duration: 0.3 }}
      {...props}
    >
      {isDark ? (
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" />
        </svg>
      ) : (
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" />
        </svg>
      )}
    </motion.button>
  );
};

/**
 * Theme selector component (alias for ThemeToggle)
 */
export const ThemeSelector = ThemeToggle;

const themeComponentsDefault = {
  ThemeCard,
  ThemeButton,
  ThemeInput,
  ThemeText,
  ThemeContainer,
  ThemeToggle,
  ThemeSelector
};

export default themeComponentsDefault;
