import React, { useEffect, useState, useRef } from 'react';
import { motion, useAnimation, useScroll, useTransform } from 'framer-motion';
import { Link } from 'react-router-dom';
import { 
  FiArrowDown, 
  FiDownload, 
  FiPlay, 
  FiGithub, 
  FiLinkedin, 
  FiMail,
  FiCode,
  FiSend,
  FiStar,
  FiZap,
  FiCpu,
  FiMonitor,
  FiWifi,
  FiDatabase,
  FiCloud,
  FiShield,
  FiActivity
} from 'react-icons/fi';
import { useTheme } from '../../../contexts/ThemeContext';
import ParticleBackground from '../../../components/ParticleBackground';
import './HeroSection.scss';

// Enhanced Typewriter Effect
const EnhancedTypewriter = ({ words, className }) => {
  const [currentWordIndex, setCurrentWordIndex] = useState(0);
  const [currentText, setCurrentText] = useState('');
  const [isDeleting, setIsDeleting] = useState(false);
  const [isWaiting, setIsWaiting] = useState(false);
  const [showCursor, setShowCursor] = useState(true);

  useEffect(() => {
    const currentWord = words[currentWordIndex];
    
    if (isWaiting) {
      const waitTimeout = setTimeout(() => setIsWaiting(false), 2000);
      return () => clearTimeout(waitTimeout);
    }

    const timeout = setTimeout(() => {
      if (!isDeleting) {
        if (currentText.length < currentWord.length) {
          setCurrentText(currentWord.slice(0, currentText.length + 1));
        } else {
          setIsWaiting(true);
          setTimeout(() => setIsDeleting(true), 1500);
        }
      } else {
        if (currentText.length > 0) {
          setCurrentText(currentText.slice(0, -1));
        } else {
          setIsDeleting(false);
          setCurrentWordIndex((prevIndex) => (prevIndex + 1) % words.length);
        }
      }
    }, isDeleting ? 50 : Math.random() * 100 + 50);

    return () => clearTimeout(timeout);
  }, [currentText, isDeleting, currentWordIndex, words, isWaiting]);

  // Cursor blinking effect
  useEffect(() => {
    const cursorInterval = setInterval(() => {
      setShowCursor(prev => !prev);
    }, 500);
    return () => clearInterval(cursorInterval);
  }, []);

  return (
    <span className={className}>
      <span className="gradient-text">{currentText}</span>
      <span className={`cursor ${showCursor ? 'opacity-100' : 'opacity-0'} transition-opacity duration-100 text-cyan-400`}>
        |
      </span>
    </span>
  );
};

// Floating Tech Icons
const FloatingTechIcon = ({ icon: Icon, delay = 0, duration = 3, position }) => {
  return (
    <motion.div
      initial={{ y: 0, opacity: 0.3, scale: 0.5 }}
      animate={{ 
        y: [-20, 20, -20],
        opacity: [0.3, 0.8, 0.3],
        scale: [0.5, 1, 0.5],
        rotate: [0, 360, 0]
      }}
      transition={{
        duration: duration,
        delay: delay,
        repeat: Infinity,
        ease: "easeInOut"
      }}
      className="absolute text-cyan-400"
      style={{
        left: position.x,
        top: position.y,
        filter: 'drop-shadow(0 0 10px currentColor)'
      }}
    >
      <Icon size={24} />
    </motion.div>
  );
};

// 3D Profile Card Component
const Profile3DCard = ({ mousePosition }) => {
  const getCardTransform = () => {
    if (!mousePosition) return {};
    
    const rotateX = (mousePosition.y - 0.5) * -10;
    const rotateY = (mousePosition.x - 0.5) * 10;
    
    return {
      transform: `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1, 1, 1)`,
    };
  };

  return (
    <motion.div
      className="relative w-80 h-80 mx-auto"
      style={getCardTransform()}
      transition={{ type: "spring", stiffness: 300, damping: 30 }}
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
    >
      <div className="relative w-full h-full glass rounded-3xl p-6 border border-cyan-400/20">
        {/* Glowing background */}
        <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/10 via-purple-500/10 to-pink-500/10 rounded-3xl" />
        
        {/* Profile Avatar */}
        <div className="relative z-10 flex flex-col items-center h-full justify-center">
          <motion.div
            className="w-32 h-32 rounded-full bg-gradient-to-br from-cyan-400 via-purple-500 to-pink-500 p-1 mb-4"
            animate={{ rotate: 360 }}
            transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
          >
            <div className="w-full h-full rounded-full bg-gray-800 flex items-center justify-center text-white text-4xl font-bold">
              NH
            </div>
          </motion.div>
          
          <h3 className="text-xl font-bold text-white mb-2">Nguyen Hoang Dinh</h3>
          <p className="text-cyan-400 text-sm mb-4">Full-Stack Developer</p>
          
          {/* Tech Stack Indicators */}
          <div className="flex space-x-2">
            {['React', 'Node.js', 'Python', 'AI/ML'].map((tech, index) => (
              <motion.div
                key={tech}
                className="px-2 py-1 bg-white/10 rounded-lg text-xs text-gray-300"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
              >
                {tech}
              </motion.div>
            ))}
          </div>
        </div>
        
        {/* Floating stats */}
        <motion.div
          className="absolute -top-4 -right-4 glass px-3 py-2 rounded-xl border border-cyan-400/30"
          animate={{ y: [-5, 5, -5] }}
          transition={{ duration: 3, repeat: Infinity }}
        >
          <div className="text-cyan-400 font-bold text-lg">500+</div>
          <div className="text-xs text-gray-300">Commits</div>
        </motion.div>
        
        <motion.div
          className="absolute -bottom-4 -left-4 glass px-3 py-2 rounded-xl border border-purple-400/30"
          animate={{ y: [5, -5, 5] }}
          transition={{ duration: 3, repeat: Infinity, delay: 1 }}
        >
          <div className="text-purple-400 font-bold text-lg">25+</div>
          <div className="text-xs text-gray-300">Projects</div>
        </motion.div>
      </div>
    </motion.div>
  );
};

