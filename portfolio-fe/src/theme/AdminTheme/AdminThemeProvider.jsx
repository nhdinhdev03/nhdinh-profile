import React, { createContext, useContext, useEffect, useMemo } from "react";
import PropTypes from 'prop-types';
import "./AdminStyles.scss";
import "../ThemeTransitions.scss";

const AdminThemeCtx = createContext({
  light: true,
  setLight: () => {},
  toggle: () => {},
  source: "system",
});

export function AdminThemeProvider({ children }) {
  // Admin always uses light theme - no theme switching
  const value = useMemo(() => ({
    light: true,
    setLight: () => {}, // No-op function
    toggle: () => {}, // No-op function
    source: "system",
  }), []);

  // Ensure admin area enforces light (in case user area left dark active)
  useEffect(() => {
    const root = document.documentElement;
    
    // Remove any theme switching indicators
    root.classList.remove('theme-switching', 'loading');
    
    // Force light mode for admin
    root.classList.remove('dark');
    root.style.colorScheme = 'light';
    
    // Mark route change to temporarily disable transitions
    root.classList.add('route-changing');
    const timeoutId = setTimeout(() => {
      root.classList.remove('route-changing');
    }, 100);
    
    return () => clearTimeout(timeoutId);
  }, []);

  return (
    <AdminThemeCtx.Provider value={value}>{children}</AdminThemeCtx.Provider>
  );
}

export function useAdminTheme() {
  return useContext(AdminThemeCtx);
}

AdminThemeProvider.propTypes = {
  children: PropTypes.node
};
