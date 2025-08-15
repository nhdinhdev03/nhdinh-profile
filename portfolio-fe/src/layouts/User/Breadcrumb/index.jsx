import React, { useMemo } from "react";
import PropTypes from "prop-types";
import { Link, useLocation } from "react-router-dom";
import { ROUTES } from "router/routeConstants";


function Breadcrumb({ 
  className, 
  separator, 
  labels: labelsOverride, 
  showOnHome = false,

}) {
  const location = useLocation();

  const defaultLabels = useMemo(
    () => ({
      // User routes
      [ROUTES.HOME]: "Trang chủ",
      [ROUTES.ABOUT]: "Giới thiệu",
      [ROUTES.BLOG]: "Blog",
      [ROUTES.CONTACT]: "Liên hệ",
      [ROUTES.PROJECTS]: "Dự án",
      
   
    }),
    []
  );

  const labels = labelsOverride || defaultLabels;

  // Build a list of cumulative paths from the current URL (basename-aware)
  const crumbs = useMemo(() => {
    const { pathname } = location;
    const homePath = ROUTES.HOME || "/";

    const segments = pathname.split("/").filter(Boolean);
    const cumulative = [];
    let current = "";
    for (const seg of segments) {
      current += `/${seg}`;
      cumulative.push(current);
    }

    // Start with homePath and append cumulative excluding duplicate
    const full = [homePath, ...cumulative.filter((p) => p !== homePath)];

    const seen = new Set();
    const prettify = (path) => {
      const last = decodeURIComponent(path.split("/").filter(Boolean).pop() || "");
      return last.replace(/[-_]+/g, " ").replace(/\b\w/g, (c) => c.toUpperCase());
    };

    const items = full
      .filter((p) => {
        if (seen.has(p)) return false;
        seen.add(p);
        return true;
      })
      .map((path, idx) => ({
        path,
        label: idx === 0 ? (labels[homePath] || "Home") : (labels[path] || prettify(path)),
      }))
      // Keep first & last; middle ones must be explicitly labeled
      .filter((item, idx, arr) => (idx === 0 || idx === arr.length - 1) ? true : Boolean(labels[item.path]));

    // Guard against accidental duplicate 'Home' as last label
    if (items.length > 1 && /home/i.test(items[items.length - 1].label) && items[items.length - 1].path !== homePath) {
      items[items.length - 1].label = prettify(items[items.length - 1].path);
    }

    return items;
  }, [location, labels]);

  // If only Home and configured to hide, don't render
  const isOnlyHome = crumbs.length === 1 && (crumbs[0]?.path === ROUTES.HOME || crumbs[0]?.path === "/");
  if (!showOnHome && isOnlyHome) return null;

  return (
    <nav
      aria-label="Breadcrumb"
      className={`text-sm text-gray-600 dark:text-gray-300 ${className}`}
    >
      <ol className="flex flex-wrap items-center gap-2">
        {crumbs.map((item, idx) => {
          const isLast = idx === crumbs.length - 1;
          return (
            <li key={item.path} className="flex items-center gap-2">
              {isLast ? (
                <span aria-current="page" className="font-medium">
                  {item.label}
                </span>
              ) : (
                <Link
                  to={item.path}
                  className="hover:text-primary-600 hover:underline"
                >
                  {item.label}
                </Link>
              )}
              {!isLast && (
                <span aria-hidden="true" className="opacity-60">
                  {separator}
                </span>
              )}
            </li>
          );
        })}
      </ol>
    </nav>
  );
}

Breadcrumb.propTypes = {
  className: PropTypes.string,
  separator: PropTypes.node,
  labels: PropTypes.objectOf(PropTypes.string),
  showOnHome: PropTypes.bool,
};

Breadcrumb.defaultProps = {
  className: "",
  separator: "/",
  labels: undefined,
  showOnHome: false,
};

export default React.memo(Breadcrumb);
