import React, { useEffect, useRef, useState, useCallback } from "react";
import "./StatsStrip.scss";

const stats = [
  { 
    label: "Năm kinh nghiệm", 
    value: 2, 
    suffix: "+",
    icon: "📅",
    color: "blue",
    description: "Phát triển phần mềm"
  },
  { 
    label: "Dự án đã hoàn thành", 
    value: 20, 
    suffix: "+",
    icon: "🚀",
    color: "green",
    description: "Web & Mobile Apps"
  },
  { 
    label: "Công nghệ đã dùng", 
    value: 18, 
    suffix: "+",
    icon: "⚙️",
    color: "purple",
    description: "Frontend & Backend"
  },
  { 
    label: "Giờ coding", 
    value: 3000, 
    suffix: "+",
    icon: "⏱️",
    color: "orange",
    description: "Thực tế & Học tập"
  },
];

export default function StatsStrip() {
  const statsRef = useRef(null);
  const [isVisible, setIsVisible] = useState(false);
  
  const animateValue = (node, target, suffix, duration, delay = 0) => {
    setTimeout(() => {
      const start = performance.now();
      const animate = (currentTime) => {
        const progress = Math.min(1, (currentTime - start) / duration);
        const eased = 1 - Math.pow(1 - progress, 3); // easeOutCubic
        const val = Math.round(target * eased);
        node.textContent = `${val}${suffix}`;
        if (progress < 1) requestAnimationFrame(animate);
      };
      requestAnimationFrame(animate);
    }, delay);
  };
  
  const startCountAnimation = useCallback(() => {
    const nodes = document.querySelectorAll('.stat__value');
    const duration = window.innerWidth <= 768 ? 1000 : 1400;
    const delayStep = window.innerWidth <= 768 ? 100 : 150;
    
    nodes.forEach((node, index) => {
      const target = parseInt(node.getAttribute('data-target') || '0', 10);
      const suffix = node.getAttribute('data-suffix') || '';
      const delay = index * delayStep;
      
      animateValue(node, target, suffix, duration, delay);
    });
  }, []);
  
  useEffect(() => {
    const node = statsRef.current;
    if (!node) return;
    
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting && !isVisible) {
          setIsVisible(true);
          startCountAnimation();
          observer.unobserve(entry.target);
        }
      });
    }, { 
      threshold: window.innerWidth <= 768 ? 0.2 : 0.3,
      rootMargin: window.innerWidth <= 768 ? '0px 0px -50px 0px' : '0px 0px -100px 0px'
    });
    
    observer.observe(node);
    return () => observer.unobserve(node);
  }, [isVisible, startCountAnimation]);

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
        
        <div className={`stats__grid ${isVisible ? 'stats__grid--visible' : ''}`} ref={statsRef}>
          {stats.map((stat, index) => (
            <div 
              className={`stat stat--${stat.color} ${isVisible ? 'stat--animate' : ''}`} 
              key={index}
              style={{'--delay': `${index * (window.innerWidth <= 768 ? 0.1 : 0.15)}s`}}
            >
              <div className="stat__icon-wrapper">
                <span className="stat__icon">{stat.icon}</span>
                <div className="stat__icon-bg"></div>
              </div>
              <div 
                className="stat__value" 
                data-target={stat.value}
                data-suffix={stat.suffix}
              >
                0{stat.suffix}
              </div>
              <div className="stat__label">{stat.label}</div>
              <div className="stat__description">{stat.description}</div>
              <div className={`stat__decoration stat__decoration--${stat.color}`}></div>
              <div className="stat__progress-ring">
                <svg className="progress-ring" width="120" height="120">
                  <circle
                    className="progress-ring__circle-bg"
                    cx="60"
                    cy="60"
                    r="54"
                    fill="transparent"
                    strokeWidth="4"
                  />
                  <circle
                    className="progress-ring__circle"
                    cx="60"
                    cy="60"
                    r="54"
                    fill="transparent"
                    strokeWidth="4"
                    strokeDasharray="339.292"
                    strokeDashoffset="339.292"
                    style={{'--progress': `${(stat.value / Math.max(...stats.map(s => s.value))) * 100}%`}}
                  />
                </svg>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
