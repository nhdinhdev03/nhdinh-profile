import React from 'react';
import { Dialog, Transition } from '@headlessui/react';
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
  InformationCircleIcon
} from '@heroicons/react/24/outline';
import { ROUTES } from 'router/routeConstants';

const SidebarContent = ({ navigation, currentPath, handleNavigation }) => (
  <div className="flex grow flex-col gap-y-5 overflow-y-auto bg-white px-6 pb-4 ring-1 ring-white/10">
    <div className="flex h-16 shrink-0 items-center">
      <img
        className="h-8 w-auto"
        src="/static/media/Logo.266ee6b125e665314f27.png"
        alt="Admin Portal"
      />
      <span className="ml-3 text-lg font-semibold text-gray-900">Admin Portal</span>
    </div>
    <nav className="flex flex-1 flex-col">
      <ul className="flex flex-1 flex-col gap-y-7">
        <li>
          <ul className="-mx-2 space-y-1">
            {navigation.map((item) => (
              <li key={item.name}>
                <button
                  onClick={() => handleNavigation(item.href)}
                  className={`group flex w-full gap-x-3 rounded-md p-2 text-sm leading-6 font-semibold transition-colors ${
                    currentPath === item.href
                      ? 'bg-indigo-600 text-white'
                      : 'text-gray-700 hover:text-indigo-600 hover:bg-gray-50'
                  }`}
                >
                  <item.icon
                    className={`h-6 w-6 shrink-0 ${
                      currentPath === item.href ? 'text-white' : 'text-gray-400 group-hover:text-indigo-600'
                    }`}
                    aria-hidden="true"
                  />
                  <div className="text-left">
                    <div>{item.name}</div>
                    <div className={`text-xs ${
                      currentPath === item.href ? 'text-indigo-200' : 'text-gray-500'
                    }`}>
                      {item.description}
                    </div>
                  </div>
                </button>
              </li>
            ))}
          </ul>
        </li>
      </ul>
    </nav>
  </div>
);

const Sidebar = ({ sidebarOpen, setSidebarOpen, currentPath, navigate }) => {
  const navigation = [
    { 
      name: 'Dashboard', 
      href: ROUTES.ADMIN.DASHBOARD, 
      icon: HomeIcon,
      description: 'Tổng quan hệ thống'
    },
    { 
      name: 'Quản lý Trang chủ', 
      href: ROUTES.ADMIN.HOME_MANAGEMENT, 
      icon: HomeIcon,
      description: 'Cập nhật nội dung trang chủ'
    },
    { 
      name: 'Quản lý Giới thiệu', 
      href: ROUTES.ADMIN.ABOUT_MANAGEMENT, 
      icon: InformationCircleIcon,
      description: 'Thông tin cá nhân & kinh nghiệm'
    },
    { 
      name: 'Quản lý Dự án', 
      href: ROUTES.ADMIN.PROJECTS_MANAGEMENT, 
      icon: FolderIcon,
      description: 'Portfolio & dự án cá nhân'
    },
    { 
      name: 'Quản lý Blog', 
      href: ROUTES.ADMIN.BLOG_MANAGEMENT, 
      icon: DocumentTextIcon,
      description: 'Bài viết & nội dung'
    },
    { 
      name: 'Quản lý Liên hệ', 
      href: ROUTES.ADMIN.CONTACT_MANAGEMENT, 
      icon: ChatBubbleLeftRightIcon,
      description: 'Tin nhắn & phản hồi'
    },
    { 
      name: 'Quản lý Tài khoản', 
      href: ROUTES.ADMIN.ACCOUNTS_MANAGEMENT, 
      icon: UserGroupIcon,
      description: 'Users & permissions'
    },
    { 
      name: 'Lịch sử thay đổi', 
      href: ROUTES.ADMIN.HISTORY_LOGS, 
      icon: ClockIcon,
      description: 'Activity logs & audit trail'
    },
    { 
      name: 'Thư viện Media', 
      href: ROUTES.ADMIN.MEDIA_LIBRARY, 
      icon: PhotoIcon,
      description: 'Hình ảnh & tài liệu'
    },
    { 
      name: 'Thống kê', 
      href: ROUTES.ADMIN.ANALYTICS, 
      icon: ChartBarIcon,
      description: 'Analytics & báo cáo'
    },
    { 
      name: 'Cài đặt', 
      href: ROUTES.ADMIN.SETTINGS, 
      icon: CogIcon,
      description: 'Cấu hình hệ thống'
    },
    { 
      name: 'Hồ sơ', 
      href: ROUTES.ADMIN.PROFILE, 
      icon: UserIcon,
      description: 'Thông tin cá nhân admin'
    },
  ];

  const handleNavigation = (href) => {
    navigate(href);
    setSidebarOpen(false);
  };

  return (
    <>
      {/* Mobile sidebar */}
      <Transition show={sidebarOpen}>
        <Dialog as="div" className="relative z-50 lg:hidden" onClose={setSidebarOpen}>
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
                    <button type="button" className="-m-2.5 p-2.5" onClick={() => setSidebarOpen(false)}>
                      <span className="sr-only">Close sidebar</span>
                      <XMarkIcon className="h-6 w-6 text-white" aria-hidden="true" />
                    </button>
                  </div>
                </Transition>
                <SidebarContent 
                  navigation={navigation}
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
          navigation={navigation}
          currentPath={currentPath}
          handleNavigation={handleNavigation}
        />
      </div>
    </>
  );
};

export default Sidebar;
