import React from "react";
import PropTypes from "prop-types";
import "./Loading.scss";

// Loading Spinner Component
const LoadingSpinner = ({ size = 'medium', color = 'primary' }) => (
  <div className={`loading-spinner ${size} ${color}`}>
    <div className="spinner-ring">
      <div></div>
      <div></div>
      <div></div>
      <div></div>
    </div>
  </div>
);

LoadingSpinner.propTypes = {
  size: PropTypes.oneOf(['small', 'medium', 'large']),
  color: PropTypes.oneOf(['primary', 'secondary', 'accent']),
};

// Loading Dots Component
const LoadingDots = ({ color = 'primary' }) => (
  <div className={`loading-dots ${color}`}>
    <div className="dot dot-1"></div>
    <div className="dot dot-2"></div>
    <div className="dot dot-3"></div>
  </div>
);

LoadingDots.propTypes = {
  color: PropTypes.oneOf(['primary', 'secondary', 'accent']),
};

// Loading Pulse Component
const LoadingPulse = ({ size = 'medium' }) => (
  <div className={`loading-pulse ${size}`}>
    <div className="pulse-circle"></div>
  </div>
);

LoadingPulse.propTypes = {
  size: PropTypes.oneOf(['small', 'medium', 'large']),
};

// Loading Skeleton Component
const LoadingSkeleton = ({ width = '100%', height = '20px', borderRadius = '4px', className = '' }) => (
  <div 
    className={`loading-skeleton ${className}`}
    style={{ 
      width, 
      height, 
      borderRadius 
    }}
  />
);

LoadingSkeleton.propTypes = {
  width: PropTypes.string,
  height: PropTypes.string,
  borderRadius: PropTypes.string,
  className: PropTypes.string,
};

// Main Loading Component with different variants
const Loading = ({
  variant = 'spinner',
  size = 'medium',
  color = 'primary',
  text = 'Loading...',
  showText = true,
  fullScreen = false,
  className = '',
  children
}) => {
  const renderLoadingElement = () => {
    switch (variant) {
      case 'dots':
        return <LoadingDots color={color} />;
      case 'pulse':
        return <LoadingPulse size={size} />;
      case 'skeleton':
        return children || <LoadingSkeleton />;
      case 'spinner':
      default:
        return <LoadingSpinner size={size} color={color} />;
    }
  };

  const loadingContent = (
    <div className={`loading-content ${size}`}>
      {renderLoadingElement()}
      {showText && variant !== 'skeleton' && (
        <div className="loading-text">{text}</div>
      )}
    </div>
  );

  if (fullScreen) {
    return (
      <div className={`loading-overlay ${className}`}>
        {loadingContent}
      </div>
    );
  }

  return (
    <div className={`loading-container ${className}`}>
      {loadingContent}
    </div>
  );
};

Loading.propTypes = {
  variant: PropTypes.oneOf(['spinner', 'dots', 'pulse', 'skeleton']),
  size: PropTypes.oneOf(['small', 'medium', 'large']),
  color: PropTypes.oneOf(['primary', 'secondary', 'accent']),
  text: PropTypes.string,
  showText: PropTypes.bool,
  fullScreen: PropTypes.bool,
  className: PropTypes.string,
  children: PropTypes.node,
};

// Profile Loading Component (specific for About page)
export const ProfileLoading = ({ light }) => (
  <div className={`profile-loading ${light ? 'light-theme' : 'dark-theme'}`}>
    <div className="profile-loading-content">
      <div className="profile-avatar-skeleton">
        <LoadingSkeleton width="240px" height="240px" borderRadius="50%" />
      </div>
      <div className="profile-info-skeleton">
        <LoadingSkeleton width="300px" height="40px" className="name-skeleton" />
        <LoadingSkeleton width="200px" height="24px" className="title-skeleton" />
        <LoadingSkeleton width="100%" height="60px" className="description-skeleton" />
        <div className="badges-skeleton">
          <LoadingSkeleton width="120px" height="32px" borderRadius="16px" />
          <LoadingSkeleton width="150px" height="32px" borderRadius="16px" />
          <LoadingSkeleton width="130px" height="32px" borderRadius="16px" />
        </div>
      </div>
    </div>
  </div>
);

ProfileLoading.propTypes = {
  light: PropTypes.bool.isRequired,
};

// Stats Loading Component
export const StatsLoading = () => (
  <div className="stats-loading">
    {Array.from({ length: 4 }, (_, index) => (
      <div key={index} className="stat-card-skeleton">
        <LoadingSkeleton width="40px" height="40px" borderRadius="8px" className="stat-icon-skeleton" />
        <LoadingSkeleton width="60px" height="32px" className="stat-number-skeleton" />
        <LoadingSkeleton width="80px" height="16px" className="stat-label-skeleton" />
      </div>
    ))}
  </div>
);

// Projects Loading Component
export const ProjectsLoading = () => (
  <div className="projects-loading">
    {Array.from({ length: 6 }, (_, index) => (
      <div key={index} className="project-card-skeleton">
        <div className="project-header-skeleton">
          <LoadingSkeleton width="40px" height="40px" borderRadius="8px" />
          <LoadingSkeleton width="80px" height="24px" borderRadius="12px" />
        </div>
        <div className="project-content-skeleton">
          <LoadingSkeleton width="80%" height="24px" className="project-title-skeleton" />
          <LoadingSkeleton width="100%" height="48px" className="project-description-skeleton" />
          <div className="project-tech-skeleton">
            <LoadingSkeleton width="80px" height="24px" borderRadius="12px" />
            <LoadingSkeleton width="60px" height="24px" borderRadius="12px" />
            <LoadingSkeleton width="70px" height="24px" borderRadius="12px" />
          </div>
          <div className="project-links-skeleton">
            <LoadingSkeleton width="100px" height="36px" borderRadius="6px" />
            <LoadingSkeleton width="90px" height="36px" borderRadius="6px" />
          </div>
        </div>
      </div>
    ))}
  </div>
);

export default Loading;
