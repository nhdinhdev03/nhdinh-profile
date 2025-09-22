
import PropTypes from "prop-types";
import { memo, useMemo } from "react";
import Header from "./Header/Header";
import Footer from "./Footer/Footer";
import Breadcrumb from "./Breadcrumb/Breadcrumb";

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
