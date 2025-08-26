import React, { useState, useEffect } from "react";
import { Card, Typography, Divider } from "antd";

const { Title } = Typography;

const ContactMessagesManagement = () => {
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
    }, 1000);
  }, []);

  return (
    <div className="contact-messages-management">
      <div className="page-header">
        <Title level={2}>Quản lý Tin nhắn Liên hệ</Title>
        <p>Quản lý và trả lời các tin nhắn từ khách hàng</p>
      </div>
      
      <Divider />

      <Card loading={loading}>
        <Title level={4}>Contact Messages</Title>
        <p>Chức năng đang được phát triển...</p>
        {/* TODO: Implement contact messages management interface */}
      </Card>
    </div>
  );
};

export default ContactMessagesManagement;
