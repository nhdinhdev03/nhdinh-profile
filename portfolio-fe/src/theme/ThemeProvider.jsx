import React, { createContext, useContext, useEffect, useMemo, useState } from "react";
import "./transitions.scss";

const ThemeCtx = createContext({
  light: true,
  setLight: () => {},
  toggle: () => {},
  source: "system", // "system" | "user"
});

function getInitialLight() {
  const stored = localStorage.getItem("theme"); // "light" | "dark" | null
  if (stored === "light") return { light: true, source: "user" };
  if (stored === "dark") return { light: false, source: "user" };
  const prefersLight = window.matchMedia?.("(prefers-color-scheme: light)")?.matches;
  return { light: !!prefersLight, source: "system" };
}

export function ThemeProvider({ children }) {
  const [{ light, source }, setState] = useState(getInitialLight);

  useEffect(() => {
    const root = document.documentElement;
    if (light) {
      root.classList.remove("dark");
      root.style.colorScheme = "light";
    } else {
      root.classList.add("dark");
      root.style.colorScheme = "dark";
    }
  }, [light]);

  useEffect(() => {
    if (source === "user") {
      localStorage.setItem("theme", light ? "light" : "dark");
    }
  }, [light, source]);

  useEffect(() => {
    const mq = window.matchMedia?.("(prefers-color-scheme: light)");
    if (!mq) return;
    const onChange = (e) => {
      setState((prev) => (prev.source !== "system" ? prev : { light: e.matches, source: "system" }));
    };
    mq.addEventListener?.("change", onChange);
    return () => mq.removeEventListener?.("change", onChange);
  }, []);

  useEffect(() => {
    const onStorage = (e) => {
      if (e.key === "theme" && (e.newValue === "light" || e.newValue === "dark")) {
        setState({ light: e.newValue === "light", source: "user" });
      }
    };
    window.addEventListener("storage", onStorage);
    return () => window.removeEventListener("storage", onStorage);
  }, []);

  const setLight = (v) => setState({ light: v, source: "user" });
  const toggle = () => setState((prev) => ({ light: !prev.light, source: "user" }));

  const value = useMemo(() => ({ light, setLight, toggle, source }), [light, source]);
  return <ThemeCtx.Provider value={value}>{children}</ThemeCtx.Provider>;
}

export function useTheme() {
  return useContext(ThemeCtx);
}
