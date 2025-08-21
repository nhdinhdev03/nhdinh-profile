/* eslint-disable react/prop-types */
import React, { useEffect, useRef, useLayoutEffect, useState, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { XMarkIcon } from '@heroicons/react/24/outline';
import { createPortal } from 'react-dom';
import PropTypes from 'prop-types';

/**
 * @typedef {Object} InlineConfirmationProps
 * @property {boolean} isOpen
 * @property {() => void} onClose
 * @property {() => void} onConfirm
 * @property {string|React.ReactNode} message
 * @property {string} [confirmText]
 * @property {string} [cancelText]
 * @property {boolean} [loading]
 * @property {React.RefObject=} triggerRef
 * @property {HTMLElement=} anchorEl
 * @property {('top'|'bottom')} [placement]
 * @property {number} [offset]
 * @property {number} [boundaryPadding]
 * @property {boolean} [usePortal]
 */

/** @param {InlineConfirmationProps} props */
const InlineConfirmation = ({
  isOpen,
  onClose,
  onConfirm,
  message,
  confirmText = 'Xác nhận',
  cancelText = 'Hủy',
  loading = false,
  triggerRef = null,
  anchorEl = null,
  placement = 'bottom',
  offset = 8,
  boundaryPadding = 8,
  usePortal = true
}) => {
  const confirmRef = useRef(null);
  const [coords, setCoords] = useState({ top: 0, left: 0, origin: 'top' });
  const [strategy, setStrategy] = useState('absolute');

  // Tính toán vị trí động để tránh tràn màn hình
    const computePosition = useCallback((el, dialog) => {
      const rect = el.getBoundingClientRect();
      const dialogRect = dialog?.getBoundingClientRect();
      const vw = window.innerWidth;
      const vh = window.innerHeight;
      const desiredPlacement = placement;
      let actualPlacement = desiredPlacement;
      const spaceBelow = vh - rect.bottom;
      const spaceAbove = rect.top;
      let needFlip = false;
      if (dialogRect) {
        if (desiredPlacement === 'bottom') {
          needFlip = dialogRect.height + offset + boundaryPadding > spaceBelow && spaceAbove > spaceBelow;
        } else {
          needFlip = dialogRect.height + offset + boundaryPadding > spaceAbove && spaceBelow > spaceAbove;
        }
      }
      if (needFlip) actualPlacement = desiredPlacement === 'bottom' ? 'top' : 'bottom';
      let top = rect.bottom + offset;
      if (actualPlacement === 'top') {
        top = rect.top - (dialogRect?.height || 0) - offset;
      }
      let left = rect.left + rect.width / 2 - (dialogRect?.width || 0) / 2;
      if (left < boundaryPadding) left = boundaryPadding;
      if (dialogRect && left + dialogRect.width + boundaryPadding > vw) {
        left = vw - dialogRect.width - boundaryPadding;
      }
      return { top: Math.max(boundaryPadding, top), left, origin: actualPlacement };
    }, [placement, offset, boundaryPadding]);

  useLayoutEffect(() => {
    if (!isOpen) return;
    const el = anchorEl || triggerRef?.current;
    if (!el) return;
    const dialog = confirmRef.current;
    if (dialog) {
      dialog.style.visibility = 'hidden';
      dialog.style.transform = 'none';
    }
    requestAnimationFrame(() => {
      const c = computePosition(el, dialog);
      setCoords(c);
      setStrategy('fixed');
      if (dialog) dialog.style.visibility = '';
    });
  }, [isOpen, anchorEl, triggerRef, placement, offset, boundaryPadding, computePosition]);
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

  const content = (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          ref={confirmRef}
          variants={confirmVariants}
          initial="hidden"
          animate="visible"
          exit="exit"
          className={`z-[200] bg-white rounded-lg shadow-lg border border-gray-200 p-3 min-w-[280px] ${!anchorEl && 'absolute top-full left-1/2 mt-1'} `}
          style={anchorEl ? { position: strategy, top: coords.top, left: coords.left } : { transform: 'translateX(-50%)' }}
        >
          {/* Arrow pointer */}
          {!anchorEl && (
            <div className="absolute -top-1 left-1/2 transform -translate-x-1/2">
              <div className="w-2 h-2 bg-white border-l border-t border-gray-200 transform rotate-45"></div>
            </div>
          )}
          {anchorEl && (
            <div
              className={`absolute left-1/2 -translate-x-1/2 ${coords.origin === 'top' ? 'bottom-0 -mb-1' : 'top-0 -mt-1'}`}
            >
              <div className={`w-2 h-2 bg-white border-gray-200 transform rotate-45 ${coords.origin === 'top' ? 'border-b border-r' : 'border-t border-l'}`}></div>
            </div>
          )}
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
          <p className="text-xs text-gray-600 mb-3 leading-relaxed">{message}</p>
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
        </motion.div>
      )}
    </AnimatePresence>
  );

  if (anchorEl && usePortal) {
    return createPortal(content, document.body);
  }
  return content;
};

InlineConfirmation.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  onConfirm: PropTypes.func.isRequired,
  message: PropTypes.oneOfType([PropTypes.string, PropTypes.node]).isRequired,
  confirmText: PropTypes.string,
  cancelText: PropTypes.string,
  loading: PropTypes.bool,
  triggerRef: PropTypes.object,
  anchorEl: PropTypes.instanceOf(Element),
  placement: PropTypes.oneOf(['top', 'bottom']),
  offset: PropTypes.number,
  boundaryPadding: PropTypes.number,
  usePortal: PropTypes.bool
};

export default InlineConfirmation;
