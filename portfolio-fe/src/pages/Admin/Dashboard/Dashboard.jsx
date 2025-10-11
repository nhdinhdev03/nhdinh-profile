import {
  ArrowDownOutlined,
  ArrowUpOutlined,
  BarChartOutlined,
  BulbOutlined,
  CalendarOutlined,
  CheckCircleOutlined,
  ClockCircleOutlined,
  CodeOutlined,
  DashboardOutlined,
  DownloadOutlined,
  EyeOutlined,
  FireOutlined,
  GithubOutlined,
  HeartOutlined,
  LineChartOutlined,
  MoreOutlined,
  PieChartOutlined,
  ProjectOutlined,
  QuestionCircleOutlined,
  ReloadOutlined,
  SettingOutlined,
  ShareAltOutlined,
  SyncOutlined,
  TeamOutlined,
  ThunderboltOutlined,
  TrophyOutlined,
  UserOutlined,
} from "@ant-design/icons";
import {
  Alert,
  Avatar,
  Badge,
  Button,
  Card,
  Col,
  Dropdown,
  Flex,
  FloatButton,
  List,
  Progress,
  Row,
  Space,
  Statistic,
  Tabs,
  Tag,
  Timeline,
  Tooltip,
  Typography,
} from "antd";
import { useState } from "react";

import "./Dashboard.scss";

const { Text, Title } = Typography;

