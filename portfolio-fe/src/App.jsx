import { BrowserRouter, Routes, Route } from "react-router-dom";
import { publicRoutes, privateRoutes } from "./router";
import NotFound from "pages/NotFound";
import ScrollToTop from "router/ScrollToHash";
import { NotificationContextProvider, PageTransition } from "components";
import { useEffect } from "react";

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
                <Layout>
                  <PageTransition>
                    <Component />
                  </PageTransition>
                </Layout>
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