import React from "react";
import "./sections.scss";
import { Link } from "react-router-dom";
import { ROUTES } from "router/routeConstants";
import { Center } from "@chakra-ui/react";

// Simple featured projects (placeholder data, can integrate with real API later)
const featured = [
  {
    id: "p1",
    title: "Realtime Chat App",
    desc: "Ứng dụng chat với Socket.IO, xác thực JWT và giao diện tối ưu UX.",
    stack: ["React", "Node", "Socket.IO", "Redis"],
  },
  {
    id: "p2",
    title: "E-commerce Dashboard",
    desc: "Quản trị bán hàng với số liệu realtime, chart động và RBAC.",
    stack: ["React", "NestJS", "PostgreSQL", "Docker"],
  },
  {
    id: "p3",
    title: "AI Image Tool",
    desc: "Công cụ tạo & tối ưu hình ảnh với queue xử lý nền.",
    stack: ["Vite", "Express", "Queue", "Cloud"],
  },
];

function ProjectShowcase() {
  return (
    <section className="hm-section showcase" aria-label="Dự án nổi bật">
      <div className="container">
        <div className="showcase__head">
          <h2 className="sec-title">Một Số Dự Án Nổi Bật</h2>
          <Link to={ROUTES.PROJECTS} className="show-all">Tất cả dự án →</Link>
        </div>
        <div className="showcase__grid">
          {featured.map(p => (
            <article key={p.id} className="card" tabIndex={0} aria-label={p.title}>
              <div className="card__body">
                <h3 className="card__title">{p.title}</h3>
                <p className="card__desc">{p.desc}</p>
                <ul className="card__stack" aria-label="Công nghệ">
                  {p.stack.map(s => <li key={s}>{s}</li>)}
                </ul>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
export default ProjectShowcase;