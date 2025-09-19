import {
    DeleteOutlined,
    EditOutlined,
    MenuOutlined,
    PlusOutlined
} from '@ant-design/icons';
import {
    Button,
    Card,
    Form,
    Input,
    InputNumber,
    Modal,
    Popconfirm,
    Select,
    Space,
    Table,
    Tag,
    Typography,
    message
} from 'antd';
import { useEffect, useState } from 'react';

const { Title } = Typography;
const { Option } = Select;

const HeroSubheadings = () => {
  const [subheadings, setSubheadings] = useState([]);
  const [heroes, setHeroes] = useState([]);
  const [loading, setLoading] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);
  const [editingSubheading, setEditingSubheading] = useState(null);
  const [form] = Form.useForm();

  const languages = [
    { code: 'vi', name: 'Tiếng Việt' },
    { code: 'en', name: 'English' },
    { code: 'en-US', name: 'English (US)' }
  ];

  useEffect(() => {
    fetchSubheadings();
    fetchHeroes();
  }, []);

  const fetchSubheadings = async () => {
    setLoading(true);
    // Simulate API call
    setTimeout(() => {
      setSubheadings([
        {
          subId: '1',
          heroId: '1',
          languageCode: 'vi',
          text: 'Phát triển ứng dụng web',
          sortOrder: 1,
          createdAt: '2024-01-01'
        },
        {
          subId: '2',
          heroId: '1',
          languageCode: 'vi',
          text: 'Thiết kế giao diện người dùng',
          sortOrder: 2,
          createdAt: '2024-01-01'
        },
        {
          subId: '3',
          heroId: '1',
          languageCode: 'en',
          text: 'Web Application Development',
          sortOrder: 1,
          createdAt: '2024-01-01'
        },
        {
          subId: '4',
          heroId: '1',
          languageCode: 'en',
          text: 'User Interface Design',
          sortOrder: 2,
          createdAt: '2024-01-01'
        }
      ]);
      setLoading(false);
    }, 1000);
  };

  const fetchHeroes = async () => {
    // Simulate API call
    setHeroes([
      { heroId: '1', name: 'Main Hero' }
    ]);
  };

  const showModal = (subheading = null) => {
    setEditingSubheading(subheading);
    setModalVisible(true);
    if (subheading) {
      form.setFieldsValue(subheading);
    } else {
      form.resetFields();
      form.setFieldsValue({ sortOrder: 1 });
    }
  };

  const handleCancel = () => {
    setModalVisible(false);
    setEditingSubheading(null);
    form.resetFields();
  };

  const handleSubmit = async (values) => {
    try {
      if (editingSubheading) {
        console.log('Updating subheading:', values);
        message.success('Subheading updated successfully!');
      } else {
        console.log('Creating subheading:', values);
        message.success('Subheading created successfully!');
      }
      setModalVisible(false);
      setEditingSubheading(null);
      form.resetFields();
      fetchSubheadings();
    } catch (error) {
      message.error('Operation failed!');
    }
  };

  const handleDelete = async (subId) => {
    try {
      console.log('Deleting subheading:', subId);
      message.success('Subheading deleted successfully!');
      fetchSubheadings();
    } catch (error) {
      message.error('Delete failed!');
    }
  };

  const getLanguageName = (code) => {
    const lang = languages.find(l => l.code === code);
    return lang ? lang.name : code;
  };

  const columns = [
    {
      title: 'Hero ID',
      dataIndex: 'heroId',
      key: 'heroId',
      ellipsis: true,
    },
    {
      title: 'Language',
      dataIndex: 'languageCode',
      key: 'languageCode',
      render: (code) => (
        <Tag color="blue">{getLanguageName(code)}</Tag>
      ),
    },
    {
      title: 'Text',
      dataIndex: 'text',
      key: 'text',
      ellipsis: true,
    },
    {
      title: 'Sort Order',
      dataIndex: 'sortOrder',
      key: 'sortOrder',
      render: (order) => (
        <Tag color="green">{order}</Tag>
      ),
    },
    {
      title: 'Created At',
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
            title="Are you sure you want to delete this subheading?"
            onConfirm={() => handleDelete(record.subId)}
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
          <MenuOutlined /> Hero Subheadings
        </Title>
        <Button
          type="primary"
          icon={<PlusOutlined />}
          onClick={() => showModal()}
        >
          Add New Subheading
        </Button>
      </div>

      <Table
        columns={columns}
        dataSource={subheadings}
        loading={loading}
        rowKey="subId"
        pagination={{
          pageSize: 10,
          showSizeChanger: true,
          showQuickJumper: true,
        }}
      />

      <Modal
        title={editingSubheading ? 'Edit Subheading' : 'Add New Subheading'}
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
            name="heroId"
            label="Hero"
            rules={[{ required: true, message: 'Please select a hero!' }]}
          >
            <Select placeholder="Select hero">
              {heroes.map(hero => (
                <Option key={hero.heroId} value={hero.heroId}>
                  {hero.name || hero.heroId}
                </Option>
              ))}
            </Select>
          </Form.Item>

          <Form.Item
            name="languageCode"
            label="Language"
            rules={[{ required: true, message: 'Please select a language!' }]}
          >
            <Select placeholder="Select language">
              {languages.map(lang => (
                <Option key={lang.code} value={lang.code}>
                  {lang.name}
                </Option>
              ))}
            </Select>
          </Form.Item>

          <Form.Item
            name="text"
            label="Text"
            rules={[{ required: true, message: 'Please enter text!' }]}
          >
            <Input placeholder="Enter subheading text" />
          </Form.Item>

          <Form.Item
            name="sortOrder"
            label="Sort Order"
            rules={[{ required: true, message: 'Please enter sort order!' }]}
          >
            <InputNumber
              min={1}
              max={100}
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
                {editingSubheading ? 'Update' : 'Create'}
              </Button>
            </Space>
          </div>
        </Form>
      </Modal>
    </Card>
  );
};

export default HeroSubheadings;