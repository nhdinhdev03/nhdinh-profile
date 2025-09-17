import { useEffect, useRef } from 'react';
import { useLocation } from 'react-router-dom';

// Component này sẽ tự động cuộn lên đầu trang khi route thay đổi
function ScrollToTopOnNavigate() {
  const { pathname, hash } = useLocation();
  const lastPathname = useRef(pathname);
  
  useEffect(() => {
    // Nếu có hash trong URL, cuộn đến phần tử đó
    if (hash) {
      const id = hash.replace('#', '');
      const element = document.getElementById(id);
      if (element) {
        setTimeout(() => {
          const headerOffset = 80;
          const elementPosition = element.getBoundingClientRect().top;
          const offsetPosition = elementPosition + window.pageYOffset - headerOffset;
          
          window.scrollTo({
            top: offsetPosition,
            behavior: 'smooth'
          });
        }, 100);
      }
      return;
    }
    
    // Nếu pathname thay đổi, cuộn lên đầu trang
    if (pathname !== lastPathname.current) {
      lastPathname.current = pathname;
      
      // Cuộn ngay lập tức cho UX tốt
      window.scrollTo({
        top: 0,
        left: 0,
        behavior: 'instant'
      });
    }
  }, [pathname, hash]);

  // Component này không render gì cả
  return null;
}

export default ScrollToTopOnNavigate;
