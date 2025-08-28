import React from "react";
import "./Skills.scss";

const Skills = () => {
  const skillCategories = [
    {
      title: "Frontend Development",
      color: "#61DAFB",
      skills: [
        { name: "React", level: 95, description: "Advanced component architecture, hooks, state management" },
        { name: "TypeScript", level: 90, description: "Type-safe development, advanced types, generics" },
        { name: "JavaScript", level: 95, description: "ES6+, async/await, functional programming" },
        { name: "HTML5 & CSS3", level: 90, description: "Semantic markup, modern CSS features, animations" },
        { name: "Tailwind CSS", level: 85, description: "Utility-first CSS, responsive design" },
        { name: "SCSS/Sass", level: 80, description: "Advanced CSS preprocessing, mixins, functions" }
      ]
    },
    {
      title: "Backend Development",
      color: "#68A063",
      skills: [
        { name: "Spring Boot", level: 85, description: "RESTful APIs, security, microservices" },
        { name: "Java", level: 80, description: "OOP, design patterns, multithreading" },
        { name: "Node.js", level: 75, description: "Server-side JavaScript, API development" },
        { name: "PostgreSQL", level: 80, description: "Complex queries, optimization, database design" },
        { name: "Redis", level: 70, description: "Caching strategies, session management" },
        { name: "REST APIs", level: 90, description: "API design, documentation, versioning" }
      ]
    },
    {
      title: "DevOps & Tools",
      color: "#FF6B6B",
      skills: [
        { name: "Docker", level: 75, description: "Containerization, Docker Compose, optimization" },
        { name: "Git", level: 90, description: "Version control, branching strategies, collaboration" },
        { name: "CI/CD", level: 70, description: "Automated deployment, testing pipelines" },
        { name: "Linux", level: 75, description: "Command line, server management, scripting" },
        { name: "AWS", level: 65, description: "Cloud services, EC2, S3, basic infrastructure" },
        { name: "Nginx", level: 70, description: "Web server configuration, reverse proxy" }
      ]
    },
    {
      title: "Soft Skills",
      color: "#9B59B6",
      skills: [
        { name: "Problem Solving", level: 90, description: "Analytical thinking, debugging, optimization" },
        { name: "Team Collaboration", level: 85, description: "Agile methodologies, code reviews, mentoring" },
        { name: "Communication", level: 80, description: "Technical documentation, presentations" },
        { name: "Project Management", level: 75, description: "Planning, estimation, delivery" },
        { name: "Continuous Learning", level: 95, description: "Staying updated with latest technologies" },
        { name: "Code Quality", level: 85, description: "Clean code, testing, refactoring" }
      ]
    }
  ];

  const getSkillBarColor = (level) => {
    if (level >= 90) return "#4CAF50"; // Excellent
    if (level >= 80) return "#2196F3"; // Advanced
    if (level >= 70) return "#FF9800"; // Intermediate
    return "#F44336"; // Beginner
  };

  return (
    <div className="skills-page">
      <div className="skills-container">
        <header className="skills-header">
          <h1>Kỹ năng & Chuyên môn</h1>
          <p className="skills-intro">
            Tổng quan về các kỹ năng technical và soft skills được tích lũy qua quá trình 
            học tập và làm việc trong lĩnh vực phát triển phần mềm.
          </p>
        </header>

        <div className="skills-grid">
          {skillCategories.map((category, categoryIndex) => (
            <div key={categoryIndex} className="skill-category">
              <div 
                className="category-header"
                style={{ borderLeftColor: category.color }}
              >
                <h2>{category.title}</h2>
                <div 
                  className="category-indicator"
                  style={{ backgroundColor: category.color }}
                />
              </div>

              <div className="skills-list">
                {category.skills.map((skill, skillIndex) => (
                  <div key={skillIndex} className="skill-item">
                    <div className="skill-info">
                      <div className="skill-header">
                        <h3>{skill.name}</h3>
                        <span className="skill-percentage">{skill.level}%</span>
                      </div>
                      <p className="skill-description">{skill.description}</p>
                    </div>
                    
                    <div className="skill-bar">
                      <div 
                        className="skill-progress"
                        style={{ 
                          width: `${skill.level}%`,
                          backgroundColor: getSkillBarColor(skill.level)
                        }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>

        <div className="skills-note">
          <div className="note-content">
            <h3>📊 Về thang đánh giá</h3>
            <div className="skill-levels">
              <div className="level-item">
                <div className="level-bar excellent" />
                <span>90-100%: Chuyên gia</span>
              </div>
              <div className="level-item">
                <div className="level-bar advanced" />
                <span>80-89%: Nâng cao</span>
              </div>
              <div className="level-item">
                <div className="level-bar intermediate" />
                <span>70-79%: Trung bình</span>
              </div>
              <div className="level-item">
                <div className="level-bar beginner" />
                <span>60-69%: Cơ bản</span>
              </div>
            </div>
            <p>
              Đánh giá dựa trên kinh nghiệm thực tế, khả năng giải quyết vấn đề 
              và mức độ tự tin khi làm việc với từng công nghệ.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Skills;
