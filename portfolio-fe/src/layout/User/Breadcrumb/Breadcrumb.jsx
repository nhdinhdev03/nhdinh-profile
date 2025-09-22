import React, { memo, useMemo, useEffect, useRef, useCallback } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import PropTypes from 'prop-types';
import {
  FiHome,
  FiChevronRight,
  FiUser,
  FiCode,
  FiFolder,
  FiBookOpen,
  FiMail,
  FiBriefcase,
} from 'react-icons/fi';
import './Breadcrumb.scss';
import { ROUTES } from 'router/routeConstants';


// Icon mapping for better performance và tree-shaking
const ICONS = Object.freeze({
  home: FiHome,
  user: FiUser,
  code: FiCode,
  folder: FiFolder,
  book: FiBookOpen,
  mail: FiMail,
  briefcase: FiBriefcase,
});

// Color palette constants
const COLORS = Object.freeze({
  primary: '#6366f1',
  purple: '#8b5cf6',
  green: '#10b981',
  amber: '#f59e0b',
  red: '#ef4444',
  cyan: '#06b6d4',
  pink: '#ec4899',
});

// Optimized route config - removed redundant parent properties
const ROUTE_CONFIG = Object.freeze({
  [ROUTES.HOME]: {
    label: 'Home',
    icon: ICONS.home,
    color: COLORS.primary,
    isHome: true
  },
  [ROUTES.ABOUT]: {
    label: 'About Me',
    icon: ICONS.user,
    color: COLORS.purple
  },
  [ROUTES.SKILLS]: {
    label: 'Skills',
    icon: ICONS.code,
    color: COLORS.green
  },
  [ROUTES.PROJECTS]: {
    label: 'Projects',
    icon: ICONS.folder,
    color: COLORS.amber
  },
  [ROUTES.BLOG]: {
    label: 'Blog',
    icon: ICONS.book,
    color: COLORS.red
  },
  [ROUTES.CONTACT]: {
    label: 'Contact',
    icon: ICONS.mail,
    color: COLORS.cyan
  },
  [ROUTES.EXPERIENCE]: {
    label: 'Experience',
    icon: ICONS.briefcase,
    color: COLORS.pink
  },
});

// Cached breadcrumb generation với logic tối ưu
const breadcrumbCache = new Map();
const generateBreadcrumbs = (pathname) => {
  if (breadcrumbCache.has(pathname)) {
    return breadcrumbCache.get(pathname);
  }
  
  const breadcrumbs = [];
  
  // Handle blog detail routes
  if (pathname.includes('/blog/') && pathname !== ROUTES.BLOG) {
    breadcrumbs.push(ROUTE_CONFIG[ROUTES.HOME]);
    breadcrumbs.push(ROUTE_CONFIG[ROUTES.BLOG]);
    breadcrumbs.push({
      label: 'Blog Post',
      icon: ICONS.book,
      color: COLORS.red,
      isActive: true,
      path: pathname
    });
    breadcrumbCache.set(pathname, breadcrumbs);
    return breadcrumbs;
  }

  // Find current route config
  const currentRoute = Object.keys(ROUTE_CONFIG).find(route => {
    if (route === pathname) return true;
    if (route.includes(':') && pathname.startsWith(route.split(':')[0])) return true;
    return false;
  });

  if (!currentRoute) {
    breadcrumbs.push(ROUTE_CONFIG[ROUTES.HOME]);
    breadcrumbCache.set(pathname, breadcrumbs);
    return breadcrumbs;
  }

  const config = ROUTE_CONFIG[currentRoute];
  
  // Always start with home if not already home (simplified logic)
  if (!config.isHome) {
    breadcrumbs.push(ROUTE_CONFIG[ROUTES.HOME]);
  }
  
  // Add current page
  breadcrumbs.push({
    ...config,
    isActive: true,
    path: currentRoute
  });

  breadcrumbCache.set(pathname, breadcrumbs);
  return breadcrumbs;
};

