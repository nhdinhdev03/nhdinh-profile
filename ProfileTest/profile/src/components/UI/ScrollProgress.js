import React, { useState, useEffect } from 'react';
import { motion, useScroll, useSpring, useTransform, AnimatePresence } from 'framer-motion';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronUp, faHome, faUser, faCode, faBlog, faEnvelope, faRocket } from '@fortawesome/free-solid-svg-icons';

const ScrollProgress = () => {
  const { scrollYProgress } = useScroll();
  const [isVisible, setIsVisible] = useState(false);
  const [activeSection, setActiveSection] = useState('home');
  
  // Enhanced spring animations
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  const scaleY = useSpring(scrollYProgress, {
    stiffness: 200,
    damping: 30,
    restDelta: 0.001
  });

  const opacity = useTransform(scrollYProgress, [0, 0.1, 0.9, 1], [0.5, 1, 1, 0.5]);
  const width = useTransform(scrollYProgress, [0, 1], ['0%', '100%']);

  // Navigation sections with enhanced data
  const sections = [
    { id: 'home', label: 'Trang chủ', icon: faHome, color: '#3B82F6' },
    { id: 'about', label: 'Về tôi', icon: faUser, color: '#8B5CF6' },
    { id: 'projects', label: 'Dự án', icon: faCode, color: '#10B981' },
    { id: 'blog', label: 'Blog', icon: faBlog, color: '#F59E0B' },
    { id: 'contact', label: 'Liên hệ', icon: faEnvelope, color: '#EF4444' }
  ];

  useEffect(() => {
    const handleScroll = () => {
      const scrolled = window.scrollY;
      setIsVisible(scrolled > 100);

      // Detect active section
      const sectionElements = sections.map(section => 
        document.getElementById(section.id)
      ).filter(Boolean);

      let currentActive = 'home';
      
      sectionElements.forEach(element => {
        if (element) {
          const rect = element.getBoundingClientRect();
          if (rect.top <= window.innerHeight / 2 && rect.bottom >= window.innerHeight / 2) {
            currentActive = element.id;
          }
        }
      });

      setActiveSection(currentActive);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [sections]);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  };

  const scrollToSection = (sectionId) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({
        behavior: 'smooth',
        block: 'start'
      });
    }
  };

  const progressPercentage = Math.round(scrollYProgress.get() * 100);

  return (
    <>
      {/* Top Progress Bar */}
      <motion.div
        className="fixed top-0 left-0 right-0 z-[9995] h-2 bg-gradient-to-r from-blue-600/20 to-purple-600/20 backdrop-blur-sm"
        style={{ opacity }}
      >
        <motion.div
          className="h-full bg-gradient-to-r from-blue-500 via-purple-500 to-green-500 relative overflow-hidden"
          style={{ scaleX, transformOrigin: "0%" }}
        >
          {/* Animated shine effect */}
          <motion.div
            className="absolute inset-0 bg-gradient-to-r from-transparent via-white/50 to-transparent"
            animate={{ x: ["-100%", "100%"] }}
            transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
          />
        </motion.div>
      </motion.div>

      {/* Circular Progress Indicator */}
      <motion.div
        className="fixed top-6 right-6 z-[9994] w-16 h-16 rounded-full glass-effect flex items-center justify-center"
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ 
          opacity: isVisible ? 1 : 0, 
          scale: isVisible ? 1 : 0.8,
        }}
        transition={{ duration: 0.3 }}
      >
        <svg className="w-14 h-14 transform -rotate-90" viewBox="0 0 100 100">
          {/* Background circle */}
          <circle
            cx="50"
            cy="50"
            r="45"
            stroke="rgba(59, 130, 246, 0.2)"
            strokeWidth="8"
            fill="none"
          />
          {/* Progress circle */}
          <motion.circle
            cx="50"
            cy="50"
            r="45"
            stroke="url(#progressGradient)"
            strokeWidth="8"
            fill="none"
            strokeLinecap="round"
            strokeDasharray={283}
            style={{
              strokeDashoffset: useTransform(scrollYProgress, [0, 1], [283, 0])
            }}
          />
          {/* Gradient definition */}
          <defs>
            <linearGradient id="progressGradient" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#3B82F6" />
              <stop offset="50%" stopColor="#8B5CF6" />
              <stop offset="100%" stopColor="#10B981" />
            </linearGradient>
          </defs>
        </svg>
        
        {/* Percentage text */}
        <motion.span
          className="absolute text-white font-bold text-sm"
          animate={{
            scale: [1, 1.1, 1],
          }}
          transition={{
            duration: 0.5,
            repeat: Infinity,
            repeatDelay: 2
          }}
        >
          {progressPercentage}%
        </motion.span>
      </motion.div>

      {/* Enhanced Navigation Dots */}
      <AnimatePresence>
        {isVisible && (
          <motion.div
            className="fixed right-8 top-1/2 transform -translate-y-1/2 z-[9994] space-y-4"
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 50 }}
            transition={{ duration: 0.3, staggerChildren: 0.1 }}
          >
            {sections.map((section, index) => (
              <motion.div
                key={section.id}
                className="relative group"
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: index * 0.1 }}
              >
                <motion.button
                  className={`w-4 h-4 rounded-full border-2 transition-all duration-300 relative overflow-hidden ${
                    activeSection === section.id
                      ? 'bg-white border-white shadow-lg'
                      : 'bg-transparent border-white/40 hover:border-white/80'
                  }`}
                  style={{
                    background: activeSection === section.id ? section.color : 'transparent',
                    borderColor: activeSection === section.id ? section.color : 'rgba(255, 255, 255, 0.4)'
                  }}
                  onClick={() => scrollToSection(section.id)}
                  whileHover={{ scale: 1.3 }}
                  whileTap={{ scale: 0.9 }}
                  data-cursor="text"
                  data-cursor-text={section.label}
                >
                  {/* Pulse effect for active section */}
                  {activeSection === section.id && (
                    <motion.div
                      className="absolute inset-0 rounded-full"
                      style={{ background: section.color }}
                      animate={{
                        scale: [1, 1.5, 1],
                        opacity: [0.8, 0, 0.8]
                      }}
                      transition={{
                        duration: 2,
                        repeat: Infinity,
                        ease: "easeInOut"
                      }}
                    />
                  )}
                </motion.button>

                {/* Enhanced Tooltip */}
                <motion.div
                  className="absolute right-8 top-1/2 transform -translate-y-1/2 glass-effect rounded-lg px-3 py-2 opacity-0 group-hover:opacity-100 transition-all duration-300 whitespace-nowrap pointer-events-none"
                  style={{
                    background: `linear-gradient(135deg, ${section.color}20, ${section.color}40)`
                  }}
                >
                  <div className="flex items-center space-x-2">
                    <FontAwesomeIcon 
                      icon={section.icon} 
                      className="text-sm"
                      style={{ color: section.color }}
                    />
                    <span className="text-white font-medium text-sm">{section.label}</span>
                  </div>
                  
                  {/* Arrow */}
                  <div 
                    className="absolute left-0 top-1/2 transform -translate-y-1/2 -translate-x-1 w-2 h-2 rotate-45"
                    style={{ background: `${section.color}40` }}
                  />
                </motion.div>
              </motion.div>
            ))}
          </motion.div>
        )}
      </AnimatePresence>

      {/* Enhanced Scroll to Top Button */}
      <AnimatePresence>
        {isVisible && (
          <motion.button
            className="fixed bottom-8 right-8 z-[9994] w-14 h-14 glass-effect-strong rounded-full flex items-center justify-center group overflow-hidden"
            onClick={scrollToTop}
            initial={{ opacity: 0, scale: 0.8, y: 100 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.8, y: 100 }}
            whileHover={{ 
              scale: 1.1,
              boxShadow: "0 0 30px rgba(59, 130, 246, 0.5)"
            }}
            whileTap={{ scale: 0.9 }}
            transition={{ duration: 0.3 }}
            data-cursor="text"
            data-cursor-text="Lên đầu trang"
          >
            {/* Background gradient animation */}
            <motion.div
              className="absolute inset-0 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full opacity-0 group-hover:opacity-20 transition-opacity duration-300"
              animate={{
                scale: [1, 1.2, 1],
                opacity: [0.1, 0.3, 0.1]
              }}
              transition={{
                duration: 3,
                repeat: Infinity,
                ease: "easeInOut"
              }}
            />
            
            {/* Rocket icon with animation */}
            <motion.div
              animate={{
                y: [0, -3, 0],
                rotate: [0, 5, -5, 0]
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                ease: "easeInOut"
              }}
            >
              <FontAwesomeIcon 
                icon={faRocket} 
                className="text-blue-400 text-xl group-hover:text-white transition-colors duration-300"
              />
            </motion.div>

            {/* Particles effect */}
            {[...Array(3)].map((_, i) => (
              <motion.div
                key={i}
                className="absolute w-1 h-1 bg-blue-400 rounded-full"
                animate={{
                  y: [20, -20, 20],
                  x: [0, Math.sin(i) * 10, 0],
                  scale: [0, 1, 0],
                  opacity: [0, 1, 0]
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  delay: i * 0.3,
                  ease: "easeInOut"
                }}
              />
            ))}
          </motion.button>
        )}
      </AnimatePresence>

      {/* Side Progress Bar */}
      <motion.div
        className="fixed left-0 top-0 bottom-0 w-1 z-[9993] bg-gradient-to-b from-blue-600/20 to-purple-600/20"
        style={{ opacity: isVisible ? 1 : 0 }}
      >
        <motion.div
          className="w-full bg-gradient-to-b from-blue-500 via-purple-500 to-green-500 relative overflow-hidden"
          style={{ scaleY, transformOrigin: "0% 0%" }}
        >
          {/* Glowing effect */}
          <motion.div
            className="absolute inset-0 bg-gradient-to-b from-white/30 to-transparent"
            animate={{ opacity: [0.3, 0.8, 0.3] }}
            transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
          />
        </motion.div>
      </motion.div>
    </>
  );
};

export default ScrollProgress;
