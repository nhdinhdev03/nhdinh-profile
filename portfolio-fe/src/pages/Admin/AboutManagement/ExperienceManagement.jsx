import React, { useState, useEffect } from "react";
import { Card, Typography } from "antd";
import { BriefcaseIcon } from '@heroicons/react/24/outline';
import { PageHeader } from '../../../components/Admin';

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
    <div className="space-y-6">
      <PageHeader
        title="Quản lý Kinh nghiệm"
        subtitle="Quản lý lịch sử làm việc và kinh nghiệm"
        icon={BriefcaseIcon}
      />

      <Card loading={loading}>
        <Title level={4}>Work Experience</Title>
        <p>Chức năng đang được phát triển...</p>
        {/* TODO: Implement experience management interface */}
      </Card>
    </div>
  );
};

export default ExperienceManagement;
