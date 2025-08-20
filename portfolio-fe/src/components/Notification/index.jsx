import React, {
  useState,
  createContext,
  useContext,
  useCallback,
  useMemo,
  useRef,
} from "react";
import { createPortal } from "react-dom";
import { motion, AnimatePresence } from "framer-motion";
import "./Notification.scss";

// Enhanced notification system with better performance and UX
export const useNotification = () => {
  const [notifications, setNotifications] = useState([]);
  const timeoutsRef = useRef(new Map());

  const dismiss = useCallback((id) => {
    setNotifications((prev) =>
      prev.filter((notification) => notification.id !== id)
    );

    // Clear timeout if exists
    const timeoutId = timeoutsRef.current.get(id);
    if (timeoutId) {
      clearTimeout(timeoutId);
      timeoutsRef.current.delete(id);
    }
  }, []);

  const show = useCallback(
    (message, type = "info", duration = 4000, options = {}) => {
      const id = Date.now() + Math.random(); // Better unique ID
      const notification = {
        id,
        message,
        type,
        duration,
        timestamp: Date.now(),
        ...options,
      };

      setNotifications((prev) => {
        // Limit to max 5 notifications
        const newNotifications = [...prev, notification];
        return newNotifications.slice(-5);
      });

      if (duration !== Infinity && duration > 0) {
        const timeoutId = setTimeout(() => {
          dismiss(id);
        }, duration);
        timeoutsRef.current.set(id, timeoutId);
      }

      return id;
    },
    [dismiss]
  );

  const dismissAll = useCallback(() => {
    setNotifications([]);
    timeoutsRef.current.forEach((timeoutId) => clearTimeout(timeoutId));
    timeoutsRef.current.clear();
  }, []);

  const notificationMethods = useMemo(
    () => ({
      notifications,
      show,
      dismiss,
      dismissAll,
      info: (message, duration, options) =>
        show(message, "info", duration, options),
      success: (message, duration, options) =>
        show(message, "success", duration, options),
      warning: (message, duration, options) =>
        show(message, "warning", duration, options),
      error: (message, duration, options) =>
        show(message, "error", duration, options),
      development: (message, duration, options) =>
        show(message, "development", duration, options),
    }),
    [notifications, show, dismiss, dismissAll]
  );

  return notificationMethods;
};

// Add PropTypes for better development experience
export const NotificationProvider = ({ children }) => {
  const notificationUtils = useNotification();
  const containerRef = useRef(null);

  // Create portal container on mount
  const getPortalContainer = useCallback(() => {
    if (!containerRef.current) {
      let container = document.getElementById("notification-container");
      if (!container) {
        container = document.createElement("div");
        container.id = "notification-container";
        document.body.appendChild(container);
      }
      containerRef.current = container;
    }
    return containerRef.current;
  }, []);

  return (
    <>
      {children}
      {createPortal(
        <NotificationContainer
          notifications={notificationUtils.notifications}
          onDismiss={notificationUtils.dismiss}
        />,
        getPortalContainer()
      )}
    </>
  );
};

// Separate container component for better performance
const NotificationContainer = React.memo(({ notifications, onDismiss }) => {
  return (
    <div className="notification-wrapper">
      <AnimatePresence mode="popLayout">
        {notifications.map((notification) => (
          <Notification
            key={notification.id}
            {...notification}
            onDismiss={() => onDismiss(notification.id)}
          />
        ))}
      </AnimatePresence>
    </div>
  );
});

// Icon component for notifications
const NotificationIcon = React.memo(({ type }) => {
  const iconProps = {
    width: "20",
    height: "20",
    viewBox: "0 0 20 20",
    fill: "none",
    "aria-hidden": "true",
  };

  switch (type) {
    case "success":
      return (
        <svg {...iconProps}>
          <path
            d="M10 0a10 10 0 100 20 10 10 0 000-20zm5.2 7.4l-6.4 6.4c-.2.2-.4.2-.6 0L5.4 11c-.2-.2-.2-.4 0-.6l.6-.6c.2-.2.4-.2.6 0l1.8 1.8 5.4-5.4c.2-.2.4-.2.6 0l.6.6c.2.1.2.4 0 .6z"
            fill="currentColor"
          />
        </svg>
      );
    case "info":
      return (
        <svg {...iconProps}>
          <path
            d="M10 0a10 10 0 100 20 10 10 0 000-20zm1 15H9V9h2v6zm0-8H9V5h2v2z"
            fill="currentColor"
          />
        </svg>
      );
    case "warning":
      return (
        <svg {...iconProps}>
          <path
            d="M10 0a10 10 0 100 20 10 10 0 000-20zm1 15H9v-2h2v2zm0-4H9V5h2v6z"
            fill="currentColor"
          />
        </svg>
      );
    case "error":
      return (
        <svg {...iconProps}>
          <path
            d="M16.707 2.293a1 1 0 00-1.414 0L10 7.586 4.707 2.293a1 1 0 00-1.414 1.414L8.586 9l-5.293 5.293a1 1 0 101.414 1.414L10 10.414l5.293 5.293a1 1 0 001.414-1.414L11.414 9l5.293-5.293a1 1 0 000-1.414z"
            fill="currentColor"
          />
        </svg>
      );
    case "development":
      return (
        <svg {...iconProps}>
          <path
            d="M17 6.78a8.12 8.12 0 01.92 11.65A8.28 8.28 0 016.78 19a8.17 8.17 0 01-5.54-8.72A8.29 8.29 0 017.32 3a8.12 8.12 0 019.68 3.78zM10 6V4m0 8V8m-4.95 7.5l1.41-1.41m7.07 0l1.41 1.41m0-12.72l-1.41 1.41M7.05 4.2L5.64 2.8M4 10H2m16 0h-2"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      );
    default:
      return null;
  }
});

