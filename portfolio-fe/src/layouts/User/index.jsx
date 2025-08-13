import React from "react";
import Header from "./Header";
import Breadcrumb from "../Breadcrumb";
import Footer from "./Footer";

function UserLayout({ children }) {
  return (
    <div className="layout">
      <Header />

      <main id="main" className="page-container">
        <div className="px-4 sm:px-6 lg:px-8 py-2 max-w-[1280px] mx-auto w-full">
          <Breadcrumb />
        </div>
        {children}
      </main>
      <Footer />
    </div>
  );
}
export default UserLayout;
