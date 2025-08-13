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

        {/* Right actions */}
        <div className="header__actions">
          {/* Theme Toggle (Desktop) */}
          <button
            type="button"
            className={`header__theme-toggle ${light ? "" : "header__theme-toggle--dark"}`}
            onClick={toggle}
            aria-label={light ? "Bật chế độ tối" : "Tắt chế độ tối"}
            aria-pressed={!light}
            title={light ? "Bật chế độ tối" : "Tắt chế độ tối"}
          />

          {/* Settings (Login) */}
          <button
            type="button"
            className="header__settings"
            onClick={() => handleNavigation(ROUTES.ADMIN.LOGIN)}
            aria-label="Đi đến trang đăng nhập"
            title="Đăng nhập"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              aria-hidden="true"
              focusable="false"
              width="20"
              height="20"
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="M9.594 3.94c.09-.542.56-.94 1.11-.94h2.593c.55 0 1.02.398 1.11.94l.213 1.281c.063.374.313.686.645.87.074.04.147.083.22.127.325.196.72.257 1.075.124l1.217-.456a1.125 1.125 0 0 1 1.37.49l1.296 2.247a1.125 1.125 0 0 1-.26 1.431l-1.003.827c-.293.241-.438.613-.43.992a7.723 7.723 0 0 1 0 .255c-.008.378.137.75.43.991l1.004.827c.424.35.534.955.26 1.43l-1.298 2.247a1.125 1.125 0 0 1-1.369.491l-1.217-.456c-.355-.133-.75-.072-1.076.124a6.47 6.47 0 0 1-.22.128c-.331.183-.581.495-.644.869l-.213 1.281c-.09.543-.56.94-1.11.94h-2.594c-.55 0-1.019-.398-1.11-.94l-.213-1.281c-.062-.374-.312-.686-.644-.87a6.52 6.52 0 0 1-.22-.127c-.325-.196-.72-.257-1.076-.124l-1.217.456a1.125 1.125 0 0 1-1.369-.49l-1.297-2.247a1.125 1.125 0 0 1 .26-1.431l1.004-.827c.292-.24.437-.613.43-.991a6.932 6.932 0 0 1 0-.255c.007-.38-.138-.751-.43-.992l-1.004-.827a1.125 1.125 0 0 1-.26-1.43l1.297-2.247a1.125 1.125 0 0 1 1.37-.491l1.216.456c.356.133.751.072 1.076-.124.072-.044.146-.086.22-.128.332-.183.582-.495.644-.869l.214-1.28Z" />
              <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
            </svg>
          </button>

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
        </div>

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
            {/* Login (Mobile) */}
            <li key="login" className="header__mobile-nav-item">
              <button
                type="button"
                className="header__mobile-nav-link"
                onClick={() => handleNavigation(ROUTES.ADMIN.LOGIN)}
                aria-label="Đi đến trang đăng nhập"
                title="Đăng nhập"
              >
                {/* <svg
                  className="header__mobile-nav-icon"
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  aria-hidden="true"
                  focusable="false"
                >
                  <path d="M12 15.5a3.5 3.5 0 1 0 0-7 3.5 3.5 0 0 0 0 7Z" />
                  <path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 1 1-2.83 2.83l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 1 1-4 0v-.09A1.65 1.65 0 0 0 8 19.61a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 1 1-2.83-2.83l.06-.06A1.65 1.65 0 0 0 3.39 15a1.65 1.65 0 0 0-1.51-1H1.8a2 2 0 1 1 0-4h.09A1.65 1.65 0 0 0 3.39 8a1.65 1.65 0 0 0-.33-1.82l-.06-.06A2 2 0 1 1 5.83 3.3l.06.06A1.65 1.65 0 0 0 7.71 3a1.65 1.65 0 0 0 1-1.51V1.4a2 2 0 1 1 4 0v.09A1.65 1.65 0 0 0 14.61 3a1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 1 1 2.83 2.83l-.06.06A1.65 1.65 0 0 0 19.4 8c.67.3 1.1.96 1.1 1.7s-.43 1.41-1.1 1.7Z" />
                </svg> */}
                Đăng nhập
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
