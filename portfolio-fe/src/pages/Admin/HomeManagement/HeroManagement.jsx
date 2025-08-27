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
  Modal,
  Popconfirm,
  Tag,
  Tooltip,
  message,
  Empty,
  List,
  Alert,
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
} from "@ant-design/icons";
import { PageHeader } from 'components/Admin';

import heroSubHeadingApi from "api/admin/home/HeroSubHeadingApi";
import heroApi from "api/admin/home/HeroApi";
import { useNotificationContext } from "components/Notification";
import {
  ErrorFormatter,
  useDebounce,
  ValidationUtils,
} from "utils/Validation/validation";

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

  // Render sub-headings management
  const renderSubHeadingsManagement = () => {
    if (!selectedHero?.heroId) {
      return (
        <Alert
          message="Lưu hero trước để quản lý sub-headings"
          type="info"
          showIcon
        />
      );
    }

    return (
      <div>
        <Title level={5}>Sub-headings</Title>
        
        {/* Add new sub-heading */}
        <Space.Compact style={{ width: '100%', marginBottom: '16px' }}>
          <Input
            placeholder="Nhập sub-heading mới..."
            value={newSubHeading}
            onChange={(e) => setNewSubHeading(e.target.value)}
            onPressEnter={createSubHeading}
          />
          <Button
            type="primary"
            icon={<PlusOutlined />}
            onClick={createSubHeading}
            disabled={!newSubHeading.trim()}
          >
            Thêm
          </Button>
        </Space.Compact>

        {/* Sub-headings list */}
        <List
          dataSource={subHeadings}
          renderItem={(sub, index) => (
            <List.Item
              actions={[
                <Button
                  size="small"
                  icon={<UpOutlined />}
                  onClick={() => updateSortOrder(sub.subId, sub.sortOrder - 1)}
                  disabled={index === 0}
                />,
                <Button
                  size="small"
                  icon={<DownOutlined />}
                  onClick={() => updateSortOrder(sub.subId, sub.sortOrder + 1)}
                  disabled={index === subHeadings.length - 1}
                />,
                <Popconfirm
                  title="Xóa sub-heading này?"
                  onConfirm={() => deleteSubHeading(sub.subId)}
                  okText="Có"
                  cancelText="Không"
                >
                  <Button
                    size="small"
                    danger
                    icon={<DeleteOutlined />}
                  />
                </Popconfirm>,
              ]}
            >
              {editingSubHeading === sub.subId ? (
                <Input
                  defaultValue={sub.text}
                  onBlur={(e) => updateSubHeading(sub.subId, e.target.value)}
                  onPressEnter={(e) => updateSubHeading(sub.subId, e.target.value)}
                  autoFocus
                />
              ) : (
                <Text
                  onClick={() => setEditingSubHeading(sub.subId)}
                  style={{ cursor: 'pointer' }}
                >
                  {sub.text}
                </Text>
              )}
            </List.Item>
          )}
        />
      </div>
    );
  };

  // Fetch data on mount and when view mode changes
  useEffect(() => {
    fetchHeroData();
  }, [fetchHeroData]);

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
    <div className="space-y-6">
      {/* Error Alert */}
      {error && (
        <Alert
          message="Lỗi"
          description={error}
          type="error"
          closable
          onClose={() => setError(null)}
          style={{ marginBottom: '24px' }}
        />
      )}

      <PageHeader
        title="Quản lý Trang chủ"
        subtitle="Quản lý nội dung và layout của trang chủ"
        icon={HomeOutlined}
        actions={
          <div className="flex items-center space-x-3">
              {/* Header Actions */}
   
        <Row justify="space-between" align="middle">
          <Col>
            <Space>
              <Button
                icon={<ReloadOutlined />}
                onClick={() => fetchHeroData(true)}
                loading={loading}
              >
                {loading ? "Đang tải..." : "Làm mới"}
              </Button>
              <Button
                icon={<EyeOutlined />}
                onClick={handlePreview}
              >
                Xem trước
              </Button>
            </Space>
          </Col>
        </Row>
   
          </div>
        }
      />

   

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

      {/* Hero Form Modal */}
      <Modal
        title="Chỉnh sửa Hero"
        open={isEditingHero}
        onCancel={() => {
          closeHeroModal();
        }}
        footer={[
          <Button key="cancel" onClick={closeHeroModal}>
            Hủy
          </Button>,
          <Button 
            key="submit" 
            type="primary" 
            loading={saving}
            onClick={handleSave}
            icon={<SaveOutlined />}
          >
            {getSaveButtonText()}
          </Button>,
        ]}
        width="90%"
        style={{ maxWidth: 1200 }}
        destroyOnClose
      >
        <Row gutter={[24, 16]}>
          <Col xs={24} lg={12}>
            <Form layout="vertical">
              <Form.Item 
                label="Tiền tố (Pre-heading)"
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
                  placeholder="Ví dụ: Xin chào, tôi là"
                />
              </Form.Item>
              
              <Form.Item 
                label="Tiêu đề chính (Heading)"
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
                  placeholder="Ví dụ: Nguyễn Văn A"
                />
              </Form.Item>
              
              <Form.Item 
                label="Nội dung giới thiệu (HTML)"
                validateStatus={validationErrors.introHtml ? 'error' : ''}
                help={validationErrors.introHtml}
              >
                <TextArea
                  rows={8}
                  value={heroSection.introHtml}
                  onChange={(e) =>
                    setHeroSection({
                      ...heroSection,
                      introHtml: e.target.value,
                    })
                  }
                  placeholder="Nhập nội dung HTML giới thiệu..."
                />
              </Form.Item>
            </Form>
          </Col>
          
          <Col xs={24} lg={12}>
            {renderSubHeadingsManagement()}
          </Col>
        </Row>
      </Modal>
    </div>
  );
};

export default HeroManagement;
