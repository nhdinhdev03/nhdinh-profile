import {
  ArrowLeftOutlined,
  DashboardOutlined,
  HomeFilled,
  RobotOutlined,
  SearchOutlined,
} from "@ant-design/icons";
import { Button, Space, Typography } from "antd";
import { useTheme } from "contexts/ThemeContext";
import { useNavigate } from "react-router-dom";
import { ROUTES } from "router/routeConstants";
import "./AdminNotFound.scss";

const { Title, Text, Paragraph } = Typography;

const AdminNotFound = () => {
  const navigate = useNavigate();
  const { currentTheme } = useTheme();

  return (
    <div className={`admin-not-found-fullscreen theme-${currentTheme}`}>
      {/* Animated Background */}
      <div className="background-layer">
        <div className="gradient-orb orb-1"></div>
        <div className="gradient-orb orb-2"></div>
        <div className="gradient-orb orb-3"></div>
        <div className="grid-overlay"></div>
        <div className="particles">
          {[...Array(20)].map((_, i) => (
            <div
              key={i}
              className="particle"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                animationDelay: `${Math.random() * 5}s`,
                animationDuration: `${5 + Math.random() * 10}s`,
              }}
            ></div>
          ))}
        </div>
      </div>

      {/* Main Content */}
      <div className="content-container">
        <div className="not-found-card">
          {/* Illustration */}
          <div className="illustration-wrapper">
            <div className="robot-icon">
              <RobotOutlined />
            </div>
            <div className="search-icon">
              <SearchOutlined />
            </div>
          </div>

          {/* Status Code */}
          <div className="status-section">
            <div className="status-code">
              <span className="digit">4</span>
              <span className="digit middle">0</span>
              <span className="digit">4</span>
            </div>
            <div className="status-line"></div>
          </div>

          {/* Text Content */}
          <div className="text-content">
            <Title level={1} className="main-title">
              Page Not Found
            </Title>
            <Paragraph className="description">
              Oops! The page you're looking for seems to have wandered off.
              <br />
              Let's get you back on track.
            </Paragraph>
          </div>

          {/* Action Buttons */}
          <Space size="large" className="action-buttons" wrap>
            <Button
              type="primary"
              size="large"
              icon={<DashboardOutlined />}
              onClick={() => navigate(ROUTES.ADMIN_DASHBOARD)}
              className="primary-action"
            >
              Back to Dashboard
            </Button>
            <Button
              size="large"
              icon={<ArrowLeftOutlined />}
              onClick={() => navigate(-1)}
              className="secondary-action"
            >
              Go Back
            </Button>
            <Button
              size="large"
              icon={<HomeFilled />}
              onClick={() => navigate(ROUTES.HOME)}
              className="tertiary-action"
            >
              Home Page
            </Button>
          </Space>

          {/* Help Text */}
          <div className="help-section">
            <Text type="secondary" className="help-text">
              If you believe this is a mistake, please contact support or check
              the URL.
            </Text>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminNotFound;
