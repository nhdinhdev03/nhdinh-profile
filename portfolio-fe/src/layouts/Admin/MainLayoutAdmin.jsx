import {
    DashboardOutlined,
    EditOutlined,
    LogoutOutlined,
    MenuFoldOutlined,
    MenuOutlined,
    MenuUnfoldOutlined,
    MessageOutlined,
    ProjectOutlined,
    SettingOutlined,
    StarOutlined,
    TeamOutlined,
    ToolOutlined,
    TranslationOutlined,
    UserOutlined
} from '@ant-design/icons';
import { Avatar, Button, Dropdown, Layout, Menu, Space, Typography } from 'antd';
import { useState } from 'react';
import { Outlet, useLocation, useNavigate } from 'react-router-dom';
import { ROUTES } from 'router/routeConstants';

const { Header, Sider, Content } = Layout;
const { Title } = Typography;

const MainLayoutAdmin = () => {
  const [collapsed, setCollapsed] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  const menuItems = [
    {
      key: ROUTES.ADMIN_DASHBOARD,
      icon: <DashboardOutlined />,
      label: 'Dashboard',
      onClick: () => navigate(ROUTES.ADMIN_DASHBOARD),
    },
    {
      key: 'hero',
      icon: <StarOutlined />,
      label: 'Hero Section',
      children: [
        {
          key: ROUTES.ADMIN_HERO,
          label: 'Hero Management',
          onClick: () => navigate(ROUTES.ADMIN_HERO),
        },
        {
          key: ROUTES.ADMIN_HERO_TRANSLATIONS,
          icon: <TranslationOutlined />,
          label: 'Translations',
          onClick: () => navigate(ROUTES.ADMIN_HERO_TRANSLATIONS),
        },
        {
          key: ROUTES.ADMIN_HERO_SUBHEADINGS,
          icon: <MenuOutlined />,
          label: 'Subheadings',
          onClick: () => navigate(ROUTES.ADMIN_HERO_SUBHEADINGS),
        },
      ],
    },
    {
      key: 'projects',
      icon: <ProjectOutlined />,
      label: 'Projects',
      children: [
        {
          key: ROUTES.ADMIN_PROJECTS,
          label: 'Project Management',
          onClick: () => navigate(ROUTES.ADMIN_PROJECTS),
        },
        {
          key: ROUTES.ADMIN_PROJECT_CATEGORIES,
          label: 'Categories',
          onClick: () => navigate(ROUTES.ADMIN_PROJECT_CATEGORIES),
        },
        {
          key: ROUTES.ADMIN_PROJECT_TAGS,
          label: 'Tags',
          onClick: () => navigate(ROUTES.ADMIN_PROJECT_TAGS),
        },
        {
          key: ROUTES.ADMIN_PROJECT_TRANSLATIONS,
          icon: <TranslationOutlined />,
          label: 'Translations',
          onClick: () => navigate(ROUTES.ADMIN_PROJECT_TRANSLATIONS),
        },
      ],
    },
    {
      key: 'blog',
      icon: <EditOutlined />,
      label: 'Blog',
      children: [
        {
          key: ROUTES.ADMIN_BLOG,
          label: 'Blog Management',
          onClick: () => navigate(ROUTES.ADMIN_BLOG),
        },
        {
          key: ROUTES.ADMIN_BLOG_POSTS,
          label: 'Posts',
          onClick: () => navigate(ROUTES.ADMIN_BLOG_POSTS),
        },
        {
          key: ROUTES.ADMIN_BLOG_TAGS,
          label: 'Tags',
          onClick: () => navigate(ROUTES.ADMIN_BLOG_TAGS),
        },
        {
          key: ROUTES.ADMIN_BLOG_TRANSLATIONS,
          icon: <TranslationOutlined />,
          label: 'Translations',
          onClick: () => navigate(ROUTES.ADMIN_BLOG_TRANSLATIONS),
        },
      ],
    },
    {
      key: 'contact',
      icon: <MessageOutlined />,
      label: 'Contact',
      children: [
        {
          key: ROUTES.ADMIN_CONTACT,
          label: 'Contact Management',
          onClick: () => navigate(ROUTES.ADMIN_CONTACT),
        },
        {
          key: ROUTES.ADMIN_CONTACT_MESSAGES,
          label: 'Messages',
          onClick: () => navigate(ROUTES.ADMIN_CONTACT_MESSAGES),
        },
      ],
    },
    {
      key: 'profile',
      icon: <UserOutlined />,
      label: 'Profile',
      children: [
        {
          key: ROUTES.ADMIN_PROFILE,
          label: 'Profile Management',
          onClick: () => navigate(ROUTES.ADMIN_PROFILE),
        },
        {
          key: ROUTES.ADMIN_PROFILE_INFO,
          label: 'Profile Info',
          onClick: () => navigate(ROUTES.ADMIN_PROFILE_INFO),
        },
        {
          key: ROUTES.ADMIN_PROFILE_EXPERIENCE,
          label: 'Experience',
          onClick: () => navigate(ROUTES.ADMIN_PROFILE_EXPERIENCE),
        },
      ],
    },
    {
      key: 'skills',
      icon: <ToolOutlined />,
      label: 'Skills',
      children: [
        {
          key: ROUTES.ADMIN_SKILLS,
          label: 'Skills Management',
          onClick: () => navigate(ROUTES.ADMIN_SKILLS),
        },
        {
          key: ROUTES.ADMIN_SKILL_CATEGORIES,
          label: 'Skill Categories',
          onClick: () => navigate(ROUTES.ADMIN_SKILL_CATEGORIES),
        },
      ],
    },
    {
      key: ROUTES.ADMIN_USERS,
      icon: <TeamOutlined />,
      label: 'Admin Users',
      onClick: () => navigate(ROUTES.ADMIN_USERS),
    },
  ];

  const userMenuItems = [
    {
      key: 'profile',
      icon: <UserOutlined />,
      label: 'Profile',
    },
    {
      key: 'settings',
      icon: <SettingOutlined />,
      label: 'Settings',
    },
    {
      type: 'divider',
    },
    {
      key: 'logout',
      icon: <LogoutOutlined />,
      label: 'Logout',
      onClick: () => {
        // Handle logout
        navigate('/');
      },
    },
  ];

  const getSelectedKeys = () => {
    return [location.pathname];
  };

  const getOpenKeys = () => {
    const path = location.pathname;
    if (path.includes('/admin/hero')) return ['hero'];
    if (path.includes('/admin/projects')) return ['projects'];
    if (path.includes('/admin/blog')) return ['blog'];
    if (path.includes('/admin/contact')) return ['contact'];
    if (path.includes('/admin/profile')) return ['profile'];
    if (path.includes('/admin/skills')) return ['skills'];
    return [];
  };

  return (
    <Layout style={{ minHeight: '100vh' }}>
      <Sider 
        trigger={null} 
        collapsible 
        collapsed={collapsed}
        width={250}
        style={{
          background: '#fff',
          boxShadow: '2px 0 8px rgba(0, 0, 0, 0.1)',
        }}
      >
        <div style={{
          padding: '16px',
          textAlign: 'center',
          borderBottom: '1px solid #f0f0f0',
        }}>
          {!collapsed ? (
            <Title level={4} style={{ margin: 0, color: '#1890ff' }}>
              Admin Panel
            </Title>
          ) : (
            <Title level={4} style={{ margin: 0, color: '#1890ff' }}>
              AP
            </Title>
          )}
        </div>
        
        <Menu
          mode="inline"
          selectedKeys={getSelectedKeys()}
          defaultOpenKeys={getOpenKeys()}
          items={menuItems}
          style={{ border: 'none', paddingTop: '8px' }}
        />
      </Sider>
      
      <Layout>
        <Header style={{
          padding: '0 16px',
          background: '#fff',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          boxShadow: '0 2px 8px rgba(0, 0, 0, 0.1)',
        }}>
          <Button
            type="text"
            icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
            onClick={() => setCollapsed(!collapsed)}
            style={{
              fontSize: '16px',
              width: 64,
              height: 64,
            }}
          />
          
          <Dropdown
            menu={{ items: userMenuItems }}
            placement="bottomRight"
            arrow
          >
            <Space style={{ cursor: 'pointer' }}>
              <Avatar size="small" icon={<UserOutlined />} />
              <span>Admin</span>
            </Space>
          </Dropdown>
        </Header>
        
        <Content style={{
          margin: '16px',
          padding: 0,
          background: '#f5f5f5',
          borderRadius: '8px',
          overflow: 'auto',
        }}>
          <div style={{ padding: '16px', background: '#fff', borderRadius: '8px' }}>
            <Outlet />
          </div>
        </Content>
      </Layout>
    </Layout>
  );
};

export default MainLayoutAdmin;
