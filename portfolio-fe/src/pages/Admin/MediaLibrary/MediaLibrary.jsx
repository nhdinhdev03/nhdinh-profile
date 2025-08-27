import React, { useState } from 'react';
import { 
  PhotoIcon, 
  DocumentIcon,
  VideoCameraIcon,
  MusicalNoteIcon,
  CloudArrowUpIcon,
  TrashIcon,
  EyeIcon,
  DocumentDuplicateIcon,
  MagnifyingGlassIcon
} from '@heroicons/react/24/outline';
import { AdminCard, Button, PageHeader } from 'components/Admin';

const MediaLibrary = () => {
  const [mediaFiles, setMediaFiles] = useState([
    {
      id: 1,
      name: 'project-screenshot-1.png',
      type: 'image',
      size: '2.5 MB',
      url: '/images/project1.png',
      uploadDate: '2024-01-15',
      dimensions: '1920x1080',
      category: 'projects'
    },
    {
      id: 2,
      name: 'profile-photo.jpg',
      type: 'image',
      size: '1.2 MB',
      url: '/images/profile.jpg',
      uploadDate: '2024-01-14',
      dimensions: '800x800',
      category: 'profile'
    },
    {
      id: 3,
      name: 'resume.pdf',
      type: 'document',
      size: '850 KB',
      url: '/documents/resume.pdf',
      uploadDate: '2024-01-13',
      category: 'documents'
    },
    {
      id: 4,
      name: 'demo-video.mp4',
      type: 'video',
      size: '15.2 MB',
      url: '/videos/demo.mp4',
      uploadDate: '2024-01-12',
      duration: '2:30',
      category: 'projects'
    },
    {
      id: 5,
      name: 'bg-music.mp3',
      type: 'audio',
      size: '4.1 MB',
      url: '/audio/bg-music.mp3',
      uploadDate: '2024-01-11',
      duration: '3:45',
      category: 'audio'
    }
  ]);

  const [selectedFiles, setSelectedFiles] = useState([]);
  const [viewMode, setViewMode] = useState('grid'); // grid, list
  const [filterType, setFilterType] = useState('all');
  const [filterCategory, setFilterCategory] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [showUpload, setShowUpload] = useState(false);

  const handleFileSelect = (fileId) => {
    setSelectedFiles(prev => 
      prev.includes(fileId) 
        ? prev.filter(id => id !== fileId)
        : [...prev, fileId]
    );
  };

  const handleDeleteFiles = () => {
    setMediaFiles(prev => prev.filter(file => !selectedFiles.includes(file.id)));
    setSelectedFiles([]);
  };

  const filteredFiles = mediaFiles.filter(file => {
    const matchesSearch = file.name.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesType = filterType === 'all' || file.type === filterType;
    const matchesCategory = filterCategory === 'all' || file.category === filterCategory;
    
    return matchesSearch && matchesType && matchesCategory;
  });

  const getFileIcon = (type) => {
    const icons = {
      image: PhotoIcon,
      document: DocumentIcon,
      video: VideoCameraIcon,
      audio: MusicalNoteIcon
    };
    return icons[type] || DocumentIcon;
  };

  const getFileTypeColor = (type) => {
    const colors = {
      image: 'text-green-600',
      document: 'text-blue-600',
      video: 'text-purple-600',
      audio: 'text-orange-600'
    };
    return colors[type] || 'text-gray-600';
  };

  // eslint-disable-next-line no-unused-vars
  const formatFileSize = (size) => {
    // Hàm format kích thước file (dự phòng cho tương lai)
    return size;
  };

  const stats = {
    total: mediaFiles.length,
    images: mediaFiles.filter(f => f.type === 'image').length,
    documents: mediaFiles.filter(f => f.type === 'document').length,
    videos: mediaFiles.filter(f => f.type === 'video').length,
    audio: mediaFiles.filter(f => f.type === 'audio').length,
    totalSize: mediaFiles.reduce((acc, file) => acc + parseFloat(file.size), 0).toFixed(1) + ' MB'
  };

  return (
    <div className="space-y-6">
      <PageHeader
        title="Thư viện Media"
        subtitle="Quản lý hình ảnh, video và tài liệu"
        icon={PhotoIcon}
        actions={
          <Button
            variant="primary"
            icon={CloudArrowUpIcon}
            onClick={() => setShowUpload(true)}
          >
            Tải lên
          </Button>
        }
      />

      {/* Statistics */}
      <div className="grid grid-cols-2 md:grid-cols-6 gap-4">
        <AdminCard className="text-center">
          <div className="space-y-2">
            <h3 className="text-xl font-bold text-gray-900">{stats.total}</h3>
            <p className="text-sm text-gray-500">Tổng file</p>
          </div>
        </AdminCard>
        <AdminCard className="text-center">
          <div className="space-y-2">
            <h3 className="text-xl font-bold text-green-600">{stats.images}</h3>
            <p className="text-sm text-gray-500">Hình ảnh</p>
          </div>
        </AdminCard>
        <AdminCard className="text-center">
          <div className="space-y-2">
            <h3 className="text-xl font-bold text-blue-600">{stats.documents}</h3>
            <p className="text-sm text-gray-500">Tài liệu</p>
          </div>
        </AdminCard>
        <AdminCard className="text-center">
          <div className="space-y-2">
            <h3 className="text-xl font-bold text-purple-600">{stats.videos}</h3>
            <p className="text-sm text-gray-500">Video</p>
          </div>
        </AdminCard>
        <AdminCard className="text-center">
          <div className="space-y-2">
            <h3 className="text-xl font-bold text-orange-600">{stats.audio}</h3>
            <p className="text-sm text-gray-500">Audio</p>
          </div>
        </AdminCard>
        <AdminCard className="text-center">
          <div className="space-y-2">
            <h3 className="text-lg font-bold text-gray-900">{stats.totalSize}</h3>
            <p className="text-sm text-gray-500">Dung lượng</p>
          </div>
        </AdminCard>
      </div>

      {/* Filters and Controls */}
      <AdminCard>
        <div className="grid grid-cols-1 md:grid-cols-6 gap-4 items-end">
          <div className="relative">
            <MagnifyingGlassIcon className="h-4 w-4 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              placeholder="Tìm kiếm file..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10 w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
            />
          </div>
          
          <select
            value={filterType}
            onChange={(e) => setFilterType(e.target.value)}
            className="rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
          >
            <option value="all">Tất cả loại</option>
            <option value="image">Hình ảnh</option>
            <option value="document">Tài liệu</option>
            <option value="video">Video</option>
            <option value="audio">Audio</option>
          </select>

          <select
            value={filterCategory}
            onChange={(e) => setFilterCategory(e.target.value)}
            className="rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
          >
            <option value="all">Tất cả danh mục</option>
            <option value="projects">Dự án</option>
            <option value="profile">Hồ sơ</option>
            <option value="documents">Tài liệu</option>
            <option value="audio">Audio</option>
          </select>

          <div className="flex space-x-2">
            <button
              onClick={() => setViewMode('grid')}
              className={`p-2 rounded-md ${viewMode === 'grid' ? 'bg-indigo-100 text-indigo-600' : 'text-gray-400 hover:text-gray-600'}`}
            >
              <div className="w-4 h-4 grid grid-cols-2 gap-0.5">
                <div className="bg-current rounded-sm"></div>
                <div className="bg-current rounded-sm"></div>
                <div className="bg-current rounded-sm"></div>
                <div className="bg-current rounded-sm"></div>
              </div>
            </button>
            <button
              onClick={() => setViewMode('list')}
              className={`p-2 rounded-md ${viewMode === 'list' ? 'bg-indigo-100 text-indigo-600' : 'text-gray-400 hover:text-gray-600'}`}
            >
              <div className="w-4 h-4 space-y-1">
                <div className="h-0.5 bg-current rounded"></div>
                <div className="h-0.5 bg-current rounded"></div>
                <div className="h-0.5 bg-current rounded"></div>
                <div className="h-0.5 bg-current rounded"></div>
              </div>
            </button>
          </div>

          {selectedFiles.length > 0 && (
            <div className="flex space-x-2">
              <Button
                variant="danger"
                size="sm"
                icon={TrashIcon}
                onClick={handleDeleteFiles}
              >
                Xóa ({selectedFiles.length})
              </Button>
            </div>
          )}

          <Button 
            variant="secondary"
            onClick={() => {
              setSearchTerm('');
              setFilterType('all');
              setFilterCategory('all');
              setSelectedFiles([]);
            }}
          >
            Đặt lại
          </Button>
        </div>
      </AdminCard>

      {/* Upload Area */}
      {showUpload && (
        <AdminCard
          title="Tải lên file mới"
          actions={
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setShowUpload(false)}
            >
              Đóng
            </Button>
          }
        >
          <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center">
            <CloudArrowUpIcon className="h-12 w-12 text-gray-400 mx-auto mb-4" />
            <p className="text-lg font-medium text-gray-900 mb-2">Kéo thả file vào đây hoặc</p>
            <Button variant="primary">Chọn file</Button>
            <p className="text-sm text-gray-500 mt-2">
              Hỗ trợ: PNG, JPG, GIF, PDF, MP4, MP3 (tối đa 50MB)
            </p>
          </div>
        </AdminCard>
      )}

      {/* Media Grid/List */}
      <AdminCard title={`File media (${filteredFiles.length})`}>
        {viewMode === 'grid' ? (
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
            {filteredFiles.map((file) => {
              const FileIcon = getFileIcon(file.type);
              const isSelected = selectedFiles.includes(file.id);
              
              return (
                <div
                  key={file.id}
                  className={`relative border-2 rounded-lg p-4 cursor-pointer transition-all ${
                    isSelected ? 'border-indigo-500 bg-indigo-50' : 'border-gray-200 hover:border-gray-300'
                  }`}
                  onClick={() => handleFileSelect(file.id)}
                >
                  <div className="text-center space-y-2">
                    {file.type === 'image' ? (
                      <div className="w-full h-24 bg-gray-100 rounded-lg flex items-center justify-center">
                        <img 
                          src={file.url} 
                          alt={file.name}
                          className="max-w-full max-h-full object-cover rounded"
                          onError={(e) => {
                            e.target.style.display = 'none';
                            e.target.nextSibling.style.display = 'flex';
                          }}
                        />
                        <PhotoIcon className="h-8 w-8 text-gray-400 hidden" />
                      </div>
                    ) : (
                      <div className="w-full h-24 bg-gray-100 rounded-lg flex items-center justify-center">
                        <FileIcon className={`h-8 w-8 ${getFileTypeColor(file.type)}`} />
                      </div>
                    )}
                    
                    <div>
                      <h4 className="text-sm font-medium text-gray-900 truncate" title={file.name}>
                        {file.name}
                      </h4>
                      <p className="text-xs text-gray-500">{file.size}</p>
                      {file.dimensions && (
                        <p className="text-xs text-gray-400">{file.dimensions}</p>
                      )}
                      {file.duration && (
                        <p className="text-xs text-gray-400">{file.duration}</p>
                      )}
                    </div>
                  </div>

                  <div className="absolute top-2 right-2 flex space-x-1">
                    <button className="p-1 bg-white rounded-full shadow-sm hover:bg-gray-50">
                      <EyeIcon className="h-3 w-3 text-gray-600" />
                    </button>
                    <button className="p-1 bg-white rounded-full shadow-sm hover:bg-gray-50">
                      <DocumentDuplicateIcon className="h-3 w-3 text-gray-600" />
                    </button>
                  </div>

                  {isSelected && (
                    <div className="absolute top-2 left-2">
                      <div className="w-5 h-5 bg-indigo-600 rounded-full flex items-center justify-center">
                        <svg className="w-3 h-3 text-white" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                        </svg>
                      </div>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        ) : (
          <div className="space-y-2">
            {filteredFiles.map((file) => {
              const FileIcon = getFileIcon(file.type);
              const isSelected = selectedFiles.includes(file.id);
              
              return (
                <div
                  key={file.id}
                  className={`flex items-center space-x-4 p-3 rounded-lg cursor-pointer transition-all ${
                    isSelected ? 'bg-indigo-50 border border-indigo-200' : 'hover:bg-gray-50'
                  }`}
                  onClick={() => handleFileSelect(file.id)}
                >
                  <div className="flex-shrink-0">
                    <FileIcon className={`h-8 w-8 ${getFileTypeColor(file.type)}`} />
                  </div>
                  
                  <div className="flex-1 min-w-0">
                    <h4 className="text-sm font-medium text-gray-900 truncate">{file.name}</h4>
                    <div className="flex items-center space-x-4 text-xs text-gray-500">
                      <span>{file.size}</span>
                      <span>{file.uploadDate}</span>
                      <span className="capitalize">{file.category}</span>
                      {file.dimensions && <span>{file.dimensions}</span>}
                      {file.duration && <span>{file.duration}</span>}
                    </div>
                  </div>

                  <div className="flex items-center space-x-2">
                    <button className="p-1 text-gray-400 hover:text-gray-600">
                      <EyeIcon className="h-4 w-4" />
                    </button>
                    <button className="p-1 text-gray-400 hover:text-gray-600">
                      <DocumentDuplicateIcon className="h-4 w-4" />
                    </button>
                    <button className="p-1 text-gray-400 hover:text-red-600">
                      <TrashIcon className="h-4 w-4" />
                    </button>
                  </div>

                  {isSelected && (
                    <div className="flex-shrink-0">
                      <div className="w-5 h-5 bg-indigo-600 rounded-full flex items-center justify-center">
                        <svg className="w-3 h-3 text-white" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                        </svg>
                      </div>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        )}

        {filteredFiles.length === 0 && (
          <div className="text-center py-12">
            <PhotoIcon className="h-12 w-12 text-gray-300 mx-auto mb-4" />
            <p className="text-gray-500">Không có file nào phù hợp với bộ lọc</p>
          </div>
        )}
      </AdminCard>
    </div>
  );
};

export default MediaLibrary;
