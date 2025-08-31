import React, { createContext, useContext, useState, useEffect, useCallback, useMemo } from 'react';
import { themePerformance, optimizeThemeTransition } from '../utils/themePerformance';

const ThemeContext = createContext();

// Theme configuration with optimized color schemes
const THEMES = {
  light: {
    name: 'light',
    background: 'from-gray-50 to-white',
    surface: 'from-white to-gray-50',
    text: {
      primary: 'text-gray-900',
      secondary: 'text-gray-600',
      accent: 'text-blue-600'
    },
    accent: 'from-blue-500 to-purple-500',
    border: 'border-gray-200',
    shadow: 'shadow-gray-200/50'
  },
  dark: {
    name: 'dark',
    background: 'from-gray-900 via-black to-gray-900',
    surface: 'from-gray-800/50 to-gray-900/50',
    text: {
      primary: 'text-white',
      secondary: 'text-gray-300',
      accent: 'text-cyan-400'
    },
    accent: 'from-cyan-500 to-purple-500',
    border: 'border-gray-700',
    shadow: 'shadow-cyan-500/25'
  },
  auto: {
    name: 'auto',
    // Will resolve to light or dark based on system preference
  }
};

export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
};

// Utility hook for theme-aware styling
export const useThemeClasses = () => {
  const { currentTheme } = useTheme();
  
  return useMemo(() => ({
    background: `bg-gradient-to-br ${currentTheme.background}`,
    surface: `bg-gradient-to-r ${currentTheme.surface}`,
    text: currentTheme.text,
    accent: `bg-gradient-to-r ${currentTheme.accent}`,
    border: currentTheme.border,
    shadow: currentTheme.shadow,
    card: `${currentTheme.surface} backdrop-blur-sm ${currentTheme.border} ${currentTheme.shadow}`,
    button: {
      primary: `bg-gradient-to-r ${currentTheme.accent} text-white hover:opacity-90 transition-all duration-300 transform hover:scale-105`,
      secondary: `bg-transparent ${currentTheme.border} ${currentTheme.text.primary} hover:${currentTheme.text.accent} transition-all duration-300`
    }
  }), [currentTheme]);
};

