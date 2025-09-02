// Modern theme utility functions using CSS variables

export const getThemeBackground = (variant = 'default') => {
  const backgrounds = {
    default: 'theme-bg-primary',
    hero: 'theme-bg-primary bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-slate-900 dark:to-slate-800',
    card: 'theme-bg-card theme-shadow rounded-xl backdrop-blur-sm',
    surface: 'theme-bg-secondary',
    glass: 'backdrop-blur-xl bg-white/10 dark:bg-black/20 border border-white/20 dark:border-white/10',
    overlay: 'bg-black/50 dark:bg-black/70'
  };

  return backgrounds[variant] || backgrounds.default;
};

export const getThemeText = (variant = 'primary') => {
  const textColors = {
    primary: 'theme-text-primary',
    secondary: 'theme-text-secondary',
    muted: 'theme-text-muted',
    accent: 'theme-text-accent',
    success: 'text-emerald-600 dark:text-emerald-400',
    warning: 'text-amber-600 dark:text-amber-400',
    error: 'text-red-600 dark:text-red-400',
    info: 'text-blue-600 dark:text-blue-400'
  };

  return textColors[variant] || textColors.primary;
};

export const getThemeBorder = (variant = 'default') => {
  const borders = {
    default: 'theme-border',
    accent: 'border-blue-500/50',
    muted: 'border-gray-300 dark:border-gray-600',
    glass: 'border-white/20 dark:border-white/10'
  };

  return borders[variant] || borders.default;
};

export const getThemeGradient = (variant = 'neural') => {
  const gradients = {
    neural: 'linear-gradient(90deg, rgba(59, 130, 246, 0.1) 1px, transparent 1px), linear-gradient(rgba(59, 130, 246, 0.1) 1px, transparent 1px)',
    radial: 'radial-gradient(circle, rgba(59, 130, 246, 0.15) 0%, transparent 70%)',
    primary: 'bg-gradient-to-r from-blue-600 to-cyan-500 dark:from-blue-500 dark:to-cyan-400',
    accent: 'bg-gradient-to-r from-purple-600 to-pink-500 dark:from-purple-500 dark:to-pink-400',
    hero: 'bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-slate-900 dark:to-slate-800'
  };

  return gradients[variant] || gradients.neural;
};

export const getThemeButton = (variant = 'primary') => {
  const buttons = {
    primary: 'bg-gradient-to-r from-blue-600 to-cyan-500 hover:from-blue-500 hover:to-cyan-400 text-white shadow-lg theme-shadow',
    secondary: 'theme-bg-secondary theme-text-primary theme-border border hover:opacity-80',
    ghost: 'hover:theme-bg-secondary theme-text-primary',
    outline: 'border-2 border-blue-500 text-blue-600 dark:text-blue-400 hover:bg-blue-50 dark:hover:bg-blue-900/20'
  };

  return buttons[variant] || buttons.primary;
};

export const getThemeCard = (variant = 'default') => {
  const cards = {
    default: 'theme-bg-card theme-border border rounded-xl p-6 theme-shadow',
    glass: 'backdrop-blur-xl bg-white/10 dark:bg-black/20 border border-white/20 dark:border-white/10 rounded-xl p-6',
    elevated: 'theme-bg-card theme-border border rounded-xl p-6 shadow-xl',
    flat: 'theme-bg-secondary theme-border border rounded-lg p-4'
  };

  return cards[variant] || cards.default;
};

// Generate comprehensive theme classes for a component
export const generateThemeClasses = (theme) => {
  return {
    background: getThemeBackground(),
    text: getThemeText(),
    card: getThemeBackground('card'),
    border: getThemeBorder(),
    button: getThemeButton(),
    gradient: getThemeGradient()
  };
};

// Get theme-aware shadow classes
export const getThemeShadow = (intensity = 'default') => {
  const shadows = {
    none: 'shadow-none',
    sm: 'shadow-sm',
    default: 'theme-shadow',
    lg: 'shadow-lg',
    xl: 'shadow-xl',
    glow: 'shadow-lg shadow-blue-500/25 dark:shadow-blue-400/25'
  };

  return shadows[intensity] || shadows.default;
};

// Animation classes that work with theme
export const getThemeAnimation = (type = 'fadeIn') => {
  const animations = {
    fadeIn: 'animate-fadeInUp',
    float: 'animate-float',
    pulse: 'animate-pulse-glow',
    bounce: 'animate-bounce',
    spin: 'animate-spin'
  };

  return animations[type] || animations.fadeIn;
};

// Get theme-aware particle colors
export const getThemeParticleColor = (theme = 'dark', intensity = 'default') => {
  const colors = {
    light: {
      default: 'rgba(59, 130, 246, 0.3)',
      strong: 'rgba(59, 130, 246, 0.5)',
      subtle: 'rgba(59, 130, 246, 0.1)'
    },
    dark: {
      default: 'rgba(34, 197, 94, 0.4)',
      strong: 'rgba(34, 197, 94, 0.6)',
      subtle: 'rgba(34, 197, 94, 0.2)'
    }
  };

  return colors[theme]?.[intensity] || colors.dark.default;
};

const themeUtilsDefault = {
  getThemeBackground,
  getThemeText,
  getThemeBorder,
  getThemeGradient,
  getThemeButton,
  getThemeCard,
  generateThemeClasses,
  getThemeShadow,
  getThemeAnimation,
  getThemeParticleColor
};

export default themeUtilsDefault;
