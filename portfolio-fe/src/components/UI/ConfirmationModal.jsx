import React, { useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  ExclamationTriangleIcon, 
  XMarkIcon,
  InformationCircleIcon,
  CheckCircleIcon,
  ExclamationCircleIcon
} from '@heroicons/react/24/outline';

const ConfirmationModal = ({
  isOpen,
  onClose,
  onConfirm,
  title,
  message,
  confirmText = "Xác nhận",
  cancelText = "Hủy",
  type = "danger", // danger, warning, info, success
  loading = false,
  children
}) => {
  const modalRef = useRef(null);
  const firstButtonRef = useRef(null);

  // Handle keyboard events
  useEffect(() => {
    const handleKeyDown = (event) => {
      if (event.key === 'Escape') {
        onClose();
      }
      if (event.key === 'Enter' && !loading) {
        onConfirm();
      }
    };

    if (isOpen) {
      document.addEventListener('keydown', handleKeyDown);
      document.body.style.overflow = 'hidden';
      
      // Focus first button when modal opens
      setTimeout(() => {
        firstButtonRef.current?.focus();
      }, 100);
    }

    return () => {
      document.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = 'unset';
    };
  }, [isOpen, onClose, onConfirm, loading]);

  // Handle click outside to close
  const handleBackdropClick = (event) => {
    if (modalRef.current && !modalRef.current.contains(event.target)) {
      onClose();
    }
  };

  // Get icon and colors based on type
  const getTypeConfig = () => {
    const configs = {
      danger: {
        icon: ExclamationTriangleIcon,
        iconBg: 'bg-red-100',
        iconColor: 'text-red-600',
        confirmBg: 'bg-red-600 hover:bg-red-700 focus:ring-red-500',
        confirmBgDisabled: 'bg-red-400'
      },
      warning: {
        icon: ExclamationCircleIcon,
        iconBg: 'bg-yellow-100',
        iconColor: 'text-yellow-600',
        confirmBg: 'bg-yellow-600 hover:bg-yellow-700 focus:ring-yellow-500',
        confirmBgDisabled: 'bg-yellow-400'
      },
      info: {
        icon: InformationCircleIcon,
        iconBg: 'bg-blue-100',
        iconColor: 'text-blue-600',
        confirmBg: 'bg-blue-600 hover:bg-blue-700 focus:ring-blue-500',
        confirmBgDisabled: 'bg-blue-400'
      },
      success: {
        icon: CheckCircleIcon,
        iconBg: 'bg-green-100',
        iconColor: 'text-green-600',
        confirmBg: 'bg-green-600 hover:bg-green-700 focus:ring-green-500',
        confirmBgDisabled: 'bg-green-400'
      }
    };
    return configs[type] || configs.danger;
  };

  const config = getTypeConfig();
  const IconComponent = config.icon;

  const backdropVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1 }
  };

  const modalVariants = {
    hidden: {
      opacity: 0,
      scale: 0.95,
      y: -20
    },
    visible: {
      opacity: 1,
      scale: 1,
      y: 0,
      transition: {
        type: "spring",
        stiffness: 300,
        damping: 30
      }
    },
    exit: {
      opacity: 0,
      scale: 0.95,
      y: -20,
      transition: {
        duration: 0.2
      }
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className="fixed inset-0 z-50 overflow-y-auto"
          variants={backdropVariants}
          initial="hidden"
          animate="visible"
          exit="hidden"
          onClick={handleBackdropClick}
        >
          {/* Backdrop */}
          <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
            <motion.div
              className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            />

            {/* Modal panel */}
            <motion.div
              ref={modalRef}
              className="relative transform overflow-hidden rounded-lg bg-white px-4 pb-4 pt-5 text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg sm:p-6"
              variants={modalVariants}
              initial="hidden"
              animate="visible"
              exit="exit"
              role="dialog"
              aria-modal="true"
              aria-labelledby="modal-title"
              aria-describedby="modal-description"
            >
              {/* Close button */}
              <div className="absolute right-0 top-0 hidden pr-4 pt-4 sm:block">
                <button
                  type="button"
                  className="rounded-md bg-white text-gray-400 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                  onClick={onClose}
                  aria-label="Đóng"
                >
                  <XMarkIcon className="h-6 w-6" />
                </button>
              </div>

              <div className="sm:flex sm:items-start">
                {/* Icon */}
                <div className={`mx-auto flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-full ${config.iconBg} sm:mx-0 sm:h-10 sm:w-10`}>
                  <IconComponent className={`h-6 w-6 ${config.iconColor}`} aria-hidden="true" />
                </div>

                {/* Content */}
                <div className="mt-3 text-center sm:ml-4 sm:mt-0 sm:text-left flex-1">
                  <h3 
                    className="text-base font-semibold leading-6 text-gray-900" 
                    id="modal-title"
                  >
                    {title}
                  </h3>
                  
                  <div className="mt-2" id="modal-description">
                    {typeof message === 'string' ? (
                      <p className="text-sm text-gray-500">{message}</p>
                    ) : (
                      message
                    )}
                    {children}
                  </div>
                </div>
              </div>

              {/* Actions */}
              <div className="mt-5 sm:mt-4 sm:flex sm:flex-row-reverse gap-3">
                <button
                  type="button"
                  onClick={onConfirm}
                  disabled={loading}
                  ref={firstButtonRef}
                  className={`inline-flex w-full justify-center rounded-md px-3 py-2 text-sm font-semibold text-white shadow-sm focus:outline-none focus:ring-2 focus:ring-offset-2 sm:w-auto transition-all duration-200 ${
                    loading 
                      ? config.confirmBgDisabled + ' cursor-not-allowed'
                      : config.confirmBg
                  }`}
                >
                  {loading && (
                    <motion.div
                      className="mr-2 h-4 w-4 border-2 border-white border-t-transparent rounded-full"
                      animate={{ rotate: 360 }}
                      transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                    />
                  )}
                  {loading ? 'Đang xử lý...' : confirmText}
                </button>
                
                <button
                  type="button"
                  onClick={onClose}
                  disabled={loading}
                  className="mt-3 inline-flex w-full justify-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 sm:mt-0 sm:w-auto transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {cancelText}
                </button>
              </div>
            </motion.div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

// Specialized delete confirmation modal
export const DeleteConfirmationModal = ({
  isOpen,
  onClose,
  onConfirm,
  itemName,
  itemType = "item",
  loading = false,
  additionalInfo = null,
  canRestore = true
}) => {
  return (
    <ConfirmationModal
      isOpen={isOpen}
      onClose={onClose}
      onConfirm={onConfirm}
      type="danger"
      title={`Xóa ${itemType}`}
      confirmText="Xóa"
      cancelText="Hủy"
      loading={loading}
      message={
        <div className="space-y-2">
          <p className="text-sm text-gray-500">
            Bạn có chắc chắn muốn xóa {itemType.toLowerCase()}{" "}
            <span className="font-semibold text-gray-900">"{itemName}"</span>?
          </p>
          {canRestore ? (
            <p className="text-xs text-gray-400">
              💡 Thao tác này có thể được hoàn tác sau.
            </p>
          ) : (
            <p className="text-xs text-red-500 font-medium">
              ⚠️ Thao tác này không thể hoàn tác!
            </p>
          )}
          {additionalInfo && (
            <div className="mt-2 p-2 bg-gray-50 rounded text-xs text-gray-600">
              {additionalInfo}
            </div>
          )}
        </div>
      }
    />
  );
};

export default ConfirmationModal;
