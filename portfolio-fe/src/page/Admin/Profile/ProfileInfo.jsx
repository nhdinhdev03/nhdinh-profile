import { UserOutlined } from '@ant-design/icons';
import { Card, Typography } from 'antd';

const { Title } = Typography;

const ProfileInfo = () => {
  return (
    <Card>
      <div style={{ textAlign: 'center', padding: '50px 0' }}>
        <Title level={3}>
          <UserOutlined /> Profile Information
        </Title>
        <p>This page will manage detailed profile information and translations.</p>
        <p>Features: Multi-language profile data, avatar management, and personal details.</p>
      </div>
    </Card>
  );
};

export default ProfileInfo;