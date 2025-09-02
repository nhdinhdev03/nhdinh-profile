import { BrowserRouter, Routes, Route } from "react-router-dom";
import { publicRoutes, privateRoutes } from "./router";
import ScrollToHash from "./router/ScrollToHash";
import { PageTransition, SmartLoader, PerformanceMonitor } from "./components";
import { ThemeProvider } from "./contexts/ThemeContext";
import { AnimatePresence } from "framer-motion";
import { Suspense, useEffect, useMemo, startTransition } from 'react';
import AOS from 'aos';
import 'aos/dist/aos.css';

// Enhanced loading component
const LoadingFallback = () => (
  <SmartLoader 
    progress={75} 
    status="Loading Experience..." 
    showProgress={true}
    showStats={true}
  />
);

function App() {
  useEffect(() => {
    startTransition(() => {
      AOS.init({
        duration: 800,
        easing: 'ease-out-cubic',
        once: true,
        mirror: false,
        offset: 100,
        anchorPlacement: 'top-bottom',
        disable: 'mobile' // Disable on mobile for better performance
      });
    });
  }, []);

  const routeElements = useMemo(() => (
    [...publicRoutes, ...privateRoutes].map(({ path, component: Component, layout: Layout }) => {
      const content = (
        <PageTransition>
          <Component />
        </PageTransition>
      );
      return (
        <Route
          key={path}
          path={path}
          element={Layout ? <Layout>{content}</Layout> : content}
        />
      );
    })
  ), []); // routes are static definitions

  return (
    <ThemeProvider>
      <BrowserRouter>
        <ScrollToHash />
        <Suspense fallback={<LoadingFallback />}>
          <AnimatePresence mode="wait" initial={false}>
            <Routes>
              {routeElements}
            </Routes>
          </AnimatePresence>
        </Suspense>
        <PerformanceMonitor />
      </BrowserRouter>
    </ThemeProvider>
  );
}

export default App;
