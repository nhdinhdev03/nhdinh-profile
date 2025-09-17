import React, { memo, useMemo } from "react";
import PropTypes from "prop-types";
import Header from "layouts/Header/Header";
import Footer from "layouts/Footer/Footer";
import Breadcrumb from "layouts/Breadcrumb/Breadcrumb";

const MainLayout = memo(
  ({ children, theme, toggleTheme, showBreadcrumb = true }) => {
    // Memoize main styles để tránh re-calculate mỗi lần render
    const mainStyles = useMemo(
      () => ({
        // Enhanced responsive padding
        paddingTop: showBreadcrumb
          ? "clamp(100px, 15vh, 140px)"
          : "clamp(60px, 10vh, 80px)",
        minHeight: "100vh",
        // Enhanced safe area insets for modern devices
        // paddingLeft: "max(env(safe-area-inset-left, 0), 0px)",
        // paddingRight: "max(env(safe-area-inset-right, 0), 0px)",
        // paddingBottom: "env(safe-area-inset-bottom, 0)",
        // // Performance optimizations
        // willChange: "contents",
        // transform: "translateZ(0)", // Force hardware acceleration
        // contain: "layout style paint", // CSS containment for better performance
        // // Enhanced responsive behavior
        // width: "100%",
        // overflowX: "hidden", // Prevent horizontal scroll
        // position: "relative",
        // isolation: "isolate", // Create stacking context
      }),
      [showBreadcrumb]
    );

    // Memoize Breadcrumb component để tránh re-render khi theme thay đổi
    const breadcrumbComponent = useMemo(() => {
      return showBreadcrumb ? <Breadcrumb /> : null;
    }, [showBreadcrumb]);

    return (
      <div className="App" data-theme={theme}>
        <Header theme={theme} toggleTheme={toggleTheme} />
        {breadcrumbComponent}
        <main style={mainStyles}>{children}</main>
        <Footer />
      </div>
    );
  }
);

MainLayout.displayName = "MainLayout";

MainLayout.propTypes = {
  children: PropTypes.node.isRequired,
  theme: PropTypes.string.isRequired,
  toggleTheme: PropTypes.func.isRequired,
  showBreadcrumb: PropTypes.bool,
};

export default MainLayout;
