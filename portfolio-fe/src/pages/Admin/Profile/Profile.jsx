import React, { useState } from 'react';
import { 
  UserIcon, 
  CameraIcon,
  LockClosedIcon,
  BellIcon,
  ShieldCheckIcon,
  EyeIcon,
  EyeSlashIcon,
  CheckCircleIcon,
  XCircleIcon
} from '@heroicons/react/24/outline';
import { AdminCard, Button, Input, Textarea, PageHeader } from '../../../components/Admin';

const Profile = () => {
  const [activeTab, setActiveTab] = useState('profile'); // profile, security, notifications, preferences
  const [profileData, setProfileData] = useState({
    name: 'Nguyễn Hữu Định',
    email: 'nhdinh.dev@gmail.com',
    phone: '+84 123 456 789',
    position: 'Full Stack Developer',
    company: 'Freelance',
    bio: 'Lập trình viên full-stack với 3+ năm kinh nghiệm phát triển ứng dụng web và mobile.',
    location: 'Hà Nội, Việt Nam',
    website: 'https://nhdinh.dev',
    linkedin: 'https://linkedin.com/in/nhdinh',
    github: 'https://github.com/nhdinh'
  });

  const [securityData, setSecurityData] = useState({
    currentPassword: '',
    newPassword: '',
    confirmPassword: '',
    twoFactor: true,
    loginAlerts: true,
    sessionTimeout: '30'
  });

  const [notifications, setNotifications] = useState({
    emailNotifications: true,
    pushNotifications: false,
    marketingEmails: false,
    securityAlerts: true,
    weeklyReports: true,
    commentNotifications: true
  });

  const [preferences, setPreferences] = useState({
    language: 'vi',
    timezone: 'Asia/Ho_Chi_Minh',
    dateFormat: 'DD/MM/YYYY',
    theme: 'light',
    autoSave: true,
    compactMode: false
  });

  const [showPassword, setShowPassword] = useState({
    current: false,
    new: false,
    confirm: false
  });

  const [editingProfile, setEditingProfile] = useState(false);
  const [profilePicture] = useState('/images/profile.jpg');

  const handleProfileSave = () => {
    setEditingProfile(false);
    // Call API to save profile
  };

  const handlePasswordChange = () => {
    // Validate passwords
    if (securityData.newPassword !== securityData.confirmPassword) {
      alert('Mật khẩu mới không khớp!');
      return;
    }
    // Call API to change password
    setSecurityData({
      ...securityData,
      currentPassword: '',
      newPassword: '',
      confirmPassword: ''
    });
  };

  const handleNotificationChange = (key, value) => {
    setNotifications({
      ...notifications,
      [key]: value
    });
  };

  const handlePreferenceChange = (key, value) => {
    setPreferences({
      ...preferences,
      [key]: value
    });
  };

  const activityLogs = [
    {
      id: 1,
      action: 'Đăng nhập',
      timestamp: '2024-01-15 09:30',
      ip: '192.168.1.100',
      device: 'Chrome - Windows',
      status: 'success'
    },
    {
      id: 2,
      action: 'Thay đổi mật khẩu',
      timestamp: '2024-01-14 14:20',
      ip: '192.168.1.100',
      device: 'Chrome - Windows',
      status: 'success'
    },
    {
      id: 3,
      action: 'Đăng nhập thất bại',
      timestamp: '2024-01-13 22:15',
      ip: '10.0.0.50',
      device: 'Unknown',
      status: 'failed'
    }
  ];

  const renderProfile = () => (
    <div className="space-y-6">
      {/* Profile Picture */}
      <AdminCard title="Ảnh đại diện">
        <div className="flex items-center space-x-6">
          <div className="relative">
            <img
              src={profilePicture}
              alt="Profile"
              className="w-24 h-24 rounded-full object-cover"
            />
            <button className="absolute bottom-0 right-0 p-2 bg-indigo-600 text-white rounded-full hover:bg-indigo-700">
              <CameraIcon className="h-4 w-4" />
            </button>
          </div>
          <div>
            <h3 className="text-lg font-medium text-gray-900">Thay đổi ảnh đại diện</h3>
            <p className="text-sm text-gray-500">JPG, PNG tối đa 2MB</p>
            <div className="mt-2 space-x-2">
              <Button variant="primary" size="sm">Tải ảnh mới</Button>
              <Button variant="secondary" size="sm">Xóa ảnh</Button>
            </div>
          </div>
        </div>
      </AdminCard>

      {/* Personal Information */}
      <AdminCard
        title="Thông tin cá nhân"
        actions={
          <Button
            variant={editingProfile ? "success" : "secondary"}
            size="sm"
            onClick={editingProfile ? handleProfileSave : () => setEditingProfile(true)}
          >
            {editingProfile ? 'Lưu thay đổi' : 'Chỉnh sửa'}
          </Button>
        }
      >
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Input
            label="Họ và tên"
            value={profileData.name}
            onChange={(e) => setProfileData({...profileData, name: e.target.value})}
            disabled={!editingProfile}
          />
          <Input
            label="Email"
            type="email"
            value={profileData.email}
            onChange={(e) => setProfileData({...profileData, email: e.target.value})}
            disabled={!editingProfile}
          />
          <Input
            label="Số điện thoại"
            value={profileData.phone}
            onChange={(e) => setProfileData({...profileData, phone: e.target.value})}
            disabled={!editingProfile}
          />
          <Input
            label="Vị trí công việc"
            value={profileData.position}
            onChange={(e) => setProfileData({...profileData, position: e.target.value})}
            disabled={!editingProfile}
          />
          <Input
            label="Công ty"
            value={profileData.company}
            onChange={(e) => setProfileData({...profileData, company: e.target.value})}
            disabled={!editingProfile}
          />
          <Input
            label="Địa chỉ"
            value={profileData.location}
            onChange={(e) => setProfileData({...profileData, location: e.target.value})}
            disabled={!editingProfile}
          />
          <Input
            label="Website"
            value={profileData.website}
            onChange={(e) => setProfileData({...profileData, website: e.target.value})}
            disabled={!editingProfile}
          />
          <Input
            label="LinkedIn"
            value={profileData.linkedin}
            onChange={(e) => setProfileData({...profileData, linkedin: e.target.value})}
            disabled={!editingProfile}
          />
          <Input
            label="GitHub"
            value={profileData.github}
            onChange={(e) => setProfileData({...profileData, github: e.target.value})}
            disabled={!editingProfile}
          />
          <div className="md:col-span-2">
            <Textarea
              label="Giới thiệu"
              value={profileData.bio}
              onChange={(e) => setProfileData({...profileData, bio: e.target.value})}
              disabled={!editingProfile}
              rows={4}
            />
          </div>
        </div>
      </AdminCard>
    </div>
  );

  const renderSecurity = () => (
    <div className="space-y-6">
      {/* Change Password */}
      <AdminCard title="Thay đổi mật khẩu" icon={LockClosedIcon}>
        <div className="space-y-4">
          <div className="relative">
            <Input
              label="Mật khẩu hiện tại"
              type={showPassword.current ? "text" : "password"}
              value={securityData.currentPassword}
              onChange={(e) => setSecurityData({...securityData, currentPassword: e.target.value})}
            />
            <button
              type="button"
              onClick={() => setShowPassword({...showPassword, current: !showPassword.current})}
              className="absolute right-3 top-8 text-gray-400 hover:text-gray-600"
            >
              {showPassword.current ? <EyeSlashIcon className="h-4 w-4" /> : <EyeIcon className="h-4 w-4" />}
            </button>
          </div>
          <div className="relative">
            <Input
              label="Mật khẩu mới"
              type={showPassword.new ? "text" : "password"}
              value={securityData.newPassword}
              onChange={(e) => setSecurityData({...securityData, newPassword: e.target.value})}
            />
            <button
              type="button"
              onClick={() => setShowPassword({...showPassword, new: !showPassword.new})}
              className="absolute right-3 top-8 text-gray-400 hover:text-gray-600"
            >
              {showPassword.new ? <EyeSlashIcon className="h-4 w-4" /> : <EyeIcon className="h-4 w-4" />}
            </button>
          </div>
          <div className="relative">
            <Input
              label="Xác nhận mật khẩu mới"
              type={showPassword.confirm ? "text" : "password"}
              value={securityData.confirmPassword}
              onChange={(e) => setSecurityData({...securityData, confirmPassword: e.target.value})}
            />
            <button
              type="button"
              onClick={() => setShowPassword({...showPassword, confirm: !showPassword.confirm})}
              className="absolute right-3 top-8 text-gray-400 hover:text-gray-600"
            >
              {showPassword.confirm ? <EyeSlashIcon className="h-4 w-4" /> : <EyeIcon className="h-4 w-4" />}
            </button>
          </div>
          <Button variant="primary" onClick={handlePasswordChange}>
            Cập nhật mật khẩu
          </Button>
        </div>
      </AdminCard>

      {/* Two-Factor Authentication */}
      <AdminCard title="Xác thực hai bước" icon={ShieldCheckIcon}>
        <div className="flex items-center justify-between">
          <div>
            <h4 className="text-sm font-medium text-gray-900">Xác thực hai bước</h4>
            <p className="text-sm text-gray-500">Tăng cường bảo mật cho tài khoản của bạn</p>
          </div>
          <label className="relative inline-flex items-center cursor-pointer">
            <input
              type="checkbox"
              checked={securityData.twoFactor}
              onChange={(e) => setSecurityData({...securityData, twoFactor: e.target.checked})}
              className="sr-only peer"
            />
            <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-indigo-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-indigo-600"></div>
          </label>
        </div>
      </AdminCard>

      {/* Security Settings */}
      <AdminCard title="Cài đặt bảo mật">
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h4 className="text-sm font-medium text-gray-900">Cảnh báo đăng nhập</h4>
              <p className="text-sm text-gray-500">Nhận thông báo khi có đăng nhập mới</p>
            </div>
            <label className="relative inline-flex items-center cursor-pointer">
              <input
                type="checkbox"
                checked={securityData.loginAlerts}
                onChange={(e) => setSecurityData({...securityData, loginAlerts: e.target.checked})}
                className="sr-only peer"
              />
              <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-indigo-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-indigo-600"></div>
            </label>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Thời gian tự động đăng xuất (phút)
            </label>
            <select
              value={securityData.sessionTimeout}
              onChange={(e) => setSecurityData({...securityData, sessionTimeout: e.target.value})}
              className="w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
            >
              <option value="15">15 phút</option>
              <option value="30">30 phút</option>
              <option value="60">1 giờ</option>
              <option value="120">2 giờ</option>
              <option value="0">Không bao giờ</option>
            </select>
          </div>
        </div>
      </AdminCard>

      {/* Activity Log */}
      <AdminCard title="Nhật ký hoạt động">
        <div className="space-y-4">
          {activityLogs.map((log) => (
            <div key={log.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
              <div className="flex items-center space-x-3">
                <div className={`p-2 rounded-full ${
                  log.status === 'success' ? 'bg-green-100' : 'bg-red-100'
                }`}>
                  {log.status === 'success' ? (
                    <CheckCircleIcon className="h-4 w-4 text-green-600" />
                  ) : (
                    <XCircleIcon className="h-4 w-4 text-red-600" />
                  )}
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-900">{log.action}</p>
                  <p className="text-xs text-gray-500">{log.device} • {log.ip}</p>
                </div>
              </div>
              <span className="text-xs text-gray-500">{log.timestamp}</span>
            </div>
          ))}
        </div>
      </AdminCard>
    </div>
  );

  const renderNotifications = () => (
    <div className="space-y-6">
      <AdminCard title="Cài đặt thông báo" icon={BellIcon}>
        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <div>
              <h4 className="text-sm font-medium text-gray-900">Thông báo email</h4>
              <p className="text-sm text-gray-500">Nhận thông báo qua email</p>
            </div>
            <label className="relative inline-flex items-center cursor-pointer">
              <input
                type="checkbox"
                checked={notifications.emailNotifications}
                onChange={(e) => handleNotificationChange('emailNotifications', e.target.checked)}
                className="sr-only peer"
              />
              <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-indigo-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-indigo-600"></div>
            </label>
          </div>

          <div className="flex items-center justify-between">
            <div>
              <h4 className="text-sm font-medium text-gray-900">Thông báo push</h4>
              <p className="text-sm text-gray-500">Nhận thông báo trên trình duyệt</p>
            </div>
            <label className="relative inline-flex items-center cursor-pointer">
              <input
                type="checkbox"
                checked={notifications.pushNotifications}
                onChange={(e) => handleNotificationChange('pushNotifications', e.target.checked)}
                className="sr-only peer"
              />
              <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-indigo-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-indigo-600"></div>
            </label>
          </div>

          <div className="flex items-center justify-between">
            <div>
              <h4 className="text-sm font-medium text-gray-900">Email marketing</h4>
              <p className="text-sm text-gray-500">Nhận email về tin tức và cập nhật</p>
            </div>
            <label className="relative inline-flex items-center cursor-pointer">
              <input
                type="checkbox"
                checked={notifications.marketingEmails}
                onChange={(e) => handleNotificationChange('marketingEmails', e.target.checked)}
                className="sr-only peer"
              />
              <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-indigo-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-indigo-600"></div>
            </label>
          </div>

          <div className="flex items-center justify-between">
            <div>
              <h4 className="text-sm font-medium text-gray-900">Cảnh báo bảo mật</h4>
              <p className="text-sm text-gray-500">Thông báo về các vấn đề bảo mật</p>
            </div>
            <label className="relative inline-flex items-center cursor-pointer">
              <input
                type="checkbox"
                checked={notifications.securityAlerts}
                onChange={(e) => handleNotificationChange('securityAlerts', e.target.checked)}
                className="sr-only peer"
              />
              <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-indigo-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-indigo-600"></div>
            </label>
          </div>

          <div className="flex items-center justify-between">
            <div>
              <h4 className="text-sm font-medium text-gray-900">Báo cáo hàng tuần</h4>
              <p className="text-sm text-gray-500">Nhận báo cáo thống kê hàng tuần</p>
            </div>
            <label className="relative inline-flex items-center cursor-pointer">
              <input
                type="checkbox"
                checked={notifications.weeklyReports}
                onChange={(e) => handleNotificationChange('weeklyReports', e.target.checked)}
                className="sr-only peer"
              />
              <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-indigo-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-indigo-600"></div>
            </label>
          </div>

          <div className="flex items-center justify-between">
            <div>
              <h4 className="text-sm font-medium text-gray-900">Thông báo bình luận</h4>
              <p className="text-sm text-gray-500">Thông báo khi có bình luận mới</p>
            </div>
            <label className="relative inline-flex items-center cursor-pointer">
              <input
                type="checkbox"
                checked={notifications.commentNotifications}
                onChange={(e) => handleNotificationChange('commentNotifications', e.target.checked)}
                className="sr-only peer"
              />
              <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-indigo-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-indigo-600"></div>
            </label>
          </div>
        </div>
      </AdminCard>
    </div>
  );

  const renderPreferences = () => (
    <div className="space-y-6">
      <AdminCard title="Tùy chọn giao diện">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Ngôn ngữ</label>
            <select
              value={preferences.language}
              onChange={(e) => handlePreferenceChange('language', e.target.value)}
              className="w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
            >
              <option value="vi">Tiếng Việt</option>
              <option value="en">English</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Múi giờ</label>
            <select
              value={preferences.timezone}
              onChange={(e) => handlePreferenceChange('timezone', e.target.value)}
              className="w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
            >
              <option value="Asia/Ho_Chi_Minh">Việt Nam (GMT+7)</option>
              <option value="Asia/Tokyo">Tokyo (GMT+9)</option>
              <option value="America/New_York">New York (GMT-5)</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Định dạng ngày</label>
            <select
              value={preferences.dateFormat}
              onChange={(e) => handlePreferenceChange('dateFormat', e.target.value)}
              className="w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
            >
              <option value="DD/MM/YYYY">DD/MM/YYYY</option>
              <option value="MM/DD/YYYY">MM/DD/YYYY</option>
              <option value="YYYY-MM-DD">YYYY-MM-DD</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Giao diện</label>
            <select
              value={preferences.theme}
              onChange={(e) => handlePreferenceChange('theme', e.target.value)}
              className="w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
            >
              <option value="light">Sáng</option>
              <option value="dark">Tối</option>
              <option value="auto">Tự động</option>
            </select>
          </div>
        </div>
      </AdminCard>

      <AdminCard title="Tùy chọn hệ thống">
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h4 className="text-sm font-medium text-gray-900">Tự động lưu</h4>
              <p className="text-sm text-gray-500">Tự động lưu thay đổi khi chỉnh sửa</p>
            </div>
            <label className="relative inline-flex items-center cursor-pointer">
              <input
                type="checkbox"
                checked={preferences.autoSave}
                onChange={(e) => handlePreferenceChange('autoSave', e.target.checked)}
                className="sr-only peer"
              />
              <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-indigo-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-indigo-600"></div>
            </label>
          </div>

          <div className="flex items-center justify-between">
            <div>
              <h4 className="text-sm font-medium text-gray-900">Chế độ thu gọn</h4>
              <p className="text-sm text-gray-500">Hiển thị giao diện dạng thu gọn</p>
            </div>
            <label className="relative inline-flex items-center cursor-pointer">
              <input
                type="checkbox"
                checked={preferences.compactMode}
                onChange={(e) => handlePreferenceChange('compactMode', e.target.checked)}
                className="sr-only peer"
              />
              <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-indigo-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-indigo-600"></div>
            </label>
          </div>
        </div>
      </AdminCard>
    </div>
  );

  return (
    <div className="space-y-6">
      <PageHeader
        title="Hồ sơ cá nhân"
        subtitle="Quản lý thông tin và cài đặt tài khoản"
        icon={UserIcon}
      />

      {/* Tabs */}
      <AdminCard>
        <div className="border-b border-gray-200">
          <nav className="-mb-px flex space-x-8">
            {[
              { id: 'profile', name: 'Hồ sơ', icon: UserIcon },
              { id: 'security', name: 'Bảo mật', icon: LockClosedIcon },
              { id: 'notifications', name: 'Thông báo', icon: BellIcon },
              { id: 'preferences', name: 'Tùy chọn', icon: UserIcon }
            ].map((tab) => {
              const Icon = tab.icon;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`${
                    activeTab === tab.id
                      ? 'border-indigo-500 text-indigo-600'
                      : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                  } whitespace-nowrap py-2 px-1 border-b-2 font-medium text-sm flex items-center space-x-2`}
                >
                  <Icon className="h-4 w-4" />
                  <span>{tab.name}</span>
                </button>
              );
            })}
          </nav>
        </div>
      </AdminCard>

      {/* Tab Content */}
      {activeTab === 'profile' && renderProfile()}
      {activeTab === 'security' && renderSecurity()}
      {activeTab === 'notifications' && renderNotifications()}
      {activeTab === 'preferences' && renderPreferences()}
    </div>
  );
};

export default Profile;
