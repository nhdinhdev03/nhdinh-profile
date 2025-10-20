import {
  DeleteOutlined,
  EditOutlined,
  EyeOutlined,
  FileTextOutlined,
  PlusOutlined,
  ReloadOutlined,
  SearchOutlined,
  TagsOutlined,
} from "@ant-design/icons";
import {
  Button,
  Card,
  Col,
  Form,
  Image,
  Input,
  Modal,
  Popconfirm,
  Row,
  Select,
  Space,
  Switch,
  Table,
  Tag,
  Tooltip,
  Typography,
  message,
} from "antd";
import { useEffect, useState } from "react";
import "./BlogManagement.scss";

const { Title, Text } = Typography;
const { Option } = Select;
const { TextArea } = Input;

const BlogManagement = () => {
  const [posts, setPosts] = useState([]);
  const [tags, setTags] = useState([]);
  const [loading, setLoading] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);
  const [editingPost, setEditingPost] = useState(null);
  const [searchText, setSearchText] = useState("");
  const [filterStatus, setFilterStatus] = useState("all");
  const [form] = Form.useForm();

  const statusOptions = [
    { value: "draft", label: "Nháp", color: "default" },
    { value: "published", label: "Đã xuất bản", color: "success" },
    { value: "archived", label: "Lưu trữ", color: "warning" },
  ];

  useEffect(() => {
    fetchPosts();
    fetchTags();
  }, []);

  const fetchPosts = async () => {
    setLoading(true);
    setTimeout(() => {
      setPosts([
        {
          postId: "1",
          title: "Getting Started with React",
          slug: "getting-started-with-react",
          excerpt:
            "Learn the basics of React and start building modern web applications.",
          thumbnailUrl: "https://via.placeholder.com/150",
          status: "published",
          viewCount: 1250,
          isPublic: true,
          publishedAt: "2024-01-15",
          tags: ["React", "JavaScript", "Web Development"],
          translations: 2,
        },
        {
          postId: "2",
          title: "Advanced TypeScript Patterns",
          slug: "advanced-typescript-patterns",
          excerpt:
            "Deep dive into advanced TypeScript patterns and best practices.",
          thumbnailUrl: "https://via.placeholder.com/150",
          status: "draft",
          viewCount: 0,
          isPublic: false,
          publishedAt: null,
          tags: ["TypeScript", "Programming"],
          translations: 1,
        },
      ]);
      setLoading(false);
    }, 800);
  };

  const fetchTags = async () => {
    setTags([
      { tagId: "1", name: "React" },
      { tagId: "2", name: "JavaScript" },
      { tagId: "3", name: "TypeScript" },
      { tagId: "4", name: "Web Development" },
      { tagId: "5", name: "Programming" },
    ]);
  };

  const showModal = (post = null) => {
    setEditingPost(post);
    setModalVisible(true);
    if (post) {
      form.setFieldsValue(post);
    } else {
      form.resetFields();
      form.setFieldsValue({
        status: "draft",
        isPublic: true,
      });
    }
  };

  const handleCancel = () => {
    setModalVisible(false);
    setEditingPost(null);
    form.resetFields();
  };

  const handleSubmit = async (values) => {
    try {
      if (editingPost) {
        message.success("Cập nhật bài viết thành công!");
      } else {
        message.success("Tạo bài viết mới thành công!");
      }
      setModalVisible(false);
      fetchPosts();
    } catch (error) {
      message.error("Thao tác thất bại!");
    }
  };

  const handleDelete = async (postId) => {
    try {
      message.success("Xóa bài viết thành công!");
      fetchPosts();
    } catch (error) {
      message.error("Xóa thất bại!");
    }
  };

  const getStatusColor = (status) => {
    const option = statusOptions.find((opt) => opt.value === status);
    return option ? option.color : "default";
  };

  const getStatusLabel = (status) => {
    const option = statusOptions.find((opt) => opt.value === status);
    return option ? option.label : status;
  };

  const filteredPosts = posts.filter((post) => {
    const matchSearch = post.title
      ?.toLowerCase()
      .includes(searchText.toLowerCase());
    const matchStatus = filterStatus === "all" || post.status === filterStatus;
    return matchSearch && matchStatus;
  });

  const columns = [
    {
      title: "Hình ảnh",
      dataIndex: "thumbnailUrl",
      key: "thumbnailUrl",
      width: 80,
      render: (url) =>
        url ? (
          <Image
            src={url}
            width={50}
            height={50}
            style={{ objectFit: "cover", borderRadius: 6 }}
          />
        ) : (
          "No image"
        ),
    },
    {
      title: "Tiêu đề",
      dataIndex: "title",
      key: "title",
      width: 250,
      render: (text, record) => (
        <Space direction="vertical" size={4}>
          <Text strong>{text}</Text>
          <Text type="secondary" style={{ fontSize: 12 }}>
            /{record.slug}
          </Text>
        </Space>
      ),
    },
    {
      title: "Mô tả",
      dataIndex: "excerpt",
      key: "excerpt",
      ellipsis: true,
    },
    {
      title: "Trạng thái",
      dataIndex: "status",
      key: "status",
      width: 120,
      render: (status) => (
        <Tag color={getStatusColor(status)}>{getStatusLabel(status)}</Tag>
      ),
    },
    {
      title: "Tags",
      dataIndex: "tags",
      key: "tags",
      width: 200,
      render: (tags) => (
        <Space size={4} wrap>
          {tags?.map((tag, idx) => (
            <Tag key={idx} icon={<TagsOutlined />}>
              {tag}
            </Tag>
          ))}
        </Space>
      ),
    },
    {
      title: "Lượt xem",
      dataIndex: "viewCount",
      key: "viewCount",
      width: 100,
      render: (count) => (
        <Tag color="blue" icon={<EyeOutlined />}>
          {count}
        </Tag>
      ),
    },
    {
      title: "Công khai",
      dataIndex: "isPublic",
      key: "isPublic",
      width: 100,
      render: (isPublic) => <Switch checked={isPublic} disabled size="small" />,
    },
    {
      title: "Ngày xuất bản",
      dataIndex: "publishedAt",
      key: "publishedAt",
      width: 120,
      render: (date) =>
        date ? new Date(date).toLocaleDateString("vi-VN") : "-",
    },
    {
      title: "Thao tác",
      key: "actions",
      width: 180,
      fixed: "right",
      render: (_, record) => (
        <Space>
          <Tooltip title="Chỉnh sửa">
            <Button
              type="primary"
              size="small"
              icon={<EditOutlined />}
              onClick={() => showModal(record)}
            />
          </Tooltip>
          <Popconfirm
            title="Bạn có chắc muốn xóa bài viết này?"
            onConfirm={() => handleDelete(record.postId)}
            okText="Xóa"
            cancelText="Hủy"
          >
            <Tooltip title="Xóa">
              <Button
                type="primary"
                danger
                size="small"
                icon={<DeleteOutlined />}
              />
            </Tooltip>
          </Popconfirm>
        </Space>
      ),
    },
  ];

  return (
    <div className="blog-management-container">
      <Card bordered={false} className="header-card">
        <Row justify="space-between" align="middle" gutter={[16, 16]}>
          <Col>
            <Space direction="vertical" size={4}>
              <Title level={3} style={{ margin: 0 }}>
                <FileTextOutlined /> Quản lý Blog
              </Title>
              <Text type="secondary">
                {posts.length} bài viết • {filteredPosts.length} đang hiển thị
              </Text>
            </Space>
          </Col>
          <Col>
            <Space>
              <Tooltip title="Làm mới">
                <Button icon={<ReloadOutlined />} onClick={fetchPosts} />
              </Tooltip>
              <Button
                type="primary"
                icon={<PlusOutlined />}
                onClick={() => showModal()}
                size="large"
              >
                Viết bài mới
              </Button>
            </Space>
          </Col>
        </Row>

        <Row gutter={[16, 16]} style={{ marginTop: 20 }}>
          <Col xs={24} sm={16} md={18}>
            <Input
              placeholder="Tìm kiếm bài viết..."
              prefix={<SearchOutlined />}
              value={searchText}
              onChange={(e) => setSearchText(e.target.value)}
              allowClear
              size="large"
            />
          </Col>
          <Col xs={24} sm={8} md={6}>
            <Select
              style={{ width: "100%" }}
              placeholder="Trạng thái"
              value={filterStatus}
              onChange={setFilterStatus}
              size="large"
            >
              <Option value="all">Tất cả trạng thái</Option>
              {statusOptions.map((opt) => (
                <Option key={opt.value} value={opt.value}>
                  {opt.label}
                </Option>
              ))}
            </Select>
          </Col>
        </Row>
      </Card>

      <Card bordered={false} style={{ marginTop: 20 }}>
        <Table
          columns={columns}
          dataSource={filteredPosts}
          loading={loading}
          rowKey="postId"
          pagination={{
            pageSize: 10,
            showSizeChanger: true,
            showQuickJumper: true,
            showTotal: (total) => `Tổng ${total} bài viết`,
          }}
          scroll={{ x: 1400 }}
          className="modern-table"
        />
      </Card>

      <Modal
        title={
          <Space>
            <FileTextOutlined />
            {editingPost ? "Chỉnh sửa bài viết" : "Tạo bài viết mới"}
          </Space>
        }
        open={modalVisible}
        onCancel={handleCancel}
        footer={null}
        width={900}
        className="blog-modal"
      >
        <Form form={form} layout="vertical" onFinish={handleSubmit}>
          <Row gutter={16}>
            <Col span={24}>
              <Form.Item
                name="title"
                label="Tiêu đề bài viết"
                rules={[{ required: true, message: "Vui lòng nhập tiêu đề!" }]}
              >
                <Input placeholder="Nhập tiêu đề bài viết" size="large" />
              </Form.Item>
            </Col>

            <Col span={24}>
              <Form.Item
                name="slug"
                label="Đường dẫn (Slug)"
                rules={[{ required: true, message: "Vui lòng nhập slug!" }]}
              >
                <Input placeholder="duong-dan-url-bai-viet" addonBefore="/" />
              </Form.Item>
            </Col>

            <Col span={24}>
              <Form.Item
                name="excerpt"
                label="Mô tả ngắn"
                rules={[{ required: true, message: "Vui lòng nhập mô tả!" }]}
              >
                <TextArea rows={3} placeholder="Mô tả ngắn về bài viết..." />
              </Form.Item>
            </Col>

            <Col span={12}>
              <Form.Item
                name="status"
                label="Trạng thái"
                rules={[{ required: true }]}
              >
                <Select placeholder="Chọn trạng thái">
                  {statusOptions.map((opt) => (
                    <Option key={opt.value} value={opt.value}>
                      {opt.label}
                    </Option>
                  ))}
                </Select>
              </Form.Item>
            </Col>

            <Col span={12}>
              <Form.Item name="tags" label="Tags">
                <Select
                  mode="tags"
                  placeholder="Chọn hoặc thêm tags"
                  style={{ width: "100%" }}
                >
                  {tags.map((tag) => (
                    <Option key={tag.tagId} value={tag.name}>
                      {tag.name}
                    </Option>
                  ))}
                </Select>
              </Form.Item>
            </Col>

            <Col span={12}>
              <Form.Item
                name="isPublic"
                label="Công khai"
                valuePropName="checked"
              >
                <Switch />
              </Form.Item>
            </Col>

            <Col span={12}>
              <Form.Item name="publishedAt" label="Ngày xuất bản">
                <Input type="date" />
              </Form.Item>
            </Col>
          </Row>

          <div
            style={{
              textAlign: "right",
              marginTop: 24,
              paddingTop: 24,
              borderTop: "1px solid #f0f0f0",
            }}
          >
            <Space>
              <Button onClick={handleCancel} size="large">
                Hủy
              </Button>
              <Button type="primary" htmlType="submit" size="large">
                {editingPost ? "Cập nhật" : "Tạo mới"}
              </Button>
            </Space>
          </div>
        </Form>
      </Modal>
    </div>
  );
};

export default BlogManagement;
