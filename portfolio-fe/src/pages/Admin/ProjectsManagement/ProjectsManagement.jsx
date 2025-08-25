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
  XMarkIcon
} from '@heroicons/react/24/outline';
import { StarIcon as StarIconSolid } from '@heroicons/react/24/solid';

import { ProjectApi, ProjectCategoryApi, ProjectTagApi } from 'api/admin';
import { PageHeader, Button } from 'components/Admin';

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
                      src={project.imageUrl || 'https://via.placeholder.com/400x200'}
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
                        className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                        placeholder="Nhập tên dự án"
                        required
                      />
                    </div>
                    
                    <div>
                      <label htmlFor="project-category" className="block text-sm font-medium text-gray-700 mb-2">
                        Danh mục <span className="text-red-500">*</span>
                      </label>
                      <select
                        id="project-category"
                        value={formData.categoryId}
                        onChange={(e) => setFormData({...formData, categoryId: e.target.value})}
                        className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                        required
                      >
                        <option value="">Chọn danh mục</option>
                        {categories.map(category => (
                          <option key={category.id} value={category.id}>{category.name}</option>
                        ))}
                      </select>
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
                        className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                        placeholder="https://example.com/image.jpg"
                      />
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
                        className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                        placeholder="https://demo.example.com"
                      />
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
                        className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                        placeholder="https://github.com/user/repo"
                      />
                    </div>
                  </div>

                  {/* Right Column */}
                  <div className="space-y-4">
                    <div>
                      <label htmlFor="project-description" className="block text-sm font-medium text-gray-700 mb-2">
                        Mô tả <span className="text-red-500">*</span>
                      </label>
                      <textarea
                        id="project-description"
                        rows={6}
                        value={formData.description}
                        onChange={(e) => setFormData({...formData, description: e.target.value})}
                        className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                        placeholder="Mô tả chi tiết về dự án..."
                        required
                      />
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
                          className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
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
                          className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                          min="0"
                        />
                      </div>
                    </div>

                    <div className="space-y-3">
                      <div className="flex items-center">
                        <input
                          id="project-featured"
                          type="checkbox"
                          checked={formData.isFeatured}
                          onChange={(e) => setFormData({...formData, isFeatured: e.target.checked})}
                          className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
                        />
                        <label htmlFor="project-featured" className="ml-2 block text-sm text-gray-900">
                          Dự án nổi bật
                        </label>
                      </div>

                      <div className="flex items-center">
                        <input
                          id="project-public"
                          type="checkbox"
                          checked={formData.isPublic}
                          onChange={(e) => setFormData({...formData, isPublic: e.target.checked})}
                          className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
                        />
                        <label htmlFor="project-public" className="ml-2 block text-sm text-gray-900">
                          Hiển thị công khai
                        </label>
                      </div>
                    </div>

                    {/* Preview image */}
                    {formData.imageUrl && (
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Xem trước hình ảnh
                        </label>
                        <img
                          src={formData.imageUrl}
                          alt="Preview"
                          className="w-full h-32 object-cover rounded-md border"
                          onError={(e) => {
                            e.target.style.display = 'none';
                          }}
                        />
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
    tagNames: [],
    isFeatured: false,
    status: 'draft',
    isPublic: true,
    sortOrder: 0
  });

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
      tagNames: project.tags?.map(tag => tag.name) || [],
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
      if (editingProject) {
        await ProjectApi.update(editingProject.id, formData);
      } else {
        await ProjectApi.create(formData);
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
      tagNames: [],
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
        Thêm dự án
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
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="relative flex-1">
              <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                <MagnifyingGlassIcon className="h-5 w-5 text-gray-400" />
              </div>
              <input
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="block w-full rounded-md border border-gray-300 bg-white py-2 pl-10 pr-3 text-sm placeholder-gray-500 focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500"
                placeholder="Tìm kiếm dự án..."
              />
            </div>
            <select
              value={filter}
              onChange={(e) => setFilter(e.target.value)}
              className="block rounded-md border border-gray-300 bg-white py-2 pl-3 pr-10 text-sm focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500"
            >
              <option value="all">Tất cả</option>
              <option value="published">Đã xuất bản</option>
              <option value="draft">Bản nháp</option>
              <option value="archived">Đã lưu trữ</option>
            </select>
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
                  <div key={project.id} className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
                    <div className="relative">
                      <img
                        src={project.imageUrl || 'https://via.placeholder.com/400x200'}
                        alt={project.title}
                        className="w-full h-48 object-cover"
                      />
                      {project.isFeatured && (
                        <div className="absolute top-2 right-2">
                          <StarIconSolid className="h-6 w-6 text-yellow-400" />
                        </div>
                      )}
                      <div className="absolute top-2 left-2">
                        <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                          project.status === 'published' 
                            ? 'bg-green-100 text-green-800' 
                            : project.status === 'draft'
                            ? 'bg-yellow-100 text-yellow-800'
                            : 'bg-gray-100 text-gray-800'
                        }`}>
                          {project.status === 'published' ? 'Đã xuất bản' : 
                           project.status === 'draft' ? 'Bản nháp' : 'Đã lưu trữ'}
                        </span>
                      </div>
                    </div>
                    
                    <div className="p-6">
                      <h3 className="text-lg font-semibold text-gray-900 mb-2">{project.title}</h3>
                      <p className="text-gray-600 text-sm mb-4 line-clamp-2">{project.description}</p>
                      
                      <div className="flex flex-wrap gap-2 mb-4">
                        {project.tags?.slice(0, 3).map((tag) => (
                          <span key={tag.id} className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                            {tag.name}
                          </span>
                        ))}
                        {project.tags?.length > 3 && (
                          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-800">
                            +{project.tags.length - 3}
                          </span>
                        )}
                      </div>
                      
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-2">
                          <Button
                            variant="secondary"
                            size="sm"
                            icon={EyeIcon}
                            onClick={() => handleViewProject(project)}
                            className="!px-2 !py-1"
                          >
                            Xem
                          </Button>
                          <button
                            onClick={() => handleEdit(project)}
                            className="text-indigo-600 hover:text-indigo-900 text-sm"
                          >
                            <PencilIcon className="h-4 w-4" />
                          </button>
                          <button
                            onClick={() => handleDelete(project.id)}
                            className="text-red-600 hover:text-red-900 text-sm"
                          >
                            <TrashIcon className="h-4 w-4" />
                          </button>
                          <button
                            onClick={() => handleToggleFeatured(project.id, project.isFeatured)}
                            className={`text-sm ${project.isFeatured ? 'text-yellow-600' : 'text-gray-400'}`}
                          >
                            <StarIcon className="h-4 w-4" />
                          </button>
                        </div>
                        <div className="text-xs text-gray-500">
                          {new Date(project.updatedAt || project.createdAt).toLocaleDateString()}
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-12">
                <FolderIcon className="mx-auto h-12 w-12 text-gray-400" />
                <h3 className="mt-2 text-sm font-semibold text-gray-900">Chưa có dự án nào</h3>
                <p className="mt-1 text-sm text-gray-500">
                  {projects.length === 0 
                    ? 'Bắt đầu bằng cách tạo dự án đầu tiên của bạn.' 
                    : 'Không tìm thấy dự án nào khớp với bộ lọc hiện tại.'
                  }
                </p>
                <div className="mt-6">
                  <button
                    onClick={() => setShowForm(true)}
                    className="inline-flex items-center px-4 py-2 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                  >
                    <PlusIcon className="h-4 w-4 mr-2" />
                    Tạo dự án đầu tiên
                  </button>
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
