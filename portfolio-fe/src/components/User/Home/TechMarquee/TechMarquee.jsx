import React, { useEffect, useRef, useState, useMemo, useCallback } from "react";
import "./TechMarquee.scss";
import useIsMobile from "hooks/useIsMobile";

// Inline SVG logos with React.memo for performance
const Logo = React.memo(({ type }) => {
  switch (type) {
    case "react":
      return (
        <svg viewBox="0 0 64 64" aria-hidden="true">
          <circle cx="32" cy="32" r="5" fill="#61dafb" />
          <g stroke="#61dafb" strokeWidth="3" fill="none">
            <ellipse rx="22" ry="8" cx="32" cy="32" />
            <ellipse
              rx="22"
              ry="8"
              cx="32"
              cy="32"
              transform="rotate(60 32 32)"
            />
            <ellipse
              rx="22"
              ry="8"
              cx="32"
              cy="32"
              transform="rotate(120 32 32)"
            />
          </g>
        </svg>
      );
    case "ts":
      return (
        <svg viewBox="0 0 64 64" aria-hidden="true">
          <rect width="64" height="64" rx="12" fill="#3178c6" />
          <text
            x="50%"
            y="55%"
            textAnchor="middle"
            fontSize="30"
            fontFamily="inherit"
            fill="#fff"
            fontWeight="700"
          >
            TS
          </text>
        </svg>
      );
    case "node":
      return (
        <svg viewBox="0 0 64 64" aria-hidden="true">
          <path d="M32 4 8 16v32l24 12 24-12V16L32 4Z" fill="#3c873a" />
          <path
            d="M32 10.8 14 19v26l18 9.2 18-9.2V19L32 10.8Z"
            fill="#fff"
            opacity=".1"
          />
        </svg>
      );
    case "docker":
      return (
        <svg viewBox="0 0 64 64" aria-hidden="true">
          <rect x="8" y="30" width="10" height="10" fill="#2496ed" />
          <rect x="20" y="30" width="10" height="10" fill="#2496ed" />
          <rect x="32" y="30" width="10" height="10" fill="#2496ed" />
          <rect x="20" y="18" width="10" height="10" fill="#2496ed" />
          <rect x="32" y="18" width="10" height="10" fill="#2496ed" />
          <path
            d="M6 42h52c0 8-8 14-20 14H26C14 56 6 50 6 42Z"
            fill="#2496ed"
          />
        </svg>
      );
    case "graphql":
      return (
        <svg viewBox="0 0 64 64" aria-hidden="true">
          <circle cx="12" cy="20" r="6" fill="#e10098" />
          <circle cx="52" cy="20" r="6" fill="#e10098" />
          <circle cx="12" cy="44" r="6" fill="#e10098" />
          <circle cx="52" cy="44" r="6" fill="#e10098" />
          <circle cx="32" cy="8" r="6" fill="#e10098" />
          <circle cx="32" cy="56" r="6" fill="#e10098" />
          <path
            stroke="#e10098"
            strokeWidth="4"
            fill="none"
            d="M32 14 52 20 32 50 12 44 32 14 12 20 32 56 52 44 32 8"
          />
        </svg>
      );
    case "mongo":
      return (
        <svg viewBox="0 0 64 64" aria-hidden="true">
          <path
            d="M32 6s-4 10-4 20 4 24 4 24 4-14 4-24-4-20-4-20Z"
            fill="#13aa52"
          />
          <path d="M32 50v8" stroke="#147d3f" strokeWidth="4" />
        </svg>
      );
    case "postgres":
      return (
        <svg viewBox="0 0 64 64" aria-hidden="true">
          <rect width="64" height="64" rx="14" fill="#336791" />
          <path
            d="M20 44c0-10 4-20 12-20s12 10 12 20"
            stroke="#fff"
            strokeWidth="4"
            fill="none"
          />
          <circle cx="32" cy="28" r="6" fill="#fff" />
        </svg>
      );
    case "redis":
      return (
        <svg viewBox="0 0 64 64" aria-hidden="true">
          <path d="M8 22 32 12l24 10-24 10L8 22Z" fill="#d82c20" />
          <path d="M8 32 32 22l24 10-24 10L8 32Z" fill="#a81f15" />
          <path d="M8 42 32 32l24 10-24 10L8 42Z" fill="#d82c20" />
        </svg>
      );
    case "tailwind":
      return (
        <svg viewBox="0 0 64 64" aria-hidden="true">
          <path
            d="M20 34c2-8 8-12 16-10 5 1 8 4 10 8 2-8-2-18-14-20-12-2-20 6-22 18 3-2 6-2 10 4Z"
            fill="#38bdf8"
          />
          <path
            d="M44 30c-2 8-8 12-16 10-5-1-8-4-10-8-2 9 2 19 14 21 12 2 20-6 22-18-3 2-6 2-10-5Z"
            fill="#0ea5e9"
          />
        </svg>
      );
    case "aws":
      return (
        <svg viewBox="0 0 64 64" aria-hidden="true">
          <rect width="64" height="64" rx="12" fill="#232f3e" />
          <path
            d="M16 34c0-8 4-14 10-14s10 6 10 14-4 14-10 14-10-6-10-14Z"
            stroke="#fff"
            strokeWidth="4"
            fill="none"
          />
          <path
            d="M36 46c8 2 14 0 20-4"
            stroke="#ff9900"
            strokeWidth="4"
            strokeLinecap="round"
          />
        </svg>
      );
    case "javascript":
      return (
        <svg viewBox="0 0 64 64" aria-hidden="true">
          <rect width="64" height="64" rx="8" fill="#f7df1e" />
          <text
            x="50%"
            y="60%"
            textAnchor="middle"
            fontSize="32"
            fontFamily="inherit"
            fill="#000"
            fontWeight="700"
          >
            JS
          </text>
        </svg>
      );
    case "python":
      return (
        <svg viewBox="0 0 64 64" aria-hidden="true">
          <path
            d="M20 10h24c8 0 12 4 12 12v20c0 8-4 12-12 12H32v-8h12c4 0 6-2 6-6V22c0-4-2-6-6-6H20c-4 0-6 2-6 6v6h-8V22c0-8 4-12 12-12Z"
            fill="#3776ab"
          />
          <path
            d="M44 54H20c-8 0-12-4-12-12V22c0-8 4-12 12-12h12v8H20c-4 0-6 2-6 6v20c0 4 2 6 6 6h24c4 0 6-2 6-6v-6h8v6c0 8-4 12-12 12Z"
            fill="#ffd43b"
          />
        </svg>
      );
    case "git":
      return (
        <svg viewBox="0 0 64 64" aria-hidden="true">
          <path
            d="M60.4 29.6 34.4 3.6c-1.6-1.6-4.2-1.6-5.8 0L23.8 8.4l6.8 6.8c1.7-.6 3.6-.2 4.9 1.1 1.3 1.3 1.7 3.2 1.1 4.9l6.6 6.6c1.7-.6 3.6-.2 4.9 1.1 1.9 1.9 1.9 4.9 0 6.8-1.9 1.9-4.9 1.9-6.8 0-1.4-1.4-1.7-3.4-1-5.1l-6.1-6.1v16.1c.5.2.9.6 1.3 1 1.9 1.9 1.9 4.9 0 6.8-1.9 1.9-4.9 1.9-6.8 0-1.9-1.9-1.9-4.9 0-6.8.5-.5 1-.8 1.6-1V21.7c-.6-.2-1.1-.5-1.6-1-1.4-1.4-1.7-3.4-1-5.1L15.6 8.4 3.6 20.4c-1.6 1.6-1.6 4.2 0 5.8l26 26c1.6 1.6 4.2 1.6 5.8 0l25.8-25.8c1.6-1.6 1.6-4.2 0-5.8Z"
            fill="#f05032"
          />
        </svg>
      );
    case "express":
      return (
        <svg viewBox="0 0 64 64" aria-hidden="true">
          <rect width="64" height="64" rx="8" fill="#000" />
          <text
            x="50%"
            y="40%"
            textAnchor="middle"
            fontSize="12"
            fontFamily="monospace"
            fill="#fff"
            fontWeight="700"
          >
            Express
          </text>
          <path d="M8 48h48M8 38h32M8 28h40" stroke="#fff" strokeWidth="2" />
        </svg>
      );
    case "nestjs":
      return (
        <svg viewBox="0 0 64 64" aria-hidden="true">
          <rect width="64" height="64" rx="8" fill="#e0234e" />
          <path d="M32 12L20 24v16l12 12 12-12V24L32 12z" fill="#fff" />
          <circle cx="32" cy="32" r="8" fill="#e0234e" />
        </svg>
      );
    case "mysql":
      return (
        <svg viewBox="0 0 64 64" aria-hidden="true">
          <rect width="64" height="64" rx="8" fill="#4479a1" />
          <path d="M16 20h32v24H16z" fill="#fff" />
          <text
            x="50%"
            y="55%"
            textAnchor="middle"
            fontSize="10"
            fontFamily="inherit"
            fill="#fff"
            fontWeight="700"
          >
            MySQL
          </text>
        </svg>
      );
    case "firebase":
      return (
        <svg viewBox="0 0 64 64" aria-hidden="true">
          <path d="M16 44l8-32 8 16 16-20-16 36H16z" fill="#ffca28" />
          <path d="M32 28l8-16 8 32H32z" fill="#ffa000" />
          <circle cx="32" cy="50" r="6" fill="#ff6f00" />
        </svg>
      );
    case "nextjs":
      return (
        <svg viewBox="0 0 64 64" aria-hidden="true">
          <circle cx="32" cy="32" r="28" fill="#000" />
          <path d="M20 20h24v24H20z" fill="#fff" />
          <text
            x="50%"
            y="55%"
            textAnchor="middle"
            fontSize="8"
            fontFamily="inherit"
            fill="#fff"
            fontWeight="700"
          >
            NEXT
          </text>
        </svg>
      );
    case "vue":
      return (
        <svg viewBox="0 0 64 64" aria-hidden="true">
          <path d="M32 8L16 40h32L32 8z" fill="#4fc08d" />
          <path d="M32 8L24 24 32 40 40 24 32 8z" fill="#34495e" />
        </svg>
      );
    case "angular":
      return (
        <svg viewBox="0 0 64 64" aria-hidden="true">
          <path d="M32 4L8 16l4 36 20 8 20-8 4-36L32 4z" fill="#dd0031" />
          <path d="M32 4v56l20-8 4-36L32 4z" fill="#c3002f" />
          <path d="M32 12L20 44h8l2-6h12l2 6h8L32 12z" fill="#fff" />
        </svg>
      );
    case "sass":
      return (
        <svg viewBox="0 0 64 64" aria-hidden="true">
          <circle cx="32" cy="32" r="28" fill="#cf649a" />
          <path d="M24 40c4-8 12-8 16 0s-4 12-8 8-4-4-8-8z" fill="#fff" />
        </svg>
      );
    case "webpack":
      return (
        <svg viewBox="0 0 64 64" aria-hidden="true">
          <rect width="64" height="64" rx="8" fill="#8dd6f9" />
          <path d="M32 16L16 32l16 16 16-16L32 16z" fill="#1c78c0" />
          <path d="M32 24v16l8-8-8-8z" fill="#fff" />
        </svg>
      );
    case "vite":
      return (
        <svg viewBox="0 0 64 64" aria-hidden="true">
          <path d="M32 4L8 28l24 32 24-32L32 4z" fill="#646cff" />
          <path d="M32 12L20 32l12 20 12-20L32 12z" fill="#ffd028" />
        </svg>
      );
    default:
      return null;
  }
});

