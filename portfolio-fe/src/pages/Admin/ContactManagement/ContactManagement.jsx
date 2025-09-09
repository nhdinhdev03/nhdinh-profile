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
  Spin,
  Badge,
  Avatar,
  Dropdown,
  Select,
  Progress,
  Timeline,
  Descriptions,
  Alert,
  Result,
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
  MoreOutlined,
  ExportOutlined,
  FilterOutlined,
  SortAscendingOutlined,
  BellOutlined,
  StarOutlined,
  TagsOutlined,
  HistoryOutlined,
} from "@ant-design/icons";
import { PageHeader } from 'components/Admin';
import contactMessageApi from "api/admin/contact/ContactMessageApi";
import { showNotification } from "components";
import { formatDate } from "utils/dateUtils";
import styles from './ContactManagement.module.css';

const { Search } = Input;
const { Text, Paragraph } = Typography;
const { TextArea } = Input;
const { Option } = Select;

// Modal Component chi tiết liên hệ với UI nâng cấp
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

  const getContactAvatar = () => {
    const name = getDisplayName(contact);
    return (
      <Avatar 
        size={64} 
        style={{ 
          backgroundColor: contact.isReplied ? '#52c41a' : '#faad14',
          fontSize: '24px',
          fontWeight: 'bold'
        }}
      >
        {name.charAt(0).toUpperCase()}
      </Avatar>
    );
  };

  const getPriorityTag = () => {
    const contentLength = (contact.content || contact.message || "").length;
    if (contentLength > 500) {
      return <Tag color="red" icon={<BellOutlined />}>Quan trọng</Tag>;
    } else if (contentLength > 200) {
      return <Tag color="orange" icon={<StarOutlined />}>Trung bình</Tag>;
    }
    return <Tag color="green">Thường</Tag>;
  };

  return (
    <Modal
      title={
        <div style={{ display: 'flex', alignItems: 'center', gap: '16px', padding: '8px 0' }}>
          <div className={styles.avatarContainer}>
            {getContactAvatar()}
          </div>
          <div style={{ flex: 1 }}>
            <Space direction="vertical" size={0}>
              <Space>
                <MailOutlined style={{ color: 'white', fontSize: '16px' }} />
                <Text strong style={{ fontSize: '18px', color: 'white' }}>Chi tiết tin nhắn</Text>
                {getPriorityTag()}
              </Space>
              <Text style={{ fontSize: '12px', color: 'rgba(255,255,255,0.8)' }}>
                ID: #{contact.messageId?.toString().substring(0, 8) || "N/A"} • 
                {formatDate(contact.createdAt)}
              </Text>
            </Space>
          </div>
          <div>
            {getStatusBadge(contact.isReplied)}
          </div>
        </div>
      }
      open={isOpen}
      onCancel={onClose}
      width={1400}
      footer={null}
      style={{ top: 20 }}
      bodyStyle={{ maxHeight: '75vh', overflowY: 'auto', padding: '24px' }}
      className={styles.contactDetailModal}
    >
      <Row gutter={[24, 24]}>
        {/* Left Column - Contact Info & Actions */}
        <Col xs={24} xl={8}>
          <Space direction="vertical" size="large" style={{ width: '100%' }}>
            {/* Contact Card */}
            <Card 
              title={
                <Space>
                  <UserOutlined style={{ color: '#1890ff' }} />
                  <span>Thông tin liên hệ</span>
                </Space>
              }
              size="small"
              style={{ 
                borderRadius: '12px',
                background: 'linear-gradient(135deg, #f0f9ff 0%, #e0f2fe 100%)'
              }}
            >
              <Descriptions column={1} size="small">
                <Descriptions.Item 
                  label={<Space><UserOutlined />Tên</Space>}
                  labelStyle={{ fontWeight: 'bold' }}
                >
                  <Text strong>{getDisplayName(contact)}</Text>
                </Descriptions.Item>
                <Descriptions.Item 
                  label={<Space><MailOutlined />Email</Space>}
                  labelStyle={{ fontWeight: 'bold' }}
                >
                  <Text copyable>{contact.email}</Text>
                </Descriptions.Item>
                <Descriptions.Item 
                  label={<Space><CalendarOutlined />Thời gian</Space>}
                  labelStyle={{ fontWeight: 'bold' }}
                >
                  <Text>{formatDate(contact.createdAt)}</Text>
                </Descriptions.Item>
                <Descriptions.Item 
                  label={<Space><TagsOutlined />Mức độ</Space>}
                  labelStyle={{ fontWeight: 'bold' }}
                >
                  {getPriorityTag()}
                </Descriptions.Item>
              </Descriptions>
            </Card>

            {/* Subject Card */}
            <Card 
              title={<Space><MessageOutlined />Chủ đề</Space>} 
              size="small"
              style={{ borderRadius: '12px' }}
            >
              <Badge.Ribbon 
                text={contact.subject ? "Có chủ đề" : "Không có chủ đề"} 
                color={contact.subject ? "blue" : "gray"}
              >
                <div style={{ padding: '8px 0' }}>
                  <Text strong style={{ fontSize: '14px' }}>
                    {contact.subject || "Không có chủ đề"}
                  </Text>
                </div>
              </Badge.Ribbon>
            </Card>

            {/* Stats Card */}
            <Card 
              title={<Space><HistoryOutlined />Thống kê tin nhắn</Space>} 
              size="small"
              style={{ borderRadius: '12px' }}
            >
              <Row gutter={[8, 16]}>
                <Col span={24}>
                  <Statistic
                    title="Độ dài nội dung"
                    value={(contact.content || contact.message || "").length}
                    suffix="ký tự"
                    valueStyle={{ color: '#1890ff', fontSize: '16px' }}
                  />
                  <Progress 
                    percent={Math.min(((contact.content || contact.message || "").length / 1000) * 100, 100)}
                    strokeColor={{
                      '0%': '#108ee9',
                      '100%': '#87d068',
                    }}
                    size="small"
                  />
                </Col>
                <Col span={12}>
                  <Statistic
                    title="Từ"
                    value={(contact.content || contact.message || "").split(" ").length}
                    valueStyle={{ color: '#52c41a', fontSize: '14px' }}
                  />
                </Col>
                <Col span={12}>
                  <Statistic
                    title="Dòng"
                    value={(contact.content || contact.message || "").split("\n").length}
                    valueStyle={{ color: '#722ed1', fontSize: '14px' }}
                  />
                </Col>
              </Row>
              <Divider style={{ margin: '12px 0' }} />
              <Text code style={{ fontSize: '10px' }}>
                ID: #{contact.messageId?.toString() || "N/A"}
              </Text>
            </Card>

            {/* Quick Actions */}
            <Card 
              title={<Space><MoreOutlined />Thao tác nhanh</Space>} 
              size="small"
              style={{ borderRadius: '12px' }}
            >
              <Space direction="vertical" size="small" style={{ width: '100%' }}>
                <Button
                  type="primary"
                  icon={<MessageOutlined />}
                  onClick={() => setReplyMode(true)}
                  block
                  size="large"
                  style={{ borderRadius: '8px' }}
                >
                  Trả lời tin nhắn
                </Button>

                {contact.isReplied ? (
                  <Button
                    icon={<ClockCircleOutlined />}
                    onClick={() => onMarkAsUnreplied(contact.messageId)}
                    block
                    style={{ 
                      color: '#faad14', 
                      borderColor: '#faad14',
                      borderRadius: '8px'
                    }}
                  >
                    Đánh dấu chưa trả lời
                  </Button>
                ) : (
                  <Button
                    icon={<CheckOutlined />}
                    onClick={() => onMarkAsReplied(contact.messageId)}
                    block
                    style={{ 
                      color: '#52c41a', 
                      borderColor: '#52c41a',
                      borderRadius: '8px'
                    }}
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
                    style={{ borderRadius: '8px' }}
                  >
                    Xóa tin nhắn
                  </Button>
                </Popconfirm>
              </Space>
            </Card>
          </Space>
        </Col>

        {/* Right Column - Message Content & Reply */}
        <Col xs={24} xl={16}>
          <Space direction="vertical" size="large" style={{ width: '100%' }}>
            {/* Message Content */}
            <Card 
              title={
                <Space>
                  <MessageOutlined style={{ color: '#52c41a' }} />
                  <span>Nội dung tin nhắn</span>
                  <Badge 
                    count={(contact.content || contact.message || "").length} 
                    style={{ backgroundColor: '#52c41a' }} 
                  />
                </Space>
              }
              size="small"
              style={{ borderRadius: '12px' }}
              extra={
                <Dropdown
                  menu={{
                    items: [
                      {
                        key: 'copy',
                        label: 'Sao chép nội dung',
                        icon: <ExportOutlined />,
                        onClick: () => {
                          navigator.clipboard.writeText(contact.content || contact.message || "");
                          message.success('Đã sao chép nội dung');
                        }
                      }
                    ]
                  }}
                >
                  <Button type="text" icon={<MoreOutlined />} />
                </Dropdown>
              }
            >
              <div style={{ 
                maxHeight: '300px', 
                overflowY: 'auto',
                padding: '16px',
                background: '#fafafa',
                borderRadius: '8px',
                border: '1px solid #f0f0f0'
              }}>
                <Paragraph 
                  style={{ 
                    whiteSpace: 'pre-wrap', 
                    wordBreak: 'break-word',
                    margin: 0,
                    lineHeight: '1.6'
                  }}
                >
                  {contact.content || contact.message || (
                    <Text type="secondary" italic>Không có nội dung</Text>
                  )}
                </Paragraph>
              </div>
            </Card>

            {/* Reply Section */}
            {replyMode ? (
              <Card 
                title={
                  <Space>
                    <SendOutlined style={{ color: '#1890ff' }} />
                    <span>Soạn thư trả lời</span>
                  </Space>
                }
                size="small"
                style={{ borderRadius: '12px' }}
              >
                <Space direction="vertical" size="middle" style={{ width: '100%' }}>
                  <Alert
                    message="Đang soạn thư trả lời"
                    description={`Trả lời cho: ${getDisplayName(contact)} (${contact.email})`}
                    type="info"
                    showIcon
                    style={{ borderRadius: '8px' }}
                  />
                  
                  <TextArea
                    value={replyMessage}
                    onChange={(e) => setReplyMessage(e.target.value)}
                    placeholder="Nhập nội dung trả lời..."
                    rows={8}
                    showCount
                    maxLength={2000}
                    style={{ borderRadius: '8px' }}
                  />
                  
                  <Space>
                    <Button
                      type="primary"
                      icon={<SendOutlined />}
                      onClick={onSendReply}
                      loading={sendingReply}
                      size="large"
                      style={{ borderRadius: '8px' }}
                    >
                      {sendingReply ? "Đang gửi..." : "Gửi trả lời"}
                    </Button>
                    <Button
                      onClick={() => {
                        setReplyMode(false);
                        setReplyMessage("");
                      }}
                      size="large"
                      style={{ borderRadius: '8px' }}
                    >
                      Hủy
                    </Button>
                  </Space>
                </Space>
              </Card>
            ) : (
              <Card 
                title={<Space><HistoryOutlined />Lịch sử tương tác</Space>} 
                size="small"
                style={{ borderRadius: '12px' }}
              >
                <Timeline
                  items={[
                    {
                      dot: <MailOutlined style={{ color: '#1890ff' }} />,
                      children: (
                        <div>
                          <Text strong>Tin nhắn được gửi</Text>
                          <br />
                          <Text type="secondary">{formatDate(contact.createdAt)}</Text>
                        </div>
                      ),
                    },
                    ...(contact.isReplied ? [{
                      dot: <CheckOutlined style={{ color: '#52c41a' }} />,
                      children: (
                        <div>
                          <Text strong>Đã trả lời</Text>
                          <br />
                          <Text type="secondary">Trạng thái đã được cập nhật</Text>
                        </div>
                      ),
                    }] : [{
                      dot: <ClockCircleOutlined style={{ color: '#faad14' }} />,
                      children: (
                        <div>
                          <Text strong>Chờ phản hồi</Text>
                          <br />
                          <Text type="secondary">Chưa có phản hồi</Text>
                        </div>
                      ),
                    }])
                  ]}
                />
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
      const response = await contactMessageApi.getAll();
      if (response.data) {
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
  const handleMarkAsReplied = async (messageId) => {
    try {
      const response = await contactMessageApi.markAsReplied(messageId);
      if (response.data) {
        setContacts(contacts.map(c => 
          c.messageId === messageId ? { ...c, isReplied: true } : c
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
  const handleMarkAsUnreplied = async (messageId) => {
    try {
      const response = await contactMessageApi.markAsUnreplied(messageId);
      if (response.data) {
        setContacts(contacts.map(c => 
          c.messageId === messageId ? { ...c, isReplied: false } : c
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
  const handleDeleteContact = async (messageId) => {
    try {
      await contactMessageApi.delete(messageId);
      setContacts(contacts.filter(c => c.messageId !== messageId));
      message.success("Đã xóa tin nhắn thành công");
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
      if (response.data) {
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

  // Enhanced table columns
  const columns = [
    {
      title: (
        <Space>
          <UserOutlined />
          <span>Thông tin liên hệ</span>
        </Space>
      ),
      key: 'contact',
      width: '25%',
      render: (_, contact) => {
        const name = getDisplayName(contact);
        return (
          <Space direction="vertical" size="small" style={{ width: '100%' }}>
            <Space>
              <Avatar 
                size={32} 
                style={{ 
                  backgroundColor: contact.isReplied ? '#52c41a' : '#faad14',
                  fontSize: '14px'
                }}
              >
                {name.charAt(0).toUpperCase()}
              </Avatar>
              <div>
                <Text strong style={{ fontSize: '14px' }}>{name}</Text>
                {contact.isReplied && (
                  <Badge 
                    dot 
                    status="success" 
                    style={{ marginLeft: '6px' }}
                  />
                )}
              </div>
            </Space>
            <Space>
              <MailOutlined style={{ color: '#8c8c8c', fontSize: '12px' }} />
              <Text 
                type="secondary" 
                style={{ fontSize: '12px' }}
                copyable={{ text: contact.email, tooltips: ['Sao chép email', 'Đã sao chép!'] }}
              >
                {contact.email}
              </Text>
            </Space>
            <Space>
              <CalendarOutlined style={{ color: '#8c8c8c', fontSize: '11px' }} />
              <Text type="secondary" style={{ fontSize: '11px' }}>
                {formatDate(contact.createdAt)}
              </Text>
            </Space>
          </Space>
        );
      },
    },
    {
      title: (
        <Space>
          <MessageOutlined />
          <span>Chủ đề & Nội dung</span>
        </Space>
      ),
      key: 'content',
      width: '35%',
      render: (_, contact) => {
        const content = contact.content || contact.message || "";
        const subject = contact.subject || "Không có chủ đề";
        const maxChars = 100;
        const firstLine = content.split("\n")[0] || "";
        const truncatedContent =
          firstLine.length > maxChars
            ? firstLine.substring(0, maxChars) + "..."
            : firstLine;

        const getPriorityColor = () => {
          if (content.length > 500) return '#ff4d4f';
          if (content.length > 200) return '#faad14';
          return '#52c41a';
        };

        return (
          <Space direction="vertical" size="small" style={{ width: '100%' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <Text 
                strong 
                style={{ fontSize: '13px', flex: 1 }} 
                ellipsis={{ tooltip: subject }}
              >
                {subject}
              </Text>
              <Badge 
                count={content.length} 
                style={{ 
                  backgroundColor: getPriorityColor(),
                  fontSize: '10px',
                  height: '18px',
                  minWidth: '18px',
                  lineHeight: '18px'
                }} 
              />
            </div>
            <Paragraph 
              style={{ 
                margin: 0, 
                fontSize: '12px',
                background: '#fafafa',
                padding: '8px',
                borderRadius: '6px',
                borderLeft: `3px solid ${getPriorityColor()}`
              }}
              ellipsis={{ 
                rows: 2, 
                tooltip: content,
                expandable: false
              }}
            >
              {truncatedContent || (
                <Text type="secondary" italic>Không có nội dung</Text>
              )}
            </Paragraph>
            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
              <Text type="secondary" style={{ fontSize: '10px' }}>
                {content.split(' ').length} từ • {content.split('\n').length} dòng
              </Text>
              {content.length > 300 && (
                <Tag size="small" color="red">Dài</Tag>
              )}
            </div>
          </Space>
        );
      },
    },
    {
      title: (
        <Space>
          <TagsOutlined />
          <span>Trạng thái</span>
        </Space>
      ),
      key: 'status',
      width: '15%',
      align: 'center',
      render: (_, contact) => (
        <Space direction="vertical" size="small" align="center">
          {getStatusBadge(contact.isReplied)}
          <div style={{ fontSize: '10px', color: '#8c8c8c' }}>
            ID: {contact.messageId?.toString().substring(0, 6)}
          </div>
        </Space>
      ),
    },
    {
      title: (
        <Space>
          <MoreOutlined />
          <span>Thao tác</span>
        </Space>
      ),
      key: 'actions',
      width: '25%',
      align: 'center',
      render: (_, contact) => (
        <Space size="small" wrap>
          <Tooltip title="Xem chi tiết">
            <Button
              type="primary"
              ghost
              size="small"
              icon={<EyeOutlined />}
              onClick={() => handleViewContact(contact)}
              style={{ borderRadius: '6px' }}
            />
          </Tooltip>
          
          <Dropdown
            menu={{
              items: [
                {
                  key: 'reply',
                  label: 'Trả lời nhanh',
                  icon: <MessageOutlined />,
                  onClick: () => {
                    handleViewContact(contact);
                    setTimeout(() => setReplyMode(true), 100);
                  }
                },
                {
                  key: 'mark',
                  label: contact.isReplied ? 'Đánh dấu chưa TL' : 'Đánh dấu đã TL',
                  icon: contact.isReplied ? <ClockCircleOutlined /> : <CheckOutlined />,
                  onClick: () => contact.isReplied 
                    ? handleMarkAsUnreplied(contact.messageId)
                    : handleMarkAsReplied(contact.messageId)
                },
                {
                  type: 'divider'
                },
                {
                  key: 'delete',
                  label: 'Xóa tin nhắn',
                  icon: <DeleteOutlined />,
                  danger: true,
                  onClick: () => {
                    Modal.confirm({
                      title: 'Xóa tin nhắn',
                      content: 'Bạn có chắc chắn muốn xóa tin nhắn này?',
                      onOk: () => handleDeleteContact(contact.messageId),
                    });
                  }
                }
              ]
            }}
            trigger={['click']}
          >
            <Button 
              size="small" 
              icon={<MoreOutlined />}
              style={{ borderRadius: '6px' }}
            />
          </Dropdown>

          {!contact.isReplied ? (
            <Tooltip title="Đánh dấu đã trả lời">
              <Button
                size="small"
                icon={<CheckOutlined />}
                onClick={() => handleMarkAsReplied(contact.messageId)}
                style={{ 
                  color: '#52c41a', 
                  borderColor: '#52c41a',
                  borderRadius: '6px'
                }}
              />
            </Tooltip>
          ) : (
            <Tooltip title="Đánh dấu chưa trả lời">
              <Button
                size="small"
                icon={<ClockCircleOutlined />}
                onClick={() => handleMarkAsUnreplied(contact.messageId)}
                style={{ 
                  color: '#faad14', 
                  borderColor: '#faad14',
                  borderRadius: '6px'
                }}
              />
            </Tooltip>
          )}
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
      <div className={`${styles.loadingContainer} ${styles.fadeInUp}`}>
        <Spin size="large" />
        <div className={styles.loadingText}>Đang tải dữ liệu liên hệ...</div>
      </div>
    );
  }

  return (
    <div className={`${styles.contactManagement} space-y-6`}>
      <PageHeader
        title="Quản lý Liên hệ"
        subtitle="Quản lý tin nhắn và phản hồi từ khách hàng"
        icon={MailOutlined}
      
      />

      {/* Enhanced Statistics Cards */}
      <Row gutter={[16, 16]} style={{ marginBottom: '24px' }}>
        <Col xs={12} sm={6}>
          <Card 
            className={`${styles.statsCard} ${styles.fadeInUp}`}
            style={{ 
              borderRadius: '12px', 
              background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
              border: 'none',
              overflow: 'hidden'
            }}
            bodyStyle={{ padding: '20px' }}
          >
            <Statistic
              title={<span style={{ color: 'white', fontWeight: 500 }}>Tổng số tin nhắn</span>}
              value={stats.total}
              valueStyle={{ color: 'white', fontSize: '28px', fontWeight: 'bold' }}
              prefix={<MailOutlined style={{ color: 'white' }} />}
            />
            <div style={{ 
              position: 'absolute', 
              top: '10px', 
              right: '15px', 
              opacity: 0.3 
            }}>
              <MailOutlined style={{ fontSize: '40px', color: 'white' }} />
            </div>
          </Card>
        </Col>
        <Col xs={12} sm={6}>
          <Card 
            className={`${styles.statsCard} ${styles.fadeInUp}`}
            style={{ 
              borderRadius: '12px', 
              background: 'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)',
              border: 'none',
              overflow: 'hidden'
            }}
            bodyStyle={{ padding: '20px' }}
          >
            <Statistic
              title={<span style={{ color: 'white', fontWeight: 500 }}>Chưa trả lời</span>}
              value={stats.unreplied}
              valueStyle={{ color: 'white', fontSize: '28px', fontWeight: 'bold' }}
              prefix={<ClockCircleOutlined style={{ color: 'white' }} />}
            />
            <div style={{ 
              position: 'absolute', 
              top: '10px', 
              right: '15px', 
              opacity: 0.3 
            }}>
              <ClockCircleOutlined style={{ fontSize: '40px', color: 'white' }} />
            </div>
            <Progress 
              percent={stats.total > 0 ? (stats.unreplied / stats.total) * 100 : 0}
              showInfo={false}
              strokeColor="rgba(255,255,255,0.8)"
              trailColor="rgba(255,255,255,0.2)"
              size="small"
              style={{ marginTop: '8px' }}
            />
          </Card>
        </Col>
        <Col xs={12} sm={6}>
          <Card 
            className={`${styles.statsCard} ${styles.fadeInUp}`}
            style={{ 
              borderRadius: '12px', 
              background: 'linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)',
              border: 'none',
              overflow: 'hidden'
            }}
            bodyStyle={{ padding: '20px' }}
          >
            <Statistic
              title={<span style={{ color: 'white', fontWeight: 500 }}>Đã trả lời</span>}
              value={stats.replied}
              valueStyle={{ color: 'white', fontSize: '28px', fontWeight: 'bold' }}
              prefix={<CheckOutlined style={{ color: 'white' }} />}
            />
            <div style={{ 
              position: 'absolute', 
              top: '10px', 
              right: '15px', 
              opacity: 0.3 
            }}>
              <CheckOutlined style={{ fontSize: '40px', color: 'white' }} />
            </div>
            <Progress 
              percent={stats.total > 0 ? (stats.replied / stats.total) * 100 : 0}
              showInfo={false}
              strokeColor="rgba(255,255,255,0.8)"
              trailColor="rgba(255,255,255,0.2)"
              size="small"
              style={{ marginTop: '8px' }}
            />
          </Card>
        </Col>
        <Col xs={12} sm={6}>
          <Card 
            className={`${styles.statsCard} ${styles.fadeInUp}`}
            style={{ 
              borderRadius: '12px', 
              background: 'linear-gradient(135deg, #fa709a 0%, #fee140 100%)',
              border: 'none',
              overflow: 'hidden'
            }}
            bodyStyle={{ padding: '20px' }}
          >
            <Statistic
              title={<span style={{ color: 'white', fontWeight: 500 }}>Hôm nay</span>}
              value={stats.today}
              valueStyle={{ color: 'white', fontSize: '28px', fontWeight: 'bold' }}
              prefix={<CalendarOutlined style={{ color: 'white' }} />}
            />
            <div style={{ 
              position: 'absolute', 
              top: '10px', 
              right: '15px', 
              opacity: 0.3 
            }}>
              <CalendarOutlined style={{ fontSize: '40px', color: 'white' }} />
            </div>
            <Text style={{ color: 'rgba(255,255,255,0.9)', fontSize: '12px' }}>
              {new Date().toLocaleDateString('vi-VN')}
            </Text>
          </Card>
        </Col>
      </Row>

      {/* Enhanced Filters */}
      <Card 
        title={
          <Space>
            <FilterOutlined style={{ color: '#1890ff' }} />
            <span>Bộ lọc và tìm kiếm</span>
          </Space>
        } 
        className={`${styles.filterCard} ${styles.enhancedCard} ${styles.fadeInUp}`}
        style={{ 
          marginBottom: '24px',
        }}
        extra={
          <Space>
            <Badge count={filteredContacts.length} style={{ backgroundColor: '#52c41a' }}>
              <Button 
                type="text" 
                icon={<SearchOutlined />}
                style={{ color: '#52c41a' }}
              >
                Kết quả
              </Button>
            </Badge>
          </Space>
        }
      >
        <Space direction="vertical" size="middle" style={{ width: '100%' }}>
          <Row gutter={[16, 16]} align="middle">
            <Col xs={24} lg={12}>
              <Space.Compact style={{ width: '100%' }}>
                <Select
                  defaultValue="all"
                  style={{ width: '120px' }}
                  onChange={(value) => {
                    // Logic tìm kiếm theo loại
                    console.log('Search type:', value);
                  }}
                >
                  <Option value="all">Tất cả</Option>
                  <Option value="name">Tên</Option>
                  <Option value="email">Email</Option>
                  <Option value="subject">Chủ đề</Option>
                  <Option value="content">Nội dung</Option>
                </Select>
                <Search
                  placeholder="Tìm kiếm theo tên, email, chủ đề, nội dung..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  allowClear
                  enterButton={
                    <Button type="primary" icon={<SearchOutlined />}>
                      Tìm
                    </Button>
                  }
                  size="large"
                />
              </Space.Compact>
            </Col>
            <Col xs={24} lg={12}>
              <Space wrap>
                <Text strong>Trạng thái:</Text>
                <Radio.Group
                  value={statusFilter}
                  onChange={(e) => setStatusFilter(e.target.value)}
                  buttonStyle="solid"
                  size="large"
                >
                  <Radio.Button value="all">
                    <Space>
                      <MailOutlined />
                      Tất cả ({stats.total})
                    </Space>
                  </Radio.Button>
                  <Radio.Button value="unreplied">
                    <Space>
                      <ClockCircleOutlined />
                      Chưa TL ({stats.unreplied})
                    </Space>
                  </Radio.Button>
                  <Radio.Button value="replied">
                    <Space>
                      <CheckOutlined />
                      Đã TL ({stats.replied})
                    </Space>
                  </Radio.Button>
                </Radio.Group>
              </Space>
            </Col>
          </Row>
          
          <Divider style={{ margin: '12px 0' }} />
          
          <Row justify="space-between" align="middle">
            <Col>
              <Space size="large" wrap>
                <Alert
                  message={
                    <Space>
                      <Text strong>Kết quả tìm kiếm:</Text>
                      <Badge 
                        count={filteredContacts.length} 
                        style={{ backgroundColor: '#1890ff' }} 
                      />
                      {filteredContacts.length !== contacts.length && (
                        <Text type="secondary">/ {contacts.length}</Text>
                      )}
                    </Space>
                  }
                  type="info"
                  showIcon
                  style={{ 
                    border: 'none',
                    background: 'rgba(24, 144, 255, 0.1)'
                  }}
                />
                <Space>
                  <Tag 
                    color="orange" 
                    icon={<ClockCircleOutlined />}
                    style={{ borderRadius: '16px', padding: '4px 12px' }}
                  >
                    Chưa TL: {stats.unreplied}
                  </Tag>
                  <Tag 
                    color="green" 
                    icon={<CheckOutlined />}
                    style={{ borderRadius: '16px', padding: '4px 12px' }}
                  >
                    Đã TL: {stats.replied}
                  </Tag>
                  <Tag 
                    color="purple" 
                    icon={<CalendarOutlined />}
                    style={{ borderRadius: '16px', padding: '4px 12px' }}
                  >
                    Hôm nay: {stats.today}
                  </Tag>
                </Space>
              </Space>
            </Col>
            <Col>
              <Space>
                {(searchTerm || statusFilter !== "all") && (
                  <Button
                    icon={<ReloadOutlined />}
                    onClick={() => {
                      setSearchTerm("");
                      setStatusFilter("all");
                    }}
                    style={{ borderRadius: '8px' }}
                  >
                    Đặt lại bộ lọc
                  </Button>
                )}
                <Dropdown
                  menu={{
                    items: [
                      {
                        key: 'export-all',
                        label: 'Xuất tất cả',
                        icon: <ExportOutlined />,
                      },
                      {
                        key: 'export-filtered',
                        label: 'Xuất kết quả lọc',
                        icon: <FilterOutlined />,
                      }
                    ]
                  }}
                >
                  <Button icon={<ExportOutlined />} style={{ borderRadius: '8px' }}>
                    Xuất dữ liệu
                  </Button>
                </Dropdown>
              </Space>
            </Col>
          </Row>
        </Space>
      </Card>

      {/* Enhanced Contacts Table */}
      <Card 
        title={
          <Space>
            <MailOutlined style={{ color: '#1890ff' }} />
            <span>Danh sách liên hệ</span>
            <Badge 
              count={filteredContacts.length} 
              style={{ backgroundColor: '#52c41a' }} 
            />
          </Space>
        }
        extra={
          <Space>
            <Dropdown
              menu={{
                items: [
                  {
                    key: 'sort-newest',
                    label: 'Mới nhất',
                    icon: <SortAscendingOutlined />,
                  },
                  {
                    key: 'sort-oldest',
                    label: 'Cũ nhất',
                    icon: <SortAscendingOutlined />,
                  },
                  {
                    key: 'sort-replied',
                    label: 'Đã trả lời',
                    icon: <CheckOutlined />,
                  },
                  {
                    key: 'sort-unreplied',
                    label: 'Chưa trả lời',
                    icon: <ClockCircleOutlined />,
                  }
                ]
              }}
            >
              <Button icon={<SortAscendingOutlined />}>
                Sắp xếp
              </Button>
            </Dropdown>
            <Button
              icon={<ReloadOutlined />}
              onClick={fetchContacts}
              loading={loading}
            >
              Làm mới
            </Button>
          </Space>
        }
        className={`${styles.tableCard} ${styles.enhancedCard} ${styles.fadeInUp}`}
      >
        {filteredContacts.length === 0 ? (
          <div style={{ textAlign: 'center', padding: '40px 0' }}>
            <Result
              icon={<MailOutlined style={{ color: '#d9d9d9' }} />}
              title="Không có tin nhắn liên hệ"
              subTitle={
                searchTerm || statusFilter !== 'all'
                  ? "Không tìm thấy tin nhắn phù hợp với bộ lọc hiện tại"
                  : "Chưa có tin nhắn liên hệ nào được gửi đến"
              }
              extra={
                <Space>
                  {(searchTerm || statusFilter !== 'all') && (
                    <Button 
                      type="primary" 
                      onClick={() => {
                        setSearchTerm("");
                        setStatusFilter("all");
                      }}
                    >
                      Xóa bộ lọc
                    </Button>
                  )}
                  <Button onClick={fetchContacts} icon={<ReloadOutlined />}>
                    Làm mới
                  </Button>
                </Space>
              }
            />
          </div>
        ) : (
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
              pageSizeOptions: ['10', '20', '50', '100'],
            }}
            scroll={{ x: 1000 }}
            size="middle"
            rowClassName={(record) => 
              record.isReplied ? styles.repliedRow : styles.unrepliedRow
            }
          />
        )}
      </Card>

      {/* Custom Styles */}
      <style jsx>{`
        .contact-detail-modal .ant-modal-header {
          border-radius: 12px 12px 0 0;
          background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
        }
        
        .contact-detail-modal .ant-modal-title {
          color: white;
        }
        
        .replied-row {
          background-color: var(--replied-bg) !important;
        }
        
        .unreplied-row {
          background-color: var(--unreplied-bg) !important;
        }
        
        .ant-table-tbody > tr:hover.replied-row > td {
          background-color: #f0f9ff !important;
        }
        
        .ant-table-tbody > tr:hover.unreplied-row > td {
          background-color: #fef3cd !important;
        }
        
        .ant-card {
          transition: all 0.3s ease;
        }
        
        .ant-card:hover {
          transform: translateY(-2px);
          box-shadow: 0 6px 16px rgba(0,0,0,0.12);
        }
        
        .ant-btn {
          transition: all 0.3s ease;
        }
        
        .ant-btn:hover {
          transform: translateY(-1px);
        }
      `}</style>

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
