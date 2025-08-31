import React from 'react';
import Header from './Header/Header';
import Footer from './Footer/Footer';

const Layout = ({ children }) => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-neutral-50 via-white to-neutral-100 dark:from-neutral-950 dark:via-neutral-900 dark:to-neutral-800 transition-all duration-300">
      <Header />
      <main className="relative min-h-[calc(100vh-4rem)] pb-16">
        {children}
      </main>
      <Footer />
    </div>
  );
};

export default Layout;
