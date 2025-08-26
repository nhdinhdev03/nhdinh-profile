import React, { useState, Fragment } from "react";
import PropTypes from "prop-types";
import { Menu, Transition } from "@headlessui/react";
import {
  Bars3Icon,
  BellIcon,
  MagnifyingGlassIcon,
  UserCircleIcon,
  CogIcon,
  ChevronDownIcon,
  ArrowRightStartOnRectangleIcon,
} from "@heroicons/react/24/outline";
import { AUTH_LOGIN, ROUTES } from "router/routeConstants";
import { useNavigate } from "react-router-dom";
import { useNotificationContext } from "components/Notification";
import { useAuth } from "contexts/AuthContext";
import "./Header.scss";

const Header = ({ setSidebarOpen, currentPath }) => {
  const [searchValue, setSearchValue] = useState("");
  const notification = useNotificationContext();
  const { logout, user } = useAuth();
  const navigate = useNavigate();

  // Optimized page titles with proper Vietnamese
  const getPageTitle = () => {
    const pathTitles = {
      [ROUTES.ADMIN.DASHBOARD]: "Tổng quan",
      [ROUTES.ADMIN.HERO_MANAGEMENT]: "Quản lý Trang chủ chính",
      [ROUTES.ADMIN.HERO_SUBHEADING_MANAGEMENT]: "Quản lý Tiêu đề phụ",
      [ROUTES.ADMIN.PROJECTS_MANAGEMENT]: "Quản lý Danh sách dự án",
      [ROUTES.ADMIN.PROJECT_CATEGORIES_MANAGEMENT]: "Quản lý Danh mục dự án",
      [ROUTES.ADMIN.PROJECT_TAGS_MANAGEMENT]: "Quản lý Thẻ công nghệ",
      [ROUTES.ADMIN.PROJECT_TAG_MAP_MANAGEMENT]: "Quản lý Liên kết thẻ-dự án",
      [ROUTES.ADMIN.BLOG_POSTS_MANAGEMENT]: "Quản lý Bài viết blog",
      [ROUTES.ADMIN.BLOG_TAGS_MANAGEMENT]: "Quản lý Thẻ bài viết",
      [ROUTES.ADMIN.BLOG_TAG_MAP_MANAGEMENT]: "Quản lý Liên kết thẻ-bài viết",
      [ROUTES.ADMIN.CONTACT_MESSAGES_MANAGEMENT]: "Quản lý Tin nhắn liên hệ",
      [ROUTES.ADMIN.PROFILE_INFO_MANAGEMENT]: "Quản lý Thông tin cá nhân",
      [ROUTES.ADMIN.PROFILE_TAGS_MANAGEMENT]: "Quản lý Thẻ hồ sơ",
      [ROUTES.ADMIN.EXPERIENCE_MANAGEMENT]: "Quản lý Kinh nghiệm làm việc",
      [ROUTES.ADMIN.SKILL_CATEGORIES_MANAGEMENT]: "Quản lý Danh mục kỹ năng",
      [ROUTES.ADMIN.SKILLS_MANAGEMENT]: "Quản lý Danh sách kỹ năng",
      [ROUTES.ADMIN.ADMIN_USERS_MANAGEMENT]: "Quản lý Tài khoản quản trị",
      [ROUTES.ADMIN.ANALYTICS]: "Thống kê & Báo cáo",
      [ROUTES.ADMIN.HISTORY_LOGS]: "Nhật ký hệ thống",
      [ROUTES.ADMIN.MEDIA_LIBRARY]: "Thư viện phương tiện",
      [ROUTES.ADMIN.SETTINGS]: "Cài đặt hệ thống",
      [ROUTES.ADMIN.PROFILE]: "Hồ sơ quản trị viên",
    };
    return pathTitles[currentPath] || "Bảng điều khiển";
  };

  const handleLogout = async () => {
    try {
      await logout();
      notification.success("Đăng xuất thành công!");
      navigate(AUTH_LOGIN);
    } catch (error) {
      console.error("Logout error:", error);
      notification.error("Có lỗi xảy ra khi đăng xuất");
    }
  };

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchValue.trim()) {
      notification.info(`Đang tìm kiếm: "${searchValue}"`);
      // Implement search logic here
    }
  };

  // Optimized user menu items with proper Vietnamese
  const userMenuItems = React.useMemo(() => [
    {
      id: 'profile',
      name: "Hồ sơ quản trị viên",
      href: ROUTES.ADMIN.PROFILE,
      icon: UserCircleIcon,
      description: "Xem và chỉnh sửa thông tin cá nhân"
    },
    {
      id: 'settings',
      name: "Cài đặt hệ thống",
      href: ROUTES.ADMIN.SETTINGS,
      icon: CogIcon,
      description: "Cấu hình hệ thống và tùy chọn"
    },
  ], []);

  const handleMenuItemClick = (href) => {
    navigate(href);
  };

  return (
    <div className="admin-header">
      <button
        type="button"
        className="admin-mobile-menu-btn"
        onClick={() => setSidebarOpen(true)}
        aria-label="Mở menu bên"
      >
        <Bars3Icon className="h-6 w-6" aria-hidden="true" />
      </button>

      {/* Separator */}
      <div className="admin-header-separator lg:hidden" aria-hidden="true" />

      <div className="admin-header-content">
        <div className="admin-header-title">
          <h1 className="admin-page-title">
            {getPageTitle()}
          </h1>
        </div>

        <div className="admin-header-actions">
          {/* Search */}
          <form onSubmit={handleSearch} className="admin-search-form">
            <div className="admin-search-icon">
              <MagnifyingGlassIcon
                className="h-5 w-5 text-gray-400"
                aria-hidden="true"
              />
            </div>
            <input
              id="search-field"
              className="admin-search-input"
              placeholder="Tìm kiếm trong hệ thống..."
              type="search"
              name="search"
              value={searchValue}
              onChange={(e) => setSearchValue(e.target.value)}
            />
          </form>

          {/* Notifications */}
          <button
            type="button"
            className="admin-notification-btn"
            onClick={() => notification.info("Hiện tại không có thông báo mới")}
            aria-label="Xem thông báo"
          >
            <BellIcon className="h-6 w-6" aria-hidden="true" />
            <span className="admin-notification-badge"></span>
          </button>

          {/* Separator */}
          <div className="admin-header-separator hidden lg:block" aria-hidden="true" />

          {/* Profile dropdown */}
          <Menu as="div" className="admin-profile-menu">
            <Menu.Button className="admin-profile-btn">
              <img
                className="admin-profile-avatar"
                src={`https://ui-avatars.com/api/?name=${encodeURIComponent(user?.fullName || 'Admin')}&background=667eea&color=fff&bold=true`}
                alt="Avatar quản trị viên"
              />
              <span className="admin-profile-info">
                <span className="admin-profile-name">
                  {user?.fullName || "Quản trị viên"}
                </span>
                <ChevronDownIcon
                  className="admin-profile-chevron"
                  aria-hidden="true"
                />
              </span>
            </Menu.Button>

            <Transition
              as={Fragment}
              enter="transition ease-out duration-200"
              enterFrom="transform opacity-0 scale-95"
              enterTo="transform opacity-100 scale-100"
              leave="transition ease-in duration-150"
              leaveFrom="transform opacity-100 scale-100"
              leaveTo="transform opacity-0 scale-95"
            >
              <Menu.Items className="admin-profile-dropdown">
                <div className="admin-profile-dropdown-header">
                  <p className="admin-profile-dropdown-title">
                    Đăng nhập với tư cách
                  </p>
                  <p className="admin-profile-dropdown-email">
                    {user?.username || user?.phoneNumber || "admin@nhdinh.dev"}
                  </p>
                </div>

                {userMenuItems.map((item) => (
                  <Menu.Item key={item.id}>
                    {({ active }) => (
                      <button
                        onClick={() => handleMenuItemClick(item.href)}
                        className={`admin-profile-menu-item ${
                          active ? "active" : ""
                        }`}
                        title={item.description}
                      >
                        <item.icon 
                          className="admin-profile-menu-icon" 
                          aria-hidden="true"
                        />
                        <span>{item.name}</span>
                      </button>
                    )}
                  </Menu.Item>
                ))}

                <div className="admin-profile-dropdown-divider">
                  <Menu.Item>
                    {({ active }) => (
                      <button
                        onClick={handleLogout}
                        className={`admin-profile-menu-item logout ${
                          active ? "active" : ""
                        }`}
                      >
                        <ArrowRightStartOnRectangleIcon className="admin-profile-menu-icon" />
                        Đăng xuất khỏi hệ thống
                      </button>
                    )}
                  </Menu.Item>
                </div>
              </Menu.Items>
            </Transition>
          </Menu>
        </div>
      </div>
    </div>
  );
};

Header.propTypes = {
  setSidebarOpen: PropTypes.func.isRequired,
  currentPath: PropTypes.string.isRequired,
};

export default Header;
