import React, { forwardRef } from 'react';
import PropTypes from 'prop-types';
import { ExclamationCircleIcon } from '@heroicons/react/24/outline';

const Textarea = forwardRef(({
  label,
  placeholder,
  value,
  onChange,
  onBlur,
  error,
  disabled = false,
  required = false,
  rows = 4,
  maxLength,
  resize = 'vertical', // none, both, horizontal, vertical
  fullWidth = true,
  className = '',
  ...props
}, ref) => {
  const resizeClasses = {
    none: 'resize-none',
    both: 'resize',
    horizontal: 'resize-x',
    vertical: 'resize-y'
  };

  const textareaClasses = `
    w-full px-4 py-2.5 text-sm
    ${error ? 'border-red-300 focus:border-red-500 focus:ring-red-500' : 'border-gray-300 focus:border-indigo-500 focus:ring-indigo-500'}
    ${disabled ? 'bg-gray-50 text-gray-500 cursor-not-allowed' : 'bg-white text-gray-900'}
    ${resizeClasses[resize]}
    border rounded-lg focus:outline-none focus:ring-2 focus:ring-opacity-50 transition-colors
    ${className}
  `.trim();

  return (
    <div className="space-y-1">
      {label && (
        <label className="block text-sm font-medium text-gray-700">
          {label}
          {required && <span className="text-red-500 ml-1">*</span>}
        </label>
      )}
      
      <div className="relative">
        <textarea
          ref={ref}
          value={value}
          onChange={onChange}
          onBlur={onBlur}
          placeholder={placeholder}
          disabled={disabled}
          rows={rows}
          maxLength={maxLength}
          className={textareaClasses}
          {...props}
        />
        
        {error && (
          <div className="absolute top-2 right-2 flex items-center pointer-events-none">
            <ExclamationCircleIcon className="h-5 w-5 text-red-500" />
          </div>
        )}
      </div>
      
      <div className="flex justify-between items-center">
        {error && (
          <p className="text-sm text-red-600 flex items-center">
            <ExclamationCircleIcon className="h-4 w-4 mr-1" />
            {error}
          </p>
        )}
        
        {maxLength && (
          <p className={`text-xs ml-auto ${
            value && value.length > maxLength * 0.9 
              ? 'text-yellow-600' 
              : 'text-gray-500'
          }`}>
            {value ? value.length : 0}/{maxLength}
          </p>
        )}
      </div>
    </div>
  );
});

Textarea.displayName = 'Textarea';

Textarea.propTypes = {
  label: PropTypes.string,
  placeholder: PropTypes.string,
  value: PropTypes.string,
  onChange: PropTypes.func,
  onBlur: PropTypes.func,
  error: PropTypes.string,
  disabled: PropTypes.bool,
  required: PropTypes.bool,
  rows: PropTypes.number,
  maxLength: PropTypes.number,
  resize: PropTypes.oneOf(['none', 'both', 'horizontal', 'vertical']),
  fullWidth: PropTypes.bool,
  className: PropTypes.string
};

export default Textarea;
