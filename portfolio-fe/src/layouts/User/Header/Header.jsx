import img from "assets/Img";
import LanguageToggle from "components/LanguageToggle";
import { AnimatePresence, motion } from "framer-motion";
import { useRoutePreloader } from "hooks/useRoutePreloader";
import PropTypes from "prop-types";
import { memo, useCallback, useEffect, useMemo, useRef, useState } from "react";
import { useTranslation } from "react-i18next";
import {
  FiBookOpen,
  FiCode,
  FiFolder,
  FiHome,
  FiMail,
  FiMenu,
  FiMoon,
  FiSun,
  FiUser,
  FiX,
} from "react-icons/fi";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { ROUTES } from "router/routeConstants";
import "./Header.scss";

// Hook to detect touch device and optimize accordingly
const useTouchDevice = () => {
  return useMemo(() => {
    return "ontouchstart" in window || navigator.maxTouchPoints > 0;
  }, []);
};

// Hook to optimize touch response and eliminate delays
const useTouchOptimization = () => {
  useEffect(() => {
    // Disable double-tap zoom on mobile for instant response
    let lastTouchEnd = 0;
    const preventDoubleTapZoom = (event) => {
      const now = Date.now();
      if (now - lastTouchEnd <= 300) {
        event.preventDefault();
      }
      lastTouchEnd = now;
    };

    // Add touch optimization event listeners
    document.addEventListener("touchend", preventDoubleTapZoom, {
      passive: false,
    });

    // Prevent context menu on long press for better UX
    document.addEventListener(
      "contextmenu",
      (e) => {
        if (e.target.closest(".header")) {
          e.preventDefault();
        }
      },
      { passive: false }
    );

    return () => {
      document.removeEventListener("touchend", preventDoubleTapZoom);
      document.removeEventListener("contextmenu", () => {});
    };
  }, []);
};

// Hook to generate nav items with translations
const useNavItems = () => {
  const { t } = useTranslation();

  return [
    {
      id: "home",
      label: t("navigation.home"),
      icon: FiHome,
      path: ROUTES.HOME,
    },
    {
      id: "about",
      label: t("navigation.about"),
      icon: FiUser,
      path: ROUTES.ABOUT,
    },
    {
      id: "skills",
      label: t("navigation.skills"),
      icon: FiCode,
      path: ROUTES.SKILLS,
    },
    {
      id: "projects",
      label: t("navigation.projects"),
      icon: FiFolder,
      path: ROUTES.PROJECTS,
    },
    {
      id: "blog",
      label: t("navigation.blog"),
      icon: FiBookOpen,
      path: ROUTES.BLOG,
    },
    {
      id: "contact",
      label: t("navigation.contact"),
      icon: FiMail,
      path: ROUTES.CONTACT,
    },
  ];
};

// Helper utilities (outside component to lower cognitive complexity inside component)
const getHeaderOffset = () => {
  const headerEl = document.querySelector(".header");
  return headerEl ? headerEl.getBoundingClientRect().height : 80;
};

const areSectionsClose = (sectionId1, sectionId2) => {
  if (!sectionId1 || !sectionId2) return false;
  const el1 = document.getElementById(sectionId1);
  const el2 = document.getElementById(sectionId2);
  if (!el1 || !el2) return false;
  const gap = Math.abs(
    el1.getBoundingClientRect().bottom - el2.getBoundingClientRect().top
  );
  return gap < 200; // threshold
};

const easeInOutQuart = (t) =>
  t < 0.5 ? 8 * t * t * t * t : 1 - Math.pow(-2 * t + 2, 4) / 2;

const computeTargetY = ({
  elementRect,
  elementTop,
  headerOffset,
  isAdjacentNavigation,
  isCloseSection,
}) => {
  let targetY;
  const baseHeight = elementRect.height;
  if (isAdjacentNavigation || isCloseSection) {
    const buffer = Math.min(15, baseHeight * 0.03);
    targetY = Math.max(0, elementTop - headerOffset - buffer);
  } else {
    const buffer = Math.min(30, baseHeight * 0.08);
    targetY = Math.max(0, elementTop - headerOffset - buffer);
  }
  return targetY;
};

