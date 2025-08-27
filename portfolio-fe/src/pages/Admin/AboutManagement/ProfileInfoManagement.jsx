import React, { useState, useEffect } from "react";
import { Card, Typography } from "antd";
import { UserIcon } from '@heroicons/react/24/outline';
import { PageHeader } from '../../../components/Admin';

const { Title } = Typography;

const ProfileInfoManagement = () => {
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
        title="Quản lý Thông tin Hồ sơ"
        subtitle="Quản lý thông tin cá nhân chi tiết"
        icon={UserIcon}
      />

      <Card loading={loading}>
        <Title level={4}>Profile Information</Title>
        <p>Chức năng đang được phát triển...</p>
        {/* TODO: Implement profile info management interface */}
      </Card>
    </div>
  );
};

export default ProfileInfoManagement;
