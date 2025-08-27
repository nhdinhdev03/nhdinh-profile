import React, {
  useState,
  useEffect,
  useCallback,
  useMemo,
} from "react";
import {
  Modal,
  Form,
  Input,
  Select,
  Button,
  Card,
  Tag,
  Space,
  Row,
  Col,
  Image,
  Typography,
  Divider,
  Switch,
  notification,
  Popconfirm,
  Tooltip,
  Badge,
  Empty,
  Spin,
} from "antd";
import {
  PlusOutlined,
  EditOutlined,
  DeleteOutlined,
  EyeOutlined,
  SearchOutlined,
  StarOutlined,
  StarFilled,
  FolderOutlined,
  LinkOutlined,
} from "@ant-design/icons";
import { FolderIcon } from '@heroicons/react/24/outline';
import { PageHeader } from '../../../../components/Admin';

import { ProjectApi, ProjectCategoryApi, ProjectTagApi } from "api/admin";

import "./Projects.scss";

const { Title, Text, Paragraph } = Typography;
const { Option } = Select;

// Fallback image as data URL to avoid network errors
const FALLBACK_IMAGE =
  "data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAwIiBoZWlnaHQ9IjIwMCIgdmlld0JveD0iMCAwIDQwMCAyMDAiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGRlZnM+PGxpbmVhckdyYWRpZW50IGlkPSJncmFkIiBncmFkaWVudFVuaXRzPSJ1c2VyU3BhY2VPblVzZSIgeDE9IjAlIiB5MT0iMCUiIHgyPSIxMDAlIiB5Mj0iMTAwJSI+PHN0b3Agb2Zmc2V0PSIwJSIgc3R5bGU9InN0b3AtY29sb3I6cmdiKDI0MiwyNDUsMjQ3KTtzdG9wLW9wYWNpdHk6MSIgLz48c3RvcCBvZmZzZXQ9IjEwMCUiIHN0eWxlPSJzdG9wLWNvbG9yOnJnYigyMjksMjMxLDIzNSk7c3RvcC1vcGFjaXR5OjEiIC8+PC9saW5lYXJHcmFkaWVudD48L2RlZnM+PHJlY3Qgd2lkdGg9IjQwMCIgaGVpZ2h0PSIyMDAiIGZpbGw9InVybCgjZ3JhZCkiLz48Y2lyY2xlIGN4PSIyMDAiIGN5PSIxMDAiIHI9IjI0IiBmaWxsPSIjOWNhM2FmIi8+PC9zdmc+";

// ================== Chuẩn hóa dữ liệu từ BE -> FE (projectId/categoryId/tagId => id) ==================
const normalizeTag = (t) => ({ ...t, id: t.id || t.tagId });
const normalizeCategory = (c) => ({ ...c, id: c.id || c.categoryId });
const normalizeProject = (p) => ({
  ...p,
  id: p.id || p.projectId,
  category: p.category ? normalizeCategory(p.category) : null,
  tags: Array.isArray(p.tags) ? p.tags.map(normalizeTag) : [],
});

// Component Multi-Select cho Tags sử dụng Ant Design (Tối ưu)
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

    // Memoized validation cho tag name
    const isValidTagName = useMemo(() => {
      const trimmedValue = inputValue.trim();
      return (
        trimmedValue.length >= 2 &&
        trimmedValue.length <= 50 &&
        !availableTags.some(
          (tag) => tag.name.toLowerCase() === trimmedValue.toLowerCase()
        )
      );
    }, [inputValue, availableTags]);

    // Optimized create tag handler với loading state
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
          
          // Clear input
          setInputValue("");
          
          // Show success notification
          notification.success({
            message: 'Thành công',
            description: `Đã thêm công nghệ "${tagName}" và chọn vào dự án`,
            duration: 3,
          });
        }
      } catch (error) {
        console.error("Error creating tag:", error);
        notification.error({
          message: 'Lỗi',
          description: `Không thể tạo công nghệ "${tagName}". Vui lòng thử lại.`,
          duration: 4,
        });
      } finally {
        setIsCreatingTag(false);
      }
    }, [onCreateTag, isValidTagName, isCreatingTag, inputValue, selectedTagIds, onChange]);

    // Improved filter function với diacritics support
    const filterOption = useCallback((input, option) => {
      const searchTerm = input.toLowerCase().trim();
      const tagName = option.children.toLowerCase();
      
      // Support both exact match and partial match
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

    // Handle Enter key để tạo tag nhanh
    const handleKeyDown = useCallback((e) => {
      if (e.key === 'Enter' && isValidTagName && !isCreatingTag) {
        e.preventDefault();
        e.stopPropagation();
        handleCreateNewTag();
      }
    }, [isValidTagName, isCreatingTag, handleCreateNewTag]);

    // Optimized dropdown render
    const dropdownRender = useCallback((menu) => (
      <div>
        {menu}
        {inputValue.trim() && onCreateTag && (
          <div style={{ 
            padding: "8px 12px", 
            borderTop: "1px solid #f0f0f0",
            backgroundColor: isValidTagName ? '#f6ffed' : '#fff2f0'
          }}>
            {isValidTagName ? (
              <Button
                type="link"
                icon={isCreatingTag ? <Spin size="small" /> : <PlusOutlined />}
                onClick={handleCreateNewTag}
                loading={isCreatingTag}
                disabled={isCreatingTag}
                style={{ 
                  padding: 0, 
                  color: '#52c41a',
                  fontWeight: 500
                }}
              >
                {isCreatingTag 
                  ? `Đang tạo "${inputValue.trim()}"...`
                  : `Tạo công nghệ "${inputValue.trim()}" (Enter)`
                }
              </Button>
            ) : (
              <Text type="secondary" style={{ fontSize: '12px' }}>
                {inputValue.trim().length < 2 
                  ? "Tên công nghệ phải có ít nhất 2 ký tự"
                  : inputValue.trim().length > 50
                  ? "Tên công nghệ không được quá 50 ký tự"
                  : "Công nghệ này đã tồn tại"
                }
              </Text>
            )}
          </div>
        )}
      </div>
    ), [inputValue, onCreateTag, isValidTagName, isCreatingTag, handleCreateNewTag]);

    return (
      <div className="tags-select-container">
        <Select
          mode="multiple"
          placeholder="Chọn hoặc tạo công nghệ sử dụng trong dự án"
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
        >
          {availableTags.map((tag) => (
            <Option key={tag.id} value={tag.id}>
              {tag.name}
            </Option>
          ))}
        </Select>
        <div style={{ 
          display: 'flex', 
          justifyContent: 'space-between', 
          alignItems: 'center',
          marginTop: '4px'
        }}>
          <Text type="secondary" style={{ fontSize: "12px" }}>
            Chọn các công nghệ, framework, thư viện sử dụng trong dự án
          </Text>
          <Text type="secondary" style={{ fontSize: "11px" }}>
            {selectedTagIds.length > 0 && `Đã chọn: ${selectedTagIds.length}`}
          </Text>
        </div>
      </div>
    );
  }
);

