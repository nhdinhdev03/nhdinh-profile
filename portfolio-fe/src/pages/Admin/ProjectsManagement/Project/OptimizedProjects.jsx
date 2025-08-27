import React, { useState, useEffect, useCallback } from 'react';
import {
  Button,
  Space,
  Tag,
  Image,
  Tooltip,
  Switch,
  Typography,
  Form,
  Input,
  Select,
  message,
  Popconfirm
} from 'antd';
import {
  PlusOutlined,
  EditOutlined,
  DeleteOutlined,
  EyeOutlined,
  LinkOutlined,
  StarOutlined,
  StarFilled
} from '@ant-design/icons';
import { 
  PageHeader, 
  AdminTable, 
  Modal 
} from 'components/Admin';
import { ProjectApi, ProjectCategoryApi, ProjectTagApi } from 'api/admin';
import './OptimizedProjects.scss';

const { Title, Text } = Typography;
const { Option } = Select;

// Fallback image
const FALLBACK_IMAGE = "data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAwIiBoZWlnaHQ9IjIwMCIgdmlld0JveD0iMCAwIDQwMCAyMDAiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGRlZnM+PGxpbmVhckdyYWRpZW50IGlkPSJncmFkIiBncmFkaWVudFVuaXRzPSJ1c2VyU3BhY2VPblVzZSIgeDE9IjAlIiB5MT0iMCUiIHgyPSIxMDAlIiB5Mj0iMTAwJSI+PHN0b3Agb2Zmc2V0PSIwJSIgc3R5bGU9InN0b3AtY29sb3I6cmdiKDI0MiwyNDUsMjQ3KTtzdG9wLW9wYWNpdHk6MSIgLz48c3RvcCBvZmZzZXQ9IjEwMCUiIHN0eWxlPSJzdG9wLWNvbG9yOnJnYigyMjksMjMxLDIzNSk7c3RvcC1vcGFjaXR5OjEiIC8+PC9saW5lYXJHcmFkaWVudD48L2RlZnM+PHJlY3Qgd2lkdGg9IjQwMCIgaGVpZ2h0PSIyMDAiIGZpbGw9InVybCgjZ3JhZCkiLz48Y2lyY2xlIGN4PSIyMDAiIGN5PSIxMDAiIHI9IjI0IiBmaWxsPSIjOWNhM2FmIi8+PC9zdmc+";

