import React, { useState, useEffect, useCallback } from "react";
import {
  Card,
  Table,
  Button,
  Input,
  Form,
  Space,
  Typography,
  Row,
  Col,
  Popconfirm,
  Tag,
  Tooltip,
  message,
  Empty,
  List,
  Alert,
  Statistic,
  Badge,
  Dropdown,
  Divider,
  Avatar,
  Progress,
  Drawer,
  Skeleton,
  Result,
  FloatButton,
  ConfigProvider,
  theme,
} from "antd";
import {
  PlusOutlined,
  EditOutlined,
  DeleteOutlined,
  EyeOutlined,
  ReloadOutlined,
  SearchOutlined,
  SaveOutlined,
  UpOutlined,
  DownOutlined,
  HomeOutlined,
  SettingOutlined,
  BulbOutlined,
  ThunderboltOutlined,
  StarOutlined,
  CopyOutlined,
  FileTextOutlined,
  CalendarOutlined,
  UserOutlined,
  TeamOutlined,
  DashboardOutlined,
  SyncOutlined,
  CloudUploadOutlined,
  CheckCircleOutlined,
  ExclamationCircleOutlined,
  InfoCircleOutlined,
  QuestionCircleOutlined,
  MenuOutlined,
  MoreOutlined,
} from "@ant-design/icons";

import heroSubHeadingApi from "api/admin/home/HeroSubHeadingApi";
import heroApi from "api/admin/home/HeroApi";
import { useNotificationContext } from "components/Notification";
import {
  ErrorFormatter,
  useDebounce,
  ValidationUtils,
} from "utils/Validation/validation";

import "./HeroManagement.scss";

const { Title, Text } = Typography;
const { TextArea } = Input;