export const Notification = React.memo(
  ({ id, message, type, duration = 4000, onDismiss }) => {
    const [progress, setProgress] = useState(100);
    const [isPaused, setIsPaused] = useState(false);
    const intervalRef = useRef(null);

    // Enhanced animation variants
    const notificationVariants = {
      initial: {
        opacity: 0,
        y: -50,
        scale: 0.95,
        rotateX: -15,
      },
      animate: {
        opacity: 1,
        y: 0,
        scale: 1,
        rotateX: 0,
        transition: {
          type: "spring",
          stiffness: 400,
          damping: 25,
          mass: 0.8,
        },
      },
      exit: {
        opacity: 0,
        scale: 0.95,
        x: 300,
        transition: {
          duration: 0.3,
          ease: [0.4, 0, 0.2, 1],
        },
      },
    };

    // Progress bar animation
    const startProgress = useCallback(() => {
      if (duration === Infinity || duration <= 0) return;

      const startTime = Date.now();
      const updateInterval = 50; // Update every 50ms for smooth animation

      intervalRef.current = setInterval(() => {
        if (isPaused) return;

        const elapsed = Date.now() - startTime;
        const newProgress = Math.max(0, 100 - (elapsed / duration) * 100);

        setProgress(newProgress);

        if (newProgress <= 0) {
          clearInterval(intervalRef.current);
        }
      }, updateInterval);
    }, [duration, isPaused]);

    const pauseProgress = useCallback(() => {
      setIsPaused(true);
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    }, []);

    const resumeProgress = useCallback(() => {
      setIsPaused(false);
      startProgress();
    }, [startProgress]);

    // Start progress on mount
    React.useEffect(() => {
      startProgress();
      return () => {
        if (intervalRef.current) {
          clearInterval(intervalRef.current);
        }
      };
    }, [startProgress]);

    // Handle keyboard accessibility
    const handleKeyDown = useCallback(
      (e) => {
        if (e.key === "Escape" || e.key === "Enter" || e.key === " ") {
          e.preventDefault();
          onDismiss();
        }
      },
      [onDismiss]
    );

    return (
      <motion.div
        className={`notification notification--${type}`}
        variants={notificationVariants}
        initial="initial"
        animate="animate"
        exit="exit"
        layout
        onMouseEnter={pauseProgress}
        onMouseLeave={resumeProgress}
        onFocus={pauseProgress}
        onBlur={resumeProgress}
        onKeyDown={handleKeyDown}
        tabIndex={0}
        role="alert"
        aria-live="polite"
        aria-atomic="true"
      >
        <div className="notification__icon" aria-hidden="true">
          <NotificationIcon type={type} />
        </div>
        <div className="notification__content">
          <div className="notification__message">{message}</div>
        </div>
        <button
          className="notification__close"
          onClick={onDismiss}
          aria-label={`Đóng thông báo: ${message}`}
          type="button"
        >
          <svg
            width="14"
            height="14"
            viewBox="0 0 14 14"
            fill="none"
            aria-hidden="true"
          >
            <path
              d="M13 1L1 13M1 1l12 12"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </button>
        {duration !== Infinity && duration > 0 && (
          <div
            className="notification__progress"
            style={{ "--progress": `${progress}%` }}
            aria-hidden="true"
          />
        )}
      </motion.div>
    );
  }
);

// Context for notifications
const NotificationContext = createContext(null);

