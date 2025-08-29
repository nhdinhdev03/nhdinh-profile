import { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';

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
