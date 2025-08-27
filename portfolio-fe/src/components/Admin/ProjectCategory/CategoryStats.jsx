import React from 'react';
import { Row, Col, Card, Statistic } from 'antd';
import { 
  FolderIcon, 
  StarIcon,
  ClockIcon,
  ChartBarIcon
} from '@heroicons/react/24/outline';

const CategoryStats = ({ categories = [] }) => {
  const totalCategories = categories.length;
  const mostPopular = categories.length > 0 ? categories[0]?.name : 'N/A';
  const newest = categories.length > 0 ? categories[categories.length - 1]?.name : 'N/A';
  const avgProjects = totalCategories > 0 ? (categories.reduce((sum, cat) => sum + (cat.projectCount || 0), 0) / totalCategories).toFixed(1) : '0';

  const statsData = [
    {
      title: 'Tổng số danh mục',
      value: totalCategories,
      icon: <FolderIcon className="w-6 h-6" />,
      color: '#1890ff',
    },
    {
      title: 'Danh mục phổ biến',
      value: mostPopular,
      icon: <StarIcon className="w-6 h-6" />,
      color: '#52c41a',
    },
    {
      title: 'Danh mục mới nhất',
      value: newest,
      icon: <ClockIcon className="w-6 h-6" />,
      color: '#722ed1',
    },
    {
      title: 'Dự án trung bình',
      value: avgProjects,
      suffix: '/ danh mục',
      icon: <ChartBarIcon className="w-6 h-6" />,
      color: '#fa541c',
    },
  ];

  return (
    <Row gutter={[16, 16]}>
      {statsData.map((stat, index) => (
        <Col xs={24} sm={12} lg={6} key={index}>
          <Card className="h-full">
            <div className="flex items-center justify-between">
              <div>
                <Statistic
                  title={stat.title}
                  value={stat.value}
                  suffix={stat.suffix}
                  valueStyle={{ 
                    color: stat.color,
                    fontSize: '24px',
                    fontWeight: 'bold'
                  }}
                />
              </div>
              <div 
                className="flex items-center justify-center w-12 h-12 rounded-lg bg-opacity-10"
                style={{ backgroundColor: stat.color }}
              >
                <div style={{ color: stat.color }}>
                  {stat.icon}
                </div>
              </div>
            </div>
          </Card>
        </Col>
      ))}
    </Row>
  );
};

export default CategoryStats;
