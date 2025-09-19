import {
    DeleteOutlined,
    EditOutlined,
    MenuOutlined,
    PlusOutlined,
    ArrowUpOutlined,
    ArrowDownOutlined,
    FilterOutlined,
    SearchOutlined,
    SortAscendingOutlined,
    GlobalOutlined
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
    message,
    Row,
    Col,
    Alert,
    Badge,
    Tooltip
} from 'antd';
import { useEffect, useState } from 'react';

const { Title, Text } = Typography;
const { Option } = Select;

const HeroSubheadings = () => {
  const [subheadings, setSubheadings] = useState([]);
  const [heroes, setHeroes] = useState([]);
  const [loading, setLoading] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);
  const [bulkEditModalVisible, setBulkEditModalVisible] = useState(false);
  const [editingSubheading, setEditingSubheading] = useState(null);
  const [selectedHero, setSelectedHero] = useState(null);
  const [selectedLanguage, setSelectedLanguage] = useState(null);
  const [form] = Form.useForm();
  const [bulkEditForm] = Form.useForm();

  const languages = [
    { code: 'vi', name: 'Tiếng Việt', flag: '🇻🇳' },
    { code: 'en', name: 'English', flag: '🇺🇸' },
    { code: 'en-US', name: 'English (US)', flag: '🇺🇸' }
  ];

  useEffect(() => {
    fetchSubheadings();
    fetchHeroes();
  }, []);

  const fetchSubheadings = async () => {
    setLoading(true);
    // Enhanced mock data with comprehensive structure
    setTimeout(() => {
      setSubheadings([
        {
          subId: '550e8400-e29b-41d4-a716-446655440021',
          heroId: '550e8400-e29b-41d4-a716-446655440001',
          languageCode: 'vi',
          text: 'Phát triển ứng dụng web hiện đại',
          sortOrder: 1,
          createdAt: '2024-01-01T10:30:00Z',
          updatedAt: null
        },
        {
          subId: '550e8400-e29b-41d4-a716-446655440022',
          heroId: '550e8400-e29b-41d4-a716-446655440001',
          languageCode: 'vi',
          text: 'Thiết kế giao diện người dùng trực quan',
          sortOrder: 2,
          createdAt: '2024-01-01T10:35:00Z',
          updatedAt: null
        },
        {
          subId: '550e8400-e29b-41d4-a716-446655440023',
          heroId: '550e8400-e29b-41d4-a716-446655440001',
          languageCode: 'vi',
          text: 'Tối ưu hóa hiệu suất ứng dụng',
          sortOrder: 3,
          createdAt: '2024-01-01T10:40:00Z',
          updatedAt: null
        },
        {
          subId: '550e8400-e29b-41d4-a716-446655440024',
          heroId: '550e8400-e29b-41d4-a716-446655440001',
          languageCode: 'en',
          text: 'Modern Web Application Development',
          sortOrder: 1,
          createdAt: '2024-01-01T10:45:00Z',
          updatedAt: null
        },
        {
          subId: '550e8400-e29b-41d4-a716-446655440025',
          heroId: '550e8400-e29b-41d4-a716-446655440001',
          languageCode: 'en',
          text: 'Intuitive User Interface Design',
          sortOrder: 2,
          createdAt: '2024-01-01T10:50:00Z',
          updatedAt: null
        },
        {
          subId: '550e8400-e29b-41d4-a716-446655440026',
          heroId: '550e8400-e29b-41d4-a716-446655440001',
          languageCode: 'en',
          text: 'Application Performance Optimization',
          sortOrder: 3,
          createdAt: '2024-01-01T10:55:00Z',
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
        isDeleted: false
      }
    ]);
  };

  const showModal = (subheading = null) => {
    setEditingSubheading(subheading);
    setModalVisible(true);
    if (subheading) {
      form.setFieldsValue(subheading);
    } else {
      form.resetFields();
      // Set intelligent defaults
      if (selectedHero) {
        form.setFieldsValue({ heroId: selectedHero });
      }
      if (selectedLanguage) {
        form.setFieldsValue({ languageCode: selectedLanguage });
        // Auto-calculate next sort order for this hero+language combo
        const existingForLang = subheadings
          .filter(s => s.heroId === selectedHero && s.languageCode === selectedLanguage)
          .length;
        form.setFieldsValue({ sortOrder: existingForLang + 1 });
      }
    }
  };

  const showBulkEditModal = () => {
    if (!selectedHero || !selectedLanguage) {
      message.warning('Please select both a hero and language to manage sub-headings in bulk.');
      return;
    }
    setBulkEditModalVisible(true);
  };

  const handleCancel = () => {
    setModalVisible(false);
    setEditingSubheading(null);
    form.resetFields();
  };

  const handleBulkEditCancel = () => {
    setBulkEditModalVisible(false);
    bulkEditForm.resetFields();
  };

  const handleSubmit = async (values) => {
    try {
      // Validate unique constraint: heroId + languageCode + text combination
      const existingSubheading = subheadings.find(s => 
        s.heroId === values.heroId && 
        s.languageCode === values.languageCode &&
        s.text.toLowerCase() === values.text.toLowerCase() &&
        (!editingSubheading || s.subId !== editingSubheading.subId)
      );

      if (existingSubheading) {
        message.error('A sub-heading with this text already exists for this hero and language!');
        return;
      }

      if (editingSubheading) {
        console.log('Updating subheading:', values);
        message.success('Sub-heading updated successfully!');
      } else {
        console.log('Creating subheading:', values);
        message.success('Sub-heading created successfully!');
      }
      setModalVisible(false);
      setEditingSubheading(null);
      form.resetFields();
      fetchSubheadings();
    } catch (error) {
        console.error('Operation failed:', error);
        message.error('Operation failed!');
    }
  };

  const handleDelete = async (subId) => {
    try {
      console.log('Deleting subheading:', subId);
      message.success('Sub-heading deleted successfully!');
      fetchSubheadings();
    } catch (error) {
        console.error('Delete failed:', error);
        message.error('Delete failed!');
    }
  };

  const handleMoveSubheading = async (subId, direction) => {
    // Implementation for move up/down functionality
    try {
      // This would be implemented when backend API is available
      console.log(`Moving subheading ${subId} ${direction}`);
      
      // For now, show placeholder functionality
      const updatedSubheadings = [...subheadings];
      const currentIndex = updatedSubheadings.findIndex(sub => sub.subheadingId === subId);
      
      if (direction === 'up' && currentIndex > 0) {
        // Swap with previous item
        [updatedSubheadings[currentIndex], updatedSubheadings[currentIndex - 1]] = 
        [updatedSubheadings[currentIndex - 1], updatedSubheadings[currentIndex]];
        
        setSubheadings(updatedSubheadings);
        message.success(`Moved subheading ${direction} successfully`);
      } else if (direction === 'down' && currentIndex < updatedSubheadings.length - 1) {
        // Swap with next item
        [updatedSubheadings[currentIndex], updatedSubheadings[currentIndex + 1]] = 
        [updatedSubheadings[currentIndex + 1], updatedSubheadings[currentIndex]];
        
        setSubheadings(updatedSubheadings);
        message.success(`Moved subheading ${direction} successfully`);
      } else {
        message.warning(`Cannot move ${direction} - already at the limit`);
      }
    } catch (error) {
      console.error('Move operation failed:', error);
      message.error('Move operation failed!');
    }
  };

  const getLanguageInfo = (code) => {
    return languages.find(l => l.code === code);
  };

  const getHeroName = (heroId) => {
    const hero = heroes.find(h => h.heroId === heroId);
    return hero ? hero.name : heroId.substring(0, 8) + '...';
  };

  // Filter subheadings based on selected filters
  const filteredSubheadings = subheadings
    .filter(subheading => {
      if (selectedHero && subheading.heroId !== selectedHero) return false;
      if (selectedLanguage && subheading.languageCode !== selectedLanguage) return false;
      return true;
    })
    .sort((a, b) => {
      // Sort by hero, then language, then sortOrder
      if (a.heroId !== b.heroId) return a.heroId.localeCompare(b.heroId);
      if (a.languageCode !== b.languageCode) return a.languageCode.localeCompare(b.languageCode);
      return a.sortOrder - b.sortOrder;
    });

  const columns = [
    {
      title: 'Order',
      key: 'order',
      width: 60,
      render: (_, record) => (
        <Tooltip title="Sort Order">
          <Badge count={record.sortOrder} style={{ backgroundColor: '#1890ff' }} />
        </Tooltip>
      ),
    },
    {
      title: 'Hero Information',
      key: 'heroInfo',
      render: (_, record) => (
        <div>
          <Text strong>{getHeroName(record.heroId)}</Text>
          <br />
          <Text code style={{ fontSize: '11px' }}>
            {record.heroId.substring(0, 13)}...
          </Text>
        </div>
      ),
    },
    {
      title: 'Language',
      dataIndex: 'languageCode',
      key: 'languageCode',
      render: (code) => {
        const lang = getLanguageInfo(code);
        return (
          <Tag color="blue">
            {lang?.flag} {lang?.name || code}
          </Tag>
        );
      },
    },
    {
      title: 'Sub-heading Text',
      dataIndex: 'text',
      key: 'text',
      render: (text) => (
        <div style={{ maxWidth: '300px' }}>
          <Text>{text}</Text>
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
            Created: {new Date(record.createdAt).toLocaleDateString()}
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
            title="Delete Sub-heading"
            description="Are you sure you want to delete this sub-heading?"
            onConfirm={() => handleDelete(record.subId)}
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

  const getSubheadingTable = () => {
    if (!selectedHero || !selectedLanguage) {
      return (
        <Table
          columns={columns}
          dataSource={filteredSubheadings}
          loading={loading}
          rowKey="subId"
          pagination={{
            pageSize: 15,
            showSizeChanger: true,
            showQuickJumper: true,
            showTotal: (total, range) => 
              `${range[0]}-${range[1]} of ${total} sub-headings`,
          }}
        />
      );
    }

    // Simple table with move up/down buttons for specific hero+language combination
    return (
      <div>
        {filteredSubheadings.map((item, index) => (
          <div
            key={item.subId}
            style={{
              marginBottom: '8px',
              padding: '12px',
              border: '1px solid #d9d9d9',
              borderRadius: '6px',
              backgroundColor: '#fafafa'
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '2px' }}>
                <Button
                  type="text"
                  size="small"
                  icon={<ArrowUpOutlined />}
                  onClick={() => {
                    // Handle move up
                    console.log('Move up:', item.subId);
                    message.info('Move up functionality will be implemented soon');
                  }}
                  disabled={index === 0}
                  style={{ height: '16px', width: '20px', padding: 0 }}
                />
                <Button
                  type="text"
                  size="small"
                  icon={<ArrowDownOutlined />}
                  onClick={() => {
                    // Handle move down
                    console.log('Move down:', item.subId);
                    message.info('Move down functionality will be implemented soon');
                  }}
                  disabled={index === filteredSubheadings.length - 1}
                  style={{ height: '16px', width: '20px', padding: 0 }}
                />
              </div>
              <Badge count={item.sortOrder} style={{ backgroundColor: '#1890ff' }} />
              <div style={{ flex: 1 }}>
                <Text strong>{item.text}</Text>
                <br />
                <Text type="secondary" style={{ fontSize: '12px' }}>
                  {getLanguageInfo(item.languageCode)?.flag} {getLanguageInfo(item.languageCode)?.name}
                </Text>
              </div>
              <Space>
                <Button
                  type="primary"
                  size="small"
                  icon={<EditOutlined />}
                  onClick={() => showModal(item)}
                >
                  Edit
                </Button>
                <Popconfirm
                  title="Delete this sub-heading?"
                  onConfirm={() => handleDelete(item.subId)}
                >
                  <Button
                    type="primary"
                    danger
                    size="small"
                    icon={<DeleteOutlined />}
                  />
                </Popconfirm>
              </Space>
            </div>
          </div>
        ))}
      </div>
    );
  };

  return (
    <div>
      <Card>
        <div style={{ marginBottom: 16, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <Title level={3} style={{ margin: 0 }}>
            <MenuOutlined /> Hero Sub-headings
          </Title>
          <Space>
            {selectedHero && selectedLanguage && (
              <Button
                type="default"
                icon={<SortAscendingOutlined />}
                onClick={showBulkEditModal}
              >
                Bulk Manage
              </Button>
            )}
            <Button
              type="primary"
              icon={<PlusOutlined />}
              onClick={() => showModal()}
            >
              Add Sub-heading
            </Button>
          </Space>
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
                <Badge count={filteredSubheadings.length} showZero>
                  <Button 
                    icon={<SearchOutlined />}
                    onClick={() => {
                      setSelectedHero(null);
                      setSelectedLanguage(null);
                    }}
                  >
                    Clear
                  </Button>
                </Badge>
              </Space>
            </Col>
          </Row>
        </Card>

        {/* Coverage Overview */}
        <Alert
          message="Sub-heading Management"
          description={
            <div>
              <Text>Total sub-headings: {subheadings.length} • </Text>
              <Text>Languages: {[...new Set(subheadings.map(s => s.languageCode))].length} • </Text>
              <Text>Heroes: {[...new Set(subheadings.map(s => s.heroId))].length}</Text>
              {selectedHero && selectedLanguage && (
                <>
                  <br />
                  <Text strong>
                    📌 Use up/down arrows to reorder {getLanguageInfo(selectedLanguage)?.flag} {getLanguageInfo(selectedLanguage)?.name} sub-headings
                  </Text>
                </>
              )}
            </div>
          }
          type="info"
          showIcon
          style={{ marginBottom: '16px' }}
        />

        {getSubheadingTable()}

        {/* Single Sub-heading Form */}
        <Modal
          title={
            <span>
              <MenuOutlined /> {editingSubheading ? 'Edit Sub-heading' : 'Create New Sub-heading'}
            </span>
          }
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
            <Alert
              message="Sub-heading Guidelines"
              description="Each sub-heading must be unique per hero and language. Sort order determines display sequence."
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
                    placeholder="Choose hero"
                    disabled={!!editingSubheading}
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
                    disabled={!!editingSubheading}
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

            <Form.Item
              name="text"
              label="Sub-heading Text"
              rules={[
                { required: true, message: 'Please enter sub-heading text!' },
                { max: 256, message: 'Text must be less than 256 characters!' }
              ]}
              extra="Descriptive text that appears as a sub-heading element"
            >
              <Input 
                placeholder="e.g., Web Application Development" 
                maxLength={256}
                showCount
              />
            </Form.Item>

            <Form.Item
              name="sortOrder"
              label="Sort Order"
              rules={[{ required: true, message: 'Please enter sort order!' }]}
              extra="Numeric order for display sequence (1 = first, 2 = second, etc.)"
            >
              <InputNumber 
                min={1} 
                max={99}
                placeholder="Enter display order"
                style={{ width: '100%' }}
              />
            </Form.Item>

            <div style={{ textAlign: 'right', marginTop: 24 }}>
              <Space>
                <Button onClick={handleCancel}>
                  Cancel
                </Button>
                <Button type="primary" htmlType="submit">
                  {editingSubheading ? 'Update Sub-heading' : 'Create Sub-heading'}
                </Button>
              </Space>
            </div>
          </Form>
        </Modal>

        {/* Bulk Edit Modal */}
        <Modal
          title={
            <span>
              <SortAscendingOutlined /> Bulk Manage Sub-headings
            </span>
          }
          open={bulkEditModalVisible}
          onCancel={handleBulkEditCancel}
          footer={null}
          width={700}
        >
          <Alert
            message="Bulk Sub-heading Management"
            description="Manage multiple sub-headings for a specific hero and language combination."
            type="info"
            showIcon
            style={{ marginBottom: '16px' }}
          />
          
          <div style={{ textAlign: 'center', padding: '40px' }}>
            <GlobalOutlined style={{ fontSize: '48px', color: '#1890ff', marginBottom: '16px' }} />
            <Title level={4}>Feature Coming Soon</Title>
            <Text type="secondary">
              Bulk editing capabilities will be available in the next update.
              <br />
              For now, use the drag & drop interface above to reorder sub-headings.
            </Text>
          </div>

          <div style={{ textAlign: 'right', marginTop: 24 }}>
            <Button onClick={handleBulkEditCancel}>
              Close
            </Button>
          </div>
        </Modal>
      </Card>
    </div>
  );
};

export default HeroSubheadings;