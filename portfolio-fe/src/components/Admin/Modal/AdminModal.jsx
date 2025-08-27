import React from "react";
import { Modal as AntdModal, Button, Space, Form, Drawer } from "antd";
import {
  ExclamationCircleOutlined,
  CheckCircleOutlined,
  InfoCircleOutlined,
  CloseCircleOutlined,
} from "@ant-design/icons";
import PropTypes from "prop-types";
import "./AdminModal.scss";

const { confirm } = AntdModal;

// Main Modal Component
const AdminModal = ({
  open,
  onCancel,
  onOk,
  title,
  children,
  loading = false,
  okText = "Xác nhận",
  cancelText = "Hủy",
  width = 520,
  centered = true,
  destroyOnClose = true,
  maskClosable = false,
  okButtonProps = {},
  cancelButtonProps = {},
  footer,
  className = "",
  size = "default", // small, default, large
  variant = "default", // default, success, warning, error, info
  ...props
}) => {
  // Size configurations
  const sizeConfig = {
    small: { width: 400 },
    default: { width: 520 },
    large: { width: 800 },
  };

  // Variant configurations
  const variantConfig = {
    default: { className: "admin-modal--default" },
    success: { className: "admin-modal--success" },
    warning: { className: "admin-modal--warning" },
    error: { className: "admin-modal--error" },
    info: { className: "admin-modal--info" },
  };

  const modalWidth = sizeConfig[size]?.width || width;
  const modalClassName = `admin-modal ${
    variantConfig[variant]?.className || ""
  } ${className}`;

  // Default footer
  const defaultFooter =
    footer === null
      ? null
      : footer || (
          <Space>
            <Button onClick={onCancel} {...cancelButtonProps}>
              {cancelText}
            </Button>
            <Button
              type="primary"
              onClick={onOk}
              loading={loading}
              {...okButtonProps}
            >
              {okText}
            </Button>
          </Space>
        );

  return (
    <AntdModal
      open={open}
      onCancel={onCancel}
      onOk={onOk}
      title={title}
      width={modalWidth}
      centered={centered}
      destroyOnClose={destroyOnClose}
      maskClosable={maskClosable}
      footer={defaultFooter}
      className={modalClassName}
      {...props}
    >
      {children}
    </AntdModal>
  );
};

// Confirm Modal
const ConfirmModal = {
  // Success confirmation
  success: (config) => {
    return confirm({
      title: "Xác nhận",
      icon: <CheckCircleOutlined style={{ color: "#52c41a" }} />,
      okText: "Xác nhận",
      cancelText: "Hủy",
      centered: true,
      className: "admin-modal admin-modal--success",
      ...config,
    });
  },

  // Warning confirmation
  warning: (config) => {
    return confirm({
      title: "Cảnh báo",
      icon: <ExclamationCircleOutlined style={{ color: "#faad14" }} />,
      okText: "Xác nhận",
      cancelText: "Hủy",
      centered: true,
      className: "admin-modal admin-modal--warning",
      ...config,
    });
  },

  // Error confirmation
  error: (config) => {
    return confirm({
      title: "Lỗi",
      icon: <CloseCircleOutlined style={{ color: "#ff4d4f" }} />,
      okText: "Xác nhận",
      cancelText: "Hủy",
      centered: true,
      className: "admin-modal admin-modal--error",
      okType: "danger",
      ...config,
    });
  },

  // Info confirmation
  info: (config) => {
    return confirm({
      title: "Thông tin",
      icon: <InfoCircleOutlined style={{ color: "#1890ff" }} />,
      okText: "Xác nhận",
      cancelText: "Hủy",
      centered: true,
      className: "admin-modal admin-modal--info",
      ...config,
    });
  },

  // Delete confirmation
  delete: (config) => {
    return confirm({
      title: "Xác nhận xóa",
      icon: <ExclamationCircleOutlined style={{ color: "#ff4d4f" }} />,
      content:
        "Bạn có chắc chắn muốn xóa mục này? Hành động này không thể hoàn tác.",
      okText: "Xóa",
      cancelText: "Hủy",
      okType: "danger",
      centered: true,
      className: "admin-modal admin-modal--delete",
      ...config,
    });
  },

  // Generic confirm
  confirm: (config) => {
    return confirm({
      title: "Xác nhận",
      icon: <ExclamationCircleOutlined style={{ color: "#faad14" }} />,
      okText: "Xác nhận",
      cancelText: "Hủy",
      centered: true,
      className: "admin-modal",
      ...config,
    });
  },
};

// Form Modal Component
const FormModal = ({
  open,
  onCancel,
  onFinish,
  form,
  title,
  children,
  loading = false,
  okText = "Lưu",
  cancelText = "Hủy",
  width = 520,
  layout = "vertical",
  ...props
}) => {
  const handleOk = async () => {
    try {
      const values = await form.validateFields();
      onFinish(values);
    } catch (error) {
      console.error("Form validation failed:", error);
    }
  };

  return (
    <AdminModal
      open={open}
      onCancel={onCancel}
      onOk={handleOk}
      title={title}
      width={width}
      loading={loading}
      okText={okText}
      cancelText={cancelText}
      {...props}
    >
      <Form form={form} layout={layout} preserve={false} autoComplete="off">
        {children}
      </Form>
    </AdminModal>
  );
};

// Drawer Modal (Side panel)
const DrawerModal = ({
  open,
  onClose,
  title,
  children,
  placement = "right",
  width = 378,
  footer,
  ...props
}) => {
  return (
    <Drawer
      open={open}
      onClose={onClose}
      title={title}
      placement={placement}
      width={width}
      footer={footer}
      className="admin-drawer"
      {...props}
    >
      {children}
    </Drawer>
  );
};

// PropTypes
AdminModal.propTypes = {
  open: PropTypes.bool.isRequired,
  onCancel: PropTypes.func,
  onOk: PropTypes.func,
  title: PropTypes.node,
  children: PropTypes.node,
  loading: PropTypes.bool,
  okText: PropTypes.string,
  cancelText: PropTypes.string,
  width: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  centered: PropTypes.bool,
  destroyOnClose: PropTypes.bool,
  maskClosable: PropTypes.bool,
  okButtonProps: PropTypes.object,
  cancelButtonProps: PropTypes.object,
  footer: PropTypes.node,
  className: PropTypes.string,
  size: PropTypes.oneOf(["small", "default", "large"]),
  variant: PropTypes.oneOf(["default", "success", "warning", "error", "info"]),
};

FormModal.propTypes = {
  open: PropTypes.bool.isRequired,
  onCancel: PropTypes.func,
  onFinish: PropTypes.func.isRequired,
  form: PropTypes.object.isRequired,
  title: PropTypes.node,
  children: PropTypes.node,
  loading: PropTypes.bool,
  okText: PropTypes.string,
  cancelText: PropTypes.string,
  width: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  layout: PropTypes.oneOf(["horizontal", "vertical", "inline"]),
};

export default AdminModal;
