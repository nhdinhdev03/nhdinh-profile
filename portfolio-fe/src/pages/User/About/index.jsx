import React, { useEffect, useMemo, useRef, useState } from "react";
import PropTypes from "prop-types";
import "./Sections.scss";


const cx = (...cls) => cls.filter(Boolean).join(" ");


function useInView(options = {}) {
  const ref = useRef(null);
  const [inView, setInView] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el || inView) return;
    const obs = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setInView(true);
          obs.unobserve(el);
        }
      },
      { rootMargin: "0px 0px -10% 0px", threshold: 0.15, ...options }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, [inView, options]);

  return [ref, inView];
}

// Generic Reveal wrapper to add animation classes when in view
function Reveal(props) {
  const { as: Tag = "div", className = "", children, ...rest } = props;
  const [ref, inView] = useInView();
  return (
    <Tag
      ref={ref}
      className={cx("reveal", inView && "in-view", className)}
      {...rest}
    >
      {children}
    </Tag>
  );
}

Reveal.propTypes = {
  as: PropTypes.elementType,
  className: PropTypes.string,
  children: PropTypes.node,
};

// Static content moved outside to avoid re-creation per render
const PROFESSIONAL_STATS = [
  { value: "3+", label: "Năm kinh nghiệm", icon: "💼" },
  { value: "15+", label: "Dự án bàn giao", icon: "🚀" },
  { value: "99.9%", label: "Tỉ lệ uptime", icon: "⚡" },
  { value: "4", label: "Chứng chỉ", icon: "🏆" },
];

