import React from 'react';
import { Badge, Tag, Tooltip } from 'antd';
import { 
  CheckCircleOutlined, 
  ClockCircleOutlined, 
  ExclamationCircleOutlined,
  CloseCircleOutlined,
  SyncOutlined,
  MinusCircleOutlined,
  QuestionCircleOutlined
} from '@ant-design/icons';
import PropTypes from 'prop-types';

const StatusBadge = ({
  status,
  text,
  variant = 'badge', // badge, tag, dot
  size = 'default',
  showIcon = true,
  tooltip = null,
  customConfig = null,
  className = ''
}) => {
  // Default status configurations
  const defaultStatusConfig = {
    active: {
      color: '#52c41a',
      bgColor: '#f6ffed',
      borderColor: '#b7eb8f',
      icon: CheckCircleOutlined,
      text: 'Hoạt động',
      badgeStatus: 'success'
    },
    inactive: {
      color: '#8c8c8c',
      bgColor: '#f5f5f5',
      borderColor: '#d9d9d9',
      icon: MinusCircleOutlined,
      text: 'Không hoạt động',
      badgeStatus: 'default'
    },
    pending: {
      color: '#faad14',
      bgColor: '#fffbe6',
      borderColor: '#ffe58f',
      icon: ClockCircleOutlined,
      text: 'Đang chờ',
      badgeStatus: 'warning'
    },
    processing: {
      color: '#1890ff',
      bgColor: '#f0f9ff',
      borderColor: '#91d5ff',
      icon: SyncOutlined,
      text: 'Đang xử lý',
      badgeStatus: 'processing'
    },
    completed: {
      color: '#52c41a',
      bgColor: '#f6ffed',
      borderColor: '#b7eb8f',
      icon: CheckCircleOutlined,
      text: 'Hoàn thành',
      badgeStatus: 'success'
    },
    failed: {
      color: '#ff4d4f',
      bgColor: '#fff2f0',
      borderColor: '#ffccc7',
      icon: CloseCircleOutlined,
      text: 'Thất bại',
      badgeStatus: 'error'
    },
    error: {
      color: '#ff4d4f',
      bgColor: '#fff2f0',
      borderColor: '#ffccc7',
      icon: ExclamationCircleOutlined,
      text: 'Lỗi',
      badgeStatus: 'error'
    },
    warning: {
      color: '#faad14',
      bgColor: '#fffbe6',
      borderColor: '#ffe58f',
      icon: ExclamationCircleOutlined,
      text: 'Cảnh báo',
      badgeStatus: 'warning'
    },
    draft: {
      color: '#8c8c8c',
      bgColor: '#fafafa',
      borderColor: '#d9d9d9',
      icon: ClockCircleOutlined,
      text: 'Bản nháp',
      badgeStatus: 'default'
    },
    published: {
      color: '#52c41a',
      bgColor: '#f6ffed',
      borderColor: '#b7eb8f',
      icon: CheckCircleOutlined,
      text: 'Đã xuất bản',
      badgeStatus: 'success'
    },
    archived: {
      color: '#8c8c8c',
      bgColor: '#fafafa',
      borderColor: '#d9d9d9',
      icon: MinusCircleOutlined,
      text: 'Đã lưu trữ',
      badgeStatus: 'default'
    },
    unknown: {
      color: '#8c8c8c',
      bgColor: '#fafafa',
      borderColor: '#d9d9d9',
      icon: QuestionCircleOutlined,
      text: 'Không xác định',
      badgeStatus: 'default'
    }
  };

  // Get status configuration
  const config = customConfig || defaultStatusConfig[status] || defaultStatusConfig.unknown;
  const displayText = text || config.text;
  const IconComponent = config.icon;

  // Size configurations
  const sizeConfig = {
    small: {
      fontSize: '12px',
      padding: '2px 6px',
      iconSize: '12px'
    },
    default: {
      fontSize: '14px',
      padding: '4px 8px',
      iconSize: '14px'
    },
    large: {
      fontSize: '16px',
      padding: '6px 12px',
      iconSize: '16px'
    }
  };

  const currentSizeConfig = sizeConfig[size] || sizeConfig.default;

  const renderContent = () => {
    const iconElement = showIcon && IconComponent ? (
      <IconComponent 
        style={{ 
          fontSize: currentSizeConfig.iconSize,
          marginRight: displayText ? '4px' : '0'
        }} 
      />
    ) : null;

    switch (variant) {
      case 'badge':
        return (
          <Badge
            status={config.badgeStatus}
            text={
              <span style={{ 
                fontSize: currentSizeConfig.fontSize,
                color: config.color,
                fontWeight: '500'
              }}>
                {iconElement}
                {displayText}
              </span>
            }
          />
        );

      case 'tag':
        return (
          <Tag
            color={config.color}
            style={{
              backgroundColor: config.bgColor,
              borderColor: config.borderColor,
              color: config.color,
              fontSize: currentSizeConfig.fontSize,
              padding: currentSizeConfig.padding,
              display: 'inline-flex',
              alignItems: 'center',
              fontWeight: '500',
              border: `1px solid ${config.borderColor}`,
              borderRadius: '6px'
            }}
          >
            {iconElement}
            {displayText}
          </Tag>
        );

      case 'dot':
        return (
          <div
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              fontSize: currentSizeConfig.fontSize,
              color: config.color,
              fontWeight: '500'
            }}
          >
            <div
              style={{
                width: currentSizeConfig.iconSize,
                height: currentSizeConfig.iconSize,
                borderRadius: '50%',
                backgroundColor: config.color,
                marginRight: displayText ? '6px' : '0',
                flexShrink: 0
              }}
            />
            {displayText}
          </div>
        );

      default:
        return (
          <span
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              fontSize: currentSizeConfig.fontSize,
              color: config.color,
              fontWeight: '500'
            }}
          >
            {iconElement}
            {displayText}
          </span>
        );
    }
  };

  const content = renderContent();

  if (tooltip) {
    return (
      <Tooltip title={tooltip}>
        <span className={className}>
          {content}
        </span>
      </Tooltip>
    );
  }

  return (
    <span className={className}>
      {content}
    </span>
  );
};

StatusBadge.propTypes = {
  status: PropTypes.string.isRequired,
  text: PropTypes.string,
  variant: PropTypes.oneOf(['badge', 'tag', 'dot']),
  size: PropTypes.oneOf(['small', 'default', 'large']),
  showIcon: PropTypes.bool,
  tooltip: PropTypes.string,
  customConfig: PropTypes.shape({
    color: PropTypes.string,
    bgColor: PropTypes.string,
    borderColor: PropTypes.string,
    icon: PropTypes.elementType,
    text: PropTypes.string,
    badgeStatus: PropTypes.string
  }),
  className: PropTypes.string
};

export default StatusBadge;
