import React, { useState, useRef, useEffect } from "react";
import { useTranslation } from "react-i18next";
import PropTypes from "prop-types";
import img from "assets/Img";
import useLanguagePersistence from "hooks/useLanguagePersistence";
import "./LanguageToggle.scss";

const LanguageToggle = ({ className = "", variant = "dropdown" }) => {
  const { t } = useTranslation();
  const { currentLanguage, changeLanguage, isReady } = useLanguagePersistence();
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);

  // Handle language change with enhanced UX
  const handleLanguageChange = async (lng) => {
    const success = await changeLanguage(lng);
    if (success) {
      setIsOpen(false);
    }
  };

  const languages = [
    {
      code: "en",
      name: t("language.english"),
      flag: img.Co_My,
      shortName: " ",
      nativeName: "EN",
    },
    {
      code: "vi",
      name: t("language.vietnamese"),
      flag: img.Co_VN,
      shortName: " ",
      nativeName: "VI",
    },
  ];

  const activeLanguage =
    languages.find((lang) => lang.code === currentLanguage) || languages[0];

  // Don't render until i18n is ready to avoid flash of wrong language
  if (!isReady) {
    return null;
  }

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  // Handle keyboard navigation
  const handleKeyDown = (event) => {
    if (event.key === "Escape") {
      setIsOpen(false);
    } else if (event.key === "Enter" || event.key === " ") {
      event.preventDefault();
      setIsOpen(!isOpen);
    }
  };

  if (variant === "compact") {
    return (
      <div className={`language-toggle language-toggle--compact ${className}`}>
        <div className="language-toggle__header">
          <span className="language-toggle__title">{t("language.title")}</span>
        </div>
        <div className="language-selector">
          {languages.map((lang) => (
            <button
              key={lang.code}
              className={`language-btn ${
                currentLanguage === lang.code ? "active" : ""
              }`}
              onClick={() => handleLanguageChange(lang.code)}
              title={lang.nativeName}
              aria-label={`${t("language.switch_to")} ${lang.name}`}
            >
              <div className="flag-container">
                <img
                  src={lang.flag}
                  alt={`${lang.name} flag`}
                  className="flag-img"
                />
              </div>
              <div className="lang-info">
                <span className="lang-name">{lang.nativeName}</span>
                <span className="lang-code">{lang.shortName}</span>
              </div>
              {currentLanguage === lang.code && (
                <div className="check-indicator">
                  <svg viewBox="0 0 24 24" width="10" height="10">
                    <path
                      d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z"
                      fill="currentColor"
                    />
                  </svg>
                </div>
              )}
            </button>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div
      className={`language-toggle language-toggle--dropdown ${className}`}
      ref={dropdownRef}
    >
      <button
        className={`language-current ${isOpen ? "language-current--open" : ""}`}
        onClick={() => setIsOpen(!isOpen)}
        onKeyDown={handleKeyDown}
        aria-label={`${t("language.current")}: ${
          activeLanguage.nativeName
        }. ${t("language.switch_to")}`}
        aria-haspopup="true"
        aria-expanded={isOpen}
      >
        <div className="current-flag-container">
          <img
            src={activeLanguage.flag}
            alt={`${activeLanguage.name} flag`}
            className="flag-img"
          />
        </div>
        <div className="current-lang-info">
          <span className="lang-name">{activeLanguage.nativeName}</span>
          <span className="lang-code">{activeLanguage.shortName}</span>
        </div>
        <svg
          className="chevron"
          viewBox="0 0 24 24"
          width="14"
          height="14"
          style={{
            transform: isOpen ? "rotate(180deg)" : "rotate(0deg)",
            transition: "transform 0.2s ease",
          }}
        >
          <path d="M7 10l5 5 5-5z" fill="currentColor" />
        </svg>
      </button>

      {isOpen && (
        <div className="language-dropdown">
          {languages
            .filter((lang) => lang.code !== currentLanguage)
            .map((lang) => (
              <button
                key={lang.code}
                className="language-option"
                onClick={() => handleLanguageChange(lang.code)}
                aria-label={`${t("language.switch_to")} ${lang.name}`}
              >
                <div className="option-flag-container">
                  <img
                    src={lang.flag}
                    alt={`${lang.name} flag`}
                    className="flag-img"
                  />
                </div>
                <div className="lang-details">
                  <span className="lang-name">{lang.nativeName}</span>
                  <span className="lang-code-sub">{lang.shortName}</span>
                </div>
              </button>
            ))}
        </div>
      )}
    </div>
  );
};

LanguageToggle.propTypes = {
  className: PropTypes.string,
  variant: PropTypes.oneOf(["dropdown", "compact"]),
};

export default LanguageToggle;
