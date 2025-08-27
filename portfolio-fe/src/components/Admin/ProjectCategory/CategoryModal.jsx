import React, { useEffect } from 'react';
import { Modal, Form, Input, Button, Space } from 'antd';

const CategoryModal = ({
  visible,
  onCancel,
  onSubmit,
  editingCategory,
  loading
}) => {
  const [form] = Form.useForm();

  useEffect(() => {
    if (visible) {
      if (editingCategory) {
        form.setFieldsValue({
          name: editingCategory.name
        });
      } else {
        form.resetFields();
      }
    }
  }, [visible, editingCategory, form]);

  const handleSubmit = async (values) => {
    try {
      await onSubmit(values);
      form.resetFields();
    } catch (error) {
      console.error('Submit error:', error);
    }
  };

  return (
    <Modal
      title={editingCategory ? 'Chỉnh sửa Danh mục' : 'Tạo Danh mục mới'}
      open={visible}
      onCancel={onCancel}
      footer={null}
      width={500}
      destroyOnClose
    >
      <Form
        form={form}
        layout="vertical"
        onFinish={handleSubmit}
        className="mt-4"
      >
        <Form.Item
          label="Tên danh mục"
          name="name"
          rules={[
            {
              required: true,
              message: 'Vui lòng nhập tên danh mục!',
            },
            {
              max: 50,
              message: 'Tên danh mục không được vượt quá 50 ký tự!',
            },
            {
              pattern: /^[a-zA-Z0-9\s/\-_.]+$/,
              message: 'Tên danh mục chỉ được chứa chữ cái, số và các ký tự / - _ .',
            },
          ]}
        >
          <Input
            placeholder="Nhập tên danh mục..."
            size="large"
            maxLength={50}
            showCount
          />
        </Form.Item>

        <Form.Item className="mb-0 text-right">
          <Space>
            <Button onClick={onCancel}>
              Hủy
            </Button>
            <Button 
              type="primary" 
              htmlType="submit"
              loading={loading}
            >
              {editingCategory ? 'Cập nhật' : 'Tạo mới'}
            </Button>
          </Space>
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default CategoryModal;
