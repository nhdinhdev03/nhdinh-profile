import React from 'react';
import { 
  Table, 
  Button, 
  Popconfirm, 
  Space, 
  Tag, 
  Tooltip,
  Empty 
} from 'antd';
import { 
  PencilIcon, 
  TrashIcon,
  EyeIcon 
} from '@heroicons/react/24/outline';

const CategoryTable = ({ 
  categories, 
  loading, 
  onEdit, 
  onDelete, 
  onView 
}) => {
  const columns = [
    {
      title: 'STT',
      dataIndex: 'index',
      key: 'index',
      width: 60,
      render: (_, __, index) => index + 1,
    },
    {
      title: 'ID',
      dataIndex: 'categoryId',
      key: 'categoryId',
      width: 120,
      render: (id) => (
        <Tooltip title={id}>
          <Tag color="blue" className="font-mono text-xs">
            {id.substring(0, 8)}...
          </Tag>
        </Tooltip>
      ),
    },
    {
      title: 'Tên danh mục',
      dataIndex: 'name',
      key: 'name',
      render: (name) => (
        <span className="font-medium text-gray-900">{name}</span>
      ),
    },
    {
      title: 'Số dự án',
      dataIndex: 'projectCount',
      key: 'projectCount',
      width: 100,
      render: (count = 0) => (
        <Tag color={count > 0 ? 'green' : 'default'}>
          {count} dự án
        </Tag>
      ),
    },
    {
      title: 'Trạng thái',
      dataIndex: 'status',
      key: 'status',
      width: 100,
      render: (status = 'active') => (
        <Tag color={status === 'active' ? 'success' : 'default'}>
          {status === 'active' ? 'Hoạt động' : 'Không hoạt động'}
        </Tag>
      ),
    },
    {
      title: 'Thao tác',
      key: 'actions',
      width: 150,
      render: (_, record) => (
        <Space size="small">
          <Tooltip title="Xem chi tiết">
            <Button
              type="text"
              icon={<EyeIcon className="w-4 h-4" />}
              size="small"
              onClick={() => onView?.(record)}
              className="text-blue-600 hover:text-blue-800"
            />
          </Tooltip>
          <Tooltip title="Chỉnh sửa">
            <Button
              type="text"
              icon={<PencilIcon className="w-4 h-4" />}
              size="small"
              onClick={() => onEdit(record)}
              className="text-green-600 hover:text-green-800"
            />
          </Tooltip>
          <Tooltip title="Xóa">
            <Popconfirm
              title="Xác nhận xóa"
              description="Bạn có chắc chắn muốn xóa danh mục này?"
              onConfirm={() => onDelete(record.categoryId)}
              okText="Xóa"
              cancelText="Hủy"
              okButtonProps={{ danger: true }}
            >
              <Button
                type="text"
                icon={<TrashIcon className="w-4 h-4" />}
                size="small"
                className="text-red-600 hover:text-red-800"
              />
            </Popconfirm>
          </Tooltip>
        </Space>
      ),
    },
  ];

  return (
    <Table
      columns={columns}
      dataSource={categories}
      rowKey="categoryId"
      loading={loading}
      pagination={{
        pageSize: 10,
        showSizeChanger: true,
        showQuickJumper: true,
        showTotal: (total, range) =>
          `${range[0]}-${range[1]} của ${total} danh mục`,
      }}
      className="ant-table-striped"
      rowClassName={(_, index) =>
        index % 2 === 0 ? 'bg-gray-50' : 'bg-white'
      }
      locale={{
        emptyText: (
          <Empty
            description="Chưa có danh mục nào"
            image={Empty.PRESENTED_IMAGE_SIMPLE}
          />
        ),
      }}
    />
  );
};

export default CategoryTable;
