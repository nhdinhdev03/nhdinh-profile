// Theme utility functions for consistent styling across all pages

export const getThemeBackground = (theme, variant = 'default') => {
  const backgrounds = {
    default: {
      dark: 'bg-gray-900',
      light: 'bg-gradient-to-br from-gray-50 via-white to-blue-50'
    },
    hero: {
      dark: 'bg-gradient-to-br from-gray-900 via-black to-purple-900',
      light: 'bg-gradient-to-br from-blue-50 via-white to-purple-50'
    },
    card: {
      dark: 'bg-gray-900/50 backdrop-blur-sm border-gray-800',
      light: 'bg-white/70 backdrop-blur-sm border-gray-200'
    },
    surface: {
      dark: 'bg-gray-800/50',
      light: 'bg-white/80'
    }
  };

  return backgrounds[variant]?.[theme] || backgrounds.default[theme];
};

export const getThemeText = (theme, variant = 'primary') => {
  const textColors = {
    primary: {
      dark: 'text-white',
      light: 'text-gray-900'
    },
    secondary: {
      dark: 'text-gray-400',
      light: 'text-gray-600'
    },
    accent: {
      dark: 'text-cyan-400',
      light: 'text-blue-600'
    },
    muted: {
      dark: 'text-gray-500',
      light: 'text-gray-500'
    }
  };

  return textColors[variant]?.[theme] || textColors.primary[theme];
};

export const getThemeBorder = (theme, variant = 'default') => {
  const borders = {
    default: {
      dark: 'border-gray-700',
      light: 'border-gray-200'
    },
    accent: {
      dark: 'border-cyan-500/50',
      light: 'border-blue-500/50'
    },
    muted: {
      dark: 'border-gray-800',
      light: 'border-gray-100'
    }
  };

  return borders[variant]?.[theme] || borders.default[theme];
};

export const getThemeGradient = (theme, variant = 'neural') => {
  const gradients = {
    neural: {
      dark: `
        linear-gradient(90deg, rgba(59, 130, 246, 0.1) 1px, transparent 1px),
        linear-gradient(rgba(59, 130, 246, 0.1) 1px, transparent 1px)
      `,
      light: `
        linear-gradient(90deg, rgba(59, 130, 246, 0.05) 1px, transparent 1px),
        linear-gradient(rgba(59, 130, 246, 0.05) 1px, transparent 1px)
      `
    },
    radial: {
      dark: 'radial-gradient(circle, rgba(59, 130, 246, 0.15) 0%, transparent 70%)',
      light: 'radial-gradient(circle, rgba(59, 130, 246, 0.08) 0%, transparent 70%)'
    }
  };

  return gradients[variant]?.[theme] || gradients.neural[theme];
};

export const getThemeParticleColor = (theme) => {
  return theme === 'dark' ? 'bg-blue-400' : 'bg-blue-500';
};

export const getThemeOpacity = (theme, variant = 'default') => {
  const opacities = {
    default: {
      dark: 'opacity-20',
      light: 'opacity-10'
    },
    strong: {
      dark: 'opacity-30',
      light: 'opacity-15'
    },
    subtle: {
      dark: 'opacity-10',
      light: 'opacity-5'
    }
  };

  return opacities[variant]?.[theme] || opacities.default[theme];
};

// Comprehensive theme class generator
export const generateThemeClasses = (theme) => ({
  // Backgrounds
  background: getThemeBackground(theme),
  heroBackground: getThemeBackground(theme, 'hero'),
  cardBackground: getThemeBackground(theme, 'card'),
  surfaceBackground: getThemeBackground(theme, 'surface'),
  
  // Text colors
  primaryText: getThemeText(theme, 'primary'),
  secondaryText: getThemeText(theme, 'secondary'),
  accentText: getThemeText(theme, 'accent'),
  mutedText: getThemeText(theme, 'muted'),
  
  // Borders
  border: getThemeBorder(theme),
  accentBorder: getThemeBorder(theme, 'accent'),
  mutedBorder: getThemeBorder(theme, 'muted'),
  
  // Opacities
  opacity: getThemeOpacity(theme),
  strongOpacity: getThemeOpacity(theme, 'strong'),
  subtleOpacity: getThemeOpacity(theme, 'subtle'),
  
  // Common combinations
  container: `${getThemeBackground(theme)} ${getThemeText(theme)} transition-colors duration-500`,
  card: `${getThemeBackground(theme, 'card')} ${getThemeText(theme)} ${getThemeBorder(theme)} transition-all duration-300`,
  button: {
    primary: `bg-gradient-to-r from-blue-500 to-purple-500 text-white hover:from-blue-400 hover:to-purple-400 transition-all duration-300`,
    secondary: `${getThemeBackground(theme, 'surface')} ${getThemeText(theme)} ${getThemeBorder(theme)} hover:${getThemeText(theme, 'accent')} transition-all duration-300`
  },
  input: `${getThemeBackground(theme, 'surface')} ${getThemeText(theme)} ${getThemeBorder(theme)} focus:border-blue-500 transition-all duration-300`
});
