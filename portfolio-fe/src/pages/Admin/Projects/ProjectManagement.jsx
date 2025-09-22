import {
    DeleteOutlined,
    EditOutlined,
    EyeOutlined,
    PlusOutlined,
    ProjectOutlined,
    UploadOutlined
} from '@ant-design/icons';
import {
    Button,
    Card,
    Form,
    Image,
    Input,
    InputNumber,
    Modal,
    Popconfirm,
    Select,
    Space,
    Switch,
    Table,
    Tag,
    Typography,
    Upload,
    message
} from 'antd';
import { useEffect, useState } from 'react';

const { Title } = Typography;
const { Option } = Select;
const { TextArea } = Input;

const ProjectManagement = () => {
  const [projects, setProjects] = useState([]);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);
  const [editingProject, setEditingProject] = useState(null);
  const [form] = Form.useForm();

  const statusOptions = [
    { value: 'draft', label: 'Draft', color: 'orange' },
    { value: 'published', label: 'Published', color: 'green' },
    { value: 'archived', label: 'Archived', color: 'red' }
  ];

  useEffect(() => {
    fetchProjects();
    fetchCategories();
  }, []);

  const fetchProjects = async () => {
    setLoading(true);
    // Simulate API call
    setTimeout(() => {
      setProjects([
        {
          projectId: '1',
          categoryId: '1',
          categoryName: 'Web Development',
          imageUrl: 'https://via.placeholder.com/150',
          demoUrl: 'https://demo.example.com',
          sourceUrl: 'https://github.com/example/project',
          isFeatured: true,
          isPublic: true,
          status: 'published',
          viewCount: 150,
          sortOrder: 1,
          createdAt: '2024-01-01',
          publishedAt: '2024-01-02',
          isDeleted: false,
          translations: 2
        },
        {
          projectId: '2',
          categoryId: '2',
          categoryName: 'Mobile App',
          imageUrl: 'https://via.placeholder.com/150',
          demoUrl: null,
          sourceUrl: 'https://github.com/example/mobile-app',
          isFeatured: false,
          isPublic: true,
          status: 'draft',
          viewCount: 25,
          sortOrder: 2,
          createdAt: '2024-01-15',
          publishedAt: null,
          isDeleted: false,
          translations: 1
        }
      ]);
      setLoading(false);
    }, 1000);
  };

  const fetchCategories = async () => {
    // Simulate API call
    setCategories([
      { categoryId: '1', name: 'Web Development' },
      { categoryId: '2', name: 'Mobile App' },
      { categoryId: '3', name: 'Desktop App' }
    ]);
  };

  const showModal = (project = null) => {
    setEditingProject(project);
    setModalVisible(true);
    if (project) {
      form.setFieldsValue({
        ...project,
        imageFile: project.imageUrl ? [{ url: project.imageUrl }] : []
      });
    } else {
      form.resetFields();
      form.setFieldsValue({
        isFeatured: false,
        isPublic: true,
        status: 'draft',
        viewCount: 0,
        sortOrder: 0
      });
    }
  };

  const handleCancel = () => {
    setModalVisible(false);
    setEditingProject(null);
    form.resetFields();
  };

  const handleSubmit = async (values) => {
    try {
      if (editingProject) {
        console.log('Updating project:', values);
        message.success('Project updated successfully!');
      } else {
        console.log('Creating project:', values);
        message.success('Project created successfully!');
      }
      setModalVisible(false);
      setEditingProject(null);
      form.resetFields();
      fetchProjects();
    } catch (error) {
      message.error('Operation failed!');
    }
  };

  const handleDelete = async (projectId) => {
    try {
      console.log('Deleting project:', projectId);
      message.success('Project deleted successfully!');
      fetchProjects();
    } catch (error) {
      message.error('Delete failed!');
    }
  };

  const getStatusColor = (status) => {
    const statusOption = statusOptions.find(opt => opt.value === status);
    return statusOption ? statusOption.color : 'default';
  };

  const columns = [
    {
      title: 'Image',
      dataIndex: 'imageUrl',
      key: 'imageUrl',
      width: 80,
      render: (url) => (
        url ? <Image src={url} width={50} height={50} style={{ objectFit: 'cover' }} /> : 'No image'
      ),
    },
    {
      title: 'Category',
      dataIndex: 'categoryName',
      key: 'categoryName',
    },
    {
      title: 'Status',
      dataIndex: 'status',
      key: 'status',
      render: (status) => (
        <Tag color={getStatusColor(status)}>
          {status.toUpperCase()}
        </Tag>
      ),
    },
    {
      title: 'Featured',
      dataIndex: 'isFeatured',
      key: 'isFeatured',
      render: (isFeatured) => (
        <Switch checked={isFeatured} disabled size="small" />
      ),
    },
    {
      title: 'Public',
      dataIndex: 'isPublic',
      key: 'isPublic',
      render: (isPublic) => (
        <Switch checked={isPublic} disabled size="small" />
      ),
    },
    {
      title: 'Views',
      dataIndex: 'viewCount',
      key: 'viewCount',
      render: (count) => (
        <Tag color="blue">
          <EyeOutlined /> {count}
        </Tag>
      ),
    },
    {
      title: 'Sort',
      dataIndex: 'sortOrder',
      key: 'sortOrder',
    },
    {
      title: 'Translations',
      dataIndex: 'translations',
      key: 'translations',
      render: (count) => `${count} languages`,
    },
    {
      title: 'Created',
      dataIndex: 'createdAt',
      key: 'createdAt',
      render: (date) => new Date(date).toLocaleDateString(),
    },
    {
      title: 'Actions',
      key: 'actions',
      render: (_, record) => (
        <Space>
          <Button
            type="primary"
            size="small"
            icon={<EditOutlined />}
            onClick={() => showModal(record)}
          >
            Edit
          </Button>
          <Popconfirm
            title="Are you sure you want to delete this project?"
            onConfirm={() => handleDelete(record.projectId)}
            okText="Yes"
            cancelText="No"
          >
            <Button
              type="primary"
              danger
              size="small"
              icon={<DeleteOutlined />}
            >
              Delete
            </Button>
          </Popconfirm>
        </Space>
      ),
    },
  ];

  return (
    <Card>
      <div style={{ marginBottom: 16, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <Title level={3} style={{ margin: 0 }}>
          <ProjectOutlined /> Project Management
        </Title>
        <Button
          type="primary"
          icon={<PlusOutlined />}
          onClick={() => showModal()}
        >
          Add New Project
        </Button>
      </div>

      <Table
        columns={columns}
        dataSource={projects}
        loading={loading}
        rowKey="projectId"
        pagination={{
          pageSize: 10,
          showSizeChanger: true,
          showQuickJumper: true,
        }}
        scroll={{ x: 1200 }}
      />

      <Modal
        title={editingProject ? 'Edit Project' : 'Add New Project'}
        open={modalVisible}
        onCancel={handleCancel}
        footer={null}
        width={800}
      >
        <Form
          form={form}
          layout="vertical"
          onFinish={handleSubmit}
        >
          <Form.Item
            name="categoryId"
            label="Category"
            rules={[{ required: true, message: 'Please select a category!' }]}
          >
            <Select placeholder="Select category">
              {categories.map(category => (
                <Option key={category.categoryId} value={category.categoryId}>
                  {category.name}
                </Option>
              ))}
            </Select>
          </Form.Item>

          <Form.Item
            name="imageFile"
            label="Project Image"
          >
            <Upload
              listType="picture-card"
              maxCount={1}
              beforeUpload={() => false} // Prevent auto upload
            >
              <div>
                <UploadOutlined />
                <div style={{ marginTop: 8 }}>Upload</div>
              </div>
            </Upload>
          </Form.Item>

          <Form.Item
            name="demoUrl"
            label="Demo URL"
          >
            <Input placeholder="Enter demo URL" />
          </Form.Item>

          <Form.Item
            name="sourceUrl"
            label="Source URL"
          >
            <Input placeholder="Enter source code URL" />
          </Form.Item>

          <Form.Item
            name="status"
            label="Status"
            rules={[{ required: true, message: 'Please select status!' }]}
          >
            <Select placeholder="Select status">
              {statusOptions.map(option => (
                <Option key={option.value} value={option.value}>
                  {option.label}
                </Option>
              ))}
            </Select>
          </Form.Item>

          <Form.Item
            name="isFeatured"
            label="Featured"
            valuePropName="checked"
          >
            <Switch />
          </Form.Item>

          <Form.Item
            name="isPublic"
            label="Public"
            valuePropName="checked"
          >
            <Switch />
          </Form.Item>

          <Form.Item
            name="sortOrder"
            label="Sort Order"
          >
            <InputNumber
              min={0}
              placeholder="Enter sort order"
              style={{ width: '100%' }}
            />
          </Form.Item>

          <div style={{ textAlign: 'right', marginTop: 24 }}>
            <Space>
              <Button onClick={handleCancel}>
                Cancel
              </Button>
              <Button type="primary" htmlType="submit">
                {editingProject ? 'Update' : 'Create'}
              </Button>
            </Space>
          </div>
        </Form>
      </Modal>
    </Card>
  );
};

export default ProjectManagement;