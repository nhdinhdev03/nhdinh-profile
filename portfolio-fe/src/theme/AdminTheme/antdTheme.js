import { theme } from 'antd';

const { darkAlgorithm, defaultAlgorithm } = theme;

// Design Tokens
export const designTokens = {
  // Color Palette
  colors: {
    primary: '#4f46e5', // Indigo-600
    primaryHover: '#4338ca', // Indigo-700
    primaryActive: '#3730a3', // Indigo-800
    success: '#059669', // Emerald-600
    successHover: '#047857', // Emerald-700
    warning: '#d97706', // Amber-600
    warningHover: '#b45309', // Amber-700
    error: '#dc2626', // Red-600
    errorHover: '#b91c1c', // Red-700
    info: '#2563eb', // Blue-600
    infoHover: '#1d4ed8', // Blue-700
    
    // Neutral Colors
    gray50: '#f9fafb',
    gray100: '#f3f4f6',
    gray200: '#e5e7eb',
    gray300: '#d1d5db',
    gray400: '#9ca3af',
    gray500: '#6b7280',
    gray600: '#4b5563',
    gray700: '#374151',
    gray800: '#1f2937',
    gray900: '#111827',
    
    // Background & Surface
    bgPrimary: '#ffffff',
    bgSecondary: '#f9fafb',
    bgTertiary: '#f3f4f6',
    surface: '#ffffff',
    surfaceHover: '#f9fafb',
    
    // Dark Mode
    dark: {
      bgPrimary: '#0f172a',
      bgSecondary: '#1e293b',
      bgTertiary: '#334155',
      surface: '#1e293b',
      surfaceHover: '#334155',
    }
  },
  
  // Typography
  typography: {
    fontFamily: {
      primary: '"Inter", -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
      heading: '"Inter", -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
      mono: '"Fira Code", "JetBrains Mono", Consolas, Monaco, "Courier New", monospace'
    },
    fontSize: {
      xs: '12px',
      sm: '14px',
      base: '16px',
      lg: '18px',
      xl: '20px',
      '2xl': '24px',
      '3xl': '30px',
      '4xl': '36px'
    },
    fontWeight: {
      normal: 400,
      medium: 500,
      semibold: 600,
      bold: 700,
      extrabold: 800
    },
    lineHeight: {
      tight: 1.25,
      snug: 1.375,
      normal: 1.5,
      relaxed: 1.625,
      loose: 2
    }
  },
  
  // Spacing
  spacing: {
    xs: '4px',
    sm: '8px',
    md: '12px',
    lg: '16px',
    xl: '20px',
    '2xl': '24px',
    '3xl': '32px',
    '4xl': '40px',
    '5xl': '48px',
    '6xl': '64px'
  },
  
  // Border Radius
  borderRadius: {
    sm: '4px',
    md: '6px',
    lg: '8px',
    xl: '12px',
    '2xl': '16px',
    full: '9999px'
  },
  
  // Shadow
  boxShadow: {
    sm: '0 1px 2px 0 rgba(0, 0, 0, 0.05)',
    md: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)',
    lg: '0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)',
    xl: '0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)',
    '2xl': '0 25px 50px -12px rgba(0, 0, 0, 0.25)'
  },
  
  // Z-Index
  zIndex: {
    dropdown: 1000,
    sticky: 1020,
    fixed: 1030,
    modal: 1040,
    popover: 1050,
    tooltip: 1060,
    toast: 1070
  }
};

