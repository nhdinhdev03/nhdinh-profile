import React, { useEffect, useMemo, useRef, useState } from "react";
import NeuroGrid from "./HIHI";
import "./HomeIndex.scss";
import { Link } from "react-router-dom";
import { ROUTES } from "router/routeConstants";
// New highlight sections
import TechMarquee from "../../../components/User/Home/TechMarquee";
import StatsStrip from "../../../components/User/Home/StatsStrip";
import ProjectShowcase from "../../../components/User/Home/ProjectShowcase";

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

  // Split name into letters for stagger animation
  const nameLetters = useMemo(() => Array.from("Nhdinh"), []);

  // (removed unused scrollTo helper)

  // Animated stats trigger
  const [statsRef, statsInView] = useInView();
  const projCount = useCountUp(50, 1300, statsInView);
  const yearCount = useCountUp(5, 1300, statsInView);
  const satCount = useCountUp(99, 1300, statsInView);

  return (
    <>
      <header className="hero" aria-label="Giới thiệu tổng quan" ref={heroRef}>
        <div className="hero__bg" aria-hidden="true">
          <NeuroGrid parentRef={heroRef} />
        </div>
        <div className="hero__container">
          <h1 className="hero__title" aria-label="Xin chào, tôi là Nhdinh">
            <span className="hero__intro">
              <span className="highlight">👋</span> Xin chào, tôi là
            </span>
            <span className="hero__name" data-text="Nhdinh" aria-hidden="true">
              {nameLetters.map((ch, i) => (
                <span className="letter" style={{ "--i": i }} key={i}>{ch}</span>
              ))}
            </span>
          </h1>

          <p className="hero__subtitle">
            <span className="typewriter" aria-live="polite" aria-atomic="true">
              {typed}
              <span className="caret" aria-hidden="true">
                |
              </span>
            </span>
          </p>

          <p className="hero__lead fade-in" aria-label="Tóm tắt năng lực">
            <span className="highlight-text">Kỹ sư Full Stack</span> tập trung vào hiệu năng, trải nghiệm và khả năng mở rộng. 
            Tôi thiết kế & triển khai <span className="highlight-text">kiến trúc linh hoạt</span>, tối ưu UI/UX và tự động hóa quy trình phát triển 
            để rút ngắn thời gian ra mắt sản phẩm. Cam kết tạo ra <span className="highlight-text">giải pháp bền vững</span> và 
            dễ bảo trì cho doanh nghiệp.
          </p>

          <ul className="hero__meta" aria-label="Công nghệ chính">
            <li>React</li>
            <li>Node.js</li>
            <li>TypeScript</li>
            <li>REST / GraphQL</li>
            <li>Performance</li>
          </ul>

          <div className="availability-badge" aria-label="Trạng thái nhận dự án">
            <span className="pulse" aria-hidden="true" /> Đang mở nhận hợp tác
          </div>

          <div className="hero__ctas">
            <Link className="btn btn--primary" to={ROUTES.PROJECTS}>
              <span>Khám Phá Dự Án</span>
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none" className="icon">
                <path d="M6 12l4-4-4-4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </Link>
            <Link className="btn btn--secondary" to={ROUTES.CONTACT}>
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none" className="icon-mail">
                <path d="M2 4l6 4 6-4M2 4v8h12V4H2z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
              Liên Hệ Ngay
            </Link>
            <a className="btn btn--outline" href="/cv.pdf" target="_blank" rel="noopener" aria-label="Tải CV PDF">
              CV PDF
            </a>
          </div>
          <div className="hero__stats" ref={statsRef} aria-label="Chỉ số chính">
            <div className="stat-item" aria-label="Dự án hoàn thành">
              <span className="stat-number" data-animated={statsInView}>{projCount}<span className="plus">+</span></span>
              <span className="stat-label">Dự án</span>
            </div>
            <div className="stat-item" aria-label="Số năm kinh nghiệm">
              <span className="stat-number" data-animated={statsInView}>{yearCount}<span className="plus">+</span></span>
              <span className="stat-label">Năm kinh nghiệm</span>
            </div>
            <div className="stat-item" aria-label="Mức độ hài lòng khách hàng">
              <span className="stat-number" data-animated={statsInView}>{satCount}<span className="percent">%</span></span>
              <span className="stat-label">Hài lòng</span>
            </div>
          </div>

          <div className="hero__scroll" onClick={() => {
            window.scrollTo({ top: window.innerHeight, behavior: 'smooth' });
          }} aria-label="Cuộn xuống">
            <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
              <path d="M10 15V5m0 10l-4-4m4 4l4-4" 
                stroke="currentColor" 
                strokeWidth="2" 
                strokeLinecap="round" 
                strokeLinejoin="round"/>
            </svg>
          </div>
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
