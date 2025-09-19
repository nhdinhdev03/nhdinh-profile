import { CalendarOutlined } from '@ant-design/icons';
import { Card, Typography } from 'antd';

const { Title } = Typography;

const ProfileExperience = () => {
  return (
    <Card>
      <div style={{ textAlign: 'center', padding: '50px 0' }}>
        <Title level={3}>
          <CalendarOutlined /> Work Experience
        </Title>
        <p>This page will manage work experience and career timeline.</p>
        <p>Features: Add/edit jobs, positions, dates, descriptions, and current employment status.</p>
      </div>
    </Card>
  );
};

export default ProfileExperience;