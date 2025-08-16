import React from 'react';
import PropTypes from 'prop-types';

const LoadingSpinner = ({ 
  size = 'md', // sm, md, lg, xl
  color = 'indigo', // indigo, gray, white, red, green, yellow, blue
  text,
  centered = false,
  overlay = false,
  className = ''
}) => {
  const sizes = {
    sm: 'h-4 w-4',
    md: 'h-6 w-6',
    lg: 'h-8 w-8',
    xl: 'h-12 w-12'
  };

  const colors = {
    indigo: 'border-indigo-600',
    gray: 'border-gray-600',
    white: 'border-white',
    red: 'border-red-600',
    green: 'border-green-600',
    yellow: 'border-yellow-600',
    blue: 'border-blue-600'
  };

  const spinnerClasses = `
    animate-spin rounded-full border-2 border-t-transparent
    ${sizes[size]}
    ${colors[color]}
    ${className}
  `.trim();

  const Spinner = () => (
    <div className={spinnerClasses}></div>
  );

  const Content = () => (
    <div className={`flex items-center ${text ? 'space-x-3' : ''}`}>
      <Spinner />
      {text && (
        <span className="text-sm font-medium text-gray-600">{text}</span>
      )}
    </div>
  );

  if (overlay) {
    return (
      <div className="fixed inset-0 bg-white bg-opacity-75 flex items-center justify-center z-50">
        <Content />
      </div>
    );
  }

  if (centered) {
    return (
      <div className="flex items-center justify-center p-8">
        <Content />
      </div>
    );
  }

  return <Content />;
};

LoadingSpinner.propTypes = {
  size: PropTypes.oneOf(['sm', 'md', 'lg', 'xl']),
  color: PropTypes.oneOf(['indigo', 'gray', 'white', 'red', 'green', 'yellow', 'blue']),
  text: PropTypes.string,
  centered: PropTypes.bool,
  overlay: PropTypes.bool,
  className: PropTypes.string
};

export default LoadingSpinner;
