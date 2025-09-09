import React, { useState, useCallback, useMemo } from 'react';
import { 
  Button, 
  Space, 
  Tag, 
  Tooltip, 
  message,
  Row,
  Col,
  Card,
  Avatar,
  Typography,
  Dropdown
} from 'antd';
import {
  PlusOutlined,
  EditOutlined,
  DeleteOutlined,
  EyeOutlined,
  FileTextOutlined,
  CalendarOutlined,
  UserOutlined,
  TagOutlined,
  GlobalOutlined,
  MoreOutlined,
  ReloadOutlined,
  ExportOutlined,
  FilterOutlined
} from '@ant-design/icons';

import { PageHeader, DataTable, QuickStats, StatusBadge } from 'components/Admin';
import { useAdminData } from 'hooks/Admin/useAdminData';
import { BlogPostApi, BlogTagApi } from 'api/admin';

const { Text } = Typography;

const BlogPostsManagement = () => {
  const [selectedRowKeys, setSelectedRowKeys] = useState([]);
  
  // Use optimized data hook for blog posts
  const {
    data: blogPosts,
    loading,
    error,
    createItem,
    updateItem,
    deleteItem,
    bulkDelete,
    refresh,
    stats
  } = useAdminData(BlogPostApi, {
    cacheKey: 'blog_posts',
    enableCache: true,
    autoFetch: true,
    transformResponse: (data) => data.map(post => ({
      ...post,
      key: post.id,
      publishedDate: post.publishedAt ? new Date(post.publishedAt).toLocaleDateString('vi-VN') : null,
      createdDate: new Date(post.createdAt).toLocaleDateString('vi-VN'),
      wordCount: post.content ? post.content.split(' ').length : 0,
      readTime: post.content ? Math.ceil(post.content.split(' ').length / 200) : 0
    }))
  });

  // Use optimized data hook for blog tags
  const {
    data: blogTags,
    loading: tagsLoading
  } = useAdminData(BlogTagApi, {
    cacheKey: 'blog_tags',
    enableCache: true,
    autoFetch: true
  });

  // Quick statistics
  const quickStats = useMemo(() => [
    {
      title: 'Tổng bài viết',
      value: blogPosts.length,
      icon: FileTextOutlined,
      color: '#6366f1',
      trend: 12.5,
      description: 'Tất cả bài viết trong hệ thống'
    },
    {
      title: 'Đã xuất bản',
      value: blogPosts.filter(post => post.status === 'published').length,
      icon: GlobalOutlined,
      color: '#10b981',
      trend: 8.3,
      description: 'Bài viết đã được công bố'
    },
    {
      title: 'Bản nháp',
      value: blogPosts.filter(post => post.status === 'draft').length,
      icon: EditOutlined,
      color: '#f59e0b',
      trend: -2.1,
      description: 'Bài viết đang soạn thảo'
    },
    {
      title: 'Lượt xem trung bình',
      value: Math.round(blogPosts.reduce((sum, post) => sum + (post.views || 0), 0) / Math.max(blogPosts.length, 1)),
      suffix: ' views',
      icon: EyeOutlined,
      color: '#8b5cf6',
      trend: 15.7,
      description: 'Trung bình lượt xem mỗi bài'
    }
  ], [blogPosts]);

  // Table columns configuration
  const columns = [
    {
      title: 'Tiêu đề',
      dataIndex: 'title',
      key: 'title',
      width: 300,
      fixed: 'left',
      render: (title, record) => (
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
          <Avatar
            size={40}
            src={record.featuredImage}
            icon={<FileTextOutlined />}
            style={{ 
              backgroundColor: '#f0f9ff',
              color: '#0369a1',
              flexShrink: 0
            }}
          />
          <div style={{ minWidth: 0, flex: 1 }}>
            <div style={{ 
              fontWeight: '600', 
              color: '#1f2937',
              marginBottom: '4px',
              display: '-webkit-box',
              WebkitLineClamp: 2,
              WebkitBoxOrient: 'vertical',
              overflow: 'hidden'
            }}>
              {title}
            </div>
            <Text type="secondary" style={{ fontSize: '12px' }}>
              {record.wordCount} từ • {record.readTime} phút đọc
            </Text>
          </div>
        </div>
      ),
      sorter: (a, b) => a.title.localeCompare(b.title),
      searchable: true
    },
    {
      title: 'Trạng thái',
      dataIndex: 'status',
      key: 'status',
      width: 120,
      render: (status) => (
        <StatusBadge
          status={status}
          variant="tag"
          size="small"
        />
      ),
      filters: [
        { text: 'Đã xuất bản', value: 'published' },
        { text: 'Bản nháp', value: 'draft' },
        { text: 'Đã lưu trữ', value: 'archived' }
      ],
      onFilter: (value, record) => record.status === value
    },
    {
      title: 'Tác giả',
      dataIndex: 'author',
      key: 'author',
      width: 150,
      render: (author) => (
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <Avatar 
            size="small" 
            icon={<UserOutlined />}
            style={{ backgroundColor: '#e0e7ff', color: '#4338ca' }}
          />
          <Text style={{ fontSize: '14px' }}>
            {author?.name || 'Không xác định'}
          </Text>
        </div>
      ),
      sorter: (a, b) => (a.author?.name || '').localeCompare(b.author?.name || ''),
      searchable: true
    },
    {
      title: 'Thẻ',
      dataIndex: 'tags',
      key: 'tags',
      width: 200,
      render: (tags = []) => (
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '4px' }}>
          {tags.slice(0, 2).map(tag => (
            <Tag
              key={tag.id}
              color="processing"
              size="small"
              style={{
                margin: 0,
                borderRadius: '6px',
                fontSize: '11px'
              }}
            >
              {tag.name}
            </Tag>
          ))}
          {tags.length > 2 && (
            <Tag 
              size="small" 
              style={{ 
                margin: 0, 
                borderRadius: '6px',
                fontSize: '11px',
                backgroundColor: '#f3f4f6',
                color: '#6b7280',
                border: '1px solid #e5e7eb'
              }}
            >
              +{tags.length - 2}
            </Tag>
          )}
        </div>
      )
    },
    {
      title: 'Lượt xem',
      dataIndex: 'views',
      key: 'views',
      width: 100,
      render: (views = 0) => (
        <div style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
          <EyeOutlined style={{ color: '#6b7280', fontSize: '12px' }} />
          <Text style={{ fontSize: '14px', fontWeight: '500' }}>
            {views.toLocaleString()}
          </Text>
        </div>
      ),
      sorter: (a, b) => (a.views || 0) - (b.views || 0)
    },
    {
      title: 'Ngày tạo',
      dataIndex: 'createdDate',
      key: 'createdDate',
      width: 120,
      render: (date) => (
        <div style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
          <CalendarOutlined style={{ color: '#6b7280', fontSize: '12px' }} />
          <Text type="secondary" style={{ fontSize: '12px' }}>
            {date}
          </Text>
        </div>
      ),
      sorter: (a, b) => new Date(a.createdAt) - new Date(b.createdAt)
    }
  ];

  // Custom filters for table
  const customFilters = [
    {
      key: 'status',
      placeholder: 'Lọc theo trạng thái',
      options: [
        { label: 'Đã xuất bản', value: 'published' },
        { label: 'Bản nháp', value: 'draft' },
        { label: 'Đã lưu trữ', value: 'archived' }
      ]
    },
    {
      key: 'hasImage',
      placeholder: 'Có hình ảnh',
      options: [
        { label: 'Có hình ảnh', value: 'true' },
        { label: 'Không có hình ảnh', value: 'false' }
      ]
    }
  ];

  // Action handlers
  const handleAdd = useCallback(() => {
    message.info('Tính năng thêm bài viết đang được phát triển');
  }, []);

  const handleEdit = useCallback((record) => {
    message.info(`Chỉnh sửa bài viết: ${record.title}`);
  }, []);

  const handleDelete = useCallback(async (record) => {
    try {
      await deleteItem(record.id);
    } catch (error) {
      console.error('Error deleting blog post:', error);
    }
  }, [deleteItem]);

  const handleView = useCallback((record) => {
    window.open(`/blog/${record.slug || record.id}`, '_blank');
  }, []);

  const handleBulkDelete = useCallback(async () => {
    if (selectedRowKeys.length === 0) {
      message.warning('Vui lòng chọn ít nhất một bài viết để xóa');
      return;
    }

    try {
      await bulkDelete(selectedRowKeys);
      setSelectedRowKeys([]);
    } catch (error) {
      console.error('Error bulk deleting:', error);
    }
  }, [selectedRowKeys, bulkDelete]);

  const handleExport = useCallback(() => {
    message.info('Tính năng xuất dữ liệu đang được phát triển');
  }, []);

  // Table actions
  const tableActions = [
    {
      key: 'duplicate',
      icon: <FileTextOutlined />,
      label: 'Nhân bản',
      onClick: (record) => message.info(`Nhân bản: ${record.title}`)
    },
    {
      key: 'archive',
      icon: <DeleteOutlined />,
      label: 'Lưu trữ',
      onClick: (record) => message.info(`Lưu trữ: ${record.title}`)
    }
  ];

  // Page header actions
  const headerActions = [
    <Tooltip key="refresh" title="Làm mới dữ liệu">
      <Button
        icon={<ReloadOutlined />}
        onClick={refresh}
        loading={loading}
      >
        Làm mới
      </Button>
    </Tooltip>,
    <Dropdown
      key="more"
      menu={{
        items: [
          {
            key: 'export',
            icon: <ExportOutlined />,
            label: 'Xuất dữ liệu',
            onClick: handleExport
          },
          {
            key: 'import',
            icon: <FileTextOutlined />,
            label: 'Nhập dữ liệu'
          },
          {
            key: 'settings',
            icon: <FilterOutlined />,
            label: 'Cài đặt hiển thị'
          }
        ]
      }}
    >
      <Button icon={<MoreOutlined />}>
        Thêm
      </Button>
    </Dropdown>,
    <Button
      key="add"
      type="primary"
      icon={<PlusOutlined />}
      onClick={handleAdd}
      style={{
        background: 'linear-gradient(45deg, #6366f1, #8b5cf6)',
        border: 'none'
      }}
    >
      Thêm bài viết
    </Button>
  ];

  // Page header statistics
  const headerStats = [
    {
      label: 'Tổng bài viết',
      value: blogPosts.length,
      trend: 12.5
    },
    {
      label: 'Đã xuất bản',
      value: blogPosts.filter(p => p.status === 'published').length,
      trend: 8.3
    },
    {
      label: 'Bản nháp',
      value: blogPosts.filter(p => p.status === 'draft').length,
      trend: -2.1
    },
    {
      label: 'Tổng lượt xem',
      value: blogPosts.reduce((sum, post) => sum + (post.views || 0), 0),
      suffix: ' views',
      trend: 15.7
    }
  ];

  if (error) {
    return (
      <Card>
        <div style={{ textAlign: 'center', padding: '50px 0' }}>
          <Text type="danger">Có lỗi xảy ra: {error}</Text>
          <br />
          <Button onClick={refresh} style={{ marginTop: '16px' }}>
            Thử lại
          </Button>
        </div>
      </Card>
    );
  }

  return (
    <div className="blog-posts-management">
      {/* Enhanced Page Header */}
      <PageHeader
        title="Quản lý Blog"
        subtitle="Tạo và quản lý nội dung blog chuyên nghiệp"
        icon={FileTextOutlined}
        actions={headerActions}
        variant="gradient"
        statistics={headerStats}
      />

      {/* Quick Statistics */}
      <QuickStats
        data={quickStats}
        loading={loading}
        variant="cards"
        columns={4}
        showTrend={true}
        animated={true}
        style={{ marginBottom: '24px' }}
      />

      {/* Bulk Actions */}
      {selectedRowKeys.length > 0 && (
        <Card style={{ marginBottom: '16px' }}>
          <Row justify="space-between" align="middle">
            <Col>
              <Text strong>
                Đã chọn {selectedRowKeys.length} bài viết
              </Text>
            </Col>
            <Col>
              <Space>
                <Button onClick={() => setSelectedRowKeys([])}>
                  Bỏ chọn
                </Button>
                <Button 
                  danger 
                  icon={<DeleteOutlined />}
                  onClick={handleBulkDelete}
                >
                  Xóa đã chọn
                </Button>
              </Space>
            </Col>
          </Row>
        </Card>
      )}

      {/* Enhanced Data Table */}
      <DataTable
        data={blogPosts}
        columns={columns}
        loading={loading}
        searchable={true}
        filterable={true}
        selectable={true}
        selectedRowKeys={selectedRowKeys}
        onSelectedRowKeysChange={setSelectedRowKeys}
        customFilters={customFilters}
        actions={tableActions}
        onAdd={handleAdd}
        onEdit={handleEdit}
        onDelete={handleDelete}
        onView={handleView}
        onRefresh={refresh}
        onExport={handleExport}
        searchPlaceholder="Tìm kiếm bài viết, tác giả, thẻ..."
        emptyText="Chưa có bài viết nào"
        pagination={{
          pageSize: 10,
          showSizeChanger: true,
          showQuickJumper: true,
          showTotal: (total, range) => 
            `${range[0]}-${range[1]} của ${total} bài viết`
        }}
      />
    </div>
  );
};

export default BlogPostsManagement;
