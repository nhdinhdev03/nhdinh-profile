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
  FiStar
} from 'react-icons/fi';
import { useTheme } from '../../../contexts/ThemeContext';
import ParticleBackground from '../../../components/ParticleBackground';
import './HeroSection.scss';

// Advanced Typewriter Effect with multiple animations
const AdvancedTypewriter = ({ words, className }) => {
  const [currentWordIndex, setCurrentWordIndex] = useState(0);
  const [currentText, setCurrentText] = useState('');
  const [isDeleting, setIsDeleting] = useState(false);
  const [isWaiting, setIsWaiting] = useState(false);

  useEffect(() => {
    const currentWord = words[currentWordIndex];
    
    if (isWaiting) {
      const waitTimeout = setTimeout(() => setIsWaiting(false), 1500);
      return () => clearTimeout(waitTimeout);
    }

    const timeout = setTimeout(() => {
      if (!isDeleting) {
        if (currentText.length < currentWord.length) {
          setCurrentText(currentWord.slice(0, currentText.length + 1));
        } else {
          setIsWaiting(true);
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
  }, [currentText, isDeleting, currentWordIndex, words, isWaiting]);

  return (
    <span className={className}>
      {currentText}
      <motion.span
        animate={{ opacity: [1, 0] }}
        transition={{ duration: 0.8, repeat: Infinity, repeatType: "reverse" }}
        className="cursor"
      >
        |
      </motion.span>
    </span>
  );
};

// Floating Elements Component
const FloatingElements = () => {
  return (
    <div className="floating-elements">
      {[...Array(12)].map((_, i) => (
        <motion.div
          key={i}
          className={`floating-element floating-element-${i + 1}`}
          animate={{
            y: [-20, 20, -20],
            x: [-10, 10, -10],
            rotate: [0, 180, 360],
            scale: [1, 1.1, 1],
          }}
          transition={{
            duration: 4 + i * 0.5,
            repeat: Infinity,
            ease: "easeInOut",
            delay: i * 0.2,
          }}
        />
      ))}
    </div>
  );
};

// 3D Card Effect Component
const ProfileCard = () => {
  const [rotation, setRotation] = useState({ x: 0, y: 0 });
  const cardRef = useRef(null);

  const handleMouseMove = (e) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    const rotateX = (e.clientY - centerY) / 10;
    const rotateY = (centerX - e.clientX) / 10;
    
    setRotation({ x: rotateX, y: rotateY });
  };

  const handleMouseLeave = () => {
    setRotation({ x: 0, y: 0 });
  };

  return (
    <motion.div
      ref={cardRef}
      className="profile-card-3d"
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{
        transform: `perspective(1000px) rotateX(${rotation.x}deg) rotateY(${rotation.y}deg)`,
      }}
      whileHover={{ scale: 1.05 }}
      transition={{ type: "spring", stiffness: 300, damping: 30 }}
    >
      <div className="profile-card-inner">
        <div className="profile-image-container">
          <div className="profile-image-placeholder">
            <motion.div
              className="profile-glow"
              animate={{
                opacity: [0.5, 1, 0.5],
                scale: [1, 1.1, 1],
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                ease: "easeInOut",
              }}
            />
            <span>Ảnh cá nhân</span>
          </div>
          <div className="profile-decorations">
            <div className="decoration decoration-1" />
            <div className="decoration decoration-2" />
            <div className="decoration decoration-3" />
            <div className="decoration decoration-4" />
          </div>
        </div>
        
        <motion.div
          className="tech-stack-orbit"
          animate={{ rotate: 360 }}
          transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
        >
          <div className="tech-icon tech-react">React</div>
          <div className="tech-icon tech-node">Node</div>
          <div className="tech-icon tech-js">JS</div>
          <div className="tech-icon tech-ts">TS</div>
        </motion.div>
      </div>
    </motion.div>
  );
};

const HeroSection = () => {
  const { isDark } = useTheme();
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const controls = useAnimation();
  const { scrollY } = useScroll();
  const y = useTransform(scrollY, [0, 500], [0, 150]);
  const opacity = useTransform(scrollY, [0, 300], [1, 0]);

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

  useEffect(() => {
    controls.start("visible");
  }, [controls]);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        delayChildren: 0.2,
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { y: 50, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        type: "spring",
        stiffness: 100,
        damping: 15,
      },
    },
  };

  const socialLinks = [
    { icon: FiGithub, href: "#", label: "GitHub" },
    { icon: FiLinkedin, href: "#", label: "LinkedIn" },
    { icon: FiMail, href: "#", label: "Email" },
  ];

  return (
    <section className="hero-section-v2" style={{ y, opacity }}>
      {/* Particle Background */}
      <ParticleBackground isDark={isDark} />
      
      {/* Dynamic Background */}
      <div className="hero-background">
        <motion.div
          className="gradient-orb orb-1"
          animate={{
            x: [0, 100, 0],
            y: [0, -100, 0],
            scale: [1, 1.2, 1],
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
        <motion.div
          className="gradient-orb orb-2"
          animate={{
            x: [0, -100, 0],
            y: [0, 100, 0],
            scale: [1.2, 1, 1.2],
          }}
          transition={{
            duration: 10,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
        <motion.div
          className="gradient-orb orb-3"
          animate={{
            x: [0, 50, 0],
            y: [0, -50, 0],
            scale: [1, 1.1, 1],
          }}
          transition={{
            duration: 6,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
      </div>

      {/* Floating Elements */}
      <FloatingElements />

      <div className="container mx-auto px-4 relative z-10">
        <motion.div
          className="hero-content-v2"
          variants={containerVariants}
          initial="hidden"
          animate={controls}
        >
          {/* Left Content */}
          <div className="hero-text-content">
            {/* Status Badge */}
            <motion.div variants={itemVariants} className="status-badge">
              <span className="status-indicator" />
              <span>Sẵn sàng cho dự án mới</span>
              <FiStar className="status-icon" />
            </motion.div>

            {/* Greeting */}
            <motion.div variants={itemVariants} className="hero-greeting">
              <span className="greeting-emoji">👋</span>
              <span className="greeting-text">Xin chào, tôi là</span>
            </motion.div>

            {/* Main Title with Gradient */}
            <motion.h1 variants={itemVariants} className="hero-title-v2">
              <span className="name-wrapper">
                <span className="first-name">Nguyễn</span>
                <span className="last-name text-gradient">Hoài Dinh</span>
              </span>
            </motion.h1>

            {/* Animated Subtitle */}
            <motion.div variants={itemVariants} className="hero-subtitle-v2">
              <span className="role-prefix">Tôi là một </span>
              <AdvancedTypewriter
                words={[
                  'Full-Stack Developer',
                  'React Specialist',
                  'UI/UX Designer',
                  'Problem Solver',
                  'Tech Enthusiast'
                ]}
                className="typed-text-v2 text-gradient"
              />
            </motion.div>

            {/* Enhanced Description */}
            <motion.p variants={itemVariants} className="hero-description-v2">
              Đam mê tạo ra những trải nghiệm số đẹp mắt, hiệu quả và tập trung vào người dùng. 
              Tôi chuyên về các công nghệ web hiện đại và thích biến ý tưởng thành hiện thực thông qua code.
            </motion.p>

            {/* Enhanced Action Buttons */}
            <motion.div variants={itemVariants} className="hero-actions-v2">
              <Link to="/contact" className="btn btn-primary hero-btn-primary">
                <FiSend className="btn-icon" />
                <span>Liên hệ ngay</span>
              </Link>
              
              <button className="btn btn-secondary hero-btn-secondary">
                <FiDownload className="btn-icon" />
                <span>Tải CV</span>
              </button>
              
              <button className="btn btn-ghost hero-btn-play">
                <FiPlay className="btn-icon" />
                <span>Xem Demo</span>
              </button>
            </motion.div>

            {/* Social Links */}
            <motion.div variants={itemVariants} className="hero-social">
              <span className="social-label">Kết nối với tôi:</span>
              <div className="social-links">
                {socialLinks.map((social, index) => (
                  <motion.a
                    key={index}
                    href={social.href}
                    className="social-link"
                    whileHover={{ scale: 1.1, y: -2 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <social.icon size={20} />
                    <span>{social.label}</span>
                  </motion.a>
                ))}
              </div>
            </motion.div>
          </div>

          {/* Right Content - 3D Profile Card */}
          <motion.div
            variants={itemVariants}
            className="hero-visual-content"
          >
            <ProfileCard />
            
            {/* Stats Cards */}
            <div className="stats-floating">
              <motion.div
                className="stat-card"
                whileHover={{ scale: 1.05, y: -5 }}
              >
                <div className="stat-number">3+</div>
                <div className="stat-label">Năm kinh nghiệm</div>
              </motion.div>
              
              <motion.div
                className="stat-card"
                whileHover={{ scale: 1.05, y: -5 }}
              >
                <div className="stat-number">50+</div>
                <div className="stat-label">Dự án hoàn thành</div>
              </motion.div>
              
              <motion.div
                className="stat-card"
                whileHover={{ scale: 1.05, y: -5 }}
              >
                <div className="stat-number">100%</div>
                <div className="stat-label">Khách hàng hài lòng</div>
              </motion.div>
            </div>
          </motion.div>
        </motion.div>

        {/* Enhanced Scroll Indicator */}
        <motion.div
          className="scroll-indicator-v2"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 2 }}
        >
          <motion.div
            className="scroll-arrow"
            animate={{ y: [0, 10, 0] }}
            transition={{ duration: 2, repeat: Infinity }}
          >
            <FiArrowDown size={24} />
          </motion.div>
          <span className="scroll-text">Khám phá thêm</span>
          <div className="scroll-line" />
        </motion.div>
      </div>
    </section>
  );
};

export default HeroSection;
