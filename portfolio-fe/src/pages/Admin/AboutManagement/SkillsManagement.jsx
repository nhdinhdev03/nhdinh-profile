import React, { useState, useEffect } from "react";
import { Card, Typography, Divider } from "antd";

const { Title } = Typography;

const SkillsManagement = () => {
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
    }, 1000);
  }, []);

  return (
    <div className="skills-management">
      <div className="page-header">
        <Title level={2}>Quản lý Kỹ năng</Title>
        <p>Quản lý danh sách kỹ năng cá nhân</p>
      </div>
      
      <Divider />

      <Card loading={loading}>
        <Title level={4}>Skills List</Title>
        <p>Chức năng đang được phát triển...</p>
        {/* TODO: Implement skills management interface */}
      </Card>
    </div>
  );
};

export default SkillsManagement;
