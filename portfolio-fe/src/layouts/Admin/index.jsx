import React from "react";

function AdminLayout({ children }) {
  return (
    <div className="admin-layout">
      {/* Có thể thêm Sidebar/Header cho admin ở đây */}
      <main>{children}</main>
    </div>
  );
}
export default AdminLayout;