const computeScrollDuration = ({ distance, isAdjacentNavigation }) => {
  let baseDuration;
  if (isAdjacentNavigation && distance < window.innerHeight * 0.8) {
    baseDuration = Math.min(distance / 4, 600);
  } else if (distance < window.innerHeight) {
    baseDuration = Math.min(distance / 2.5, 800);
  } else {
    baseDuration = Math.min(distance / 2, 1200);
  }
  return Math.max(250, baseDuration);
};

// Memoized Desktop Navigation - Simplified and Modern
const DesktopNav = memo(({ activeSection, onLinkHover, pathname }) => {
  const navItems = useNavItems();

  const handleDesktopLinkClick = useCallback(
    (e, path) => {
      // If already on the same page, prevent default navigation
      if (pathname === path) {
        e.preventDefault();
        if (path === ROUTES.HOME) {
          window.scrollTo({ top: 0, behavior: "smooth" });
        }
        return;
      }
      // Otherwise, let React Router handle the navigation
    },
    [pathname]
  );

  return (
    <nav className="header__nav header__nav--desktop" aria-label="Primary">
      <ul className="header__nav-list">
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive = activeSection === item.id;
          return (
            <li key={item.id} className="header__nav-item">
              <Link
                to={item.path}
                className={`header__nav-link ${
                  isActive ? "header__nav-link--active" : ""
                }`}
                aria-label={`Navigate to ${item.label}`}
                onMouseEnter={() => onLinkHover?.(item.path)}
                onClick={(e) => handleDesktopLinkClick(e, item.path)}
              >
                <Icon className="header__nav-icon" />
                <span className="header__nav-text">{item.label}</span>
                {isActive && (
                  <motion.div
                    className="header__nav-indicator"
                    layoutId="activeIndicator"
                    transition={{
                      type: "spring",
                      stiffness: 400,
                      damping: 25,
                    }}
                  />
                )}
              </Link>
            </li>
          );
        })}
      </ul>
    </nav>
  );
});

