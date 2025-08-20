import React, { useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { XMarkIcon } from '@heroicons/react/24/outline';

const InlineConfirmation = ({
  isOpen,
  onClose,
  onConfirm,
  message,
  confirmText = "Xác nhận",
  cancelText = "Hủy",
  loading = false,
  triggerRef = null // ref của element trigger để position relative
}) => {
  const confirmRef = useRef(null);

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
    }

    return () => {
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [isOpen, onClose, onConfirm, loading]);

  // Click outside to close
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (confirmRef.current && !confirmRef.current.contains(event.target)) {
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isOpen, onClose]);

  const confirmVariants = {
    hidden: {
      opacity: 0,
      scale: 0.95,
      y: -10
    },
    visible: {
      opacity: 1,
      scale: 1,
      y: 0,
      transition: {
        type: "spring",
        stiffness: 400,
        damping: 25
      }
    },
    exit: {
      opacity: 0,
      scale: 0.95,
      y: -10,
      transition: {
        duration: 0.15
      }
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          ref={confirmRef}
          variants={confirmVariants}
          initial="hidden"
          animate="visible"
          exit="exit"
          className="absolute top-full left-0 mt-1 z-[60] bg-white rounded-lg shadow-lg border border-gray-200 p-3 min-w-[280px]"
          style={{ 
            transform: 'translateX(-50%)',
            left: '50%'
          }}
        >
          {/* Header */}
          <div className="flex items-start justify-between mb-2">
            <div className="flex items-center">
              <div className="w-2 h-2 bg-orange-500 rounded-full mr-2"></div>
              <span className="text-xs font-medium text-gray-900">Xác nhận</span>
            </div>
            <button
              onClick={onClose}
              className="text-gray-400 hover:text-gray-500 transition-colors p-0.5"
            >
              <XMarkIcon className="w-3 h-3" />
            </button>
          </div>

          {/* Message */}
          <p className="text-xs text-gray-600 mb-3 leading-relaxed">
            {message}
          </p>

          {/* Actions */}
          <div className="flex items-center justify-end space-x-2">
            <button
              onClick={onClose}
              disabled={loading}
              className="px-2 py-1 text-xs font-medium text-gray-600 hover:text-gray-800 transition-colors disabled:opacity-50"
            >
              {cancelText}
            </button>
            <button
              onClick={onConfirm}
              disabled={loading}
              className="px-3 py-1 text-xs font-medium text-white bg-orange-500 hover:bg-orange-600 rounded-md transition-colors disabled:opacity-50 flex items-center min-w-[60px] justify-center"
            >
              {loading ? (
                <motion.div
                  className="w-3 h-3 border border-white border-t-transparent rounded-full"
                  animate={{ rotate: 360 }}
                  transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                />
              ) : (
                confirmText
              )}
            </button>
          </div>

          {/* Arrow pointer */}
          <div className="absolute -top-1 left-1/2 transform -translate-x-1/2">
            <div className="w-2 h-2 bg-white border-l border-t border-gray-200 transform rotate-45"></div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default InlineConfirmation;
