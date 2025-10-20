# 📋 Checklist Tối Ưu Hóa Admin Pages

## 🎯 Mục tiêu
Áp dụng tối ưu hóa cho tất cả các trang admin theo chuẩn đã thiết lập.

---

## ✅ Template Tối Ưu

### 1. **Table Management Page Template**

```jsx
import { ProTable } from '@ant-design/pro-components';
import { Button, Space, Tag, message, Popconfirm } from 'antd';
import {
  PlusOutlined,
  EditOutlined,
  DeleteOutlined,
  EyeOutlined
} from '@ant-design/icons';

const TableManagement = () => {
  const [data, setData] = useState([]);
  const [modalVisible, setModalVisible] = useState(false);
  const [editing, setEditing] = useState(null);

  const columns = [
    {
      title: 'Name',
      dataIndex: 'name',
      width: 200,
    },
    {
      title: 'Status',
      dataIndex: 'status',
      width: 120,
      render: (status) => (
        <Tag color={status === 'active' ? 'green' : 'red'}>
          {status}
        </Tag>
      ),
    },
    {
      title: 'Actions',
      key: 'action',
      fixed: 'right',
      width: 150,
      render: (_, record) => (
        <Space>
          <Button 
            type="text" 
            icon={<EyeOutlined />}
            onClick={() => handleView(record)}
          />
          <Button 
            type="text" 
            icon={<EditOutlined />}
            onClick={() => handleEdit(record)}
          />
          <Popconfirm
            title="Confirm delete?"
            onConfirm={() => handleDelete(record.id)}
          >
            <Button type="text" danger icon={<DeleteOutlined />} />
          </Popconfirm>
        </Space>
      ),
    },
  ];

  return (
    <ProTable
      headerTitle="Management"
      columns={columns}
      dataSource={data}
      search={false}
      pagination={{ pageSize: 10 }}
      toolBarRender={() => [
        <Button
          key="add"
          type="primary"
          icon={<PlusOutlined />}
          onClick={() => setModalVisible(true)}
        >
          Add New
        </Button>,
      ]}
    />
  );
};

export default TableManagement;
```

### 2. **Form Template**

```jsx
import { ProForm, ProFormText, ProFormSelect } from '@ant-design/pro-components';
import { message } from 'antd';

const FormComponent = ({ data, onSuccess }) => {
  const handleSubmit = async (values) => {
    try {
      // API call here
      message.success('Success');
      onSuccess?.();
    } catch (error) {
      message.error('Error');
    }
  };

  return (
    <ProForm
      initialValues={data}
      onFinish={handleSubmit}
      submitter={{
        searchConfig: {
          submitText: 'Save',
          resetText: 'Cancel',
        },
      }}
    >
      <ProFormText
        name="name"
        label="Name"
        rules={[{ required: true }]}
      />
      <ProFormSelect
        name="status"
        label="Status"
        options={[
          { label: 'Active', value: 'active' },
          { label: 'Inactive', value: 'inactive' },
        ]}
      />
    </ProForm>
  );
};
```

### 3. **SCSS Template**

```scss
.page-container {
  padding: 0;
  background: transparent;

  .data-card {
    border-radius: 8px;
    border: 1px solid #f0f0f0;
    transition: box-shadow 0.2s;
    
    &:hover {
      box-shadow: 0 4px 12px rgba(0, 0, 0, 0.08);
    }
  }

  .ant-table {
    .ant-table-thead > tr > th {
      background: #fafafa;
      font-weight: 600;
    }
  }
}

.theme-dark {
  .page-container {
    .data-card {
      background: #141414;
      border-color: #303030;
    }
    
    .ant-table .ant-table-thead > tr > th {
      background: #1f1f1f;
    }
  }
}
```

---

## 📝 Checklist cho từng trang

### ✅ Dashboard (Completed)
- [x] Loại bỏ animations
- [x] Đơn giản hóa stats cards
- [x] Giảm components
- [x] Tối ưu SCSS
- [x] Test performance

### ⏳ ProjectManagement
- [ ] Replace Table with ProTable
- [ ] Simplify project cards
- [ ] Remove complex animations
- [ ] Optimize SCSS
- [ ] Add ProForm for create/edit
- [ ] Test functionality

