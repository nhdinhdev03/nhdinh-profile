import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";

export default function ScrollToHash() {
  const { pathname, hash } = useLocation();
  const [prevPathname, setPrevPathname] = useState("");
  
  useEffect(() => {
    // Save previous pathname to detect navigation direction
    if (prevPathname !== pathname) {
      setPrevPathname(pathname);
      
      // Check if there's a hash in the URL
      if (hash) {
        // Wait for the component to render then scroll to the hash
        const timer = setTimeout(() => {
          const element = document.getElementById(hash.replace('#', ''));
          if (element) {
            element.scrollIntoView({ 
              behavior: 'smooth',
              block: 'start'
            });
          }
        }, 100);
        
        return () => clearTimeout(timer);
      } else {
        // Only use smooth scrolling when returning to home page
        const isGoingHome = pathname === "/" || pathname === "";
        const behavior = isGoingHome ? "smooth" : "instant";
        
        // Use requestAnimationFrame to ensure smoother transition
        requestAnimationFrame(() => {
          window.scrollTo({ 
            top: 0, 
            left: 0, 
            behavior: behavior 
          });
        });
      }
    }
  }, [pathname, hash, prevPathname]);
  
  // Also handle hash changes on the same page
  useEffect(() => {
    if (hash) {
      const timer = setTimeout(() => {
        const element = document.getElementById(hash.replace('#', ''));
        if (element) {
          element.scrollIntoView({ 
            behavior: 'smooth',
            block: 'start'
          });
        }
      }, 100);
      
      return () => clearTimeout(timer);
    }
  }, [hash]);
  
  return null;
}
