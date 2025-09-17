# 🚀 Professional Portfolio

Một trang web portfolio chuyên nghiệp và hiện đại được xây dựng với React, JSX và SCSS. Trang web này có thiết kế responsive, dark/light mode, animations mượt mà và performance tối ưu.

## ✨ Tính Năng

### 🎨 Design & UI/UX
- **Responsive Design**: Hoạt động hoàn hảo trên mọi thiết bị (desktop, tablet, mobile)
- **Dark/Light Mode**: Chuyển đổi theme dễ dàng với animation mượt mà
- **Modern UI**: Interface hiện đại với gradient, glass effects và micro-interactions
- **Accessibility**: Tuân thủ các tiêu chuẩn accessibility (WCAG)

### 🎭 Animations & Interactions
- **Framer Motion**: Animations và transitions chuyên nghiệp
- **Scroll Animations**: Các elements animate khi scroll vào view
- **Hover Effects**: Interactive hover states cho buttons và cards
- **Loading Screen**: Loading screen với animation đẹp mắt
- **Smooth Scrolling**: Navigation mượt mà giữa các sections

### 🧱 Components
- **Header**: Navigation với sticky behavior và mobile menu
- **Hero Section**: Landing area với typing animation và tech stack icons
- **About**: Giới thiệu bản thân với stats và values
- **Skills**: Kỹ năng với progress bars và tech icons
- **Experience**: Timeline kinh nghiệm làm việc
- **Projects**: Showcase các dự án với hover effects
- **Contact**: Form liên hệ với validation
- **Footer**: Footer với social links và scroll to top

### 🛠️ Technical Features
- **TypeScript Ready**: Dễ dàng migrate sang TypeScript
- **Component Architecture**: Modular và reusable components
- **SCSS Variables**: Centralized theme management
- **Optimized Build**: Vite build system với code splitting
- **SEO Friendly**: Meta tags và semantic HTML
- **Performance**: Optimized images và lazy loading

## 🚀 Bắt Đầu

### Prerequisites
- Node.js (version 16 trở lên)
- npm hoặc yarn

### Installation

1. **Clone repository**
```bash
git clone https://github.com/your-username/professional-portfolio.git
cd professional-portfolio
```

2. **Cài đặt dependencies**
```bash
npm install
# hoặc
yarn install
```

3. **Chạy development server**
```bash
npm run dev
# hoặc
yarn dev
```

4. **Mở browser và truy cập**
```
http://localhost:5173
```

### Build cho Production

```bash
npm run build
# hoặc
yarn build
```

### Preview build
```bash
npm run preview
# hoặc
yarn preview
```

## 📁 Cấu Trúc Thư Mục

```
src/
├── components/
│   ├── Header/
│   │   ├── Header.jsx
│   │   └── Header.scss
│   ├── Hero/
│   │   ├── Hero.jsx
│   │   └── Hero.scss
│   ├── About/
│   │   ├── About.jsx
│   │   └── About.scss
│   ├── Skills/
│   │   ├── Skills.jsx
│   │   └── Skills.scss
│   ├── Experience/
│   │   ├── Experience.jsx
│   │   └── Experience.scss
│   ├── Projects/
│   │   ├── Projects.jsx
│   │   └── Projects.scss
│   ├── Contact/
│   │   ├── Contact.jsx
│   │   └── Contact.scss
│   ├── Footer/
│   │   ├── Footer.jsx
│   │   └── Footer.scss
│   ├── ThemeToggle/
│   │   ├── ThemeToggle.jsx
│   │   └── ThemeToggle.scss
│   └── ScrollToTop/
│       ├── ScrollToTop.jsx
│       └── ScrollToTop.scss
├── styles/
│   ├── variables.scss
│   ├── index.scss
│   └── App.scss
├── App.jsx
└── main.jsx
```

## 🎨 Customization

### Thay Đổi Colors
Chỉnh sửa file `src/styles/variables.scss`:

```scss
:root {
  --primary-light: #6366f1;  // Màu chính
  --secondary-light: #10b981; // Màu phụ
  // ... các colors khác
}
```

### Thêm Animations
Sử dụng Framer Motion:

```jsx
import { motion } from 'framer-motion'

<motion.div
  initial={{ opacity: 0, y: 20 }}
  animate={{ opacity: 1, y: 0 }}
  transition={{ duration: 0.5 }}
>
  Your content
</motion.div>
```

### Responsive Breakpoints
```scss
// Trong variables.scss
$breakpoint-sm: 640px;
$breakpoint-md: 768px;
$breakpoint-lg: 1024px;
$breakpoint-xl: 1280px;
```

## 📝 Content Customization

### Thông Tin Cá Nhân
Chỉnh sửa trong các components:
- `Hero.jsx`: Tên, title, description
- `About.jsx`: Thông tin về bản thân
- `Experience.jsx`: Kinh nghiệm làm việc
- `Skills.jsx`: Kỹ năng và công nghệ
- `Projects.jsx`: Các dự án đã làm
- `Contact.jsx`: Thông tin liên hệ

### Thay Đổi Images
- Thêm images vào thư mục `public/`
- Update đường dẫn trong components
- Sử dụng placeholder cho development

## 🚀 Deployment

### Netlify
1. Build project: `npm run build`
2. Upload thư mục `dist` lên Netlify
3. Hoặc connect GitHub repo để auto deploy

### Vercel
1. Install Vercel CLI: `npm i -g vercel`
2. Run: `vercel`
3. Follow the prompts

### GitHub Pages
1. Install gh-pages: `npm install --save-dev gh-pages`
2. Add scripts to package.json:
```json
{
  "scripts": {
    "predeploy": "npm run build",
    "deploy": "gh-pages -d dist"
  }
}
```
3. Run: `npm run deploy`

## 🛠️ Technology Stack

- **Frontend Framework**: React 18
- **Build Tool**: Vite
- **Styling**: SCSS với CSS Variables
- **Animations**: Framer Motion
- **Icons**: React Icons (Feather Icons)
- **Fonts**: Google Fonts (Inter, JetBrains Mono)
- **Development**: ESLint, Hot Module Replacement

## 📊 Performance Features

- **Code Splitting**: Automatic với Vite
- **Image Optimization**: Lazy loading và compression
- **CSS Optimization**: Purged unused CSS
- **Bundle Analysis**: Analyze bundle size
- **Caching**: Browser caching strategies
- **Lighthouse Score**: 95+ performance score

## 🎯 SEO Optimization

- **Meta Tags**: Title, description, keywords
- **Semantic HTML**: Proper HTML5 structure  
- **Open Graph**: Social media preview
- **Schema.org**: Structured data
- **Sitemap**: XML sitemap generation
- **Robot.txt**: Search engine guidelines

## 🤝 Contributing

1. Fork the project
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 👨‍💻 Author

**Professional Developer**
- Website: [your-website.com](https://your-website.com)
- LinkedIn: [linkedin.com/in/yourprofile](https://linkedin.com/in/yourprofile)
- GitHub: [github.com/yourusername](https://github.com/yourusername)
- Email: developer@example.com

## 🙏 Acknowledgments

- [React](https://reactjs.org/) - The web framework used
- [Vite](https://vitejs.dev/) - Build tool
- [Framer Motion](https://www.framer.com/motion/) - Animation library
- [React Icons](https://react-icons.github.io/react-icons/) - Icon library
- [Google Fonts](https://fonts.google.com/) - Typography

---

⭐ Nếu project này hữu ích với bạn, hãy cho một star nhé! ⭐