const OptimizedProjectsManagement = () => {
  // State management
  const [projects, setProjects] = useState([]);
  const [categories, setCategories] = useState([]);
  const [tags, setTags] = useState([]);
  const [loading, setLoading] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);
  const [editingProject, setEditingProject] = useState(null);
  const [form] = Form.useForm();

  // Load data
  const loadData = useCallback(async () => {
    setLoading(true);
    try {
      const [projectsRes, categoriesRes, tagsRes] = await Promise.all([
        ProjectApi.getAll(),
        ProjectCategoryApi.getAll(),
        ProjectTagApi.getAll()
      ]);
      
      setProjects(projectsRes.data || []);
      setCategories(categoriesRes.data || []);
      setTags(tagsRes.data || []);
    } catch (error) {
      message.error('Lỗi khi tải dữ liệu');
      console.error('Error loading data:', error);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    loadData();
  }, [loadData]);

  // Table columns configuration
  const columns = [
    {
      title: 'Hình ảnh',
      dataIndex: 'imageUrl',
      key: 'imageUrl',
      width: 80,
      render: (imageUrl) => (
        <Image
          src={imageUrl || FALLBACK_IMAGE}
          alt="Project"
          width={60}
          height={40}
          style={{ objectFit: 'cover', borderRadius: 4 }}
          fallback={FALLBACK_IMAGE}
          preview={{
            mask: <EyeOutlined />
          }}
        />
      ),
      searchable: false,
    },
    {
      title: 'Tên dự án',
      dataIndex: 'name',
      key: 'name',
      render: (text, record) => (
        <div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
            <Text strong>{text}</Text>
            {record.isFeatured && (
              <StarFilled style={{ color: '#faad14', fontSize: 16 }} />
            )}
          </div>
          {record.slug && (
            <Text type="secondary" style={{ fontSize: 12 }}>
              /{record.slug}
            </Text>
          )}
        </div>
      ),
      sorter: (a, b) => a.name.localeCompare(b.name),
    },
    {
      title: 'Danh mục',
      dataIndex: 'category',
      key: 'category',
      render: (category) => 
        category ? (
          <Tag color="blue">{category.name}</Tag>
        ) : (
          <Text type="secondary">Chưa phân loại</Text>
        ),
      sorter: (a, b) => {
        const aCategory = a.category?.name || '';
        const bCategory = b.category?.name || '';
        return aCategory.localeCompare(bCategory);
      },
    },
    {
      title: 'Công nghệ',
      dataIndex: 'tags',
      key: 'tags',
      render: (tags) => (
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: 4 }}>
          {tags && tags.length > 0 ? (
            tags.slice(0, 3).map(tag => (
              <Tag key={tag.id} color="geekblue" size="small">
                {tag.name}
              </Tag>
            ))
          ) : (
            <Text type="secondary" style={{ fontSize: 12 }}>
              Chưa có
            </Text>
          )}
          {tags && tags.length > 3 && (
            <Tag size="small">+{tags.length - 3}</Tag>
          )}
        </div>
      ),
      searchable: false,
    },
    {
      title: 'Trạng thái',
      dataIndex: 'isActive',
      key: 'isActive',
      width: 100,
      render: (isActive, record) => (
        <Switch
          checked={isActive}
          size="small"
          onChange={(checked) => handleToggleStatus(record.id, checked)}
          loading={loading}
        />
      ),
      filters: [
        { text: 'Đang hoạt động', value: true },
        { text: 'Tạm dừng', value: false },
      ],
      onFilter: (value, record) => record.isActive === value,
    },
    {
      title: 'Thao tác',
      key: 'actions',
      width: 150,
      render: (_, record) => (
        <Space size="small">
          <Tooltip title="Xem chi tiết">
            <Button
              type="text"
              icon={<EyeOutlined />}
              size="small"
              onClick={() => handleView(record)}
            />
          </Tooltip>
          
          {record.demoUrl && (
            <Tooltip title="Xem demo">
              <Button
                type="text"
                icon={<LinkOutlined />}
                size="small"
                onClick={() => window.open(record.demoUrl, '_blank')}
              />
            </Tooltip>
          )}
          
          <Tooltip title="Đánh dấu nổi bật">
            <Button
              type="text"
              icon={record.isFeatured ? <StarFilled /> : <StarOutlined />}
              size="small"
              style={{ color: record.isFeatured ? '#faad14' : undefined }}
              onClick={() => handleToggleFeatured(record.id, !record.isFeatured)}
            />
          </Tooltip>
          
          <Tooltip title="Chỉnh sửa">
            <Button
              type="text"
              icon={<EditOutlined />}
              size="small"
              onClick={() => handleEdit(record)}
            />
          </Tooltip>
          
          <Popconfirm
            title="Xóa dự án"
            description="Bạn có chắc chắn muốn xóa dự án này?"
            onConfirm={() => handleDelete(record.id)}
            okText="Xóa"
            cancelText="Hủy"
            okType="danger"
          >
            <Tooltip title="Xóa">
              <Button
                type="text"
                icon={<DeleteOutlined />}
                size="small"
                danger
              />
            </Tooltip>
          </Popconfirm>
        </Space>
      ),
      searchable: false,
    },
  ];

  // Filter configurations for table
  const tableFilters = [
    {
      key: 'category',
      placeholder: 'Lọc theo danh mục',
      options: categories.map(cat => ({
        label: cat.name,
        value: cat.id
      })),
      onFilter: (value, record) => record.category?.id === value,
      width: 150,
    },
    {
      key: 'featured',
      placeholder: 'Dự án nổi bật',
      options: [
        { label: 'Tất cả', value: '' },
        { label: 'Nổi bật', value: 'featured' },
        { label: 'Thường', value: 'normal' },
      ],
      onFilter: (value, record) => {
        if (value === 'featured') return record.isFeatured;
        if (value === 'normal') return !record.isFeatured;
        return true;
      },
      width: 120,
    },
  ];

  // Event handlers
  const handleAdd = () => {
    setEditingProject(null);
    form.resetFields();
    setModalOpen(true);
  };

  const handleEdit = (project) => {
    setEditingProject(project);
    form.setFieldsValue({
      ...project,
      categoryId: project.category?.id,
      tagIds: project.tags?.map(tag => tag.id) || [],
    });
    setModalOpen(true);
  };

  const handleView = (project) => {
    Modal.info({
      title: 'Chi tiết dự án',
      width: 600,
      content: (
        <div style={{ marginTop: 16 }}>
          <div style={{ marginBottom: 16 }}>
            <Image
              src={project.imageUrl || FALLBACK_IMAGE}
              alt={project.name}
              width="100%"
              style={{ maxHeight: 200, objectFit: 'cover', borderRadius: 8 }}
            />
          </div>
          <Title level={4}>{project.name}</Title>
          <Text>{project.description}</Text>
          {project.technologies && (
            <div style={{ marginTop: 16 }}>
              <Text strong>Công nghệ: </Text>
              <Text>{project.technologies}</Text>
            </div>
          )}
          {project.demoUrl && (
            <div style={{ marginTop: 8 }}>
              <Text strong>Demo: </Text>
              <a href={project.demoUrl} target="_blank" rel="noopener noreferrer">
                {project.demoUrl}
              </a>
            </div>
          )}
        </div>
      ),
    });
  };

  const handleDelete = async (id) => {
    try {
      await ProjectApi.delete(id);
      message.success('Đã xóa dự án thành công');
      loadData();
    } catch (error) {
      message.error('Lỗi khi xóa dự án');
      console.error('Error deleting project:', error);
    }
  };

  const handleToggleStatus = async (id, isActive) => {
    try {
      await ProjectApi.update(id, { isActive });
      message.success(`Đã ${isActive ? 'kích hoạt' : 'tạm dừng'} dự án`);
      loadData();
    } catch (error) {
      message.error('Lỗi khi cập nhật trạng thái');
      console.error('Error updating status:', error);
    }
  };

  const handleToggleFeatured = async (id, isFeatured) => {
    try {
      await ProjectApi.update(id, { isFeatured });
      message.success(`Đã ${isFeatured ? 'đánh dấu' : 'bỏ đánh dấu'} nổi bật`);
      loadData();
    } catch (error) {
      message.error('Lỗi khi cập nhật');
      console.error('Error updating featured:', error);
    }
  };

  const handleSubmit = async (values) => {
    try {
      const formData = {
        ...values,
        tags: values.tagIds?.map(id => tags.find(tag => tag.id === id)) || [],
        category: categories.find(cat => cat.id === values.categoryId) || null,
      };

      if (editingProject) {
        await ProjectApi.update(editingProject.id, formData);
        message.success('Đã cập nhật dự án thành công');
      } else {
        await ProjectApi.create(formData);
        message.success('Đã thêm dự án thành công');
      }
      
      setModalOpen(false);
      loadData();
    } catch (error) {
      message.error(`Lỗi khi ${editingProject ? 'cập nhật' : 'thêm'} dự án`);
      console.error('Error saving project:', error);
    }
  };

  // Page header actions
  const headerActions = [
    <Button
      key="refresh"
      icon={<PlusOutlined />}
      onClick={loadData}
      loading={loading}
    >
      Làm mới
    </Button>,
    <Button
      key="add"
      type="primary"
      icon={<PlusOutlined />}
      onClick={handleAdd}
    >
      Thêm dự án
    </Button>,
  ];

  return (
    <div className="optimized-projects-management">
      <PageHeader
        title="Quản lý Dự án"
        subtitle="Quản lý danh sách các dự án và portfolio"
        actions={headerActions}
      />

      <AdminTable
        columns={columns}
        dataSource={projects}
        loading={loading}
        searchable={true}
        filterable={true}
        exportable={true}
        refreshable={true}
        rowKey="id"
        searchPlaceholder="Tìm kiếm dự án..."
        filters={tableFilters}
        onRefresh={loadData}
        onExport={(data) => {
          console.log('Exporting data:', data);
          message.info('Chức năng xuất dữ liệu đang được phát triển');
        }}
        pagination={{
          defaultPageSize: 10,
          showSizeChanger: true,
          showQuickJumper: true,
          showTotal: (total, range) => 
            `${range[0]}-${range[1]} của ${total} dự án`,
        }}
      />

      {/* Add/Edit Modal */}
      <Modal
        open={modalOpen}
        onCancel={() => setModalOpen(false)}
        title={editingProject ? 'Chỉnh sửa dự án' : 'Thêm dự án mới'}
        width={720}
        footer={null}
      >
        <Form
          form={form}
          layout="vertical"
          onFinish={handleSubmit}
          autoComplete="off"
        >
          <Form.Item
            name="name"
            label="Tên dự án"
            rules={[
              { required: true, message: 'Vui lòng nhập tên dự án' },
              { min: 2, message: 'Tên dự án phải có ít nhất 2 ký tự' },
            ]}
          >
            <Input placeholder="Nhập tên dự án" />
          </Form.Item>

          <Form.Item
            name="slug"
            label="Đường dẫn (Slug)"
            rules={[
              { required: true, message: 'Vui lòng nhập slug' },
              { pattern: /^[a-z0-9-]+$/, message: 'Slug chỉ chứa chữ thường, số và dấu gạch ngang' },
            ]}
          >
            <Input placeholder="ten-du-an" />
          </Form.Item>

          <Form.Item
            name="description"
            label="Mô tả"
            rules={[
              { required: true, message: 'Vui lòng nhập mô tả' },
              { min: 10, message: 'Mô tả phải có ít nhất 10 ký tự' },
            ]}
          >
            <Input.TextArea 
              rows={4} 
              placeholder="Mô tả ngắn về dự án" 
            />
          </Form.Item>

          <Form.Item
            name="categoryId"
            label="Danh mục"
            rules={[{ required: true, message: 'Vui lòng chọn danh mục' }]}
          >
            <Select placeholder="Chọn danh mục">
              {categories.map(category => (
                <Option key={category.id} value={category.id}>
                  {category.name}
                </Option>
              ))}
            </Select>
          </Form.Item>

          <Form.Item
            name="tagIds"
            label="Công nghệ sử dụng"
          >
            <Select
              mode="multiple"
              placeholder="Chọn các công nghệ"
              showSearch
              filterOption={(input, option) =>
                option.children.toLowerCase().includes(input.toLowerCase())
              }
            >
              {tags.map(tag => (
                <Option key={tag.id} value={tag.id}>
                  {tag.name}
                </Option>
              ))}
            </Select>
          </Form.Item>

          <Form.Item
            name="demoUrl"
            label="Link demo"
            rules={[
              { type: 'url', message: 'Vui lòng nhập URL hợp lệ' },
            ]}
          >
            <Input placeholder="https://example.com" />
          </Form.Item>

          <Form.Item
            name="sourceUrl"
            label="Link source code"
            rules={[
              { type: 'url', message: 'Vui lòng nhập URL hợp lệ' },
            ]}
          >
            <Input placeholder="https://github.com/username/repo" />
          </Form.Item>

          <Space style={{ display: 'flex', justifyContent: 'flex-end', marginTop: 24 }}>
            <Form.Item name="isFeatured" valuePropName="checked" style={{ margin: 0 }}>
              <Switch checkedChildren="Nổi bật" unCheckedChildren="Thường" />
            </Form.Item>
            
            <Form.Item name="isActive" valuePropName="checked" initialValue={true} style={{ margin: 0 }}>
              <Switch checkedChildren="Hoạt động" unCheckedChildren="Tạm dừng" />
            </Form.Item>
          </Space>

          <div style={{ display: 'flex', justifyContent: 'flex-end', gap: 8, marginTop: 24 }}>
            <Button onClick={() => setModalOpen(false)}>
              Hủy
            </Button>
            <Button type="primary" htmlType="submit" loading={loading}>
              {editingProject ? 'Cập nhật' : 'Thêm mới'}
            </Button>
          </div>
        </Form>
      </Modal>
    </div>
  );
};

export default OptimizedProjectsManagement;
