import React, { useState, useEffect } from "react";
import { Card, Typography } from "antd";
import { Squares2X2Icon } from '@heroicons/react/24/outline';
import { PageHeader } from '../../../components/Admin';

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
    <div className="space-y-6">
      <PageHeader
        title="Quản lý Danh mục Kỹ năng"
        subtitle="Quản lý phân loại kỹ năng"
        icon={Squares2X2Icon}
      />

      <Card loading={loading}>
        <Title level={4}>Skill Categories</Title>
        <p>Chức năng đang được phát triển...</p>
        {/* TODO: Implement skill categories management interface */}
      </Card>
    </div>
  );
};

export default SkillCategoriesManagement;
