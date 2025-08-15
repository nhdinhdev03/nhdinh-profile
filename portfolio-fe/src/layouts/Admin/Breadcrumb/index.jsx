import React, { useMemo } from "react";
import PropTypes from "prop-types";
import { Link, useLocation } from "react-router-dom";
import { ROUTES } from "router/routeConstants";
import { 
  HomeIcon,
  ChevronRightIcon,
  UserCircleIcon,
  CogIcon,
  DocumentTextIcon,
  ChatBubbleLeftRightIcon,
  FolderIcon,
  ChartBarIcon,
  ClockIcon,
  PhotoIcon,
  UsersIcon,
  InformationCircleIcon
} from '@heroicons/react/24/outline';

const  AdminBreadcrumb = ({ 
  className = "", 
  showIcons = true,
  actions = null,
  customLabels = {}
}) => {
  const location = useLocation();

  // Admin route labels with Vietnamese
  const adminLabels = useMemo(() => ({
    [ROUTES.ADMIN.DASHBOARD]: "Dashboard",
    [ROUTES.ADMIN.HOME_MANAGEMENT]: "Quản lý Trang chủ",
    [ROUTES.ADMIN.ABOUT_MANAGEMENT]: "Quản lý Giới thiệu", 
    [ROUTES.ADMIN.PROJECTS_MANAGEMENT]: "Quản lý Dự án",
    [ROUTES.ADMIN.BLOG_MANAGEMENT]: "Quản lý Blog",
    [ROUTES.ADMIN.CONTACT_MANAGEMENT]: "Quản lý Liên hệ",
    [ROUTES.ADMIN.ACCOUNTS_MANAGEMENT]: "Quản lý Tài khoản",
    [ROUTES.ADMIN.HISTORY_LOGS]: "Lịch sử thay đổi",
    [ROUTES.ADMIN.MEDIA_LIBRARY]: "Thư viện Media",
    [ROUTES.ADMIN.ANALYTICS]: "Thống kê & Phân tích",
    [ROUTES.ADMIN.SETTINGS]: "Cài đặt hệ thống",
    [ROUTES.ADMIN.PROFILE]: "Hồ sơ cá nhân",
    ...customLabels
  }), [customLabels]);

  // Icon mapping for admin routes
  const iconMap = useMemo(() => ({
    [ROUTES.ADMIN.DASHBOARD]: ChartBarIcon,
    [ROUTES.ADMIN.HOME_MANAGEMENT]: HomeIcon,
    [ROUTES.ADMIN.ABOUT_MANAGEMENT]: InformationCircleIcon,
    [ROUTES.ADMIN.PROJECTS_MANAGEMENT]: FolderIcon,
    [ROUTES.ADMIN.BLOG_MANAGEMENT]: DocumentTextIcon,
    [ROUTES.ADMIN.CONTACT_MANAGEMENT]: ChatBubbleLeftRightIcon,
    [ROUTES.ADMIN.ACCOUNTS_MANAGEMENT]: UsersIcon,
    [ROUTES.ADMIN.HISTORY_LOGS]: ClockIcon,
    [ROUTES.ADMIN.MEDIA_LIBRARY]: PhotoIcon,
    [ROUTES.ADMIN.ANALYTICS]: ChartBarIcon,
    [ROUTES.ADMIN.SETTINGS]: CogIcon,
    [ROUTES.ADMIN.PROFILE]: UserCircleIcon,
  }), []);

  // Build breadcrumb items
  const crumbs = useMemo(() => {
    const { pathname } = location;
    
    // Always start with Dashboard
    const items = [{
      path: ROUTES.ADMIN.DASHBOARD,
      label: "Dashboard",
      icon: ChartBarIcon
    }];

    // If we're not on dashboard, add current page
    if (pathname !== ROUTES.ADMIN.DASHBOARD) {
      const currentLabel = adminLabels[pathname];
      const currentIcon = iconMap[pathname];
      
      if (currentLabel) {
        items.push({
          path: pathname,
          label: currentLabel,
          icon: currentIcon
        });
      }
    }

    return items;
  }, [location, adminLabels, iconMap]);

  // Don't show if only dashboard
  if (crumbs.length === 1) return null;

  return (
    <div className={`bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700 ${className}`}>
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between py-3">
          {/* Breadcrumb Navigation */}
          <nav aria-label="Breadcrumb" className="flex items-center space-x-1">
            {crumbs.map((item, idx) => {
              const isLast = idx === crumbs.length - 1;
              const IconComponent = showIcons ? item.icon : null;
              
              return (
                <React.Fragment key={item.path}>
                  {idx > 0 && (
                    <ChevronRightIcon className="h-4 w-4 text-gray-400 dark:text-gray-500" />
                  )}
                  
                  <div className="flex items-center">
                    {isLast ? (
                      <span 
                        className="flex items-center gap-1.5 text-sm font-medium text-blue-600 dark:text-blue-400"
                        aria-current="page"
                      >
                        {IconComponent && (
                          <IconComponent className="h-4 w-4" />
                        )}
                        {item.label}
                      </span>
                    ) : (
                      <Link
                        to={item.path}
                        className="flex items-center gap-1.5 text-sm text-gray-600 hover:text-blue-600 dark:text-gray-300 dark:hover:text-blue-400 transition-colors duration-200 px-2 py-1 rounded-md hover:bg-gray-50 dark:hover:bg-gray-700"
                      >
                        {IconComponent && (
                          <IconComponent className="h-4 w-4" />
                        )}
                        {item.label}
                      </Link>
                    )}
                  </div>
                </React.Fragment>
              );
            })}
          </nav>

          {/* Action Buttons */}
          {actions && (
            <div className="flex items-center gap-2">
              {actions}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

AdminBreadcrumb.propTypes = {
  className: PropTypes.string,
  showIcons: PropTypes.bool,
  actions: PropTypes.node,
  customLabels: PropTypes.objectOf(PropTypes.string),
};

export default AdminBreadcrumb;
