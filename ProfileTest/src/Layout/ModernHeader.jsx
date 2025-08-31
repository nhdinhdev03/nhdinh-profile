import React, { useState, useEffect, useCallback, useMemo } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion, AnimatePresence, LazyMotion, domAnimation } from 'framer-motion';
// Fixed relative import paths (file is in src/Layout)
import { useTheme } from '../contexts/ThemeContext';
import { ROUTES } from '../router/routeConstants';
import { 
  FiMenu, 
  FiX, 
  FiSun, 
  FiMoon, 
  FiHome, 
  FiUser, 
  FiBriefcase, 
  FiBook, 
  FiMail,
  FiCpu,
  FiActivity,
  FiMonitor
} from 'react-icons/fi';

// Static navigation data
const NAVIGATION = [
  { name: 'Home', href: ROUTES.HOME, icon: FiHome, color: 'from-blue-500 to-cyan-500' },
  { name: 'About', href: ROUTES.ABOUT, icon: FiUser, color: 'from-purple-500 to-pink-500' },
  { name: 'Projects', href: ROUTES.PROJECTS, icon: FiBriefcase, color: 'from-green-500 to-emerald-500' },
  { name: 'Blog', href: ROUTES.BLOG, icon: FiBook, color: 'from-orange-500 to-red-500' },
  { name: 'Contact', href: ROUTES.CONTACT, icon: FiMail, color: 'from-teal-500 to-blue-500' },
  { name: 'Settings', href: ROUTES.SETTINGS, icon: FiCpu, color: 'from-gray-500 to-gray-700' },
];

