import React, { useEffect, useRef, useState } from "react";
import HeroBackground from "./HeroBackground";
import HeroHeader from "./HeroHeader";


function HeroSection() {
  const heroRef = useRef(null);
  const rafRef = useRef(0);
  const targetVars = useRef({ x: 0, y: 0 });
  const [isLoaded, setIsLoaded] = useState(false);
  const [entranceComplete, setEntranceComplete] = useState(false);


  useEffect(() => {
    // Add "appeared" class to body when home page loads
    document.body.classList.add("home-appeared");
    
    // Load sequence with staggered timing for smoother entry
    const loadTimer = setTimeout(() => {
      setIsLoaded(true);
      
      // Mark entrance animation as complete after additional delay
      const entranceTimer = setTimeout(() => {
        setEntranceComplete(true);
      }, 800);
      
      return () => clearTimeout(entranceTimer);
    }, 150); // Reduced from 300ms for faster initial render
    
    return () => {
      clearTimeout(loadTimer);
      document.body.classList.remove("home-appeared");
    };
  }, []);

  useEffect(() => {
    const el = heroRef.current;
    if (!el) return;
    const rect = () => el.getBoundingClientRect();
    const onMove = (e) => {
      const r = rect();
      const cx = r.left + r.width / 2;
      const cy = r.top + r.height / 2;
      const dx = (e.clientX - cx) / (r.width / 2);
      const dy = (e.clientY - cy) / (r.height / 2);
      targetVars.current.x = Math.max(-1, Math.min(1, dx * 0.7)); // Reduced intensity
      targetVars.current.y = Math.max(-1, Math.min(1, dy * 0.7));
      if (!rafRef.current) loop();
    };

    const onLeave = () => {
      targetVars.current.x = 0;
      targetVars.current.y = 0;
      if (!rafRef.current) loop();
    };

    const loop = () => {
      const step = 0.06; // Smoother easing
      const sx = parseFloat(getComputedStyle(el).getPropertyValue("--mx")) || 0;
      const sy = parseFloat(getComputedStyle(el).getPropertyValue("--my")) || 0;
      const nx = sx + (targetVars.current.x - sx) * step;
      const ny = sy + (targetVars.current.y - sy) * step;
      el.style.setProperty("--mx", nx.toFixed(4));
      el.style.setProperty("--my", ny.toFixed(4));
      if (
        Math.abs(nx - targetVars.current.x) > 0.001 ||
        Math.abs(ny - targetVars.current.y) > 0.001
      ) {
        rafRef.current = requestAnimationFrame(loop);
      } else {
        rafRef.current = 0;
      }
    };

    // Only enable on pointer devices
    const mq = window.matchMedia("(hover: hover) and (pointer: fine)");
    if (mq.matches) {
      el.addEventListener("mousemove", onMove);
      el.addEventListener("mouseleave", onLeave);
    }
    return () => {
      el.removeEventListener("mousemove", onMove);
      el.removeEventListener("mouseleave", onLeave);
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, []);

  return (
    <header 
      className={`hero ${isLoaded ? 'hero-loaded' : ''} ${entranceComplete ? 'entrance-complete' : ''}`} 
      aria-label="Giới thiệu tổng quan" 
      ref={heroRef}
    >
      <HeroBackground heroRef={heroRef} isLoaded={isLoaded} />
      <HeroHeader entranceComplete={entranceComplete} />
    </header>
  );
}

export default HeroSection;
