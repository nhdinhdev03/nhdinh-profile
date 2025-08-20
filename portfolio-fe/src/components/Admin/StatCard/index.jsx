import React from 'react';
import PropTypes from 'prop-types';
import { motion } from 'framer-motion';

const StatCard = ({ 
  title, 
  value, 
  previousValue,
  change, 
  changeType = 'positive', // positive, negative, neutral
  icon: Icon,
  iconColor = 'text-indigo-600',
  iconBgColor = 'bg-indigo-100',
  loading = false,
  onClick
}) => {
  const getChangeColor = () => {
    switch (changeType) {
      case 'positive':
        return 'text-green-600';
      case 'negative':
        return 'text-red-600';
      default:
        return 'text-gray-600';
    }
  };

  const getChangeIcon = () => {
    if (changeType === 'positive') return '↗';
    if (changeType === 'negative') return '↘';
    return '→';
  };

  return (
    <motion.div
      className={`bg-white overflow-hidden shadow-sm rounded-xl border border-gray-200 transition-all duration-200 hover:shadow-md hover:border-gray-300 ${onClick ? 'cursor-pointer' : ''}`}
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.3 }}
      whileHover={onClick ? { y: -2 } : {}}
      onClick={onClick}
    >
      <div className="p-6">
        <div className="flex items-center">
          <div className="flex-shrink-0">
            <div className={`${iconBgColor} rounded-lg p-3`}>
              <Icon className={`h-6 w-6 ${iconColor}`} />
            </div>
          </div>
          <div className="ml-5 w-0 flex-1">
            <dl>
              <dt className="text-sm font-medium text-gray-500 truncate">
                {title}
              </dt>
              <dd className="flex items-baseline">
                {loading ? (
                  <div className="animate-pulse bg-gray-200 h-8 w-24 rounded"></div>
                ) : (
                  <>
                    <div className="text-2xl font-semibold text-gray-900">
                      {value}
                    </div>
                    {change !== undefined && (
                      <div className={`ml-2 flex items-baseline text-sm font-semibold ${getChangeColor()}`}>
                        <span>{getChangeIcon()}</span>
                        <span className="ml-1">{Math.abs(change)}%</span>
                      </div>
                    )}
                  </>
                )}
              </dd>
              {previousValue && !loading && (
                <dd className="text-xs text-gray-400 mt-1">
                  Trước đó: {previousValue}
                </dd>
              )}
            </dl>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

StatCard.propTypes = {
  title: PropTypes.string.isRequired,
  value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
  previousValue: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  change: PropTypes.number,
  changeType: PropTypes.oneOf(['positive', 'negative', 'neutral']),
  icon: PropTypes.elementType.isRequired,
  iconColor: PropTypes.string,
  iconBgColor: PropTypes.string,
  loading: PropTypes.bool,
  onClick: PropTypes.func
};

export default StatCard;
