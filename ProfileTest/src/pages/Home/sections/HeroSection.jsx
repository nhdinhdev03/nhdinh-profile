import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { FiArrowDown, FiDownload, FiPlay } from 'react-icons/fi';
// import Typed from 'react-typed'; // Removed due to React 18 compatibility
import './HeroSection.scss';

const TypewriterEffect = ({ words }) => {
  const [currentWordIndex, setCurrentWordIndex] = useState(0);
  const [currentText, setCurrentText] = useState('');
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    const currentWord = words[currentWordIndex];
    const timeout = setTimeout(() => {
      if (!isDeleting) {
        if (currentText.length < currentWord.length) {
          setCurrentText(currentWord.slice(0, currentText.length + 1));
        } else {
          setTimeout(() => setIsDeleting(true), 1000);
        }
      } else {
        if (currentText.length > 0) {
          setCurrentText(currentText.slice(0, -1));
        } else {
          setIsDeleting(false);
          setCurrentWordIndex((prevIndex) => (prevIndex + 1) % words.length);
        }
      }
    }, isDeleting ? 50 : 100);

    return () => clearTimeout(timeout);
  }, [currentText, isDeleting, currentWordIndex, words]);

  return (
    <span className="typed-text gradient-text">
      {currentText}
      <span className="cursor">|</span>
    </span>
  );
};

const HeroSection = () => {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handleMouseMove = (e) => {
      setMousePosition({
        x: (e.clientX / window.innerWidth) * 100,
        y: (e.clientY / window.innerHeight) * 100,
      });
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        delayChildren: 0.3,
        staggerChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.5,
      },
    },
  };

  return (
    <section className="hero-section">
      {/* Animated Background */}
      <div className="hero-bg">
        <div
          className="bg-gradient"
          style={{
            background: `radial-gradient(circle at ${mousePosition.x}% ${mousePosition.y}%, rgba(59, 130, 246, 0.1) 0%, transparent 50%)`,
          }}
        />
        <div className="floating-shapes">
          {[...Array(6)].map((_, i) => (
            <motion.div
              key={i}
              className={`shape shape-${i + 1}`}
              animate={{
                y: [-20, 20, -20],
                rotate: [0, 180, 360],
              }}
              transition={{
                duration: 6 + i,
                repeat: Infinity,
                ease: 'easeInOut',
              }}
            />
          ))}
        </div>
      </div>

      <div className="container mx-auto px-4">
        <motion.div
          className="hero-content"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          {/* Main Content */}
          <div className="hero-text">
            <motion.div variants={itemVariants} className="greeting">
              <span className="greeting-text">👋 Hello, I'm</span>
            </motion.div>

            <motion.h1 variants={itemVariants} className="hero-title">
              <span className="name gradient-text">Your Name</span>
            </motion.h1>

            <motion.div variants={itemVariants} className="hero-subtitle">
              <span className="role-prefix">I'm a </span>
              <TypewriterEffect
                words={[
                  'Frontend Developer',
                  'React Specialist',
                  'UI/UX Designer',
                  'Problem Solver',
                ]}
              />
            </motion.div>

            <motion.p variants={itemVariants} className="hero-description">
              Passionate about creating beautiful, functional, and user-centered
              digital experiences. I specialize in modern web technologies and
              love bringing ideas to life through code.
            </motion.p>

            <motion.div variants={itemVariants} className="hero-actions">
              <Link to="/contact" className="btn-primary">
                <span>Get In Touch</span>
              </Link>
              
              <button className="btn-secondary">
                <FiDownload className="btn-icon" />
                <span>Download CV</span>
              </button>
              
              <button className="btn-play">
                <FiPlay className="play-icon" />
                <span>Watch Demo</span>
              </button>
            </motion.div>
          </div>

          {/* Profile Image */}
          <motion.div
            variants={itemVariants}
            className="hero-image"
          >
            <div className="image-container">
              <div className="image-placeholder">
                <div className="placeholder-content">
                  <span>Your Photo</span>
                </div>
              </div>
              <div className="image-decoration">
                <div className="decoration decoration-1" />
                <div className="decoration decoration-2" />
                <div className="decoration decoration-3" />
              </div>
            </div>
          </motion.div>
        </motion.div>

        {/* Scroll Indicator */}
        <motion.div
          className="scroll-indicator"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.5 }}
        >
          <motion.div
            animate={{ y: [0, 10, 0] }}
            transition={{ duration: 2, repeat: Infinity }}
          >
            <FiArrowDown size={24} />
          </motion.div>
          <span>Scroll to explore</span>
        </motion.div>
      </div>
    </section>
  );
};

export default HeroSection;
