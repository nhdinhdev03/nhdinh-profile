import React, { useState, useEffect } from "react";
import { Card, Typography, Divider } from "antd";
import { ShieldCheckIcon } from '@heroicons/react/24/outline';
import { PageHeader } from '../../../components/Admin';

const { Title } = Typography;

const AdminUsersManagement = () => {
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
    }, 1000);
  }, []);

  return (
    <div className="space-y-6">
      <PageHeader
        title="Quản lý Tài khoản Admin"
        subtitle="Quản lý tài khoản quản trị viên hệ thống"
        icon={ShieldCheckIcon}
      />

      <Card loading={loading}>
        <Title level={4}>Admin Users</Title>
        <p>Chức năng đang được phát triển...</p>
        {/* TODO: Implement admin users management interface */}
      </Card>
    </div>
  );
};

export default AdminUsersManagement;
