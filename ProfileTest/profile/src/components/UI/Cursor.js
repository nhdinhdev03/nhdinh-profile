import React, { useEffect, useState } from 'react';
import { motion, useMotionValue, useSpring, AnimatePresence } from 'framer-motion';

const Cursor = () => {
  const [isHovered, setIsHovered] = useState(false);
  const [cursorText, setCursorText] = useState('');
  const [cursorVariant, setCursorVariant] = useState('default');
  const [isVisible, setIsVisible] = useState(false);
  
  const cursorX = useMotionValue(-100);
  const cursorY = useMotionValue(-100);
  
  const springConfig = { damping: 25, stiffness: 700 };
  const cursorXSpring = useSpring(cursorX, springConfig);
  const cursorYSpring = useSpring(cursorY, springConfig);

  useEffect(() => {
    const moveCursor = (e) => {
      cursorX.set(e.clientX - 16);
      cursorY.set(e.clientY - 16);
      setIsVisible(true);
    };

    const handleMouseEnter = () => setIsVisible(true);
    const handleMouseLeave = () => setIsVisible(false);

    window.addEventListener('mousemove', moveCursor);
    window.addEventListener('mouseenter', handleMouseEnter);
    window.addEventListener('mouseleave', handleMouseLeave);

    // Enhanced cursor interactions
    const hoverElements = document.querySelectorAll('a, button, [data-cursor]');
    
    hoverElements.forEach(el => {
      el.addEventListener('mouseenter', () => {
        setIsHovered(true);
        const cursorType = el.getAttribute('data-cursor') || 'hover';
        const text = el.getAttribute('data-cursor-text') || '';
        setCursorVariant(cursorType);
        setCursorText(text);
      });
      
      el.addEventListener('mouseleave', () => {
        setIsHovered(false);
        setCursorVariant('default');
        setCursorText('');
      });
    });

    return () => {
      window.removeEventListener('mousemove', moveCursor);
      window.removeEventListener('mouseenter', handleMouseEnter);
      window.removeEventListener('mouseleave', handleMouseLeave);
      
      hoverElements.forEach(el => {
        el.removeEventListener('mouseenter', () => {});
        el.removeEventListener('mouseleave', () => {});
      });
    };
  }, [cursorX, cursorY]);

  const variants = {
    default: {
      width: 32,
      height: 32,
      borderRadius: '50%',
      border: '2px solid rgba(59, 130, 246, 0.6)',
      background: 'rgba(59, 130, 246, 0.1)',
      backdropFilter: 'blur(10px)',
      mixBlendMode: 'difference'
    },
    hover: {
      width: 80,
      height: 80,
      borderRadius: '50%',
      border: '2px solid rgba(139, 92, 246, 0.8)',
      background: 'rgba(139, 92, 246, 0.2)',
      backdropFilter: 'blur(15px)',
      mixBlendMode: 'difference'
    },
    text: {
      width: 'auto',
      height: 'auto',
      borderRadius: '20px',
      border: '2px solid rgba(16, 185, 129, 0.8)',
      background: 'rgba(16, 185, 129, 0.2)',
      backdropFilter: 'blur(15px)',
      mixBlendMode: 'normal',
      padding: '8px 16px'
    },
    click: {
      width: 60,
      height: 60,
      borderRadius: '50%',
      border: '3px solid rgba(244, 63, 94, 0.8)',
      background: 'rgba(244, 63, 94, 0.3)',
      backdropFilter: 'blur(20px)',
      mixBlendMode: 'difference'
    }
  };

  // Hide on mobile devices
  const isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
  
  if (isMobile) return null;

  return (
    <AnimatePresence>
      {isVisible && (
        <>
          {/* Main Cursor */}
          <motion.div
            className="fixed top-0 left-0 pointer-events-none z-[9999] flex items-center justify-center"
            style={{
              x: cursorXSpring,
              y: cursorYSpring,
            }}
            animate={cursorVariant}
            variants={variants}
            transition={{
              type: "spring",
              stiffness: 500,
              damping: 28,
              mass: 0.5
            }}
          >
            {/* Cursor Inner Dot */}
            <motion.div
              className="w-2 h-2 bg-blue-400 rounded-full"
              animate={{
                scale: isHovered ? 0 : 1,
                opacity: cursorText ? 0 : 1
              }}
              transition={{ duration: 0.2 }}
            />
            
            {/* Cursor Text */}
            <AnimatePresence>
              {cursorText && (
                <motion.span
                  className="text-white font-medium text-sm whitespace-nowrap"
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.8 }}
                  transition={{ duration: 0.2 }}
                >
                  {cursorText}
                </motion.span>
              )}
            </AnimatePresence>
          </motion.div>

          {/* Cursor Trail */}
          <motion.div
            className="fixed top-0 left-0 pointer-events-none z-[9998] w-1 h-1 bg-blue-400 rounded-full opacity-60"
            style={{
              x: cursorXSpring,
              y: cursorYSpring,
            }}
            animate={{
              scale: isHovered ? 8 : 4,
            }}
            transition={{
              type: "spring",
              stiffness: 300,
              damping: 30,
              delay: 0.1
            }}
          />

          {/* Magnetic Effect for Interactive Elements */}
          {isHovered && (
            <motion.div
              className="fixed top-0 left-0 pointer-events-none z-[9997] rounded-full border border-purple-400/30"
              style={{
                x: cursorXSpring,
                y: cursorYSpring,
              }}
              animate={{
                width: 120,
                height: 120,
                x: cursorXSpring,
                y: cursorYSpring,
              }}
              transition={{
                type: "spring",
                stiffness: 200,
                damping: 25
              }}
            />
          )}

          {/* Particles around cursor */}
          {[...Array(3)].map((_, i) => (
            <motion.div
              key={i}
              className="fixed top-0 left-0 pointer-events-none z-[9996] w-1 h-1 bg-gradient-to-r from-blue-400 to-purple-500 rounded-full"
              style={{
                x: cursorXSpring,
                y: cursorYSpring,
              }}
              animate={{
                x: [
                  cursorXSpring.get(),
                  cursorXSpring.get() + Math.cos(i * 2.1) * 20,
                  cursorXSpring.get()
                ],
                y: [
                  cursorYSpring.get(),
                  cursorYSpring.get() + Math.sin(i * 2.1) * 20,
                  cursorYSpring.get()
                ],
                scale: [0, 1, 0],
                opacity: [0, 0.8, 0]
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                delay: i * 0.3,
                ease: "easeInOut"
              }}
            />
          ))}
        </>
      )}
    </AnimatePresence>
  );
};

export default Cursor;
