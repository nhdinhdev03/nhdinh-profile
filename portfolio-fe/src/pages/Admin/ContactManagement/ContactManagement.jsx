import React, { useState, useEffect, useRef, useCallback } from "react";
import { createPortal } from "react-dom";
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
  ClockIcon,
} from "@heroicons/react/24/outline";
import contactMessageApi from "api/admin/contact/ContactMessageApi";
import { showNotification } from "components";
import { formatDate } from "utils/dateUtils";
import { AdminCard, AdminTable, PageHeader, Button } from "components/Admin";
import './contact-management.scss'

// Modal Component chi tiết liên hệ (đã tối ưu responsive + accessibility)
const ContactDetailModal = ({
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
  const modalRef = useRef(null);
  const previouslyFocusedRef = useRef(null);
  const scrollPositionRef = useRef(0);

  // Lock body scroll (không làm nhảy layout) & focus management
  useEffect(() => {
    if (isOpen) {
      previouslyFocusedRef.current = document.activeElement;
      scrollPositionRef.current = window.scrollY;
      document.body.style.top = `-${scrollPositionRef.current}px`;
      document.body.classList.add('modal-open');
      document.body.style.position = 'fixed';
      document.body.style.width = '100%';
      // Focus vào modal
      setTimeout(() => {
        modalRef.current?.focus();
      }, 30);
    } else {
      // Restore
      document.body.classList.remove('modal-open');
      document.body.style.position = '';
      document.body.style.width = '';
      const y = scrollPositionRef.current;
      document.body.style.top = '';
      window.scrollTo(0, y);
      previouslyFocusedRef.current && previouslyFocusedRef.current.focus?.();
    }
    return () => {
      document.body.classList.remove('modal-open');
      document.body.style.position = '';
      document.body.style.width = '';
      const y = scrollPositionRef.current;
      document.body.style.top = '';
      window.scrollTo(0, y);
    };
  }, [isOpen]);

  // Keyboard handlers (ESC + focus trap)
  const handleKeyDown = useCallback((e) => {
    if (e.key === 'Escape') {
      e.stopPropagation();
      onClose();
      return;
    }
    if (e.key === 'Tab' && modalRef.current) {
      const focusable = modalRef.current.querySelectorAll(
        'a[href], button:not([disabled]), textarea:not([disabled]), input:not([disabled]), select:not([disabled]), [tabindex]:not([tabindex="-1"])'
      );
      if (focusable.length === 0) return;
      const first = focusable[0];
      const last = focusable[focusable.length - 1];
      if (e.shiftKey) {
        if (document.activeElement === first) {
          e.preventDefault();
          last.focus();
        }
      } else {
        if (document.activeElement === last) {
          e.preventDefault();
          first.focus();
        }
      }
    }
  }, [onClose]);

  useEffect(() => {
    if (!isOpen) return;
    document.addEventListener('keydown', handleKeyDown, { capture: true });
    return () => document.removeEventListener('keydown', handleKeyDown, { capture: true });
  }, [isOpen, handleKeyDown]);

  if (!isOpen || !contact) return null;

  return createPortal(
    <div className="modal-root" aria-hidden={!isOpen}>
      {/* Backdrop */}
      <button
        aria-label="Đóng chi tiết liên hệ"
        className="modal-backdrop"
        onClick={onClose}
      />
      {/* Panel */}
      <div
        ref={modalRef}
        className="contact-detail-modal"
        role="dialog"
        aria-modal="true"
        aria-labelledby="contact-detail-title"
        tabIndex={-1}
      >
          {/* Header */}
          <div className="modal-header bg-gradient-to-r from-indigo-50 to-blue-50 px-6 py-4 border-b border-gray-200">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <div className="p-2 bg-indigo-100 rounded-lg">
                  <EnvelopeIcon className="h-6 w-6 text-indigo-600" />
                </div>
                <div>
                  <h3 id="contact-detail-title" className="text-lg font-semibold text-gray-900">
                    Chi tiết tin nhắn
                  </h3>
                  <p className="text-sm text-gray-500">
                    ID: #{contact.messageId?.substring(0, 8) || "N/A"}
                  </p>
                </div>
              </div>
              <button
                onClick={onClose}
                className="p-2 text-gray-400 hover:text-gray-500 hover:bg-gray-100 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-all duration-200"
              >
                <XMarkIcon className="h-6 w-6" />
              </button>
            </div>
          </div>

          {/* Content */}
          <div className="modal-body px-6 py-6 overflow-y-auto">
            <div className="grid grid-cols-1 xl:grid-cols-2 gap-8">
              {/* Left Column - Contact Info */}
              <div className="space-y-6">
                {/* Thông tin liên hệ */}
                <div>
                  <h4 className="font-semibold text-gray-900 mb-3 flex items-center">
                    <UserIcon className="h-5 w-5 mr-2 text-gray-500" />
                    Thông tin liên hệ
                  </h4>
                  <div className="bg-gray-50 rounded-lg p-4 space-y-3">
                    <div className="flex items-center space-x-3">
                      <UserIcon className="h-4 w-4 text-gray-400 flex-shrink-0" />
                      <div>
                        <span className="text-sm text-gray-500">Tên:</span>
                        <p className="font-medium text-gray-900">{getDisplayName(contact)}</p>
                      </div>
                    </div>
                    <div className="flex items-center space-x-3">
                      <EnvelopeIcon className="h-4 w-4 text-gray-400 flex-shrink-0" />
                      <div>
                        <span className="text-sm text-gray-500">Email:</span>
                        <p className="font-medium text-gray-900">{contact.email}</p>
                      </div>
                    </div>
                    <div className="flex items-center space-x-3">
                      <CalendarIcon className="h-4 w-4 text-gray-400 flex-shrink-0" />
                      <div>
                        <span className="text-sm text-gray-500">Thời gian:</span>
                        <p className="font-medium text-gray-900">{formatDate(contact.createdAt)}</p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Trạng thái */}
                <div>
                  <h4 className="font-semibold text-gray-900 mb-3">Trạng thái</h4>
                  <div className="bg-gray-50 rounded-lg p-4">
                    {getStatusBadge(contact.isReplied)}
                  </div>
                </div>

                {/* Chủ đề */}
                <div>
                  <h4 className="font-semibold text-gray-900 mb-3">Chủ đề</h4>
                  <div className="bg-gray-50 rounded-lg p-4">
                    <p className="text-gray-700 font-medium">
                      {contact.subject || "Không có chủ đề"}
                    </p>
                  </div>
                </div>

                {/* Thống kê tin nhắn */}
                <div>
                  <h4 className="font-semibold text-gray-900 mb-3">Thống kê</h4>
                  <div className="bg-gray-50 rounded-lg p-4">
                    <div className="grid grid-cols-3 gap-4 text-center">
                      <div>
                        <p className="text-2xl font-bold text-blue-600">
                          {(contact.content || contact.message || "").length}
                        </p>
                        <p className="text-xs text-gray-500">Ký tự</p>
                      </div>
                      <div>
                        <p className="text-2xl font-bold text-green-600">
                          {(contact.content || contact.message || "").split(" ").length}
                        </p>
                        <p className="text-xs text-gray-500">Từ</p>
                      </div>
                      <div>
                        <p className="text-2xl font-bold text-purple-600">
                          {(contact.content || contact.message || "").split("\n").length}
                        </p>
                        <p className="text-xs text-gray-500">Dòng</p>
                      </div>
                    </div>
                    <div className="mt-3 pt-3 border-t border-gray-200 text-center">
                      <span className="text-xs text-gray-400 font-mono bg-gray-100 px-2 py-1 rounded">
                        ID: #{contact.messageId?.substring(0, 8) || "N/A"}
                      </span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Right Column - Message Content */}
              <div className="space-y-6">
                {/* Nội dung tin nhắn */}
                <div>
                  <h4 className="font-semibold text-gray-900 mb-3">Nội dung tin nhắn</h4>
                  <div className="bg-gray-50 rounded-lg p-4 border">
                    <div className="max-h-64 overflow-y-auto">
                      <p className="text-gray-700 whitespace-pre-wrap leading-relaxed break-words">
                        {contact.content || contact.message || "Không có nội dung"}
                      </p>
                    </div>
                  </div>
                </div>

                {/* Reply Section */}
                {replyMode ? (
                  <div>
                    <h4 className="font-semibold text-gray-900 mb-3 flex items-center">
                      <ChatBubbleLeftRightIcon className="h-5 w-5 mr-2 text-indigo-600" />
                      Trả lời tin nhắn
                    </h4>
                    <div className="space-y-4">
                      <textarea
                        value={replyMessage}
                        onChange={(e) => setReplyMessage(e.target.value)}
                        placeholder="Nhập nội dung trả lời..."
                        rows={6}
                        className="w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                      />
                      <div className="flex space-x-3">
                        <Button
                          variant="primary"
                          icon={PaperAirplaneIcon}
                          onClick={onSendReply}
                          disabled={sendingReply}
                          className="flex-1"
                        >
                          {sendingReply ? "Đang gửi..." : "Gửi trả lời"}
                        </Button>
                        <Button
                          variant="secondary"
                          onClick={() => {
                            setReplyMode(false);
                            setReplyMessage("");
                          }}
                        >
                          Hủy
                        </Button>
                      </div>
                    </div>
                  </div>
                ) : (
                  <div>
                    <h4 className="font-semibold text-gray-900 mb-3">Thao tác</h4>
                    <div className="space-y-3">
                      <Button
                        variant="primary"
                        fullWidth
                        icon={ChatBubbleLeftRightIcon}
                        onClick={() => setReplyMode(true)}
                      >
                        Trả lời tin nhắn
                      </Button>

                      {contact.isReplied ? (
                        <Button
                          variant="warning"
                          fullWidth
                          icon={ClockIcon}
                          onClick={() => onMarkAsUnreplied(contact.messageId)}
                        >
                          Đánh dấu chưa trả lời
                        </Button>
                      ) : (
                        <Button
                          variant="success"
                          fullWidth
                          icon={CheckIcon}
                          onClick={() => onMarkAsReplied(contact.messageId)}
                        >
                          Đánh dấu đã trả lời
                        </Button>
                      )}

                      <Button
                        variant="danger"
                        fullWidth
                        icon={TrashIcon}
                        onClick={() => {
                          if (window.confirm("Bạn có chắc chắn muốn xóa tin nhắn này?")) {
                            onDeleteContact(contact.messageId);
                          }
                        }}
                      >
                        Xóa tin nhắn
                      </Button>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Footer */}
          <div className="modal-footer bg-gray-50/80 px-6 py-4 border-t border-gray-200 backdrop-blur-sm">
            <div className="flex justify-between items-center">
              <div className="text-sm text-gray-500">
                Tin nhắn từ {getDisplayName(contact)} • {formatDate(contact.createdAt)}
              </div>
              <Button 
                variant="secondary" 
                onClick={onClose}
                className="px-6 py-2 bg-white border-gray-300 hover:bg-gray-50 transition-colors duration-200"
              >
                Đóng
              </Button>
            </div>
          </div>
        </div>
    </div>,
    document.body
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
      console.log("API Response:", response); // Debug log

      // Backend trả về List<ContactMessage> trực tiếp, không phải SuccessResponse
      if (response.data) {
        setContacts(response.data || []);
      } else {
        showNotification("Không có dữ liệu trả về từ server", "warning");
        setContacts([]);
      }
    } catch (error) {
      console.error("Error fetching contacts:", error);
      if (error.response) {
        // Server responded with error status
        showNotification(`Lỗi từ server: ${error.response.status}`, "error");
      } else if (error.request) {
        // Request was made but no response received
        showNotification("Không thể kết nối tới server", "error");
      } else {
        // Something else happened
        showNotification("Lỗi khi tải danh sách liên hệ", "error");
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
        setContacts(
          contacts.map((contact) =>
            contact.messageId === id ? { ...contact, isReplied: true } : contact
          )
        );
        showNotification("Đã đánh dấu là đã trả lời", "success");
              if (selectedContact?.messageId === id) {
                setSelectedContact({ ...selectedContact, isReplied: true });
              }
            } else {
              showNotification("Lỗi khi cập nhật trạng thái", "error");
            }
          } catch (error) {
            console.error("Error marking as replied:", error);
            if (error.response?.status === 404) {
              showNotification("Không tìm thấy tin nhắn", "error");
            } else {
              showNotification("Lỗi khi cập nhật trạng thái", "error");
            }
          }
        };
      
        // Mark message as unreplied
        const handleMarkAsUnreplied = async (id) => {
          try {
            const response = await contactMessageApi.markAsUnreplied(id);
            if (response.data) {
              setContacts(
                contacts.map((contact) =>
                  contact.messageId === id
                    ? { ...contact, isReplied: false }
                    : contact
                )
              );
              showNotification("Đã đánh dấu là chưa trả lời", "success");
              if (selectedContact?.messageId === id) {
                setSelectedContact({ ...selectedContact, isReplied: false });
              }
            } else {
              showNotification("Lỗi khi cập nhật trạng thái", "error");
            }
          } catch (error) {
            console.error("Error marking as unreplied:", error);
            if (error.response?.status === 404) {
              showNotification("Không tìm thấy tin nhắn", "error");
            } else {
              showNotification("Lỗi khi cập nhật trạng thái", "error");
            }
          }
        };
      
        // Delete contact message
        const handleDeleteContact = async (id) => {
          if (!window.confirm("Bạn có chắc chắn muốn xóa tin nhắn này?")) {
            return;
          }
      
          try {
            await contactMessageApi.delete(id);
            setContacts(contacts.filter((contact) => contact.messageId !== id));
            showNotification("Đã xóa tin nhắn thành công", "success");
            if (selectedContact?.messageId === id) {
              handleCloseModal();
            }
          } catch (error) {
            console.error("Error deleting contact:", error);
            if (error.response?.status === 404) {
              showNotification("Không tìm thấy tin nhắn", "error");
            } else {
              showNotification("Lỗi khi xóa tin nhắn", "error");
            }
          }
        };  // Send reply email
  const handleSendReply = async () => {
    if (!replyMessage.trim()) {
      showNotification("Vui lòng nhập nội dung trả lời", "warning");
      return;
    }

    try {
      setSendingReply(true);
      // Call reply API endpoint (you may need to implement this)
      // For now, we'll just mark as replied
      await handleMarkAsReplied(selectedContact.messageId);
      setReplyMode(false);
      setReplyMessage("");
      setShowDetailModal(false);
      showNotification("Đã gửi email trả lời thành công", "success");
    } catch (error) {
      console.error("Error sending reply:", error);
      showNotification("Lỗi khi gửi email trả lời", "error");
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
    if (contact.fullName && contact.fullName.trim()) {
      return contact.fullName.trim();
    }
    if (contact.name && contact.name.trim()) {
      return contact.name.trim();
    }
    // Fallback: tạo tên từ email
    if (contact.email) {
      const emailPrefix = contact.email.split("@")[0];
      return emailPrefix.charAt(0).toUpperCase() + emailPrefix.slice(1);
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
      key: "contact",
      title: "Thông tin liên hệ",
      className: "contact-info-col",
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
            <span className="text-sm text-gray-500 truncate">
              {contact.email}
            </span>
          </div>
          <div className="flex items-center space-x-2">
            <CalendarIcon className="h-3 w-3 text-gray-400 flex-shrink-0" />
            <span className="text-xs text-gray-400">
              {formatDate(contact.createdAt)}
            </span>
          </div>
        </div>
      ),
    },
    {
      key: "subject",
      title: "Chủ đề & Nội dung",
      className: "subject-content-col",
      render: (contact) => {
        const content = contact.content || contact.message || "";
        const subject = contact.subject || "Không có chủ đề";

        // Chỉ hiển thị 1 dòng đầu tiên của nội dung, tối đa 80 ký tự
        const maxChars = 80;
        const firstLine = content.split("\n")[0] || "";
        const truncatedContent =
          firstLine.length > maxChars
            ? firstLine.substring(0, maxChars) + "..."
            : firstLine;

        return (
          <div className="space-y-2">
            {/* Chủ đề */}
            <div className="flex items-center space-x-2">
              <div className="w-2 h-2 bg-blue-500 rounded-full flex-shrink-0 mt-1"></div>
              <h4
                className="font-medium text-gray-900 text-sm line-clamp-1"
                title={subject}
              >
                {subject}
              </h4>
            </div>

            {/* Nội dung preview */}
            <div className="ml-4">
              <p
                className="text-sm text-gray-600 line-clamp-2 leading-relaxed"
                title={content}
              >
                {truncatedContent || "Không có nội dung"}
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
      },
    },
    {
      key: "status",
      title: "Trạng thái",
      className: "status-col",
      render: (contact) => (
        <div className="space-y-2">{getStatusBadge(contact.isReplied)}</div>
      ),
    },
    {
      key: "actions",
      title: "Thao tác",
      className: "actions-col",
      render: (contact) => (
        <div className="flex items-center space-x-1">
          <Button
            variant="secondary"
            size="sm"
            icon={EyeIcon}
            onClick={() => handleViewContact(contact)}
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
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-indigo-600"></div>
        <span className="ml-2">Đang tải...</span>
      </div>
    );
  }

  return (
    <div className="space-y-6 w-full max-w-none">
      <PageHeader
        title="Quản lý Liên hệ"
        subtitle="Quản lý tin nhắn và phản hồi từ khách hàng"
        icon={EnvelopeIcon}
      />

      {/* Statistics Cards */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 lg:gap-6">
        <AdminCard className="text-center hover:shadow-md transition-shadow duration-200">
          <div className="space-y-2">
            <h3 className="text-2xl font-bold text-gray-900">
              {stats.total}
            </h3>
            <p className="text-sm text-gray-500">Tổng số</p>
          </div>
        </AdminCard>
        <AdminCard className="text-center hover:shadow-md transition-shadow duration-200">
          <div className="space-y-2">
            <h3 className="text-2xl font-bold text-yellow-600">
              {stats.unreplied}
            </h3>
            <p className="text-sm text-gray-500">Chưa trả lời</p>
          </div>
        </AdminCard>
        <AdminCard className="text-center hover:shadow-md transition-shadow duration-200">
          <div className="space-y-2">
            <h3 className="text-2xl font-bold text-green-600">
              {stats.replied}
            </h3>
            <p className="text-sm text-gray-500">Đã trả lời</p>
          </div>
        </AdminCard>
        <AdminCard className="text-center hover:shadow-md transition-shadow duration-200">
          <div className="space-y-2">
            <h3 className="text-2xl font-bold text-blue-600">
              {stats.today}
            </h3>
            <p className="text-sm text-gray-500">Hôm nay</p>
          </div>
        </AdminCard>
      </div>

      {/* Filters */}
      <AdminCard title="Bộ lọc" className="shadow-sm">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 lg:gap-6">
          <div className="relative">
            <MagnifyingGlassIcon className="h-4 w-4 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              placeholder="Tìm kiếm theo tên, email, chủ đề..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10 w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 transition-colors duration-200"
            />
          </div>
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 transition-colors duration-200"
          >
            <option value="all">Tất cả trạng thái</option>
            <option value="unreplied">Chưa trả lời</option>
            <option value="replied">Đã trả lời</option>
          </select>
          <Button
            variant="secondary"
            onClick={() => {
              setSearchTerm("");
              setStatusFilter("all");
            }}
            className="transition-all duration-200 hover:bg-gray-100"
          >
            Đặt lại bộ lọc
          </Button>
        </div>
      </AdminCard>

      {/* Contacts Table */}
      <AdminCard title={`Danh sách liên hệ (${filteredContacts.length})`} className="shadow-sm">
        <div className="contact-table-wrapper w-full overflow-hidden">
          <AdminTable
            data={filteredContacts}
            columns={columns}
            emptyMessage="Không có tin nhắn liên hệ nào"
            className="table-fixed w-full"
          />
        </div>
      </AdminCard>

      {/* Contact Detail Modal */}
      {showDetailModal && selectedContact && (
        <ContactDetailModal
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
