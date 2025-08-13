import React from "react";
import Header from "./Header";
import Breadcrumb from "../Breadcrumb";
import Footer from "./Footer";

 function UserLayout({ children }) {
  return (
    <div className="layout">
      <Header />
      <div className="px-4 sm:px-6 lg:px-8 py-2">
        <Breadcrumb />
      </div>
      <main id="main" className="page-container">
        {children}
      </main>
      <Footer />
    </div>
  );
}
export default UserLayout;