// Optimized Mobile Navigation with enhanced performance and smoother animations
const MobileNav = memo(
  ({
    isMenuOpen,
    setIsMenuOpen,
    activeSection,
    setActiveSection,
    theme,
    toggleTheme,
    mobileNavRef,
    pathname,
    navigate,
  }) => {
    const navItems = useNavItems();
    const { t } = useTranslation();
    const [isScrollable, setIsScrollable] = useState(false);
    const [atTop, setAtTop] = useState(true);
    const [atBottom, setAtBottom] = useState(false);
    const scrollContainerRef = useRef(null);

    // Enhanced performance optimization: check for reduced motion and low-end device
    const prefersReducedMotion = useMemo(
      () =>
        window.matchMedia("(prefers-reduced-motion: reduce)").matches ||
        // Detect low-end devices
        (navigator.hardwareConcurrency && navigator.hardwareConcurrency <= 2) ||
        (navigator.deviceMemory && navigator.deviceMemory <= 2),
      []
    );

    const handleLinkClick = useCallback(
      (e, path) => {
        e.preventDefault();
        e.stopPropagation(); // Prevent event bubbling for better performance

        // Ultra-fast menu close - no delay
        setIsMenuOpen(false);

        // Instant haptic feedback (non-blocking)
        if (
          navigator.vibrate &&
          !prefersReducedMotion &&
          "ontouchstart" in window
        ) {
          // Use setTimeout to make it non-blocking
          setTimeout(() => navigator.vibrate(6), 0);
        }

        // Ultra-fast navigation - prioritize immediate response
        if (pathname === path) {
          if (path === ROUTES.HOME) {
            setActiveSection("home");
            // Instant scroll for touch devices, smooth for others
            const isTouchDevice = "ontouchstart" in window;
            window.scrollTo({
              top: 0,
              behavior:
                isTouchDevice || prefersReducedMotion ? "instant" : "smooth",
            });
          }
        } else {
          // Immediate navigation - no delays
          navigate(path);
        }
      },
      [
        pathname,
        navigate,
        setActiveSection,
        setIsMenuOpen,
        prefersReducedMotion,
      ]
    );

    // Ultra-fast animation variants optimized for touch devices
    const isTouchDevice = useMemo(() => "ontouchstart" in window, []);

    const overlayVariants = useMemo(
      () => ({
        hidden: {
          opacity: 0,
          // Remove backdrop filter for instant performance on touch
          backdropFilter: isTouchDevice ? "none" : "blur(0px)",
        },
        visible: {
          opacity: 1,
          backdropFilter: isTouchDevice ? "none" : "blur(6px)",
          transition: {
            duration: prefersReducedMotion || isTouchDevice ? 0.01 : 0.12,
            ease: "easeOut",
          },
        },
        exit: {
          opacity: 0,
          backdropFilter: isTouchDevice ? "none" : "blur(0px)",
          transition: {
            duration: prefersReducedMotion || isTouchDevice ? 0.01 : 0.08,
            ease: "easeIn",
          },
        },
      }),
      [prefersReducedMotion, isTouchDevice]
    );

    const navVariants = useMemo(
      () => ({
        hidden: {
          x: "100%",
          opacity: 0,
          scale: isTouchDevice ? 1 : 0.98, // Reduce scale animation on touch
          // Force hardware acceleration
          transform: isTouchDevice
            ? "translate3d(100%, 0, 0)"
            : "translate3d(100%, 0, 0) scale3d(0.98, 0.98, 1)",
        },
        visible: {
          x: 0,
          opacity: 1,
          scale: 1,
          transform: "translate3d(0, 0, 0) scale3d(1, 1, 1)",
          transition: {
            type: "tween",
            duration: prefersReducedMotion ? 0.01 : isTouchDevice ? 0.15 : 0.22,
            ease: prefersReducedMotion
              ? "linear"
              : isTouchDevice
              ? "easeOut"
              : [0.25, 0.46, 0.45, 0.94],
          },
        },
        exit: {
          x: "100%",
          opacity: 0,
          scale: isTouchDevice ? 1 : 0.99,
          transform: isTouchDevice
            ? "translate3d(100%, 0, 0)"
            : "translate3d(100%, 0, 0) scale3d(0.99, 0.99, 1)",
          transition: {
            type: "tween",
            duration: prefersReducedMotion ? 0.01 : isTouchDevice ? 0.12 : 0.18,
            ease: prefersReducedMotion ? "linear" : "easeIn",
          },
        },
      }),
      [prefersReducedMotion, isTouchDevice]
    );

    const itemVariants = useMemo(
      () => ({
        hidden: {
          opacity: 0,
          x: 12,
          scale: 0.97,
          transform: "translate3d(12px, 0, 0) scale3d(0.97, 0.97, 1)",
        },
        visible: (index) => ({
          opacity: 1,
          x: 0,
          scale: 1,
          transform: "translate3d(0, 0, 0) scale3d(1, 1, 1)",
          transition: {
            type: "tween",
            duration: prefersReducedMotion ? 0.01 : 0.25,
            ease: prefersReducedMotion ? "linear" : [0.25, 0.46, 0.45, 0.94],
            delay: prefersReducedMotion ? 0 : Math.min(index * 0.03, 0.15), // Stagger with cap
          },
        }),
        exit: {
          opacity: 0,
          x: 8,
          scale: 0.98,
          transform: "translate3d(8px, 0, 0) scale3d(0.98, 0.98, 1)",
          transition: {
            duration: prefersReducedMotion ? 0.01 : 0.15,
            ease: "easeIn",
          },
        },
      }),
      [prefersReducedMotion]
    );

    // Optimized scrollability detection with debouncing
    useEffect(() => {
      if (!isMenuOpen) return;

      const el = scrollContainerRef.current;
      if (!el) return;

      let timeoutId;
      const debouncedCheck = () => {
        if (timeoutId) clearTimeout(timeoutId);
        timeoutId = setTimeout(() => {
          if (!el) return;
          const scrollable = el.scrollHeight > el.clientHeight + 2;
          setIsScrollable(scrollable);
          setAtTop(el.scrollTop <= 1);
          setAtBottom(el.scrollTop + el.clientHeight >= el.scrollHeight - 2);
        }, 16); // ~60fps
      };

      // Initial check
      debouncedCheck();

      // Optimized scroll handler with RAF throttling
      let rafId;
      const scrollHandler = () => {
        if (rafId) return;
        rafId = requestAnimationFrame(() => {
          debouncedCheck();
          rafId = null;
        });
      };

      // Use passive listeners for better performance
      el.addEventListener("scroll", scrollHandler, { passive: true });
      window.addEventListener("resize", debouncedCheck, { passive: true });

      return () => {
        if (timeoutId) clearTimeout(timeoutId);
        if (rafId) cancelAnimationFrame(rafId);
        el.removeEventListener("scroll", scrollHandler);
        window.removeEventListener("resize", debouncedCheck);
      };
    }, [isMenuOpen]);

    if (!isMenuOpen) return null;

    return (
      <AnimatePresence mode="wait">
        <motion.div
          key="overlay"
          className="header__overlay"
          variants={overlayVariants}
          initial="hidden"
          animate="visible"
          exit="exit"
          onClick={() => setIsMenuOpen(false)}
        />
        <motion.nav
          key="mobile-nav"
          id="mobile-navigation"
          className={`header__nav header__nav--mobile ${
            isScrollable ? "header__nav--scrollable" : ""
          } ${atTop ? "header__nav--at-top" : ""} ${
            atBottom ? "header__nav--at-bottom" : ""
          }`}
          aria-label="Mobile navigation"
          ref={mobileNavRef}
          variants={navVariants}
          initial="hidden"
          animate="visible"
          exit="exit"
        >
          <div className="header__nav-mobile-header">
            <div className="header__nav-mobile-brand">
              <div className="header__nav-mobile-logo">
                <img
                  width={32}
                  height={32}
                  src={theme === "dark" ? img.Logo2 : img.Logo}
                  alt="Portfolio Logo"
                />
              </div>
              <div className="header__nav-mobile-text">
                <h2 className="header__nav-mobile-title">
                  {t("navigation.menu")}
                </h2>
                <p className="header__nav-mobile-subtitle">
                  {t("navigation.choose_destination")}
                </p>
              </div>
            </div>
            <button
              className="header__nav-mobile-close"
              onClick={() => setIsMenuOpen(false)}
              aria-label="Close menu"
            >
              <FiX />
            </button>
          </div>
          <div
            className="header__nav-scroll"
            ref={scrollContainerRef}
            aria-label={t("navigation.menu_scrollable")}
          >
            <ul className="header__nav-list header__nav-list--mobile">
              {navItems.map((item, index) => {
                const Icon = item.icon;
                const isActive = activeSection === item.id;
                return (
                  <motion.li
                    key={item.id}
                    className="header__nav-item"
                    variants={itemVariants}
                    custom={index}
                    // Performance optimization: contain layout shifts
                    style={{ contain: "layout style" }}
                  >
                    <Link
                      to={item.path}
                      className={`header__nav-link ${
                        isActive ? "header__nav-link--active" : ""
                      }`}
                      onClick={(e) => handleLinkClick(e, item.path)}
                      tabIndex={0}
                      // Prefetch on hover for better perceived performance
                      onMouseEnter={() => {
                        if (!("ontouchstart" in window)) {
                          // Only prefetch on desktop
                          const link = document.createElement("link");
                          link.rel = "prefetch";
                          link.href = item.path;
                          document.head.appendChild(link);
                        }
                      }}
                    >
                      <div className="header__nav-icon-wrapper">
                        <Icon className="header__nav-icon" />
                        {isActive && !prefersReducedMotion && (
                          <motion.div
                            className="header__nav-active-glow"
                            initial={{ scale: 0, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            exit={{ scale: 0, opacity: 0 }}
                            transition={{
                              duration: 0.25,
                              ease: "easeOut",
                              type: "tween",
                            }}
                            // Force hardware acceleration
                            style={{
                              transform: "translate3d(0, 0, 0)",
                              willChange: "transform, opacity",
                            }}
                          />
                        )}
                      </div>
                      <div className="header__nav-content">
                        <span className="header__nav-text">{item.label}</span>
                        <span className="header__nav-description">
                          {t(`navigation.${item.id}_desc`, item.label)}
                        </span>
                      </div>
                      {isActive && (
                        <div className="header__nav-active-indicator">
                          {!prefersReducedMotion ? (
                            <motion.div
                              className="header__nav-active-dot"
                              initial={{ scale: 0, rotate: -90 }}
                              animate={{ scale: 1, rotate: 0 }}
                              exit={{ scale: 0, rotate: 90 }}
                              transition={{
                                duration: 0.3,
                                ease: [0.34, 1.56, 0.64, 1],
                                type: "tween",
                              }}
                              style={{
                                transform: "translate3d(0, 0, 0)",
                                willChange: "transform",
                              }}
                            />
                          ) : (
                            <div className="header__nav-active-dot" />
                          )}
                        </div>
                      )}
                    </Link>
                  </motion.li>
                );
              })}

              <motion.li
                className="header__nav-item header__nav-item--theme"
                variants={itemVariants}
                custom={navItems.length}
                style={{ contain: "layout style" }}
              >
                <div className="header__mobile-controls">
                  <LanguageToggle
                    className="header__mobile-language-toggle"
                    variant="compact"
                  />

                  <button
                    className="header__mobile-theme-btn"
                    onClick={() => {
                      // Optimized haptic feedback
                      if (
                        navigator.vibrate &&
                        !prefersReducedMotion &&
                        "ontouchstart" in window
                      ) {
                        navigator.vibrate(8);
                      }

                      // Use requestAnimationFrame for smoother theme transition
                      requestAnimationFrame(() => {
                        toggleTheme();
                      });
                    }}
                    aria-label={`Switch to ${
                      theme === "dark" ? "light" : "dark"
                    } theme`}
                    // Prevent layout shift during theme toggle
                    style={{ contain: "layout" }}
                  >
                    <div className="header__theme-icon-wrapper">
                      {theme === "dark" ? (
                        <FiMoon key="moon" />
                      ) : (
                        <FiSun key="sun" />
                      )}
                    </div>
                    <span>
                      {theme === "dark"
                        ? t("header.switch_to_light")
                        : t("header.switch_to_dark")}
                    </span>
                  </button>
                </div>
              </motion.li>
            </ul>
          </div>
        </motion.nav>
      </AnimatePresence>
    );
  }
);

DesktopNav.propTypes = {
  activeSection: PropTypes.string.isRequired,
  onLinkHover: PropTypes.func,
  pathname: PropTypes.string.isRequired,
};

MobileNav.propTypes = {
  isMenuOpen: PropTypes.bool.isRequired,
  setIsMenuOpen: PropTypes.func.isRequired,
  activeSection: PropTypes.string.isRequired,
  setActiveSection: PropTypes.func.isRequired,
  theme: PropTypes.string.isRequired,
  toggleTheme: PropTypes.func.isRequired,
  mobileNavRef: PropTypes.object.isRequired,
  pathname: PropTypes.string.isRequired,
  navigate: PropTypes.func.isRequired,
};

// Enhanced hook: derive active section from route changes with performance optimizations
const useRouteActiveSection = (
  pathname,
  getActiveSectionFromPath,
  setIsMenuOpen
) => {
  const [activeSection, setActiveSection] = useState(
    getActiveSectionFromPath(pathname)
  );

  useEffect(() => {
    // Optimized route change handling
    const newActiveSection = getActiveSectionFromPath(pathname);

    // Close menu immediately for better UX
    setIsMenuOpen(false);

    // Update active section
    setActiveSection(newActiveSection);

    // Only use timeout for non-home pages to prevent scroll spy conflicts
    if (pathname !== ROUTES.HOME) {
      // Use requestIdleCallback if available for better performance
      if (window.requestIdleCallback) {
        window.requestIdleCallback(
          () => {
            setActiveSection(newActiveSection);
          },
          { timeout: 150 }
        );
      } else {
        // Fallback to setTimeout
        const timeoutId = setTimeout(() => {
          setActiveSection(newActiveSection);
        }, 100);

        return () => clearTimeout(timeoutId);
      }
    }
  }, [pathname, getActiveSectionFromPath, setIsMenuOpen]);

  return [activeSection, setActiveSection];
};

// Highly optimized scroll spy - minimal complexity for mobile
const useScrollSpy = (
  isScrolling,
  setIsScrolled,
  setActiveSection,
  navItems,
  pathname,
  setIsHeaderVisible,
  setLastScrollY,
  isMobile,
  isMenuOpen
) => {
  const rafRef = useRef();
  const lastActiveSection = useRef("home");
  const lastScrollYRef = useRef(0);

  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY;
      const scrollDirection = scrollY > lastScrollYRef.current ? "down" : "up";

      // Update scroll state with simpler threshold
      setIsScrolled(scrollY > 30);

      // Ultra-simplified header visibility logic
      if (isMobile && isMenuOpen) {
        // Never hide header on mobile when menu is open
        setIsHeaderVisible(true);
      } else if (isMobile) {
        // Mobile: minimal hiding - only hide on fast downward scroll
        if (scrollY < 30) {
          setIsHeaderVisible(true);
        } else if (
          scrollDirection === "down" &&
          scrollY > lastScrollYRef.current + 20
        ) {
          // Only hide on significant fast downward scroll
          setIsHeaderVisible(false);
        } else if (scrollDirection === "up") {
          // Instantly show on any upward scroll
          setIsHeaderVisible(true);
        }
      } else {
        // Desktop: simplified logic
        if (scrollY < 50) {
          setIsHeaderVisible(true);
        } else if (
          scrollDirection === "down" &&
          scrollY > lastScrollYRef.current + 10
        ) {
          setIsHeaderVisible(false);
        } else if (scrollDirection === "up") {
          setIsHeaderVisible(true);
        }
      }

      lastScrollYRef.current = scrollY;
      setLastScrollY(scrollY);

      // Chỉ cho phép scroll spy hoạt động trên trang Home
      if (isScrolling || pathname !== ROUTES.HOME) return;

      // Use RAF for smooth scroll handling
      if (rafRef.current) {
        cancelAnimationFrame(rafRef.current);
      }

      rafRef.current = requestAnimationFrame(() => {
        const viewHeight = window.innerHeight;
        const headerOffset = getHeaderOffset();
        let maxVisibleArea = 0;
        let current = "home";

        // Optimize: only check sections that are likely to be visible
        const viewTop = scrollY + headerOffset;
        const viewBottom = scrollY + viewHeight;

        navItems.forEach(({ id }) => {
          const el = document.getElementById(id);
          if (!el) return;

          const rect = el.getBoundingClientRect();
          const elementTop = rect.top + scrollY;
          const elementBottom = elementTop + rect.height;

          // Skip if element is completely outside viewport
          if (elementBottom < viewTop || elementTop > viewBottom) return;

          const visibleTop = Math.max(elementTop, viewTop);
          const visibleBottom = Math.min(elementBottom, viewBottom);
          const visibleArea = Math.max(0, visibleBottom - visibleTop);

          // Simplified calculation for better performance
          const distanceFromTop = Math.abs(elementTop - viewTop);
          const topProximityBonus = Math.max(
            0,
            (viewHeight * 0.3 - distanceFromTop) / (viewHeight * 0.3)
          );
          const adjustedVisibleArea =
            visibleArea * (1 + topProximityBonus * 0.2);

          if (adjustedVisibleArea > maxVisibleArea) {
            maxVisibleArea = adjustedVisibleArea;
            current = id;
          }
        });

        // Only update if section actually changed
        if (current !== lastActiveSection.current) {
          lastActiveSection.current = current;
          setActiveSection(current);
        }
      });
    };

    // Optimized scroll handling with better throttling
    let ticking = false;
    const optimizedScrollHandler = () => {
      if (!ticking) {
        requestAnimationFrame(() => {
          handleScroll();
          ticking = false;
        });
        ticking = true;
      }
    };

    // Use passive listeners for better scroll performance
    window.addEventListener("scroll", optimizedScrollHandler, {
      passive: true,
      capture: false,
    });

    return () => {
      window.removeEventListener("scroll", optimizedScrollHandler);
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, [
    isScrolling,
    setIsScrolled,
    setActiveSection,
    navItems,
    pathname,
    setIsHeaderVisible,
    setLastScrollY,
    isMobile,
    isMenuOpen,
  ]);
};

function Header({ theme, toggleTheme }) {
  // Simplified state management - removed unnecessary complexity
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [isScrolling] = useState(false);
  const [isHeaderVisible, setIsHeaderVisible] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);

  // Detect mobile for optimized behavior
  const isMobile = useMemo(() => window.innerWidth <= 768, []);

  // Performance optimization: use refs to prevent unnecessary re-renders
  const mobileNavRef = useRef(null);
  const menuButtonRef = useRef(null);
  const headerRef = useRef(null);

  const { t } = useTranslation();

  // Route preloading hook
  const { preloadRoute } = useRoutePreloader();

  const location = useLocation();
  const navigate = useNavigate();
  const pathname = location.pathname;

  // Get nav items for scroll spy
  const navItems = useNavItems();

  // Determine active section based on current route
  const getActiveSectionFromPath = useCallback((path) => {
    if (path === ROUTES.HOME) return "home";
    if (path === ROUTES.ABOUT) return "about";
    if (path === ROUTES.SKILLS) return "skills";
    if (path === ROUTES.PROJECTS) return "projects";
    if (path === ROUTES.BLOG || path.includes("/blog/")) return "blog";
    if (path === ROUTES.CONTACT) return "contact";
    return "home";
  }, []);

  const [activeSection, setActiveSection] = useRouteActiveSection(
    pathname,
    getActiveSectionFromPath,
    setIsMenuOpen
  );

  // Simplified scroll spy - disabled header hiding on mobile when menu is open
  useScrollSpy(
    isScrolling,
    setIsScrolled,
    setActiveSection,
    navItems,
    pathname,
    setIsHeaderVisible,
    setLastScrollY,
    isMobile,
    isMenuOpen
  );

  // Handle link hover for preloading
  const handleLinkHover = useCallback(
    (path) => {
      preloadRoute(path);
    },
    [preloadRoute]
  );

  // Optimized logo click handler
  const handleLogoClick = useCallback(
    (e) => {
      e.preventDefault();

      // If already on home page, just scroll to top
      if (pathname === ROUTES.HOME) {
        // Scroll to top smoothly
        window.scrollTo({
          top: 0,
          behavior: "smooth",
        });
        // Update active section
        setActiveSection("home");
      } else {
        // Navigate to home page
        navigate(ROUTES.HOME);
      }
    },
    [pathname, navigate]
  );

  // (Removed inline scroll spy effect - replaced by custom hook)

  // Enhanced body scroll lock with performance optimizations
  useEffect(() => {
    if (isMenuOpen) {
      // Enhanced scroll prevention for mobile
      document.body.classList.add("no-scroll");
      document.body.style.overflow = "hidden";
      document.body.style.touchAction = "none";

      // Prevent iOS bounce scroll
      if (/iPad|iPhone|iPod/.test(navigator.userAgent)) {
        document.body.style.position = "fixed";
        document.body.style.top = `-${window.scrollY}px`;
        document.body.style.width = "100%";
      }
    } else {
      // Restore scroll with performance optimization
      document.body.classList.remove("no-scroll");
      document.body.style.overflow = "";
      document.body.style.touchAction = "";

      // Restore iOS scroll position
      if (/iPad|iPhone|iPod/.test(navigator.userAgent)) {
        const scrollY = document.body.style.top;
        document.body.style.position = "";
        document.body.style.top = "";
        document.body.style.width = "";
        window.scrollTo(
          0,
          parseInt(scrollY.replace("-", "").replace("px", "")) || 0
        );
      }
    }

    return () => {
      // Cleanup on unmount
      document.body.classList.remove("no-scroll");
      document.body.style.overflow = "";
      document.body.style.touchAction = "";
      if (/iPad|iPhone|iPod/.test(navigator.userAgent)) {
        document.body.style.position = "";
        document.body.style.top = "";
        document.body.style.width = "";
      }
    };
  }, [isMenuOpen]);

  // ESC close & focus trap
  useEffect(() => {
    if (!isMenuOpen) return;
    const handleKeyDown = (e) => {
      if (e.key === "Escape") {
        setIsMenuOpen(false);
        menuButtonRef.current?.focus();
      } else if (e.key === "Tab") {
        const focusable = mobileNavRef.current?.querySelectorAll(
          'a[href], button:not([disabled]), [tabindex]:not([tabindex="-1"])'
        );
        if (!focusable || focusable.length === 0) return;
        const first = focusable[0];
        const last = focusable[focusable.length - 1];
        if (e.shiftKey && document.activeElement === first) {
          e.preventDefault();
          last.focus();
        } else if (!e.shiftKey && document.activeElement === last) {
          e.preventDefault();
          first.focus();
        }
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    // Focus first link after animation
    setTimeout(() => {
      mobileNavRef.current?.querySelector("a")?.focus();
    }, 120);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isMenuOpen]);

  return (
    <header
      ref={headerRef}
      className={`header ${isScrolled ? "header--scrolled" : ""} ${
        isMenuOpen ? "header--menu-open" : ""
      } ${isScrolling ? "header--scrolling" : ""} ${
        !isHeaderVisible ? "header--hidden" : ""
      }`}
      // Optimized performance - reduced GPU load on mobile
      style={{
        willChange: isMobile
          ? isMenuOpen
            ? "transform"
            : "auto" // Mobile: minimal GPU usage
          : isMenuOpen || isScrolling
          ? "transform, background-color, backdrop-filter"
          : "auto", // Desktop: full effects
        contain: "layout style",
      }}
    >
      <div className="header__container">
        <button
          className="header__logo-link"
          aria-label={t("header.logo_aria_label")}
          onClick={handleLogoClick}
        >
          <div className="header__logo">
            <div className="header__logo-icon">
              <img
                width={50}
                height={50}
                decoding="async"
                src={theme === "dark" ? img.Logo2 : img.Logo}
                alt="Nhdinh Portfolio Logo"
              />
            </div>
            <div className="header__logo-text">
              <span className="header__logo-name">
                {t("header.brand_name")}
              </span>
              <span className="header__logo-title">
                {t("header.brand_title")}
              </span>
            </div>
          </div>
        </button>

        <DesktopNav
          activeSection={activeSection}
          onLinkHover={handleLinkHover}
          pathname={pathname}
        />

        <div className="header__actions">
          <LanguageToggle
            className="header__language-toggle"
            variant="dropdown"
          />

          <button
            className="header__theme-toggle"
            onClick={toggleTheme}
            aria-label={
              theme === "dark"
                ? t("header.theme_toggle_light")
                : t("header.theme_toggle_dark")
            }
            title={
              theme === "dark"
                ? t("header.theme_toggle_light")
                : t("header.theme_toggle_dark")
            }
          >
            {theme === "dark" ? <FiMoon /> : <FiSun />}
          </button>

          <button
            className={`header__menu-toggle ${
              isMenuOpen ? "header__menu-toggle--open" : ""
            }`}
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            aria-label={t("header.menu_toggle")}
            aria-expanded={isMenuOpen}
            aria-controls="mobile-navigation"
            ref={menuButtonRef}
          >
            {isMenuOpen ? <FiX /> : <FiMenu />}
          </button>
        </div>
      </div>
      <MobileNav
        isMenuOpen={isMenuOpen}
        setIsMenuOpen={setIsMenuOpen}
        activeSection={activeSection}
        setActiveSection={setActiveSection}
        theme={theme}
        toggleTheme={toggleTheme}
        mobileNavRef={mobileNavRef}
        pathname={pathname}
        navigate={navigate}
      />
    </header>
  );
}

export default Header;

Header.propTypes = {
  theme: PropTypes.string.isRequired,
  toggleTheme: PropTypes.func.isRequired,
};
