// Optimized export with lazy loading support
export { default } from './CommunityTestimonials';

// Named exports for better tree-shaking
export { default as CommunityTestimonials } from './CommunityTestimonials';

// Pre-load hint for code splitting
export const preloadCommunityTestimonials = () => import('./CommunityTestimonials');