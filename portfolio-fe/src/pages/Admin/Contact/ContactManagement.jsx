import { MessageOutlined } from '@ant-design/icons';
import { Card, Typography } from 'antd';

const { Title } = Typography;

const ContactManagement = () => {
  return (
    <Card>
      <div style={{ textAlign: 'center', padding: '50px 0' }}>
        <Title level={3}>
          <MessageOutlined /> Contact Management
        </Title>
        <p>This page will manage contact form submissions and messages.</p>
        <p>Features: View messages, reply to inquiries, mark as read/replied, and archive.</p>
      </div>
    </Card>
  );
};

export default ContactManagement;