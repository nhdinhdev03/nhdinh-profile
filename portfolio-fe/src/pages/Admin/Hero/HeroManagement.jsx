import {
    DeleteOutlined,
    EditOutlined,
    PlusOutlined,
    StarOutlined
} from '@ant-design/icons';
import {
    Button,
    Card,
    Form,
    Input,
    Modal,
    Popconfirm,
    Space,
    Switch,
    Table,
    Typography,
    message
} from 'antd';
import { useEffect, useState } from 'react';

const { Title } = Typography;
const { TextArea } = Input;

const HeroManagement = () => {
  const [heroes, setHeroes] = useState([]);
  const [loading, setLoading] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);
  const [editingHero, setEditingHero] = useState(null);
  const [form] = Form.useForm();

  // Mock data - replace with API calls
  useEffect(() => {
    fetchHeroes();
  }, []);

  const fetchHeroes = async () => {
    setLoading(true);
    // Simulate API call
    setTimeout(() => {
      setHeroes([
        {
          heroId: '1',
          createdAt: '2024-01-01',
          isDeleted: false,
          translations: 2
        }
      ]);
      setLoading(false);
    }, 1000);
  };

  const showModal = (hero = null) => {
    setEditingHero(hero);
    setModalVisible(true);
    if (hero) {
      form.setFieldsValue(hero);
    } else {
      form.resetFields();
    }
  };

  const handleCancel = () => {
    setModalVisible(false);
    setEditingHero(null);
    form.resetFields();
  };

  const handleSubmit = async (values) => {
    try {
      if (editingHero) {
        // Update hero
        console.log('Updating hero:', values);
        message.success('Hero updated successfully!');
      } else {
        // Create hero
        console.log('Creating hero:', values);
        message.success('Hero created successfully!');
      }
      setModalVisible(false);
      setEditingHero(null);
      form.resetFields();
      fetchHeroes();
    } catch (error) {
      message.error('Operation failed!');
    }
  };

  const handleDelete = async (heroId) => {
    try {
      console.log('Deleting hero:', heroId);
      message.success('Hero deleted successfully!');
      fetchHeroes();
    } catch (error) {
      message.error('Delete failed!');
    }
  };

  const columns = [
    {
      title: 'Hero ID',
      dataIndex: 'heroId',
      key: 'heroId',
      ellipsis: true,
    },
    {
      title: 'Created At',
      dataIndex: 'createdAt',
      key: 'createdAt',
      render: (date) => new Date(date).toLocaleDateString(),
    },
    {
      title: 'Translations',
      dataIndex: 'translations',
      key: 'translations',
      render: (count) => `${count} languages`,
    },
    {
      title: 'Status',
      dataIndex: 'isDeleted',
      key: 'isDeleted',
      render: (isDeleted) => (
        <Switch 
          checked={!isDeleted} 
          disabled 
          checkedChildren="Active" 
          unCheckedChildren="Deleted" 
        />
      ),
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
            title="Are you sure you want to delete this hero?"
            onConfirm={() => handleDelete(record.heroId)}
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
          <StarOutlined /> Hero Management
        </Title>
        <Button
          type="primary"
          icon={<PlusOutlined />}
          onClick={() => showModal()}
        >
          Add New Hero
        </Button>
      </div>

      <Table
        columns={columns}
        dataSource={heroes}
        loading={loading}
        rowKey="heroId"
        pagination={{
          pageSize: 10,
          showSizeChanger: true,
          showQuickJumper: true,
        }}
      />

      <Modal
        title={editingHero ? 'Edit Hero' : 'Add New Hero'}
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
            name="isDeleted"
            label="Status"
            valuePropName="checked"
            initialValue={false}
          >
            <Switch 
              checkedChildren="Active" 
              unCheckedChildren="Deleted" 
            />
          </Form.Item>

          <div style={{ textAlign: 'right', marginTop: 24 }}>
            <Space>
              <Button onClick={handleCancel}>
                Cancel
              </Button>
              <Button type="primary" htmlType="submit">
                {editingHero ? 'Update' : 'Create'}
              </Button>
            </Space>
          </div>
        </Form>
      </Modal>
    </Card>
  );
};

export default HeroManagement;