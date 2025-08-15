import React, { Suspense, useEffect, useState, useRef } from "react";
import "./HomeIndex.scss";
import { HeroSection, TechMarquee } from "components";
import useIsMobile from "hooks/useIsMobile";

// Lazy load heavier sections
const StatsStrip = React.lazy(() => import("components/User/Home/StatsStrip/StatsStrip"));
const ProjectShowcase = React.lazy(() => import("components/User/Home/ProjectShowcase/ProjectShowcase"));

function HomeIndex() {
  const [showStats, setShowStats] = useState(false);
  const [showProjects, setShowProjects] = useState(false);
  const statsRef = useRef(null);
  const projectsRef = useRef(null);
  const { isMobile } = useIsMobile();

  useEffect(() => {
    // More aggressive intersection margins for mobile
    const rootMargin = isMobile ? "0px 0px 100px 0px" : "0px 0px 200px 0px";
    const threshold = isMobile ? 0.1 : 0.05;
    
    const options = { root: null, rootMargin, threshold };
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          if (entry.target === statsRef.current) setShowStats(true);
          if (entry.target === projectsRef.current) setShowProjects(true);
        }
      });
    }, options);
    if (statsRef.current) observer.observe(statsRef.current);
    if (projectsRef.current) observer.observe(projectsRef.current);
    return () => observer.disconnect();
  }, [isMobile]);

  return (
    <div className="home-container">
      <HeroSection />

      <TechMarquee />

      {/* Stats placeholder */}
      <div ref={statsRef} style={{ minHeight: 80 }}>
        {showStats && (
          <Suspense fallback={<div className="loading-block" aria-label="Đang tải số liệu"/>}>
            <StatsStrip />
          </Suspense>
        )}
      </div>

      {/* Projects placeholder */}
      <div ref={projectsRef} style={{ minHeight: 120 }}>
        {showProjects && (
          <Suspense fallback={<div className="loading-block" aria-label="Đang tải dự án"/>}>
            <ProjectShowcase />
          </Suspense>
        )}
      </div>
    </div>
  );
}

export default HomeIndex;
