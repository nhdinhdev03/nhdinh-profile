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
  PushpinOutlined,
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
  Dropdown,
  Input,
  Layout,
  Menu,
  Space,
  Tooltip,
  Typography,
} from "antd";
import ThemeToggle from "components/ThemeToggle/ThemeToggle";
import { useTheme } from "contexts/ThemeContext";
import { useEffect, useMemo, useState } from "react";
import { Outlet, useLocation, useNavigate } from "react-router-dom";
import { ROUTES } from "router/routeConstants";
import "./MainLayoutAdmin.scss";

const { Header, Sider, Content } = Layout;
const { Text } = Typography;
const { Search } = Input;

const MainLayoutAdmin = () => {
  const [collapsed, setCollapsed] = useState(() => {
    // Load collapsed state from localStorage
    const saved = localStorage.getItem("admin-sidebar-collapsed");
    return saved === "true";
  });
  const [searchValue, setSearchValue] = useState("");
  const [pinnedItems, setPinnedItems] = useState(() => {
    // Load pinned items from localStorage
    const saved = localStorage.getItem("admin-pinned-items");
    return saved ? JSON.parse(saved) : [];
  });
  const [openKeys, setOpenKeys] = useState([]);

  const navigate = useNavigate();
  const location = useLocation();
  const { currentTheme } = useTheme();

  // Save collapsed state to localStorage
  useEffect(() => {
    localStorage.setItem("admin-sidebar-collapsed", collapsed);
  }, [collapsed]);

  // Save pinned items to localStorage
  useEffect(() => {
    localStorage.setItem("admin-pinned-items", JSON.stringify(pinnedItems));
  }, [pinnedItems]);

  // Initialize openKeys based on current path
  useEffect(() => {
    setOpenKeys(getOpenKeys());
  }, [location.pathname]);

  // Mock notifications
  const notificationCount = 5;

  // Toggle pin item
  const togglePin = (key) => {
    setPinnedItems((prev) =>
      prev.includes(key) ? prev.filter((item) => item !== key) : [...prev, key]
    );
  };

  const menuItems = [
    {
      key: ROUTES.ADMIN_DASHBOARD,
      icon: <DashboardOutlined />,
      label: (
        <Space className="menu-item-content">
          <span>Dashboard</span>
          {!collapsed && (
            <PushpinOutlined
              className={`pin-icon ${
                pinnedItems.includes(ROUTES.ADMIN_DASHBOARD) ? "pinned" : ""
              }`}
              onClick={(e) => {
                e.stopPropagation();
                togglePin(ROUTES.ADMIN_DASHBOARD);
              }}
            />
          )}
        </Space>
      ),
      onClick: () => navigate(ROUTES.ADMIN_DASHBOARD),
      isPinned: pinnedItems.includes(ROUTES.ADMIN_DASHBOARD),
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

  // Filter menu items based on search
  const filteredMenuItems = useMemo(() => {
    if (!searchValue) return menuItems;

    const searchLower = searchValue.toLowerCase();
    return menuItems.filter((item) => {
      const labelText =
        typeof item.label === "string"
          ? item.label
          : item.label?.props?.children?.[0]?.props?.children || "";
      if (labelText.toLowerCase().includes(searchLower)) return true;

      if (item.children) {
        return item.children.some((child) =>
          child.label.toLowerCase().includes(searchLower)
        );
      }
      return false;
    });
  }, [searchValue, menuItems]);

  // Sort items: pinned first, then alphabetically
  const sortedMenuItems = useMemo(() => {
    return [...filteredMenuItems].sort((a, b) => {
      if (a.isPinned && !b.isPinned) return -1;
      if (!a.isPinned && b.isPinned) return 1;
      return 0;
    });
  }, [filteredMenuItems]);

  const notificationItems = [
    {
      key: "1",
      label: (
        <div className="notification-item">
          <Text strong>New project created</Text>
          <Text type="secondary" className="notification-time">
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
          <Text type="secondary" className="notification-time">
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

  const handleOpenChange = (keys) => {
    setOpenKeys(keys);
  };

  return (
    <Layout className={`admin-layout theme-${currentTheme}`}>
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
          <RocketOutlined className="logo-icon" />
          {!collapsed && <Text className="logo-text">Admin Panel</Text>}
        </div>

        {!collapsed && (
          <div className="sider-search">
            <Search
              placeholder="Search menu..."
              value={searchValue}
              onChange={(e) => setSearchValue(e.target.value)}
              allowClear
              prefix={<SearchOutlined />}
            />
          </div>
        )}

        <Menu
          mode="inline"
          selectedKeys={getSelectedKeys()}
          openKeys={openKeys}
          onOpenChange={handleOpenChange}
          items={sortedMenuItems}
          className="admin-menu"
        />
      </Sider>

      <Layout>
        <Header className="admin-header">
          <div className="header-left">
            <Tooltip
              title={collapsed ? "Expand" : "Collapse"}
              placement="right"
            >
              {collapsed ? (
                <MenuUnfoldOutlined
                  className="menu-toggle"
                  onClick={() => setCollapsed(false)}
                />
              ) : (
                <MenuFoldOutlined
                  className="menu-toggle"
                  onClick={() => setCollapsed(true)}
                />
              )}
            </Tooltip>
          </div>

          <Space size="middle" className="header-actions">
            <Tooltip title="Help & Documentation">
              <QuestionCircleOutlined className="action-icon" />
            </Tooltip>

            <Dropdown
              menu={{ items: notificationItems }}
              placement="bottomRight"
              trigger={["click"]}
            >
              <Badge count={notificationCount} size="small">
                <Tooltip title="Notifications">
                  <BellOutlined className="action-icon" />
                </Tooltip>
              </Badge>
            </Dropdown>

            <ThemeToggle />

            <Dropdown
              menu={{ items: userMenuItems }}
              placement="bottomRight"
              trigger={["click"]}
            >
              <Space className="user-info">
                <Avatar size="small" icon={<UserOutlined />} />
                {!collapsed && (
                  <div className="user-details">
                    <Text strong>Admin User</Text>
                  </div>
                )}
              </Space>
            </Dropdown>
          </Space>
        </Header>

        <Content className="admin-content">
          <Outlet />
        </Content>
      </Layout>
    </Layout>
  );
};

export default MainLayoutAdmin;
