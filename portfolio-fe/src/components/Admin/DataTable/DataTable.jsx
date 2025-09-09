import React, { useState, useMemo, useCallback } from 'react';
import {
  Table,
  Card,
  Space,
  Button,
  Input,
  Select,
  Tooltip,
  Tag,
  Popconfirm,
  Badge,
  Typography,
  Row,
  Col,
  Dropdown,
  message,
  ConfigProvider,
  Empty,
  Spin
} from 'antd';
import {
  SearchOutlined,
  EditOutlined,
  DeleteOutlined,
  MoreOutlined,
  FilterOutlined,
  ReloadOutlined,
  ExportOutlined,
  PlusOutlined,
  EyeOutlined,
  SettingOutlined
} from '@ant-design/icons';
import { motion } from 'framer-motion';
import PropTypes from 'prop-types';

const { Text } = Typography;
const { Option } = Select;

const DataTable = ({
  data = [],
  columns = [],
  loading = false,
  title,
  subtitle,
  searchable = true,
  filterable = true,
  sortable = true,
  selectable = false,
  pagination = true,
  actions = [],
  onAdd,
  onEdit,
  onDelete,
  onView,
  onExport,
  onRefresh,
  searchPlaceholder = "Tìm kiếm...",
  emptyText = "Không có dữ liệu",
  className = "",
  rowKey = "id",
  size = "middle",
  bordered = false,
  showHeader = true,
  scroll = null,
  expandable = null,
  customFilters = [],
  actionColumnWidth = 120,
  showQuickActions = true
}) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedRowKeys, setSelectedRowKeys] = useState([]);
  const [filters, setFilters] = useState({});
  const [sorter, setSorter] = useState({});
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);

  // Enhanced search functionality
  const searchableColumns = useMemo(() => {
    return columns.filter(col => col.searchable !== false);
  }, [columns]);

  const filteredData = useMemo(() => {
    let result = [...data];

    // Apply search
    if (searchTerm && searchable) {
      result = result.filter(record => {
        return searchableColumns.some(col => {
          const value = record[col.dataIndex];
          if (value == null) return false;
          return String(value).toLowerCase().includes(searchTerm.toLowerCase());
        });
      });
    }

    // Apply custom filters
    Object.entries(filters).forEach(([key, value]) => {
      if (value && value !== 'all') {
        result = result.filter(record => {
          const recordValue = record[key];
          if (Array.isArray(value)) {
            return value.includes(recordValue);
          }
          return recordValue === value;
        });
      }
    });

    return result;
  }, [data, searchTerm, filters, searchableColumns, searchable]);

  // Enhanced columns with actions
  const enhancedColumns = useMemo(() => {
    const baseColumns = columns.map(col => ({
      ...col,
      sorter: sortable && col.sorter !== false ? (a, b) => {
        const aVal = a[col.dataIndex];
        const bVal = b[col.dataIndex];
        if (typeof aVal === 'string') {
          return aVal.localeCompare(bVal);
        }
        return aVal - bVal;
      } : false,
      filteredValue: filters[col.dataIndex] || null,
      onFilter: filterable && col.filters ? (value, record) => {
        return record[col.dataIndex] === value;
      } : null
    }));

    // Add actions column if any actions are provided
    if (showQuickActions && (onEdit || onDelete || onView || actions.length > 0)) {
      baseColumns.push({
        title: 'Thao tác',
        key: 'actions',
        width: actionColumnWidth,
        fixed: 'right',
        render: (_, record) => (
          <Space size="small">
            {onView && (
              <Tooltip title="Xem chi tiết">
                <Button
                  type="text"
                  size="small"
                  icon={<EyeOutlined />}
                  onClick={() => onView(record)}
                  style={{ color: '#1890ff' }}
                />
              </Tooltip>
            )}
            {onEdit && (
              <Tooltip title="Chỉnh sửa">
                <Button
                  type="text"
                  size="small"
                  icon={<EditOutlined />}
                  onClick={() => onEdit(record)}
                  style={{ color: '#52c41a' }}
                />
              </Tooltip>
            )}
            {onDelete && (
              <Tooltip title="Xóa">
                <Popconfirm
                  title="Xác nhận xóa"
                  description="Bạn có chắc chắn muốn xóa mục này?"
                  onConfirm={() => onDelete(record)}
                  okText="Xóa"
                  cancelText="Hủy"
                  okType="danger"
                >
                  <Button
                    type="text"
                    size="small"
                    icon={<DeleteOutlined />}
                    danger
                  />
                </Popconfirm>
              </Tooltip>
            )}
            {actions.length > 0 && (
              <Dropdown
                menu={{
                  items: actions.map((action, index) => ({
                    key: index,
                    icon: action.icon,
                    label: action.label,
                    onClick: () => action.onClick(record),
                    disabled: action.disabled ? action.disabled(record) : false
                  }))
                }}
                trigger={['click']}
              >
                <Button
                  type="text"
                  size="small"
                  icon={<MoreOutlined />}
                />
              </Dropdown>
            )}
          </Space>
        )
      });
    }

    return baseColumns;
  }, [columns, onEdit, onDelete, onView, actions, showQuickActions, actionColumnWidth, sortable, filterable, filters]);

  // Table change handler
  const handleTableChange = useCallback((paginationInfo, filtersInfo, sorterInfo) => {
    setCurrentPage(paginationInfo.current);
    setPageSize(paginationInfo.pageSize);
    setFilters(filtersInfo);
    setSorter(sorterInfo);
  }, []);

  // Selection handler
  const rowSelection = selectable ? {
    selectedRowKeys,
    onChange: setSelectedRowKeys,
    selections: [
      Table.SELECTION_ALL,
      Table.SELECTION_INVERT,
      Table.SELECTION_NONE,
    ],
  } : null;

  // Toolbar actions
  const toolbarActions = [
    ...(onRefresh ? [{
      key: 'refresh',
      icon: <ReloadOutlined />,
      label: 'Làm mới',
      onClick: onRefresh
    }] : []),
    ...(onExport ? [{
      key: 'export',
      icon: <ExportOutlined />,
      label: 'Xuất dữ liệu',
      onClick: onExport
    }] : []),
    {
      key: 'settings',
      icon: <SettingOutlined />,
      label: 'Cài đặt',
      onClick: () => message.info('Tính năng cài đặt đang phát triển')
    }
  ];

  return (
    <ConfigProvider
      renderEmpty={() => (
        <Empty
          image={Empty.PRESENTED_IMAGE_SIMPLE}
          description={emptyText}
          style={{ margin: '40px 0' }}
        />
      )}
    >
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
      >
        <Card
          className={`admin-data-table ${className}`}
          style={{
            borderRadius: '16px',
            overflow: 'hidden',
            boxShadow: '0 4px 16px rgba(0,0,0,0.08)'
          }}
        >
          {/* Header */}
          {(title || subtitle || searchable || filterable || onAdd) && (
            <div style={{ padding: '24px 24px 0 24px' }}>
              <Row justify="space-between" align="middle" gutter={[16, 16]}>
                <Col xs={24} lg={12}>
                  {(title || subtitle) && (
                    <div style={{ marginBottom: '16px' }}>
                      {title && (
                        <Text strong style={{ fontSize: '18px', display: 'block' }}>
                          {title}
                        </Text>
                      )}
                      {subtitle && (
                        <Text type="secondary" style={{ fontSize: '14px' }}>
                          {subtitle}
                        </Text>
                      )}
                    </div>
                  )}
                </Col>
                <Col xs={24} lg={12} style={{ textAlign: 'right' }}>
                  <Space>
                    {onAdd && (
                      <Button
                        type="primary"
                        icon={<PlusOutlined />}
                        onClick={onAdd}
                        style={{
                          background: 'linear-gradient(45deg, #6366f1, #8b5cf6)',
                          border: 'none',
                          borderRadius: '8px'
                        }}
                      >
                        Thêm mới
                      </Button>
                    )}
                    {toolbarActions.length > 0 && (
                      <Dropdown
                        menu={{ items: toolbarActions }}
                        trigger={['click']}
                      >
                        <Button icon={<MoreOutlined />} />
                      </Dropdown>
                    )}
                  </Space>
                </Col>
              </Row>

              {/* Filters Row */}
              {(searchable || filterable || customFilters.length > 0) && (
                <Row gutter={[16, 16]} style={{ marginTop: '16px', marginBottom: '16px' }}>
                  {searchable && (
                    <Col xs={24} sm={12} lg={8}>
                      <Input.Search
                        placeholder={searchPlaceholder}
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        onSearch={setSearchTerm}
                        allowClear
                        style={{ borderRadius: '8px' }}
                        enterButton={
                          <Button
                            type="primary"
                            icon={<SearchOutlined />}
                            style={{
                              background: 'linear-gradient(45deg, #6366f1, #8b5cf6)',
                              border: 'none'
                            }}
                          />
                        }
                      />
                    </Col>
                  )}
                  
                  {customFilters.map((filter, index) => (
                    <Col xs={24} sm={12} lg={6} key={index}>
                      <Select
                        placeholder={filter.placeholder}
                        value={filters[filter.key]}
                        onChange={(value) => setFilters(prev => ({ ...prev, [filter.key]: value }))}
                        style={{ width: '100%', borderRadius: '8px' }}
                        allowClear
                      >
                        <Option value="all">Tất cả</Option>
                        {filter.options.map(option => (
                          <Option key={option.value} value={option.value}>
                            {option.label}
                          </Option>
                        ))}
                      </Select>
                    </Col>
                  ))}

                  {(searchTerm || Object.keys(filters).length > 0) && (
                    <Col xs={24} sm={12} lg={4}>
                      <Button
                        onClick={() => {
                          setSearchTerm('');
                          setFilters({});
                          setCurrentPage(1);
                        }}
                        style={{ borderRadius: '8px' }}
                      >
                        Xóa bộ lọc
                      </Button>
                    </Col>
                  )}
                </Row>
              )}

              {/* Selection Info */}
              {selectable && selectedRowKeys.length > 0 && (
                <div style={{ marginBottom: '16px' }}>
                  <Badge count={selectedRowKeys.length} showZero={false}>
                    <Tag color="blue">
                      Đã chọn {selectedRowKeys.length} mục
                    </Tag>
                  </Badge>
                </div>
              )}
            </div>
          )}

          {/* Table */}
          <div style={{ padding: '0 24px 24px 24px' }}>
            <Spin spinning={loading}>
              <Table
                rowKey={rowKey}
                columns={enhancedColumns}
                dataSource={filteredData}
                rowSelection={rowSelection}
                pagination={pagination ? {
                  current: currentPage,
                  pageSize: pageSize,
                  total: filteredData.length,
                  showSizeChanger: true,
                  showQuickJumper: true,
                  showTotal: (total, range) => 
                    `${range[0]}-${range[1]} của ${total} mục`,
                  pageSizeOptions: ['10', '20', '50', '100'],
                  style: { marginTop: '16px' }
                } : false}
                onChange={handleTableChange}
                size={size}
                bordered={bordered}
                showHeader={showHeader}
                scroll={scroll}
                expandable={expandable}
                className="enhanced-table"
                style={{
                  borderRadius: '12px',
                  overflow: 'hidden'
                }}
              />
            </Spin>
          </div>
        </Card>
      </motion.div>
    </ConfigProvider>
  );
};

DataTable.propTypes = {
  data: PropTypes.array,
  columns: PropTypes.array,
  loading: PropTypes.bool,
  title: PropTypes.string,
  subtitle: PropTypes.string,
  searchable: PropTypes.bool,
  filterable: PropTypes.bool,
  sortable: PropTypes.bool,
  selectable: PropTypes.bool,
  pagination: PropTypes.bool,
  actions: PropTypes.array,
  onAdd: PropTypes.func,
  onEdit: PropTypes.func,
  onDelete: PropTypes.func,
  onView: PropTypes.func,
  onExport: PropTypes.func,
  onRefresh: PropTypes.func,
  searchPlaceholder: PropTypes.string,
  emptyText: PropTypes.string,
  className: PropTypes.string,
  rowKey: PropTypes.string,
  size: PropTypes.oneOf(['small', 'middle', 'large']),
  bordered: PropTypes.bool,
  showHeader: PropTypes.bool,
  scroll: PropTypes.object,
  expandable: PropTypes.object,
  customFilters: PropTypes.array,
  actionColumnWidth: PropTypes.number,
  showQuickActions: PropTypes.bool
};

export default DataTable;
