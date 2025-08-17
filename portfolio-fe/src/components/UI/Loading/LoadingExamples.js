// Loading Components Export
// Professional loading components for reuse across the application

export { default } from './index.jsx';
export { 
  ProfileLoading, 
  StatsLoading, 
  ProjectsLoading 
} from './index.jsx';

// Usage Examples:
/*
// Basic spinner loading
<Loading />

// Custom spinner with text
<Loading 
  variant="spinner" 
  size="large" 
  color="primary" 
  text="Loading data..." 
/>

// Dots loading
<Loading variant="dots" color="accent" />

// Pulse loading
<Loading variant="pulse" size="large" />

// Skeleton loading with custom content
<Loading variant="skeleton">
  <div style={{ width: '200px', height: '20px', marginBottom: '10px' }} />
  <div style={{ width: '150px', height: '20px' }} />
</Loading>

// Full screen loading overlay
<Loading 
  variant="spinner" 
  fullScreen 
  text="Loading application..." 
/>

// Specialized loading components
<ProfileLoading light={theme.light} />
<StatsLoading />
<ProjectsLoading />

// Inline loading (for buttons, etc.)
<div className="loading-inline">
  <Loading variant="spinner" size="small" showText={false} />
  Loading...
</div>
*/
