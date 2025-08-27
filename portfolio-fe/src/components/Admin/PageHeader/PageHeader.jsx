import React from 'react';
import { Breadcrumb, Space, Typography, Divider, Button } from 'antd';
import { HomeOutlined, ArrowLeftOutlined } from '@ant-design/icons';
import { useNavigate, useLocation } from 'react-router-dom';
import PropTypes from 'prop-types';
import { ROUTES } from 'router/routeConstants';
import './PageHeader.scss';

const { Title, Text } = Typography;

// Route configuration for breadcrumbs
const routeConfig = {
  [ROUTES.ADMIN.DASHBOARD]: { title: 'Dashboard', icon: HomeOutlined },
  
  // Home Management
  [ROUTES.ADMIN.HERO_MANAGEMENT]: { title: 'Quản lý Hero', parent: 'home-management' },
  [ROUTES.ADMIN.HERO_SUBHEADING_MANAGEMENT]: { title: 'Tiêu đề phụ', parent: 'home-management' },
  
  // Projects Management
  [ROUTES.ADMIN.PROJECTS_MANAGEMENT]: { title: 'Danh sách dự án', parent: 'projects-management' },
  [ROUTES.ADMIN.PROJECT_CATEGORIES_MANAGEMENT]: { title: 'Danh mục dự án', parent: 'projects-management' },
  [ROUTES.ADMIN.PROJECT_TAGS_MANAGEMENT]: { title: 'Thẻ dự án', parent: 'projects-management' },
  [ROUTES.ADMIN.PROJECT_TAG_MAP_MANAGEMENT]: { title: 'Ánh xạ thẻ', parent: 'projects-management' },
  
  // Blog Management
  [ROUTES.ADMIN.BLOG_POSTS_MANAGEMENT]: { title: 'Bài viết blog', parent: 'blog-management' },
  [ROUTES.ADMIN.BLOG_TAGS_MANAGEMENT]: { title: 'Thẻ blog', parent: 'blog-management' },
  [ROUTES.ADMIN.BLOG_TAG_MAP_MANAGEMENT]: { title: 'Ánh xạ thẻ blog', parent: 'blog-management' },
  
  // Contact Management
  [ROUTES.ADMIN.CONTACT_MESSAGES_MANAGEMENT]: { title: 'Tin nhắn liên hệ', parent: 'contact-management' },
  
  // Profile Management
  [ROUTES.ADMIN.PROFILE_INFO_MANAGEMENT]: { title: 'Thông tin cá nhân', parent: 'profile-management' },
  [ROUTES.ADMIN.PROFILE_TAGS_MANAGEMENT]: { title: 'Thẻ hồ sơ', parent: 'profile-management' },
  [ROUTES.ADMIN.EXPERIENCE_MANAGEMENT]: { title: 'Kinh nghiệm', parent: 'profile-management' },
  
  // Skills Management
  [ROUTES.ADMIN.SKILL_CATEGORIES_MANAGEMENT]: { title: 'Danh mục kỹ năng', parent: 'skills-management' },
  [ROUTES.ADMIN.SKILLS_MANAGEMENT]: { title: 'Kỹ năng', parent: 'skills-management' },
  
  // System Management
  [ROUTES.ADMIN.ADMIN_USERS_MANAGEMENT]: { title: 'Quản lý admin', parent: 'system-management' },
  [ROUTES.ADMIN.ANALYTICS]: { title: 'Thống kê', parent: 'system-management' },
  [ROUTES.ADMIN.HISTORY_LOGS]: { title: 'Lịch sử hoạt động', parent: 'system-management' },
  [ROUTES.ADMIN.MEDIA_LIBRARY]: { title: 'Thư viện media', parent: 'system-management' },
  [ROUTES.ADMIN.SETTINGS]: { title: 'Cài đặt', parent: 'system-management' },
  [ROUTES.ADMIN.PROFILE]: { title: 'Hồ sơ admin', parent: 'system-management' },
};

const parentGroups = {
  'home-management': { title: 'Quản lý Trang chủ', path: ROUTES.ADMIN.HERO_MANAGEMENT },
  'projects-management': { title: 'Quản lý Dự án', path: ROUTES.ADMIN.PROJECTS_MANAGEMENT },
  'blog-management': { title: 'Quản lý Blog', path: ROUTES.ADMIN.BLOG_POSTS_MANAGEMENT },
  'contact-management': { title: 'Quản lý Liên hệ', path: ROUTES.ADMIN.CONTACT_MESSAGES_MANAGEMENT },
  'profile-management': { title: 'Quản lý Hồ sơ', path: ROUTES.ADMIN.PROFILE_INFO_MANAGEMENT },
  'skills-management': { title: 'Quản lý Kỹ năng', path: ROUTES.ADMIN.SKILL_CATEGORIES_MANAGEMENT },
  'system-management': { title: 'Quản lý Hệ thống', path: ROUTES.ADMIN.ADMIN_USERS_MANAGEMENT },
};

