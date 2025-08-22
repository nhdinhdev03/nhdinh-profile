import React from 'react';
import './LoadingSpinner.scss';

// Basic spinner component
export const LoadingSpinner = ({ size = 'medium', color = 'primary' }) => (
  <div className={`loading-spinner loading-spinner--${size} loading-spinner--${color}`}>
    <div className="loading-spinner__circle"></div>
  </div>
);

// Skeleton loader for cards
export const SkeletonCard = () => (
  <div className="skeleton-card">
    <div className="skeleton-card__header">
      <div className="skeleton skeleton--circle"></div>
      <div className="skeleton skeleton--text skeleton--text-short"></div>
    </div>
    <div className="skeleton-card__body">
      <div className="skeleton skeleton--text skeleton--text-title"></div>
      <div className="skeleton skeleton--text skeleton--text-long"></div>
      <div className="skeleton skeleton--text skeleton--text-medium"></div>
    </div>
    <div className="skeleton-card__footer">
      <div className="skeleton skeleton--button"></div>
      <div className="skeleton skeleton--button"></div>
    </div>
  </div>
);

// Skeleton loader for list items
export const SkeletonListItem = () => (
  <div className="skeleton-list-item">
    <div className="skeleton skeleton--circle"></div>
    <div className="skeleton-list-item__content">
      <div className="skeleton skeleton--text skeleton--text-title"></div>
      <div className="skeleton skeleton--text skeleton--text-medium"></div>
    </div>
    <div className="skeleton skeleton--button"></div>
  </div>
);

// Loading overlay component
export const LoadingOverlay = ({ isVisible, message = 'Đang tải...' }) => {
  if (!isVisible) return null;

  return (
    <div className="loading-overlay">
      <div className="loading-overlay__content">
        <LoadingSpinner size="large" />
        <p className="loading-overlay__message">{message}</p>
      </div>
    </div>
  );
};

// Page loading component
export const PageLoading = ({ message = 'Đang tải...' }) => (
  <div className="page-loading">
    <div className="page-loading__content">
      <LoadingSpinner size="large" />
      <h3 className="page-loading__title">{message}</h3>
    </div>
  </div>
);

// Inline loading component
export const InlineLoading = ({ message = 'Đang tải...' }) => (
  <div className="inline-loading">
    <LoadingSpinner size="small" />
    <span className="inline-loading__message">{message}</span>
  </div>
);

// Lazy loading wrapper
export const LazyWrapper = ({ 
  children, 
  fallback = <PageLoading />,
  error = null 
}) => {
  if (error) {
    return (
      <div className="lazy-error">
        <p>Không thể tải component. Vui lòng thử lại.</p>
        <button onClick={() => window.location.reload()}>
          Tải lại
        </button>
      </div>
    );
  }

  return (
    <React.Suspense fallback={fallback}>
      {children}
    </React.Suspense>
  );
};

export default LoadingSpinner;
