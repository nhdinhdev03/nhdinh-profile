import React, { useState, useEffect } from "react";
import { Card, Typography, Divider } from "antd";

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
    <div className="profile-info-management">
      <div className="page-header">
        <Title level={2}>Quản lý Thông tin Hồ sơ</Title>
        <p>Quản lý thông tin cá nhân chi tiết</p>
      </div>
      
      <Divider />

      <Card loading={loading}>
        <Title level={4}>Profile Information</Title>
        <p>Chức năng đang được phát triển...</p>
        {/* TODO: Implement profile info management interface */}
      </Card>
    </div>
  );
};

export default ProfileInfoManagement;
