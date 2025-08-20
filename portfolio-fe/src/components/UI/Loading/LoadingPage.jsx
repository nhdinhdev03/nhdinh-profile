import React from 'react';
import PropTypes from 'prop-types';
import LoadingSpinner from './LoadingSpinner';
import './LoadingPage.scss';

/**
 * Full Page Loading Component
 * Perfect for initial app loading or page transitions
 */
const LoadingPage = ({
  variant = 'modern',
  message = 'Đang tải...',
  showProgress = false,
  progress = 0,
  logo = null,
  className = '',
  ...props
}) => {
  return (
    <div className={`loading-page ${className}`} {...props}>
      <div className="loading-page__container">
        {logo && (
          <div className="loading-page__logo">
            {typeof logo === 'string' ? (
              <img src={logo} alt="Logo" className="loading-page__logo-img" />
            ) : (
              logo
            )}
          </div>
        )}
        
        <LoadingSpinner
          variant={variant}
          size="large"
          color="primary"
          className="loading-page__spinner"
        />
        
        {message && (
          <div className="loading-page__message">
            {message}
          </div>
        )}
        
        {showProgress && (
          <div className="loading-page__progress">
            <div className="loading-page__progress-bar">
              <div 
                className="loading-page__progress-fill"
                style={{ width: `${Math.max(0, Math.min(100, progress))}%` }}
              />
            </div>
            <div className="loading-page__progress-text">
              {Math.round(progress)}%
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

LoadingPage.propTypes = {
  variant: PropTypes.oneOf([
    'default',
    'dots',
    'pulse',
    'wave',
    'orbit',
    'gradient',
    'modern',
    'skeleton',
    'quantum'
  ]),
  message: PropTypes.string,
  showProgress: PropTypes.bool,
  progress: PropTypes.number,
  logo: PropTypes.oneOfType([PropTypes.string, PropTypes.node]),
  className: PropTypes.string,
};

export default LoadingPage;
