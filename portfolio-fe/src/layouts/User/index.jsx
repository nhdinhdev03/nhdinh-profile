import React from "react";
import Header from "./Header";
import Footer from "./Footer";

 function UserLayout({ children }) {
  return (
    <div className="layout">
      <Header />
      <main id="main" className="page-container">
        {children}
      </main>
      <Footer />
    </div>
  );
}
export default UserLayout;