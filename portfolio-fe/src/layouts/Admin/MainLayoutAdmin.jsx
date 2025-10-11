import {
  BellOutlined,
  DashboardOutlined,
  EditOutlined,
  LogoutOutlined,
  MenuFoldOutlined,
  MenuOutlined,
  MenuUnfoldOutlined,
  MessageOutlined,
  ProjectOutlined,
  QuestionCircleOutlined,
  RocketOutlined,
  SearchOutlined,
  SettingOutlined,
  StarOutlined,
  TeamOutlined,
  ToolOutlined,
  TranslationOutlined,
  UserOutlined,
} from "@ant-design/icons";
import {
  Avatar,
  Badge,
  Button,
  Dropdown,
  Input,
  Layout,
  Menu,
  Progress,
  Space,
  Tooltip,
  Typography,
} from "antd";
import ThemeToggle from "components/ThemeToggle/ThemeToggle";
import { useTheme } from "contexts/ThemeContext";
import { useEffect, useState } from "react";
import { Outlet, useLocation, useNavigate } from "react-router-dom";
import { ROUTES } from "router/routeConstants";
import "./MainLayoutAdmin.scss";

const { Header, Sider, Content } = Layout;
const { Title, Text } = Typography;

const MainLayoutAdmin = () => {
  const [collapsed, setCollapsed] = useState(false);
  const [searchVisible, setSearchVisible] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const { currentTheme } = useTheme();

  // Scroll detection for header effect
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Mock notifications
  const notificationCount = 5;

  const menuItems = [
    {
      key: ROUTES.ADMIN_DASHBOARD,
      icon: <DashboardOutlined />,
      label: "Dashboard",
      onClick: () => navigate(ROUTES.ADMIN_DASHBOARD),
    },
    {
      key: "hero",
      icon: <StarOutlined />,
      label: "Hero Section",
      children: [
        {
          key: ROUTES.ADMIN_HERO,
          label: "Hero Management",
          onClick: () => navigate(ROUTES.ADMIN_HERO),
        },
        {
          key: ROUTES.ADMIN_HERO_TRANSLATIONS,
          icon: <TranslationOutlined />,
          label: "Translations",
          onClick: () => navigate(ROUTES.ADMIN_HERO_TRANSLATIONS),
        },
        {
          key: ROUTES.ADMIN_HERO_SUBHEADINGS,
          icon: <MenuOutlined />,
          label: "Subheadings",
          onClick: () => navigate(ROUTES.ADMIN_HERO_SUBHEADINGS),
        },
      ],
    },
    {
      key: "projects",
      icon: <ProjectOutlined />,
      label: "Projects",
      children: [
        {
          key: ROUTES.ADMIN_PROJECTS,
          label: "Project Management",
          onClick: () => navigate(ROUTES.ADMIN_PROJECTS),
        },
        {
          key: ROUTES.ADMIN_PROJECT_CATEGORIES,
          label: "Categories",
          onClick: () => navigate(ROUTES.ADMIN_PROJECT_CATEGORIES),
        },
        {
          key: ROUTES.ADMIN_PROJECT_TAGS,
          label: "Tags",
          onClick: () => navigate(ROUTES.ADMIN_PROJECT_TAGS),
        },
        {
          key: ROUTES.ADMIN_PROJECT_TRANSLATIONS,
          icon: <TranslationOutlined />,
          label: "Translations",
          onClick: () => navigate(ROUTES.ADMIN_PROJECT_TRANSLATIONS),
        },
      ],
    },
    {
      key: "blog",
      icon: <EditOutlined />,
      label: "Blog",
      children: [
        {
          key: ROUTES.ADMIN_BLOG,
          label: "Blog Management",
          onClick: () => navigate(ROUTES.ADMIN_BLOG),
        },
        {
          key: ROUTES.ADMIN_BLOG_POSTS,
          label: "Posts",
          onClick: () => navigate(ROUTES.ADMIN_BLOG_POSTS),
        },
        {
          key: ROUTES.ADMIN_BLOG_TAGS,
          label: "Tags",
          onClick: () => navigate(ROUTES.ADMIN_BLOG_TAGS),
        },
        {
          key: ROUTES.ADMIN_BLOG_TRANSLATIONS,
          icon: <TranslationOutlined />,
          label: "Translations",
          onClick: () => navigate(ROUTES.ADMIN_BLOG_TRANSLATIONS),
        },
      ],
    },
    {
      key: "contact",
      icon: <MessageOutlined />,
      label: "Contact",
      children: [
        {
          key: ROUTES.ADMIN_CONTACT,
          label: "Contact Management",
          onClick: () => navigate(ROUTES.ADMIN_CONTACT),
        },
        {
          key: ROUTES.ADMIN_CONTACT_MESSAGES,
          label: "Messages",
          onClick: () => navigate(ROUTES.ADMIN_CONTACT_MESSAGES),
        },
      ],
    },
    {
      key: "profile",
      icon: <UserOutlined />,
      label: "Profile",
      children: [
        {
          key: ROUTES.ADMIN_PROFILE,
          label: "Profile Management",
          onClick: () => navigate(ROUTES.ADMIN_PROFILE),
        },
        {
          key: ROUTES.ADMIN_PROFILE_INFO,
          label: "Profile Info",
          onClick: () => navigate(ROUTES.ADMIN_PROFILE_INFO),
        },
        {
          key: ROUTES.ADMIN_PROFILE_EXPERIENCE,
          label: "Experience",
          onClick: () => navigate(ROUTES.ADMIN_PROFILE_EXPERIENCE),
        },
      ],
    },
    {
      key: "skills",
      icon: <ToolOutlined />,
      label: "Skills",
      children: [
        {
          key: ROUTES.ADMIN_SKILLS,
          label: "Skills Management",
          onClick: () => navigate(ROUTES.ADMIN_SKILLS),
        },
        {
          key: ROUTES.ADMIN_SKILL_CATEGORIES,
          label: "Skill Categories",
          onClick: () => navigate(ROUTES.ADMIN_SKILL_CATEGORIES),
        },
      ],
    },
    {
      key: ROUTES.ADMIN_USERS,
      icon: <TeamOutlined />,
      label: "Admin Users",
      onClick: () => navigate(ROUTES.ADMIN_USERS),
    },
  ];

  const notificationItems = [
    {
      key: "1",
      label: (
        <div className="notification-item">
          <Text strong>New project created</Text>
          <Text type="secondary" style={{ fontSize: 12 }}>
            2 minutes ago
          </Text>
        </div>
      ),
    },
    {
      key: "2",
      label: (
        <div className="notification-item">
          <Text strong>Blog post published</Text>
          <Text type="secondary" style={{ fontSize: 12 }}>
            1 hour ago
          </Text>
        </div>
      ),
    },
    {
      type: "divider",
    },
    {
      key: "all",
      label: "View all notifications",
    },
  ];

  const userMenuItems = [
    {
      key: "profile",
      icon: <UserOutlined />,
      label: "My Profile",
    },
    {
      key: "settings",
      icon: <SettingOutlined />,
      label: "Settings",
    },
    {
      type: "divider",
    },
    {
      key: "logout",
      icon: <LogoutOutlined />,
      label: "Logout",
      onClick: () => {
        // Handle logout
        navigate("/");
      },
      danger: true,
    },
  ];

  const getSelectedKeys = () => {
    return [location.pathname];
  };

  const getOpenKeys = () => {
    const path = location.pathname;
    if (path.includes("/admin/hero")) return ["hero"];
    if (path.includes("/admin/projects")) return ["projects"];
    if (path.includes("/admin/blog")) return ["blog"];
    if (path.includes("/admin/contact")) return ["contact"];
    if (path.includes("/admin/profile")) return ["profile"];
    if (path.includes("/admin/skills")) return ["skills"];
    return [];
  };

  return (
    <Layout
      className={`admin-layout theme-${currentTheme}`}
      style={{ minHeight: "100vh" }}
    >
      <Sider
        trigger={null}
        collapsible
        collapsed={collapsed}
        width={260}
        className="admin-sider"
        breakpoint="lg"
        collapsedWidth={80}
      >
        <div className="sider-logo">
          {!collapsed ? (
            <div className="logo-full">
              <div className="logo-icon">
                <RocketOutlined />
              </div>
              <div className="logo-text">
                <Title level={4} className="logo-title">
                  Admin Panel
                </Title>
                <Text className="logo-subtitle">Portfolio CMS</Text>
              </div>
            </div>
          ) : (
            <div className="logo-collapsed">
              <RocketOutlined className="logo-icon-collapsed" />
            </div>
          )}
        </div>

        <Menu
          mode="inline"
          selectedKeys={getSelectedKeys()}
          defaultOpenKeys={getOpenKeys()}
          items={menuItems}
          className="admin-menu"
        />

        {!collapsed && (
          <div className="sider-footer">
            <div className="footer-stats">
              <div className="stat-item">
                <div className="stat-content">
                  <Text className="stat-label">Total Views</Text>
                  <Text className="stat-value">12.5K</Text>
                </div>
                <Progress
                  percent={75}
                  showInfo={false}
                  strokeColor={{
                    "0%": "#667eea",
                    "100%": "#764ba2",
                  }}
                  trailColor="rgba(102, 126, 234, 0.1)"
                  strokeWidth={4}
                />
              </div>
              <div className="stat-item">
                <div className="stat-content">
                  <Text className="stat-label">Projects</Text>
                  <Text className="stat-value">24</Text>
                </div>
                <Progress
                  percent={60}
                  showInfo={false}
                  strokeColor={{
                    "0%": "#667eea",
                    "100%": "#764ba2",
                  }}
                  trailColor="rgba(102, 126, 234, 0.1)"
                  strokeWidth={4}
                />
              </div>
            </div>
          </div>
        )}
      </Sider>

      <Layout className="admin-main-layout">
        <Header className={`admin-header ${scrolled ? "scrolled" : ""}`}>
          <div className="header-left">
            <Button
              type="text"
              icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
              onClick={() => setCollapsed(!collapsed)}
              className="menu-toggle-btn"
            />

            {/* Search Bar */}
            <div className="header-search">
              {searchVisible ? (
                <Input
                  placeholder="Search anything..."
                  prefix={<SearchOutlined />}
                  className="search-input"
                  autoFocus
                  onBlur={() => setSearchVisible(false)}
                />
              ) : (
                <Tooltip title="Search (Ctrl+K)">
                  <Button
                    type="text"
                    icon={<SearchOutlined />}
                    onClick={() => setSearchVisible(true)}
                    className="search-btn"
                  />
                </Tooltip>
              )}
            </div>
          </div>

          <Space size="middle" className="header-actions">
            {/* Quick Help */}
            <Tooltip title="Help Center">
              <Button
                type="text"
                icon={<QuestionCircleOutlined />}
                className="action-btn"
              />
            </Tooltip>

            {/* Notifications */}
            <Dropdown
              menu={{ items: notificationItems }}
              placement="bottomRight"
              trigger={["click"]}
              overlayClassName="notification-dropdown"
            >
              <Badge count={notificationCount} size="small">
                <Button
                  type="text"
                  icon={<BellOutlined />}
                  className="action-btn notification-btn"
                />
              </Badge>
            </Dropdown>

            {/* Theme Toggle */}
            <ThemeToggle />

            {/* User Menu */}
            <Dropdown
              menu={{ items: userMenuItems }}
              placement="bottomRight"
              trigger={["click"]}
              overlayClassName="user-dropdown"
            >
              <Space className="user-info" style={{ cursor: "pointer" }}>
                <Avatar
                  size="default"
                  icon={<UserOutlined />}
                  className="user-avatar"
                  style={{
                    background:
                      "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
                  }}
                />
                <div className="user-details">
                  <Text strong className="user-name">
                    Admin User
                  </Text>
                  <Text className="user-role">Administrator</Text>
                </div>
              </Space>
            </Dropdown>
          </Space>
        </Header>

        <Content className="admin-content">
          <div className="content-wrapper">
            <Outlet />
          </div>
        </Content>
      </Layout>
    </Layout>
  );
};

export default MainLayoutAdmin;
