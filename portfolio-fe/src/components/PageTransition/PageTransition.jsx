import React, { useEffect, useState, useCallback } from 'react';
import { useLocation } from 'react-router-dom';
import './PageTransition.scss';
import useIsMobile from 'hooks/useIsMobile';

const PageTransition = ({ children }) => {
  const location = useLocation();
  const [displayLocation, setDisplayLocation] = useState(location);
  const [transitionStage, setTransitionStage] = useState("fadeIn");
  const [isHome, setIsHome] = useState(location.pathname === "/" || location.pathname === "");
  const { isMobile } = useIsMobile();
  
  const handleTransition = useCallback(() => {
    const currentIsHome = location.pathname === "/" || location.pathname === "";
    
    if (location.pathname !== displayLocation.pathname) {
      setTransitionStage("fadeOut");
      
      // Faster transition for mobile
      const timeout = setTimeout(() => {
        setDisplayLocation(location);
        setIsHome(currentIsHome);
        setTransitionStage("fadeIn");
      }, isMobile ? 60 : 80);
      
      return () => clearTimeout(timeout);
    }
  }, [location, displayLocation, isMobile]);

  useEffect(() => {
    return handleTransition();
  }, [handleTransition]);

  return (
    <div 
      className={`page-transition ${transitionStage} ${isHome ? 'home-transition' : ''} ${isMobile ? 'mobile-transition' : ''}`}
      aria-live="polite"
    >
      {children}
    </div>
  );
};

export default PageTransition;
