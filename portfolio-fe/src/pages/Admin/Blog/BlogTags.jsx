import { TagsOutlined } from '@ant-design/icons';
import { Card, Typography } from 'antd';

const { Title } = Typography;

const BlogTags = () => {
  return (
    <Card>
      <div style={{ textAlign: 'center', padding: '50px 0' }}>
        <Title level={3}>
          <TagsOutlined /> Blog Tags
        </Title>
        <p>This page will manage blog tags for categorizing posts.</p>
        <p>Features: Create, edit, delete tags, and track usage across blog posts.</p>
      </div>
    </Card>
  );
};

export default BlogTags;