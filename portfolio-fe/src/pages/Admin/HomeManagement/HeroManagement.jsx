import React, { useState, useEffect } from "react";
import { Card, Typography, Divider } from "antd";

const { Title } = Typography;

const HeroManagement = () => {
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
    }, 1000);
  }, []);

  return (
    <div className="hero-management">
      <div className="page-header">
        <Title level={2}>Quản lý Hero Section</Title>
        <p>Quản lý phần giới thiệu chính trên trang chủ</p>
      </div>
      
      <Divider />

      <Card loading={loading}>
        <Title level={4}>Hero Section Settings</Title>
        <p>Chức năng đang được phát triển...</p>
        {/* TODO: Implement hero section management interface */}
      </Card>
    </div>
  );
};

export default HeroManagement;
