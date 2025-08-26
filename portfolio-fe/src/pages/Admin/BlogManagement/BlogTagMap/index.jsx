import React, { useState, useEffect } from "react";
import { Card, Typography, Divider } from "antd";

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
    <div className="blog-tag-map-management">
      <div className="page-header">
        <Title level={2}>Quản lý Mapping Blog-Tag</Title>
        <p>Quản lý liên kết giữa bài viết và các tag</p>
      </div>
      
      <Divider />

      <Card loading={loading}>
        <Title level={4}>Blog-Tag Mappings</Title>
        <p>Chức năng đang được phát triển...</p>
        {/* TODO: Implement blog tag mapping management interface */}
      </Card>
    </div>
  );
};

export default BlogTagMapManagement;