const ModernHeader = React.memo(() => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [mousePosition, setMousePosition] = useState({ x: -100, y: -100 });
  const { isDark, themeMode, toggleTheme, effectiveTheme } = useTheme();
  const location = useLocation();

  // Throttled scroll handler
  useEffect(() => {
    let ticking = false;
    const handleScroll = () => {
      if (!ticking) {
        requestAnimationFrame(() => {
          setIsScrolled(window.scrollY > 20);
          ticking = false;
        });
        ticking = true;
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Throttled mouse move handler
  useEffect(() => {
    let frame;
    const handleMouseMove = (e) => {
      if (!frame) {
        frame = requestAnimationFrame(() => {
          setMousePosition({ x: e.clientX, y: e.clientY });
          frame = null;
        });
      }
    };

    window.addEventListener('pointermove', handleMouseMove, { passive: true });
    return () => {
      window.removeEventListener('pointermove', handleMouseMove);
      if (frame) cancelAnimationFrame(frame);
    };
  }, []);

  const toggleMenu = useCallback(() => {
    setIsMenuOpen(prev => !prev);
  }, []);

  const closeMenu = useCallback(() => {
    setIsMenuOpen(false);
  }, []);

  const isActiveLink = useCallback((href) => {
    return location.pathname === href;
  }, [location.pathname]);

  // Memoized navigation items
  const navigationItems = useMemo(() => 
    NAVIGATION.map((item) => ({
      ...item,
      isActive: isActiveLink(item.href)
    })), [isActiveLink]
  );

  return (
    <LazyMotion features={domAnimation}>
      {/* Neural Network Cursor Follower */}
      <motion.div
        className="fixed pointer-events-none w-32 h-32 rounded-full z-50 opacity-30"
        style={{
          background: 'radial-gradient(circle, rgba(59, 130, 246, 0.6) 0%, transparent 70%)',
          left: mousePosition.x - 64,
          top: mousePosition.y - 64,
        }}
        animate={{
          x: mousePosition.x - 64,
          y: mousePosition.y - 64,
        }}
        transition={{ type: "spring", damping: 30, stiffness: 200 }}
      />

      <motion.header
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.8, ease: [0.25, 0.46, 0.45, 0.94] }}
        className={`fixed top-0 left-0 right-0 z-40 transition-all duration-500 ${
          isScrolled
            ? 'bg-black/80 backdrop-blur-xl shadow-2xl border-b border-gray-800/50'
            : 'bg-transparent'
        }`}
      >
        {/* Holographic Header Effect */}
        <div className="absolute inset-0 overflow-hidden">
          <motion.div
            className="absolute inset-0 bg-gradient-to-r from-blue-500/10 via-purple-500/10 to-cyan-500/10"
            animate={{
              x: ['-100%', '100%'],
            }}
            transition={{
              duration: 3,
              repeat: Infinity,
              ease: 'linear',
            }}
          />
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="flex items-center justify-between h-16 md:h-20">
            {/* Logo with Quantum Effect */}
            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="relative"
            >
              <Link
                to="/"
                className="flex items-center space-x-3 group"
              >
                {/* Logo Icon */}
                <motion.div 
                  className="relative w-12 h-12"
                  whileHover={{ rotate: 360 }}
                  transition={{ duration: 0.8 }}
                >
                  {/* Outer Ring */}
                  <motion.div
                    animate={{ rotate: 360 }}
                    transition={{ duration: 10, repeat: Infinity, ease: 'linear' }}
                    className="absolute inset-0 rounded-2xl bg-gradient-to-br from-blue-500 via-purple-500 to-cyan-500 p-0.5"
                  >
                    {/* Inner Container */}
                    <div className="w-full h-full rounded-2xl bg-black flex items-center justify-center relative overflow-hidden">
                      {/* AI Pattern */}
                      <div className="absolute inset-0 bg-gradient-to-br from-blue-500/20 to-purple-500/20" />
                      <span className="text-xl font-bold text-white relative z-10">N</span>
                      
                      {/* Scanning Line */}
                      <motion.div
                        className="absolute inset-0 bg-gradient-to-r from-transparent via-cyan-400/50 to-transparent"
                        animate={{
                          x: ['-100%', '100%'],
                        }}
                        transition={{
                          duration: 2,
                          repeat: Infinity,
                          ease: 'easeInOut',
                        }}
                      />
                    </div>
                  </motion.div>
                  
                  {/* Quantum Dots */}
                  <motion.div
                    animate={{
                      scale: [1, 1.2, 1],
                      opacity: [0.7, 1, 0.7],
                    }}
                    transition={{ duration: 2, repeat: Infinity }}
                    className="absolute -top-1 -right-1 w-3 h-3 bg-green-400 rounded-full"
                  />
                </motion.div>

                {/* Brand Text */}
                <div className="hidden sm:block">
                  <motion.span 
                    className="text-2xl font-bold bg-gradient-to-r from-blue-400 via-purple-400 to-cyan-400 bg-clip-text text-transparent"
                    whileHover={{ scale: 1.05 }}
                  >
                    NH DINH
                  </motion.span>
                  <motion.div 
                    className="text-xs text-gray-400 font-mono tracking-wider"
                    animate={{ opacity: [0.5, 1, 0.5] }}
                    transition={{ duration: 2, repeat: Infinity }}
                  >
                    {">"} AI_ENGINEER.EXE
                  </motion.div>
                </div>
              </Link>
            </motion.div>

            {/* Desktop Navigation */}
            <nav className="hidden md:flex items-center space-x-2">
              {navigationItems.map((item) => {
                const isActive = item.isActive;
                return (
                  <motion.div
                    key={item.name}
                    className="relative"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <Link
                      to={item.href}
                      className={`relative px-6 py-3 rounded-2xl font-medium transition-all duration-300 flex items-center space-x-2 group ${
                        isActive
                          ? 'text-white'
                          : 'text-gray-300 hover:text-white'
                      }`}
                    >
                      {/* Background Glow */}
                      {isActive && (
                        <motion.div
                          layoutId="activeTab"
                          className={`absolute inset-0 bg-gradient-to-r ${item.color} opacity-20 rounded-2xl`}
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 0.2 }}
                          transition={{ duration: 0.3 }}
                        />
                      )}
                      
                      {/* Hover Effect */}
                      <motion.div
                        className={`absolute inset-0 bg-gradient-to-r ${item.color} opacity-0 group-hover:opacity-10 rounded-2xl transition-opacity duration-300`}
                      />

                      {/* Icon */}
                      <motion.div
                        whileHover={{ rotate: 360 }}
                        transition={{ duration: 0.6 }}
                      >
                        <item.icon className="w-4 h-4 relative z-10" />
                      </motion.div>
                      
                      {/* Text */}
                      <span className="relative z-10">{item.name}</span>

                      {/* Neural Connection Line */}
                      {isActive && (
                        <motion.div
                          className="absolute -bottom-1 left-1/2 transform -translate-x-1/2 w-8 h-0.5 bg-gradient-to-r from-blue-400 to-cyan-400 rounded-full"
                          initial={{ width: 0 }}
                          animate={{ width: 32 }}
                          transition={{ duration: 0.3 }}
                        />
                      )}
                    </Link>
                  </motion.div>
                );
              })}
            </nav>

            {/* Right Side Controls */}
            <div className="flex items-center space-x-4">
              {/* AI Status Indicator */}
              <motion.div
                className="hidden md:flex items-center space-x-2 px-3 py-2 rounded-xl bg-gray-900/50 border border-gray-700/50"
                animate={{
                  borderColor: ['rgba(75, 85, 99, 0.5)', 'rgba(59, 130, 246, 0.5)', 'rgba(75, 85, 99, 0.5)'],
                }}
                transition={{ duration: 3, repeat: Infinity }}
              >
                <motion.div
                  animate={{ rotate: 360 }}
                  transition={{ duration: 2, repeat: Infinity, ease: 'linear' }}
                >
                  <FiCpu className="w-4 h-4 text-blue-400" />
                </motion.div>
                <span className="text-xs text-gray-400 font-mono">AI_ONLINE</span>
                <motion.div
                  animate={{
                    scale: [1, 1.2, 1],
                    opacity: [0.7, 1, 0.7],
                  }}
                  transition={{ duration: 1, repeat: Infinity }}
                  className="w-2 h-2 bg-green-400 rounded-full"
                />
              </motion.div>

              {/* Theme Toggle */}
              {/* Enhanced Theme Toggle with 3 modes */}
              <motion.button
                onClick={toggleTheme}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                className={`relative w-12 h-12 rounded-xl border transition-all duration-300 flex items-center justify-center group ${
                  isDark 
                    ? 'bg-gray-800/80 border-gray-600 text-cyan-400 hover:border-cyan-400' 
                    : 'bg-white/80 border-gray-300 text-gray-700 hover:border-blue-400'
                }`}
                title={`Theme: ${themeMode} (${effectiveTheme})`}
              >
                <motion.div
                  className={`absolute inset-0 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity ${
                    isDark 
                      ? 'bg-gradient-to-r from-cyan-500/10 to-purple-500/10' 
                      : 'bg-gradient-to-r from-blue-500/10 to-purple-500/10'
                  }`}
                />
                
                <AnimatePresence mode="wait">
                  {themeMode === 'light' ? (
                    <motion.div
                      key="sun"
                      initial={{ rotate: -90, opacity: 0, scale: 0.8 }}
                      animate={{ rotate: 0, opacity: 1, scale: 1 }}
                      exit={{ rotate: 90, opacity: 0, scale: 0.8 }}
                      transition={{ duration: 0.3, ease: "easeInOut" }}
                      className="relative z-10"
                    >
                      <FiSun className="w-5 h-5" />
                    </motion.div>
                  ) : themeMode === 'dark' ? (
                    <motion.div
                      key="moon"
                      initial={{ rotate: 90, opacity: 0, scale: 0.8 }}
                      animate={{ rotate: 0, opacity: 1, scale: 1 }}
                      exit={{ rotate: -90, opacity: 0, scale: 0.8 }}
                      transition={{ duration: 0.3, ease: "easeInOut" }}
                      className="relative z-10"
                    >
                      <FiMoon className="w-5 h-5" />
                    </motion.div>
                  ) : (
                    <motion.div
                      key="auto"
                      initial={{ rotate: 180, opacity: 0, scale: 0.8 }}
                      animate={{ rotate: 0, opacity: 1, scale: 1 }}
                      exit={{ rotate: -180, opacity: 0, scale: 0.8 }}
                      transition={{ duration: 0.3, ease: "easeInOut" }}
                      className="relative z-10"
                    >
                      <FiMonitor className="w-5 h-5" />
                    </motion.div>
                  )}
                </AnimatePresence>
                
                {/* Theme mode indicator */}
                <div className={`absolute -bottom-1 -right-1 w-3 h-3 rounded-full border-2 transition-all duration-300 ${
                  isDark ? 'border-gray-800' : 'border-white'
                } ${
                  themeMode === 'auto' 
                    ? 'bg-gradient-to-r from-orange-400 to-orange-500' 
                    : themeMode === 'dark'
                      ? 'bg-gradient-to-r from-blue-400 to-cyan-500'
                      : 'bg-gradient-to-r from-yellow-400 to-orange-500'
                }`} />
              </motion.button>

              {/* Mobile Menu Toggle */}
              <motion.button
                onClick={toggleMenu}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                className="md:hidden relative w-12 h-12 rounded-xl bg-gray-900/50 border border-gray-700/50 hover:border-gray-600 flex items-center justify-center text-gray-400 hover:text-white transition-colors"
              >
                <AnimatePresence mode="wait">
                  {isMenuOpen ? (
                    <motion.div
                      key="close"
                      initial={{ rotate: -90, opacity: 0 }}
                      animate={{ rotate: 0, opacity: 1 }}
                      exit={{ rotate: 90, opacity: 0 }}
                      transition={{ duration: 0.3 }}
                    >
                      <FiX className="w-6 h-6" />
                    </motion.div>
                  ) : (
                    <motion.div
                      key="menu"
                      initial={{ rotate: 90, opacity: 0 }}
                      animate={{ rotate: 0, opacity: 1 }}
                      exit={{ rotate: -90, opacity: 0 }}
                      transition={{ duration: 0.3 }}
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

      {/* Ultra-Modern Mobile Menu */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-30 md:hidden"
          >
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="absolute inset-0 bg-black/80 backdrop-blur-xl"
              onClick={closeMenu}
            />

            {/* Menu Content */}
            <motion.div
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', damping: 25, stiffness: 200 }}
              className="absolute right-0 top-0 bottom-0 w-80 bg-gradient-to-br from-gray-900/95 to-black/95 backdrop-blur-xl border-l border-gray-800/50"
            >
              {/* Neural Network Pattern */}
              <div className="absolute inset-0 opacity-10">
                <div className="absolute inset-0 bg-gradient-to-br from-blue-500/20 via-purple-500/20 to-cyan-500/20" />
                <div 
                  className="absolute inset-0"
                  style={{
                    backgroundImage: `
                      radial-gradient(circle at 1px 1px, rgba(59, 130, 246, 0.3) 1px, transparent 0)
                    `,
                    backgroundSize: '50px 50px'
                  }}
                />
              </div>

              <div className="relative z-10 p-8 pt-24">
                {/* Menu Items */}
                <nav className="space-y-6">
                  {navigationItems.map((item, index) => {
                    const isActive = item.isActive;
                    return (
                      <motion.div
                        key={item.name}
                        initial={{ opacity: 0, x: 50 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: index * 0.1 + 0.2 }}
                      >
                        <Link
                          to={item.href}
                          onClick={closeMenu}
                          className={`group flex items-center space-x-4 p-4 rounded-2xl transition-all duration-300 ${
                            isActive
                              ? 'bg-gradient-to-r from-blue-500/20 to-purple-500/20 text-white'
                              : 'text-gray-300 hover:text-white hover:bg-gray-800/30'
                          }`}
                        >
                          <motion.div
                            className={`w-12 h-12 rounded-xl bg-gradient-to-r ${item.color} flex items-center justify-center text-white`}
                            whileHover={{ scale: 1.1, rotate: 360 }}
                            transition={{ duration: 0.6 }}
                          >
                            <item.icon className="w-6 h-6" />
                          </motion.div>
                          <div>
                            <div className="font-semibold text-lg">{item.name}</div>
                            <div className="text-sm text-gray-400 font-mono">
                              {item.href === ROUTES.HOME && '~/home'}
                              {item.href === ROUTES.ABOUT && '~/about'}
                              {item.href === ROUTES.PROJECTS && '~/projects'}
                              {item.href === ROUTES.BLOG && '~/blog'}
                              {item.href === ROUTES.CONTACT && '~/contact'}
                            </div>
                          </div>
                        </Link>
                      </motion.div>
                    );
                  })}
                </nav>

                {/* Tech Status */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.8 }}
                  className="mt-12 p-6 rounded-2xl bg-gradient-to-r from-gray-800/50 to-gray-900/50 border border-gray-700/50"
                >
                  <div className="flex items-center space-x-3 mb-4">
                    <motion.div
                      animate={{ rotate: 360 }}
                      transition={{ duration: 3, repeat: Infinity, ease: 'linear' }}
                    >
                      <FiActivity className="w-6 h-6 text-green-400" />
                    </motion.div>
                    <div>
                      <div className="text-white font-semibold">System Status</div>
                      <div className="text-green-400 text-sm font-mono">All systems operational</div>
                    </div>
                  </div>
                  
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-400">AI Models</span>
                      <span className="text-green-400">Online</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-400">Neural Networks</span>
                      <span className="text-green-400">Active</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-400">Cloud Services</span>
                      <span className="text-green-400">Connected</span>
                    </div>
                  </div>
                </motion.div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </LazyMotion>
  );
});

export default ModernHeader;
