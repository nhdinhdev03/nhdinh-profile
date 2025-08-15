import React, { createContext, useContext, useEffect, useMemo, useState } from "react";
import "../transitions.scss";

const UserThemeCtx = createContext({
  light: true,
  setLight: () => {},
  toggle: () => {},
  source: "system", // "system" | "user"
});

// Decide initial theme:
// 1. Honor explicit user choice in localStorage.
// 2. Otherwise default to DARK (product decision) instead of following system.
function getInitialLight() {
  try {
    const stored = localStorage.getItem("userTheme"); // "light" | "dark" | null
    if (stored === "light") return { light: true, source: "user" };
    if (stored === "dark") return { light: false, source: "user" };
  } catch (e) {
    // ignore (private mode / unavailable)
  }
  return { light: false, source: "system" }; 
}

export function UserThemeProvider({ children }) {
  const [{ light, source }, setState] = useState(getInitialLight);

  // Apply theme to DOM when UserThemeProvider is active
  useEffect(() => {
    const root = document.documentElement;
    if (light) {
      root.classList.remove("dark");
      root.style.colorScheme = "light";
    } else {
      root.classList.add("dark");
      root.style.colorScheme = "dark";
    }

    // Cleanup function to ensure we don't leave dark theme when unmounting
    return () => {
      // When UserThemeProvider unmounts, reset to light theme (for Admin)
      root.classList.remove("dark");
      root.style.colorScheme = "light";
    };
  }, [light]);

  useEffect(() => {
    if (source === "user") {
      localStorage.setItem("userTheme", light ? "light" : "dark");
    }
  }, [light, source]);

  useEffect(() => {
    const onStorage = (e) => {
      if (e.key === "userTheme" && (e.newValue === "light" || e.newValue === "dark")) {
        setState({ light: e.newValue === "light", source: "user" });
      }
    };
    window.addEventListener("storage", onStorage);
    return () => window.removeEventListener("storage", onStorage);
  }, []);

  const setLight = (v) => setState({ light: v, source: "user" });
  const toggle = () => setState((prev) => ({ light: !prev.light, source: "user" }));

  const value = useMemo(() => ({ light, setLight, toggle, source }), [light, source]);
  return <UserThemeCtx.Provider value={value}>{children}</UserThemeCtx.Provider>;
}

export function useUserTheme() {
  return useContext(UserThemeCtx);
}