const BreadcrumbItem = memo(({ item, isLast, index }) => {
  const IconComponent = item.icon;
  
  // Simplified animations for better mobile performance
  const itemVariants = useMemo(() => ({
    hidden: { opacity: 0, x: -5 },
    visible: { 
      opacity: 1, 
      x: 0,
      transition: {
        delay: index * 0.02, // Faster stagger
        duration: 0.12, // Shorter duration
        ease: "easeOut"
      }
    }
  }), [index]);

  const content = useMemo(() => (
    <motion.div
      className={`breadcrumb__item ${item.isActive ? 'breadcrumb__item--active' : ''}`}
      variants={itemVariants}
      whileHover={!item.isActive ? { scale: 1.02 } : {}}
      whileTap={!item.isActive ? { scale: 0.98 } : {}}
      transition={{ duration: 0.1 }}
    >
      <div 
        className="breadcrumb__icon-wrapper"
        style={{ '--item-color': item.color }}
      >
        <IconComponent className="breadcrumb__icon" />
      </div>
      <span className="breadcrumb__label">{item.label}</span>
      {item.isActive && <div className="breadcrumb__active-indicator" />}
    </motion.div>
  ), [item, itemVariants, IconComponent]);

  return (
    <motion.li 
      className="breadcrumb__list-item"
      variants={itemVariants}
    >
      {item.isActive ? (
        content
      ) : (
        <Link 
          to={item.path || ROUTES.HOME} 
          className="breadcrumb__link"
          aria-label={`Navigate to ${item.label}`}
        >
          {content}
        </Link>
      )}
      
      {!isLast && (
        <motion.div
          className="breadcrumb__separator"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: index * 0.02 + 0.05, duration: 0.1 }}
        >
          <FiChevronRight />
        </motion.div>
      )}
    </motion.li>
  );
});

const Breadcrumb = memo(({ className = '', showOnHome = false }) => {
  const location = useLocation();
  const breadcrumbListRef = useRef(null);
  
  // Memoized breadcrumbs
  const breadcrumbs = useMemo(() => 
    generateBreadcrumbs(location.pathname), 
    [location.pathname]
  );

  // Simplified container animation - đặt trước early returns
  const containerVariants = useMemo(() => ({
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.02,
        delayChildren: 0.01
      }
    }
  }), []);

  // Optimized scroll handler
  const handleScroll = useCallback(() => {
    const listElement = breadcrumbListRef.current;
    if (!listElement) return;

    const { scrollWidth, clientWidth } = listElement;
    const isScrollable = scrollWidth > clientWidth;
    
    listElement.classList.toggle('scrollable', isScrollable);
  }, []);

  // Effect với performance optimization
  useEffect(() => {
    const listElement = breadcrumbListRef.current;
    if (!listElement) return;

    let timeoutId;
    const debouncedHandleScroll = () => {
      clearTimeout(timeoutId);
      timeoutId = setTimeout(handleScroll, 10);
    };

    const debouncedHandleResize = () => {
      clearTimeout(timeoutId);
      timeoutId = setTimeout(handleScroll, 16); // ~60fps
    };

    handleScroll();

    listElement.addEventListener('scroll', debouncedHandleScroll, { passive: true });
    window.addEventListener('resize', debouncedHandleResize, { passive: true });

    return () => {
      clearTimeout(timeoutId);
      listElement.removeEventListener('scroll', debouncedHandleScroll);
      window.removeEventListener('resize', debouncedHandleResize);
    };
  }, [handleScroll]);

  // Early returns for better performance
  if (location.pathname === ROUTES.HOME && !showOnHome) {
    return null;
  }

  if (breadcrumbs.length <= 1 && !showOnHome) {
    return null;
  }

  return (
    <AnimatePresence mode="wait">
      <motion.nav
        className={`breadcrumb ${className}`}
        aria-label="Breadcrumb navigation"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        exit={{ opacity: 0 }}
        key={location.pathname}
        style={{ willChange: 'opacity' }}
      >
        <motion.ol 
          ref={breadcrumbListRef}
          className="breadcrumb__list"
          variants={containerVariants}
        >
          {breadcrumbs.map((item, index) => (
            <BreadcrumbItem
              key={`${item.path || item.label}-${index}`}
              item={item}
              isLast={index === breadcrumbs.length - 1}
              index={index}
            />
          ))}
        </motion.ol>
      </motion.nav>
    </AnimatePresence>
  );
});

BreadcrumbItem.displayName = 'BreadcrumbItem';
Breadcrumb.displayName = 'Breadcrumb';

BreadcrumbItem.propTypes = {
  item: PropTypes.shape({
    label: PropTypes.string.isRequired,
    icon: PropTypes.elementType.isRequired,
    color: PropTypes.string.isRequired,
    isActive: PropTypes.bool,
    path: PropTypes.string
  }).isRequired,
  isLast: PropTypes.bool.isRequired,
  index: PropTypes.number.isRequired
};

Breadcrumb.propTypes = {
  className: PropTypes.string,
  showOnHome: PropTypes.bool
};

export default Breadcrumb;