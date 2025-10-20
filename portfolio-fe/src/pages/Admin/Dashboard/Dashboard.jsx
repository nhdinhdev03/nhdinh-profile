import {
  ArrowDownOutlined,
  ArrowUpOutlined,
  CheckCircleOutlined,
  ClockCircleOutlined,
  DashboardOutlined,
  DownloadOutlined,
  EyeOutlined,
  ProjectOutlined,
  SyncOutlined,
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

  // Mock data
  const stats = {
    totalProjects: 24,
    activeProjects: 18,
    monthlyViews: 3250,
    downloads: 890,
    growth: {
      projects: 15.5,
      views: 12.3,
      downloads: -2.1,
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

      {/* Statistics Cards */}
      <Row gutter={[16, 16]} style={{ marginBottom: 24 }}>
        <Col xs={24} sm={12} lg={6}>
          <Card className="stats-card">
            <Statistic
              title="Tổng số dự án"
              value={stats.totalProjects}
              prefix={<ProjectOutlined />}
              suffix={
                <Tag color="green" icon={<ArrowUpOutlined />}>
                  +{stats.growth.projects}%
                </Tag>
              }
            />
          </Card>
        </Col>

        <Col xs={24} sm={12} lg={6}>
          <Card className="stats-card">
            <Statistic
              title="Dự án đang hoạt động"
              value={stats.activeProjects}
              prefix={<SyncOutlined />}
              valueStyle={{ color: "#52c41a" }}
            />
          </Card>
        </Col>

        <Col xs={24} sm={12} lg={6}>
          <Card className="stats-card">
            <Statistic
              title="Lượt xem tháng này"
              value={stats.monthlyViews}
              prefix={<EyeOutlined />}
              suffix={
                <Tag color="green" icon={<ArrowUpOutlined />}>
                  +{stats.growth.views}%
                </Tag>
              }
            />
          </Card>
        </Col>

        <Col xs={24} sm={12} lg={6}>
          <Card className="stats-card">
            <Statistic
              title="Lượt tải xuống"
              value={stats.downloads}
              prefix={<DownloadOutlined />}
              suffix={
                <Tag color="red" icon={<ArrowDownOutlined />}>
                  {stats.growth.downloads}%
                </Tag>
              }
            />
          </Card>
        </Col>
      </Row>

      {/* Recent Projects */}
      <Card
        title={<Title level={4}>Dự án gần đây</Title>}
        className="data-card"
      >
        <List
          loading={loading}
          dataSource={recentProjects}
          renderItem={(project) => (
            <List.Item>
              <List.Item.Meta
                avatar={getStatusIcon(project.status)}
                title={
                  <Space direction="vertical" size={4} style={{ width: "100%" }}>
                    <Space>
                      <Text strong>{project.name}</Text>
                      <Tag color={getStatusColor(project.status)}>
                        {getStatusText(project.status)}
                      </Tag>
                    </Space>
                    <Space size={4} wrap>
                      {project.technologies.map((tech) => (
                        <Tag key={tech} color="blue">
                          {tech}
                        </Tag>
                      ))}
                    </Space>
                  </Space>
                }
                description={
                  <Space direction="vertical" size={8} style={{ width: "100%" }}>
                    <Space>
                      <Text type="secondary">{project.views} lượt xem</Text>
                    </Space>
                    <div>
                      <Text type="secondary" style={{ fontSize: "12px" }}>
                        Tiến độ: {project.completion}%
                      </Text>
                      <Progress
                        percent={project.completion}
                        size="small"
                        status={project.completion === 100 ? "success" : "active"}
                        style={{ marginTop: 4 }}
                      />
                    </div>
                  </Space>
                }
              />
            </List.Item>
          )}
        />
      </Card>
    </div>
  );
};

export default Dashboard;
