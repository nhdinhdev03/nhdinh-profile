import {
    DeleteOutlined,
    EditOutlined,
    FilterOutlined,
    GlobalOutlined,
    PlusOutlined,
    SearchOutlined,
    TranslationOutlined
} from '@ant-design/icons';
import {
    Alert,
    Badge,
    Button,
    Card,
    Col,
    Divider,
    Form,
    Input,
    message,
    Modal,
    Popconfirm,
    Row,
    Select,
    Space,
    Table,
    Tag,
    Typography
} from 'antd';
import { useEffect, useState } from 'react';

const { Title, Text } = Typography;
const { TextArea } = Input;
const { Option } = Select;

const HeroTranslations = () => {
  const [translations, setTranslations] = useState([]);
  const [heroes, setHeroes] = useState([]);
  const [loading, setLoading] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);
  const [editingTranslation, setEditingTranslation] = useState(null);
  const [selectedHero, setSelectedHero] = useState(null);
  const [selectedLanguage, setSelectedLanguage] = useState(null);
  const [form] = Form.useForm();

  const languages = [
    { code: 'vi', name: 'Tiếng Việt', flag: '🇻🇳' },
    { code: 'en', name: 'English', flag: '🇺🇸' },
    { code: 'en-US', name: 'English (US)', flag: '🇺🇸' }
  ];

  useEffect(() => {
    fetchTranslations();
    fetchHeroes();
  }, []);

  const fetchTranslations = async () => {
    setLoading(true);
    // Enhanced mock data with more comprehensive structure
    setTimeout(() => {
      setTranslations([
        {
          translationId: '550e8400-e29b-41d4-a716-446655440011',
          heroId: '550e8400-e29b-41d4-a716-446655440001',
          languageCode: 'vi',
          preHeading: 'Xin chào, tôi là',
          heading: 'Nguyễn Hoàng Dinh',
          introHtml: '<p>Tôi là một Full-stack Developer với đam mê công nghệ và phát triển ứng dụng web hiện đại.</p>',
          createdAt: '2024-01-01T10:30:00Z',
          updatedAt: '2024-01-15T14:22:00Z'
        },
        {
          translationId: '550e8400-e29b-41d4-a716-446655440012',
          heroId: '550e8400-e29b-41d4-a716-446655440001',
          languageCode: 'en',
          preHeading: 'Hello, I am',
          heading: 'Nguyen Hoang Dinh',
          introHtml: '<p>I am a Full-stack Developer with a passion for technology and modern web application development.</p>',
          createdAt: '2024-01-01T10:35:00Z',
          updatedAt: null
        }
      ]);
      setLoading(false);
    }, 1000);
  };

  const fetchHeroes = async () => {
    // Enhanced mock data
    setHeroes([
      { 
        heroId: '550e8400-e29b-41d4-a716-446655440001', 
        name: 'Main Portfolio Hero',
        createdAt: '2024-01-01T10:30:00Z',
        isDeleted: false
      }
    ]);
  };

  const showModal = (translation = null) => {
    setEditingTranslation(translation);
    setModalVisible(true);
    if (translation) {
      form.setFieldsValue(translation);
    } else {
      form.resetFields();
      // Set default values
      if (selectedHero) {
        form.setFieldsValue({ heroId: selectedHero });
      }
      if (selectedLanguage) {
        form.setFieldsValue({ languageCode: selectedLanguage });
      }
    }
  };

  const handleCancel = () => {
    setModalVisible(false);
    setEditingTranslation(null);
    form.resetFields();
  };

  const handleSubmit = async (values) => {
    try {
      // Validate unique constraint: heroId + languageCode combination
      const existingTranslation = translations.find(t => 
        t.heroId === values.heroId && 
        t.languageCode === values.languageCode &&
        (!editingTranslation || t.translationId !== editingTranslation.translationId)
      );

      if (existingTranslation) {
        message.error('Translation for this hero and language already exists!');
        return;
      }

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
        console.error('Operation failed:', error);
        message.error('Operation failed!');
    }
  };

  const handleDelete = async (translationId) => {
    try {
      console.log('Deleting translation:', translationId);
      message.success('Translation deleted successfully!');
      fetchTranslations();
    } catch (error) {
        console.error('Delete failed:', error);
        message.error('Delete failed!');
    }
  };

  const getLanguageInfo = (code) => {
    return languages.find(l => l.code === code);
  };

  const getHeroName = (heroId) => {
    const hero = heroes.find(h => h.heroId === heroId);
    return hero ? hero.name : heroId.substring(0, 8) + '...';
  };

  // Filter translations based on selected filters
  const filteredTranslations = translations.filter(translation => {
    if (selectedHero && translation.heroId !== selectedHero) return false;
    if (selectedLanguage && translation.languageCode !== selectedLanguage) return false;
    return true;
  });

  const columns = [
    {
      title: 'Hero Information',
      key: 'heroInfo',
      render: (_, record) => {
        return (
          <div>
            <Text strong>{getHeroName(record.heroId)}</Text>
            <br />
            <Text code style={{ fontSize: '11px' }}>
              {record.heroId.substring(0, 13)}...
            </Text>
          </div>
        );
      },
    },
    {
      title: 'Language',
      dataIndex: 'languageCode',
      key: 'languageCode',
      render: (code) => {
        const lang = getLanguageInfo(code);
        return (
          <Tag color="blue" style={{ marginBottom: '4px' }}>
            {lang?.flag} {lang?.name || code}
          </Tag>
        );
      },
    },
    {
      title: 'Content Preview',
      key: 'content',
      render: (_, record) => (
        <div style={{ maxWidth: '300px' }}>
          {record.preHeading && (
            <div style={{ marginBottom: '4px' }}>
              <Text type="secondary" style={{ fontSize: '12px' }}>Pre: </Text>
              <Text style={{ fontSize: '12px' }}>{record.preHeading}</Text>
            </div>
          )}
          <div style={{ marginBottom: '4px' }}>
            <Text strong>{record.heading}</Text>
          </div>
          {record.introHtml && (
            <div style={{ 
              fontSize: '11px', 
              color: '#666',
              overflow: 'hidden',
              textOverflow: 'ellipsis',
              whiteSpace: 'nowrap'
            }}>
              {record.introHtml.replace(/<[^>]*>/g, '').substring(0, 50)}...
            </div>
          )}
        </div>
      ),
    },
    {
      title: 'Status',
      key: 'status',
      render: (_, record) => (
        <div>
          <div style={{ marginBottom: '4px' }}>
            <Badge status="success" text="Active" />
          </div>
          <Text type="secondary" style={{ fontSize: '11px' }}>
            {new Date(record.createdAt).toLocaleDateString()}
          </Text>
          {record.updatedAt && (
            <>
              <br />
              <Text type="secondary" style={{ fontSize: '11px' }}>
                Updated: {new Date(record.updatedAt).toLocaleDateString()}
              </Text>
            </>
          )}
        </div>
      ),
    },
    {
      title: 'Actions',
      key: 'actions',
      render: (_, record) => (
        <Space direction="vertical" size="small">
          <Button
            type="primary"
            size="small"
            icon={<EditOutlined />}
            onClick={() => showModal(record)}
            block
          >
            Edit
          </Button>
          <Popconfirm
            title="Delete Translation"
            description="Are you sure you want to delete this translation?"
            onConfirm={() => handleDelete(record.translationId)}
            okText="Yes"
            cancelText="No"
          >
            <Button
              type="primary"
              danger
              size="small"
              icon={<DeleteOutlined />}
              block
            >
              Delete
            </Button>
          </Popconfirm>
        </Space>
      ),
    },
  ];

  return (
    <div>
      <Card>
        <div style={{ marginBottom: 16, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <Title level={3} style={{ margin: 0 }}>
            <GlobalOutlined /> Hero Translations
          </Title>
          <Button
            type="primary"
            icon={<PlusOutlined />}
            onClick={() => showModal()}
          >
            Add Translation
          </Button>
        </div>

        {/* Filter Controls */}
        <Card size="small" style={{ marginBottom: '16px', backgroundColor: '#fafafa' }}>
          <Row gutter={[16, 8]} align="middle">
            <Col>
              <Text strong><FilterOutlined /> Filters:</Text>
            </Col>
            <Col flex="auto">
              <Space wrap>
                <Select
                  placeholder="Filter by Hero"
                  style={{ minWidth: '200px' }}
                  allowClear
                  value={selectedHero}
                  onChange={setSelectedHero}
                >
                  {heroes.map(hero => (
                    <Option key={hero.heroId} value={hero.heroId}>
                      {hero.name}
                    </Option>
                  ))}
                </Select>
                <Select
                  placeholder="Filter by Language"
                  style={{ minWidth: '150px' }}
                  allowClear
                  value={selectedLanguage}
                  onChange={setSelectedLanguage}
                >
                  {languages.map(lang => (
                    <Option key={lang.code} value={lang.code}>
                      {lang.flag} {lang.name}
                    </Option>
                  ))}
                </Select>
                <Badge count={filteredTranslations.length} showZero>
                  <Button 
                    icon={<SearchOutlined />}
                    onClick={() => {
                      setSelectedHero(null);
                      setSelectedLanguage(null);
                    }}
                  >
                    Clear Filters
                  </Button>
                </Badge>
              </Space>
            </Col>
          </Row>
        </Card>

        {/* Translation Coverage Overview */}
        <Alert
          message="Translation Coverage"
          description={
            <div>
              <Text>Total translations: {translations.length} • </Text>
              <Text>Languages covered: {[...new Set(translations.map(t => t.languageCode))].length} • </Text>
              <Text>Heroes with translations: {[...new Set(translations.map(t => t.heroId))].length}</Text>
            </div>
          }
          type="info"
          showIcon
          style={{ marginBottom: '16px' }}
        />

        <Table
          columns={columns}
          dataSource={filteredTranslations}
          loading={loading}
          rowKey="translationId"
          pagination={{
            pageSize: 10,
            showSizeChanger: true,
            showQuickJumper: true,
            showTotal: (total, range) => 
              `${range[0]}-${range[1]} of ${total} translations`,
          }}
          expandable={{
            expandedRowRender: (record) => (
              <Card size="small" style={{ margin: '8px 0' }}>
                <Row gutter={[16, 16]}>
                  <Col span={24}>
                    <Title level={5}>Full Content Preview</Title>
                    <Divider style={{ margin: '8px 0' }} />
                  </Col>
                  <Col span={8}>
                    <Text strong>Pre-heading:</Text>
                    <div style={{ 
                      padding: '8px', 
                      backgroundColor: '#f5f5f5', 
                      borderRadius: '4px',
                      minHeight: '32px'
                    }}>
                      {record.preHeading || <Text type="secondary">No pre-heading</Text>}
                    </div>
                  </Col>
                  <Col span={8}>
                    <Text strong>Main Heading:</Text>
                    <div style={{ 
                      padding: '8px', 
                      backgroundColor: '#f5f5f5', 
                      borderRadius: '4px',
                      minHeight: '32px'
                    }}>
                      <Text strong>{record.heading}</Text>
                    </div>
                  </Col>
                  <Col span={8}>
                    <Text strong>Language:</Text>
                    <div style={{ 
                      padding: '8px', 
                      backgroundColor: '#f5f5f5', 
                      borderRadius: '4px',
                      minHeight: '32px'
                    }}>
                      <Tag color="blue">
                        {getLanguageInfo(record.languageCode)?.flag} {getLanguageInfo(record.languageCode)?.name}
                      </Tag>
                    </div>
                  </Col>
                  <Col span={24}>
                    <Text strong>Introduction HTML:</Text>
                    <div style={{ 
                      padding: '12px', 
                      backgroundColor: '#f5f5f5', 
                      borderRadius: '4px',
                      border: '1px solid #d9d9d9',
                      minHeight: '60px'
                    }}>
                      {record.introHtml ? (
                        <div dangerouslySetInnerHTML={{ __html: record.introHtml }} />
                      ) : (
                        <Text type="secondary">No introduction content</Text>
                      )}
                    </div>
                  </Col>
                </Row>
              </Card>
            ),
            rowExpandable: () => true,
          }}
        />

        {/* Enhanced Form Modal */}
        <Modal
          title={
            <span>
              <TranslationOutlined /> {editingTranslation ? 'Edit Translation' : 'Create New Translation'}
            </span>
          }
          open={modalVisible}
          onCancel={handleCancel}
          footer={null}
          width={900}
        >
          <Form
            form={form}
            layout="vertical"
            onFinish={handleSubmit}
          >
            <Alert
              message="Translation Guidelines"
              description="Ensure heading is required. Pre-heading and intro HTML are optional. Each hero can only have one translation per language."
              type="info"
              showIcon
              style={{ marginBottom: '16px' }}
            />

            <Row gutter={[16, 16]}>
              <Col span={12}>
                <Form.Item
                  name="heroId"
                  label="Select Hero"
                  rules={[{ required: true, message: 'Please select a hero!' }]}
                >
                  <Select 
                    placeholder="Choose hero to translate"
                    disabled={!!editingTranslation} // Disable editing hero on update
                  >
                    {heroes.map(hero => (
                      <Option key={hero.heroId} value={hero.heroId}>
                        <div>
                          <Text strong>{hero.name}</Text>
                          <br />
                          <Text code style={{ fontSize: '11px' }}>
                            {hero.heroId.substring(0, 15)}...
                          </Text>
                        </div>
                      </Option>
                    ))}
                  </Select>
                </Form.Item>
              </Col>
              <Col span={12}>
                <Form.Item
                  name="languageCode"
                  label="Select Language"
                  rules={[{ required: true, message: 'Please select a language!' }]}
                >
                  <Select 
                    placeholder="Choose language"
                    disabled={!!editingTranslation} // Disable editing language on update
                  >
                    {languages.map(lang => (
                      <Option key={lang.code} value={lang.code}>
                        {lang.flag} {lang.name}
                      </Option>
                    ))}
                  </Select>
                </Form.Item>
              </Col>
            </Row>

            <Divider>Content Fields</Divider>

            <Form.Item
              name="preHeading"
              label="Pre-heading (Optional)"
              extra="Small text that appears before the main heading, e.g., 'Hello, I am'"
            >
              <Input 
                placeholder="Enter pre-heading text" 
                maxLength={256}
                showCount
              />
            </Form.Item>

            <Form.Item
              name="heading"
              label="Main Heading"
              rules={[
                { required: true, message: 'Please enter the main heading!' },
                { max: 256, message: 'Heading must be less than 256 characters!' }
              ]}
              extra="The primary heading text that will be prominently displayed"
            >
              <Input 
                placeholder="Enter main heading" 
                maxLength={256}
                showCount
              />
            </Form.Item>

            <Form.Item
              name="introHtml"
              label="Introduction HTML (Optional)"
              extra="Rich HTML content for introduction paragraph. Use basic HTML tags like <p>, <strong>, <em>, etc."
            >
              <TextArea
                rows={6}
                placeholder="Enter introduction HTML content, e.g., <p>Welcome to <strong>my portfolio</strong>!</p>"
              />
            </Form.Item>

            <div style={{ textAlign: 'right', marginTop: 24 }}>
              <Space>
                <Button onClick={handleCancel}>
                  Cancel
                </Button>
                <Button type="primary" htmlType="submit">
                  {editingTranslation ? 'Update Translation' : 'Create Translation'}
                </Button>
              </Space>
            </div>
          </Form>
        </Modal>
      </Card>
    </div>
  );
};

export default HeroTranslations;