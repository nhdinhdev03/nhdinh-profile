import React from "react";
import { Flex, Spin } from "antd";
const Loading = () => (
  <Flex align="center" gap="middle">
    <Spin size="small" />
    <Spin />
    <Spin size="large" />
  </Flex>
);
export default Loading;
