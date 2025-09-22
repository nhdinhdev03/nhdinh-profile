import { EditOutlined } from '@ant-design/icons';
import { Card, Typography } from 'antd';

const { Title } = Typography;

const BlogPosts = () => {
  return (
    <Card>
      <div style={{ textAlign: 'center', padding: '50px 0' }}>
        <Title level={3}>
          <EditOutlined /> Blog Posts
        </Title>
        <p>This page will list and manage all blog posts.</p>
        <p>Features: List view, search, filter by status, bulk operations, and quick edit.</p>
      </div>
    </Card>
  );
};

export default BlogPosts;