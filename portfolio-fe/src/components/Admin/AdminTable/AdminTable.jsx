import React, { useState, useMemo, useCallback } from 'react';
import { 
  Table, 
  Input, 
  Select, 
  Space, 
  Button, 
  Tooltip, 
  Typography, 
  Card,
  Row,
  Col,
  Divider
} from 'antd';
import { 
  SearchOutlined, 
  ReloadOutlined,
  DownloadOutlined
} from '@ant-design/icons';
import PropTypes from 'prop-types';
import './AdminTable.scss';

const { Text } = Typography;
const { Option } = Select;

// Default pagination configuration
const DEFAULT_PAGINATION = {
  current: 1,
  pageSize: 20,
  showSizeChanger: true,
  showQuickJumper: true,
  showTotal: (total, range) => `${range[0]}-${range[1]} của ${total} mục`,
  pageSizeOptions: ['10', '20', '50', '100'],
  size: 'default',
};

const AdminTable = ({
  columns = [],
  dataSource = [],
  loading = false,
  searchable = true,
  filterable = true,
  exportable = false,
  refreshable = false,
  selectable = false,
  pagination = true,
  size = 'middle',
  bordered = false,
  striped = true,
  sticky = true,
  title,
  extra,
  onSearch,
  onRefresh,
  onExport,
  onSelectionChange,
  rowKey = 'id',
  emptyText = 'Không có dữ liệu',
  className = '',
  tableClassName = '',
  searchPlaceholder = 'Tìm kiếm...',
  searchProps = {},
  filters = [],
  customActions,
  ...tableProps
}) => {
  const [searchText, setSearchText] = useState('');
  const [searchColumn, setSearchColumn] = useState('all');
  const [activeFilters, setActiveFilters] = useState({});
  const [selectedRowKeys, setSelectedRowKeys] = useState([]);

  // Handle search
  const handleSearch = useCallback((value, column = 'all') => {
    setSearchText(value);
    setSearchColumn(column);
    if (onSearch) {
      onSearch(value, column);
    }
  }, [onSearch]);

  // Handle filter change
  const handleFilterChange = useCallback((filterKey, value) => {
    const newFilters = { ...activeFilters };
    if (value === undefined || value === null || value === '') {
      delete newFilters[filterKey];
    } else {
      newFilters[filterKey] = value;
    }
    setActiveFilters(newFilters);
  }, [activeFilters]);

  // Handle selection change
  const handleSelectionChange = useCallback((newSelectedRowKeys, newSelectedRows) => {
    setSelectedRowKeys(newSelectedRowKeys);
    if (onSelectionChange) {
      onSelectionChange(newSelectedRowKeys, newSelectedRows);
    }
  }, [onSelectionChange]);

  // Generate searchable columns for search column selector
  const searchableColumns = useMemo(() => {
    const cols = [{ label: 'Tất cả', value: 'all' }];
    columns.forEach(col => {
      if (col.searchable !== false && col.dataIndex) {
        cols.push({
          label: col.title,
          value: col.dataIndex
        });
      }
    });
    return cols;
  }, [columns]);

  // Filter data based on search and filters
  const filteredData = useMemo(() => {
    let filtered = [...dataSource];

    // Apply search filter
    if (searchText && searchText.trim()) {
      const searchValue = searchText.toLowerCase().trim();
      filtered = filtered.filter(record => {
        if (searchColumn === 'all') {
          // Search in all searchable columns
          return columns.some(col => {
            if (col.searchable === false || !col.dataIndex) return false;
            const value = record[col.dataIndex];
            return value && String(value).toLowerCase().includes(searchValue);
          });
        } else {
          // Search in specific column
          const value = record[searchColumn];
          return value && String(value).toLowerCase().includes(searchValue);
        }
      });
    }

    // Apply custom filters
    Object.entries(activeFilters).forEach(([filterKey, filterValue]) => {
      const filter = filters.find(f => f.key === filterKey);
      if (filter && filter.onFilter) {
        filtered = filtered.filter(record => filter.onFilter(filterValue, record));
      }
    });

    return filtered;
  }, [dataSource, searchText, searchColumn, activeFilters, columns, filters]);

  // Selection configuration
  const rowSelection = selectable ? {
    selectedRowKeys,
    onChange: handleSelectionChange,
    onSelectAll: (selected, selectedRows, changeRows) => {
      console.log('Select all:', selected, selectedRows, changeRows);
    },
    onSelect: (record, selected, selectedRows, nativeEvent) => {
      console.log('Select:', record, selected, selectedRows, nativeEvent);
    },
    selections: [
      Table.SELECTION_ALL,
      Table.SELECTION_INVERT,
      Table.SELECTION_NONE,
    ],
  } : undefined;

  // Pagination configuration
  const paginationConfig = pagination === false ? false : {
    ...DEFAULT_PAGINATION,
    ...(typeof pagination === 'object' ? pagination : {}),
  };

  // Render table header
  const renderTableHeader = () => {
    if (!searchable && !filterable && !refreshable && !exportable && !title && !extra && !customActions) {
      return null;
    }

    return (
      <div className="admin-table__header">
        <Row justify="space-between" align="middle" gutter={[16, 16]}>
          {/* Title */}
          {title && (
            <Col>
              <Typography.Title level={4} style={{ margin: 0 }}>
                {title}
              </Typography.Title>
            </Col>
          )}

          {/* Search and filters */}
          <Col flex="auto">
            <Row gutter={[12, 12]} justify="end">
              {searchable && (
                <Col>
                  <Input.Group compact>
                    {searchableColumns.length > 1 && (
                      <Select
                        value={searchColumn}
                        onChange={(value) => setSearchColumn(value)}
                        style={{ width: 120 }}
                        size="middle"
                      >
                        {searchableColumns.map(col => (
                          <Option key={col.value} value={col.value}>
                            {col.label}
                          </Option>
                        ))}
                      </Select>
                    )}
                    <Input
                      placeholder={searchPlaceholder}
                      value={searchText}
                      onChange={(e) => handleSearch(e.target.value, searchColumn)}
                      prefix={<SearchOutlined />}
                      style={{ width: 250 }}
                      allowClear
                      {...searchProps}
                    />
                  </Input.Group>
                </Col>
              )}

              {/* Custom filters */}
              {filterable && filters.map(filter => (
                <Col key={filter.key}>
                  <Select
                    placeholder={filter.placeholder}
                    value={activeFilters[filter.key]}
                    onChange={(value) => handleFilterChange(filter.key, value)}
                    style={{ width: filter.width || 150 }}
                    allowClear
                    showSearch={filter.showSearch}
                  >
                    {filter.options.map(option => (
                      <Option key={option.value} value={option.value}>
                        {option.label}
                      </Option>
                    ))}
                  </Select>
                </Col>
              ))}

              {/* Action buttons */}
              <Col>
                <Space>
                  {refreshable && (
                    <Tooltip title="Làm mới">
                      <Button
                        icon={<ReloadOutlined />}
                        onClick={onRefresh}
                        loading={loading}
                      />
                    </Tooltip>
                  )}
                  
                  {exportable && (
                    <Tooltip title="Xuất dữ liệu">
                      <Button
                        icon={<DownloadOutlined />}
                        onClick={() => onExport && onExport(filteredData)}
                      />
                    </Tooltip>
                  )}
                  
                  {customActions}
                  
                  {extra}
                </Space>
              </Col>
            </Row>
          </Col>
        </Row>
        
        {/* Selection info */}
        {selectable && selectedRowKeys.length > 0 && (
          <>
            <Divider style={{ margin: '12px 0' }} />
            <Row justify="space-between" align="middle">
              <Col>
                <Text type="secondary">
                  Đã chọn {selectedRowKeys.length} mục
                </Text>
              </Col>
              <Col>
                <Button 
                  size="small" 
                  onClick={() => handleSelectionChange([], [])}
                >
                  Bỏ chọn tất cả
                </Button>
              </Col>
            </Row>
          </>
        )}
      </div>
    );
  };

  return (
    <div className={`admin-table ${className}`}>
      <Card 
        bordered={false}
        className="admin-table__container"
        bodyStyle={{ padding: 0 }}
      >
        {renderTableHeader()}
        
        <Table
          columns={columns}
          dataSource={filteredData}
          loading={loading}
          rowKey={rowKey}
          rowSelection={rowSelection}
          pagination={paginationConfig}
          size={size}
          bordered={bordered}
          sticky={sticky}
          scroll={{ x: 'max-content' }}
          locale={{
            emptyText: emptyText,
            filterTitle: 'Bộ lọc',
            filterConfirm: 'Lọc',
            filterReset: 'Xóa',
            selectAll: 'Chọn tất cả',
            selectInvert: 'Chọn ngược',
            selectNone: 'Bỏ chọn tất cả',
            selectionAll: 'Chọn tất cả dữ liệu',
            sortTitle: 'Sắp xếp',
            expand: 'Mở rộng',
            collapse: 'Thu gọn',
            triggerDesc: 'Nhấn để sắp xếp giảm dần',
            triggerAsc: 'Nhấn để sắp xếp tăng dần',
            cancelSort: 'Nhấn để hủy sắp xếp',
          }}
          className={`admin-table__table ${striped ? 'admin-table__table--striped' : ''} ${tableClassName}`}
          {...tableProps}
        />
      </Card>
    </div>
  );
};

AdminTable.propTypes = {
  columns: PropTypes.array.isRequired,
  dataSource: PropTypes.array,
  loading: PropTypes.bool,
  searchable: PropTypes.bool,
  filterable: PropTypes.bool,
  exportable: PropTypes.bool,
  refreshable: PropTypes.bool,
  selectable: PropTypes.bool,
  pagination: PropTypes.oneOfType([PropTypes.bool, PropTypes.object]),
  size: PropTypes.oneOf(['small', 'middle', 'large']),
  bordered: PropTypes.bool,
  striped: PropTypes.bool,
  sticky: PropTypes.bool,
  title: PropTypes.node,
  extra: PropTypes.node,
  onSearch: PropTypes.func,
  onRefresh: PropTypes.func,
  onExport: PropTypes.func,
  onSelectionChange: PropTypes.func,
  rowKey: PropTypes.oneOfType([PropTypes.string, PropTypes.func]),
  emptyText: PropTypes.node,
  className: PropTypes.string,
  tableClassName: PropTypes.string,
  searchPlaceholder: PropTypes.string,
  searchProps: PropTypes.object,
  filters: PropTypes.array,
  customActions: PropTypes.node,
};

export default AdminTable;
