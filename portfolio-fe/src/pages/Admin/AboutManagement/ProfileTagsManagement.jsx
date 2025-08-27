import React, { useState, useEffect } from "react";
import { Card, Typography } from "antd";
import { HashtagIcon } from '@heroicons/react/24/outline';
import { PageHeader } from '../../../components/Admin';

const { Title } = Typography;

const ProfileTagsManagement = () => {
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
        title="Quản lý Profile Tags"
        subtitle="Quản lý các nhãn mô tả hồ sơ"
        icon={HashtagIcon}
      />

      <Card loading={loading}>
        <Title level={4}>Profile Tags</Title>
        <p>Chức năng đang được phát triển...</p>
        {/* TODO: Implement profile tags management interface */}
      </Card>
    </div>
  );
};

export default ProfileTagsManagement;
