import React, { Suspense, lazy } from "react";
import "./HomeIndex.scss";
import { HeroSection } from "components"; // keep hero eager (above the fold)
import useIsMobile from "hooks/useIsMobile";
import useVisibility from "hooks/useVisibility";


// True code-splitting for heavier, below-the-fold sections
const StatsStrip = lazy(() => import("components/User/Home/StatsStrip/StatsStrip"));
const ProjectShowcase = lazy(() => import("components/User/Home/ProjectShowcase/ProjectShowcase"));
const TechMarquee = lazy(() => import("components/User/Home/TechMarquee/TechMarquee"));

function HomeIndex() {
  const { isMobile } = useIsMobile();
  const [statsRef, showStats] = useVisibility({ threshold: isMobile ? 0.2 : 0.1, rootMargin: isMobile ? '0px 0px 120px 0px' : '0px 0px 240px 0px' });
  const [projectsRef, showProjects] = useVisibility({ threshold: isMobile ? 0.15 : 0.08, rootMargin: isMobile ? '0px 0px 160px 0px' : '0px 0px 320px 0px' });
  const [marqueeRef, showMarquee] = useVisibility({ threshold: 0.05, rootMargin: isMobile ? '0px 0px 200px 0px' : '0px 0px 400px 0px' });
  // no manual observer code needed now

  return (
    <div className="home-container">

      <div className="hero-container-no-grid">
        <HeroSection />
      </div>

     

      <div>
        {/* Tech marquee placeholder for intersection-based lazy mount */}
        <div ref={marqueeRef} style={{ minHeight: 120 }}>
          {showMarquee && (
            <Suspense fallback={<div className="loading-block" aria-label="Đang tải công nghệ" />}> 
              <TechMarquee />
            </Suspense>
          )}
        </div>

        {/* Stats placeholder */}
  <div ref={statsRef} style={{ minHeight: 80 }}>
          {showStats && (
            <Suspense
              fallback={
                <div className="loading-block" aria-label="Đang tải số liệu" />
              }
            >
              <StatsStrip />
            </Suspense>
          )}
        </div>

        {/* Projects placeholder */}
  <div ref={projectsRef} style={{ minHeight: 120 }}>
          {showProjects && (
            <Suspense
              fallback={
                <div className="loading-block" aria-label="Đang tải dự án" />
              }
            >
              <ProjectShowcase />
            </Suspense>
          )}
        </div>
      </div>
    </div>
  );
}

export default HomeIndex;
