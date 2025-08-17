import React from 'react';
import PropTypes from 'prop-types';
import './LoadingSpinner.scss';

/**
 * Modern Loading Spinner Component
 * Supports multiple variants and dark/light mode
 */
const LoadingSpinner = ({
  variant = 'default',
  size = 'medium',
  text = '',
  overlay = false,
  color = 'primary',
  className = '',
  ...props
}) => {
  const baseClass = 'loading-spinner';
  const classes = [
    baseClass,
    `${baseClass}--${variant}`,
    `${baseClass}--${size}`,
    `${baseClass}--${color}`,
    overlay && `${baseClass}--overlay`,
    className
  ].filter(Boolean).join(' ');

  const renderSpinner = () => {
    switch (variant) {
      case 'dots':
        return (
          <div className={`${baseClass}__dots`}>
            <div className={`${baseClass}__dot`}></div>
            <div className={`${baseClass}__dot`}></div>
            <div className={`${baseClass}__dot`}></div>
          </div>
        );

      case 'pulse':
        return (
          <div className={`${baseClass}__pulse`}>
            <div className={`${baseClass}__pulse-ring`}></div>
            <div className={`${baseClass}__pulse-ring`}></div>
            <div className={`${baseClass}__pulse-ring`}></div>
          </div>
        );

      case 'wave':
        return (
          <div className={`${baseClass}__wave`}>
            <div className={`${baseClass}__wave-bar`}></div>
            <div className={`${baseClass}__wave-bar`}></div>
            <div className={`${baseClass}__wave-bar`}></div>
            <div className={`${baseClass}__wave-bar`}></div>
            <div className={`${baseClass}__wave-bar`}></div>
          </div>
        );

      case 'orbit':
        return (
          <div className={`${baseClass}__orbit`}>
            <div className={`${baseClass}__orbit-ring`}>
              <div className={`${baseClass}__orbit-planet`}></div>
            </div>
          </div>
        );

      case 'gradient':
        return (
          <div className={`${baseClass}__gradient`}>
            <div className={`${baseClass}__gradient-inner`}></div>
          </div>
        );

      case 'modern':
        return (
          <div className={`${baseClass}__modern`}>
            <div className={`${baseClass}__modern-arc`}></div>
            <div className={`${baseClass}__modern-arc`}></div>
          </div>
        );

      case 'skeleton':
        return (
          <div className={`${baseClass}__skeleton`}>
            <div className={`${baseClass}__skeleton-line`}></div>
            <div className={`${baseClass}__skeleton-line`}></div>
            <div className={`${baseClass}__skeleton-line`}></div>
          </div>
        );

      case 'quantum':
        return (
          <div className={`${baseClass}__quantum`}>
            <div className={`${baseClass}__quantum-core`}>
              <div className={`${baseClass}__quantum-particle`}></div>
              <div className={`${baseClass}__quantum-particle`}></div>
              <div className={`${baseClass}__quantum-particle`}></div>
            </div>
          </div>
        );

      default:
        return <div className={`${baseClass}__default`}></div>;
    }
  };

  return (
    <div className={classes} {...props}>
      <div className={`${baseClass}__container`}>
        {renderSpinner()}
        {text && (
          <div className={`${baseClass}__text`}>
            {text}
          </div>
        )}
      </div>
    </div>
  );
};

LoadingSpinner.propTypes = {
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
  size: PropTypes.oneOf(['small', 'medium', 'large', 'xlarge']),
  text: PropTypes.string,
  overlay: PropTypes.bool,
  color: PropTypes.oneOf(['primary', 'secondary', 'accent', 'neutral']),
  className: PropTypes.string,
};

export default LoadingSpinner;
