import React, { useEffect, useMemo, useRef, useState } from "react";
import { motion } from "framer-motion";
import NeuroGrid from "./NeuroGrid/NeuroGrid";
import "./HomeIndex.scss";
import { Link } from "react-router-dom";
import { ROUTES } from "router/routeConstants";
import { useTheme } from "theme/ThemeProvider";

import { ProjectShowcase, StatsStrip, TechMarquee } from "components";

function useTypewriter(words = [], speed = 80, pause = 1200) {
  const seq = useMemo(() => (Array.isArray(words) ? words : []), [words]);
  const [index, setIndex] = useState(0); // which word
  const [subIndex, setSubIndex] = useState(0); // how many chars
  const [deleting, setDeleting] = useState(false);
  const [text, setText] = useState("");

  useEffect(() => {
    if (seq.length === 0) return;
    const current = seq[index % seq.length] ?? "";
    const atWordEnd = !deleting && subIndex === current.length;
    const atWordStart = deleting && subIndex === 0;

    const timeout = setTimeout(
      () => {
        if (atWordEnd) {
          setDeleting(true);
        } else if (atWordStart) {
          setDeleting(false);
          setIndex((i) => (i + 1) % seq.length);
        } else {
          setSubIndex((s) => s + (deleting ? -1 : 1));
        }
      },
      atWordEnd ? pause : deleting ? Math.max(40, speed / 2) : speed
    );

    setText(current.slice(0, subIndex));
    return () => clearTimeout(timeout);
  }, [seq, index, subIndex, deleting, speed, pause]);

  return text;
}

