import { TranslationOutlined } from '@ant-design/icons';
import { Card, Typography } from 'antd';

const { Title } = Typography;

const BlogTranslations = () => {
  return (
    <Card>
      <div style={{ textAlign: 'center', padding: '50px 0' }}>
        <Title level={3}>
          <TranslationOutlined /> Blog Translations
        </Title>
        <p>This page will manage blog post translations for multiple languages.</p>
        <p>Features: Translate blog content, manage multilingual SEO, and synchronize updates.</p>
      </div>
    </Card>
  );
};

export default BlogTranslations;