export const ThemeProvider = ({ children }) => {
  // Get system preference
  const getSystemTheme = useCallback(() => {
    if (typeof window === 'undefined') return 'dark';
    return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
  }, []);

  // Initialize theme state
  const [themeMode, setThemeMode] = useState(() => {
    if (typeof window === 'undefined') return 'auto';
    
    const saved = localStorage.getItem('theme-mode');
    if (saved && ['light', 'dark', 'auto'].includes(saved)) {
      return saved;
    }
    return 'auto';
  });

  const [systemTheme, setSystemTheme] = useState(getSystemTheme);

  // Listen for system theme changes
  useEffect(() => {
    if (typeof window === 'undefined') return;

    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
    const handleChange = (e) => {
      setSystemTheme(e.matches ? 'dark' : 'light');
    };

    mediaQuery.addEventListener('change', handleChange);
    return () => mediaQuery.removeEventListener('change', handleChange);
  }, []);

  // Calculate effective theme
  const effectiveTheme = useMemo(() => {
    if (themeMode === 'auto') return systemTheme;
    return themeMode;
  }, [themeMode, systemTheme]);

  // Get current theme object
  const currentTheme = useMemo(() => {
    return THEMES[effectiveTheme] || THEMES.dark;
  }, [effectiveTheme]);

  // Apply theme to document
  useEffect(() => {
    if (typeof window === 'undefined') return;

    // Save to localStorage
    localStorage.setItem('theme-mode', themeMode);

    // Apply dark class
    const isDark = effectiveTheme === 'dark';
    const html = document.documentElement;
    
    if (isDark) {
      html.classList.add('dark');
      html.style.colorScheme = 'dark';
    } else {
      html.classList.remove('dark');
      html.style.colorScheme = 'light';
    }

    // Update meta theme-color for mobile browsers
    const metaThemeColor = document.querySelector('meta[name="theme-color"]');
    if (metaThemeColor) {
      metaThemeColor.setAttribute('content', isDark ? '#000000' : '#ffffff');
    } else {
      const meta = document.createElement('meta');
      meta.name = 'theme-color';
      meta.content = isDark ? '#000000' : '#ffffff';
      document.head.appendChild(meta);
    }

    // Dispatch custom event for other components
    window.dispatchEvent(new CustomEvent('themeChange', {
      detail: { theme: effectiveTheme, isDark }
    }));
  }, [themeMode, effectiveTheme]);

  // Theme actions with performance monitoring
  const setTheme = useCallback((mode) => {
    if (['light', 'dark', 'auto'].includes(mode)) {
      const currentEffectiveTheme = themeMode === 'auto' ? systemTheme : themeMode;
      const newEffectiveTheme = mode === 'auto' ? systemTheme : mode;
      
      // Start performance monitoring
      const transition = themePerformance.startThemeTransition(currentEffectiveTheme, newEffectiveTheme);
      
      // Preload assets for new theme
      optimizeThemeTransition.preloadThemeAssets(newEffectiveTheme);
      
      // Apply theme change
      setThemeMode(mode);
      
      // End performance monitoring after transition
      if (transition) {
        requestAnimationFrame(() => {
          setTimeout(() => transition.end(), 300); // Match CSS transition duration
        });
      }
    }
  }, [themeMode, systemTheme]);

  const toggleTheme = useCallback(() => {
    const currentEffectiveTheme = themeMode === 'auto' ? systemTheme : themeMode;
    const transition = themePerformance.startThemeTransition(currentEffectiveTheme, 'toggle');
    
    setThemeMode(prev => {
      const newMode = prev === 'light' ? 'dark' : prev === 'dark' ? 'auto' : 'light';
      const newEffectiveTheme = newMode === 'auto' ? systemTheme : newMode;
      
      // Preload assets for new theme
      optimizeThemeTransition.preloadThemeAssets(newEffectiveTheme);
      
      return newMode;
    });
    
    if (transition) {
      requestAnimationFrame(() => {
        setTimeout(() => transition.end(), 300);
      });
    }
  }, [themeMode, systemTheme]);

  const toggleDarkMode = useCallback(() => {
    const currentEffectiveTheme = themeMode === 'auto' ? systemTheme : themeMode;
    const newTheme = currentEffectiveTheme === 'dark' ? 'light' : 'dark';
    const transition = themePerformance.startThemeTransition(currentEffectiveTheme, newTheme);
    
    // Preload assets for new theme
    optimizeThemeTransition.preloadThemeAssets(newTheme);
    
    setThemeMode(prev => prev === 'dark' ? 'light' : 'dark');
    
    if (transition) {
      requestAnimationFrame(() => {
        setTimeout(() => transition.end(), 300);
      });
    }
  }, [themeMode, systemTheme]);

  // Context value with memoization
  const value = useMemo(() => ({
    // Current state
    themeMode,
    effectiveTheme,
    theme: effectiveTheme, // Simplified alias for consistency
    currentTheme,
    isDark: effectiveTheme === 'dark',
    isLight: effectiveTheme === 'light',
    isAuto: themeMode === 'auto',
    systemTheme,
    
    // Theme objects
    themes: THEMES,
    
    // Actions
    setTheme,
    toggleTheme,
    toggleDarkMode,
    
    // Performance monitoring (development only)
    performance: process.env.NODE_ENV === 'development' ? {
      getReport: () => themePerformance.getPerformanceReport(),
      clearMetrics: () => themePerformance.clearMetrics(),
      exportMetrics: () => themePerformance.exportMetrics()
    } : {},
    
    // Utilities
    getThemeClasses: (variant = 'default') => {
      const base = currentTheme;
      switch (variant) {
        case 'card':
          return `bg-gradient-to-r ${base.surface} backdrop-blur-sm border ${base.border} ${base.shadow} theme-transition`;
        case 'button-primary':
          return `bg-gradient-to-r ${base.accent} text-white hover:opacity-90 theme-transition theme-focus`;
        case 'button-secondary':
          return `bg-transparent border-2 ${base.border} ${base.text.primary} hover:${base.text.accent} theme-transition theme-focus`;
        case 'text-primary':
          return `${base.text.primary} theme-color-transition`;
        case 'text-secondary':
          return `${base.text.secondary} theme-color-transition`;
        case 'text-accent':
          return `${base.text.accent} theme-color-transition`;
        case 'background':
          return `bg-gradient-to-br ${base.background} theme-background-transition`;
        case 'surface':
          return `bg-gradient-to-r ${base.surface} theme-background-transition`;
        case 'border':
          return `${base.border} theme-border-transition`;
        default:
          return 'theme-transition';
      }
    }
  }), [
    themeMode,
    effectiveTheme,
    currentTheme,
    systemTheme,
    setTheme,
    toggleTheme,
    toggleDarkMode
  ]);

  return (
    <ThemeContext.Provider value={value}>
      {children}
    </ThemeContext.Provider>
  );
};
