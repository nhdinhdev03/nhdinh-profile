import { useTheme } from "hooks/useTheme";

import { memo, Suspense } from "react";
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

const App = memo(() => {
  // Không cần truyền initialTheme vì useTheme đã tự động đọc từ document/localStorage
  const [theme, toggleTheme] = useTheme();

  return (
    <Router>
      <ScrollToTopOnNavigate />
      <ScrollToTop />
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

            {/* Admin 404 - Must be last */}
            <Route path="*" element={<AdminNotFound />} />
          </Route>

          {/* Public 404 - Must be last */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </Suspense>
    </Router>
  );
});

App.displayName = "App";

export default App;
