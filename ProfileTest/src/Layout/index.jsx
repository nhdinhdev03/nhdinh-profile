import React from "react";
import PropTypes from "prop-types";
import Footer from "./Footer/Footer";
import Header from "./Header/Header";
import "./Layout.scss";

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

Layout.propTypes = {
  children: PropTypes.node.isRequired,
};

export default Layout;
