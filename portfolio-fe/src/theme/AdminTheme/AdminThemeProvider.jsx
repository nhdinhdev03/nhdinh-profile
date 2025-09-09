import React, { createContext, useContext, useEffect, useMemo, useState, useCallback } from "react";
import { ConfigProvider, App } from 'antd';
import viVN from 'antd/locale/vi_VN';
import PropTypes from 'prop-types';
import { createThemeConfig, generateCSSVariables } from './antdTheme';
import "./AdminStyles.scss";
import "../ThemeTransitions.scss";
import "../../styles/admin/AdminGlobalStyles.scss";

const AdminThemeCtx = createContext({
  light: true,
  setLight: () => {},
  toggle: () => {},
  source: "system",
  themeConfig: {},
});

// Theme storage utilities
const THEME_STORAGE_KEY = 'admin-theme-preference';

const getStoredTheme = () => {
  try {
    const stored = localStorage.getItem(THEME_STORAGE_KEY);
    return stored ? JSON.parse(stored) : null;
  } catch (error) {
    console.warn('Failed to parse stored theme preference:', error);
    return null;
  }
};

const storeTheme = (themeData) => {
  try {
    localStorage.setItem(THEME_STORAGE_KEY, JSON.stringify(themeData));
  } catch (error) {
    console.warn('Failed to store theme preference:', error);
  }
};

// System theme detection
const getSystemTheme = () => {
  if (typeof window === 'undefined') return true;
  return !window.matchMedia('(prefers-color-scheme: dark)').matches;
};

// Get initial theme preference
const getInitialTheme = () => {
  const stored = getStoredTheme();
  if (stored !== null) {
    return { light: stored.light, source: stored.source };
  }
  
  return { light: getSystemTheme(), source: "system" };
};

// Apply CSS variables to document root
const applyCSSVariables = (isDark) => {
  if (typeof document === 'undefined') return;
  
  const root = document.documentElement;
  const variables = generateCSSVariables(isDark);
  
  Object.entries(variables).forEach(([key, value]) => {
    root.style.setProperty(key, value);
  });
  
  // Update color scheme
  root.style.colorScheme = isDark ? 'dark' : 'light';
  
  // Update body class for additional styling
  if (isDark) {
    document.body.classList.add('admin-dark-theme');
    document.body.classList.remove('admin-light-theme');
  } else {
    document.body.classList.add('admin-light-theme');
    document.body.classList.remove('admin-dark-theme');
  }
};

