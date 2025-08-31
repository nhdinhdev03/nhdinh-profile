import { BrowserRouter, Routes, Route } from "react-router-dom";
import { publicRoutes, privateRoutes } from "./router";
import ScrollToHash from "./router/ScrollToHash";
import PageTransition from "./components/PageTransition/PageTransition";
import { ThemeProvider } from "./contexts/ThemeContext";
import { AnimatePresence } from "framer-motion";
import { useEffect } from 'react';
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

  return (
    <ThemeProvider>
      <BrowserRouter>
        <ScrollToHash />
        <Routes>
          {publicRoutes.map(
            ({ path, component: Component, layout: Layout }) => (
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
            )
          )}

          {privateRoutes.map(
            ({ path, component: Component, layout: Layout }) => (
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
            )
          )}
        </Routes>
      </BrowserRouter>
    </ThemeProvider>
  );
}

export default App;
