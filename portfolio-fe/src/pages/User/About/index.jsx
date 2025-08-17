import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";

import "./Sections.scss";
import { useUserTheme } from "theme";



// Optimized GitHub data hook
const useGithubData = () => {
  const [data, setData] = useState({ profile: null, repos: [], loading: true, error: null });
  
  useEffect(() => {
    let ignore = false;
    const ctrl = new AbortController();
    
    async function fetchData() {
      try {
        const [profileRes, reposRes] = await Promise.all([
          fetch('https://api.github.com/users/nhdinhdev03', { 
            signal: ctrl.signal, 
            headers: { Accept: "application/vnd.github+json" }
          }),
          fetch('https://api.github.com/users/nhdinhdev03/repos?per_page=6&sort=updated', { 
            signal: ctrl.signal, 
            headers: { Accept: "application/vnd.github+json" }
          })
        ]);
        
        if (!profileRes.ok || !reposRes.ok) throw new Error('Failed to fetch');
        
        const [profile, repos] = await Promise.all([profileRes.json(), reposRes.json()]);
        
        if (!ignore) {
          setData({
            profile,
            repos: Array.isArray(repos) ? repos.filter(r => !r.archived) : [],
            loading: false,
            error: null
          });
        }
      } catch (error) {
        if (!ignore && error.name !== "AbortError") {
          setData(prev => ({ ...prev, loading: false, error }));
        }
      }
    }
    
    fetchData();
    return () => { ignore = true; ctrl.abort(); };
  }, []);
  
  return data;
}

// Page Header Section
const AboutHeader = () => (
  <header className="about-header">
    <div className="header-content">
      <h1 className="page-title">
        <span className="title-main">About Me</span>
        <span className="title-subtitle">Giới thiệu</span>
      </h1>
      <p className="page-description">
        Passionate developer with expertise in modern web technologies. 
        I love creating innovative solutions and sharing knowledge with the community.
      </p>
    </div>
  </header>
);

const ProfileHero = ({ profile, light }) => (
  <section className="profile-hero">
    <div className="profile-image">
      <img src={profile?.avatar_url || '/default-avatar.png'} alt="Profile" />
      <div className="profile-status">
        <span className={`status-badge ${light ? 'light-mode' : 'dark-mode'}`}>
          {light ? '☀️ Light Mode' : '🌙 Dark Mode'}
        </span>
      </div>
    </div>
    <div className="profile-content">
      <h1>
        <span className="name-highlight">{profile?.name || 'Nguyen Hoang Dinh'}</span>
      </h1>
      <p className="title">Full Stack Developer & Software Engineer</p>
      <p className="description">
        <span className="highlight">
          {profile?.bio || 'Passionate about creating innovative web solutions with modern technologies.'}
        </span>
        <br />
        <span className="italic">
          Experienced in React, Node.js, and cloud technologies with a focus on clean, scalable code.
        </span>
      </p>
      <div className="profile-badges">
        <span className="badge badge-green">Available for Work</span>
        <span className="badge badge-blue">Open Source Contributor</span>
        <span className="badge badge-orange">JavaScript Expert</span>
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
    { number: repos?.length || 0, label: 'Projects', icon: '🚀' },
    { number: profile?.followers || 0, label: 'Followers', icon: '👥' },
    { number: profile?.following || 0, label: 'Following', icon: '🤝' },
    { number: profile?.public_repos || 0, label: 'Repositories', icon: '📁' }
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
      title: 'Frontend',
      icon: '🎨',
      skills: ['React', 'Vue.js', 'JavaScript', 'TypeScript', 'HTML5', 'CSS3', 'Tailwind CSS']
    },
    {
      title: 'Backend',
      icon: '⚙️',
      skills: ['Node.js', 'Java', 'Spring Boot', 'PostgreSQL', 'MongoDB', 'Redis']
    },
    {
      title: 'DevOps & Tools',
      icon: '🛠️',
      skills: ['Docker', 'AWS', 'Git', 'CI/CD', 'Linux', 'Nginx']
    }
  ];

  return (
    <section className="skills-overview">
      <h2>Technical Skills</h2>
      <div className="skills-grid">
        {skillCategories.map((category, index) => (
          <div key={index} className="skill-category">
            <div className="category-header">
              <span className="category-icon">{category.icon}</span>
              <h3>{category.title}</h3>
            </div>
            <div className="skill-list">
              {category.skills.map((skill, skillIndex) => (
                <span key={skillIndex} className="skill-tag">{skill}</span>
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
      <h2>Recent Projects</h2>
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
                {repo.description || 'No description available'}
              </p>
              <div className="project-tech">
                {repo.language && (
                  <span className="tech-tag primary">{repo.language}</span>
                )}
                <span className="tech-tag stars">
                  <span className="stat-indicator stars">⭐ {repo.stargazers_count}</span>
                </span>
                <span className="tech-tag forks">
                  <span className="stat-indicator forks">🔀 {repo.forks_count}</span>
                </span>
              </div>
              <div className="project-links">
                <a href={repo.html_url} target="_blank" rel="noopener noreferrer" className="project-link primary">
                  View Code
                </a>
                {repo.homepage && (
                  <a href={repo.homepage} target="_blank" rel="noopener noreferrer" className="project-link secondary">
                    Live Demo
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
      date: '2023 - Present',
      title: 'Senior Full Stack Developer',
      company: 'Tech Solutions Inc.',
      description: 'Leading development of scalable web applications using React and Node.js. Mentoring junior developers and implementing best practices.'
    },
    {
      date: '2021 - 2023',
      title: 'Full Stack Developer',
      company: 'Digital Innovation Co.',
      description: 'Developed and maintained multiple client projects using modern web technologies. Collaborated with design teams to create responsive user interfaces.'
    },
    {
      date: '2020 - 2021',
      title: 'Frontend Developer',
      company: 'StartUp Ventures',
      description: 'Built responsive web applications with React and Vue.js. Focused on user experience and performance optimization.'
    }
  ];

  return (
    <section className="experience-timeline">
      <h2>Experience</h2>
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
    <h3>Let's Connect</h3>
    <p>
      I'm always interested in hearing about new opportunities and exciting projects.
      Feel free to reach out if you'd like to collaborate or just want to say hello!
    </p>
    <div className="contact-badges">
      <a href="mailto:nhdinhdev03@gmail.com" className="contact-badge email">
        Email
      </a>
      <a href={profile?.html_url} target="_blank" rel="noopener noreferrer" className="contact-badge github">
        GitHub
      </a>
      <a href="https://linkedin.com/in/nhdinhdev03" target="_blank" rel="noopener noreferrer" className="contact-badge linkedin">
        LinkedIn
      </a>
    </div>
    <div className="theme-indicator">
      <div className="theme-status">
        {light ? '☀️ Light Mode Active' : '🌙 Dark Mode Active'}
      </div>
    </div>
  </section>
);

// Main About Component
const About = () => {
  const { profile, repos } = useGithubData();
  const { light } = useUserTheme();

  


  return (
    <div className={`about-page ${light ? 'light' : ''}`}>
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
  repos: PropTypes.arrayOf(PropTypes.shape({
    name: PropTypes.string,
    description: PropTypes.string,
    language: PropTypes.string,
    stargazers_count: PropTypes.number,
    forks_count: PropTypes.number,
    html_url: PropTypes.string,
    homepage: PropTypes.string,
    private: PropTypes.bool,
  })),
};

ContactSection.propTypes = {
  profile: PropTypes.shape({
    html_url: PropTypes.string,
  }),
  light: PropTypes.bool.isRequired,
};
