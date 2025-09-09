import React from 'react';
import { Card, Row, Col, Statistic, Progress, Badge, Space, Typography, Avatar } from 'antd';
import { motion } from 'framer-motion';
import PropTypes from 'prop-types';
import {
  ArrowUpOutlined,
  ArrowDownOutlined,
  MinusOutlined
} from '@ant-design/icons';

const { Text } = Typography;

const QuickStats = ({
  data = [],
  loading = false,
  variant = 'cards', // cards, compact, minimal
  columns = 4,
  showTrend = true,
  showProgress = false,
  animated = true,
  className = ''
}) => {
  const getTrendIcon = (trend) => {
    if (!trend || trend === 0) return <MinusOutlined style={{ color: '#8c8c8c' }} />;
    return trend > 0 
      ? <ArrowUpOutlined style={{ color: '#52c41a' }} />
      : <ArrowDownOutlined style={{ color: '#ff4d4f' }} />;
  };

  const getTrendColor = (trend) => {
    if (!trend || trend === 0) return '#8c8c8c';
    return trend > 0 ? '#52c41a' : '#ff4d4f';
  };

  const renderCard = (stat, index) => {
    const {
      title,
      value,
      suffix,
      prefix,
      trend,
      progress,
      icon: Icon,
      color = '#6366f1',
      description,
      target
    } = stat;

    const cardVariants = {
      cards: {
        background: 'linear-gradient(135deg, rgba(255,255,255,0.9) 0%, rgba(255,255,255,1) 100%)',
        border: '1px solid #e5e7eb',
        borderRadius: '16px',
        padding: '24px',
        boxShadow: '0 4px 16px rgba(0,0,0,0.08)',
        transition: 'all 0.3s ease',
        cursor: 'pointer'
      },
      compact: {
        background: '#ffffff',
        border: '1px solid #f0f0f0',
        borderRadius: '12px',
        padding: '16px',
        boxShadow: '0 2px 8px rgba(0,0,0,0.04)'
      },
      minimal: {
        background: 'transparent',
        border: 'none',
        padding: '16px 0',
        borderBottom: '1px solid #f0f0f0'
      }
    };

    const MotionCard = animated ? motion.div : 'div';

    return (
      <MotionCard
        key={index}
        initial={animated ? { opacity: 0, y: 20 } : false}
        animate={animated ? { opacity: 1, y: 0 } : false}
        transition={animated ? { duration: 0.4, delay: index * 0.1 } : false}
        whileHover={animated && variant === 'cards' ? { y: -4, boxShadow: '0 8px 32px rgba(0,0,0,0.12)' } : false}
        style={cardVariants[variant]}
      >
        <Row justify="space-between" align="top">
          <Col span={variant === 'minimal' ? 20 : 16}>
            <Space direction="vertical" size="small" style={{ width: '100%' }}>
              {/* Title */}
              <Text 
                type="secondary" 
                style={{ 
                  fontSize: variant === 'compact' ? '12px' : '14px',
                  fontWeight: '500',
                  textTransform: 'uppercase',
                  letterSpacing: '0.5px'
                }}
              >
                {title}
              </Text>
              
              {/* Value */}
              <div style={{ display: 'flex', alignItems: 'baseline', gap: '4px' }}>
                <Text
                  style={{
                    fontSize: variant === 'compact' ? '24px' : '32px',
                    fontWeight: 'bold',
                    color: color,
                    lineHeight: '1'
                  }}
                >
                  {prefix}{value}
                </Text>
                {suffix && (
                  <Text
                    type="secondary"
                    style={{
                      fontSize: variant === 'compact' ? '12px' : '14px',
                      marginLeft: '4px'
                    }}
                  >
                    {suffix}
                  </Text>
                )}
              </div>

              {/* Description */}
              {description && (
                <Text 
                  type="secondary" 
                  style={{ 
                    fontSize: '12px',
                    lineHeight: '1.4'
                  }}
                >
                  {description}
                </Text>
              )}

              {/* Trend */}
              {showTrend && trend !== undefined && (
                <Space size="small">
                  {getTrendIcon(trend)}
                  <Text
                    style={{
                      fontSize: '12px',
                      color: getTrendColor(trend),
                      fontWeight: '500'
                    }}
                  >
                    {trend > 0 ? '+' : ''}{trend}%
                  </Text>
                  <Text type="secondary" style={{ fontSize: '12px' }}>
                    so với kỳ trước
                  </Text>
                </Space>
              )}

              {/* Progress */}
              {showProgress && progress !== undefined && (
                <div style={{ marginTop: '8px' }}>
                  <div style={{ 
                    display: 'flex', 
                    justifyContent: 'space-between', 
                    alignItems: 'center',
                    marginBottom: '4px'
                  }}>
                    <Text style={{ fontSize: '12px', color: '#8c8c8c' }}>
                      Tiến độ
                    </Text>
                    <Text style={{ fontSize: '12px', fontWeight: '500' }}>
                      {progress}%
                      {target && ` / ${target}`}
                    </Text>
                  </div>
                  <Progress
                    percent={progress}
                    strokeColor={{
                      '0%': color,
                      '100%': color
                    }}
                    trailColor="#f0f0f0"
                    showInfo={false}
                    size="small"
                  />
                </div>
              )}
            </Space>
          </Col>
          
          {/* Icon */}
          {Icon && variant !== 'minimal' && (
            <Col span={variant === 'compact' ? 8 : 8} style={{ textAlign: 'right' }}>
              <Avatar
                size={variant === 'compact' ? 40 : 48}
                icon={<Icon />}
                style={{
                  backgroundColor: `${color}20`,
                  color: color,
                  border: `2px solid ${color}30`
                }}
              />
            </Col>
          )}
        </Row>

        {/* Badge for status */}
        {stat.status && variant === 'cards' && (
          <div style={{ position: 'absolute', top: '16px', right: '16px' }}>
            <Badge
              status={stat.status}
              color={stat.statusColor}
            />
          </div>
        )}
      </MotionCard>
    );
  };

  if (variant === 'minimal') {
    return (
      <div className={`quick-stats-minimal ${className}`}>
        {data.map((stat, index) => renderCard(stat, index))}
      </div>
    );
  }

  return (
    <div className={`quick-stats ${className}`}>
      <Row gutter={[16, 16]}>
        {data.map((stat, index) => (
          <Col 
            key={index}
            xs={24} 
            sm={12} 
            md={24 / Math.min(columns, 4)} 
            lg={24 / Math.min(columns, 6)}
            xl={24 / columns}
          >
            {renderCard(stat, index)}
          </Col>
        ))}
      </Row>
    </div>
  );
};

QuickStats.propTypes = {
  data: PropTypes.arrayOf(PropTypes.shape({
    title: PropTypes.string.isRequired,
    value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
    suffix: PropTypes.string,
    prefix: PropTypes.string,
    trend: PropTypes.number,
    progress: PropTypes.number,
    target: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    icon: PropTypes.elementType,
    color: PropTypes.string,
    description: PropTypes.string,
    status: PropTypes.oneOf(['success', 'processing', 'error', 'default', 'warning']),
    statusColor: PropTypes.string
  })),
  loading: PropTypes.bool,
  variant: PropTypes.oneOf(['cards', 'compact', 'minimal']),
  columns: PropTypes.number,
  showTrend: PropTypes.bool,
  showProgress: PropTypes.bool,
  animated: PropTypes.bool,
  className: PropTypes.string
};

export default QuickStats;
