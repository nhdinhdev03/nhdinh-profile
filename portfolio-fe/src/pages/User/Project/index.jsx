import React, { useMemo, useState } from "react";
import "./Sections.scss";

const DEFAULT_PROJECTS = [
  {
    id: "p1",
    title: "SaaS Dashboard",
    tags: ["fullstack", "nextjs", "stripe", "postgres"],
    desc: "Quản lý subscription, RBAC, audit log.",
    img: "https://images.unsplash.com/photo-1521737604893-d14cc237f11d?q=80&w=1200&auto=format&fit=crop",
    demo: "#",
    source: "#",
  },
  {
    id: "p2",
    title: "Landing Page Animations",
    tags: ["frontend", "react", "motion"],
    desc: "Thư viện animation pattern cho hero/feature.",
    img: "https://images.unsplash.com/photo-1555066931-4365d14bab8c?q=80&w=1200&auto=format&fit=crop",
    demo: "#",
    source: "#",
  },
  {
    id: "p3",
    title: "RESTful API Pack",
    tags: ["backend", "spring", "redis"],
    desc: "Rate-limit, caching, OpenAPI 3.0.",
    img: "https://images.unsplash.com/photo-1515879218367-8466d910aaa4?q=80&w=1200&auto=format&fit=crop",
    demo: "#",
    source: "#",
  },
];

function Projects({ projects = DEFAULT_PROJECTS }) {
  const [filter, setFilter] = useState("all");
  const filtered = useMemo(() => {
    if (filter === "all") return projects;
    return projects.filter(p => p.tags.includes(filter));
  }, [filter, projects]);

  return (
    <section id="projects" data-filter={filter} aria-labelledby="projects-title">
      <div className="section-head">
        <div>
          <h2 id="projects-title" className="section-title">Dự án</h2>
          <p className="section-desc">Một vài dự án tiêu biểu tôi đã làm.</p>
        </div>
        <div className="row filters" role="group" aria-label="Lọc dự án">
          {["all","frontend","backend","fullstack"].map(key => (
            <button
              key={key}
              type="button"
              className={`btn${filter===key ? " active" : ""}`}
              onClick={() => setFilter(key)}
              data-filter={key}
              aria-pressed={filter === key}
            >
              {key === "all" ? "Tất cả" :
               key === "frontend" ? "Front-end" :
               key === "backend" ? "Back-end" : "Full-stack"}
            </button>
          ))}
        </div>
        
      </div>
 <div className="gradient-line" aria-hidden="true" />
      <div className="grid" aria-live="polite">
        
        {filtered.map((p, idx) => (
          <article
            className="project card"
            data-tags={p.tags.join(",")}
            key={p.id}
            style={{"--stagger": `${idx}`}}
          >
            <div className="thumb" aria-hidden="true">
              <img
                src={p.img}
                alt={p.title}
                loading="lazy"
                decoding="async"
                sizes="(max-width: 600px) 100vw, 50vw"
              />
            </div>
            <div className="row chip" aria-label="Công nghệ">
              {p.tags.slice(0,3).map(t => <span key={t} className="tag">{t}</span>)}
            </div>
            
            <h3 className="project-title">{p.title}</h3>
            <p className="section-desc project-desc">{p.desc}</p>
            <div className="row actions">
              <a className="btn ghost" href={p.demo} target="_blank" rel="noopener noreferrer" aria-label={`Xem demo ${p.title}`}>Demo</a>
              <a className="btn primary" href={p.source} target="_blank" rel="noopener noreferrer" aria-label={`Xem source ${p.title}`}>Source</a>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
export default Projects;