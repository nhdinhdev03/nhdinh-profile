import React, { useEffect, useRef, useState, useCallback, useMemo } from 'react';
import { motion, useAnimation, useInView, LazyMotion, domAnimation } from 'framer-motion';
import { Link } from 'react-router-dom';
import { useTheme } from '../../contexts/ThemeContext';
import { generateThemeClasses, getThemeGradient } from '../../utils/themeUtils';
import { 
  FiArrowDown, 
  FiGithub, 
  FiLinkedin, 
  FiMail, 
  FiDownload,
  FiCode,
  FiZap,
  FiTrendingUp,
  FiUsers,
  FiCpu,
  FiDatabase,
  FiCloud,
  FiServer,
  FiGlobe,
  FiBox,
  FiTarget
} from 'react-icons/fi';

// Static data moved outside component to prevent recreation
const TECH_STACK = [
  { name: 'React', icon: FiCode, level: 95, category: 'Frontend' },
  { name: 'Node.js', icon: FiServer, level: 90, category: 'Backend' },
  { name: 'Python', icon: FiCpu, level: 88, category: 'AI/ML' },
  { name: 'TypeScript', icon: FiCode, level: 92, category: 'Language' },
  { name: 'AWS', icon: FiCloud, level: 85, category: 'Cloud' },
  { name: 'Docker', icon: FiBox, level: 87, category: 'DevOps' },
  { name: 'GraphQL', icon: FiDatabase, level: 83, category: 'API' },
  { name: 'Next.js', icon: FiGlobe, level: 89, category: 'Framework' }
];

const STATS = [
  { label: 'Projects Completed', value: '50+', icon: FiTarget },
  { label: 'Years Experience', value: '5+', icon: FiTrendingUp },
  { label: 'Technologies Mastered', value: '25+', icon: FiZap },
  { label: 'Happy Clients', value: '30+', icon: FiUsers }
];

