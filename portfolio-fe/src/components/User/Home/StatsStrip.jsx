import React from "react";
import "./sections.scss";

const stats = [
  { label: "Năm kinh nghiệm", value: 3, suffix: "+" },
  { label: "Dự án đã hoàn thành", value: 25, suffix: "+" },
  { label: "Công nghệ đã dùng", value: 18, suffix: "+" },
  { label: "Giờ coding", value: 4000, suffix: "+" },
];

export default function StatsStrip() {
  return (
    <section className="hm-section stats" aria-label="Thành tựu nhanh">
      <div className="container stats__grid">
        {stats.map((s, i) => (
          <div className="stat" key={i}>
            <div className="stat__value" data-target={s.value}>{s.value}{s.suffix}</div>
            <div className="stat__label">{s.label}</div>
          </div>
        ))}
      </div>
    </section>
  );
}
