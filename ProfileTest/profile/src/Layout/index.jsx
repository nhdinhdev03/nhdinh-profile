import React from 'react';
import { Outlet } from 'react-router-dom';
import Header from './User/Header/Header';
import Footer from './User/Footer/Footer';

const Layout = () => {
  return (
    <>
      <Header />
      <main className="main-content">
        <Outlet />
      </main>
      <Footer />
    </>
  );
};

export default Layout;