const Home = React.memo(() => {
  const { theme } = useTheme();
  const themeClasses = useMemo(() => generateThemeClasses(theme), [theme]);
  const heroRef = useRef(null);
  const skillsRef = useRef(null);
  const statsRef = useRef(null);
  
  const heroInView = useInView(heroRef, { once: true });
  const skillsInView = useInView(skillsRef, { once: true });
  const statsInView = useInView(statsRef, { once: true });

  const heroAnimation = useAnimation();
  const skillsAnimation = useAnimation();
  const statsAnimation = useAnimation();


  // Animation triggers
  useEffect(() => {
    if (heroInView) {
      heroAnimation.start('visible');
    }
  }, [heroInView, heroAnimation]);

  useEffect(() => {
    if (skillsInView) {
      skillsAnimation.start('visible');
    }
  }, [skillsInView, skillsAnimation]);

  useEffect(() => {
    if (statsInView) {
      statsAnimation.start('visible');
    }
  }, [statsInView, statsAnimation]);

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        delayChildren: 0.2,
        staggerChildren: 0.1
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
        stiffness: 100
      }
    }
  };

  const techStack = TECH_STACK; // alias for readability
  const stats = STATS;

  // Floating particle component
  const FloatingParticle = useCallback(({ delay = 0, left }) => (
    <motion.div
      className="absolute w-1 h-1 bg-cyan-400 rounded-full opacity-60 will-change-transform"
      animate={{ y: [-20, -100], opacity: [0, 1, 0] }}
      transition={{ duration: 3, repeat: Infinity, delay, ease: "easeOut" }}
      style={{ left }}
    />
  ), []);

  const particles = useMemo(() => (
    Array.from({ length: 18 }).map((_, i) => (
      <FloatingParticle key={i} delay={i * 0.25} left={(i * 5.5) % 100 + '%'} />
    ))
  ), []); // FloatingParticle is stable

  return (
    <LazyMotion features={domAnimation}>
    <div className={themeClasses.container}>
      {/* Neural Network Background */}
      <div className={`absolute inset-0 ${themeClasses.subtleOpacity}`}>
        <div className={`absolute inset-0 ${themeClasses.heroBackground}`} />
        
        {/* Animated Grid */}
        <motion.div 
          className="absolute inset-0"
          style={{
            background: getThemeGradient(theme, 'neural'),
            backgroundSize: '50px 50px'
          }}
          animate={{
            backgroundPosition: ['0px 0px', '50px 50px']
          }}
          transition={{
            duration: 20,
            repeat: Infinity,
            ease: "linear"
          }}
        />

        {/* Floating Particles (deterministic) */}
          {particles}
      </div>



      {/* Hero Section */}
  <section className="min-h-screen flex items-center justify-center relative z-10" ref={heroRef} aria-label="Hero section">
        <motion.div
          className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center"
          variants={containerVariants}
          initial="hidden"
          animate={heroAnimation}
        >
          {/* AI Status Indicator */}
          <motion.div
            variants={itemVariants}
            className={`inline-flex items-center space-x-2 bg-gradient-to-r border rounded-full px-6 py-2 mb-8 ${
              theme === 'dark' 
                ? 'from-cyan-500/10 to-purple-500/10 border-cyan-500/20' 
                : 'from-cyan-100/50 to-purple-100/50 border-cyan-200/50'
            }`}
          >
            <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse" />
            <span className={themeClasses.accentText}>AI Engineer • Online</span>
          </motion.div>

          {/* Main Heading */}
          <motion.h1
            variants={itemVariants}
            className="text-5xl md:text-7xl lg:text-8xl font-black mb-6 leading-[1.05]"
          >
            <span className="bg-gradient-to-r from-cyan-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
              Nguyen Hoang
            </span>
            <br />
            <span className={themeClasses.primaryText}>Dinh</span>
          </motion.h1>

          {/* Subtitle */}
          <motion.p
            variants={itemVariants}
            className={`text-xl md:text-2xl mb-8 max-w-3xl mx-auto font-light ${themeClasses.secondaryText}`}
          >
            Crafting the future through{' '}
            <span className="text-cyan-400 font-semibold">Artificial Intelligence</span>,{' '}
            <span className="text-purple-400 font-semibold">Machine Learning</span>, and{' '}
            <span className="text-pink-400 font-semibold">Neural Networks</span>
          </motion.p>

          {/* CTA Buttons */}
          <motion.div
            variants={itemVariants}
            className="flex flex-col sm:flex-row gap-6 justify-center items-center mb-16"
          >
            <Link
              to="/projects"
              className="group bg-gradient-to-r from-cyan-500 to-purple-500 text-white px-8 py-4 rounded-2xl font-semibold text-lg hover:from-cyan-400 hover:to-purple-400 transition-all duration-300 shadow-lg shadow-cyan-500/25 hover:shadow-cyan-500/40 transform hover:scale-[1.03] focus:outline-none focus:ring-2 focus:ring-cyan-400/60"
            >
              <span className="flex items-center space-x-2">
                <span>Explore Projects</span>
                {/* Removed FiRocket (not in feather pack); using FiCode */}
                <FiCode className="w-5 h-5 group-hover:animate-bounce" />
              </span>
            </Link>
            
            <a
              href="/resume.pdf"
              download
              className="group bg-transparent border-2 border-gray-600 text-white px-8 py-4 rounded-2xl font-semibold text-lg hover:border-cyan-400 hover:text-cyan-400 transition-all duration-300 transform hover:scale-[1.03] focus:outline-none focus:ring-2 focus:ring-cyan-400/60"
            >
              <span className="flex items-center space-x-2">
                <FiDownload className="w-5 h-5 group-hover:animate-bounce" />
                <span>Download CV</span>
              </span>
            </a>
          </motion.div>

          {/* Social Links */}
          <motion.div
            variants={itemVariants}
            className="flex items-center justify-center space-x-6"
          >
            {[
              { icon: FiGithub, href: 'https://github.com/nhdinhdev03', label: 'GitHub' },
              { icon: FiLinkedin, href: 'https://linkedin.com/in/nhdinh', label: 'LinkedIn' },
              { icon: FiMail, href: 'mailto:contact@nhdinh.dev', label: 'Email' }
            ].map((social, index) => (
              <motion.a
                key={social.label}
                href={social.href}
                whileHover={{ y: -5, scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
                className="w-12 h-12 bg-gray-800/50 backdrop-blur-sm border border-gray-700 rounded-xl flex items-center justify-center text-gray-400 hover:text-cyan-400 hover:border-cyan-400/50 transition-all duration-300"
                aria-label={social.label}
              >
                <social.icon className="w-6 h-6" />
              </motion.a>
            ))}
          </motion.div>

          {/* Scroll Indicator */}
          <motion.div
            className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
            animate={{ y: [0, 10, 0] }}
            transition={{ duration: 2, repeat: Infinity }}
          >
            <FiArrowDown className="w-6 h-6 text-gray-400" />
          </motion.div>
        </motion.div>
      </section>

      {/* Skills Section */}
  <section className="py-32 relative" ref={skillsRef} aria-label="Technologies section">
        <div className="absolute inset-0 bg-gradient-to-br from-blue-900/5 via-purple-900/5 to-cyan-900/5" />
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate={skillsAnimation}
            className="text-center mb-16"
          >
            <motion.h2
              variants={itemVariants}
              className="text-4xl md:text-5xl font-bold mb-6"
            >
              <span className="text-white">Tech </span>
              <span className="bg-gradient-to-r from-cyan-400 to-purple-400 bg-clip-text text-transparent">
                Arsenal
              </span>
            </motion.h2>
            <motion.p
              variants={itemVariants}
              className="text-xl text-gray-300 max-w-3xl mx-auto"
            >
              Mastering cutting-edge technologies to build intelligent, scalable, and robust solutions
            </motion.p>
          </motion.div>

          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate={skillsAnimation}
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6"
          >
            {techStack.map((tech, index) => (
              <motion.div
                key={tech.name}
                variants={itemVariants}
                className="group bg-gradient-to-br from-gray-900/80 to-gray-800/80 backdrop-blur-sm border border-gray-700 rounded-2xl p-6 hover:border-cyan-400/50 transition-all duration-300 hover:shadow-lg hover:shadow-cyan-500/10"
                whileHover={{ y: -5 }}
              >
                <div className="flex items-center space-x-4 mb-4">
                  <div className="w-12 h-12 bg-gradient-to-r from-cyan-500/20 to-purple-500/20 rounded-xl flex items-center justify-center">
                    <tech.icon className="w-6 h-6 text-cyan-400" />
                  </div>
                  <div>
                    <h3 className="text-white font-semibold">{tech.name}</h3>
                    <p className="text-gray-400 text-sm">{tech.category}</p>
                  </div>
                </div>
                
                <div className="space-y-2">
                  <div className="flex justify-between items-center">
                    <span className="text-gray-300 text-sm">Proficiency</span>
                    <span className="text-cyan-400 font-semibold">{tech.level}%</span>
                  </div>
                  <div className="w-full bg-gray-700 rounded-full h-2">
                    <motion.div
                      className="h-2 bg-gradient-to-r from-cyan-400 to-purple-400 rounded-full"
                      initial={{ width: 0 }}
                      animate={{ width: skillsInView ? `${tech.level}%` : 0 }}
                      transition={{ duration: 1.5, delay: index * 0.1 }}
                    />
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Stats Section */}
  <section className="py-32 relative overflow-hidden" ref={statsRef} aria-label="Statistics section">
        <div className="absolute inset-0">
          <div className="absolute inset-0 bg-gradient-to-r from-cyan-500/5 via-purple-500/5 to-pink-500/5" />
          
          {/* Animated Background Elements */}
          {[...Array(6)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute w-96 h-96 bg-gradient-to-r from-cyan-500/5 to-purple-500/5 rounded-full blur-3xl"
              animate={{
                x: [0, 100, 0],
                y: [0, -50, 0],
                scale: [1, 1.2, 1],
              }}
              transition={{
                duration: 10 + i * 2,
                repeat: Infinity,
                ease: "easeInOut",
              }}
              style={{
                left: Math.random() * 100 + "%",
                top: Math.random() * 100 + "%",
              }}
            />
          ))}
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate={statsAnimation}
            className="text-center mb-16"
          >
            <motion.h2
              variants={itemVariants}
              className="text-4xl md:text-5xl font-bold mb-6"
            >
              <span className="text-white">By the </span>
              <span className="bg-gradient-to-r from-cyan-400 to-purple-400 bg-clip-text text-transparent">
                Numbers
              </span>
            </motion.h2>
          </motion.div>

          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate={statsAnimation}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8"
          >
            {stats.map((stat, index) => (
              <motion.div
                key={stat.label}
                variants={itemVariants}
                className="text-center group"
              >
                <motion.div
                  className="w-20 h-20 mx-auto mb-6 bg-gradient-to-r from-cyan-500/20 to-purple-500/20 rounded-2xl flex items-center justify-center border border-cyan-500/30 group-hover:border-cyan-400/70 transition-all duration-300"
                  whileHover={{ scale: 1.1, rotate: 5 }}
                >
                  <stat.icon className="w-8 h-8 text-cyan-400" />
                </motion.div>
                
                <motion.div
                  className="text-4xl md:text-5xl font-black text-white mb-2"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: statsInView ? 1 : 0, y: statsInView ? 0 : 20 }}
                  transition={{ duration: 0.8, delay: index * 0.2 }}
                >
                  {stat.value}
                </motion.div>
                
                <p className="text-gray-400 font-medium">{stat.label}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>
    </div>
    </LazyMotion>
  );
});





export default Home;