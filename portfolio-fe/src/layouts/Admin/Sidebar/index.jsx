

import React, { useMemo, useCallback, memo } from "react";
import { Dialog, Transition } from "@headlessui/react";
import { XMarkIcon } from "@heroicons/react/24/outline";
import { 
  FileTextOutlined,
  MessageOutlined,
  SettingOutlined,
  MailOutlined,
  AppstoreOutlined,
  DashboardOutlined,
} from "@ant-design/icons";
import { Menu } from "antd";
import { ROUTES } from "router/routeConstants";
import img from "assets/Img";
import { Link } from "react-router-dom";
import "./Sidebar.scss";

// Navigation items structured for submenu display like in the image
const NAVIGATION_ITEMS = [
  {
    key: ROUTES.ADMIN.DASHBOARD,
    icon: React.createElement(DashboardOutlined),
    label: "Dashboard",
  },
  {
    key: "home-management",
    icon: React.createElement(MailOutlined),
    label: "Quản lý Trang chủ",
    children: [
      {
        key: ROUTES.ADMIN.HOME_MANAGEMENT,
        label: "Tổng quan Trang chủ",
      },
      {
        key: ROUTES.ADMIN.HERO_MANAGEMENT,
        label: "Hero Section",
      },
      {
        key: ROUTES.ADMIN.HERO_SUBHEADING_MANAGEMENT,
        label: "Hero SubHeading",
      },
    ],
  },
  {
    key: "about-management", 
    icon: React.createElement(AppstoreOutlined),
    label: "Quản lý Giới thiệu",
    children: [
      {
        key: ROUTES.ADMIN.ABOUT_MANAGEMENT,
        label: "Tổng quan Giới thiệu",
      },
      {
        key: ROUTES.ADMIN.PROFILE_INFO_MANAGEMENT,
        label: "Thông tin Hồ sơ",
      },
      {
        key: ROUTES.ADMIN.PROFILE_TAGS_MANAGEMENT,
        label: "Profile Tags",
      },
      {
        key: ROUTES.ADMIN.EXPERIENCE_MANAGEMENT,
        label: "Kinh nghiệm",
      },
      {
        key: ROUTES.ADMIN.SKILLS_MANAGEMENT,
        label: "Kỹ năng",
      },
      {
        key: ROUTES.ADMIN.SKILL_CATEGORIES_MANAGEMENT,
        label: "Danh mục Kỹ năng",
      },
    ],
  },
  {
    key: "projects-management",
    icon: React.createElement(SettingOutlined),
    label: "Quản lý Dự án",
    children: [
      {
        key: ROUTES.ADMIN.PROJECTS_MANAGEMENT,
        label: "Tổng quan Dự án",
      },
      {
        key: ROUTES.ADMIN.PROJECT_CATEGORIES_MANAGEMENT,
        label: "Danh mục Dự án",
      },
      {
        key: ROUTES.ADMIN.PROJECT_TAGS_MANAGEMENT,
        label: "Tag Công nghệ",
      },
      {
        key: ROUTES.ADMIN.PROJECT_TAG_MAP_MANAGEMENT,
        label: "Mapping Tag-Project",
      },
    ],
  },
  {
    key: "blog-management",
    icon: React.createElement(FileTextOutlined),
    label: "Quản lý Blog",
    children: [
      {
        key: ROUTES.ADMIN.BLOG_MANAGEMENT,
        label: "Tổng quan Blog",
      },
      {
        key: ROUTES.ADMIN.BLOG_POSTS_MANAGEMENT,
        label: "Bài viết",
      },
      {
        key: ROUTES.ADMIN.BLOG_TAGS_MANAGEMENT,
        label: "Tag Blog",
      },
      {
        key: ROUTES.ADMIN.BLOG_TAG_MAP_MANAGEMENT,
        label: "Mapping Tag-Blog",
      },
    ],
  },
  {
    key: "contact-management",
    icon: React.createElement(MessageOutlined),
    label: "Quản lý Liên hệ",
    children: [
      {
        key: ROUTES.ADMIN.CONTACT_MANAGEMENT,
        label: "Tổng quan Liên hệ",
      },
      {
        key: ROUTES.ADMIN.CONTACT_MESSAGES_MANAGEMENT,
        label: "Tin nhắn Liên hệ",
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
        label: "Tài khoản Admin",
      },
      {
        key: ROUTES.ADMIN.HISTORY_LOGS,
        label: "Lịch sử thay đổi",
      },
      {
        key: ROUTES.ADMIN.MEDIA_LIBRARY,
        label: "Thư viện Media",
      },
      {
        key: ROUTES.ADMIN.ANALYTICS,
        label: "Thống kê",
      },
      {
        key: ROUTES.ADMIN.SETTINGS,
        label: "Cài đặt",
      },
      {
        key: ROUTES.ADMIN.PROFILE,
        label: "Hồ sơ Admin",
      },
    ],
  },
];

// Memoized SidebarContent using Ant Design Menu with SubMenu structure
const SidebarContent = memo(({
  currentPath,
  handleNavigation,
}) => {
  // Get selected keys for current path
  const selectedKeys = useMemo(() => [currentPath], [currentPath]);
  
  // Get default open keys based on current path
  const defaultOpenKeys = useMemo(() => {
    const openKeys = [];
    NAVIGATION_ITEMS.forEach(item => {
      if (item.children?.some(child => child.key === currentPath)) {
        openKeys.push(item.key);
      }
    });
    return openKeys;
  }, [currentPath]);

  // Handle menu click
  const handleMenuClick = useCallback((e) => {
    handleNavigation(e.key);
  }, [handleNavigation]);

  return (
    <div className="flex grow flex-col gap-y-5 overflow-y-auto bg-white px-6 pb-4 ring-1 ring-white/10 sidebar-content">
      <div className="flex h-16 shrink-0 items-center">
        <div className="flex h-16 shrink-0 items-center">
          <Link to={ROUTES.ADMIN.DASHBOARD}>
            <img className="h-14 w-auto" src={img.Logo} alt="Admin Portal" />
          </Link>
          <Link
            to={ROUTES.ADMIN.DASHBOARD}
            className="ml-3 text-lg font-semibold text-gray-900"
          >
            Admin Portal
          </Link>
        </div>
      </div>
      <nav className="flex flex-1 flex-col">
        <Menu
          mode="inline"
          selectedKeys={selectedKeys}
          defaultOpenKeys={defaultOpenKeys}
          onClick={handleMenuClick}
          items={NAVIGATION_ITEMS}
          className="border-none bg-transparent admin-sidebar-menu"
          inlineIndent={16}
        />
      </nav>
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
