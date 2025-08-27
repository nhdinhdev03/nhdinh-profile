

import React, { useMemo, useCallback, memo } from "react";
import { Dialog, Transition } from "@headlessui/react";
import { XMarkIcon } from "@heroicons/react/24/outline";
import { 
  DashboardOutlined,
  HomeOutlined,
  FolderOutlined,
  EditOutlined,
  MessageOutlined,
  UserOutlined,
  ToolOutlined,
  SettingOutlined,
  BarChartOutlined,
  FileImageOutlined,
  TeamOutlined,
  HistoryOutlined,
  TagsOutlined,
  LinkOutlined,
  ProfileOutlined,
  BookOutlined,
} from "@ant-design/icons";
import { Menu } from "antd";
import { ROUTES } from "router/routeConstants";
import { useNavigationLoading } from "hooks/usePageLoading";
import img from "assets/Img";
import { Link } from "react-router-dom";
import "./Sidebar.scss";

// Navigation items structured with better organization and proper Vietnamese
const NAVIGATION_ITEMS = [
  {
    key: ROUTES.ADMIN.DASHBOARD,
    icon: React.createElement(DashboardOutlined),
    label: "Tổng quan",
  },
  {
    key: "content-management",
    icon: React.createElement(HomeOutlined),
    label: "Quản lý Nội dung",
    children: [
      {
        key: ROUTES.ADMIN.HERO_MANAGEMENT,
        icon: React.createElement(HomeOutlined),
        label: "Trang chủ chính",
      },
    
    ],
  },
  {
    key: "projects-management",
    icon: React.createElement(FolderOutlined),
    label: "Quản lý Dự án",
    children: [
      {
        key: ROUTES.ADMIN.PROJECTS_MANAGEMENT,
        icon: React.createElement(FolderOutlined),
        label: "Danh sách dự án",
      },
      {
        key: ROUTES.ADMIN.PROJECT_CATEGORIES_MANAGEMENT,
        icon: React.createElement(BookOutlined),
        label: "Danh mục dự án",
      },
      {
        key: ROUTES.ADMIN.PROJECT_TAGS_MANAGEMENT,
        icon: React.createElement(TagsOutlined),
        label: "Thẻ công nghệ",
      },
      {
        key: ROUTES.ADMIN.PROJECT_TAG_MAP_MANAGEMENT,
        icon: React.createElement(LinkOutlined),
        label: "Liên kết thẻ-dự án",
      },
    ],
  },
  {
    key: "blog-management",
    icon: React.createElement(EditOutlined),
    label: "Quản lý Blog",
    children: [
      {
        key: ROUTES.ADMIN.BLOG_POSTS_MANAGEMENT,
        icon: React.createElement(EditOutlined),
        label: "Bài viết blog",
      },
      {
        key: ROUTES.ADMIN.BLOG_TAGS_MANAGEMENT,
        icon: React.createElement(TagsOutlined),
        label: "Thẻ bài viết",
      },
      {
        key: ROUTES.ADMIN.BLOG_TAG_MAP_MANAGEMENT,
        icon: React.createElement(LinkOutlined),
        label: "Liên kết thẻ-bài viết",
      },
    ],
  },
  {
    key: "contact-management",
    icon: React.createElement(MessageOutlined),
    label: "Quản lý Liên hệ",
    children: [
      {
        key: ROUTES.ADMIN.CONTACT_MESSAGES_MANAGEMENT,
        icon: React.createElement(MessageOutlined),
        label: "Tin nhắn liên hệ",
      },
    ],
  },
  {
    key: "profile-management", 
    icon: React.createElement(UserOutlined),
    label: "Quản lý Hồ sơ",
    children: [
      {
        key: ROUTES.ADMIN.PROFILE_INFO_MANAGEMENT,
        icon: React.createElement(ProfileOutlined),
        label: "Thông tin cá nhân",
      },
      {
        key: ROUTES.ADMIN.PROFILE_TAGS_MANAGEMENT,
        icon: React.createElement(TagsOutlined),
        label: "Thẻ hồ sơ",
      },
      {
        key: ROUTES.ADMIN.EXPERIENCE_MANAGEMENT,
        icon: React.createElement(BookOutlined),
        label: "Kinh nghiệm làm việc",
      },
    ],
  },
  {
    key: "skills-management",
    icon: React.createElement(ToolOutlined),
    label: "Quản lý Kỹ năng",
    children: [
      {
        key: ROUTES.ADMIN.SKILL_CATEGORIES_MANAGEMENT,
        icon: React.createElement(BookOutlined),
        label: "Danh mục kỹ năng",
      },
      {
        key: ROUTES.ADMIN.SKILLS_MANAGEMENT,
        icon: React.createElement(ToolOutlined),
        label: "Danh sách kỹ năng",
      },
    ],
  },
  {
    key: "system-management",
    icon: React.createElement(SettingOutlined),
    label: "Quản trị Hệ thống",
    children: [
      {
        key: ROUTES.ADMIN.ADMIN_USERS_MANAGEMENT,
        icon: React.createElement(TeamOutlined),
        label: "Tài khoản quản trị",
      },
      {
        key: ROUTES.ADMIN.ANALYTICS,
        icon: React.createElement(BarChartOutlined),
        label: "Thống kê & Báo cáo",
      },
      {
        key: ROUTES.ADMIN.HISTORY_LOGS,
        icon: React.createElement(HistoryOutlined),
        label: "Nhật ký hệ thống",
      },
      {
        key: ROUTES.ADMIN.MEDIA_LIBRARY,
        icon: React.createElement(FileImageOutlined),
        label: "Thư viện phương tiện",
      },
      {
        key: ROUTES.ADMIN.SETTINGS,
        icon: React.createElement(SettingOutlined),
        label: "Cài đặt hệ thống",
      },
      {
        key: ROUTES.ADMIN.PROFILE,
        icon: React.createElement(UserOutlined),
        label: "Hồ sơ quản trị viên",
      },
    ],
  },
];

