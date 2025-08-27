import React, { useState } from 'react';
import {
  Card,
  Row,
  Col,
  Statistic,
  Progress,
  Button,
  Space,
  Typography,
  Timeline,
  List,
  Avatar,
  Tag,
  Badge,
  Descriptions,
  Tabs,
  Alert
} from 'antd';
import {
  TrophyOutlined,
  ProjectOutlined,
  UserOutlined,
  EyeOutlined,
  DownloadOutlined,
  RiseOutlined,
  CheckCircleOutlined,
  ClockCircleOutlined,
  SyncOutlined
} from '@ant-design/icons';
import { PageHeader } from 'components/Admin';
import './AdminDashboard.scss';

const { Text } = Typography;
const { TabPane } = Tabs;

const AdminDashboard = () => {
  const [activeTab, setActiveTab] = useState('overview');

  // Mock data for demonstration
  const stats = {
    totalProjects: 24,
    activeProjects: 18,
    completedProjects: 15,
    totalViews: 12750,
    monthlyViews: 3250,
    downloads: 890
  };

  const recentProjects = [
    {
      id: 1,
      name: 'E-commerce Platform',
      status: 'completed',
      completion: 100,
      dueDate: '2024-01-15',
      views: 1250,
      technologies: ['React', 'Node.js', 'MongoDB']
    },
    {
      id: 2,
      name: 'Mobile App UI',
      status: 'in-progress',
      completion: 75,
      dueDate: '2024-02-20',
      views: 890,
      technologies: ['React Native', 'TypeScript']
    },
    {
      id: 3,
      name: 'Dashboard Analytics',
      status: 'in-progress',
      completion: 60,
      dueDate: '2024-03-10',
      views: 620,
      technologies: ['Vue.js', 'Chart.js', 'Firebase']
    }
  ];

  const activities = [
    {
      type: 'project',
      title: 'Hoàn thành dự án E-commerce Platform',
      time: '2 giờ trước',
      status: 'success'
    },
    {
      type: 'view',
      title: 'Dự án Mobile App UI nhận 50 lượt xem mới',
      time: '4 giờ trước',
      status: 'processing'
    },
    {
      type: 'upload',
      title: 'Tải lên hình ảnh mới cho Dashboard Analytics',
      time: '6 giờ trước',
      status: 'default'
    },
    {
      type: 'feature',
      title: 'Thêm tính năng mới: Export to PDF',
      time: '1 ngày trước',
      status: 'success'
    }
  ];

  const getStatusIcon = (status) => {
    switch (status) {
      case 'completed':
        return <CheckCircleOutlined style={{ color: '#52c41a' }} />;
      case 'in-progress':
        return <SyncOutlined spin style={{ color: '#1890ff' }} />;
      case 'pending':
        return <ClockCircleOutlined style={{ color: '#faad14' }} />;
      default:
        return <ClockCircleOutlined />;
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'completed':
        return 'success';
      case 'in-progress':
        return 'processing';
      case 'pending':
        return 'warning';
      default:
        return 'default';
    }
  };

  const headerActions = [
    <Button key="refresh" icon={<SyncOutlined />}>
      Làm mới
    </Button>,
    <Button key="export" icon={<DownloadOutlined />}>
      Xuất báo cáo
    </Button>,
    <Button key="add" type="primary" icon={<ProjectOutlined />}>
      Dự án mới
    </Button>
  ];

  return (
    <div className="admin-dashboard">
      <PageHeader
        title="Dashboard"
        subtitle="Tổng quan về hoạt động và thống kê"
        actions={headerActions}
      />

      <Tabs activeKey={activeTab} onChange={setActiveTab}>
        <TabPane tab="Tổng quan" key="overview">
          {/* Statistics Cards */}
          <Row gutter={[16, 16]} style={{ marginBottom: 24 }}>
            <Col xs={24} sm={12} lg={6}>
              <Card>
                <Statistic
                  title="Tổng số dự án"
                  value={stats.totalProjects}
                  prefix={<ProjectOutlined />}
                  valueStyle={{ color: '#1890ff' }}
                />
              </Card>
            </Col>
            <Col xs={24} sm={12} lg={6}>
              <Card>
                <Statistic
                  title="Dự án đang hoạt động"
                  value={stats.activeProjects}
                  prefix={<SyncOutlined />}
                  valueStyle={{ color: '#52c41a' }}
                />
              </Card>
            </Col>
            <Col xs={24} sm={12} lg={6}>
              <Card>
                <Statistic
                  title="Lượt xem tháng này"
                  value={stats.monthlyViews}
                  prefix={<EyeOutlined />}
                  suffix={
                    <Space>
                      <RiseOutlined style={{ color: '#52c41a' }} />
                      <Text type="success">+12%</Text>
                    </Space>
                  }
                  valueStyle={{ color: '#722ed1' }}
                />
              </Card>
            </Col>
            <Col xs={24} sm={12} lg={6}>
              <Card>
                <Statistic
                  title="Tổng lượt tải xuống"
                  value={stats.downloads}
                  prefix={<DownloadOutlined />}
                  valueStyle={{ color: '#fa8c16' }}
                />
              </Card>
            </Col>
          </Row>

          <Row gutter={[16, 16]}>
            {/* Recent Projects */}
            <Col xs={24} lg={16}>
              <Card 
                title="Dự án gần đây" 
                extra={<Button type="link">Xem tất cả</Button>}
              >
                <List
                  dataSource={recentProjects}
                  renderItem={(project) => (
                    <List.Item
                      actions={[
                        <Button type="link" size="small">
                          Xem chi tiết
                        </Button>
                      ]}
                    >
                      <List.Item.Meta
                        avatar={
                          <Badge 
                            status={getStatusColor(project.status)} 
                            offset={[-2, 2]}
                          >
                            <Avatar 
                              icon={getStatusIcon(project.status)} 
                              style={{ backgroundColor: '#f56a00' }}
                            />
                          </Badge>
                        }
                        title={
                          <Space direction="vertical" size={2}>
                            <Text strong>{project.name}</Text>
                            <div>
                              {project.technologies.map(tech => (
                                <Tag key={tech} size="small" color="blue">
                                  {tech}
                                </Tag>
                              ))}
                            </div>
                          </Space>
                        }
                        description={
                          <Space direction="vertical" size={4} style={{ width: '100%' }}>
                            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                              <Text type="secondary">
                                {project.status === 'completed' ? 'Hoàn thành' : 
                                 project.status === 'in-progress' ? 'Đang thực hiện' : 'Chờ xử lý'}
                              </Text>
                              <Text type="secondary">{project.views} lượt xem</Text>
                            </div>
                            <Progress 
                              percent={project.completion} 
                              size="small" 
                              status={project.completion === 100 ? 'success' : 'active'}
                            />
                          </Space>
                        }
                      />
                    </List.Item>
                  )}
                />
              </Card>
            </Col>

            {/* Activity Timeline */}
            <Col xs={24} lg={8}>
              <Card title="Hoạt động gần đây">
                <Timeline>
                  {activities.map((activity, index) => (
                    <Timeline.Item
                      key={index}
                      dot={
                        activity.type === 'project' ? <TrophyOutlined style={{ color: '#52c41a' }} /> :
                        activity.type === 'view' ? <EyeOutlined style={{ color: '#1890ff' }} /> :
                        activity.type === 'upload' ? <DownloadOutlined style={{ color: '#fa8c16' }} /> :
                        <UserOutlined style={{ color: '#722ed1' }} />
                      }
                    >
                      <Text strong>{activity.title}</Text>
                      <br />
                      <Text type="secondary" style={{ fontSize: 12 }}>
                        {activity.time}
                      </Text>
                    </Timeline.Item>
                  ))}
                </Timeline>
              </Card>
            </Col>
          </Row>
        </TabPane>

        <TabPane tab="Thống kê chi tiết" key="analytics">
          <Alert
            message="Thống kê chi tiết"
            description="Trang này sẽ hiển thị các biểu đồ và báo cáo chi tiết về hiệu suất dự án, lượt truy cập, và các chỉ số quan trọng khác."
            type="info"
            showIcon
            style={{ marginBottom: 24 }}
          />
          
          <Row gutter={[16, 16]}>
            <Col span={24}>
              <Card title="Biểu đồ lượt xem theo thời gian">
                <div style={{ height: 300, background: '#fafafa', borderRadius: 8, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <Text type="secondary">Biểu đồ sẽ được hiển thị ở đây</Text>
                </div>
              </Card>
            </Col>
          </Row>
        </TabPane>

        <TabPane tab="Cài đặt hệ thống" key="settings">
          <Row gutter={[16, 16]}>
            <Col xs={24} lg={16}>
              <Card title="Thông tin hệ thống">
                <Descriptions column={1} bordered>
                  <Descriptions.Item label="Phiên bản">1.2.0</Descriptions.Item>
                  <Descriptions.Item label="Cơ sở dữ liệu">MongoDB 6.0</Descriptions.Item>
                  <Descriptions.Item label="Server">Node.js 18.x</Descriptions.Item>
                  <Descriptions.Item label="Framework">React 18.3.1</Descriptions.Item>
                  <Descriptions.Item label="UI Library">Ant Design 5.10.1</Descriptions.Item>
                  <Descriptions.Item label="Thời gian uptime">
                    <Badge status="processing" text="15 ngày 4 giờ 32 phút" />
                  </Descriptions.Item>
                </Descriptions>
              </Card>
            </Col>
            
            <Col xs={24} lg={8}>
              <Card title="Thao tác hệ thống">
                <Space direction="vertical" style={{ width: '100%' }}>
                  <Button type="primary" block>
                    Sao lưu dữ liệu
                  </Button>
                  <Button block>
                    Xóa cache
                  </Button>
                  <Button block>
                    Cập nhật hệ thống
                  </Button>
                  <Button danger block>
                    Khởi động lại server
                  </Button>
                </Space>
              </Card>
            </Col>
          </Row>
        </TabPane>
      </Tabs>
    </div>
  );
};

export default AdminDashboard;
