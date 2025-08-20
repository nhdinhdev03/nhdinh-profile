import React, { useState } from 'react';
import { Menu, Transition } from '@headlessui/react';
import { Fragment } from 'react';
import { 
  Bars3Icon,
  BellIcon,
  MagnifyingGlassIcon,
  ArrowRightOnRectangleIcon,
  UserCircleIcon,
  CogIcon,
  ChevronDownIcon
} from '@heroicons/react/24/outline';
import { ROUTES } from 'router/routeConstants';
import { useToast } from '../../../components/Admin/Toast';

const Header = ({ setSidebarOpen, currentPath }) => {
  const [searchValue, setSearchValue] = useState('');
  const { toast } = useToast();

  const getPageTitle = () => {
    const pathTitles = {
      [ROUTES.ADMIN.DASHBOARD]: 'Dashboard',
      [ROUTES.ADMIN.HOME_MANAGEMENT]: 'Trang chủ',
      [ROUTES.ADMIN.ABOUT_MANAGEMENT]: 'Giới thiệu',
      [ROUTES.ADMIN.PROJECTS_MANAGEMENT]: 'Dự án',
      [ROUTES.ADMIN.BLOG_MANAGEMENT]: 'Blog',
      [ROUTES.ADMIN.CONTACT_MANAGEMENT]: 'Liên hệ',
      [ROUTES.ADMIN.ACCOUNTS_MANAGEMENT]: 'Tài khoản',
      [ROUTES.ADMIN.HISTORY_LOGS]: 'Lịch sử thay đổi',
      [ROUTES.ADMIN.MEDIA_LIBRARY]: 'Thư viện Media',
      [ROUTES.ADMIN.ANALYTICS]: 'Thống kê',
      [ROUTES.ADMIN.SETTINGS]: 'Cài đặt',
      [ROUTES.ADMIN.PROFILE]: 'Hồ sơ',
    };
    return pathTitles[currentPath] || 'Admin Portal';
  };

  const handleLogout = () => {
    toast.success('Đăng xuất thành công!');
    // Implement logout logic here
    // console.log('Logout clicked'); // Debug log - removed for production
  };

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchValue.trim()) {
      toast.info(`Đang tìm kiếm: "${searchValue}"`);
      // Implement search logic here
    }
  };

  const userMenuItems = [
    {
      name: 'Hồ sơ cá nhân',
      href: ROUTES.ADMIN.PROFILE,
      icon: UserCircleIcon
    },
    {
      name: 'Cài đặt',
      href: ROUTES.ADMIN.SETTINGS,
      icon: CogIcon
    }
  ];

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
          <form onSubmit={handleSearch} className="relative hidden sm:block">
            <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
              <MagnifyingGlassIcon className="h-5 w-5 text-gray-400" aria-hidden="true" />
            </div>
            <input
              id="search-field"
              className="block h-full w-full border border-gray-300 rounded-lg py-2 pl-10 pr-3 text-gray-900 placeholder:text-gray-400 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              placeholder="Tìm kiếm..."
              type="search"
              name="search"
              value={searchValue}
              onChange={(e) => setSearchValue(e.target.value)}
            />
          </form>

          {/* Notifications */}
          <button
            type="button"
            className="relative -m-2.5 p-2.5 text-gray-400 hover:text-gray-500 transition-colors"
            onClick={() => toast.info('Hiện tại không có thông báo mới')}
          >
            <span className="sr-only">View notifications</span>
            <BellIcon className="h-6 w-6" aria-hidden="true" />
            <span className="absolute top-0 right-0 block h-2 w-2 rounded-full bg-red-400 ring-2 ring-white"></span>
          </button>

          {/* Separator */}
          <div className="hidden lg:block lg:h-6 lg:w-px lg:bg-gray-900/10" aria-hidden="true" />

          {/* Profile dropdown */}
          <Menu as="div" className="relative">
            <Menu.Button className="flex items-center gap-x-3 text-sm font-semibold leading-6 text-gray-900 hover:bg-gray-50 rounded-lg p-2 transition-colors">
              <img
                className="h-8 w-8 rounded-full bg-gray-50"
                src="https://ui-avatars.com/api/?name=Admin&background=6366f1&color=fff"
                alt="Admin"
              />
              <span className="hidden lg:flex lg:items-center">
                <span className="ml-2 text-sm font-semibold leading-6 text-gray-900">Admin</span>
                <ChevronDownIcon className="ml-2 h-5 w-5 text-gray-400" aria-hidden="true" />
              </span>
            </Menu.Button>
            
            <Transition
              as={Fragment}
              enter="transition ease-out duration-100"
              enterFrom="transform opacity-0 scale-95"
              enterTo="transform opacity-100 scale-100"
              leave="transition ease-in duration-75"
              leaveFrom="transform opacity-100 scale-100"
              leaveTo="transform opacity-0 scale-95"
            >
              <Menu.Items className="absolute right-0 z-10 mt-2.5 w-64 origin-top-right rounded-lg bg-white py-2 shadow-lg ring-1 ring-gray-900/5 focus:outline-none">
                <div className="px-4 py-3 border-b border-gray-100">
                  <p className="text-sm font-medium text-gray-900">Đăng nhập với</p>
                  <p className="text-sm text-gray-500 truncate">admin@nhdinh.dev</p>
                </div>
                
                {userMenuItems.map((item) => (
                  <Menu.Item key={item.name}>
                    {({ active }) => (
                      <a
                        href={item.href}
                        className={`group flex items-center px-4 py-2 text-sm ${
                          active ? 'bg-gray-100 text-gray-900' : 'text-gray-700'
                        }`}
                      >
                        <item.icon className="mr-3 h-5 w-5 text-gray-400 group-hover:text-gray-500" />
                        {item.name}
                      </a>
                    )}
                  </Menu.Item>
                ))}
                
                <div className="border-t border-gray-100 pt-2">
                  <Menu.Item>
                    {({ active }) => (
                      <button
                        onClick={handleLogout}
                        className={`group flex w-full items-center px-4 py-2 text-sm ${
                          active ? 'bg-gray-100 text-gray-900' : 'text-gray-700'
                        }`}
                      >
                        <ArrowRightOnRectangleIcon className="mr-3 h-5 w-5 text-gray-400 group-hover:text-gray-500" />
                        Đăng xuất
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

export default Header;
    