export function AdminThemeProvider({ children }) {
  const [themeState, setThemeState] = useState(getInitialTheme);

  // Create memoized theme configuration
  const themeConfig = useMemo(() => {
    return createThemeConfig(!themeState.light);
  }, [themeState.light]);

  // Apply theme changes to document
  useEffect(() => {
    applyCSSVariables(!themeState.light);
  }, [themeState.light]);

  // Store theme preference
  useEffect(() => {
    storeTheme(themeState);
  }, [themeState]);

  // Listen for system theme changes
  useEffect(() => {
    if (themeState.source !== "system") return;

    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
    const handleSystemThemeChange = (event) => {
      setThemeState(prev => ({
        ...prev,
        light: !event.matches
      }));
    };

    mediaQuery.addEventListener('change', handleSystemThemeChange);
    return () => mediaQuery.removeEventListener('change', handleSystemThemeChange);
  }, [themeState.source]);

  // Theme control functions
  const setLight = useCallback((light) => {
    setThemeState({
      light,
      source: "manual"
    });
  }, []);

  const toggle = useCallback(() => {
    setThemeState(prev => ({
      light: !prev.light,
      source: "manual"
    }));
  }, []);

  const resetToSystem = useCallback(() => {
    setThemeState({
      light: getSystemTheme(),
      source: "system"
    });
  }, []);

  // Context value
  const contextValue = useMemo(() => ({
    light: themeState.light,
    source: themeState.source,
    setLight,
    toggle,
    resetToSystem,
    themeConfig,
    isDark: !themeState.light
  }), [themeState, setLight, toggle, resetToSystem, themeConfig]);

  return (
    <AdminThemeCtx.Provider value={contextValue}>
      <ConfigProvider
        theme={themeConfig}
        locale={viVN}
        componentSize="middle"
        direction="ltr"
        space={{ size: 'middle' }}
        wave={{ disabled: false }}
        virtual={true}
        // Form configuration
        form={{
          colon: false,
          requiredMark: true,
          scrollToFirstError: true,
          validateMessages: {
            // eslint-disable-next-line no-template-curly-in-string
            required: '${label} là bắt buộc!',
            types: {
              // eslint-disable-next-line no-template-curly-in-string
              email: '${label} không đúng định dạng email!',
              // eslint-disable-next-line no-template-curly-in-string
              number: '${label} không đúng định dạng số!',
              // eslint-disable-next-line no-template-curly-in-string
              url: '${label} không đúng định dạng URL!',
            },
            number: {
              // eslint-disable-next-line no-template-curly-in-string
              range: '${label} phải nằm trong khoảng ${min}-${max}',
            },
            string: {
              // eslint-disable-next-line no-template-curly-in-string
              min: '${label} phải có ít nhất ${min} ký tự',
              // eslint-disable-next-line no-template-curly-in-string
              max: '${label} không được quá ${max} ký tự',
              // eslint-disable-next-line no-template-curly-in-string
              range: '${label} phải có ${min}-${max} ký tự',
            },
          },
        }}
        // Table configuration
        table={{
          sticky: true,
          showSorterTooltip: {
            target: 'sorter-icon',
            title: 'Nhấn để sắp xếp'
          },
        }}
        // Input configuration
        input={{
          autoComplete: 'off',
        }}
        // Select configuration
        select={{
          showSearch: true,
          optionFilterProp: 'children',
          filterOption: (input, option) =>
            (option?.children ?? '').toLowerCase().includes(input.toLowerCase()),
        }}
        // Upload configuration
        upload={{
          maxCount: 1,
          showUploadList: {
            showPreviewIcon: true,
            showRemoveIcon: true,
            showDownloadIcon: false,
          },
        }}
        // Pagination configuration
        pagination={{
          showSizeChanger: true,
          showQuickJumper: true,
          showTotal: (total, range) => 
            `${range[0]}-${range[1]} của ${total} mục`,
          pageSizeOptions: ['10', '20', '50', '100'],
          defaultPageSize: 20,
        }}
        // Date Picker configuration
        datePicker={{
          format: 'DD/MM/YYYY',
        }}
        // Notification configuration
        notification={{
          placement: 'topRight',
          duration: 4.5,
          showProgress: true,
          pauseOnHover: true,
        }}
        // Message configuration
        message={{
          duration: 3,
          maxCount: 5,
        }}
        // Modal configuration
        modal={{
          width: 520,
          centered: true,
          destroyOnClose: true,
          maskClosable: false,
        }}
        // Drawer configuration
        drawer={{
          placement: 'right',
          width: 378,
          destroyOnClose: true,
          maskClosable: true,
        }}
        // Popconfirm configuration
        popconfirm={{
          placement: 'topRight',
        }}
      >
        <App
          message={{
            duration: 3,
            maxCount: 5,
          }}
          notification={{
            placement: 'topRight',
            duration: 4.5,
            showProgress: true,
            pauseOnHover: true,
          }}
        >
          {children}
        </App>
      </ConfigProvider>
    </AdminThemeCtx.Provider>
  );
}

export function useAdminTheme() {
  const context = useContext(AdminThemeCtx);
  if (!context) {
    throw new Error('useAdminTheme must be used within an AdminThemeProvider');
  }
  return context;
}

AdminThemeProvider.propTypes = {
  children: PropTypes.node
};
