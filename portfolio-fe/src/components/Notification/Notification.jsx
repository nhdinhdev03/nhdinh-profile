import React from "react";
import { useNotificationContext } from "./index";

const NotificationDemo = () => {
  const notification = useNotificationContext();

  const handleShowSuccess = () => {
    notification.success("Thao tác thành công! Dữ liệu đã được lưu.", 5000);
  };

  const handleShowError = () => {
    notification.error("Có lỗi xảy ra! Vui lòng thử lại.", 6000);
  };

  const handleShowWarning = () => {
    notification.warning("Cảnh báo: Dung lượng lưu trữ sắp hết.", 4000);
  };

  const handleShowInfo = () => {
    notification.info("Thông tin: Phiên bản mới đã có sẵn.", 4000);
  };

  const handleShowDevelopment = () => {
    notification.development("Development: API đang được cập nhật.", 4000);
  };

  const handleShowMultiple = () => {
    notification.success("Notification 1: Thành công!");
    setTimeout(() => notification.info("Notification 2: Thông tin!"), 500);
    setTimeout(() => notification.warning("Notification 3: Cảnh báo!"), 1000);
    setTimeout(() => notification.error("Notification 4: Lỗi!"), 1500);
  };

  const handleClearAll = () => {
    notification.dismissAll();
  };

  return (
    <div style={{ padding: "20px", fontFamily: "Arial, sans-serif" }}>
      <h2>Notification System Demo</h2>
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
          gap: "10px",
          marginTop: "20px",
        }}
      >
        <button
          onClick={handleShowSuccess}
          style={{
            padding: "10px 20px",
            backgroundColor: "#10b981",
            color: "white",
            border: "none",
            borderRadius: "8px",
            cursor: "pointer",
            fontSize: "14px",
            fontWeight: "500",
          }}
        >
          Show Success
        </button>

        <button
          onClick={handleShowError}
          style={{
            padding: "10px 20px",
            backgroundColor: "#ef4444",
            color: "white",
            border: "none",
            borderRadius: "8px",
            cursor: "pointer",
            fontSize: "14px",
            fontWeight: "500",
          }}
        >
          Show Error
        </button>

        <button
          onClick={handleShowWarning}
          style={{
            padding: "10px 20px",
            backgroundColor: "#f59e0b",
            color: "white",
            border: "none",
            borderRadius: "8px",
            cursor: "pointer",
            fontSize: "14px",
            fontWeight: "500",
          }}
        >
          Show Warning
        </button>

        <button
          onClick={handleShowInfo}
          style={{
            padding: "10px 20px",
            backgroundColor: "#3b82f6",
            color: "white",
            border: "none",
            borderRadius: "8px",
            cursor: "pointer",
            fontSize: "14px",
            fontWeight: "500",
          }}
        >
          Show Info
        </button>

        <button
          onClick={handleShowDevelopment}
          style={{
            padding: "10px 20px",
            backgroundColor: "#8b5cf6",
            color: "white",
            border: "none",
            borderRadius: "8px",
            cursor: "pointer",
            fontSize: "14px",
            fontWeight: "500",
          }}
        >
          Show Development
        </button>

        <button
          onClick={handleShowMultiple}
          style={{
            padding: "10px 20px",
            backgroundColor: "#6b7280",
            color: "white",
            border: "none",
            borderRadius: "8px",
            cursor: "pointer",
            fontSize: "14px",
            fontWeight: "500",
          }}
        >
          Show Multiple
        </button>

        <button
          onClick={handleClearAll}
          style={{
            padding: "10px 20px",
            backgroundColor: "#dc2626",
            color: "white",
            border: "none",
            borderRadius: "8px",
            cursor: "pointer",
            fontSize: "14px",
            fontWeight: "500",
          }}
        >
          Clear All
        </button>
      </div>

      <div
        style={{
          marginTop: "30px",
          padding: "20px",
          backgroundColor: "#f3f4f6",
          borderRadius: "8px",
        }}
      >
        <h3>Features:</h3>
        <ul style={{ lineHeight: "1.6" }}>
          <li>✨ Smooth animations with framer-motion</li>
          <li>
            🎯 Multiple notification types (success, error, warning, info,
            development)
          </li>
          <li>⏰ Auto-dismiss with progress bar</li>
          <li>🖱️ Pause on hover/focus</li>
          <li>⌨️ Keyboard accessible (Escape, Enter, Space)</li>
          <li>📱 Responsive design</li>
          <li>🌙 Dark mode support</li>
          <li>♿ Accessibility features (ARIA labels, roles)</li>
          <li>⚡ Performance optimized with React.memo</li>
          <li>📚 Stacked notifications with limit (max 5)</li>
        </ul>
      </div>
    </div>
  );
};

export default NotificationDemo;
