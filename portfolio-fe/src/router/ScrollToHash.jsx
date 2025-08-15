import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";

export default function ScrollToTop() {
  const { pathname } = useLocation();
  const [prevPathname, setPrevPathname] = useState("");
  
  useEffect(() => {
    // Save previous pathname to detect navigation direction
    if (prevPathname !== pathname) {
      setPrevPathname(pathname);
      
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
  }, [pathname, prevPathname]);
  
  return null;
}
