import { LoadingOutlined } from "@ant-design/icons";
import { Spin } from "antd";
import "./AdminLoadingOverlay.scss";

const AdminLoadingOverlay = ({ tip = "Loading...", fullscreen = false }) => {
  const antIcon = <LoadingOutlined style={{ fontSize: 48 }} spin />;

  return (
    <div className={`admin-loading-overlay ${fullscreen ? "fullscreen" : ""}`}>
      <div className="loading-content">
        <Spin indicator={antIcon} tip={tip} size="large" />
        <div className="loading-animation">
          <div className="circle circle-1"></div>
          <div className="circle circle-2"></div>
          <div className="circle circle-3"></div>
        </div>
      </div>
    </div>
  );
};

export default AdminLoadingOverlay;
