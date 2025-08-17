import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";

import "./Sections.scss";
import { useUserTheme } from "theme";

// Optimized GitHub data hook
const useGithubData = () => {
  const [data, setData] = useState({
    profile: null,
    repos: [],
    loading: true,
    error: null,
  });

  useEffect(() => {
    let ignore = false;
    const ctrl = new AbortController();

    async function fetchData() {
      try {
        const [profileRes, reposRes] = await Promise.all([
          fetch("https://api.github.com/users/nhdinhdev03", {
            signal: ctrl.signal,
            headers: { Accept: "application/vnd.github+json" },
          }),
          fetch(
            "https://api.github.com/users/nhdinhdev03/repos?per_page=6&sort=updated",
            {
              signal: ctrl.signal,
              headers: { Accept: "application/vnd.github+json" },
            }
          ),
        ]);

        if (!profileRes.ok || !reposRes.ok) throw new Error("Failed to fetch");

        const [profile, repos] = await Promise.all([
          profileRes.json(),
          reposRes.json(),
        ]);

        if (!ignore) {
          setData({
            profile,
            repos: Array.isArray(repos) ? repos.filter((r) => !r.archived) : [],
            loading: false,
            error: null,
          });
        }
      } catch (error) {
        if (!ignore && error.name !== "AbortError") {
          setData((prev) => ({ ...prev, loading: false, error }));
        }
      }
    }

    fetchData();
    return () => {
      ignore = true;
      ctrl.abort();
    };
  }, []);

  return data;
};

// Page Header Section
const AboutHeader = () => (
  <header className="about-header">
    <div className="header-content">
      <h1 className="page-title">
        <span className="title-main">Về Tôi</span>

      </h1>
      <p className="page-description">
        Tôi là một <span className="highlight-primary">Web Developer</span> đam mê 
        <span className="highlight-accent"> biến ý tưởng thành sản phẩm hoàn thiện</span>. 
        Tôi chuyên về <span className="highlight-secondary">JavaScript/TypeScript</span> cho 
        front-end và <span className="highlight-secondary">phát triển API</span> cho back-end. 
        Tôi yêu thích việc học các công nghệ mới, 
        <span className="highlight-accent">thiết kế kiến trúc sạch</span> và 
        <span className="highlight-primary"> tối ưu trải nghiệm người dùng</span>. 
        Khi không code, tôi dành thời gian nghiên cứu system design và 
        <span className="highlight-secondary"> nâng cao kỹ năng DevOps</span>.
      </p>
    </div>
  </header>
);

const ProfileHero = ({ profile, light }) => (
  <section className="profile-hero">
    <div className="profile-image">
      <img src={profile?.avatar_url || "/default-avatar.png"} alt="Profile" />
      <div className="profile-status">
        <span className={`status-badge ${light ? "light-mode" : "dark-mode"}`}>
          {light ? "☀️ Light Mode" : "🌙 Dark Mode"}
        </span>
      </div>
    </div>
    <div className="profile-content">
      <h1>
        <span className="name-highlight">
          {profile?.name || "Nguyen Hoang Dinh"}
        </span>
      </h1>
      <p className="title">Lập Trình Viên Full Stack & Kỹ Sư Phần Mềm</p>
      <p className="description">
        <span className="highlight-primary">
          Xây dựng các sản phẩm web tương lai
        </span>
        {" — từ ý tưởng đến "}
        <span className="highlight-secondary">sản xuất có thể mở rộng</span>.
        <br />
        <span className="highlight-accent">Đam mê mang đến</span>
        {" trải nghiệm người dùng mượt mà và "}
        <span className="highlight-secondary">hệ thống mạnh mẽ, dễ bảo trì</span>.
        <br />
        <span className="italic">
          {profile?.bio || "Có kinh nghiệm với React, Node.js và công nghệ đám mây với tâm huyết về code sạch và có thể mở rộng."}
        </span>
      </p>
      <div className="profile-badges">
        <span className="badge badge-green">Sẵn Sàng Làm Việc</span>
        <span className="badge badge-blue">Đóng Góp Mã Nguồn Mở</span>
        <span className="badge badge-orange">Chuyên Gia JavaScript</span>
      </div>
    </div>
  </section>
);

