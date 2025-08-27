import React, {
  useState,
  useEffect,
  useCallback,
  useMemo,
} from "react";
import {
  Badge,
  Button,
  Card,
  Col,
  Divider,
  Form,
  Image,
  Input,
  Modal,
  notification,
  Popconfirm,
  Row,
  Select,
  Space,
  Spin,
  Switch,
  Tag,
  Tooltip,
  Typography,
  Statistic,
  Avatar,
  Progress,
  Result,
  Dropdown,
  ConfigProvider,
  theme,
  FloatButton,
  Skeleton,
} from "antd";
import {
  DeleteOutlined,
  EditOutlined,
  ExclamationCircleOutlined,
  FolderOutlined,
  LinkOutlined,
  PlusOutlined,
  SearchOutlined,
  StarFilled,
  StarOutlined,
  ProjectOutlined,
  CopyOutlined,
  CalendarOutlined,
  CloudUploadOutlined,
  CheckCircleOutlined,
  QuestionCircleOutlined,
  MoreOutlined,
  SettingOutlined,
  FilterOutlined,
  ReloadOutlined,
  EyeOutlined,
  ClockCircleOutlined,
  AppstoreOutlined,
  CodeOutlined,
  GlobalOutlined,
  TagOutlined,
} from "@ant-design/icons";

import { ProjectApi, ProjectCategoryApi, ProjectTagApi } from "api/admin";

import "./Projects.scss";

const { Title, Text, Paragraph } = Typography;
const { Option } = Select;

// Enhanced fallback image with modern gradient design
const FALLBACK_IMAGE =
  "data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAwIiBoZWlnaHQ9IjI0MCIgdmlld0JveD0iMCAwIDQwMCAyNDAiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGRlZnM+PGxpbmVhckdyYWRpZW50IGlkPSJiZ0dyYWQiIHgxPSIwJSIgeTE9IjAlIiB4Mj0iMTAwJSIgeTI9IjEwMCUiPjxzdG9wIG9mZnNldD0iMCUiIHN0eWxlPSJzdG9wLWNvbG9yOiM2MzY2ZjE7c3RvcC1vcGFjaXR5OjAuMSIgLz48c3RvcCBvZmZzZXQ9IjEwMCUiIHN0eWxlPSJzdG9wLWNvbG9yOiM4YjVjZjY7c3RvcC1vcGFjaXR5OjAuMTUiIC8+PC9saW5lYXJHcmFkaWVudD48bGluZWFyR3JhZGllbnQgaWQ9Imljb25HcmFkIiB4MT0iMCUiIHkxPSIwJSIgeDI9IjEwMCUiIHkyPSIxMDAlIj48c3RvcCBvZmZzZXQ9IjAlIiBzdHlsZT0ic3RvcC1jb2xvcjojNjM2NmYxO3N0b3Atb3BhY2l0eTowLjYiIC8+PHN0b3Agb2Zmc2V0PSIxMDAlIiBzdHlsZT0ic3RvcC1jb2xvcjojOGI1Y2Y2O3N0b3Atb3BhY2l0eTowLjgiIC8+PC9saW5lYXJHcmFkaWVudD48L2RlZnM+PHJlY3Qgd2lkdGg9IjQwMCIgaGVpZ2h0PSIyNDAiIGZpbGw9InVybCgjYmdHcmFkKSIvPjxjaXJjbGUgY3g9IjIwMCIgY3k9IjEyMCIgcj0iNDAiIGZpbGw9InVybCgjaWNvbkdyYWQpIi8+PHBhdGggZD0iTTE4MCA5MGgyMHYxMGgtMjB6bTAgMjBoMjB2MTBoLTIwem0wIDIwaDE1djEwaC0xNXoiIGZpbGw9InVybCgjaWNvbkdyYWQpIi8+PC9zdmc+";

// ================== Chuẩn hóa dữ liệu từ BE -> FE (projectId/categoryId/tagId => id) ==================
const normalizeTag = (t) => ({ ...t, id: t.id || t.tagId });
const normalizeCategory = (c) => ({ ...c, id: c.id || c.categoryId });
const normalizeProject = (p) => ({
  ...p,
  id: p.id || p.projectId,
  category: p.category ? normalizeCategory(p.category) : null,
  tags: Array.isArray(p.tags) ? p.tags.map(normalizeTag) : [],
});

