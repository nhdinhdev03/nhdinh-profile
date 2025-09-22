import { TeamOutlined } from '@ant-design/icons';
import { Card, Typography } from 'antd';

const { Title } = Typography;

const AdminUsers = () => {
  return (
    <Card>
      <div style={{ textAlign: 'center', padding: '50px 0' }}>
        <Title level={3}>
          <TeamOutlined /> Admin Users
        </Title>
        <p>This page will manage admin user accounts and permissions.</p>
        <p>Features: Create/edit admin accounts, manage passwords, set permissions, and track activity.</p>
      </div>
    </Card>
  );
};

export default AdminUsers;