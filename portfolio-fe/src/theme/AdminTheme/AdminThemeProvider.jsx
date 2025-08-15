import React, { createContext, useContext, useEffect } from "react";

const AdminThemeCtx = createContext({
  light: true,
  setLight: () => {},
  toggle: () => {},
  source: "system",
});

export function AdminThemeProvider({ children }) {
  // Admin always uses light theme - force light mode on DOM
  useEffect(() => {
    const root = document.documentElement;
    root.classList.remove("dark");
    root.style.colorScheme = "light";
  }, []);

  // Admin theme context - always light theme
  const value = {
    light: true,
    setLight: () => {}, // No-op function
    toggle: () => {}, // No-op function
    source: "system"
  };

  return <AdminThemeCtx.Provider value={value}>{children}</AdminThemeCtx.Provider>;
}

export function useAdminTheme() {
  return useContext(AdminThemeCtx);
}