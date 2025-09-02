import React, { createContext, useContext, useState, useEffect, useCallback, useMemo } from 'react';
import { themePerformance, optimizeThemeTransition } from '../utils/themePerformance';

const ThemeContext = createContext();

// Theme configuration with CSS variables integration
const THEMES = {
  light: {
    name: 'light',
    background: 'theme-bg-primary',
    surface: 'theme-bg-secondary',
    card: 'theme-bg-card',
    text: {
      primary: 'theme-text-primary',
      secondary: 'theme-text-secondary',
      muted: 'theme-text-muted',
      accent: 'theme-text-accent'
    },
    border: 'theme-border',
    shadow: 'theme-shadow'
  },
  dark: {
    name: 'dark',
    background: 'theme-bg-primary',
    surface: 'theme-bg-secondary',
    card: 'theme-bg-card',
    text: {
      primary: 'theme-text-primary',
      secondary: 'theme-text-secondary',
      muted: 'theme-text-muted',
      accent: 'theme-text-accent'
    },
    border: 'theme-border',
    shadow: 'theme-shadow'
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

    // Apply dark class and data-theme attribute
    const isDark = effectiveTheme === 'dark';
    const html = document.documentElement;
    
    if (isDark) {
      html.classList.add('dark');
      html.setAttribute('data-theme', 'dark');
      html.style.colorScheme = 'dark';
    } else {
      html.classList.remove('dark');
      html.setAttribute('data-theme', 'light');
      html.style.colorScheme = 'light';
    }

    // Update meta theme-color for mobile browsers
    const metaThemeColor = document.querySelector('meta[name="theme-color"]');
    const themeColor = isDark ? '#0a101e' : '#ffffff';
    if (metaThemeColor) {
      metaThemeColor.setAttribute('content', themeColor);
    } else {
      const meta = document.createElement('meta');
      meta.name = 'theme-color';
      meta.content = themeColor;
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
