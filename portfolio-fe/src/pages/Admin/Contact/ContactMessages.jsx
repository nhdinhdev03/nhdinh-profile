import { MessageOutlined } from '@ant-design/icons';
import { Card, Typography } from 'antd';

const { Title } = Typography;

const ContactMessages = () => {
  return (
    <Card>
      <div style={{ textAlign: 'center', padding: '50px 0' }}>
        <Title level={3}>
          <MessageOutlined /> Contact Messages
        </Title>
        <p>This page will display all contact messages in a table format.</p>
        <p>Features: Search, filter, sort, bulk actions, and detailed message view.</p>
      </div>
    </Card>
  );
};

export default ContactMessages;