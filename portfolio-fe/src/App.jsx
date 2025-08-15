import { BrowserRouter, Routes, Route } from "react-router-dom";
import { publicRoutes, privateRoutes } from "./router";
import NotFound from "pages/NotFound";
import ScrollToTop from "router/ScrollToHash";
import { NotificationContextProvider, PageTransition } from "components";
import { useEffect } from "react";

// Initialize theme before app renders to prevent flash of wrong theme
(function initializeTheme() {
  try {
    const storedTheme = localStorage.getItem('userTheme');
    const root = document.documentElement;
    
    if (storedTheme === 'dark') {
      root.classList.add('dark');
      root.style.colorScheme = 'dark';
    } else {
      // Default to light mode if no preference or 'light' is stored
      localStorage.setItem('userTheme', 'light');
      root.classList.remove('dark');
      root.style.colorScheme = 'light';
    }
  } catch (e) {
    // Ignore errors (private browsing etc)
  }
})();

// Resource Prefetcher component to preload critical resources
const ResourcePrefetcher = () => {
  useEffect(() => {
    // Preload critical images
    const preloadLinks = [
      "/static/media/Logo.266ee6b125e665314f27.png",
 
    ];

    preloadLinks.forEach(url => {
      const link = document.createElement('link');
      link.rel = 'prefetch';
      link.href = url;
      document.head.appendChild(link);
    });
  }, []);

  return null;
};

function App() {
  return (
    <NotificationContextProvider>
      <BrowserRouter>
        <ResourcePrefetcher />
        <ScrollToTop />
        <Routes>
          {publicRoutes.map(({ path, component: Component, layout: Layout }) => (
            <Route
              key={path}
              path={path}
              element={
                <Layout>
                  <PageTransition>
                    <Component />
                  </PageTransition>
                </Layout>
              }
            />
          ))}

          {privateRoutes.map(({ path, component: Component, layout: Layout }) => (
            <Route
              key={path}
              path={path}
              element={
                Layout ? (
                  <Layout>
                    <PageTransition>
                      <Component />
                    </PageTransition>
                  </Layout>
                ) : (
                  <PageTransition>
                    <Component />
                  </PageTransition>
                )
              }
            />
          ))}

          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </NotificationContextProvider>
  );
}
export default App;