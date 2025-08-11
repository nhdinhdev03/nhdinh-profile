import React from "react";
import { Button, Result } from "antd";
import { Link } from "react-router-dom";
import { ROUTES } from "router/routeConstants";


export default function NotFound() {
  return (
    <Result
      status="404"
      title="404"
      subTitle="Rất tiếc, trang bạn đang tìm kiếm không tồn tại."
      extra={
        <Link to={ROUTES.HOME}>
          <Button type="primary">Về trang chủ</Button>
        </Link>
      }
    />
  );
}
