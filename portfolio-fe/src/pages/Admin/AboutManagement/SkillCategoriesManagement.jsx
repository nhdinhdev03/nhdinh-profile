import React, { useState, useEffect } from "react";
import { Card, Typography, Divider } from "antd";

const { Title } = Typography;

const SkillCategoriesManagement = () => {
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
    }, 1000);
  }, []);

  return (
    <div className="skill-categories-management">
      <div className="page-header">
        <Title level={2}>Quản lý Danh mục Kỹ năng</Title>
        <p>Quản lý phân loại kỹ năng</p>
      </div>
      
      <Divider />

      <Card loading={loading}>
        <Title level={4}>Skill Categories</Title>
        <p>Chức năng đang được phát triển...</p>
        {/* TODO: Implement skill categories management interface */}
      </Card>
    </div>
  );
};

export default SkillCategoriesManagement;
