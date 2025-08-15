import React, { useState } from 'react';
import { 
  PlusIcon, 
  PencilIcon, 
  TrashIcon,
  EyeIcon
} from '@heroicons/react/24/outline';

const HomeManagement = () => {
  const [heroSection, setHeroSection] = useState({
    title: 'Xin chào, tôi là Nhật Đinh',
    subtitle: 'Full Stack Developer',
    description: 'Passionate về việc tạo ra những ứng dụng web hiện đại và hiệu quả',
    backgroundImage: '/static/media/hero-bg.jpg'
  });

  const [sections] = useState([
    { id: 1, name: 'Hero Section', type: 'hero', status: 'active', lastModified: '2025-08-15' },
    { id: 2, name: 'About Preview', type: 'about', status: 'active', lastModified: '2025-08-14' },
    { id: 3, name: 'Projects Showcase', type: 'projects', status: 'active', lastModified: '2025-08-13' },
    { id: 4, name: 'Skills Section', type: 'skills', status: 'active', lastModified: '2025-08-12' },
    { id: 5, name: 'Contact CTA', type: 'contact', status: 'active', lastModified: '2025-08-11' },
  ]);

  const handleEdit = (section) => {
    console.log('Edit section:', section);
  };

  const handleDelete = (sectionId) => {
    console.log('Delete section:', sectionId);
  };

  const handlePreview = () => {
    window.open('/', '_blank');
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Quản lý Trang chủ</h1>
          <p className="text-gray-500">Quản lý nội dung và layout của trang chủ</p>
        </div>
        <div className="flex items-center space-x-3">
          <button
            onClick={handlePreview}
            className="inline-flex items-center px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50"
          >
            <EyeIcon className="h-4 w-4 mr-2" />
            Xem trước
          </button>
          <button className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700">
            <PlusIcon className="h-4 w-4 mr-2" />
            Thêm Section
          </button>
        </div>
      </div>

      {/* Hero Section Editor */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200">
        <div className="px-6 py-4 border-b border-gray-200">
          <h2 className="text-lg font-semibold text-gray-900">Hero Section</h2>
        </div>
        <div className="p-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Tiêu đề chính
                </label>
                <input
                  type="text"
                  value={heroSection.title}
                  onChange={(e) => setHeroSection({...heroSection, title: e.target.value})}
                  className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-1 focus:ring-indigo-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Phụ đề
                </label>
                <input
                  type="text"
                  value={heroSection.subtitle}
                  onChange={(e) => setHeroSection({...heroSection, subtitle: e.target.value})}
                  className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-1 focus:ring-indigo-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Mô tả
                </label>
                <textarea
                  rows={3}
                  value={heroSection.description}
                  onChange={(e) => setHeroSection({...heroSection, description: e.target.value})}
                  className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-1 focus:ring-indigo-500"
                />
              </div>
            </div>
            <div className="bg-gray-50 rounded-lg p-6">
              <h3 className="text-sm font-medium text-gray-700 mb-3">Xem trước</h3>
              <div className="bg-gradient-to-r from-indigo-600 to-purple-600 rounded-lg p-6 text-white">
                <h1 className="text-2xl font-bold mb-2">{heroSection.title}</h1>
                <h2 className="text-lg font-semibold mb-3">{heroSection.subtitle}</h2>
                <p className="text-sm opacity-90">{heroSection.description}</p>
              </div>
            </div>
          </div>
          <div className="mt-6 flex justify-end">
            <button className="px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700">
              Lưu thay đổi
            </button>
          </div>
        </div>
      </div>

      {/* Sections Management */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200">
        <div className="px-6 py-4 border-b border-gray-200">
          <h2 className="text-lg font-semibold text-gray-900">Các Section trang chủ</h2>
        </div>
        <div className="overflow-hidden">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Section
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Loại
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Trạng thái
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Cập nhật cuối
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Thao tác
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {sections.map((section) => (
                <tr key={section.id}>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm font-medium text-gray-900">{section.name}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                      {section.type}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                      {section.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {section.lastModified}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                    <div className="flex items-center space-x-2">
                      <button
                        onClick={() => handleEdit(section)}
                        className="text-indigo-600 hover:text-indigo-900"
                      >
                        <PencilIcon className="h-4 w-4" />
                      </button>
                      <button
                        onClick={() => handleDelete(section.id)}
                        className="text-red-600 hover:text-red-900"
                      >
                        <TrashIcon className="h-4 w-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default HomeManagement;
