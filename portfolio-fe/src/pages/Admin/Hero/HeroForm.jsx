import {
    DeleteOutlined,
    PlusOutlined,
    TranslationOutlined,
    MenuOutlined,
    ArrowUpOutlined,
    ArrowDownOutlined,
    GlobalOutlined,
    EditOutlined
} from '@ant-design/icons';
import {
    Button,
    Card,
    Form,
    Input,
    Modal,
    Select,
    Space,
    Switch,
    Tabs,
    Typography,
    message,
    Row,
    Col,
    Popconfirm,
    Divider,
    Tag
} from 'antd';
import { useState, useEffect } from 'react';

const { Title, Text } = Typography;
const { TextArea } = Input;
const { Option } = Select;

const HeroForm = ({ visible, onCancel, onSubmit, editingHero, loading }) => {
    const [form] = Form.useForm();
    const [activeTab, setActiveTab] = useState('vi');
    const [translations, setTranslations] = useState({});
    const [subHeadings, setSubHeadings] = useState({});

    const languages = [
        { code: 'vi', name: 'Tiếng Việt', flag: '🇻🇳' },
        { code: 'en', name: 'English', flag: '🇺🇸' },
        { code: 'en-US', name: 'English (US)', flag: '🇺🇸' }
    ];

    useEffect(() => {
        if (editingHero) {
            // Populate form with existing data
            form.setFieldsValue({
                isDeleted: editingHero.isDeleted
            });

            // Populate translations
            const translationData = {};
            editingHero.translations?.forEach(trans => {
                translationData[trans.languageCode] = {
                    preHeading: trans.preHeading,
                    heading: trans.heading,
                    introHtml: trans.introHtml
                };
            });
            setTranslations(translationData);

            // Populate subheadings
            const subHeadingData = {};
            languages.forEach(lang => {
                subHeadingData[lang.code] = editingHero.subHeadings
                    ?.filter(sub => sub.languageCode === lang.code)
                    ?.sort((a, b) => a.sortOrder - b.sortOrder) || [];
            });
            setSubHeadings(subHeadingData);
        } else {
            // Initialize empty form
            form.resetFields();
            setTranslations({});
            const emptySubHeadings = {};
            languages.forEach(lang => {
                emptySubHeadings[lang.code] = [];
            });
            setSubHeadings(emptySubHeadings);
        }
    }, [editingHero, form]);

    const handleTranslationChange = (languageCode, field, value) => {
        setTranslations(prev => ({
            ...prev,
            [languageCode]: {
                ...prev[languageCode],
                [field]: value
            }
        }));
    };

    const addSubHeading = (languageCode, forceAddNew = false) => {
        const currentSubHeadings = subHeadings[languageCode] || [];
        
        // Kiểm tra xem có sub-heading trống không
        const emptySubHeadingIndex = currentSubHeadings.findIndex(item => !item.text?.trim());
        
        if (!forceAddNew && emptySubHeadingIndex !== -1) {
            // Có sub-heading trống, hiển thị thông báo và focus vào nó
            message.warning({
                content: `Please fill the empty sub-heading #${currentSubHeadings[emptySubHeadingIndex].sortOrder} first before adding new one!`,
                duration: 5
            });
            
            // Focus vào sub-heading trống
            setTimeout(() => {
                const emptySubInput = document.querySelector(`[data-sub-index="${emptySubHeadingIndex}"][data-lang="${languageCode}"]`);
                if (emptySubInput) {
                    emptySubInput.focus();
                    emptySubInput.scrollIntoView({ behavior: 'smooth', block: 'center' });
                    // Thêm hiệu ứng highlight
                    emptySubInput.style.boxShadow = '0 0 10px #ff9c6e';
                    setTimeout(() => {
                        emptySubInput.style.boxShadow = '';
                    }, 2000);
                }
            }, 100);
            return;
        }
        
        // Không có sub-heading trống hoặc bắt buộc thêm mới
        setSubHeadings(prev => ({
            ...prev,
            [languageCode]: [
                ...prev[languageCode],
                {
                    id: Date.now(), // Temporary ID for new items
                    text: '',
                    sortOrder: prev[languageCode].length + 1
                }
            ]
        }));
        
        if (forceAddNew) {
            message.success('New sub-heading added successfully!');
        }
    };

    const updateSubHeading = (languageCode, index, text) => {
        setSubHeadings(prev => ({
            ...prev,
            [languageCode]: prev[languageCode].map((item, i) => 
                i === index ? { ...item, text } : item
            )
        }));
    };

    const removeSubHeading = (languageCode, index) => {
        setSubHeadings(prev => ({
            ...prev,
            [languageCode]: prev[languageCode]
                .filter((_, i) => i !== index)
                .map((item, i) => ({ ...item, sortOrder: i + 1 }))
        }));
    };

    const moveSubHeading = (languageCode, index, direction) => {
        setSubHeadings(prev => {
            const items = [...prev[languageCode]];
            const newIndex = direction === 'up' ? index - 1 : index + 1;
            
            if (newIndex < 0 || newIndex >= items.length) return prev;
            
            // Swap items
            [items[index], items[newIndex]] = [items[newIndex], items[index]];
            
            // Update sort orders
            const updatedItems = items.map((item, i) => ({
                ...item,
                sortOrder: i + 1
            }));

            return {
                ...prev,
                [languageCode]: updatedItems
            };
        });
    };

    const handleSubmit = async () => {
        try {
            const formValues = await form.validateFields();
            
            // Validate that at least one translation exists
            const hasTranslations = Object.keys(translations).some(lang => 
                translations[lang]?.heading?.trim()
            );
            
            if (!hasTranslations) {
                message.error('At least one language translation with heading is required!');
                return;
            }

            // Prepare data structure matching SQL schema
            const heroData = {
                isDeleted: formValues.isDeleted || false,
                translations: Object.entries(translations)
                    .filter(([_, data]) => data?.heading?.trim())
                    .map(([languageCode, data]) => ({
                        languageCode,
                        preHeading: data.preHeading?.trim() || null,
                        heading: data.heading.trim(),
                        introHtml: data.introHtml?.trim() || null
                    })),
                subHeadings: Object.entries(subHeadings)
                    .flatMap(([languageCode, items]) => 
                        items
                            .filter(item => item.text?.trim())
                            .map(item => ({
                                languageCode,
                                text: item.text.trim(),
                                sortOrder: item.sortOrder
                            }))
                    )
            };

            await onSubmit(heroData);
        } catch (error) {
            console.error('Form validation failed:', error);
        }
    };

    const renderTranslationForm = (languageCode) => {
        const lang = languages.find(l => l.code === languageCode);
        const translationData = translations[languageCode] || {};
        const langSubHeadings = subHeadings[languageCode] || [];

        return (
            <div key={languageCode}>
                <Card 
                    title={
                        <span>
                            <TranslationOutlined /> Translation for {lang.flag} {lang.name}
                        </span>
                    }
                    size="small"
                    style={{ marginBottom: '16px' }}
                >
                    <Row gutter={[16, 16]}>
                        <Col span={24}>
                            <Form.Item label="Pre-heading (Optional)">
                                <Input
                                    placeholder="e.g., Hello, I am"
                                    value={translationData.preHeading || ''}
                                    onChange={(e) => handleTranslationChange(languageCode, 'preHeading', e.target.value)}
                                    maxLength={256}
                                    showCount
                                />
                            </Form.Item>
                        </Col>
                        <Col span={24}>
                            <Form.Item 
                                label="Main Heading" 
                                required
                                validateStatus={!translationData.heading?.trim() ? 'error' : ''}
                                help={!translationData.heading?.trim() ? 'Heading is required' : ''}
                            >
                                <Input
                                    placeholder="e.g., Your Name"
                                    value={translationData.heading || ''}
                                    onChange={(e) => handleTranslationChange(languageCode, 'heading', e.target.value)}
                                    maxLength={256}
                                    showCount
                                />
                            </Form.Item>
                        </Col>
                        <Col span={24}>
                            <Form.Item label="Intro HTML (Optional)">
                                <TextArea
                                    placeholder="e.g., <p>Welcome to my portfolio!</p>"
                                    value={translationData.introHtml || ''}
                                    onChange={(e) => handleTranslationChange(languageCode, 'introHtml', e.target.value)}
                                    rows={4}
                                />
                            </Form.Item>
                        </Col>
                    </Row>
                </Card>

                <Card
                    title={
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                            <span>
                                <MenuOutlined /> Sub-headings ({langSubHeadings.length})
                                {langSubHeadings.some(item => !item.text?.trim()) && (
                                    <Tag color="orange" style={{ marginLeft: '8px' }}>
                                        {langSubHeadings.filter(item => !item.text?.trim()).length} Empty
                                    </Tag>
                                )}
                            </span>
                            <Space>
                                {/* Nút ưu tiên: Sử dụng sub-heading trống nếu có */}
                                {langSubHeadings.some(item => !item.text?.trim()) && (
                                    <Button
                                        type="primary"
                                        size="small"
                                        icon={<EditOutlined />}
                                        onClick={() => {
                                            const emptyIndex = langSubHeadings.findIndex(item => !item.text?.trim());
                                            if (emptyIndex !== -1) {
                                                // Focus vào sub-heading trống đầu tiên
                                                setTimeout(() => {
                                                    const emptySubInput = document.querySelector(`[data-sub-index="${emptyIndex}"][data-lang="${languageCode}"]`);
                                                    if (emptySubInput) {
                                                        emptySubInput.focus();
                                                        emptySubInput.scrollIntoView({ behavior: 'smooth', block: 'center' });
                                                        // Thêm hiệu ứng highlight
                                                        emptySubInput.style.boxShadow = '0 0 15px #ff7a45';
                                                        emptySubInput.style.borderColor = '#ff7a45';
                                                        setTimeout(() => {
                                                            emptySubInput.style.boxShadow = '';
                                                            emptySubInput.style.borderColor = '';
                                                        }, 3000);
                                                    }
                                                }, 100);
                                                message.info(`Please fill Sub-heading #${langSubHeadings[emptyIndex].sortOrder} first!`);
                                            }
                                        }}
                                    >
                                        Use Empty ({langSubHeadings.filter(item => !item.text?.trim()).length})
                                    </Button>
                                )}
                                
                                {/* Nút thêm mới thông thường */}
                                <Button
                                    type="dashed"
                                    size="small"
                                    icon={<PlusOutlined />}
                                    onClick={() => addSubHeading(languageCode)}
                                    disabled={langSubHeadings.some(item => !item.text?.trim())}
                                    title={langSubHeadings.some(item => !item.text?.trim()) ? 
                                        'Please fill empty sub-headings first' : 'Add new sub-heading'}
                                >
                                    Add New
                                </Button>
                                
                                {/* Nút bắt buộc thêm mới */}
                                {langSubHeadings.some(item => !item.text?.trim()) && (
                                    <Button
                                        type="default"
                                        size="small"
                                        icon={<PlusOutlined />}
                                        onClick={() => addSubHeading(languageCode, true)}
                                        style={{ borderColor: '#ff9c6e' }}
                                        title="Force add new sub-heading even with empty ones"
                                    >
                                        Force Add
                                    </Button>
                                )}
                            </Space>
                        </div>
                    }
                    size="small"
                >
                    {langSubHeadings.length > 0 ? (
                        <div>
                            {langSubHeadings.map((item, index) => {
                                const isEmpty = !item.text?.trim();
                                return (
                                    <div
                                        key={item.id || item.subId || index}
                                        style={{
                                            marginBottom: '8px',
                                            padding: '8px',
                                            border: isEmpty ? '2px solid #ff9c6e' : '1px solid #d9d9d9',
                                            borderRadius: '6px',
                                            backgroundColor: isEmpty ? '#fff7e6' : '#fafafa',
                                            position: 'relative'
                                        }}
                                    >
                                        {isEmpty && (
                                            <div style={{
                                                position: 'absolute',
                                                top: '-10px',
                                                left: '8px',
                                                backgroundColor: '#ff9c6e',
                                                color: 'white',
                                                padding: '2px 8px',
                                                borderRadius: '4px',
                                                fontSize: '11px',
                                                fontWeight: 'bold'
                                            }}>
                                                EMPTY - Please fill this first
                                            </div>
                                        )}
                                        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                                            <div style={{ display: 'flex', flexDirection: 'column', gap: '2px' }}>
                                                <Button
                                                    type="text"
                                                    size="small"
                                                    icon={<ArrowUpOutlined />}
                                                    onClick={() => moveSubHeading(languageCode, index, 'up')}
                                                    disabled={index === 0}
                                                    style={{ height: '16px', width: '20px', padding: 0 }}
                                                />
                                                <Button
                                                    type="text"
                                                    size="small"
                                                    icon={<ArrowDownOutlined />}
                                                    onClick={() => moveSubHeading(languageCode, index, 'down')}
                                                    disabled={index === langSubHeadings.length - 1}
                                                    style={{ height: '16px', width: '20px', padding: 0 }}
                                                />
                                            </div>
                                            <Tag color={isEmpty ? "orange" : "blue"}>{item.sortOrder}</Tag>
                                            <Input
                                                placeholder={isEmpty ? "⚠️ Please enter text for this sub-heading" : "Enter sub-heading text"}
                                                value={item.text}
                                                onChange={(e) => updateSubHeading(languageCode, index, e.target.value)}
                                                maxLength={256}
                                                style={{ 
                                                    flex: 1,
                                                    borderColor: isEmpty ? '#ff9c6e' : undefined
                                                }}
                                                data-sub-index={index}
                                                data-lang={languageCode}
                                                status={isEmpty ? 'warning' : ''}
                                            />
                                            <Popconfirm
                                                title="Remove this sub-heading?"
                                                onConfirm={() => removeSubHeading(languageCode, index)}
                                            >
                                                <Button
                                                    type="text"
                                                    danger
                                                    size="small"
                                                    icon={<DeleteOutlined />}
                                                />
                                            </Popconfirm>
                                        </div>
                                    </div>
                                );
                            })}
                        </div>
                    ) : (
                        <div style={{ textAlign: 'center', padding: '20px', color: '#999' }}>
                            <MenuOutlined style={{ fontSize: '24px', marginBottom: '8px' }} />
                            <div>No sub-headings yet</div>
                            <Button
                                type="dashed"
                                size="small"
                                icon={<PlusOutlined />}
                                onClick={() => addSubHeading(languageCode, true)}
                                style={{ marginTop: '8px' }}
                            >
                                Add First Sub-heading
                            </Button>
                        </div>
                    )}
                </Card>
            </div>
        );
    };

    return (
        <Modal
            title={
                <span>
                    <GlobalOutlined /> {editingHero ? 'Edit Hero' : 'Create New Hero'}
                </span>
            }
            open={visible}
            onCancel={onCancel}
            footer={[
                <Button key="cancel" onClick={onCancel}>
                    Cancel
                </Button>,
                <Button 
                    key="submit" 
                    type="primary" 
                    loading={loading}
                    onClick={handleSubmit}
                >
                    {editingHero ? 'Update Hero' : 'Create Hero'}
                </Button>
            ]}
            width={900}
            style={{ top: 20 }}
            bodyStyle={{ maxHeight: '70vh', overflowY: 'auto' }}
        >
            <Form form={form} layout="vertical">
                <Card size="small" style={{ marginBottom: '16px' }}>
                    <Form.Item
                        name="isDeleted"
                        label="Hero Status"
                        valuePropName="checked"
                        initialValue={false}
                    >
                        <Switch 
                            checkedChildren="Active" 
                            unCheckedChildren="Deleted" 
                        />
                    </Form.Item>
                </Card>

                <Divider>
                    <GlobalOutlined /> Translations & Content
                </Divider>

                <Tabs
                    activeKey={activeTab}
                    onChange={setActiveTab}
                    items={languages.map(lang => ({
                        key: lang.code,
                        label: (
                            <span>
                                {lang.flag} {lang.name}
                                {translations[lang.code]?.heading && (
                                    <Tag color="green" size="small" style={{ marginLeft: '4px' }}>
                                        ✓
                                    </Tag>
                                )}
                            </span>
                        ),
                        children: renderTranslationForm(lang.code)
                    }))}
                />
            </Form>
        </Modal>
    );
};

export default HeroForm;