### ⏳ BlogManagement
- [ ] Replace Table with ProTable
- [ ] Use CKEditor efficiently
- [ ] Simplify post preview
- [ ] Optimize SCSS
- [ ] Add ProForm for posts
- [ ] Test functionality

### ⏳ ContactManagement
- [ ] Replace Table with ProTable
- [ ] Simplify message display
- [ ] Remove unnecessary effects
- [ ] Optimize SCSS
- [ ] Add filters with ProTable
- [ ] Test functionality

### ⏳ ProfileManagement
- [ ] Replace Table with ProTable
- [ ] Simplify profile cards
- [ ] Optimize form handling
- [ ] Optimize SCSS
- [ ] Add ProForm for profile
- [ ] Test functionality

### ⏳ SkillsManagement
- [ ] Replace Table with ProTable
- [ ] Simplify skill display
- [ ] Remove animations
- [ ] Optimize SCSS
- [ ] Add ProForm for skills
- [ ] Test functionality

### ⏳ AdminUsers
- [ ] Replace Table with ProTable
- [ ] Simplify user cards
- [ ] Add role management
- [ ] Optimize SCSS
- [ ] Add ProForm for users
- [ ] Test functionality

### ⏳ HeroManagement
- [x] Create optimized version
- [ ] Replace old version
- [ ] Test translations
- [ ] Test subheadings
- [ ] Verify API integration

---

## 🔧 Migration Steps

### Step 1: Backup
```bash
# Backup file cũ
cp ComponentName.jsx ComponentName.backup.jsx
cp ComponentName.scss ComponentName.backup.scss
```

### Step 2: Apply Template
1. Copy template code
2. Adjust columns/fields
3. Update API calls
4. Test functionality

### Step 3: Optimize SCSS
1. Remove keyframes
2. Simplify transitions
3. Use variables
4. Test responsive

### Step 4: Test
1. Functionality test
2. Performance test
3. Responsive test
4. Dark theme test

### Step 5: Deploy
1. Remove backup files
2. Commit changes
3. Push to repo

---

## 📊 Performance Targets

### Per Page Goals:
- [ ] Code reduction: >70%
- [ ] Render time: <100ms
- [ ] Bundle size: <50KB
- [ ] No animations lag
- [ ] Mobile responsive

### Overall Goals:
- [ ] Total bundle: <2MB
- [ ] FCP: <500ms
- [ ] TTI: <700ms
- [ ] Lighthouse: >90

---

## 🎨 UI Standards

### Colors:
- Primary: `#1890ff`
- Success: `#52c41a`
- Warning: `#faad14`
- Error: `#ff4d4f`

### Spacing:
- XS: `4px`
- SM: `8px`
- MD: `16px`
- LG: `24px`
- XL: `32px`

### Border Radius:
- SM: `4px`
- MD: `8px`
- LG: `12px`

### Transitions:
- Fast: `0.2s`
- Normal: `0.3s`

---

## 🚀 Quick Commands

### Start dev server:
```bash
cd portfolio-fe
npm run dev
```

### Check bundle size:
```bash
npm run build:analyze
```

### Lint & fix:
```bash
npm run lint:fix
```

### Optimize build:
```bash
npm run optimize
```

---

## 📖 Resources

### Documentation:
- [Ant Design](https://ant.design)
- [Pro Components](https://procomponents.ant.design)
- [React](https://react.dev)

### Best Practices:
- Use ProTable for all tables
- Use ProForm for all forms
- Keep components under 200 lines
- Keep SCSS under 150 lines
- No inline styles
- Use className instead

---

## ✨ Success Criteria

### Code Quality:
- ✅ Clean code
- ✅ Reusable components
- ✅ Proper naming
- ✅ Comments where needed

### Performance:
- ✅ Fast rendering
- ✅ No lag
- ✅ Optimized bundle
- ✅ Good metrics

### UX:
- ✅ Responsive
- ✅ Accessible
- ✅ Consistent
- ✅ Professional

---

## 📞 Support

### Issues?
1. Check console errors
2. Check network tab
3. Check React DevTools
4. Review this checklist

### Next Page to Optimize:
**Priority: ProjectManagement**

Reason: Most complex, high impact

---

**Last Updated: October 20, 2025**
**Status: In Progress**
**Progress: 2/9 pages (22%)**
