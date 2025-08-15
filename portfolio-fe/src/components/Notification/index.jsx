import React, { useState, createContext, useContext } from "react";
import { createPortal } from "react-dom";
import { motion, AnimatePresence } from "framer-motion";
import "./Notification.scss";

// Simple notification system
export const useNotification = () => {
  const [notifications, setNotifications] = useState([]);

  const show = (message, type = "info", duration = 3000) => {
    const id = Date.now();
    setNotifications((prev) => [...prev, { id, message, type }]);

    if (duration !== Infinity) {
      setTimeout(() => {
        dismiss(id);
      }, duration);
    }

    return id;
  };

  const dismiss = (id) => {
    setNotifications((prev) =>
      prev.filter((notification) => notification.id !== id)
    );
  };

  return {
    notifications,
    show,
    dismiss,
    info: (message, duration) => show(message, "info", duration),
    success: (message, duration) => show(message, "success", duration),
    warning: (message, duration) => show(message, "warning", duration),
    error: (message, duration) => show(message, "error", duration),
    development: (message, duration) => show(message, "development", duration),
  };
};

export const NotificationProvider = ({ children }) => {
  const { notifications, dismiss } = useNotification();

  const notificationContainer = document.getElementById(
    "notification-container"
  );

  if (!notificationContainer) {
    const container = document.createElement("div");
    container.id = "notification-container";
    document.body.appendChild(container);
  }

  return (
    <>
      {children}
      {createPortal(
        <div className="notification-wrapper">
          <AnimatePresence>
            {notifications.map((notification) => (
              <Notification
                key={notification.id}
                {...notification}
                onDismiss={() => dismiss(notification.id)}
              />
            ))}
          </AnimatePresence>
        </div>,
        document.getElementById("notification-container") || document.body
      )}
    </>
  );
};

export const Notification = ({ id, message, type, onDismiss }) => {
  return (
    <motion.div
      className={`notification notification--${type}`}
      initial={{ opacity: 0, y: -20, scale: 0.9 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0, scale: 0.9, transition: { duration: 0.2 } }}
      transition={{ type: "spring", stiffness: 300, damping: 25 }}
    >
      <div className="notification__icon">
        {type === "success" && (
          <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
            <path
              d="M10 0a10 10 0 100 20 10 10 0 000-20zm5.2 7.4l-6.4 6.4c-.2.2-.4.2-.6 0L5.4 11c-.2-.2-.2-.4 0-.6l.6-.6c.2-.2.4-.2.6 0l1.8 1.8 5.4-5.4c.2-.2.4-.2.6 0l.6.6c.2.1.2.4 0 .6z"
              fill="currentColor"
            />
          </svg>
        )}
        {type === "info" && (
          <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
            <path
              d="M10 0a10 10 0 100 20 10 10 0 000-20zm1 15H9V9h2v6zm0-8H9V5h2v2z"
              fill="currentColor"
            />
          </svg>
        )}
        {type === "warning" && (
          <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
            <path
              d="M10 0a10 10 0 100 20 10 10 0 000-20zm1 15H9v-2h2v2zm0-4H9V5h2v6z"
              fill="currentColor"
            />
          </svg>
        )}
        {type === "error" && (
          <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
            <path
              d="M10 0a10 10 0 100 20 10 10 0 000-20zm1 15H9v-2h2v2zm0-4H9V5h2v6z"
              fill="currentColor"
            />
          </svg>
        )}
        {type === "development" && (
          <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
            <path
              d="M17 6.78a8.12 8.12 0 01.92 11.65A8.28 8.28 0 016.78 19a8.17 8.17 0 01-5.54-8.72A8.29 8.29 0 017.32 3a8.12 8.12 0 019.68 3.78zM10 6V4m0 8V8m-4.95 7.5l1.41-1.41m7.07 0l1.41 1.41m0-12.72l-1.41 1.41M7.05 4.2L5.64 2.8M4 10H2m16 0h-2"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        )}
      </div>
      <div className="notification__content">
        <div className="notification__message">{message}</div>
      </div>
      <button
        className="notification__close"
        onClick={onDismiss}
        aria-label="Đóng thông báo"
      >
        <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
          <path
            d="M13 1L1 13M1 1l12 12"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </button>
      <div className="notification__progress"></div>
    </motion.div>
  );
};

// Context for notifications
const NotificationContext = createContext(null);

export const NotificationContextProvider = ({ children }) => {
  const notificationUtils = useNotification();

  return (
    <NotificationContext.Provider value={notificationUtils}>
      <div className="notification-wrapper">
        <AnimatePresence>
          {notificationUtils.notifications.map((notification) => (
            <Notification
              key={notification.id}
              {...notification}
              onDismiss={() => notificationUtils.dismiss(notification.id)}
            />
          ))}
        </AnimatePresence>
      </div>
      {children}
    </NotificationContext.Provider>
  );
};

export const useNotificationContext = () => {
  const context = useContext(NotificationContext);
  if (!context) {
    throw new Error(
      "useNotificationContext must be used within a NotificationContextProvider"
    );
  }
  return context;
};

// Standalone function for showing notifications without context
let notificationRoot = null;
let notificationId = 0;

export const showNotification = (message, type = "info", duration = 3000) => {
  if (!notificationRoot) {
    notificationRoot = document.createElement("div");
    notificationRoot.className = "notification-container";
    document.body.appendChild(notificationRoot);
  }

  const id = ++notificationId;
  const notificationElement = document.createElement("div");
  notificationElement.id = `notification-${id}`;
  notificationRoot.appendChild(notificationElement);

  const closeNotification = () => {
    const element = document.getElementById(`notification-${id}`);
    if (element) {
      element.classList.add("notification-exit");
      setTimeout(() => {
        if (element && element.parentNode) {
          element.parentNode.removeChild(element);
        }
      }, 300);
    }
  };

  // Create a basic notification without React
  notificationElement.innerHTML = `
    <div class="notification notification--${type} notification-enter">
      <div class="notification__content">
        <div class="notification__message">${message}</div>
      </div>
      <button class="notification__close" aria-label="Đóng thông báo">
        <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
          <path d="M13 1L1 13M1 1l12 12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </button>
      <div class="notification__progress"></div>
    </div>
  `;

  notificationElement
    .querySelector(".notification__close")
    .addEventListener("click", closeNotification);

  if (duration !== Infinity) {
    setTimeout(closeNotification, duration);
  }

  return {
    close: closeNotification,
  };
};

const NotificationModule = {
  useNotification,
  NotificationProvider,
  NotificationContextProvider,
  useNotificationContext,
  showNotification,
};

export default NotificationModule;
