import React, { useMemo, useEffect, useState } from "react";
import { motion, useAnimation } from "framer-motion";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import useTypewriter from "hooks/useTypewriter";
import useIsMobile from "hooks/useIsMobile";

import { ROUTES } from "router/routeConstants";
import useHeroData from "hooks/Home/useHeroData";


/**
 * Hero header component with personal information and CTA buttons
 */
function HeroHeader({ entranceComplete = false, isMobile = false }) {
  const { isMobile: responsiveIsMobile } = useIsMobile();
  const actualIsMobile = isMobile || responsiveIsMobile;
  const controls = useAnimation();
  const [isVisible, setIsVisible] = useState(false);

  // Fetch hero data from API
  const { heroData, subHeadings, loading, error, hasData } = useHeroData();

  // Get dynamic sub-headings or fallback to default Vietnamese
  const typewriterTexts = useMemo(() => {
    if (hasData && subHeadings.length > 0) {
      // Sort sub-headings by sortOrder and extract text
      return subHeadings
        .sort((a, b) => (a.sortOrder || 0) - (b.sortOrder || 0))
        .map(sub => sub.text);
    }
    
    // Fallback to default Vietnamese texts
    return [
      "Lập Trình Viên Web",
      "Chuyên Gia Front-end", 
      "Chuyên Gia React / Java",
      "UI/UX Enthusiast",
      "Tối Ưu Hiệu Năng",
      "Full Stack Developer",
    ];
  }, [hasData, subHeadings]);

  // Calculate start delay for typewriter
  const typewriterStartDelay = useMemo(() => {
    if (entranceComplete) {
      return actualIsMobile ? 100 : 50;
    }
    return actualIsMobile ? 600 : 400;
  }, [entranceComplete, actualIsMobile]);

  // Mobile-optimized typewriter with faster, smoother transitions
  const typed = useTypewriter(typewriterTexts, { 
    startDelay: typewriterStartDelay,
    typeSpeed: actualIsMobile ? 50 : 70,        // Faster on mobile
    deleteSpeed: actualIsMobile ? 25 : 35,      // Faster deletion on mobile
    delayBetweenWords: actualIsMobile ? 1200 : 1500, // Shorter pause on mobile
    loop: true
  });

  const nameLetters = useMemo(() => {
    // Use heading from API if available, otherwise fallback to default
    const displayName = hasData && heroData?.heading ? heroData.heading : "Nhdinh";
    return Array.from(displayName);
  }, [hasData, heroData]);
  
  // Intersection observer for animation trigger
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setIsVisible(true);
            controls.start("visible");
          }
        });
      },
      { 
        threshold: actualIsMobile ? 0.1 : 0.2,
        rootMargin: actualIsMobile ? '50px' : '100px'
      }
    );

    const element = document.querySelector('.hero__container');
    if (element) {
      observer.observe(element);
    }

    return () => observer.disconnect();
  }, [controls, actualIsMobile]);

  // Mobile-optimized animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: actualIsMobile ? 0.06 : 0.08,
        delayChildren: actualIsMobile ? 0.02 : 0.05,
        when: "beforeChildren",
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: actualIsMobile ? 15 : 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        type: actualIsMobile ? "tween" : "spring",
        duration: actualIsMobile ? 0.4 : undefined,
        ease: actualIsMobile ? [0.25, 0.8, 0.4, 1] : undefined,
        stiffness: actualIsMobile ? undefined : 100,
        damping: actualIsMobile ? undefined : 12,
      },
    },
  };

  return (
    <motion.div
      className={`hero__container ${isVisible ? 'animate-in' : ''} ${loading ? 'hero-loading' : ''}`}
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      {/* Show error message if there's an error and no cached data */}
      {error && !hasData && (
        <motion.div 
          className="hero__error"
          variants={itemVariants}
        >
          <p>Không thể tải dữ liệu trang chủ. Đang hiển thị nội dung mặc định.</p>
        </motion.div>
      )}
      {/* Professional Badge with enhanced mobile support */}
      <motion.div className="professional-badge" variants={itemVariants}>
        <div className="badge-icon">
          <svg width={actualIsMobile ? "12" : "14"} height={actualIsMobile ? "12" : "14"} viewBox="0 0 24 24" fill="none">
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
          <span className="intro-text">
            {hasData && heroData?.preHeading ? heroData.preHeading : "Xin chào, tôi là"}
          </span>
        </span>

        <div className="name-container">
          <span
            className="hero__name"
            data-text={hasData && heroData?.heading ? heroData.heading : "Nhdinh"}
            aria-hidden="true"
          >
            {nameLetters.map((ch, i) => (
              <motion.span
                className={ch === ' ' ? 'letter letter--space' : 'letter'}
                key={i}
                initial={{ y: actualIsMobile ? 20 : 30, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{
                  delay: 0.4 + i * (actualIsMobile ? 0.06 : 0.08),
                  duration: actualIsMobile ? 0.4 : 0.6,
                  type: actualIsMobile ? "tween" : "spring",
                  ease: actualIsMobile ? [0.25, 0.8, 0.4, 1] : undefined,
                  stiffness: actualIsMobile ? undefined : 100,
                  damping: actualIsMobile ? undefined : 15,
                }}
              >
                {ch === ' ' ? '\u00A0' : ch}
              </motion.span>
            ))}
          </span>
          <div className="name-decoration">
            <motion.div
              className="decoration-line decoration-line--1"
              initial={{ scaleX: 0 }}
              animate={{ scaleX: 1 }}
              transition={{ 
                delay: actualIsMobile ? 0.6 : 0.8, 
                duration: actualIsMobile ? 0.6 : 0.8, 
                ease: "easeOut" 
              }}
            ></motion.div>
            <motion.div
              className="decoration-line decoration-line--2"
              initial={{ scaleX: 0 }}
              animate={{ scaleX: 1 }}
              transition={{ 
                delay: actualIsMobile ? 0.7 : 0.9, 
                duration: actualIsMobile ? 0.6 : 0.8, 
                ease: "easeOut" 
              }}
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
          transition={{ 
            delay: actualIsMobile ? 0.9 : 1.1, 
            duration: actualIsMobile ? 0.8 : 1.2, 
            ease: "easeOut" 
          }}
        ></motion.div>
      </motion.div>

      <motion.div
        className="hero__lead"
        aria-label="Tóm tắt năng lực"
        variants={itemVariants}
      >
        {hasData && heroData?.introHtml ? (
          <div dangerouslySetInnerHTML={{ __html: heroData.introHtml }} />
        ) : (
          <p>
            Là một lập trình viên
            <span className="highlight-text"> Kỹ Thuật Phần Mềm</span> chuyên về
            hiệu năng cao, trải nghiệm người dùng và kiến trúc mở rộng. Tôi
            thiết kế & triển khai{" "}
            <span className="highlight-text">hệ thống linh hoạt</span>, tối ưu
            UI/UX và tự động hóa quy trình để rút ngắn thời gian ra mắt sản
            phẩm. <span className="highlight-text">giải pháp nhanh chóng</span>{" "}
            và dễ bảo trì website tốt nhất hiện tại.
          </p>
        )}
      </motion.div>

      <HeroCtaButtons itemVariants={itemVariants} isMobile={actualIsMobile} />
    </motion.div>
  );
}

