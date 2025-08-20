import React from 'react';
import PropTypes from 'prop-types';
import LoadingSpinner from './LoadingSpinner';
import './LoadingOverlay.scss';

/**
 * Loading Overlay Component
 * For showing loading state over existing content
 */
const LoadingOverlay = ({
  show = false,
  variant = 'default',
  message = '',
  blur = true,
  className = '',
  children,
  ...props
}) => {
  if (!show) {
    return children;
  }

  return (
    <div className={`loading-overlay ${className}`} {...props}>
      {children && (
        <div className={`loading-overlay__content ${blur ? 'loading-overlay__content--blur' : ''}`}>
          {children}
        </div>
      )}
      <div className="loading-overlay__spinner">
        <LoadingSpinner
          variant={variant}
          size="large"
          text={message}
          color="primary"
        />
      </div>
    </div>
  );
};

LoadingOverlay.propTypes = {
  show: PropTypes.bool,
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
  blur: PropTypes.bool,
  className: PropTypes.string,
  children: PropTypes.node,
};

export default LoadingOverlay;
