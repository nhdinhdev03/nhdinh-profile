import {
  ArrowDownOutlined,
  ArrowUpOutlined,
  CheckCircleOutlined,
  ClockCircleOutlined,
  CloudDownloadOutlined,
  DashboardOutlined,
  EyeOutlined,
  FireOutlined,
  InfoCircleOutlined,
  ProjectOutlined,
  SyncOutlined,
  TeamOutlined,
  ThunderboltOutlined,
  UserOutlined,
} from "@ant-design/icons";
import {
  Avatar,
  Button,
  Card,
  Col,
  Divider,
  List,
  Progress,
  Row,
  Segmented,
  Space,
  Statistic,
  Tag,
  Timeline,
  Tooltip,
  Typography,
  message,
} from "antd";
import { useEffect, useRef, useState } from "react";
import "./Dashboard.scss";

const { Text, Title } = Typography;

const Dashboard = () => {
  const [loading, setLoading] = useState(false);
  const [selectedRange, setSelectedRange] = useState("30d");
  const refreshTimeoutRef = useRef(null);

  useEffect(() => {
    return () => {
      if (refreshTimeoutRef.current) {
        clearTimeout(refreshTimeoutRef.current);
      }
    };
  }, []);

  const rangeOptions = [
    { label: "7 ngày", value: "7d" },
    { label: "30 ngày", value: "30d" },
    { label: "Quý", value: "quarter" },
    { label: "Năm", value: "year" },
  ];

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

  const completionRate = Math.round(
    (stats.activeProjects / stats.totalProjects) * 100
  );

  const performanceMetrics = [
    {
      key: "delivery",
      title: "Tỷ lệ hoàn thành sprint",
      value: completionRate,
      precision: 0,
      suffix: "%",
      target: 85,
      trend: 6.2,
      direction: "up",
      progress: completionRate,
      icon: ThunderboltOutlined,
      description: "Tăng trưởng ổn định qua 3 sprint",
    },
    {
      key: "quality",
      title: "Điểm hài lòng khách hàng",
      value: 4.8,
      precision: 1,
      suffix: "/5",
      target: 4.5,
      trend: 0.4,
      direction: "up",
      progress: 96,
      icon: CheckCircleOutlined,
      description: "Thu thập từ 320 phiếu khảo sát",
    },
    {
      key: "efficiency",
      title: "Hiệu suất triển khai",
      value: 87,
      precision: 0,
      suffix: "%",
      target: 90,
      trend: -1.8,
      direction: "down",
      progress: 87,
      icon: ProjectOutlined,
      description: "Cần tối ưu quy trình code review",
    },
  ];

  const systemHealth = {
    uptime: 99.97,
    responseTime: 320,
    incidents: 0,
    deploys: 12,
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

  const teamActivity = [
    {
      id: 1,
      name: "Nguyễn Hải Đình",
      initials: "ND",
      role: "Lead Developer",
      action: "Đã triển khai module phân tích real-time lên production.",
      time: "3 phút trước",
      status: "Triển khai",
      statusColor: "success",
      avatarColor: "#1d39c4",
    },
    {
      id: 2,
      name: "Phạm Gia Huy",
      initials: "GH",
      role: "Product Manager",
      action: "Chốt scope sprint tiếp theo cùng stakeholders.",
      time: "25 phút trước",
      status: "Lên kế hoạch",
      statusColor: "processing",
      avatarColor: "#722ed1",
    },
    {
      id: 3,
      name: "Trần Minh Thư",
      initials: "MT",
      role: "UX Researcher",
      action: "Hoàn thành user interview cho dự án AI Chatbot.",
      time: "1 giờ trước",
      status: "Nghiên cứu",
      statusColor: "geekblue",
      avatarColor: "#eb2f96",
    },
  ];

  const alerts = [
    {
      id: 1,
      title: "Tỷ lệ chuyển đổi mobile giảm 8%",
      description: "Theo dõi funnel thanh toán và chạy A/B test giao diện.",
      severity: "warning",
      time: "12 phút trước",
      icon: FireOutlined,
      label: "Ưu tiên cao",
    },
    {
      id: 2,
      title: "API tích hợp CRM sắp vượt ngưỡng",
      description: "Đề xuất mở rộng quota và tối ưu batch processing.",
      severity: "info",
      time: "36 phút trước",
      icon: InfoCircleOutlined,
      label: "Theo dõi",
    },
  ];

  const roadmap = [
    {
      id: 1,
      quarter: "Q4 2025",
      title: "Ra mắt AI trợ lý dự án",
      description: "Tự động hoá phân tích backlog và gợi ý ưu tiên.",
      tag: "Đang R&D",
      tagColor: "purple",
      color: "purple",
    },
    {
      id: 2,
      quarter: "Q1 2026",
      title: "Mở rộng marketplace plugin",
      description: "Kết nối với hệ sinh thái 12 nhà cung cấp đối tác.",
      tag: "Sắp triển khai",
      tagColor: "geekblue",
      color: "blue",
    },
    {
      id: 3,
      quarter: "Q2 2026",
      title: "Tích hợp phân tích dữ liệu nâng cao",
      description: "Realtime analytics với pipeline dữ liệu chuẩn hoá.",
      tag: "Lên kế hoạch",
      tagColor: "cyan",
      color: "cyan",
    },
  ];

  const severityColorMap = {
    info: "processing",
    warning: "warning",
    critical: "error",
    success: "success",
  };

  const selectedRangeLabel =
    rangeOptions.find((option) => option.value === selectedRange)?.label ??
    "30 ngày";

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

  const handleRefresh = () => {
    if (refreshTimeoutRef.current) {
      clearTimeout(refreshTimeoutRef.current);
    }
    setLoading(true);
    refreshTimeoutRef.current = setTimeout(() => {
      setLoading(false);
    }, 1200);
  };

  const handleExport = () => {
    message.success("Báo cáo đã được lên lịch xuất (mock)");
  };

  return (
    <div className="admin-dashboard">
      <div className="dashboard-header">
        <Space
          direction="vertical"
          size={4}
          className="dashboard-header__title"
        >
          <Title level={2} className="dashboard-heading">
            <DashboardOutlined /> Bảng điều khiển
          </Title>
          <Space size={12} wrap className="dashboard-header__meta">
            <Tag icon={<SyncOutlined spin />} color="processing">
              Live insights
            </Tag>
            <Text type="secondary">
              Tổng quan hoạt động hệ thống thời gian thực
            </Text>
          </Space>
        </Space>
        <Space size={12} wrap className="dashboard-header__actions">
          <Segmented
            options={rangeOptions}
            value={selectedRange}
            onChange={(value) => setSelectedRange(value.toString())}
          />
          <Tooltip title="Làm mới dữ liệu giả lập">
            <Button
              icon={<SyncOutlined spin={loading} />}
              onClick={handleRefresh}
              loading={loading}
            >
              Làm mới
            </Button>
          </Tooltip>
          <Tooltip title="Xuất báo cáo chi tiết">
            <Button
              type="primary"
              icon={<CloudDownloadOutlined />}
              onClick={handleExport}
            >
              Xuất báo cáo
            </Button>
          </Tooltip>
        </Space>
      </div>

      <Row gutter={[20, 20]} className="stats-row">
        <Col xs={24} sm={12} lg={6}>
          <Card
            className="stats-card glass-card stats-card-primary"
            hoverable
            bordered={false}
          >
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
          <Card
            className="stats-card glass-card stats-card-success"
            hoverable
            bordered={false}
          >
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
          <Card
            className="stats-card glass-card stats-card-warning"
            hoverable
            bordered={false}
          >
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
          <Card
            className="stats-card glass-card stats-card-info"
            hoverable
            bordered={false}
          >
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

      <Row gutter={[20, 20]} className="metrics-row">
        {performanceMetrics.map((metric) => {
          const Icon = metric.icon;
          const isPositive = metric.direction === "up";

          return (
            <Col xs={24} md={12} xl={8} key={metric.key}>
              <Card
                className="metric-card glass-card"
                hoverable
                bordered={false}
              >
                <Space direction="vertical" size={18} style={{ width: "100%" }}>
                  <Space
                    size={16}
                    align="start"
                    className="metric-card__header"
                  >
                    <div className="metric-card__icon">
                      <Icon />
                    </div>
                    <Statistic
                      title={metric.title}
                      value={metric.value}
                      precision={metric.precision}
                      suffix={metric.suffix}
                      valueStyle={{ fontWeight: 700 }}
                    />
                  </Space>
                  <div
                    className={`metric-card__trend ${
                      isPositive ? "up" : "down"
                    }`}
                  >
                    {isPositive ? <ArrowUpOutlined /> : <ArrowDownOutlined />}
                    <Text strong>{Math.abs(metric.trend)}%</Text>
                    <Text type="secondary">
                      so với mục tiêu {metric.target}
                      {metric.suffix}
                    </Text>
                  </div>
                  <Progress
                    percent={metric.progress}
                    showInfo={false}
                    strokeColor={isPositive ? "#52c41a" : "#fa541c"}
                  />
                  <Text type="secondary" className="metric-card__description">
                    {metric.description}
                  </Text>
                </Space>
              </Card>
            </Col>
          );
        })}
      </Row>

      <Row gutter={[20, 20]} align="stretch">
        <Col xs={24} xl={16}>
          <Card
            className="data-card glass-card project-card"
            bordered={false}
            hoverable
            title={
              <Space>
                <ProjectOutlined />
                <Title level={4} style={{ margin: 0 }}>
                  Dự án gần đây
                </Title>
              </Space>
            }
            extra={
              <Tag icon={<ClockCircleOutlined />} className="range-tag">
                {selectedRangeLabel}
              </Tag>
            }
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
                        size={10}
                        style={{ width: "100%" }}
                      >
                        <Space size={10} wrap>
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
        </Col>

        <Col xs={24} xl={8}>
          <Card
            className="data-card glass-card health-card"
            bordered={false}
            hoverable
          >
            <Space
              size={16}
              align="center"
              className="health-card__header"
              wrap
            >
              <div className="health-card__icon">
                <ThunderboltOutlined />
              </div>
              <Space direction="vertical" size={0} style={{ flex: 1 }}>
                <Title level={4} style={{ margin: 0 }}>
                  Sức khỏe hệ thống
                </Title>
                <Text type="secondary">Theo dõi realtime & uptime</Text>
              </Space>
              <Tag color="success">Ổn định</Tag>
            </Space>
            <Divider />
            <Row gutter={[16, 16]} className="health-card__metrics">
              <Col span={12}>
                <Statistic
                  title="Thời gian hoạt động"
                  value={systemHealth.uptime}
                  precision={2}
                  suffix="%"
                />
                <Progress
                  percent={systemHealth.uptime}
                  status="success"
                  showInfo={false}
                />
              </Col>
              <Col span={12}>
                <Statistic
                  title="Phản hồi trung bình"
                  value={systemHealth.responseTime}
                  suffix="ms"
                />
                <Tag color="processing" className="health-card__tag">
                  CDN tối ưu
                </Tag>
              </Col>
              <Col span={12}>
                <Statistic
                  title="Triển khai trong tháng"
                  value={systemHealth.deploys}
                  suffix=" lần"
                />
              </Col>
              <Col span={12}>
                <Statistic title="Sự cố" value={systemHealth.incidents} />
              </Col>
            </Row>
            <Divider dashed />
            <Space direction="vertical" size={8} className="health-card__notes">
              <Space size={8}>
                <CheckCircleOutlined className="success-icon" />
                <Text type="secondary">0 sự cố trong 90 ngày gần nhất</Text>
              </Space>
              <Space size={8}>
                <SyncOutlined className="processing-icon" spin />
                <Text type="secondary">
                  CI/CD đồng bộ lần cuối 12 giờ trước
                </Text>
              </Space>
            </Space>
          </Card>
        </Col>
      </Row>

      <Row gutter={[20, 20]} align="stretch">
        <Col xs={24} xl={16}>
          <Card
            className="data-card glass-card team-card"
            bordered={false}
            hoverable
            title={
              <Space>
                <TeamOutlined />
                <Title level={4} style={{ margin: 0 }}>
                  Hoạt động nhóm
                </Title>
              </Space>
            }
          >
            <List
              loading={loading}
              dataSource={teamActivity}
              renderItem={(activity) => (
                <List.Item className="team-activity-item" key={activity.id}>
                  <List.Item.Meta
                    avatar={
                      <Avatar style={{ backgroundColor: activity.avatarColor }}>
                        {activity.initials}
                      </Avatar>
                    }
                    title={
                      <Space size={8} wrap>
                        <Text strong>{activity.name}</Text>
                        <Tag color="default">{activity.role}</Tag>
                        <Tag color={activity.statusColor}>
                          {activity.status}
                        </Tag>
                      </Space>
                    }
                    description={
                      <Space direction="vertical" size={4}>
                        <Text>{activity.action}</Text>
                        <Text type="secondary" className="small">
                          {activity.time}
                        </Text>
                      </Space>
                    }
                  />
                </List.Item>
              )}
            />
          </Card>
        </Col>

        <Col xs={24} xl={8}>
          <Space direction="vertical" size={20} style={{ width: "100%" }}>
            <Card
              className="data-card glass-card alerts-card"
              bordered={false}
              hoverable
              title={
                <Space>
                  <FireOutlined />
                  <Title level={5} style={{ margin: 0 }}>
                    Cảnh báo thông minh
                  </Title>
                </Space>
              }
            >
              <List
                dataSource={alerts}
                renderItem={(alert) => {
                  const Icon = alert.icon;

                  return (
                    <List.Item className="alert-item" key={alert.id}>
                      <Space align="start" size={12}>
                        <span className={`alert-item__badge ${alert.severity}`}>
                          <Icon />
                        </span>
                        <Space direction="vertical" size={6}>
                          <Space size={8} wrap>
                            <Text strong>{alert.title}</Text>
                            <Tag color={severityColorMap[alert.severity]}>
                              {alert.label}
                            </Tag>
                          </Space>
                          <Text type="secondary" className="small">
                            {alert.description}
                          </Text>
                          <Text type="secondary" className="small">
                            {alert.time}
                          </Text>
                        </Space>
                      </Space>
                    </List.Item>
                  );
                }}
              />
            </Card>

            <Card
              className="data-card glass-card roadmap-card"
              bordered={false}
              hoverable
              title={
                <Space>
                  <ProjectOutlined />
                  <Title level={5} style={{ margin: 0 }}>
                    Lộ trình chiến lược
                  </Title>
                </Space>
              }
            >
              <Timeline
                items={roadmap.map((item) => ({
                  color: item.color,
                  key: item.id,
                  children: (
                    <Space
                      direction="vertical"
                      size={4}
                      className="roadmap-item"
                    >
                      <Space size={8} wrap>
                        <Text strong>{item.title}</Text>
                        <Tag color={item.tagColor}>{item.tag}</Tag>
                      </Space>
                      <Text type="secondary" className="small">
                        {item.description}
                      </Text>
                      <Text
                        type="secondary"
                        className="small roadmap-item__time"
                      >
                        {item.quarter}
                      </Text>
                    </Space>
                  ),
                }))}
              />
            </Card>
          </Space>
        </Col>
      </Row>
    </div>
  );
};

export default Dashboard;