/**
 * Call to action buttons with enhanced mobile optimization
 */
function HeroCtaButtons({ itemVariants, isMobile = false }) {
  // Create synchronized variants for all buttons
  const ctaVariants = {
    hidden: { 
      opacity: 0, 
      y: isMobile ? 15 : 20,
      scale: 0.95 
    },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        type: isMobile ? "tween" : "spring",
        duration: isMobile ? 0.4 : 0.6,
        ease: isMobile ? [0.25, 0.8, 0.4, 1] : undefined,
        stiffness: isMobile ? undefined : 100,
        damping: isMobile ? undefined : 12,
      },
    },
  };

  // Container variants for simultaneous animation
  const ctaSectionVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        // All children animate at the same time (no stagger)
        staggerChildren: 0,
        delayChildren: 0,
        when: "beforeChildren",
      },
    },
  };

  return (
    <motion.div 
      className="hero__cta-section" 
      variants={ctaSectionVariants}
      initial="hidden"
      animate="visible"
    >
      <motion.div className="hero__cta-buttons" variants={ctaVariants}>
        <Link
          className="cta-button cta-button--primary"
          to={ROUTES.PROJECTS}
          aria-label="Xem các dự án của tôi"
        >
          <span className="cta-button__content">
            <span className="cta-button__text">Xem Dự Án</span>
            <span className="cta-button__icon">
              <svg
                width={isMobile ? "16" : "18"}
                height={isMobile ? "16" : "18"}
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </span>
          </span>
          <div className="cta-button__glow"></div>
        </Link>

        <Link
          className="cta-button cta-button--secondary"
          to={ROUTES.CONTACT}
          aria-label="Liên hệ với tôi"
        >
          <span className="cta-button__content">
            <span className="cta-button__text">Liên Hệ</span>
            <span className="cta-button__icon">
              <svg
                width={isMobile ? "16" : "18"}
                height={isMobile ? "16" : "18"}
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
          </span>
          <div className="cta-button__glow"></div>
        </Link>
      </motion.div>
      
      <motion.div
        className="hero__download-cv"
        variants={ctaVariants}
        whileHover={isMobile ? undefined : { scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
        transition={{ 
          type: isMobile ? "tween" : "spring", 
          stiffness: 400, 
          damping: 10,
          duration: isMobile ? 0.2 : undefined
        }}
      >
        <button
          className="download-cv-btn"
          onClick={() => {
            import("components").then(({ showNotification }) => {
              showNotification(
                "Tính năng đang được phát triển và sẽ sẵn sày trong thời gian tới!",
                "development",
                isMobile ? 3000 : 5000
              );
            });
          }}
          aria-label="Tải CV PDF"
        >
          <span className="download-cv-btn__content">
            <span className="download-cv-btn__text">Download CV</span>
            <span className="download-cv-btn__icon">
              <svg width={isMobile ? "14" : "16"} height={isMobile ? "14" : "16"} viewBox="0 0 16 16" fill="none">
                <path
                  d="M8 1v8m0 0l-3-3m3 3l3-3M3 12h10"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </span>
          </span>
          <div className="download-cv-btn__glow"></div>
        </button>
      </motion.div>
    </motion.div>
  );
}

// PropTypes
HeroHeader.propTypes = {
  entranceComplete: PropTypes.bool,
  isMobile: PropTypes.bool,
};

HeroCtaButtons.propTypes = {
  itemVariants: PropTypes.object.isRequired,
  isMobile: PropTypes.bool,
};

export default HeroHeader;
