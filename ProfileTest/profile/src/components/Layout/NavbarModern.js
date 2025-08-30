import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence, useScroll, useMotionValueEvent } from 'framer-motion';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { 
  faBars, 
  faTimes, 
  faHome, 
  faUser, 
  faProjectDiagram, 
  faBlog, 
  faEnvelope,
  faSun,
  faMoon,
  faCode,
  faRocket
} from '@fortawesome/free-solid-svg-icons';

const NavbarModern = ({ theme, setTheme }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('home');
  const [isScrolled, setIsScrolled] = useState(false);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const navRef = useRef(null);
  const { scrollY } = useScroll();

  useMotionValueEvent(scrollY, "change", (latest) => {
    setIsScrolled(latest > 50);
  });

  const navItems = [
    { name: 'Home', href: '#home', icon: faHome },
    { name: 'About', href: '#about', icon: faUser },
    { name: 'Projects', href: '#projects', icon: faProjectDiagram },
    { name: 'Blog', href: '#blog', icon: faBlog },
    { name: 'Contact', href: '#contact', icon: faEnvelope },
  ];

  useEffect(() => {
    const handleScroll = () => {
      const sections = navItems.map(item => item.href.substring(1));
      const currentSection = sections.find(section => {
        const element = document.getElementById(section);
        if (element) {
          const rect = element.getBoundingClientRect();
          return rect.top <= 100 && rect.bottom >= 100;
        }
        return false;
      });
      
      if (currentSection) {
        setActiveSection(currentSection);
      }
    };

    const handleMouseMove = (e) => {
      if (navRef.current) {
        const rect = navRef.current.getBoundingClientRect();
        setMousePosition({
          x: e.clientX - rect.left,
          y: e.clientY - rect.top
        });
      }
    };

    window.addEventListener('scroll', handleScroll);
    window.addEventListener('mousemove', handleMouseMove);
    
    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, []);

  const scrollToSection = (href) => {
    const element = document.querySelector(href);
    if (element) {
      const offsetTop = element.offsetTop - 80;
      window.scrollTo({
        top: offsetTop,
        behavior: 'smooth'
      });
    }
    setIsOpen(false);
  };

  const toggleTheme = () => {
    setTheme(theme === 'dark' ? 'light' : 'dark');
  };

  const navVariants = {
    hidden: { y: -100, opacity: 0 },
    visible: { 
      y: 0, 
      opacity: 1,
      transition: {
        duration: 0.6,
        ease: [0.6, -0.05, 0.01, 0.99]
      }
    }
  };

  const menuVariants = {
    closed: {
      opacity: 0,
      scale: 0.95,
      y: -20,
      transition: {
        duration: 0.3,
        ease: "easeInOut"
      }
    },
    open: {
      opacity: 1,
      scale: 1,
      y: 0,
      transition: {
        duration: 0.4,
        ease: "easeOut",
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    closed: { opacity: 0, x: -20 },
    open: { opacity: 1, x: 0 }
  };

  return (
    <>
      <motion.nav
        ref={navRef}
        initial="hidden"
        animate="visible"
        variants={navVariants}
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
          isScrolled 
            ? 'bg-white/10 backdrop-blur-2xl border-b border-white/20 shadow-lg shadow-black/10' 
            : 'bg-transparent'
        }`}
        style={{
          background: isScrolled 
            ? `radial-gradient(circle at ${mousePosition.x}px ${mousePosition.y}px, rgba(255,255,255,0.15) 0%, rgba(255,255,255,0.05) 50%, transparent 100%)`
            : 'transparent'
        }}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-20">
            {/* Logo */}
            <motion.div 
              className="flex items-center space-x-3"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <div className="relative">
                <motion.div
                  className="w-12 h-12 bg-gradient-to-br from-blue-500 via-purple-600 to-pink-500 rounded-2xl flex items-center justify-center"
                  whileHover={{ scale: 1.05 }}
                  transition={{ duration: 0.2 }}
                >
                  <FontAwesomeIcon icon={faCode} className="text-white text-xl" />
                </motion.div>
              </div>
              <div className="hidden sm:block">
                <h1 className="text-xl font-bold bg-gradient-to-r from-blue-400 via-purple-500 to-pink-500 bg-clip-text text-transparent">
                  NHDINH
                </h1>
                <p className="text-xs text-gray-400 font-medium">Full-Stack Developer</p>
              </div>
            </motion.div>

            {/* Desktop Navigation */}
            <div className="hidden lg:flex items-center space-x-1">
              {navItems.map((item, index) => (
                <motion.button
                  key={item.name}
                  onClick={() => scrollToSection(item.href)}
                  className={`relative px-4 xl:px-6 py-3 rounded-xl font-medium transition-all duration-300 group text-sm xl:text-base ${
                    activeSection === item.href.substring(1)
                      ? 'text-white'
                      : 'text-gray-300 hover:text-white'
                  }`}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  initial={{ opacity: 0, y: -20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                >
                  {/* Active Background */}
                  {activeSection === item.href.substring(1) && (
                    <motion.div
                      layoutId="navActiveBackground"
                      className="absolute inset-0 bg-gradient-to-r from-blue-500/30 via-purple-600/30 to-pink-500/30 rounded-xl backdrop-blur-sm border border-white/20"
                      initial={false}
                      transition={{ type: "spring", stiffness: 300, damping: 30 }}
                    />
                  )}
                  
                  {/* Hover Background */}
                  <motion.div
                    className="absolute inset-0 bg-white/5 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                  />
                  
                  <div className="relative flex items-center space-x-2">
                    <FontAwesomeIcon icon={item.icon} className="text-sm" />
                    <span>{item.name}</span>
                  </div>
                </motion.button>
              ))}
            </div>

            {/* Theme Toggle & Mobile Menu */}
            <div className="flex items-center space-x-4">
              {/* Theme Toggle */}
              <motion.button
                onClick={toggleTheme}
                className="relative p-3 bg-white/10 backdrop-blur-sm rounded-xl border border-white/20 hover:bg-white/20 transition-all duration-300 group"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <AnimatePresence mode="wait">
                  <motion.div
                    key={theme}
                    initial={{ opacity: 0, rotate: -180 }}
                    animate={{ opacity: 1, rotate: 0 }}
                    exit={{ opacity: 0, rotate: 180 }}
                    transition={{ duration: 0.3 }}
                  >
                    <FontAwesomeIcon 
                      icon={theme === 'dark' ? faSun : faMoon} 
                      className="text-yellow-400 group-hover:text-yellow-300" 
                    />
                  </motion.div>
                </AnimatePresence>
              </motion.button>

              {/* Mobile Menu Button */}
              <motion.button
                onClick={() => setIsOpen(!isOpen)}
                className="lg:hidden relative p-3 bg-white/10 backdrop-blur-sm rounded-xl border border-white/20 hover:bg-white/20 transition-all duration-300 group"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <AnimatePresence mode="wait">
                  <motion.div
                    key={isOpen ? 'close' : 'open'}
                    initial={{ opacity: 0, rotate: -90 }}
                    animate={{ opacity: 1, rotate: 0 }}
                    exit={{ opacity: 0, rotate: 90 }}
                    transition={{ duration: 0.2 }}
                  >
                    <FontAwesomeIcon 
                      icon={isOpen ? faTimes : faBars} 
                      className="text-white group-hover:text-blue-400" 
                    />
                  </motion.div>
                </AnimatePresence>
              </motion.button>
            </div>
          </div>
        </div>
      </motion.nav>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-40 bg-black/50 backdrop-blur-sm lg:hidden"
              onClick={() => setIsOpen(false)}
            />
            
            {/* Menu Panel */}
            <motion.div
              initial="closed"
              animate="open"
              exit="closed"
              variants={menuVariants}
              className="fixed top-20 right-2 left-2 sm:top-24 sm:right-4 sm:left-auto sm:w-80 z-50 bg-white/10 backdrop-blur-2xl rounded-2xl border border-white/20 shadow-2xl lg:hidden overflow-hidden max-h-[80vh] overflow-y-auto"
            >
              <div className="p-4 sm:p-6 safe-area-inset-bottom">
                <motion.div className="space-y-2 sm:space-y-3">
                  {navItems.map((item, index) => (
                    <motion.button
                      key={item.name}
                      variants={itemVariants}
                      onClick={() => scrollToSection(item.href)}
                      className={`w-full flex items-center space-x-3 sm:space-x-4 p-3 sm:p-4 rounded-xl transition-all duration-300 group touch-target ${
                        activeSection === item.href.substring(1)
                          ? 'bg-gradient-to-r from-blue-500/30 via-purple-600/30 to-pink-500/30 text-white border border-white/20'
                          : 'hover:bg-white/10 text-gray-300 hover:text-white'
                      }`}
                      whileHover={{ scale: 1.02, x: 5 }}
                      whileTap={{ scale: 0.98 }}
                    >
                      <div className={`p-2 rounded-lg ${
                        activeSection === item.href.substring(1)
                          ? 'bg-white/20'
                          : 'bg-white/10 group-hover:bg-white/20'
                      }`}>
                        <FontAwesomeIcon icon={item.icon} className="text-base sm:text-lg" />
                      </div>
                      <span className="font-medium text-sm sm:text-base">{item.name}</span>
                      {activeSection === item.href.substring(1) && (
                        <motion.div
                          className="ml-auto w-2 h-2 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full"
                          animate={{ scale: [1, 1.2, 1] }}
                          transition={{ duration: 1.5, repeat: Infinity }}
                        />
                      )}
                    </motion.button>
                  ))}
                </motion.div>
                
                {/* Mobile CTA */}
                <motion.div
                  variants={itemVariants}
                  className="mt-4 sm:mt-6 pt-4 sm:pt-6 border-t border-white/20"
                >
                  <motion.button
                    onClick={() => scrollToSection('#contact')}
                    className="w-full bg-gradient-to-r from-blue-500 via-purple-600 to-pink-500 text-white font-medium py-3 sm:py-4 rounded-xl hover:shadow-lg hover:shadow-purple-500/25 transition-all duration-300 group touch-target"
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <div className="flex items-center justify-center space-x-2">
                      <FontAwesomeIcon icon={faRocket} className="group-hover:animate-bounce text-sm sm:text-base" />
                      <span className="text-sm sm:text-base">Let's Work Together</span>
                    </div>
                  </motion.button>
                </motion.div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
};

export default NavbarModern;
