import {
  BellOutlined,
  ClockCircleOutlined,
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
  Breadcrumb,
  Dropdown,
  Input,
  Layout,
  Menu,
  Modal,
  Space,
  Tooltip,
  Typography,
} from "antd";
import ThemeToggle from "components/ThemeToggle/ThemeToggle";
import { useTheme } from "contexts/ThemeContext";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { Outlet, useLocation, useNavigate } from "react-router-dom";
import { ROUTES } from "router/routeConstants";
import "./MainLayoutAdmin.scss";

const { Header, Sider, Content } = Layout;
const { Text } = Typography;
const { Search } = Input;

// ===================================
// Constants - Tách ra ngoài để tránh re-create
// ===================================
const STORAGE_KEYS = {
  SIDEBAR_COLLAPSED: "admin-sidebar-collapsed",
  PINNED_ITEMS: "admin-pinned-items",
  RECENT_PAGES: "admin-recent-pages",
};

const MAX_RECENT_PAGES = 5;

// ===================================
// Helper Functions - Debounce
// ===================================
const debounce = (func, wait) => {
  let timeout;
  return (...args) => {
    clearTimeout(timeout);
    timeout = setTimeout(() => func(...args), wait);
  };
};

// ===================================
// Menu Configuration - Tách ra để dễ maintain
// ===================================
const getMenuConfig = (navigate, pinnedItems, collapsed, togglePin) => [
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

const MainLayoutAdmin = () => {
  // ===================================
  // State Management
  // ===================================
  const [collapsed, setCollapsed] = useState(() => {
    const saved = localStorage.getItem(STORAGE_KEYS.SIDEBAR_COLLAPSED);
    return saved === "true";
  });
  const [searchValue, setSearchValue] = useState("");
  const [debouncedSearchValue, setDebouncedSearchValue] = useState("");
  const [pinnedItems, setPinnedItems] = useState(() => {
    const saved = localStorage.getItem(STORAGE_KEYS.PINNED_ITEMS);
    return saved ? JSON.parse(saved) : [];
  });
  const [recentPages, setRecentPages] = useState(() => {
    const saved = localStorage.getItem(STORAGE_KEYS.RECENT_PAGES);
    return saved ? JSON.parse(saved) : [];
  });
  const [openKeys, setOpenKeys] = useState([]);
  const [commandPaletteVisible, setCommandPaletteVisible] = useState(false);

  const navigate = useNavigate();
  const location = useLocation();
  const { currentTheme } = useTheme();
  const searchInputRef = useRef(null);

  // ===================================
  // Debounced Search
  // ===================================
  const debouncedSearch = useCallback(
    debounce((value) => {
      setDebouncedSearchValue(value);
    }, 300),
    []
  );

  useEffect(() => {
    debouncedSearch(searchValue);
  }, [searchValue, debouncedSearch]);

  // ===================================
  // Persist Settings
  // ===================================
  useEffect(() => {
    localStorage.setItem(STORAGE_KEYS.SIDEBAR_COLLAPSED, collapsed);
  }, [collapsed]);

  useEffect(() => {
    localStorage.setItem(
      STORAGE_KEYS.PINNED_ITEMS,
      JSON.stringify(pinnedItems)
    );
  }, [pinnedItems]);

  useEffect(() => {
    localStorage.setItem(
      STORAGE_KEYS.RECENT_PAGES,
      JSON.stringify(recentPages)
    );
  }, [recentPages]);

  // ===================================
  // Track Recent Pages
  // ===================================
  useEffect(() => {
    const currentPath = location.pathname;
    if (
      currentPath.startsWith("/admin") &&
      currentPath !== ROUTES.ADMIN_DASHBOARD
    ) {
      setRecentPages((prev) => {
        const filtered = prev.filter((page) => page.path !== currentPath);
        return [
          { path: currentPath, timestamp: Date.now() },
          ...filtered,
        ].slice(0, MAX_RECENT_PAGES);
      });
    }
  }, [location.pathname]);

  // ===================================
  // Initialize Open Keys
  // ===================================
  useEffect(() => {
    setOpenKeys(getOpenKeys());
  }, [location.pathname]);

  // ===================================
  // Keyboard Shortcuts (Ctrl+K for Command Palette, Ctrl+B for Sidebar)
  // ===================================
  useEffect(() => {
    const handleKeyDown = (e) => {
      // Ctrl+K or Cmd+K - Open command palette
      if ((e.ctrlKey || e.metaKey) && e.key === "k") {
        e.preventDefault();
        setCommandPaletteVisible(true);
      }
      // Ctrl+B or Cmd+B - Toggle sidebar
      if ((e.ctrlKey || e.metaKey) && e.key === "b") {
        e.preventDefault();
        setCollapsed((prev) => !prev);
      }
      // Ctrl+/ - Focus search
      if (e.ctrlKey && e.key === "/") {
        e.preventDefault();
        searchInputRef.current?.focus();
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  // ===================================
  // Handlers - useCallback for optimization
  // ===================================
  const togglePin = useCallback((key) => {
    setPinnedItems((prev) =>
      prev.includes(key) ? prev.filter((item) => item !== key) : [...prev, key]
    );
  }, []);

  const handleOpenChange = useCallback((keys) => {
    setOpenKeys(keys);
  }, []);

  const getOpenKeys = useCallback(() => {
    const path = location.pathname;
    if (path.includes("/admin/hero")) return ["hero"];
    if (path.includes("/admin/projects")) return ["projects"];
    if (path.includes("/admin/blog")) return ["blog"];
    if (path.includes("/admin/contact")) return ["contact"];
    if (path.includes("/admin/profile")) return ["profile"];
    if (path.includes("/admin/skills")) return ["skills"];
    return [];
  }, [location.pathname]);

  const getSelectedKeys = useCallback(() => {
    return [location.pathname];
  }, [location.pathname]);

  // ===================================
  // Menu Items with useMemo
  // ===================================
  const menuItems = useMemo(
    () => getMenuConfig(navigate, pinnedItems, collapsed, togglePin),
    [navigate, pinnedItems, collapsed, togglePin]
  );

  const filteredMenuItems = useMemo(() => {
    if (!debouncedSearchValue) return menuItems;

    const searchLower = debouncedSearchValue.toLowerCase();
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
  }, [debouncedSearchValue, menuItems]);

  // ===================================
  // Command Palette Items
  // ===================================
  const commandPaletteItems = useMemo(() => {
    const allPages = [];
    menuItems.forEach((item) => {
      if (item.children) {
        item.children.forEach((child) => {
          allPages.push({
            key: child.key,
            label: child.label,
            icon: child.icon || item.icon,
            onClick: child.onClick,
          });
        });
      } else if (item.onClick) {
        allPages.push({
          key: item.key,
          label: typeof item.label === "string" ? item.label : item.key,
          icon: item.icon,
          onClick: item.onClick,
        });
      }
    });
    return allPages;
  }, [menuItems]);

  // ===================================
  // Breadcrumb Generation
  // ===================================
  const breadcrumbItems = useMemo(() => {
    const path = location.pathname;
    const segments = path.split("/").filter(Boolean);

    return segments.map((segment, index) => {
      const url = `/${segments.slice(0, index + 1).join("/")}`;
      return {
        title:
          segment.charAt(0).toUpperCase() + segment.slice(1).replace(/-/g, " "),
        path: url,
      };
    });
  }, [location.pathname]);

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

  // ===================================
  // Mock Data
  // ===================================
  const notificationCount = 5;

  return (
    <Layout className={`admin-layout theme-${currentTheme}`}>
      {/* Command Palette Modal */}
      <Modal
        title={
          <Space>
            <SearchOutlined />
            <span>Quick Access</span>
            <Text type="secondary" style={{ fontSize: 12 }}>
              (Ctrl+K)
            </Text>
          </Space>
        }
        open={commandPaletteVisible}
        onCancel={() => setCommandPaletteVisible(false)}
        footer={null}
        width={600}
        className="command-palette-modal"
      >
        <Space direction="vertical" style={{ width: "100%" }} size="middle">
          <Search
            placeholder="Search pages, actions..."
            autoFocus
            size="large"
          />

          {recentPages.length > 0 && (
            <div className="recent-pages">
              <Text
                type="secondary"
                style={{ fontSize: 12, marginBottom: 8, display: "block" }}
              >
                <ClockCircleOutlined /> Recent Pages
              </Text>
              <Menu
                items={recentPages.map((page) => ({
                  key: page.path,
                  label: page.path,
                  onClick: () => {
                    navigate(page.path);
                    setCommandPaletteVisible(false);
                  },
                }))}
              />
            </div>
          )}

          <div className="all-pages">
            <Text
              type="secondary"
              style={{ fontSize: 12, marginBottom: 8, display: "block" }}
            >
              All Pages
            </Text>
            <Menu
              items={commandPaletteItems.slice(0, 8).map((item) => ({
                key: item.key,
                icon: item.icon,
                label: item.label,
                onClick: () => {
                  item.onClick?.();
                  setCommandPaletteVisible(false);
                },
              }))}
            />
          </div>
        </Space>
      </Modal>

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
              ref={searchInputRef}
              placeholder="Search menu... (Ctrl+/)"
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
              title={<span>{collapsed ? "Expand" : "Collapse"} (Ctrl+B)</span>}
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

            {/* Breadcrumb Navigation */}
            {!collapsed && breadcrumbItems.length > 0 && (
              <Breadcrumb
                className="header-breadcrumb"
                items={breadcrumbItems.map((item) => ({
                  title: item.title,
                }))}
              />
            )}
          </div>

          <Space size="middle" className="header-actions">
            <Tooltip title="Quick Access (Ctrl+K)">
              <SearchOutlined
                className="action-icon"
                onClick={() => setCommandPaletteVisible(true)}
              />
            </Tooltip>

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
