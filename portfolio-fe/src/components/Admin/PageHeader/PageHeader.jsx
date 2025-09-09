import React from 'react';
import { Card, Space, Typography, Avatar, Row, Col, Badge } from 'antd';
import { motion } from 'framer-motion';
import PropTypes from 'prop-types';

const { Title, Text } = Typography;

const PageHeader = ({ 
  title, 
  subtitle, 
  icon: Icon, 
  actions, 
  className = '',
  loading = false,
  breadcrumb = null,
  extra = null,
  statistics = null,
  variant = 'default' // default, gradient, minimal
}) => {
  const variants = {
    default: {
      background: '#ffffff',
      border: '1px solid #e5e7eb'
    },
    gradient: {
      background: 'linear-gradient(135deg, #6366f1 0%, #8b5cf6 100%)',
      border: 'none'
    },
    minimal: {
      background: 'transparent',
      border: 'none'
    }
  };

  const isGradient = variant === 'gradient';
  const textColor = isGradient ? 'white' : undefined;
  const subtitleColor = isGradient ? 'rgba(255,255,255,0.8)' : 'rgba(0,0,0,0.65)';

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
    >
      <Card
        className={`admin-page-header ${className}`}
        style={{
          marginBottom: '24px',
          borderRadius: '16px',
          overflow: 'hidden',
          ...variants[variant],
          boxShadow: variant === 'gradient' 
            ? '0 8px 32px rgba(99, 102, 241, 0.3)' 
            : '0 2px 8px rgba(0,0,0,0.06)'
        }}
        styles={{ body: { padding: '32px' } }}
        loading={loading}
      >
        {breadcrumb && (
          <div style={{ marginBottom: '16px' }}>
            {breadcrumb}
          </div>
        )}
        
        <Row justify="space-between" align="middle" gutter={[16, 16]}>
          <Col xs={24} lg={extra || statistics ? 16 : 24}>
            <Space align="center" size="large">
              {Icon && (
                <Avatar
                  size={56}
                  icon={<Icon />}
                  style={{
                    backgroundColor: isGradient 
                      ? 'rgba(255,255,255,0.2)' 
                      : '#f0f9ff',
                    color: isGradient ? 'white' : '#0369a1',
                    backdropFilter: isGradient ? 'blur(10px)' : 'none'
                  }}
                />
              )}
              <div>
                <Title 
                  level={1} 
                  style={{ 
                    margin: 0, 
                    fontSize: '28px',
                    fontWeight: '700',
                    color: textColor,
                    lineHeight: '1.2'
                  }}
                >
                  {title}
                </Title>
                {subtitle && (
                  <Text 
                    style={{ 
                      fontSize: '16px',
                      color: subtitleColor,
                      marginTop: '4px',
                      display: 'block'
                    }}
                  >
                    {subtitle}
                  </Text>
                )}
              </div>
            </Space>
          </Col>
          
          {(actions || extra) && (
            <Col xs={24} lg={8} style={{ textAlign: 'right' }}>
              <Space direction="vertical" align="end" size="middle">
                {actions && (
                  <Space wrap>
                    {actions}
                  </Space>
                )}
                {extra}
              </Space>
            </Col>
          )}
        </Row>

        {/* Statistics Row */}
        {statistics && (
          <Row gutter={[24, 16]} style={{ marginTop: '24px', paddingTop: '24px', borderTop: isGradient ? '1px solid rgba(255,255,255,0.2)' : '1px solid #f0f0f0' }}>
            {statistics.map((stat, index) => (
              <Col xs={24} sm={12} md={6} key={index}>
                <div style={{ textAlign: 'center' }}>
                  <div style={{ 
                    fontSize: '24px', 
                    fontWeight: 'bold',
                    color: textColor,
                    marginBottom: '4px'
                  }}>
                    {stat.value}
                    {stat.suffix && (
                      <span style={{ fontSize: '14px', marginLeft: '2px' }}>
                        {stat.suffix}
                      </span>
                    )}
                  </div>
                  <Text style={{ color: subtitleColor, fontSize: '13px' }}>
                    {stat.label}
                  </Text>
                  {stat.trend && (
                    <div style={{ marginTop: '4px' }}>
                      <Badge 
                        status={stat.trend > 0 ? 'success' : stat.trend < 0 ? 'error' : 'default'}
                        text={
                          <span style={{ 
                            color: subtitleColor, 
                            fontSize: '12px' 
                          }}>
                            {stat.trend > 0 ? '+' : ''}{stat.trend}%
                          </span>
                        }
                      />
                    </div>
                  )}
                </div>
              </Col>
            ))}
          </Row>
        )}
      </Card>
    </motion.div>
  );
};

PageHeader.propTypes = {
  title: PropTypes.string.isRequired,
  subtitle: PropTypes.string,
  icon: PropTypes.elementType,
  actions: PropTypes.node,
  className: PropTypes.string,
  loading: PropTypes.bool,
  breadcrumb: PropTypes.node,
  extra: PropTypes.node,
  statistics: PropTypes.arrayOf(PropTypes.shape({
    label: PropTypes.string.isRequired,
    value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
    suffix: PropTypes.string,
    trend: PropTypes.number
  })),
  variant: PropTypes.oneOf(['default', 'gradient', 'minimal'])
};

export default PageHeader;
