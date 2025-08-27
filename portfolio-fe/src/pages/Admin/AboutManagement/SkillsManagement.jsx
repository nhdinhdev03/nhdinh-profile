import React, { useState, useEffect } from "react";
import { Card, Typography, Divider } from "antd";
import { AcademicCapIcon } from '@heroicons/react/24/outline';
import { PageHeader } from '../../../components/Admin';

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
    <div className="space-y-6">
      <PageHeader
        title="Quản lý Kỹ năng"
        subtitle="Quản lý danh sách kỹ năng cá nhân"
        icon={AcademicCapIcon}
      />

      <Card loading={loading}>
        <Title level={4}>Skills List</Title>
        <p>Chức năng đang được phát triển...</p>
        {/* TODO: Implement skills management interface */}
      </Card>
    </div>
  );
};

export default SkillsManagement;
