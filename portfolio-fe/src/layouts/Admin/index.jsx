import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import Sidebar from "./Sidebar";
import Header from "./Header";

function AdminLayout({ children }) {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  return (
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
        
        {/* Page content */}
        <main className="py-4">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            {children}
          </div>
        </main>
      </div>
    </div>
  );
}

export default AdminLayout;