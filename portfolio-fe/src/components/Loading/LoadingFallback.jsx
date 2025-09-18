import PropTypes from "prop-types";
import { memo, useEffect, useState } from "react";
import "./LoadingFallback.scss";


const LoadingFallback = memo(({ 
  theme = 'dark', 
  loadingText = "Loading", 
  progress = null 
}) => {
  const [currentText, setCurrentText] = useState(loadingText);
  const [dotCount, setDotCount] = useState(0);

  // Animated loading text effect
  useEffect(() => {
    const interval = setInterval(() => {
      setDotCount(prev => (prev + 1) % 4);
    }, 500);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    setCurrentText(loadingText + '.'.repeat(dotCount));
  }, [loadingText, dotCount]);

  return (
    <div className={`loading-fallback ${theme === 'light' ? 'theme-light' : ''}`}>
      <div className="loading-content">
        {/* Brand Section */}
        <div className="loading-brand">
          <div className="loading-brand__icon">
            <div className="loading-brand__icon-inner">
              <span>NH</span>
            </div>
          </div>
          <div className="loading-brand__text">
            <h1>nhdinh</h1>
            <p>Portfolio</p>
          </div>
        </div>

        {/* Modern Spinner */}
        <div className="loading-spinner">
          <div className="loading-spinner__outer">
            <div className="loading-spinner__inner">
              <div className="loading-spinner__core"></div>
            </div>
          </div>
          <div className="loading-spinner__particles">
            {[...Array(8)].map((_, i) => (
              <div key={i} className={`loading-spinner__particle loading-spinner__particle--${i + 1}`}></div>
            ))}
          </div>
        </div>

        {/* Loading Text */}
        <div className="loading-text">
          <span className="loading-text__main">{currentText}</span>
          <span className="loading-text__sub">Preparing your experience</span>
        </div>

        {/* Progress Bar (if progress prop is provided) */}
        {progress !== null && (
          <div className="loading-progress">
            <div className="loading-progress__bar">
              <div 
                className="loading-progress__fill" 
                style={{ width: `${Math.min(100, Math.max(0, progress))}%` }}
              ></div>
            </div>
            <div className="loading-progress__text">{Math.round(progress)}%</div>
          </div>
        )}

        {/* Decorative Elements */}
        <div className="loading-decorative">
          <div className="loading-decorative__line loading-decorative__line--1"></div>
          <div className="loading-decorative__line loading-decorative__line--2"></div>
          <div className="loading-decorative__dot loading-decorative__dot--1"></div>
          <div className="loading-decorative__dot loading-decorative__dot--2"></div>
        </div>
      </div>
    </div>
  );
});

LoadingFallback.displayName = 'LoadingFallback';

LoadingFallback.propTypes = {
  theme: PropTypes.oneOf(['dark', 'light']),
  loadingText: PropTypes.string,
  progress: PropTypes.number
};

export default LoadingFallback;