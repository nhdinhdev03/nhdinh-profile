import React, { useEffect, useState, useRef, useMemo, useCallback, lazy, Suspense } from "react";
import {
  motion,
  useAnimation,
  useReducedMotion,
} from "framer-motion";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faGithub,
  faLinkedin,
  faFacebook,
} from "@fortawesome/free-brands-svg-icons";
import {
  faEnvelope,
  faRocket,
  faCode,
  faLaptopCode,
  faMobile,
  faChevronDown,
  faStar,
  faHeart,
  faEye,
  faBrain,
  faCloud,
  faDatabase,
} from "@fortawesome/free-solid-svg-icons";

import ResponsiveContainer from "../UI/ResponsiveContainer";
import ResponsiveText from "../UI/ResponsiveText";
import useResponsive from "../../hooks/useResponsive";
import usePerformanceOptimization from "../../hooks/usePerformanceOptimization";
import styles from "./Home.module.css";

// Lazy load ParticleBackground for better performance
const ParticleBackground = lazy(() => import("../3D/ParticleBackground"));

const Home = () => {
  const { isMobile, isTablet, isDesktop, breakpoint } = useResponsive();
  const shouldReduceMotion = useReducedMotion();
  const { 
    shouldReduceAnimations, 
    deviceCapabilities, 
    getAnimationConfig,
    getOptimizedParticleCount 
  } = usePerformanceOptimization();
  
  // Memoize static data to prevent unnecessary re-renders
  const heroData = useMemo(() => ({
    preHeading: "Xin chào, tôi là",
    heading: "Nguyễn Hoàng Dinh",
    subHeadings: [
      "Senior Full-Stack Developer",
      "React & Node.js Expert", 
      "Mobile App Developer",
      "UI/UX Design Enthusiast",
      "DevOps & Cloud Architect",
      "AI/ML Integration Specialist",
    ],
    introHtml: `
      <p>🚀 <strong>Chuyên gia phát triển ứng dụng web</strong> với hơn <span class="highlight">7+ năm kinh nghiệm</span> trong việc xây dựng các giải pháp công nghệ hiện đại.</p>
      <p>💡 Tôi đam mê tạo ra những <span class="highlight">trải nghiệm người dùng tuyệt vời</span> thông qua việc kết hợp thiết kế sáng tạo và công nghệ tiên tiến.</p>
      <p>🎯 Chuyên sâu về <span class="highlight">React, Node.js, AI/ML integration</span> và các công nghệ cloud hiện đại.</p>
    `,
  }), []);

  // Memoize social links for better performance
  const socialLinks = useMemo(() => [
    {
      icon: faGithub,
      url: "https://github.com/nhdinhdev03",
      label: "GitHub",
      color: "hover:text-gray-300",
      gradient: "from-gray-700 to-gray-900",
    },
    {
      icon: faLinkedin,
      url: "https://linkedin.com/in/nhdinh",
      label: "LinkedIn",
      color: "hover:text-blue-400",
      gradient: "from-blue-600 to-blue-800",
    },
    {
      icon: faFacebook,
      url: "https://facebook.com/nhdinh.dev",
      label: "Facebook",
      color: "hover:text-blue-500",
      gradient: "from-blue-500 to-blue-700",
    },
    {
      icon: faEnvelope,
      url: "mailto:nhdinh.dev@gmail.com",
      label: "Email",
      color: "hover:text-green-400",
      gradient: "from-green-500 to-green-700",
    },
  ], []);

  // Memoize tech stack for better performance
  const techStack = useMemo(() => [
    {
      name: "React",
      icon: faCode,
      color: "#61DAFB",
      description: "Modern UI Development",
    },
    {
      name: "Node.js",
      icon: faLaptopCode,
      color: "#68A063",
      description: "Backend Services",
    },
    {
      name: "React Native",
      icon: faMobile,
      color: "#FF6B6B",
      description: "Mobile Apps",
    },
    {
      name: "AI/ML",
      icon: faBrain,
      color: "#9B59B6",
      description: "Intelligent Systems",
    },
    {
      name: "Cloud",
      icon: faCloud,
      color: "#4ECDC4",
      description: "Scalable Infrastructure",
    },
    {
      name: "Database",
      icon: faDatabase,
      color: "#F39C12",
      description: "Data Management",
    },
  ], []);

  // Memoize stats for better performance
  const stats = useMemo(() => [
    {
      number: "7+",
      label: "Năm kinh nghiệm",
      icon: faCode,
      color: "text-blue-400",
    },
    {
      number: "150+",
      label: "Dự án hoàn thành",
      icon: faRocket,
      color: "text-green-400",
    },
    {
      number: "50+",
      label: "Khách hàng hài lòng",
      icon: faHeart,
      color: "text-red-400",
    },
    {
      number: "25+",
      label: "Công nghệ thành thạo",
      icon: faStar,
      color: "text-yellow-400",
    },
  ], []);

  const [isVisible, setIsVisible] = useState(false);
  const containerRef = useRef(null);
  const controls = useAnimation();

  // Optimize scroll handler with useCallback
  const scrollToSection = useCallback((sectionId) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ 
        behavior: shouldReduceMotion ? 'auto' : 'smooth',
        block: 'start'
      });
    }
  }, [shouldReduceMotion]);

  useEffect(() => {
    setIsVisible(true);
    if (!shouldReduceMotion && !shouldReduceAnimations) {
      controls.start("visible");
    }
  }, [controls, shouldReduceMotion, shouldReduceAnimations]);

  // Optimized animation variants
  const containerVariants = useMemo(() => getAnimationConfig({
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        delayChildren: 0.5,
        staggerChildren: 0.3,
      },
    },
  }), [getAnimationConfig]);

  const itemVariants = useMemo(() => getAnimationConfig({
    hidden: { y: 50, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.8,
        ease: [0.6, -0.05, 0.01, 0.99],
      },
    },
  }), [getAnimationConfig]);

  return (
    <section
      id="home"
      ref={containerRef}
      className={`${styles.homeSection} relative min-h-screen flex items-center justify-center overflow-hidden`}
    >
      {/* Advanced Particle Background - Lazy loaded with Suspense */}
      {!isMobile && deviceCapabilities.supportsWebGL && (
        <Suspense fallback={<div className="absolute inset-0 bg-transparent" />}>
          <ParticleBackground />
        </Suspense>
      )}

      {/* Dynamic Background Gradient - Optimized for performance */}
      <motion.div
        className={`${styles.gradientOverlay} absolute inset-0`}
        animate={shouldReduceMotion || shouldReduceAnimations ? {} : {
          background: [
            "linear-gradient(135deg, rgba(15, 23, 42, 0.8) 0%, rgba(88, 28, 135, 0.5) 50%, rgba(15, 23, 42, 0.8) 100%)",
            "linear-gradient(135deg, rgba(15, 23, 42, 0.8) 0%, rgba(59, 130, 246, 0.4) 50%, rgba(15, 23, 42, 0.8) 100%)",
            "linear-gradient(135deg, rgba(15, 23, 42, 0.8) 0%, rgba(16, 185, 129, 0.4) 50%, rgba(15, 23, 42, 0.8) 100%)",
          ],
        }}
        transition={{ duration: 15, repeat: Infinity, ease: "easeInOut" }}
      />

      {/* Floating Tech Icons - Optimized count and conditions */}
      {!isMobile && !shouldReduceMotion && !shouldReduceAnimations && (
        <div className={`${styles.backgroundContainer} absolute inset-0 pointer-events-none`}>
          {techStack.slice(0, getOptimizedParticleCount(4)).map((tech, index) => (
            <motion.div
              key={tech.name}
              className={`${styles.floatingIcon} absolute opacity-10`}
              style={{
                left: `${20 + index * 20}%`,
                top: `${15 + index * 15}%`,
                willChange: 'transform',
              }}
              animate={{
                y: [0, -30, 0],
                rotate: [0, 360],
                scale: [1, 1.2, 1],
              }}
              transition={{
                duration: 8 + index,
                repeat: Infinity,
                ease: "easeInOut",
                delay: index * 0.5,
              }}
            >
              <FontAwesomeIcon
                icon={tech.icon}
                className="text-4xl lg:text-6xl"
                style={{ color: tech.color }}
              />
            </motion.div>
          ))}
        </div>
      )}

      <ResponsiveContainer className="relative z-10">
        <div className="flex items-center justify-center min-h-screen py-20">
          {/* Centered Hero Content */}
          <motion.div
            className={`${styles.heroContent} max-w-5xl mx-auto text-center space-y-10`}
            variants={containerVariants}
            initial="hidden"
            animate={controls}
          >
            {/* Pre Heading */}
            <motion.div variants={itemVariants} className="overflow-hidden">
              <motion.div
                className="inline-flex items-center space-x-2 bg-white/10 backdrop-blur-sm rounded-full px-4 py-2 lg:px-6 lg:py-3 border border-white/20"
                whileHover={shouldReduceAnimations ? {} : {
                  scale: 1.05,
                  backgroundColor: "rgba(255, 255, 255, 0.15)",
                }}
              >
                <motion.div
                  className="w-2 h-2 lg:w-3 lg:h-3 bg-green-400 rounded-full"
                  animate={shouldReduceAnimations ? {} : { 
                    scale: [1, 1.2, 1], 
                    opacity: [1, 0.7, 1] 
                  }}
                  transition={{ duration: 2, repeat: Infinity }}
                />
                <ResponsiveText 
                  size="sm" 
                  className="font-medium text-gray-300"
                >
                  {heroData.preHeading}
                </ResponsiveText>
              </motion.div>
            </motion.div>

            {/* Main Heading - Full Name Display */}
            <motion.div variants={itemVariants} className="space-y-6">
              <motion.h1
                className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-bold leading-[1.1] tracking-tight"
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3, duration: 0.8 }}
                style={{
                  background: "linear-gradient(135deg, #60A5FA 0%, #A78BFA 50%, #F472B6 100%)",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                  backgroundClip: "text",
                }}
              >
                <motion.span 
                  className="block"
                  initial={{ opacity: 0, x: -30 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.5, duration: 0.6 }}
                >
                  Nguyễn
                </motion.span>
                <motion.span 
                  className="block"
                  initial={{ opacity: 0, x: 30 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.7, duration: 0.6 }}
                >
                  Hoàng Dinh
                </motion.span>
              </motion.h1>
              
              {/* Professional Title */}
              <motion.p 
                className="text-xl md:text-2xl lg:text-3xl text-slate-300 font-light tracking-wide"
                variants={itemVariants}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.9, duration: 0.6 }}
              >
                Senior Full-Stack Developer
              </motion.p>
            </motion.div>

            {/* Description */}
            <motion.div
              variants={itemVariants}
              className="prose prose-lg prose-invert max-w-3xl mx-auto"
              dangerouslySetInnerHTML={{ __html: heroData.introHtml }}
            />

            {/* Tech Stack Pills - Optimized rendering */}
            <motion.div
              variants={itemVariants}
              className="flex flex-wrap justify-center gap-4 max-w-2xl mx-auto"
            >
              {techStack.slice(0, 6).map((tech, index) => (
                <motion.div
                  key={tech.name}
                  className={`${styles.techPill} flex items-center space-x-2 bg-white/5 backdrop-blur-sm rounded-full px-4 py-2 border border-white/10`}
                  whileHover={shouldReduceAnimations ? {} : {
                    scale: 1.05,
                    backgroundColor: "rgba(255, 255, 255, 0.1)",
                    borderColor: tech.color + "40",
                  }}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.8 + index * 0.1 }}
                  style={{ willChange: 'transform' }}
                >
                  <FontAwesomeIcon
                    icon={tech.icon}
                    className="text-sm"
                    style={{ color: tech.color }}
                  />
                  <span className="text-sm font-medium text-gray-300">
                    {tech.name}
                  </span>
                </motion.div>
              ))}
            </motion.div>

            {/* CTA Buttons - Optimized animations */}
            <motion.div
              variants={itemVariants}
              className="flex flex-col sm:flex-row justify-center gap-4 pt-4"
            >
              <motion.button
                className={`${styles.ctaButton} ${styles.ctaPrimary} group relative px-8 py-4 rounded-xl font-semibold text-white overflow-hidden`}
                whileHover={shouldReduceAnimations ? {} : { scale: 1.05 }}
                whileTap={shouldReduceAnimations ? {} : { scale: 0.95 }}
                onClick={() => scrollToSection("projects")}
                style={{ willChange: 'transform' }}
              >
                <motion.div
                  className="absolute inset-0 bg-gradient-to-r from-purple-600 via-pink-600 to-blue-600"
                  initial={{ x: "-100%" }}
                  whileHover={shouldReduceAnimations ? {} : { x: "0%" }}
                  transition={{ duration: 0.3 }}
                />
                <span className="relative z-10 flex items-center space-x-2">
                  <FontAwesomeIcon icon={faEye} />
                  <span>Xem Dự Án</span>
                </span>
              </motion.button>

              <motion.button
                className={`${styles.ctaButton} ${styles.ctaSecondary} group px-8 py-4 rounded-xl font-semibold text-white hover:bg-white/20 transition-all duration-300`}
                whileHover={shouldReduceAnimations ? {} : { scale: 1.05 }}
                whileTap={shouldReduceAnimations ? {} : { scale: 0.95 }}
                onClick={() => scrollToSection("contact")}
                style={{ willChange: 'transform' }}
              >
                <span className="flex items-center space-x-2">
                  <FontAwesomeIcon icon={faEnvelope} />
                  <span>Liên Hệ</span>
                </span>
              </motion.button>
            </motion.div>

            {/* Social Links - Optimized animations */}
            <motion.div variants={itemVariants} className="flex justify-center space-x-4">
              {socialLinks.map((social, index) => (
                <motion.a
                  key={social.label}
                  href={social.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`${styles.socialLink} ${social.color} transition-all duration-300`}
                  whileHover={shouldReduceAnimations ? {} : {
                    scale: 1.1,
                    backgroundColor: "rgba(255, 255, 255, 0.2)",
                    y: -2,
                  }}
                  whileTap={shouldReduceAnimations ? {} : { scale: 0.9 }}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 1 + index * 0.1 }}
                  style={{ willChange: 'transform' }}
                >
                  <FontAwesomeIcon icon={social.icon} className="text-lg" />
                </motion.a>
              ))}
            </motion.div>
          </motion.div>
        </div>

        {/* Enhanced Scroll Indicator */}
        <motion.div
          className={`${styles.scrollIndicator} absolute bottom-8 left-1/2 transform -translate-x-1/2`}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 2 }}
        >
          <motion.button
            onClick={() => scrollToSection("about")}
            className="flex flex-col items-center space-y-3 text-slate-400 hover:text-white transition-colors duration-300 group"
            whileHover={shouldReduceAnimations ? {} : { scale: 1.05 }}
            whileTap={shouldReduceAnimations ? {} : { scale: 0.95 }}
          >
            <span className="text-xs font-medium tracking-widest uppercase opacity-80 group-hover:opacity-100">
              Cuộn xuống
            </span>
            <motion.div
              className={`${styles.scrollLine} w-px h-8 bg-gradient-to-b from-slate-400 to-transparent`}
              animate={shouldReduceAnimations ? {} : { scaleY: [1, 0.5, 1] }}
              transition={{ duration: 2, repeat: Infinity }}
            />
            <motion.div
              animate={shouldReduceAnimations ? {} : { 
                y: [0, 8, 0], 
                opacity: [1, 0.5, 1] 
              }}
              transition={{ duration: 2, repeat: Infinity }}
            >
              <FontAwesomeIcon icon={faChevronDown} className="text-sm" />
            </motion.div>
          </motion.button>
        </motion.div>
      </ResponsiveContainer>
    </section>
  );
};

export default Home;
