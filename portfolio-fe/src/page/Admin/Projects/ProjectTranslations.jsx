import { TranslationOutlined } from '@ant-design/icons';
import { Card, Typography } from 'antd';

const { Title } = Typography;

const ProjectTranslations = () => {
  return (
    <Card>
      <div style={{ textAlign: 'center', padding: '50px 0' }}>
        <Title level={3}>
          <TranslationOutlined /> Project Translations
        </Title>
        <p>This page will manage project translations for multiple languages.</p>
        <p>Features: Create, edit, and manage project titles, descriptions, and metadata in different languages.</p>
      </div>
    </Card>
  );
};

export default ProjectTranslations;