import { Navigate } from "react-router-dom";

// Giả sử bạn sẽ có logic kiểm tra login ở đây
export default function PrivateRoute({ children }) {
  // const isAuthenticated = false; // TODO: thay bằng state/logic thật (VD: lấy từ context, redux...)

  // if (!isAuthenticated) {
  //   return <Navigate to="/" replace />; // Chưa login -> về trang chủ
  // }

  // return children;
}