// Memoized SidebarContent component with better organization
const SidebarContent = memo(({
  currentPath,
  handleNavigation,
}) => {
  const { isLoading, startLoading, stopLoading } = useNavigationLoading();
  
  // Get selected keys for current path
  const selectedKeys = useMemo(() => [currentPath], [currentPath]);
  
  // Get default open keys based on current path with better logic
  const defaultOpenKeys = useMemo(() => {
    const openKeys = [];
    NAVIGATION_ITEMS.forEach(item => {
      if (item.children?.some(child => child.key === currentPath)) {
        openKeys.push(item.key);
      }
    });
    return openKeys;
  }, [currentPath]);

  // Handle menu click with improved navigation and loading state
  const handleMenuClick = useCallback((e) => {
    if (e.key !== currentPath) {
      startLoading(e.key);
      handleNavigation(e.key);
      // Clear loading after navigation
      setTimeout(() => {
        stopLoading();
      }, 300);
    }
  }, [handleNavigation, currentPath, startLoading, stopLoading]);

  return (
    <div className="admin-sidebar-container">
      <div className="admin-sidebar-header">
        <Link to={ROUTES.ADMIN.DASHBOARD} className="admin-brand">
          <img className="admin-logo" src={img.Logo} alt="Quản trị hệ thống" />
          <div className="admin-brand-text">
            <span className="admin-brand-title">Bảng điều khiển</span>
            <span className="admin-brand-subtitle">Quản trị website</span>
          </div>
        </Link>
      </div>
      <nav className="admin-sidebar-nav">
        <div className="admin-nav-section">
          <div className="admin-nav-label">Điều hướng chính</div>
          <Menu
            mode="inline"
            selectedKeys={selectedKeys}
            defaultOpenKeys={defaultOpenKeys}
            onClick={handleMenuClick}
            items={NAVIGATION_ITEMS.map(item => ({
              ...item,
              className: isLoading(item.key) ? 'menu-item-loading' : '',
              children: item.children?.map(child => ({
                ...child,
                className: isLoading(child.key) ? 'menu-item-loading' : '',
              }))
            }))}
            className="admin-sidebar-menu"
            inlineIndent={20}
            expandIcon={({ isOpen }) => (
              <span className={`admin-expand-icon ${isOpen ? 'open' : ''}`}>
                <svg width="12" height="12" viewBox="0 0 12 12" fill="currentColor">
                  <path d="M4.5 3L7.5 6L4.5 9" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" fill="none"/>
                </svg>
              </span>
            )}
          />
        </div>
      </nav>
      <div className="admin-sidebar-footer">
        <div className="admin-footer-info">
          <span className="admin-footer-text">Phiên bản 1.0.0</span>
          <span className="admin-footer-copyright">© 2024 Nguyễn Hoàng Dinh</span>
        </div>
      </div>
    </div>
  );
});
SidebarContent.displayName = "SidebarContent";

