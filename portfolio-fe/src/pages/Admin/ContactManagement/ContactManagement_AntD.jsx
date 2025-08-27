import React, { useState, useEffect } from "react";
import {
  Table,
  Card,
  Button,
  Input,
  Radio,
  Modal,
  Tag,
  Space,
  Typography,
  Row,
  Col,
  Statistic,
  Divider,
  Tooltip,
  message,
  Popconfirm,
  Empty,
  Spin,
} from "antd";
import {
  MailOutlined,
  UserOutlined,
  CalendarOutlined,
  EyeOutlined,
  DeleteOutlined,
  CheckOutlined,
  ClockCircleOutlined,
  MessageOutlined,
  SendOutlined,
  SearchOutlined,
  ReloadOutlined,
} from "@ant-design/icons";
import contactMessageApi from "api/admin/contact/ContactMessageApi";
import { showNotification } from "components";
import { formatDate } from "utils/dateUtils";
import "./contact-management.scss";

const { Search } = Input;
const { Text, Title, Paragraph } = Typography;
const { TextArea } = Input;

// Modal Component chi tiết liên hệ sử dụng Ant Design
const ContactMessagesManagement = ({
  contact,
  isOpen,
  onClose,
  replyMode,
  setReplyMode,
  replyMessage,
  setReplyMessage,
  sendingReply,
  onSendReply,
  onMarkAsReplied,
  onMarkAsUnreplied,
  onDeleteContact,
  getDisplayName,
  getStatusBadge,
  formatDate,
}) => {
  if (!contact) return null;

  return (
    <Modal
      title={
        <Space>
          <MailOutlined style={{ color: '#1890ff' }} />
          <span>Chi tiết tin nhắn</span>
          <Text type="secondary" style={{ fontSize: '12px' }}>
            ID: #{contact.messageId?.substring(0, 8) || "N/A"}
          </Text>
        </Space>
      }
      open={isOpen}
      onCancel={onClose}
      width={1200}
      footer={null}
      style={{ top: 20 }}
      bodyStyle={{ maxHeight: '70vh', overflowY: 'auto' }}
    >
      <Row gutter={[24, 24]}>
        {/* Left Column - Contact Info */}
        <Col xs={24} xl={12}>
          <Space direction="vertical" size="large" style={{ width: '100%' }}>
            {/* Thông tin liên hệ */}
            <Card 
              title={
                <Space>
                  <UserOutlined />
                  <span>Thông tin liên hệ</span>
                </Space>
              }
              size="small"
            >
              <Space direction="vertical" size="middle" style={{ width: '100%' }}>
                <div>
                  <Space>
                    <UserOutlined style={{ color: '#8c8c8c' }} />
                    <Text strong>{getDisplayName(contact)}</Text>
                  </Space>
                </div>
                <div>
                  <Space>
                    <MailOutlined style={{ color: '#8c8c8c' }} />
                    <Text copyable>{contact.email}</Text>
                  </Space>
                </div>
                <div>
                  <Space>
                    <CalendarOutlined style={{ color: '#8c8c8c' }} />
                    <Text>{formatDate(contact.createdAt)}</Text>
                  </Space>
                </div>
              </Space>
            </Card>

            {/* Trạng thái */}
            <Card title="Trạng thái" size="small">
              {getStatusBadge(contact.isReplied)}
            </Card>

            {/* Chủ đề */}
            <Card title="Chủ đề" size="small">
              <Text strong>{contact.subject || "Không có chủ đề"}</Text>
            </Card>

            {/* Thống kê tin nhắn */}
            <Card title="Thống kê" size="small">
              <Row gutter={16}>
                <Col span={8}>
                  <Statistic
                    title="Ký tự"
                    value={(contact.content || contact.message || "").length}
                    valueStyle={{ color: '#1890ff', fontSize: '18px' }}
                  />
                </Col>
                <Col span={8}>
                  <Statistic
                    title="Từ"
                    value={(contact.content || contact.message || "").split(" ").length}
                    valueStyle={{ color: '#52c41a', fontSize: '18px' }}
                  />
                </Col>
                <Col span={8}>
                  <Statistic
                    title="Dòng"
                    value={(contact.content || contact.message || "").split("\n").length}
                    valueStyle={{ color: '#722ed1', fontSize: '18px' }}
                  />
                </Col>
              </Row>
              <Divider />
              <Text code style={{ fontSize: '11px' }}>
                ID: #{contact.messageId?.substring(0, 8) || "N/A"}
              </Text>
            </Card>
          </Space>
        </Col>

        {/* Right Column - Message Content */}
        <Col xs={24} xl={12}>
          <Space direction="vertical" size="large" style={{ width: '100%' }}>
            {/* Nội dung tin nhắn */}
            <Card title="Nội dung tin nhắn" size="small">
              <div style={{ maxHeight: '200px', overflowY: 'auto' }}>
                <Paragraph style={{ whiteSpace: 'pre-wrap', wordBreak: 'break-word' }}>
                  {contact.content || contact.message || "Không có nội dung"}
                </Paragraph>
              </div>
            </Card>

            {/* Reply Section */}
            {replyMode ? (
              <Card 
                title={
                  <Space>
                    <MessageOutlined style={{ color: '#1890ff' }} />
                    <span>Trả lời tin nhắn</span>
                  </Space>
                }
                size="small"
              >
                <Space direction="vertical" size="middle" style={{ width: '100%' }}>
                  <TextArea
                    value={replyMessage}
                    onChange={(e) => setReplyMessage(e.target.value)}
                    placeholder="Nhập nội dung trả lời..."
                    rows={6}
                    showCount
                  />
                  <Space>
                    <Button
                      type="primary"
                      icon={<SendOutlined />}
                      onClick={onSendReply}
                      loading={sendingReply}
                    >
                      {sendingReply ? "Đang gửi..." : "Gửi trả lời"}
                    </Button>
                    <Button
                      onClick={() => {
                        setReplyMode(false);
                        setReplyMessage("");
                      }}
                    >
                      Hủy
                    </Button>
                  </Space>
                </Space>
              </Card>
            ) : (
              <Card title="Thao tác" size="small">
                <Space direction="vertical" size="middle" style={{ width: '100%' }}>
                  <Button
                    type="primary"
                    icon={<MessageOutlined />}
                    onClick={() => setReplyMode(true)}
                    block
                  >
                    Trả lời tin nhắn
                  </Button>

                  {contact.isReplied ? (
                    <Button
                      icon={<ClockCircleOutlined />}
                      onClick={() => onMarkAsUnreplied(contact.messageId)}
                      block
                      style={{ color: '#faad14', borderColor: '#faad14' }}
                    >
                      Đánh dấu chưa trả lời
                    </Button>
                  ) : (
                    <Button
                      icon={<CheckOutlined />}
                      onClick={() => onMarkAsReplied(contact.messageId)}
                      block
                      style={{ color: '#52c41a', borderColor: '#52c41a' }}
                    >
                      Đánh dấu đã trả lời
                    </Button>
                  )}

                  <Popconfirm
                    title="Xóa tin nhắn"
                    description="Bạn có chắc chắn muốn xóa tin nhắn này?"
                    onConfirm={() => {
                      onDeleteContact(contact.messageId);
                      onClose();
                    }}
                    okText="Có"
                    cancelText="Không"
                  >
                    <Button
                      danger
                      icon={<DeleteOutlined />}
                      block
                    >
                      Xóa tin nhắn
                    </Button>
                  </Popconfirm>
                </Space>
              </Card>
            )}
          </Space>
        </Col>
      </Row>
    </Modal>
  );
};

