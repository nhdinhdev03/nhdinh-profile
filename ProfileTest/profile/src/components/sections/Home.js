import React, { useEffect, useState, useRef, useMemo } from "react";
import {
  motion,
  useAnimation,
  AnimatePresence,
  useScroll,
  useTransform,
  useSpring,
  useInView,
} from "framer-motion";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faGithub,
  faLinkedin,
  faFacebook,
  faTwitter,
  faInstagram,
  faYoutube,
} from "@fortawesome/free-brands-svg-icons";
import HomeParticlesEffect from "../effects3D/HomeParticlesEffect";
import {
  faDownload,
  faEnvelope,
  faRocket,
  faCode,
  faLaptopCode,
  faMobile,
  faChevronDown,
  faStar,
  faPlay,
  faHeart,
  faEye,
  faBrain,
  faCloud,
  faDatabase,
  faInfinity,
  faAtom,
  faMeteor,
  faGem,
  faFire,
  faLightbulb,
  faBolt,
  faMagic,
} from "@fortawesome/free-solid-svg-icons";

import ParticleBackground from "../3D/ParticleBackground";
import ResponsiveContainer from "../UI/ResponsiveContainer";
import ResponsiveText from "../UI/ResponsiveText";
import useResponsive from "../../hooks/useResponsive";

