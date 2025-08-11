import React from "react";
import "./Sections.scss";

const DEFAULT_POSTS = [
  {
    id: "b1",
    title: "7 mẹo tăng hiệu năng React năm 2025",
    desc: "Ghi chú nhanh về memoization, batching, lazy route...",
    img: "https://images.unsplash.com/photo-1542626991-56d61e21304a?q=80&w=1200&auto=format&fit=crop",
    href: "#"
  },
  {
    id: "b2",
    title: "Checklist bảo mật cho API",
    desc: "JWT, CORS, input validation, TLS, audit, secrets…",
    img: "https://images.unsplash.com/photo-1526378722484-bd91ca387e72?q=80&w=1200&auto=format&fit=crop",
    href: "#"
  },
  {
    id: "b3",
    title: "Triển khai CI/CD tối giản",
    desc: "Tự động hoá build, test, preview, deploy.",
    img: "https://images.unsplash.com/photo-1515879218367-720dce4a02d2?q=80&w=1200&auto=format&fit=crop",
    href: "#"
  },
];

function Blog({ posts = DEFAULT_POSTS, viewAllHref = "#" }) {
  return (
    <section id="blog">
      <div className="section-head">
        <div>
          <div className="section-title">Blog</div>
          <div className="section-desc">Chia sẻ kiến thức & kinh nghiệm.</div>
        </div>
        <a className="btn" href={viewAllHref}>Xem tất cả</a>
      </div>

      <div className="grid">
        {posts.map(p => (
          <article className="post card" key={p.id}>
            <div className="thumb"><img src={p.img} alt={p.title} /></div>
            <h3>{p.title}</h3>
            <p className="section-desc">{p.desc}</p>
            <a className="btn" href={p.href}>Đọc tiếp</a>
          </article>
        ))}
      </div>
    </section>
  );
}
export default Blog;