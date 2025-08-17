import React, { useMemo, useEffect } from "react";
import { motion, useAnimation } from "framer-motion";
import { Link } from "react-router-dom";
import useTypewriter from "hooks/useTypewriter";
import { ROUTES } from "router/routeConstants";


/**
 * Hero header component with personal information and CTA buttons
 */
function HeroHeader({ entranceComplete = false }) {
  const controls = useAnimation();

  // Optimized typewriter with professional typing effect and smooth transitions
  const typed = useTypewriter([
    "Web Developer",
    "Front‑end Specialist",
    "React / Java Expert",
    "UI/UX Enthusiast",
    "Performance Optimizer",
    "Full Stack Developer",
  ], { 
    startDelay: entranceComplete ? 50 : 400, // Quick start when returning to page
    typeSpeed: 70,                           // Moderate typing speed (ms per character)
    deleteSpeed: 35,                         // Faster deletion speed for dynamic feel
    delayBetweenWords: 1500,                 // Slightly longer pause to read each phrase
    loop: true                               // Continuous animation
  });

  const nameLetters = useMemo(() => Array.from("Nhdinh"), []);
  
  // Start animations when component mounts or when returning to home
  useEffect(() => {
    controls.start("visible");
  }, [controls]);

  // Animation variants for staggered animations - optimized for smoother transitions
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.08, // Slightly faster stagger for smoother appearance
        delayChildren: 0.05,
        when: "beforeChildren",
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        type: "spring",
        stiffness: 100,
        damping: 12,
      },
    },
  };

  return (
    <motion.div
      className="hero__container"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      {/* Professional Badge with enhanced visual effect */}
      <motion.div className="professional-badge" variants={itemVariants}>
        <div className="badge-icon">
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none">
            <path
              d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
              stroke="currentColor"
              strokeWidth="2"
            />
          </svg>
        </div>
        <span className="badge-text">Web Developer</span>
        <div className="badge-glow"></div>
      </motion.div>

      <motion.h1
        className="hero__title"
        aria-label="Xin chào, tôi là Nhdinh"
        variants={itemVariants}
      >
        <span className="hero__intro">
          <span className="intro-text">Xin chào, tôi là</span>
        </span>

        <div className="name-container">
          <span
            className="hero__name"
            data-text="Nhdinh"
            aria-hidden="true"
          >
            {nameLetters.map((ch, i) => (
              <motion.span
                className="letter"
                key={i}
                initial={{ y: 30, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{
                  delay: 0.4 + i * 0.08,
                  duration: 0.6,
                  type: "spring",
                  stiffness: 100,
                  damping: 15,
                }}
              >
                {ch}
              </motion.span>
            ))}
          </span>
          <div className="name-decoration">
            <motion.div
              className="decoration-line decoration-line--1"
              initial={{ scaleX: 0 }}
              animate={{ scaleX: 1 }}
              transition={{ delay: 0.8, duration: 0.8, ease: "easeOut" }}
            ></motion.div>
            <motion.div
              className="decoration-line decoration-line--2"
              initial={{ scaleX: 0 }}
              animate={{ scaleX: 1 }}
              transition={{ delay: 0.9, duration: 0.8, ease: "easeOut" }}
            ></motion.div>
          </div>
        </div>
      </motion.h1>

      <motion.div
        className="hero__subtitle-container"
        variants={itemVariants}
      >
        <p className="hero__subtitle">
          <span
            className="typewriter"
            aria-live="polite"
            aria-atomic="true"
          >
            {typed}
            <span className="caret" aria-hidden="true">
              |
            </span>
          </span>
        </p>
        <motion.div
          className="subtitle-accent"
          initial={{ width: "0%" }}
          animate={{ width: "100%" }}
          transition={{ delay: 1.1, duration: 1.2, ease: "easeOut" }}
        ></motion.div>
      </motion.div>

      <motion.p
        className="hero__lead"
        aria-label="Tóm tắt năng lực"
        variants={itemVariants}
      >
        Là một lập trình viên
        <span className="highlight-text"> Kỹ Thuật Phần Mềm</span> chuyên về
        hiệu năng cao, trải nghiệm người dùng và kiến trúc mở rộng. Tôi
        thiết kế & triển khai{" "}
        <span className="highlight-text">hệ thống linh hoạt</span>, tối ưu
        UI/UX và tự động hóa quy trình để rút ngắn thời gian ra mắt sản
        phẩm. <span className="highlight-text">giải pháp nhanh chống</span>{" "}
        và dễ bảo trì website tốt nhật hiện tại.
      </motion.p>

      <HeroTechShowcase itemVariants={itemVariants} />
      <HeroCtaButtons itemVariants={itemVariants} />
    </motion.div>
  );
}