// Light Theme Configuration
export const lightTheme = {
  algorithm: defaultAlgorithm,
  token: {
    // Color Tokens
    colorPrimary: designTokens.colors.primary,
    colorPrimaryHover: designTokens.colors.primaryHover,
    colorPrimaryActive: designTokens.colors.primaryActive,
    colorSuccess: designTokens.colors.success,
    colorWarning: designTokens.colors.warning,
    colorError: designTokens.colors.error,
    colorInfo: designTokens.colors.info,
    
    // Background Colors
    colorBgBase: designTokens.colors.bgPrimary,
    colorBgContainer: designTokens.colors.surface,
    colorBgElevated: designTokens.colors.surface,
    colorBgLayout: designTokens.colors.bgSecondary,
    colorBgSpotlight: designTokens.colors.bgTertiary,
    
    // Border Colors
    colorBorder: designTokens.colors.gray200,
    colorBorderSecondary: designTokens.colors.gray100,
    
    // Text Colors
    colorText: designTokens.colors.gray900,
    colorTextSecondary: designTokens.colors.gray600,
    colorTextTertiary: designTokens.colors.gray500,
    colorTextQuaternary: designTokens.colors.gray400,
    
    // Typography
    fontFamily: designTokens.typography.fontFamily.primary,
    fontSize: 14,
    fontSizeHeading1: 32,
    fontSizeHeading2: 28,
    fontSizeHeading3: 24,
    fontSizeHeading4: 20,
    fontSizeHeading5: 18,
    fontSizeLG: 16,
    fontSizeSM: 12,
    fontSizeXL: 18,
    
    // Border Radius
    borderRadius: 6,
    borderRadiusLG: 8,
    borderRadiusSM: 4,
    borderRadiusXS: 2,
    borderRadiusOuter: 4,
    
    // Layout
    controlHeight: 32,
    controlHeightLG: 40,
    controlHeightSM: 24,
    controlHeightXS: 16,
    
    // Spacing
    padding: 16,
    paddingLG: 24,
    paddingSM: 12,
    paddingXS: 8,
    paddingXXS: 4,
    
    margin: 16,
    marginLG: 24,
    marginSM: 12,
    marginXS: 8,
    marginXXS: 4,
    
    // Shadows
    boxShadow: designTokens.boxShadow.sm,
    boxShadowSecondary: designTokens.boxShadow.md,
    boxShadowTertiary: designTokens.boxShadow.lg,
    
    // Line Height
    lineHeight: 1.5714285714285714,
    lineHeightLG: 1.5,
    lineHeightSM: 1.6666666666666667,
    
    // Motion
    motionDurationFast: '0.1s',
    motionDurationMid: '0.2s',
    motionDurationSlow: '0.3s',
    motionEaseInOut: 'cubic-bezier(0.645, 0.045, 0.355, 1)',
    motionEaseInOutCirc: 'cubic-bezier(0.78, 0.14, 0.15, 0.86)',
    motionEaseOut: 'cubic-bezier(0.215, 0.61, 0.355, 1)',
    motionEaseInQuint: 'cubic-bezier(0.755, 0.05, 0.855, 0.06)',
    motionEaseOutQuint: 'cubic-bezier(0.23, 1, 0.32, 1)',
    
    // Z-Index
    zIndexBase: 0,
    zIndexPopupBase: 1000,
    
    // Screen Sizes
    screenXS: 480,
    screenSM: 576,
    screenMD: 768,
    screenLG: 992,
    screenXL: 1200,
    screenXXL: 1600,
  },
  components: {
    // Layout Components
    Layout: {
      headerBg: designTokens.colors.surface,
      headerHeight: 64,
      headerPadding: '0 24px',
      headerColor: designTokens.colors.gray800,
      siderBg: designTokens.colors.gray900,
      triggerBg: designTokens.colors.gray800,
      triggerColor: designTokens.colors.gray100,
      zeroTriggerWidth: 36,
      zeroTriggerHeight: 42,
      lightSiderBg: designTokens.colors.surface,
      lightTriggerBg: designTokens.colors.gray50,
      lightTriggerColor: designTokens.colors.gray600,
    },
    
    // Menu Components
    Menu: {
      itemBg: 'transparent',
      itemColor: designTokens.colors.gray100,
      itemHoverBg: 'rgba(255, 255, 255, 0.1)',
      itemHoverColor: designTokens.colors.gray50,
      itemSelectedBg: designTokens.colors.primary,
      itemSelectedColor: '#ffffff',
      itemActiveBg: 'rgba(255, 255, 255, 0.15)',
      subMenuItemBg: 'transparent',
      groupTitleColor: designTokens.colors.gray400,
      darkItemBg: 'transparent',
      darkItemColor: designTokens.colors.gray100,
      darkItemHoverBg: 'rgba(255, 255, 255, 0.1)',
      darkItemSelectedBg: designTokens.colors.primary,
      darkSubMenuItemBg: 'transparent',
      borderRadius: designTokens.borderRadius.lg,
      itemMarginBlock: 4,
      itemMarginInline: 8,
      itemPaddingInline: 16,
    },
    
    // Card Components
    Card: {
      headerBg: 'transparent',
      headerHeight: 56,
      headerHeightSM: 48,
      actionsBg: designTokens.colors.bgSecondary,
      tabsMarginBottom: 16,
      extraColor: designTokens.colors.gray600,
      borderRadiusLG: designTokens.borderRadius.xl,
      paddingLG: 24,
      colorBorderSecondary: designTokens.colors.gray100,
    },
    
    // Button Components
    Button: {
      fontWeight: designTokens.typography.fontWeight.medium,
      borderRadius: designTokens.borderRadius.lg,
      controlHeight: 40,
      controlHeightSM: 32,
      controlHeightLG: 48,
      paddingInline: 20,
      paddingInlineLG: 24,
      paddingInlineSM: 16,
      onlyIconSize: 18,
      onlyIconSizeLG: 20,
      onlyIconSizeSM: 16,
      groupBorderColor: 'transparent',
      linkHoverBg: 'transparent',
      textHoverBg: designTokens.colors.gray50,
      defaultGhostBorderColor: designTokens.colors.gray300,
      defaultGhostColor: designTokens.colors.gray600,
      ghostBg: 'transparent',
    },
    
    // Form Components
    Form: {
      labelRequiredMarkColor: designTokens.colors.error,
      labelColor: designTokens.colors.gray700,
      labelFontSize: 14,
      itemMarginBottom: 20,
      verticalLabelPadding: '0 0 8px',
    },
    
    // Input Components
    Input: {
      borderRadius: designTokens.borderRadius.lg,
      controlHeight: 40,
      controlHeightSM: 32,
      controlHeightLG: 48,
      paddingInline: 12,
      paddingInlineLG: 16,
      paddingInlineSM: 8,
      addonBg: designTokens.colors.bgSecondary,
      hoverBorderColor: designTokens.colors.primaryHover,
      activeBorderColor: designTokens.colors.primary,
      warningOutlineColor: 'rgba(217, 119, 6, 0.2)',
      errorOutlineColor: 'rgba(220, 38, 38, 0.2)',
    },
    
    // Select Components
    Select: {
      borderRadius: designTokens.borderRadius.lg,
      controlHeight: 40,
      controlHeightSM: 32,
      controlHeightLG: 48,
      singleItemHeightLG: 40,
      multipleItemHeight: 24,
      multipleItemHeightLG: 28,
      optionHeight: 36,
      optionLineHeight: 1.5,
      optionPadding: '8px 12px',
      showArrowPaddingInlineEnd: 36,
    },
    
    // Table Components
    Table: {
      borderRadius: designTokens.borderRadius.xl,
      headerBg: designTokens.colors.bgSecondary,
      headerColor: designTokens.colors.gray700,
      headerSortActiveBg: designTokens.colors.bgTertiary,
      headerSortHoverBg: designTokens.colors.bgTertiary,
      bodySortBg: designTokens.colors.bgSecondary,
      rowHoverBg: designTokens.colors.bgSecondary,
      rowSelectedBg: 'rgba(79, 70, 229, 0.04)',
      rowSelectedHoverBg: 'rgba(79, 70, 229, 0.08)',
      rowExpandedBg: designTokens.colors.bgSecondary,
      cellPaddingBlock: 12,
      cellPaddingInline: 16,
      cellPaddingBlockSM: 8,
      cellPaddingInlineSM: 12,
      headerSplitColor: designTokens.colors.gray200,
      borderColor: designTokens.colors.gray200,
      footerBg: designTokens.colors.bgSecondary,
      filterDropdownBg: designTokens.colors.surface,
    },
    
    // Modal Components
    Modal: {
      borderRadius: designTokens.borderRadius.xl,
      headerBg: 'transparent',
      contentBg: designTokens.colors.surface,
      titleColor: designTokens.colors.gray900,
      titleFontSize: 20,
      footerBg: 'transparent',
      maskBg: 'rgba(0, 0, 0, 0.45)',
    },
    
    // Pagination Components
    Pagination: {
      borderRadius: designTokens.borderRadius.lg,
      itemSize: 36,
      itemSizeSM: 28,
      itemActiveBg: designTokens.colors.primary,
      itemInputBg: designTokens.colors.surface,
      itemLinkBg: 'transparent',
      miniOptionsSizeChangerTop: 0,
    },
    
    // Badge Components
    Badge: {
      borderRadiusSM: designTokens.borderRadius.full,
      textFontSize: 12,
      textFontSizeSM: 11,
      textFontWeight: designTokens.typography.fontWeight.medium,
      statusSize: 6,
      dotSize: 8,
    },
    
    // Tag Components
    Tag: {
      borderRadiusSM: designTokens.borderRadius.md,
      defaultBg: designTokens.colors.gray100,
      defaultColor: designTokens.colors.gray700,
      fontSize: 12,
      fontSizeSM: 11,
      lineHeight: 1.5,
      paddingInline: 8,
      paddingInlineSM: 6,
    },
    
    // Message Components
    Message: {
      borderRadius: designTokens.borderRadius.lg,
      contentBg: designTokens.colors.surface,
      contentPadding: '12px 16px',
      zIndexPopup: designTokens.zIndex.toast,
    },
    
    // Notification Components
    Notification: {
      borderRadius: designTokens.borderRadius.xl,
      paddingHorizontal: 20,
      paddingVertical: 16,
      iconMarginEnd: 12,
      closeBtnMarginEnd: 4,
      closeBtnMarginTop: 0,
      zIndexPopup: designTokens.zIndex.toast,
    },
    
    // Tooltip Components
    Tooltip: {
      borderRadius: designTokens.borderRadius.md,
      colorBgSpotlight: 'rgba(0, 0, 0, 0.85)',
      paddingXXS: 6,
      paddingXS: 8,
      fontSize: 12,
      zIndexPopup: designTokens.zIndex.tooltip,
    },
    
    // Dropdown Components
    Dropdown: {
      borderRadius: designTokens.borderRadius.lg,
      paddingBlock: 4,
      zIndexPopup: designTokens.zIndex.dropdown,
    },
    
    // Drawer Components
    Drawer: {
      borderRadiusLG: designTokens.borderRadius.xl,
      paddingLG: 24,
      headerHeight: 56,
      footerPaddingBlock: 12,
      footerPaddingInline: 24,
      zIndexPopup: designTokens.zIndex.modal,
    },
  }
};

