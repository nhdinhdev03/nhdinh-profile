import React, { useEffect, useMemo, useRef, useState } from "react";
import PropTypes from "prop-types";
import "./Sections.scss";
import { Link } from "react-router-dom";
import { ROUTES } from "router/routeConstants";


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
// Now aligned to live GitHub stats: Followers, Repositories, Stars, Gists
const PROFESSIONAL_STATS = [
  { id: "followers", value: "-", label: "Followers", icon: "�" },
  { id: "repos", value: "-", label: "Repositories", icon: "🚀" },
  { id: "stars", value: "-", label: "Stars", icon: "⭐" },
  { id: "gists", value: "-", label: "Gists", icon: "🧩" },
];

// (removed) useGithubRepoCount — replaced by useGithubUser to avoid duplicate fetches

// Fetch GitHub user object (followers, gists, etc.)
function useGithubUser(username = "nhdinhdev03") {
  const [user, setUser] = useState(null);
  useEffect(() => {
    const ctrl = new AbortController();
    let ignore = false;
    async function load() {
      try {
        const res = await fetch(`https://api.github.com/users/${username}`,
          { signal: ctrl.signal, headers: { Accept: "application/vnd.github+json" } }
        );
        if (!res.ok) throw new Error(`GitHub API ${res.status}`);
        const data = await res.json();
        if (!ignore) setUser(data);
      } catch (e) {
        if (e.name !== "AbortError" && !ignore) setUser(null);
      }
    }
    load();
    return () => { ignore = true; ctrl.abort(); };
  }, [username]);
  return user;
}

// Simple in-memory cache for repos to avoid duplicate fetches across components
const __reposCache = new Map(); // key: username, value: Promise<repos[]>

async function fetchUserReposCached(username, signal) {
  if (__reposCache.has(username)) return __reposCache.get(username);
  const p = (async () => {
    const res = await fetch(
      `https://api.github.com/users/${username}/repos?per_page=100&sort=updated`,
      { signal, headers: { Accept: "application/vnd.github+json" } }
    );
    if (!res.ok) throw new Error(`GitHub API ${res.status}`);
    const data = await res.json();
    return Array.isArray(data) ? data : [];
  })();
  __reposCache.set(username, p);
  return p;
}

// Sum stargazers across public repos
function useGithubStarsTotal(username = "nhdinhdev03") {
  const [stars, setStars] = useState(null);
  useEffect(() => {
    const ctrl = new AbortController();
    let ignore = false;
    (async () => {
      try {
        setStars(null);
        const repos = await fetchUserReposCached(username, ctrl.signal);
        const total = repos.reduce((acc, r) => acc + (r.stargazers_count || 0), 0);
        if (!ignore) setStars(total);
      } catch (e) {
        if (e.name !== "AbortError" && !ignore) setStars(null);
      }
    })();
    return () => { ignore = true; ctrl.abort(); };
  }, [username]);
  return stars;
}

// Lightweight GitHub Projects widget
function GitHubProjects({ username = "nhdinhdev03", max = 6 }) {
  const [repos, setRepos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const ctrl = new AbortController();
    async function load() {
      try {
        setLoading(true);
        setError("");
  const data = await fetchUserReposCached(username, ctrl.signal);
        const filtered = data
          .filter((r) => !r.archived && !r.disabled)
          .sort((a, b) =>
            (b.stargazers_count - a.stargazers_count) ||
            new Date(b.updated_at) - new Date(a.updated_at)
          )
          .slice(0, max);
        setRepos(filtered);
      } catch (e) {
        if (e.name !== "AbortError") setError("Không tải được dự án từ GitHub.");
      } finally {
        setLoading(false);
      }
    }
    load();
    return () => ctrl.abort();
  }, [username, max]);

  const placeholders = Array.from({ length: max });

  return (
    <Reveal as="section" className="projects-card" aria-labelledby="projects-heading">
      {/* <h3 id="projects-heading">Dự án GitHub</h3> */}
      {error && (
        <p className="summary-text">
          {error} <a className="btn" href={`https://github.com/${username}`} target="_blank" rel="noreferrer">Mở GitHub</a>
        </p>
      )}
      <ul className="repo-grid" aria-label="Danh sách dự án GitHub">
        {loading && placeholders.map((_, i) => (
          <li key={i} className="repo-card skeleton" aria-hidden="true" />
        ))}

        {!loading && repos.map((repo, i) => (
          <Reveal
            key={repo.id}
            as="li"
            className="repo-card"
            style={{ transitionDelay: `${i * 50}ms` }}
          >
            <div className="repo-name">
              <a href={repo.html_url} target="_blank" rel="noreferrer" title={repo.full_name}>
                {repo.name}
              </a>
            </div>
            {repo.description && <p className="repo-desc">{repo.description}</p>}
            <div className="repo-meta">
              {repo.language && <span className="chip">{repo.language}</span>}
              <span className="chip">★ {repo.stargazers_count}</span>
              <span className="chip">⑂ {repo.forks_count}</span>
              <span className="chip" title={repo.updated_at}>Cập nhật {new Date(repo.updated_at).toLocaleDateString()}</span>
            </div>
          </Reveal>
        ))}
      </ul>
    </Reveal>
  );
}