const HeroManagement = () => {
  const notification = useNotificationContext();

  // ====== STATE: Dữ liệu form Hero đang thao tác ======
  const [heroSection, setHeroSection] = useState({
    heroId: "",
    preHeading: "",
    heading: "",
    introHtml: "",
    createdAt: null,
    updatedAt: null,
  });

  // ====== STATE: Sub-headings của hero được chọn ======
  const [subHeadings, setSubHeadings] = useState([]);
  const [totalSubHeadings, setTotalSubHeadings] = useState(0); // Tổng số sub-headings của tất cả heroes
  const [newSubHeading, setNewSubHeading] = useState("");
  const [editingSubHeading, setEditingSubHeading] = useState(null);
  
  // ====== STATE: Danh sách heroes & hero đang select ======
  const [heroes, setHeroes] = useState([]);
  const [selectedHero, setSelectedHero] = useState(null);

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [saving, setSaving] = useState(false);

  // Modal and edit states
  const [isEditingHero, setIsEditingHero] = useState(false);
  const [validationErrors, setValidationErrors] = useState({});

  // ====== STATE: UI / Filter / View mode ======
  const [searchTerm, setSearchTerm] = useState("");
  const [debouncedSearchTerm, setDebouncedSearchTerm] = useState("");
  const [lastNotificationId, setLastNotificationId] = useState(null);

  // Debounce search term
  const { debouncedFunction: updateSearch } = useDebounce((term) => {
    setDebouncedSearchTerm(term);
  }, 300);

  // Helper: đảm bảo mỗi lần chỉ hiển thị 1 notification (dismissAll trước), tránh chồng chéo
  const showControlledNotification = useCallback(
    (messageText, type = "info", duration = 4000) => {
      notification.dismissAll();
      setTimeout(() => {
        notification[type](messageText, duration, { position: "top-right" });
      }, 100);
    },
    [notification]
  );

  // Update debounced search term when search term changes
  useEffect(() => {
    updateSearch(searchTerm);
  }, [searchTerm, updateSearch]);

  // Memo: Áp dụng bộ lọc tìm kiếm (các filter khác xử lý từ backend qua viewMode)
  const filteredHeroes = React.useMemo(() => {
    if (!heroes) return [];

    if (debouncedSearchTerm.trim()) {
      const searchLower = debouncedSearchTerm.toLowerCase();
      return heroes.filter(
        (hero) =>
          hero.heading?.toLowerCase().includes(searchLower) ||
          hero.preHeading?.toLowerCase().includes(searchLower) ||
          hero.introHtml?.toLowerCase().includes(searchLower)
      );
    }

    return heroes;
  }, [heroes, debouncedSearchTerm]);

  // Check if selected hero is hidden by current filter
  const isSelectedHeroHidden = React.useMemo(() => {
    if (!selectedHero) return false;
    return !filteredHeroes.some((hero) => hero.heroId === selectedHero.heroId);
  }, [selectedHero, filteredHeroes]);

  // Validation functions
  const validateHeroSection = () => {
    const errors = ValidationUtils.validateHeroFields(heroSection);
    setValidationErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const validateSubHeading = (text) => {
    const errors = ValidationUtils.validateSubHeading(text, subHeadings);

    if (errors.length > 0) {
      message.warning(errors[0]);
      return false;
    }
    return true;
  };

  // Fetch hero sub-headings
  const fetchSubHeadings = useCallback(async (heroId) => {
    try {
      const response = await heroSubHeadingApi.getByHeroId(heroId);
      if (response.data) {
        setSubHeadings(response.data);
      }
    } catch (error) {
      console.error("Error fetching sub-headings:", error);
      message.error("Không thể tải sub-headings");
    }
  }, []);

  // Fetch total sub-headings count
  const fetchTotalSubHeadings = useCallback(async () => {
    try {
      const response = await heroSubHeadingApi.getAll(); // Giả sử có API này
      if (response.data && Array.isArray(response.data)) {
        setTotalSubHeadings(response.data.length);
      } else {
        // Nếu không có API getAll, tính từ từng hero
        const heroesResponse = await heroApi.getAll();
        if (heroesResponse.data) {
          let totalCount = 0;
          for (const hero of heroesResponse.data) {
            const subHeadingsResponse = await heroSubHeadingApi.getByHeroId(hero.heroId);
            if (subHeadingsResponse.data) {
              totalCount += subHeadingsResponse.data.length;
            }
          }
          setTotalSubHeadings(totalCount);
        }
      }
    } catch (error) {
      console.error("Error fetching total sub-headings:", error);
      // Không hiển thị lỗi cho user vì đây không phải tính năng quan trọng
    }
  }, []);

  // Create new sub-heading
  const createSubHeading = async () => {
    if (!validateSubHeading(newSubHeading.trim())) {
      return;
    }

    try {
      const response = await heroSubHeadingApi.create({
        heroId: selectedHero.heroId,
        text: newSubHeading.trim(),
        sortOrder: subHeadings.length,
      });

      if (response.data) {
        setSubHeadings([...subHeadings, response.data]);
        setNewSubHeading("");
        message.success("Đã thêm sub-heading mới");
        fetchTotalSubHeadings(); // Cập nhật tổng số sub-headings
      }
    } catch (error) {
      console.error("Error creating sub-heading:", error);
      message.error("Không thể tạo sub-heading");
    }
  };

  // Update sub-heading
  const updateSubHeading = async (subId, newText) => {
    if (!validateSubHeading(newText.trim())) {
      return;
    }

    try {
      const response = await heroSubHeadingApi.update(subId, {
        text: newText.trim(),
      });

      if (response.data) {
        setSubHeadings(
          subHeadings.map((sub) =>
            sub.subId === subId ? { ...sub, text: newText.trim() } : sub
          )
        );
        setEditingSubHeading(null);
        message.success("Đã cập nhật sub-heading");
        fetchTotalSubHeadings(); // Cập nhật tổng số sub-headings
      }
    } catch (error) {
      console.error("Error updating sub-heading:", error);
      message.error("Không thể cập nhật sub-heading");
    }
  };

  // Delete sub-heading
  const deleteSubHeading = async (subId) => {
    try {
      await heroSubHeadingApi.delete(subId);
      setSubHeadings(subHeadings.filter((sub) => sub.subId !== subId));
      message.success("Đã xóa sub-heading");
      fetchTotalSubHeadings(); // Cập nhật tổng số sub-headings
    } catch (error) {
      console.error("Error deleting sub-heading:", error);
      message.error("Không thể xóa sub-heading");
    }
  };

  // Update sort order
  const updateSortOrder = async (subId, newSortOrder) => {
    try {
      const response = await heroSubHeadingApi.update(subId, {
        sortOrder: newSortOrder,
      });

      if (response.data) {
        fetchSubHeadings(selectedHero.heroId);
        message.success("Đã cập nhật thứ tự");
      }
    } catch (error) {
      console.error("Error updating sort order:", error);
      message.error("Không thể cập nhật thứ tự");
    }
  };

  // Lấy danh sách tất cả heroes
  const fetchHeroData = useCallback(
    async (showSuccessNotification = false) => {
      try {
        setLoading(true);
        const response = await heroApi.getAllIncludeDeleted();

        if (response.data) {
          setHeroes(response.data);
          if (showSuccessNotification) {
            showControlledNotification(
              `Đã tải ${response.data.length} heroes`,
              "success"
            );
          }
        }
      } catch (error) {
        console.error("Error fetching heroes:", error);
        setError("Không thể tải dữ liệu heroes");
        message.error("Không thể tải dữ liệu heroes");
      } finally {
        setLoading(false);
      }
    },
    [showControlledNotification]
  );

  // Update existing hero
  const updateHero = async () => {
    if (!validateHeroSection()) {
      return;
    }

    try {
      setSaving(true);
      const response = await heroApi.update(heroSection.heroId, heroSection);

      if (response.data) {
        message.success("Đã cập nhật hero thành công");
        setIsEditingHero(false);
        closeHeroModal();
        fetchHeroData();
      }
    } catch (error) {
      console.error("Error updating hero:", error);
      const errorMessage = ErrorFormatter.formatApiError(error);
      message.error(errorMessage);
    } finally {
      setSaving(false);
    }
  };

  // Chọn 1 hero để chỉnh sửa -> load form + sub-headings
  const selectHero = useCallback(
    (hero) => {
      setSelectedHero(hero);
      setHeroSection(hero);
      setIsEditingHero(true);
      if (hero.heroId) {
        fetchSubHeadings(hero.heroId);
      }
    },
    [fetchSubHeadings]
  );

  // Close modal and clear form
  const closeHeroModal = () => {
    setIsEditingHero(false);
    setSelectedHero(null);
    setSubHeadings([]);
    setValidationErrors({});
  };

  // Handle save (update only)
  const handleSave = () => {
    if (heroSection.heroId) {
      updateHero();
    } else {
      message.warning("Chỉ có thể sửa đổi hero hiện có");
    }
  };

  // Get button text for save action
  const getSaveButtonText = () => {
    if (saving) {
      return "Đang cập nhật...";
    }
    return "Cập nhật Hero";
  };

  // Fetch data on mount and when view mode changes
  useEffect(() => {
    fetchHeroData();
    fetchTotalSubHeadings(); // Fetch tổng số sub-headings
  }, [fetchHeroData, fetchTotalSubHeadings]);

  // Auto-select appropriate hero when filters change
  useEffect(() => {
    if (selectedHero && isSelectedHeroHidden) {
      const notificationId = `hero-hidden-${selectedHero.heroId}-search-${debouncedSearchTerm}`;
      
      if (lastNotificationId !== notificationId) {
        showControlledNotification(
          `Hero "${selectedHero.heading}" không hiển thị với bộ lọc hiện tại`,
          "warning"
        );
        setLastNotificationId(notificationId);
      }
    }
  }, [
    filteredHeroes,
    selectedHero,
    heroes,
    selectHero,
    lastNotificationId,
    showControlledNotification,
    debouncedSearchTerm,
    isSelectedHeroHidden,
  ]);

  // Mở một tab mới để xem trang chủ đã publish (không phải bản nháp local)
  const handlePreview = () => {
    window.open("/", "_blank");
  };

  // Table columns for heroes list
  const heroColumns = [
    {
      title: 'Thông tin Hero',
      key: 'info',
      render: (_, hero) => (
        <Space direction="vertical" size="small">
          <Text strong>{hero.heading || "Chưa có tiêu đề"}</Text>
          <Text type="secondary">{hero.preHeading}</Text>
          <Space>
            {hero.isDeleted ? (
              <Tag color="red">Đã xóa</Tag>
            ) : (
              <Tag color="green">Hoạt động</Tag>
            )}
            <Text type="secondary" style={{ fontSize: '12px' }}>
              ID: {hero.heroId}
            </Text>
          </Space>
        </Space>
      ),
    },
    {
      title: 'Nội dung',
      dataIndex: 'introHtml',
      key: 'content',
      render: (text) => (
        <div 
          dangerouslySetInnerHTML={{ 
            __html: text?.substring(0, 100) + (text?.length > 100 ? "..." : "") 
          }}
          style={{ maxWidth: 300 }}
        />
      ),
    },
    {
      title: 'Trạng thái',
      dataIndex: 'isDeleted',
      key: 'status',
      render: (isDeleted) => (
        <Tag color={isDeleted ? 'red' : 'green'}>
          {isDeleted ? 'Đã xóa' : 'Hoạt động'}
        </Tag>
      ),
    },
    {
      title: 'Ngày tạo',
      dataIndex: 'createdAt',
      key: 'createdAt',
      render: (date) => date ? new Date(date).toLocaleDateString('vi-VN') : '-',
    },
    {
      title: 'Hành động',
      key: 'actions',
      render: (_, hero) => (
        <Space>
          <Tooltip title="Chỉnh sửa">
            <Button
              size="small"
              icon={<EditOutlined />}
              onClick={() => selectHero(hero)}
            />
          </Tooltip>
        </Space>
      ),
    },
  ];

  return (
    <ConfigProvider
      theme={{
        algorithm: theme.compactAlgorithm,
        token: {
          colorPrimary: '#1890ff',
          borderRadius: 8,
          colorBgContainer: '#ffffff',
          boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
        },
      }}
    >
      <div className="hero-management-container" style={{ padding: '24px', minHeight: '100vh', backgroundColor: '#f5f5f5' }}>
        {/* Floating Action Button */}
        <FloatButton.Group
          trigger="hover"
          type="primary"
          style={{ right: 24 }}
          icon={<SettingOutlined />}
        >
          <FloatButton 
            icon={<ReloadOutlined />} 
            tooltip="Làm mới dữ liệu"
            onClick={() => fetchHeroData(true)}
          />
          <FloatButton 
            icon={<EyeOutlined />} 
            tooltip="Xem trước trang"
            onClick={handlePreview}
          />
          <FloatButton 
            icon={<BulbOutlined />} 
            tooltip="Gợi ý tối ưu"
          />
        </FloatButton.Group>

        {/* Enhanced Error Alert */}
        {error && (
          <Alert
            message={
              <Space>
                <ExclamationCircleOutlined style={{ color: '#ff4d4f' }} />
                <Text strong>Đã xảy ra lỗi</Text>
              </Space>
            }
            description={
              <div>
                <Text>{error}</Text>
                <br />
                <Button 
                  type="link" 
                  size="small" 
                  onClick={() => fetchHeroData()}
                  icon={<ReloadOutlined />}
                >
                  Thử lại
                </Button>
              </div>
            }
            type="error"
            closable
            onClose={() => setError(null)}
            style={{ 
              marginBottom: '24px',
              borderRadius: '12px',
              border: '1px solid #ffccc7',
              backgroundColor: '#fff2f0'
            }}
            action={
              <Button size="small" danger onClick={() => setError(null)}>
                Đóng
              </Button>
            }
          />
        )}

        {/* Enhanced Page Header */}
        <Card 
          style={{ 
            marginBottom: '24px',
            borderRadius: '16px',
            background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
            border: 'none',
            overflow: 'hidden'
          }}
          styles={{ body: { padding: '32px' } }}
        >
          <Row justify="space-between" align="middle">
            <Col xs={24} lg={16}>
              <Space direction="vertical" size="small">
                <Space align="center">
                  <Avatar 
                    size={48} 
                    icon={<HomeOutlined />} 
                    style={{ 
                      backgroundColor: 'rgba(255,255,255,0.2)',
                      color: 'white',
                      backdropFilter: 'blur(10px)'
                    }}
                  />
                  <div>
                    <Title level={2} style={{ color: 'white', margin: 0 }}>
                      Quản lý Hero Section
                    </Title>
                    <Text style={{ color: 'rgba(255,255,255,0.8)', fontSize: '16px' }}>
                      Tạo và quản lý nội dung trang chủ một cách chuyên nghiệp
                    </Text>
                  </div>
                </Space>
                
                {/* Statistics Cards */}
                <Row gutter={16} style={{ marginTop: '16px' }}>
                  <Col span={8}>
                    <Statistic
                      title={<span style={{ color: 'rgba(255,255,255,0.8)' }}>Tổng Heroes</span>}
                      value={heroes.length}
                      prefix={<DashboardOutlined style={{ color: 'white' }} />}
                      valueStyle={{ color: 'white', fontSize: '20px' }}
                    />
                  </Col>
                  <Col span={8}>
                    <Statistic
                      title={<span style={{ color: 'rgba(255,255,255,0.8)' }}>Đang hoạt động</span>}
                      value={heroes.filter(h => !h.isDeleted).length}
                      prefix={<CheckCircleOutlined style={{ color: '#52c41a' }} />}
                      valueStyle={{ color: 'white', fontSize: '20px' }}
                    />
                  </Col>
                  <Col span={8}>
                    <Statistic
                      title={<span style={{ color: 'rgba(255,255,255,0.8)' }}>Sub-headings</span>}
                      value={totalSubHeadings}
                      prefix={<FileTextOutlined style={{ color: 'white' }} />}
                      valueStyle={{ color: 'white', fontSize: '20px' }}
                    />
                  </Col>
                </Row>
              </Space>
            </Col>
            
            <Col xs={24} lg={8} style={{ textAlign: 'right' }}>
              <Space direction="vertical" align="end" size="middle">
                <Button.Group>
                  <Button
                    type="primary"
                    ghost
                    icon={<ReloadOutlined />}
                    onClick={() => fetchHeroData(true)}
                    loading={loading}
                    style={{ 
                      borderColor: 'white',
                      color: 'white',
                      backgroundColor: 'rgba(255,255,255,0.1)',
                      backdropFilter: 'blur(10px)'
                    }}
                  >
                    {loading ? "Đang tải..." : "Làm mới"}
                  </Button>
                  <Button
                    type="primary"
                    ghost
                    icon={<EyeOutlined />}
                    onClick={handlePreview}
                    style={{ 
                      borderColor: 'white',
                      color: 'white',
                      backgroundColor: 'rgba(255,255,255,0.1)',
                      backdropFilter: 'blur(10px)'
                    }}
                  >
                    Xem trước
                  </Button>
                </Button.Group>
                
                <Progress
                  percent={Math.round((heroes.filter(h => !h.isDeleted).length / Math.max(heroes.length, 1)) * 100)}
                  strokeColor="white"
                  trailColor="rgba(255,255,255,0.2)"
                  showInfo={false}
                  size="small"
                />
              </Space>
            </Col>
          </Row>
        </Card>

        {/* Enhanced Heroes Management */}
        <Card 
          style={{ 
            marginBottom: '24px',
            borderRadius: '16px',
            boxShadow: '0 8px 32px rgba(0,0,0,0.1)',
            border: '1px solid rgba(255,255,255,0.2)',
            backdropFilter: 'blur(20px)'
          }}
          styles={{ body: { padding: '32px' } }}
        >
          <Row justify="space-between" align="middle" gutter={[16, 16]} style={{ marginBottom: '24px' }}>
            <Col xs={24} sm={12}>
              <Space align="center" size="large">
                <Badge count={filteredHeroes.length} overflowCount={99} color="#1890ff">
                  <Avatar 
                    size={48} 
                    icon={<TeamOutlined />}
                    style={{ 
                      backgroundColor: '#1890ff',
                      background: 'linear-gradient(45deg, #1890ff, #36cfc9)'
                    }}
                  />
                </Badge>
                <div>
                  <Title level={3} style={{ margin: 0, color: '#1f1f1f' }}>
                    Danh sách Heroes
                  </Title>
                  <Text type="secondary" style={{ fontSize: '14px' }}>
                    Quản lý và chỉnh sửa thông tin hero sections
                  </Text>
                </div>
              </Space>
            </Col>
            
            <Col xs={24} sm={12} style={{ textAlign: 'right' }}>
              <Space wrap>
                <Input.Search
                  placeholder="Tìm kiếm theo tiêu đề, nội dung..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  style={{ 
                    width: '100%', 
                    maxWidth: 280,
                    borderRadius: '24px'
                  }}
                  size="large"
                  allowClear
                  enterButton={
                    <Button 
                      type="primary" 
                      icon={<SearchOutlined />}
                      style={{ borderRadius: '0 24px 24px 0' }}
                    >
                      Tìm
                    </Button>
                  }
                />
                
                <Dropdown
                  menu={{
                    items: [
                      {
                        key: 'export',
                        icon: <CloudUploadOutlined />,
                        label: 'Xuất dữ liệu',
                      },
                      {
                        key: 'settings',
                        icon: <SettingOutlined />,
                        label: 'Cài đặt hiển thị',
                      },
                      {
                        key: 'refresh',
                        icon: <SyncOutlined />,
                        label: 'Đồng bộ dữ liệu',
                        onClick: () => fetchHeroData(true),
                      },
                    ],
                  }}
                  trigger={['click']}
                >
                  <Button 
                    icon={<MoreOutlined />} 
                    style={{ 
                      borderRadius: '50%',
                      width: '40px',
                      height: '40px',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center'
                    }}
                  />
                </Dropdown>
              </Space>
            </Col>
          </Row>

          {/* Enhanced Loading State */}
          {loading ? (
            <Card style={{ border: 'none', background: 'transparent' }}>
              <Skeleton avatar paragraph={{ rows: 4 }} active />
              <Divider />
              <Skeleton avatar paragraph={{ rows: 3 }} active />
              <Divider />
              <Skeleton avatar paragraph={{ rows: 2 }} active />
            </Card>
          ) : filteredHeroes.length === 0 ? (
            <Result
              icon={searchTerm ? <SearchOutlined style={{ color: '#1890ff' }} /> : <FileTextOutlined style={{ color: '#1890ff' }} />}
              title={searchTerm ? "Không tìm thấy kết quả" : "Chưa có dữ liệu hero"}
              subTitle={
                searchTerm 
                  ? `Không có hero nào khớp với từ khóa "${searchTerm}"` 
                  : "Bắt đầu tạo hero section đầu tiên cho trang web của bạn"
              }
              extra={
                <Space>
                  {searchTerm && (
                    <Button onClick={() => setSearchTerm("")}>
                      Xóa bộ lọc
                    </Button>
                  )}
                  <Button 
                    type="primary" 
                    icon={<ReloadOutlined />}
                    onClick={() => fetchHeroData(true)}
                  >
                    Tải lại dữ liệu
                  </Button>
                </Space>
              }
              style={{ padding: '60px 24px' }}
            />
          ) : (
            <Table
              columns={[
                {
                  title: (
                    <Space>
                      <UserOutlined />
                      <span>Thông tin Hero</span>
                    </Space>
                  ),
                  key: 'info',
                  render: (_, hero) => (
                    <Space direction="vertical" size="small">
                      <Space align="center">
                        <Avatar 
                          size={40}
                          style={{ 
                            backgroundColor: hero.isDeleted ? '#ff4d4f' : '#52c41a',
                            color: 'white'
                          }}
                        >
                          {hero.heading?.charAt(0)?.toUpperCase() || 'H'}
                        </Avatar>
                        <div>
                          <Text strong style={{ fontSize: '16px' }}>
                            {hero.heading || "Chưa có tiêu đề"}
                          </Text>
                          <br />
                          <Text type="secondary" style={{ fontSize: '14px' }}>
                            {hero.preHeading || "Chưa có tiền tố"}
                          </Text>
                        </div>
                      </Space>
                      
                      <Space wrap size="small">
                        {hero.isDeleted ? (
                          <Tag color="error" icon={<ExclamationCircleOutlined />}>
                            Đã xóa
                          </Tag>
                        ) : (
                          <Tag color="success" icon={<CheckCircleOutlined />}>
                            Hoạt động
                          </Tag>
                        )}
                        <Tag color="blue" style={{ fontSize: '11px' }}>
                          ID: {hero.heroId}
                        </Tag>
                      </Space>
                    </Space>
                  ),
                },
                {
                  title: (
                    <Space>
                      <FileTextOutlined />
                      <span>Nội dung</span>
                    </Space>
                  ),
                  dataIndex: 'introHtml',
                  key: 'content',
                  render: (text) => (
                    <div style={{ maxWidth: 300 }}>
                      <div 
                        dangerouslySetInnerHTML={{ 
                          __html: text?.substring(0, 120) + (text?.length > 120 ? "..." : "") 
                        }}
                        style={{ 
                          fontSize: '14px',
                          lineHeight: '1.6',
                          color: '#666',
                          backgroundColor: '#fafafa',
                          padding: '8px 12px',
                          borderRadius: '8px',
                          border: '1px solid #f0f0f0'
                        }}
                      />
                      {text?.length > 120 && (
                        <Button type="link" size="small" style={{ padding: '4px 0' }}>
                          Xem thêm
                        </Button>
                      )}
                    </div>
                  ),
                },
                {
                  title: (
                    <Space>
                      <CalendarOutlined />
                      <span>Thời gian</span>
                    </Space>
                  ),
                  key: 'timeline',
                  render: (_, hero) => (
                    <Space direction="vertical" size="small">
                      <div>
                        <Text type="secondary" style={{ fontSize: '12px' }}>Tạo:</Text>
                        <br />
                        <Text style={{ fontSize: '13px' }}>
                          {hero.createdAt ? new Date(hero.createdAt).toLocaleDateString('vi-VN') : '-'}
                        </Text>
                      </div>
                      {hero.updatedAt && (
                        <div>
                          <Text type="secondary" style={{ fontSize: '12px' }}>Cập nhật:</Text>
                          <br />
                          <Text style={{ fontSize: '13px' }}>
                            {new Date(hero.updatedAt).toLocaleDateString('vi-VN')}
                          </Text>
                        </div>
                      )}
                    </Space>
                  ),
                },
                {
                  title: (
                    <Space>
                      <SettingOutlined />
                      <span>Hành động</span>
                    </Space>
                  ),
                  key: 'actions',
                  render: (_, hero) => (
                    <Space>
                      <Tooltip title="Chỉnh sửa hero">
                        <Button
                          type="primary"
                          size="small"
                          icon={<EditOutlined />}
                          onClick={() => selectHero(hero)}
                          style={{ borderRadius: '6px' }}
                        >
                          Sửa
                        </Button>
                      </Tooltip>
                      <Tooltip title="Sao chép ID">
                        <Button
                          size="small"
                          icon={<CopyOutlined />}
                          onClick={() => {
                            navigator.clipboard.writeText(hero.heroId);
                            message.success('Đã sao chép ID');
                          }}
                          style={{ borderRadius: '6px' }}
                        />
                      </Tooltip>
                    </Space>
                  ),
                },
              ]}
              dataSource={filteredHeroes}
              rowKey="heroId"
              pagination={false}
              scroll={{ x: 1000 }}
              size="large"
              rowClassName={(record) => record.isDeleted ? 'deleted-row' : ''}
              style={{
                borderRadius: '12px',
                overflow: 'hidden'
              }}
              onRow={(record) => ({
                style: {
                  cursor: 'pointer',
                  transition: 'all 0.2s ease',
                },
                onMouseEnter: (e) => {
                  e.target.closest('tr').style.backgroundColor = '#f0f9ff';
                  e.target.closest('tr').style.transform = 'translateY(-1px)';
                  e.target.closest('tr').style.boxShadow = '0 4px 12px rgba(0,0,0,0.1)';
                },
                onMouseLeave: (e) => {
                  e.target.closest('tr').style.backgroundColor = '';
                  e.target.closest('tr').style.transform = '';
                  e.target.closest('tr').style.boxShadow = '';
                },
                onClick: () => selectHero(record),
              })}
            />
          )}
        </Card>

      {/* Heroes Management */}
      <Card 
        title={
          <Row justify="space-between" align="middle" gutter={[16, 16]}>
            <Col xs={24} sm={12}>
              <Space>
                <Title level={4} style={{ margin: 0 }}>
                  Quản lý Heroes
                </Title>
                <Tag color="blue">{filteredHeroes.length} heroes</Tag>
              </Space>
            </Col>
            <Col xs={24} sm={12} style={{ textAlign: 'right' }}>
              <Input
                placeholder="Tìm kiếm heroes..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                prefix={<SearchOutlined />}
                style={{ width: '100%', maxWidth: 300 }}
                allowClear
              />
            </Col>
          </Row>
        }
        style={{ marginBottom: '24px' }}
      >
        {filteredHeroes.length === 0 ? (
          <Empty 
            description={
              loading ? "Đang tải dữ liệu..." : 
              searchTerm ? "Không tìm thấy kết quả" : "Không có dữ liệu hero"
            }
          />
        ) : (
          <Table
            columns={heroColumns}
            dataSource={filteredHeroes}
            rowKey="heroId"
            loading={loading}
            pagination={false}
            scroll={{ x: 800 }}
            size="middle"
          />
        )}
      </Card>

        {/* Enhanced Hero Form Modal */}
        <Drawer
          title={
            <Space align="center" style={{ marginBottom: '16px' }}>
              <Avatar 
                size={32} 
                icon={<EditOutlined />}
                style={{ 
                  backgroundColor: '#1890ff',
                  background: 'linear-gradient(45deg, #1890ff, #36cfc9)'
                }}
              />
              <div>
                <Title level={4} style={{ margin: 0 }}>
                  Chỉnh sửa Hero Section
                </Title>
                <Text type="secondary" style={{ fontSize: '12px' }}>
                  ID: {selectedHero?.heroId || 'Mới'}
                </Text>
              </div>
            </Space>
          }
          width="90%"
          style={{ maxWidth: 1400 }}
          open={isEditingHero}
          onClose={closeHeroModal}
          destroyOnClose
          footer={
            <div style={{ 
              padding: '16px 24px',
              borderTop: '1px solid #f0f0f0',
              background: 'linear-gradient(90deg, #fafafa 0%, #f5f5f5 100%)'
            }}>
              <Row justify="space-between" align="middle">
                <Col>
                  <Space>
                    {selectedHero?.createdAt && (
                      <Text type="secondary" style={{ fontSize: '12px' }}>
                        <CalendarOutlined /> Tạo: {new Date(selectedHero.createdAt).toLocaleDateString('vi-VN')}
                      </Text>
                    )}
                    {selectedHero?.updatedAt && (
                      <Text type="secondary" style={{ fontSize: '12px' }}>
                        <SyncOutlined /> Cập nhật: {new Date(selectedHero.updatedAt).toLocaleDateString('vi-VN')}
                      </Text>
                    )}
                  </Space>
                </Col>
                <Col>
                  <Space>
                    <Button 
                      key="cancel" 
                      size="large"
                      onClick={closeHeroModal}
                      style={{ borderRadius: '8px' }}
                    >
                      Hủy
                    </Button>
                    <Button 
                      key="submit" 
                      type="primary" 
                      size="large"
                      loading={saving}
                      onClick={handleSave}
                      icon={<SaveOutlined />}
                      style={{ 
                        borderRadius: '8px',
                        background: 'linear-gradient(45deg, #1890ff, #36cfc9)',
                        border: 'none'
                      }}
                    >
                      {getSaveButtonText()}
                    </Button>
                  </Space>
                </Col>
              </Row>
            </div>
          }
        >
          <div style={{ padding: '24px 0' }}>
            {saving && (
              <div style={{ 
                position: 'absolute', 
                top: 0, 
                left: 0, 
                right: 0, 
                zIndex: 1000,
                background: 'rgba(255,255,255,0.8)',
                backdropFilter: 'blur(4px)'
              }}>
                <Progress percent={Math.random() * 100} strokeColor="#1890ff" showInfo={false} />
              </div>
            )}
            
            <Row gutter={[32, 24]}>
              {/* Hero Information Panel */}
              <Col xs={24} lg={14}>
                <Card 
                  title={
                    <Space>
                      <FileTextOutlined style={{ color: '#1890ff' }} />
                      <span>Thông tin Hero</span>
                    </Space>
                  }
                  style={{ 
                    height: '100%',
                    borderRadius: '12px',
                    boxShadow: '0 4px 16px rgba(0,0,0,0.1)'
                  }}
                  headStyle={{ 
                    background: 'linear-gradient(90deg, #f0f9ff 0%, #e6f7ff 100%)',
                    borderRadius: '12px 12px 0 0'
                  }}
                >
                  <Form layout="vertical" size="large">
                    <Form.Item 
                      label={
                        <Space>
                          <BulbOutlined style={{ color: '#faad14' }} />
                          <span>Tiền tố (Pre-heading)</span>
                        </Space>
                      }
                      validateStatus={validationErrors.preHeading ? 'error' : ''}
                      help={validationErrors.preHeading}
                    >
                      <Input
                        value={heroSection.preHeading}
                        onChange={(e) =>
                          setHeroSection({
                            ...heroSection,
                            preHeading: e.target.value,
                          })
                        }
                        placeholder="Ví dụ: Xin chào, tôi là..."
                        prefix={<UserOutlined style={{ color: '#bfbfbf' }} />}
                        style={{ borderRadius: '8px', height: '45px' }}
                      />
                    </Form.Item>
                    
                    <Form.Item 
                      label={
                        <Space>
                          <StarOutlined style={{ color: '#52c41a' }} />
                          <span>Tiêu đề chính (Heading)</span>
                        </Space>
                      }
                      validateStatus={validationErrors.heading ? 'error' : ''}
                      help={validationErrors.heading}
                    >
                      <Input
                        value={heroSection.heading}
                        onChange={(e) =>
                          setHeroSection({
                            ...heroSection,
                            heading: e.target.value,
                          })
                        }
                        placeholder="Ví dụ: Nguyễn Văn A - Full Stack Developer"
                        prefix={<ThunderboltOutlined style={{ color: '#bfbfbf' }} />}
                        style={{ 
                          borderRadius: '8px', 
                          height: '45px',
                          fontSize: '16px',
                          fontWeight: '500'
                        }}
                      />
                    </Form.Item>
                    
                    <Form.Item 
                      label={
                        <Space>
                          <FileTextOutlined style={{ color: '#1890ff' }} />
                          <span>Nội dung giới thiệu (HTML)</span>
                        </Space>
                      }
                      validateStatus={validationErrors.introHtml ? 'error' : ''}
                      help={validationErrors.introHtml}
                    >
                      <TextArea
                        rows={10}
                        value={heroSection.introHtml}
                        onChange={(e) =>
                          setHeroSection({
                            ...heroSection,
                            introHtml: e.target.value,
                          })
                        }
                        placeholder="Nhập nội dung HTML giới thiệu về bản thân, kỹ năng và kinh nghiệm..."
                        style={{ 
                          borderRadius: '8px',
                          fontFamily: 'Monaco, Consolas, monospace',
                          fontSize: '13px'
                        }}
                      />
                      <div style={{ marginTop: '8px' }}>
                        <Text type="secondary" style={{ fontSize: '12px' }}>
                          <InfoCircleOutlined /> Hỗ trợ HTML tags: &lt;strong&gt;, &lt;em&gt;, &lt;br&gt;, &lt;a&gt;, &lt;span&gt;
                        </Text>
                      </div>
                    </Form.Item>
                  </Form>
                </Card>
              </Col>
              
              {/* Sub-headings Management Panel */}
              <Col xs={24} lg={10}>
                <Card 
                  title={
                    <Space>
                      <MenuOutlined style={{ color: '#722ed1' }} />
                      <span>Sub-headings</span>
                      <Badge count={subHeadings.length} showZero color="#722ed1" />
                    </Space>
                  }
                  style={{ 
                    height: '100%',
                    borderRadius: '12px',
                    boxShadow: '0 4px 16px rgba(0,0,0,0.1)'
                  }}
                  headStyle={{ 
                    background: 'linear-gradient(90deg, #f9f0ff 0%, #efdbff 100%)',
                    borderRadius: '12px 12px 0 0'
                  }}
                >
                  {!selectedHero?.heroId ? (
                    <Result
                      icon={<InfoCircleOutlined style={{ color: '#1890ff' }} />}
                      title="Lưu hero trước"
                      subTitle="Vui lòng lưu thông tin hero trước để quản lý sub-headings"
                      extra={
                        <Button type="primary" onClick={handleSave} loading={saving}>
                          Lưu Hero
                        </Button>
                      }
                    />
                  ) : (
                    <div>
                      {/* Add new sub-heading */}
                      <Space.Compact style={{ width: '100%', marginBottom: '20px' }}>
                        <Input
                          placeholder="Nhập sub-heading mới..."
                          value={newSubHeading}
                          onChange={(e) => setNewSubHeading(e.target.value)}
                          onPressEnter={createSubHeading}
                          style={{ borderRadius: '8px 0 0 8px', height: '40px' }}
                          prefix={<PlusOutlined style={{ color: '#bfbfbf' }} />}
                        />
                        <Button
                          type="primary"
                          icon={<PlusOutlined />}
                          onClick={createSubHeading}
                          disabled={!newSubHeading.trim()}
                          style={{ 
                            borderRadius: '0 8px 8px 0',
                            height: '40px',
                            background: 'linear-gradient(45deg, #722ed1, #eb2f96)'
                          }}
                        >
                          Thêm
                        </Button>
                      </Space.Compact>

                      {/* Sub-headings list */}
                      {subHeadings.length === 0 ? (
                        <Empty 
                          description="Chưa có sub-heading nào"
                          image={Empty.PRESENTED_IMAGE_SIMPLE}
                          style={{ padding: '40px 20px' }}
                        />
                      ) : (
                        <List
                          dataSource={subHeadings}
                          renderItem={(sub, index) => (
                            <List.Item
                              style={{
                                padding: '12px 16px',
                                marginBottom: '8px',
                                background: index % 2 === 0 ? '#fafafa' : '#ffffff',
                                borderRadius: '8px',
                                border: '1px solid #f0f0f0',
                                transition: 'all 0.2s ease'
                              }}
                              actions={[
                                <Tooltip title="Di chuyển lên">
                                  <Button
                                    size="small"
                                    icon={<UpOutlined />}
                                    onClick={() => updateSortOrder(sub.subId, sub.sortOrder - 1)}
                                    disabled={index === 0}
                                    style={{ borderRadius: '4px' }}
                                  />
                                </Tooltip>,
                                <Tooltip title="Di chuyển xuống">
                                  <Button
                                    size="small"
                                    icon={<DownOutlined />}
                                    onClick={() => updateSortOrder(sub.subId, sub.sortOrder + 1)}
                                    disabled={index === subHeadings.length - 1}
                                    style={{ borderRadius: '4px' }}
                                  />
                                </Tooltip>,
                                <Popconfirm
                                  title="Xóa sub-heading này?"
                                  description="Hành động này không thể hoàn tác"
                                  onConfirm={() => deleteSubHeading(sub.subId)}
                                  okText="Có"
                                  cancelText="Không"
                                  icon={<QuestionCircleOutlined style={{ color: 'red' }} />}
                                >
                                  <Tooltip title="Xóa">
                                    <Button
                                      size="small"
                                      danger
                                      icon={<DeleteOutlined />}
                                      style={{ borderRadius: '4px' }}
                                    />
                                  </Tooltip>
                                </Popconfirm>,
                              ]}
                            >
                              {editingSubHeading === sub.subId ? (
                                <Input
                                  defaultValue={sub.text}
                                  onBlur={(e) => updateSubHeading(sub.subId, e.target.value)}
                                  onPressEnter={(e) => updateSubHeading(sub.subId, e.target.value)}
                                  autoFocus
                                  style={{ borderRadius: '6px' }}
                                />
                              ) : (
                                <div
                                  onClick={() => setEditingSubHeading(sub.subId)}
                                  style={{ 
                                    cursor: 'pointer',
                                    padding: '4px 8px',
                                    borderRadius: '4px',
                                    transition: 'background-color 0.2s ease'
                                  }}
                                  onMouseEnter={(e) => e.target.style.backgroundColor = '#e6f7ff'}
                                  onMouseLeave={(e) => e.target.style.backgroundColor = 'transparent'}
                                >
                                  <Space>
                                    <Tag color="purple" style={{ margin: 0 }}>
                                      {index + 1}
                                    </Tag>
                                    <Text style={{ fontSize: '14px' }}>
                                      {sub.text}
                                    </Text>
                                  </Space>
                                </div>
                              )}
                            </List.Item>
                          )}
                          style={{ maxHeight: '400px', overflowY: 'auto' }}
                        />
                      )}
                    </div>
                  )}
                </Card>
              </Col>
            </Row>
          </div>
        </Drawer>
      </div>
    </ConfigProvider>
  );
};

export default HeroManagement;
