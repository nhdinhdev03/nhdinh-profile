import { useTheme } from "hooks/useTheme";

import { memo, Suspense, useEffect, useRef, useState } from "react";
import {
  Navigate,
  Route,
  BrowserRouter as Router,
  Routes,
} from "react-router-dom";
import { privateRoutes, publicRoutes } from "router";

import LoadingFallback from "components/Loading/LoadingFallback";
import PageTransition from "components/PageTransition/PageTransition";
import ScrollToTop from "components/Scroll/ScrollToTop/ScrollToTop";
import ScrollToTopOnNavigate from "components/Scroll/ScrollToTopOnNavigate/ScrollToTopOnNavigate";

import "styles/App.scss";

import MainLayoutAdmin from "layouts/Admin/MainLayoutAdmin";
import MainLayout from "layouts/User/MainLayout";
import AdminNotFound from "pages/Admin/NotFound/AdminNotFound";
import NotFound from "pages/User/NotFound/NotFound";
import { ROUTES } from "router/routeConstants";
import "./i18n";

const NOTICE_STORAGE_KEY = "sampleDataNoticeDismissedAt";
const DISPLAY_INTERVAL_MS = 5 * 60 * 1000;

const App = memo(() => {
  // Không cần truyền initialTheme vì useTheme đã tự động đọc từ document/localStorage
  const [theme, toggleTheme] = useTheme();
  const [isNoticeVisible, setIsNoticeVisible] = useState(() => {
    if (typeof window === "undefined") {
      return true;
    }

    try {
      const storedValue = localStorage.getItem(NOTICE_STORAGE_KEY);
      if (!storedValue) {
        return true;
      }

      const lastDismissedAt = Number(storedValue);
      if (!Number.isFinite(lastDismissedAt)) {
        return true;
      }

      return Date.now() - lastDismissedAt >= DISPLAY_INTERVAL_MS;
    } catch (error) {
      console.warn("Failed to read notice state:", error);
      return true;
    }
  });
  const reDisplayTimerRef = useRef(null);

  useEffect(() => {
    if (!isNoticeVisible) {
      try {
        localStorage.setItem(NOTICE_STORAGE_KEY, Date.now().toString());
      } catch (error) {
        console.warn("Failed to persist notice state:", error);
      }
    }
  }, [isNoticeVisible]);

  useEffect(() => {
    if (typeof window === "undefined") {
      return undefined;
    }

    const clearExistingTimer = () => {
      if (reDisplayTimerRef.current) {
        window.clearTimeout(reDisplayTimerRef.current);
        reDisplayTimerRef.current = null;
      }
    };

    const scheduleReDisplay = () => {
      try {
        const storedValue = localStorage.getItem(NOTICE_STORAGE_KEY);
        const lastDismissedAt = Number(storedValue);
        const isValidTimestamp =
          Number.isFinite(lastDismissedAt) && lastDismissedAt > 0;
        const now = Date.now();

        if (!isValidTimestamp || now - lastDismissedAt >= DISPLAY_INTERVAL_MS) {
          clearExistingTimer();
          setIsNoticeVisible(true);
          return;
        }

        const timeUntilNextDisplay =
          DISPLAY_INTERVAL_MS - (now - lastDismissedAt);
        clearExistingTimer();
        reDisplayTimerRef.current = window.setTimeout(() => {
          setIsNoticeVisible(true);
        }, timeUntilNextDisplay);
      } catch (error) {
        console.warn("Failed to schedule notice visibility:", error);
        clearExistingTimer();
        setIsNoticeVisible(true);
      }
    };

    if (!isNoticeVisible) {
      scheduleReDisplay();
    } else {
      clearExistingTimer();
    }

    const handleStorage = (event) => {
      if (event.key === NOTICE_STORAGE_KEY) {
        scheduleReDisplay();
      }
    };

    window.addEventListener("storage", handleStorage);

    return () => {
      window.removeEventListener("storage", handleStorage);
      clearExistingTimer();
    };
  }, [isNoticeVisible]);

  return (
    <Router>
      <ScrollToTopOnNavigate />
      <ScrollToTop />
      {isNoticeVisible && (
        <div className="sample-data-banner" role="status" aria-live="polite">
          <div className="sample-data-banner__content">
            Backend đang trong quá trình xây dựng nên dữ liệu hiện tại chỉ mang
            tính minh họa.
          </div>
          <button
            type="button"
            className="sample-data-banner__dismiss"
            onClick={() => setIsNoticeVisible(false)}
          >
            Đã hiểu
          </button>
        </div>
      )}
      <Suspense fallback={<LoadingFallback theme={theme} />}>
        <Routes>
          {/* Public routes */}
          {publicRoutes.map((route, index) => {
            const Page = route.component;
            const LayoutComponent = route.layout ?? MainLayout; // fallback
            return (
              <Route
                key={index}
                path={route.path}
                element={
                  <LayoutComponent theme={theme} toggleTheme={toggleTheme}>
                    <PageTransition>
                      <Page />
                    </PageTransition>
                  </LayoutComponent>
                }
              />
            );
          })}

          {/* Admin routes */}
          <Route path="/admin" element={<MainLayoutAdmin />}>
            {/* Redirect /admin to /admin/dashboard */}
            <Route
              index
              element={<Navigate to={ROUTES.ADMIN_DASHBOARD} replace />}
            />

            {privateRoutes.map((route, index) => {
              const Page = route.component;
              return (
                <Route
                  key={index}
                  path={route.path.replace("/admin/", "")}
                  element={
                    <PageTransition>
                      <Page />
                    </PageTransition>
                  }
                />
              );
            })}
          </Route>

          {/* Admin 404 - Fullscreen (outside layout) */}
          <Route path="/admin/*" element={<AdminNotFound />} />

          {/* Public 404 - Must be last */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </Suspense>
    </Router>
  );
});

App.displayName = "App";

export default App;
