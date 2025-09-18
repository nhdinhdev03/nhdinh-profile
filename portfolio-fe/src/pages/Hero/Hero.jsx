import {
  AnimatePresence,
  motion,
  useAnimation,
  useMotionValue,
  useScroll,
  useSpring,
  useTransform,
} from "framer-motion";
import {
  memo,
  Suspense,
  useCallback,
  useEffect,
  useRef,
  useState
} from "react";
import { useTranslation } from "react-i18next";
import { FaJsSquare, FaNodeJs, FaPython, FaReact } from "react-icons/fa";
import {
  FiDownload,
  FiFacebook,
  FiGithub,
  FiMail,
  FiMapPin,
  FiStar,
  FiZap
} from "react-icons/fi";
import { SiTailwindcss, SiTypescript } from "react-icons/si";
import { Link } from "react-router-dom";
import { ROUTES } from "router/routeConstants";
import CommunityTestimonials from "./CommunityTestimonials";
import { Experience } from "./Experience";
import "./Hero.scss";

// Lazy load heavy components để tối ưu performance


const Hero = memo(() => {
  const { t } = useTranslation();
  const [displayText, setDisplayText] = useState("");
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);
  const [particles, setParticles] = useState([]);
  const [morphingShapes, setMorphingShapes] = useState([]);
  const [floatingElements, setFloatingElements] = useState([]);
  const [isHovered, setIsHovered] = useState(false);
  const [isTouch, setIsTouch] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  // Detect mobile device and optimize accordingly
  useEffect(() => {
    const checkMobile = () => {
      const width = window.innerWidth;
      const isMobileDevice = width <= 768;
      setIsMobile(isMobileDevice);
    };

    checkMobile();
    window.addEventListener("resize", checkMobile);

    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  // Enhanced mobile detection for better performance
  useEffect(() => {
    const isLowEndDevice =
      navigator.hardwareConcurrency <= 4 ||
      /Android|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
        navigator.userAgent
      ) ||
      window.innerWidth <= 480;

    if (isLowEndDevice) {
      // Disable complex animations on low-end devices
      setParticles([]);
      setMorphingShapes([]);
      setFloatingElements([]);
    }
  }, []);

  // Gentle mouse tracking for subtle 3D effects
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const rotateX = useSpring(useTransform(mouseY, [-300, 300], [8, -8]), {
    stiffness: 150,
    damping: 40,
  });
  const rotateY = useSpring(useTransform(mouseX, [-300, 300], [-8, 8]), {
    stiffness: 150,
    damping: 40,
  });

  // Subtle 3D transforms
  const translateX = useSpring(useTransform(mouseX, [-300, 300], [-3, 3]), {
    stiffness: 100,
    damping: 30,
  });
  const translateY = useSpring(useTransform(mouseY, [-300, 300], [-3, 3]), {
    stiffness: 100,
    damping: 30,
  });

  // Scroll-based animations
  const { scrollYProgress } = useScroll();
  const parallaxY = useTransform(scrollYProgress, [0, 1], [0, -100]);
  const parallaxRotate = useTransform(scrollYProgress, [0, 1], [0, 360]);

  const heroRef = useRef(null);
  const controls = useAnimation();

  const roles = [
    "Full Stack Developer",
    "Frontend Specialist",
    "React Expert",
    "UI/UX Enthusiast",
    "Problem Solver",
  ];

  const techIcons = [
    { icon: FaReact, color: "#61DAFB", delay: 0 },
    { icon: FaJsSquare, color: "#F7DF1E", delay: 0.2 },
    { icon: SiTypescript, color: "#3178C6", delay: 0.4 },
    { icon: FaNodeJs, color: "#339933", delay: 0.6 },
    { icon: SiTailwindcss, color: "#06B6D4", delay: 0.8 },
    { icon: FaPython, color: "#3776AB", delay: 1.0 },
  ];

  useEffect(() => {
    const currentRole = roles[currentIndex];
    const typingSpeed = isDeleting ? 50 : 100;
    const pauseTime = isDeleting ? 500 : 2000;

    let animationId;
    let startTime;

    const animate = (timestamp) => {
      if (!startTime) startTime = timestamp;
      const elapsed = timestamp - startTime;

      if (elapsed >= typingSpeed) {
        if (!isDeleting && displayText === currentRole) {
          // Pause before deleting
          let pauseStart;
          const pauseAnimate = (pauseTimestamp) => {
            if (!pauseStart) pauseStart = pauseTimestamp;
            const pauseElapsed = pauseTimestamp - pauseStart;

            if (pauseElapsed >= pauseTime) {
              setIsDeleting(true);
            } else {
              requestAnimationFrame(pauseAnimate);
            }
          };
          requestAnimationFrame(pauseAnimate);
        } else if (isDeleting && displayText === "") {
          setIsDeleting(false);
          setCurrentIndex((prev) => (prev + 1) % roles.length);
        } else {
          const nextText = isDeleting
            ? currentRole.substring(0, displayText.length - 1)
            : currentRole.substring(0, displayText.length + 1);
          setDisplayText(nextText);
        }
      } else {
        animationId = requestAnimationFrame(animate);
      }
    };

    animationId = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(animationId);
  }, [displayText, currentIndex, isDeleting, roles]);

  // Initialize gentle particle systems
  useEffect(() => {
    // Detect if device is mobile/touch for performance optimization
    const isMobile = window.innerWidth <= 768;
    const isLowPerformance =
      navigator.hardwareConcurrency <= 4 ||
      /Android|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
        navigator.userAgent
      );

    // Significantly reduce particle count for better performance
    const particleCount = isMobile || isLowPerformance ? 6 : 15; // Reduced from 12:30 to 6:15
    const newParticles = [];

    for (let i = 0; i < particleCount; i++) {
      newParticles.push({
        id: i,
        x: Math.random() * 100,
        y: Math.random() * 100,
        size: Math.random() * (isMobile ? 2 : 3) + 1, // Reduced size
        speed: Math.random() * (isMobile ? 1 : 1.5) + 0.5, // Reduced speed
        opacity: Math.random() * 0.3 + 0.1, // Reduced opacity
        direction: Math.random() * 360,
        color: ["#6366f1", "#8b5cf6", "#ec4899"][Math.floor(Math.random() * 3)],
        rotationSpeed: Math.random() * 0.5 + 0.2, // Reduced rotation speed
      });
    }

    setParticles(newParticles);

    // Initialize gentle morphing shapes - significantly reduced
    const shapeCount = isMobile || isLowPerformance ? 1 : 2; // Reduced from 2:4 to 1:2
    const newShapes = [];

    for (let i = 0; i < shapeCount; i++) {
      newShapes.push({
        id: i,
        x: Math.random() * 100,
        y: Math.random() * 100,
        size: Math.random() * (isMobile ? 40 : 60) + 30, // Reduced size
        rotation: Math.random() * 360,
        morphSpeed: Math.random() * 1 + 0.5, // Reduced morph speed
        color: ["#6366f1", "#8b5cf6"][Math.floor(Math.random() * 2)],
      });
    }

    setMorphingShapes(newShapes);

    // Initialize gentle floating elements - significantly reduced
    const floatingCount = isMobile || isLowPerformance ? 2 : 3; // Reduced from 3:6 to 2:3
    const newFloatingElements = [];

    for (let i = 0; i < floatingCount; i++) {
      newFloatingElements.push({
        id: i,
        x: Math.random() * 100,
        y: Math.random() * 100,
        icon: [FiStar, FiZap][Math.floor(Math.random() * 2)],
        size: Math.random() * (isMobile ? 10 : 12) + 10, // Reduced size
        floatSpeed: Math.random() * 1.5 + 1, // Reduced float speed
        rotateSpeed: Math.random() * 0.5 + 0.2, // Reduced rotate speed
      });
    }

    setFloatingElements(newFloatingElements);
  }, []);

  // Enhanced mouse move handler for advanced 3D effects
  const handleMouseMove = useCallback(
    (event) => {
      if (isTouch) return;
      if (heroRef.current) {
        const rect = heroRef.current.getBoundingClientRect();
        const centerX = rect.left + rect.width / 2;
        const centerY = rect.top + rect.height / 2;

        const x = event.clientX - centerX;
        const y = event.clientY - centerY;

        mouseX.set(x);
        mouseY.set(y);

        // Trigger hover animations
        if (!isHovered) {
          setIsHovered(true);
          controls.start({
            scale: 1.02,
            transition: { duration: 0.3, ease: "easeOut" },
          });
        }
      }
    },
    [mouseX, mouseY, isHovered, controls, isTouch]
  );

  const handleMouseLeave = useCallback(() => {
    mouseX.set(0);
    mouseY.set(0);
    setIsHovered(false);
    controls.start({
      scale: 1,
      transition: { duration: 0.5, ease: "easeOut" },
    });
  }, [mouseX, mouseY, controls]);

  // Detect touch-capable devices and flag to disable hover/tap and mouse tracking
  useEffect(() => {
    if (typeof window === "undefined") return;
    const hasTouch =
      "ontouchstart" in window ||
      (navigator &&
        (navigator.maxTouchPoints > 0 || navigator.msMaxTouchPoints > 0));
    const mq = window.matchMedia
      ? window.matchMedia("(hover: none), (pointer: coarse)")
      : undefined;
    const setFromMQ = (val) => setIsTouch(!!val);
    setFromMQ(hasTouch || mq?.matches);
    if (mq?.addEventListener) {
      const handler = (e) => setFromMQ(e.matches);
      mq.addEventListener("change", handler);
      return () => mq.removeEventListener("change", handler);
    }
  }, []);

  useEffect(() => {
    if (isTouch) return; // skip mouse listeners on touch devices
    const heroElement = heroRef.current;
    if (heroElement) {
      heroElement.addEventListener("mousemove", handleMouseMove);
      heroElement.addEventListener("mouseleave", handleMouseLeave);

      return () => {
        heroElement.removeEventListener("mousemove", handleMouseMove);
        heroElement.removeEventListener("mouseleave", handleMouseLeave);
      };
    }
  }, [handleMouseMove, handleMouseLeave, isTouch]);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.3,
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
        damping: 12,
      },
    },
  };

  return (
    <>
      <motion.section
        id="home"
        className="hero"
        ref={heroRef}
        animate={controls}
        style={{
          perspective: 1000,
          transformStyle: "preserve-3d",
        }}
      >
        {/* Advanced Particle System - Optimized for mobile */}
        <div className="hero__particles">
          <AnimatePresence>
            {particles.map((particle) => (
              <motion.div
                key={particle.id}
                className="hero__particle"
                initial={{
                  x: `${particle.x}vw`,
                  y: `${particle.y}vh`,
                  opacity: 0,
                  scale: 0,
                  rotate: 0,
                }}
                animate={
                  isMobile
                    ? {
                        // Simplified animation for mobile
                        x: [
                          `${particle.x}vw`,
                          `${(particle.x + 4) % 100}vw`,
                          `${particle.x}vw`,
                        ],
                        y: [
                          `${particle.y}vh`,
                          `${(particle.y + 3) % 100}vh`,
                          `${particle.y}vh`,
                        ],
                        opacity: [0, particle.opacity * 0.8, 0],
                        scale: [0, 1, 0],
                      }
                    : {
                        // Full animation for desktop
                        x: [
                          `${particle.x}vw`,
                          `${(particle.x + 8) % 100}vw`,
                          `${particle.x}vw`,
                        ],
                        y: [
                          `${particle.y}vh`,
                          `${(particle.y + 5) % 100}vh`,
                          `${particle.y}vh`,
                        ],
                        opacity: [
                          0,
                          particle.opacity,
                          particle.opacity * 0.7,
                          0,
                        ],
                        scale: [0, 1, 1.1, 0],
                        rotate: [0, 180, 360],
                      }
                }
                transition={{
                  duration: isMobile ? particle.speed * 10 : particle.speed * 8,
                  repeat: Infinity,
                  ease: "easeInOut",
                  times: isMobile ? [0, 0.5, 1] : [0, 0.4, 0.8, 1],
                }}
                style={{
                  width: particle.size,
                  height: particle.size,
                  background: `linear-gradient(45deg, ${particle.color}, ${particle.color}80)`,
                  borderRadius: "50%",
                  position: "absolute",
                  pointerEvents: "none",
                  boxShadow: `0 0 ${particle.size * 2}px ${particle.color}40`,
                  zIndex: 1,
                }}
              />
            ))}
          </AnimatePresence>
        </div>

        {/* Morphing Background Shapes - Optimized for mobile */}
        <div className="hero__morphing-shapes">
          {morphingShapes.map((shape) => (
            <motion.div
              key={shape.id}
              className="hero__morphing-shape"
              initial={{
                x: `${shape.x}%`,
                y: `${shape.y}%`,
                rotate: shape.rotation,
                scale: 0,
              }}
              animate={
                isMobile
                  ? {
                      // Simplified animation for mobile
                      x: [
                        `${shape.x}%`,
                        `${(shape.x + 5) % 100}%`,
                        `${shape.x}%`,
                      ],
                      y: [
                        `${shape.y}%`,
                        `${(shape.y + 4) % 100}%`,
                        `${shape.y}%`,
                      ],
                      rotate: [shape.rotation, shape.rotation + 180],
                      scale: [0.8, 1],
                    }
                  : {
                      // Full animation for desktop
                      x: [
                        `${shape.x}%`,
                        `${(shape.x + 10) % 100}%`,
                        `${shape.x}%`,
                      ],
                      y: [
                        `${shape.y}%`,
                        `${(shape.y + 8) % 100}%`,
                        `${shape.y}%`,
                      ],
                      rotate: [
                        shape.rotation,
                        shape.rotation + 90,
                        shape.rotation + 180,
                      ],
                      scale: [0.7, 1, 0.9, 1],
                      borderRadius: ["30%", "50%", "40%", "30%"],
                    }
              }
              transition={{
                duration: isMobile
                  ? shape.morphSpeed * 8
                  : shape.morphSpeed * 6,
                repeat: Infinity,
                ease: "easeInOut",
              }}
              style={{
                width: shape.size,
                height: shape.size,
                background: `linear-gradient(45deg, ${shape.color}${
                  isMobile ? "15" : "20"
                }, ${shape.color}${isMobile ? "05" : "10"})`,
                position: "absolute",
                pointerEvents: "none",
                filter: isMobile ? "blur(0.5px)" : "blur(1px)",
                zIndex: 0,
                opacity: isMobile ? 0.7 : 1,
              }}
            />
          ))}
        </div>

        {/* Floating Interactive Elements */}
        <div className="hero__floating-elements">
          {floatingElements.map((element) => {
            const IconComponent = element.icon;
            return (
              <motion.div
                key={element.id}
                className="hero__floating-element"
                initial={{
                  x: `${element.x}%`,
                  y: `${element.y}%`,
                  opacity: 0,
                }}
                animate={{
                  x: [
                    `${element.x}%`,
                    `${(element.x + 10) % 100}%`,
                    `${element.x}%`,
                  ],
                  y: [
                    `${element.y}%`,
                    `${(element.y - 5) % 100}%`,
                    `${element.y}%`,
                  ],
                  opacity: [0.3, 0.7, 0.3],
                  rotate: [0, 360],
                  scale: [0.8, 1.2, 0.8],
                }}
                transition={{
                  duration: element.floatSpeed * 3,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
                whileHover={
                  isTouch
                    ? undefined
                    : {
                        scale: 1.5,
                        rotate: 180,
                        transition: { duration: 0.3 },
                      }
                }
                style={{
                  position: "absolute",
                  fontSize: element.size,
                  color: "var(--primary-light)",
                  pointerEvents: "auto",
                  cursor: "pointer",
                  zIndex: 2,
                }}
              >
                <IconComponent />
              </motion.div>
            );
          })}
        </div>

        <div className="container">
          <div className="hero__grid">
            <motion.div
              className="hero__content"
              variants={containerVariants}
              initial="hidden"
              animate="visible"
            >
              <motion.div className="hero__greeting" variants={itemVariants}>
                <span className="hero__greeting-text">
                  {t("hero.greeting")}
                </span>
              </motion.div>

              <motion.h1 className="hero__name" variants={itemVariants}>
                <span className="hero__name-text">Nhdinh</span>
                <span className="hero__name-highlight">Developer</span>
              </motion.h1>

              <motion.div className="hero__role" variants={itemVariants}>
                <span className="hero__role-label">
                  {t("hero.role_label")}{" "}
                </span>
                <span className="hero__role-dynamic">
                  {displayText}
                  <span className="hero__cursor">|</span>
                </span>
              </motion.div>

              <motion.p className="hero__description" variants={itemVariants}>
                Chuyên gia phát triển web với hơn 2 năm kinh nghiệm, tạo ra
                những ứng dụng web hiện đại, responsive và user-friendly. Đam mê
                công nghệ mới và luôn sẵn sàng đối mặt với thử thách.
              </motion.p>

              <motion.div className="hero__location" variants={itemVariants}>
                <FiMapPin className="hero__location-icon" />
                <span>Hậu Giang, Việt Nam</span>
              </motion.div>

              <motion.div className="hero__actions" variants={itemVariants}>
                <Link to={ROUTES.CONTACT} style={{ textDecoration: "none" }}>
                  <motion.button
                    className="btn btn-primary"
                    whileHover={isTouch ? undefined : { scale: 1.05 }}
                    whileTap={isTouch ? undefined : { scale: 0.95 }}
                  >
                    <FiMail />
                    {t("hero.contact_button")}
                  </motion.button>
                </Link>

                <motion.a
                  href="/resume.pdf"
                  className="btn btn-outline"
                  whileHover={isTouch ? undefined : { scale: 1.05 }}
                  whileTap={isTouch ? { scale: 0.97 } : { scale: 0.95 }}
                  download
                  aria-label={`${t("hero.download_cv_button")} - PDF file`}
                  role="button"
                  tabIndex={0}
                  onFocus={(e) => {
                    if (!isTouch) {
                      e.target.style.boxShadow =
                        "0 0 0 3px rgba(99, 102, 241, 0.3)";
                    }
                  }}
                  onBlur={(e) => {
                    e.target.style.boxShadow = "none";
                  }}
                >
                  <FiDownload aria-hidden="true" />
                  {t("hero.download_cv_button")}
                </motion.a>
              </motion.div>

              <motion.div className="hero__social" variants={itemVariants}>
                <motion.a
                  href="https://github.com/nhdinhdev03"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hero__social-link"
                  whileHover={isTouch ? undefined : { scale: 1.2, rotate: 5 }}
                  whileTap={isTouch ? undefined : { scale: 0.9 }}
                >
                  <FiGithub />
                </motion.a>
                <motion.a
                  href="https://www.facebook.com/nhdinh.dev03"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hero__social-link"
                  whileHover={isTouch ? undefined : { scale: 1.2, rotate: -5 }}
                  whileTap={isTouch ? undefined : { scale: 0.9 }}
                >
                  <FiFacebook />
                </motion.a>
                <motion.a
                  href="nhdinh.dev03@gmail.com"
                  className="hero__social-link"
                  whileHover={isTouch ? undefined : { scale: 1.2, rotate: 5 }}
                  whileTap={isTouch ? undefined : { scale: 0.9 }}
                >
                  <FiMail />
                </motion.a>
              </motion.div>
            </motion.div>

            <motion.div
              className="hero__visual"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.5, duration: 0.8 }}
              style={{
                rotateX: isMobile ? 0 : rotateX,
                rotateY: isMobile ? 0 : rotateY,
                translateX: isMobile ? 0 : translateX,
                translateY: isMobile ? 0 : translateY,
                transformStyle: isMobile ? "flat" : "preserve-3d",
              }}
            >
              <motion.div
                className="hero__avatar"
                whileHover={
                  isTouch
                    ? undefined
                    : {
                        rotateY: 180,
                        transition: { duration: 1.2, ease: "easeInOut" },
                      }
                }
                style={{
                  transformStyle: "preserve-3d",
                }}
              >
                <motion.div
                  className="hero__avatar-image"
                  style={{
                    transform: `translateZ(30px)`,
                  }}
                  whileHover={
                    isTouch
                      ? undefined
                      : {
                          scale: 1.05,
                          boxShadow: "0 15px 30px rgba(99, 102, 241, 0.2)",
                        }
                  }
                >
                  {/* Cosmic universe avatar */}
                  <svg
                    className="hero__avatar-holo"
                    viewBox="0 0 300 300"
                    width="100%"
                    height="100%"
                    aria-labelledby="avatarTitle"
                    style={{ display: "block" }}
                  >
                    <title id="avatarTitle">
                      Professional Developer cosmic universe avatar
                    </title>
                    <defs>
                      {/* Circular viewport mask */}
                      <clipPath id="roundMask">
                        <circle cx="150" cy="150" r="120" />
                      </clipPath>

                      {/* Deep space gradient */}
                      <radialGradient id="spaceGrad" cx="50%" cy="50%" r="70%">
                        <stop offset="0%" stopColor="#0b1020" />
                        <stop offset="55%" stopColor="#1b1f3a" />
                        <stop offset="100%" stopColor="#0b1020" />
                      </radialGradient>

                      {/* Nebula gradients */}
                      <radialGradient id="nebulaA" cx="30%" cy="40%" r="50%">
                        <stop
                          offset="0%"
                          stopColor="#8b5cf6"
                          stopOpacity="0.85"
                        />
                        <stop
                          offset="60%"
                          stopColor="#06b6d4"
                          stopOpacity="0.35"
                        />
                        <stop
                          offset="100%"
                          stopColor="#000000"
                          stopOpacity="0"
                        />
                      </radialGradient>
                      <radialGradient id="nebulaB" cx="70%" cy="65%" r="55%">
                        <stop
                          offset="0%"
                          stopColor="#22d3ee"
                          stopOpacity="0.7"
                        />
                        <stop
                          offset="60%"
                          stopColor="#a78bfa"
                          stopOpacity="0.3"
                        />
                        <stop
                          offset="100%"
                          stopColor="#000000"
                          stopOpacity="0"
                        />
                      </radialGradient>

                      {/* Soft glow blur */}
                      <filter
                        id="softGlow"
                        x="-50%"
                        y="-50%"
                        width="200%"
                        height="200%"
                      >
                        <feGaussianBlur stdDeviation="6" />
                      </filter>

                      {/* Strong glow for the sun */}
                      <filter
                        id="sunGlow"
                        x="-80%"
                        y="-80%"
                        width="260%"
                        height="260%"
                      >
                        <feGaussianBlur stdDeviation="12" result="blur1" />
                        <feGaussianBlur
                          in="SourceGraphic"
                          stdDeviation="6"
                          result="blur2"
                        />
                        <feMerge>
                          <feMergeNode in="blur1" />
                          <feMergeNode in="blur2" />
                          <feMergeNode in="SourceGraphic" />
                        </feMerge>
                      </filter>

                      {/* Sun gradient */}
                      <radialGradient id="sunGrad" cx="50%" cy="50%" r="60%">
                        <stop offset="0%" stopColor="#fff7b0" />
                        <stop offset="45%" stopColor="#ffd166" />
                        <stop offset="80%" stopColor="#ff6a3d" />
                        <stop offset="100%" stopColor="#ff3d2e" />
                      </radialGradient>

                      {/* Rotating spectral ring */}
                      <linearGradient
                        id="ringSpectral"
                        x1="0%"
                        y1="0%"
                        x2="100%"
                        y2="100%"
                      >
                        <stop offset="0%" stopColor="#22d3ee" />
                        <stop offset="50%" stopColor="#a78bfa" />
                        <stop offset="100%" stopColor="#6366f1" />
                      </linearGradient>
                    </defs>

                    {/* Outer spectral ring */}
                    <circle
                      cx="150"
                      cy="150"
                      r="140"
                      fill="none"
                      stroke="url(#ringSpectral)"
                      strokeWidth="3"
                      opacity="0.85"
                    >
                      <animate
                        attributeName="opacity"
                        values="0.7;1;0.7"
                        dur="7s"
                        repeatCount="indefinite"
                      />
                      <animateTransform
                        attributeName="transform"
                        type="rotate"
                        from="0 150 150"
                        to="360 150 150"
                        dur="28s"
                        repeatCount="indefinite"
                      />
                    </circle>

                    {/* Space backdrop within circle */}
                    <g clipPath="url(#roundMask)">
                      <rect
                        x="30"
                        y="30"
                        width="240"
                        height="240"
                        rx="120"
                        fill="url(#spaceGrad)"
                      />

                      {/* Nebula layers */}
                      <g opacity="0.9">
                        <circle
                          cx="120"
                          cy="120"
                          r="110"
                          fill="url(#nebulaA)"
                          filter="url(#softGlow)"
                        >
                          <animate
                            attributeName="cx"
                            values="115;125;115"
                            dur="18s"
                            repeatCount="indefinite"
                          />
                          <animate
                            attributeName="cy"
                            values="115;125;115"
                            dur="22s"
                            repeatCount="indefinite"
                          />
                        </circle>
                        <circle
                          cx="190"
                          cy="175"
                          r="120"
                          fill="url(#nebulaB)"
                          filter="url(#softGlow)"
                        >
                          <animate
                            attributeName="cx"
                            values="185;195;185"
                            dur="20s"
                            repeatCount="indefinite"
                          />
                          <animate
                            attributeName="cy"
                            values="170;180;170"
                            dur="17s"
                            repeatCount="indefinite"
                          />
                        </circle>
                      </g>

                      {/* Starfield (lightweight twinkling stars) */}
                      <g>
                        {Array.from({ length: 28 }).map((_, i) => {
                          // Pseudo-random but deterministic positions via inline data
                          const px = [
                            40, 60, 85, 110, 140, 170, 200, 225, 250, 75, 95,
                            130, 160, 190, 210, 235, 60, 90, 120, 150, 180, 210,
                            240, 70, 100, 200, 230, 145,
                          ][i];
                          const py = [
                            60, 45, 70, 50, 65, 55, 80, 60, 50, 100, 130, 120,
                            110, 140, 160, 150, 190, 175, 200, 220, 200, 180,
                            170, 230, 245, 230, 215, 90,
                          ][i];
                          const r = [
                            1.2, 1.5, 1.1, 1.4, 1.8, 1.2, 1.3, 1.6, 1.1, 1.2,
                            1.3, 1.1, 1.7, 1.4, 1.2, 1.8, 1.1, 1.5, 1.2, 1.4,
                            1.6, 1.2, 1.4, 1.1, 1.5, 1.3, 1.2, 1.4,
                          ][i];
                          const d = 3 + (i % 8);
                          return (
                            <circle
                              key={i}
                              cx={px}
                              cy={py}
                              r={r}
                              fill="#ffffff"
                              opacity="0.8"
                            >
                              <animate
                                attributeName="opacity"
                                values="0.2;1;0.2"
                                dur={`${d}s`}
                                begin={`${i * 0.2}s`}
                                repeatCount="indefinite"
                              />
                              <animate
                                attributeName="r"
                                values={`${r};${r * 1.6};${r}`}
                                dur={`${d + 1}s`}
                                begin={`${i * 0.15}s`}
                                repeatCount="indefinite"
                              />
                            </circle>
                          );
                        })}
                      </g>

                      {/* Central Sun */}
                      <g transform="translate(150 150)">
                        <circle
                          r="42"
                          fill="url(#sunGrad)"
                          filter="url(#sunGlow)"
                        >
                          <animate
                            attributeName="r"
                            values="40;46;40"
                            dur="12s"
                            repeatCount="indefinite"
                          />
                        </circle>
                        <circle
                          r="70"
                          fill="none"
                          stroke="#fffbdb"
                          strokeOpacity="0.35"
                        >
                          <animate
                            attributeName="stroke-opacity"
                            values="0.25;0.6;0.25"
                            dur="8s"
                            repeatCount="indefinite"
                          />
                        </circle>
                      </g>

                      {/* Tilted elliptical orbit system with planets */}
                      <g transform="translate(150 150) rotate(-20)">
                        {/* Orbit lines */}
                        <ellipse
                          cx="0"
                          cy="0"
                          rx="65"
                          ry="40"
                          fill="none"
                          stroke="#ffffff"
                          strokeOpacity="0.35"
                          strokeWidth="0.6"
                        />
                        <ellipse
                          cx="0"
                          cy="0"
                          rx="85"
                          ry="52"
                          fill="none"
                          stroke="#ffffff"
                          strokeOpacity="0.3"
                          strokeWidth="0.7"
                        />
                        <ellipse
                          cx="0"
                          cy="0"
                          rx="105"
                          ry="64"
                          fill="none"
                          stroke="#ffffff"
                          strokeOpacity="0.25"
                          strokeWidth="0.8"
                        />
                        <ellipse
                          cx="0"
                          cy="0"
                          rx="120"
                          ry="72"
                          fill="none"
                          stroke="#ffffff"
                          strokeOpacity="0.2"
                          strokeWidth="0.9"
                        />

                        {/* Planet on orbit 1 */}
                        <g>
                          <circle r="4" fill="#cbd5e1">
                            <animateMotion
                              dur="10s"
                              repeatCount="indefinite"
                              rotate="auto"
                              path="M -65 0 A 65 40 0 1 0 65 0 A 65 40 0 1 0 -65 0"
                            />
                          </circle>
                          <circle
                            r="8"
                            fill="#cbd5e1"
                            opacity="0.35"
                            filter="url(#softGlow)"
                          >
                            <animateMotion
                              dur="10s"
                              repeatCount="indefinite"
                              rotate="auto"
                              path="M -65 0 A 65 40 0 1 0 65 0 A 65 40 0 1 0 -65 0"
                            />
                          </circle>
                        </g>

                        {/* Planet on orbit 2 (Earth-like) */}
                        <g>
                          <circle r="6" fill="#1e90ff">
                            <animateMotion
                              dur="15s"
                              repeatCount="indefinite"
                              rotate="auto"
                              path="M -85 0 A 85 52 0 1 0 85 0 A 85 52 0 1 0 -85 0"
                            />
                          </circle>
                          <circle
                            r="12"
                            fill="#1e90ff"
                            opacity="0.3"
                            filter="url(#softGlow)"
                          >
                            <animateMotion
                              dur="15s"
                              repeatCount="indefinite"
                              rotate="auto"
                              path="M -85 0 A 85 52 0 1 0 85 0 A 85 52 0 1 0 -85 0"
                            />
                          </circle>
                        </g>

                        {/* Planet on orbit 3 (Jupiter-like) */}
                        <g>
                          <circle r="9" fill="#d6a26f">
                            <animateMotion
                              dur="22s"
                              repeatCount="indefinite"
                              rotate="auto"
                              path="M -105 0 A 105 64 0 1 0 105 0 A 105 64 0 1 0 -105 0"
                            />
                          </circle>
                          <circle
                            r="18"
                            fill="#d6a26f"
                            opacity="0.25"
                            filter="url(#softGlow)"
                          >
                            <animateMotion
                              dur="22s"
                              repeatCount="indefinite"
                              rotate="auto"
                              path="M -105 0 A 105 64 0 1 0 105 0 A 105 64 0 1 0 -105 0"
                            />
                          </circle>
                        </g>

                        {/* Planet on orbit 4 (Mars-like) */}
                        <g>
                          <circle r="5" fill="#e2684a">
                            <animateMotion
                              dur="26s"
                              repeatCount="indefinite"
                              rotate="auto"
                              path="M -120 0 A 120 72 0 1 0 120 0 A 120 72 0 1 0 -120 0"
                            />
                          </circle>
                          <circle
                            r="10"
                            fill="#e2684a"
                            opacity="0.3"
                            filter="url(#softGlow)"
                          >
                            <animateMotion
                              dur="26s"
                              repeatCount="indefinite"
                              rotate="auto"
                              path="M -120 0 A 120 72 0 1 0 120 0 A 120 72 0 1 0 -120 0"
                            />
                          </circle>
                        </g>
                      </g>
                    </g>

                    {/* Subtle inner ring accent */}
                    <circle
                      cx="150"
                      cy="150"
                      r="122"
                      fill="none"
                      stroke="#ffffff"
                      strokeOpacity="0.12"
                    />
                  </svg>
                  <motion.div
                    className="hero__avatar-glow"
                    animate={{
                      opacity: [0.5, 1, 0.5],
                      scale: [1, 1.1, 1],
                    }}
                    transition={{
                      duration: 3,
                      repeat: Infinity,
                      ease: "easeInOut",
                    }}
                  />
                </motion.div>
                <motion.div
                  className="hero__avatar-ring"
                  animate={{
                    rotate: [0, 360],
                    scale: [1, 1.05, 1],
                  }}
                  transition={{
                    rotate: { duration: 20, repeat: Infinity, ease: "linear" },
                    scale: { duration: 4, repeat: Infinity, ease: "easeInOut" },
                  }}
                  style={{
                    transform: `translateZ(10px)`,
                  }}
                />

                {/* 3D Orbital Rings */}
                <motion.div
                  className="hero__avatar-orbital-ring hero__avatar-orbital-ring--1"
                  animate={{
                    rotateX: [0, 360],
                    rotateZ: [0, -180],
                  }}
                  transition={{
                    duration: 15,
                    repeat: Infinity,
                    ease: "linear",
                  }}
                />
                <motion.div
                  className="hero__avatar-orbital-ring hero__avatar-orbital-ring--2"
                  animate={{
                    rotateY: [0, 360],
                    rotateZ: [0, 180],
                  }}
                  transition={{
                    duration: 12,
                    repeat: Infinity,
                    ease: "linear",
                  }}
                />
              </motion.div>

              <motion.div
                className="hero__tech-stack"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1, duration: 0.6 }}
                style={{
                  transformStyle: isMobile ? "flat" : "preserve-3d",
                }}
              >
                {techIcons.map((tech, index) => {
                  const IconComponent = tech.icon;
                  const angle = (index * 360) / techIcons.length;
                  return (
                    <motion.div
                      key={index}
                      className="hero__tech-icon"
                      style={{
                        "--icon-color": tech.color,
                        "--delay": tech.delay,
                        "--angle": `${angle}deg`,
                      }}
                      initial={{
                        scale: 0,
                        rotate: -180,
                        opacity: 0,
                        z: -50,
                      }}
                      animate={{
                        scale: 1,
                        rotate: 0,
                        opacity: 1,
                        z: 0,
                        rotateY: [0, 360],
                      }}
                      transition={{
                        delay: 1 + tech.delay,
                        type: "spring",
                        stiffness: 200,
                        damping: 10,
                        rotateY: {
                          duration: 10 + index,
                          repeat: Infinity,
                          ease: "linear",
                        },
                      }}
                      whileHover={
                        isTouch || isMobile
                          ? undefined
                          : {
                              scale: 1.2,
                              rotate: 180,
                              z: 15,
                              boxShadow: `0 8px 20px ${tech.color}30`,
                              transition: { duration: 0.4 },
                            }
                      }
                    >
                      <motion.div
                        style={{
                          transformStyle: isMobile ? "flat" : "preserve-3d",
                          transform: isMobile
                            ? "none"
                            : `translateZ(${
                                Math.sin((angle * Math.PI) / 180) * 20
                              }px)`,
                        }}
                        animate={
                          isMobile
                            ? {}
                            : {
                                rotateZ: [0, 360],
                              }
                        }
                        transition={
                          isMobile
                            ? {}
                            : {
                                duration: 8 + index * 0.5,
                                repeat: Infinity,
                                ease: "linear",
                              }
                        }
                      >
                        <IconComponent />
                        <motion.div
                          className="hero__tech-icon-glow"
                          animate={{
                            opacity: [0.3, 0.8, 0.3],
                            scale: [1, 1.2, 1],
                          }}
                          transition={{
                            duration: 2 + index * 0.1,
                            repeat: Infinity,
                            ease: "easeInOut",
                          }}
                          style={{
                            background: `radial-gradient(circle, ${tech.color}40, transparent)`,
                          }}
                        />
                      </motion.div>
                    </motion.div>
                  );
                })}
              </motion.div>
            </motion.div>
          </div>

          {/* Enhanced 3D Background */}
          <motion.div
            className="hero__background"
            style={{
              transformStyle: "preserve-3d",
              y: parallaxY,
              rotate: parallaxRotate,
            }}
          >
            <motion.div
              className="hero__background-circle hero__background-circle--1"
              animate={{
                scale: [1, 1.2, 1],
                rotate: [0, 180, 360],
                x: [0, 50, 0],
                y: [0, -30, 0],
              }}
              transition={{
                duration: 20,
                repeat: Infinity,
                ease: "easeInOut",
              }}
              style={{
                transform: `translateZ(-100px)`,
              }}
            />
            <motion.div
              className="hero__background-circle hero__background-circle--2"
              animate={{
                scale: [1.1, 0.9, 1.1],
                rotate: [360, 180, 0],
                x: [0, -40, 0],
                y: [0, 40, 0],
              }}
              transition={{
                duration: 15,
                repeat: Infinity,
                ease: "easeInOut",
              }}
              style={{
                transform: `translateZ(-150px)`,
              }}
            />
            <motion.div
              className="hero__background-circle hero__background-circle--3"
              animate={{
                scale: [0.8, 1.3, 0.8],
                rotate: [0, -270, -540],
                x: [0, 30, 0],
                y: [0, -50, 0],
              }}
              transition={{
                duration: 25,
                repeat: Infinity,
                ease: "easeInOut",
              }}
              style={{
                transform: `translateZ(-200px)`,
              }}
            />

            {/* Additional 3D Background Elements */}
            <motion.div
              className="hero__background-mesh"
              animate={{
                rotateX: [0, 360],
                rotateY: [0, -360],
                scale: [1, 1.1, 1],
              }}
              transition={{
                duration: 30,
                repeat: Infinity,
                ease: "linear",
              }}
              style={{
                transform: `translateZ(-300px)`,
              }}
            />
          </motion.div>
        </div>
      </motion.section>

      <Suspense
        fallback={
          <div
            style={{
              minHeight: "200px",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            Loading...
          </div>
        }
      >
        <Experience />
      </Suspense>

      <Suspense
        fallback={
          <div
            style={{
              minHeight: "200px",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            Loading...
          </div>
        }
      >
        <CommunityTestimonials />
      </Suspense>
    </>
  );
});

Hero.displayName = "Hero";

export default Hero;
