import React, { useState, useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import "./Header.scss";
import { ROUTES } from "router/routeConstants";
import img from "assets/Img";
import { useTheme } from "theme/ThemeProvider";

function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const { light, toggle } = useTheme();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navItems = [
    { name: "Trang chủ", path: ROUTES.HOME, id: "home" },
    { name: "Giới thiệu", path: ROUTES.ABOUT, id: "about" },
    { name: "Dự án", path: ROUTES.PROJECTS, id: "projects" },
    { name: "Blog", path: ROUTES.BLOG, id: "blog" },
    { name: "Liên hệ", path: ROUTES.CONTACT, id: "contact" },
  ];

  const handleNavigation = (path) => {
    navigate(path);
    setIsMobileMenuOpen(false);
  };

  const isActiveRoute = (path) => {
    return location.pathname === path;
  };

  return (
    <header className={`header ${isScrolled ? "header--scrolled" : ""}`}>
      <div className="header__container">
        {/* Logo */}

        <Link to="/" className="header__logo">
          <div className="header__logo-container">
            <img
              width={50}
              height={50}
              src={light ? img.Logo : img.Logo2}
              alt="Nguyen Hoang Dinh - Portfolio"
            />
 
            <div className="header__logo-text-container">
              <h1 className="header__logo-text">Nguyen Hoang Dinh</h1>
              <span className="header__logo-subtitle">Full Stack Developer</span>
            </div>
          </div>
        </Link>
        {/* Desktop Navigation */}
        <nav className="header__nav">
          <ul className="header__nav-list">
            {navItems.map((item) => (
              <li key={item.id} className="header__nav-item">
                <Link
                  to={item.path}
                  className={`header__nav-link ${isActiveRoute(item.path) ? "header__nav-link--active" : ""}`}
                >
                  {item.name}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        {/* Theme Toggle (Desktop) */}
        <button
          type="button"
          className={`header__theme-toggle ${light ? "" : "header__theme-toggle--dark"}`}
          onClick={toggle}
          aria-label={light ? "Bật chế độ tối" : "Tắt chế độ tối"}
          aria-pressed={!light}
          title={light ? "Bật chế độ tối" : "Tắt chế độ tối"}
        />

        {/* Mobile Menu Button */}
        <button
          className={`header__mobile-toggle ${isMobileMenuOpen ? "header__mobile-toggle--open" : ""}`}
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          aria-label="Toggle mobile menu"
        >
          <span></span>
          <span></span>
          <span></span>
        </button>

        {/* Mobile Navigation */}
        <div
          className={`header__mobile-menu ${isMobileMenuOpen ? "header__mobile-menu--open" : ""}`}
        >
          <ul className="header__mobile-nav-list">
            {navItems.map((item) => (
              <li key={item.id} className="header__mobile-nav-item">
                <button
                  className={`header__mobile-nav-link ${isActiveRoute(item.path) ? "header__mobile-nav-link--active" : ""}`}
                  onClick={() => handleNavigation(item.path)}
                >
                  {item.name}
                </button>
              </li>
            ))}
            {/* Theme Toggle (Mobile) */}
            <li key="theme" className="header__mobile-nav-item">
              <button
                type="button"
                className="header__mobile-nav-link"
                onClick={() => {
                  toggle();
                  // keep menu state as is; close only if you want auto-close
                }}
                aria-pressed={!light}
                aria-label={light ? "Bật chế độ tối" : "Tắt chế độ tối"}
                title="Chuyển chế độ sáng/tối"
              >
                Chế độ tối: {light ? "Tắt" : "Bật"}
              </button>
            </li>
          </ul>
        </div>

        {/* Mobile Menu Overlay */}
        {isMobileMenuOpen && (
          <button
            className="header__mobile-overlay"
            onClick={() => setIsMobileMenuOpen(false)}
            aria-label="Close mobile menu"
            type="button"
          />
        )}
      </div>
    </header>
  );
}

export default Header;
