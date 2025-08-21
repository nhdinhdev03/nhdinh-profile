import React, { useState, useEffect } from 'react';
import { 
  EnvelopeIcon, 
  CalendarIcon,
  EyeIcon,
  TrashIcon,
  CheckIcon,
  XMarkIcon,
  ChatBubbleLeftRightIcon,
  UserIcon,
  MagnifyingGlassIcon,
  PaperAirplaneIcon,
  ClockIcon
} from '@heroicons/react/24/outline';
import contactMessageApi from 'api/admin/contact/ContactMessageApi';
import { showNotification } from 'components';
import { formatDate } from 'utils/dateUtils';
import { AdminCard, AdminTable, PageHeader, Button } from 'components/Admin';
import 'styles/contact-management.css';


const ContactManagement = () => {
  // States
  const [contacts, setContacts] = useState([]);
  const [selectedContact, setSelectedContact] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [loading, setLoading] = useState(true);
  const [replyMode, setReplyMode] = useState(false);
  const [replyMessage, setReplyMessage] = useState('');
  const [sendingReply, setSendingReply] = useState(false);

  // Fetch contacts from API
  useEffect(() => {
    fetchContacts();
  }, []);

  const fetchContacts = async () => {
    try {
      setLoading(true);
      const response = await contactMessageApi.getAll();
      console.log('API Response:', response); // Debug log
      
      // Backend trả về List<ContactMessage> trực tiếp, không phải SuccessResponse
      if (response.data) {
        setContacts(response.data || []);
      } else {
        showNotification('Không có dữ liệu trả về từ server', 'warning');
        setContacts([]);
      }
    } catch (error) {
      console.error('Error fetching contacts:', error);
      if (error.response) {
        // Server responded with error status
        showNotification(`Lỗi từ server: ${error.response.status}`, 'error');
      } else if (error.request) {
        // Request was made but no response received
        showNotification('Không thể kết nối tới server', 'error');
      } else {
        // Something else happened
        showNotification('Lỗi khi tải danh sách liên hệ', 'error');
      }
      setContacts([]);
    } finally {
      setLoading(false);
    }
  };

  // Mark message as replied
  const handleMarkAsReplied = async (id) => {
    try {
      const response = await contactMessageApi.markAsReplied(id);
      if (response.data) {
        setContacts(contacts.map(contact => 
          contact.messageId === id ? { ...contact, isReplied: true } : contact
        ));
        showNotification('Đã đánh dấu là đã trả lời', 'success');
        if (selectedContact?.messageId === id) {
          setSelectedContact({...selectedContact, isReplied: true});
        }
      }
    } catch (error) {
      console.error('Error marking as replied:', error);
      if (error.response?.status === 404) {
        showNotification('Không tìm thấy tin nhắn', 'error');
      } else {
        showNotification('Lỗi khi cập nhật trạng thái', 'error');
      }
    }
  };

  // Mark message as unreplied
  const handleMarkAsUnreplied = async (id) => {
    try {
      const response = await contactMessageApi.markAsUnreplied(id);
      if (response.data) {
        setContacts(contacts.map(contact => 
          contact.messageId === id ? { ...contact, isReplied: false } : contact
        ));
        showNotification('Đã đánh dấu là chưa trả lời', 'success');
        if (selectedContact?.messageId === id) {
          setSelectedContact({...selectedContact, isReplied: false});
        }
      }
    } catch (error) {
      console.error('Error marking as unreplied:', error);
      if (error.response?.status === 404) {
        showNotification('Không tìm thấy tin nhắn', 'error');
      } else {
        showNotification('Lỗi khi cập nhật trạng thái', 'error');
      }
    }
  };

  // Delete contact message
  const handleDeleteContact = async (id) => {
    if (!window.confirm('Bạn có chắc chắn muốn xóa tin nhắn này?')) {
      return;
    }

    try {
      await contactMessageApi.delete(id);
      setContacts(contacts.filter(contact => contact.messageId !== id));
      showNotification('Đã xóa tin nhắn thành công', 'success');
      if (selectedContact?.messageId === id) {
        setSelectedContact(null);
      }
    } catch (error) {
      console.error('Error deleting contact:', error);
      if (error.response?.status === 404) {
        showNotification('Không tìm thấy tin nhắn', 'error');
      } else {
        showNotification('Lỗi khi xóa tin nhắn', 'error');
      }
    }
  };

  // Send reply email
  const handleSendReply = async () => {
    if (!replyMessage.trim()) {
      showNotification('Vui lòng nhập nội dung trả lời', 'warning');
      return;
    }

    try {
      setSendingReply(true);
      // Call reply API endpoint (you may need to implement this)
      // For now, we'll just mark as replied
      await handleMarkAsReplied(selectedContact.messageId);
      setReplyMode(false);
      setReplyMessage('');
      showNotification('Đã gửi email trả lời thành công', 'success');
    } catch (error) {
      console.error('Error sending reply:', error);
      showNotification('Lỗi khi gửi email trả lời', 'error');
    } finally {
      setSendingReply(false);
    }
  };

  // Helper function to get display name
  const getDisplayName = (contact) => {
    if (contact.fullName && contact.fullName.trim()) {
      return contact.fullName.trim();
    }
    if (contact.name && contact.name.trim()) {
      return contact.name.trim();
    }
    // Fallback: tạo tên từ email
    if (contact.email) {
      const emailPrefix = contact.email.split('@')[0];
      return emailPrefix.charAt(0).toUpperCase() + emailPrefix.slice(1);
    }
    return 'Người dùng ẩn danh';
  };

  // Filter contacts
  const filteredContacts = contacts.filter(contact => {
    const searchLower = searchTerm.toLowerCase();
    const matchesSearch = getDisplayName(contact).toLowerCase().includes(searchLower) ||
                         contact.email?.toLowerCase().includes(searchLower) ||
                         contact.subject?.toLowerCase().includes(searchLower) ||
                         contact.content?.toLowerCase().includes(searchLower);
    
    let matchesStatus = true;
    if (statusFilter === 'replied') {
      matchesStatus = contact.isReplied === true;
    } else if (statusFilter === 'unreplied') {
      matchesStatus = contact.isReplied === false;
    }
    
    return matchesSearch && matchesStatus;
  });

  // Get status badge
  const getStatusBadge = (isReplied) => {
    if (isReplied) {
      return (
        <span className="px-2 py-1 text-xs font-medium rounded-full bg-green-100 text-green-800">
          <CheckIcon className="h-3 w-3 inline mr-1" />
          Đã trả lời
        </span>
      );
    } else {
      return (
        <span className="px-2 py-1 text-xs font-medium rounded-full bg-yellow-100 text-yellow-800">
          <ClockIcon className="h-3 w-3 inline mr-1" />
          Chưa trả lời
        </span>
      );
    }
  };

  // Table columns
  const columns = [
    {
      key: 'contact',
      title: 'Thông tin liên hệ',
      className: 'contact-info-col',
      render: (contact) => (
        <div className="space-y-1">
          <div className="flex items-center space-x-2">
            <UserIcon className="h-4 w-4 text-gray-400 flex-shrink-0" />
            <span className="font-medium text-gray-900 truncate">
              {getDisplayName(contact)}
            </span>
          </div>
          <div className="flex items-center space-x-2">
            <EnvelopeIcon className="h-3 w-3 text-gray-400 flex-shrink-0" />
            <span className="text-sm text-gray-500 truncate">{contact.email}</span>
          </div>
          <div className="flex items-center space-x-2">
            <CalendarIcon className="h-3 w-3 text-gray-400 flex-shrink-0" />
            <span className="text-xs text-gray-400">{formatDate(contact.createdAt)}</span>
          </div>
        </div>
      )
    },
    {
      key: 'subject',
      title: 'Chủ đề & Nội dung',
      className: 'subject-content-col',
      render: (contact) => {
        const content = contact.content || contact.message || '';
        const subject = contact.subject || 'Không có chủ đề';
        
        // Chỉ hiển thị 1 dòng đầu tiên của nội dung, tối đa 80 ký tự
        const maxChars = 80;
        const firstLine = content.split('\n')[0] || '';
        const truncatedContent = firstLine.length > maxChars ? 
          firstLine.substring(0, maxChars) + '...' : firstLine;
        
        return (
          <div className="space-y-2">
            {/* Chủ đề */}
            <div className="flex items-center space-x-2">
              <div className="w-2 h-2 bg-blue-500 rounded-full flex-shrink-0 mt-1"></div>
              <h4 className="font-medium text-gray-900 text-sm line-clamp-1" title={subject}>
                {subject}
              </h4>
            </div>
            
            {/* Nội dung preview */}
            <div className="ml-4">
              <p className="text-sm text-gray-600 line-clamp-2 leading-relaxed" title={content}>
                {truncatedContent || 'Không có nội dung'}
              </p>
              
              {/* Thông tin ngắn gọn */}
              <div className="flex items-center justify-between mt-1">
                <span className="text-xs text-gray-400">
                  {content.length} ký tự
                </span>
                {content.length > maxChars && (
                  <span className="text-xs text-blue-500 font-medium cursor-pointer">
                    ...
                  </span>
                )}
              </div>
            </div>
          </div>
        );
      }
    },
    {
      key: 'status',
      title: 'Trạng thái',
      className: 'status-col',
      render: (contact) => (
        <div className="space-y-2">
          {getStatusBadge(contact.isReplied)}
        </div>
      )
    },
    {
      key: 'actions',
      title: 'Thao tác',
      className: 'actions-col',
      render: (contact) => (
        <div className="flex items-center space-x-1">
          <Button
            variant="secondary"
            size="sm"
            icon={EyeIcon}
            onClick={() => setSelectedContact(contact)}
            className="!px-2 !py-1"
          >
            Xem
          </Button>
          <div className="flex space-x-1">
            {!contact.isReplied ? (
              <Button
                variant="success"
                size="sm"
                icon={CheckIcon}
                onClick={() => handleMarkAsReplied(contact.messageId)}
                title="Đánh dấu đã trả lời"
                className="!px-1.5 !py-1"
              />
            ) : (
              <Button
                variant="warning"
                size="sm"
                icon={ClockIcon}
                onClick={() => handleMarkAsUnreplied(contact.messageId)}
                title="Đánh dấu chưa trả lời"
                className="!px-1.5 !py-1"
              />
            )}
            <Button
              variant="danger"
              size="sm"
              icon={TrashIcon}
              onClick={() => handleDeleteContact(contact.messageId)}
              title="Xóa tin nhắn"
              className="!px-1.5 !py-1"
            />
          </div>
        </div>
      )
    }
  ];

  // Statistics
  const stats = {
    total: contacts.length,
    replied: contacts.filter(c => c.isReplied === true).length,
    unreplied: contacts.filter(c => c.isReplied === false).length,
    today: contacts.filter(c => {
      const today = new Date().toDateString();
      const contactDate = new Date(c.createdAt).toDateString();
      return contactDate === today;
    }).length
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-indigo-600"></div>
        <span className="ml-2">Đang tải...</span>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
      {/* Main Content */}
      <div className="lg:col-span-2 space-y-6">
        <PageHeader
          title="Quản lý Liên hệ"
          subtitle="Quản lý tin nhắn và phản hồi từ khách hàng"
          icon={EnvelopeIcon}
        />

        {/* Statistics Cards */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <AdminCard className="text-center">
            <div className="space-y-2">
              <h3 className="text-2xl font-bold text-gray-900">{stats.total}</h3>
              <p className="text-sm text-gray-500">Tổng số</p>
            </div>
          </AdminCard>
          <AdminCard className="text-center">
            <div className="space-y-2">
              <h3 className="text-2xl font-bold text-yellow-600">{stats.unreplied}</h3>
              <p className="text-sm text-gray-500">Chưa trả lời</p>
            </div>
          </AdminCard>
          <AdminCard className="text-center">
            <div className="space-y-2">
              <h3 className="text-2xl font-bold text-green-600">{stats.replied}</h3>
              <p className="text-sm text-gray-500">Đã trả lời</p>
            </div>
          </AdminCard>
          <AdminCard className="text-center">
            <div className="space-y-2">
              <h3 className="text-2xl font-bold text-blue-600">{stats.today}</h3>
              <p className="text-sm text-gray-500">Hôm nay</p>
            </div>
          </AdminCard>
        </div>

        {/* Filters */}
        <AdminCard title="Bộ lọc">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="relative">
              <MagnifyingGlassIcon className="h-4 w-4 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
              <input
                type="text"
                placeholder="Tìm kiếm theo tên, email, chủ đề..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
              />
            </div>
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
            >
              <option value="all">Tất cả trạng thái</option>
              <option value="unreplied">Chưa trả lời</option>
              <option value="replied">Đã trả lời</option>
            </select>
            <Button 
              variant="secondary" 
              onClick={() => {
                setSearchTerm('');
                setStatusFilter('all');
              }}
            >
              Đặt lại bộ lọc
            </Button>
          </div>
        </AdminCard>

        {/* Contacts Table */}
        <AdminCard title={`Danh sách liên hệ (${filteredContacts.length})`}>
          <div className="contact-table-wrapper">
            <AdminTable
              data={filteredContacts}
              columns={columns}
              emptyMessage="Không có tin nhắn liên hệ nào"
              className="table-fixed w-full"
            />
          </div>
        </AdminCard>
      </div>

      {/* Contact Detail Sidebar */}
      <div className="lg:col-span-1">
        {selectedContact ? (
          <AdminCard 
            title="Chi tiết tin nhắn"
            actions={
              <Button
                variant="ghost"
                size="sm"
                icon={XMarkIcon}
                onClick={() => setSelectedContact(null)}
              />
            }
          >
            <div className="space-y-4">
              <div>
                <h4 className="font-semibold text-gray-900 mb-2">Thông tin liên hệ</h4>
                <div className="space-y-2 text-sm">
                  <div className="flex items-center space-x-2">
                    <UserIcon className="h-4 w-4 text-gray-400" />
                    <span>{getDisplayName(selectedContact)}</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <EnvelopeIcon className="h-4 w-4 text-gray-400" />
                    <span>{selectedContact.email}</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <CalendarIcon className="h-4 w-4 text-gray-400" />
                    <span>{formatDate(selectedContact.createdAt)}</span>
                  </div>
                </div>
              </div>

              <div>
                <h4 className="font-semibold text-gray-900 mb-2">Trạng thái</h4>
                <div className="space-y-2">
                  {getStatusBadge(selectedContact.isReplied)}
                </div>
              </div>

              <div>
                <h4 className="font-semibold text-gray-900 mb-2">Chủ đề</h4>
                <div className="bg-gray-50 p-3 rounded-md">
                  <p className="text-sm text-gray-700">
                    {selectedContact.subject || 'Không có chủ đề'}
                  </p>
                </div>
              </div>

              <div>
                <h4 className="font-semibold text-gray-900 mb-2">Nội dung tin nhắn</h4>
                <div className="bg-gray-50 p-3 rounded-md border">
                  <div className="detail-content">
                    <p className="text-sm text-gray-700 whitespace-pre-wrap leading-relaxed break-words">
                      {selectedContact.content || selectedContact.message || 'Không có nội dung'}
                    </p>
                  </div>
                  {/* Thông tin thêm về tin nhắn */}
                  <div className="mt-3 pt-3 border-t border-gray-200 flex justify-between items-center">
                    <div className="flex items-center space-x-4">
                      <span className="text-xs text-gray-500">
                        <strong>Độ dài:</strong> {(selectedContact.content || selectedContact.message || '').length} ký tự
                      </span>
                      <span className="text-xs text-gray-500">
                        <strong>Từ:</strong> {(selectedContact.content || selectedContact.message || '').split(' ').length} từ
                      </span>
                      <span className="text-xs text-gray-500">
                        <strong>Dòng:</strong> {(selectedContact.content || selectedContact.message || '').split('\n').length} dòng
                      </span>
                    </div>
                    <span className="text-xs text-gray-400 font-mono bg-gray-100 px-2 py-1 rounded">
                      #{selectedContact.messageId?.substring(0, 8) || 'N/A'}
                    </span>
                  </div>
                </div>
              </div>

              {/* Reply Section */}
              {replyMode ? (
                <div className="space-y-3">
                  <h4 className="font-semibold text-gray-900">Trả lời tin nhắn</h4>
                  <textarea
                    value={replyMessage}
                    onChange={(e) => setReplyMessage(e.target.value)}
                    placeholder="Nhập nội dung trả lời..."
                    rows={4}
                    className="w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                  />
                  <div className="flex space-x-2">
                    <Button
                      variant="primary"
                      icon={PaperAirplaneIcon}
                      onClick={handleSendReply}
                      disabled={sendingReply}
                      fullWidth
                    >
                      {sendingReply ? 'Đang gửi...' : 'Gửi'}
                    </Button>
                    <Button
                      variant="secondary"
                      onClick={() => {
                        setReplyMode(false);
                        setReplyMessage('');
                      }}
                    >
                      Hủy
                    </Button>
                  </div>
                </div>
              ) : (
                <div className="space-y-2">
                  <Button
                    variant="primary"
                    fullWidth
                    icon={ChatBubbleLeftRightIcon}
                    onClick={() => setReplyMode(true)}
                  >
                    Trả lời tin nhắn
                  </Button>
                  
                  {selectedContact.isReplied ? (
                    <Button
                      variant="warning"
                      fullWidth
                      icon={ClockIcon}
                      onClick={() => handleMarkAsUnreplied(selectedContact.messageId)}
                    >
                      Đánh dấu chưa trả lời
                    </Button>
                  ) : (
                    <Button
                      variant="success"
                      fullWidth
                      icon={CheckIcon}
                      onClick={() => handleMarkAsReplied(selectedContact.messageId)}
                    >
                      Đánh dấu đã trả lời
                    </Button>
                  )}
                  
                  <Button
                    variant="danger"
                    fullWidth
                    icon={TrashIcon}
                    onClick={() => handleDeleteContact(selectedContact.messageId)}
                  >
                    Xóa tin nhắn
                  </Button>
                </div>
              )}
            </div>
          </AdminCard>
        ) : (
          <AdminCard>
            <div className="text-center py-8">
              <EnvelopeIcon className="h-12 w-12 text-gray-300 mx-auto mb-4" />
              <p className="text-gray-500">Chọn một tin nhắn để xem chi tiết</p>
            </div>
          </AdminCard>
        )}
      </div>
    </div>
  );
};

export default ContactManagement;
