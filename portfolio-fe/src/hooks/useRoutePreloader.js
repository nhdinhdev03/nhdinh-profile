import { useCallback, useRef } from 'react';

// Route preloading mappings
const ROUTE_PRELOADERS = {
  '/': () => import('pages/User/Hero/Hero'),
  '/v1/about': () => import('pages/User/About/About'),
  '/v1/skills': () => import('pages/User/Skills/Skills'),
  '/v1/projects': () => import('pages/User/Projects/Projects'),
  '/v1/blog': () => import('pages/User/Blog/Blog'),
  '/v1/contact': () => import('pages/User/Contact/Contact'),
};

export const useRoutePreloader = () => {
  const preloadedRoutes = useRef(new Set());
  
  const preloadRoute = useCallback((path) => {
    // Avoid preloading the same route multiple times
    if (preloadedRoutes.current.has(path)) {
      return;
    }
    
    const preloader = ROUTE_PRELOADERS[path];
    if (preloader) {
      preloadedRoutes.current.add(path);
      preloader().catch((error) => {
        console.warn(`Failed to preload route: ${path}`, error);
        // Remove from preloaded set so it can be retried
        preloadedRoutes.current.delete(path);
      });
    }
  }, []);
  
  const preloadAllRoutes = useCallback(() => {
    Object.keys(ROUTE_PRELOADERS).forEach(path => {
      preloadRoute(path);
    });
  }, [preloadRoute]);
  
  return { preloadRoute, preloadAllRoutes };
};