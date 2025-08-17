import React, { useState } from 'react';
import { LoadingSpinner, LoadingPage, LoadingOverlay } from './index';
import './LoadingDemo.scss';

/**
 * Demo component to showcase all loading variants
 * Use this for testing and choosing the right loading style
 */
const LoadingDemo = () => {
  const [selectedVariant, setSelectedVariant] = useState('modern');
  const [selectedSize, setSelectedSize] = useState('medium');
  const [selectedColor, setSelectedColor] = useState('primary');
  const [showOverlay, setShowOverlay] = useState(false);
  const [showPage, setShowPage] = useState(false);
  const [progress, setProgress] = useState(65);

  const variants = [
    'default',
    'dots',
    'pulse',
    'wave',
    'orbit',
    'gradient',
    'modern',
    'skeleton',
    'quantum'
  ];

  const sizes = ['small', 'medium', 'large', 'xlarge'];
  const colors = ['primary', 'secondary', 'accent', 'neutral'];

  return (
    <div className="loading-demo">
      <h1 className="loading-demo__title">Loading Components Demo</h1>
      
      {/* Controls */}
      <div className="loading-demo__controls">
        <div className="loading-demo__control-group">
          <label>Variant:</label>
          <select 
            value={selectedVariant} 
            onChange={(e) => setSelectedVariant(e.target.value)}
          >
            {variants.map(variant => (
              <option key={variant} value={variant}>
                {variant.charAt(0).toUpperCase() + variant.slice(1)}
              </option>
            ))}
          </select>
        </div>

        <div className="loading-demo__control-group">
          <label>Size:</label>
          <select 
            value={selectedSize} 
            onChange={(e) => setSelectedSize(e.target.value)}
          >
            {sizes.map(size => (
              <option key={size} value={size}>
                {size.charAt(0).toUpperCase() + size.slice(1)}
              </option>
            ))}
          </select>
        </div>

        <div className="loading-demo__control-group">
          <label>Color:</label>
          <select 
            value={selectedColor} 
            onChange={(e) => setSelectedColor(e.target.value)}
          >
            {colors.map(color => (
              <option key={color} value={color}>
                {color.charAt(0).toUpperCase() + color.slice(1)}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Current Selection Preview */}
      <div className="loading-demo__preview">
        <h3>Current Selection:</h3>
        <div className="loading-demo__preview-container">
          <LoadingSpinner
            variant={selectedVariant}
            size={selectedSize}
            color={selectedColor}
            text="Loading..."
          />
        </div>
      </div>

      {/* All Variants Grid */}
      <div className="loading-demo__grid">
        <h3>All Variants Preview:</h3>
        <div className="loading-demo__variants">
          {variants.map(variant => (
            <div key={variant} className="loading-demo__variant">
              <h4>{variant.charAt(0).toUpperCase() + variant.slice(1)}</h4>
              <div className="loading-demo__variant-container">
                <LoadingSpinner
                  variant={variant}
                  size="medium"
                  color="primary"
                />
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Different Sizes */}
      <div className="loading-demo__sizes">
        <h3>Size Variations (Modern variant):</h3>
        <div className="loading-demo__size-row">
          {sizes.map(size => (
            <div key={size} className="loading-demo__size-item">
              <h4>{size.charAt(0).toUpperCase() + size.slice(1)}</h4>
              <LoadingSpinner
                variant="modern"
                size={size}
                color="primary"
              />
            </div>
          ))}
        </div>
      </div>

      {/* Color Variations */}
      <div className="loading-demo__colors">
        <h3>Color Variations (Modern variant):</h3>
        <div className="loading-demo__color-row">
          {colors.map(color => (
            <div key={color} className="loading-demo__color-item">
              <h4>{color.charAt(0).toUpperCase() + color.slice(1)}</h4>
              <LoadingSpinner
                variant="modern"
                size="medium"
                color={color}
              />
            </div>
          ))}
        </div>
      </div>

      {/* Overlay and Page Demos */}
      <div className="loading-demo__special">
        <h3>Special Components:</h3>
        
        <div className="loading-demo__buttons">
          <button 
            onClick={() => setShowOverlay(!showOverlay)}
            className="loading-demo__button"
          >
            {showOverlay ? 'Hide' : 'Show'} Loading Overlay
          </button>
          
          <button 
            onClick={() => setShowPage(!showPage)}
            className="loading-demo__button"
          >
            Show Loading Page (3s)
          </button>
        </div>

        <LoadingOverlay show={showOverlay} variant="quantum" message="Processing...">
          <div className="loading-demo__overlay-content">
            <h4>This content will be blurred when overlay is active</h4>
            <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</p>
            <div className="loading-demo__cards">
              <div className="loading-demo__card">Card 1</div>
              <div className="loading-demo__card">Card 2</div>
              <div className="loading-demo__card">Card 3</div>
            </div>
          </div>
        </LoadingOverlay>
      </div>

      {/* Progress Demo */}
      <div className="loading-demo__progress">
        <h3>Progress Demo:</h3>
        <div className="loading-demo__progress-controls">
          <label>Progress: {progress}%</label>
          <input
            type="range"
            min="0"
            max="100"
            value={progress}
            onChange={(e) => setProgress(parseInt(e.target.value))}
            className="loading-demo__slider"
          />
        </div>
        <div className="loading-demo__progress-preview">
          <div style={{ width: '300px', padding: '20px', border: '1px solid #e2e8f0', borderRadius: '8px' }}>
            <LoadingPage
              variant="modern"
              message="Loading your content..."
              showProgress={true}
              progress={progress}
              className="loading-demo__progress-page"
            />
          </div>
        </div>
      </div>

      {showPage && (
        <LoadingPage
          variant="quantum"
          message="Đang tải trang..."
          showProgress={true}
          progress={75}
          onAnimationEnd={() => {
            setTimeout(() => setShowPage(false), 3000);
          }}
        />
      )}
    </div>
  );
};

export default LoadingDemo;
