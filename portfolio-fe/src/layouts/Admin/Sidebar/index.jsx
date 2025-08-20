import React, { useState } from "react";
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
} from "@heroicons/react/24/outline";
import { ROUTES } from "router/routeConstants";
import img from "assets/Img";
import { Link } from "react-router-dom";

const SidebarContent = ({
  navigationGroups,
  currentPath,
  handleNavigation,

}) => (
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
      <div className="flex flex-1 flex-col space-y-8">
        {navigationGroups.map((group, groupIndex) => (
          <div key={group.name} className="sidebar-group">
            {/* Group Header */}
            <div className="text-xs font-semibold leading-6 text-gray-400 uppercase tracking-wide mb-3 sidebar-group-header">
              {group.name}
            </div>
            <ul className="-mx-2 space-y-1">
              {group.items.map((item, itemIndex) => (
                <li
                  key={item.name}
                  style={{
                    animationDelay: `${
                      (groupIndex * group.items.length + itemIndex) * 50
                    }ms`,
                  }}
                >
                  <button
                    onClick={() => handleNavigation(item.href)}
                    className={`group flex w-full gap-x-3 rounded-md p-2 text-sm leading-6 font-semibold transition-colors sidebar-menu-item sidebar-menu-item-animated ${
                      currentPath === item.href
                        ? "bg-indigo-600 text-white active"
                        : "text-gray-700 hover:text-indigo-600 hover:bg-gray-50"
                    }`}
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
        ))}
      </div>
    </nav>
  </div>
);

const Sidebar = ({ sidebarOpen, setSidebarOpen, currentPath, navigate }) => {
  const [expandedGroups, setExpandedGroups] = useState(
    new Set(["overview", "content", "interaction", "system", "settings"])
  );

  const navigationGroups = [
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
      name: "Quản lý Nội dung",
      id: "content",
      items: [
        {
          name: "Trang chủ",
          href: ROUTES.ADMIN.HOME_MANAGEMENT,
          icon: HomeIcon,
          description: "Cập nhật nội dung trang chủ",
        },
        {
          name: "Giới thiệu",
          href: ROUTES.ADMIN.ABOUT_MANAGEMENT,
          icon: InformationCircleIcon,
          description: "Thông tin cá nhân & kinh nghiệm",
        },
        {
          name: "Dự án",
          href: ROUTES.ADMIN.PROJECTS_MANAGEMENT,
          icon: FolderIcon,
          description: "Portfolio & dự án cá nhân",
        },
        {
          name: "Blog",
          href: ROUTES.ADMIN.BLOG_MANAGEMENT,
          icon: DocumentTextIcon,
          description: "Bài viết & nội dung",
        },
      ],
    },
    {
      name: "Tương tác",
      id: "interaction",
      items: [
        {
          name: "Liên hệ",
          href: ROUTES.ADMIN.CONTACT_MANAGEMENT,
          icon: ChatBubbleLeftRightIcon,
          description: "Tin nhắn & phản hồi",
        },
      ],
    },
    {
      name: "Quản trị Hệ thống",
      id: "system",
      items: [
        {
          name: "Tài khoản",
          href: ROUTES.ADMIN.ACCOUNTS_MANAGEMENT,
          icon: UserGroupIcon,
          description: "Users & permissions",
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
          name: "Hồ sơ",
          href: ROUTES.ADMIN.PROFILE,
          icon: UserIcon,
          description: "Thông tin cá nhân admin",
        },
      ],
    },
  ];

  const toggleGroup = (groupId) => {
    setExpandedGroups((prev) => {
      const newSet = new Set(prev);
      if (newSet.has(groupId)) {
        newSet.delete(groupId);
      } else {
        newSet.add(groupId);
      }
      return newSet;
    });
  };

  const handleNavigation = (href) => {
    navigate(href);
    setSidebarOpen(false);
  };

  return (
    <>
      {/* Mobile sidebar */}
      <Transition show={sidebarOpen}>
        <Dialog
          as="div"
          className="relative z-50 lg:hidden"
          onClose={setSidebarOpen}
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
                      onClick={() => setSidebarOpen(false)}
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
};

export default Sidebar;
