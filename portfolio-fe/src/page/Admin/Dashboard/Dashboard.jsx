import {
    EditOutlined,
    MessageOutlined,
    ProjectOutlined,
    ToolOutlined
} from '@ant-design/icons';
import { Card, Col, Row, Space, Statistic, Typography } from 'antd';

const { Title } = Typography;

const Dashboard = () => {
  // Mock data - in real app, this would come from API
  const stats = [
    {
      title: 'Total Projects',
      value: 15,
      icon: <ProjectOutlined />,
      color: '#1890ff'
    },
    {
      title: 'Blog Posts',
      value: 8,
      icon: <EditOutlined />,
      color: '#52c41a'
    },
    {
      title: 'Contact Messages',
      value: 23,
      icon: <MessageOutlined />,
      color: '#faad14'
    },
    {
      title: 'Skills',
      value: 12,
      icon: <ToolOutlined />,
      color: '#722ed1'
    }
  ];

  return (
    <div style={{ padding: '24px' }}>
      <Title level={2}>Dashboard</Title>
      
      <Row gutter={[16, 16]}>
        {stats.map((stat, index) => (
          <Col xs={24} sm={12} lg={6} key={index}>
            <Card>
              <Statistic
                title={stat.title}
                value={stat.value}
                prefix={
                  <span style={{ color: stat.color, fontSize: '24px' }}>
                    {stat.icon}
                  </span>
                }
                valueStyle={{ color: stat.color }}
              />
            </Card>
          </Col>
        ))}
      </Row>

      <Row gutter={[16, 16]} style={{ marginTop: '24px' }}>
        <Col xs={24} lg={12}>
          <Card title="Recent Activities" size="small">
            <Space direction="vertical" size="middle" style={{ width: '100%' }}>
              <div>
                <strong>Project Updated:</strong> Portfolio Website v2.0
                <br />
                <small style={{ color: '#999' }}>2 hours ago</small>
              </div>
              <div>
                <strong>New Contact Message:</strong> From John Doe
                <br />
                <small style={{ color: '#999' }}>5 hours ago</small>
              </div>
              <div>
                <strong>Blog Post Published:</strong> React Best Practices
                <br />
                <small style={{ color: '#999' }}>1 day ago</small>
              </div>
            </Space>
          </Card>
        </Col>
        
        <Col xs={24} lg={12}>
          <Card title="Quick Actions" size="small">
            <Space direction="vertical" size="middle" style={{ width: '100%' }}>
              <div>
                <a href="/admin/projects">Add New Project</a>
              </div>
              <div>
                <a href="/admin/blog/posts">Create Blog Post</a>
              </div>
              <div>
                <a href="/admin/contact/messages">View Messages</a>
              </div>
              <div>
                <a href="/admin/profile/info">Update Profile</a>
              </div>
            </Space>
          </Card>
        </Col>
      </Row>
    </div>
  );
};

export default Dashboard;