// Performance monitoring for debugging (can be removed in production)
if (process.env.NODE_ENV === 'development') {
  SidebarContent.whyDidYouRender = true;
}

const Sidebar = memo(({ sidebarOpen, setSidebarOpen, currentPath, navigate }) => {
  // Memoize navigation handler to prevent re-creation
  const handleNavigation = useCallback((href) => {
    navigate(href);
    setSidebarOpen(false);
  }, [navigate, setSidebarOpen]);

  // Memoize sidebar close handler
  const closeSidebar = useCallback(() => {
    setSidebarOpen(false);
  }, [setSidebarOpen]);

  return (
    <>
      {/* Mobile sidebar */}
      <Transition show={sidebarOpen}>
        <Dialog
          as="div"
          className="relative z-50 lg:hidden"
          onClose={closeSidebar}
        >
          <Transition
            enter="transition-opacity ease-linear duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="transition-opacity ease-linear duration-300"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-gray-900/80" />
          </Transition>

          <div className="fixed inset-0 flex">
            <Transition
              enter="transition ease-in-out duration-300 transform"
              enterFrom="-translate-x-full"
              enterTo="translate-x-0"
              leave="transition ease-in-out duration-300 transform"
              leaveFrom="translate-x-0"
              leaveTo="-translate-x-full"
            >
              <Dialog.Panel className="relative mr-16 flex w-full max-w-xs flex-1">
                <Transition
                  enter="ease-in-out duration-300"
                  enterFrom="opacity-0"
                  enterTo="opacity-100"
                  leave="ease-in-out duration-300"
                  leaveFrom="opacity-100"
                  leaveTo="opacity-0"
                >
                  <div className="absolute left-full top-0 flex w-16 justify-center pt-5">
                    <button
                      type="button"
                      className="-m-2.5 p-2.5"
                      onClick={closeSidebar}
                      aria-label="Close sidebar"
                    >
                      <span className="sr-only">Close sidebar</span>
                      <XMarkIcon
                        className="h-6 w-6 text-white"
                        aria-hidden="true"
                      />
                    </button>
                  </div>
                </Transition>
                <SidebarContent
                  currentPath={currentPath}
                  handleNavigation={handleNavigation}
                />
              </Dialog.Panel>
            </Transition>
          </div>
        </Dialog>
      </Transition>

      {/* Static sidebar for desktop */}
      <div className="hidden lg:fixed lg:inset-y-0 lg:z-50 lg:flex lg:w-72 lg:flex-col">
        <SidebarContent
          currentPath={currentPath}
          handleNavigation={handleNavigation}
        />
      </div>
    </>
  );
});

Sidebar.displayName = "Sidebar";

// Performance monitoring for debugging (can be removed in production)
if (process.env.NODE_ENV === 'development') {
  Sidebar.whyDidYouRender = true;
}

export default Sidebar;
