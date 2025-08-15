import React, { createContext, useContext } from "react";

const AdminThemeCtx = createContext({
  light: true,
  setLight: () => {},
  toggle: () => {},
  source: "system",
});

export function AdminThemeProvider({ children }) {
  // Admin always uses light theme - no theme switching
  const value = {
    light: true,
    setLight: () => {}, // No-op function
    toggle: () => {}, // No-op function
    source: "system",
  };

  return (
    <AdminThemeCtx.Provider value={value}>{children}</AdminThemeCtx.Provider>
  );
}

export function useAdminTheme() {
  return useContext(AdminThemeCtx);
}
