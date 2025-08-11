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
    <section id="projects">
      <div className="section-head">
        <div>
          <div className="section-title">Dự án</div>
          <div className="section-desc">Một vài dự án tiêu biểu tôi đã làm.</div>
        </div>
        <div className="row" role="group" aria-label="Lọc dự án">
          {["all","frontend","backend","fullstack"].map(key => (
            <button
              key={key}
              className={`btn${filter===key ? " active" : ""}`}
              onClick={() => setFilter(key)}
              data-filter={key}
            >
              {key === "all" ? "Tất cả" :
               key === "frontend" ? "Front-end" :
               key === "backend" ? "Back-end" : "Full-stack"}
            </button>
          ))}
        </div>
      </div>

      <div className="grid">
        {filtered.map(p => (
          <article className="project card" data-tags={p.tags.join(",")} key={p.id}>
            <div className="thumb">
              <img src={p.img} alt={p.title} />
            </div>
            <div className="row chip">
              {p.tags.slice(0,3).map(t => <span key={t}>{t}</span>)}
            </div>
            <h3>{p.title}</h3>
            <p className="section-desc">{p.desc}</p>
            <div className="row">
              <a className="btn" href={p.demo}>Demo</a>
              <a className="btn" href={p.source}>Source</a>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
export default Projects;