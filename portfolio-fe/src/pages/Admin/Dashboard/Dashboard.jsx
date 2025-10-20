import {
  ArrowUpOutlined,
  CheckCircleOutlined,
  ClockCircleOutlined,
  DashboardOutlined,
  EyeOutlined,
  ProjectOutlined,
  SyncOutlined,
  UserOutlined,
} from "@ant-design/icons";
import {
  Card,
  Col,
  List,
  Progress,
  Row,
  Space,
  Statistic,
  Tag,
  Typography,
} from "antd";
import { useState } from "react";
import "./Dashboard.scss";

const { Text, Title } = Typography;

const Dashboard = () => {
  const [loading] = useState(false);

  // Mock data - Professional dashboard metrics
  const stats = {
    totalProjects: 24,
    activeProjects: 18,
    monthlyViews: 3250,
    totalVisitors: 1840,
    growth: {
      projects: 15.5,
      views: 12.3,
      visitors: 8.7,
    },
  };

  const recentProjects = [
    {
      id: 1,
      name: "E-commerce Platform",
      status: "completed",
      completion: 100,
      views: 1250,
      technologies: ["React", "Node.js", "MongoDB"],
    },
    {
      id: 2,
      name: "Mobile App UI",
      status: "in-progress",
      completion: 75,
      views: 890,
      technologies: ["React Native", "TypeScript"],
    },
    {
      id: 3,
      name: "Dashboard Analytics",
      status: "in-progress",
      completion: 60,
      views: 620,
      technologies: ["Vue.js", "Chart.js"],
    },
    {
      id: 4,
      name: "AI Chatbot",
      status: "pending",
      completion: 25,
      views: 340,
      technologies: ["Python", "TensorFlow"],
    },
  ];

  const getStatusIcon = (status) => {
    switch (status) {
      case "completed":
        return <CheckCircleOutlined style={{ color: "#52c41a" }} />;
      case "in-progress":
        return <SyncOutlined spin style={{ color: "#1890ff" }} />;
      case "pending":
        return <ClockCircleOutlined style={{ color: "#faad14" }} />;
      default:
        return <ClockCircleOutlined />;
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case "completed":
        return "success";
      case "in-progress":
        return "processing";
      case "pending":
        return "warning";
      default:
        return "default";
    }
  };

  const getStatusText = (status) => {
    switch (status) {
      case "completed":
        return "Hoàn thành";
      case "in-progress":
        return "Đang thực hiện";
      case "pending":
        return "Chờ xử lý";
      default:
        return "Unknown";
    }
  };

  return (
    <div className="admin-dashboard">
      {/* Header */}
      <div style={{ marginBottom: 24 }}>
        <Title level={2}>
          <DashboardOutlined /> Dashboard
        </Title>
        <Text type="secondary">Tổng quan hoạt động hệ thống</Text>
      </div>

      {/* Statistics Cards - Modern Design */}
      <Row gutter={[20, 20]} style={{ marginBottom: 24 }}>
        <Col xs={24} sm={12} lg={6}>
          <Card className="stats-card stats-card-primary" hoverable>
            <Statistic
              title="Tổng số dự án"
              value={stats.totalProjects}
              prefix={<ProjectOutlined className="stat-icon" />}
              valueStyle={{ color: "#1890ff", fontWeight: 600 }}
            />
            <div className="stat-trend">
              <ArrowUpOutlined className="trend-icon up" />
              <Text type="success">+{stats.growth.projects}%</Text>
            </div>
          </Card>
        </Col>

        <Col xs={24} sm={12} lg={6}>
          <Card className="stats-card stats-card-success" hoverable>
            <Statistic
              title="Dự án hoạt động"
              value={stats.activeProjects}
              prefix={<SyncOutlined spin className="stat-icon" />}
              valueStyle={{ color: "#52c41a", fontWeight: 600 }}
            />
            <Text type="secondary" className="stat-subtitle">
              Đang triển khai
            </Text>
          </Card>
        </Col>

        <Col xs={24} sm={12} lg={6}>
          <Card className="stats-card stats-card-warning" hoverable>
            <Statistic
              title="Lượt xem tháng này"
              value={stats.monthlyViews}
              prefix={<EyeOutlined className="stat-icon" />}
              valueStyle={{ color: "#faad14", fontWeight: 600 }}
            />
            <div className="stat-trend">
              <ArrowUpOutlined className="trend-icon up" />
              <Text type="success">+{stats.growth.views}%</Text>
            </div>
          </Card>
        </Col>

        <Col xs={24} sm={12} lg={6}>
          <Card className="stats-card stats-card-info" hoverable>
            <Statistic
              title="Tổng người truy cập"
              value={stats.totalVisitors}
              prefix={<UserOutlined className="stat-icon" />}
              valueStyle={{ color: "#13c2c2", fontWeight: 600 }}
            />
            <div className="stat-trend">
              <ArrowUpOutlined className="trend-icon up" />
              <Text type="success">+{stats.growth.visitors}%</Text>
            </div>
          </Card>
        </Col>
      </Row>

      {/* Recent Projects - Clean & Modern */}
      <Card
        title={
          <Space>
            <ProjectOutlined />
            <Title level={4} style={{ margin: 0 }}>
              Dự án gần đây
            </Title>
          </Space>
        }
        className="data-card"
        bordered={false}
      >
        <List
          loading={loading}
          dataSource={recentProjects}
          renderItem={(project) => (
            <List.Item className="project-item" key={project.id}>
              <Row style={{ width: "100%" }} gutter={16} align="middle">
                <Col flex="none">
                  <div className="status-icon-wrapper">
                    {getStatusIcon(project.status)}
                  </div>
                </Col>
                <Col flex="auto">
                  <Space
                    direction="vertical"
                    size={8}
                    style={{ width: "100%" }}
                  >
                    <Space>
                      <Text strong className="project-name">
                        {project.name}
                      </Text>
                      <Tag color={getStatusColor(project.status)}>
                        {getStatusText(project.status)}
                      </Tag>
                    </Space>
                    <Space size={6} wrap>
                      {project.technologies.map((tech) => (
                        <Tag key={tech} className="tech-tag">
                          {tech}
                        </Tag>
                      ))}
                    </Space>
                    <div className="project-progress">
                      <Space
                        style={{
                          width: "100%",
                          justifyContent: "space-between",
                        }}
                      >
                        <Text type="secondary" className="small">
                          <EyeOutlined /> {project.views} lượt xem
                        </Text>
                        <Text type="secondary" className="small">
                          {project.completion}%
                        </Text>
                      </Space>
                      <Progress
                        percent={project.completion}
                        size="small"
                        strokeColor={{
                          "0%": "#108ee9",
                          "100%": "#87d068",
                        }}
                        showInfo={false}
                      />
                    </div>
                  </Space>
                </Col>
              </Row>
            </List.Item>
          )}
        />
      </Card>
    </div>
  );
};

export default Dashboard;
