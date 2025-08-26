import React, { useState, useEffect, useRef, useCallback } from 'react';
import { createPortal } from "react-dom";
import { 
  PlusIcon, 
  PencilIcon, 
  TrashIcon,
  FolderIcon,
  EyeIcon,
  MagnifyingGlassIcon,
  StarIcon,
  XMarkIcon,
  ChevronDownIcon,
  CheckIcon
} from '@heroicons/react/24/outline';
import { StarIcon as StarIconSolid } from '@heroicons/react/24/solid';

import { ProjectApi, ProjectCategoryApi, ProjectTagApi } from 'api/admin';
import { PageHeader, Button } from 'components/Admin';
import './ProjectsManagement.css';

// Fallback image as data URL to avoid network errors
const FALLBACK_IMAGE = 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAwIiBoZWlnaHQ9IjIwMCIgdmlld0JveD0iMCAwIDQwMCAyMDAiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGRlZnM+PGxpbmVhckdyYWRpZW50IGlkPSJncmFkIiBncmFkaWVudFVuaXRzPSJ1c2VyU3BhY2VPblVzZSIgeDE9IjAlIiB5MT0iMCUiIHgyPSIxMDAlIiB5Mj0iMTAwJSI+PHN0b3Agb2Zmc2V0PSIwJSIgc3R5bGU9InN0b3AtY29sb3I6cmdiKDI0MiwyNDUsMjQ3KTtzdG9wLW9wYWNpdHk6MSIgLz48c3RvcCBvZmZzZXQ9IjEwMCUiIHN0eWxlPSJzdG9wLWNvbG9yOnJnYigyMjksMjMxLDIzNSk7c3RvcC1vcGFjaXR5OjEiIC8+PC9saW5lYXJHcmFkaWVudD48L2RlZnM+PHJlY3Qgd2lkdGg9IjQwMCIgaGVpZ2h0PSIyMDAiIGZpbGw9InVybCgjZ3JhZCkiLz48Y2lyY2xlIGN4PSIyMDAiIGN5PSIxMDAiIHI9IjI0IiBmaWxsPSIjOWNhM2FmIi8+PC9zdmc+';