const PageHeader = ({
  title,
  subtitle,
  description, // alias for subtitle for backward compatibility
  icon: Icon,
  onBack,
  showBackButton = false,
  extra,
  actions,
  breadcrumbItems,
  children,
  className = "",
  ghost = false,
  ...props
}) => {
  const navigate = useNavigate();
  const location = useLocation();
  const displaySubtitle = subtitle || description;

  // Generate breadcrumb items based on current route
  const generateBreadcrumbs = () => {
    if (breadcrumbItems) return breadcrumbItems;

    const currentRoute = routeConfig[location.pathname];
    if (!currentRoute) {
      return [
        {
          title: (
            <Space>
              <HomeOutlined />
              <span>Dashboard</span>
            </Space>
          ),
          href: ROUTES.ADMIN.DASHBOARD,
        }
      ];
    }

    const breadcrumbs = [
      {
        title: (
          <Space>
            <HomeOutlined />
            <span>Dashboard</span>
          </Space>
        ),
        href: ROUTES.ADMIN.DASHBOARD,
      }
    ];

    // Add parent group if exists
    if (currentRoute.parent && parentGroups[currentRoute.parent]) {
      const parent = parentGroups[currentRoute.parent];
      breadcrumbs.push({
        title: parent.title,
        href: parent.path,
      });
    }

    // Add current page
    breadcrumbs.push({
      title: currentRoute.title,
    });

    return breadcrumbs;
  };

  // Handle back button
  const handleBack = () => {
    if (onBack) {
      onBack();
    } else {
      navigate(-1);
    }
  };

  // Render extra actions
  const renderExtra = () => {
    const extraItems = [];
    
    if (extra) {
      extraItems.push(...(Array.isArray(extra) ? extra : [extra]));
    }
    
    if (actions && actions.length > 0) {
      extraItems.push(...actions);
    } else if (actions) {
      extraItems.push(actions);
    }

    return extraItems.length > 0 ? extraItems : null;
  };

  return (
    <div className={`admin-page-header ${className}`}>
      {/* Breadcrumb */}
      <Breadcrumb
        items={generateBreadcrumbs()}
        className="admin-page-header__breadcrumb"
      />
      
      {/* Main Header */}
      <div className="admin-page-header__main">
        <div className="admin-page-header__content">
          <div className="admin-page-header__title-section">
            {(showBackButton || onBack) && (
              <Button
                type="text"
                icon={<ArrowLeftOutlined />}
                onClick={handleBack}
                className="admin-page-header__back-btn"
                size="middle"
              />
            )}
            
            <div className="admin-page-header__title-wrapper">
              <div className="flex items-center space-x-3">
                {Icon && (
                  <div className="flex-shrink-0">
                    <Icon className="h-8 w-8 text-gray-600" />
                  </div>
                )}
                <div>
                  <Title 
                    level={2} 
                    className="admin-page-header__title"
                    style={{ margin: 0 }}
                  >
                    {title}
                  </Title>
                  
                  {displaySubtitle && (
                    <Text 
                      type="secondary" 
                      className="admin-page-header__subtitle"
                    >
                      {displaySubtitle}
                    </Text>
                  )}
                </div>
              </div>
            </div>
          </div>

          {/* Actions */}
          {renderExtra() && (
            <div className="admin-page-header__actions">
              <Space size="middle">
                {renderExtra()}
              </Space>
            </div>
          )}
        </div>

        {/* Additional Content */}
        {children && (
          <>
            <Divider style={{ margin: '16px 0' }} />
            <div className="admin-page-header__content-area">
              {children}
            </div>
          </>
        )}
      </div>
    </div>
  );
};

PageHeader.propTypes = {
  title: PropTypes.string.isRequired,
  subtitle: PropTypes.string,
  description: PropTypes.string, // backward compatibility
  icon: PropTypes.elementType,
  onBack: PropTypes.func,
  showBackButton: PropTypes.bool,
  extra: PropTypes.oneOfType([
    PropTypes.node,
    PropTypes.arrayOf(PropTypes.node)
  ]),
  actions: PropTypes.oneOfType([
    PropTypes.node,
    PropTypes.arrayOf(PropTypes.node)
  ]),
  breadcrumbItems: PropTypes.arrayOf(PropTypes.object),
  children: PropTypes.node,
  className: PropTypes.string,
  ghost: PropTypes.bool,
};

export default PageHeader;
