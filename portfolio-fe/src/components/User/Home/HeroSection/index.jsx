import React, { useEffect, useRef, useState, useCallback } from "react";
import HeroBackground from "./HeroBackground";
import HeroHeader from "./HeroHeader";
import useIsMobile from "hooks/useIsMobile";

function HeroSection() {
  const heroRef = useRef(null);
  const rafRef = useRef(0);
  const targetVars = useRef({ x: 0, y: 0 });
  const currentVars = useRef({ x: 0, y: 0 });
  const [isLoaded, setIsLoaded] = useState(false);
  const [entranceComplete, setEntranceComplete] = useState(false);
  const { isMobile } = useIsMobile();

  useEffect(() => {
    // Add "appeared" class to body when home page loads
    document.body.classList.add("home-appeared");
    
    // Faster load sequence for mobile
    const loadDelay = isMobile ? 50 : 100;
    const entranceDelay = isMobile ? 300 : 600;
    
    const loadTimer = setTimeout(() => {
      setIsLoaded(true);
      
      // Mark entrance animation as complete
      const entranceTimer = setTimeout(() => {
        setEntranceComplete(true);
      }, entranceDelay);
      
      return () => clearTimeout(entranceTimer);
    }, loadDelay);
    
    return () => {
      clearTimeout(loadTimer);
      document.body.classList.remove("home-appeared");
    };
  }, [isMobile]);

  // Optimized animation loop
  const animationLoop = useCallback(() => {
    const el = heroRef.current;
    if (!el) return;
    
    const step = 0.08; // Smoother easing
    const nx = currentVars.current.x + (targetVars.current.x - currentVars.current.x) * step;
    const ny = currentVars.current.y + (targetVars.current.y - currentVars.current.y) * step;
    
    currentVars.current.x = nx;
    currentVars.current.y = ny;
    
    el.style.setProperty("--mx", nx.toFixed(3));
    el.style.setProperty("--my", ny.toFixed(3));
    
    if (
      Math.abs(nx - targetVars.current.x) > 0.001 ||
      Math.abs(ny - targetVars.current.y) > 0.001
    ) {
      rafRef.current = requestAnimationFrame(animationLoop);
    } else {
      rafRef.current = 0;
    }
  }, []);

  // Optimized mouse movement handler with throttling  
  const handleMouseMove = useCallback((e) => {
    const el = heroRef.current;
    if (!el) return;
    
    const rect = el.getBoundingClientRect();
    const cx = rect.left + rect.width / 2;
    const cy = rect.top + rect.height / 2;
    const dx = (e.clientX - cx) / (rect.width / 2);
    const dy = (e.clientY - cy) / (rect.height / 2);
    
    targetVars.current.x = Math.max(-1, Math.min(1, dx * 0.5)); // Reduced intensity for smoother feel
    targetVars.current.y = Math.max(-1, Math.min(1, dy * 0.5));
    
    if (!rafRef.current) {
      animationLoop();
    }
  }, [animationLoop]);

  const handleMouseLeave = useCallback(() => {
    targetVars.current.x = 0;
    targetVars.current.y = 0;
    if (!rafRef.current) {
      animationLoop();
    }
  }, [animationLoop]);

  useEffect(() => {
    const el = heroRef.current;
    if (!el) return;

    // Skip mouse interactions on mobile for better performance
    if (isMobile) return;

    let lastCall = 0;
    const throttledMouseMove = (e) => {
      const now = Date.now();
      if (now - lastCall >= 16) { // 60fps throttling
        handleMouseMove(e);
        lastCall = now;
      }
    };

    // Only enable on devices with fine pointer control
    const mq = window.matchMedia("(hover: hover) and (pointer: fine)");
    if (mq.matches && !window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      el.addEventListener("mousemove", throttledMouseMove, { passive: true });
      el.addEventListener("mouseleave", handleMouseLeave, { passive: true });
    }
    
    return () => {
      el.removeEventListener("mousemove", throttledMouseMove);
      el.removeEventListener("mouseleave", handleMouseLeave);
      if (rafRef.current) {
        cancelAnimationFrame(rafRef.current);
      }
    };
  }, [handleMouseMove, handleMouseLeave, isMobile]);

  return (
    <header 
      className={`hero ${isLoaded ? 'hero-loaded' : ''} ${entranceComplete ? 'entrance-complete' : ''} ${isMobile ? 'hero-mobile' : ''}`} 
      aria-label="Giới thiệu tổng quan" 
      ref={heroRef}
    >
      <HeroBackground heroRef={heroRef} isLoaded={isLoaded} isMobile={isMobile} />
      <HeroHeader entranceComplete={entranceComplete} isMobile={isMobile} />
    </header>
  );
}

export default HeroSection;
