import React, { useState, useEffect } from "react";
import { Card, Typography } from "antd";
import { ChatBubbleBottomCenterTextIcon } from '@heroicons/react/24/outline';
import { PageHeader } from "components/Admin";


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
    <div className="space-y-6">
      <PageHeader
        title="Quản lý Hero SubHeading"
        subtitle="Quản lý các dòng mô tả vai trò nghề nghiệp"
        icon={ChatBubbleBottomCenterTextIcon}
      />

      <Card loading={loading}>
        <Title level={4}>Hero SubHeading Settings</Title>
        <p>Chức năng đang được phát triển...</p>
        {/* TODO: Implement hero subheading management interface */}
      </Card>
    </div>
  );
};

export default HeroSubHeadingManagement;
