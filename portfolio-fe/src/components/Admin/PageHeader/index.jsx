import React from "react";
import PropTypes from "prop-types";

const PageHeader = ({
  title,
  subtitle,
  description, // alias for subtitle for backward compatibility
  icon: Icon,
  actions,
  className = "",
}) => {
  const displaySubtitle = subtitle || description;

  return (
    <div className={`bg-white shadow-sm ${className}`}>
      {/* Page Header */}
      <div className="border-b border-gray-200">
        <div className="px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between py-6">
            <div className="min-w-0 flex-1">
              <div className="flex items-center space-x-3">
                {Icon && (
                  <div className="flex-shrink-0">
                    <Icon className="h-8 w-8 text-gray-600" />
                  </div>
                )}
                <div>
                  <h1 className="text-2xl font-bold leading-7 text-gray-900 sm:truncate sm:text-3xl sm:tracking-tight">
                    {title}
                  </h1>
                  {displaySubtitle && (
                    <p className="mt-1 text-sm text-gray-500">
                      {displaySubtitle}
                    </p>
                  )}
                </div>
              </div>
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
  subtitle: PropTypes.string,
  description: PropTypes.string, // backward compatibility
  icon: PropTypes.elementType,
  actions: PropTypes.node,
  className: PropTypes.string,
};

export default PageHeader;
