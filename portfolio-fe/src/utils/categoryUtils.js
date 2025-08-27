import { message } from 'antd';

export const handleApiError = (error, defaultMessage = 'Có lỗi xảy ra!') => {
  const errorMessage = error.response?.data?.message || 
                      error.response?.data?.error || 
                      error.message || 
                      defaultMessage;
  
  message.error(errorMessage);
  console.error('API Error:', error);
};

export const validateCategoryName = (name) => {
  if (!name || !name.trim()) {
    return 'Tên danh mục không được để trống';
  }
  
  if (name.length > 50) {
    return 'Tên danh mục không được vượt quá 50 ký tự';
  }
  
  if (!/^[a-zA-Z0-9\s/\-_.]+$/.test(name)) {
    return 'Tên danh mục chỉ được chứa chữ cái, số và các ký tự / - _ .';
  }
  
  return null;
};

export const formatCategoryData = (categories) => {
  return categories.map((category, index) => ({
    ...category,
    key: category.categoryId,
    index: index + 1,
    projectCount: category.projectCount || 0,
    status: category.status || 'active'
  }));
};