// Main Hero Section Component
const HeroSection = () => {
  const { isDark } = useTheme();
  const [mousePosition, setMousePosition] = useState({ x: 0.5, y: 0.5 });
  const heroRef = useRef(null);
  const controls = useAnimation();
  
  const { scrollY } = useScroll();
  const y = useTransform(scrollY, [0, 500], [0, 250]);
  const opacity = useTransform(scrollY, [0, 300], [1, 0]);

  const roles = [
    'Full-Stack Developer 🚀',
    'UI/UX Designer 🎨', 
    'Tech Innovator 💡',
    'Problem Solver 🧩',
    'Code Architect 🏗️',
    'Digital Creator ✨'
  ];

  const techIcons = [
    { icon: FiCpu, position: { x: '10%', y: '20%' } },
    { icon: FiMonitor, position: { x: '85%', y: '15%' } },
    { icon: FiWifi, position: { x: '15%', y: '70%' } },
    { icon: FiDatabase, position: { x: '80%', y: '60%' } },
    { icon: FiCloud, position: { x: '5%', y: '45%' } },
    { icon: FiShield, position: { x: '90%', y: '35%' } },
    { icon: FiActivity, position: { x: '20%', y: '90%' } },
    { icon: FiZap, position: { x: '75%', y: '85%' } }
  ];

  useEffect(() => {
    controls.start('visible');
  }, [controls]);

  useEffect(() => {
    const handleMouseMove = (e) => {
      if (heroRef.current) {
        const rect = heroRef.current.getBoundingClientRect();
        setMousePosition({
          x: (e.clientX - rect.left) / rect.width,
          y: (e.clientY - rect.top) / rect.height
        });
      }
    };

    const hero = heroRef.current;
    if (hero) {
      hero.addEventListener('mousemove', handleMouseMove);
      return () => hero.removeEventListener('mousemove', handleMouseMove);
    }
  }, []);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.3,
        delayChildren: 0.2
      }
    }
  };

  const itemVariants = {
    hidden: { y: 50, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        type: "spring",
        stiffness: 100,
        damping: 10
      }
    }
  };

  return (
    <motion.section 
      ref={heroRef}
      className="relative min-h-screen flex items-center justify-center overflow-hidden"
      style={{ y, opacity }}
      initial="hidden"
      animate={controls}
      variants={containerVariants}
    >
      {/* Animated Background */}
      <div className="absolute inset-0 animated-bg opacity-20"></div>
      
      {/* Cyber Grid Background */}
      <div className="absolute inset-0 cyber-grid-animated opacity-30"></div>

      {/* Floating Tech Icons */}
      <div className="absolute inset-0 pointer-events-none">
        {techIcons.map((item, index) => (
          <FloatingTechIcon
            key={index}
            icon={item.icon}
            delay={index * 0.5}
            duration={3 + (index % 3)}
            position={item.position}
          />
        ))}
      </div>

      {/* Main Content */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
        {/* Left Content */}
        <motion.div variants={itemVariants} className="text-center lg:text-left">
          {/* Status Badge */}
          <motion.div
            className="inline-flex items-center gap-2 px-4 py-2 glass rounded-full border border-green-400/30 mb-6"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.5 }}
          >
            <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
            <span className="text-sm text-green-400 font-medium">Available for work</span>
          </motion.div>

          {/* Greeting */}
          <motion.div variants={itemVariants} className="mb-4">
            <div className="flex items-center gap-3 justify-center lg:justify-start">
              <motion.span
                className="text-3xl"
                animate={{ rotate: [0, -10, 12, -10, 0] }}
                transition={{ duration: 2, repeat: Infinity, repeatDelay: 3 }}
              >
                👋
              </motion.span>
              <span className="text-xl text-gray-300">Hi, I'm</span>
            </div>
          </motion.div>

          {/* Main Title with Glitch Effect */}
          <motion.div variants={itemVariants} className="mb-6">
            <motion.h1 
              className="text-5xl md:text-7xl font-black mb-4 relative"
              animate={{
                textShadow: [
                  '2px 2px 0 #ff0000, -2px -2px 0 #00ffff',
                  '0px 0px 0 #ff0000, 0px 0px 0 #00ffff',
                  '2px 2px 0 #ff0000, -2px -2px 0 #00ffff'
                ]
              }}
              transition={{ duration: 0.1, repeat: Infinity, repeatDelay: 3 }}
            >
              <span className="gradient-text">NHDINH</span>
            </motion.h1>
          </motion.div>

          {/* Dynamic Role */}
          <motion.div variants={itemVariants} className="mb-8">
            <div className="text-2xl md:text-3xl font-display text-cyan-400 mb-4">
              &gt; I am a{' '}
              <EnhancedTypewriter 
                words={roles}
                className="text-white font-bold"
              />
            </div>
          </motion.div>

          {/* Description */}
          <motion.div variants={itemVariants} className="mb-8">
            <p className="text-lg text-gray-300 leading-relaxed max-w-lg mx-auto lg:mx-0">
              Passionate about creating innovative digital solutions that push boundaries. 
              I combine cutting-edge technology with creative problem-solving to deliver 
              exceptional user experiences.
            </p>
          </motion.div>

          {/* CTA Buttons */}
          <motion.div variants={itemVariants} className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start mb-8">
            <motion.button
              className="group relative px-8 py-4 bg-gradient-to-r from-cyan-500 to-blue-600 rounded-2xl font-semibold text-white overflow-hidden"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <span className="relative z-10 flex items-center gap-2">
                <FiZap className="animate-bounce" />
                View My Work
              </span>
              <motion.div
                className="absolute inset-0 bg-gradient-to-r from-cyan-400 to-blue-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
              />
            </motion.button>

            <motion.button
              className="px-8 py-4 glass border border-cyan-400/30 rounded-2xl font-semibold text-cyan-400 hover:bg-cyan-400/10 transition-all duration-300"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <span className="flex items-center gap-2">
                <FiDownload />
                Download CV
              </span>
            </motion.button>
          </motion.div>

          {/* Social Links */}
          <motion.div variants={itemVariants} className="flex justify-center lg:justify-start space-x-6">
            {[
              { icon: FiGithub, href: '#', label: 'GitHub' },
              { icon: FiLinkedin, href: '#', label: 'LinkedIn' },
              { icon: FiMail, href: '#', label: 'Email' }
            ].map(({ icon: Icon, href, label }) => (
              <motion.a
                key={label}
                href={href}
                className="text-2xl text-gray-400 hover:text-cyan-400 transition-colors duration-300"
                whileHover={{ 
                  scale: 1.2, 
                  rotate: 360,
                  filter: 'drop-shadow(0 0 10px currentColor)'
                }}
                whileTap={{ scale: 0.9 }}
              >
                <Icon />
              </motion.a>
            ))}
          </motion.div>
        </motion.div>

        {/* Right Content - 3D Profile Card */}
        <motion.div variants={itemVariants} className="flex justify-center">
          <Profile3DCard mousePosition={mousePosition} />
        </motion.div>
      </div>

      {/* Scroll Indicator */}
      <motion.div
        variants={itemVariants}
        className="absolute bottom-8 left-1/2 transform -translate-x-1/2 text-center"
      >
        <motion.div
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
          className="text-cyan-400 text-2xl cursor-pointer hover:text-white transition-colors duration-300"
        >
          <FiArrowDown className="mx-auto" />
        </motion.div>
        <div className="mt-2 text-sm text-gray-400 font-medium">
          Scroll to explore
        </div>
      </motion.div>

      {/* Mouse follower effect */}
      <motion.div
        className="absolute pointer-events-none"
        animate={{
          x: mousePosition.x * 50,
          y: mousePosition.y * 50,
        }}
        transition={{ type: "spring", stiffness: 500, damping: 30 }}
      >
        <div className="w-96 h-96 bg-gradient-radial from-cyan-500/10 via-transparent to-transparent rounded-full blur-3xl" />
      </motion.div>

      {/* Particle Background */}
      <ParticleBackground isDark={isDark} />
    </motion.section>
  );
};

export default HeroSection;
