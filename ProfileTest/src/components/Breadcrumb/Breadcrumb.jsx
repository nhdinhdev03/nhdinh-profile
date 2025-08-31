import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { ROUTES } from '../../router/routeConstants';
import { FiHome, FiChevronRight } from 'react-icons/fi';

const Breadcrumb = ({ className = '' }) => {
  const location = useLocation();
  
  // Define route titles
  const routeTitles = {
    [ROUTES.HOME]: 'Trang chủ',
    [ROUTES.ABOUT]: 'Giới thiệu',
    [ROUTES.PROJECTS]: 'Dự án',
    [ROUTES.BLOG]: 'Blog',
    [ROUTES.CONTACT]: 'Liên hệ',
  };

  const currentPath = location.pathname;
  
  // Don't show breadcrumb on home page
  if (currentPath === ROUTES.HOME) {
    return null;
  }

  return (
    <nav className={`flex items-center space-x-2 text-sm ${className}`} aria-label="Breadcrumb">
      <Link
        to={ROUTES.HOME}
        className="flex items-center text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200 transition-colors duration-200"
      >
        <FiHome className="w-4 h-4" />
      </Link>
      
      <FiChevronRight className="w-4 h-4 text-gray-400" />
      
      <span className="text-gray-700 dark:text-gray-300 font-medium">
        {routeTitles[currentPath] || 'Trang không xác định'}
      </span>
    </nav>
  );
};

export default Breadcrumb;
