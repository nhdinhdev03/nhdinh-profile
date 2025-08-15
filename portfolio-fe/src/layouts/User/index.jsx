import React from "react";
import { useLocation } from "react-router-dom";
import Header from "./Header";
import Breadcrumb from "./Breadcrumb";
import Footer from "./Footer";
import { ROUTES } from "router/routeConstants";
import "./UserLayout.scss";

function UserLayout({ children }) {
  const location = useLocation();
  const isHomePage = location.pathname === ROUTES.HOME || location.pathname === "/";

  return (
    <div className="layout">
      <Header />

      <main id="main" className={`page-container ${isHomePage ? "home-container" : ""}`}>
        {!isHomePage && (
          <div className="px-4 sm:px-6 lg:px-8 py-2 max-w-[1280px] mx-auto w-full">
            <Breadcrumb />
          </div>
        )}
        {children}
      </main>
      <Footer />
    </div>
  );
}
export default UserLayout;
  