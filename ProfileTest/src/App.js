import { BrowserRouter, Routes, Route } from "react-router-dom";
import { publicRoutes, privateRoutes } from "./router";
import ScrollToHash from "./router/ScrollToHash";
import PageTransition from "./components/PageTransition/PageTransition";
import { ThemeProvider } from "./contexts/ThemeContext";
import { AnimatePresence } from "framer-motion";
import { Suspense, useEffect, useMemo } from 'react';
import AOS from 'aos';
import 'aos/dist/aos.css';

function App() {
  useEffect(() => {
    AOS.init({
      duration: 1000,
      easing: 'ease-out-cubic',
      once: false,
      mirror: true,
      offset: 50,
      anchorPlacement: 'top-bottom'
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
        <Suspense fallback={
          <div className="w-full h-screen flex items-center justify-center bg-black text-cyan-400">
            <div className="animate-pulse tracking-widest font-semibold">Loading...</div>
          </div>
        }>
          <AnimatePresence mode="wait" initial={false}>
            <Routes>
              {routeElements}
            </Routes>
          </AnimatePresence>
        </Suspense>
      </BrowserRouter>
    </ThemeProvider>
  );
}

export default App;
