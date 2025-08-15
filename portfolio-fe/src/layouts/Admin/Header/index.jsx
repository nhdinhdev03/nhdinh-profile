import React from 'react';
import { 
  Bars3Icon,
  BellIcon,
  MagnifyingGlassIcon,
  ArrowRightOnRectangleIcon
} from '@heroicons/react/24/outline';
import { ROUTES } from 'router/routeConstants';

const Header = ({ setSidebarOpen, currentPath }) => {
  const getPageTitle = () => {
    const pathTitles = {
      [ROUTES.ADMIN.DASHBOARD]: 'Dashboard',
      [ROUTES.ADMIN.HOME_MANAGEMENT]: 'Quản lý Trang chủ',
      [ROUTES.ADMIN.ABOUT_MANAGEMENT]: 'Quản lý Giới thiệu',
      [ROUTES.ADMIN.PROJECTS_MANAGEMENT]: 'Quản lý Dự án',
      [ROUTES.ADMIN.BLOG_MANAGEMENT]: 'Quản lý Blog',
      [ROUTES.ADMIN.CONTACT_MANAGEMENT]: 'Quản lý Liên hệ',
      [ROUTES.ADMIN.ACCOUNTS_MANAGEMENT]: 'Quản lý Tài khoản',
      [ROUTES.ADMIN.HISTORY_LOGS]: 'Lịch sử thay đổi',
      [ROUTES.ADMIN.MEDIA_LIBRARY]: 'Thư viện Media',
      [ROUTES.ADMIN.ANALYTICS]: 'Thống kê & Phân tích',
      [ROUTES.ADMIN.SETTINGS]: 'Cài đặt hệ thống',
      [ROUTES.ADMIN.PROFILE]: 'Hồ sơ cá nhân',
    };
    return pathTitles[currentPath] || 'Admin Portal';
  };

  const handleLogout = () => {
    // Implement logout logic here
    console.log('Logout clicked');
  };

  return (
    <div className="sticky top-0 z-40 flex h-16 shrink-0 items-center gap-x-4 border-b border-gray-200 bg-white px-4 shadow-sm sm:gap-x-6 sm:px-6 lg:px-8">
      <button
        type="button"
        className="-m-2.5 p-2.5 text-gray-700 lg:hidden"
        onClick={() => setSidebarOpen(true)}
      >
        <span className="sr-only">Open sidebar</span>
        <Bars3Icon className="h-6 w-6" aria-hidden="true" />
      </button>

      {/* Separator */}
      <div className="h-6 w-px bg-gray-900/10 lg:hidden" aria-hidden="true" />

      <div className="flex flex-1 gap-x-4 self-stretch lg:gap-x-6">
        <div className="relative flex flex-1 items-center">
          <h1 className="text-xl font-semibold text-gray-900">{getPageTitle()}</h1>
        </div>

        <div className="flex items-center gap-x-4 lg:gap-x-6">
          {/* Search */}
          <div className="relative hidden sm:block">
            <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
              <MagnifyingGlassIcon className="h-5 w-5 text-gray-400" aria-hidden="true" />
            </div>
            <input
              id="search-field"
              className="block h-full w-full border-0 py-0 pl-10 pr-0 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm"
              placeholder="Tìm kiếm..."
              type="search"
              name="search"
            />
          </div>

          {/* Notifications */}
          <button
            type="button"
            className="relative -m-2.5 p-2.5 text-gray-400 hover:text-gray-500"
          >
            <span className="sr-only">View notifications</span>
            <BellIcon className="h-6 w-6" aria-hidden="true" />
            <span className="absolute top-0 right-0 block h-2 w-2 rounded-full bg-red-400 ring-2 ring-white"></span>
          </button>

          {/* Separator */}
          <div className="hidden lg:block lg:h-6 lg:w-px lg:bg-gray-900/10" aria-hidden="true" />

          {/* Profile dropdown */}
          <div className="relative">
            <div className="flex items-center gap-x-3">
              <img
                className="h-8 w-8 rounded-full bg-gray-50"
                src="https://ui-avatars.com/api/?name=Admin&background=6366f1&color=fff"
                alt="Admin"
              />
              <div className="hidden lg:flex lg:items-center lg:gap-x-3">
                <span className="text-sm font-semibold leading-6 text-gray-900">Admin</span>
                <button
                  onClick={handleLogout}
                  className="flex items-center gap-x-2 text-sm text-gray-500 hover:text-gray-700"
                >
                  <ArrowRightOnRectangleIcon className="h-4 w-4" />
                  <span>Đăng xuất</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Header;
