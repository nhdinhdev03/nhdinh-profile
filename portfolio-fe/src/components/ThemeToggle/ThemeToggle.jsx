import {
  BgColorsOutlined,
  CheckOutlined,
  MoonOutlined,
  SunOutlined,
} from "@ant-design/icons";
import { Button, Card, Dropdown, Space, Tooltip } from "antd";
import { useTheme } from "../../contexts/ThemeContext";
import "./ThemeToggle.scss";

const ThemeToggle = ({ style }) => {
  const { currentTheme, changeTheme, toggleTheme, themes, isDark } = useTheme();

  const themeColors = {
    light: { bg: "#ffffff", primary: "#1890ff" },
    dark: { bg: "#141414", primary: "#177ddc" },
    ocean: { bg: "#0c4a6e", primary: "#0ea5e9" },
    purple: { bg: "#581c87", primary: "#a855f7" },
    emerald: { bg: "#ecfdf5", primary: "#10b981" },
    sunset: { bg: "#fff7ed", primary: "#f97316" },
  };

  const themeItems = themes.map((themeName) => ({
    key: themeName,
    label: (
      <div className="theme-menu-item">
        <Space align="center">
          <div
            className="theme-color-preview"
            style={{
              background: `linear-gradient(135deg, ${themeColors[themeName].bg} 0%, ${themeColors[themeName].primary} 100%)`,
            }}
          />
          <span className="theme-name">
            {themeName.charAt(0).toUpperCase() + themeName.slice(1)}
          </span>
          {currentTheme === themeName && (
            <CheckOutlined className="theme-check" />
          )}
        </Space>
      </div>
    ),
    onClick: () => changeTheme(themeName),
  }));

  return (
    <div className="theme-toggle-container" style={style}>
      <Space size="small">
        {/* Quick Dark/Light Toggle */}
        <Tooltip title={isDark ? "Switch to Light" : "Switch to Dark"}>
          <Button
            type="text"
            icon={isDark ? <SunOutlined /> : <MoonOutlined />}
            onClick={toggleTheme}
            className="quick-toggle-btn"
          />
        </Tooltip>

        {/* Theme Dropdown */}
        <Dropdown
          menu={{ items: themeItems }}
          trigger={["click"]}
          placement="bottomRight"
          dropdownRender={(menu) => (
            <Card className="theme-dropdown-card" bordered={false}>
              <div className="theme-dropdown-header">
                <BgColorsOutlined /> Choose Theme
              </div>
              {menu}
            </Card>
          )}
        >
          <Button
            type="text"
            icon={<BgColorsOutlined />}
            className="theme-selector-btn"
          >
            Theme
          </Button>
        </Dropdown>
      </Space>
    </div>
  );
};

export default ThemeToggle;
