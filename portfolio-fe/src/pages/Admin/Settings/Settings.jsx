import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  CogIcon, 
  UserIcon, 
  BellIcon, 
  ShieldCheckIcon,
  ServerIcon
} from '@heroicons/react/24/outline';
import { 
  AdminCard, 
  Button, 
  Input, 
  Textarea, 
  Select, 
  useToast,
  ConfirmModal 
} from '../../../components/Admin';

const Settings = () => {
  const { addToast } = useToast();
  const [showResetModal, setShowResetModal] = useState(false);
  const [settings, setSettings] = useState({
    siteName: 'Portfolio Admin',
    siteDescription: 'Quản lý portfolio cá nhân',
    adminEmail: 'admin@nhdinh.com',
    timezone: 'Asia/Ho_Chi_Minh',
    language: 'vi',
    theme: 'light',
    notificationsEnabled: true,
    emailNotifications: true,
    twoFactorAuth: false,
    backupFrequency: 'daily',
    maintenanceMode: false
  });

  const settingsSections = [
    {
      id: 'general',
      title: 'Cài đặt chung',
      icon: CogIcon,
      description: 'Cấu hình cơ bản của hệ thống'
    },
    {
      id: 'account',
      title: 'Tài khoản',
      icon: UserIcon,
      description: 'Thông tin tài khoản và bảo mật'
    },
    {
      id: 'notifications',
      title: 'Thông báo',
      icon: BellIcon,
      description: 'Cấu hình thông báo và email'
    },
    {
      id: 'security',
      title: 'Bảo mật',
      icon: ShieldCheckIcon,
      description: 'Cài đặt bảo mật và quyền truy cập'
    },
    {
      id: 'system',
      title: 'Hệ thống',
      icon: ServerIcon,
      description: 'Cấu hình hệ thống và hiệu suất'
    }
  ];

  const [activeSection, setActiveSection] = useState('general');

  const handleSettingChange = (key, value) => {
    setSettings(prev => ({
      ...prev,
      [key]: value
    }));
  };

  const handleSave = () => {
    // Simulate API call
    setTimeout(() => {
      addToast({
        type: 'success',
        title: 'Thành công',
        message: 'Cài đặt đã được lưu thành công!'
      });
    }, 1000);
  };

  const handleReset = () => {
    setSettings({
      siteName: 'Portfolio Admin',
      siteDescription: 'Quản lý portfolio cá nhân',
      adminEmail: 'admin@nhdinh.com',
      timezone: 'Asia/Ho_Chi_Minh',
      language: 'vi',
      theme: 'light',
      notificationsEnabled: true,
      emailNotifications: true,
      twoFactorAuth: false,
      backupFrequency: 'daily',
      maintenanceMode: false
    });
    setShowResetModal(false);
    addToast({
      type: 'success',
      title: 'Đã reset',
      message: 'Tất cả cài đặt đã được khôi phục về mặc định'
    });
  };

  const renderGeneralSettings = () => (
    <div className="space-y-6">
      <Input
        label="Tên trang web"
        value={settings.siteName}
        onChange={(e) => handleSettingChange('siteName', e.target.value)}
        placeholder="Nhập tên trang web"
      />
      
      <Textarea
        label="Mô tả trang web"
        value={settings.siteDescription}
        onChange={(e) => handleSettingChange('siteDescription', e.target.value)}
        placeholder="Nhập mô tả trang web"
        rows={3}
      />

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Select
          label="Múi giờ"
          value={settings.timezone}
          onChange={(e) => handleSettingChange('timezone', e.target.value)}
          options={[
            { value: 'Asia/Ho_Chi_Minh', label: 'Việt Nam (UTC+7)' },
            { value: 'Asia/Tokyo', label: 'Tokyo (UTC+9)' },
            { value: 'Europe/London', label: 'London (UTC+0)' },
            { value: 'America/New_York', label: 'New York (UTC-5)' }
          ]}
        />

        <Select
          label="Ngôn ngữ"
          value={settings.language}
          onChange={(e) => handleSettingChange('language', e.target.value)}
          options={[
            { value: 'vi', label: 'Tiếng Việt' },
            { value: 'en', label: 'English' },
            { value: 'ja', label: '日本語' }
          ]}
        />
      </div>
    </div>
  );

  const renderAccountSettings = () => (
    <div className="space-y-6">
      <Input
        label="Email quản trị"
        type="email"
        value={settings.adminEmail}
        onChange={(e) => handleSettingChange('adminEmail', e.target.value)}
        placeholder="admin@example.com"
      />

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Input
          label="Mật khẩu mới"
          type="password"
          placeholder="Để trống nếu không muốn thay đổi"
        />

        <Input
          label="Xác nhận mật khẩu"
          type="password"
          placeholder="Nhập lại mật khẩu mới"
        />
      </div>

      <div className="border-t pt-6">
        <label className="flex items-center space-x-3">
          <input
            type="checkbox"
            checked={settings.twoFactorAuth}
            onChange={(e) => handleSettingChange('twoFactorAuth', e.target.checked)}
            className="w-4 h-4 text-indigo-600 border-gray-300 rounded focus:ring-indigo-500"
          />
          <div>
            <span className="text-sm font-medium text-gray-900">
              Xác thực hai yếu tố (2FA)
            </span>
            <p className="text-sm text-gray-500">
              Tăng cường bảo mật cho tài khoản của bạn
            </p>
          </div>
        </label>
      </div>
    </div>
  );

  const renderNotificationSettings = () => (
    <div className="space-y-6">
      <div className="space-y-4">
        <label className="flex items-center space-x-3">
          <input
            type="checkbox"
            checked={settings.notificationsEnabled}
            onChange={(e) => handleSettingChange('notificationsEnabled', e.target.checked)}
            className="w-4 h-4 text-indigo-600 border-gray-300 rounded focus:ring-indigo-500"
          />
          <div>
            <span className="text-sm font-medium text-gray-900">
              Bật thông báo
            </span>
            <p className="text-sm text-gray-500">
              Nhận thông báo trong ứng dụng
            </p>
          </div>
        </label>

        <label className="flex items-center space-x-3">
          <input
            type="checkbox"
            checked={settings.emailNotifications}
            onChange={(e) => handleSettingChange('emailNotifications', e.target.checked)}
            className="w-4 h-4 text-indigo-600 border-gray-300 rounded focus:ring-indigo-500"
          />
          <div>
            <span className="text-sm font-medium text-gray-900">
              Thông báo qua email
            </span>
            <p className="text-sm text-gray-500">
              Nhận thông báo quan trọng qua email
            </p>
          </div>
        </label>
      </div>
    </div>
  );

  const renderSecuritySettings = () => (
    <div className="space-y-6">
      <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
        <div className="flex">
          <ShieldCheckIcon className="w-5 h-5 text-yellow-600 mt-0.5" />
          <div className="ml-3">
            <h3 className="text-sm font-medium text-yellow-800">
              Cảnh báo bảo mật
            </h3>
            <p className="text-sm text-yellow-700 mt-1">
              Hãy đảm bảo sử dụng mật khẩu mạnh và bật xác thực hai yếu tố.
            </p>
          </div>
        </div>
      </div>

      <div className="space-y-4">
        <h4 className="text-sm font-medium text-gray-900">Phiên đăng nhập</h4>
        <div className="bg-gray-50 rounded-lg p-4">
          <div className="flex justify-between items-center">
            <div>
              <p className="text-sm font-medium text-gray-900">Phiên hiện tại</p>
              <p className="text-sm text-gray-500">Windows • Chrome • 192.168.1.1</p>
            </div>
            <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
              Đang hoạt động
            </span>
          </div>
        </div>
      </div>

      <Button variant="danger" size="sm">
        Đăng xuất tất cả thiết bị khác
      </Button>
    </div>
  );

  const renderSystemSettings = () => (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Select
          label="Tần suất sao lưu"
          value={settings.backupFrequency}
          onChange={(e) => handleSettingChange('backupFrequency', e.target.value)}
          options={[
            { value: 'daily', label: 'Hàng ngày' },
            { value: 'weekly', label: 'Hàng tuần' },
            { value: 'monthly', label: 'Hàng tháng' },
            { value: 'manual', label: 'Thủ công' }
          ]}
        />

        <Select
          label="Giao diện"
          value={settings.theme}
          onChange={(e) => handleSettingChange('theme', e.target.value)}
          options={[
            { value: 'light', label: 'Sáng' },
            { value: 'dark', label: 'Tối' },
            { value: 'auto', label: 'Tự động' }
          ]}
        />
      </div>

      <div className="border-t pt-6">
        <label className="flex items-center space-x-3">
          <input
            type="checkbox"
            checked={settings.maintenanceMode}
            onChange={(e) => handleSettingChange('maintenanceMode', e.target.checked)}
            className="w-4 h-4 text-indigo-600 border-gray-300 rounded focus:ring-indigo-500"
          />
          <div>
            <span className="text-sm font-medium text-gray-900">
              Chế độ bảo trì
            </span>
            <p className="text-sm text-gray-500">
              Tạm thời tắt trang web để bảo trì
            </p>
          </div>
        </label>
      </div>

      <div className="border-t pt-6">
        <h4 className="text-sm font-medium text-gray-900 mb-4">Thao tác nguy hiểm</h4>
        <div className="space-y-3">
          <Button variant="secondary" size="sm">
            Tạo bản sao lưu ngay
          </Button>
          <Button variant="danger" size="sm">
            Xóa toàn bộ cache
          </Button>
        </div>
      </div>
    </div>
  );

  const renderSettingContent = () => {
    switch (activeSection) {
      case 'general':
        return renderGeneralSettings();
      case 'account':
        return renderAccountSettings();
      case 'notifications':
        return renderNotificationSettings();
      case 'security':
        return renderSecuritySettings();
      case 'system':
        return renderSystemSettings();
      default:
        return renderGeneralSettings();
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="space-y-6"
    >
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Cài đặt hệ thống</h1>
          <p className="text-gray-500 mt-1">Quản lý và cấu hình hệ thống</p>
        </div>
        
        <div className="flex space-x-3">
          <Button
            variant="secondary"
            onClick={() => setShowResetModal(true)}
          >
            Khôi phục mặc định
          </Button>
          <Button
            variant="primary"
            onClick={handleSave}
          >
            Lưu thay đổi
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        {/* Settings Navigation */}
        <div className="lg:col-span-1">
          <AdminCard className="p-0 overflow-hidden">
            <nav className="space-y-1">
              {settingsSections.map((section, index) => {
                const Icon = section.icon;
                return (
                  <motion.button
                    key={section.id}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.1 }}
                    onClick={() => setActiveSection(section.id)}
                    className={`w-full text-left px-4 py-3 flex items-center space-x-3 transition-colors ${
                      activeSection === section.id
                        ? 'bg-indigo-50 border-r-2 border-indigo-500 text-indigo-700'
                        : 'text-gray-600 hover:bg-gray-50'
                    }`}
                  >
                    <Icon className="w-5 h-5" />
                    <div>
                      <div className="font-medium text-sm">{section.title}</div>
                      <div className="text-xs text-gray-500">{section.description}</div>
                    </div>
                  </motion.button>
                );
              })}
            </nav>
          </AdminCard>
        </div>

        {/* Settings Content */}
        <div className="lg:col-span-3">
          <AdminCard>
            <motion.div
              key={activeSection}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
            >
              <div className="border-b border-gray-200 pb-4 mb-6">
                <h2 className="text-lg font-semibold text-gray-900">
                  {settingsSections.find(s => s.id === activeSection)?.title}
                </h2>
                <p className="text-sm text-gray-500 mt-1">
                  {settingsSections.find(s => s.id === activeSection)?.description}
                </p>
              </div>
              
              {renderSettingContent()}
            </motion.div>
          </AdminCard>
        </div>
      </div>

      {/* Reset Confirmation Modal */}
      <ConfirmModal
        isOpen={showResetModal}
        onClose={() => setShowResetModal(false)}
        onConfirm={handleReset}
        title="Khôi phục cài đặt mặc định"
        message="Bạn có chắc chắn muốn khôi phục tất cả cài đặt về mặc định? Thao tác này không thể hoàn tác."
        confirmText="Khôi phục"
        cancelText="Hủy"
        type="warning"
      />
    </motion.div>
  );
};

export default Settings;
