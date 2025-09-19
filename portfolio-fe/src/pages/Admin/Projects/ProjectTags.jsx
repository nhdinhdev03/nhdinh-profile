import {
    DeleteOutlined,
    EditOutlined,
    PlusOutlined,
    TagsOutlined
} from '@ant-design/icons';
import {
    Button,
    Card,
    Form,
    Input,
    Modal,
    Popconfirm,
    Select,
    Space,
    Switch,
    Table,
    Tag,
    Typography,
    message
} from 'antd';
import { useEffect, useState } from 'react';

const { Title } = Typography;
const { Option } = Select;

const ProjectTags = () => {
  const [tags, setTags] = useState([]);
  const [loading, setLoading] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);
  const [editingTag, setEditingTag] = useState(null);
  const [form] = Form.useForm();

  const categoryOptions = [
    'Frontend',
    'Backend',
    'Database',
    'DevOps',
    'Mobile',
    'Other'
  ];

  useEffect(() => {
    fetchTags();
  }, []);

  const fetchTags = async () => {
    setLoading(true);
    // Simulate API call
    setTimeout(() => {
      setTags([
        {
          tagId: '1',
          name: 'React',
          description: 'JavaScript library for building user interfaces',
          color: '#61dafb',
          icon: 'react',
          category: 'Frontend',
          isActive: true,
          usageCount: 15,
          createdAt: '2024-01-01'
        },
        {
          tagId: '2',
          name: 'Node.js',
          description: 'JavaScript runtime built on Chrome\'s V8 JavaScript engine',
          color: '#339933',
          icon: 'nodejs',
          category: 'Backend',
          isActive: true,
          usageCount: 8,
          createdAt: '2024-01-02'
        },
        {
          tagId: '3',
          name: 'MongoDB',
          description: 'NoSQL document database',
          color: '#47A248',
          icon: 'mongodb',
          category: 'Database',
          isActive: true,
          usageCount: 5,
          createdAt: '2024-01-03'
        }
      ]);
      setLoading(false);
    }, 1000);
  };

  const showModal = (tag = null) => {
    setEditingTag(tag);
    setModalVisible(true);
    if (tag) {
      form.setFieldsValue(tag);
    } else {
      form.resetFields();
      form.setFieldsValue({
        isActive: true,
        usageCount: 0,
        color: '#1890ff'
      });
    }
  };

  const handleCancel = () => {
    setModalVisible(false);
    setEditingTag(null);
    form.resetFields();
  };

  const handleSubmit = async (values) => {
    try {
      if (editingTag) {
        console.log('Updating tag:', values);
        message.success('Tag updated successfully!');
      } else {
        console.log('Creating tag:', values);
        message.success('Tag created successfully!');
      }
      setModalVisible(false);
      setEditingTag(null);
      form.resetFields();
      fetchTags();
    } catch (error) {
      message.error('Operation failed!');
    }
  };

  const handleDelete = async (tagId) => {
    try {
      console.log('Deleting tag:', tagId);
      message.success('Tag deleted successfully!');
      fetchTags();
    } catch (error) {
      message.error('Delete failed!');
    }
  };

  const columns = [
    {
      title: 'Tag',
      dataIndex: 'name',
      key: 'name',
      render: (name, record) => (
        <Tag color={record.color} style={{ fontSize: '14px', padding: '4px 8px' }}>
          {name}
        </Tag>
      ),
    },
    {
      title: 'Category',
      dataIndex: 'category',
      key: 'category',
      render: (category) => (
        <Tag color="blue">{category}</Tag>
      ),
    },
    {
      title: 'Description',
      dataIndex: 'description',
      key: 'description',
      ellipsis: true,
    },
    {
      title: 'Usage Count',
      dataIndex: 'usageCount',
      key: 'usageCount',
      render: (count) => (
        <Tag color="green">{count} projects</Tag>
      ),
    },
    {
      title: 'Status',
      dataIndex: 'isActive',
      key: 'isActive',
      render: (isActive) => (
        <Switch 
          checked={isActive} 
          disabled 
          size="small"
          checkedChildren="Active" 
          unCheckedChildren="Inactive" 
        />
      ),
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
            title="Are you sure you want to delete this tag?"
            onConfirm={() => handleDelete(record.tagId)}
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
          <TagsOutlined /> Project Tags
        </Title>
        <Button
          type="primary"
          icon={<PlusOutlined />}
          onClick={() => showModal()}
        >
          Add New Tag
        </Button>
      </div>

      <Table
        columns={columns}
        dataSource={tags}
        loading={loading}
        rowKey="tagId"
        pagination={{
          pageSize: 10,
          showSizeChanger: true,
          showQuickJumper: true,
        }}
      />

      <Modal
        title={editingTag ? 'Edit Tag' : 'Add New Tag'}
        open={modalVisible}
        onCancel={handleCancel}
        footer={null}
        width={600}
      >
        <Form
          form={form}
          layout="vertical"
          onFinish={handleSubmit}
        >
          <Form.Item
            name="name"
            label="Tag Name"
            rules={[{ required: true, message: 'Please enter tag name!' }]}
          >
            <Input placeholder="Enter tag name" />
          </Form.Item>

          <Form.Item
            name="description"
            label="Description"
          >
            <Input.TextArea
              rows={3}
              placeholder="Enter tag description"
            />
          </Form.Item>

          <Form.Item
            name="category"
            label="Category"
          >
            <Select placeholder="Select category">
              {categoryOptions.map(cat => (
                <Option key={cat} value={cat}>{cat}</Option>
              ))}
            </Select>
          </Form.Item>

          <Form.Item
            name="color"
            label="Color"
          >
            <Input type="color" style={{ width: '100px' }} />
          </Form.Item>

          <Form.Item
            name="icon"
            label="Icon"
          >
            <Input placeholder="Enter icon name" />
          </Form.Item>

          <Form.Item
            name="isActive"
            label="Active"
            valuePropName="checked"
          >
            <Switch />
          </Form.Item>

          <div style={{ textAlign: 'right', marginTop: 24 }}>
            <Space>
              <Button onClick={handleCancel}>
                Cancel
              </Button>
              <Button type="primary" htmlType="submit">
                {editingTag ? 'Update' : 'Create'}
              </Button>
            </Space>
          </div>
        </Form>
      </Modal>
    </Card>
  );
};

export default ProjectTags;