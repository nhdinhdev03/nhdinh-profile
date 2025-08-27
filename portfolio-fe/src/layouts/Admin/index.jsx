import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import PropTypes from "prop-types";
import { ToastContainer } from 'react-toastify';

import Sidebar from "./Sidebar";
import Header from "./Header";
import AdminBreadcrumb from "./Breadcrumb";
import { AdminThemeProvider } from "theme";

import 'react-toastify/dist/ReactToastify.css';
import "./AdminLayout.scss";

function AdminLayout({ children, usePageHeader = false }) {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  return (
    <AdminThemeProvider>
 
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
        
        {/* Toast Container */}
        <ToastContainer
          position="top-right"
          autoClose={5000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
          theme="light"
        />

    </AdminThemeProvider>
  );
}

AdminLayout.propTypes = {
  children: PropTypes.node,
  usePageHeader: PropTypes.bool,
};

export default AdminLayout;