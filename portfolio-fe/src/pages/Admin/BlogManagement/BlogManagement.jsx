import React, { useState } from 'react';
import { 
  PencilSquareIcon, 
  EyeIcon,
  TrashIcon,
  PlusIcon,
  CalendarIcon,
  HeartIcon,
  ChatBubbleLeftIcon
} from '@heroicons/react/24/outline';
import { AdminCard, Button, Input, AdminTable, PageHeader } from '../../../components/Admin';

const BlogManagement = () => {
  const [posts, setPosts] = useState([
    {
      id: 1,
      title: 'Hướng dẫn React Hooks cho người mới bắt đầu',
      excerpt: 'Tìm hiểu về React Hooks và cách sử dụng chúng hiệu quả...',
      status: 'published',
      author: 'Nguyễn Hữu Định',
      publishDate: '2024-01-15',
      category: 'React',
      tags: ['React', 'JavaScript', 'Frontend'],
      views: 1250,
      likes: 45,
      comments: 12,
      featured: true
    },
    {
      id: 2,
      title: 'Xây dựng API RESTful với Node.js và Express',
      excerpt: 'Hướng dẫn chi tiết cách tạo API RESTful...',
      status: 'draft',
      author: 'Nguyễn Hữu Định',
      publishDate: '2024-01-20',
      category: 'Backend',
      tags: ['Node.js', 'Express', 'API'],
      views: 0,
      likes: 0,
      comments: 0,
      featured: false
    },
    {
      id: 3,
      title: 'Tối ưu hóa performance cho ứng dụng React',
      excerpt: 'Các kỹ thuật tối ưu hóa hiệu suất cho React apps...',
      status: 'published',
      author: 'Nguyễn Hữu Định',
      publishDate: '2024-01-10',
      category: 'Performance',
      tags: ['React', 'Performance', 'Optimization'],
      views: 890,
      likes: 32,
      comments: 8,
      featured: false
    }
  ]);

  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [categoryFilter, setCategoryFilter] = useState('all');

  const handleDeletePost = (id) => {
    setPosts(posts.filter(post => post.id !== id));
  };

  // eslint-disable-next-line no-unused-vars
  const handleToggleFeatured = (id) => {
    // Chức năng toggle bài viết nổi bật (sẽ implement trong tương lai)
    setPosts(posts.map(post => 
      post.id === id ? { ...post, featured: !post.featured } : post
    ));
  };

  const filteredPosts = posts.filter(post => {
    const matchesSearch = post.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         post.excerpt.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === 'all' || post.status === statusFilter;
    const matchesCategory = categoryFilter === 'all' || post.category === categoryFilter;
    
    return matchesSearch && matchesStatus && matchesCategory;
  });

  const getStatusBadge = (status) => {
    const statusColors = {
      published: 'bg-green-100 text-green-800',
      draft: 'bg-yellow-100 text-yellow-800',
      archived: 'bg-gray-100 text-gray-800'
    };
    
    const statusLabels = {
      published: 'Đã xuất bản',
      draft: 'Bản nháp',
      archived: 'Lưu trữ'
    };

    return (
      <span className={`px-2 py-1 text-xs font-medium rounded-full ${statusColors[status]}`}>
        {statusLabels[status]}
      </span>
    );
  };

  const columns = [
    {
      key: 'title',
      title: 'Tiêu đề',
      render: (post) => (
        <div className="space-y-1">
          <h4 className="font-medium text-gray-900 line-clamp-1">{post.title}</h4>
          <p className="text-sm text-gray-500 line-clamp-2">{post.excerpt}</p>
          <div className="flex items-center space-x-2">
            {post.featured && (
              <span className="px-2 py-1 bg-indigo-100 text-indigo-800 text-xs rounded-full">
                Nổi bật
              </span>
            )}
            <span className="text-xs text-gray-400">
              <CalendarIcon className="h-3 w-3 inline mr-1" />
              {post.publishDate}
            </span>
          </div>
        </div>
      )
    },
    {
      key: 'category',
      title: 'Danh mục',
      render: (post) => (
        <div className="space-y-1">
          <span className="text-sm font-medium text-gray-900">{post.category}</span>
          <div className="flex flex-wrap gap-1">
            {post.tags.slice(0, 2).map((tag, index) => (
              <span key={index} className="px-2 py-1 bg-gray-100 text-gray-600 text-xs rounded">
                {tag}
              </span>
            ))}
            {post.tags.length > 2 && (
              <span className="text-xs text-gray-400">+{post.tags.length - 2}</span>
            )}
          </div>
        </div>
      )
    },
    {
      key: 'status',
      title: 'Trạng thái',
      render: (post) => getStatusBadge(post.status)
    },
    {
      key: 'stats',
      title: 'Thống kê',
      render: (post) => (
        <div className="space-y-1">
          <div className="flex items-center space-x-3 text-xs text-gray-500">
            <span className="flex items-center">
              <EyeIcon className="h-3 w-3 mr-1" />
              {post.views}
            </span>
            <span className="flex items-center">
              <HeartIcon className="h-3 w-3 mr-1" />
              {post.likes}
            </span>
            <span className="flex items-center">
              <ChatBubbleLeftIcon className="h-3 w-3 mr-1" />
              {post.comments}
            </span>
          </div>
        </div>
      )
    },
    {
      key: 'actions',
      title: 'Thao tác',
      render: (post) => (
        <div className="flex items-center space-x-2">
          <Button
            variant="secondary"
            size="sm"
            icon={PencilSquareIcon}
            onClick={() => {
              // TODO: Implement edit post functionality
              // console.log('Edit post', post.id);
            }}
          >
            Sửa
          </Button>
          <Button
            variant="ghost"
            size="sm"
            icon={EyeIcon}
            onClick={() => {
              // TODO: Implement view post functionality
              // console.log('View post', post.id);
            }}
          />
          <Button
            variant="danger"
            size="sm"
            icon={TrashIcon}
            onClick={() => handleDeletePost(post.id)}
          />
        </div>
      )
    }
  ];

  // Statistics
  const stats = {
    total: posts.length,
    published: posts.filter(p => p.status === 'published').length,
    draft: posts.filter(p => p.status === 'draft').length,
    totalViews: posts.reduce((sum, p) => sum + p.views, 0),
    totalLikes: posts.reduce((sum, p) => sum + p.likes, 0)
  };

  return (
    <div className="space-y-6">
      <PageHeader
        title="Quản lý Blog"
        subtitle="Quản lý bài viết và nội dung blog"
        icon={PencilSquareIcon}
        actions={
          <Button
            variant="primary"
            icon={PlusIcon}
            onClick={() => {
              // TODO: Implement create new post functionality
              // console.log('Create new post');
            }}
          >
            Tạo bài viết mới
          </Button>
        }
      />

      {/* Statistics Cards */}
      <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
        <AdminCard className="text-center">
          <div className="space-y-2">
            <h3 className="text-2xl font-bold text-gray-900">{stats.total}</h3>
            <p className="text-sm text-gray-500">Tổng bài viết</p>
          </div>
        </AdminCard>
        <AdminCard className="text-center">
          <div className="space-y-2">
            <h3 className="text-2xl font-bold text-green-600">{stats.published}</h3>
            <p className="text-sm text-gray-500">Đã xuất bản</p>
          </div>
        </AdminCard>
        <AdminCard className="text-center">
          <div className="space-y-2">
            <h3 className="text-2xl font-bold text-yellow-600">{stats.draft}</h3>
            <p className="text-sm text-gray-500">Bản nháp</p>
          </div>
        </AdminCard>
        <AdminCard className="text-center">
          <div className="space-y-2">
            <h3 className="text-2xl font-bold text-blue-600">{stats.totalViews.toLocaleString()}</h3>
            <p className="text-sm text-gray-500">Lượt xem</p>
          </div>
        </AdminCard>
        <AdminCard className="text-center">
          <div className="space-y-2">
            <h3 className="text-2xl font-bold text-red-600">{stats.totalLikes}</h3>
            <p className="text-sm text-gray-500">Lượt thích</p>
          </div>
        </AdminCard>
      </div>

      {/* Filters and Search */}
      <AdminCard title="Bộ lọc">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <Input
            placeholder="Tìm kiếm bài viết..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
          >
            <option value="all">Tất cả trạng thái</option>
            <option value="published">Đã xuất bản</option>
            <option value="draft">Bản nháp</option>
            <option value="archived">Lưu trữ</option>
          </select>
          <select
            value={categoryFilter}
            onChange={(e) => setCategoryFilter(e.target.value)}
            className="rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
          >
            <option value="all">Tất cả danh mục</option>
            <option value="React">React</option>
            <option value="Backend">Backend</option>
            <option value="Performance">Performance</option>
          </select>
          <Button variant="secondary" className="w-full">
            Đặt lại bộ lọc
          </Button>
        </div>
      </AdminCard>

      {/* Posts Table */}
      <AdminCard title={`Danh sách bài viết (${filteredPosts.length})`}>
        <AdminTable
          data={filteredPosts}
          columns={columns}
          emptyMessage="Không có bài viết nào"
        />
      </AdminCard>
    </div>
  );
};

export default BlogManagement;
