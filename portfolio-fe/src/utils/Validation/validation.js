import { useCallback, useRef } from 'react';

/**
 * Custom hook for debouncing function calls
 * @param {Function} func - Function to debounce
 * @param {number} delay - Delay in milliseconds
 * @returns {Function} Debounced function
 */
export const useDebounce = (func, delay) => {
  const timeoutRef = useRef(null);

  const debouncedFunction = useCallback((...args) => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }
    
    timeoutRef.current = setTimeout(() => {
      func.apply(null, args);
    }, delay);
  }, [func, delay]);

  // Cleanup function
  const cancel = useCallback(() => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
      timeoutRef.current = null;
    }
  }, []);

  return { debouncedFunction, cancel };
};

/**
 * Validation utility functions
 */
export const ValidationUtils = {
  // Check if string is empty or only whitespace
  isEmpty: (value) => {
    return !value || !value.toString().trim();
  },

  // Validate email format
  isValidEmail: (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  },

  // Check minimum length
  minLength: (value, min) => {
    return value && value.toString().trim().length >= min;
  },

  // Check maximum length
  maxLength: (value, max) => {
    return !value || value.toString().trim().length <= max;
  },

  // Validate URL format
  isValidUrl: (url) => {
    try {
      new URL(url);
      return true;
    } catch {
      return false;
    }
  },

  // Validate phone number (basic)
  isValidPhone: (phone) => {
    const phoneRegex = /^[+]?[\d\s\-()]{8,}$/;
    return phoneRegex.test(phone);
  },

  // Check if value contains only alphanumeric characters
  isAlphanumeric: (value) => {
    const alphanumericRegex = /^[a-zA-Z0-9]+$/;
    return alphanumericRegex.test(value);
  },

  // Custom validation for hero section
  validateHeroFields: (heroSection) => {
    const errors = {};
    
    // Validate preHeading
    if (ValidationUtils.isEmpty(heroSection.preHeading)) {
      errors.preHeading = "Pre-heading không được để trống";
    } else if (!ValidationUtils.maxLength(heroSection.preHeading, 100)) {
      errors.preHeading = "Pre-heading không được quá 100 ký tự";
    }
    
    // Validate heading
    if (ValidationUtils.isEmpty(heroSection.heading)) {
      errors.heading = "Heading không được để trống";
    } else if (!ValidationUtils.maxLength(heroSection.heading, 200)) {
      errors.heading = "Heading không được quá 200 ký tự";
    }
    
    // Validate introHtml
    if (ValidationUtils.isEmpty(heroSection.introHtml)) {
      errors.introHtml = "Nội dung giới thiệu không được để trống";
    } else if (!ValidationUtils.maxLength(heroSection.introHtml, 2000)) {
      errors.introHtml = "Nội dung giới thiệu không được quá 2000 ký tự";
    }
    
    return errors;
  },

  // Validate sub-heading
  validateSubHeading: (text, existingSubHeadings = []) => {
    const errors = [];
    
    if (ValidationUtils.isEmpty(text)) {
      errors.push("Sub-heading không được để trống");
    } else {
      if (!ValidationUtils.maxLength(text, 150)) {
        errors.push("Sub-heading không được quá 150 ký tự");
      }
      
      if (existingSubHeadings.some(sub => 
        sub.text.toLowerCase() === text.trim().toLowerCase()
      )) {
        errors.push("Sub-heading này đã tồn tại");
      }
    }
    
    return errors;
  }
};

/**
 * Error message formatter
 */
export const ErrorFormatter = {
  // Format API error messages
  formatApiError: (error) => {
    if (error.response?.data?.message) {
      return error.response.data.message;
    }
    
    if (error.response?.data?.errors) {
      const errors = error.response.data.errors;
      if (Array.isArray(errors)) {
        return errors.join(', ');
      }
      if (typeof errors === 'object') {
        return Object.values(errors).join(', ');
      }
    }
    
    if (error.message) {
      // Handle specific error types
      if (error.message.includes('UNIQUE KEY constraint') || 
          error.message.includes('duplicate key')) {
        return 'Dữ liệu đã tồn tại. Vui lòng kiểm tra lại.';
      }
      
      if (error.message.includes('Network Error')) {
        return 'Lỗi kết nối mạng. Vui lòng kiểm tra kết nối internet.';
      }
      
      if (error.message.includes('timeout')) {
        return 'Yêu cầu đã hết thời gian chờ. Vui lòng thử lại.';
      }
      
      return error.message;
    }
    
    return 'Có lỗi không xác định xảy ra';
  },

  // Format validation errors for display
  formatValidationErrors: (errors) => {
    if (typeof errors === 'string') {
      return errors;
    }
    
    if (Array.isArray(errors)) {
      return errors.join(', ');
    }
    
    if (typeof errors === 'object') {
      return Object.values(errors).join(', ');
    }
    
    return 'Lỗi validation không xác định';
  }
};

const validationHelpers = {
  useDebounce,
  ValidationUtils,
  ErrorFormatter
};

export default validationHelpers;
