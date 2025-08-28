import React from "react";
import { useLocation } from "react-router-dom";
import { UserThemeProvider } from "../../theme";
import QuantumHeader from "./Header/QuantumHeader";
import Breadcrumb from "./Breadcrumb";
import Footer from "./Footer";
import QuantumCursor from "../../components/UI/QuantumCursor";
import { ROUTES } from "router/routeConstants";
import "./Breadcrumb/UserLayout.scss";
import "../../components/UI/QuantumCursor/QuantumCursor.scss";

function UserLayout({ children }) {
  const location = useLocation();
  const isHomePage = location.pathname === ROUTES.HOME || location.pathname === "/";

  return (
    <UserThemeProvider>
      <div className="layout">
        <QuantumCursor />
        <QuantumHeader />

        <main id="main" className={`page-container ${isHomePage ? "home-container" : ""}`}>
          {!isHomePage && (
            <div className="px-4 sm:px-6 lg:px-8 py-4 max-w-[1280px] mx-auto w-full">
              <Breadcrumb />
            </div>
          )}
          {children}
        </main>
        <Footer />
      </div>
    </UserThemeProvider>
  );
}
export default UserLayout;
  