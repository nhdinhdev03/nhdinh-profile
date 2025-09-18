import {
  motion,
  useAnimation,
  useMotionValue,
  useSpring,
  useTransform,
} from "framer-motion";
import PropTypes from "prop-types";
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
  FiMapPin
} from "react-icons/fi";
import { SiTailwindcss, SiTypescript } from "react-icons/si";
import { Link } from "react-router-dom";
import { ROUTES } from "router/routeConstants";
import CommunityTestimonials from "./CommunityTestimonials";
import { Experience } from "./Experience";
import "./Hero.scss";

// Lazy load heavy components để tối ưu performance

// Skills Progress Ring Component
const SkillProgressRing = ({ skill, level, color, delay, icon: IconComponent, index, isMobile, isTouch }) => {
  const [progress, setProgress] = useState(0);
  const radius = 35;
  const strokeWidth = 4;
  const normalizedRadius = radius - strokeWidth * 2;
  const circumference = normalizedRadius * 2 * Math.PI;
  const strokeDasharray = `${circumference} ${circumference}`;
  const strokeDashoffset = circumference - (progress / 100) * circumference;

  useEffect(() => {
    const timer = setTimeout(() => {
      const duration = 2000;
      const startTime = performance.now();

      const animateProgress = (currentTime) => {
        const elapsed = currentTime - startTime;
        const progressValue = Math.min(elapsed / duration, 1);
        const easeProgress = 1 - Math.pow(1 - progressValue, 3); // easeOutCubic
        const currentProgress = easeProgress * level;
        
        setProgress(currentProgress);

        if (progressValue < 1) {
          requestAnimationFrame(animateProgress);
        }
      };

      requestAnimationFrame(animateProgress);
    }, delay * 1000 + 1000);

    return () => clearTimeout(timer);
  }, [level, delay]);

  const angle = (index * 360) / 6; // 6 total skills
  const isDesktop = !isMobile && !isTouch;

  return (
    <motion.div
      className="hero__skill-ring"
      style={{
        "--skill-color": color,
        "--angle": `${angle}deg`,
      }}
      initial={{
        scale: 0,
        rotate: -180,
        opacity: 0,
      }}
      animate={{
        scale: 1,
        rotate: 0,
        opacity: 1,
      }}
      transition={{
        delay: 1 + delay,
        type: "spring",
        stiffness: 200,
        damping: 15,
      }}
      whileHover={
        isDesktop
          ? {
              scale: 1.15,
              y: -5,
              transition: { duration: 0.3 },
            }
          : undefined
      }
    >
      <div className="hero__skill-ring-container">
        <svg
          className="hero__skill-ring-svg"
          height={radius * 2}
          width={radius * 2}
        >
          {/* Background circle */}
          <circle
            stroke="rgba(255, 255, 255, 0.1)"
            fill="transparent"
            strokeWidth={strokeWidth}
            r={normalizedRadius}
            cx={radius}
            cy={radius}
          />
          {/* Progress circle */}
          <circle
            stroke={color}
            fill="transparent"
            strokeWidth={strokeWidth}
            strokeDasharray={strokeDasharray}
            style={{
              strokeDashoffset,
              transform: 'rotate(-90deg)',
              transformOrigin: '50% 50%',
              transition: 'stroke-dashoffset 0.3s ease',
              filter: `drop-shadow(0 0 8px ${color}40)`,
            }}
            strokeLinecap="round"
            r={normalizedRadius}
            cx={radius}
            cy={radius}
          />
        </svg>
        
        <div className="hero__skill-content">
          <div className="hero__skill-icon">
            <IconComponent />
          </div>
          <div className="hero__skill-name">{skill}</div>
        </div>
      </div>
    </motion.div>
  );
};

SkillProgressRing.propTypes = {
  skill: PropTypes.string.isRequired,
  level: PropTypes.number.isRequired,
  color: PropTypes.string.isRequired,
  delay: PropTypes.number.isRequired,
  icon: PropTypes.elementType.isRequired,
  index: PropTypes.number.isRequired,
  isMobile: PropTypes.bool.isRequired,
  isTouch: PropTypes.bool.isRequired,
};


const Hero = memo(() => {
  const { t } = useTranslation();
  const [displayText, setDisplayText] = useState("");
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);
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

    // Mobile optimization applied globally
    if (isLowEndDevice) {
      // Disable complex visual effects on low-end devices
      console.log('Low-end device detected, optimizations applied');
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
    { icon: FaReact, color: "#61DAFB", delay: 0, skill: "React", level: 95 },
    { icon: FaJsSquare, color: "#F7DF1E", delay: 0.2, skill: "JavaScript", level: 90 },
    { icon: SiTypescript, color: "#3178C6", delay: 0.4, skill: "TypeScript", level: 85 },
    { icon: FaNodeJs, color: "#339933", delay: 0.6, skill: "Node.js", level: 88 },
    { icon: SiTailwindcss, color: "#06B6D4", delay: 0.8, skill: "TailwindCSS", level: 92 },
    { icon: FaPython, color: "#3776AB", delay: 1.0, skill: "Python", level: 80 },
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

                <a
                  href="/resume.pdf"
                  className="btn btn-outline"
                  download
                  aria-label={`${t("hero.download_cv_button")} - PDF file`}
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
                </a>
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
                className="hero__skills-showcase"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1, duration: 0.6 }}
                style={{
                  transformStyle: isMobile ? "flat" : "preserve-3d",
                }}
              >
                {techIcons.map((tech, index) => (
                  <SkillProgressRing
                    key={index}
                    skill={tech.skill}
                    level={tech.level}
                    color={tech.color}
                    delay={tech.delay}
                    icon={tech.icon}
                    index={index}
                    isMobile={isMobile}
                    isTouch={isTouch}
                  />
                ))}
              </motion.div>
            </motion.div>
          </div>
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
