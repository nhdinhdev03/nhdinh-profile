import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import {
  UsersIcon,
  DocumentTextIcon,
  ChartBarIcon,
  BellIcon,
  UserIcon,
  CalendarIcon,
  EyeIcon,
  ChatBubbleLeftIcon,
  FolderIcon,
  ArrowUpIcon,
  ClockIcon,
  GlobeAltIcon
} from "@heroicons/react/24/outline";
import {
  AdminCard,
  StatCard,
  AdminTable,
  Button
} from "../../../components/Admin";

const Dashboard = () => {
  const [stats] = useState({
    totalVisitors: 12450,
    totalProjects: 28,
    totalBlogs: 45,
    totalContacts: 89,
    todayVisitors: 234,
    weeklyGrowth: 12.5,
    activeUsers: 156,
    pendingTasks: 7
  });

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulate loading
    const timer = setTimeout(() => setLoading(false), 1000);
    return () => clearTimeout(timer);
  }, []);

  const [recentActivities] = useState([
    {
      id: 1,
      type: "project",
      message: 'Dự án "E-commerce Platform" được cập nhật',
      time: "2 phút trước",
      icon: DocumentTextIcon,
      user: "Admin",
      action: "Cập nhật"
    },
    {
      id: 2,
      type: "blog",
      message: 'Blog mới "React Performance Tips" được publish',
      time: "15 phút trước",
      icon: DocumentTextIcon,
      user: "Admin",
      action: "Tạo mới"
    },
    {
      id: 3,
      type: "contact",
      message: "Liên hệ mới từ nguyen@email.com",
      time: "1 giờ trước",
      icon: ChatBubbleLeftIcon,
      user: "Nguyen Van A",
      action: "Liên hệ"
    },
    {
      id: 4,
      type: "user",
      message: "User admin đăng nhập thành công",
      time: "2 giờ trước",
      icon: UserIcon,
      user: "Admin",
      action: "Đăng nhập"
    }
  ]);

  const [topPages] = useState([
    { id: 1, page: "/", views: 2450, bounceRate: "32%", avgTime: "2m 45s" },
    { id: 2, page: "/projects", views: 1890, bounceRate: "28%", avgTime: "3m 12s" },
    { id: 3, page: "/blog", views: 1234, bounceRate: "45%", avgTime: "1m 58s" },
    { id: 4, page: "/about", views: 987, bounceRate: "38%", avgTime: "2m 30s" },
    { id: 5, page: "/contact", views: 654, bounceRate: "52%", avgTime: "1m 15s" }
  ]);

  const statsCards = [
    {
      title: "Tổng lượt truy cập",
      value: stats.totalVisitors.toLocaleString(),
      change: 12.5,
      changeType: "positive",
      icon: EyeIcon,
      iconColor: "text-blue-600",
      iconBgColor: "bg-blue-100"
    },
    {
      title: "Dự án hoàn thành",
      value: stats.totalProjects,
      change: 8.3,
      changeType: "positive",
      icon: FolderIcon,
      iconColor: "text-green-600",
      iconBgColor: "bg-green-100"
    },
    {
      title: "Bài viết blog",
      value: stats.totalBlogs,
      change: -2.1,
      changeType: "negative",
      icon: DocumentTextIcon,
      iconColor: "text-yellow-600",
      iconBgColor: "bg-yellow-100"
    },
    {
      title: "Tin nhắn liên hệ",
      value: stats.totalContacts,
      change: 15.7,
      changeType: "positive",
      icon: ChatBubbleLeftIcon,
      iconColor: "text-purple-600",
      iconBgColor: "bg-purple-100"
    }
  ];

  const tableColumns = [
    { key: 'page', title: 'Trang', sortable: true },
    { key: 'views', title: 'Lượt xem', sortable: true },
    { key: 'bounceRate', title: 'Tỷ lệ thoát', sortable: true },
    { key: 'avgTime', title: 'Thời gian trung bình', sortable: true }
  ];

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="bg-gradient-to-r from-indigo-500 to-purple-600 rounded-2xl p-8 text-white">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold">Chào mừng trở lại!</h1>
            <p className="text-indigo-100 mt-2">
              Đây là tổng quan về hoạt động của website trong thời gian gần đây
            </p>
          </div>
          <div className="hidden sm:block">
            <div className="flex items-center space-x-4">
              <div className="text-right">
                <p className="text-sm text-indigo-100">Hôm nay</p>
                <p className="text-2xl font-semibold">{stats.todayVisitors} lượt xem</p>
              </div>
              <GlobeAltIcon className="h-12 w-12 text-indigo-200" />
            </div>
          </div>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {statsCards.map((stat, index) => (
          <motion.div
            key={stat.title}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: index * 0.1 }}
          >
            <StatCard
              title={stat.title}
              value={stat.value}
              change={stat.change}
              changeType={stat.changeType}
              icon={stat.icon}
              iconColor={stat.iconColor}
              iconBgColor={stat.iconBgColor}
              loading={loading}
            />
          </motion.div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Recent Activities */}
        <div className="lg:col-span-2">
          <AdminCard
            title="Hoạt động gần đây"
            subtitle="Các thay đổi và cập nhật mới nhất"
            icon={ClockIcon}
            actions={
              <Button variant="ghost" size="sm">
                Xem tất cả
              </Button>
            }
          >
            <div className="space-y-4">
              {recentActivities.map((activity, index) => (
                <motion.div
                  key={activity.id}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.3, delay: index * 0.1 }}
                  className="flex items-start space-x-4 p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors"
                >
                  <div className="flex-shrink-0">
                    <div className="bg-white p-2 rounded-lg shadow-sm">
                      <activity.icon className="h-5 w-5 text-gray-600" />
                    </div>
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-gray-900">
                      {activity.message}
                    </p>
                    <div className="flex items-center space-x-4 mt-1">
                      <p className="text-xs text-gray-500">
                        bởi {activity.user}
                      </p>
                      <span className="text-xs text-gray-400">•</span>
                      <p className="text-xs text-gray-500">
                        {activity.time}
                      </p>
                    </div>
                  </div>
                  <div className="flex-shrink-0">
                    <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-indigo-100 text-indigo-800">
                      {activity.action}
                    </span>
                  </div>
                </motion.div>
              ))}
            </div>
          </AdminCard>
        </div>

        {/* Quick Stats */}
        <div className="space-y-6">
          <AdminCard
            title="Thống kê nhanh"
            subtitle="Số liệu quan trọng"
            icon={ChartBarIcon}
          >
            <div className="space-y-4">
              <div className="flex items-center justify-between p-3 bg-gradient-to-r from-green-50 to-green-100 rounded-lg">
                <div>
                  <p className="text-sm font-medium text-green-900">Người dùng online</p>
                  <p className="text-2xl font-bold text-green-700">{stats.activeUsers}</p>
                </div>
                <UsersIcon className="h-8 w-8 text-green-600" />
              </div>
              
              <div className="flex items-center justify-between p-3 bg-gradient-to-r from-yellow-50 to-yellow-100 rounded-lg">
                <div>
                  <p className="text-sm font-medium text-yellow-900">Tác vụ chờ xử lý</p>
                  <p className="text-2xl font-bold text-yellow-700">{stats.pendingTasks}</p>
                </div>
                <BellIcon className="h-8 w-8 text-yellow-600" />
              </div>
              
              <div className="flex items-center justify-between p-3 bg-gradient-to-r from-blue-50 to-blue-100 rounded-lg">
                <div>
                  <p className="text-sm font-medium text-blue-900">Tăng trưởng tuần</p>
                  <div className="flex items-center space-x-1">
                    <p className="text-2xl font-bold text-blue-700">+{stats.weeklyGrowth}%</p>
                    <ArrowUpIcon className="h-4 w-4 text-green-500" />
                  </div>
                </div>
                <ChartBarIcon className="h-8 w-8 text-blue-600" />
              </div>
            </div>
          </AdminCard>

          <AdminCard
            title="Lịch nhanh"
            subtitle="Sự kiện sắp tới"
            icon={CalendarIcon}
            actions={
              <Button variant="ghost" size="sm">
                Xem lịch
              </Button>
            }
          >
            <div className="space-y-3">
              <div className="flex items-center space-x-3 p-3 border border-gray-200 rounded-lg">
                <div className="flex-shrink-0 w-12 h-12 bg-indigo-100 rounded-lg flex items-center justify-center">
                  <span className="text-sm font-semibold text-indigo-600">25</span>
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-900">Backup hệ thống</p>
                  <p className="text-xs text-gray-500">9:00 AM - Tự động</p>
                </div>
              </div>
              
              <div className="flex items-center space-x-3 p-3 border border-gray-200 rounded-lg">
                <div className="flex-shrink-0 w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
                  <span className="text-sm font-semibold text-green-600">26</span>
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-900">Review code</p>
                  <p className="text-xs text-gray-500">2:00 PM - Thủ công</p>
                </div>
              </div>
            </div>
          </AdminCard>
        </div>
      </div>

      {/* Top Pages Table */}
      <AdminCard
        title="Trang được xem nhiều nhất"
        subtitle="Thống kê lượt truy cập theo trang"
        icon={EyeIcon}
        actions={
          <Button variant="ghost" size="sm">
            Báo cáo chi tiết
          </Button>
        }
      >
        <AdminTable
          columns={tableColumns}
          data={topPages}
          loading={loading}
          searchable={false}
          pagination={false}
        />
      </AdminCard>
    </div>
  );
};

export default Dashboard;
