import React from "react";
import PropTypes from "prop-types";
import "./Sections.scss";

function About({
  summary = "Full-Stack Developer với kinh nghiệm xây dựng ứng dụng web hiệu năng cao. Chuyên sâu React/Node.js ecosystem, đam mê tối ưu UX và architecture scalable. Luôn cập nhật công nghệ mới và áp dụng best practices.",
  strengths = ["React/Next.js","TypeScript","Node.js/Spring Boot","PostgreSQL/MongoDB"],
  interests = ["Performance Optimization","Developer Experience","Clean Architecture","Cloud Infrastructure"],
  achievements = [
    "AWS Certified Solutions Architect",
    "Google Cloud Professional Developer", 
    "Top 3 Vietnam Web Awards 2024",
    "Open Source Contributor (1000+ stars)"
  ],
  skills = ["React","Next.js","TypeScript","Node.js","Spring Boot","PostgreSQL","MongoDB","Docker","AWS","Redis"],
  avatarUrl = process.env.PUBLIC_URL + "/logo512.png",
  showcaseImage = "https://images.unsplash.com/photo-1518779578993-ec3579fee39f?q=80&w=1200&auto=format&fit=crop"
}) {
  const professionalStats = [
  { value: "3+", label: "Năm kinh nghiệm", icon: "💼" },
  { value: "15+", label: "Dự án bàn giao", icon: "🚀" },
  { value: "99.9%", label: "Tỉ lệ uptime", icon: "⚡" },
  { value: "4", label: "Chứng chỉ", icon: "🏆" },
  ];

  const timeline = [
    { year: "2024", title: "Senior Full-Stack Developer", company: "Tech Startup", desc: "Leading architecture decisions for microservices platform" },
    { year: "2023", title: "Full-Stack Developer", company: "Digital Agency", desc: "Built 8+ production apps using React/Node.js stack" },
    { year: "2022", title: "Frontend Developer", company: "E-commerce", desc: "Optimized performance, reduced load time by 60%" },
  ];

  const expertise = [
    { category: "Frontend", skills: ["React", "Next.js", "TypeScript", "Tailwind"], level: 95 },
    { category: "Backend", skills: ["Node.js", "Spring Boot", "GraphQL", "REST"], level: 90 },
    { category: "Database", skills: ["PostgreSQL", "MongoDB", "Redis", "Elasticsearch"], level: 85 },
    { category: "DevOps", skills: ["Docker", "AWS", "CI/CD", "Kubernetes"], level: 80 },
  ];

  return (
    <section id="about" className="about-hero about-professional" aria-labelledby="about-title">
      <div className="hero__bg" aria-hidden="true" />
      <div className="containers">
        <header className="section-head">
          <div>
            <h2 id="about-title" className="section-title">Giới thiệu</h2>
            <p className="section-subtitle" aria-describedby="about-title">Tóm tắt năng lực & thế mạnh nổi bật</p>
          </div>
          <div className="availability-badge" aria-live="polite">
            <span className="status-dot" aria-hidden="true"></span>
            <span>Đang sẵn sàng nhận dự án</span>
          </div>
        </header>
        <div className="gradient-line" aria-hidden="true" />

        {/* Thống kê nổi bật */}
        <ul className="professional-stats" aria-label="Thống kê chuyên môn">
          {professionalStats.map((stat) => (
            <li className="stat-card" key={stat.label} aria-label={`${stat.label}: ${stat.value}`}>
              <div className="stat-icon" aria-hidden="true">{stat.icon}</div>
              <div className="stat-value">{stat.value}</div>
              <div className="stat-label">{stat.label}</div>
            </li>
          ))}
        </ul>

        {/* Main Content Grid */}
        <div className="about-grid">
          {/* Profile Card */}
          <section className="profile-card" aria-labelledby="profile-heading">
            <div className="avatar-section">
              <div className="avatar-placeholder" aria-hidden={false}>
                <img className="avatar-img" src={avatarUrl} alt="Ảnh đại diện Nguyen Huu Dinh" loading="lazy" decoding="async" />
              </div>
              <div className="profile-info">
                <h3 id="profile-heading" className="profile-name">Nguyễn Hoàng Đinh</h3>
                <p className="profile-title">Senior Full-Stack Developer</p>
                <div className="profile-location" aria-label="Địa điểm làm việc">📍 Ho Chi Minh City, Vietnam</div>
              </div>
            </div>

            <div className="profile-summary">
              <h4>Tóm tắt nghề nghiệp</h4>
              <p className="summary-text">{summary}</p>

              <div className="core-values">
                <h4>Giá trị cốt lõi</h4>
                <div className="values-grid">
                  <div className="value-item"><span className="value-icon">⚡</span><span>Ưu tiên hiệu năng</span></div>
                  <div className="value-item"><span className="value-icon">🎯</span><span>Lấy người dùng làm trung tâm</span></div>
                  <div className="value-item"><span className="value-icon">🔧</span><span>Mã sạch, dễ bảo trì</span></div>
                  <div className="value-item"><span className="value-icon">📈</span><span>Học hỏi liên tục</span></div>
                </div>
              </div>

              {/* Kỹ năng nổi bật */}
              <div className="skills-cloud" aria-label="Kỹ năng chính">
                {skills.map(skill => (
                  <span className="skill-chip" key={skill}>{skill}</span>
                ))}
              </div>
            </div>
          </section>

          {/* Showcase media image to visually enrich the About section */}
          <section className="media-card" aria-label="Hình ảnh giới thiệu">
            <img src={showcaseImage} alt="Hình ảnh minh hoạ về công việc phát triển phần mềm" loading="lazy" decoding="async" />
          </section>

          {/* Expertise Card */}
          <section className="expertise-card" aria-labelledby="expertise-heading">
            <h3 id="expertise-heading">Chuyên môn kỹ thuật</h3>
            <div className="expertise-list">
              {expertise.map((area) => (
                <div className="expertise-area" key={area.category}>
                  <div className="area-header">
                    <span className="area-name">{area.category}</span>
                    <span className="area-level" aria-label={`Mức độ thành thạo ${area.category}`}>{area.level}%</span>
                  </div>
                  <progress className="progress-native" value={area.level} max={100} aria-label={`Kỹ năng ${area.category}`}></progress>
                  <div className="area-skills">
                    {area.skills.map(skill => (
                      <span className="skill-tag" key={skill}>{skill}</span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* Timeline Card */}
          <section className="timeline-card" aria-labelledby="timeline-heading">
            <h3 id="timeline-heading">Hành trình nghề nghiệp</h3>
            <ul className="timeline" aria-label="Mốc nghề nghiệp">
              {timeline.map((item, index) => (
                <li className="timeline-item" key={`${item.year}-${index}`}>
                  <div className="timeline-marker" aria-hidden="true"></div>
                  <div className="timeline-content">
                    <div className="timeline-year">{item.year}</div>
                    <h4 className="timeline-title">{item.title}</h4>
                    <div className="timeline-company">{item.company}</div>
                    <p className="timeline-desc">{item.desc}</p>
                  </div>
                </li>
              ))}
            </ul>
          </section>

          {/* Achievements Card */}
          <section className="achievements-card" aria-labelledby="achievements-heading">
            <h3 id="achievements-heading">Chứng chỉ & Vinh danh</h3>
            <div className="achievements-list">
              {achievements.map((achievement, index) => (
                <div className="achievement-item" key={`${achievement}-${index}`}>
                  <span className="achievement-icon" aria-hidden="true">🏆</span>
                  <span className="achievement-text">{achievement}</span>
                </div>
              ))}
            </div>

            <div className="interests-section">
              <h4>Mối quan tâm</h4>
              <div className="interests-tags">
                {interests.map(interest => (
                  <span className="interest-tag" key={interest}>{interest}</span>
                ))}
              </div>
            </div>
          </section>

          {/* README-style About Me Card */}
          <section className="readme-about-card" aria-labelledby="readme-about-heading">
            <h3 id="readme-about-heading">About Me</h3>
            <div className="intro-hero">
              <div className="hero-title">👋 Hi, I'm <span className="name-highlight">Nguyễn Hoàng Dinh</span></div>
              <div className="hero-subtitle">Full-Stack Developer (Front-end & Back-end) · Vietnam</div>
              <p className="hero-lead"><strong>Building future-ready web products</strong> — from concept to scalable production.</p>
              <p className="hero-detail">I'm a full-stack developer who enjoys turning ideas into polished products. I specialize in JavaScript/TypeScript on the front-end and API development on the back-end. I love learning new technologies, designing clean architectures, and optimizing user experiences. When I'm not coding, I'm exploring system design and improving DevOps skills.</p>
            </div>

            <div className="readme-sections">
              <div className="tech-category">
                <h4>Front-End</h4>
                <div className="tech-badges">
                  <a href="https://react.dev" target="_blank" rel="noreferrer"><img src="https://skillicons.dev/icons?i=react" alt="React" loading="lazy" decoding="async" /></a>
                  <a href="https://angular.io" target="_blank" rel="noreferrer"><img src="https://skillicons.dev/icons?i=angular" alt="Angular" loading="lazy" decoding="async" /></a>
                  <a href="https://www.typescriptlang.org" target="_blank" rel="noreferrer"><img src="https://skillicons.dev/icons?i=ts" alt="TypeScript" loading="lazy" decoding="async" /></a>
                  <a href="https://tailwindcss.com" target="_blank" rel="noreferrer"><img src="https://skillicons.dev/icons?i=tailwind" alt="Tailwind" loading="lazy" decoding="async" /></a>
                  <a href="https://sass-lang.com" target="_blank" rel="noreferrer"><img src="https://skillicons.dev/icons?i=sass" alt="Sass" loading="lazy" decoding="async" /></a>
                  <a href="https://getbootstrap.com" target="_blank" rel="noreferrer"><img src="https://skillicons.dev/icons?i=bootstrap" alt="Bootstrap" loading="lazy" decoding="async" /></a>
                </div>
              </div>
              <div className="tech-category">
                <h4>Back-End</h4>
                <div className="tech-badges">
                  <a href="https://nodejs.org" target="_blank" rel="noreferrer"><img src="https://skillicons.dev/icons?i=nodejs" alt="Node.js" loading="lazy" decoding="async" /></a>
                  <a href="https://spring.io" target="_blank" rel="noreferrer"><img src="https://skillicons.dev/icons?i=spring" alt="Spring" loading="lazy" decoding="async" /></a>
                  <a href="https://go.dev" target="_blank" rel="noreferrer"><img src="https://skillicons.dev/icons?i=go" alt="Go" loading="lazy" decoding="async" /></a>
                  <a href="https://www.java.com" target="_blank" rel="noreferrer"><img src="https://skillicons.dev/icons?i=java" alt="Java" loading="lazy" decoding="async" /></a>
                  <a href="https://en.wikipedia.org/wiki/C_(programming_language)" target="_blank" rel="noreferrer"><img src="https://skillicons.dev/icons?i=c" alt="C" loading="lazy" decoding="async" /></a>
                </div>
              </div>
              <div className="tech-category">
                <h4>Databases & DevOps</h4>
                <div className="tech-badges">
                  <a href="https://www.mysql.com" target="_blank" rel="noreferrer"><img src="https://skillicons.dev/icons?i=mysql" alt="MySQL" loading="lazy" decoding="async" /></a>
                  <a href="https://www.microsoft.com/sql-server" target="_blank" rel="noreferrer"><img src="https://upload.wikimedia.org/wikipedia/it/2/23/Sql_server_logo.png" alt="SQL Server" height="36" loading="lazy" decoding="async" /></a>
                  <a href="https://www.docker.com" target="_blank" rel="noreferrer"><img src="https://skillicons.dev/icons?i=docker" alt="Docker" loading="lazy" decoding="async" /></a>
                  <a href="https://git-scm.com" target="_blank" rel="noreferrer"><img src="https://skillicons.dev/icons?i=git" alt="Git" loading="lazy" decoding="async" /></a>
                  <a href="https://www.figma.com" target="_blank" rel="noreferrer"><img src="https://skillicons.dev/icons?i=figma" alt="Figma" loading="lazy" decoding="async" /></a>
                  <a href="https://www.adobe.com/products/photoshop.html" target="_blank" rel="noreferrer"><img src="https://skillicons.dev/icons?i=ps" alt="Photoshop" loading="lazy" decoding="async" /></a>
                </div>
              </div>
            </div>

            <div className="contact-links">
              <a className="btn" href="mailto:nhdinh.dev03@gmail.com">Email</a>
              <a className="btn" href="https://fb.com/nhdinh03" target="_blank" rel="noreferrer">Facebook</a>
              <a className="btn" href="https://instagram.com/nhdinhdz" target="_blank" rel="noreferrer">Instagram</a>
              <a className="btn" href="https://www.tiktok.com/@nhdinh.dev03" target="_blank" rel="noreferrer">TikTok</a>
              <a className="btn" href="https://discord.gg/6UbbDqKKQN" target="_blank" rel="noreferrer">Discord</a>
            </div>
          </section>

          {/* GitHub Profile Card */}
          <section className="github-card" aria-labelledby="github-heading">
            <h3 id="github-heading">GitHub Profile</h3>
            <div className="github-grid">
              <figure className="gh-item">
                <img
                  src="https://github-readme-activity-graph.vercel.app/graph?username=nhdinhdev03&theme=react-dark&hide_border=true"
                  alt="Biểu đồ hoạt động GitHub — nhdinhdev03"
                  loading="lazy" decoding="async"
                />
                <figcaption>Biểu đồ đóng góp</figcaption>
              </figure>
              <figure className="gh-item">
                <img
                  src="https://github-readme-stats.vercel.app/api/top-langs/?username=nhdinhdev03&layout=compact&theme=tokyonight&hide_border=true&langs_count=10"
                  alt="Ngôn ngữ hàng đầu"
                  loading="lazy" decoding="async"
                />
                <figcaption>Top Languages</figcaption>
              </figure>
            </div>
            <div className="gh-links">
              <a className="btn" href="https://github.com/nhdinhdev03" target="_blank" rel="noreferrer">Xem GitHub</a>
              <a className="btn" href="mailto:nhdinh.dev03@gmail.com">Liên hệ</a>
            </div>
          </section>
        </div>
      </div>
    </section>
  );
}
export default About;

About.propTypes = {
  summary: PropTypes.string,
  strengths: PropTypes.arrayOf(PropTypes.string),
  interests: PropTypes.arrayOf(PropTypes.string),
  achievements: PropTypes.arrayOf(PropTypes.string),
  skills: PropTypes.arrayOf(PropTypes.string),
  avatarUrl: PropTypes.string,
  showcaseImage: PropTypes.string,
};