const LOGOS = [
  { key: "react", label: "React" },
  { key: "ts", label: "TypeScript" },
  { key: "javascript", label: "JavaScript" },
  { key: "node", label: "Node.js" },
  { key: "express", label: "Express.js" },
  { key: "nestjs", label: "NestJS" },
  { key: "nextjs", label: "Next.js" },
  { key: "vue", label: "Vue.js" },
  { key: "angular", label: "Angular" },
  { key: "docker", label: "Docker" },
  { key: "graphql", label: "GraphQL" },
  { key: "mongo", label: "MongoDB" },
  { key: "postgres", label: "PostgreSQL" },
  { key: "mysql", label: "MySQL" },
  { key: "redis", label: "Redis" },
  { key: "firebase", label: "Firebase" },
  { key: "aws", label: "AWS" },
  { key: "git", label: "Git" },
  { key: "tailwind", label: "TailwindCSS" },
  { key: "sass", label: "Sass" },
  { key: "webpack", label: "Webpack" },
  { key: "vite", label: "Vite" },
  { key: "python", label: "Python" },
];

function TechMarquee({ direction = "ltr", speed }) {
  const { isMobile } = useIsMobile();
  
  // speed prop now means desired pixels/second (optional override)
  const trackRef = useRef(null);
  const progressRef = useRef(null);
  const [isPaused, setIsPaused] = useState(false);
  const [idx, setIdx] = useState(0);
  const SLIDE_DURATION = isMobile ? 2000 : 3000; // Faster slideshow on mobile
  const marqueeItems = useMemo(() => [...LOGOS, ...LOGOS], []); // duplicate only (seamless loop)

  // Adaptive base speed (px/s) if not provided
  const speedRef = useRef(60);
  useEffect(() => {
    if (typeof speed === "number" && speed > 0) {
      speedRef.current = speed;
      return;
    }
    const w = window.innerWidth;
    speedRef.current =
      w > 1400 ? 90 : w > 1100 ? 75 : w > 900 ? 65 : w > 600 ? 55 : 45;
  }, [speed]);

  // Pixel based RAF animation
  useEffect(() => {
    const track = trackRef.current;
    if (!track) return;
    let pos = 0; // translateX in px (negative for left movement)
    let last = performance.now();
    let cycleWidth = 0; // width of one copy

    const measure = () => {
      // Since we duplicated once, half of children represent one cycle
      if (!track.children.length) return;
      // Measure width of first half (original set)
      const half = track.children.length / 2;
      let w = 0;
      for (let i = 0; i < half; i++)
        w += track.children[i].getBoundingClientRect().width + 34; // include gap (matches CSS gap)
      cycleWidth = w;
    };
    measure();
    let resizeTO;
    const onResize = () => {
      clearTimeout(resizeTO);
      resizeTO = setTimeout(() => {
        measure();
      }, 120);
    };
    window.addEventListener("resize", onResize);

    const dir = direction === "rtl" ? 1 : -1; // default leftward scroll (ltr means content moves left)

    let rafId;
    const loop = (now) => {
      const dt = now - last;
      last = now;
      if (!isPaused && cycleWidth > 0) {
        pos += dir * (speedRef.current * (dt / 1000));
        // Wrap seamlessly
        if (dir === -1 && pos <= -cycleWidth) pos += cycleWidth;
        if (dir === 1 && pos >= cycleWidth) pos -= cycleWidth;
        track.style.transform = `translate3d(${pos}px,0,0)`;
      }
      rafId = requestAnimationFrame(loop);
    };
    rafId = requestAnimationFrame(loop);
    return () => {
      cancelAnimationFrame(rafId);
      window.removeEventListener("resize", onResize);
    };
  }, [direction, isPaused]);

  const handleMouseEnter = useCallback(() => setIsPaused(true), []);
  const handleMouseLeave = useCallback(() => setIsPaused(false), []);

  // Center slideshow interval
  useEffect(() => {
    const id = setInterval(
      () => setIdx((i) => (i + 1) % LOGOS.length),
      SLIDE_DURATION
    );
    return () => clearInterval(id);
  }, [SLIDE_DURATION]);

  // Progress bar animation (if progress bar CSS added later)
  useEffect(() => {
    let af;
    const start = performance.now();
    const loop = (t) => {
      const el = progressRef.current;
      if (el) {
        const pct = ((t - start) % SLIDE_DURATION) / SLIDE_DURATION;
        el.style.setProperty("--p", pct.toString());
      }
      af = requestAnimationFrame(loop);
    };
    af = requestAnimationFrame(loop);
    return () => cancelAnimationFrame(af);
  }, [SLIDE_DURATION]);

  // Compose classes for marquee section
  const marqueeClasses = [
    "hm-section",
    "marquee",
    direction === "ltr" ? "marquee--ltr" : "marquee--rtl",
    "force-motion",
  ].join(" ");
  const marqueeStyle = {}; // speed handled in JS now

  return (
    <section
      className={marqueeClasses}
      style={marqueeStyle}
      aria-label="Công nghệ sử dụng"
    >
      <div className="container">
        <h2 className="sec-title">Công Nghệ & Công Cụ</h2>
        {/* Fade slideshow (all breakpoints) */}
        <div
          className="logos-slideshow"
          role="list"
          aria-label="Logo công nghệ nổi bật"
        >
          {LOGOS.map((l, i) => (
            <div
              key={l.key}
              className={"logo-slide" + (i === idx ? " active" : "")}
              role="listitem"
              aria-label={l.label}
            >
              <Logo type={l.key} />
              <span className="logo-caption">{l.label}</span>
            </div>
          ))}
          <div className="logo-progress" ref={progressRef} aria-hidden="true" />
        </div>
        {/* Scrolling marquee (băng truyền) */}
        <div
          className="marquee__viewport"
          aria-label="Danh sách công nghệ"
          role="list"
        >
          <div
            className="marquee__track"
            ref={trackRef}
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
          >
            {marqueeItems.map((l, i) => {
              const baseIndex = i % LOGOS.length;
              const active = baseIndex === idx; // sync highlight with big slide
              return (
                <span
                  role="listitem"
                  aria-label={l.label + (active ? " (đang chọn)" : "")}
                  className={`marquee__item marquee__logo${
                    active ? " is-active" : ""
                  }`}
                  key={l.key + "-" + i}
                >
                  <Logo type={l.key} />
                  <span>{l.label}</span>
                </span>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
export default TechMarquee;
