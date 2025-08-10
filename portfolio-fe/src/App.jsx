import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Fragment } from "react";
import { privateRoutes, publicRoutes } from "router"; // hoặc "./routes"
import PrivateRoute from "components/User/PrivateRoute";

export default function App() {
  const renderRoute = ({ path, component: Component, layout: Layout }, key, isPrivate = false) => {
    if (!Component) {
      throw new Error(`Component is undefined at path "${path}". Check your exports.`);
    }
    const Wrapper = Layout || Fragment;
    const element = (
      <Wrapper>
        <Component />
      </Wrapper>
    );
    return (
      <Route
        key={`${isPrivate ? "private" : "public"}-${key}-${path}`}
        path={path}
        element={isPrivate ? <PrivateRoute>{element}</PrivateRoute> : element}
      />
    );
  };

  return (
    <BrowserRouter>
      <Routes>
        {publicRoutes.map((r, i) => renderRoute(r, i, false))}
        {privateRoutes.map((r, i) => renderRoute(r, i, true))}
      </Routes>
    </BrowserRouter>
  );
}
