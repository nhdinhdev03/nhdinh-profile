import React from 'react';
import { useAuth } from '../../../contexts/AuthContext';
import { motion } from 'framer-motion';
import { LogOut, User, Shield, Settings } from 'lucide-react';

const AdminDashboard = () => {
  const { user, logout } = useAuth();

  const handleLogout = async () => {
    await logout();
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-900 via-purple-900 to-pink-900">
      {/* Header */}
      <header className="bg-white/10 backdrop-blur-lg border-b border-white/20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            <div className="flex items-center">
              <Shield size={32} className="text-white mr-3" />
              <h1 className="text-2xl font-bold text-white">Admin Dashboard</h1>
            </div>
            
            <div className="flex items-center space-x-4">
              <div className="text-white">
                <p className="text-sm opacity-80">Xin chào,</p>
                <p className="font-semibold">{user?.fullName}</p>
              </div>
              <button
                onClick={handleLogout}
                className="flex items-center px-4 py-2 bg-red-500/20 text-white rounded-lg hover:bg-red-500/30 transition-colors"
              >
                <LogOut size={16} className="mr-2" />
                Đăng xuất
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          {/* Welcome Card */}
          <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-8 shadow-2xl border border-white/20 mb-8">
            <div className="flex items-center mb-6">
              <User size={24} className="text-white mr-3" />
              <h2 className="text-xl font-bold text-white">Thông tin tài khoản</h2>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">ID</label>
                <p className="text-white bg-white/10 p-3 rounded-lg">{user?.id}</p>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">Số điện thoại</label>
                <p className="text-white bg-white/10 p-3 rounded-lg">{user?.phoneNumber}</p>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">Tên đăng nhập</label>
                <p className="text-white bg-white/10 p-3 rounded-lg">{user?.username}</p>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">Họ tên</label>
                <p className="text-white bg-white/10 p-3 rounded-lg">{user?.fullName}</p>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">Vai trò</label>
                <p className="text-white bg-white/10 p-3 rounded-lg">
                  {user?.roles?.join(', ') || 'ROLE_ADMIN'}
                </p>
              </div>
            </div>
          </div>

          {/* Quick Actions */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <motion.div
              whileHover={{ scale: 1.02 }}
              className="bg-white/10 backdrop-blur-lg rounded-xl p-6 shadow-xl border border-white/20 cursor-pointer"
            >
              <Settings size={32} className="text-blue-400 mb-4" />
              <h3 className="text-lg font-semibold text-white mb-2">Cài đặt</h3>
              <p className="text-gray-300">Quản lý cài đặt hệ thống</p>
            </motion.div>

            <motion.div
              whileHover={{ scale: 1.02 }}
              className="bg-white/10 backdrop-blur-lg rounded-xl p-6 shadow-xl border border-white/20 cursor-pointer"
            >
              <User size={32} className="text-green-400 mb-4" />
              <h3 className="text-lg font-semibold text-white mb-2">Người dùng</h3>
              <p className="text-gray-300">Quản lý tài khoản người dùng</p>
            </motion.div>

            <motion.div
              whileHover={{ scale: 1.02 }}
              className="bg-white/10 backdrop-blur-lg rounded-xl p-6 shadow-xl border border-white/20 cursor-pointer"
            >
              <Shield size={32} className="text-purple-400 mb-4" />
              <h3 className="text-lg font-semibold text-white mb-2">Bảo mật</h3>
              <p className="text-gray-300">Cài đặt bảo mật hệ thống</p>
            </motion.div>
          </div>

          {/* Status */}
          <div className="mt-8 bg-green-500/20 border border-green-500/30 rounded-lg p-4">
            <div className="flex items-center">
              <div className="w-3 h-3 bg-green-500 rounded-full mr-3 animate-pulse"></div>
              <p className="text-green-400 font-medium">Đăng nhập thành công! Chào mừng bạn đến với Admin Dashboard.</p>
            </div>
          </div>
        </motion.div>
      </main>
    </div>
  );
};

export default AdminDashboard;
