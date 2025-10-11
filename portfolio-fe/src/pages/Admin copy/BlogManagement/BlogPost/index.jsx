import React, { useState } from 'react';
import { 
  Card,
  Button,
  Input,
  Table,
  Tag,
  Space,
  Modal,
  Form,
  Select,
  DatePicker,
  Switch,
  Upload,
  message,
  Tooltip,
  Popconfirm,
  Row,
  Col,
  Typography
} from 'antd';
import {
  EditOutlined,
  EyeOutlined,
  DeleteOutlined,
  PlusOutlined,
  HeartOutlined,
  MessageOutlined,
  SearchOutlined,
  StarOutlined,
  StarFilled,
  UploadOutlined,
  BookOutlined
} from '@ant-design/icons';
import { PageHeader } from 'components/Admin';
import dayjs from 'dayjs';

const { TextArea } = Input;
const { Text } = Typography;
const { Option } = Select;

const BlogManagement = () => {
  const [posts, setPosts] = useState([
    {
      id: 1,
      title: 'Hướng dẫn React Hooks cho người mới bắt đầu',
      excerpt: 'Tìm hiểu về React Hooks và cách sử dụng chúng hiệu quả...',
      status: 'published',
      author: 'Nguyễn Hữu Định',
      publishDate: '2024-01-15',
      category: 'React',
      tags: ['React', 'JavaScript', 'Frontend'],
      views: 1250,
      likes: 45,
      comments: 12,
      featured: true
    },
    {
      id: 2,
      title: 'Xây dựng API RESTful với Node.js và Express',
      excerpt: 'Hướng dẫn chi tiết cách tạo API RESTful...',
      status: 'draft',
      author: 'Nguyễn Hữu Định',
      publishDate: '2024-01-20',
      category: 'Backend',
      tags: ['Node.js', 'Express', 'API'],
      views: 0,
      likes: 0,
      comments: 0,
      featured: false
    },
    {
      id: 3,
      title: 'Tối ưu hóa performance cho ứng dụng React',
      excerpt: 'Các kỹ thuật tối ưu hóa hiệu suất cho React apps...',
      status: 'published',
      author: 'Nguyễn Hữu Định',
      publishDate: '2024-01-10',
      category: 'Performance',
      tags: ['React', 'Performance', 'Optimization'],
      views: 890,
      likes: 32,
      comments: 8,
      featured: false
    }
  ]);

  const [loading, setLoading] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [categoryFilter, setCategoryFilter] = useState('all');
  const [modalVisible, setModalVisible] = useState(false);
  const [editingPost, setEditingPost] = useState(null);
  const [form] = Form.useForm();

  const handleDeletePost = (id) => {
    setPosts(posts.filter(post => post.id !== id));
    message.success('Xóa bài viết thành công!');
  };

  const handleToggleFeatured = (id) => {
    setPosts(posts.map(post => 
      post.id === id ? { ...post, featured: !post.featured } : post
    ));
    message.success('Cập nhật trạng thái nổi bật thành công!');
  };

  const handleOpenModal = (post = null) => {
    setEditingPost(post);
    if (post) {
      form.setFieldsValue({
        ...post,
        publishDate: post.publishDate ? dayjs(post.publishDate) : null,
      });
    } else {
      form.resetFields();
    }
    setModalVisible(true);
  };

  const handleSavePost = async (values) => {
    try {
      setLoading(true);
      const postData = {
        ...values,
        publishDate: values.publishDate ? values.publishDate.format('YYYY-MM-DD') : null,
        tags: values.tags || [],
      };

      if (editingPost) {
        // Update existing post
        setPosts(posts.map(post => 
          post.id === editingPost.id 
            ? { ...post, ...postData }
            : post
        ));
        message.success('Cập nhật bài viết thành công!');
      } else {
        // Add new post
        const newPost = {
          id: Date.now(),
          ...postData,
          views: 0,
          likes: 0,
          comments: 0,
          featured: false
        };
        setPosts([newPost, ...posts]);
        message.success('Tạo bài viết thành công!');
      }
      
      setModalVisible(false);
      setEditingPost(null);
      form.resetFields();
    } catch (error) {
      message.error('Có lỗi xảy ra khi lưu bài viết!');
    } finally {
      setLoading(false);
    }
  };

  const getStatusColor = (status) => {
    const colors = {
      published: 'green',
      draft: 'orange',
      archived: 'default'
    };
    return colors[status] || 'default';
  };

  const getStatusText = (status) => {
    const texts = {
      published: 'Đã xuất bản',
      draft: 'Bản nháp',
      archived: 'Lưu trữ'
    };
    return texts[status] || status;
  };

  const filteredPosts = posts.filter(post => {
    const matchesSearch = post.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         post.excerpt.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === 'all' || post.status === statusFilter;
    const matchesCategory = categoryFilter === 'all' || post.category === categoryFilter;
    
    return matchesSearch && matchesStatus && matchesCategory;
  });

  const columns = [
    {
      title: 'Tiêu đề',
      dataIndex: 'title',
      key: 'title',
      render: (text, record) => (
        <div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
            <Text strong>{text}</Text>
            {record.featured && <StarFilled style={{ color: '#faad14' }} />}
          </div>
          <Text type="secondary" style={{ fontSize: 12 }}>
            {record.excerpt}
          </Text>
        </div>
      ),
    },
    {
      title: 'Trạng thái',
      dataIndex: 'status',
      key: 'status',
      width: 120,
      render: (status) => (
        <Tag color={getStatusColor(status)}>
          {getStatusText(status)}
        </Tag>
      ),
    },
    {
      title: 'Danh mục',
      dataIndex: 'category',
      key: 'category',
      width: 100,
      render: (category) => <Tag>{category}</Tag>,
    },
    {
      title: 'Tags',
      dataIndex: 'tags',
      key: 'tags',
      width: 200,
      render: (tags) => (
        <div>
          {tags.map((tag, index) => (
            <Tag key={index} size="small" style={{ margin: '2px' }}>
              {tag}
            </Tag>
          ))}
        </div>
      ),
    },
    {
      title: 'Thống kê',
      key: 'stats',
      width: 120,
      render: (_, record) => (
        <Space direction="vertical" size="small">
          <div style={{ display: 'flex', alignItems: 'center', gap: 4 }}>
            <EyeOutlined style={{ color: '#1890ff' }} />
            <Text style={{ fontSize: 12 }}>{record.views}</Text>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 4 }}>
            <HeartOutlined style={{ color: '#f5222d' }} />
            <Text style={{ fontSize: 12 }}>{record.likes}</Text>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 4 }}>
            <MessageOutlined style={{ color: '#52c41a' }} />
            <Text style={{ fontSize: 12 }}>{record.comments}</Text>
          </div>
        </Space>
      ),
    },
    {
      title: 'Ngày xuất bản',
      dataIndex: 'publishDate',
      key: 'publishDate',
      width: 120,
      render: (date) => <Text style={{ fontSize: 12 }}>{date}</Text>,
    },
    {
      title: 'Thao tác',
      key: 'actions',
      width: 120,
      render: (_, record) => (
        <Space>
          <Tooltip title="Xem">
            <Button type="text" icon={<EyeOutlined />} size="small" />
          </Tooltip>
          <Tooltip title="Chỉnh sửa">
            <Button 
              type="text" 
              icon={<EditOutlined />} 
              size="small"
              onClick={() => handleOpenModal(record)}
            />
          </Tooltip>
          <Tooltip title={record.featured ? "Bỏ nổi bật" : "Đánh dấu nổi bật"}>
            <Button 
              type="text" 
              icon={record.featured ? <StarFilled /> : <StarOutlined />}
              size="small"
              style={{ color: record.featured ? '#faad14' : undefined }}
              onClick={() => handleToggleFeatured(record.id)}
            />
          </Tooltip>
          <Popconfirm
            title="Bạn có chắc chắn muốn xóa bài viết này?"
            onConfirm={() => handleDeletePost(record.id)}
            okText="Xóa"
            cancelText="Hủy"
          >
            <Tooltip title="Xóa">
              <Button type="text" icon={<DeleteOutlined />} size="small" danger />
            </Tooltip>
          </Popconfirm>
        </Space>
      ),
    },
  ];

  return (
    <div className="space-y-6">
      <PageHeader
        title="Quản lý Blog"
        subtitle="Tạo và quản lý các bài viết blog"
        icon={BookOutlined}
        actions={
          <div className="flex items-center space-x-3">
            <Button 
              type="primary" 
              icon={<PlusOutlined />}
              onClick={() => handleOpenModal()}
            >
              Tạo bài viết mới
            </Button>
          </div>
        }
      />

      <Card>
        {/* Filters */}
        <Row gutter={16} style={{ marginBottom: 16 }}>
          <Col span={8}>
            <Input
              placeholder="Tìm kiếm bài viết..."
              prefix={<SearchOutlined />}
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              allowClear
            />
          </Col>
          <Col span={8}>
            <Select
              style={{ width: '100%' }}
              placeholder="Trạng thái"
              value={statusFilter}
              onChange={setStatusFilter}
              allowClear
            >
              <Option value="all">Tất cả</Option>
              <Option value="published">Đã xuất bản</Option>
              <Option value="draft">Bản nháp</Option>
              <Option value="archived">Lưu trữ</Option>
            </Select>
          </Col>
          <Col span={8}>
            <Select
              style={{ width: '100%' }}
              placeholder="Danh mục"
              value={categoryFilter}
              onChange={setCategoryFilter}
              allowClear
            >
              <Option value="all">Tất cả</Option>
              <Option value="React">React</Option>
              <Option value="Backend">Backend</Option>
              <Option value="Performance">Performance</Option>
            </Select>
          </Col>
        </Row>

        {/* Table */}
        <Table
          columns={columns}
          dataSource={filteredPosts}
          rowKey="id"
          loading={loading}
          pagination={{
            total: filteredPosts.length,
            pageSize: 10,
            showSizeChanger: true,
            showQuickJumper: true,
            showTotal: (total, range) => `${range[0]}-${range[1]} của ${total} bài viết`,
          }}
        />
      </Card>

      {/* Create/Edit Modal */}
      <Modal
        title={editingPost ? "Chỉnh sửa bài viết" : "Tạo bài viết mới"}
        open={modalVisible}
        onCancel={() => {
          setModalVisible(false);
          setEditingPost(null);
          form.resetFields();
        }}
        footer={null}
        width={800}
      >
        <Form
          form={form}
          layout="vertical"
          onFinish={handleSavePost}
        >
          <Row gutter={16}>
            <Col span={16}>
              <Form.Item
                label="Tiêu đề"
                name="title"
                rules={[{ required: true, message: 'Vui lòng nhập tiêu đề' }]}
              >
                <Input />
              </Form.Item>
            </Col>
            <Col span={8}>
              <Form.Item
                label="Trạng thái"
                name="status"
                rules={[{ required: true, message: 'Vui lòng chọn trạng thái' }]}
              >
                <Select>
                  <Option value="draft">Bản nháp</Option>
                  <Option value="published">Đã xuất bản</Option>
                  <Option value="archived">Lưu trữ</Option>
                </Select>
              </Form.Item>
            </Col>
          </Row>

          <Form.Item
            label="Mô tả ngắn"
            name="excerpt"
            rules={[{ required: true, message: 'Vui lòng nhập mô tả ngắn' }]}
          >
            <TextArea rows={3} />
          </Form.Item>

          <Row gutter={16}>
            <Col span={12}>
              <Form.Item
                label="Danh mục"
                name="category"
                rules={[{ required: true, message: 'Vui lòng chọn danh mục' }]}
              >
                <Select>
                  <Option value="React">React</Option>
                  <Option value="Backend">Backend</Option>
                  <Option value="Performance">Performance</Option>
                  <Option value="JavaScript">JavaScript</Option>
                  <Option value="CSS">CSS</Option>
                </Select>
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item
                label="Tags"
                name="tags"
              >
                <Select mode="tags" placeholder="Nhập tags...">
                  <Option value="React">React</Option>
                  <Option value="JavaScript">JavaScript</Option>
                  <Option value="Frontend">Frontend</Option>
                  <Option value="Backend">Backend</Option>
                  <Option value="Node.js">Node.js</Option>
                  <Option value="Express">Express</Option>
                </Select>
              </Form.Item>
            </Col>
          </Row>

          <Row gutter={16}>
            <Col span={12}>
              <Form.Item
                label="Ngày xuất bản"
                name="publishDate"
              >
                <DatePicker style={{ width: '100%' }} />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item
                label="Nổi bật"
                name="featured"
                valuePropName="checked"
              >
                <Switch />
              </Form.Item>
            </Col>
          </Row>

          <Form.Item
            label="Ảnh đại diện"
            name="thumbnail"
          >
            <Upload
              listType="picture-card"
              maxCount={1}
              beforeUpload={() => false}
            >
              <div>
                <UploadOutlined />
                <div style={{ marginTop: 8 }}>Upload</div>
              </div>
            </Upload>
          </Form.Item>

          <Form.Item style={{ textAlign: 'right', marginBottom: 0 }}>
            <Space>
              <Button 
                onClick={() => {
                  setModalVisible(false);
                  setEditingPost(null);
                  form.resetFields();
                }}
              >
                Hủy
              </Button>
              <Button type="primary" htmlType="submit" loading={loading}>
                {editingPost ? 'Cập nhật' : 'Tạo mới'}
              </Button>
            </Space>
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
};

export default BlogManagement;
