import React from 'react';
import { ExclamationTriangleIcon } from '@heroicons/react/24/outline';

const ValidationError = ({ error, className = '' }) => {
  if (!error) return null;

  return (
    <div className={`flex items-center gap-2 text-red-600 text-sm mt-1 ${className}`}>
      <ExclamationTriangleIcon className="w-4 h-4 flex-shrink-0" />
      <span>{error}</span>
    </div>
  );
};

const FormField = ({ 
  label, 
  error, 
  required = false, 
  children, 
  description = null,
  className = ''
}) => {
  return (
    <div className={`form-field ${className}`}>
      <label className="block text-sm font-medium text-gray-700 mb-2">
        {label}
        {required && <span className="text-red-500 ml-1">*</span>}
      </label>
      
      {description && (
        <p className="text-xs text-gray-500 mb-2">{description}</p>
      )}
      
      <div className={`form-input-wrapper ${error ? 'error' : ''}`}>
        {children}
      </div>
      
      <ValidationError error={error} />
    </div>
  );
};

export { ValidationError, FormField };
