import { useEffect } from 'react';
import { useLocation, useNavigationType } from 'react-router-dom';

// Hook để lưu và khôi phục vị trí cuộn cho các trang
function useSaveScrollPosition(savePath = true) {
  const { pathname } = useLocation();
  const navigationType = useNavigationType();
  
  useEffect(() => {
    // Lưu vị trí cuộn hiện tại vào sessionStorage khi rời khỏi trang
    return () => {
      if (savePath) {
        sessionStorage.setItem(
          `scrollPosition-${pathname}`,
          window.scrollY.toString()
        );
      }
    };
  }, [pathname, savePath]);
  
  // Khôi phục vị trí cuộn khi người dùng sử dụng nút Back hoặc Forward
  useEffect(() => {
    if (navigationType === 'POP') {
      const savedPosition = sessionStorage.getItem(`scrollPosition-${pathname}`);
      if (savedPosition) {
        setTimeout(() => {
          window.scrollTo({
            top: parseInt(savedPosition, 10),
            behavior: 'auto' // Sử dụng auto để tránh xung đột với ScrollToTop
          });
        }, 100);
      }
    }
  }, [pathname, navigationType]);
}

export default useSaveScrollPosition;
