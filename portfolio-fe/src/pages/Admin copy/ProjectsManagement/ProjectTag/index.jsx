import React from "react";
import { Card, Typography, Divider, Alert } from "antd";
import { TagIcon } from '@heroicons/react/24/outline';
import { PageHeader } from '../../../../components/Admin';

const { Title, Paragraph } = Typography;

const ProjectTag = () => {
  return (
    <div className="space-y-6">
      <PageHeader
        title="Quản lý Project Tags"
        subtitle="Quản lý các thẻ tag công nghệ cho dự án"
        icon={TagIcon}
      />

      <Alert
        message="✅ Sidebar State Persistence Active"
        description="Sidebar sẽ tự động ghi nhớ các nhóm đã mở và vị trí cuộn khi bạn reload trang."
        type="success"
        showIcon
        style={{ marginBottom: 24 }}
      />

      <Card>
        <Title level={4}>🔗 Danh sách Mapping Project-Tag</Title>
        <Paragraph>
          <strong>Tính năng mới của Sidebar:</strong>
        </Paragraph>
        <ul>
          <li>🔄 <strong>Auto-expand:</strong> Tự động mở nhóm chứa trang hiện tại</li>
          <li>💾 <strong>State persistence:</strong> Lưu trạng thái mở/đóng nhóm vào localStorage</li>
          <li>📍 <strong>Scroll position:</strong> Ghi nhớ vị trí cuộn của sidebar</li>
          <li>🎨 <strong>Smooth animations:</strong> Hiệu ứng mượt mà khi mở/đóng nhóm</li>
          <li>♿ <strong>Accessibility:</strong> Hỗ trợ focus states và keyboard navigation</li>
          <li>📱 <strong>Responsive:</strong> Hoạt động tốt trên mọi thiết bị</li>
        </ul>
        
        <Divider />
        
        <Paragraph>
          <strong>Cách test:</strong>
        </Paragraph>
        <ol>
          <li>Mở/đóng các nhóm trong sidebar</li>
          <li>Cuộn sidebar lên xuống</li>
          <li>Reload trang (F5 hoặc Ctrl+R)</li>
          <li>Kiểm tra xem trạng thái có được giữ nguyên không</li>
        </ol>
      </Card>
    </div>
  );
};

export default ProjectTag;
