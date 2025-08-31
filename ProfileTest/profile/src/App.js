import React, { useEffect, useState, Suspense, lazy, memo } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AnimatePresence, motion } from 'framer-motion';
import { HelmetProvider } from 'react-helmet-async';
import { usePerformanceOptimization } from './hooks/usePerformanceOptimization';
import useAssetPreloader from './hooks/useAssetPreloader';

// Lazy load pages for better performance
const NavbarModern = lazy(() => import('./components/Layout/NavbarModern'));
const HomePage = lazy(() => import('./pages/HomePage'));
const AboutPage = lazy(() => import('./pages/AboutPage'));
const ProjectsPage = lazy(() => import('./pages/ProjectsPage'));
const BlogPage = lazy(() => import('./pages/BlogPage'));
const ContactPage = lazy(() => import('./pages/ContactPage'));
const NotFoundPage = lazy(() => import('./pages/NotFoundPage'));

// Immediately imported for critical path
import PageTransition from './components/UI/PageTransition';
import LoadingPage from './components/UI/LoadingPage';
import Breadcrumb from './components/UI/Breadcrumb';
import ScrollProgress from './components/UI/ScrollProgress';
import ErrorBoundary from './components/UI/ErrorBoundary';

// Conditionally load heavy 3D components
const BackgroundAnimation = lazy(() => import('./components/3D/BackgroundAnimation'));

// Advanced Loading Component with progress
const AdvancedLoader = ({ progress = 0 }) => (
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
          animate={{ width: `${progress}%` }}
          transition={{ duration: 0.3, ease: "easeOut" }}
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
  const [theme, setTheme] = useState('dark');
  const { performanceMode, shouldReduceAnimations, deviceCapabilities } = usePerformanceOptimization();
  const { isLoading, loadingProgress } = useAssetPreloader(deviceCapabilities);
  
  useEffect(() => {
    // Enhanced smooth scroll with custom easing
    document.documentElement.style.scrollBehavior = 'smooth';
    
    // Theme detection
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    setTheme(prefersDark ? 'dark' : 'light');
    
    // Performance optimizations only for capable devices
    if (!deviceCapabilities.isLowEndDevice && 'serviceWorker' in navigator) {
      navigator.serviceWorker.register('/sw.js').catch(console.error);
    }
    
    // Optimized Intersection Observer for animations
    if (!shouldReduceAnimations) {
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
    }
  }, [shouldReduceAnimations, deviceCapabilities]);

  const pageVariants = {
    initial: { 
      opacity: 0, 
      y: shouldReduceAnimations ? 0 : 20 
    },
    in: { 
      opacity: 1, 
      y: 0 
    },
    out: { 
      opacity: 0, 
      y: shouldReduceAnimations ? 0 : -20 
    }
  };

  const pageTransition = {
    type: "tween",
    ease: "anticipate",
    duration: shouldReduceAnimations ? 0.3 : 0.6
  };

  // Memoized Background Component
  const OptimizedBackground = memo(() => {
    if (deviceCapabilities.isLowEndDevice || !deviceCapabilities.supportsWebGL) {
      return (
        <div className="fixed inset-0 bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 opacity-50" />
      );
    }
    
    return (
      <Suspense fallback={<div className="fixed inset-0 bg-slate-900" />}>
        <BackgroundAnimation />
      </Suspense>
    );
  });

  return (
    <ErrorBoundary>
      <HelmetProvider>
        <Router>
          <div className={`App ${theme} relative min-h-screen`}>
            <AnimatePresence mode="wait">
              {isLoading && <AdvancedLoader key="loader" progress={loadingProgress} />}
            </AnimatePresence>
            
            {!isLoading && (
              <>
                {/* Advanced Scroll Progress */}
                <ScrollProgress />
                
                {/* Optimized 3D Background */}
                <OptimizedBackground />
                
                {/* Modern Navigation */}
                <Suspense fallback={<div className="h-16 bg-slate-900" />}>
                  <NavbarModern theme={theme} setTheme={setTheme} />
                </Suspense>
                
                {/* Breadcrumb Navigation */}
                <Breadcrumb />
                
                {/* Enhanced Main Content with better error boundaries */}
                <motion.main 
                  className="relative z-10"
                  initial="initial"
                  animate="in"
                  exit="out"
                  variants={pageVariants}
                  transition={pageTransition}
                >
                  <Suspense fallback={<LoadingPage />}>
                    <PageTransition>
                      <Routes>
                        <Route path="/" element={<HomePage />} />
                        <Route path="/about" element={<AboutPage />} />
                        <Route path="/projects" element={<ProjectsPage />} />
                        <Route path="/blog" element={<BlogPage />} />
                        <Route path="/contact" element={<ContactPage />} />
                        <Route path="*" element={<NotFoundPage />} />
                      </Routes>
                    </PageTransition>
                  </Suspense>
                </motion.main>
              </>
            )}
          </div>
        </Router>
      </HelmetProvider>
    </ErrorBoundary>
  );
}

export default App;
