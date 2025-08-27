import { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';

/**
 * Custom hook để quản lý loading state khi chuyển trang
 * @param {number} delay - Thời gian delay loading (ms)
 * @returns {boolean} - Loading state
 */
export const usePageLoading = (delay = 300) => {
  const [isLoading, setIsLoading] = useState(false);
  const location = useLocation();

  useEffect(() => {
    setIsLoading(true);
    
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, delay);

    return () => {
      clearTimeout(timer);
    };
  }, [location.pathname, delay]);

  return isLoading;
};

/**
 * Custom hook để quản lý loading state cho navigation
 * @returns {object} - Loading state và functions
 */
export const useNavigationLoading = () => {
  const [loadingRoute, setLoadingRoute] = useState(null);

  const startLoading = (route) => {
    setLoadingRoute(route);
  };

  const stopLoading = () => {
    setLoadingRoute(null);
  };

  const isLoading = (route) => {
    return loadingRoute === route;
  };

  return {
    loadingRoute,
    startLoading,
    stopLoading,
    isLoading
  };
};
