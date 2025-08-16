import React, { useEffect, useRef } from "react";
import "./StatsStrip.scss";

const stats = [
  { 
    label: "Năm kinh nghiệm", 
    value: 2, 
    suffix: "+",
    icon: "📅",
    color: "blue"
  },
  { 
    label: "Dự án đã hoàn thành", 
    value: 20, 
    suffix: "+",
    icon: "🚀",
    color: "green" 
  },
  { 
    label: "Công nghệ đã dùng", 
    value: 18, 
    suffix: "+",
    icon: "⚙️",
    color: "purple"
  },
  { 
    label: "Giờ coding", 
    value: 3000, 
    suffix: "+",
    icon: "⏱️",
    color: "orange"
  },
];

export default function StatsStrip() {
  const statsRef = useRef(null);
  
  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          startCountAnimation();
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.3 });
    
    if (statsRef.current) {
      observer.observe(statsRef.current);
    }
    
    return () => {
      if (statsRef.current) {
        observer.unobserve(statsRef.current);
      }
    };
  }, []);
  
  const startCountAnimation = () => {
    const statValues = document.querySelectorAll('.stat__value');
    
    statValues.forEach(statValue => {
      const target = parseInt(statValue.getAttribute('data-target'), 10);
      const suffix = statValue.getAttribute('data-suffix') || '';
      let current = 0;
      const increment = Math.ceil(target / 40); // Speed of count
      const duration = 1800; // Total animation time in ms
      const stepTime = Math.floor(duration / (target / increment));
      
      const counter = setInterval(() => {
        current += increment;
        if (current >= target) {
          statValue.textContent = `${target}${suffix}`;
          clearInterval(counter);
        } else {
          statValue.textContent = `${current}${suffix}`;
        }
      }, stepTime);
    });
  };

  return (
    <section className="hm-section stats" aria-label="Thành tựu nhanh">
      <div className="container">
        <div className="stats__header">
          <h2 className="sec-titles">
            <span className="highlight">Một Số Thống Kê</span>
          </h2>
          <p className="stats__subtitle">
            Con số nói lên trải nghiệm và kĩ năng phát triển
          </p>
        </div>
        
        <div className="stats__grid" ref={statsRef}>
          {stats.map((stat, index) => (
            <div 
              className={`stat stat--${stat.color}`} 
              key={index}
              style={{'--delay': `${index * 0.15}s`}}
            >
              <div className="stat__icon-wrapper">
                <span className="stat__icon">{stat.icon}</span>
              </div>
              <div 
                className="stat__value" 
                data-target={stat.value}
                data-suffix={stat.suffix}
              >
                0{stat.suffix}
              </div>
              <div className="stat__label">{stat.label}</div>
              <div className={`stat__decoration stat__decoration--${stat.color}`}></div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
