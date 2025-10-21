import {
  DeleteOutlined,
  EditOutlined,
  EyeOutlined,
  FilterOutlined,
  GlobalOutlined,
  MenuOutlined,
  PlusOutlined,
  ReloadOutlined,
  SearchOutlined,
  StarOutlined,
  TranslationOutlined,
} from "@ant-design/icons";
import {
  Badge,
  Button,
  Card,
  Col,
  Collapse,
  Input,
  message,
  Modal,
  Popconfirm,
  Row,
  Select,
  Space,
  Statistic,
  Switch,
  Table,
  Tabs,
  Tag,
  Tooltip,
  Typography,
} from "antd";
import { useCallback, useEffect, useMemo, useState } from "react";
import HeroForm from "./HeroForm";
import "./HeroManagement.scss";

const { Title, Text } = Typography;
const { Panel } = Collapse;
const { Search } = Input;
const { Option } = Select;

const HeroManagement = () => {
  // ===================================
  // State Management
  // ===================================
  const [heroes, setHeroes] = useState([]);
  const [loading, setLoading] = useState(false);
  const [formLoading, setFormLoading] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);
  const [detailModalVisible, setDetailModalVisible] = useState(false);
  const [editingHero, setEditingHero] = useState(null);
  const [viewingHero, setViewingHero] = useState(null);

  // Filter & Search States
  const [searchText, setSearchText] = useState("");
  const [filterLanguage, setFilterLanguage] = useState("all");
  const [filterStatus, setFilterStatus] = useState("all");
  const [expandedRowKeys, setExpandedRowKeys] = useState([]);

  const languages = [
    { code: "vi", name: "Tiếng Việt", flag: "🇻🇳" },
    { code: "en", name: "English", flag: "🇺🇸" },
    { code: "en-US", name: "English (US)", flag: "🇺🇸" },
  ];

  // ===================================
  // Effects
  // ===================================
  useEffect(() => {
    fetchHeroes();
  }, []);

  // ===================================
  // Handlers - useCallback for optimization
  // ===================================
  const fetchHeroes = useCallback(async () => {
    setLoading(true);
    // Simulate API call with more comprehensive data structure
    setTimeout(() => {
      setHeroes([
        {
          heroId: "550e8400-e29b-41d4-a716-446655440001",
          createdAt: "2024-01-01T10:30:00Z",
          updatedAt: "2024-01-15T14:22:00Z",
          isDeleted: false,
          translations: [
            {
              translationId: "550e8400-e29b-41d4-a716-446655440011",
              languageCode: "vi",
              preHeading: "Xin chào, tôi là",
              heading: "Nguyễn Hoàng Dinh",
              introHtml: "<p>Chào mừng bạn đến với portfolio của tôi!</p>",
              createdAt: "2024-01-01T10:30:00Z",
            },
            {
              translationId: "550e8400-e29b-41d4-a716-446655440012",
              languageCode: "en",
              preHeading: "Hello, I am",
              heading: "Nguyen Hoang Dinh",
              introHtml: "<p>Welcome to my portfolio!</p>",
              createdAt: "2024-01-01T10:35:00Z",
            },
          ],
          subHeadings: [
            {
              subId: "550e8400-e29b-41d4-a716-446655440021",
              languageCode: "vi",
              text: "Phát triển ứng dụng web",
              sortOrder: 1,
            },
            {
              subId: "550e8400-e29b-41d4-a716-446655440022",
              languageCode: "vi",
              text: "Thiết kế giao diện người dùng",
              sortOrder: 2,
            },
            {
              subId: "550e8400-e29b-41d4-a716-446655440023",
              languageCode: "en",
              text: "Web Application Development",
              sortOrder: 1,
            },
            {
              subId: "550e8400-e29b-41d4-a716-446655440024",
              languageCode: "en",
              text: "User Interface Design",
              sortOrder: 2,
            },
          ],
        },
      ]);
      setLoading(false);
    }, 1000);
  }, []);

  const showModal = useCallback((hero = null) => {
    setEditingHero(hero);
    setModalVisible(true);
  }, []);

  const showDetailModal = useCallback((hero) => {
    setViewingHero(hero);
    setDetailModalVisible(true);
  }, []);

  const handleCancel = useCallback(() => {
    setModalVisible(false);
    setEditingHero(null);
  }, []);

  const handleDetailCancel = useCallback(() => {
    setDetailModalVisible(false);
    setViewingHero(null);
  }, []);

  const handleSubmit = useCallback(
    async (heroData) => {
      setFormLoading(true);
      try {
        if (editingHero) {
          // Update hero
          console.log("Updating hero:", {
            ...heroData,
            heroId: editingHero.heroId,
          });
          message.success("Hero updated successfully!");
        } else {
          // Create hero
          console.log("Creating hero:", heroData);
          message.success("Hero created successfully!");
        }
        setModalVisible(false);
        setEditingHero(null);
        fetchHeroes();
      } catch (error) {
        message.error("Operation failed!");
        console.error("Hero operation error:", error);
      } finally {
        setFormLoading(false);
      }
    },
    [editingHero, fetchHeroes]
  );

  const handleDelete = useCallback(
    async (heroId) => {
      try {
        console.log("Deleting hero:", heroId);
        message.success("Hero deleted successfully!");
        fetchHeroes();
      } catch (error) {
        console.error("Delete failed:", error);
        message.error("Delete failed!");
      }
    },
    [fetchHeroes]
  );

  // ===================================
  // Filtered and Sorted Data with useMemo
  // ===================================
  const filteredHeroes = useMemo(() => {
    return heroes.filter((hero) => {
      // Search filter
      const searchLower = searchText.toLowerCase();
      const matchesSearch =
        !searchText ||
        hero.translations?.some(
          (t) =>
            t.heading?.toLowerCase().includes(searchLower) ||
            t.preHeading?.toLowerCase().includes(searchLower)
        );

      // Language filter
      const matchesLanguage =
        filterLanguage === "all" ||
        hero.translations?.some((t) => t.languageCode === filterLanguage);

      // Status filter
      const matchesStatus =
        filterStatus === "all" ||
        (filterStatus === "active" && !hero.isDeleted) ||
        (filterStatus === "deleted" && hero.isDeleted);

      return matchesSearch && matchesLanguage && matchesStatus;
    });
  }, [heroes, searchText, filterLanguage, filterStatus]);

  // Statistics
  const statistics = useMemo(() => {
    return {
      total: heroes.length,
      active: heroes.filter((h) => !h.isDeleted).length,
      deleted: heroes.filter((h) => h.isDeleted).length,
      translations: heroes.reduce(
        (sum, h) => sum + (h.translations?.length || 0),
        0
      ),
    };
  }, [heroes]);

  // ===================================
  // Table Columns
  // ===================================
  const columns = [
    {
      title: "Hero Information",
      key: "heroInfo",
      render: (_, record) => (
        <div>
          <Text strong>ID: </Text>
          <Text code style={{ fontSize: "12px" }}>
            {record.heroId.substring(0, 8)}...
          </Text>
          <br />
          <Text type="secondary">
            Created: {new Date(record.createdAt).toLocaleDateString()}
          </Text>
          {record.updatedAt && (
            <>
              <br />
              <Text type="secondary">
                Updated: {new Date(record.updatedAt).toLocaleDateString()}
              </Text>
            </>
          )}
        </div>
      ),
    },
    {
      title: "Translations",
      key: "translations",
      render: (_, record) => (
        <div>
          <Badge count={record.translations?.length || 0} showZero>
            <GlobalOutlined style={{ fontSize: "16px", marginRight: "8px" }} />
          </Badge>
          <div style={{ marginTop: "4px" }}>
            {record.translations?.map((trans) => (
              <Tag
                key={trans.translationId}
                color="blue"
                style={{ marginBottom: "2px" }}
              >
                {languages.find((l) => l.code === trans.languageCode)?.flag}{" "}
                {trans.languageCode}
              </Tag>
            ))}
          </div>
        </div>
      ),
    },
    {
      title: "Sub Headings",
      key: "subHeadings",
      render: (_, record) => {
        const subsByLang =
          record.subHeadings?.reduce((acc, sub) => {
            acc[sub.languageCode] = (acc[sub.languageCode] || 0) + 1;
            return acc;
          }, {}) || {};

        return (
          <div>
            <Badge count={record.subHeadings?.length || 0} showZero>
              <MenuOutlined style={{ fontSize: "16px", marginRight: "8px" }} />
            </Badge>
            <div style={{ marginTop: "4px" }}>
              {Object.entries(subsByLang).map(([lang, count]) => (
                <Tag key={lang} color="green" style={{ marginBottom: "2px" }}>
                  {languages.find((l) => l.code === lang)?.flag} {count}
                </Tag>
              ))}
            </div>
          </div>
        );
      },
    },
    {
      title: "Status",
      dataIndex: "isDeleted",
      key: "isDeleted",
      render: (isDeleted) => (
        <Switch
          checked={!isDeleted}
          disabled
          checkedChildren="Active"
          unCheckedChildren="Deleted"
          size="small"
        />
      ),
    },
    {
      title: "Actions",
      key: "actions",
      render: (_, record) => (
        <Space direction="vertical" size="small">
          <Button
            type="default"
            size="small"
            icon={<EyeOutlined />}
            onClick={() => showDetailModal(record)}
            block
          >
            View Details
          </Button>
          <Button
            type="primary"
            size="small"
            icon={<EditOutlined />}
            onClick={() => showModal(record)}
            block
          >
            Edit
          </Button>
          <Popconfirm
            title="Delete Hero"
            description="Are you sure you want to delete this hero and all its translations?"
            onConfirm={() => handleDelete(record.heroId)}
            okText="Yes"
            cancelText="No"
          >
            <Button
              type="primary"
              danger
              size="small"
              icon={<DeleteOutlined />}
              block
            >
              Delete
            </Button>
          </Popconfirm>
        </Space>
      ),
    },
  ];

  return (
    <div className="hero-management-container">
      {/* Statistics Cards */}
      <Row gutter={[16, 16]} style={{ marginBottom: 24 }}>
        <Col xs={24} sm={12} lg={6}>
          <Card>
            <Statistic
              title="Total Heroes"
              value={statistics.total}
              prefix={<StarOutlined />}
              valueStyle={{ color: "#1890ff" }}
            />
          </Card>
        </Col>
        <Col xs={24} sm={12} lg={6}>
          <Card>
            <Statistic
              title="Active"
              value={statistics.active}
              prefix={<StarOutlined />}
              valueStyle={{ color: "#52c41a" }}
            />
          </Card>
        </Col>
        <Col xs={24} sm={12} lg={6}>
          <Card>
            <Statistic
              title="Deleted"
              value={statistics.deleted}
              prefix={<DeleteOutlined />}
              valueStyle={{ color: "#ff4d4f" }}
            />
          </Card>
        </Col>
        <Col xs={24} sm={12} lg={6}>
          <Card>
            <Statistic
              title="Translations"
              value={statistics.translations}
              prefix={<GlobalOutlined />}
              valueStyle={{ color: "#722ed1" }}
            />
          </Card>
        </Col>
      </Row>

      <Card>
        {/* Header with Actions */}
        <div
          style={{
            marginBottom: 16,
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            flexWrap: "wrap",
            gap: 16,
          }}
        >
          <Title level={3} style={{ margin: 0 }}>
            <StarOutlined /> Hero Management
          </Title>
          <Space>
            <Tooltip title="Refresh Data">
              <Button
                icon={<ReloadOutlined />}
                onClick={fetchHeroes}
                loading={loading}
              />
            </Tooltip>
            <Button
              type="primary"
              icon={<PlusOutlined />}
              onClick={() => showModal()}
            >
              Add New Hero
            </Button>
          </Space>
        </div>

        {/* Filters */}
        <Row gutter={[16, 16]} style={{ marginBottom: 16 }}>
          <Col xs={24} md={12} lg={8}>
            <Search
              placeholder="Search by heading..."
              allowClear
              value={searchText}
              onChange={(e) => setSearchText(e.target.value)}
              prefix={<SearchOutlined />}
            />
          </Col>
          <Col xs={24} sm={12} md={6} lg={4}>
            <Select
              style={{ width: "100%" }}
              value={filterLanguage}
              onChange={setFilterLanguage}
              placeholder="Filter by Language"
            >
              <Option value="all">All Languages</Option>
              {languages.map((lang) => (
                <Option key={lang.code} value={lang.code}>
                  {lang.flag} {lang.name}
                </Option>
              ))}
            </Select>
          </Col>
          <Col xs={24} sm={12} md={6} lg={4}>
            <Select
              style={{ width: "100%" }}
              value={filterStatus}
              onChange={setFilterStatus}
              placeholder="Filter by Status"
            >
              <Option value="all">All Status</Option>
              <Option value="active">Active Only</Option>
              <Option value="deleted">Deleted Only</Option>
            </Select>
          </Col>
          <Col xs={24} md={24} lg={8}>
            <Space>
              <Badge count={filteredHeroes.length} showZero>
                <Tag icon={<FilterOutlined />} color="blue">
                  Filtered Results
                </Tag>
              </Badge>
              {(searchText ||
                filterLanguage !== "all" ||
                filterStatus !== "all") && (
                <Button
                  size="small"
                  onClick={() => {
                    setSearchText("");
                    setFilterLanguage("all");
                    setFilterStatus("all");
                  }}
                >
                  Clear Filters
                </Button>
              )}
            </Space>
          </Col>
        </Row>

        <Table
          columns={columns}
          dataSource={filteredHeroes}
          loading={loading}
          rowKey="heroId"
          rowClassName={(record) => (record.isDeleted ? "deleted-row" : "")}
          expandedRowKeys={expandedRowKeys}
          onExpandedRowsChange={setExpandedRowKeys}
          pagination={{
            pageSize: 10,
            showSizeChanger: true,
            showQuickJumper: true,
            showTotal: (total, range) =>
              `${range[0]}-${range[1]} of ${total} items`,
          }}
          scroll={{ x: 1000 }}
          expandable={{
            expandedRowRender: (record) => (
              <Card size="small" style={{ margin: "8px 0" }}>
                <Row gutter={[16, 16]}>
                  {record.translations?.map((trans) => (
                    <Col span={12} key={trans.translationId}>
                      <Card
                        size="small"
                        title={
                          <span>
                            {
                              languages.find(
                                (l) => l.code === trans.languageCode
                              )?.flag
                            }{" "}
                            {
                              languages.find(
                                (l) => l.code === trans.languageCode
                              )?.name
                            }
                          </span>
                        }
                        style={{ height: "100%" }}
                      >
                        <div style={{ marginBottom: "8px" }}>
                          <Text type="secondary">Pre-heading:</Text>
                          <br />
                          <Text>{trans.preHeading || "N/A"}</Text>
                        </div>
                        <div style={{ marginBottom: "8px" }}>
                          <Text type="secondary">Heading:</Text>
                          <br />
                          <Text strong>{trans.heading}</Text>
                        </div>
                        <div style={{ marginBottom: "8px" }}>
                          <Text type="secondary">Sub-headings:</Text>
                          <br />
                          {record.subHeadings
                            ?.filter(
                              (sub) => sub.languageCode === trans.languageCode
                            )
                            .sort((a, b) => a.sortOrder - b.sortOrder)
                            .map((sub) => (
                              <Tag
                                key={sub.subId}
                                color="green"
                                style={{
                                  marginBottom: "2px",
                                  display: "block",
                                  width: "fit-content",
                                }}
                              >
                                {sub.sortOrder}. {sub.text}
                              </Tag>
                            ))}
                        </div>
                      </Card>
                    </Col>
                  ))}
                </Row>
              </Card>
            ),
            rowExpandable: (record) => record.translations?.length > 0,
          }}
        />

        {/* Comprehensive Hero Form */}
        <HeroForm
          visible={modalVisible}
          onCancel={handleCancel}
          onSubmit={handleSubmit}
          editingHero={editingHero}
          loading={formLoading}
        />

        {/* Detailed View Modal */}
        <Modal
          title={
            <span>
              <StarOutlined /> Hero Details
            </span>
          }
          open={detailModalVisible}
          onCancel={handleDetailCancel}
          footer={[
            <Button key="close" onClick={handleDetailCancel}>
              Close
            </Button>,
            <Button
              key="edit"
              type="primary"
              icon={<EditOutlined />}
              onClick={() => {
                handleDetailCancel();
                showModal(viewingHero);
              }}
            >
              Edit Hero
            </Button>,
          ]}
          width={900}
        >
          {viewingHero && (
            <div>
              {/* Hero Metadata */}
              <Card size="small" style={{ marginBottom: "16px" }}>
                <Row gutter={[16, 8]}>
                  <Col span={12}>
                    <Text strong>Hero ID:</Text>
                    <br />
                    <Text code>{viewingHero.heroId}</Text>
                  </Col>
                  <Col span={12}>
                    <Text strong>Status:</Text>
                    <br />
                    <Switch
                      checked={!viewingHero.isDeleted}
                      disabled
                      size="small"
                      checkedChildren="Active"
                      unCheckedChildren="Deleted"
                    />
                  </Col>
                  <Col span={12}>
                    <Text strong>Created:</Text>
                    <br />
                    <Text>
                      {new Date(viewingHero.createdAt).toLocaleString()}
                    </Text>
                  </Col>
                  <Col span={12}>
                    <Text strong>Updated:</Text>
                    <br />
                    <Text>
                      {viewingHero.updatedAt
                        ? new Date(viewingHero.updatedAt).toLocaleString()
                        : "Never"}
                    </Text>
                  </Col>
                </Row>
              </Card>

              {/* Translations by Language */}
              <Tabs
                defaultActiveKey={viewingHero.translations?.[0]?.languageCode}
                items={languages
                  .filter((lang) =>
                    viewingHero.translations?.some(
                      (t) => t.languageCode === lang.code
                    )
                  )
                  .map((lang) => {
                    const translation = viewingHero.translations.find(
                      (t) => t.languageCode === lang.code
                    );
                    const subHeadings =
                      viewingHero.subHeadings
                        ?.filter((sub) => sub.languageCode === lang.code)
                        ?.sort((a, b) => a.sortOrder - b.sortOrder) || [];

                    return {
                      key: lang.code,
                      label: (
                        <span>
                          {lang.flag} {lang.name}
                        </span>
                      ),
                      children: (
                        <div>
                          <Row gutter={[16, 16]}>
                            <Col span={24}>
                              <Card
                                title={
                                  <>
                                    <TranslationOutlined /> Translation Content
                                  </>
                                }
                                size="small"
                              >
                                <div style={{ marginBottom: "12px" }}>
                                  <Text strong>Pre-heading:</Text>
                                  <br />
                                  <Text>
                                    {translation?.preHeading || "Not set"}
                                  </Text>
                                </div>
                                <div style={{ marginBottom: "12px" }}>
                                  <Text strong>Main Heading:</Text>
                                  <br />
                                  <Title level={4} style={{ margin: 0 }}>
                                    {translation?.heading}
                                  </Title>
                                </div>
                                <div>
                                  <Text strong>Intro HTML:</Text>
                                  <br />
                                  <div
                                    style={{
                                      border: "1px solid #d9d9d9",
                                      borderRadius: "6px",
                                      padding: "8px",
                                      backgroundColor: "#fafafa",
                                    }}
                                    dangerouslySetInnerHTML={{
                                      __html:
                                        translation?.introHtml || "No content",
                                    }}
                                  />
                                </div>
                              </Card>
                            </Col>
                            <Col span={24}>
                              <Card
                                title={
                                  <>
                                    <MenuOutlined /> Sub-headings (
                                    {subHeadings.length})
                                  </>
                                }
                                size="small"
                              >
                                {subHeadings.length > 0 ? (
                                  <div>
                                    {subHeadings.map((sub) => (
                                      <div
                                        key={sub.subId}
                                        style={{
                                          padding: "8px",
                                          border: "1px solid #f0f0f0",
                                          borderRadius: "4px",
                                          marginBottom: "8px",
                                          backgroundColor: "#fafafa",
                                        }}
                                      >
                                        <Badge
                                          count={sub.sortOrder}
                                          style={{ marginRight: "8px" }}
                                        />
                                        <Text>{sub.text}</Text>
                                      </div>
                                    ))}
                                  </div>
                                ) : (
                                  <Text type="secondary">
                                    No sub-headings defined for this language
                                  </Text>
                                )}
                              </Card>
                            </Col>
                          </Row>
                        </div>
                      ),
                    };
                  })}
              />
            </div>
          )}
        </Modal>
      </Card>
    </div>
  );
};

export default HeroManagement;
