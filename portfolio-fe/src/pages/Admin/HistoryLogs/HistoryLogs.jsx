import React, { useState } from 'react';
import { 
  ClockIcon, 
  UserIcon, 
  DocumentTextIcon,
  FolderIcon,
  TrashIcon,
  EyeIcon,
  FunnelIcon
} from '@heroicons/react/24/outline';

const HistoryLogs = () => {
  const [logs] = useState([
    {
      id: 1,
      user: 'Nhật Đinh',
      action: 'UPDATE_PROJECT',
      target: 'E-commerce Platform',
      targetType: 'project',
      description: 'Cập nhật thông tin dự án E-commerce Platform',
      timestamp: '2025-08-15 14:30:25',
      ip: '192.168.1.100',
      userAgent: 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36',
      changes: {
        title: { old: 'E-commerce App', new: 'E-commerce Platform' },
        status: { old: 'draft', new: 'published' }
      }
    },
    {
      id: 2,
      user: 'Nhật Đinh',
      action: 'CREATE_BLOG',
      target: 'React Performance Tips',
      targetType: 'blog',
      description: 'Tạo bài viết mới: React Performance Tips',
      timestamp: '2025-08-15 10:15:10',
      ip: '192.168.1.100',
      userAgent: 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36',
      changes: null
    },
    {
      id: 3,
      user: 'Editor User',
      action: 'UPDATE_ABOUT',
      target: 'About Page',
      targetType: 'page',
      description: 'Cập nhật nội dung trang giới thiệu',
      timestamp: '2025-08-14 16:45:33',
      ip: '192.168.1.105',
      userAgent: 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36',
      changes: {
        bio: { old: 'Old bio text...', new: 'New bio text...' }
      }
    },
    {
      id: 4,
      user: 'Nhật Đinh',
      action: 'DELETE_CONTACT',
      target: 'Contact #123',
      targetType: 'contact',
      description: 'Xóa tin nhắn liên hệ spam',
      timestamp: '2025-08-14 09:20:15',
      ip: '192.168.1.100',
      userAgent: 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36',
      changes: null
    },
    {
      id: 5,
      user: 'Nhật Đinh',
      action: 'LOGIN',
      target: 'Admin Dashboard',
      targetType: 'auth',
      description: 'Đăng nhập vào hệ thống quản trị',
      timestamp: '2025-08-14 08:00:00',
      ip: '192.168.1.100',
      userAgent: 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36',
      changes: null
    }
  ]);

  const [filter, setFilter] = useState('all');
  const [selectedLog, setSelectedLog] = useState(null);

  const actionTypes = [
    { value: 'all', label: 'Tất cả', color: 'bg-gray-100 text-gray-800' },
    { value: 'CREATE', label: 'Tạo mới', color: 'bg-green-100 text-green-800' },
    { value: 'UPDATE', label: 'Cập nhật', color: 'bg-blue-100 text-blue-800' },
    { value: 'DELETE', label: 'Xóa', color: 'bg-red-100 text-red-800' },
    { value: 'LOGIN', label: 'Đăng nhập', color: 'bg-purple-100 text-purple-800' }
  ];

  const getActionColor = (action) => {
    if (action.startsWith('CREATE')) return 'bg-green-100 text-green-800';
    if (action.startsWith('UPDATE')) return 'bg-blue-100 text-blue-800';
    if (action.startsWith('DELETE')) return 'bg-red-100 text-red-800';
    if (action === 'LOGIN') return 'bg-purple-100 text-purple-800';
    return 'bg-gray-100 text-gray-800';
  };

  const getTargetIcon = (targetType) => {
    switch (targetType) {
      case 'project': return FolderIcon;
      case 'blog': return DocumentTextIcon;
      case 'contact': return UserIcon;
      case 'auth': return UserIcon;
      default: return DocumentTextIcon;
    }
  };

  const filteredLogs = filter === 'all' 
    ? logs 
    : logs.filter(log => log.action.startsWith(filter));

  const showLogDetails = (log) => {
    setSelectedLog(log);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Lịch sử thay đổi</h1>
          <p className="text-gray-500">Theo dõi tất cả hoạt động trong hệ thống</p>
        </div>
        <div className="flex items-center space-x-3">
          <select
            value={filter}
            onChange={(e) => setFilter(e.target.value)}
            className="border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-1 focus:ring-indigo-500"
          >
            {actionTypes.map((type) => (
              <option key={type.value} value={type.value}>{type.label}</option>
            ))}
          </select>
          <button className="inline-flex items-center px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50">
            <FunnelIcon className="h-4 w-4 mr-2" />
            Bộ lọc
          </button>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-5 gap-6">
        {actionTypes.slice(1).map((type) => (
          <div key={type.value} className="bg-white rounded-lg shadow-sm p-6 border border-gray-200">
            <div className="flex items-center">
              <ClockIcon className="h-8 w-8 text-indigo-600" />
              <div className="ml-4">
                <p className="text-2xl font-bold text-gray-900">
                  {logs.filter(log => log.action.startsWith(type.value)).length}
                </p>
                <p className="text-sm text-gray-500">{type.label}</p>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Activity Timeline */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200">
        <div className="px-6 py-4 border-b border-gray-200">
          <h2 className="text-lg font-semibold text-gray-900">Lịch sử hoạt động</h2>
        </div>
        <div className="p-6">
          <div className="flow-root">
            <ul className="-mb-8">
              {filteredLogs.map((log, logIdx) => {
                const TargetIcon = getTargetIcon(log.targetType);
                return (
                  <li key={log.id}>
                    <div className="relative pb-8">
                      {logIdx !== filteredLogs.length - 1 && (
                        <span
                          className="absolute top-4 left-4 -ml-px h-full w-0.5 bg-gray-200"
                          aria-hidden="true"
                        />
                      )}
                      <div className="relative flex space-x-3">
                        <div className="flex h-8 w-8 items-center justify-center rounded-full bg-gray-100">
                          <TargetIcon className="h-5 w-5 text-gray-600" />
                        </div>
                        <div className="flex min-w-0 flex-1 justify-between space-x-4 pt-1.5">
                          <div>
                            <p className="text-sm text-gray-900">
                              <span className="font-medium">{log.user}</span> {log.description}
                            </p>
                            <div className="mt-2 flex items-center space-x-2">
                              <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getActionColor(log.action)}`}>
                                {log.action.replace('_', ' ')}
                              </span>
                              <span className="text-xs text-gray-500">
                                Target: {log.target}
                              </span>
                            </div>
                          </div>
                          <div className="whitespace-nowrap text-right text-sm text-gray-500">
                            <div>{log.timestamp}</div>
                            <div className="mt-1">
                              <button
                                onClick={() => showLogDetails(log)}
                                className="text-indigo-600 hover:text-indigo-900 text-xs"
                              >
                                <EyeIcon className="h-3 w-3 inline mr-1" />
                                Chi tiết
                              </button>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </li>
                );
              })}
            </ul>
          </div>
        </div>
      </div>

      {/* Log Details Modal */}
      {selectedLog && (
        <div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full z-50">
          <div className="relative top-20 mx-auto p-5 border w-11/12 md:w-3/4 lg:w-1/2 shadow-lg rounded-md bg-white">
            <div className="mt-3">
              <h2 className="text-lg font-bold text-gray-900 mb-4">Chi tiết hoạt động</h2>
              
              <div className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700">Người thực hiện</label>
                    <div className="mt-1 text-sm text-gray-900">{selectedLog.user}</div>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700">Thời gian</label>
                    <div className="mt-1 text-sm text-gray-900">{selectedLog.timestamp}</div>
                  </div>
                </div>
                
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700">Hành động</label>
                    <div className="mt-1">
                      <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getActionColor(selectedLog.action)}`}>
                        {selectedLog.action.replace('_', ' ')}
                      </span>
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700">Đối tượng</label>
                    <div className="mt-1 text-sm text-gray-900">{selectedLog.target}</div>
                  </div>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700">Mô tả</label>
                  <div className="mt-1 text-sm text-gray-900">{selectedLog.description}</div>
                </div>
                
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700">IP Address</label>
                    <div className="mt-1 text-sm text-gray-900">{selectedLog.ip}</div>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700">User Agent</label>
                    <div className="mt-1 text-sm text-gray-900 truncate" title={selectedLog.userAgent}>
                      {selectedLog.userAgent.substring(0, 50)}...
                    </div>
                  </div>
                </div>
                
                {selectedLog.changes && (
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Thay đổi</label>
                    <div className="bg-gray-50 rounded-lg p-4">
                      {Object.entries(selectedLog.changes).map(([field, change]) => (
                        <div key={field} className="mb-2">
                          <div className="text-sm font-medium text-gray-700">{field}:</div>
                          <div className="text-sm text-red-600">- {change.old}</div>
                          <div className="text-sm text-green-600">+ {change.new}</div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
              
              <div className="flex justify-end mt-6">
                <button
                  onClick={() => setSelectedLog(null)}
                  className="px-4 py-2 border border-gray-300 rounded-md text-sm font-medium text-gray-700 hover:bg-gray-50"
                >
                  Đóng
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default HistoryLogs;
