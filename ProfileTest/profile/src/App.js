import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AnimatePresence, motion } from 'framer-motion';

// Direct imports for components
import NavbarModern from './components/Layout/NavbarModern';
import Home from './components/sections/Home';
import About from './components/sections/About_new';
import Projects from './components/sections/Projects';
import Blog from './components/sections/Blog';
import Contact from './components/sections/Contact';
import BackgroundAnimation from './components/3D/BackgroundAnimation';
import ScrollProgress from './components/UI/ScrollProgress';

// Advanced Loading Component
const AdvancedLoader = () => (
  <motion.div 
    className="fixed inset-0 z-50 flex items-center justify-center bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900"
    initial={{ opacity: 1 }}
    exit={{ opacity: 0 }}
    transition={{ duration: 0.8, ease: "easeInOut" }}
  >
    <div className="relative flex flex-col items-center">
      {/* Logo Container */}
      <motion.div
        className="relative mb-8"
        initial={{ scale: 0.5, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
      >
        {/* Main Logo */}
        <motion.div
          className="w-20 h-20 bg-gradient-to-br from-blue-500 via-purple-600 to-pink-500 rounded-2xl flex items-center justify-center relative overflow-hidden"
          animate={{ 
            rotateY: [0, 180, 360],
            scale: [1, 1.1, 1]
          }}
          transition={{ 
            rotateY: { duration: 2, repeat: Infinity, ease: "easeInOut" },
            scale: { duration: 2, repeat: Infinity, ease: "easeInOut", delay: 0.5 }
          }}
        >
          <span className="text-2xl font-bold text-white">NH</span>
          
          {/* Scanning Line */}
          <motion.div
            className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-cyan-400 to-transparent"
            animate={{ y: [0, 80, 0] }}
            transition={{
              duration: 1.5,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          />
        </motion.div>
        
        {/* Glow Effect */}
        <motion.div
          className="absolute -inset-2 bg-gradient-to-br from-blue-500 via-purple-600 to-pink-500 rounded-3xl opacity-30 blur-xl"
          animate={{ 
            scale: [1, 1.3, 1],
            opacity: [0.3, 0.6, 0.3]
          }}
          transition={{ 
            duration: 2, 
            repeat: Infinity, 
            ease: "easeInOut" 
          }}
        />
      </motion.div>

      {/* Brand Text */}
      <motion.div
        className="text-center mb-8"
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.8, delay: 0.3 }}
      >
        <h1 className="text-4xl font-bold bg-gradient-to-r from-blue-400 via-purple-500 to-pink-500 bg-clip-text text-transparent mb-2">
          NHDINH
        </h1>
        <p className="text-gray-400 text-sm font-medium">
          Full-Stack Developer
        </p>
      </motion.div>
      
      {/* Loading Progress */}
      <motion.div
        className="w-64 h-1 bg-gray-800 rounded-full overflow-hidden"
        initial={{ width: 0 }}
        animate={{ width: 256 }}
        transition={{ duration: 0.5, delay: 0.5 }}
      >
        <motion.div
          className="h-full bg-gradient-to-r from-blue-500 via-purple-600 to-pink-500 rounded-full"
          initial={{ width: "0%" }}
          animate={{ width: "100%" }}
          transition={{ duration: 2, delay: 0.8, ease: "easeInOut" }}
        />
      </motion.div>
      
      {/* Loading Text */}
      <motion.p
        className="text-gray-400 text-sm mt-4"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5, delay: 1 }}
      >
        Đang tải portfolio...
      </motion.p>
    </div>
  </motion.div>
);

function App() {
  const [isLoading, setIsLoading] = useState(true);
  const [theme, setTheme] = useState('dark');
  
  useEffect(() => {
    // Enhanced smooth scroll with custom easing
    document.documentElement.style.scrollBehavior = 'smooth';
    
    // Advanced preloader with realistic loading simulation
    const preloadAssets = async () => {
      // Simulate asset loading
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      // Add fade out animation
      setTimeout(() => {
        setIsLoading(false);
      }, 500);
    };
    
    preloadAssets();
    
    // Theme detection
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    setTheme(prefersDark ? 'dark' : 'light');
    
    // Performance optimizations
    if ('serviceWorker' in navigator) {
      navigator.serviceWorker.register('/sw.js').catch(console.error);
    }
    
    // Intersection Observer for animations
    const observerOptions = {
      threshold: 0.1,
      rootMargin: '50px 0px'
    };
    
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('animate-in');
        }
      });
    }, observerOptions);
    
    // Observe all sections
    document.querySelectorAll('section').forEach(section => {
      observer.observe(section);
    });
    
    return () => observer.disconnect();
  }, []);

  const pageVariants = {
    initial: { opacity: 0, y: 20 },
    in: { opacity: 1, y: 0 },
    out: { opacity: 0, y: -20 }
  };

  const pageTransition = {
    type: "tween",
    ease: "anticipate",
    duration: 0.8
  };

  return (
    <Router>
      <div className={`App ${theme} relative min-h-screen`}>
        <AnimatePresence mode="wait">
          {isLoading && <AdvancedLoader key="loader" />}
        </AnimatePresence>
        
        {!isLoading && (
          <>
            {/* Advanced Scroll Progress */}
            <ScrollProgress />
            
            {/* Premium 3D Background */}
            <BackgroundAnimation />
            
            {/* Modern Navigation */}
            <NavbarModern theme={theme} setTheme={setTheme} />
            
            {/* Enhanced Main Content */}
            <motion.main 
              className="relative z-10"
              initial="initial"
              animate="in"
              exit="out"
              variants={pageVariants}
              transition={pageTransition}
            >
              <AnimatePresence mode="wait">
                <Routes>
                  <Route path="/" element={
                    <motion.div
                      key="home-page"
                      initial="initial"
                      animate="in"
                      exit="out"
                      variants={pageVariants}
                      transition={pageTransition}
                    >
                      <Home />
                      <About />
                      <Projects />
                      <Blog />
                      <Contact />
                    </motion.div>
                  } />
                  <Route path="/home" element={<Home />} />
                  <Route path="/about" element={<About />} />
                  <Route path="/projects" element={<Projects />} />
                  <Route path="/blog" element={<Blog />} />
                  <Route path="/contact" element={<Contact />} />
                </Routes>
              </AnimatePresence>
            </motion.main>
          </>
        )}
      </div>
    </Router>
  );
}

export default App;
