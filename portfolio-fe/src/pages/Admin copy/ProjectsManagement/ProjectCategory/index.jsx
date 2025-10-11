import React, { useState, useEffect } from "react";
import { 
  Card, 
  Button, 
  message, 
  Typography,
  Space,
  Input,
  Row,
  Col,
  Alert
} from "antd";
import { 
  FolderIcon, 
  PlusIcon,
  MagnifyingGlassIcon
} from '@heroicons/react/24/outline';
import { PageHeader } from '../../../../components/Admin';
import CategoryTable from '../../../../components/Admin/ProjectCategory/CategoryTable';
import CategoryModal from '../../../../components/Admin/ProjectCategory/CategoryModal';
import CategoryStats from '../../../../components/Admin/ProjectCategory/CategoryStats';
import projectCategoryApi from '../../../../api/admin/projects/ProjectCategoryApi';
import { handleApiError, formatCategoryData } from '../../../../utils/categoryUtils';

const { Title } = Typography;
const { Search } = Input;

const ProjectCategory = () => {
  const [categories, setCategories] = useState([]);
  const [filteredCategories, setFilteredCategories] = useState([]);
  const [loading, setLoading] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);
  const [editingCategory, setEditingCategory] = useState(null);
  const [submitLoading, setSubmitLoading] = useState(false);
  const [searchText, setSearchText] = useState('');
  const [error, setError] = useState(null);

  // Fetch categories from API
  const fetchCategories = async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await projectCategoryApi.getAll();
      const categoriesData = formatCategoryData(response.data || []);
      setCategories(categoriesData);
      setFilteredCategories(categoriesData);
    } catch (error) {
      setError('Không thể tải danh sách danh mục. Vui lòng thử lại!');
      handleApiError(error, 'Không thể tải danh sách danh mục!');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCategories();
  }, []);

  // Handle search
  const handleSearch = (value) => {
    setSearchText(value);
    if (!value.trim()) {
      setFilteredCategories(categories);
    } else {
      const filtered = categories.filter(category =>
        category.name.toLowerCase().includes(value.toLowerCase())
      );
      setFilteredCategories(filtered);
    }
  };

  // Handle create/update category
  const handleSubmit = async (values) => {
    setSubmitLoading(true);
    try {
      if (editingCategory) {
        await projectCategoryApi.update(editingCategory.categoryId, values);
        message.success('Cập nhật danh mục thành công!');
      } else {
        await projectCategoryApi.create(values);
        message.success('Tạo danh mục thành công!');
      }
      setModalVisible(false);
      setEditingCategory(null);
      fetchCategories();
    } catch (error) {
      handleApiError(error, editingCategory ? 'Cập nhật thất bại!' : 'Tạo danh mục thất bại!');
    } finally {
      setSubmitLoading(false);
    }
  };

  // Handle delete category
  const handleDelete = async (categoryId) => {
    try {
      await projectCategoryApi.delete(categoryId);
      message.success('Xóa danh mục thành công!');
      fetchCategories();
    } catch (error) {
      handleApiError(error, 'Xóa danh mục thất bại!');
    }
  };

  // Handle edit category
  const handleEdit = (category) => {
    setEditingCategory(category);
    setModalVisible(true);
  };

  // Handle view category
  const handleView = (category) => {
    message.info(`Xem chi tiết danh mục: ${category.name}`);
  };

  // Handle create new category
  const handleCreate = () => {
    setEditingCategory(null);
    setModalVisible(true);
  };

  // Handle modal close
  const handleModalClose = () => {
    setModalVisible(false);
    setEditingCategory(null);
  };

  // Handle retry
  const handleRetry = () => {
    fetchCategories();
  };

  return (
    <div className="space-y-6">
      <PageHeader
        title="Quản lý Danh mục Dự án"
        subtitle="Quản lý các danh mục và phân loại dự án"
        icon={FolderIcon}
      />

      {/* Error Alert */}
      {error && (
        <Alert
          message="Lỗi tải dữ liệu"
          description={error}
          type="error"
          showIcon
          closable
          onClose={() => setError(null)}
          action={
            <Button size="small" onClick={handleRetry}>
              Thử lại
            </Button>
          }
        />
      )}

      {/* Statistics Cards */}
      <CategoryStats categories={categories} />

      {/* Search and Actions */}
      <Card className="shadow-sm">
        <Row gutter={16} className="mb-4">
          <Col xs={24} sm={16} md={18}>
            <Search
              placeholder="Tìm kiếm danh mục..."
              allowClear
              size="large"
              prefix={<MagnifyingGlassIcon className="w-4 h-4 text-gray-400" />}
              onSearch={handleSearch}
              onChange={(e) => handleSearch(e.target.value)}
              value={searchText}
            />
          </Col>
          <Col xs={24} sm={8} md={6}>
            <Button
              type="primary"
              icon={<PlusIcon className="w-4 h-4" />}
              onClick={handleCreate}
              size="large"
              block
              className="flex items-center justify-center"
            >
              Thêm danh mục
            </Button>
          </Col>
        </Row>
      </Card>

      {/* Main Table Card */}
      <Card 
        title={
          <div className="flex items-center justify-between">
            <Title level={4} className="mb-0">
              Danh sách Danh mục Dự án
            </Title>
            <Space>
              <span className="text-sm text-gray-500">
                Hiển thị {filteredCategories.length} / {categories.length} danh mục
              </span>
            </Space>
          </div>
        }
        className="shadow-sm"
      >
        <CategoryTable
          categories={filteredCategories}
          loading={loading}
          onEdit={handleEdit}
          onDelete={handleDelete}
          onView={handleView}
        />
      </Card>

      {/* Create/Edit Modal */}
      <CategoryModal
        visible={modalVisible}
        onCancel={handleModalClose}
        onSubmit={handleSubmit}
        editingCategory={editingCategory}
        loading={submitLoading}
      />
    </div>
  );
};

export default ProjectCategory;
