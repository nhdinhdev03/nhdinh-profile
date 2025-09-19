import {
    DeleteOutlined,
    EditOutlined,
    PlusOutlined,
    TranslationOutlined
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
    Table,
    Tag,
    Typography,
    message
} from 'antd';
import { useEffect, useState } from 'react';

const { Title } = Typography;
const { TextArea } = Input;
const { Option } = Select;

const HeroTranslations = () => {
  const [translations, setTranslations] = useState([]);
  const [heroes, setHeroes] = useState([]);
  const [loading, setLoading] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);
  const [editingTranslation, setEditingTranslation] = useState(null);
  const [form] = Form.useForm();

  const languages = [
    { code: 'vi', name: 'Tiếng Việt' },
    { code: 'en', name: 'English' },
    { code: 'en-US', name: 'English (US)' }
  ];

  useEffect(() => {
    fetchTranslations();
    fetchHeroes();
  }, []);

  const fetchTranslations = async () => {
    setLoading(true);
    // Simulate API call
    setTimeout(() => {
      setTranslations([
        {
          translationId: '1',
          heroId: '1',
          languageCode: 'vi',
          preHeading: 'Xin chào, tôi là',
          heading: 'Nguyễn Hoài Dình',
          introHtml: '<p>Tôi là một Full-stack Developer với đam mê công nghệ.</p>',
          createdAt: '2024-01-01'
        },
        {
          translationId: '2',
          heroId: '1',
          languageCode: 'en',
          preHeading: 'Hello, I am',
          heading: 'Nguyen Hoai Dinh',
          introHtml: '<p>I am a Full-stack Developer with a passion for technology.</p>',
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

  const showModal = (translation = null) => {
    setEditingTranslation(translation);
    setModalVisible(true);
    if (translation) {
      form.setFieldsValue(translation);
    } else {
      form.resetFields();
    }
  };

  const handleCancel = () => {
    setModalVisible(false);
    setEditingTranslation(null);
    form.resetFields();
  };

  const handleSubmit = async (values) => {
    try {
      if (editingTranslation) {
        console.log('Updating translation:', values);
        message.success('Translation updated successfully!');
      } else {
        console.log('Creating translation:', values);
        message.success('Translation created successfully!');
      }
      setModalVisible(false);
      setEditingTranslation(null);
      form.resetFields();
      fetchTranslations();
    } catch (error) {
      message.error('Operation failed!');
    }
  };

  const handleDelete = async (translationId) => {
    try {
      console.log('Deleting translation:', translationId);
      message.success('Translation deleted successfully!');
      fetchTranslations();
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
      title: 'Pre Heading',
      dataIndex: 'preHeading',
      key: 'preHeading',
      ellipsis: true,
    },
    {
      title: 'Heading',
      dataIndex: 'heading',
      key: 'heading',
      ellipsis: true,
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
            title="Are you sure you want to delete this translation?"
            onConfirm={() => handleDelete(record.translationId)}
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
          <TranslationOutlined /> Hero Translations
        </Title>
        <Button
          type="primary"
          icon={<PlusOutlined />}
          onClick={() => showModal()}
        >
          Add New Translation
        </Button>
      </div>

      <Table
        columns={columns}
        dataSource={translations}
        loading={loading}
        rowKey="translationId"
        pagination={{
          pageSize: 10,
          showSizeChanger: true,
          showQuickJumper: true,
        }}
      />

      <Modal
        title={editingTranslation ? 'Edit Translation' : 'Add New Translation'}
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
            name="preHeading"
            label="Pre Heading"
          >
            <Input placeholder="Enter pre heading text" />
          </Form.Item>

          <Form.Item
            name="heading"
            label="Heading"
            rules={[{ required: true, message: 'Please enter heading!' }]}
          >
            <Input placeholder="Enter main heading" />
          </Form.Item>

          <Form.Item
            name="introHtml"
            label="Introduction HTML"
          >
            <TextArea
              rows={6}
              placeholder="Enter introduction HTML content"
            />
          </Form.Item>

          <div style={{ textAlign: 'right', marginTop: 24 }}>
            <Space>
              <Button onClick={handleCancel}>
                Cancel
              </Button>
              <Button type="primary" htmlType="submit">
                {editingTranslation ? 'Update' : 'Create'}
              </Button>
            </Space>
          </div>
        </Form>
      </Modal>
    </Card>
  );
};

export default HeroTranslations;