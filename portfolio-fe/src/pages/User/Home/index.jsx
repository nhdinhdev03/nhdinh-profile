import React from "react";
import "./HomeIndex.scss";

function HomeIndex({
  role = "Front-end/Full-stack Dev",
  title = "Xây sản phẩm web mượt mà, hiện đại & dễ mở rộng.",
  lead = "Tôi biến ý tưởng thành sản phẩm hoàn thiện: từ thiết kế UI, tối ưu hiệu năng đến triển khai production.",
  stats = ["5+ năm kinh nghiệm", "20+ dự án thực tế", "100% tận tâm"],
  highlights = [
    <>Phát hành <strong>UI kit</strong> mã nguồn mở.</>,
    <>Tối ưu Core Web Vitals cho một e-commerce (TTFB ↓40%).</>,
    <>Viết chuỗi bài <em>React Performance Patterns 2025</em>.</>,
  ],
}) {
  return (
    <section className="hero">
      <div className="hero-grid">
        <div>
          <span className="tag">
            Xin chào! Tôi là <strong>{role}</strong>
          </span>
          <h1>{title}</h1>
          <p className="lead">{lead}</p>

          <div className="stats">
            {stats.map((s, i) => (
              <div className="stat" key={i}>{s}</div>
            ))}
          </div>

          <div className="row">
            <a className="btn primary" href="#projects">Xem dự án</a>
            <a className="btn" href="#blog">Đọc blog</a>
          </div>
        </div>

        <div className="card" aria-label="Thành tựu nổi bật">
          <h3 style={{ marginTop: 0 }}>Nổi bật gần đây</h3>
          <ul style={{ margin: 0, paddingLeft: 18, color: "var(--muted)" }}>
            {highlights.map((item, i) => <li key={i}>{item}</li>)}
          </ul>
        </div>
      </div>
    </section>
  );
}

export default HomeIndex;
