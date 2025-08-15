import React, { useState } from "react";
import {
  DocumentTextIcon,
  ChartBarIcon,
  BellIcon,
  UserIcon,
  CalendarIcon,
  EyeIcon,
  HeartIcon,
  ChatBubbleLeftIcon,
} from "@heroicons/react/24/outline";

const Dashboard = () => {
  // const [stats, setStats] = useState({
  //   totalVisitors: 12450,
  //   totalProjects: 28,
  //   totalBlogs: 45,
  //   totalContacts: 89,
  //   todayVisitors: 234,
  //   weeklyGrowth: 12.5,
  //   activeUsers: 156,
  //   pendingTasks: 7
  // });

  const [recentActivities] = useState([
    {
      id: 1,
      type: "project",
      message: 'Dự án "E-commerce Platform" được cập nhật',
      time: "2 phút trước",
      icon: DocumentTextIcon,
    },
    {
      id: 2,
      type: "blog",
      message: 'Blog mới "React Performance Tips" được publish',
      time: "15 phút trước",
      icon: DocumentTextIcon,
    },
    {
      id: 3,
      type: "contact",
      message: "Liên hệ mới từ nguyen@email.com",
      time: "1 giờ trước",
      icon: ChatBubbleLeftIcon,
    },
    {
      id: 4,
      type: "user",
      message: "User admin đăng nhập thành công",
      time: "2 giờ trước",
      icon: UserIcon,
    },
  ]);

  const [quickStats] = useState([
    {
      name: "Tổng lượt xem",
      value: "12,450",
      change: "+12%",
      changeType: "positive",
      icon: EyeIcon,
    },
    {
      name: "Dự án hoàn thành",
      value: "28",
      change: "+3",
      changeType: "positive",
      icon: DocumentTextIcon,
    },
    {
      name: "Blog bài viết",
      value: "45",
      change: "+8",
      changeType: "positive",
      icon: DocumentTextIcon,
    },
    {
      name: "Lượt thích",
      value: "1,234",
      change: "+23%",
      changeType: "positive",
      icon: HeartIcon,
    },
  ]);

  const [upcomingTasks] = useState([
    {
      id: 1,
      title: "Cập nhật portfolio mới",
      deadline: "2025-08-20",
      priority: "high",
    },
    {
      id: 2,
      title: "Review và publish blog AI",
      deadline: "2025-08-22",
      priority: "medium",
    },
    {
      id: 3,
      title: "Backup database",
      deadline: "2025-08-25",
      priority: "low",
    },
    {
      id: 4,
      title: "Tối ưu SEO website",
      deadline: "2025-08-28",
      priority: "medium",
    },
  ]);

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm border-b border-gray-200">
        <div className="px-6 py-4">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold text-gray-900">Dashboard</h1>
              <p className="text-gray-500 mt-1">
                Chào mừng trở lại! Đây là tổng quan hệ thống của bạn.
              </p>
            </div>
            <div className="flex items-center space-x-4">
              <button className="relative p-2 text-gray-400 hover:text-gray-500">
                <BellIcon className="h-6 w-6" />
                <span className="absolute top-0 right-0 block h-2 w-2 rounded-full bg-red-400 ring-2 ring-white"></span>
              </button>
              <div className="flex items-center space-x-3">
                <img
                  className="h-8 w-8 rounded-full"
                  src="https://ui-avatars.com/api/?name=Admin&background=6366f1&color=fff"
                  alt="Admin"
                />
                <span className="text-sm font-medium text-gray-700">Admin</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="px-6 py-8">
        {/* Quick Stats */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {quickStats.map((stat, index) => (
            <div
              key={index}
              className="bg-white rounded-lg shadow-sm p-6 border border-gray-200"
            >
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-500">
                    {stat.name}
                  </p>
                  <p className="text-2xl font-bold text-gray-900 mt-1">
                    {stat.value}
                  </p>
                  <p
                    className={`text-sm mt-1 ${
                      stat.changeType === "positive"
                        ? "text-green-600"
                        : "text-red-600"
                    }`}
                  >
                    {stat.change} so với tháng trước
                  </p>
                </div>
                <div className="p-3 bg-indigo-50 rounded-lg">
                  <stat.icon className="h-6 w-6 text-indigo-600" />
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Recent Activities */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-lg shadow-sm border border-gray-200">
              <div className="px-6 py-4 border-b border-gray-200">
                <h2 className="text-lg font-semibold text-gray-900">
                  Hoạt động gần đây
                </h2>
              </div>
              <div className="p-6">
                <div className="space-y-4">
                  {recentActivities.map((activity) => (
                    <div
                      key={activity.id}
                      className="flex items-start space-x-3"
                    >
                      <div className="p-2 bg-gray-100 rounded-lg">
                        <activity.icon className="h-5 w-5 text-gray-600" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-sm text-gray-900">
                          {activity.message}
                        </p>
                        <p className="text-xs text-gray-500 mt-1">
                          {activity.time}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
                <div className="mt-6">
                  <button className="text-sm text-indigo-600 hover:text-indigo-500 font-medium">
                    Xem tất cả hoạt động →
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Upcoming Tasks */}
          <div>
            <div className="bg-white rounded-lg shadow-sm border border-gray-200">
              <div className="px-6 py-4 border-b border-gray-200">
                <h2 className="text-lg font-semibold text-gray-900">
                  Công việc sắp tới
                </h2>
              </div>
              <div className="p-6">
                <div className="space-y-4">
                  {upcomingTasks.map((task) => (
                    <div
                      key={task.id}
                      className="flex items-center justify-between"
                    >
                      <div className="flex-1">
                        <p className="text-sm font-medium text-gray-900">
                          {task.title}
                        </p>
                        <p className="text-xs text-gray-500 mt-1 flex items-center">
                          <CalendarIcon className="h-3 w-3 mr-1" />
                          {task.deadline}
                        </p>
                      </div>
                      <span
                        className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                          task.priority === "high"
                            ? "bg-red-100 text-red-800"
                            : task.priority === "medium"
                            ? "bg-yellow-100 text-yellow-800"
                            : "bg-green-100 text-green-800"
                        }`}
                      >
                        {task.priority === "high"
                          ? "Cao"
                          : task.priority === "medium"
                          ? "Trung bình"
                          : "Thấp"}
                      </span>
                    </div>
                  ))}
                </div>
                <div className="mt-6">
                  <button className="w-full text-sm text-indigo-600 hover:text-indigo-500 font-medium">
                    Xem tất cả công việc
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Chart Section */}
        <div className="mt-8">
          <div className="bg-white rounded-lg shadow-sm border border-gray-200">
            <div className="px-6 py-4 border-b border-gray-200">
              <h2 className="text-lg font-semibold text-gray-900">
                Thống kê lượt truy cập
              </h2>
            </div>
            <div className="p-6">
              <div className="h-64 bg-gray-50 rounded-lg flex items-center justify-center">
                <div className="text-center">
                  <ChartBarIcon className="h-12 w-12 text-gray-400 mx-auto mb-3" />
                  <p className="text-gray-500">
                    Biểu đồ thống kê sẽ được hiển thị ở đây
                  </p>
                  <p className="text-sm text-gray-400 mt-1">
                    Tích hợp với Chart.js hoặc Recharts
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
