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
  FiMoon,
  FiZap,
  FiSettings,
  FiGlobe
} from 'react-icons/fi';
import { useTheme } from '../../../contexts/ThemeContext';
import './Header.scss';

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const { isDark, toggleTheme } = useTheme();
  const location = useLocation();

  const navItems = [
    { path: '/', label: 'Home', icon: FiHome, color: 'from-cyan-400 to-blue-500' },
    { path: '/about', label: 'About', icon: FiUser, color: 'from-purple-400 to-pink-500' },
    { path: '/projects', label: 'Projects', icon: FiBriefcase, color: 'from-green-400 to-blue-500' },
    { path: '/blog', label: 'Blog', icon: FiBookOpen, color: 'from-yellow-400 to-orange-500' },
    { path: '/contact', label: 'Contact', icon: FiMail, color: 'from-red-400 to-pink-500' },
  ];

  useEffect(() => {
    const handleScroll = () => {
      const scrolled = window.scrollY > 50;
      setIsScrolled(scrolled);
    };

    const handleMouseMove = (e) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };

    window.addEventListener('scroll', handleScroll);
    window.addEventListener('mousemove', handleMouseMove);
    
    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, []);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const closeMenu = () => {
    setIsMenuOpen(false);
  };

  const headerVariants = {
    initial: { y: -100, opacity: 0 },
    animate: { 
      y: 0, 
      opacity: 1,
      transition: {
        type: "spring",
        stiffness: 100,
        damping: 15
      }
    }
  };

  const navVariants = {
    hidden: { 
      opacity: 0,
      y: -20,
      scale: 0.95
    },
    visible: { 
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        type: "spring",
        stiffness: 100,
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: -10 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: {
        type: "spring",
        stiffness: 200
      }
    }
  };

  const mobileMenuVariants = {
    closed: {
      opacity: 0,
      x: "100%",
      transition: {
        type: "spring",
        stiffness: 400,
        damping: 40
      }
    },
    open: {
      opacity: 1,
      x: "0%",
      transition: {
        type: "spring",
        stiffness: 400,
        damping: 40,
        staggerChildren: 0.1,
        delayChildren: 0.1
      }
    }
  };

  const mobileItemVariants = {
    closed: { x: 50, opacity: 0 },
    open: { 
      x: 0, 
      opacity: 1,
      transition: {
        type: "spring",
        stiffness: 300,
        damping: 20
      }
    }
  };

  return (
    <>
      <motion.header
        className={`
          fixed top-0 left-0 right-0 z-50 transition-all duration-500 ease-out
          ${isScrolled 
            ? 'glass backdrop-blur-2xl shadow-2xl border-b border-white/10' 
            : 'bg-transparent'
          }
        `}
        variants={headerVariants}
        initial="initial"
        animate="animate"
      >
        {/* Animated Background Effect */}
        <div className="absolute inset-0 overflow-hidden">
          <motion.div
            className="absolute inset-0 bg-gradient-to-r from-cyan-500/5 via-purple-500/5 to-pink-500/5"
            animate={{
              background: [
                'linear-gradient(90deg, rgba(6,182,212,0.05) 0%, rgba(168,85,247,0.05) 50%, rgba(236,72,153,0.05) 100%)',
                'linear-gradient(90deg, rgba(236,72,153,0.05) 0%, rgba(6,182,212,0.05) 50%, rgba(168,85,247,0.05) 100%)',
                'linear-gradient(90deg, rgba(168,85,247,0.05) 0%, rgba(236,72,153,0.05) 50%, rgba(6,182,212,0.05) 100%)'
              ]
            }}
            transition={{ duration: 5, repeat: Infinity, ease: "linear" }}
          />
        </div>

        <nav className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-20">
            {/* Logo Section */}
            <motion.div 
              className="flex items-center space-x-3"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Link to="/" className="group flex items-center space-x-3">
                <motion.div 
                  className="relative"
                  animate={{ rotate: [0, 360] }}
                  transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                >
                  <div className="w-12 h-12 bg-gradient-to-br from-cyan-400 via-purple-500 to-pink-500 rounded-2xl flex items-center justify-center relative overflow-hidden">
                    <FiZap className="text-white text-xl z-10" />
                    <div className="absolute inset-0 bg-gradient-to-br from-cyan-400/20 via-purple-500/20 to-pink-500/20 animate-pulse" />
                  </div>
                  <motion.div
                    className="absolute inset-0 rounded-2xl"
                    animate={{
                      boxShadow: [
                        '0 0 20px rgba(6,182,212,0.5)',
                        '0 0 30px rgba(168,85,247,0.5)', 
                        '0 0 20px rgba(236,72,153,0.5)',
                        '0 0 30px rgba(6,182,212,0.5)'
                      ]
                    }}
                    transition={{ duration: 3, repeat: Infinity }}
                  />
                </motion.div>
                <motion.div 
                  className="hidden md:block"
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.2 }}
                >
                  <h1 className="text-2xl font-bold bg-gradient-to-r from-cyan-400 via-purple-500 to-pink-500 bg-clip-text text-transparent">
                    NHDinh
                  </h1>
                  <p className="text-xs text-gray-400 font-medium">Developer</p>
                </motion.div>
              </Link>
            </motion.div>

            {/* Desktop Navigation */}
            <motion.div 
              className="hidden lg:block"
              variants={navVariants}
              initial="hidden"
              animate="visible"
            >
              <div className="flex items-center space-x-2">
                {navItems.map((item) => {
                  const isActive = location.pathname === item.path;
                  return (
                    <motion.div key={item.path} variants={itemVariants}>
                      <Link
                        to={item.path}
                        className={`
                          group relative px-6 py-3 rounded-2xl font-medium transition-all duration-300
                          ${isActive
                            ? 'text-white'
                            : 'text-gray-300 hover:text-white'
                          }
                        `}
                      >
                        <motion.div
                          className={`
                            absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300
                            ${isActive ? 'opacity-100' : ''}
                          `}
                          style={{
                            background: `linear-gradient(135deg, ${item.color.split(' ')[1]} 0%, ${item.color.split(' ')[3]} 100%)`
                          }}
                        />
                        
                        {/* Glassmorphism background for active state */}
                        {isActive && (
                          <motion.div
                            className="absolute inset-0 rounded-2xl glass"
                            layoutId="activeNav"
                            transition={{ type: "spring", stiffness: 300, damping: 30 }}
                          />
                        )}

                        <span className="relative z-10 flex items-center space-x-2">
                          <item.icon className={`text-lg ${isActive ? 'animate-pulse' : ''}`} />
                          <span>{item.label}</span>
                        </span>

                        {/* Hover effect particles */}
                        <motion.div
                          className="absolute inset-0 rounded-2xl overflow-hidden pointer-events-none"
                          whileHover={{
                            boxShadow: `0 0 30px ${item.color.includes('cyan') ? '#06b6d4' : 
                                       item.color.includes('purple') ? '#8b5cf6' :
                                       item.color.includes('green') ? '#10b981' :
                                       item.color.includes('yellow') ? '#f59e0b' : '#ef4444'}40`
                          }}
                        />
                      </Link>
                    </motion.div>
                  );
                })}
              </div>
            </motion.div>

            {/* Right Section - Theme Toggle & Mobile Menu */}
            <div className="flex items-center space-x-4">
              {/* Theme Toggle */}
              <motion.button
                onClick={toggleTheme}
                className="relative p-3 rounded-2xl glass border border-white/10 hover:border-white/20 transition-all duration-300 group"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <motion.div
                  className="relative z-10"
                  animate={{ rotate: isDark ? 180 : 0 }}
                  transition={{ duration: 0.5, ease: "easeInOut" }}
                >
                  {isDark ? (
                    <FiSun className="text-xl text-yellow-400" />
                  ) : (
                    <FiMoon className="text-xl text-blue-400" />
                  )}
                </motion.div>
                <motion.div
                  className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                  style={{
                    background: isDark 
                      ? 'linear-gradient(135deg, #fbbf24, #f59e0b)'
                      : 'linear-gradient(135deg, #3b82f6, #1e40af)'
                  }}
                />
              </motion.button>

              {/* Mobile Menu Button */}
              <motion.button
                onClick={toggleMenu}
                className="lg:hidden relative p-3 rounded-2xl glass border border-white/10 hover:border-white/20 transition-all duration-300 group"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <motion.div
                  animate={{ rotate: isMenuOpen ? 180 : 0 }}
                  transition={{ duration: 0.3 }}
                >
                  {isMenuOpen ? (
                    <FiX className="text-xl text-red-400" />
                  ) : (
                    <FiMenu className="text-xl text-cyan-400" />
                  )}
                </motion.div>
                <motion.div
                  className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                  style={{
                    background: isMenuOpen 
                      ? 'linear-gradient(135deg, #ef4444, #dc2626)'
                      : 'linear-gradient(135deg, #06b6d4, #0891b2)'
                  }}
                />
              </motion.button>
            </div>
          </div>
        </nav>
      </motion.header>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {isMenuOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              className="fixed inset-0 bg-black/50 backdrop-blur-sm z-40 lg:hidden"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={closeMenu}
            />

            {/* Mobile Menu */}
            <motion.div
              className="fixed top-0 right-0 bottom-0 w-80 max-w-[85vw] glass backdrop-blur-2xl border-l border-white/10 z-50 lg:hidden"
              variants={mobileMenuVariants}
              initial="closed"
              animate="open"
              exit="closed"
            >
              <div className="p-6 h-full flex flex-col">
                {/* Mobile Header */}
                <div className="flex items-center justify-between mb-8">
                  <h2 className="text-2xl font-bold gradient-text">Menu</h2>
                  <motion.button
                    onClick={closeMenu}
                    className="p-2 rounded-xl glass border border-white/10"
                    whileTap={{ scale: 0.9 }}
                  >
                    <FiX className="text-xl text-red-400" />
                  </motion.button>
                </div>

                {/* Mobile Navigation */}
                <nav className="flex-1">
                  <motion.div className="space-y-4">
                    {navItems.map((item, index) => {
                      const isActive = location.pathname === item.path;
                      return (
                        <motion.div
                          key={item.path}
                          variants={mobileItemVariants}
                          custom={index}
                        >
                          <Link
                            to={item.path}
                            onClick={closeMenu}
                            className={`
                              group relative flex items-center space-x-4 p-4 rounded-2xl transition-all duration-300
                              ${isActive 
                                ? 'glass border border-white/20 text-white' 
                                : 'text-gray-300 hover:text-white hover:glass'
                              }
                            `}
                          >
                            <motion.div
                              className={`
                                p-3 rounded-xl transition-all duration-300
                                ${isActive ? 'bg-gradient-to-br ' + item.color : 'bg-white/5'}
                              `}
                              whileHover={{ scale: 1.1, rotate: 360 }}
                              transition={{ duration: 0.3 }}
                            >
                              <item.icon className="text-xl" />
                            </motion.div>
                            <div>
                              <h3 className="font-semibold">{item.label}</h3>
                              <p className="text-sm text-gray-400">
                                {item.path === '/' ? 'Home page' :
                                 item.path === '/about' ? 'About me' :
                                 item.path === '/projects' ? 'My work' :
                                 item.path === '/blog' ? 'Articles' : 'Get in touch'}
                              </p>
                            </div>
                            {isActive && (
                              <motion.div
                                className="absolute right-4 w-2 h-2 rounded-full bg-cyan-400"
                                layoutId="activeMobile"
                                transition={{ type: "spring", stiffness: 300 }}
                              />
                            )}
                          </Link>
                        </motion.div>
                      );
                    })}
                  </motion.div>
                </nav>

                {/* Mobile Footer */}
                <motion.div 
                  className="mt-8 pt-6 border-t border-white/10"
                  variants={mobileItemVariants}
                >
                  <div className="text-center text-gray-400 text-sm">
                    <p>© 2025 NHDinh</p>
                    <p className="mt-1">Full-Stack Developer</p>
                  </div>
                </motion.div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      {/* Mouse Follower Effect */}
      <motion.div
        className="fixed pointer-events-none z-30 mix-blend-difference"
        animate={{
          x: mousePosition.x - 10,
          y: mousePosition.y - 10,
        }}
        transition={{ type: "spring", stiffness: 500, damping: 30 }}
      >
        <div className="w-5 h-5 bg-white rounded-full opacity-50" />
      </motion.div>
    </>
  );
};

export default Header;