const Dashboard = () => {
  const [activeTab, setActiveTab] = useState("overview");
  const [loading, setLoading] = useState(false);

  // Enhanced mock data
  const stats = {
    totalProjects: 24,
    activeProjects: 18,
    completedProjects: 15,
    totalViews: 12750,
    monthlyViews: 3250,
    downloads: 890,
    growth: {
      projects: 15.5,
      views: 12.3,
      downloads: -2.1,
      completion: 8.7,
    },
  };

  const recentProjects = [
    {
      id: 1,
      name: "E-commerce Platform",
      status: "completed",
      completion: 100,
      dueDate: "2024-01-15",
      views: 1250,
      technologies: ["React", "Node.js", "MongoDB"],
      priority: "high",
      team: ["Alice", "Bob", "Charlie"],
      lastUpdate: "2 giờ trước",
    },
    {
      id: 2,
      name: "Mobile App UI",
      status: "in-progress",
      completion: 75,
      dueDate: "2024-02-20",
      views: 890,
      technologies: ["React Native", "TypeScript"],
      priority: "medium",
      team: ["David", "Eve"],
      lastUpdate: "1 ngày trước",
    },
    {
      id: 3,
      name: "Dashboard Analytics",
      status: "in-progress",
      completion: 60,
      dueDate: "2024-03-10",
      views: 620,
      technologies: ["Vue.js", "Chart.js", "Firebase"],
      priority: "high",
      team: ["Frank", "Grace", "Henry"],
      lastUpdate: "3 giờ trước",
    },
    {
      id: 4,
      name: "AI Chatbot Integration",
      status: "pending",
      completion: 25,
      dueDate: "2024-04-15",
      views: 340,
      technologies: ["Python", "TensorFlow", "FastAPI"],
      priority: "low",
      team: ["Ivy", "Jack"],
      lastUpdate: "1 tuần trước",
    },
  ];

  const activities = [
    {
      type: "project",
      title: "Hoàn thành dự án E-commerce Platform",
      time: "2 giờ trước",
      status: "success",
      icon: "trophy",
      user: "Alice Thompson",
      avatar: "https://api.dicebear.com/7.x/miniavs/svg?seed=Alice",
    },
    {
      type: "view",
      title: "Dự án Mobile App UI nhận 50 lượt xem mới",
      time: "4 giờ trước",
      status: "processing",
      icon: "eye",
      user: "System",
      avatar: null,
    },
    {
      type: "upload",
      title: "Tải lên 15 hình ảnh mới cho Dashboard Analytics",
      time: "6 giờ trước",
      status: "default",
      icon: "upload",
      user: "Bob Wilson",
      avatar: "https://api.dicebear.com/7.x/miniavs/svg?seed=Bob",
    },
    {
      type: "feature",
      title: "Thêm tính năng mới: Export to PDF & Excel",
      time: "1 ngày trước",
      status: "success",
      icon: "bulb",
      user: "Charlie Brown",
      avatar: "https://api.dicebear.com/7.x/miniavs/svg?seed=Charlie",
    },
    {
      type: "deployment",
      title: "Deploy thành công version 2.1.0 lên production",
      time: "2 ngày trước",
      status: "success",
      icon: "rocket",
      user: "DevOps Team",
      avatar: null,
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

  const getPriorityColor = (priority) => {
    switch (priority) {
      case "high":
        return "red";
      case "medium":
        return "orange";
      case "low":
        return "green";
      default:
        return "default";
    }
  };

  const getPriorityIcon = (priority) => {
    switch (priority) {
      case "high":
        return <FireOutlined />;
      case "medium":
        return <ThunderboltOutlined />;
      case "low":
        return <HeartOutlined />;
      default:
        return null;
    }
  };

  const getActivityIcon = (type) => {
    switch (type) {
      case "project":
        return <TrophyOutlined style={{ color: "#52c41a" }} />;
      case "view":
        return <EyeOutlined style={{ color: "#1890ff" }} />;
      case "upload":
        return <DownloadOutlined style={{ color: "#fa8c16" }} />;
      case "feature":
        return <BulbOutlined style={{ color: "#722ed1" }} />;
      case "deployment":
        return <CodeOutlined style={{ color: "#eb2f96" }} />;
      default:
        return <UserOutlined style={{ color: "#722ed1" }} />;
    }
  };

  const refreshData = () => {
    setLoading(true);
    // Simulate API call
    setTimeout(() => {
      setLoading(false);
    }, 1000);
  };

  const tabItems = [
    {
      key: "overview",
      label: "Tổng quan",
      children: (
        <>
          {/* Enhanced Statistics Cards */}
          <Row gutter={[16, 16]} style={{ marginBottom: 24 }}>
            <Col xs={24} sm={12} lg={6}>
              <Card
                hoverable
                className="stats-card stats-card-primary"
                styles={{
                  body: { padding: "20px" },
                }}
              >
                <Flex justify="space-between" align="center">
                  <div>
                    <Statistic
                      title="Tổng số dự án"
                      value={stats.totalProjects}
                      valueStyle={{
                        color: "#1890ff",
                        fontSize: "28px",
                        fontWeight: "bold",
                      }}
                    />
                    <Flex align="center" gap={4} style={{ marginTop: 8 }}>
                      <ArrowUpOutlined
                        style={{ color: "#52c41a", fontSize: "12px" }}
                      />
                      <Text type="success" style={{ fontSize: "12px" }}>
                        +{stats.growth.projects}% so với tháng trước
                      </Text>
                    </Flex>
                  </div>
                  <div
                    style={{
                      width: 48,
                      height: 48,
                      borderRadius: 12,
                      background:
                        "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                    }}
                  >
                    <ProjectOutlined
                      style={{ color: "white", fontSize: "24px" }}
                    />
                  </div>
                </Flex>
              </Card>
            </Col>

            <Col xs={24} sm={12} lg={6}>
              <Card
                hoverable
                className="stats-card stats-card-success"
                styles={{
                  body: { padding: "20px" },
                }}
              >
                <Flex justify="space-between" align="center">
                  <div>
                    <Statistic
                      title="Dự án đang hoạt động"
                      value={stats.activeProjects}
                      valueStyle={{
                        color: "#52c41a",
                        fontSize: "28px",
                        fontWeight: "bold",
                      }}
                    />
                    <Flex align="center" gap={4} style={{ marginTop: 8 }}>
                      <ArrowUpOutlined
                        style={{ color: "#52c41a", fontSize: "12px" }}
                      />
                      <Text type="success" style={{ fontSize: "12px" }}>
                        +{stats.growth.completion}% hiệu suất
                      </Text>
                    </Flex>
                  </div>
                  <div
                    style={{
                      width: 48,
                      height: 48,
                      borderRadius: 12,
                      background:
                        "linear-gradient(135deg, #52c41a 0%, #73d13d 100%)",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                    }}
                  >
                    <SyncOutlined
                      style={{ color: "white", fontSize: "24px" }}
                    />
                  </div>
                </Flex>
              </Card>
            </Col>

            <Col xs={24} sm={12} lg={6}>
              <Card
                hoverable
                className="stats-card stats-card-purple"
                styles={{
                  body: { padding: "20px" },
                }}
              >
                <Flex justify="space-between" align="center">
                  <div>
                    <Statistic
                      title="Lượt xem tháng này"
                      value={stats.monthlyViews}
                      valueStyle={{
                        color: "#722ed1",
                        fontSize: "28px",
                        fontWeight: "bold",
                      }}
                    />
                    <Flex align="center" gap={4} style={{ marginTop: 8 }}>
                      <ArrowUpOutlined
                        style={{ color: "#52c41a", fontSize: "12px" }}
                      />
                      <Text type="success" style={{ fontSize: "12px" }}>
                        +{stats.growth.views}% so với tháng trước
                      </Text>
                    </Flex>
                  </div>
                  <div
                    style={{
                      width: 48,
                      height: 48,
                      borderRadius: 12,
                      background:
                        "linear-gradient(135deg, #722ed1 0%, #9254de 100%)",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                    }}
                  >
                    <EyeOutlined style={{ color: "white", fontSize: "24px" }} />
                  </div>
                </Flex>
              </Card>
            </Col>

            <Col xs={24} sm={12} lg={6}>
              <Card
                hoverable
                className="stats-card stats-card-orange"
                styles={{
                  body: { padding: "20px" },
                }}
              >
                <Flex justify="space-between" align="center">
                  <div>
                    <Statistic
                      title="Tổng lượt tải xuống"
                      value={stats.downloads}
                      valueStyle={{
                        color: "#fa8c16",
                        fontSize: "28px",
                        fontWeight: "bold",
                      }}
                    />
                    <Flex align="center" gap={4} style={{ marginTop: 8 }}>
                      <ArrowDownOutlined
                        style={{ color: "#ff4d4f", fontSize: "12px" }}
                      />
                      <Text type="danger" style={{ fontSize: "12px" }}>
                        {stats.growth.downloads}% so với tháng trước
                      </Text>
                    </Flex>
                  </div>
                  <div
                    style={{
                      width: 48,
                      height: 48,
                      borderRadius: 12,
                      background:
                        "linear-gradient(135deg, #fa8c16 0%, #ffa940 100%)",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                    }}
                  >
                    <DownloadOutlined
                      style={{ color: "white", fontSize: "24px" }}
                    />
                  </div>
                </Flex>
              </Card>
            </Col>
          </Row>

          <Row gutter={[16, 16]}>
            {/* Enhanced Recent Projects */}
            <Col xs={24} lg={16}>
              <Card
                title={
                  <Flex justify="space-between" align="center">
                    <div>
                      <Title level={4} style={{ margin: 0 }}>
                        Dự án gần đây
                      </Title>
                      <Text type="secondary" style={{ fontSize: "14px" }}>
                        {recentProjects.length} dự án đang được theo dõi
                      </Text>
                    </div>
                    <Space>
                      <Button type="link" size="small">
                        Xem tất cả
                      </Button>
                      <Button
                        type="text"
                        icon={<SettingOutlined />}
                        size="small"
                      />
                    </Space>
                  </Flex>
                }
                className="projects-card"
              >
                <List
                  loading={loading}
                  dataSource={recentProjects}
                  renderItem={(project) => (
                    <List.Item
                      className="project-item"
                      actions={[
                        <Dropdown
                          key="actions"
                          menu={{
                            items: [
                              {
                                key: "view",
                                icon: <EyeOutlined />,
                                label: "Xem chi tiết",
                              },
                              {
                                key: "edit",
                                icon: <SettingOutlined />,
                                label: "Chỉnh sửa",
                              },
                              {
                                key: "share",
                                icon: <ShareAltOutlined />,
                                label: "Chia sẻ",
                              },
                              {
                                key: "github",
                                icon: <GithubOutlined />,
                                label: "Xem trên GitHub",
                              },
                            ],
                          }}
                        >
                          <Button type="text" icon={<MoreOutlined />} />
                        </Dropdown>,
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
                              style={{
                                background:
                                  project.status === "completed"
                                    ? "linear-gradient(135deg, #52c41a 0%, #389e0d 100%)"
                                    : project.status === "in-progress"
                                    ? "linear-gradient(135deg, #1890ff 0%, #096dd9 100%)"
                                    : "linear-gradient(135deg, #faad14 0%, #d48806 100%)",
                              }}
                            />
                          </Badge>
                        }
                        title={
                          <Space
                            direction="vertical"
                            size={4}
                            style={{ width: "100%" }}
                          >
                            <Flex justify="space-between" align="center">
                              <Text strong style={{ fontSize: "16px" }}>
                                {project.name}
                              </Text>
                              <Tag
                                color={getPriorityColor(project.priority)}
                                icon={getPriorityIcon(project.priority)}
                              >
                                {project.priority === "high"
                                  ? "Cao"
                                  : project.priority === "medium"
                                  ? "Trung bình"
                                  : "Thấp"}
                              </Tag>
                            </Flex>
                            <div>
                              {project.technologies.map((tech) => (
                                <Tag
                                  key={tech}
                                  size="small"
                                  color="blue"
                                  style={{ margin: "2px 4px 2px 0" }}
                                >
                                  {tech}
                                </Tag>
                              ))}
                            </div>
                          </Space>
                        }
                        description={
                          <Space
                            direction="vertical"
                            size={8}
                            style={{ width: "100%" }}
                          >
                            <Flex justify="space-between" align="center">
                              <Space>
                                <Text type="secondary">
                                  {project.status === "completed"
                                    ? "Hoàn thành"
                                    : project.status === "in-progress"
                                    ? "Đang thực hiện"
                                    : "Chờ xử lý"}
                                </Text>
                                <Text type="secondary">•</Text>
                                <Text type="secondary">
                                  {project.views} lượt xem
                                </Text>
                              </Space>
                              <Space>
                                <TeamOutlined style={{ color: "#8c8c8c" }} />
                                <Text type="secondary">
                                  {project.team.length} thành viên
                                </Text>
                              </Space>
                            </Flex>

                            <div>
                              <Flex
                                justify="space-between"
                                align="center"
                                style={{ marginBottom: 4 }}
                              >
                                <Text
                                  type="secondary"
                                  style={{ fontSize: "12px" }}
                                >
                                  Tiến độ: {project.completion}%
                                </Text>
                                <Text
                                  type="secondary"
                                  style={{ fontSize: "12px" }}
                                >
                                  Cập nhật: {project.lastUpdate}
                                </Text>
                              </Flex>
                              <Progress
                                percent={project.completion}
                                size="small"
                                status={
                                  project.completion === 100
                                    ? "success"
                                    : "active"
                                }
                                strokeColor={
                                  project.completion === 100
                                    ? "#52c41a"
                                    : project.completion >= 70
                                    ? "#1890ff"
                                    : project.completion >= 40
                                    ? "#faad14"
                                    : "#ff4d4f"
                                }
                              />
                            </div>

                            <Flex justify="space-between" align="center">
                              <Space size={4}>
                                <CalendarOutlined
                                  style={{ color: "#8c8c8c", fontSize: "12px" }}
                                />
                                <Text
                                  type="secondary"
                                  style={{ fontSize: "12px" }}
                                >
                                  Deadline:{" "}
                                  {new Date(project.dueDate).toLocaleDateString(
                                    "vi-VN"
                                  )}
                                </Text>
                              </Space>
                              <Avatar.Group size="small" max={{ count: 3 }}>
                                {project.team.map((member, index) => (
                                  <Tooltip key={index} title={member}>
                                    <Avatar
                                      size="small"
                                      src={`https://api.dicebear.com/7.x/miniavs/svg?seed=${member}`}
                                    />
                                  </Tooltip>
                                ))}
                              </Avatar.Group>
                            </Flex>
                          </Space>
                        }
                      />
                    </List.Item>
                  )}
                />
              </Card>
            </Col>

            {/* Enhanced Activity Timeline */}
            <Col xs={24} lg={8}>
              <Card
                title={
                  <Flex justify="space-between" align="center">
                    <div>
                      <Title level={4} style={{ margin: 0 }}>
                        Hoạt động gần đây
                      </Title>
                      <Text type="secondary" style={{ fontSize: "14px" }}>
                        Cập nhật trong thời gian thực
                      </Text>
                    </div>
                    <Badge status="processing" />
                  </Flex>
                }
                className="activity-card"
                extra={
                  <Button type="text" icon={<SettingOutlined />} size="small" />
                }
              >
                <Timeline
                  items={activities.map((activity, index) => ({
                    key: index,
                    dot: getActivityIcon(activity.type),
                    children: (
                      <div className="activity-item">
                        <Flex
                          justify="space-between"
                          align="start"
                          style={{ marginBottom: 8 }}
                        >
                          <div style={{ flex: 1 }}>
                            <Text
                              strong
                              style={{ fontSize: "14px", display: "block" }}
                            >
                              {activity.title}
                            </Text>
                            <Space size={8} style={{ marginTop: 4 }}>
                              {activity.user && (
                                <Flex align="center" gap={4}>
                                  <Avatar
                                    size={16}
                                    src={activity.avatar}
                                    icon={
                                      activity.avatar ? null : <UserOutlined />
                                    }
                                  />
                                  <Text
                                    type="secondary"
                                    style={{ fontSize: "12px" }}
                                  >
                                    {activity.user}
                                  </Text>
                                </Flex>
                              )}
                              <Text
                                type="secondary"
                                style={{ fontSize: "12px" }}
                              >
                                {activity.time}
                              </Text>
                            </Space>
                          </div>
                          <Badge
                            status={activity.status}
                            style={{ marginTop: 2 }}
                          />
                        </Flex>
                      </div>
                    ),
                  }))}
                />

                <div style={{ textAlign: "center", marginTop: 16 }}>
                  <Button type="link" size="small">
                    Xem tất cả hoạt động
                  </Button>
                </div>
              </Card>
            </Col>
          </Row>
        </>
      ),
    },
    {
      key: "analytics",
      label: "Thống kê chi tiết",
      children: (
        <>
          <Alert
            message="Thống kê chi tiết"
            description="Trang này sẽ hiển thị các biểu đồ và báo cáo chi tiết về hiệu suất dự án, lượt truy cập, và các chỉ số quan trọng khác."
            type="info"
            showIcon
            style={{ marginBottom: 24 }}
          />

          <Row gutter={[16, 16]}>
            <Col xs={24} md={12}>
              <Card
                title={
                  <Flex align="center" gap={8}>
                    <LineChartOutlined style={{ color: "#1890ff" }} />
                    <span>Lượt xem theo thời gian</span>
                  </Flex>
                }
                extra={
                  <Space>
                    <Button size="small">7 ngày</Button>
                    <Button size="small" type="primary">
                      30 ngày
                    </Button>
                    <Button size="small">90 ngày</Button>
                  </Space>
                }
              >
                <div
                  style={{
                    height: 250,
                    background:
                      "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
                    borderRadius: 8,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    color: "white",
                    fontSize: "16px",
                  }}
                >
                  📈 Biểu đồ Line Chart
                </div>
              </Card>
            </Col>

            <Col xs={24} md={12}>
              <Card
                title={
                  <Flex align="center" gap={8}>
                    <PieChartOutlined style={{ color: "#52c41a" }} />
                    <span>Phân bố dự án theo trạng thái</span>
                  </Flex>
                }
                extra={
                  <Button size="small" icon={<DownloadOutlined />}>
                    Xuất
                  </Button>
                }
              >
                <div
                  style={{
                    height: 250,
                    background:
                      "linear-gradient(135deg, #11998e 0%, #38ef7d 100%)",
                    borderRadius: 8,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    color: "white",
                    fontSize: "16px",
                  }}
                >
                  🥧 Biểu đồ Pie Chart
                </div>
              </Card>
            </Col>

            <Col xs={24}>
              <Card
                title={
                  <Flex align="center" gap={8}>
                    <BarChartOutlined style={{ color: "#722ed1" }} />
                    <span>Hiệu suất team theo tháng</span>
                  </Flex>
                }
                extra={
                  <Space>
                    <Button size="small" icon={<QuestionCircleOutlined />}>
                      Trợ giúp
                    </Button>
                    <Button size="small" type="primary">
                      Cài đặt
                    </Button>
                  </Space>
                }
              >
                <div
                  style={{
                    height: 300,
                    background:
                      "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
                    borderRadius: 8,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    color: "white",
                    fontSize: "16px",
                  }}
                >
                  📊 Biểu đồ Bar Chart
                </div>
              </Card>
            </Col>
          </Row>
        </>
      ),
    },
  ];

  return (
    <div className="admin-dashboard">
      {/* Enhanced Header Card */}
      <Card
        className="dashboard-header-card"
        style={{
          marginBottom: "24px",
          borderRadius: "16px",
          background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
          border: "none",
          overflow: "hidden",
        }}
        styles={{ body: { padding: "32px" } }}
      >
        <Row justify="space-between" align="middle">
          <Col xs={24} lg={16}>
            <Space direction="vertical" size="small">
              <Space align="center">
                <Avatar
                  size={48}
                  icon={<DashboardOutlined />}
                  className="header-avatar"
                  style={{
                    backgroundColor: "rgba(255,255,255,0.2)",
                    color: "white",
                    backdropFilter: "blur(10px)",
                  }}
                />
                <div>
                  <Title level={2} style={{ color: "white", margin: 0 }}>
                    Dashboard Quản Trị
                  </Title>
                  <Text
                    style={{ color: "rgba(255,255,255,0.8)", fontSize: "16px" }}
                  >
                    Tổng quan về hoạt động và thống kê hệ thống
                  </Text>
                </div>
              </Space>
            </Space>
          </Col>

          <Col xs={24} lg={8} style={{ textAlign: "right" }}>
            <Space direction="vertical" align="end" size="middle">
              <Space>
                <Badge status="processing" />
                <Text
                  style={{ color: "rgba(255,255,255,0.9)", fontSize: "14px" }}
                >
                  Hệ thống đang hoạt động
                </Text>
              </Space>

              <Button.Group className="header-actions">
                <Tooltip title="Làm mới dữ liệu dashboard">
                  <Button
                    type="primary"
                    ghost
                    icon={<ReloadOutlined />}
                    onClick={refreshData}
                    loading={loading}
                    style={{
                      borderColor: "white",
                      color: "white",
                      backgroundColor: "rgba(255,255,255,0.1)",
                      backdropFilter: "blur(10px)",
                    }}
                  >
                    {loading ? "Đang tải..." : "Làm mới"}
                  </Button>
                </Tooltip>
                <Tooltip title="Xem báo cáo chi tiết">
                  <Button
                    type="primary"
                    ghost
                    icon={<BarChartOutlined />}
                    onClick={() => setActiveTab("analytics")}
                    style={{
                      borderColor: "white",
                      color: "white",
                      backgroundColor: "rgba(255,255,255,0.1)",
                      backdropFilter: "blur(10px)",
                    }}
                  >
                    Báo cáo
                  </Button>
                </Tooltip>
              </Button.Group>
            </Space>
          </Col>
        </Row>
      </Card>

      <Tabs
        activeKey={activeTab}
        onChange={setActiveTab}
        items={tabItems}
        size="large"
        tabBarStyle={{ marginBottom: 24 }}
      />

      {/* Float Button for quick actions */}
      <FloatButton.Group
        trigger="hover"
        type="primary"
        style={{ right: 24 }}
        icon={<QuestionCircleOutlined />}
      >
        <FloatButton icon={<ProjectOutlined />} tooltip="Thêm dự án mới" />
        <FloatButton icon={<DownloadOutlined />} tooltip="Xuất báo cáo" />
        <FloatButton
          icon={<SyncOutlined />}
          tooltip="Làm mới dữ liệu"
          onClick={refreshData}
        />
      </FloatButton.Group>
    </div>
  );
};

export default Dashboard;
