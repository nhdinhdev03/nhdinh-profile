import { AppstoreOutlined } from '@ant-design/icons';
import { Card, Typography } from 'antd';

const { Title } = Typography;

const SkillCategories = () => {
  return (
    <Card>
      <div style={{ textAlign: 'center', padding: '50px 0' }}>
        <Title level={3}>
          <AppstoreOutlined /> Skill Categories
        </Title>
        <p>This page will manage skill categories for organizing technical expertise.</p>
        <p>Features: Create categories, set icons, manage sort order, and activate/deactivate.</p>
      </div>
    </Card>
  );
};

export default SkillCategories;