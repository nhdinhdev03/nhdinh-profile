import React, { useEffect, useMemo, useRef, useState } from "react";
import NeuroGrid from "./NeuroGrid/NeuroGrid";
import "./HomeIndex.scss";
import { Link } from "react-router-dom";
import { ROUTES } from "router/routeConstants";

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

// Simple intersection observer hook
function useInView(options) {
  const ref = useRef(null);
  const [inView, setInView] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el || inView) return;
    const obs = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            setInView(true);
            obs.disconnect();
          }
        });
      },
      { threshold: 0.35, ...(options || {}) }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, [options, inView]);
  return [ref, inView];
}

// Count up animation hook
function useCountUp(target = 0, duration = 1400, start = false) {
  const [value, setValue] = useState(0);
  useEffect(() => {
    if (!start) return;
    const t0 = performance.now();
    let raf = 0;
    const tick = (now) => {
      const progress = Math.min(1, (now - t0) / duration);
      const eased = 1 - Math.pow(1 - progress, 3);
      setValue(Math.round(eased * target));
      if (progress < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [target, duration, start]);
  return value;
}

function HomeIndex() {
  const heroRef = useRef(null);
  const rafRef = useRef(0);
  const targetVars = useRef({ x: 0, y: 0 });

  // Parallax: update CSS vars --mx/--my in range [-1, 1]
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
      targetVars.current.x = Math.max(-1, Math.min(1, dx));
      targetVars.current.y = Math.max(-1, Math.min(1, dy));
      if (!rafRef.current) loop();
    };
    const onLeave = () => {
      targetVars.current.x = 0;
      targetVars.current.y = 0;
      if (!rafRef.current) loop();
    };
    const loop = () => {
      const step = 0.08; // easing
      const sx = parseFloat(getComputedStyle(el).getPropertyValue("--mx")) || 0;
      const sy = parseFloat(getComputedStyle(el).getPropertyValue("--my")) || 0;
      const nx = sx + (targetVars.current.x - sx) * step;
      const ny = sy + (targetVars.current.y - sy) * step;
      el.style.setProperty("--mx", nx.toFixed(4));
      el.style.setProperty("--my", ny.toFixed(4));
      if (
        Math.abs(nx - targetVars.current.x) > 0.002 ||
        Math.abs(ny - targetVars.current.y) > 0.002
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
  const typed = useTypewriter([
    "Full Stack Engineer",
    "Front‑end Specialist",
    "React / Node.js Developer",
  ]);

  const nameLetters = useMemo(() => Array.from("Nhdinh"), []);

  return (
    <>
      <header className="hero" aria-label="Giới thiệu tổng quan" ref={heroRef}>
        {/* Enhanced Background with Multiple Layers */}
        <div className="hero__bg" aria-hidden="true">
          <NeuroGrid parentRef={heroRef} />
          {/* Geometric Pattern Overlay */}
          <div className="hero__patterns">
            <div className="geometric-grid"></div>
            <div className="floating-elements">
              <div className="float-elem float-elem--1"></div>
              <div className="float-elem float-elem--2"></div>
              <div className="float-elem float-elem--3"></div>
              <div className="float-elem float-elem--4"></div>
              <div className="float-elem float-elem--5"></div>
            </div>
          </div>
          {/* Dynamic Gradient Overlay */}
          <div className="hero__gradient-overlay"></div>
        </div>

        <div className="hero__container">
          {/* Professional Badge */}
          <div
            className="professional-badge fade-in-up"
            style={{ "--delay": "0.1s" }}
          >
            <div className="badge-icon">
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none">
                <path
                  d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                  stroke="currentColor"
                  strokeWidth="2"
                />
              </svg>
            </div>
            <span>Full Stack Developer</span>
          </div>

          <h1 className="hero__title" aria-label="Xin chào, tôi là Nhdinh">
            <span
              className="hero__intro fade-in-up"
              style={{ "--delay": "0.2s" }}
            >
              <span className="wave-emoji">👋</span>
              <span className="intro-text">Xin chào, tôi là</span>
            </span>

            <div
              className="name-container fade-in-up"
              style={{ "--delay": "0.3s" }}
            >
              <span
                className="hero__name"
                data-text="Nhdinh"
                aria-hidden="true"
              >
                {nameLetters.map((ch, i) => (
                  <span className="letter" style={{ "--i": i }} key={i}>
                    {ch}
                  </span>
                ))}
              </span>
              <div className="name-decoration">
                <div className="decoration-line decoration-line--1"></div>
                <div className="decoration-line decoration-line--2"></div>
              </div>
            </div>
          </h1>

          <div
            className="hero__subtitle-container fade-in-up"
            style={{ "--delay": "0.4s" }}
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
            <div className="subtitle-accent"></div>
          </div>

          <p
            className="hero__lead fade-in-up"
            style={{ "--delay": "0.5s" }}
            aria-label="Tóm tắt năng lực"
          >
            Là một lập trình viên
            <span className="highlight-text"> Kỹ Thuật Phần Mềm</span> chuyên về
            hiệu năng cao, trải nghiệm người dùng và kiến trúc mở rộng. Tôi
            thiết kế & triển khai{" "}
            <span className="highlight-text">hệ thống linh hoạt</span>, tối ưu
            UI/UX và tự động hóa quy trình để rút ngắn thời gian ra mắt sản
            phẩm.{" "}
            <span className="highlight-text">giải pháp nhanh chống</span> và dễ bảo
            trì website tốt nhật hiện tại.
          </p>

          {/* Enhanced Tech Stack */}
          <div
            className="hero__tech-showcase fade-in-up"
            style={{ "--delay": "0.6s" }}
          >
            <div className="tech-grid">
              <div className="tech-item tech-item--react">
                <div className="tech-icon">⚛️</div>
                <span>React</span>
                <div className="tech-level">Expert</div>
              </div>
              <div className="tech-item tech-item--angular">
                <div className="tech-icon">🅰️</div>
                <span>Angular</span>
                <div className="tech-level">Advanced</div>
              </div>
              <div className="tech-item tech-item--node">
                <div className="tech-icon">🟢</div>
                <span>Node.js</span>
                <div className="tech-level">Expert</div>
              </div>
              <div className="tech-item tech-item--ts">
                <div className="tech-icon">🔷</div>
                <span>TypeScript</span>
                <div className="tech-level">Expert</div>
              </div>
          
              <div className="tech-item tech-item--api">
                <div className="tech-icon">🔗</div>
                <span>REST/GraphQL</span>
                <div className="tech-level">Expert</div>
              </div>
       
            <div className="tech-item tech-item--sqlserver">
                <div className="tech-icon">🗄️</div>
                <span>SQL Server</span>
                <div className="tech-level">Expert</div>
              </div>
              <div className="tech-item tech-item--mongodb">
                <div className="tech-icon">🍃</div>
                <span>MongoDB</span>
                <div className="tech-level">Advanced</div>
              </div>
            
            
            </div>
          </div>

          {/* Enhanced Action Buttons */}
          <div className="hero__ctas fade-in-up" style={{ "--delay": "0.8s" }}>
            <Link
              className="btn btn--primary btn--enhanced"
              to={ROUTES.PROJECTS}
            >
              <div className="btn-content">
                <span className="btn-text" style={{ color: "#0b0f17" }}>
                  Khám Phá Dự Án
                </span>
                <div className="btn-icon">
                  <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                    <path
                      d="M6 12l4-4-4-4"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </div>
              </div>
              <div className="btn-glow"></div>
            </Link>

            <Link
              className="btn btn--secondary btn--enhanced"
              to={ROUTES.CONTACT}
            >
              <div className="btn-content">
                <div className="btn-icon">
                  <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                    <path
                      d="M2 4l6 4 6-4M2 4v8h12V4H2z"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </div>
                <span className="btn-text">Liên Hệ Ngay</span>
              </div>
              <div className="btn-glow"></div>
            </Link>

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
          </div>

          {/* Premium Stats Section */}
        </div>
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