// Enhanced Multi-Select cho Tags với UI chuyên nghiệp
const TagsMultiSelect = React.memo(
  ({
    availableTags,
    selectedTagIds,
    onChange,
    disabled = false,
    onCreateTag = null,
  }) => {
    const [inputValue, setInputValue] = useState("");
    const [isCreatingTag, setIsCreatingTag] = useState(false);

    // Memoized validation cho tag name với enhanced rules
    const isValidTagName = useMemo(() => {
      const trimmedValue = inputValue.trim();
      const isValidLength = trimmedValue.length >= 2 && trimmedValue.length <= 50;
      const isNotDuplicate = !availableTags.some(
        (tag) => tag.name.toLowerCase() === trimmedValue.toLowerCase()
      );
      const hasValidCharacters = /^[a-zA-Z0-9\s\-.+#]+$/.test(trimmedValue);
      
      return isValidLength && isNotDuplicate && hasValidCharacters;
    }, [inputValue, availableTags]);

    // Enhanced create tag handler với loading state và animation
    const handleCreateNewTag = useCallback(async () => {
      if (!onCreateTag || !isValidTagName || isCreatingTag) return;

      const tagName = inputValue.trim();
      setIsCreatingTag(true);

      try {
        const newTag = await onCreateTag(tagName);
        if (newTag && newTag.id) {
          // Auto-select the newly created tag
          const updatedSelection = [...selectedTagIds, newTag.id];
          onChange(updatedSelection);
          
          // Clear input with smooth animation
          setInputValue("");
          
          // Enhanced success notification
          notification.success({
            message: '🎉 Thành công!',
            description: (
              <div>
                Đã thêm công nghệ <Tag color="blue">{tagName}</Tag> và chọn vào dự án
              </div>
            ),
            duration: 3,
            placement: 'topRight',
          });
        }
      } catch (error) {
        console.error("Error creating tag:", error);
        notification.error({
          message: '❌ Lỗi tạo công nghệ',
          description: `Không thể tạo công nghệ "${tagName}". Vui lòng thử lại.`,
          duration: 4,
          placement: 'topRight',
        });
      } finally {
        setIsCreatingTag(false);
      }
    }, [onCreateTag, isValidTagName, isCreatingTag, inputValue, selectedTagIds, onChange]);

    // Enhanced filter function với advanced search
    const filterOption = useCallback((input, option) => {
      const searchTerm = input.toLowerCase().trim();
      const tagName = option.children.toLowerCase();
      
      // Support fuzzy search và Vietnamese diacritics
      return tagName.includes(searchTerm) || 
             tagName.replace(/[àáạảãâầấậẩẫăằắặẳẵ]/g, 'a')
                    .replace(/[èéẹẻẽêềếệểễ]/g, 'e')
                    .replace(/[ìíịỉĩ]/g, 'i')
                    .replace(/[òóọỏõôồốộổỗơờớợởỡ]/g, 'o')
                    .replace(/[ùúụủũưừứựửữ]/g, 'u')
                    .replace(/[ỳýỵỷỹ]/g, 'y')
                    .replace(/đ/g, 'd')
                    .includes(searchTerm);
    }, []);

    // Handle Enter key với validation
    const handleKeyDown = useCallback((e) => {
      if (e.key === 'Enter' && isValidTagName && !isCreatingTag) {
        e.preventDefault();
        e.stopPropagation();
        handleCreateNewTag();
      }
    }, [isValidTagName, isCreatingTag, handleCreateNewTag]);

    // Enhanced dropdown render với modern design
    const dropdownRender = useCallback((menu) => (
      <div className="enhanced-tags-dropdown">
        {menu}
        {inputValue.trim() && onCreateTag && (
          <div className={`create-tag-section ${isValidTagName ? 'valid' : 'invalid'}`}>
            {isValidTagName ? (
              <Button
                type="text"
                icon={isCreatingTag ? <Spin size="small" /> : <PlusOutlined />}
                onClick={handleCreateNewTag}
                loading={isCreatingTag}
                disabled={isCreatingTag}
                className="create-tag-button success"
                block
              >
                {isCreatingTag 
                  ? `Đang tạo "${inputValue.trim()}"...`
                  : `✨ Tạo công nghệ "${inputValue.trim()}" (Enter)`
                }
              </Button>
            ) : (
              <div className="validation-message">
                <ExclamationCircleOutlined style={{ marginRight: 8, color: '#ff4d4f' }} />
                <Text type="secondary" style={{ fontSize: '12px' }}>
                  {inputValue.trim().length < 2 
                    ? "Tên công nghệ phải có ít nhất 2 ký tự"
                    : inputValue.trim().length > 50
                    ? "Tên công nghệ không được quá 50 ký tự"
                    : !/^[a-zA-Z0-9\s\-.+#]+$/.test(inputValue.trim())
                    ? "Chỉ được sử dụng chữ, số và các ký tự đặc biệt: - . + #"
                    : "Công nghệ này đã tồn tại"
                  }
                </Text>
              </div>
            )}
          </div>
        )}
      </div>
    ), [inputValue, onCreateTag, isValidTagName, isCreatingTag, handleCreateNewTag]);

    return (
      <div className="enhanced-tags-container">
        <Select
          mode="multiple"
          placeholder="🔍 Tìm kiếm hoặc tạo công nghệ mới cho dự án..."
          value={selectedTagIds}
          onChange={onChange}
          disabled={disabled || isCreatingTag}
          showSearch
          filterOption={filterOption}
          onSearch={setInputValue}
          onInputKeyDown={handleKeyDown}
          dropdownRender={dropdownRender}
          maxTagCount="responsive"
          style={{ width: "100%" }}
          size="large"
          allowClear
          tagRender={(props) => {
            const { label, closable, onClose } = props;
            const onPreventMouseDown = (event) => {
              event.preventDefault();
              event.stopPropagation();
            };
            return (
              <Tag
                color="processing"
                onMouseDown={onPreventMouseDown}
                closable={closable}
                onClose={onClose}
                style={{
                  marginRight: 3,
                  marginBottom: 3,
                  borderRadius: 6,
                  fontSize: '12px',
                  fontWeight: 500,
                }}
              >
                {label}
              </Tag>
            );
          }}
        >
          {availableTags.map((tag) => (
            <Option key={tag.id} value={tag.id}>
              <div style={{ display: 'flex', alignItems: 'center' }}>
                <Tag size="small" color="blue" style={{ margin: 0, marginRight: 8 }}>
                  {tag.name}
                </Tag>
                <Text type="secondary" style={{ fontSize: '11px' }}>
                  ID: {tag.id}
                </Text>
              </div>
            </Option>
          ))}
        </Select>
        
        {/* Enhanced info section */}
        <div className="tags-info-section">
          <div className="tags-help-text">
            <Text type="secondary" style={{ fontSize: "12px" }}>
              💡 Gõ để tìm kiếm hoặc nhấn Enter để tạo công nghệ mới
            </Text>
          </div>
          <div className="tags-counter">
            {selectedTagIds.length > 0 && (
              <Badge 
                count={selectedTagIds.length} 
                style={{ backgroundColor: '#6366f1' }}
                title={`Đã chọn ${selectedTagIds.length} công nghệ`}
              />
            )}
          </div>
        </div>
      </div>
    );
  }
);

// Modal Component chi tiết dự án sử dụng Ant Design
const ProjectDetailModal = React.memo(
  ({ project, isOpen, onClose, onEdit, formatDate }) => {
    if (!project) return null;

    return (
      <Modal
        title={
          <Space>
            <FolderOutlined style={{ color: "#1890ff" }} />
            Chi tiết dự án
          </Space>
        }
        open={isOpen}
        onCancel={onClose}
        footer={[
          <Button key="close" onClick={onClose}>
            Đóng
          </Button>,
          <Button
            key="edit"
            type="primary"
            icon={<EditOutlined />}
            onClick={() => onEdit(project)}
          >
            Chỉnh sửa
          </Button>,
        ]}
        width={800}
        style={{ top: 20 }}
        styles={{ body: { maxHeight: "70vh", overflowY: "auto" } }}
      >
        <Row gutter={[24, 24]}>
          {/* Image Section */}
          <Col xs={24} md={12}>
            <Image
              src={project.imageUrl || FALLBACK_IMAGE}
              alt={project.title}
              fallback={FALLBACK_IMAGE}
              style={{
                width: "100%",
                borderRadius: "8px",
                maxHeight: "240px",
                objectFit: "cover",
              }}
            />
          </Col>

          {/* Info Section */}
          <Col xs={24} md={12}>
            <Space direction="vertical" size="middle" style={{ width: "100%" }}>
              {/* Title & Category */}
              <div>
                <Title level={3} style={{ margin: 0, marginBottom: "8px" }}>
                  {project.title}
                </Title>
                {project.category && (
                  <Tag color="blue" style={{ marginBottom: "8px" }}>
                    {project.category.name}
                  </Tag>
                )}
                {project.isFeatured && (
                  <Tag color="gold" icon={<StarFilled />}>
                    Dự án nổi bật
                  </Tag>
                )}
              </div>

              {/* Status */}
              <div>
                <Text strong>Trạng thái: </Text>
                <Badge
                  status={
                    project.status === "published"
                      ? "success"
                      : project.status === "draft"
                      ? "warning"
                      : "default"
                  }
                  text={
                    project.status === "published"
                      ? "Đã xuất bản"
                      : project.status === "draft"
                      ? "Bản nháp"
                      : "Đã lưu trữ"
                  }
                />
              </div>

              {/* Links */}
              {(project.demoUrl || project.sourceUrl) && (
                <div>
                  <Text strong>Liên kết: </Text>
                  <Space>
                    {project.demoUrl && (
                      <Button
                        type="link"
                        icon={<LinkOutlined />}
                        href={project.demoUrl}
                        target="_blank"
                        size="small"
                      >
                        Demo
                      </Button>
                    )}
                    {project.sourceUrl && (
                      <Button
                        type="link"
                        icon={<FolderOutlined />}
                        href={project.sourceUrl}
                        target="_blank"
                        size="small"
                      >
                        Source Code
                      </Button>
                    )}
                  </Space>
                </div>
              )}

              {/* Dates */}
              <div>
                <Text type="secondary" style={{ fontSize: "12px" }}>
                  Tạo:{" "}
                  {formatDate
                    ? formatDate(project.createdAt)
                    : new Date(project.createdAt).toLocaleDateString("vi-VN")}
                  {project.updatedAt && (
                    <>
                      {" "}
                      • Cập nhật:{" "}
                      {formatDate
                        ? formatDate(project.updatedAt)
                        : new Date(project.updatedAt).toLocaleDateString(
                            "vi-VN"
                          )}
                    </>
                  )}
                </Text>
              </div>
            </Space>
          </Col>

          {/* Description */}
          <Col span={24}>
            <Divider orientation="left">Mô tả dự án</Divider>
            <Text style={{ whiteSpace: "pre-wrap", lineHeight: "1.6" }}>
              {project.description || "Chưa có mô tả cho dự án này."}
            </Text>
          </Col>

          {/* Technologies */}
          {project.tags && project.tags.length > 0 && (
            <Col span={24}>
              <Divider orientation="left">Công nghệ sử dụng</Divider>
              <Space wrap>
                {project.tags.map((tag, index) => (
                  <Tag
                    key={tag.id || index}
                    color="processing"
                    style={{ marginBottom: "4px" }}
                  >
                    {tag.name}
                  </Tag>
                ))}
              </Space>
            </Col>
          )}
        </Row>
      </Modal>
    );
  }
);

// Create/Edit Modal component cho Projects sử dụng Ant Design
const ProjectFormModal = React.memo(
  ({
    isOpen,
    isEdit,
    project,
    onClose,
    onSubmit,
    categories,
    tags,
    onCreateTag,
  }) => {
    const [form] = Form.useForm();
    const [isSubmitting, setIsSubmitting] = useState(false);

    // Reset form when modal opens/closes or project changes
    useEffect(() => {
      if (isOpen) {
        if (isEdit && project) {
          form.setFieldsValue({
            title: project.title || "",
            description: project.description || "",
            imageUrl: project.imageUrl || "",
            demoUrl: project.demoUrl || "",
            sourceUrl: project.sourceUrl || "",
            categoryId: project.category?.id || "",
            tagIds: project.tags ? project.tags.map((tag) => tag.id) : [],
            status: project.status || "draft",
            isFeatured: Boolean(project.isFeatured),
          });
        } else {
          form.resetFields();
        }
      }
    }, [isOpen, isEdit, project, form]);

    const handleSubmit = async (values) => {
      setIsSubmitting(true);
      try {
        await onSubmit(values);
        onClose();
        form.resetFields();
      } catch (error) {
        console.error("Error submitting form:", error);
      } finally {
        setIsSubmitting(false);
      }
    };

    const handleCreateNewTag = useCallback(
      async (tagName) => {
        try {
          const newTag = await onCreateTag(tagName);
          // TagsMultiSelect sẽ tự động xử lý việc thêm tag vào selection
          // Chỉ cần return newTag để TagsMultiSelect biết việc tạo tag thành công
          return newTag;
        } catch (error) {
          console.error("Error creating tag in form:", error);
          throw error;
        }
      },
      [onCreateTag]
    );

    const validateUrl = (_, value) => {
      if (!value) return Promise.resolve();
      const urlRegex = /^(https?|ftp):\/\/[^\s/$.?#].[^\s]*$/;
      if (!urlRegex.test(value)) {
        return Promise.reject(new Error("URL không hợp lệ"));
      }
      return Promise.resolve();
    };

    return (
      <Modal
        title={
          <Space>
            <EditOutlined style={{ color: "#1890ff" }} />
            {isEdit ? "Chỉnh sửa dự án" : "Thêm dự án mới"}
          </Space>
        }
        open={isOpen}
        onCancel={onClose}
        footer={[
          <Button key="cancel" onClick={onClose}>
            Hủy
          </Button>,
          <Button
            key="submit"
            type="primary"
            loading={isSubmitting}
            onClick={() => form.submit()}
          >
            {isEdit ? "Cập nhật" : "Tạo mới"}
          </Button>,
        ]}
        width={900}
        style={{ top: 20 }}
        styles={{ body: { maxHeight: "70vh", overflowY: "auto" } }}
      >
        <Form
          form={form}
          layout="vertical"
          onFinish={handleSubmit}
          initialValues={{
            status: "draft",
            isFeatured: false,
            tagIds: [],
          }}
        >
          <Row gutter={24}>
            {/* Left Column */}
            <Col xs={24} md={12}>
              <Form.Item
                name="title"
                label="Tên dự án"
                rules={[
                  { required: true, message: "Tên dự án là bắt buộc" },
                  { min: 3, message: "Tên dự án phải có ít nhất 3 ký tự" },
                ]}
              >
                <Input placeholder="Nhập tên dự án..." />
              </Form.Item>

              <Form.Item
                name="description"
                label="Mô tả dự án"
                rules={[
                  { required: true, message: "Mô tả dự án là bắt buộc" },
                  { min: 10, message: "Mô tả phải có ít nhất 10 ký tự" },
                ]}
              >
                <Input.TextArea
                  rows={4}
                  placeholder="Mô tả chi tiết về dự án..."
                />
              </Form.Item>

              <Form.Item
                name="imageUrl"
                label="URL hình ảnh"
                rules={[{ validator: validateUrl }]}
              >
                <Input placeholder="https://example.com/image.jpg" />
              </Form.Item>

              <Row gutter={16}>
                <Col span={12}>
                  <Form.Item
                    name="demoUrl"
                    label="URL Demo"
                    rules={[{ validator: validateUrl }]}
                  >
                    <Input placeholder="https://demo.example.com" />
                  </Form.Item>
                </Col>
                <Col span={12}>
                  <Form.Item
                    name="sourceUrl"
                    label="URL Source Code"
                    rules={[{ validator: validateUrl }]}
                  >
                    <Input placeholder="https://github.com/username/repo" />
                  </Form.Item>
                </Col>
              </Row>
            </Col>

            {/* Right Column */}
            <Col xs={24} md={12}>
              <Form.Item
                name="categoryId"
                label="Danh mục"
                rules={[{ required: true, message: "Vui lòng chọn danh mục" }]}
              >
                <Select placeholder="Chọn danh mục">
                  {categories.map((category) => (
                    <Option key={category.id} value={category.id}>
                      {category.name}
                    </Option>
                  ))}
                </Select>
              </Form.Item>

              <Form.Item
                name="tagIds"
                label="Công nghệ sử dụng"
                rules={[
                  {
                    required: true,
                    message: "Vui lòng chọn ít nhất một công nghệ",
                  },
                  {
                    validator: (_, value) => {
                      if (!value || value.length === 0) {
                        return Promise.reject(new Error("Vui lòng chọn ít nhất một công nghệ"));
                      }
                      if (value.length > 20) {
                        return Promise.reject(new Error("Không thể chọn quá 20 công nghệ"));
                      }
                      return Promise.resolve();
                    }
                  }
                ]}
              >
                <Form.Item 
                  noStyle 
                  shouldUpdate={(prevValues, currentValues) => 
                    prevValues.tagIds !== currentValues.tagIds
                  }
                >
                  {({ getFieldValue }) => (
                    <TagsMultiSelect
                      availableTags={tags}
                      selectedTagIds={getFieldValue("tagIds") || []}
                      onChange={(tagIds) => form.setFieldsValue({ tagIds })}
                      onCreateTag={handleCreateNewTag}
                    />
                  )}
                </Form.Item>
              </Form.Item>

              <Form.Item name="status" label="Trạng thái">
                <Select>
                  <Option value="draft">Bản nháp</Option>
                  <Option value="published">Đã xuất bản</Option>
                  <Option value="archived">Đã lưu trữ</Option>
                </Select>
              </Form.Item>

              <Form.Item name="isFeatured" valuePropName="checked">
                <Switch checkedChildren="Nổi bật" unCheckedChildren="Thường" />
                <Text type="secondary" style={{ marginLeft: "8px" }}>
                  Đánh dấu là dự án nổi bật
                </Text>
              </Form.Item>

              {/* Preview */}
              <Form.Item
                shouldUpdate={(prevValues, currentValues) =>
                  prevValues.imageUrl !== currentValues.imageUrl
                }
              >
                {({ getFieldValue }) => {
                  const imageUrl = getFieldValue("imageUrl");
                  return imageUrl ? (
                    <div>
                      <Text
                        strong
                        style={{ display: "block", marginBottom: "8px" }}
                      >
                        Xem trước hình ảnh:
                      </Text>
                      <Image
                        src={imageUrl}
                        alt="Preview"
                        fallback={FALLBACK_IMAGE}
                        style={{
                          width: "100%",
                          maxHeight: "120px",
                          objectFit: "cover",
                          borderRadius: "8px",
                        }}
                      />
                    </div>
                  ) : null;
                }}
              </Form.Item>
            </Col>
          </Row>
        </Form>
      </Modal>
    );
  }
);

function ProjectsManagement() {
  // Replace useNotificationContext with antd notification
  const [api, contextHolder] = notification.useNotification();

  // State management with better organization
  const [state, setState] = useState({
    projects: [],
    categories: [],
    tags: [],
    isLoading: true,
    searchTerm: "",
    selectedCategory: "",
    selectedStatus: "",
    currentPage: 1,
    itemsPerPage: 12,
  });

  const [modals, setModals] = useState({
    detail: { isOpen: false, project: null },
    form: { isOpen: false, isEdit: false, project: null },
  });

  // Memoized filtered projects
  const filteredProjects = useMemo(() => {
    return state.projects.filter((project) => {
      const matchesSearch =
        project.title.toLowerCase().includes(state.searchTerm.toLowerCase()) ||
        project.description
          ?.toLowerCase()
          .includes(state.searchTerm.toLowerCase()) ||
        project.tags?.some((tag) =>
          tag.name.toLowerCase().includes(state.searchTerm.toLowerCase())
        );

      const matchesCategory =
        !state.selectedCategory ||
        project.category?.id === state.selectedCategory;

      const matchesStatus =
        !state.selectedStatus || project.status === state.selectedStatus;

      return matchesSearch && matchesCategory && matchesStatus;
    });
  }, [
    state.projects,
    state.searchTerm,
    state.selectedCategory,
    state.selectedStatus,
  ]);

  // Memoized pagination
  const paginatedProjects = useMemo(() => {
    const startIndex = (state.currentPage - 1) * state.itemsPerPage;
    return filteredProjects.slice(startIndex, startIndex + state.itemsPerPage);
  }, [filteredProjects, state.currentPage, state.itemsPerPage]);

  // Data fetching functions
  const fetchData = useCallback(async () => {
    setState((prev) => ({ ...prev, isLoading: true }));

    try {
      const [projectsRes, categoriesRes, tagsRes] = await Promise.all([
        ProjectApi.getAll(),
        ProjectCategoryApi.getAll(),
        ProjectTagApi.getAll(),
      ]);

      setState((prev) => ({
        ...prev,
        projects: projectsRes.data.map(normalizeProject),
        categories: categoriesRes.data.map(normalizeCategory),
        tags: tagsRes.data.map(normalizeTag),
        isLoading: false,
      }));
    } catch (error) {
      console.error("Error fetching data:", error);
      api.error({
        message: "Lỗi tải dữ liệu",
        description: "Không thể tải danh sách dự án. Vui lòng thử lại.",
      });
      setState((prev) => ({ ...prev, isLoading: false }));
    }
  }, [api]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  // Modal handlers
  const openDetailModal = useCallback((project) => {
    setModals((prev) => ({
      ...prev,
      detail: { isOpen: true, project },
    }));
  }, []);

  const closeDetailModal = useCallback(() => {
    setModals((prev) => ({
      ...prev,
      detail: { isOpen: false, project: null },
    }));
  }, []);

  const openFormModal = useCallback((isEdit = false, project = null) => {
    setModals((prev) => ({
      ...prev,
      form: { isOpen: true, isEdit, project },
    }));
  }, []);

  const closeFormModal = useCallback(() => {
    setModals((prev) => ({
      ...prev,
      form: { isOpen: false, isEdit: false, project: null },
    }));
  }, []);

  // CRUD operations
  const handleCreateProject = useCallback(
    async (formData) => {
      try {
        const createData = {
          ...formData,
          tagNames: state.tags
            .filter((tag) => formData.tagIds.includes(tag.id))
            .map((tag) => tag.name),
        };
        delete createData.tagIds;

        const response = await ProjectApi.create(createData);
        const newProject = normalizeProject(response.data);

        setState((prev) => ({
          ...prev,
          projects: [newProject, ...prev.projects],
        }));

        api.success({
          message: "Thành công",
          description: "Dự án đã được tạo thành công!",
        });
      } catch (error) {
        console.error("Error creating project:", error);
        api.error({
          message: "Lỗi tạo dự án",
          description: "Không thể tạo dự án. Vui lòng thử lại.",
        });
        throw error;
      }
    },
    [state.tags, api]
  );

  const handleUpdateProject = useCallback(
    async (formData) => {
      try {
        const updateData = {
          ...formData,
          tagNames: state.tags
            .filter((tag) => formData.tagIds.includes(tag.id))
            .map((tag) => tag.name),
        };
        delete updateData.tagIds;

        const response = await ProjectApi.update(
          modals.form.project.id,
          updateData
        );
        const updatedProject = normalizeProject(response.data);

        setState((prev) => ({
          ...prev,
          projects: prev.projects.map((p) =>
            p.id === updatedProject.id ? updatedProject : p
          ),
        }));

        api.success({
          message: "Thành công",
          description: "Dự án đã được cập nhật thành công!",
        });
      } catch (error) {
        console.error("Error updating project:", error);
        api.error({
          message: "Lỗi cập nhật dự án",
          description: "Không thể cập nhật dự án. Vui lòng thử lại.",
        });
        throw error;
      }
    },
    [modals.form.project, state.tags, api]
  );

  const handleDeleteProject = useCallback(
    async (projectId) => {
      try {
        await ProjectApi.delete(projectId);

        setState((prev) => ({
          ...prev,
          projects: prev.projects.filter((p) => p.id !== projectId),
        }));

        api.success({
          message: "Thành công",
          description: "Dự án đã được xóa thành công!",
        });
      } catch (error) {
        console.error("Error deleting project:", error);
        api.error({
          message: "Lỗi xóa dự án",
          description: "Không thể xóa dự án. Vui lòng thử lại.",
        });
      }
    },
    [api]
  );

  const handleToggleFeatured = useCallback(
    async (projectId, currentFeatured) => {
      try {
        const response = await ProjectApi.update(projectId, {
          isFeatured: !currentFeatured,
        });
        const updatedProject = normalizeProject(response.data);

        setState((prev) => ({
          ...prev,
          projects: prev.projects.map((p) =>
            p.id === projectId ? updatedProject : p
          ),
        }));

        api.success({
          message: "Thành công",
          description: `Dự án đã được ${
            !currentFeatured ? "đánh dấu nổi bật" : "bỏ nổi bật"
          }!`,
        });
      } catch (error) {
        console.error("Error toggling featured:", error);
        api.error({
          message: "Lỗi cập nhật",
          description:
            "Không thể cập nhật trạng thái nổi bật. Vui lòng thử lại.",
        });
      }
    },
    [api]
  );

  const handleCreateTag = useCallback(
    async (tagName) => {
      try {
        const response = await ProjectTagApi.create({ name: tagName.trim() });
        const newTag = normalizeTag(response.data);

        setState((prev) => ({
          ...prev,
          tags: [...prev.tags, newTag],
        }));

        api.success({
          message: "Thành công",
          description: `Công nghệ "${tagName}" đã được thêm thành công!`,
        });

        return newTag;
      } catch (error) {
        console.error("Error creating tag:", error);
        api.error({
          message: "Lỗi tạo công nghệ",
          description: "Không thể tạo công nghệ mới. Vui lòng thử lại.",
        });
        throw error;
      }
    },
    [api]
  );

  // Submit handler for form modal
  const handleFormSubmit = useCallback(
    async (formData) => {
      if (modals.form.isEdit) {
        await handleUpdateProject(formData);
      } else {
        await handleCreateProject(formData);
      }
    },
    [modals.form.isEdit, handleUpdateProject, handleCreateProject]
  );

  // Filter handlers
  const handleSearch = useCallback((value) => {
    setState((prev) => ({
      ...prev,
      searchTerm: value,
      currentPage: 1,
    }));
  }, []);

  const handleCategoryFilter = useCallback((categoryId) => {
    setState((prev) => ({
      ...prev,
      selectedCategory: categoryId,
      currentPage: 1,
    }));
  }, []);

  const handleStatusFilter = useCallback((status) => {
    setState((prev) => ({
      ...prev,
      selectedStatus: status,
      currentPage: 1,
    }));
  }, []);

  // Format date helper
  const formatDate = useCallback((dateString) => {
    return new Date(dateString).toLocaleDateString("vi-VN");
  }, []);

  return (
    <ConfigProvider
      theme={{
        algorithm: theme.compactAlgorithm,
        token: {
          colorPrimary: '#6366f1',
          borderRadius: 8,
          colorBgContainer: '#ffffff',
          boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
        },
      }}
    >
      <div className="projects-management-container" style={{ padding: '24px', minHeight: '100vh', backgroundColor: '#f5f7fa' }}>
        {contextHolder}
        
        {/* Floating Action Button */}
        <FloatButton.Group
          trigger="hover"
          type="primary"
          style={{ right: 24 }}
          icon={<SettingOutlined />}
        >
          <FloatButton 
            icon={<PlusOutlined />} 
            tooltip="Thêm dự án mới"
            onClick={() => openFormModal(false)}
          />
          <FloatButton 
            icon={<ReloadOutlined />} 
            tooltip="Làm mới dữ liệu"
            onClick={() => fetchData()}
          />
          <FloatButton 
            icon={<EyeOutlined />} 
            tooltip="Xem trước trang"
            onClick={() => window.open("/projects", "_blank")}
          />
        </FloatButton.Group>

        {/* Enhanced Page Header */}
        <Card 
          style={{ 
            marginBottom: '24px',
            borderRadius: '16px',
            background: 'linear-gradient(135deg, #6366f1 0%, #8b5cf6 100%)',
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
                    icon={<ProjectOutlined />} 
                    style={{ 
                      backgroundColor: 'rgba(255,255,255,0.2)',
                      color: 'white',
                      backdropFilter: 'blur(10px)'
                    }}
                  />
                  <div>
                    <Title level={2} style={{ color: 'white', margin: 0 }}>
                      Quản lý Dự án
                    </Title>
                    <Text style={{ color: 'rgba(255,255,255,0.8)', fontSize: '16px' }}>
                      Tạo và quản lý portfolio dự án một cách chuyên nghiệp
                    </Text>
                  </div>
                </Space>
                
                {/* Statistics Cards */}
                <Row gutter={16} style={{ marginTop: '16px' }}>
                  <Col span={6}>
                    <Statistic
                      title={<span style={{ color: 'rgba(255,255,255,0.8)' }}>Tổng dự án</span>}
                      value={state.projects.length}
                      prefix={<AppstoreOutlined style={{ color: 'white' }} />}
                      valueStyle={{ color: 'white', fontSize: '20px' }}
                    />
                  </Col>
                  <Col span={6}>
                    <Statistic
                      title={<span style={{ color: 'rgba(255,255,255,0.8)' }}>Đã xuất bản</span>}
                      value={state.projects.filter(p => p.status === 'published').length}
                      prefix={<CheckCircleOutlined style={{ color: '#52c41a' }} />}
                      valueStyle={{ color: 'white', fontSize: '20px' }}
                    />
                  </Col>
                  <Col span={6}>
                    <Statistic
                      title={<span style={{ color: 'rgba(255,255,255,0.8)' }}>Nổi bật</span>}
                      value={state.projects.filter(p => p.isFeatured).length}
                      prefix={<StarFilled style={{ color: '#faad14' }} />}
                      valueStyle={{ color: 'white', fontSize: '20px' }}
                    />
                  </Col>
                  <Col span={6}>
                    <Statistic
                      title={<span style={{ color: 'rgba(255,255,255,0.8)' }}>Công nghệ</span>}
                      value={state.tags.length}
                      prefix={<TagOutlined style={{ color: 'white' }} />}
                      valueStyle={{ color: 'white', fontSize: '20px' }}
                    />
                  </Col>
                </Row>
              </Space>
            </Col>
            
            <Col xs={24} lg={8} style={{ textAlign: 'right' }}>
              <Space direction="vertical" align="end" size="middle">
                <Button
                  type="primary"
                  size="large"
                  ghost
                  icon={<PlusOutlined />}
                  onClick={() => openFormModal(false)}
                  style={{ 
                    borderColor: 'white',
                    color: 'white',
                    backgroundColor: 'rgba(255,255,255,0.1)',
                    backdropFilter: 'blur(10px)',
                    borderRadius: '12px',
                    fontWeight: '500'
                  }}
                >
                  Thêm dự án mới
                </Button>
                
                <Progress
                  percent={Math.round((state.projects.filter(p => p.status === 'published').length / Math.max(state.projects.length, 1)) * 100)}
                  strokeColor="white"
                  trailColor="rgba(255,255,255,0.2)"
                  showInfo={false}
                  size="small"
                />
              </Space>
            </Col>
          </Row>
        </Card>

        {/* Enhanced Filters Section */}
        <Card 
          style={{ 
            marginBottom: '24px',
            borderRadius: '16px',
            boxShadow: '0 8px 32px rgba(0,0,0,0.1)',
            border: '1px solid rgba(255,255,255,0.2)',
            backdropFilter: 'blur(20px)'
          }}
          styles={{ body: { padding: '24px' } }}
        >
          <Row justify="space-between" align="middle" gutter={[16, 16]} style={{ marginBottom: '16px' }}>
            <Col xs={24} sm={12}>
              <Space align="center">
                <Avatar 
                  size={32} 
                  icon={<FilterOutlined />}
                  style={{ backgroundColor: '#6366f1' }}
                />
                <Title level={4} style={{ margin: 0 }}>
                  Bộ lọc & Tìm kiếm
                </Title>
              </Space>
            </Col>
            
            <Col xs={24} sm={12} style={{ textAlign: 'right' }}>
              <Badge count={filteredProjects.length} showZero>
                <Button 
                  icon={<ReloadOutlined />}
                  onClick={() => fetchData()}
                  loading={state.isLoading}
                  style={{ borderRadius: '8px' }}
                >
                  Làm mới
                </Button>
              </Badge>
            </Col>
          </Row>
          
          <Row gutter={[16, 16]} align="middle">
            <Col xs={24} sm={12} md={8}>
              <Input.Search
                placeholder="🔍 Tìm kiếm dự án, mô tả, công nghệ..."
                value={state.searchTerm}
                onChange={(e) => handleSearch(e.target.value)}
                size="large"
                allowClear
                style={{ borderRadius: '12px' }}
                enterButton={
                  <Button 
                    type="primary" 
                    icon={<SearchOutlined />}
                    style={{ borderRadius: '0 12px 12px 0', background: 'linear-gradient(45deg, #6366f1, #8b5cf6)' }}
                  >
                    Tìm
                  </Button>
                }
              />
            </Col>
            
            <Col xs={24} sm={6} md={5}>
              <Select
                placeholder="📁 Danh mục"
                value={state.selectedCategory}
                onChange={handleCategoryFilter}
                style={{ width: "100%" }}
                size="large"
                allowClear
                suffixIcon={<FolderOutlined />}
              >
                {state.categories.map((category) => (
                  <Option key={category.id} value={category.id}>
                    <Space>
                      <Tag color="blue" size="small">{category.name}</Tag>
                    </Space>
                  </Option>
                ))}
              </Select>
            </Col>
            
            <Col xs={24} sm={6} md={5}>
              <Select
                placeholder="📊 Trạng thái"
                value={state.selectedStatus}
                onChange={handleStatusFilter}
                style={{ width: "100%" }}
                size="large"
                allowClear
                suffixIcon={<CheckCircleOutlined />}
              >
                <Option value="published">
                  <Space>
                    <CheckCircleOutlined style={{ color: '#52c41a' }} />
                    Đã xuất bản
                  </Space>
                </Option>
                <Option value="draft">
                  <Space>
                    <ClockCircleOutlined style={{ color: '#faad14' }} />
                    Bản nháp
                  </Space>
                </Option>
                <Option value="archived">
                  <Space>
                    <ExclamationCircleOutlined style={{ color: '#8c8c8c' }} />
                    Đã lưu trữ
                  </Space>
                </Option>
              </Select>
            </Col>
            
            <Col xs={24} sm={24} md={6}>
              <Space style={{ width: '100%', justifyContent: 'flex-end' }}>
                <Dropdown
                  menu={{
                    items: [
                      {
                        key: 'export',
                        icon: <CloudUploadOutlined />,
                        label: 'Xuất dữ liệu',
                      },
                      {
                        key: 'import',
                        icon: <GlobalOutlined />,
                        label: 'Nhập dữ liệu',
                      },
                      {
                        key: 'settings',
                        icon: <SettingOutlined />,
                        label: 'Cài đặt hiển thị',
                      },
                    ],
                  }}
                  trigger={['click']}
                >
                  <Button 
                    icon={<MoreOutlined />} 
                    style={{ borderRadius: '8px' }}
                  >
                    Thêm
                  </Button>
                </Dropdown>
              </Space>
            </Col>
          </Row>
        </Card>

        {/* Enhanced Projects Grid */}
        {state.isLoading ? (
          <Card style={{ borderRadius: '16px', border: 'none', boxShadow: '0 4px 16px rgba(0,0,0,0.1)' }}>
            <div style={{ padding: '60px 0', textAlign: 'center' }}>
              <Spin size="large" />
              <div style={{ marginTop: '16px' }}>
                <Text style={{ color: '#6366f1', fontSize: '16px', fontWeight: '500' }}>
                  Đang tải dự án...
                </Text>
              </div>
              {/* Enhanced loading skeletons */}
              <Row gutter={[24, 24]} style={{ marginTop: '32px' }}>
                {[1, 2, 3, 4, 5, 6].map(index => (
                  <Col xs={24} sm={12} lg={8} xl={6} key={index}>
                    <Card style={{ borderRadius: '12px' }}>
                      <Skeleton.Image style={{ width: '100%', height: '180px' }} />
                      <div style={{ padding: '16px 0' }}>
                        <Skeleton active paragraph={{ rows: 3 }} />
                      </div>
                    </Card>
                  </Col>
                ))}
              </Row>
            </div>
          </Card>
        ) : filteredProjects.length === 0 ? (
          <Result
            icon={state.searchTerm || state.selectedCategory || state.selectedStatus ? 
              <SearchOutlined style={{ color: '#6366f1', fontSize: '64px' }} /> : 
              <AppstoreOutlined style={{ color: '#6366f1', fontSize: '64px' }} />
            }
            title={state.searchTerm || state.selectedCategory || state.selectedStatus ? 
              "Không tìm thấy dự án" : "Chưa có dự án nào"
            }
            subTitle={
              state.searchTerm || state.selectedCategory || state.selectedStatus ?
                "Không có dự án nào khớp với bộ lọc hiện tại. Thử điều chỉnh bộ lọc hoặc tạo dự án mới." :
                "Bắt đầu tạo dự án đầu tiên cho portfolio của bạn"
            }
            extra={
              <Space>
                {(state.searchTerm || state.selectedCategory || state.selectedStatus) && (
                  <Button 
                    onClick={() => {
                      setState(prev => ({
                        ...prev,
                        searchTerm: '',
                        selectedCategory: '',
                        selectedStatus: '',
                        currentPage: 1
                      }));
                    }}
                    style={{ borderRadius: '8px' }}
                  >
                    Xóa bộ lọc
                  </Button>
                )}
                <Button 
                  type="primary" 
                  icon={<PlusOutlined />}
                  onClick={() => openFormModal(false)}
                  style={{ 
                    borderRadius: '8px',
                    background: 'linear-gradient(45deg, #6366f1, #8b5cf6)',
                    border: 'none'
                  }}
                >
                  Tạo dự án đầu tiên
                </Button>
              </Space>
            }
            style={{ 
              padding: '80px 24px',
              background: 'linear-gradient(135deg, #f8fafc 0%, #f1f5f9 100%)',
              borderRadius: '16px',
              border: '2px dashed #e2e8f0'
            }}
          />
        ) : (
          <div>
            {/* Projects Grid with enhanced design */}
            <Row gutter={[24, 24]} style={{ marginBottom: '32px' }}>
              {paginatedProjects.map((project, index) => (
                <Col xs={24} sm={12} lg={8} xl={6} key={project.id}>
                  <Card
                    hoverable
                    cover={
                      <div
                        style={{
                          position: "relative",
                          height: "200px",
                          overflow: "hidden",
                          background: 'linear-gradient(135deg, #f1f5f9 0%, #e2e8f0 100%)',
                        }}
                      >
                        <Image
                          alt={project.title}
                          src={project.imageUrl || FALLBACK_IMAGE}
                          fallback={FALLBACK_IMAGE}
                          style={{
                            width: "100%",
                            height: "200px",
                            objectFit: "cover",
                            transition: "transform 0.3s ease",
                          }}
                          preview={false}
                        />

                        {/* Status Badge */}
                        <div style={{ position: "absolute", top: "12px", left: "12px" }}>
                          <Badge
                            status={project.status === "published" ? "success" : project.status === "draft" ? "warning" : "default"}
                            text={
                              <span style={{
                                backgroundColor: "rgba(255,255,255,0.95)",
                                padding: "4px 8px",
                                borderRadius: "12px",
                                fontSize: "11px",
                                fontWeight: "600",
                                color: project.status === "published" ? "#16a34a" : project.status === "draft" ? "#d97706" : "#6b7280",
                                backdropFilter: "blur(8px)",
                                border: "1px solid rgba(255,255,255,0.3)"
                              }}>
                                {project.status === "published" ? "Đã xuất bản" : project.status === "draft" ? "Bản nháp" : "Đã lưu trữ"}
                              </span>
                            }
                          />
                        </div>

                        {/* Featured Badge */}
                        {project.isFeatured && (
                          <div style={{ position: "absolute", top: "12px", right: "12px" }}>
                            <Badge
                              count={<StarFilled style={{ color: "#f59e0b" }} />}
                              style={{
                                backgroundColor: "rgba(255,255,255,0.95)",
                                padding: "4px 8px",
                                borderRadius: "12px",
                                backdropFilter: "blur(8px)",
                                border: "1px solid rgba(255,255,255,0.3)"
                              }}
                            />
                          </div>
                        )}

                        {/* Overlay on hover */}
                        <div 
                          style={{
                            position: "absolute",
                            top: 0,
                            left: 0,
                            right: 0,
                            bottom: 0,
                            background: "linear-gradient(45deg, rgba(99, 102, 241, 0.8), rgba(139, 92, 246, 0.8))",
                            opacity: 0,
                            transition: "opacity 0.3s ease",
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center"
                          }}
                          className="project-overlay"
                        >
                          <Space>
                            <Button 
                              type="primary" 
                              ghost 
                              icon={<EyeOutlined />}
                              onClick={() => openDetailModal(project)}
                              style={{ borderColor: 'white', color: 'white' }}
                            >
                              Xem
                            </Button>
                            <Button 
                              type="primary" 
                              ghost 
                              icon={<EditOutlined />}
                              onClick={() => openFormModal(true, project)}
                              style={{ borderColor: 'white', color: 'white' }}
                            >
                              Sửa
                            </Button>
                          </Space>
                        </div>
                      </div>
                    }
                    actions={[
                      <Tooltip title="Chỉnh sửa">
                        <Button
                          type="text"
                          icon={<EditOutlined />}
                          onClick={() => openFormModal(true, project)}
                          style={{ color: '#6366f1' }}
                        />
                      </Tooltip>,
                      <Tooltip title="Xóa">
                        <Popconfirm
                          title="Xác nhận xóa"
                          description="Bạn có chắc chắn muốn xóa dự án này?"
                          onConfirm={() => handleDeleteProject(project.id)}
                          okText="Xóa"
                          cancelText="Hủy"
                          okType="danger"
                          icon={<QuestionCircleOutlined style={{ color: 'red' }} />}
                        >
                          <Button type="text" icon={<DeleteOutlined />} danger />
                        </Popconfirm>
                      </Tooltip>,
                      <Tooltip title={project.isFeatured ? "Bỏ nổi bật" : "Đánh dấu nổi bật"}>
                        <Button
                          type="text"
                          icon={project.isFeatured ? <StarFilled /> : <StarOutlined />}
                          onClick={() => handleToggleFeatured(project.id, project.isFeatured)}
                          style={{ color: project.isFeatured ? "#f59e0b" : undefined }}
                        />
                      </Tooltip>,
                      <Tooltip title="Sao chép link">
                        <Button
                          type="text"
                          icon={<CopyOutlined />}
                          onClick={() => {
                            navigator.clipboard.writeText(`${window.location.origin}/projects/${project.id}`);
                            api.success({ message: 'Đã sao chép link dự án' });
                          }}
                          style={{ color: '#10b981' }}
                        />
                      </Tooltip>,
                    ]}
                    style={{ 
                      borderRadius: "16px",
                      overflow: "hidden",
                      transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
                      border: "1px solid #e5e7eb",
                      boxShadow: "0 2px 8px rgba(0, 0, 0, 0.04)",
                      animation: `fadeInUp 0.6s ease-out ${index * 0.1}s both`
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.transform = 'translateY(-4px)';
                      e.currentTarget.style.boxShadow = '0 12px 28px rgba(0, 0, 0, 0.15)';
                      const overlay = e.currentTarget.querySelector('.project-overlay');
                      if (overlay) overlay.style.opacity = '1';
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.transform = 'translateY(0)';
                      e.currentTarget.style.boxShadow = '0 2px 8px rgba(0, 0, 0, 0.04)';
                      const overlay = e.currentTarget.querySelector('.project-overlay');
                      if (overlay) overlay.style.opacity = '0';
                    }}
                  >
                    <Card.Meta
                      title={
                        <div>
                          <Tooltip title={project.title}>
                            <Title level={5} ellipsis={{ rows: 2 }} style={{ margin: 0, fontSize: '16px', fontWeight: '600' }}>
                              {project.title}
                            </Title>
                          </Tooltip>
                          {project.category && (
                            <Tag color="blue" style={{ marginTop: '8px', borderRadius: '8px' }}>
                              {project.category.name}
                            </Tag>
                          )}
                        </div>
                      }
                      description={
                        <div>
                          {/* Description */}
                          <Paragraph
                            type="secondary"
                            ellipsis={{ rows: 3, tooltip: project.description }}
                            style={{ marginBottom: "16px", fontSize: '14px', lineHeight: '1.6' }}
                          >
                            {project.description || "Chưa có mô tả"}
                          </Paragraph>

                          {/* Tags */}
                          <div style={{ marginBottom: "16px" }}>
                            {project.tags?.slice(0, 3).map((tag, tagIndex) => (
                              <Tag
                                key={`${project.id}-tag-${tag.id || tagIndex}`}
                                color="processing"
                                style={{ 
                                  marginBottom: "4px", 
                                  fontSize: "11px",
                                  borderRadius: '6px',
                                  border: 'none',
                                  background: 'linear-gradient(135deg, #dbeafe 0%, #bfdbfe 100%)',
                                  color: '#1e40af'
                                }}
                              >
                                {tag.name}
                              </Tag>
                            ))}
                            {project.tags?.length > 3 && (
                              <Tag 
                                color="default" 
                                style={{ 
                                  fontSize: "11px",
                                  borderRadius: '6px'
                                }}
                              >
                                +{project.tags.length - 3} khác
                              </Tag>
                            )}
                          </div>

                          {/* Action Links */}
                          {(project.demoUrl || project.sourceUrl) && (
                            <Space size="middle" style={{ marginBottom: "12px" }}>
                              {project.demoUrl && (
                                <Button
                                  type="link"
                                  size="small"
                                  icon={<GlobalOutlined />}
                                  href={project.demoUrl}
                                  target="_blank"
                                  style={{ 
                                    padding: 0, 
                                    fontSize: "12px",
                                    color: '#10b981'
                                  }}
                                >
                                  Demo
                                </Button>
                              )}
                              {project.sourceUrl && (
                                <Button
                                  type="link"
                                  size="small"
                                  icon={<CodeOutlined />}
                                  href={project.sourceUrl}
                                  target="_blank"
                                  style={{ 
                                    padding: 0, 
                                    fontSize: "12px",
                                    color: '#6366f1'
                                  }}
                                >
                                  Source
                                </Button>
                              )}
                            </Space>
                          )}

                          {/* Metadata */}
                          <div style={{ 
                            paddingTop: '12px',
                            borderTop: '1px solid #f1f5f9',
                            display: 'flex',
                            justifyContent: 'space-between',
                            alignItems: 'center'
                          }}>
                            <Text type="secondary" style={{ fontSize: "11px" }}>
                              <CalendarOutlined style={{ marginRight: '4px' }} />
                              {new Date(project.updatedAt || project.createdAt).toLocaleDateString("vi-VN")}
                            </Text>
                            <Space size="small">
                              {project.isFeatured && (
                                <StarFilled style={{ color: '#f59e0b', fontSize: '12px' }} />
                              )}
                              <Text type="secondary" style={{ fontSize: "11px" }}>
                                ID: {project.id}
                              </Text>
                            </Space>
                          </div>
                        </div>
                      }
                    />
                  </Card>
                </Col>
              ))}
            </Row>

            {/* Enhanced Pagination */}
            {filteredProjects.length > state.itemsPerPage && (
              <Card 
                style={{ 
                  borderRadius: '16px',
                  textAlign: 'center',
                  border: 'none',
                  background: 'linear-gradient(135deg, #fafbfc 0%, #f8fafc 100%)'
                }}
                styles={{ body: { padding: '24px' } }}
              >
                <div style={{ marginBottom: '16px' }}>
                  <Text type="secondary">
                    Hiển thị {((state.currentPage - 1) * state.itemsPerPage) + 1} - {Math.min(state.currentPage * state.itemsPerPage, filteredProjects.length)} 
                    {' '}trong tổng số {filteredProjects.length} dự án
                  </Text>
                </div>
                <div>
                  <Button.Group>
                    <Button 
                      disabled={state.currentPage === 1}
                      onClick={() => setState(prev => ({ ...prev, currentPage: prev.currentPage - 1 }))}
                      style={{ borderRadius: '8px 0 0 8px' }}
                    >
                      Trước
                    </Button>
                    {Array.from({ length: Math.ceil(filteredProjects.length / state.itemsPerPage) }, (_, i) => i + 1)
                      .filter(page => 
                        page === 1 || 
                        page === Math.ceil(filteredProjects.length / state.itemsPerPage) ||
                        Math.abs(page - state.currentPage) <= 1
                      )
                      .map((page, index, arr) => {
                        if (index > 0 && arr[index - 1] !== page - 1) {
                          return [
                            <Button key={`ellipsis-${page}`} disabled style={{ border: 'none', background: 'transparent' }}>
                              ...
                            </Button>,
                            <Button
                              key={page}
                              type={state.currentPage === page ? 'primary' : 'default'}
                              onClick={() => setState(prev => ({ ...prev, currentPage: page }))}
                              style={{
                                background: state.currentPage === page ? 'linear-gradient(45deg, #6366f1, #8b5cf6)' : undefined,
                                borderColor: state.currentPage === page ? 'transparent' : undefined
                              }}
                            >
                              {page}
                            </Button>
                          ];
                        }
                        return (
                          <Button
                            key={page}
                            type={state.currentPage === page ? 'primary' : 'default'}
                            onClick={() => setState(prev => ({ ...prev, currentPage: page }))}
                            style={{
                              background: state.currentPage === page ? 'linear-gradient(45deg, #6366f1, #8b5cf6)' : undefined,
                              borderColor: state.currentPage === page ? 'transparent' : undefined
                            }}
                          >
                            {page}
                          </Button>
                        );
                      })}
                    <Button 
                      disabled={state.currentPage === Math.ceil(filteredProjects.length / state.itemsPerPage)}
                      onClick={() => setState(prev => ({ ...prev, currentPage: prev.currentPage + 1 }))}
                      style={{ borderRadius: '0 8px 8px 0' }}
                    >
                      Sau
                    </Button>
                  </Button.Group>
                </div>
              </Card>
            )}
          </div>
        )}

        {/* Enhanced Modals */}
        <ProjectDetailModal
          project={modals.detail.project}
          isOpen={modals.detail.isOpen}
          onClose={closeDetailModal}
          onEdit={(project) => {
            closeDetailModal();
            openFormModal(true, project);
          }}
          formatDate={formatDate}
        />

        <ProjectFormModal
          isOpen={modals.form.isOpen}
          isEdit={modals.form.isEdit}
          project={modals.form.project}
          onClose={closeFormModal}
          onSubmit={handleFormSubmit}
          categories={state.categories}
          tags={state.tags}
          onCreateTag={handleCreateTag}
        />
      </div>
    </ConfigProvider>
  );
}

export default ProjectsManagement;
