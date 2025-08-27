import React from 'react';
import PropTypes from 'prop-types';
import { motion } from 'framer-motion';

const AdminCard = ({ 
  children, 
  title, 
  subtitle,
  icon: Icon,
  actions,
  loading = false,
  hover = true,
  className = "",
  headerClassName = "",
  bodyClassName = "",
  variant = "default" // default, bordered, elevated, flat
}) => {
  const variants = {
    default: "bg-white border border-gray-200 shadow-sm",
    bordered: "bg-white border-2 border-gray-200",
    elevated: "bg-white shadow-lg border border-gray-100",
    flat: "bg-gray-50 border-0"
  };

  const cardClasses = `
    ${variants[variant]}
    rounded-xl overflow-hidden transition-all duration-200
    ${hover ? 'hover:shadow-md hover:border-gray-300' : ''}
    ${loading ? 'opacity-60' : ''}
    ${className}
  `.trim();

  return (
    <motion.div
      className={cardClasses}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      whileHover={hover ? { y: -2 } : {}}
    >
      {(title || subtitle || Icon || actions) && (
        <div className={`px-6 py-4 border-b border-gray-100 ${headerClassName}`}>
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              {Icon && typeof Icon === 'function' && (
                <div className="flex-shrink-0">
                  <Icon className="h-5 w-5 text-gray-600" />
                </div>
              )}
              <div>
                {title && (
                  <h3 className="text-lg font-semibold text-gray-900">
                    {title}
                  </h3>
                )}
                {subtitle && (
                  <p className="text-sm text-gray-500 mt-1">
                    {subtitle}
                  </p>
                )}
              </div>
            </div>
            {actions && (
              <div className="flex items-center space-x-2">
                {actions}
              </div>
            )}
          </div>
        </div>
      )}
      
      <div className={`p-6 ${bodyClassName}`}>
        {loading ? (
          <div className="flex items-center justify-center py-8">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-indigo-600"></div>
          </div>
        ) : (
          children
        )}
      </div>
    </motion.div>
  );
};

AdminCard.propTypes = {
  children: PropTypes.node.isRequired,
  title: PropTypes.string,
  subtitle: PropTypes.string,
  icon: PropTypes.elementType,
  actions: PropTypes.node,
  loading: PropTypes.bool,
  hover: PropTypes.bool,
  className: PropTypes.string,
  headerClassName: PropTypes.string,
  bodyClassName: PropTypes.string,
  variant: PropTypes.oneOf(['default', 'bordered', 'elevated', 'flat'])
};

export default AdminCard;