ProfileHero.propTypes = {
  profile: PropTypes.shape({
    avatar_url: PropTypes.string,
    name: PropTypes.string,
    bio: PropTypes.string,
    html_url: PropTypes.string,
  }),
  light: PropTypes.bool.isRequired,
};

// Quick Stats Section
const QuickStats = ({ repos, profile }) => {
  const stats = [
    { number: repos?.length || 0, label: "Dự Án", icon: "🚀" },
    { number: profile?.followers || 0, label: "Người Theo Dõi", icon: "👥" },
    { number: profile?.following || 0, label: "Đang Theo Dõi", icon: "🤝" },
    { number: profile?.public_repos || 0, label: "Kho Mã Nguồn", icon: "📁" },
  ];

  return (
    <section className="quick-stats">
      {stats.map((stat, index) => (
        <div key={index} className="stat-card">
          <div className="stat-icon">{stat.icon}</div>
          <div className="stat-number">{stat.number}</div>
          <div className="stat-label">{stat.label}</div>
        </div>
      ))}
    </section>
  );
};

QuickStats.propTypes = {
  repos: PropTypes.arrayOf(PropTypes.object),
  profile: PropTypes.shape({
    followers: PropTypes.number,
    following: PropTypes.number,
    public_repos: PropTypes.number,
  }),
};