const Home = () => {
  const { isMobile, isTablet, isDesktop, breakpoint } = useResponsive();
  const [heroData, setHeroData] = useState({
    preHeading: "🌟 WELCOME TO THE FUTURE",
    heading: "NGUYỄN HOÀNG DINH",
    subHeadings: [
      "🚀 FULL-STACK ARCHITECT",
      "⚡ REACT NINJA",
      "🔥 NODE.JS WIZARD",
      "📱 MOBILE INNOVATOR", 
      "🎨 UI/UX MAESTRO",
      "☁️ CLOUD ARCHITECT",
      "🤖 AI/ML PIONEER",
      "💎 TECH VISIONARY",
    ],
    introHtml: `
      <div class="space-y-4">
        <p class="text-lg font-medium">
          🚀 <span class="neo-highlight">Kiến trúc sư công nghệ tương lai</span> với 
          <span class="text-cyan-400 font-bold">7+ năm kinh nghiệm</span> 
          xây dựng các giải pháp đột phá
        </p>
        <p class="text-lg font-medium">
          � Tôi không chỉ code - tôi <span class="neo-highlight">tạo ra những phép màu công nghệ</span> 
          thay đổi cách con người tương tác với thế giới số
        </p>
        <p class="text-lg font-medium">
          🎯 Chuyên gia về <span class="tech-stack-highlight">React ⚛️ Node.js 🟢 AI/ML 🤖 Cloud ☁️</span> 
          và các công nghệ tiên phong nhất
        </p>
        <p class="text-lg font-medium">
          🌈 Biến ý tưởng thành hiện thực, biến giấc mơ thành sản phẩm
        </p>
      </div>
    `,
  });

  const [isVisible, setIsVisible] = useState(false);
  const [currentWordIndex, setCurrentWordIndex] = useState(0);
  const [displayText, setDisplayText] = useState("");
  const [isTyping, setIsTyping] = useState(true);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [hoveredSocial, setHoveredSocial] = useState(null);
  const [showMatrix, setShowMatrix] = useState(false);
  
  const containerRef = useRef(null);
  const heroRef = useRef(null);
  const isInView = useInView(heroRef, { threshold: 0.1 });
  const controls = useAnimation();
  
  const { scrollYProgress } = useScroll();
  const yTransform = useTransform(scrollYProgress, [0, 1], [0, -100]);
  const opacityTransform = useTransform(scrollYProgress, [0, 0.3], [1, 0]);
  const scaleTransform = useTransform(scrollYProgress, [0, 0.5], [1, 0.8]);
  
  const springConfig = { stiffness: 100, damping: 30, restDelta: 0.001 };
  const x = useSpring(0, springConfig);
  const y = useSpring(0, springConfig);

  useEffect(() => {
    setIsVisible(true);
    controls.start("visible");

    // Advanced typewriter effect
    let currentIndex = 0;
    let currentText = "";
    let isDeleting = false;
    let timeout;

    const typeWriter = () => {
      const currentWord = heroData.subHeadings[currentWordIndex];
      
      if (isDeleting) {
        currentText = currentWord.substring(0, currentIndex - 1);
        currentIndex--;
      } else {
        currentText = currentWord.substring(0, currentIndex + 1);
        currentIndex++;
      }

      setDisplayText(currentText);

      let typeSpeed = isDeleting ? 50 : 100;

      if (!isDeleting && currentIndex === currentWord.length) {
        typeSpeed = 2000; // Pause at end
        isDeleting = true;
      } else if (isDeleting && currentIndex === 0) {
        isDeleting = false;
        setCurrentWordIndex((prev) => (prev + 1) % heroData.subHeadings.length);
        typeSpeed = 500;
      }

      timeout = setTimeout(typeWriter, typeSpeed);
    };

    typeWriter();

    // Mouse tracking for parallax effects
    const handleMouseMove = (e) => {
      const rect = window.innerWidth;
      const centerX = rect / 2;
      const centerY = window.innerHeight / 2;
      
      setMousePosition({
        x: (e.clientX - centerX) / centerX,
        y: (e.clientY - centerY) / centerY,
      });
      
      x.set((e.clientX - centerX) * 0.02);
      y.set((e.clientY - centerY) * 0.02);
    };

    // Matrix rain effect trigger
    const matrixInterval = setInterval(() => {
      setShowMatrix(true);
      setTimeout(() => setShowMatrix(false), 3000);
    }, 15000);

    // Advanced intersection observer for performance
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          controls.start("visible");
        }
      },
      { threshold: 0.1, rootMargin: "50px" }
    );

    if (heroRef.current) {
      observer.observe(heroRef.current);
    }

    window.addEventListener("mousemove", handleMouseMove);

    return () => {
      clearTimeout(timeout);
      clearInterval(matrixInterval);
      window.removeEventListener("mousemove", handleMouseMove);
      observer.disconnect();
    };
  }, [controls, currentWordIndex, heroData.subHeadings, x, y]);

  // Ultra-premium animation variants
  const containerVariants = {
    hidden: { 
      opacity: 0,
      scale: 0.8,
    },
    visible: {
      opacity: 1,
      scale: 1,
      transition: {
        delayChildren: 0.3,
        staggerChildren: 0.2,
        duration: 1.2,
        ease: [0.25, 0.46, 0.45, 0.94],
      },
    },
  };

  const heroTextVariants = {
    hidden: { 
      y: 100, 
      opacity: 0,
      rotateX: -90,
      scale: 0.5,
    },
    visible: {
      y: 0,
      opacity: 1,
      rotateX: 0,
      scale: 1,
      transition: {
        type: "spring",
        stiffness: 100,
        damping: 12,
        duration: 1.5,
      },
    },
  };

  const letterVariants = {
    hidden: { 
      opacity: 0, 
      y: 50,
      rotateY: -90,
      scale: 0,
    },
    visible: (i) => ({
      opacity: 1,
      y: 0,
      rotateY: 0,
      scale: 1,
      transition: {
        delay: i * 0.1,
        duration: 0.8,
        ease: [0.25, 0.46, 0.45, 0.94],
      },
    }),
  };

  const itemVariants = {
    hidden: { 
      y: 60, 
      opacity: 0,
      rotateX: -45,
      scale: 0.8,
    },
    visible: {
      y: 0,
      opacity: 1,
      rotateX: 0,
      scale: 1,
      transition: {
        type: "spring",
        stiffness: 150,
        damping: 20,
        duration: 1.2,
      },
    },
  };

  const floatingVariants = {
    float: {
      y: [-20, 20, -20],
      x: [-10, 10, -10],
      rotateZ: [-5, 5, -5],
      transition: {
        duration: 6,
        repeat: Infinity,
        ease: "easeInOut",
      },
    },
  };

  const glowVariants = {
    glow: {
      boxShadow: [
        "0 0 20px rgba(59, 130, 246, 0.5)",
        "0 0 60px rgba(59, 130, 246, 0.8)",
        "0 0 20px rgba(59, 130, 246, 0.5)",
      ],
      scale: [1, 1.05, 1],
      transition: {
        duration: 3,
        repeat: Infinity,
        ease: "easeInOut",
      },
    },
  };

  const magicSparkleVariants = {
    sparkle: {
      scale: [0, 1.2, 0],
      rotate: [0, 180, 360],
      opacity: [0, 1, 0],
      transition: {
        duration: 2,
        repeat: Infinity,
        ease: "easeInOut",
        staggerChildren: 0.1,
      },
    },
  };

  const socialLinks = [
    {
      icon: faGithub,
      url: "https://github.com/nhdinhdev03",
      label: "GitHub",
      color: "hover:text-white",
      gradient: "from-gray-800 via-gray-600 to-black",
      hoverGradient: "from-purple-500 via-pink-500 to-red-500",
      description: "Open Source Code",
      count: "150+ Repos",
    },
    {
      icon: faLinkedin,
      url: "https://linkedin.com/in/nhdinh",
      label: "LinkedIn",
      color: "hover:text-blue-300",
      gradient: "from-blue-800 via-blue-600 to-blue-900",
      hoverGradient: "from-cyan-400 via-blue-500 to-purple-600",
      description: "Professional Network",
      count: "5K+ Connections",
    },
    {
      icon: faFacebook,
      url: "https://facebook.com/nhdinh.dev",
      label: "Facebook",
      color: "hover:text-blue-400",
      gradient: "from-blue-600 via-blue-500 to-blue-800",
      hoverGradient: "from-pink-400 via-red-500 to-yellow-500",
      description: "Social Updates",
      count: "10K+ Followers",
    },
    {
      icon: faTwitter,
      url: "https://twitter.com/nhdinh_dev",
      label: "Twitter",
      color: "hover:text-sky-400",
      gradient: "from-sky-500 via-blue-500 to-purple-600",
      hoverGradient: "from-yellow-400 via-orange-500 to-red-500",
      description: "Tech Insights",
      count: "2K+ Tweets",
    },
    {
      icon: faInstagram,
      url: "https://instagram.com/nhdinh.dev",
      label: "Instagram",
      color: "hover:text-pink-400",
      gradient: "from-purple-600 via-pink-500 to-red-500",
      hoverGradient: "from-green-400 via-blue-500 to-purple-600",
      description: "Behind Scenes",
      count: "8K+ Posts",
    },
    {
      icon: faYoutube,
      url: "https://youtube.com/nhdinh",
      label: "YouTube",
      color: "hover:text-red-400",
      gradient: "from-red-600 via-red-500 to-red-800",
      hoverGradient: "from-blue-400 via-purple-500 to-pink-500",
      description: "Tech Tutorials",
      count: "25K+ Subs",
    },
    {
      icon: faEnvelope,
      url: "mailto:nhdinh.dev@gmail.com",
      label: "Email",
      color: "hover:text-green-400",
      gradient: "from-green-600 via-emerald-500 to-teal-600",
      hoverGradient: "from-orange-400 via-red-500 to-pink-500",
      description: "Direct Contact",
      count: "24/7 Available",
    },
  ];

  const techStack = [
    {
      name: "React",
      icon: faAtom,
      color: "#61DAFB",
      description: "Next-Gen UI Architecture",
      level: 98,
      experience: "7+ years",
      projects: "100+",
      gradient: "from-cyan-400 via-blue-500 to-purple-600",
      glowColor: "rgba(97, 218, 251, 0.8)",
    },
    {
      name: "Node.js",
      icon: faLaptopCode,
      color: "#68A063",
      description: "High-Performance Backend",
      level: 95,
      experience: "6+ years",
      projects: "80+",
      gradient: "from-green-400 via-emerald-500 to-teal-600",
      glowColor: "rgba(104, 160, 99, 0.8)",
    },
    {
      name: "React Native",
      icon: faMobile,
      color: "#FF6B6B",
      description: "Cross-Platform Innovation",
      level: 92,
      experience: "5+ years", 
      projects: "50+",
      gradient: "from-red-400 via-pink-500 to-rose-600",
      glowColor: "rgba(255, 107, 107, 0.8)",
    },
    {
      name: "AI/ML",
      icon: faBrain,
      color: "#9B59B6",
      description: "Intelligent Systems",
      level: 88,
      experience: "3+ years",
      projects: "25+",
      gradient: "from-purple-400 via-violet-500 to-indigo-600",
      glowColor: "rgba(155, 89, 182, 0.8)",
    },
    {
      name: "Cloud AWS",
      icon: faCloud,
      color: "#4ECDC4",
      description: "Infinite Scalability",
      level: 90,
      experience: "4+ years",
      projects: "60+",
      gradient: "from-cyan-400 via-sky-500 to-blue-600",
      glowColor: "rgba(78, 205, 196, 0.8)",
    },
    {
      name: "Database",
      icon: faDatabase,
      color: "#F39C12",
      description: "Data Architecture",
      level: 93,
      experience: "6+ years",
      projects: "70+",
      gradient: "from-yellow-400 via-orange-500 to-amber-600",
      glowColor: "rgba(243, 156, 18, 0.8)",
    },
    {
      name: "TypeScript",
      icon: faCode,
      color: "#3178C6",
      description: "Type-Safe Development",
      level: 96,
      experience: "5+ years",
      projects: "90+",
      gradient: "from-blue-400 via-indigo-500 to-purple-600",
      glowColor: "rgba(49, 120, 198, 0.8)",
    },
    {
      name: "Next.js",
      icon: faRocket,
      color: "#000000",
      description: "Full-Stack Framework",
      level: 94,
      experience: "4+ years",
      projects: "40+",
      gradient: "from-gray-600 via-gray-800 to-black",
      glowColor: "rgba(255, 255, 255, 0.8)",
    },
  ];

  const stats = [
    {
      number: "7+",
      label: "Năm kinh nghiệm",
      icon: faInfinity,
      color: "text-cyan-400",
      bgGradient: "from-cyan-500/20 via-blue-600/20 to-purple-700/20",
      description: "Không ngừng học hỏi",
      achievement: "Senior Level",
    },
    {
      number: "250+",
      label: "Dự án hoàn thành",
      icon: faRocket,
      color: "text-green-400",
      bgGradient: "from-green-500/20 via-emerald-600/20 to-teal-700/20",
      description: "Từ startup đến enterprise",
      achievement: "100% Success Rate",
    },
    {
      number: "150+",
      label: "Khách hàng hài lòng",
      icon: faHeart,
      color: "text-red-400",
      bgGradient: "from-red-500/20 via-pink-600/20 to-rose-700/20",
      description: "Mối quan hệ lâu dài",
      achievement: "99% Satisfaction",
    },
    {
      number: "50+",
      label: "Công nghệ thành thạo",
      icon: faMeteor,
      color: "text-yellow-400",
      bgGradient: "from-yellow-500/20 via-orange-600/20 to-amber-700/20",
      description: "Luôn cập nhật xu hướng",
      achievement: "Tech Expert",
    },
    {
      number: "1M+",
      label: "Dòng code viết",
      icon: faCode,
      color: "text-purple-400",
      bgGradient: "from-purple-500/20 via-violet-600/20 to-indigo-700/20",
      description: "Clean & Efficient",
      achievement: "Quality Focused",
    },
    {
      number: "24/7",
      label: "Sẵn sàng hỗ trợ",
      icon: faBolt,
      color: "text-blue-400",
      bgGradient: "from-blue-500/20 via-indigo-600/20 to-purple-700/20",
      description: "Cam kết chất lượng",
      achievement: "Always Available",
    },
  ];

  const scrollToSection = (sectionId) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  // Matrix Rain Effect Component
  const MatrixRain = () => {
    const matrixChars = "REACT NODE.JS AI/ML CLOUD 010110101 NHDINH 💻🚀⚡🌟".split("");
    
    return (
      <div className="fixed inset-0 pointer-events-none z-0">
        {Array.from({ length: 50 }).map((_, i) => (
          <motion.div
            key={i}
            className="absolute text-green-400 font-mono text-xs opacity-30"
            style={{
              left: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 5}s`,
            }}
            animate={{
              y: ["0vh", "100vh"],
              opacity: [0, 0.8, 0],
            }}
            transition={{
              duration: 3 + Math.random() * 2,
              repeat: Infinity,
              ease: "linear",
            }}
          >
            {matrixChars[Math.floor(Math.random() * matrixChars.length)]}
          </motion.div>
        ))}
      </div>
    );
  };

  // Holographic Card Component
  const HolographicCard = ({ children, className = "" }) => (
    <motion.div
      className={`relative group ${className}`}
      whileHover="hover"
      initial="initial"
    >
      <motion.div
        className="absolute inset-0 bg-gradient-to-r from-cyan-500/20 via-purple-500/20 to-pink-500/20 rounded-2xl blur-xl"
        variants={{
          initial: { scale: 0.8, opacity: 0 },
          hover: { scale: 1.2, opacity: 1 },
        }}
        transition={{ duration: 0.3 }}
      />
      <motion.div
        className="relative bg-black/40 backdrop-blur-xl rounded-2xl border border-white/10 overflow-hidden"
        variants={{
          initial: { rotateX: 0, rotateY: 0 },
          hover: { rotateX: 5, rotateY: 5 },
        }}
        transition={{ duration: 0.3 }}
      >
        {children}
        <motion.div
          className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/5 to-transparent"
          variants={{
            initial: { x: "-100%", y: "-100%" },
            hover: { x: "100%", y: "100%" },
          }}
          transition={{ duration: 0.6 }}
        />
      </motion.div>
    </motion.div>
  );

  return (
    <section
      id="home"
      ref={heroRef}
      className="relative min-h-screen flex items-center justify-center overflow-hidden bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900"
      style={{
        transform: `translateY(${yTransform}px)`,
        opacity: opacityTransform,
        scale: scaleTransform,
      }}
    >
      {/* Advanced 3D Particles Globe Effect */}
      {!isMobile && <HomeParticlesEffect />}

      {/* Dynamic Background Gradient */}
      <motion.div
        className="absolute inset-0 bg-gradient-to-br from-slate-900/80 via-purple-900/50 to-slate-900/80"
        animate={{
          background: [
            "linear-gradient(135deg, rgba(15, 23, 42, 0.8) 0%, rgba(88, 28, 135, 0.5) 50%, rgba(15, 23, 42, 0.8) 100%)",
            "linear-gradient(135deg, rgba(15, 23, 42, 0.8) 0%, rgba(59, 130, 246, 0.4) 50%, rgba(15, 23, 42, 0.8) 100%)",
            "linear-gradient(135deg, rgba(15, 23, 42, 0.8) 0%, rgba(16, 185, 129, 0.4) 50%, rgba(15, 23, 42, 0.8) 100%)",
          ],
        }}
        transition={{ duration: 15, repeat: Infinity, ease: "easeInOut" }}
      />

      {/* Floating Tech Icons - Hidden on mobile for performance */}
      {!isMobile && (
        <div className="absolute inset-0 pointer-events-none">
          {techStack.map((tech, index) => (
            <motion.div
              key={tech.name}
              className="absolute opacity-10"
              style={{
                left: `${20 + index * 15}%`,
                top: `${10 + index * 12}%`,
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
            className="max-w-5xl mx-auto text-center space-y-10"
            variants={containerVariants}
            initial="hidden"
            animate={controls}
          >
            {/* Pre Heading */}
            <motion.div variants={itemVariants} className="overflow-hidden">
              <motion.div
                className="inline-flex items-center space-x-2 bg-white/10 backdrop-blur-sm rounded-full px-4 py-2 lg:px-6 lg:py-3 border border-white/20"
                whileHover={{
                  scale: 1.05,
                  backgroundColor: "rgba(255, 255, 255, 0.15)",
                }}
              >
                <motion.div
                  className="w-2 h-2 lg:w-3 lg:h-3 bg-green-400 rounded-full"
                  animate={{ scale: [1, 1.2, 1], opacity: [1, 0.7, 1] }}
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

            {/* Main Heading */}
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

            {/* Tech Stack Pills */}
            <motion.div
              variants={itemVariants}
              className="flex flex-wrap justify-center gap-4 max-w-2xl mx-auto"
            >
              {techStack.slice(0, 6).map((tech, index) => (
                <motion.div
                  key={tech.name}
                  className="flex items-center space-x-2 bg-white/5 backdrop-blur-sm rounded-full px-4 py-2 border border-white/10"
                  whileHover={{
                    scale: 1.05,
                    backgroundColor: "rgba(255, 255, 255, 0.1)",
                    borderColor: tech.color + "40",
                  }}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.8 + index * 0.1 }}
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

            {/* CTA Buttons */}
            <motion.div
              variants={itemVariants}
              className="flex flex-col sm:flex-row justify-center gap-4 pt-4"
            >
              <motion.button
                className="group relative px-8 py-4 bg-gradient-to-r from-blue-600 via-purple-600 to-blue-600 rounded-xl font-semibold text-white overflow-hidden"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => scrollToSection("projects")}
              >
                <motion.div
                  className="absolute inset-0 bg-gradient-to-r from-purple-600 via-pink-600 to-blue-600"
                  initial={{ x: "-100%" }}
                  whileHover={{ x: "0%" }}
                  transition={{ duration: 0.3 }}
                />
                <span className="relative z-10 flex items-center space-x-2">
                  <FontAwesomeIcon icon={faEye} />
                  <span>Xem Dự Án</span>
                </span>
              </motion.button>

              <motion.button
                className="group px-8 py-4 bg-white/10 backdrop-blur-sm border border-white/20 rounded-xl font-semibold text-white hover:bg-white/20 transition-all duration-300"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => scrollToSection("contact")}
              >
                <span className="flex items-center space-x-2">
                  <FontAwesomeIcon icon={faEnvelope} />
                  <span>Liên Hệ</span>
                </span>
              </motion.button>
            </motion.div>

            {/* Social Links */}
            <motion.div variants={itemVariants} className="flex justify-center space-x-4">
              {socialLinks.map((social, index) => (
                <motion.a
                  key={social.label}
                  href={social.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`w-12 h-12 bg-white/10 backdrop-blur-sm rounded-xl flex items-center justify-center border border-white/20 ${social.color} transition-all duration-300`}
                  whileHover={{
                    scale: 1.1,
                    backgroundColor: "rgba(255, 255, 255, 0.2)",
                    y: -2,
                  }}
                  whileTap={{ scale: 0.9 }}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 1 + index * 0.1 }}
                >
                  <FontAwesomeIcon icon={social.icon} className="text-lg" />
                </motion.a>
              ))}
            </motion.div>
          </motion.div>
        </div>

        {/* Enhanced Scroll Indicator */}
        <motion.div
          className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 2 }}
        >
          <motion.button
            onClick={() => scrollToSection("about")}
            className="flex flex-col items-center space-y-3 text-slate-400 hover:text-white transition-colors duration-300 group"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <span className="text-xs font-medium tracking-widest uppercase opacity-80 group-hover:opacity-100">
              Cuộn xuống
            </span>
            <motion.div
              className="w-px h-8 bg-gradient-to-b from-slate-400 to-transparent"
              animate={{ scaleY: [1, 0.5, 1] }}
              transition={{ duration: 2, repeat: Infinity }}
            />
            <motion.div
              animate={{ y: [0, 8, 0], opacity: [1, 0.5, 1] }}
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
