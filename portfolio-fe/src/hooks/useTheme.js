import { useEffect, useState } from 'react';

export const useTheme = (initialTheme = 'dark') => {
  const getInitialTheme = () => {
    try {
      // Ưu tiên lấy từ document attribute (đã được set bởi inline script)
      const documentTheme = document.documentElement.getAttribute('data-theme');
      if (documentTheme) return documentTheme;
      
      // Fallback sang localStorage
      const savedTheme = localStorage.getItem('theme');
      return savedTheme || initialTheme;
    } catch (error) {
      console.warn('Failed to retrieve theme from storage:', error.message);
      return initialTheme;
    }
  };

  const [theme, setTheme] = useState(getInitialTheme);

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
  }, [theme]);

  const toggleTheme = () => {
    const newTheme = theme === 'dark' ? 'light' : 'dark';
    setTheme(newTheme);
    
    try {
      localStorage.setItem('theme', newTheme);
    } catch (error) {
      console.warn('Failed to save theme to localStorage:', error.message);
    }
  };

  return [theme, toggleTheme];
};
