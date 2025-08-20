# Getting Started with Create React App

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in your browser.

The page will reload when you make changes.\
You may also see any lint errors in the console.

### `npm test`

Launches the test runner in the interactive watch mode.\
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `npm run build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `npm run eject`

**Note: this is a one-way operation. Once you `eject`, you can't go back!**

If you aren't satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you're on your own.

You don't have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn't feel obligated to use this feature. However we understand that this tool wouldn't be useful if you couldn't customize it when you are ready for it.

## Learn More

You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

To learn React, check out the [React documentation](https://reactjs.org/).

### Code Splitting

This section has moved here: [https://facebook.github.io/create-react-app/docs/code-splitting](https://facebook.github.io/create-react-app/docs/code-splitting)

### Analyzing the Bundle Size

This section has moved here: [https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size](https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size)

### Making a Progressive Web App

This section has moved here: [https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app](https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app)

### Advanced Configuration

This section has moved here: [https://facebook.github.io/create-react-app/docs/advanced-configuration](https://facebook.github.io/create-react-app/docs/advanced-configuration)

### Deployment

This section has moved here: [https://facebook.github.io/create-react-app/docs/deployment](https://facebook.github.io/create-react-app/docs/deployment)

### `npm run build` fails to minify

This section has moved here: [https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify](https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify)



# 🚀 Admin Panel - Portfolio Management System

## 📋 Tổng quan

Hệ thống quản trị Portfolio chuyên nghiệp được xây dựng với React và Tailwind CSS, cung cấp interface hiện đại để quản lý toàn bộ nội dung website portfolio.

## ✨ Tính năng chính

### 🎯 Dashboard
- **Tổng quan hệ thống**: Hiển thị thống kê quan trọng
- **Hoạt động gần đây**: Theo dõi các thay đổi mới nhất
- **Công việc sắp tới**: Quản lý task và deadline
- **Biểu đồ thống kê**: Visualize dữ liệu (sẵn sàng tích hợp Chart.js/Recharts)

### 📝 Quản lý Nội dung
- **🏠 Trang chủ**: Chỉnh sửa Hero Section, layout sections
- **👤 Giới thiệu**: Cập nhật thông tin cá nhân, kinh nghiệm
- **💼 Dự án**: CRUD projects với công nghệ, links, featured status
- **📰 Blog**: Quản lý bài viết và nội dung
- **📞 Liên hệ**: Xử lý tin nhắn và phản hồi

### 👥 Quản lý Hệ thống
- **🔐 Tài khoản**: User management với role-based permissions
- **📊 Lịch sử**: Activity logs chi tiết với audit trail
- **🖼️ Media**: Thư viện hình ảnh và tài liệu
- **📈 Thống kê**: Analytics và báo cáo
- **⚙️ Cài đặt**: Cấu hình hệ thống
- **👤 Hồ sơ**: Thông tin admin

## 🛠️ Công nghệ sử dụng

- **Frontend**: React 18, Tailwind CSS
- **UI Components**: Headless UI, Heroicons
- **Routing**: React Router DOM v6
- **State Management**: React Hooks
- **Form Handling**: React Hook Form (ready)
- **Charts**: Chart.js, Recharts (integrated)
- **Animations**: Framer Motion (ready)

## 📂 Cấu trúc thư mục

```
src/
├── pages/Admin/
│   ├── Dashboard/Dashboard.jsx          # Main dashboard
│   ├── HomeManagement/HomeManagement.jsx
│   ├── ProjectsManagement/ProjectsManagement.jsx
│   ├── AccountsManagement/AccountsManagement.jsx
│   ├── HistoryLogs/HistoryLogs.jsx
│   └── ...
├── layouts/Admin/
│   ├── index.jsx                        # Main admin layout
│   ├── Sidebar/index.jsx               # Navigation sidebar
│   └── Header/index.jsx                 # Top header
├── router/
│   ├── index.js                         # Route configuration
│   └── routeConstants.js               # Route constants
└── components/Admin/
    └── index.jsx                        # Admin components export
