import React from "react";
import "./Sections.scss";

function About({
  summary = "Tóm tắt 3–5 câu về kinh nghiệm, lĩnh vực quan tâm và giá trị bạn mang lại.",
  strengths = ["React","TypeScript","Node/Spring","SQL/NoSQL"],
  interests = ["Hiệu năng","Developer Experience","Clean Architecture"],
  achievements = ["Google Professional Cloud Developer (ví dụ)","Top 5 Hackathon XYZ 2024"],
  skills = ["React","Next.js","Angular","Node.js","Spring Boot","PostgreSQL","Docker"]
}) {
  return (
    <section id="about">
      <div className="section-head">
        <div className="section-title">Giới thiệu</div>
      </div>

      <div className="about">
        <div className="card">
          <h3 style={{marginTop:0}}>Tôi là ai?</h3>
          <p className="section-desc">{summary}</p>
          <ul className="muted">
            <li>Thế mạnh: {strengths.join(", ")}.</li>
            <li>Quan tâm: {interests.join(", ")}.</li>
            <li>Giá trị: ship nhanh, code maintainable, có đo đếm.</li>
          </ul>
        </div>

        <div className="card">
          <h3 style={{marginTop:0}}>Kỹ năng chính</h3>
          <div className="row">
            {skills.map(s => <span className="tag" key={s}>{s}</span>)}
          </div>

          <h3>Chứng chỉ & Giải thưởng</h3>
          <ul className="muted">
            {achievements.map((a,i)=><li key={i}>{a}</li>)}
          </ul>
        </div>
      </div>
    </section>
  );
}
export default About;