import React from "react";
import PropTypes from "prop-types";


const PageHeader = ({
  title,
  description,
  actions,
 
  className = "",
}) => {
  return (
    <div className={`bg-white dark:bg-gray-800 shadow-sm ${className}`}>

      {/* Page Header */}
      <div className="border-b border-gray-200 dark:border-gray-700">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between py-6">
            <div className="min-w-0 flex-1">
              <h1 className="text-2xl font-bold leading-7 text-gray-900 dark:text-white sm:truncate sm:text-3xl sm:tracking-tight">
                {title}
              </h1>
              {description && (
                <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
                  {description}
                </p>
              )}
            </div>

            {actions && (
              <div className="flex items-center gap-3">{actions}</div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

PageHeader.propTypes = {
  title: PropTypes.string.isRequired,
  description: PropTypes.string,
  actions: PropTypes.node,
  breadcrumbActions: PropTypes.node,
  customBreadcrumbLabels: PropTypes.objectOf(PropTypes.string),
  className: PropTypes.string,
};

export default PageHeader;
