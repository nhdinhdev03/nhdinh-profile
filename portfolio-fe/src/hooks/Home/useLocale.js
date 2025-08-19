import { useMemo } from 'react';
import { useLocation } from 'react-router-dom';

/**
 * Hook để detect locale từ URL path
 * Ví dụ: /vi/about → 'vi', /en/projects → 'en'
 */
const useLocale = () => {
  const location = useLocation();

  const locale = useMemo(() => {
    const pathSegments = location.pathname.split('/').filter(Boolean);
    const firstSegment = pathSegments[0];
    
    // Kiểm tra nếu segment đầu tiên là locale hợp lệ
    const supportedLocales = ['vi', 'en'];
    if (supportedLocales.includes(firstSegment)) {
      return firstSegment;
    }
    
    // Fallback về vi nếu không tìm thấy locale trong URL
    return 'vi';
  }, [location.pathname]);

  return {
    locale,
    isVietnamese: locale === 'vi',
    isEnglish: locale === 'en'
  };
};

export default useLocale;
