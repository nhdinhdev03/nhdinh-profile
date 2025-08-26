import React, { useState, useEffect } from "react";
import { Card, Typography, Divider } from "antd";

const { Title } = Typography;

const HeroSubHeadingManagement = () => {
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
    }, 1000);
  }, []);

  return (
    <div className="hero-subheading-management">
      <div className="page-header">
        <Title level={2}>Quản lý Hero SubHeading</Title>
        <p>Quản lý các dòng mô tả vai trò nghề nghiệp</p>
      </div>
      
      <Divider />

      <Card loading={loading}>
        <Title level={4}>Hero SubHeading Settings</Title>
        <p>Chức năng đang được phát triển...</p>
        {/* TODO: Implement hero subheading management interface */}
      </Card>
    </div>
  );
};

export default HeroSubHeadingManagement;