// Dark Theme Configuration
export const darkTheme = {
  algorithm: darkAlgorithm,
  token: {
    ...lightTheme.token,
    
    // Background Colors
    colorBgBase: designTokens.colors.dark.bgPrimary,
    colorBgContainer: designTokens.colors.dark.surface,
    colorBgElevated: designTokens.colors.dark.surface,
    colorBgLayout: designTokens.colors.dark.bgSecondary,
    colorBgSpotlight: designTokens.colors.dark.bgTertiary,
    
    // Text Colors
    colorText: designTokens.colors.gray100,
    colorTextSecondary: designTokens.colors.gray300,
    colorTextTertiary: designTokens.colors.gray400,
    colorTextQuaternary: designTokens.colors.gray500,
    
    // Border Colors
    colorBorder: designTokens.colors.gray700,
    colorBorderSecondary: designTokens.colors.gray800,
  },
  components: {
    ...lightTheme.components,
    
    // Dark mode specific overrides
    Layout: {
      ...lightTheme.components.Layout,
      headerBg: designTokens.colors.dark.surface,
      headerColor: designTokens.colors.gray100,
      siderBg: designTokens.colors.dark.bgTertiary,
    },
    
    Card: {
      ...lightTheme.components.Card,
      actionsBg: designTokens.colors.dark.bgSecondary,
      colorBorderSecondary: designTokens.colors.gray700,
    },
    
    Table: {
      ...lightTheme.components.Table,
      headerBg: designTokens.colors.dark.bgSecondary,
      headerColor: designTokens.colors.gray200,
      bodySortBg: designTokens.colors.dark.bgSecondary,
      rowHoverBg: designTokens.colors.dark.bgSecondary,
      rowExpandedBg: designTokens.colors.dark.bgSecondary,
      headerSplitColor: designTokens.colors.gray700,
      borderColor: designTokens.colors.gray700,
      footerBg: designTokens.colors.dark.bgSecondary,
      filterDropdownBg: designTokens.colors.dark.surface,
    },
    
    Modal: {
      ...lightTheme.components.Modal,
      contentBg: designTokens.colors.dark.surface,
      titleColor: designTokens.colors.gray100,
      maskBg: 'rgba(0, 0, 0, 0.65)',
    },
  }
};