// Skills Overview Section
const SkillsOverview = () => {
  const skillCategories = [
    {
      title: "Frontend",
      icon: "🎨",
      skills: [
        "React",
        "Vue.js",
        "JavaScript",
        "TypeScript",
        "HTML5",
        "CSS3",
        "Tailwind CSS",
      ],
    },
    {
      title: "Backend",
      icon: "⚙️",
      skills: [
        "Node.js",
        "Java",
        "Spring Boot",
        "PostgreSQL",
        "MongoDB",
        "Redis",
      ],
    },
    {
      title: "DevOps & Tools",
      icon: "🛠️",
      skills: ["Docker", "AWS", "Git", "CI/CD", "Linux", "Nginx"],
    },
  ];

  return (
    <section className="skills-overview">
      <h2>Kỹ Năng Công Nghệ</h2>
      <div className="skills-grid">
        {skillCategories.map((category, index) => (
          <div key={index} className="skill-category">
            <div className="category-header">
              <span className="category-icon">{category.icon}</span>
              <h3>{category.title}</h3>
            </div>
            <div className="skill-list">
              {category.skills.map((skill, skillIndex) => (
                <span key={skillIndex} className="skill-tag">
                  {skill}
                </span>
              ))}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

// Recent Projects Section
const RecentProjects = ({ repos }) => {
  const featuredRepos = repos?.slice(0, 6) || [];

  return (
    <section className="recent-projects">
      <h2>Dự Án Gần Đây</h2>
      <div className="projects-grid">
        {featuredRepos.map((repo, index) => (
          <div key={index} className="project-card">
            <div className="project-header">
              <div className="project-icon">📁</div>
              <div className="project-status">
                {repo.private ? (
                  <span className="private-badge">🔒 Private</span>
                ) : (
                  <span className="public-badge">🌍 Public</span>
                )}
              </div>
            </div>
            <div className="project-content">
              <h3>{repo.name}</h3>
              <p className="project-description">
                {repo.description || "Không có mô tả"}
              </p>
              <div className="project-tech">
                {repo.language && (
                  <span className="tech-tag primary">{repo.language}</span>
                )}
                <span className="tech-tag stars">
                  <span className="stat-indicator stars">
                    ⭐ {repo.stargazers_count}
                  </span>
                </span>
                <span className="tech-tag forks">
                  <span className="stat-indicator forks">
                    🔀 {repo.forks_count}
                  </span>
                </span>
              </div>
              <div className="project-links">
                <a
                  href={repo.html_url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="project-link primary"
                >
                  Xem Code
                </a>
                {repo.homepage && (
                  <a
                    href={repo.homepage}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="project-link secondary"
                  >
                    Demo Trực Tiếp
                  </a>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

// Experience Timeline Section
const ExperienceTimeline = () => {
  const experiences = [
    {
      date: "2023 - Hiện tại",
      title: "Lập Trình Viên Full Stack Cấp Cao",
      company: "Tech Solutions Inc.",
      description:
        "Dẫn dắt phát triển các ứng dụng web có thể mở rộng sử dụng React và Node.js. Hướng dẫn các lập trình viên junior và triển khai các phương pháp hay nhất.",
    },
    {
      date: "2021 - 2023",
      title: "Lập Trình Viên Full Stack",
      company: "Digital Innovation Co.",
      description:
        "Phát triển và duy trì nhiều dự án khách hàng sử dụng công nghệ web hiện đại. Hợp tác với đội ngũ thiết kế để tạo ra giao diện người dùng responsive.",
    },
    {
      date: "2020 - 2021",
      title: "Lập Trình Viên Frontend",
      company: "StartUp Ventures",
      description:
        "Xây dựng các ứng dụng web responsive với React và Vue.js. Tập trung vào trải nghiệm người dùng và tối ưu hóa hiệu suất.",
    },
  ];

  return (
    <section className="experience-timeline">
      <h2>Kinh Nghiệm</h2>
      <div className="timeline">
        {experiences.map((exp, index) => (
          <div key={index} className="timeline-item">
            <div className="timeline-date">{exp.date}</div>
            <div className="timeline-title">{exp.title}</div>
            <div className="timeline-company">{exp.company}</div>
            <div className="timeline-description">{exp.description}</div>
          </div>
        ))}
      </div>
    </section>
  );
};

// Contact Section
const ContactSection = ({ profile, light }) => (
  <section className="contact-section">
    <h3>Kết Nối</h3>
    <p>
      Tôi luôn quan tâm đến việc nghe về những cơ hội mới và các dự án thú vị.
      Hãy liên hệ nếu bạn muốn hợp tác hoặc chỉ đơn giản là muốn chào hỏi!
    </p>
    <div className="contact-badges">
      <a href="mailto:nhdinhdev03@gmail.com" className="contact-badge email">
        Email
      </a>
      <a
        href={profile?.html_url}
        target="_blank"
        rel="noopener noreferrer"
        className="contact-badge github"
      >
        GitHub
      </a>
      <a
        href="https://linkedin.com/in/nhdinhdev03"
        target="_blank"
        rel="noopener noreferrer"
        className="contact-badge linkedin"
      >
        LinkedIn
      </a>
    </div>
    <div className="theme-indicator">
      <div className="theme-status">
        {light ? "☀️ Chế Độ Sáng Đang Hoạt Động" : "🌙 Chế Độ Tối Đang Hoạt Động"}
      </div>
    </div>
  </section>
);

// Main About Component
const About = () => {
  const { profile, repos } = useGithubData();
  const { light } = useUserTheme();

  return (
    <div className={`about-page ${light ? "light" : ""}`}>
      <AboutHeader />
      <div className="gradient-line" aria-hidden="true" />
      <ProfileHero profile={profile} light={light} />
      <div className="gradient-line" aria-hidden="true" />
      <QuickStats repos={repos} profile={profile} />
      <div className="gradient-line" aria-hidden="true" />
      <SkillsOverview />
      <div className="gradient-line" aria-hidden="true" />
      <RecentProjects repos={repos} />
      <div className="gradient-line" aria-hidden="true" />
      <ExperienceTimeline />
      <div className="gradient-line" aria-hidden="true" />
      <ContactSection profile={profile} light={light} />
    </div>
  );
};

export default About;

// PropTypes definitions - fix existing warnings
RecentProjects.propTypes = {
  repos: PropTypes.arrayOf(
    PropTypes.shape({
      name: PropTypes.string,
      description: PropTypes.string,
      language: PropTypes.string,
      stargazers_count: PropTypes.number,
      forks_count: PropTypes.number,
      html_url: PropTypes.string,
      homepage: PropTypes.string,
      private: PropTypes.bool,
    })
  ),
};

ContactSection.propTypes = {
  profile: PropTypes.shape({
    html_url: PropTypes.string,
  }),
  light: PropTypes.bool.isRequired,
};
