import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import PropTypes from "prop-types";

import Sidebar from "./Sidebar";
import Header from "./Header";
import AdminBreadcrumb from "./Breadcrumb";
import { AdminThemeProvider } from "theme";
import { ToastProvider } from "components/Admin";
import "./AdminLayout.scss";

function AdminLayout({ children, usePageHeader = false }) {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  return (
    <AdminThemeProvider>
      <ToastProvider>
        <div className="admin-layout">
          {/* Sidebar */}
          <Sidebar 
            sidebarOpen={sidebarOpen} 
            setSidebarOpen={setSidebarOpen}
            currentPath={location.pathname}
            navigate={navigate}
          />
          
          {/* Main content */}
          <div className="admin-main-content">
            <Header 
              setSidebarOpen={setSidebarOpen}
              currentPath={location.pathname}
            />
            
            {/* Admin Breadcrumb - only show if not using PageHeader */}
            {!usePageHeader && (
              <AdminBreadcrumb 
                showIcons={true}
                className="admin-sticky-breadcrumb"
              />
            )}
            
            {/* Page content */}
            <main className={`admin-page-content ${usePageHeader ? "with-page-header" : ""}`}>
              <div className="admin-content-container">
                <div className="admin-content-wrapper">
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