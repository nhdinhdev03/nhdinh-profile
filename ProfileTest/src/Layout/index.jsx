import React, { memo } from "react";
import Footer from "./Footer/Footer";
import Header from "./Header/Header";

function Layout({ children }) {
  return (
    <div className="app-layout">
      <Header />
      <main>
        {children}
      </main>
      <Footer />
    </div>
  );
}

export default Layout;
