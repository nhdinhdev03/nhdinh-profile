import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import './PageTransition.scss';

const PageTransition = ({ children }) => {
  const location = useLocation();
  const [displayLocation, setDisplayLocation] = useState(location);
  const [transitionStage, setTransitionStage] = useState("fadeIn");
  const [isHome, setIsHome] = useState(location.pathname === "/" || location.pathname === "");
  
  useEffect(() => {
    const currentIsHome = location.pathname === "/" || location.pathname === "";
    
    if (location.pathname !== displayLocation.pathname) {
      setTransitionStage("fadeOut");
      
      const timeout = setTimeout(() => {
        setDisplayLocation(location);
        setIsHome(currentIsHome);
        setTransitionStage("fadeIn");
      }, 300); // match transition duration in CSS
      
      return () => clearTimeout(timeout);
    }
  }, [location, displayLocation]);

  return (
    <div 
      className={`page-transition ${transitionStage} ${isHome ? 'home-transition' : ''}`}
      aria-live="polite"
    >
      {children}
    </div>
  );
};

export default PageTransition;
