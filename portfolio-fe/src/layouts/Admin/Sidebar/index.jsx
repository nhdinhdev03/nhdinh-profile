/**
 * Optimized Admin Sidebar Component
 * 
 * Optimizations applied:
 * 1. React.memo for both SidebarContent and Sidebar to prevent unnecessary re-renders
 * 2. useMemo for static navigation groups to prevent re-creation on each render
 * 3. useCallback for event handlers to maintain stable references
 * 4. Improved accessibility with proper ARIA attributes and button types
 * 5. Better key props using unique identifiers instead of names
 * 6. Moved static data outside component scope
 * 7. Stable references to prevent QuillBot-like focus issues
 */

import React, { useMemo, useCallback, memo, useState, useEffect, useRef } from "react";
import { Dialog, Transition } from "@headlessui/react";
import {
  XMarkIcon,
  HomeIcon,
  DocumentTextIcon,
  FolderIcon,
  ChatBubbleLeftRightIcon,
  UserGroupIcon,
  ClockIcon,
  CogIcon,
  UserIcon,
  PhotoIcon,
  ChartBarIcon,
  InformationCircleIcon,
  ChevronDownIcon,
  ChevronRightIcon,
} from "@heroicons/react/24/outline";
import { ROUTES } from "router/routeConstants";
import img from "assets/Img";
import { Link } from "react-router-dom";
import "./Sidebar.css";
import { sidebarStorage, findGroupForRoute, getInitialExpandedGroups } from "./sidebarUtils";

// Move navigation groups outside component to prevent re-creation on each render
const NAVIGATION_GROUPS = [
  {
    name: "Tổng quan",
    id: "overview",
    items: [
      {
        name: "Dashboard",
        href: ROUTES.ADMIN.DASHBOARD,
        icon: HomeIcon,
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
        icon: HomeIcon,
        description: "Quản lý nội dung trang chủ",
      },
      {
        name: "Hero Section",
        href: ROUTES.ADMIN.HERO_MANAGEMENT,
        icon: PhotoIcon,
        description: "Phần giới thiệu chính",
      },
      {
        name: "Hero SubHeading",
        href: ROUTES.ADMIN.HERO_SUBHEADING_MANAGEMENT,
        icon: DocumentTextIcon,
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
        icon: InformationCircleIcon,
        description: "Thông tin cá nhân tổng quát",
      },
      {
        name: "Thông tin Hồ sơ",
        href: ROUTES.ADMIN.PROFILE_INFO_MANAGEMENT,
        icon: UserIcon,
        description: "Hồ sơ cá nhân chi tiết",
      },
      {
        name: "Profile Tags",
        href: ROUTES.ADMIN.PROFILE_TAGS_MANAGEMENT,
        icon: DocumentTextIcon,
        description: "Nhãn mô tả hồ sơ",
      },
      {
        name: "Kinh nghiệm",
        href: ROUTES.ADMIN.EXPERIENCE_MANAGEMENT,
        icon: ClockIcon,
        description: "Lịch sử làm việc",
      },
      {
        name: "Kỹ năng",
        href: ROUTES.ADMIN.SKILLS_MANAGEMENT,
        icon: CogIcon,
        description: "Danh sách kỹ năng",
      },
      {
        name: "Danh mục Kỹ năng",
        href: ROUTES.ADMIN.SKILL_CATEGORIES_MANAGEMENT,
        icon: FolderIcon,
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
        icon: FolderIcon,
        description: "Portfolio & dự án tổng quát",
      },
      {
        name: "Danh mục Dự án",
        href: ROUTES.ADMIN.PROJECT_CATEGORIES_MANAGEMENT,
        icon: FolderIcon,
        description: "Phân loại dự án",
      },
      {
        name: "Tag Công nghệ",
        href: ROUTES.ADMIN.PROJECT_TAGS_MANAGEMENT,
        icon: DocumentTextIcon,
        description: "Nhãn công nghệ",
      },
      {
        name: "Mapping Tag-Project",
        href: ROUTES.ADMIN.PROJECT_TAG_MAP_MANAGEMENT,
        icon: CogIcon,
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
        icon: DocumentTextIcon,
        description: "Bài viết tổng quát",
      },
      {
        name: "Bài viết",
        href: ROUTES.ADMIN.BLOG_POSTS_MANAGEMENT,
        icon: DocumentTextIcon,
        description: "Quản lý bài viết",
      },
      {
        name: "Tag Blog",
        href: ROUTES.ADMIN.BLOG_TAGS_MANAGEMENT,
        icon: DocumentTextIcon,
        description: "Nhãn cho blog",
      },
      {
        name: "Mapping Tag-Blog",
        href: ROUTES.ADMIN.BLOG_TAG_MAP_MANAGEMENT,
        icon: CogIcon,
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
        icon: ChatBubbleLeftRightIcon,
        description: "Tin nhắn tổng quát",
      },
      {
        name: "Tin nhắn Liên hệ",
        href: ROUTES.ADMIN.CONTACT_MESSAGES_MANAGEMENT,
        icon: ChatBubbleLeftRightIcon,
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
        icon: UserGroupIcon,
        description: "Quản lý admin users",
      },
      {
        name: "Lịch sử thay đổi",
        href: ROUTES.ADMIN.HISTORY_LOGS,
        icon: ClockIcon,
        description: "Activity logs & audit trail",
      },
      {
        name: "Thư viện Media",
        href: ROUTES.ADMIN.MEDIA_LIBRARY,
        icon: PhotoIcon,
        description: "Hình ảnh & tài liệu",
      },
      {
        name: "Thống kê",
        href: ROUTES.ADMIN.ANALYTICS,
        icon: ChartBarIcon,
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
        icon: CogIcon,
        description: "Cấu hình hệ thống",
      },
      {
        name: "Hồ sơ Admin",
        href: ROUTES.ADMIN.PROFILE,
        icon: UserIcon,
        description: "Thông tin cá nhân admin",
      },
    ],
  },
];

