import React, { useState } from 'react';
import { 
  ChartBarIcon, 
  EyeIcon,
  UserGroupIcon,
  ClockIcon,
  ArrowTrendingUpIcon,
  ArrowTrendingDownIcon,
  GlobeAltIcon,
  DevicePhoneMobileIcon,
  ComputerDesktopIcon,
  CalendarIcon
} from '@heroicons/react/24/outline';
import { AdminCard, Button, PageHeader } from '../../../components/Admin';

const Analytics = () => {
  const [timeRange, setTimeRange] = useState('7d'); // 7d, 30d, 90d, 1y
  const [activeTab, setActiveTab] = useState('overview'); // overview, traffic, content, users

  // Mock data
  const overviewStats = {
    totalVisitors: 12450,
    visitorChange: 12.5,
    pageViews: 28350,
    pageViewChange: 8.2,
    avgSessionDuration: '2m 34s',
    durationChange: -5.3,
    bounceRate: '42.8%',
    bounceChange: -2.1
  };

  const trafficSources = [
    { source: 'Organic Search', visitors: 5420, percentage: 43.5, change: 15.2 },
    { source: 'Direct', visitors: 3210, percentage: 25.8, change: -2.3 },
    { source: 'Social Media', visitors: 2140, percentage: 17.2, change: 28.7 },
    { source: 'Referral', visitors: 1120, percentage: 9.0, change: 5.4 },
    { source: 'Email', visitors: 560, percentage: 4.5, change: -8.1 }
  ];

  const topPages = [
    { page: '/projects', views: 8420, percentage: 29.7 },
    { page: '/', views: 6230, percentage: 22.0 },
    { page: '/about', views: 4150, percentage: 14.6 },
    { page: '/blog', views: 3890, percentage: 13.7 },
    { page: '/contact', views: 2840, percentage: 10.0 },
    { page: '/blog/react-hooks', views: 2820, percentage: 10.0 }
  ];

  const deviceStats = [
    { device: 'Desktop', users: 7470, percentage: 60.0 },
    { device: 'Mobile', users: 3735, percentage: 30.0 },
    { device: 'Tablet', users: 1245, percentage: 10.0 }
  ];

  const browserStats = [
    { browser: 'Chrome', users: 7470, percentage: 60.0 },
    { browser: 'Firefox', users: 2490, percentage: 20.0 },
    { browser: 'Safari', users: 1496, percentage: 12.0 },
    { browser: 'Edge', users: 747, percentage: 6.0 },
    { browser: 'Other', users: 247, percentage: 2.0 }
  ];

  const getChangeIcon = (change) => {
    return change > 0 ? ArrowTrendingUpIcon : ArrowTrendingDownIcon;
  };

  const getChangeColor = (change) => {
    return change > 0 ? 'text-green-600' : 'text-red-600';
  };

  const StatCard = ({ title, value, change, icon: Icon }) => {
    const ChangeIcon = getChangeIcon(change);
    const changeColor = getChangeColor(change);

    return (
      <AdminCard>
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm font-medium text-gray-600">{title}</p>
            <p className="text-2xl font-bold text-gray-900">{value}</p>
            <div className={`flex items-center mt-2 ${changeColor}`}>
              <ChangeIcon className="h-4 w-4 mr-1" />
              <span className="text-sm font-medium">{Math.abs(change)}%</span>
              <span className="text-sm text-gray-500 ml-1">vs tháng trước</span>
            </div>
          </div>
          <div className="p-3 bg-indigo-100 rounded-full">
            <Icon className="h-6 w-6 text-indigo-600" />
          </div>
        </div>
      </AdminCard>
    );
  };

  const renderOverview = () => (
    <div className="space-y-6">
      {/* Overview Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard
          title="Tổng lượt truy cập"
          value={overviewStats.totalVisitors.toLocaleString()}
          change={overviewStats.visitorChange}
          icon={UserGroupIcon}
        />
        <StatCard
          title="Lượt xem trang"
          value={overviewStats.pageViews.toLocaleString()}
          change={overviewStats.pageViewChange}
          icon={EyeIcon}
        />
        <StatCard
          title="Thời gian trung bình"
          value={overviewStats.avgSessionDuration}
          change={overviewStats.durationChange}
          icon={ClockIcon}
        />
        <StatCard
          title="Tỷ lệ thoát"
          value={overviewStats.bounceRate}
          change={overviewStats.bounceChange}
          icon={ChartBarIcon}
        />
      </div>

      {/* Chart Area */}
      <AdminCard title="Lượt truy cập theo thời gian">
        <div className="h-64 flex items-center justify-center bg-gray-50 rounded-lg">
          <div className="text-center">
            <ChartBarIcon className="h-12 w-12 text-gray-400 mx-auto mb-2" />
            <p className="text-gray-500">Biểu đồ sẽ được hiển thị ở đây</p>
            <p className="text-sm text-gray-400">Sử dụng Chart.js hoặc Recharts</p>
          </div>
        </div>
      </AdminCard>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Traffic Sources */}
        <AdminCard title="Nguồn truy cập">
          <div className="space-y-4">
            {trafficSources.map((source, index) => (
              <div key={index} className="flex items-center justify-between">
                <div className="flex-1">
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-sm font-medium text-gray-900">{source.source}</span>
                    <span className="text-sm text-gray-500">{source.visitors.toLocaleString()}</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div
                      className="bg-indigo-600 h-2 rounded-full"
                      style={{ width: `${source.percentage}%` }}
                    ></div>
                  </div>
                </div>
                <div className={`ml-4 flex items-center ${getChangeColor(source.change)}`}>
                  {React.createElement(getChangeIcon(source.change), { className: "h-3 w-3 mr-1" })}
                  <span className="text-xs">{Math.abs(source.change)}%</span>
                </div>
              </div>
            ))}
          </div>
        </AdminCard>

        {/* Device Stats */}
        <AdminCard title="Thiết bị truy cập">
          <div className="space-y-4">
            {deviceStats.map((device, index) => (
              <div key={index} className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <div className="p-2 bg-gray-100 rounded-lg">
                    {device.device === 'Desktop' && <ComputerDesktopIcon className="h-4 w-4 text-gray-600" />}
                    {device.device === 'Mobile' && <DevicePhoneMobileIcon className="h-4 w-4 text-gray-600" />}
                    {device.device === 'Tablet' && <DevicePhoneMobileIcon className="h-4 w-4 text-gray-600" />}
                  </div>
                  <span className="text-sm font-medium text-gray-900">{device.device}</span>
                </div>
                <div className="text-right">
                  <p className="text-sm font-medium text-gray-900">{device.users.toLocaleString()}</p>
                  <p className="text-xs text-gray-500">{device.percentage}%</p>
                </div>
              </div>
            ))}
          </div>
        </AdminCard>
      </div>
    </div>
  );

  const renderTraffic = () => (
    <div className="space-y-6">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Top Pages */}
        <AdminCard title="Trang được xem nhiều nhất">
          <div className="space-y-3">
            {topPages.map((page, index) => (
              <div key={index} className="flex items-center justify-between">
                <div className="flex-1">
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-sm font-medium text-gray-900">{page.page}</span>
                    <span className="text-sm text-gray-500">{page.views.toLocaleString()}</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-1.5">
                    <div
                      className="bg-blue-600 h-1.5 rounded-full"
                      style={{ width: `${page.percentage}%` }}
                    ></div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </AdminCard>

        {/* Browsers */}
        <AdminCard title="Trình duyệt">
          <div className="space-y-3">
            {browserStats.map((browser, index) => (
              <div key={index} className="flex items-center justify-between">
                <span className="text-sm font-medium text-gray-900">{browser.browser}</span>
                <div className="text-right">
                  <p className="text-sm font-medium text-gray-900">{browser.users.toLocaleString()}</p>
                  <p className="text-xs text-gray-500">{browser.percentage}%</p>
                </div>
              </div>
            ))}
          </div>
        </AdminCard>
      </div>

      {/* Geographic Data */}
      <AdminCard title="Truy cập theo khu vực">
        <div className="h-64 flex items-center justify-center bg-gray-50 rounded-lg">
          <div className="text-center">
            <GlobeAltIcon className="h-12 w-12 text-gray-400 mx-auto mb-2" />
            <p className="text-gray-500">Bản đồ thế giới sẽ được hiển thị ở đây</p>
            <p className="text-sm text-gray-400">Hiển thị phân bố người dùng theo quốc gia</p>
          </div>
        </div>
      </AdminCard>
    </div>
  );

  const renderContent = () => (
    <div className="space-y-6">
      <AdminCard title="Hiệu suất nội dung">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Trang
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Lượt xem
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Thời gian trung bình
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Tỷ lệ thoát
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {topPages.map((page, index) => (
                <tr key={index}>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                    {page.page}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {page.views.toLocaleString()}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {Math.floor(Math.random() * 3) + 1}m {Math.floor(Math.random() * 60)}s
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {(Math.random() * 50 + 20).toFixed(1)}%
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </AdminCard>
    </div>
  );

  const renderUsers = () => (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <AdminCard title="Người dùng mới">
          <div className="text-center">
            <p className="text-3xl font-bold text-green-600">8,542</p>
            <p className="text-sm text-gray-500">68.6% tổng số</p>
          </div>
        </AdminCard>
        <AdminCard title="Người dùng quay lại">
          <div className="text-center">
            <p className="text-3xl font-bold text-blue-600">3,908</p>
            <p className="text-sm text-gray-500">31.4% tổng số</p>
          </div>
        </AdminCard>
        <AdminCard title="Số phiên trung bình">
          <div className="text-center">
            <p className="text-3xl font-bold text-purple-600">2.4</p>
            <p className="text-sm text-gray-500">phiên/người dùng</p>
          </div>
        </AdminCard>
      </div>

      <AdminCard title="Hành vi người dùng">
        <div className="h-64 flex items-center justify-center bg-gray-50 rounded-lg">
          <div className="text-center">
            <UserGroupIcon className="h-12 w-12 text-gray-400 mx-auto mb-2" />
            <p className="text-gray-500">Biểu đồ hành vi người dùng</p>
            <p className="text-sm text-gray-400">Luồng người dùng và hành trình</p>
          </div>
        </div>
      </AdminCard>
    </div>
  );

  return (
    <div className="space-y-6">
      <PageHeader
        title="Thống kê & Phân tích"
        subtitle="Analytics và báo cáo chi tiết"
        icon={ChartBarIcon}
        actions={
          <div className="flex items-center space-x-4">
            <select
              value={timeRange}
              onChange={(e) => setTimeRange(e.target.value)}
              className="rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
            >
              <option value="7d">7 ngày qua</option>
              <option value="30d">30 ngày qua</option>
              <option value="90d">90 ngày qua</option>
              <option value="1y">1 năm qua</option>
            </select>
            <Button variant="secondary" icon={CalendarIcon}>
              Tùy chọn ngày
            </Button>
          </div>
        }
      />

      {/* Tabs */}
      <AdminCard>
        <div className="border-b border-gray-200">
          <nav className="-mb-px flex space-x-8">
            {[
              { id: 'overview', name: 'Tổng quan', icon: ChartBarIcon },
              { id: 'traffic', name: 'Lưu lượng', icon: GlobeAltIcon },
              { id: 'content', name: 'Nội dung', icon: EyeIcon },
              { id: 'users', name: 'Người dùng', icon: UserGroupIcon }
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
      {activeTab === 'overview' && renderOverview()}
      {activeTab === 'traffic' && renderTraffic()}
      {activeTab === 'content' && renderContent()}
      {activeTab === 'users' && renderUsers()}
    </div>
  );
};

export default Analytics;
