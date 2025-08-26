

import React, { useMemo, useCallback, memo } from "react";
import { Dialog, Transition } from "@headlessui/react";
import { XMarkIcon } from "@heroicons/react/24/outline";
import { 
  HomeOutlined,
  FileTextOutlined,
  FolderOutlined,
  MessageOutlined,
  TeamOutlined,
  HistoryOutlined,
  SettingOutlined,
  UserOutlined,
  PictureOutlined,
  BarChartOutlined,
  InfoCircleOutlined,
} from "@ant-design/icons";
import { Menu } from "antd";
import { ROUTES } from "router/routeConstants";
import img from "assets/Img";
import { Link } from "react-router-dom";
import "./Sidebar.scss";

// Navigation groups optimized for Ant Design Menu
const NAVIGATION_GROUPS = [
  {
    name: "Tổng quan",
    id: "overview",
    items: [
      {
        name: "Dashboard",
        href: ROUTES.ADMIN.DASHBOARD,
        icon: HomeOutlined,
        description: "Tổng quan hệ thống",
      },
    ],
  },
  {
    name: "Quản lý Trang chủ",
    id: "home-module",
    items: [
      {
        name: "Tổng quan Trang chủ",
        href: ROUTES.ADMIN.HOME_MANAGEMENT,
        icon: HomeOutlined,
        description: "Quản lý nội dung trang chủ",
      },
      {
        name: "Hero Section",
        href: ROUTES.ADMIN.HERO_MANAGEMENT,
        icon: PictureOutlined,
        description: "Phần giới thiệu chính",
      },
      {
        name: "Hero SubHeading",
        href: ROUTES.ADMIN.HERO_SUBHEADING_MANAGEMENT,
        icon: FileTextOutlined,
        description: "Mô tả vai trò nghề nghiệp",
      },
    ],
  },
  {
    name: "Quản lý Giới thiệu",
    id: "about-module",
    items: [
      {
        name: "Tổng quan Giới thiệu",
        href: ROUTES.ADMIN.ABOUT_MANAGEMENT,
        icon: InfoCircleOutlined,
        description: "Thông tin cá nhân tổng quát",
      },
      {
        name: "Thông tin Hồ sơ",
        href: ROUTES.ADMIN.PROFILE_INFO_MANAGEMENT,
        icon: UserOutlined,
        description: "Hồ sơ cá nhân chi tiết",
      },
      {
        name: "Profile Tags",
        href: ROUTES.ADMIN.PROFILE_TAGS_MANAGEMENT,
        icon: FileTextOutlined,
        description: "Nhãn mô tả hồ sơ",
      },
      {
        name: "Kinh nghiệm",
        href: ROUTES.ADMIN.EXPERIENCE_MANAGEMENT,
        icon: HistoryOutlined,
        description: "Lịch sử làm việc",
      },
      {
        name: "Kỹ năng",
        href: ROUTES.ADMIN.SKILLS_MANAGEMENT,
        icon: SettingOutlined,
        description: "Danh sách kỹ năng",
      },
      {
        name: "Danh mục Kỹ năng",
        href: ROUTES.ADMIN.SKILL_CATEGORIES_MANAGEMENT,
        icon: FolderOutlined,
        description: "Phân loại kỹ năng",
      },
    ],
  },
  {
    name: "Quản lý Dự án",
    id: "projects-module",
    items: [
      {
        name: "Tổng quan Dự án",
        href: ROUTES.ADMIN.PROJECTS_MANAGEMENT,
        icon: FolderOutlined,
        description: "Portfolio & dự án tổng quát",
      },
      {
        name: "Danh mục Dự án",
        href: ROUTES.ADMIN.PROJECT_CATEGORIES_MANAGEMENT,
        icon: FolderOutlined,
        description: "Phân loại dự án",
      },
      {
        name: "Tag Công nghệ",
        href: ROUTES.ADMIN.PROJECT_TAGS_MANAGEMENT,
        icon: FileTextOutlined,
        description: "Nhãn công nghệ",
      },
      {
        name: "Mapping Tag-Project",
        href: ROUTES.ADMIN.PROJECT_TAG_MAP_MANAGEMENT,
        icon: SettingOutlined,
        description: "Liên kết tag với dự án",
      },
    ],
  },
  {
    name: "Quản lý Blog",
    id: "blog-module",
    items: [
      {
        name: "Tổng quan Blog",
        href: ROUTES.ADMIN.BLOG_MANAGEMENT,
        icon: FileTextOutlined,
        description: "Bài viết tổng quát",
      },
      {
        name: "Bài viết",
        href: ROUTES.ADMIN.BLOG_POSTS_MANAGEMENT,
        icon: FileTextOutlined,
        description: "Quản lý bài viết",
      },
      {
        name: "Tag Blog",
        href: ROUTES.ADMIN.BLOG_TAGS_MANAGEMENT,
        icon: FileTextOutlined,
        description: "Nhãn cho blog",
      },
      {
        name: "Mapping Tag-Blog",
        href: ROUTES.ADMIN.BLOG_TAG_MAP_MANAGEMENT,
        icon: SettingOutlined,
        description: "Liên kết tag với blog",
      },
    ],
  },
  {
    name: "Quản lý Liên hệ",
    id: "contact-module",
    items: [
      {
        name: "Tổng quan Liên hệ",
        href: ROUTES.ADMIN.CONTACT_MANAGEMENT,
        icon: MessageOutlined,
        description: "Tin nhắn tổng quát",
      },
      {
        name: "Tin nhắn Liên hệ",
        href: ROUTES.ADMIN.CONTACT_MESSAGES_MANAGEMENT,
        icon: MessageOutlined,
        description: "Quản lý tin nhắn chi tiết",
      },
    ],
  },
  {
    name: "Quản trị Hệ thống",
    id: "system",
    items: [
      {
        name: "Tài khoản Admin",
        href: ROUTES.ADMIN.ADMIN_USERS_MANAGEMENT,
        icon: TeamOutlined,
        description: "Quản lý admin users",
      },
      {
        name: "Lịch sử thay đổi",
        href: ROUTES.ADMIN.HISTORY_LOGS,
        icon: HistoryOutlined,
        description: "Activity logs & audit trail",
      },
      {
        name: "Thư viện Media",
        href: ROUTES.ADMIN.MEDIA_LIBRARY,
        icon: PictureOutlined,
        description: "Hình ảnh & tài liệu",
      },
      {
        name: "Thống kê",
        href: ROUTES.ADMIN.ANALYTICS,
        icon: BarChartOutlined,
        description: "Analytics & báo cáo",
      },
    ],
  },
  {
    name: "Cài đặt & Hồ sơ",
    id: "settings",
    items: [
      {
        name: "Cài đặt",
        href: ROUTES.ADMIN.SETTINGS,
        icon: SettingOutlined,
        description: "Cấu hình hệ thống",
      },
      {
        name: "Hồ sơ Admin",
        href: ROUTES.ADMIN.PROFILE,
        icon: UserOutlined,
        description: "Thông tin cá nhân admin",
      },
    ],
  },
];