const ContactManagement = () => {
  // States
  const [contacts, setContacts] = useState([]);
  const [selectedContact, setSelectedContact] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [loading, setLoading] = useState(true);
  const [replyMode, setReplyMode] = useState(false);
  const [replyMessage, setReplyMessage] = useState("");
  const [sendingReply, setSendingReply] = useState(false);
  const [showDetailModal, setShowDetailModal] = useState(false);

  // Fetch contacts from API
  useEffect(() => {
    fetchContacts();
  }, []);

  const fetchContacts = async () => {
    try {
      setLoading(true);
      const response = await contactMessageApi.getAllContactMessages();
      if (response.success) {
        setContacts(response.data || []);
      } else {
        showNotification("error", "Lỗi", "Không thể tải danh sách liên hệ");
      }
    } catch (error) {
      console.error("Error fetching contacts:", error);
      showNotification("error", "Lỗi", "Không thể tải danh sách liên hệ");
    } finally {
      setLoading(false);
    }
  };

  // Mark message as replied
  const handleMarkAsReplied = async (id) => {
    try {
      const response = await contactMessageApi.markAsReplied(id);
      if (response.success) {
        setContacts(contacts.map(c => 
          c.messageId === id ? { ...c, isReplied: true } : c
        ));
        message.success("Đã đánh dấu tin nhắn là đã trả lời");
      } else {
        message.error("Không thể cập nhật trạng thái tin nhắn");
      }
    } catch (error) {
      console.error("Error marking as replied:", error);
      message.error("Không thể cập nhật trạng thái tin nhắn");
    }
  };

  // Mark message as unreplied
  const handleMarkAsUnreplied = async (id) => {
    try {
      const response = await contactMessageApi.markAsUnreplied(id);
      if (response.success) {
        setContacts(contacts.map(c => 
          c.messageId === id ? { ...c, isReplied: false } : c
        ));
        message.success("Đã đánh dấu tin nhắn là chưa trả lời");
      } else {
        message.error("Không thể cập nhật trạng thái tin nhắn");
      }
    } catch (error) {
      console.error("Error marking as unreplied:", error);
      message.error("Không thể cập nhật trạng thái tin nhắn");
    }
  };

  // Delete contact message
  const handleDeleteContact = async (id) => {
    try {
      const response = await contactMessageApi.deleteContactMessage(id);
      if (response.success) {
        setContacts(contacts.filter(c => c.messageId !== id));
        message.success("Đã xóa tin nhắn thành công");
      } else {
        message.error("Không thể xóa tin nhắn");
      }
    } catch (error) {
      console.error("Error deleting contact:", error);
      message.error("Không thể xóa tin nhắn");
    }
  };

  // Send reply email
  const handleSendReply = async () => {
    if (!replyMessage.trim()) {
      message.warning("Vui lòng nhập nội dung trả lời");
      return;
    }

    try {
      setSendingReply(true);
      const response = await contactMessageApi.replyToContact(
        selectedContact.messageId, 
        replyMessage
      );
      if (response.success) {
        message.success("Đã gửi email trả lời thành công");
        setReplyMode(false);
        setReplyMessage("");
        handleMarkAsReplied(selectedContact.messageId);
      } else {
        message.error("Không thể gửi email trả lời");
      }
    } catch (error) {
      console.error("Error sending reply:", error);
      message.error("Không thể gửi email trả lời");
    } finally {
      setSendingReply(false);
    }
  };

  // Open contact detail modal
  const handleViewContact = (contact) => {
    setSelectedContact(contact);
    setShowDetailModal(true);
    setReplyMode(false);
    setReplyMessage("");
  };

  // Close modal
  const handleCloseModal = () => {
    setShowDetailModal(false);
    setSelectedContact(null);
    setReplyMode(false);
    setReplyMessage("");
  };

  // Helper function to get display name
  const getDisplayName = (contact) => {
    if (contact.fullName?.trim()) {
      return contact.fullName;
    }
    if (contact.name?.trim()) {
      return contact.name;
    }
    // Fallback: tạo tên từ email
    if (contact.email) {
      return contact.email.split('@')[0];
    }
    return "Người dùng ẩn danh";
  };

  // Filter contacts
  const filteredContacts = contacts.filter((contact) => {
    const searchLower = searchTerm.toLowerCase();
    const matchesSearch =
      getDisplayName(contact).toLowerCase().includes(searchLower) ||
      contact.email?.toLowerCase().includes(searchLower) ||
      contact.subject?.toLowerCase().includes(searchLower) ||
      contact.content?.toLowerCase().includes(searchLower);

    let matchesStatus = true;
    if (statusFilter === "replied") {
      matchesStatus = contact.isReplied === true;
    } else if (statusFilter === "unreplied") {
      matchesStatus = contact.isReplied === false;
    }

    return matchesSearch && matchesStatus;
  });

  // Get status badge
  const getStatusBadge = (isReplied) => {
    if (isReplied) {
      return (
        <Tag color="success" icon={<CheckOutlined />}>
          Đã trả lời
        </Tag>
      );
    } else {
      return (
        <Tag color="warning" icon={<ClockCircleOutlined />}>
          Chưa trả lời
        </Tag>
      );
    }
  };

  // Table columns
  const columns = [
    {
      title: 'Thông tin liên hệ',
      key: 'contact',
      width: '25%',
      render: (_, contact) => (
        <Space direction="vertical" size="small">
          <Space>
            <UserOutlined style={{ color: '#8c8c8c' }} />
            <Text strong>{getDisplayName(contact)}</Text>
          </Space>
          <Space>
            <MailOutlined style={{ color: '#8c8c8c' }} />
            <Text type="secondary" style={{ fontSize: '12px' }}>
              {contact.email}
            </Text>
          </Space>
          <Space>
            <CalendarOutlined style={{ color: '#8c8c8c' }} />
            <Text type="secondary" style={{ fontSize: '11px' }}>
              {formatDate(contact.createdAt)}
            </Text>
          </Space>
        </Space>
      ),
    },
    {
      title: 'Chủ đề & Nội dung',
      key: 'content',
      width: '35%',
      render: (_, contact) => {
        const content = contact.content || contact.message || "";
        const subject = contact.subject || "Không có chủ đề";
        const maxChars = 80;
        const firstLine = content.split("\n")[0] || "";
        const truncatedContent =
          firstLine.length > maxChars
            ? firstLine.substring(0, maxChars) + "..."
            : firstLine;

        return (
          <Space direction="vertical" size="small" style={{ width: '100%' }}>
            <Text strong style={{ fontSize: '13px' }} ellipsis={{ tooltip: subject }}>
              {subject}
            </Text>
            <Paragraph 
              style={{ margin: 0, fontSize: '12px' }}
              ellipsis={{ rows: 2, tooltip: content }}
            >
              {truncatedContent || "Không có nội dung"}
            </Paragraph>
            <Text type="secondary" style={{ fontSize: '10px' }}>
              {content.length} ký tự
            </Text>
          </Space>
        );
      },
    },
    {
      title: 'Trạng thái',
      key: 'status',
      width: '15%',
      align: 'center',
      render: (_, contact) => getStatusBadge(contact.isReplied),
    },
    {
      title: 'Thao tác',
      key: 'actions',
      width: '25%',
      align: 'center',
      render: (_, contact) => (
        <Space size="small">
          <Tooltip title="Xem chi tiết">
            <Button
              type="primary"
              ghost
              size="small"
              icon={<EyeOutlined />}
              onClick={() => handleViewContact(contact)}
            />
          </Tooltip>
          {!contact.isReplied ? (
            <Tooltip title="Đánh dấu đã trả lời">
              <Button
                size="small"
                icon={<CheckOutlined />}
                onClick={() => handleMarkAsReplied(contact.messageId)}
                style={{ color: '#52c41a', borderColor: '#52c41a' }}
              />
            </Tooltip>
          ) : (
            <Tooltip title="Đánh dấu chưa trả lời">
              <Button
                size="small"
                icon={<ClockCircleOutlined />}
                onClick={() => handleMarkAsUnreplied(contact.messageId)}
                style={{ color: '#faad14', borderColor: '#faad14' }}
              />
            </Tooltip>
          )}
          <Popconfirm
            title="Xóa tin nhắn"
            description="Bạn có chắc chắn muốn xóa tin nhắn này?"
            onConfirm={() => handleDeleteContact(contact.messageId)}
            okText="Có"
            cancelText="Không"
          >
            <Tooltip title="Xóa tin nhắn">
              <Button
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

  // Statistics
  const stats = {
    total: contacts.length,
    replied: contacts.filter((c) => c.isReplied === true).length,
    unreplied: contacts.filter((c) => c.isReplied === false).length,
    today: contacts.filter((c) => {
      const today = new Date().toDateString();
      const contactDate = new Date(c.createdAt).toDateString();
      return contactDate === today;
    }).length,
  };

  if (loading) {
    return (
      <div style={{ textAlign: 'center', padding: '50px' }}>
        <Spin size="large" />
        <div style={{ marginTop: '20px' }}>Đang tải...</div>
      </div>
    );
  }

  return (
    <div style={{ padding: '24px' }}>
      {/* Page Header */}
      <div style={{ marginBottom: '24px' }}>
        <Space align="center" style={{ marginBottom: '8px' }}>
          <MailOutlined style={{ fontSize: '24px', color: '#1890ff' }} />
          <Title level={2} style={{ margin: 0 }}>Quản lý Liên hệ</Title>
        </Space>
        <Text type="secondary">Quản lý tin nhắn và phản hồi từ khách hàng</Text>
      </div>

      {/* Statistics Cards */}
      <Row gutter={[16, 16]} style={{ marginBottom: '24px' }}>
        <Col xs={12} sm={6}>
          <Card>
            <Statistic
              title="Tổng số"
              value={stats.total}
              valueStyle={{ color: '#1890ff' }}
            />
          </Card>
        </Col>
        <Col xs={12} sm={6}>
          <Card>
            <Statistic
              title="Chưa trả lời"
              value={stats.unreplied}
              valueStyle={{ color: '#faad14' }}
              prefix={<ClockCircleOutlined />}
            />
          </Card>
        </Col>
        <Col xs={12} sm={6}>
          <Card>
            <Statistic
              title="Đã trả lời"
              value={stats.replied}
              valueStyle={{ color: '#52c41a' }}
              prefix={<CheckOutlined />}
            />
          </Card>
        </Col>
        <Col xs={12} sm={6}>
          <Card>
            <Statistic
              title="Hôm nay"
              value={stats.today}
              valueStyle={{ color: '#722ed1' }}
              prefix={<CalendarOutlined />}
            />
          </Card>
        </Col>
      </Row>

      {/* Filters */}
      <Card title="Bộ lọc" style={{ marginBottom: '24px' }}>
        <Space direction="vertical" size="middle" style={{ width: '100%' }}>
          <Row gutter={[16, 16]} align="middle">
            <Col xs={24} md={12}>
              <Search
                placeholder="Tìm kiếm theo tên, email, chủ đề, nội dung..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                allowClear
                enterButton={<SearchOutlined />}
              />
            </Col>
            <Col xs={24} md={12}>
              <Space>
                <Text>Trạng thái:</Text>
                <Radio.Group
                  value={statusFilter}
                  onChange={(e) => setStatusFilter(e.target.value)}
                  buttonStyle="solid"
                >
                  <Radio.Button value="all">
                    Tất cả ({stats.total})
                  </Radio.Button>
                  <Radio.Button value="unreplied">
                    Chưa TL ({stats.unreplied})
                  </Radio.Button>
                  <Radio.Button value="replied">
                    Đã TL ({stats.replied})
                  </Radio.Button>
                </Radio.Group>
              </Space>
            </Col>
          </Row>
          
          <Row justify="space-between" align="middle">
            <Col>
              <Space size="large">
                <Text type="secondary">
                  Kết quả: <strong>{filteredContacts.length}</strong>
                  {filteredContacts.length !== contacts.length && (
                    <span style={{ color: '#8c8c8c' }}> / {contacts.length}</span>
                  )}
                </Text>
                <Space>
                  <Tag color="warning">Chưa TL: {stats.unreplied}</Tag>
                  <Tag color="success">Đã TL: {stats.replied}</Tag>
                  <Tag color="purple">Hôm nay: {stats.today}</Tag>
                </Space>
              </Space>
            </Col>
            <Col>
              {(searchTerm || statusFilter !== "all") && (
                <Button
                  icon={<ReloadOutlined />}
                  onClick={() => {
                    setSearchTerm("");
                    setStatusFilter("all");
                  }}
                >
                  Đặt lại bộ lọc
                </Button>
              )}
            </Col>
          </Row>
        </Space>
      </Card>

      {/* Contacts Table */}
      <Card title={`Danh sách liên hệ (${filteredContacts.length})`}>
        <Table
          columns={columns}
          dataSource={filteredContacts}
          rowKey="messageId"
          pagination={{
            pageSize: 10,
            showSizeChanger: true,
            showQuickJumper: true,
            showTotal: (total, range) => 
              `${range[0]}-${range[1]} của ${total} tin nhắn`,
          }}
          locale={{
            emptyText: (
              <Empty
                description="Không có tin nhắn liên hệ nào"
                image={Empty.PRESENTED_IMAGE_SIMPLE}
              />
            ),
          }}
          scroll={{ x: 800 }}
          size="middle"
        />
      </Card>

      {/* Contact Detail Modal */}
      {showDetailModal && selectedContact && (
        <ContactMessagesManagement
          contact={selectedContact}
          isOpen={showDetailModal}
          onClose={handleCloseModal}
          replyMode={replyMode}
          setReplyMode={setReplyMode}
          replyMessage={replyMessage}
          setReplyMessage={setReplyMessage}
          sendingReply={sendingReply}
          onSendReply={handleSendReply}
          onMarkAsReplied={handleMarkAsReplied}
          onMarkAsUnreplied={handleMarkAsUnreplied}
          onDeleteContact={handleDeleteContact}
          getDisplayName={getDisplayName}
          getStatusBadge={getStatusBadge}
          formatDate={formatDate}
        />
      )}
    </div>
  );
};

export default ContactManagement;