// Theme Configuration Factory
export const createThemeConfig = (isDark = false) => {
  return isDark ? darkTheme : lightTheme;
};

// CSS Variables for dynamic theming
export const generateCSSVariables = (isDark = false) => {
  const tokens = isDark ? darkTheme.token : lightTheme.token;
  
  return {
    // Primary Colors
    '--color-primary': tokens.colorPrimary,
    '--color-primary-hover': tokens.colorPrimaryHover,
    '--color-primary-active': tokens.colorPrimaryActive,
    
    // Status Colors
    '--color-success': tokens.colorSuccess,
    '--color-warning': tokens.colorWarning,
    '--color-error': tokens.colorError,
    '--color-info': tokens.colorInfo,
    
    // Background Colors
    '--color-bg-base': tokens.colorBgBase,
    '--color-bg-container': tokens.colorBgContainer,
    '--color-bg-elevated': tokens.colorBgElevated,
    '--color-bg-layout': tokens.colorBgLayout,
    '--color-bg-spotlight': tokens.colorBgSpotlight,
    
    // Text Colors
    '--color-text': tokens.colorText,
    '--color-text-secondary': tokens.colorTextSecondary,
    '--color-text-tertiary': tokens.colorTextTertiary,
    '--color-text-quaternary': tokens.colorTextQuaternary,
    
    // Border Colors
    '--color-border': tokens.colorBorder,
    '--color-border-secondary': tokens.colorBorderSecondary,
    
    // Typography
    '--font-family': tokens.fontFamily,
    '--font-size': `${tokens.fontSize}px`,
    '--line-height': tokens.lineHeight,
    
    // Spacing
    '--padding': `${tokens.padding}px`,
    '--margin': `${tokens.margin}px`,
    
    // Border Radius
    '--border-radius': `${tokens.borderRadius}px`,
    '--border-radius-lg': `${tokens.borderRadiusLG}px`,
    '--border-radius-sm': `${tokens.borderRadiusSM}px`,
    
    // Shadows
    '--box-shadow': tokens.boxShadow,
    '--box-shadow-secondary': tokens.boxShadowSecondary,
    '--box-shadow-tertiary': tokens.boxShadowTertiary,
    
    // Motion
    '--motion-duration-fast': tokens.motionDurationFast,
    '--motion-duration-mid': tokens.motionDurationMid,
    '--motion-duration-slow': tokens.motionDurationSlow,
    '--motion-ease-in-out': tokens.motionEaseInOut,
  };
};

const adminTheme = {
  designTokens,
  lightTheme,
  darkTheme,
  createThemeConfig,
  generateCSSVariables
};

export default adminTheme;