// Memoized SidebarContent to prevent unnecessary re-renders
const SidebarContent = memo(({
  navigationGroups,
  currentPath,
  handleNavigation,
  expandedGroups,
  toggleGroup,
}) => {
  const scrollRef = useRef(null);

  // Restore scroll position on mount
  useEffect(() => {
    if (scrollRef.current) {
      const savedScrollPosition = sidebarStorage.loadScrollPosition();
      scrollRef.current.scrollTop = savedScrollPosition;
    }
  }, []);

  // Save scroll position on scroll
  const handleScroll = useCallback((e) => {
    sidebarStorage.saveScrollPosition(e.target.scrollTop);
  }, []);

  return (
    <div 
      ref={scrollRef}
      onScroll={handleScroll}
      className="flex grow flex-col gap-y-5 overflow-y-auto bg-white px-6 pb-4 ring-1 ring-white/10 sidebar-content"
    >
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
      <div className="flex flex-1 flex-col space-y-8">
        {navigationGroups.map((group, groupIndex) => {
          const isExpanded = expandedGroups.includes(group.id);
          return (
            <div key={group.id} className="sidebar-group">
              {/* Group Header - Clickable */}
              <button
                type="button"
                onClick={() => toggleGroup(group.id)}
                className="flex w-full items-center justify-between text-xs font-semibold leading-6 text-gray-400 uppercase tracking-wide mb-3 sidebar-group-header hover:text-gray-600 transition-colors"
              >
                <span>{group.name}</span>
                {isExpanded ? (
                  <ChevronDownIcon className="h-4 w-4" />
                ) : (
                  <ChevronRightIcon className="h-4 w-4" />
                )}
              </button>
              
              {/* Collapsible content */}
              <div className={`transition-all duration-200 ease-in-out overflow-hidden ${
                isExpanded ? 'max-h-screen opacity-100' : 'max-h-0 opacity-0'
              }`}>
                <ul className="-mx-2 space-y-1">
                  {group.items.map((item, itemIndex) => (
                    <li
                      key={`${group.id}-${item.href}`}
                      style={{
                        animationDelay: `${
                          (groupIndex * group.items.length + itemIndex) * 50
                        }ms`,
                      }}
                    >
                      <button
                        type="button"
                        onClick={() => handleNavigation(item.href)}
                        className={`group flex w-full gap-x-3 rounded-md p-2 text-sm leading-6 font-semibold transition-colors sidebar-menu-item sidebar-menu-item-animated ${
                          currentPath === item.href
                            ? "bg-indigo-600 text-white active"
                            : "text-gray-700 hover:text-indigo-600 hover:bg-gray-50"
                        }`}
                        aria-current={currentPath === item.href ? "page" : undefined}
                        tabIndex={0}
                      >
                        <item.icon
                          className={`h-6 w-6 shrink-0 menu-icon ${
                            currentPath === item.href
                              ? "text-white"
                              : "text-gray-400 group-hover:text-indigo-600"
                          }`}
                          aria-hidden="true"
                        />
                        <div className="text-left">
                          <div>{item.name}</div>
                          <div
                            className={`text-xs ${
                              currentPath === item.href
                                ? "text-indigo-200"
                                : "text-gray-500"
                            }`}
                          >
                            {item.description}
                          </div>
                        </div>
                      </button>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          );
        })}
      </div>
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

  // State for managing expanded groups
  const [expandedGroups, setExpandedGroups] = useState(() => {
    return getInitialExpandedGroups(currentPath, navigationGroups);
  });

  // Auto-expand group containing current route when path changes
  useEffect(() => {
    const currentGroup = findGroupForRoute(currentPath, navigationGroups);
    if (currentGroup && !expandedGroups.includes(currentGroup)) {
      setExpandedGroups(prev => {
        const newExpanded = [...prev, currentGroup];
        sidebarStorage.saveExpandedGroups(newExpanded);
        return newExpanded;
      });
    }
  }, [currentPath, navigationGroups, expandedGroups]);

  // Save expanded groups to localStorage whenever it changes
  useEffect(() => {
    sidebarStorage.saveExpandedGroups(expandedGroups);
  }, [expandedGroups]);

  // Toggle group expand/collapse
  const toggleGroup = useCallback((groupId) => {
    setExpandedGroups(prev => {
      const newExpanded = prev.includes(groupId)
        ? prev.filter(id => id !== groupId)
        : [...prev, groupId];
      return newExpanded;
    });
  }, []);

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
                  expandedGroups={expandedGroups}
                  toggleGroup={toggleGroup}
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
          expandedGroups={expandedGroups}
          toggleGroup={toggleGroup}
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
