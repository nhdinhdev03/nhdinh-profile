// Professional theme utility functions with optimized color palette

export const getThemeBackground = (theme, variant = 'default') => {
  const backgrounds = {
    default: {
      dark: 'bg-slate-900',
      light: 'bg-white'
    },
    hero: {
      dark: 'bg-gradient-to-br from-slate-900 via-slate-800 to-blue-900',
      light: 'bg-gradient-to-br from-slate-50 via-white to-blue-50'
    },
    card: {
      dark: 'bg-slate-800/90 backdrop-blur-md border border-slate-700/50',
      light: 'bg-white/90 backdrop-blur-md border border-slate-200/50'
    },
    surface: {
      dark: 'bg-slate-800/50',
      light: 'bg-slate-50/80'
    },
    glass: {
      dark: 'bg-slate-900/80 backdrop-blur-xl border border-slate-700/30',
      light: 'bg-white/80 backdrop-blur-xl border border-slate-200/30'
    }
  };

  return backgrounds[variant]?.[theme] || backgrounds.default[theme];
};

export const getThemeText = (theme, variant = 'primary') => {
  const textColors = {
    primary: {
      dark: 'text-slate-100',
      light: 'text-slate-900'
    },
    secondary: {
      dark: 'text-slate-400',
      light: 'text-slate-600'
    },
    accent: {
      dark: 'text-blue-400',
      light: 'text-blue-600'
    },
    muted: {
      dark: 'text-slate-500',
      light: 'text-slate-500'
    },
    success: {
      dark: 'text-emerald-400',
      light: 'text-emerald-600'
    },
    warning: {
      dark: 'text-amber-400',
      light: 'text-amber-600'
    },
    error: {
      dark: 'text-red-400',
      light: 'text-red-600'
    }
  };

  return textColors[variant]?.[theme] || textColors.primary[theme];
};

export const getThemeBorder = (theme, variant = 'default') => {
  const borders = {
    default: {
      dark: 'border-slate-700',
      light: 'border-slate-200'
    },
    accent: {
      dark: 'border-blue-500/50',
      light: 'border-blue-500/50'
    },
    muted: {
      dark: 'border-slate-800',
      light: 'border-slate-100'
    },
    glass: {
      dark: 'border-slate-700/30',
      light: 'border-slate-200/30'
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
    },
    primary: {
      dark: 'bg-gradient-to-r from-blue-600 to-cyan-500',
      light: 'bg-gradient-to-r from-blue-500 to-cyan-400'
    },
    accent: {
      dark: 'bg-gradient-to-r from-purple-600 to-pink-500',
      light: 'bg-gradient-to-r from-purple-500 to-pink-400'
    }
  };

  return gradients[variant]?.[theme] || gradients.neural[theme];
};

export const getThemeButton = (theme, variant = 'primary') => {
  const buttons = {
    primary: {
      dark: 'bg-gradient-to-r from-blue-600 to-cyan-500 hover:from-blue-500 hover:to-cyan-400 text-white shadow-lg shadow-blue-500/25',
      light: 'bg-gradient-to-r from-blue-500 to-cyan-400 hover:from-blue-600 hover:to-cyan-500 text-white shadow-lg shadow-blue-500/25'
    },
    secondary: {
      dark: 'bg-slate-800 hover:bg-slate-700 text-slate-100 border border-slate-700 hover:border-slate-600',
      light: 'bg-white hover:bg-slate-50 text-slate-900 border border-slate-200 hover:border-slate-300'
    },
    ghost: {
      dark: 'text-slate-400 hover:text-slate-100 hover:bg-slate-800/50',
      light: 'text-slate-600 hover:text-slate-900 hover:bg-slate-100/50'
    }
  };

  return buttons[variant]?.[theme] || buttons.primary[theme];
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
      dark: 'opacity-40',
      light: 'opacity-20'
    },
    subtle: {
      dark: 'opacity-10',
      light: 'opacity-5'
    }
  };

  return opacities[variant]?.[theme] || opacities.default[theme];
};

// Professional status colors
export const getThemeStatus = (theme, status) => {
  const statusColors = {
    online: {
      dark: 'bg-emerald-500 text-emerald-100',
      light: 'bg-emerald-500 text-white'
    },
    busy: {
      dark: 'bg-amber-500 text-amber-100',
      light: 'bg-amber-500 text-white'
    },
    offline: {
      dark: 'bg-slate-600 text-slate-300',
      light: 'bg-slate-400 text-white'
    }
  };

  return statusColors[status]?.[theme] || statusColors.online[theme];
};

// Comprehensive theme class generator with professional colors
export const generateThemeClasses = (theme) => ({
  // Core containers
  container: `${getThemeBackground(theme)} ${getThemeText(theme)} transition-colors duration-300`,
  
  // Backgrounds
  background: getThemeBackground(theme),
  heroBackground: getThemeBackground(theme, 'hero'),
  cardBackground: getThemeBackground(theme, 'card'),
  surfaceBackground: getThemeBackground(theme, 'surface'),
  glassBackground: getThemeBackground(theme, 'glass'),
  
  // Text colors
  primaryText: getThemeText(theme, 'primary'),
  secondaryText: getThemeText(theme, 'secondary'),
  accentText: getThemeText(theme, 'accent'),
  mutedText: getThemeText(theme, 'muted'),
  successText: getThemeText(theme, 'success'),
  warningText: getThemeText(theme, 'warning'),
  errorText: getThemeText(theme, 'error'),
  
  // Borders
  border: getThemeBorder(theme),
  accentBorder: getThemeBorder(theme, 'accent'),
  mutedBorder: getThemeBorder(theme, 'muted'),
  glassBorder: getThemeBorder(theme, 'glass'),
  
  // Opacities
  opacity: getThemeOpacity(theme),
  strongOpacity: getThemeOpacity(theme, 'strong'),
  subtleOpacity: getThemeOpacity(theme, 'subtle'),
  
  // Buttons
  primaryButton: `${getThemeButton(theme, 'primary')} transition-all duration-300 transform hover:scale-105`,
  secondaryButton: `${getThemeButton(theme, 'secondary')} transition-all duration-300`,
  ghostButton: `${getThemeButton(theme, 'ghost')} transition-all duration-300`,
  
  // Common components
  card: `${getThemeBackground(theme, 'card')} ${getThemeText(theme)} transition-all duration-300 hover:shadow-xl`,
  input: `${getThemeBackground(theme, 'surface')} ${getThemeText(theme)} ${getThemeBorder(theme)} focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 transition-all duration-300`,
  
  // Status indicators
  statusOnline: getThemeStatus(theme, 'online'),
  statusBusy: getThemeStatus(theme, 'busy'),
  statusOffline: getThemeStatus(theme, 'offline')
});
