import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  FiMenu, 
  FiX, 
  FiHome, 
  FiUser, 
  FiBriefcase, 
  FiBookOpen, 
  FiMail,
  FiSun,
  FiMoon
} from 'react-icons/fi';
import { useTheme } from '../../../contexts/ThemeContext';
import './Header.scss';

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const { isDark, toggleTheme } = useTheme();
  const location = useLocation();

  const navItems = [
    { path: '/', label: 'Trang chủ', icon: FiHome },
    { path: '/about', label: 'Giới thiệu', icon: FiUser },
    { path: '/projects', label: 'Dự án', icon: FiBriefcase },
    { path: '/blog', label: 'Blog', icon: FiBookOpen },
    { path: '/contact', label: 'Liên hệ', icon: FiMail },
  ];

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const closeMenu = () => {
    setIsMenuOpen(false);
  };

  return (
    <motion.header
      className={`header-v2 ${isScrolled ? 'scrolled' : ''}`}
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className="container mx-auto px-4">
        <div className="header-content-v2">
          {/* Enhanced Logo */}
          <Link to="/" className="logo-v2" onClick={closeMenu}>
            <motion.div
              className="logo-container"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <div className="logo-icon">
                <span className="logo-text">NH</span>
                <div className="logo-glow" />
              </div>
              <div className="logo-label">
                <span className="logo-name">Nguyễn Hoài Dinh</span>
                <span className="logo-role">Full-Stack Developer</span>
              </div>
            </motion.div>
          </Link>

          {/* Enhanced Desktop Navigation */}
          <nav className="desktop-nav">
            <ul className="nav-list">
              {navItems.map((item, index) => (
                <motion.li
                  key={item.path}
                  initial={{ opacity: 0, y: -20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                >
                  <Link
                    to={item.path}
                    className={`nav-link ${location.pathname === item.path ? 'active' : ''}`}
                  >
                    <item.icon className="nav-icon" />
                    <span className="nav-text">{item.label}</span>
                    <div className="nav-indicator" />
                  </Link>
                </motion.li>
              ))}
            </ul>
          </nav>

          {/* Enhanced Action Buttons */}
          <div className="header-actions">
            {/* Theme Toggle */}
            <motion.button
              className="theme-toggle"
              onClick={toggleTheme}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              aria-label="Toggle theme"
            >
              <div className="theme-toggle-inner">
                {isDark ? (
                  <FiSun className="theme-icon" />
                ) : (
                  <FiMoon className="theme-icon" />
                )}
              </div>
            </motion.button>

            {/* CTA Button */}
            <Link to="/contact" className="cta-button">
              <span>Thuê tôi</span>
              <div className="cta-glow" />
            </Link>

            {/* Mobile Menu Toggle */}
            <motion.button
              className="mobile-menu-toggle"
              onClick={toggleMenu}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              aria-label="Toggle menu"
            >
              <AnimatePresence mode="wait">
                {isMenuOpen ? (
                  <motion.div
                    key="close"
                    initial={{ rotate: -90, opacity: 0 }}
                    animate={{ rotate: 0, opacity: 1 }}
                    exit={{ rotate: 90, opacity: 0 }}
                    transition={{ duration: 0.2 }}
                  >
                    <FiX size={24} />
                  </motion.div>
                ) : (
                  <motion.div
                    key="menu"
                    initial={{ rotate: 90, opacity: 0 }}
                    animate={{ rotate: 0, opacity: 1 }}
                    exit={{ rotate: -90, opacity: 0 }}
                    transition={{ duration: 0.2 }}
                  >
                    <FiMenu size={24} />
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.button>
          </div>
        </div>

        {/* Enhanced Mobile Menu */}
        <AnimatePresence>
          {isMenuOpen && (
            <motion.div
              className="mobile-menu"
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.3 }}
            >
              <div className="mobile-menu-content">
                <nav className="mobile-nav">
                  <ul className="mobile-nav-list">
                    {navItems.map((item, index) => (
                      <motion.li
                        key={item.path}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: index * 0.1 }}
                      >
                        <Link
                          to={item.path}
                          className={`mobile-nav-link ${location.pathname === item.path ? 'active' : ''}`}
                          onClick={closeMenu}
                        >
                          <item.icon className="mobile-nav-icon" />
                          <span className="mobile-nav-text">{item.label}</span>
                          <div className="mobile-nav-indicator" />
                        </Link>
                      </motion.li>
                    ))}
                  </ul>
                </nav>

                <div className="mobile-menu-footer">
                  <div className="mobile-theme-toggle">
                    <span className="theme-label">Chế độ tối</span>
                    <button
                      className="mobile-theme-button"
                      onClick={toggleTheme}
                    >
                      <div className={`theme-slider ${isDark ? 'active' : ''}`}>
                        <div className="theme-slider-thumb">
                          {isDark ? <FiMoon size={14} /> : <FiSun size={14} />}
                        </div>
                      </div>
                    </button>
                  </div>
                  
                  <Link 
                    to="/contact" 
                    className="mobile-cta-button"
                    onClick={closeMenu}
                  >
                    <span>Bắt đầu dự án</span>
                    <FiMail className="cta-icon" />
                  </Link>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.header>
  );
};

export default Header;
