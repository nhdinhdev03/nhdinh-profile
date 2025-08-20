import React, { useEffect, useRef, useState } from "react";
import "./ProjectShowcase.scss";
import { Link } from "react-router-dom";
import { ROUTES } from "router/routeConstants";
import useIsMobile from "hooks/Mobile/useIsMobile";


// Enhanced featured projects with more professional presentation
const featured = [
  {
    id: "p1",
    title: "Realtime Chat App",
    desc: "Ứng dụng chat với Socket.IO, xác thực JWT và giao diện tối ưu UX. Hỗ trợ nhóm chat, file sharing và notification realtime.",
    stack: ["React", "Node.js", "Socket.IO", "Redis", "JWT"],
    category: "Full-Stack",
    status: "Completed",
    icon: "💬",
    gradient: "from-blue-500 to-purple-600",
    demoUrl: "#",
    githubUrl: "#",
    featured: true
  },
  {
    id: "p2", 
    title: "E-commerce Dashboard",
    desc: "Quản trị bán hàng với số liệu realtime, chart động và RBAC. Dashboard tích hợp analytics, inventory management và CRM.",
    stack: ["React", "NestJS", "PostgreSQL", "Docker", "Redis"],
    category: "Dashboard",
    status: "In Progress",
    icon: "📊",
    gradient: "from-green-500 to-emerald-600",
    demoUrl: "#",
    githubUrl: "#",
    featured: true
  },
  {
    id: "p3",
    title: "AI Image Tool",
    desc: "Công cụ tạo & tối ưu hình ảnh với queue xử lý nền. Tích hợp AI models cho image enhancement, background removal và style transfer.",
    stack: ["Vite", "Express", "Queue", "Cloud", "AI/ML"],
    category: "AI/ML",
    status: "Beta",
    icon: "🎨",
    gradient: "from-pink-500 to-rose-600",
    demoUrl: "#",
    githubUrl: "#",
    featured: true
  },
];

function ProjectShowcase() {
  const { isMobile } = useIsMobile();
  const showcaseRef = useRef(null);
  const [isInView, setIsInView] = useState(false);

  // Intersection Observer for animation trigger
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          setIsInView(entry.isIntersecting);
        });
      },
      { 
        threshold: isMobile ? 0.1 : 0.2,
        rootMargin: isMobile ? '50px' : '100px'
      }
    );

    if (showcaseRef.current) {
      observer.observe(showcaseRef.current);
    }

    return () => observer.disconnect();
  }, [isMobile]);

  return (
    <section 
      ref={showcaseRef}
      className={`hm-section showcase ${isInView ? 'animate-in' : ''}`} 
      aria-label="Dự án nổi bật"
    >
      <div className="container">
        <div className={`showcase__head ${isInView ? 'animate-in' : ''}`}>
          <div className="showcase__header-content">
            <h2 className="sec-titles">
              <span className="highlight">Dự Án Nổi Bật</span>
            </h2>
            <p className="showcase__subtitle">
              Khám phá những dự án độc đáo với công nghệ hiện đại
            </p>
          </div>
          <Link to={ROUTES.PROJECTS} className="show-all">
            <span>Tất cả dự án</span>
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M7 17L17 7M17 7H7M17 7V17"/>
            </svg>
          </Link>
        </div>
        
        <div className={`showcase__grid ${isInView ? 'animate-in' : ''}`}>
          {featured.map((project, index) => (
            <article 
              key={project.id} 
              className={`project-card ${project.featured ? 'featured' : ''} ${isInView ? 'animate-in' : ''}`}
              style={{'--delay': `${index * 0.15}s`}}
              tabIndex={0} 
              aria-label={project.title}
            >
              <div className="project-card__header">
                <div className="project-icon">
                  <span className="icon-emoji">{project.icon}</span>
                </div>
                <div className="project-meta">
                  <span className="project-category">{project.category}</span>
                  <span className={`project-status status-${project.status.toLowerCase().replace(' ', '-')}`}>
                    {project.status}
                  </span>
                </div>
              </div>
              
              <div className="project-card__body">
                <h3 className="project-title">{project.title}</h3>
                <p className="project-desc">{project.desc}</p>
                
                <div className="project-stack" aria-label="Công nghệ">
                  {project.stack.map((tech, techIndex) => (
                    <span 
                      key={tech} 
                      className="tech-tag"
                      style={{'--tech-delay': `${techIndex * 0.1}s`}}
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>
              
              <div className="project-card__footer">
                <div className="project-actions">
                  <a href={project.demoUrl} className="btn btn-primary" aria-label="Xem demo">
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M18 13v6a2 2 0 01-2 2H5a2 2 0 01-2-2V8a2 2 0 012-2h6"/>
                      <polyline points="15,3 21,3 21,9"/>
                      <line x1="10" y1="14" x2="21" y2="3"/>
                    </svg>
                    <span>Demo</span>
                  </a>
                  <a href={project.githubUrl} className="btn btn-secondary" aria-label="Xem mã nguồn">
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 00-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0020 4.77 5.07 5.07 0 0019.91 1S18.73.65 16 2.48a13.38 13.38 0 00-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 005 4.77a5.44 5.44 0 00-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 009 18.13V22"/>
                    </svg>
                    <span>Code</span>
                  </a>
                </div>
              </div>
              
              {/* Gradient overlay */}
              <div className={`project-gradient ${project.gradient}`}></div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
export default ProjectShowcase;