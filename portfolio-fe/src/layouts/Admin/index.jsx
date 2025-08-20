import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import PropTypes from "prop-types";
import { AdminThemeProvider } from "../../theme";
import { ToastProvider } from "../../components/Admin/Toast";
import Sidebar from "./Sidebar";
import Header from "./Header";
import AdminBreadcrumb from "./Breadcrumb";
import "../../styles/admin-enhancements.css";

function AdminLayout({ children, usePageHeader = false }) {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  return (
    <AdminThemeProvider>
      <ToastProvider>
        <div className="min-h-screen bg-gray-50">
          {/* Sidebar */}
          <Sidebar 
            sidebarOpen={sidebarOpen} 
            setSidebarOpen={setSidebarOpen}
            currentPath={location.pathname}
            navigate={navigate}
          />
          
          {/* Main content */}
          <div className="lg:pl-72">
            <Header 
              setSidebarOpen={setSidebarOpen}
              currentPath={location.pathname}
            />
            
            {/* Admin Breadcrumb - only show if not using PageHeader */}
            {!usePageHeader && (
              <AdminBreadcrumb 
                showIcons={true}
                className="sticky top-16 z-30"
              />
            )}
            
            {/* Page content */}
            <main className={usePageHeader ? "pb-6" : "py-6"}>
              <div className={usePageHeader ? "" : "mx-auto max-w-7xl px-4 sm:px-6 lg:px-8"}>
                {children}
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

AdminLayout.defaultProps = {
  usePageHeader: false,
};

export default AdminLayout;