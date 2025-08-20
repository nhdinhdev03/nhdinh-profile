import React, { useState, useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import "./Header.scss";
import { ROUTES } from "router/routeConstants";
import img from "assets/Img";
import { useUserTheme } from "../../../theme";

function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const { light, toggle } = useUserTheme();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navItems = [
    { 
      name: "Trang chủ", 
      path: ROUTES.HOME, 
      id: "home",
      icon: (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/>
          <polyline points="9,22 9,12 15,12 15,22"/>
        </svg>
      )
    },
    { 
      name: "Giới thiệu", 
      path: ROUTES.ABOUT, 
      id: "about",
      icon: (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/>
          <circle cx="12" cy="7" r="4"/>
        </svg>
      )
    },
    { 
      name: "Dự án", 
      path: ROUTES.PROJECTS, 
      id: "projects",
      icon: (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <rect x="2" y="3" width="20" height="14" rx="2" ry="2"/>
          <line x1="8" y1="21" x2="16" y2="21"/>
          <line x1="12" y1="17" x2="12" y2="21"/>
        </svg>
      )
    },
    { 
      name: "Blog", 
      path: ROUTES.BLOG, 
      id: "blog",
      icon: (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/>
          <polyline points="14,2 14,8 20,8"/>
          <line x1="16" y1="13" x2="8" y2="13"/>
          <line x1="16" y1="17" x2="8" y2="17"/>
          <polyline points="10,9 9,9 8,9"/>
        </svg>
      )
    },
    { 
      name: "Liên hệ", 
      path: ROUTES.CONTACT, 
      id: "contact",
      icon: (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/>
          <polyline points="22,6 12,13 2,6"/>
        </svg>
      )
    },
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
              <span className="header__logo-subtitle">
                Full Stack Developer
              </span>
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
                  className={`header__nav-link ${
                    isActiveRoute(item.path) ? "header__nav-link--active" : ""
                  }`}
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
            className={`header__theme-toggle ${
              light ? "" : "header__theme-toggle--dark"
            }`}
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
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M9.594 3.94c.09-.542.56-.94 1.11-.94h2.593c.55 0 1.02.398 1.11.94l.213 1.281c.063.374.313.686.645.87.074.04.147.083.22.127.325.196.72.257 1.075.124l1.217-.456a1.125 1.125 0 0 1 1.37.49l1.296 2.247a1.125 1.125 0 0 1-.26 1.431l-1.003.827c-.293.241-.438.613-.43.992a7.723 7.723 0 0 1 0 .255c-.008.378.137.75.43.991l1.004.827c.424.35.534.955.26 1.43l-1.298 2.247a1.125 1.125 0 0 1-1.369.491l-1.217-.456c-.355-.133-.75-.072-1.076.124a6.47 6.47 0 0 1-.22.128c-.331.183-.581.495-.644.869l-.213 1.281c-.09.543-.56.94-1.11.94h-2.594c-.55 0-1.019-.398-1.11-.94l-.213-1.281c-.062-.374-.312-.686-.644-.87a6.52 6.52 0 0 1-.22-.127c-.325-.196-.72-.257-1.076-.124l-1.217.456a1.125 1.125 0 0 1-1.369-.49l-1.297-2.247a1.125 1.125 0 0 1 .26-1.431l1.004-.827c.292-.24.437-.613.43-.991a6.932 6.932 0 0 1 0-.255c.007-.38-.138-.751-.43-.992l-1.004-.827a1.125 1.125 0 0 1-.26-1.43l1.297-2.247a1.125 1.125 0 0 1 1.37-.491l1.216.456c.356.133.751.072 1.076-.124.072-.044.146-.086.22-.128.332-.183.582-.495.644-.869l.214-1.28Z"
              />
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M15 12a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z"
              />
            </svg>
          </button>

          {/* Mobile Menu Button */}
          <button
            className={`header__mobile-toggle ${
              isMobileMenuOpen ? "header__mobile-toggle--open" : ""
            }`}
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
          className={`header__mobile-menu ${
            isMobileMenuOpen ? "header__mobile-menu--open" : ""
          }`}
        >
          <div className="header__mobile-content">
            {/* Mobile Header */}
            <div className="header__mobile-header">
              <div className="header__mobile-title">
                <h2>Menu</h2>
                <span className="header__mobile-subtitle">Điều hướng nhanh</span>
              </div>
            
            </div>

            {/* Navigation Links */}
            <nav className="header__mobile-nav">
              <ul className="header__mobile-nav-list">
                {navItems.map((item, index) => (
                  <li key={item.id} className="header__mobile-nav-item" style={{ animationDelay: `${index * 0.1}s` }}>
                    <button
                      className={`header__mobile-nav-link ${
                        isActiveRoute(item.path)
                          ? "header__mobile-nav-link--active"
                          : ""
                      }`}
                      onClick={() => handleNavigation(item.path)}
                    >
                      <div className="header__mobile-nav-icon">
                        {item.icon}
                      </div>
                      <div className="header__mobile-nav-text">
                        <span className="header__mobile-nav-name">{item.name}</span>
                        <span className="header__mobile-nav-desc">
                          {item.id === 'home' && 'Trang chính'}
                          {item.id === 'about' && 'Thông tin cá nhân'}
                          {item.id === 'projects' && 'Danh mục dự án'}
                          {item.id === 'blog' && 'Bài viết & Chia sẻ'}
                          {item.id === 'contact' && 'Thông tin liên lạc'}
                        </span>
                      </div>
                      <div className="header__mobile-nav-arrow">
                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                          <polyline points="9,18 15,12 9,6"/>
                        </svg>
                      </div>
                    </button>
                  </li>
                ))}
              </ul>
            </nav>

            {/* Mobile Actions */}
            <div className="header__mobile-actions">
              {/* Theme Toggle */}
              <button
                type="button"
                className={`header__mobile-action ${
                  light ? "" : "header__mobile-action--active"
                }`}
                onClick={() => {
                  toggle();
                  setIsMobileMenuOpen(false);
                }}
                aria-pressed={!light}
                aria-label={light ? "Bật chế độ tối" : "Tắt chế độ tối"}
              >
                <div className="header__mobile-action-icon">
                  {light ? (
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"/>
                    </svg>
                  ) : (
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <circle cx="12" cy="12" r="5"/>
                      <line x1="12" y1="1" x2="12" y2="3"/>
                      <line x1="12" y1="21" x2="12" y2="23"/>
                      <line x1="4.22" y1="4.22" x2="5.64" y2="5.64"/>
                      <line x1="18.36" y1="18.36" x2="19.78" y2="19.78"/>
                      <line x1="1" y1="12" x2="3" y2="12"/>
                      <line x1="21" y1="12" x2="23" y2="12"/>
                      <line x1="4.22" y1="19.78" x2="5.64" y2="18.36"/>
                      <line x1="18.36" y1="5.64" x2="19.78" y2="4.22"/>
                    </svg>
                  )}
                </div>
                <div className="header__mobile-action-text">
                  <span>Chế độ {light ? "tối" : "sáng"}</span>
                  <small>Thay đổi giao diện</small>
                </div>
              </button>

              {/* Login */}
              <button
                type="button"
                className="header__mobile-action"
                onClick={() => handleNavigation(ROUTES.ADMIN.LOGIN)}
                aria-label="Đi đến trang đăng nhập"
              >
                <div className="header__mobile-action-icon">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M15 3h4a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2h-4"/>
                    <polyline points="10,17 15,12 10,7"/>
                    <line x1="15" y1="12" x2="3" y2="12"/>
                  </svg>
                </div>
                <div className="header__mobile-action-text">
                  <span>Đăng nhập</span>
                  <small>Truy cập quản trị</small>
                </div>
              </button>
            </div>

            {/* Mobile Footer */}
            <div className="header__mobile-footer">
              <div className="header__mobile-profile">
                <img 
                  src={light ? img.Logo : img.Logo2} 
                  alt="Avatar" 
                  className="header__mobile-avatar"
                />
                <div className="header__mobile-info">
                  <h4>Nguyen Hoang Dinh</h4>
                  <p>Full Stack Developer</p>
                </div>
              </div>
              <div className="header__mobile-version">
                <span>Portfolio v2.0</span>
              </div>
            </div>
          </div>
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
