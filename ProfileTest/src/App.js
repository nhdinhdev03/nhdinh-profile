import { BrowserRouter, Routes, Route } from "react-router-dom";
import { publicRoutes, privateRoutes } from "./router";
import ScrollToHash from "./router/ScrollToHash";
import PageTransition from "./components/PageTransition/PageTransition";
import { ThemeProvider } from "./contexts/ThemeContext";
import AOS from 'aos';
import 'aos/dist/aos.css';
import { useEffect } from 'react';

function App() {
  useEffect(() => {
    AOS.init({
      duration: 800,
      easing: 'ease-in-out',
      once: true,
      offset: 100,
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
