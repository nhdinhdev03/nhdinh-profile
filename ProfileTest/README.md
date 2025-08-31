# Professional Portfolio Website

A modern, responsive portfolio website built with React, SCSS, and TailwindCSS featuring professional animations and clean design.

## ✨ Features

- **Modern Design**: Clean and professional design with smooth animations
- **Responsive**: Fully responsive design that works on all devices
- **Fast Performance**: Optimized for speed and performance
- **Smooth Animations**: Beautiful animations using Framer Motion and AOS
- **Multi-page Layout**: Separate pages for Home, About, Projects, Blog, and Contact
- **Professional Effects**: Advanced CSS animations and hover effects
- **Accessibility**: Built with accessibility best practices

## 🚀 Technologies Used

- **React 18** - Modern React with hooks
- **React Router DOM** - Client-side routing
- **SCSS** - Advanced CSS preprocessing
- **TailwindCSS** - Utility-first CSS framework
- **Framer Motion** - Production-ready motion library
- **AOS** - Animate On Scroll library
- **React Icons** - Beautiful icon library
- **React Intersection Observer** - Intersection Observer API wrapper

## 📁 Project Structure

```
src/
├── components/
│   └── Layout/
│       ├── Header/
│       ├── Footer/
│       └── Layout.jsx
├── pages/
│   ├── Home/
│   │   ├── sections/
│   │   │   ├── HeroSection.jsx
│   │   │   ├── FeaturesSection.jsx
│   │   │   └── StatsSection.jsx
│   │   └── Home.jsx
│   ├── About/
│   ├── Projects/
│   ├── Blog/
│   └── Contact/
├── styles/
│   └── index.scss
├── utils/
│   └── ScrollToTop.js
└── App.js
```

## 🛠️ Installation & Setup

1. **Clone or download the project**
2. **Navigate to the project directory**
3. **Install dependencies:**
   ```bash
   npm install
   ```

4. **Start the development server:**
   ```bash
   npm start
   ```

5. **Open your browser and visit:**
   ```
   http://localhost:3000
   ```

## 📦 Available Scripts

- `npm start` - Runs the development server
- `npm build` - Builds the project for production
- `npm test` - Runs the test suite
- `npm eject` - Ejects from Create React App (irreversible)

## 🎨 Customization

### Colors
Update the color scheme in `tailwind.config.js`:
```javascript
colors: {
  primary: {
    500: '#3b82f6', // Your primary color
    600: '#2563eb',
  },
  secondary: {
    500: '#6366f1', // Your secondary color
  }
}
```

### Content
1. **Personal Information**: Update in each component
2. **Projects**: Modify the projects array in `Projects.jsx`
3. **Blog Posts**: Update the blogPosts array in `Blog.jsx`
4. **Skills**: Modify the skills array in `About.jsx`

### Images
Replace placeholder images with your actual images:
- Profile photos
- Project screenshots
- Blog post images

## 🌟 Key Components

### HeroSection
- Animated typing effect
- Floating shapes animation
- Interactive background
- Call-to-action buttons

### FeaturesSection
- Grid layout for features
- Hover animations
- Icon integration
- Responsive design

### StatsSection
- Animated counters
- Dark theme section
- Call-to-action

### Projects
- Filter functionality
- Image overlays
- Technology tags
- External links

### Contact Form
- Form validation
- Loading states
- Contact information
- Social links

## 📱 Responsive Design

The website is fully responsive with breakpoints for:
- Mobile: < 768px
- Tablet: 768px - 1024px
- Desktop: > 1024px

## 🎭 Animations

### Framer Motion
- Page transitions
- Component animations
- Hover effects
- Stagger animations

### AOS (Animate On Scroll)
- Scroll-triggered animations
- Fade effects
- Slide animations

### Custom CSS Animations
- Floating elements
- Gradient animations
- Loading spinners

## 🚀 Deployment

### Build for Production
```bash
npm run build
```

### Deploy to Netlify
1. Build the project: `npm run build`
2. Drag and drop the `build` folder to Netlify

### Deploy to Vercel
1. Install Vercel CLI: `npm i -g vercel`
2. Run: `vercel`
3. Follow the prompts

## 🔧 Performance Optimization

- Lazy loading of components
- Optimized images
- Minimized CSS and JavaScript
- Efficient animations
- Proper code splitting

## 📋 Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## 🤝 Contributing

1. Fork the project
2. Create your feature branch
3. Commit your changes
4. Push to the branch
5. Open a Pull Request

## 📄 License

This project is open source and available under the [MIT License](LICENSE).

## 📞 Support

If you have any questions or need help with customization, feel free to reach out!

---

**Made with ❤️ using React, SCSS, and TailwindCSS**
