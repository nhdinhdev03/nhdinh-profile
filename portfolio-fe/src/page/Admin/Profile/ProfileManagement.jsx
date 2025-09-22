import { UserOutlined } from '@ant-design/icons';
import { Card, Typography } from 'antd';

const { Title } = Typography;

const ProfileManagement = () => {
  return (
    <Card>
      <div style={{ textAlign: 'center', padding: '50px 0' }}>
        <Title level={3}>
          <UserOutlined /> Profile Management
        </Title>
        <p>This page will manage personal profile information.</p>
        <p>Features: Update bio, profile picture, contact info, and social media links.</p>
      </div>
    </Card>
  );
};

export default ProfileManagement;