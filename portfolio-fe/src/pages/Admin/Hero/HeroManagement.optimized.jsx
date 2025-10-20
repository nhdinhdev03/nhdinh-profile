import {
  DeleteOutlined,
  EditOutlined,
  EyeOutlined,
  PlusOutlined,
} from "@ant-design/icons";
import {
  Button,
  message,
  Modal,
  Popconfirm,
  Space,
  Tag,
  Typography,
} from "antd";
import { ProTable } from "@ant-design/pro-components";
import { useEffect, useRef, useState } from "react";
import HeroForm from "./HeroForm";

const { Title } = Typography;

const HeroManagement = () => {
  const [heroes, setHeroes] = useState([]);
  const [modalVisible, setModalVisible] = useState(false);
  const [editingHero, setEditingHero] = useState(null);
  const actionRef = useRef();

  useEffect(() => {
    fetchHeroes();
  }, []);

  const fetchHeroes = async () => {
    // Mock data - replace with API
    setTimeout(() => {
      setHeroes([
        {
          heroId: "550e8400-e29b-41d4-a716-446655440001",
          createdAt: "2024-01-01T10:30:00Z",
          updatedAt: "2024-01-15T14:22:00Z",
          translations: [
            {
              languageCode: "vi",
              preHeading: "Xin chào, tôi là",
              heading: "Nguyễn Hoàng Dinh",
            },
            {
              languageCode: "en",
              preHeading: "Hello, I am",
              heading: "Nguyen Hoang Dinh",
            },
          ],
          subHeadings: [
            { languageCode: "vi", text: "Phát triển ứng dụng web", sortOrder: 1 },
            { languageCode: "en", text: "Web Development", sortOrder: 1 },
          ],
        },
      ]);
    }, 500);
  };

  const handleDelete = async (heroId) => {
    try {
      // API call here
      message.success("Xóa thành công");
      fetchHeroes();
    } catch (error) {
      message.error("Xóa thất bại");
    }
  };

  const columns = [
    {
      title: "Heading (VI)",
      dataIndex: ["translations"],
      render: (translations) => {
        const vi = translations?.find((t) => t.languageCode === "vi");
        return vi?.heading || "-";
      },
      width: 200,
    },
    {
      title: "Heading (EN)",
      dataIndex: ["translations"],
      render: (translations) => {
        const en = translations?.find((t) => t.languageCode === "en");
        return en?.heading || "-";
      },
      width: 200,
    },
    {
      title: "Ngôn ngữ",
      dataIndex: "translations",
      render: (translations) => (
        <Space>
          {translations?.map((t) => (
            <Tag key={t.languageCode} color="blue">
              {t.languageCode.toUpperCase()}
            </Tag>
          ))}
        </Space>
      ),
      width: 150,
    },
    {
      title: "Subheadings",
      dataIndex: "subHeadings",
      render: (subHeadings) => subHeadings?.length || 0,
      width: 120,
    },
    {
      title: "Cập nhật",
      dataIndex: "updatedAt",
      render: (date) => new Date(date).toLocaleDateString("vi-VN"),
      width: 120,
    },
    {
      title: "Thao tác",
      key: "action",
      fixed: "right",
      width: 150,
      render: (_, record) => (
        <Space>
          <Button
            type="text"
            icon={<EyeOutlined />}
            onClick={() => {
              setEditingHero(record);
              setModalVisible(true);
            }}
          />
          <Button
            type="text"
            icon={<EditOutlined />}
            onClick={() => {
              setEditingHero(record);
              setModalVisible(true);
            }}
          />
          <Popconfirm
            title="Xác nhận xóa?"
            onConfirm={() => handleDelete(record.heroId)}
          >
            <Button type="text" danger icon={<DeleteOutlined />} />
          </Popconfirm>
        </Space>
      ),
    },
  ];

  return (
    <div>
      <ProTable
        headerTitle={<Title level={3}>Quản lý Hero Section</Title>}
        actionRef={actionRef}
        rowKey="heroId"
        dataSource={heroes}
        columns={columns}
        search={false}
        pagination={{
          pageSize: 10,
          showSizeChanger: true,
          showTotal: (total) => `Tổng ${total} mục`,
        }}
        toolBarRender={() => [
          <Button
            key="add"
            type="primary"
            icon={<PlusOutlined />}
            onClick={() => {
              setEditingHero(null);
              setModalVisible(true);
            }}
          >
            Thêm Hero
          </Button>,
        ]}
      />

      <Modal
        title={editingHero ? "Chỉnh sửa Hero" : "Thêm Hero mới"}
        open={modalVisible}
        onCancel={() => {
          setModalVisible(false);
          setEditingHero(null);
        }}
        footer={null}
        width={800}
      >
        <HeroForm
          hero={editingHero}
          onSuccess={() => {
            setModalVisible(false);
            setEditingHero(null);
            fetchHeroes();
          }}
        />
      </Modal>
    </div>
  );
};

export default HeroManagement;
