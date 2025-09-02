import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion, AnimatePresence, useReducedMotion } from 'framer-motion';
import { useTheme } from '../../contexts/ThemeContext';
import { ROUTES } from '../../router/routeConstants';
import { 
  FiMenu, 
  FiX, 
  FiSun, 
  FiMoon, 
  FiHome, 
  FiUser, 
  FiBriefcase, 
  FiBook, 
  FiMail 
} from 'react-icons/fi';

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const { isDark, toggleTheme } = useTheme();
  const location = useLocation();
  const prefersReducedMotion = useReducedMotion();

  const navigation = [
    { name: 'Home', href: ROUTES.HOME, icon: FiHome },
    { name: 'About', href: ROUTES.ABOUT, icon: FiUser },
    { name: 'Projects', href: ROUTES.PROJECTS, icon: FiBriefcase },
    { name: 'Blog', href: ROUTES.BLOG, icon: FiBook },
    { name: 'Contact', href: ROUTES.CONTACT, icon: FiMail },
  ];

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close mobile menu on route change
  useEffect(() => {
    if (isMenuOpen) setIsMenuOpen(false);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [location.pathname]);

  const closeMenu = () => setIsMenuOpen(false);

  return (
    <>
      <motion.header
        initial={prefersReducedMotion ? false : { y: -100 }}
        animate={prefersReducedMotion ? {} : { y: 0 }}
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          isScrolled
            ? 'theme-bg-primary/95 theme-border border-b backdrop-blur-md shadow-lg'
            : 'bg-transparent'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16 md:h-20">
            {/* Logo */}
            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Link
                to="/"
                className="flex items-center space-x-2 text-2xl font-bold"
              >
                <div className="w-10 h-10 bg-gradient-to-br from-blue-600 to-cyan-500 dark:from-blue-500 dark:to-cyan-400 rounded-xl flex items-center justify-center text-white font-bold shadow-lg">
                  N
                </div>
                <span className="hidden sm:block theme-text-primary bg-gradient-to-r from-blue-600 to-cyan-500 dark:from-blue-400 dark:to-cyan-300 bg-clip-text text-transparent">
                  NH Dinh
                </span>
              </Link>
            </motion.div>

            {/* Desktop Navigation */}
            <nav className="hidden md:flex items-center space-x-4">
              {navigation.map((item) => {
                const isActive = location.pathname === item.href;
                return (
                  <Link
                    key={item.name}
                    to={item.href}
                    aria-current={isActive ? 'page' : undefined}
                    className={`relative px-4 py-2 rounded-xl font-medium transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-blue-500 dark:focus-visible:ring-cyan-400 ${isActive
                      ? 'theme-text-accent'
                      : 'theme-text-secondary hover:theme-text-accent'} group`}
                  >
                    <span className="relative z-10 flex items-center space-x-2">
                      <item.icon className="w-4 h-4 transition-transform duration-300 group-hover:scale-110" />
                      <span>{item.name}</span>
                    </span>
                    {isActive && (
                      <motion.div
                        layoutId="activeTab"
                        className="absolute inset-0 rounded-xl backdrop-blur-sm bg-blue-600/10 dark:bg-cyan-400/15 border border-blue-500/20 dark:border-cyan-400/20"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ duration: 0.3 }}
                      />
                    )}
                  </Link>
                );
              })}
            </nav>

            {/* Theme Toggle & Mobile Menu Button */}
            <div className="flex items-center space-x-2">
              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                onClick={toggleTheme}
                className="p-2 rounded-xl theme-bg-secondary theme-text-primary hover:theme-bg-tertiary transition-all duration-300"
                aria-label="Toggle theme"
              >
                <AnimatePresence mode="wait">
                  {isDark ? (
                    <motion.div
                      key="sun"
                      initial={prefersReducedMotion ? { opacity: 0 } : { rotate: -90, opacity: 0 }}
                      animate={prefersReducedMotion ? { opacity: 1 } : { rotate: 0, opacity: 1 }}
                      exit={prefersReducedMotion ? { opacity: 0 } : { rotate: 90, opacity: 0 }}
                      transition={{ duration: 0.2 }}
                    >
                      <FiSun className="w-5 h-5" />
                    </motion.div>
                  ) : (
                    <motion.div
                      key="moon"
                      initial={prefersReducedMotion ? { opacity: 0 } : { rotate: 90, opacity: 0 }}
                      animate={prefersReducedMotion ? { opacity: 1 } : { rotate: 0, opacity: 1 }}
                      exit={prefersReducedMotion ? { opacity: 0 } : { rotate: -90, opacity: 0 }}
                      transition={{ duration: 0.2 }}
                    >
                      <FiMoon className="w-5 h-5" />
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.button>

              {/* Mobile menu button */}
              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                className="md:hidden p-2 rounded-xl theme-bg-secondary theme-text-primary hover:theme-bg-tertiary transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-blue-500 dark:focus-visible:ring-cyan-400"
                aria-label="Toggle menu"
                aria-expanded={isMenuOpen}
                aria-controls="mobile-nav-panel"
              >
                <AnimatePresence mode="wait">
                  {isMenuOpen ? (
                    <motion.div
                      key="close"
                      initial={prefersReducedMotion ? { opacity: 0 } : { rotate: -90, opacity: 0 }}
                      animate={prefersReducedMotion ? { opacity: 1 } : { rotate: 0, opacity: 1 }}
                      exit={prefersReducedMotion ? { opacity: 0 } : { rotate: 90, opacity: 0 }}
                      transition={{ duration: 0.2 }}
                    >
                      <FiX className="w-6 h-6" />
                    </motion.div>
                  ) : (
                    <motion.div
                      key="menu"
                      initial={prefersReducedMotion ? { opacity: 0 } : { rotate: 90, opacity: 0 }}
                      animate={prefersReducedMotion ? { opacity: 1 } : { rotate: 0, opacity: 1 }}
                      exit={prefersReducedMotion ? { opacity: 0 } : { rotate: -90, opacity: 0 }}
                      transition={{ duration: 0.2 }}
                    >
                      <FiMenu className="w-6 h-6" />
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.button>
            </div>
          </div>
        </div>
      </motion.header>

      {/* Mobile Navigation */}
      <AnimatePresence>
        {isMenuOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="fixed inset-0 bg-black/30 dark:bg-black/70 backdrop-blur-sm z-40 md:hidden"
              onClick={closeMenu}
            />
            <motion.nav
              id="mobile-nav-panel"
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', damping: 25, stiffness: 200 }}
              className="fixed top-0 right-0 h-full w-80 max-w-[85vw] shadow-2xl z-50 md:hidden theme-bg-primary theme-border border-l"
            >
              <div className="flex flex-col h-full">
                <div className="flex items-center justify-between p-6 theme-border border-b">
                  <Link
                    to="/"
                    onClick={closeMenu}
                    className="flex items-center space-x-2 text-xl font-bold"
                  >
                    <div className="w-8 h-8 bg-gradient-to-br from-blue-600 to-cyan-500 dark:from-blue-500 dark:to-cyan-400 rounded-lg flex items-center justify-center text-white font-bold">
                      N
                    </div>
                    <span className="theme-text-primary bg-gradient-to-r from-blue-600 to-cyan-500 dark:from-blue-400 dark:to-cyan-300 bg-clip-text text-transparent">
                      NH Dinh
                    </span>
                  </Link>
                  <button
                    onClick={closeMenu}
                    className="p-2 rounded-lg theme-text-muted hover:theme-text-primary transition-colors"
                    aria-label="Close menu"
                  >
                    <FiX className="w-6 h-6" />
                  </button>
                </div>

                <div className="flex-1 py-6">
                  <div className="space-y-2 px-6">
                    {navigation.map((item, index) => {
                      const isActive = location.pathname === item.href;
                      return (
                        <motion.div
                          key={item.name}
                          initial={{ x: 50, opacity: 0 }}
                          animate={{ x: 0, opacity: 1 }}
                          transition={{ delay: index * 0.1 }}
                        >
                          <Link
                            to={item.href}
                            onClick={closeMenu}
                            className={`flex items-center space-x-3 px-4 py-3 rounded-xl font-medium transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-blue-500 dark:focus-visible:ring-cyan-400 ${isActive
                              ? 'theme-bg-card theme-text-accent theme-shadow'
                              : 'theme-text-secondary hover:theme-bg-secondary hover:theme-text-primary'}`}
                            aria-current={isActive ? 'page' : undefined}
                          >
                            <item.icon className="w-5 h-5" />
                            <span>{item.name}</span>
                          </Link>
                        </motion.div>
                      );
                    })}
                  </div>
                </div>

                <div className="p-6 theme-border border-t">
                  <div className="text-center text-sm theme-text-muted">
                    © 2025 NH Dinh Portfolio
                  </div>
                </div>
              </div>
            </motion.nav>
          </>
        )}
      </AnimatePresence>
    </>
  );
};

export default Header;