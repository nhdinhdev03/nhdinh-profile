import { useEffect } from 'react';
import { useTranslation } from 'react-i18next';

/**
 * Custom hook to handle language persistence and synchronization
 * Ensures selected language persists across page reloads
 */
export const useLanguagePersistence = () => {
  const { i18n } = useTranslation();

  useEffect(() => {
    // Function to sync language with localStorage
    const syncLanguage = () => {
      const savedLanguage = localStorage.getItem('i18nextLng');
      const currentLanguage = i18n.language;
      
      // If there's a saved language and it's different from current, sync it
      if (savedLanguage && savedLanguage !== currentLanguage) {
        i18n.changeLanguage(savedLanguage);
      }
      // If no saved language, save the current one
      else if (!savedLanguage && currentLanguage) {
        localStorage.setItem('i18nextLng', currentLanguage);
      }
    };

    // Initial sync
    syncLanguage();

    // Listen to language changes and save to localStorage
    const handleLanguageChanged = (lng) => {
      localStorage.setItem('i18nextLng', lng);
    };

    i18n.on('languageChanged', handleLanguageChanged);

    // Cleanup
    return () => {
      i18n.off('languageChanged', handleLanguageChanged);
    };
  }, [i18n]);

  // Enhanced change language function with error handling
  const changeLanguage = async (lng) => {
    if (lng === i18n.language) return false; // No change needed
    
    try {
      await i18n.changeLanguage(lng);
      localStorage.setItem('i18nextLng', lng);
      
      // Haptic feedback if available
      if (navigator.vibrate) {
        navigator.vibrate(10);
      }
      
      return true; // Success
    } catch (error) {
      console.error('Failed to change language:', error);
      return false; // Failed
    }
  };

  return {
    currentLanguage: i18n.language,
    changeLanguage,
    isReady: i18n.isInitialized
  };
};

export default useLanguagePersistence;