export const NotificationContextProvider = ({ children }) => {
  const notificationUtils = useNotification();

  return (
    <NotificationContext.Provider value={notificationUtils}>
      <NotificationContainer
        notifications={notificationUtils.notifications}
        onDismiss={notificationUtils.dismiss}
      />
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

// Enhanced standalone notification function
let notificationQueue = [];
let isProcessing = false;

export const showNotification = (
  message,
  type = "info",
  duration = 4000,
  options = {}
) => {
  return new Promise((resolve) => {
    const notification = {
      id: Date.now() + Math.random(),
      message,
      type,
      duration,
      options,
      resolve,
    };

    notificationQueue.push(notification);
    processNotificationQueue();
  });
};

const processNotificationQueue = () => {
  if (isProcessing || notificationQueue.length === 0) return;

  isProcessing = true;
  const notification = notificationQueue.shift();

  displayStandaloneNotification(notification);
};

const displayStandaloneNotification = (notification) => {
  let container = document.getElementById("notification-standalone-container");

  if (!container) {
    container = document.createElement("div");
    container.id = "notification-standalone-container";
    container.className = "notification-container";
    document.body.appendChild(container);
  }

  const notificationElement = document.createElement("div");
  notificationElement.id = `notification-${notification.id}`;
  notificationElement.className = "notification-wrapper";
  container.appendChild(notificationElement);

  const closeNotification = () => {
    const element = document.getElementById(`notification-${notification.id}`);
    if (element) {
      element.classList.add("notification-exit");
      setTimeout(() => {
        if (element?.parentNode) {
          element.parentNode.removeChild(element);
        }
        isProcessing = false;
        processNotificationQueue();
      }, 300);
    }
    notification.resolve();
  };

  // Enhanced HTML structure
  notificationElement.innerHTML = `
    <div class="notification notification--${
      notification.type
    } notification-enter" tabindex="0" role="alert" aria-live="polite">
      <div class="notification__icon" aria-hidden="true">
        ${getIconSVG(notification.type)}
      </div>
      <div class="notification__content">
        <div class="notification__message">${notification.message}</div>
      </div>
      <button class="notification__close" aria-label="Đóng thông báo: ${
        notification.message
      }" type="button">
        <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden="true">
          <path d="M13 1L1 13M1 1l12 12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </button>
      ${
        notification.duration !== Infinity && notification.duration > 0
          ? '<div class="notification__progress" style="--progress: 100%"></div>'
          : ""
      }
    </div>
  `;

  const notificationDiv = notificationElement.querySelector(".notification");
  const closeButton = notificationElement.querySelector(".notification__close");
  const progressBar = notificationElement.querySelector(
    ".notification__progress"
  );

  // Event listeners
  closeButton.addEventListener("click", closeNotification);

  // Keyboard support
  notificationDiv.addEventListener("keydown", (e) => {
    if (e.key === "Escape" || e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      closeNotification();
    }
  });

  // Progress animation
  if (
    progressBar &&
    notification.duration !== Infinity &&
    notification.duration > 0
  ) {
    let progress = 100;
    const interval = setInterval(() => {
      progress -= (100 / notification.duration) * 50; // Update every 50ms
      if (progress <= 0) {
        clearInterval(interval);
        closeNotification();
        return;
      }
      progressBar.style.setProperty("--progress", `${progress}%`);
    }, 50);

    // Pause on hover
    notificationDiv.addEventListener("mouseenter", () =>
      clearInterval(interval)
    );
  }

  if (notification.duration !== Infinity && notification.duration > 0) {
    setTimeout(closeNotification, notification.duration);
  }

  return {
    close: closeNotification,
  };
};

// Helper function to get icon SVG
const getIconSVG = (type) => {
  const icons = {
    success:
      '<svg width="20" height="20" viewBox="0 0 20 20" fill="none"><path d="M10 0a10 10 0 100 20 10 10 0 000-20zm5.2 7.4l-6.4 6.4c-.2.2-.4.2-.6 0L5.4 11c-.2-.2-.2-.4 0-.6l.6-.6c.2-.2.4-.2.6 0l1.8 1.8 5.4-5.4c.2-.2.4-.2.6 0l.6.6c.2.1.2.4 0 .6z" fill="currentColor"/></svg>',
    info: '<svg width="20" height="20" viewBox="0 0 20 20" fill="none"><path d="M10 0a10 10 0 100 20 10 10 0 000-20zm1 15H9V9h2v6zm0-8H9V5h2v2z" fill="currentColor"/></svg>',
    warning:
      '<svg width="20" height="20" viewBox="0 0 20 20" fill="none"><path d="M10 0a10 10 0 100 20 10 10 0 000-20zm1 15H9v-2h2v2zm0-4H9V5h2v6z" fill="currentColor"/></svg>',
    error:
      '<svg width="20" height="20" viewBox="0 0 20 20" fill="none"><path d="M10 0a10 10 0 100 20 10 10 0 000-20zm1 15H9v-2h2v2zm0-4H9V5h2v6z" fill="currentColor"/></svg>',
    development:
      '<svg width="20" height="20" viewBox="0 0 20 20" fill="none"><path d="M17 6.78a8.12 8.12 0 01.92 11.65A8.28 8.28 0 016.78 19a8.17 8.17 0 01-5.54-8.72A8.29 8.29 0 017.32 3a8.12 8.12 0 019.68 3.78zM10 6V4m0 8V8m-4.95 7.5l1.41-1.41m7.07 0l1.41 1.41m0-12.72l-1.41 1.41M7.05 4.2L5.64 2.8M4 10H2m16 0h-2" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>',
  };
  return icons[type] || icons.info;
};

// Enhanced notification module with comprehensive features
const NotificationModule = {
  // Hooks
  useNotification,
  useNotificationContext,

  // Components
  NotificationProvider,
  NotificationContextProvider,
  Notification,
  NotificationContainer,
  NotificationIcon,

  // Standalone functions
  showNotification,

  // Utilities
  processNotificationQueue,
  displayStandaloneNotification,
  getIconSVG,
};

export default NotificationModule;
