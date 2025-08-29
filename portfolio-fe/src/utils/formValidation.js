export const validateLoginForm = (username, password) => {
  const errors = {};
  
  if (!username || !username.trim()) {
    errors.username = "Bắt buộc";
  }
  
  if (!password || password.length < 6) {
    errors.password = "Ít nhất 6 ký tự";
  }
  
  return errors;
};


export const isValidEmail = (email) => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};


export const isValidPhone = (phone) => {
  // Vietnamese phone number format
  const phoneRegex = /^(\+84|84|0)(3|5|7|8|9)([0-9]{8})$/;
  return phoneRegex.test(phone.replace(/\s/g, ''));
};

/**
 * Form field validation constants
 */
export const VALIDATION_RULES = {
  USERNAME: {
    MIN_LENGTH: 3,
    MAX_LENGTH: 20,
    PATTERN: /^[a-zA-Z0-9._-]+$/
  },
  PASSWORD: {
    MIN_LENGTH: 6,
    RECOMMENDED_LENGTH: 8
  },
  FULLNAME: {
    MIN_LENGTH: 2,
    MAX_LENGTH: 50
  },
  PHONE: {
    PATTERN: /^(\+84|84|0)(3|5|7|8|9)([0-9]{8})$/
  },
  EMAIL: {
    PATTERN: /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  }
};