// Component Multi-Select cho Tags
const TagsMultiSelect = ({ 
  availableTags, 
  selectedTagIds, 
  onChange, 
  disabled = false,
  onCreateTag = null
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const dropdownRef = useRef(null);

  // Filter tags based on search term
  const filteredTags = availableTags.filter(tag =>
    tag.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Get selected tags for display
  const selectedTags = availableTags.filter(tag => 
    selectedTagIds.includes(tag.id)
  );

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
        setSearchTerm('');
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Handle tag selection
  const handleTagToggle = (tagId) => {
    const newSelectedIds = selectedTagIds.includes(tagId)
      ? selectedTagIds.filter(id => id !== tagId)
      : [...selectedTagIds, tagId];
    onChange(newSelectedIds);
  };

  // Remove tag
  const handleRemoveTag = (tagId) => {
    const newSelectedIds = selectedTagIds.filter(id => id !== tagId);
    onChange(newSelectedIds);
  };

  // Handle creating new tag within this component
  const handleCreateNewTagLocal = async () => {
    if (onCreateTag && searchTerm.trim()) {
      try {
        // Show loading state (you can add a loading state to the component)
        const newTag = await onCreateTag(searchTerm.trim());
        if (newTag && newTag.id) {
          // Add new tag to selection
          onChange([...selectedTagIds, newTag.id]);
        }
        setSearchTerm('');
        setIsOpen(false);
      } catch (error) {
        console.error('Error creating new tag:', error);
        // Keep dropdown open if there was an error so user can try again
        // setSearchTerm(''); // Don't clear search term on error
      }
    }
  };

  return (
    <div className="tags-multiselect" ref={dropdownRef}>
      <label className="block text-sm font-medium text-gray-700 mb-2">
        Công nghệ sử dụng
      </label>
      
      {/* Selected tags display */}
      <div className="selected-tags">
        {selectedTags.map((tag) => (
          <span
            key={tag.id}
            className="selected-tag"
          >
            {tag.name}
            <button
              type="button"
              onClick={() => handleRemoveTag(tag.id)}
              className="ml-1.5 text-blue-400 hover:text-blue-600 focus:outline-none"
            >
              <XMarkIcon className="h-3 w-3" />
            </button>
          </span>
        ))}
        {selectedTags.length === 0 && (
          <span className="text-sm text-gray-500">Chưa chọn công nghệ nào</span>
        )}
      </div>

      {/* Dropdown trigger */}
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        disabled={disabled}
        className="tags-trigger"
      >
        <span className="text-sm text-gray-500">
          {isOpen ? 'Đóng danh sách...' : 'Chọn công nghệ...'}
        </span>
        <ChevronDownIcon
          className={`tags-trigger-icon ${isOpen ? 'open' : ''}`}
        />
      </button>

      {/* Dropdown panel */}
      {isOpen && (
        <div className="tags-dropdown">
          {/* Search input */}
          <div className="tags-dropdown-search">
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Tìm kiếm công nghệ..."
              className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
              autoFocus
            />
          </div>

          {/* Tags list */}
          <div className="tags-dropdown-list">
            {filteredTags.length > 0 ? (
              filteredTags.map((tag) => {
                const isSelected = selectedTagIds.includes(tag.id);
                return (
                  <button
                    key={tag.id}
                    type="button"
                    onClick={() => handleTagToggle(tag.id)}
                    className={`tags-dropdown-item ${isSelected ? 'selected' : ''}`}
                  >
                    <div className="flex items-center justify-between">
                      <span>{tag.name}</span>
                      {isSelected && (
                        <CheckIcon className="h-4 w-4 text-indigo-600" />
                      )}
                    </div>
                  </button>
                );
              })
            ) : (
              <div className="tags-dropdown-empty">
                {searchTerm ? 'Không tìm thấy công nghệ nào' : 'Chưa có công nghệ nào'}
              </div>
            )}
          </div>

          {/* Add new tag option */}
          {searchTerm && 
           !filteredTags.some(tag => tag.name.toLowerCase() === searchTerm.toLowerCase()) && 
           onCreateTag && (
            <div className="tags-dropdown-create">
              <button
                type="button"
                onClick={() => handleCreateNewTagLocal()}
                className="w-full text-left text-sm text-indigo-600 hover:text-indigo-700 focus:outline-none"
              >
                <PlusIcon className="h-4 w-4 inline mr-2" />
                Thêm "{searchTerm}" làm công nghệ mới
              </button>
            </div>
          )}
        </div>
      )}

      <p className="mt-1 text-xs text-gray-500">
        Chọn các công nghệ, framework, thư viện sử dụng trong dự án
      </p>
    </div>
  );
};

// Modal Component chi tiết dự án (đã tối ưu responsive + accessibility)
const ProjectDetailModal = ({
  project,
  isOpen,
  onClose,
  onEdit,
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
      previouslyFocusedRef.current?.focus?.();
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
      } else if (document.activeElement === last) {
        e.preventDefault();
        first.focus();
      }
    }
  }, [onClose]);

  useEffect(() => {
    if (!isOpen) return;
    document.addEventListener('keydown', handleKeyDown, { capture: true });
    return () => document.removeEventListener('keydown', handleKeyDown, { capture: true });
  }, [isOpen, handleKeyDown]);

  if (!isOpen || !project) return null;

  return createPortal(
    <div className="modal-root" aria-hidden={!isOpen}>
      {/* Backdrop */}
      <button
        aria-label="Đóng chi tiết dự án"
        className="modal-backdrop fixed inset-0 bg-gray-600 bg-opacity-50 z-50"
        onClick={onClose}
      />
      {/* Panel */}
      <div
        ref={modalRef}
        className="project-detail-modal fixed inset-0 z-50 overflow-y-auto"
        role="dialog"
        aria-modal="true"
        aria-labelledby="project-detail-title"
        tabIndex={-1}
      >
        <div className="flex items-start justify-center min-h-screen px-4 pt-10 pb-20">
          <div className="relative bg-white rounded-lg shadow-xl max-w-4xl w-full max-h-[90vh] overflow-hidden">
            {/* Header */}
            <div className="modal-header bg-gradient-to-r from-indigo-50 to-blue-50 px-6 py-4 border-b border-gray-200">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <div className="p-2 bg-indigo-100 rounded-lg">
                    <FolderIcon className="h-6 w-6 text-indigo-600" />
                  </div>
                  <div>
                    <h3 id="project-detail-title" className="text-lg font-semibold text-gray-900">
                      Chi tiết dự án
                    </h3>
                    <p className="text-sm text-gray-500">
                      ID: #{project.id || "N/A"}
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
            <div className="modal-body px-6 py-6 overflow-y-auto max-h-[calc(90vh-200px)]">
              <div className="grid grid-cols-1 xl:grid-cols-2 gap-8">
                {/* Left Column - Project Image & Basic Info */}
                <div className="space-y-6">
                  {/* Project Image */}
                  <div>
                    <img
                      src={project.imageUrl || FALLBACK_IMAGE}
                      alt={project.title}
                      className="w-full h-64 object-cover rounded-lg border"
                    />
                  </div>

                  {/* Basic Info */}
                  <div>
                    <h4 className="font-semibold text-gray-900 mb-3 flex items-center">
                      <FolderIcon className="h-5 w-5 mr-2 text-gray-500" />
                      Thông tin cơ bản
                    </h4>
                    <div className="bg-gray-50 rounded-lg p-4 space-y-3">
                      <div>
                        <span className="text-sm font-medium text-gray-500">Tên dự án:</span>
                        <p className="text-gray-900 font-medium">{project.title}</p>
                      </div>
                      <div>
                        <span className="text-sm font-medium text-gray-500">Danh mục:</span>
                        <p className="text-gray-900">{project.category?.name || 'Chưa phân loại'}</p>
                      </div>
                      <div>
                        <span className="text-sm font-medium text-gray-500">Trạng thái:</span>
                        <span className={`ml-2 inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                          project.status === 'published' 
                            ? 'bg-green-100 text-green-800' 
                            : project.status === 'draft'
                            ? 'bg-yellow-100 text-yellow-800'
                            : 'bg-gray-100 text-gray-800'
                        }`}>
                          {project.status === 'published' ? 'Đã xuất bản' : 
                           project.status === 'draft' ? 'Bản nháp' : 'Đã lưu trữ'}
                        </span>
                        {project.isFeatured && (
                          <span className="ml-2 inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-yellow-100 text-yellow-800">
                            <StarIcon className="h-3 w-3 mr-1" />
                            Nổi bật
                          </span>
                        )}
                      </div>
                      <div>
                        <span className="text-sm font-medium text-gray-500">Ngày tạo:</span>
                        <p className="text-gray-900">{new Date(project.createdAt).toLocaleDateString('vi-VN')}</p>
                      </div>
                      <div>
                        <span className="text-sm font-medium text-gray-500">Cập nhật cuối:</span>
                        <p className="text-gray-900">{new Date(project.updatedAt || project.createdAt).toLocaleDateString('vi-VN')}</p>
                      </div>
                    </div>
                  </div>

                  {/* Tags */}
                  {project.tags && project.tags.length > 0 && (
                    <div>
                      <h4 className="font-semibold text-gray-900 mb-3">Công nghệ sử dụng</h4>
                      <div className="flex flex-wrap gap-2">
                        {project.tags.map((tag) => (
                          <span key={tag.id} className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-blue-100 text-blue-800">
                            {tag.name}
                          </span>
                        ))}
                      </div>
                    </div>
                  )}
                </div>

                {/* Right Column - Description & Links */}
                <div className="space-y-6">
                  {/* Description */}
                  <div>
                    <h4 className="font-semibold text-gray-900 mb-3">Mô tả dự án</h4>
                    <div className="bg-gray-50 rounded-lg p-4 border">
                      <div className="max-h-64 overflow-y-auto">
                        <p className="text-gray-700 whitespace-pre-wrap leading-relaxed break-words">
                          {project.description || "Chưa có mô tả"}
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* Project Links */}
                  <div>
                    <h4 className="font-semibold text-gray-900 mb-3">Liên kết dự án</h4>
                    <div className="bg-gray-50 rounded-lg p-4 space-y-3">
                      {project.demoUrl && (
                        <div>
                          <span className="text-sm font-medium text-gray-500">Demo URL:</span>
                          <a 
                            href={project.demoUrl} 
                            target="_blank" 
                            rel="noopener noreferrer"
                            className="block text-blue-600 hover:text-blue-800 truncate"
                          >
                            {project.demoUrl}
                          </a>
                        </div>
                      )}
                      {project.sourceUrl && (
                        <div>
                          <span className="text-sm font-medium text-gray-500">Source URL:</span>
                          <a 
                            href={project.sourceUrl} 
                            target="_blank" 
                            rel="noopener noreferrer"
                            className="block text-blue-600 hover:text-blue-800 truncate"
                          >
                            {project.sourceUrl}
                          </a>
                        </div>
                      )}
                      {!project.demoUrl && !project.sourceUrl && (
                        <p className="text-gray-500 text-sm">Chưa có liên kết nào</p>
                      )}
                    </div>
                  </div>

                  {/* Actions */}
                  <div>
                    <h4 className="font-semibold text-gray-900 mb-3">Thao tác</h4>
                    <div className="space-y-3">
                      <Button
                        variant="primary"
                        fullWidth
                        icon={PencilIcon}
                        onClick={() => {
                          onClose();
                          onEdit(project);
                        }}
                      >
                        Chỉnh sửa dự án
                      </Button>
                      <div className="grid grid-cols-2 gap-3">
                        {project.demoUrl && (
                          <Button
                            variant="secondary"
                            icon={EyeIcon}
                            onClick={() => window.open(project.demoUrl, '_blank')}
                            className="justify-center"
                          >
                            Xem Demo
                          </Button>
                        )}
                        {project.sourceUrl && (
                          <Button
                            variant="secondary"
                            onClick={() => window.open(project.sourceUrl, '_blank')}
                            className="justify-center"
                          >
                            Xem Code
                          </Button>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Footer */}
            <div className="modal-footer bg-gray-50/80 px-6 py-4 border-t border-gray-200 backdrop-blur-sm">
              <div className="flex justify-between items-center">
                <div className="text-sm text-gray-500">
                  Dự án {project.title} • {new Date(project.createdAt).toLocaleDateString('vi-VN')}
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
        </div>
      </div>
    </div>,
    document.body
  );
};

