import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';

// Component để bảo vệ các route cần authentication
const ProtectedRoute = ({ children }) => {
  const location = useLocation();
  
  // Tạm thời return children vì chưa có auth system
  // Sau này sẽ check authentication state ở đây
  const isAuthenticated = false; // Sẽ thay bằng auth state thật
  
  if (!isAuthenticated) {
    // Redirect về login page với thông tin về page đang cố access
    return <Navigate to="/auth/login" state={{ from: location }} replace />;
  }

  return children;
};

export default ProtectedRoute;
