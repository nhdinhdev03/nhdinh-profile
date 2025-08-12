import { BrowserRouter, Routes, Route } from "react-router-dom";
import { publicRoutes, privateRoutes } from "./router";
import NotFound from "pages/NotFound";
import ScrollToTop from "router/ScrollToHash";

export default function App() {
  return (
    <BrowserRouter>
      <ScrollToTop />
      <Routes>
        {publicRoutes.map(({ path, component: Component, layout: Layout }) => (
          <Route
            key={path}
            path={path}
            element={
              <Layout>
                <Component />
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
                <Component />
              </Layout>
            }
          />
        ))}

        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  );
}