```

## 🎨 Design System

### Colors
- **Primary**: Indigo (indigo-600, indigo-700)
- **Success**: Green (green-600, green-100)
- **Warning**: Yellow (yellow-600, yellow-100)
- **Danger**: Red (red-600, red-100)
- **Neutral**: Gray scale

### Components
- **Cards**: Rounded borders, subtle shadows
- **Buttons**: Primary/Secondary với hover states
- **Forms**: Focus states, validation styling
- **Tables**: Responsive với hover effects
- **Modals**: Backdrop blur, smooth transitions

## 🚀 Cách sử dụng

### Truy cập Admin Panel
```
URL: /dashboard-management-sys/dashboard
```

### Navigation
- **Desktop**: Sidebar cố định bên trái
- **Mobile**: Hamburger menu với slide-out sidebar
- **Breadcrumb**: Hiển thị đường dẫn hiện tại

### Quản lý Dự án
1. Vào "Quản lý Dự án"
2. Click "Thêm dự án" 
3. Điền thông tin: tên, mô tả, công nghệ, links
4. Set featured status và publish/draft
5. Save và preview

### Quản lý Tài khoản
1. Vào "Quản lý Tài khoản"
2. Xem danh sách users với roles
3. Click "Thêm người dùng" để tạo mới
4. Set permissions theo role: Admin, Editor, Viewer
5. Activate/Deactivate accounts

### Theo dõi Lịch sử
1. Vào "Lịch sử thay đổi"
2. Filter theo action types
3. Click "Chi tiết" để xem thay đổi cụ thể
4. Track user actions, IP, timestamps

## 📊 Routes Available

```javascript
ADMIN ROUTES:
├── /dashboard-management-sys/dashboard     # Main dashboard
├── /dashboard-management-sys/home         # Home management
├── /dashboard-management-sys/about        # About management  
├── /dashboard-management-sys/projects     # Projects management
├── /dashboard-management-sys/blog         # Blog management
├── /dashboard-management-sys/contact      # Contact management
├── /dashboard-management-sys/accounts     # Accounts management
├── /dashboard-management-sys/history      # History logs
├── /dashboard-management-sys/media        # Media library
├── /dashboard-management-sys/analytics    # Analytics
├── /dashboard-management-sys/settings     # Settings
└── /dashboard-management-sys/profile      # Admin profile
```

## 🔧 Tính năng sắp tới

- [ ] **Rich Text Editor**: CKEditor integration cho blog
- [ ] **File Upload**: Drag & drop media upload
- [ ] **Real-time Updates**: WebSocket cho live updates
- [ ] **Export Data**: CSV/PDF export functionality  
- [ ] **Advanced Analytics**: Detailed charts và metrics
- [ ] **Theme Customization**: Dark/Light mode switcher
- [ ] **Notification System**: In-app notifications
- [ ] **Backup & Restore**: Data backup tools

## 🔐 Security Features

- **Role-based Access Control**: Admin, Editor, Viewer roles
- **Activity Logging**: Comprehensive audit trail
- **Session Management**: Secure authentication
- **Input Validation**: XSS và injection protection
- **Permission Checks**: Granular permission system

## 📱 Responsive Design

- **Mobile First**: Optimized cho tất cả screen sizes
- **Touch Friendly**: Large touch targets on mobile
- **Progressive Enhancement**: Graceful degradation
- **Performance**: Lazy loading và code splitting ready

## 🎯 Best Practices

- **Component Structure**: Separation of concerns
- **State Management**: Proper state lifting
- **Error Handling**: User-friendly error messages  
- **Accessibility**: ARIA labels và keyboard navigation
- **Performance**: Optimized renders và memoization

---

## 🚀 Getting Started

1. **Start Development Server**:
   ```bash
   npm start
   ```

2. **Access Admin Panel**:
   ```
   http://localhost:3000/dashboard-management-sys/dashboard
   ```

3. **Build for Production**:
   ```bash
   npm run build
   ```

---

**🎉 Chúc bạn sử dụng admin panel hiệu quả!**