function HomeIndex() {
  const heroRef = useRef(null);
  const rafRef = useRef(0);
  const targetVars = useRef({ x: 0, y: 0 });
  const [isLoaded, setIsLoaded] = useState(false);
  const { light, toggle } = useTheme();
  
  // Trigger loading animation on mount
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoaded(true);
    }, 300);
    return () => clearTimeout(timer);
  }, []);

  // Enhanced parallax with smoother interpolation
  useEffect(() => {
    const el = heroRef.current;
    if (!el) return;
    const rect = () => el.getBoundingClientRect();
    const onMove = (e) => {
      const r = rect();
      const cx = r.left + r.width / 2;
      const cy = r.top + r.height / 2;
      const dx = (e.clientX - cx) / (r.width / 2);
      const dy = (e.clientY - cy) / (r.height / 2);
      targetVars.current.x = Math.max(-1, Math.min(1, dx * 0.7)); // Reduced intensity
      targetVars.current.y = Math.max(-1, Math.min(1, dy * 0.7));
      if (!rafRef.current) loop();
    };
    
    const onLeave = () => {
      targetVars.current.x = 0;
      targetVars.current.y = 0;
      if (!rafRef.current) loop();
    };
    
    const loop = () => {
      const step = 0.06; // Smoother easing
      const sx = parseFloat(getComputedStyle(el).getPropertyValue("--mx")) || 0;
      const sy = parseFloat(getComputedStyle(el).getPropertyValue("--my")) || 0;
      const nx = sx + (targetVars.current.x - sx) * step;
      const ny = sy + (targetVars.current.y - sy) * step;
      el.style.setProperty("--mx", nx.toFixed(4));
      el.style.setProperty("--my", ny.toFixed(4));
      if (
        Math.abs(nx - targetVars.current.x) > 0.001 ||
        Math.abs(ny - targetVars.current.y) > 0.001
      ) {
        rafRef.current = requestAnimationFrame(loop);
      } else {
        rafRef.current = 0;
      }
    };

    // Only enable on pointer devices
    const mq = window.matchMedia("(hover: hover) and (pointer: fine)");
    if (mq.matches) {
      el.addEventListener("mousemove", onMove);
      el.addEventListener("mouseleave", onLeave);
    }
    return () => {
      el.removeEventListener("mousemove", onMove);
      el.removeEventListener("mouseleave", onLeave);
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, []);
  
  // Enhanced typewriter with more professional phrases
  const typed = useTypewriter([
    "Full Stack Engineer",
    "Front‑end Specialist",
    "React / Node.js Expert",
    "UI/UX Enthusiast",
    "Performance Optimizer"
  ]);

  const nameLetters = useMemo(() => Array.from("Nhdinh"), []);

  // Animation variants for staggered animations
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { 
      opacity: 1, 
      transition: { 
        staggerChildren: 0.12,
        delayChildren: 0.1
      }
    }
  };
  
  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { 
        type: "spring", 
        stiffness: 100, 
        damping: 12 
      }
    }
  };

  return (
    <>
      <header className="hero" aria-label="Giới thiệu tổng quan" ref={heroRef}>
        {/* Theme Toggle Button */}
     

        {/* Enhanced Background with Multiple Layers */}
        <div className="hero__bg" aria-hidden="true">
          {/* Animated Particles */}
          <div className="hero__particles">
            {[...Array(25)].map((_, i) => (
              <div 
                key={i} 
                className="hero__particle"
                style={{
                  '--size': `${Math.random() * 8 + 2}px`,
                  '--x': `${Math.random() * 100}%`,
                  '--y': `${Math.random() * 100}%`,
                  '--duration': `${Math.random() * 20 + 10}s`,
                  '--delay': `${Math.random() * 5}s`
                }}
              />
            ))}
          </div>
          
          <NeuroGrid parentRef={heroRef} />
          
          {/* Enhanced Geometric Pattern Overlay */}
          <div className="hero__patterns">
            <div className="geometric-grid"></div>
            <div className="floating-elements">
              {[...Array(6)].map((_, i) => (
                <motion.div
                  key={i}
                  className={`float-elem float-elem--${i + 1}`}
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ 
                    opacity: isLoaded ? 0.7 : 0, 
                    scale: isLoaded ? 1 : 0.8 
                  }}
                  transition={{ 
                    duration: 1.2, 
                    delay: 0.1 + i * 0.15,
                    ease: [0.25, 1, 0.5, 1]
                  }}
                />
              ))}
            </div>
          </div>
          
          {/* Dynamic Gradient Overlay with enhanced visuals */}
          <div className="hero__gradient-overlay">
            <div className="hero__light-beam"></div>
          </div>
          
          {/* Code snippet decorative elements */}
          <div className="code-snippet code-snippet--left">
            <div className="code-line">const developer = {`{`}</div>
            <div className="code-line code-indent">name: <span className="code-string">"Nhdinh"</span>,</div>
            <div className="code-line code-indent">skills: <span className="code-array">[...]</span>,</div>
            <div className="code-line code-indent">passion: <span className="code-string">"Creating amazing web experiences"</span></div>
            <div className="code-line">{`}`};</div>
          </div>
          
          <div className="code-snippet code-snippet--right">
            <div className="code-line"><span className="code-keyword">function</span> <span className="code-fn">createSolution</span>() {`{`}</div>
            <div className="code-line code-indent"><span className="code-keyword">return</span> innovative && scalable;</div>
            <div className="code-line">{`}`}</div>
          </div>
        </div>

        <motion.div 
          className="hero__container"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          {/* Professional Badge with enhanced visual effect */}
          <motion.div
            className="professional-badge"
            variants={itemVariants}
          >
            <div className="badge-icon">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none">
                <path
                  d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                  stroke="currentColor"
                  strokeWidth="2"
                />
              </svg>
            </div>
            <span>Full Stack Developer</span>
            <div className="badge-glow"></div>
          </motion.div>

          <motion.h1 className="hero__title" aria-label="Xin chào, tôi là Nhdinh" variants={itemVariants}>
            <span className="hero__intro">
           
              <span className="intro-text">Xin chào, tôi là</span>
            </span>

            <div className="name-container">
              <span className="hero__name" data-text="Nhdinh" aria-hidden="true">
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
                      damping: 15
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

          <motion.div className="hero__subtitle-container" variants={itemVariants}>
            <p className="hero__subtitle">
              <span className="typewriter" aria-live="polite" aria-atomic="true">
                {typed}
                <span className="caret" aria-hidden="true">|</span>
              </span>
            </p>
            <motion.div 
              className="subtitle-accent"
              initial={{ width: "0%" }}
              animate={{ width: "100%" }}
              transition={{ delay: 1.1, duration: 1.2, ease: "easeOut" }}
            ></motion.div>
          </motion.div>

          <motion.p className="hero__lead" aria-label="Tóm tắt năng lực" variants={itemVariants}>
            Là một lập trình viên
            <span className="highlight-text"> Kỹ Thuật Phần Mềm</span> chuyên về
            hiệu năng cao, trải nghiệm người dùng và kiến trúc mở rộng. Tôi
            thiết kế & triển khai{" "}
            <span className="highlight-text">hệ thống linh hoạt</span>, tối ưu
            UI/UX và tự động hóa quy trình để rút ngắn thời gian ra mắt sản
            phẩm.{" "}
            <span className="highlight-text">giải pháp nhanh chống</span> và dễ bảo
            trì website tốt nhật hiện tại.
      
          </motion.p>

          {/* Enhanced Tech Stack with animated cards */}
          <motion.div className="hero__tech-showcase" variants={itemVariants}>
            <div className="tech-grid">
              {[
                { name: "React", icon: "⚛️", level: "Expert", class: "react" },
                { name: "Angular", icon: "🅰️", level: "Advanced", class: "angular" },
                { name: "Node.js", icon: "🟢", level: "Expert", class: "node" },
                { name: "TypeScript", icon: "🔷", level: "Expert", class: "ts" },
                { name: "REST/GraphQL", icon: "🔗", level: "Expert", class: "api" },
                { name: "SQL Server", icon: "🗄️", level: "Expert", class: "sqlserver" },
                { name: "MongoDB", icon: "🍃", level: "Advanced", class: "mongodb" }
              ].map((tech, i) => (
                <motion.div 
                  className={`tech-item tech-item--${tech.class}`}
                  key={i}
                  style={{ '--i': i }} // For staggered animations
                  initial={{ opacity: 0, translateY: 20 }}
                  animate={{ opacity: 1, translateY: 0 }}
                  transition={{ 
                    duration: 0.7,
                    type: "spring",
                    stiffness: 100,
                    damping: 12
                  }}
                  whileHover={{ 
                    scale: 1.05,
                    translateZ: 10,
                    filter: "brightness(1.1)"
                  }}
                >
                  <div className="tech-icon">{tech.icon}</div>
                  <span className="tech-name">{tech.name}</span>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Enhanced Action Buttons with interactive animations */}
          <motion.div className="hero__cta-buttons" variants={itemVariants}>
            <Link className="cta-button cta-button--primary" to={ROUTES.PROJECTS}>
              <span>Khám Phá Dự Án</span>
              <span className="button-icon">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
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

            <Link className="cta-button cta-button--secondary" to={ROUTES.CONTACT}>
              <span>Liên Hệ Ngay</span>
              <span className="button-icon">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
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
              <a
                className="btn btn--outline btn--enhanced"
                href="/cv.pdf"
                target="_blank"
                rel="noopener"
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
              </a>
            </motion.div>
          {/* Scroll indicator */}
        
        </motion.div>
      </header>

      {/* Tech stack marquee */}
      <TechMarquee />
      
      {/* Quick stats strip */}
      <StatsStrip />
      
      {/* Project highlights */}
      <ProjectShowcase />
    </>
  );
}

export default HomeIndex;
