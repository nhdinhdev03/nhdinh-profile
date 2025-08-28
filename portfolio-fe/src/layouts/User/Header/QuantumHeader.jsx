import React, { useState, useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import "./QuantumHeader.scss";
import { AUTH_LOGIN, ROUTES } from "router/routeConstants";
import { useUserTheme } from "theme";
import { useAuth } from "contexts/AuthContext";
import { useNotificationContext } from "components/Notification";

function QuantumHeader() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const { light, toggle } = useUserTheme();
  const { isAuthenticated, logout } = useAuth();
  const notification = useNotificationContext();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navItems = [
    {
      name: "HOME",
      path: ROUTES.HOME,
      id: "home",
      icon: "fas fa-home",
      desc: "Trang chính",
    },
    {
      name: "ABOUT",
      path: ROUTES.ABOUT,
      id: "about",
      icon: "fas fa-user-astronaut",
      desc: "Thông tin cá nhân",
    },
    {
      name: "PROJECTS",
      path: ROUTES.PROJECTS,
      id: "projects",
      icon: "fas fa-project-diagram",
      desc: "Danh mục dự án",
      badge: "5",
    },
    {
      name: "BLOG",
      path: ROUTES.BLOG,
      id: "blog",
      icon: "fas fa-flask",
      desc: "Bài viết & Chia sẻ",
    },
    {
      name: "CONTACT",
      path: ROUTES.CONTACT,
      id: "contact",
      icon: "fas fa-satellite-dish",
      desc: "Thông tin liên lạc",
    },
  ];

  const handleNavigation = (path) => {
    navigate(path);
    setIsMobileMenuOpen(false);
  };

  const handleLogout = async () => {
    try {
      await logout();
      notification.success("Đăng xuất thành công!", 3000);
      navigate(AUTH_LOGIN);
      setIsMobileMenuOpen(false);
    } catch (error) {
      console.error("Logout failed:", error);
      notification.error("Có lỗi xảy ra khi đăng xuất!", 4000);
    }
  };

  const isActiveRoute = (path) => {
    return location.pathname === path;
  };

  return (
    <>
      {/* Quantum Background Effects */}
      <div className="holographic-bg"></div>
      <div className="quantum-grid"></div>
      <div className="floating-shapes">
        <div className="shape"></div>
        <div className="shape"></div>
        <div className="shape"></div>
        <div className="shape"></div>
      </div>

      <header
        id="quantum-header"
        className={`quantum-header fixed top-0 left-0 right-0 z-50 transition-all duration-700 cyber-glass ${
          isScrolled ? "quantum-header--scrolled" : ""
        }`}
      >
        <nav className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-20 lg:h-24">
            {/* Quantum Logo */}
            <div className="flex-shrink-0">
              <Link to="/" className="flex items-center space-x-4 quantum-logo">
                <div className="w-16 h-16 logo-core rounded-2xl flex items-center justify-center shadow-2xl relative">
                  <span className="text-2xl font-black text-white font-cyber relative z-10">
                    NH
                  </span>
                </div>
                <div className="hidden sm:block">
                  <div
                    className="logo-text font-cyber text-3xl"
                    data-text="NHDinh"
                  >
                    NHDinh
                  </div>
                  <div className="text-xs text-gray-400 font-mono tracking-widest uppercase">
                    QUANTUM DEVELOPER
                  </div>
                </div>
              </Link>
            </div>

            {/* Holographic Navigation */}
            <div className="hidden lg:block">
              <div className="flex items-center space-x-2">
                {navItems.map((item) => (
                  <Link
                    key={item.id}
                    to={item.path}
                    className={`holo-nav text-white hover:text-gray-200 font-space relative ${
                      isActiveRoute(item.path) ? "holo-nav--active" : ""
                    }`}
                  >
                    <i className={`${item.icon} mr-3 text-lg`}></i>
                    {item.name}
                  </Link>
                ))}
              </div>
            </div>

            {/* Quantum Controls */}
            <div className="hidden lg:flex items-center space-x-4">
              {/* Theme Toggle */}
              <button
                className="quantum-toggle"
                onClick={toggle}
                title="TOGGLE QUANTUM MODE"
                aria-label={light ? "Bật chế độ tối" : "Tắt chế độ tối"}
              >
                <i
                  className={`fas ${
                    light ? "fa-moon" : "fa-sun"
                  } text-white text-lg`}
                ></i>
              </button>

              {/* Auth Actions */}
              {isAuthenticated ? (
                <button
                  className="quantum-toggle"
                  onClick={handleLogout}
                  title="ĐĂNG XUẤT"
                  aria-label="Đăng xuất"
                >
                  <i className="fas fa-sign-out-alt text-white text-lg"></i>
                </button>
              ) : (
                <button
                  className="quantum-toggle"
                  onClick={() => handleNavigation(AUTH_LOGIN)}
                  title="ĐĂNG NHẬP"
                  aria-label="Đi đến trang đăng nhập"
                >
                  <i className="fas fa-user text-white text-lg"></i>
                </button>
              )}
            </div>

            {/* Mobile Quantum Controls */}
            <div className="lg:hidden flex items-center space-x-3">
              {/* Mobile Theme Toggle */}
              <button
                className="quantum-toggle"
                onClick={toggle}
                style={{ width: "45px", height: "45px" }}
                aria-label={light ? "Bật chế độ tối" : "Tắt chế độ tối"}
              >
                <i
                  className={`fas ${
                    light ? "fa-moon" : "fa-sun"
                  } text-white text-sm`}
                ></i>
              </button>

              {/* Mobile Menu Trigger */}
              <button
                className={`holo-hamburger text-white hover:text-gray-200 focus:outline-none ${
                  isMobileMenuOpen ? "active" : ""
                }`}
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                aria-label="Toggle mobile menu"
              >
                <div className="w-8 h-8 flex flex-col justify-center items-center space-y-1">
                  <div className="hamburger-line w-7 h-0.5 bg-cyan-400"></div>
                  <div className="hamburger-line w-7 h-0.5 bg-cyan-400"></div>
                  <div className="hamburger-line w-7 h-0.5 bg-cyan-400"></div>
                </div>
              </button>
            </div>
          </div>
        </nav>

        {/* Neural Network Mobile Menu */}
        <div
          className={`neural-menu lg:hidden fixed top-0 right-0 h-full w-96 z-50 ${
            isMobileMenuOpen ? "active" : ""
          }`}
        >
          <div className="flex flex-col h-full">
            {/* Neural Header */}
            <div className="flex items-center justify-between p-8 border-b border-cyan-500/20">
              <div className="flex items-center space-x-4">
                <div className="w-12 h-12 logo-core rounded-xl flex items-center justify-center">
                  <span className="text-lg font-black text-white font-cyber">
                    NH
                  </span>
                </div>
                <div>
                  <div className="text-xl font-bold text-white font-cyber">
                    NEURAL INTERFACE
                  </div>
                  <div className="text-xs text-gray-400 font-mono">
                    QUANTUM PORTAL
                  </div>
                </div>
              </div>
              <button
                className="text-white hover:text-red-400 focus:outline-none p-3 rounded-xl hover:bg-red-500/10 transition-all duration-300"
                onClick={() => setIsMobileMenuOpen(false)}
                aria-label="Close mobile menu"
              >
                <i className="fas fa-times text-xl"></i>
              </button>
            </div>

            {/* Neural Navigation Links */}
            <div className="flex-1 px-8 py-8 space-y-3">
              {navItems.map((item, index) => (
                <button
                  key={item.id}
                  className={`neural-nav-link flex items-center space-x-4 text-white py-5 px-6 rounded-2xl font-space font-semibold w-full text-left ${
                    isActiveRoute(item.path) ? "neural-nav-link--active" : ""
                  }`}
                  onClick={() => handleNavigation(item.path)}
                  style={{ animationDelay: `${index * 0.1}s` }}
                >
                  <i className={`${item.icon} text-xl w-8 text-cyan-400`}></i>
                  <span>{item.name}</span>
                  {item.badge && (
                    <span className="quantum-badge">{item.badge}</span>
                  )}
                  <i className="fas fa-chevron-right ml-auto text-sm opacity-50"></i>
                </button>
              ))}
            </div>

            {/* Neural Footer */}
            <div className="p-8 border-t border-cyan-500/20 space-y-6">
              {/* Quick Actions */}
              <div className="grid grid-cols-2 gap-4">
                <button className="cyber-glass text-white px-4 py-3 rounded-xl text-sm font-space font-semibold hover:bg-white/10 transition-all duration-300">
                  <i className="fas fa-globe mr-2"></i>TRANSLATE
                </button>
                <button
                  className="cyber-glass text-white px-4 py-3 rounded-xl text-sm font-space font-semibold hover:bg-white/10 transition-all duration-300"
                  onClick={() => {
                    toggle();
                    setIsMobileMenuOpen(false);
                  }}
                >
                  <i className="fas fa-palette mr-2"></i>THEME
                </button>
              </div>

              {/* Social Matrix */}
              <div className="flex space-x-4 justify-center">
                <button className="w-12 h-12 cyber-glass rounded-xl flex items-center justify-center text-white hover:text-cyan-400 hover:bg-cyan-500/10 transition-all duration-300">
                  <i className="fab fa-github text-lg"></i>
                </button>
                <button className="w-12 h-12 cyber-glass rounded-xl flex items-center justify-center text-white hover:text-blue-400 hover:bg-blue-500/10 transition-all duration-300">
                  <i className="fab fa-linkedin text-lg"></i>
                </button>
                <button className="w-12 h-12 cyber-glass rounded-xl flex items-center justify-center text-white hover:text-pink-400 hover:bg-pink-500/10 transition-all duration-300">
                  <i className="fab fa-twitter text-lg"></i>
                </button>
                <button className="w-12 h-12 cyber-glass rounded-xl flex items-center justify-center text-white hover:text-purple-400 hover:bg-purple-500/10 transition-all duration-300">
                  <i className="fab fa-discord text-lg"></i>
                </button>
              </div>

              {/* Auth Actions */}
              {isAuthenticated ? (
                <button
                  className="quantum-cta w-full text-white px-6 py-4 rounded-2xl text-center font-bold transition-all duration-300 flex items-center justify-center space-x-3 font-space"
                  onClick={handleLogout}
                >
                  <i className="fas fa-sign-out-alt"></i>
                  <span>ĐĂNG XUẤT</span>
                </button>
              ) : (
                <button
                  className="quantum-cta w-full text-white px-6 py-4 rounded-2xl text-center font-bold transition-all duration-300 flex items-center justify-center space-x-3 font-space"
                  onClick={() => handleNavigation(AUTH_LOGIN)}
                >
                  <i className="fas fa-user"></i>
                  <span>ĐĂNG NHẬP</span>
                </button>
              )}
            </div>
          </div>
        </div>

        {/* Quantum Menu Overlay */}
        {isMobileMenuOpen && (
          <div
            className="fixed inset-0 bg-black/80 backdrop-blur-md z-40 lg:hidden transition-all duration-500"
            onClick={() => setIsMobileMenuOpen(false)}
            aria-label="Close mobile menu"
          />
        )}
      </header>
    </>
  );
}

export default QuantumHeader;