// Project Card Component sử dụng Ant Design
const ProjectCard = React.memo(
  ({ project, onEdit, onDelete, onViewProject, onToggleFeatured }) => {
    const getStatusColor = (status) => {
      switch (status) {
        case "published":
          return "success";
        case "draft":
          return "warning";
        default:
          return "default";
      }
    };

    const getStatusText = (status) => {
      switch (status) {
        case "published":
          return "Đã xuất bản";
        case "draft":
          return "Bản nháp";
        default:
          return "Đã lưu trữ";
      }
    };

    return (
      <Card
        hoverable
        cover={
          <div
            style={{
              position: "relative",
              height: "192px",
              overflow: "hidden",
            }}
          >
            <Image
              alt={project.title}
              src={project.imageUrl || FALLBACK_IMAGE}
              fallback={FALLBACK_IMAGE}
              style={{
                width: "100%",
                height: "192px",
                objectFit: "cover",
                transition: "transform 0.3s ease",
              }}
              onMouseEnter={(e) => {
                e.target.style.transform = "scale(1.05)";
              }}
              onMouseLeave={(e) => {
                e.target.style.transform = "scale(1)";
              }}
              preview={{
                mask: (
                  <Space>
                    <Button
                      size="small"
                      icon={<EyeOutlined />}
                      onClick={() => onViewProject(project)}
                    >
                      Xem chi tiết
                    </Button>
                  </Space>
                ),
              }}
            />

            {/* Status và Featured badges */}
            <div style={{ position: "absolute", top: "8px", left: "8px" }}>
              <Badge
                status={getStatusColor(project.status)}
                text={getStatusText(project.status)}
                style={{
                  backgroundColor: "rgba(255,255,255,0.9)",
                  padding: "2px 8px",
                  borderRadius: "12px",
                  fontSize: "11px",
                }}
              />
            </div>

            {project.isFeatured && (
              <div style={{ position: "absolute", top: "8px", right: "8px" }}>
                <Badge
                  count={<StarFilled style={{ color: "#faad14" }} />}
                  style={{
                    backgroundColor: "rgba(255,255,255,0.9)",
                    padding: "2px 8px",
                    borderRadius: "12px",
                  }}
                />
              </div>
            )}
          </div>
        }
        actions={[
          <Tooltip title="Chỉnh sửa">
            <Button
              type="text"
              icon={<EditOutlined />}
              onClick={() => onEdit(project)}
            />
          </Tooltip>,
          <Tooltip title="Xóa">
            <Popconfirm
              title="Xác nhận xóa"
              description="Bạn có chắc chắn muốn xóa dự án này?"
              onConfirm={() => onDelete(project.id)}
              okText="Xóa"
              cancelText="Hủy"
              okType="danger"
            >
              <Button type="text" icon={<DeleteOutlined />} danger />
            </Popconfirm>
          </Tooltip>,
          <Tooltip
            title={project.isFeatured ? "Bỏ nổi bật" : "Đánh dấu nổi bật"}
          >
            <Button
              type="text"
              icon={project.isFeatured ? <StarFilled /> : <StarOutlined />}
              onClick={() => onToggleFeatured(project.id, project.isFeatured)}
              style={{ color: project.isFeatured ? "#faad14" : undefined }}
            />
          </Tooltip>,
        ]}
        style={{ marginBottom: "16px" }}
      >
        <Card.Meta
          title={
            <div>
              <Tooltip title={project.title}>
                <Title level={5} ellipsis={{ rows: 2 }} style={{ margin: 0 }}>
                  {project.title}
                </Title>
              </Tooltip>
              {project.category && (
                <Text type="secondary" style={{ fontSize: "12px" }}>
                  {project.category.name}
                </Text>
              )}
            </div>
          }
          description={
            <div>
              <Paragraph
                type="secondary"
                ellipsis={{ rows: 3, tooltip: project.description }}
                style={{ display: "block", marginBottom: "12px" }}
              >
                {project.description || "Chưa có mô tả"}
              </Paragraph>

              {/* Tags */}
              <div style={{ marginBottom: "12px" }}>
                {project.tags?.slice(0, 4).map((tag, index) => (
                  <Tag
                    key={`${project.id}-tag-${tag.id || index}`}
                    color="blue"
                    style={{ marginBottom: "4px", fontSize: "11px" }}
                  >
                    {tag.name}
                  </Tag>
                ))}
                {project.tags?.length > 4 && (
                  <Tag color="default" style={{ fontSize: "11px" }}>
                    +{project.tags.length - 4} khác
                  </Tag>
                )}
              </div>

              {/* Links */}
              {(project.demoUrl || project.sourceUrl) && (
                <Space size="middle" style={{ marginBottom: "8px" }}>
                  {project.demoUrl && (
                    <Button
                      type="link"
                      size="small"
                      icon={<LinkOutlined />}
                      href={project.demoUrl}
                      target="_blank"
                      style={{ padding: 0, fontSize: "11px" }}
                    >
                      Demo
                    </Button>
                  )}
                  {project.sourceUrl && (
                    <Button
                      type="link"
                      size="small"
                      icon={<FolderOutlined />}
                      href={project.sourceUrl}
                      target="_blank"
                      style={{ padding: 0, fontSize: "11px" }}
                    >
                      Source
                    </Button>
                  )}
                </Space>
              )}

              <Text type="secondary" style={{ fontSize: "11px" }}>
                {new Date(
                  project.updatedAt || project.createdAt
                ).toLocaleDateString("vi-VN")}
              </Text>
            </div>
          }
        />
      </Card>
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
    <div className="space-y-6">
      {contextHolder}
      
      <PageHeader
        title="Quản lý Dự án"
        subtitle="Quản lý tất cả các dự án và portfolio"
        icon={FolderIcon}
        actions={
          <div className="flex items-center space-x-3">
            <Button
              type="primary"
              icon={<PlusOutlined />}
              onClick={() => openFormModal(false)}
            >
              Thêm dự án mới
            </Button>
          </div>
        }
      />

      {/* Filters and Actions */}
      <Card style={{ marginBottom: "24px" }}>
        <Row gutter={16} align="middle">
          <Col xs={24} sm={12} md={10}>
            <Input
              placeholder="Tìm kiếm dự án..."
              value={state.searchTerm}
              onChange={(e) => handleSearch(e.target.value)}
              prefix={<SearchOutlined />}
              allowClear
            />
          </Col>
          <Col xs={24} sm={6} md={7}>
            <Select
              placeholder="Danh mục"
              value={state.selectedCategory}
              onChange={handleCategoryFilter}
              style={{ width: "100%" }}
              allowClear
            >
              {state.categories.map((category) => (
                <Option key={category.id} value={category.id}>
                  {category.name}
                </Option>
              ))}
            </Select>
          </Col>
          <Col xs={24} sm={6} md={7}>
            <Select
              placeholder="Trạng thái"
              value={state.selectedStatus}
              onChange={handleStatusFilter}
              style={{ width: "100%" }}
              allowClear
            >
              <Option value="published">Đã xuất bản</Option>
              <Option value="draft">Bản nháp</Option>
              <Option value="archived">Đã lưu trữ</Option>
            </Select>
          </Col>
        </Row>
      </Card>

      {/* Projects Grid */}
      {state.isLoading ? (
        <div style={{ textAlign: "center", padding: "60px 0" }}>
          <Spin size="large" />
        </div>
      ) : filteredProjects.length === 0 ? (
        <Empty
          description="Không tìm thấy dự án nào"
          image={Empty.PRESENTED_IMAGE_SIMPLE}
        />
      ) : (
        <Row gutter={[16, 16]}>
          {paginatedProjects.map((project) => (
            <Col xs={24} sm={12} lg={8} xl={6} key={project.id}>
              <ProjectCard
                project={project}
                onEdit={(project) => openFormModal(true, project)}
                onDelete={handleDeleteProject}
                onViewProject={openDetailModal}
                onToggleFeatured={handleToggleFeatured}
              />
            </Col>
          ))}
        </Row>
      )}

      {/* Modals */}
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
  );
}

export default ProjectsManagement;