// Modal Component form thêm/chỉnh sửa dự án (đã tối ưu responsive + accessibility)
const ProjectFormModal = ({
  isOpen,
  onClose,
  onSubmit,
  editingProject,
  formData,
  setFormData,
  categories,
  handleCreateNewTag,
  tags,
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
      previouslyFocusedRef.current?.focus?.();
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
      } else if (document.activeElement === last) {
        e.preventDefault();
        first.focus();
      }
    }
  }, [onClose]);

  useEffect(() => {
    if (!isOpen) return;
    document.addEventListener('keydown', handleKeyDown, { capture: true });
    return () => document.removeEventListener('keydown', handleKeyDown, { capture: true });
  }, [isOpen, handleKeyDown]);

  if (!isOpen) return null;

  return createPortal(
    <div className="modal-root" aria-hidden={!isOpen}>
      {/* Backdrop */}
      <button
        aria-label={editingProject ? "Đóng form chỉnh sửa dự án" : "Đóng form thêm dự án"}
        className="modal-backdrop fixed inset-0 bg-gray-600 bg-opacity-50 z-50"
        onClick={onClose}
      />
      {/* Panel */}
      <div
        ref={modalRef}
        className="project-form-modal fixed inset-0 z-50 overflow-y-auto"
        role="dialog"
        aria-modal="true"
        aria-labelledby="project-form-title"
        tabIndex={-1}
      >
        <div className="flex items-start justify-center min-h-screen px-4 pt-10 pb-20">
          <div className="relative bg-white rounded-lg shadow-xl max-w-2xl w-full max-h-[90vh] overflow-hidden">
            {/* Header */}
            <div className="modal-header bg-gradient-to-r from-indigo-50 to-blue-50 px-6 py-4 border-b border-gray-200">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <div className="p-2 bg-indigo-100 rounded-lg">
                    {editingProject ? (
                      <PencilIcon className="h-6 w-6 text-indigo-600" />
                    ) : (
                      <PlusIcon className="h-6 w-6 text-indigo-600" />
                    )}
                  </div>
                  <div>
                    <h3 id="project-form-title" className="text-lg font-semibold text-gray-900">
                      {editingProject ? 'Chỉnh sửa dự án' : 'Thêm dự án mới'}
                    </h3>
                    <p className="text-sm text-gray-500">
                      {editingProject ? 'Cập nhật thông tin dự án' : 'Tạo dự án mới'}
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
            <div className="modal-body px-6 py-6 overflow-y-auto max-h-[calc(90vh-200px)]">
              <form onSubmit={onSubmit} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {/* Left Column */}
                  <div className="space-y-4">
                    <div>
                      <label htmlFor="project-title" className="block text-sm font-medium text-gray-700 mb-2">
                        Tên dự án <span className="text-red-500">*</span>
                      </label>
                      <input
                        id="project-title"
                        type="text"
                        value={formData.title}
                        onChange={(e) => setFormData({...formData, title: e.target.value})}
                        className="w-full border border-gray-300 rounded-lg px-3 py-2.5 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-colors"
                        placeholder="Ví dụ: Portfolio Website"
                        required
                      />
                      <p className="mt-1 text-xs text-gray-500">Tên hiển thị của dự án</p>
                    </div>
                    
                    <div>
                      <label htmlFor="project-category" className="block text-sm font-medium text-gray-700 mb-2">
                        Danh mục <span className="text-red-500">*</span>
                      </label>
                      <select
                        id="project-category"
                        value={formData.categoryId}
                        onChange={(e) => setFormData({...formData, categoryId: e.target.value})}
                        className="w-full border border-gray-300 rounded-lg px-3 py-2.5 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-colors"
                        required
                      >
                        <option value="">Chọn danh mục dự án</option>
                        {categories.map(category => (
                          <option key={category.id} value={category.id}>{category.name}</option>
                        ))}
                      </select>
                      <p className="mt-1 text-xs text-gray-500">Phân loại dự án theo chủ đề</p>
                    </div>

                    <div>
                      <label htmlFor="project-imageUrl" className="block text-sm font-medium text-gray-700 mb-2">
                        URL hình ảnh
                      </label>
                      <input
                        id="project-imageUrl"
                        type="url"
                        value={formData.imageUrl}
                        onChange={(e) => setFormData({...formData, imageUrl: e.target.value})}
                        className="w-full border border-gray-300 rounded-lg px-3 py-2.5 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-colors"
                        placeholder="https://example.com/image.jpg hoặc /img/projects/project.png"
                      />
                      <p className="mt-1 text-xs text-gray-500">Link hình ảnh đại diện cho dự án</p>
                    </div>

                    <div>
                      <label htmlFor="project-demoUrl" className="block text-sm font-medium text-gray-700 mb-2">
                        URL demo
                      </label>
                      <input
                        id="project-demoUrl"
                        type="url"
                        value={formData.demoUrl}
                        onChange={(e) => setFormData({...formData, demoUrl: e.target.value})}
                        className="w-full border border-gray-300 rounded-lg px-3 py-2.5 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-colors"
                        placeholder="https://demo.example.com"
                      />
                      <p className="mt-1 text-xs text-gray-500">Link xem thử dự án hoạt động</p>
                    </div>

                    <div>
                      <label htmlFor="project-sourceUrl" className="block text-sm font-medium text-gray-700 mb-2">
                        URL source code
                      </label>
                      <input
                        id="project-sourceUrl"
                        type="url"
                        value={formData.sourceUrl}
                        onChange={(e) => setFormData({...formData, sourceUrl: e.target.value})}
                        className="w-full border border-gray-300 rounded-lg px-3 py-2.5 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-colors"
                        placeholder="https://github.com/user/repo"
                      />
                      <p className="mt-1 text-xs text-gray-500">Link repository mã nguồn</p>
                    </div>

                    {/* Tags Multi-Select */}
                    <TagsMultiSelect
                      availableTags={tags}
                      selectedTagIds={formData.tagIds}
                      onChange={(tagIds) => setFormData({...formData, tagIds})}
                      onCreateTag={handleCreateNewTag}
                    />
                  </div>

                  {/* Right Column */}
                  <div className="space-y-4">
                    <div>
                      <label htmlFor="project-description" className="block text-sm font-medium text-gray-700 mb-2">
                        Mô tả <span className="text-red-500">*</span>
                      </label>
                      <textarea
                        id="project-description"
                        rows={8}
                        value={formData.description}
                        onChange={(e) => setFormData({...formData, description: e.target.value})}
                        className="w-full border border-gray-300 rounded-lg px-3 py-2.5 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-colors resize-none"
                        placeholder="Mô tả chi tiết về dự án, tính năng chính, mục tiêu..."
                        required
                      />
                      <p className="mt-1 text-xs text-gray-500">Mô tả chi tiết về dự án và tính năng</p>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label htmlFor="project-status" className="block text-sm font-medium text-gray-700 mb-2">
                          Trạng thái
                        </label>
                        <select
                          id="project-status"
                          value={formData.status}
                          onChange={(e) => setFormData({...formData, status: e.target.value})}
                          className="w-full border border-gray-300 rounded-lg px-3 py-2.5 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-colors"
                        >
                          <option value="draft">Bản nháp</option>
                          <option value="published">Đã xuất bản</option>
                          <option value="archived">Đã lưu trữ</option>
                        </select>
                      </div>

                      <div>
                        <label htmlFor="project-sortOrder" className="block text-sm font-medium text-gray-700 mb-2">
                          Thứ tự sắp xếp
                        </label>
                        <input
                          id="project-sortOrder"
                          type="number"
                          value={formData.sortOrder}
                          onChange={(e) => setFormData({...formData, sortOrder: parseInt(e.target.value) || 0})}
                          className="w-full border border-gray-300 rounded-lg px-3 py-2.5 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-colors"
                          min="0"
                          placeholder="0"
                        />
                      </div>
                    </div>

                    <div className="space-y-3 bg-gray-50 rounded-lg p-4">
                      <h4 className="text-sm font-medium text-gray-700 mb-3">Tùy chọn hiển thị</h4>
                      
                      <div className="flex items-center p-3 bg-white rounded-lg border border-gray-200">
                        <input
                          id="project-featured"
                          type="checkbox"
                          checked={formData.isFeatured}
                          onChange={(e) => setFormData({...formData, isFeatured: e.target.checked})}
                          className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
                        />
                        <div className="ml-3">
                          <label htmlFor="project-featured" className="block text-sm font-medium text-gray-900">
                            Dự án nổi bật
                          </label>
                          <p className="text-xs text-gray-500">Hiển thị ở vị trí ưu tiên</p>
                        </div>
                      </div>

                      <div className="flex items-center p-3 bg-white rounded-lg border border-gray-200">
                        <input
                          id="project-public"
                          type="checkbox"
                          checked={formData.isPublic}
                          onChange={(e) => setFormData({...formData, isPublic: e.target.checked})}
                          className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
                        />
                        <div className="ml-3">
                          <label htmlFor="project-public" className="block text-sm font-medium text-gray-900">
                            Hiển thị công khai
                          </label>
                          <p className="text-xs text-gray-500">Cho phép khách truy cập xem</p>
                        </div>
                      </div>
                    </div>

                    {/* Preview image */}
                    {formData.imageUrl && (
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Xem trước hình ảnh
                        </label>
                        <div className="relative group">
                          <img
                            src={formData.imageUrl}
                            alt="Preview"
                            className="w-full h-40 object-cover rounded-lg border border-gray-200"
                            onError={(e) => {
                              e.target.style.display = 'none';
                            }}
                          />
                          <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-20 transition-all rounded-lg"></div>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </form>
            </div>

            {/* Footer */}
            <div className="modal-footer bg-gray-50/80 px-6 py-4 border-t border-gray-200 backdrop-blur-sm">
              <div className="flex justify-end space-x-3">
                <Button
                  variant="secondary"
                  onClick={onClose}
                  className="px-6 py-2 bg-white border-gray-300 hover:bg-gray-50 transition-colors duration-200"
                >
                  Hủy
                </Button>
                <Button
                  variant="primary"
                  onClick={onSubmit}
                  className="px-6 py-2"
                >
                  {editingProject ? 'Cập nhật' : 'Thêm mới'}
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>,
    document.body
  );
};


const ProjectsManagement = () => {
  const [projects, setProjects] = useState([]);
  const [categories, setCategories] = useState([]);
  const [tags, setTags] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');

  const [showForm, setShowForm] = useState(false);
  const [editingProject, setEditingProject] = useState(null);
  const [showDetailModal, setShowDetailModal] = useState(false);
  const [selectedProject, setSelectedProject] = useState(null);
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    imageUrl: '',
    demoUrl: '',
    sourceUrl: '',
    categoryId: '',
    tagIds: [], // Thay đổi từ tagNames thành tagIds
    isFeatured: false,
    status: 'draft',
    isPublic: true,
    sortOrder: 0
  });

  // Handle creating new tag with enhanced validation and feedback
  const handleCreateNewTag = useCallback(async (tagName) => {
    try {
      const trimmedName = tagName.trim();
      
      // Validation
      if (!trimmedName) {
        throw new Error('Tên tag không được để trống');
      }
      
      if (trimmedName.length < 2) {
        throw new Error('Tên tag phải có ít nhất 2 ký tự');
      }
      
      if (trimmedName.length > 50) {
        throw new Error('Tên tag không được vượt quá 50 ký tự');
      }
      
      // Check if tag already exists
      const existingTag = tags.find(tag => 
        tag.name.toLowerCase() === trimmedName.toLowerCase()
      );
      
      if (existingTag) {
        console.log('Tag already exists, returning existing:', existingTag);
        return existingTag;
      }
      
      console.log('Creating new tag:', trimmedName);
      
      // Call API để tạo tag mới
      const response = await ProjectTagApi.create({ 
        name: trimmedName,
        description: `Công nghệ: ${trimmedName}`,
        isActive: true
      });
      
      if (response && response.data) {
        const newTag = response.data;
        
        // Thêm vào danh sách tags hiện tại
        setTags(prevTags => [...prevTags, newTag]);
        
        // Log success
        console.log('✅ New tag created successfully:', newTag);
        
        // TODO: Show success notification to user
        // showNotification('success', `Tag "${newTag.name}" đã được tạo thành công`);
        
        return newTag;
      } else {
        throw new Error('No data returned from API');
      }
    } catch (error) {
      console.error('❌ Error creating tag:', error);
      
      // Check if it's a validation error
      if (error.message.includes('không được')) {
        // TODO: Show validation error to user
        // showNotification('error', error.message);
        throw error;
      }
      
      // Fallback: tạo tag tạm thời nếu API fail
      const fallbackTag = {
        id: `temp-${Date.now()}`,
        name: tagName.trim(),
        description: `Công nghệ: ${tagName.trim()}`,
        isActive: true,
        createdAt: new Date().toISOString(),
        isTemporary: true // Flag để biết đây là tag tạm thời
      };
      
      // Thêm vào danh sách với warning
      setTags(prevTags => [...prevTags, fallbackTag]);
      console.warn('⚠️ Using fallback tag due to API error:', fallbackTag);
      
      // TODO: Show warning to user
      // showNotification('warning', 'Không thể kết nối server. Tag tạm thời đã được tạo.');
      
      return fallbackTag;
    }
  }, [tags]);

  // Load data on component mount
  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    try {
      setLoading(true);
      console.log('🔄 Loading projects data...');
      
      const [projectsRes, categoriesRes, tagsRes] = await Promise.all([
        ProjectApi.getAll(),
        ProjectCategoryApi.getAll(),
        ProjectTagApi.getAll()
      ]);
      
      console.log('📊 Projects response:', projectsRes);
      console.log('📁 Categories response:', categoriesRes);
      console.log('🏷️ Tags response:', tagsRes);
      
      setProjects(projectsRes.data || []);
      setCategories(categoriesRes.data || []);
      setTags(tagsRes.data || []);
      
      console.log('✅ Data loaded successfully');
    } catch (error) {
      console.error('❌ Error loading data:', error);
      console.error('Error details:', error.response?.data || error.message);
      
      // Set fallback data for testing
      setProjects([]);
      setCategories([]);
      setTags([]);
    } finally {
      setLoading(false);
    }
  };

  const handleEdit = (project) => {
    setEditingProject(project);
    setFormData({
      title: project.title,
      description: project.description,
      imageUrl: project.imageUrl,
      demoUrl: project.demoUrl,
      sourceUrl: project.sourceUrl,
      categoryId: project.category?.id || '',
      tagIds: project.tags?.map(tag => tag.id) || [], // Thay đổi từ tagNames thành tagIds
      isFeatured: project.isFeatured,
      status: project.status,
      isPublic: project.isPublic,
      sortOrder: project.sortOrder
    });
    setShowForm(true);
  };

  // View project detail
  const handleViewProject = (project) => {
    setSelectedProject(project);
    setShowDetailModal(true);
  };

  // Close detail modal
  const handleCloseDetailModal = () => {
    setShowDetailModal(false);
    setSelectedProject(null);
  };

  const handleDelete = async (projectId) => {
    if (window.confirm('Bạn có chắc chắn muốn xóa dự án này?')) {
      try {
        await ProjectApi.delete(projectId);
        await loadData();
      } catch (error) {
        console.error('Error deleting project:', error);
      }
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // Chuyển đổi tagIds thành tagNames để gửi API
      const selectedTags = tags.filter(tag => formData.tagIds.includes(tag.id));
      const tagNames = selectedTags.map(tag => tag.name);
      
      const submitData = {
        ...formData,
        tagNames: tagNames, // Gửi tagNames cho backend
        tagIds: undefined   // Xóa tagIds khỏi request
      };
      
      if (editingProject) {
        await ProjectApi.update(editingProject.id, submitData);
      } else {
        await ProjectApi.create(submitData);
      }
      await loadData();
      resetForm();
    } catch (error) {
      console.error('Error saving project:', error);
    }
  };

  const resetForm = () => {
    setShowForm(false);
    setEditingProject(null);
    setFormData({
      title: '',
      description: '',
      imageUrl: '',
      demoUrl: '',
      sourceUrl: '',
      categoryId: '',
      tagIds: [], // Thay đổi từ tagNames thành tagIds
      isFeatured: false,
      status: 'draft',
      isPublic: true,
      sortOrder: 0
    });
  };

  const handleToggleFeatured = async (projectId, currentStatus) => {
    try {
      await ProjectApi.toggleFeatured(projectId, !currentStatus);
      await loadData();
    } catch (error) {
      console.error('Error toggling featured status:', error);
    }
  };

  // Filter projects
  const filteredProjects = projects.filter(project => {
    const matchesFilter = filter === 'all' || project.status === filter;
    const matchesSearch = project.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         project.description?.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesFilter && matchesSearch;
  });

  if (loading) {
    return <div className="flex justify-center items-center h-64">Loading...</div>;
  }

  const pageActions = (
    <>
      <button
        onClick={() => setShowForm(true)}
        className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
      >
        <PlusIcon className="h-4 w-4 mr-2" />
        Thêm dự án mới
      </button>
    </>
  );

  return (
    <>
      <PageHeader
        title="Quản lý Dự án"
        description="Quản lý portfolio và các dự án cá nhân"
        actions={pageActions}
        className="sticky top-16 z-30"
      />
      
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-6">
        <div className="space-y-6">
          
          
          {/* Search and Filter */}
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4">
            <div className="flex flex-col lg:flex-row gap-4">
              {/* Search input */}
              <div className="relative flex-1">
                <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                  <MagnifyingGlassIcon className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  type="text"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="block w-full rounded-lg border border-gray-300 bg-white py-2.5 pl-10 pr-3 text-sm placeholder-gray-500 focus:border-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-colors"
                  placeholder="Tìm kiếm theo tên hoặc mô tả dự án..."
                />
                {searchTerm && (
                  <button
                    onClick={() => setSearchTerm('')}
                    className="absolute inset-y-0 right-0 flex items-center pr-3 text-gray-400 hover:text-gray-600"
                  >
                    <XMarkIcon className="h-4 w-4" />
                  </button>
                )}
              </div>
              
              {/* Filter options */}
              <div className="flex flex-col sm:flex-row gap-3">
                <select
                  value={filter}
                  onChange={(e) => setFilter(e.target.value)}
                  className="block rounded-lg border border-gray-300 bg-white py-2.5 pl-3 pr-10 text-sm focus:border-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-colors min-w-[140px]"
                >
                  <option value="all">Tất cả trạng thái</option>
                  <option value="published">Đã xuất bản ({projects.filter(p => p.status === 'published').length})</option>
                  <option value="draft">Bản nháp ({projects.filter(p => p.status === 'draft').length})</option>
                  <option value="archived">Đã lưu trữ ({projects.filter(p => p.status === 'archived').length})</option>
                </select>
                
                <button
                  onClick={() => {
                    setSearchTerm('');
                    setFilter('all');
                  }}
                  className="px-4 py-2.5 text-sm font-medium text-gray-700 bg-gray-100 border border-gray-300 rounded-lg hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-gray-500 transition-colors"
                >
                  Xóa bộ lọc
                </button>
              </div>
            </div>
            
            {/* Search results info */}
            {(searchTerm || filter !== 'all') && (
              <div className="mt-3 pt-3 border-t border-gray-200">
                <p className="text-sm text-gray-600">
                  Tìm thấy <span className="font-medium text-gray-900">{filteredProjects.length}</span> dự án
                  {searchTerm && (
                    <> khớp với "<span className="font-medium text-indigo-600">{searchTerm}</span>"</>
                  )}
                  {filter !== 'all' && (
                    <> có trạng thái <span className="font-medium text-indigo-600">
                      {filter === 'published' ? 'đã xuất bản' : 
                       filter === 'draft' ? 'bản nháp' : 'đã lưu trữ'}
                    </span></>
                  )}
                </p>
              </div>
            )}
          </div>

          {/* Stats */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            <div className="bg-white rounded-lg shadow-sm p-6 border border-gray-200">
              <div className="flex items-center">
                <FolderIcon className="h-8 w-8 text-indigo-600" />
                <div className="ml-4">
                  <p className="text-2xl font-bold text-gray-900">{projects.length}</p>
                  <p className="text-sm text-gray-500">Tổng dự án</p>
                </div>
              </div>
            </div>
            <div className="bg-white rounded-lg shadow-sm p-6 border border-gray-200">
              <div className="flex items-center">
                <EyeIcon className="h-8 w-8 text-green-600" />
                <div className="ml-4">
                  <p className="text-2xl font-bold text-gray-900">{projects.filter(p => p.status === 'published').length}</p>
                  <p className="text-sm text-gray-500">Đã xuất bản</p>
                </div>
              </div>
            </div>
            <div className="bg-white rounded-lg shadow-sm p-6 border border-gray-200">
              <div className="flex items-center">
                <PencilIcon className="h-8 w-8 text-yellow-600" />
                <div className="ml-4">
                  <p className="text-2xl font-bold text-gray-900">{projects.filter(p => p.status === 'draft').length}</p>
                  <p className="text-sm text-gray-500">Bản nháp</p>
                </div>
              </div>
            </div>
            <div className="bg-white rounded-lg shadow-sm p-6 border border-gray-200">
              <div className="flex items-center">
                <StarIcon className="h-8 w-8 text-purple-600" />
                <div className="ml-4">
                  <p className="text-2xl font-bold text-gray-900">{projects.filter(p => p.isFeatured).length}</p>
                  <p className="text-sm text-gray-500">Nổi bật</p>
                </div>
              </div>
            </div>
          </div>

          {/* Projects Grid */}
          <div className="min-h-96">
            {filteredProjects.length > 0 ? (
              <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
                {filteredProjects.map((project) => (
                  <div key={project.id} className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden hover:shadow-md transition-shadow duration-200 group">
                    <div className="relative">
                      <img
                        src={project.imageUrl || FALLBACK_IMAGE}
                        alt={project.title}
                        className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
                        onError={(e) => {
                          e.target.src = FALLBACK_IMAGE;
                        }}
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent"></div>
                      
                      {/* Featured badge */}
                      {project.isFeatured && (
                        <div className="absolute top-3 right-3">
                          <div className="flex items-center bg-yellow-400 text-yellow-900 px-2 py-1 rounded-full text-xs font-medium shadow-sm">
                            <StarIconSolid className="h-3 w-3 mr-1" />
                            Nổi bật
                          </div>
                        </div>
                      )}
                      
                      {/* Status badge */}
                      <div className="absolute top-3 left-3">
                        <span className={`inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium shadow-sm ${
                          project.status === 'published' 
                            ? 'bg-green-500 text-white' 
                            : project.status === 'draft'
                            ? 'bg-yellow-500 text-white'
                            : 'bg-gray-500 text-white'
                        }`}>
                          {project.status === 'published' ? 'Đã xuất bản' : 
                           project.status === 'draft' ? 'Bản nháp' : 'Đã lưu trữ'}
                        </span>
                      </div>

                      {/* Quick action overlay */}
                      <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity duration-200 flex items-center justify-center space-x-2">
                        <Button
                          variant="secondary"
                          size="sm"
                          icon={EyeIcon}
                          onClick={() => handleViewProject(project)}
                          className="!bg-white !text-gray-700 hover:!bg-gray-50"
                        >
                          Xem chi tiết
                        </Button>
                      </div>
                    </div>
                    
                    <div className="p-5">
                      {/* Title with better typography */}
                      <div className="mb-3">
                        <h3 className="text-lg font-semibold text-gray-900 mb-1 line-clamp-2 leading-tight" title={project.title}>
                          {project.title}
                        </h3>
                        {project.category && (
                          <span className="text-sm text-indigo-600 font-medium">
                            {project.category.name}
                          </span>
                        )}
                      </div>

                      {/* Description with better line clamping */}
                      <p className="text-gray-600 text-sm mb-4 line-clamp-3 leading-relaxed" title={project.description}>
                        {project.description}
                      </p>
                      
                      {/* Tags with improved layout */}
                      <div className="mb-4">
                        <div className="flex flex-wrap gap-1.5">
                          {project.tags?.slice(0, 4).map((tag) => (
                            <span key={tag.id} className="inline-flex items-center px-2 py-1 rounded-md text-xs font-medium bg-blue-50 text-blue-700 border border-blue-200">
                              {tag.name}
                            </span>
                          ))}
                          {project.tags?.length > 4 && (
                            <span key="more-tags" className="inline-flex items-center px-2 py-1 rounded-md text-xs font-medium bg-gray-50 text-gray-600 border border-gray-200">
                              +{project.tags.length - 4} khác
                            </span>
                          )}
                        </div>
                      </div>

                      {/* Links preview */}
                      {(project.demoUrl || project.sourceUrl) && (
                        <div className="mb-4 flex items-center space-x-3 text-xs">
                          {project.demoUrl && (
                            <a 
                              href={project.demoUrl} 
                              target="_blank" 
                              rel="noopener noreferrer"
                              className="text-green-600 hover:text-green-700 flex items-center"
                              onClick={(e) => e.stopPropagation()}
                            >
                              <EyeIcon className="h-3 w-3 mr-1" />
                              Demo
                            </a>
                          )}
                          {project.sourceUrl && (
                            <a 
                              href={project.sourceUrl} 
                              target="_blank" 
                              rel="noopener noreferrer"
                              className="text-gray-600 hover:text-gray-700 flex items-center"
                              onClick={(e) => e.stopPropagation()}
                            >
                              <FolderIcon className="h-3 w-3 mr-1" />
                              Source
                            </a>
                          )}
                        </div>
                      )}
                      
                      {/* Actions and metadata */}
                      <div className="flex items-center justify-between pt-3 border-t border-gray-100">
                        <div className="flex items-center space-x-2">
                          <button
                            onClick={() => handleEdit(project)}
                            className="p-1.5 text-indigo-600 hover:text-indigo-700 hover:bg-indigo-50 rounded-md transition-colors"
                            title="Chỉnh sửa"
                          >
                            <PencilIcon className="h-4 w-4" />
                          </button>
                          <button
                            onClick={() => handleDelete(project.id)}
                            className="p-1.5 text-red-600 hover:text-red-700 hover:bg-red-50 rounded-md transition-colors"
                            title="Xóa"
                          >
                            <TrashIcon className="h-4 w-4" />
                          </button>
                          <button
                            onClick={() => handleToggleFeatured(project.id, project.isFeatured)}
                            className={`p-1.5 rounded-md transition-colors ${
                              project.isFeatured 
                                ? 'text-yellow-600 hover:text-yellow-700 hover:bg-yellow-50' 
                                : 'text-gray-400 hover:text-yellow-600 hover:bg-yellow-50'
                            }`}
                            title={project.isFeatured ? "Bỏ nổi bật" : "Đánh dấu nổi bật"}
                          >
                            {project.isFeatured ? <StarIconSolid className="h-4 w-4" /> : <StarIcon className="h-4 w-4" />}
                          </button>
                        </div>
                        <div className="text-xs text-gray-500">
                          {new Date(project.updatedAt || project.createdAt).toLocaleDateString('vi-VN')}
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="bg-white rounded-lg border border-gray-200 shadow-sm">
                <div className="text-center py-16">
                  <div className="mx-auto w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mb-4">
                    <FolderIcon className="h-12 w-12 text-gray-400" />
                  </div>
                  
                  {projects.length === 0 ? (
                    <>
                      <h3 className="text-lg font-semibold text-gray-900 mb-2">Chưa có dự án nào</h3>
                      <p className="text-gray-500 mb-6 max-w-md mx-auto">
                        Bắt đầu xây dựng portfolio của bạn bằng cách tạo dự án đầu tiên. 
                        Hiển thị những công việc tuyệt vời bạn đã thực hiện!
                      </p>
                      <button
                        onClick={() => setShowForm(true)}
                        className="inline-flex items-center px-6 py-3 border border-transparent shadow-sm text-base font-medium rounded-lg text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition-colors"
                      >
                        <PlusIcon className="h-5 w-5 mr-2" />
                        Tạo dự án đầu tiên
                      </button>
                    </>
                  ) : (
                    <>
                      <h3 className="text-lg font-semibold text-gray-900 mb-2">Không tìm thấy dự án</h3>
                      <p className="text-gray-500 mb-6 max-w-md mx-auto">
                        Không có dự án nào khớp với bộ lọc hiện tại. 
                        Thử thay đổi từ khóa tìm kiếm hoặc bộ lọc trạng thái.
                      </p>
                      <div className="flex justify-center space-x-3">
                        <button
                          onClick={() => {
                            setSearchTerm('');
                            setFilter('all');
                          }}
                          className="inline-flex items-center px-4 py-2 border border-gray-300 shadow-sm text-sm font-medium rounded-lg text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition-colors"
                        >
                          Xóa bộ lọc
                        </button>
                        <button
                          onClick={() => setShowForm(true)}
                          className="inline-flex items-center px-4 py-2 border border-transparent shadow-sm text-sm font-medium rounded-lg text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition-colors"
                        >
                          <PlusIcon className="h-4 w-4 mr-2" />
                          Thêm dự án mới
                        </button>
                      </div>
                    </>
                  )}
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Project Form Modal */}
        {showForm && (
          <ProjectFormModal
            isOpen={showForm}
            onClose={resetForm}
            onSubmit={handleSubmit}
            editingProject={editingProject}
            formData={formData}
            setFormData={setFormData}
            categories={categories}
            tags={tags}
            handleCreateNewTag={handleCreateNewTag}
          />
        )}

        {/* Project Detail Modal */}
        {showDetailModal && selectedProject && (
          <ProjectDetailModal
            project={selectedProject}
            isOpen={showDetailModal}
            onClose={handleCloseDetailModal}
            onEdit={handleEdit}
            formatDate={(date) => new Date(date).toLocaleDateString('vi-VN')}
          />
        )}
      </div>
    </>
  );
};

export default ProjectsManagement;
