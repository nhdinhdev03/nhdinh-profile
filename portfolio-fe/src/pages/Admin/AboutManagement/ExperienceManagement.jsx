import React, { useState, useEffect } from "react";
import { Card, Typography, Divider } from "antd";

const { Title } = Typography;

const ExperienceManagement = () => {
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
    }, 1000);
  }, []);

  return (
    <div className="experience-management">
      <div className="page-header">
        <Title level={2}>Quản lý Kinh nghiệm</Title>
        <p>Quản lý lịch sử làm việc và kinh nghiệm</p>
      </div>
      
      <Divider />

      <Card loading={loading}>
        <Title level={4}>Work Experience</Title>
        <p>Chức năng đang được phát triển...</p>
        {/* TODO: Implement experience management interface */}
      </Card>
    </div>
  );
};

export default ExperienceManagement;
