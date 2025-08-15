import React, { useMemo, useCallback } from "react";
import PropTypes from "prop-types";
import { Link, useLocation } from "react-router-dom";
import { ROUTES } from "router/routeConstants";
import { 
  HomeIcon,
  InformationCircleIcon,
  DocumentTextIcon,
  ChatBubbleLeftRightIcon,
  FolderIcon,
  ChevronRightIcon
} from '@heroicons/react/24/outline';

const Breadcrumb = ({ 
  className = "", 
  separator = "/", 
  labels: customLabels = {}, 
  showOnHome = false,
  maxCrumbs = 4,
  showIcons = true,
}) => {
  const location = useLocation();

  // Default labels for user routes
  const defaultLabels = useMemo(() => ({
    [ROUTES.HOME]: "Trang chủ",
    [ROUTES.ABOUT]: "Giới thiệu",
    [ROUTES.BLOG]: "Blog",
    [ROUTES.CONTACT]: "Liên hệ",
    [ROUTES.PROJECTS]: "Dự án",
    ...customLabels
  }), [customLabels]);

  // Icon mapping for user routes
  const iconMap = useMemo(() => ({
    [ROUTES.HOME]: HomeIcon,
    [ROUTES.ABOUT]: InformationCircleIcon,
    [ROUTES.BLOG]: DocumentTextIcon,
    [ROUTES.CONTACT]: ChatBubbleLeftRightIcon,
    [ROUTES.PROJECTS]: FolderIcon,
  }), []);

  // Function to prettify path segments
  const prettifyPath = useCallback((path) => {
    const segment = decodeURIComponent(path.split("/").filter(Boolean).pop() || "");
    return segment
      .replace(/[-_]+/g, " ")
      .replace(/\b\w/g, char => char.toUpperCase());
  }, []);

  // Build breadcrumb items from current pathname
  const crumbs = useMemo(() => {
    const { pathname } = location;
    const homePath = ROUTES.HOME;

    // Split pathname into segments and build cumulative paths
    const segments = pathname.split("/").filter(Boolean);
    const paths = [homePath];
    let currentPath = "";
    
    // Build cumulative paths
    for (const segment of segments) {
      currentPath += `/${segment}`;
      if (currentPath !== homePath && !paths.includes(currentPath)) {
        paths.push(currentPath);
      }
    }

    // Convert paths to breadcrumb items
    const items = paths.map((path, index) => {
      const isHome = path === homePath;
      const label = isHome 
        ? defaultLabels[homePath] || "Trang chủ"
        : defaultLabels[path] || prettifyPath(path);
      const icon = iconMap[path];

      return { path, label, isHome, icon };
    });

    // Filter: keep home, last item, and items with predefined labels
    const filteredItems = items.filter((item, index, array) => {
      const isLast = index === array.length - 1;
      const hasPredefinedLabel = defaultLabels[item.path];
      return item.isHome || isLast || hasPredefinedLabel;
    });

    // Limit breadcrumbs if maxCrumbs is specified
    if (maxCrumbs && filteredItems.length > maxCrumbs) {
      const home = filteredItems[0];
      const last = filteredItems[filteredItems.length - 1];
      const middle = filteredItems.slice(1, -1).slice(-(maxCrumbs - 2));
      
      return middle.length > 0 
        ? [home, ...middle, last]
        : [home, last];
    }

    return filteredItems;
  }, [location, defaultLabels, prettifyPath, maxCrumbs, iconMap]);

  // Check if should render breadcrumb
  const shouldRender = useMemo(() => {
    if (showOnHome) return true;
    const isOnlyHome = crumbs.length === 1 && crumbs[0]?.isHome;
    return !isOnlyHome;
  }, [crumbs, showOnHome]);

  // Render breadcrumb item with better performance
  const renderBreadcrumbItem = useCallback((item, index, isLast) => {
    const IconComponent = item.icon;
    
    return (
      <li key={item.path} className="flex items-center gap-2">
        {isLast ? (
          <span 
            aria-current="page" 
            className="font-medium text-gray-900 dark:text-gray-100 flex items-center gap-1.5"
          >
            {showIcons && IconComponent && (
              <IconComponent className="w-4 h-4" />
            )}
            {item.label}
          </span>
        ) : (
          <Link
            to={item.path}
            className="text-gray-600 dark:text-gray-300 hover:text-primary-600 dark:hover:text-primary-400 hover:underline transition-colors duration-200 flex items-center gap-1.5"
            aria-label={`Đi tới ${item.label}`}
          >
            {showIcons && IconComponent && (
              <IconComponent className="w-4 h-4" />
            )}
            {item.label}
          </Link>
        )}
        {!isLast && (
          <span aria-hidden="true" className="opacity-60 text-gray-400 dark:text-gray-500 flex items-center">
            {showIcons ? (
              <ChevronRightIcon className="w-3 h-3" />
            ) : (
              separator
            )}
          </span>
        )}
      </li>
    );
  }, [separator, showIcons]);

  if (!shouldRender) return null;

  return (
    <nav
      aria-label="Breadcrumb"
      className={`text-sm ${className}`}
      role="navigation"
    >
      <ol className="flex flex-wrap items-center gap-2">
        {crumbs.map((item, index) => {
          const isLast = index === crumbs.length - 1;
          return renderBreadcrumbItem(item, index, isLast);
        })}
      </ol>
    </nav>
  );
};

Breadcrumb.propTypes = {
  className: PropTypes.string,
  separator: PropTypes.node,
  labels: PropTypes.objectOf(PropTypes.string),
  showOnHome: PropTypes.bool,
  maxCrumbs: PropTypes.number,
  showIcons: PropTypes.bool,
};

export default React.memo(Breadcrumb);
