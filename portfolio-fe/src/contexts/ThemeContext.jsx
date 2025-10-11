import { ConfigProvider, theme as antdTheme } from "antd";
import { createContext, useContext, useEffect, useState } from "react";

const ThemeContext = createContext();

export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error("useTheme must be used within ThemeProvider");
  }
  return context;
};

// Define theme configurations
export const themes = {
  light: {
    name: "Light",
    algorithm: antdTheme.defaultAlgorithm,
    token: {
      colorPrimary: "#1890ff",
      colorSuccess: "#52c41a",
      colorWarning: "#faad14",
      colorError: "#ff4d4f",
      colorInfo: "#1890ff",
      colorTextBase: "#000000",
      colorBgBase: "#ffffff",
      borderRadius: 8,
      fontSize: 14,
      fontFamily: `-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial`,
    },
    components: {
      Card: {
        colorBgContainer: "#ffffff",
        boxShadowTertiary:
          "0 1px 2px 0 rgba(0, 0, 0, 0.03), 0 1px 6px -1px rgba(0, 0, 0, 0.02), 0 2px 4px 0 rgba(0, 0, 0, 0.02)",
      },
      Layout: {
        colorBgHeader: "#ffffff",
        colorBgBody: "#f5f5f5",
        colorBgTrigger: "#ffffff",
      },
      Menu: {
        colorItemBgSelected: "#e6f7ff",
        colorItemTextSelected: "#1890ff",
      },
    },
  },

  dark: {
    name: "Dark",
    algorithm: antdTheme.darkAlgorithm,
    token: {
      colorPrimary: "#177ddc",
      colorSuccess: "#49aa19",
      colorWarning: "#d89614",
      colorError: "#d32029",
      colorInfo: "#177ddc",
      colorTextBase: "#ffffff",
      colorBgBase: "#141414",
      borderRadius: 8,
      fontSize: 14,
      fontFamily: `-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial`,
    },
    components: {
      Card: {
        colorBgContainer: "#1f1f1f",
      },
      Layout: {
        colorBgHeader: "#1f1f1f",
        colorBgBody: "#141414",
        colorBgTrigger: "#1f1f1f",
      },
    },
  },

  ocean: {
    name: "Ocean",
    algorithm: antdTheme.darkAlgorithm,
    token: {
      colorPrimary: "#0ea5e9",
      colorSuccess: "#10b981",
      colorWarning: "#f59e0b",
      colorError: "#ef4444",
      colorInfo: "#06b6d4",
      colorTextBase: "#e0f2fe",
      colorBgBase: "#0c4a6e",
      borderRadius: 12,
      fontSize: 14,
    },
    components: {
      Card: {
        colorBgContainer: "#0e7490",
      },
      Layout: {
        colorBgHeader: "#075985",
        colorBgBody: "#0c4a6e",
        colorBgTrigger: "#075985",
      },
    },
  },

  purple: {
    name: "Purple Dream",
    algorithm: antdTheme.darkAlgorithm,
    token: {
      colorPrimary: "#a855f7",
      colorSuccess: "#22c55e",
      colorWarning: "#f59e0b",
      colorError: "#ef4444",
      colorInfo: "#8b5cf6",
      colorTextBase: "#f3e8ff",
      colorBgBase: "#581c87",
      borderRadius: 12,
      fontSize: 14,
    },
    components: {
      Card: {
        colorBgContainer: "#6b21a8",
      },
      Layout: {
        colorBgHeader: "#6b21a8",
        colorBgBody: "#581c87",
        colorBgTrigger: "#7c3aed",
      },
    },
  },

  emerald: {
    name: "Emerald",
    algorithm: antdTheme.defaultAlgorithm,
    token: {
      colorPrimary: "#10b981",
      colorSuccess: "#059669",
      colorWarning: "#f59e0b",
      colorError: "#ef4444",
      colorInfo: "#14b8a6",
      colorTextBase: "#064e3b",
      colorBgBase: "#ecfdf5",
      borderRadius: 10,
      fontSize: 14,
    },
    components: {
      Card: {
        colorBgContainer: "#d1fae5",
      },
      Layout: {
        colorBgHeader: "#d1fae5",
        colorBgBody: "#ecfdf5",
        colorBgTrigger: "#a7f3d0",
      },
    },
  },

  sunset: {
    name: "Sunset",
    algorithm: antdTheme.defaultAlgorithm,
    token: {
      colorPrimary: "#f97316",
      colorSuccess: "#84cc16",
      colorWarning: "#eab308",
      colorError: "#dc2626",
      colorInfo: "#f59e0b",
      colorTextBase: "#7c2d12",
      colorBgBase: "#fff7ed",
      borderRadius: 10,
      fontSize: 14,
    },
    components: {
      Card: {
        colorBgContainer: "#ffedd5",
      },
      Layout: {
        colorBgHeader: "#fed7aa",
        colorBgBody: "#fff7ed",
        colorBgTrigger: "#fdba74",
      },
    },
  },
};

export const ThemeProvider = ({ children }) => {
  const [currentTheme, setCurrentTheme] = useState("light");
  const [mounted, setMounted] = useState(false);

  // Load theme from localStorage on mount
  useEffect(() => {
    const savedTheme = localStorage.getItem("admin-theme");
    if (savedTheme && themes[savedTheme]) {
      setCurrentTheme(savedTheme);
    } else {
      // Auto-detect system preference
      const prefersDark = window.matchMedia(
        "(prefers-color-scheme: dark)"
      ).matches;
      setCurrentTheme(prefersDark ? "dark" : "light");
    }
    setMounted(true);
  }, []);

  // Save theme to localStorage when changed
  useEffect(() => {
    if (mounted) {
      localStorage.setItem("admin-theme", currentTheme);
      // Update CSS variables for custom styling
      updateCSSVariables(currentTheme);
    }
  }, [currentTheme, mounted]);

  const updateCSSVariables = (themeName) => {
    const root = document.documentElement;
    const themeConfig = themes[themeName];

    // Set CSS variables
    root.style.setProperty("--primary-color", themeConfig.token.colorPrimary);
    root.style.setProperty("--bg-color", themeConfig.token.colorBgBase);
    root.style.setProperty("--text-color", themeConfig.token.colorTextBase);
    root.style.setProperty(
      "--border-radius",
      `${themeConfig.token.borderRadius}px`
    );
  };

  const changeTheme = (themeName) => {
    if (themes[themeName]) {
      setCurrentTheme(themeName);
    }
  };

  const toggleTheme = () => {
    setCurrentTheme((prev) => (prev === "light" ? "dark" : "light"));
  };

  const themeConfig = themes[currentTheme];

  return (
    <ThemeContext.Provider
      value={{
        currentTheme,
        changeTheme,
        toggleTheme,
        themes: Object.keys(themes),
        themeName: themeConfig.name,
        isDark:
          currentTheme !== "light" &&
          currentTheme !== "emerald" &&
          currentTheme !== "sunset",
      }}
    >
      <ConfigProvider
        theme={{
          algorithm: themeConfig.algorithm,
          token: themeConfig.token,
          components: themeConfig.components,
        }}
      >
        {children}
      </ConfigProvider>
    </ThemeContext.Provider>
  );
};
