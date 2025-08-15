import React, { useState } from 'react';
import { 
  UserGroupIcon, 
  PlusIcon, 
  PencilIcon, 
  TrashIcon,
  KeyIcon,
  ShieldCheckIcon,
  ClockIcon
} from '@heroicons/react/24/outline';

const AccountsManagement = () => {
  const [users, setUsers] = useState([
    {
      id: 1,
      name: 'Nhật Đinh',
      email: 'admin@nhdinh.dev',
      role: 'admin',
      status: 'active',
      lastLogin: '2025-08-15 10:30',
      avatar: 'https://ui-avatars.com/api/?name=Nhat+Dinh&background=6366f1&color=fff',
      createdAt: '2025-01-01',
      permissions: ['read', 'write', 'delete', 'manage_users', 'manage_settings']
    },
    {
      id: 2,
      name: 'Editor User',
      email: 'editor@nhdinh.dev',
      role: 'editor',
      status: 'active',
      lastLogin: '2025-08-14 16:45',
      avatar: 'https://ui-avatars.com/api/?name=Editor+User&background=10b981&color=fff',
      createdAt: '2025-02-15',
      permissions: ['read', 'write']
    },
    {
      id: 3,
      name: 'Viewer User',
      email: 'viewer@nhdinh.dev',
      role: 'viewer',
      status: 'inactive',
      lastLogin: '2025-08-10 09:15',
      avatar: 'https://ui-avatars.com/api/?name=Viewer+User&background=f59e0b&color=fff',
      createdAt: '2025-03-01',
      permissions: ['read']
    }
  ]);

  const [showForm, setShowForm] = useState(false);
  const [editingUser, setEditingUser] = useState(null);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    role: 'viewer',
    status: 'active',
    permissions: []
  });

  const [showPermissions, setShowPermissions] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);

  const roles = [
    { value: 'admin', label: 'Administrator', color: 'bg-red-100 text-red-800' },
    { value: 'editor', label: 'Editor', color: 'bg-green-100 text-green-800' },
    { value: 'viewer', label: 'Viewer', color: 'bg-yellow-100 text-yellow-800' }
  ];

  const allPermissions = [
    { id: 'read', name: 'Xem nội dung', description: 'Có thể xem tất cả nội dung' },
    { id: 'write', name: 'Chỉnh sửa nội dung', description: 'Có thể tạo và chỉnh sửa nội dung' },
    { id: 'delete', name: 'Xóa nội dung', description: 'Có thể xóa nội dung' },
    { id: 'manage_users', name: 'Quản lý người dùng', description: 'Có thể quản lý tài khoản người dùng' },
    { id: 'manage_settings', name: 'Quản lý cài đặt', description: 'Có thể thay đổi cài đặt hệ thống' },
    { id: 'view_analytics', name: 'Xem thống kê', description: 'Có thể xem báo cáo và thống kê' }
  ];

  const handleEdit = (user) => {
    setEditingUser(user);
    setFormData({
      name: user.name,
      email: user.email,
      role: user.role,
      status: user.status,
      permissions: user.permissions
    });
    setShowForm(true);
  };

  const handleDelete = (userId) => {
    if (window.confirm('Bạn có chắc chắn muốn xóa tài khoản này?')) {
      setUsers(users.filter(u => u.id !== userId));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (editingUser) {
      setUsers(users.map(u => 
        u.id === editingUser.id 
          ? { ...u, ...formData }
          : u
      ));
    } else {
      const newUser = {
        ...formData,
        id: Date.now(),
        avatar: `https://ui-avatars.com/api/?name=${formData.name.replace(' ', '+')}&background=6366f1&color=fff`,
        createdAt: new Date().toISOString().split('T')[0],
        lastLogin: 'Chưa đăng nhập'
      };
      setUsers([...users, newUser]);
    }
    setShowForm(false);
    setEditingUser(null);
    setFormData({
      name: '',
      email: '',
      role: 'viewer',
      status: 'active',
      permissions: []
    });
  };

  const handlePermissionChange = (permissionId) => {
    if (formData.permissions.includes(permissionId)) {
      setFormData({
        ...formData,
        permissions: formData.permissions.filter(p => p !== permissionId)
      });
    } else {
      setFormData({
        ...formData,
        permissions: [...formData.permissions, permissionId]
      });
    }
  };

  const getRoleColor = (role) => {
    const roleConfig = roles.find(r => r.value === role);
    return roleConfig ? roleConfig.color : 'bg-gray-100 text-gray-800';
  };

  const showUserPermissions = (user) => {
    setSelectedUser(user);
    setShowPermissions(true);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Quản lý Tài khoản</h1>
          <p className="text-gray-500">Quản lý người dùng và phân quyền</p>
        </div>
        <button
          onClick={() => setShowForm(true)}
          className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700"
        >
          <PlusIcon className="h-4 w-4 mr-2" />
          Thêm người dùng
        </button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="bg-white rounded-lg shadow-sm p-6 border border-gray-200">
          <div className="flex items-center">
            <UserGroupIcon className="h-8 w-8 text-indigo-600" />
            <div className="ml-4">
              <p className="text-2xl font-bold text-gray-900">{users.length}</p>
              <p className="text-sm text-gray-500">Tổng người dùng</p>
            </div>
          </div>
        </div>
        <div className="bg-white rounded-lg shadow-sm p-6 border border-gray-200">
          <div className="flex items-center">
            <ShieldCheckIcon className="h-8 w-8 text-green-600" />
            <div className="ml-4">
              <p className="text-2xl font-bold text-gray-900">{users.filter(u => u.status === 'active').length}</p>
              <p className="text-sm text-gray-500">Đang hoạt động</p>
            </div>
          </div>
        </div>
        <div className="bg-white rounded-lg shadow-sm p-6 border border-gray-200">
          <div className="flex items-center">
            <KeyIcon className="h-8 w-8 text-red-600" />
            <div className="ml-4">
              <p className="text-2xl font-bold text-gray-900">{users.filter(u => u.role === 'admin').length}</p>
              <p className="text-sm text-gray-500">Quản trị viên</p>
            </div>
          </div>
        </div>
        <div className="bg-white rounded-lg shadow-sm p-6 border border-gray-200">
          <div className="flex items-center">
            <ClockIcon className="h-8 w-8 text-yellow-600" />
            <div className="ml-4">
              <p className="text-2xl font-bold text-gray-900">{users.filter(u => u.status === 'inactive').length}</p>
              <p className="text-sm text-gray-500">Không hoạt động</p>
            </div>
          </div>
        </div>
      </div>

      {/* Users Table */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200">
        <div className="px-6 py-4 border-b border-gray-200">
          <h2 className="text-lg font-semibold text-gray-900">Danh sách người dùng</h2>
        </div>
        <div className="overflow-hidden">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Người dùng
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Vai trò
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Trạng thái
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Đăng nhập cuối
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Thao tác
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {users.map((user) => (
                <tr key={user.id}>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <img className="h-10 w-10 rounded-full" src={user.avatar} alt={user.name} />
                      <div className="ml-4">
                        <div className="text-sm font-medium text-gray-900">{user.name}</div>
                        <div className="text-sm text-gray-500">{user.email}</div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getRoleColor(user.role)}`}>
                      {roles.find(r => r.value === user.role)?.label}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                      user.status === 'active' 
                        ? 'bg-green-100 text-green-800' 
                        : 'bg-gray-100 text-gray-800'
                    }`}>
                      {user.status === 'active' ? 'Hoạt động' : 'Không hoạt động'}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {user.lastLogin}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                    <div className="flex items-center space-x-2">
                      <button
                        onClick={() => showUserPermissions(user)}
                        className="text-purple-600 hover:text-purple-900"
                        title="Xem quyền"
                      >
                        <KeyIcon className="h-4 w-4" />
                      </button>
                      <button
                        onClick={() => handleEdit(user)}
                        className="text-indigo-600 hover:text-indigo-900"
                        title="Chỉnh sửa"
                      >
                        <PencilIcon className="h-4 w-4" />
                      </button>
                      <button
                        onClick={() => handleDelete(user.id)}
                        className="text-red-600 hover:text-red-900"
                        title="Xóa"
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

      {/* User Form Modal */}
      {showForm && (
        <div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full z-50">
          <div className="relative top-20 mx-auto p-5 border w-11/12 md:w-3/4 lg:w-1/2 shadow-lg rounded-md bg-white">
            <div className="mt-3">
              <h2 className="text-lg font-bold text-gray-900 mb-4">
                {editingUser ? 'Chỉnh sửa người dùng' : 'Thêm người dùng mới'}
              </h2>
              
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Họ tên</label>
                  <input
                    type="text"
                    value={formData.name}
                    onChange={(e) => setFormData({...formData, name: e.target.value})}
                    className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-1 focus:ring-indigo-500"
                    required
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Email</label>
                  <input
                    type="email"
                    value={formData.email}
                    onChange={(e) => setFormData({...formData, email: e.target.value})}
                    className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-1 focus:ring-indigo-500"
                    required
                  />
                </div>
                
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Vai trò</label>
                    <select
                      value={formData.role}
                      onChange={(e) => setFormData({...formData, role: e.target.value})}
                      className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-1 focus:ring-indigo-500"
                    >
                      {roles.map((role) => (
                        <option key={role.value} value={role.value}>{role.label}</option>
                      ))}
                    </select>
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Trạng thái</label>
                    <select
                      value={formData.status}
                      onChange={(e) => setFormData({...formData, status: e.target.value})}
                      className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-1 focus:ring-indigo-500"
                    >
                      <option value="active">Hoạt động</option>
                      <option value="inactive">Không hoạt động</option>
                    </select>
                  </div>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Quyền hạn</label>
                  <div className="space-y-2">
                    {allPermissions.map((permission) => (
                      <label key={permission.id} className="flex items-start">
                        <input
                          type="checkbox"
                          checked={formData.permissions.includes(permission.id)}
                          onChange={() => handlePermissionChange(permission.id)}
                          className="rounded border-gray-300 text-indigo-600 focus:ring-indigo-500 mt-1"
                        />
                        <div className="ml-2">
                          <div className="text-sm font-medium text-gray-900">{permission.name}</div>
                          <div className="text-xs text-gray-500">{permission.description}</div>
                        </div>
                      </label>
                    ))}
                  </div>
                </div>
                
                <div className="flex justify-end space-x-3 pt-4">
                  <button
                    type="button"
                    onClick={() => setShowForm(false)}
                    className="px-4 py-2 border border-gray-300 rounded-md text-sm font-medium text-gray-700 hover:bg-gray-50"
                  >
                    Hủy
                  </button>
                  <button
                    type="submit"
                    className="px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700"
                  >
                    {editingUser ? 'Cập nhật' : 'Tạo tài khoản'}
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}

      {/* Permissions Modal */}
      {showPermissions && selectedUser && (
        <div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full z-50">
          <div className="relative top-20 mx-auto p-5 border w-11/12 md:w-1/2 shadow-lg rounded-md bg-white">
            <div className="mt-3">
              <h2 className="text-lg font-bold text-gray-900 mb-4">
                Quyền hạn của {selectedUser.name}
              </h2>
              
              <div className="space-y-3">
                {allPermissions.map((permission) => (
                  <div key={permission.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                    <div>
                      <div className="text-sm font-medium text-gray-900">{permission.name}</div>
                      <div className="text-xs text-gray-500">{permission.description}</div>
                    </div>
                    <div>
                      {selectedUser.permissions.includes(permission.id) ? (
                        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                          Có quyền
                        </span>
                      ) : (
                        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-800">
                          Không có quyền
                        </span>
                      )}
                    </div>
                  </div>
                ))}
              </div>
              
              <div className="flex justify-end mt-6">
                <button
                  onClick={() => setShowPermissions(false)}
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

export default AccountsManagement;
