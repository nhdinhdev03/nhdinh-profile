import { EditOutlined } from '@ant-design/icons';
import { Card, Typography } from 'antd';

const { Title } = Typography;

const BlogManagement = () => {
  return (
    <Card>
      <div style={{ textAlign: 'center', padding: '50px 0' }}>
        <Title level={3}>
          <EditOutlined /> Blog Management
        </Title>
        <p>This page will manage blog posts, including creation, editing, and publishing.</p>
        <p>Features: Rich text editor, SEO settings, tags, categories, and publication scheduling.</p>
      </div>
    </Card>
  );
};

export default BlogManagement;