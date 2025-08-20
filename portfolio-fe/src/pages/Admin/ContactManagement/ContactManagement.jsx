import React, { useState } from 'react';
import { 
  EnvelopeIcon, 
  PhoneIcon,
  CalendarIcon,
  EyeIcon,
  TrashIcon,
  CheckIcon,
  XMarkIcon,
  ChatBubbleLeftRightIcon,
  UserIcon,
  MagnifyingGlassIcon
} from '@heroicons/react/24/outline';
import { AdminCard, Button, AdminTable, PageHeader } from '../../../components/Admin';

const ContactManagement = () => {
  const [contacts, setContacts] = useState([
    {
      id: 1,
      name: 'Nguyễn Văn A',
      email: 'nguyenvana@email.com',
      phone: '+84 123 456 789',
      subject: 'Hợp tác dự án website',
      message: 'Xin chào, tôi muốn hợp tác với bạn để phát triển một website thương mại điện tử...',
      status: 'new',
      priority: 'high',
      createdAt: '2024-01-15 10:30',
      source: 'website'
    },
    {
      id: 2,
      name: 'Trần Thị B',
      email: 'tranthib@email.com',
      phone: '+84 987 654 321',
      subject: 'Tư vấn về React',
      message: 'Chào bạn, tôi đang học React và có một số câu hỏi muốn tư vấn...',
      status: 'replied',
      priority: 'medium',
      createdAt: '2024-01-14 14:20',
      source: 'contact_form'
    },
    {
      id: 3,
      name: 'Lê Văn C',
      email: 'levanc@email.com',
      phone: '+84 555 666 777',
      subject: 'Báo lỗi website',
      message: 'Website của bạn có vấn đề về responsive trên mobile...',
      status: 'resolved',
      priority: 'low',
      createdAt: '2024-01-13 09:15',
      source: 'email'
    },
    {
      id: 4,
      name: 'Phạm Thị D',
      email: 'phamthid@email.com',
      phone: '',
      subject: 'Yêu cầu quote dự án',
      message: 'Công ty chúng tôi cần phát triển một ứng dụng quản lý nội bộ...',
      status: 'pending',
      priority: 'high',
      createdAt: '2024-01-12 16:45',
      source: 'linkedin'
    }
  ]);

  const [selectedContact, setSelectedContact] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [priorityFilter, setPriorityFilter] = useState('all');

  const handleUpdateStatus = (id, newStatus) => {
    setContacts(contacts.map(contact => 
      contact.id === id ? { ...contact, status: newStatus } : contact
    ));
  };

  const handleDeleteContact = (id) => {
    setContacts(contacts.filter(contact => contact.id !== id));
    if (selectedContact?.id === id) {
      setSelectedContact(null);
    }
  };

  const filteredContacts = contacts.filter(contact => {
    const matchesSearch = contact.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         contact.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         contact.subject.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === 'all' || contact.status === statusFilter;
    const matchesPriority = priorityFilter === 'all' || contact.priority === priorityFilter;
    
    return matchesSearch && matchesStatus && matchesPriority;
  });

  const getStatusBadge = (status) => {
    const statusColors = {
      new: 'bg-blue-100 text-blue-800',
      pending: 'bg-yellow-100 text-yellow-800',
      replied: 'bg-green-100 text-green-800',
      resolved: 'bg-gray-100 text-gray-800'
    };
    
    const statusLabels = {
      new: 'Mới',
      pending: 'Đang xử lý',
      replied: 'Đã trả lời',
      resolved: 'Đã giải quyết'
    };

    return (
      <span className={`px-2 py-1 text-xs font-medium rounded-full ${statusColors[status]}`}>
        {statusLabels[status]}
      </span>
    );
  };

  const getPriorityBadge = (priority) => {
    const priorityColors = {
      high: 'bg-red-100 text-red-800',
      medium: 'bg-yellow-100 text-yellow-800',
      low: 'bg-green-100 text-green-800'
    };
    
    const priorityLabels = {
      high: 'Cao',
      medium: 'Trung bình',
      low: 'Thấp'
    };

    return (
      <span className={`px-2 py-1 text-xs font-medium rounded-full ${priorityColors[priority]}`}>
        {priorityLabels[priority]}
      </span>
    );
  };

  const getSourceIcon = (source) => {
    const icons = {
      website: '🌐',
      contact_form: '📝',
      email: '📧',
      linkedin: '💼'
    };
    return icons[source] || '📞';
  };

  const columns = [
    {
      key: 'contact',
      label: 'Liên hệ',
      render: (contact) => (
        <div className="space-y-1">
          <div className="flex items-center space-x-2">
            <UserIcon className="h-4 w-4 text-gray-400" />
            <span className="font-medium text-gray-900">{contact.name}</span>
          </div>
          <div className="flex items-center space-x-2 text-sm text-gray-500">
            <EnvelopeIcon className="h-3 w-3" />
            <span>{contact.email}</span>
          </div>
          {contact.phone && (
            <div className="flex items-center space-x-2 text-sm text-gray-500">
              <PhoneIcon className="h-3 w-3" />
              <span>{contact.phone}</span>
            </div>
          )}
        </div>
      )
    },
    {
      key: 'subject',
      label: 'Chủ đề',
      render: (contact) => (
        <div className="space-y-1">
          <h4 className="font-medium text-gray-900 line-clamp-1">{contact.subject}</h4>
          <p className="text-sm text-gray-500 line-clamp-2">{contact.message}</p>
          <div className="flex items-center space-x-2">
            <span className="text-xs">{getSourceIcon(contact.source)}</span>
            <span className="text-xs text-gray-400">
              <CalendarIcon className="h-3 w-3 inline mr-1" />
              {contact.createdAt}
            </span>
          </div>
        </div>
      )
    },
    {
      key: 'status',
      label: 'Trạng thái',
      render: (contact) => (
        <div className="space-y-2">
          {getStatusBadge(contact.status)}
          {getPriorityBadge(contact.priority)}
        </div>
      )
    },
    {
      key: 'actions',
      label: 'Thao tác',
      render: (contact) => (
        <div className="flex items-center space-x-2">
          <Button
            variant="secondary"
            size="sm"
            icon={EyeIcon}
            onClick={() => setSelectedContact(contact)}
          >
            Xem
          </Button>
          {contact.status === 'new' && (
            <Button
              variant="success"
              size="sm"
              icon={CheckIcon}
              onClick={() => handleUpdateStatus(contact.id, 'replied')}
            />
          )}
          <Button
            variant="danger"
            size="sm"
            icon={TrashIcon}
            onClick={() => handleDeleteContact(contact.id)}
          />
        </div>
      )
    }
  ];

  // Statistics
  const stats = {
    total: contacts.length,
    new: contacts.filter(c => c.status === 'new').length,
    pending: contacts.filter(c => c.status === 'pending').length,
    resolved: contacts.filter(c => c.status === 'resolved').length,
    highPriority: contacts.filter(c => c.priority === 'high').length
  };

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
        <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
          <AdminCard className="text-center">
            <div className="space-y-2">
              <h3 className="text-2xl font-bold text-gray-900">{stats.total}</h3>
              <p className="text-sm text-gray-500">Tổng số</p>
            </div>
          </AdminCard>
          <AdminCard className="text-center">
            <div className="space-y-2">
              <h3 className="text-2xl font-bold text-blue-600">{stats.new}</h3>
              <p className="text-sm text-gray-500">Mới</p>
            </div>
          </AdminCard>
          <AdminCard className="text-center">
            <div className="space-y-2">
              <h3 className="text-2xl font-bold text-yellow-600">{stats.pending}</h3>
              <p className="text-sm text-gray-500">Đang xử lý</p>
            </div>
          </AdminCard>
          <AdminCard className="text-center">
            <div className="space-y-2">
              <h3 className="text-2xl font-bold text-green-600">{stats.resolved}</h3>
              <p className="text-sm text-gray-500">Đã xử lý</p>
            </div>
          </AdminCard>
          <AdminCard className="text-center">
            <div className="space-y-2">
              <h3 className="text-2xl font-bold text-red-600">{stats.highPriority}</h3>
              <p className="text-sm text-gray-500">Ưu tiên cao</p>
            </div>
          </AdminCard>
        </div>

        {/* Filters */}
        <AdminCard title="Bộ lọc">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div className="relative">
              <MagnifyingGlassIcon className="h-4 w-4 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
              <input
                type="text"
                placeholder="Tìm kiếm liên hệ..."
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
              <option value="new">Mới</option>
              <option value="pending">Đang xử lý</option>
              <option value="replied">Đã trả lời</option>
              <option value="resolved">Đã giải quyết</option>
            </select>
            <select
              value={priorityFilter}
              onChange={(e) => setPriorityFilter(e.target.value)}
              className="rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
            >
              <option value="all">Tất cả độ ưu tiên</option>
              <option value="high">Cao</option>
              <option value="medium">Trung bình</option>
              <option value="low">Thấp</option>
            </select>
            <Button 
              variant="secondary" 
              className="w-full"
              onClick={() => {
                setSearchTerm('');
                setStatusFilter('all');
                setPriorityFilter('all');
              }}
            >
              Đặt lại bộ lọc
            </Button>
          </div>
        </AdminCard>

        {/* Contacts Table */}
        <AdminCard title={`Danh sách liên hệ (${filteredContacts.length})`}>
          <AdminTable
            data={filteredContacts}
            columns={columns}
            emptyMessage="Không có liên hệ nào"
          />
        </AdminCard>
      </div>

      {/* Contact Detail Sidebar */}
      <div className="lg:col-span-1">
        {selectedContact ? (
          <AdminCard 
            title="Chi tiết liên hệ"
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
                    <span>{selectedContact.name}</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <EnvelopeIcon className="h-4 w-4 text-gray-400" />
                    <span>{selectedContact.email}</span>
                  </div>
                  {selectedContact.phone && (
                    <div className="flex items-center space-x-2">
                      <PhoneIcon className="h-4 w-4 text-gray-400" />
                      <span>{selectedContact.phone}</span>
                    </div>
                  )}
                  <div className="flex items-center space-x-2">
                    <CalendarIcon className="h-4 w-4 text-gray-400" />
                    <span>{selectedContact.createdAt}</span>
                  </div>
                </div>
              </div>

              <div>
                <h4 className="font-semibold text-gray-900 mb-2">Trạng thái</h4>
                <div className="space-y-2">
                  {getStatusBadge(selectedContact.status)}
                  {getPriorityBadge(selectedContact.priority)}
                </div>
              </div>

              <div>
                <h4 className="font-semibold text-gray-900 mb-2">Chủ đề</h4>
                <p className="text-sm text-gray-700">{selectedContact.subject}</p>
              </div>

              <div>
                <h4 className="font-semibold text-gray-900 mb-2">Nội dung</h4>
                <p className="text-sm text-gray-700 whitespace-pre-wrap">{selectedContact.message}</p>
              </div>

              <div className="space-y-2">
                <Button
                  variant="primary"
                  fullWidth
                  icon={ChatBubbleLeftRightIcon}
                  onClick={() => {
                    // TODO: Implement reply to contact functionality
                    // console.log('Reply to contact');
                  }}
                >
                  Trả lời
                </Button>
                <Button
                  variant="success"
                  fullWidth
                  icon={CheckIcon}
                  onClick={() => handleUpdateStatus(selectedContact.id, 'resolved')}
                >
                  Đánh dấu đã giải quyết
                </Button>
                <Button
                  variant="danger"
                  fullWidth
                  icon={TrashIcon}
                  onClick={() => handleDeleteContact(selectedContact.id)}
                >
                  Xóa
                </Button>
              </div>
            </div>
          </AdminCard>
        ) : (
          <AdminCard>
            <div className="text-center py-8">
              <EnvelopeIcon className="h-12 w-12 text-gray-300 mx-auto mb-4" />
              <p className="text-gray-500">Chọn một liên hệ để xem chi tiết</p>
            </div>
          </AdminCard>
        )}
      </div>
    </div>
  );
};

export default ContactManagement;
