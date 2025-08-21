import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import PropTypes from "prop-types";

import Sidebar from "./Sidebar";
import Header from "./Header";
import AdminBreadcrumb from "./Breadcrumb";import { AdminThemeProvider } from "theme";
import { ToastProvider } from "components/Admin";
;

function AdminLayout({ children, usePageHeader = false }) {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  return (
    <AdminThemeProvider>
      <ToastProvider>
        <div className="min-h-screen bg-gray-50/50">
          {/* Sidebar */}
          <Sidebar 
            sidebarOpen={sidebarOpen} 
            setSidebarOpen={setSidebarOpen}
            currentPath={location.pathname}
            navigate={navigate}
          />
          
          {/* Main content */}
          <div className="lg:pl-72 transition-all duration-300 ease-in-out">
            <Header 
              setSidebarOpen={setSidebarOpen}
              currentPath={location.pathname}
            />
            
            {/* Admin Breadcrumb - only show if not using PageHeader */}
            {!usePageHeader && (
              <AdminBreadcrumb 
                showIcons={true}
                className="sticky top-16 z-30 bg-white/80 backdrop-blur-sm border-b border-gray-100"
              />
            )}
            
            {/* Page content */}
            <main className={usePageHeader ? "pb-6" : "py-6"}>
              <div className={
                usePageHeader 
                  ? "mx-auto max-w-[1920px] px-4 sm:px-6 lg:px-8 xl:px-12 2xl:px-16" 
                  : "mx-auto max-w-[1680px] px-4 sm:px-6 lg:px-8 xl:px-10 2xl:px-12"
              }>
                <div className="w-full">
                  {children}
                </div>
              </div>
            </main>
          </div>
        </div>
      </ToastProvider>
    </AdminThemeProvider>
  );
}

AdminLayout.propTypes = {
  children: PropTypes.node,
  usePageHeader: PropTypes.bool,
};

export default AdminLayout;