function About() {
  // Memoize static data so references remain stable
  const professionalStats = useMemo(() => PROFESSIONAL_STATS, []);

  return (
    <section
      id="about"
      className="about-hero about-professional"
      aria-labelledby="about-title"
    >
      <div className="hero__bg" aria-hidden="true" />
      <div className="containers">
        <header className="section-head">
          <div>
            <h2 id="about-title" className="section-title">
              Giới thiệu
            </h2>
            <p className="section-subtitle" aria-describedby="about-title">
              Tóm tắt năng lực & thế mạnh nổi bật
            </p>
          </div>
          <div className="availability-badge" aria-live="polite">
            <span className="status-dot" aria-hidden="true"></span>
            <span>Đang sẵn sàng nhận dự án</span>
          </div>
        </header>
        <div className="gradient-line" aria-hidden="true" />

        {/* Thống kê nổi bật */}
        <ul className="professional-stats" aria-label="Thống kê chuyên môn">
          {professionalStats.map((stat, i) => (
            <Reveal
              as="li"
              className="stat-card"
              key={stat.label}
              style={{ transitionDelay: `${i * 60}ms` }}
              aria-label={`${stat.label}: ${stat.value}`}
            >
              <div className="stat-icon" aria-hidden="true">
                {stat.icon}
              </div>
              <div className="stat-value">{stat.value}</div>
              <div className="stat-label">{stat.label}</div>
            </Reveal>
          ))}
        </ul>

        {/* Main Content Grid */}
        <div className="about-grid">
          {/* Profile Card */}

          {/* README-style About Me Card */}
          <Reveal
            as="section"
            className="readme-about-card"
            aria-labelledby="readme-about-heading"
          >
            <h3 id="readme-about-heading">About Me</h3>
            <div className="intro-hero">
              <div className="hero-title">
                👋 Hi, I'm{" "}
                <span className="name-highlight">Nguyễn Hoàng Dinh</span>
              </div>
              <div className="hero-subtitle">
                Full-Stack Developer (Front-end & Back-end) · Vietnam
              </div>
              <p className="hero-lead">
                <strong>Building future-ready web products</strong> — from
                concept to scalable production.
              </p>
              <p className="hero-detail">
                I'm a full-stack developer who enjoys turning ideas into
                polished products. I specialize in JavaScript/TypeScript on the
                front-end and API development on the back-end. I love learning
                new technologies, designing clean architectures, and optimizing
                user experiences. When I'm not coding, I'm exploring system
                design and improving DevOps skills.
              </p>
            </div>

            <div className="readme-sections">
              <div className="tech-category">
                <h4>Front-End</h4>
                <div className="tech-badges">
                  <a href="https://react.dev" target="_blank" rel="noreferrer">
                    <img
                      src="https://skillicons.dev/icons?i=react"
                      alt="React"
                      loading="lazy"
                      decoding="async"
                    />
                  </a>
                  <a href="https://angular.io" target="_blank" rel="noreferrer">
                    <img
                      src="https://skillicons.dev/icons?i=angular"
                      alt="Angular"
                      loading="lazy"
                      decoding="async"
                    />
                  </a>
                  <a
                    href="https://www.typescriptlang.org"
                    target="_blank"
                    rel="noreferrer"
                  >
                    <img
                      src="https://skillicons.dev/icons?i=ts"
                      alt="TypeScript"
                      loading="lazy"
                      decoding="async"
                    />
                  </a>
                  <a
                    href="https://tailwindcss.com"
                    target="_blank"
                    rel="noreferrer"
                  >
                    <img
                      src="https://skillicons.dev/icons?i=tailwind"
                      alt="Tailwind"
                      loading="lazy"
                      decoding="async"
                    />
                  </a>
                  <a
                    href="https://sass-lang.com"
                    target="_blank"
                    rel="noreferrer"
                  >
                    <img
                      src="https://skillicons.dev/icons?i=sass"
                      alt="Sass"
                      loading="lazy"
                      decoding="async"
                    />
                  </a>
                  <a
                    href="https://getbootstrap.com"
                    target="_blank"
                    rel="noreferrer"
                  >
                    <img
                      src="https://skillicons.dev/icons?i=bootstrap"
                      alt="Bootstrap"
                      loading="lazy"
                      decoding="async"
                    />
                  </a>
                </div>
              </div>
              <div className="tech-category">
                <h4>Back-End</h4>
                <div className="tech-badges">
                  <a href="https://nodejs.org" target="_blank" rel="noreferrer">
                    <img
                      src="https://skillicons.dev/icons?i=nodejs"
                      alt="Node.js"
                      loading="lazy"
                      decoding="async"
                    />
                  </a>
                  <a href="https://spring.io" target="_blank" rel="noreferrer">
                    <img
                      src="https://skillicons.dev/icons?i=spring"
                      alt="Spring"
                      loading="lazy"
                      decoding="async"
                    />
                  </a>
                  <a href="https://go.dev" target="_blank" rel="noreferrer">
                    <img
                      src="https://skillicons.dev/icons?i=go"
                      alt="Go"
                      loading="lazy"
                      decoding="async"
                    />
                  </a>
                  <a
                    href="https://www.java.com"
                    target="_blank"
                    rel="noreferrer"
                  >
                    <img
                      src="https://skillicons.dev/icons?i=java"
                      alt="Java"
                      loading="lazy"
                      decoding="async"
                    />
                  </a>
                  <a
                    href="https://en.wikipedia.org/wiki/C_(programming_language)"
                    target="_blank"
                    rel="noreferrer"
                  >
                    <img
                      src="https://skillicons.dev/icons?i=c"
                      alt="C"
                      loading="lazy"
                      decoding="async"
                    />
                  </a>
                </div>
              </div>
              <div className="tech-category">
                <h4>Databases & DevOps</h4>
                <div className="tech-badges">
                  <a
                    href="https://www.mysql.com"
                    target="_blank"
                    rel="noreferrer"
                  >
                    <img
                      src="https://skillicons.dev/icons?i=mysql"
                      alt="MySQL"
                      loading="lazy"
                      decoding="async"
                    />
                  </a>
                  <a
                    href="https://www.microsoft.com/sql-server"
                    target="_blank"
                    rel="noreferrer"
                  >
                    <img
                      src="https://upload.wikimedia.org/wikipedia/it/2/23/Sql_server_logo.png"
                      alt="SQL Server"
                      height="36"
                      loading="lazy"
                      decoding="async"
                    />
                  </a>
                  <a
                    href="https://www.docker.com"
                    target="_blank"
                    rel="noreferrer"
                  >
                    <img
                      src="https://skillicons.dev/icons?i=docker"
                      alt="Docker"
                      loading="lazy"
                      decoding="async"
                    />
                  </a>
                  <a
                    href="https://git-scm.com"
                    target="_blank"
                    rel="noreferrer"
                  >
                    <img
                      src="https://skillicons.dev/icons?i=git"
                      alt="Git"
                      loading="lazy"
                      decoding="async"
                    />
                  </a>
                  <a
                    href="https://www.figma.com"
                    target="_blank"
                    rel="noreferrer"
                  >
                    <img
                      src="https://skillicons.dev/icons?i=figma"
                      alt="Figma"
                      loading="lazy"
                      decoding="async"
                    />
                  </a>
                  <a
                    href="https://www.adobe.com/products/photoshop.html"
                    target="_blank"
                    rel="noreferrer"
                  >
                    <img
                      src="https://skillicons.dev/icons?i=ps"
                      alt="Photoshop"
                      loading="lazy"
                      decoding="async"
                    />
                  </a>
                </div>
              </div>
            </div>

            <div className="contact-links">
              <a className="btn" href="mailto:nhdinh.dev03@gmail.com">
                Email
              </a>
              <a
                className="btn"
                href="https://fb.com/nhdinh03"
                target="_blank"
                rel="noreferrer"
              >
                Facebook
              </a>
              <a
                className="btn"
                href="https://instagram.com/nhdinhdz"
                target="_blank"
                rel="noreferrer"
              >
                Instagram
              </a>
              <a
                className="btn"
                href="https://www.tiktok.com/@nhdinh.dev03"
                target="_blank"
                rel="noreferrer"
              >
                TikTok
              </a>
              <a
                className="btn"
                href="https://discord.gg/6UbbDqKKQN"
                target="_blank"
                rel="noreferrer"
              >
                Discord
              </a>
            </div>
          </Reveal>

          {/* GitHub Profile Card */}
          <Reveal
            as="section"
            className="github-card"
            aria-labelledby="github-heading"
          >
            <h3 id="github-heading">GitHub Profile</h3>
            <div className="github-grid">
              <figure className="gh-item">
                <img
                  src="https://github-readme-activity-graph.vercel.app/graph?username=nhdinhdev03&theme=react-dark&hide_border=true"
                  alt="Biểu đồ hoạt động GitHub — nhdinhdev03"
                  width="600"
                  height="180"
                  loading="lazy"
                  decoding="async"
                />
                <figcaption>Biểu đồ đóng góp</figcaption>
              </figure>
              <figure className="gh-item">
                <img
                  src="https://github-readme-stats.vercel.app/api/top-langs/?username=nhdinhdev03&layout=compact&theme=tokyonight&hide_border=true&langs_count=10"
                  alt="Ngôn ngữ hàng đầu"
                  width="600"
                  height="180"
                  loading="lazy"
                  decoding="async"
                />
                <figcaption>Top Languages</figcaption>
              </figure>
            </div>
            <div className="gh-links">
              <a
                className="btn"
                href="https://github.com/nhdinhdev03"
                target="_blank"
                rel="noreferrer"
              >
                Xem GitHub
              </a>
              <a className="btn" href="mailto:nhdinh.dev03@gmail.com">
                Liên hệ
              </a>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
export default React.memo(About);

About.propTypes = {
  summary: PropTypes.string,
  strengths: PropTypes.arrayOf(PropTypes.string),
  interests: PropTypes.arrayOf(PropTypes.string),
  achievements: PropTypes.arrayOf(PropTypes.string),
  skills: PropTypes.arrayOf(PropTypes.string),
  avatarUrl: PropTypes.string,
  showcaseImage: PropTypes.string,
};
