import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion, AnimatePresence, useScroll, useTransform } from 'framer-motion';
import { 
  FiMenu, 
  FiX, 
  FiHome, 
  FiUser, 
  FiBriefcase, 
  FiBookOpen, 
  FiMail,
  FiSun,
  FiMoon,
  FiZap,
  FiGlobe,
  FiStar
} from 'react-icons/fi';
import { useTheme } from '../../../contexts/ThemeContext';
import './Header.scss';

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState('/');
  const { isDark, toggleTheme } = useTheme();
  const location = useLocation();
  
  const { scrollYProgress } = useScroll();
  const headerY = useTransform(scrollYProgress, [0, 0.1], [0, -10]);
  const headerOpacity = useTransform(scrollYProgress, [0, 0.1], [1, 0.98]);
  const logoScale = useTransform(scrollYProgress, [0, 0.1], [1, 0.9]);

  const navItems = [
    { path: '/', label: 'Trang chủ', icon: FiHome },
    { path: '/about', label: 'Giới thiệu', icon: FiUser },
    { path: '/projects', label: 'Dự án', icon: FiBriefcase },
    { path: '/blog', label: 'Blog', icon: FiBookOpen },
    { path: '/contact', label: 'Liên hệ', icon: FiMail },
  ];

  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY;
      setIsScrolled(scrollPosition > 50);
      
      // Update active section based on scroll position
      setActiveSection(location.pathname);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [location.pathname]);

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
      style={{
        y: headerY,
        opacity: headerOpacity,
      }}
    >
      <div className="container mx-auto px-4">
        <div className="header-content-v2">
          {/* Enhanced Logo */}
          <Link to="/" className="logo-v2" onClick={closeMenu}>
            <motion.div
              className="logo-container"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              style={{ scale: logoScale }}
            >
              <div className="logo-icon">
                <motion.span 
                  className="logo-text"
                  animate={{
                    textShadow: [
                      "0 0 10px #00d4ff80",
                      "0 0 20px #00d4ff80", 
                      "0 0 10px #00d4ff80"
                    ]
                  }}
                  transition={{ duration: 2, repeat: Infinity }}
                >
                  NH
                </motion.span>
                <motion.div 
                  className="logo-glow"
                  animate={{
                    scale: [1, 1.2, 1],
                    opacity: [0.5, 1, 0.5]
                  }}
                  transition={{ duration: 2, repeat: Infinity }}
                />
                <FiZap className="logo-spark" />
              </div>
              <div className="logo-label">
                <span className="logo-name">Nguyễn Hoài Dinh</span>
                <span className="logo-role">
                  <FiGlobe className="role-icon" />
                  Full-Stack Developer
                </span>
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
                    <motion.div
                      className="nav-icon-wrapper"
                      whileHover={{ rotate: 360 }}
                      transition={{ duration: 0.5 }}
                    >
                      <item.icon className="nav-icon" />
                    </motion.div>
                    <span className="nav-text">{item.label}</span>
                    <motion.div 
                      className="nav-indicator"
                      animate={{
                        scale: location.pathname === item.path ? [1, 1.2, 1] : 1
                      }}
                      transition={{ duration: 1, repeat: location.pathname === item.path ? Infinity : 0 }}
                    />
                    {location.pathname === item.path && (
                      <motion.div
                        className="nav-active-glow"
                        animate={{
                          boxShadow: [
                            "0 0 10px #00d4ff40",
                            "0 0 20px #00d4ff60",
                            "0 0 10px #00d4ff40"
                          ]
                        }}
                        transition={{ duration: 2, repeat: Infinity }}
                      />
                    )}
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
              <motion.div 
                className="theme-toggle-inner"
                animate={{
                  rotate: isDark ? 0 : 180,
                  background: isDark 
                    ? "linear-gradient(135deg, #ffd60a, #ffbe0b)"
                    : "linear-gradient(135deg, #8b5cf6, #7c3aed)"
                }}
                transition={{ duration: 0.5 }}
              >
                <AnimatePresence mode="wait">
                  {isDark ? (
                    <motion.div
                      key="sun"
                      initial={{ scale: 0, rotate: -180 }}
                      animate={{ scale: 1, rotate: 0 }}
                      exit={{ scale: 0, rotate: 180 }}
                      transition={{ duration: 0.3 }}
                    >
                      <FiSun className="theme-icon" />
                    </motion.div>
                  ) : (
                    <motion.div
                      key="moon"
                      initial={{ scale: 0, rotate: -180 }}
                      animate={{ scale: 1, rotate: 0 }}
                      exit={{ scale: 0, rotate: 180 }}
                      transition={{ duration: 0.3 }}
                    >
                      <FiMoon className="theme-icon" />
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            </motion.button>

            {/* Enhanced CTA Button */}
            <Link to="/contact" className="cta-button">
              <motion.span
                animate={{
                  background: [
                    "linear-gradient(45deg, #00d4ff, #8b5cf6)",
                    "linear-gradient(45deg, #8b5cf6, #06ffa5)",
                    "linear-gradient(45deg, #06ffa5, #00d4ff)"
                  ]
                }}
                transition={{ duration: 3, repeat: Infinity }}
                className="cta-text"
              >
                <FiStar className="cta-icon" />
                Thuê tôi
              </motion.span>
              <motion.div 
                className="cta-glow"
                animate={{
                  opacity: [0.5, 1, 0.5],
                  scale: [1, 1.1, 1]
                }}
                transition={{ duration: 2, repeat: Infinity }}
              />
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
