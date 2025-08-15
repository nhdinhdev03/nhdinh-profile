import React, {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";
import "./UserStyles.scss";

const UserThemeCtx = createContext({
  light: true,
  setLight: () => {},
  toggle: () => {},
  source: "system", // "system" | "user"
});

function getInitialLight() {
  try {
    const stored = localStorage.getItem("userTheme");
    if (stored === "light") return { light: true, source: "user" };
    if (stored === "dark") return { light: false, source: "user" };
  } catch (e) {
    // ignore (private mode / unavailable)
  }
  return { light: true, source: "system" };
}

export function UserThemeProvider({ children }) {
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