// Convert navigation groups to Ant Design Menu items format
const generateMenuItems = (navigationGroups, currentPath) => {
  return navigationGroups.map((group) => ({
    key: group.id,
    label: group.name,
    type: 'group',
    children: group.items.map((item) => ({
      key: item.href,
      icon: React.createElement(item.icon),
      label: (
        <div className="menu-item-content">
          <div className="menu-item-name">{item.name}</div>
          <div className="menu-item-description">{item.description}</div>
        </div>
      ),
      className: currentPath === item.href ? 'ant-menu-item-selected' : '',
    })),
  }));
};

// Memoized SidebarContent using Ant Design Menu
const SidebarContent = memo(({
  navigationGroups,
  currentPath,
  handleNavigation,
}) => {
  // Generate menu items for Ant Design
  const menuItems = useMemo(() => 
    generateMenuItems(navigationGroups, currentPath), 
    [navigationGroups, currentPath]
  );

  // Get selected keys for current path
  const selectedKeys = useMemo(() => [currentPath], [currentPath]);

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
          onClick={handleMenuClick}
          items={menuItems}
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
  // Memoize navigation groups to prevent re-creation
  const navigationGroups = useMemo(() => NAVIGATION_GROUPS, []);

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
                  navigationGroups={navigationGroups}
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
          navigationGroups={navigationGroups}
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
