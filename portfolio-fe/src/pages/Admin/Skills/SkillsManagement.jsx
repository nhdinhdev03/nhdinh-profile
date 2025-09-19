import { ToolOutlined } from '@ant-design/icons';
import { Card, Typography } from 'antd';

const { Title } = Typography;

const SkillsManagement = () => {
  return (
    <Card>
      <div style={{ textAlign: 'center', padding: '50px 0' }}>
        <Title level={3}>
          <ToolOutlined /> Skills Management
        </Title>
        <p>This page will manage technical skills and expertise.</p>
        <p>Features: Add/edit skills, assign to categories, set proficiency levels, and organize display order.</p>
      </div>
    </Card>
  );
};

export default SkillsManagement;