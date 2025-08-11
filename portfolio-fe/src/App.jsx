// App.jsx
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Fragment } from "react";
import { publicRoutes, privateRoutes } from "./router"; // file chứa mảng routes
import NotFound from "./pages/NotFound";

// (Tuỳ chọn) Guard cho private routes
function RequireAuth({ children }) {
  const isAuthed = false; // TODO: thay bằng state thật
  return isAuthed ? children : <div>Vui lòng đăng nhập</div>;
}

export default function App() {
  const renderRoute = ({ path, component: Component, layout: Layout }, key, isPrivate = false) => {
    const Element = (
      <Layout>
        <Component />
      </Layout>
    );
    return (
      <Route
        key={key}
        path={path}
        element={isPrivate ? <RequireAuth>{Element}</RequireAuth> : Element}
      />
    );
  };

  return (
    <BrowserRouter>
      <Routes>
        {publicRoutes.map((r, i) => renderRoute(r, i, false))}
        {privateRoutes.map((r, i) => renderRoute(r, i, true))}
        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  );
}
