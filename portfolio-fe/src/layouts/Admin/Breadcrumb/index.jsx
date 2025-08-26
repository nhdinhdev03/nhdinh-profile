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
  TagIcon,
  LinkIcon,
  BookOpenIcon,
  WrenchScrewdriverIcon,
  PencilIcon,
} from '@heroicons/react/24/outline';
import "./Breadcrumb.scss";

const AdminBreadcrumb = ({ 
  className = "", 
  showIcons = true,
  actions = null,
  customLabels = {}
}) => {
  const location = useLocation();

  // Optimized admin route labels with proper Vietnamese
  const adminLabels = useMemo(() => ({
    [ROUTES.ADMIN.DASHBOARD]: "Tổng quan",
    [ROUTES.ADMIN.HERO_MANAGEMENT]: "Trang chủ chính",
    [ROUTES.ADMIN.HERO_SUBHEADING_MANAGEMENT]: "Tiêu đề phụ",
    [ROUTES.ADMIN.PROJECTS_MANAGEMENT]: "Danh sách dự án",
    [ROUTES.ADMIN.PROJECT_CATEGORIES_MANAGEMENT]: "Danh mục dự án",
    [ROUTES.ADMIN.PROJECT_TAGS_MANAGEMENT]: "Thẻ công nghệ",
    [ROUTES.ADMIN.PROJECT_TAG_MAP_MANAGEMENT]: "Liên kết thẻ-dự án",
    [ROUTES.ADMIN.BLOG_POSTS_MANAGEMENT]: "Bài viết blog",
    [ROUTES.ADMIN.BLOG_TAGS_MANAGEMENT]: "Thẻ bài viết",
    [ROUTES.ADMIN.BLOG_TAG_MAP_MANAGEMENT]: "Liên kết thẻ-bài viết",
    [ROUTES.ADMIN.CONTACT_MESSAGES_MANAGEMENT]: "Tin nhắn liên hệ",
    [ROUTES.ADMIN.PROFILE_INFO_MANAGEMENT]: "Thông tin cá nhân",
    [ROUTES.ADMIN.PROFILE_TAGS_MANAGEMENT]: "Thẻ hồ sơ",
    [ROUTES.ADMIN.EXPERIENCE_MANAGEMENT]: "Kinh nghiệm làm việc",
    [ROUTES.ADMIN.SKILL_CATEGORIES_MANAGEMENT]: "Danh mục kỹ năng",
    [ROUTES.ADMIN.SKILLS_MANAGEMENT]: "Danh sách kỹ năng",
    [ROUTES.ADMIN.ADMIN_USERS_MANAGEMENT]: "Tài khoản quản trị",
    [ROUTES.ADMIN.ANALYTICS]: "Thống kê & Báo cáo",
    [ROUTES.ADMIN.HISTORY_LOGS]: "Nhật ký hệ thống",
    [ROUTES.ADMIN.MEDIA_LIBRARY]: "Thư viện phương tiện",
    [ROUTES.ADMIN.SETTINGS]: "Cài đặt hệ thống",
    [ROUTES.ADMIN.PROFILE]: "Hồ sơ quản trị viên",
    ...customLabels
  }), [customLabels]);

  // Enhanced icon mapping for admin routes
  const iconMap = useMemo(() => ({
    [ROUTES.ADMIN.DASHBOARD]: ChartBarIcon,
    [ROUTES.ADMIN.HERO_MANAGEMENT]: HomeIcon,
    [ROUTES.ADMIN.HERO_SUBHEADING_MANAGEMENT]: PencilIcon,
    [ROUTES.ADMIN.PROJECTS_MANAGEMENT]: FolderIcon,
    [ROUTES.ADMIN.PROJECT_CATEGORIES_MANAGEMENT]: BookOpenIcon,
    [ROUTES.ADMIN.PROJECT_TAGS_MANAGEMENT]: TagIcon,
    [ROUTES.ADMIN.PROJECT_TAG_MAP_MANAGEMENT]: LinkIcon,
    [ROUTES.ADMIN.BLOG_POSTS_MANAGEMENT]: DocumentTextIcon,
    [ROUTES.ADMIN.BLOG_TAGS_MANAGEMENT]: TagIcon,
    [ROUTES.ADMIN.BLOG_TAG_MAP_MANAGEMENT]: LinkIcon,
    [ROUTES.ADMIN.CONTACT_MESSAGES_MANAGEMENT]: ChatBubbleLeftRightIcon,
    [ROUTES.ADMIN.PROFILE_INFO_MANAGEMENT]: UserCircleIcon,
    [ROUTES.ADMIN.PROFILE_TAGS_MANAGEMENT]: TagIcon,
    [ROUTES.ADMIN.EXPERIENCE_MANAGEMENT]: BookOpenIcon,
    [ROUTES.ADMIN.SKILL_CATEGORIES_MANAGEMENT]: BookOpenIcon,
    [ROUTES.ADMIN.SKILLS_MANAGEMENT]: WrenchScrewdriverIcon,
    [ROUTES.ADMIN.ADMIN_USERS_MANAGEMENT]: UsersIcon,
    [ROUTES.ADMIN.ANALYTICS]: ChartBarIcon,
    [ROUTES.ADMIN.HISTORY_LOGS]: ClockIcon,
    [ROUTES.ADMIN.MEDIA_LIBRARY]: PhotoIcon,
    [ROUTES.ADMIN.SETTINGS]: CogIcon,
    [ROUTES.ADMIN.PROFILE]: UserCircleIcon,
  }), []);

  // Build breadcrumb items with better logic
  const crumbs = useMemo(() => {
    const { pathname } = location;
    
    // Always start with Dashboard
    const items = [{
      path: ROUTES.ADMIN.DASHBOARD,
      label: "Tổng quan",
      icon: ChartBarIcon
    }];

    // If we're not on dashboard, add current page
    if (pathname !== ROUTES.ADMIN.DASHBOARD) {
      const currentLabel = adminLabels[pathname];
      const currentIcon = iconMap[pathname] || DocumentTextIcon; // Default icon
      
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
    <div className={`admin-breadcrumb ${className}`}>
      <div className="admin-breadcrumb-container">
        <div className="admin-breadcrumb-content">
          {/* Breadcrumb Navigation */}
          <nav aria-label="Breadcrumb" className="admin-breadcrumb-nav">
            {crumbs.map((item, idx) => {
              const isLast = idx === crumbs.length - 1;
              const IconComponent = showIcons && item.icon ? item.icon : null;
              
              return (
                <React.Fragment key={item.path}>
                  {idx > 0 && (
                    <ChevronRightIcon className="admin-breadcrumb-separator" />
                  )}
                  
                  <div className="admin-breadcrumb-item">
                    {isLast ? (
                      <span 
                        className="admin-breadcrumb-current"
                        aria-current="page"
                      >
                        {IconComponent && (
                          <IconComponent className="admin-breadcrumb-icon" />
                        )}
                        {item.label}
                      </span>
                    ) : (
                      <Link
                        to={item.path}
                        className="admin-breadcrumb-link"
                      >
                        {IconComponent && (
                          <IconComponent className="admin-breadcrumb-icon" />
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
            <div className="admin-breadcrumb-actions">
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