GitHubProjects.propTypes = {
  username: PropTypes.string,
  max: PropTypes.number,
};

function About() {
  // Memoize static data so references remain stable
  const professionalStats = useMemo(() => PROFESSIONAL_STATS, []);
  const ghUser = useGithubUser("nhdinhdev03");
  const ghStars = useGithubStarsTotal("nhdinhdev03");
  const displayedStats = useMemo(() => {
    return professionalStats.map((s) => {
      let value = s.value;
      switch (s.id) {
        case "followers":
          value = ghUser && typeof ghUser.followers === "number" ? String(ghUser.followers) : s.value;
          break;
        case "repos":
          value = ghUser && typeof ghUser.public_repos === "number" ? String(ghUser.public_repos) : s.value;
          break;
        case "stars":
          value = typeof ghStars === "number" ? String(ghStars) : s.value;
          break;
        case "gists":
          value = ghUser && typeof ghUser.public_gists === "number" ? String(ghUser.public_gists) : s.value;
          break;
        default:
          break;
      }
      return { ...s, value };
    });
  }, [professionalStats, ghUser, ghStars]);

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
       
        </header>
        <div className="gradient-line" aria-hidden="true" />

        {/* Thống kê nổi bật */}
        <ul className="professional-stats" aria-label="Thống kê chuyên môn">
      {displayedStats.map((stat, i) => (
            <Reveal
              as="li"
              className="stat-card"
        key={stat.id}
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
            {/* <h3 id="readme-about-heading">About Me</h3> */}
            <div className="readme-grid">
              <div className="intro-col">
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
                        <img src="https://skillicons.dev/icons?i=react" alt="React" loading="lazy" decoding="async" />
                      </a>
                      <a href="https://angular.io" target="_blank" rel="noreferrer">
                        <img src="https://skillicons.dev/icons?i=angular" alt="Angular" loading="lazy" decoding="async" />
                      </a>
                      <a href="https://www.typescriptlang.org" target="_blank" rel="noreferrer">
                        <img src="https://skillicons.dev/icons?i=ts" alt="TypeScript" loading="lazy" decoding="async" />
                      </a>
                      <a href="https://tailwindcss.com" target="_blank" rel="noreferrer">
                        <img src="https://skillicons.dev/icons?i=tailwind" alt="Tailwind" loading="lazy" decoding="async" />
                      </a>
                      <a href="https://sass-lang.com" target="_blank" rel="noreferrer">
                        <img src="https://skillicons.dev/icons?i=sass" alt="Sass" loading="lazy" decoding="async" />
                      </a>
                      <a href="https://getbootstrap.com" target="_blank" rel="noreferrer">
                        <img src="https://skillicons.dev/icons?i=bootstrap" alt="Bootstrap" loading="lazy" decoding="async" />
                      </a>
                    </div>
                  </div>
                  <div className="tech-category">
                    <h4>Back-End</h4>
                    <div className="tech-badges">
                      <a href="https://nodejs.org" target="_blank" rel="noreferrer">
                        <img src="https://skillicons.dev/icons?i=nodejs" alt="Node.js" loading="lazy" decoding="async" />
                      </a>
                      <a href="https://spring.io" target="_blank" rel="noreferrer">
                        <img src="https://skillicons.dev/icons?i=spring" alt="Spring" loading="lazy" decoding="async" />
                      </a>
                      <a href="https://go.dev" target="_blank" rel="noreferrer">
                        <img src="https://skillicons.dev/icons?i=go" alt="Go" loading="lazy" decoding="async" />
                      </a>
                      <a href="https://www.java.com" target="_blank" rel="noreferrer">
                        <img src="https://skillicons.dev/icons?i=java" alt="Java" loading="lazy" decoding="async" />
                      </a>
                      <a href="https://en.wikipedia.org/wiki/C_(programming_language)" target="_blank" rel="noreferrer">
                        <img src="https://skillicons.dev/icons?i=c" alt="C" loading="lazy" decoding="async" />
                      </a>
                    </div>
                  </div>
                  <div className="tech-category">
                    <h4>Databases & DevOps</h4>
                    <div className="tech-badges">
                      <a href="https://www.mysql.com" target="_blank" rel="noreferrer">
                        <img src="https://skillicons.dev/icons?i=mysql" alt="MySQL" loading="lazy" decoding="async" />
                      </a>
                      <a href="https://www.microsoft.com/sql-server" target="_blank" rel="noreferrer">
                        <img src="https://upload.wikimedia.org/wikipedia/it/2/23/Sql_server_logo.png" alt="SQL Server" height="36" loading="lazy" decoding="async" />
                      </a>
                      <a href="https://www.docker.com" target="_blank" rel="noreferrer">
                        <img src="https://skillicons.dev/icons?i=docker" alt="Docker" loading="lazy" decoding="async" />
                      </a>
                      <a href="https://git-scm.com" target="_blank" rel="noreferrer">
                        <img src="https://skillicons.dev/icons?i=git" alt="Git" loading="lazy" decoding="async" />
                      </a>
                      <a href="https://www.figma.com" target="_blank" rel="noreferrer">
                        <img src="https://skillicons.dev/icons?i=figma" alt="Figma" loading="lazy" decoding="async" />
                      </a>
                      <a href="https://www.adobe.com/products/photoshop.html" target="_blank" rel="noreferrer">
                        <img src="https://skillicons.dev/icons?i=ps" alt="Photoshop" loading="lazy" decoding="async" />
                      </a>
                    </div>
                  </div>
                </div>
              </div>

              <aside className="aside-col" aria-label="Thông tin nhanh">
                <div className="mini-card">
                  <h4>Thông tin nhanh</h4>
                  <ul className="mini-list">
                    <li>📍 Hồ Chí Minh, Việt Nam</li>
                    <li>💼 Full-Stack Developer</li>
                    <li>✅ Sẵn sàng nhận dự án</li>
                  </ul>
                </div>
                <div className="mini-card">
                  <h4>Liên hệ</h4>
                  <div className="contact-links">
                    <Link className="btn primary" to={ROUTES.CONTACT}>Liên hệ hợp tác</Link>
                    <a className="btn" href="https://fb.com/nhdinh03" target="_blank" rel="noreferrer">Facebook</a>
                    <a className="btn" href="https://instagram.com/nhdinhdz" target="_blank" rel="noreferrer">Instagram</a>
                    <a className="btn" href="https://www.tiktok.com/@nhdinh.dev03" target="_blank" rel="noreferrer">TikTok</a>
                    <a className="btn" href="https://discord.gg/6UbbDqKKQN" target="_blank" rel="noreferrer">Discord</a>
                  </div>
                </div>
              </aside>
            </div>
          </Reveal>

          {/* GitHub Profile Card */}
          <Reveal
            as="section"
            className="github-card"
            aria-labelledby="github-heading"
          >
            {/* <h3 id="github-heading">GitHub Profile</h3> */}
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

          {/* GitHub Projects List */}
          <GitHubProjects username="nhdinhdev03" max={6} />
        </div>
      </div>
    </section>
  );
}
export default About;
