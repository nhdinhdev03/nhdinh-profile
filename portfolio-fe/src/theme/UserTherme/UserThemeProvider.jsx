import React, {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";
import PropTypes from "prop-types";
import "./UserStyles.scss";
import "../ThemeTransitions.scss";

const UserThemeCtx = createContext({
  light: true,
  setLight: () => {},
  toggle: () => {},
  source: "system", // "system" | "user"
});

function getInitialLight() {
  // Check local storage first (guard SSR / private mode)
  if (typeof window !== "undefined") {
    try {
      // First check if preload script already set the theme
      const isCurrentlyDark =
        document.documentElement.classList.contains("dark");
      const stored = window.localStorage.getItem("userTheme");

      if (stored === "light") return { light: true, source: "user" };
      if (stored === "dark") return { light: false, source: "user" };

      // Check system preference if no user preference
      const systemPrefersDark = window.matchMedia(
        "(prefers-color-scheme: dark)"
      ).matches;

      // If no stored preference but DOM has dark class from preload, respect it
      if (isCurrentlyDark) {
        const themeToStore = systemPrefersDark ? "dark" : "light";
        window.localStorage.setItem("userTheme", themeToStore);
        return { light: !systemPrefersDark, source: "system" };
      }

      // Use system preference as default
      const defaultLight = !systemPrefersDark;
      window.localStorage.setItem("userTheme", defaultLight ? "light" : "dark");
      return { light: defaultLight, source: "system" };
    } catch (e) {
      // If storage inaccessible (private mode), fall back to current DOM state
      if (process.env.NODE_ENV === "development") {
        // eslint-disable-next-line no-console
        console.warn("UserTheme: cannot access localStorage", e);
      }
      const isCurrentlyDark =
        document.documentElement.classList.contains("dark");
      return { light: !isCurrentlyDark, source: "system" };
    }
  }
  return { light: true, source: "system" };
}

export function UserThemeProvider({ children }) {
  // Initialize browser optimizations

  // Apply initial theme immediately before React hydration
  const initialTheme = getInitialLight();
  if (typeof document !== "undefined") {
    const root = document.documentElement;

    // Mark as loading to disable transitions initially
    root.classList.add("loading");

    if (initialTheme.light) {
      root.classList.remove("dark");
      root.style.colorScheme = "light";
    } else {
      root.classList.add("dark");
      root.style.colorScheme = "dark";
    }

    // Apply browser-specific optimizations for initial theme
  }

  const [{ light, source }, setState] = useState(initialTheme);

  // Remove loading class after component mounts
  useEffect(() => {
    const root = document.documentElement;
    // Small delay to ensure DOM is ready
    const timeoutId = setTimeout(() => {
      root.classList.remove("loading");
    }, 100);

    return () => clearTimeout(timeoutId);
  }, []);

  useEffect(() => {
    const root = document.documentElement;

    // Add temporary class to indicate theme is switching (for CSS optimizations)
    root.classList.add("theme-switching");

    // Use requestAnimationFrame for smoother transitions
    requestAnimationFrame(() => {
      if (light) {
        root.classList.remove("dark");
        root.style.colorScheme = "light";
      } else {
        root.classList.add("dark");
        root.style.colorScheme = "dark";
      }

      // Remove switching class after transition
      setTimeout(() => {
        root.classList.remove("theme-switching");
      }, 250);
    });
  }, [light]);

  // Cleanup on unmount: khi thoát khỏi layout User, Admin sẽ luôn quay về light
  useEffect(() => {
    return () => {
      const root = document.documentElement;
      // Only reset if we are leaving a dark state to avoid flicker if another provider would manage it
      if (root.classList.contains("dark")) {
        root.classList.remove("dark");
        root.style.colorScheme = "light";
      }
    };
  }, []);

  useEffect(() => {
    if (source === "user") {
      localStorage.setItem("userTheme", light ? "light" : "dark");
    }
  }, [light, source]);

  useEffect(() => {
    const onStorage = (e) => {
      if (
        e.key === "userTheme" &&
        (e.newValue === "light" || e.newValue === "dark")
      ) {
        setState({ light: e.newValue === "light", source: "user" });
      }
    };
    window.addEventListener("storage", onStorage);
    return () => window.removeEventListener("storage", onStorage);
  }, []);

  const setLight = (v) => setState({ light: v, source: "user" });
  const toggle = () =>
    setState((prev) => ({ light: !prev.light, source: "user" }));

  const value = useMemo(
    () => ({ light, setLight, toggle, source }),
    [light, source]
  );
  return (
    <UserThemeCtx.Provider value={value}>{children}</UserThemeCtx.Provider>
  );
}

export function useUserTheme() {
  return useContext(UserThemeCtx);
}

UserThemeProvider.propTypes = {
  children: PropTypes.node,
};
