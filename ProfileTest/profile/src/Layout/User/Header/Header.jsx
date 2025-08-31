import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';

const Header = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navItems = [
    { name: 'Home', path: '/' },
    { name: 'About', path: '/about' },
    { name: 'Projects', path: '/projects' },
    { name: 'Blog', path: '/blog' },
    { name: 'Contact', path: '/contact' }
  ];

  const isActive = (path) => {
    return location.pathname === path;
  };

  return (
    <motion.header
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      className={`header ${isScrolled ? 'header--scrolled' : ''}`}
    >
      <div className="header__container">
        {/* Logo */}
        <Link to="/" className="header__logo">
          NH<span className="text-gradient">Dinh</span>
        </Link>

        {/* Desktop Navigation */}
        <nav className="header__nav">
          {navItems.map((item) => (
            <Link
              key={item.path}
              to={item.path}
              className={`header__nav-link ${
                isActive(item.path) ? 'header__nav-link--active' : ''
              }`}
            >
              {item.name}
            </Link>
          ))}
        </nav>

        {/* Actions */}
        <div className="header__actions">
          {/* Mobile menu button */}
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className={`header__mobile-toggle ${
              isMobileMenuOpen ? 'header__mobile-toggle--open' : ''
            }`}
          >
            <div className="icon">
              <div className={`absolute w-6 h-0.5 bg-current transition-all duration-300 ${
                isMobileMenuOpen ? 'rotate-45 top-2.5' : 'top-1'
              }`} />
              <div className={`absolute w-6 h-0.5 bg-current top-2.5 transition-all duration-300 ${
                isMobileMenuOpen ? 'opacity-0' : 'opacity-100'
              }`} />
              <div className={`absolute w-6 h-0.5 bg-current transition-all duration-300 ${
                isMobileMenuOpen ? '-rotate-45 top-2.5' : 'top-4'
              }`} />
            </div>
          </button>
        </div>

        {/* Mobile Navigation */}
        <motion.div
          initial={false}
          animate={{ 
            height: isMobileMenuOpen ? 'auto' : 0,
            opacity: isMobileMenuOpen ? 1 : 0
          }}
          transition={{ duration: 0.3 }}
          className={`header__mobile-menu ${
            isMobileMenuOpen ? 'header__mobile-menu--open' : ''
          }`}
        >
          <nav className="header__mobile-nav">
            {navItems.map((item) => (
              <Link
                key={item.path}
                to={item.path}
                onClick={() => setIsMobileMenuOpen(false)}
                className={`header__mobile-nav-link ${
                  isActive(item.path) ? 'header__mobile-nav-link--active' : ''
                }`}
              >
                {item.name}
              </Link>
            ))}
          </nav>
        </motion.div>
      </div>
    </motion.header>
  );
};

export default Header;