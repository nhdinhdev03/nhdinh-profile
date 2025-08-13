import React, { useMemo } from "react";
import PropTypes from "prop-types";
import { Link, useLocation } from "react-router-dom";
import { ROUTES } from "router/routeConstants";


function Breadcrumb({ className, separator, labels: labelsOverride }) {
  const location = useLocation();

  // Default labels from route constants
  const defaultLabels = useMemo(
    () => ({
      [ROUTES.HOME]: "Home",
      [ROUTES.ABOUT]: "About",
      [ROUTES.BLOG]: "Blog",
      [ROUTES.CONTACT]: "Contact",
      [ROUTES.PROJECTS]: "Projects",
      [ROUTES.ADMIN?.LOGIN]: "Admin Login",
      [ROUTES.ADMIN?.PORTAL]: "Admin Portal",
    }),
    []
  );

  const labels = labelsOverride || defaultLabels;

  // Build a list of cumulative paths from the current URL
  const crumbs = useMemo(() => {
    const { pathname } = location;

    // Ensure Home is always the first crumb
    const segments = pathname.split("/").filter(Boolean);

    // Rebuild cumulative paths and filter out technical segments
    const cumulative = [];
    let current = "";
    segments.forEach((seg) => {
      current += `/${seg}`;
      cumulative.push(current);
    });

    // Always start with root
    const full = [ROUTES.HOME, ...cumulative];

    // De-duplicate (in case pathname is "/") and map to objects
    const seen = new Set();
    const items = full
      .filter((p) => {
        if (seen.has(p)) return false;
        seen.add(p);
        return true;
      })
      .map((path) => ({
        path,
        label:
          labels[path] ||
          // Fallback: prettify last segment
          path === "/"
            ? labels[ROUTES.HOME] || "Home"
            : decodeURIComponent(path.split("/").pop() || "")
                .replace(/[-_]+/g, " ")
                .replace(/\b\w/g, (c) => c.toUpperCase()),
      }))
      // Hide intermediary technical segments like API prefix if not labeled
      .filter((item, idx, arr) => {
        // keep first and last always
        if (idx === 0 || idx === arr.length - 1) return true;
        // keep if we explicitly have a label for it
        return Boolean(labels[item.path]);
      });

    return items;
  }, [location, labels]);

  // If only Home and we're on Home, you can choose to hide the breadcrumb
  const isOnlyHome = crumbs.length === 1 && crumbs[0]?.path === ROUTES.HOME;
  if (isOnlyHome) return null;

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
};

Breadcrumb.defaultProps = {
  className: "",
  separator: "/",
  labels: undefined,
};

export default React.memo(Breadcrumb);
