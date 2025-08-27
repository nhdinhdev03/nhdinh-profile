import React, { useState, useEffect } from "react";
import { Card, Typography, Divider } from "antd";
import { LinkIcon } from '@heroicons/react/24/outline';
import { PageHeader } from '../../../../components/Admin';

const { Title } = Typography;

const BlogTagMapManagement = () => {
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
        title="Quản lý Mapping Blog-Tag"
        subtitle="Quản lý liên kết giữa bài viết và các tag"
        icon={LinkIcon}
      />

      <Card loading={loading}>
        <Title level={4}>Blog-Tag Mappings</Title>
        <p>Chức năng đang được phát triển...</p>
        {/* TODO: Implement blog tag mapping management interface */}
      </Card>
    </div>
  );
};

export default BlogTagMapManagement;
