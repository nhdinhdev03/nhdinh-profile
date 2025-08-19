import React from 'react';
import { motion } from 'framer-motion';
import { 
  CheckCircleIcon, 
  ExclamationTriangleIcon, 
  InformationCircleIcon, 
  XCircleIcon,
  XMarkIcon
} from '@heroicons/react/24/outline';

const ToastNotification = ({
  type = 'info',
  title,
  message,
  onDismiss,
  autoClose = true,
  duration = 4000,
  actions = null,
  showProgress = true,
  position = 'top-right' // top-right, top-left, bottom-right, bottom-left, top-center, bottom-center
}) => {
  const [progress, setProgress] = React.useState(100);
  const [isPaused, setIsPaused] = React.useState(false);
  const intervalRef = React.useRef(null);
  const timeoutRef = React.useRef(null);

  // Configuration for different toast types
  const getTypeConfig = () => {
    const configs = {
      success: {
        icon: CheckCircleIcon,
        bgColor: 'bg-green-50',
        borderColor: 'border-green-200',
        iconColor: 'text-green-400',
        titleColor: 'text-green-800',
        messageColor: 'text-green-700',
        progressColor: 'bg-green-500'
      },
      error: {
        icon: XCircleIcon,
        bgColor: 'bg-red-50',
        borderColor: 'border-red-200',
        iconColor: 'text-red-400',
        titleColor: 'text-red-800',
        messageColor: 'text-red-700',
        progressColor: 'bg-red-500'
      },
      warning: {
        icon: ExclamationTriangleIcon,
        bgColor: 'bg-yellow-50',
        borderColor: 'border-yellow-200',
        iconColor: 'text-yellow-400',
        titleColor: 'text-yellow-800',
        messageColor: 'text-yellow-700',
        progressColor: 'bg-yellow-500'
      },
      info: {
        icon: InformationCircleIcon,
        bgColor: 'bg-blue-50',
        borderColor: 'border-blue-200',
        iconColor: 'text-blue-400',
        titleColor: 'text-blue-800',
        messageColor: 'text-blue-700',
        progressColor: 'bg-blue-500'
      }
    };
    return configs[type] || configs.info;
  };

  const config = getTypeConfig();
  const IconComponent = config.icon;

  // Progress bar logic
  React.useEffect(() => {
    if (!autoClose || duration === Infinity) return;

    const startTime = Date.now();
    const updateInterval = 50;

    const updateProgress = () => {
      if (isPaused) return;

      const elapsed = Date.now() - startTime;
      const newProgress = Math.max(0, 100 - (elapsed / duration) * 100);

      setProgress(newProgress);

      if (newProgress <= 0) {
        onDismiss?.();
        return;
      }

      intervalRef.current = setTimeout(updateProgress, updateInterval);
    };

    intervalRef.current = setTimeout(updateProgress, updateInterval);

    return () => {
      const currentInterval = intervalRef.current;
      const currentTimeout = timeoutRef.current;
      
      if (currentInterval) {
        clearTimeout(currentInterval);
      }
      if (currentTimeout) {
        clearTimeout(currentTimeout);
      }
    };
  }, [autoClose, duration, isPaused, onDismiss]);

  // Position classes
  const getPositionClasses = () => {
    const positions = {
      'top-right': 'top-4 right-4',
      'top-left': 'top-4 left-4',
      'bottom-right': 'bottom-4 right-4',
      'bottom-left': 'bottom-4 left-4',
      'top-center': 'top-4 left-1/2 transform -translate-x-1/2',
      'bottom-center': 'bottom-4 left-1/2 transform -translate-x-1/2'
    };
    return positions[position] || positions['top-right'];
  };

  // Animation variants
  const toastVariants = {
    initial: {
      opacity: 0,
      scale: 0.8,
      y: position.includes('top') ? -50 : 50,
      x: position.includes('right') ? 50 : position.includes('left') ? -50 : 0
    },
    animate: {
      opacity: 1,
      scale: 1,
      y: 0,
      x: 0,
      transition: {
        type: "spring",
        stiffness: 500,
        damping: 30
      }
    },
    exit: {
      opacity: 0,
      scale: 0.8,
      x: position.includes('right') ? 100 : position.includes('left') ? -100 : 0,
      transition: {
        duration: 0.2
      }
    }
  };

  return (
    <motion.div
      className={`fixed ${getPositionClasses()} w-96 max-w-sm z-50`}
      variants={toastVariants}
      initial="initial"
      animate="animate"
      exit="exit"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
    >
      <div 
        className={`relative overflow-hidden rounded-lg ${config.bgColor} ${config.borderColor} border shadow-lg ring-1 ring-black ring-opacity-5`}
        role="alert"
        aria-live="assertive"
        aria-atomic="true"
      >
        {/* Progress bar */}
        {showProgress && autoClose && duration !== Infinity && (
          <div className="absolute top-0 left-0 h-1 bg-gray-200 w-full">
            <motion.div
              className={`h-full ${config.progressColor}`}
              style={{ width: `${progress}%` }}
              transition={{ duration: 0.1 }}
            />
          </div>
        )}

        <div className="p-4">
          <div className="flex items-start">
            <div className="flex-shrink-0">
              <IconComponent className={`h-6 w-6 ${config.iconColor}`} aria-hidden="true" />
            </div>
            
            <div className="ml-3 w-0 flex-1">
              {title && (
                <p className={`text-sm font-medium ${config.titleColor}`}>
                  {title}
                </p>
              )}
              
              {message && (
                <div className={`${title ? 'mt-1' : ''} text-sm ${config.messageColor}`}>
                  {typeof message === 'string' ? (
                    <p>{message}</p>
                  ) : (
                    message
                  )}
                </div>
              )}

              {/* Action buttons */}
              {actions && (
                <div className="mt-3 flex space-x-2">
                  {actions}
                </div>
              )}
            </div>

            {/* Close button */}
            <div className="ml-4 flex flex-shrink-0">
              <button
                type="button"
                className={`inline-flex rounded-md ${config.bgColor} ${config.titleColor} hover:${config.messageColor} focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-${config.bgColor.split('-')[1]}-50 focus:ring-${config.iconColor.split('-')[1]}-600`}
                onClick={onDismiss}
                aria-label="Đóng thông báo"
              >
                <XMarkIcon className="h-5 w-5" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

// Toast container for managing multiple toasts
export const ToastContainer = ({ toasts, removeToast }) => {
  return (
    <div className="fixed inset-0 pointer-events-none">
      {toasts.map((toast) => (
        <ToastNotification
          key={toast.id}
          {...toast}
          onDismiss={() => removeToast(toast.id)}
        />
      ))}
    </div>
  );
};

// Hook for managing toasts
export const useToast = () => {
  const [toasts, setToasts] = React.useState([]);

  const addToast = React.useCallback((toastData) => {
    const id = Date.now() + Math.random();
    const toast = {
      id,
      ...toastData,
      timestamp: Date.now()
    };

    setToasts(prev => {
      // Limit to 5 toasts
      const newToasts = [...prev, toast];
      return newToasts.slice(-5);
    });

    return id;
  }, []);

  const removeToast = React.useCallback((id) => {
    setToasts(prev => prev.filter(toast => toast.id !== id));
  }, []);

  const clearAllToasts = React.useCallback(() => {
    setToasts([]);
  }, []);

  // Convenience methods
  const success = React.useCallback((title, message, options = {}) => {
    return addToast({ type: 'success', title, message, ...options });
  }, [addToast]);

  const error = React.useCallback((title, message, options = {}) => {
    return addToast({ type: 'error', title, message, ...options });
  }, [addToast]);

  const warning = React.useCallback((title, message, options = {}) => {
    return addToast({ type: 'warning', title, message, ...options });
  }, [addToast]);

  const info = React.useCallback((title, message, options = {}) => {
    return addToast({ type: 'info', title, message, ...options });
  }, [addToast]);

  return {
    toasts,
    addToast,
    removeToast,
    clearAllToasts,
    success,
    error,
    warning,
    info
  };
};

export default ToastNotification;
