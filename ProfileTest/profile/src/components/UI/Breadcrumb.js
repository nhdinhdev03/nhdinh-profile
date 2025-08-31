import React from 'react';
import { motion } from 'framer-motion';
import { Link, useLocation } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { 
  faHome, 
  faUser, 
  faProjectDiagram, 
  faBlog, 
  faEnvelope,
  faChevronRight 
} from '@fortawesome/free-solid-svg-icons';

const Breadcrumb = () => {
  const location = useLocation();
  
  const routeConfig = {
    '/': { name: 'Home', icon: faHome },
    '/about': { name: 'About', icon: faUser },
    '/projects': { name: 'Projects', icon: faProjectDiagram },
    '/blog': { name: 'Blog', icon: faBlog },
    '/contact': { name: 'Contact', icon: faEnvelope }
  };

  const currentRoute = routeConfig[location.pathname];
  
  if (!currentRoute || location.pathname === '/') {
    return null;
  }

  return (
    <motion.nav
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="fixed top-20 left-0 right-0 z-40 bg-black/10 backdrop-blur-md border-b border-white/10"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center h-16 space-x-2 text-sm">
          {/* Home Link */}
          <Link 
            to="/"
            className="flex items-center space-x-2 text-gray-400 hover:text-white transition-colors duration-300 group"
          >
            <FontAwesomeIcon 
              icon={faHome} 
              className="text-xs group-hover:scale-110 transition-transform duration-300" 
            />
            <span>Home</span>
          </Link>
          
          {/* Separator */}
          <FontAwesomeIcon 
            icon={faChevronRight} 
            className="text-gray-600 text-xs" 
          />
          
          {/* Current Page */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.3, delay: 0.2 }}
            className="flex items-center space-x-2 text-white"
          >
            <FontAwesomeIcon 
              icon={currentRoute.icon} 
              className="text-xs text-blue-400" 
            />
            <span className="font-medium">{currentRoute.name}</span>
          </motion.div>
        </div>
      </div>
    </motion.nav>
  );
};

export default Breadcrumb;
