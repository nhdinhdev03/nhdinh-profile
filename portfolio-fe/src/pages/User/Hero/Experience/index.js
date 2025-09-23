// Optimized export with lazy loading support
export { default } from './Experience';

// Named exports for better tree-shaking
export { default as Experience } from './Experience';

// Pre-load hint for code splitting
export const preloadExperience = () => import('./Experience');