/**
 * Tech showcase component
 */
function HeroTechShowcase({ itemVariants }) {
  return (
    <motion.div className="hero__tech-showcase" variants={itemVariants}>
      <div className="tech-grid">
        {[
          { name: "React", icon: "⚛️", level: "Expert", class: "react" },
          {
            name: "Angular",
            icon: "🅰️",
            level: "Advanced",
            class: "angular",
          },
          { name: "Node.js", icon: "🟢", level: "Expert", class: "node" },
          {
            name: "TypeScript",
            icon: "🔷",
            level: "Expert",
            class: "ts",
          },
          {
            name: "REST/GraphQL",
            icon: "🔗",
            level: "Expert",
            class: "api",
          },
          {
            name: "SQL Server",
            icon: "🗄️",
            level: "Expert",
            class: "sqlserver",
          },
          {
            name: "MongoDB",
            icon: "🍃",
            level: "Advanced",
            class: "mongodb",
          },
        ].map((tech, i) => (
          <motion.div
            className={`tech-item tech-item--${tech.class}`}
            key={i}
            style={{ "--i": i }} // For staggered animations
            initial={{ opacity: 0, translateY: 20 }}
            animate={{ opacity: 1, translateY: 0 }}
            transition={{
              duration: 0.7,
              type: "spring",
              stiffness: 100,
              damping: 12,
            }}
            whileHover={{
              scale: 1.05,
              translateZ: 10,
              filter: "brightness(1.1)",
            }}
          >
            <div className="tech-icon">{tech.icon}</div>
            <span className="tech-name">{tech.name}</span>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
}

/**
 * Call to action buttons
 */
function HeroCtaButtons({ itemVariants }) {
  return (
    <>
      <motion.div className="hero__cta-buttons" variants={itemVariants}>
        <Link
          className="cta-button cta-button--primary"
          to={ROUTES.PROJECTS}
        >
          <span>Dự Án</span>
          <span className="button-icon">
            <svg
              width="18"
              height="18"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M5 12h14M12 5l7 7-7 7"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </span>
        </Link>

        <Link
          className="cta-button cta-button--secondary"
          to={ROUTES.CONTACT}
        >
          <span>Liên Hệ</span>
          <span className="button-icon">
            <svg
              width="18"
              height="18"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M21 5.25L12 13.5 3 5.25M3 5.25h18v13.5H3V5.25z"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </span>
        </Link>
      </motion.div>
      <br />
      <motion.div
        whileHover={{ scale: 1.03 }}
        whileTap={{ scale: 0.97 }}
        transition={{ type: "spring", stiffness: 400, damping: 10 }}
      >
        <button
          className="btn btn--outline btn--enhanced"
          onClick={() => {
            import("components").then(({ showNotification }) => {
              showNotification(
                "Tính năng đang được phát triển và sẽ sẵn sàng trong thời gian tới!",
                "development",
                5000
              );
            });
          }}
          aria-label="Tải CV PDF"
        >
          <div className="btn-content">
            <span className="btn-text">Download CV</span>
            <div className="btn-icon">
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                <path
                  d="M8 1v8m0 0l-3-3m3 3l3-3M3 12h10"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </div>
          </div>
          <div className="btn-glow"></div>
        </button>
      </motion.div>
    </>
  );
}

export default HeroHeader;
