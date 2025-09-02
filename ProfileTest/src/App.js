import React, { useMemo, useEffect } from "react";
import { Routes, Route } from "react-router-dom";
import { AnimatePresence } from "framer-motion";
import AOS from "aos";
import "aos/dist/aos.css";

import { publicRoutes, privateRoutes } from "./router";
import ScrollToHash from "./router/ScrollToHash";

function App() {
  // Initialize AOS animation library
  useEffect(() => {
    AOS.init({
      duration: 800,
      once: true,
      easing: "ease-out-cubic",
    });
  }, []);

  // Memoize route elements for performance
  const routeElements = useMemo(
    () =>
      [...publicRoutes, ...privateRoutes].map(
        ({ path, component: Component, layout: Layout }) => (
          <Route
            key={path}
            path={path}
            element={
              Layout ? (
                <Layout>
                  <Component />
                </Layout>
              ) : (
                <Component />
              )
            }
          />
        )
      ),
    []
  );

  return (
    <>
      <ScrollToHash />
      <AnimatePresence mode="wait" initial={false}>
        <Routes>{routeElements}</Routes>
      </AnimatePresence>
    </>
  );
}

export default App;
