# Loading Components

Professional loading components được thiết kế để sử dụng xuyên suốt ứng dụng với hiệu ứng mượt mà và hỗ trợ theme sáng/tối.

## 🎯 Tính năng

- **Nhiều biến thể**: Spinner, Dots, Pulse, Skeleton
- **Responsive**: Tự động thích ứng với mọi kích thước màn hình
- **Theme support**: Hỗ trợ dark/light mode
- **Customizable**: Có thể tùy chỉnh màu sắc, kích thước, text
- **Accessible**: Tuân thủ các tiêu chuẩn accessibility
- **Performance**: Optimized animations với CSS transforms

## 📦 Components

### Loading (Main Component)
Component chính với nhiều tùy chọn:

```jsx
import Loading from 'components/UI/Loading';

// Basic usage
<Loading />

// Với tùy chọn
<Loading 
  variant="spinner"     // 'spinner' | 'dots' | 'pulse' | 'skeleton'
  size="medium"         // 'small' | 'medium' | 'large'
  color="primary"       // 'primary' | 'secondary' | 'accent'
  text="Loading..."     // Text hiển thị
  showText={true}       // Hiển thị text hay không
  fullScreen={false}    // Full screen overlay
  className=""          // CSS class tùy chỉnh
/>
```

### ProfileLoading
Loading skeleton cho profile section:

```jsx
import { ProfileLoading } from 'components/UI/Loading';

<ProfileLoading light={theme.light} />
```

### StatsLoading
Loading skeleton cho stats section:

```jsx
import { StatsLoading } from 'components/UI/Loading';

<StatsLoading />
```

### ProjectsLoading
Loading skeleton cho projects section:

```jsx
import { ProjectsLoading } from 'components/UI/Loading';

<ProjectsLoading />
```

## 🎨 Variants

### 1. Spinner (Default)
Rotating spinner với multiple rings:
```jsx
<Loading variant="spinner" size="large" color="primary" />
```

### 2. Dots
Bouncing dots animation:
```jsx
<Loading variant="dots" color="accent" />
```

### 3. Pulse
Pulsing circle effect:
```jsx
<Loading variant="pulse" size="medium" />
```

### 4. Skeleton
Shimmer effect cho content placeholders:
```jsx
<Loading variant="skeleton">
  <div style={{ width: '200px', height: '20px', marginBottom: '10px' }} />
  <div style={{ width: '150px', height: '20px' }} />
</Loading>
```

## 🎛️ Customization

### Sizes
- `small`: Compact cho buttons, inline elements
- `medium`: Standard size (default)
- `large`: Prominent cho main content areas

### Colors
- `primary`: Orange accent color
- `secondary`: Blue color
- `accent`: Light blue color

### Full Screen Overlay
```jsx
<Loading 
  variant="spinner" 
  fullScreen 
  text="Loading application..." 
/>
```

## 🏗️ Custom Skeleton Loading

Tạo skeleton loading tùy chỉnh:

```jsx
<Loading variant="skeleton" className="custom-skeleton">
  <div className="header-skeleton">
    <div style={{ width: '60px', height: '60px', borderRadius: '50%' }} />
    <div style={{ width: '200px', height: '24px' }} />
  </div>
  <div className="content-skeleton">
    <div style={{ width: '100%', height: '16px', marginBottom: '8px' }} />
    <div style={{ width: '80%', height: '16px', marginBottom: '8px' }} />
    <div style={{ width: '60%', height: '16px' }} />
  </div>
</Loading>
```

## 📱 Responsive Design

Components tự động responsive và adapt với:
- Mobile devices (< 768px)
- Tablet devices (768px - 1024px)  
- Desktop devices (> 1024px)

## ♿ Accessibility

- Respect `prefers-reduced-motion` setting
- Proper ARIA labels và roles
- High contrast colors cho dark/light themes
- Keyboard navigation support

## 🎭 Theme Integration

Automatic theme detection từ parent component:

```jsx
// Light theme
<div className="light-theme">
  <Loading variant="spinner" />
</div>

// Dark theme  
<div className="dark-theme">
  <Loading variant="dots" />
</div>
```

## 💡 Best Practices

1. **Use appropriate variants**: 
   - Skeleton cho content areas
   - Spinner cho actions
   - Dots cho subtle loading

2. **Consider loading time**:
   - Short delays: Simple spinner
   - Long delays: Skeleton với progress indication

3. **Provide feedback**:
   - Always include descriptive text
   - Use appropriate sizing

4. **Performance**:
   - Avoid multiple simultaneous animations
   - Use CSS transforms cho smooth animations

## 🔧 Development

### File Structure
```
components/UI/Loading/
├── index.jsx           # Main components
├── Loading.scss        # Styles
├── LoadingExamples.js  # Usage examples
└── README.md          # Documentation
```

### Dependencies
- React 18+
- PropTypes
- SCSS support

## 🚀 Future Enhancements

- [ ] Progress bar variant
- [ ] Percentage display
- [ ] Custom animation curves
- [ ] More skeleton templates
- [ ] Auto-retry functionality
