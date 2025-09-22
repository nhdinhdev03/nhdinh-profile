import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import {
  FiArrowRight,
  FiCalendar,
  FiClock,
  FiFilter,
  FiSearch,
  FiTag,
  FiUser,
} from "react-icons/fi";
import { Link } from "react-router-dom";

import useSaveScrollPosition from "hooks/useSaveScrollPosition";
import "./Blog.scss";

function Blog() {
  const { t } = useTranslation();
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredPosts, setFilteredPosts] = useState([]);
  
  // Sử dụng hook lưu và khôi phục vị trí cuộn
  useSaveScrollPosition();

  // Professional blog data với nội dung chuyên sâu
  const blogPosts = [
    {
      id: 1,
      title: "React 18 Concurrent Features: Deep Dive vào Render Behavior",
      excerpt:
        "Phân tích sâu về Concurrent Rendering, useTransition, useDeferredValue và cách chúng thay đổi cách React xử lý updates. Bao gồm performance benchmarks và best practices.",
      content: `
        <div class="table-of-contents">
          <h3>📋 Nội dung bài viết</h3>
          <ul>
            <li><a href="#concurrent-overview">1. Concurrent Rendering Overview</a></li>
            <li><a href="#usetransition">2. useTransition Hook Deep Dive</a></li>
            <li><a href="#usedeferredvalue">3. useDeferredValue Implementation</a></li>
            <li><a href="#performance">4. Performance Analysis & Benchmarks</a></li>
            <li><a href="#migration">5. Migration Strategy</a></li>
            <li><a href="#best-practices">6. Production Best Practices</a></li>
          </ul>
        </div>

        <h2 id="concurrent-overview">🚀 Concurrent Rendering: Paradigm Shift</h2>
        <p>React 18 đánh dấu bước ngoặt lớn với <strong>Concurrent Rendering</strong> - khả năng React có thể tạm dừng, tiếp tục, hoặc hủy bỏ render work để duy trì responsiveness. Điều này khác hoàn toàn với synchronous rendering trước đây.</p>

        <blockquote>
          <p><strong>Key Insight:</strong> Concurrent rendering không làm ứng dụng nhanh hơn, mà làm cho nó <em>responsive</em> hơn bằng cách ưu tiên các updates quan trọng.</p>
        </blockquote>

        <h3>🔧 Technical Implementation</h3>
        <p>React 18 giới thiệu <code>useTransition</code> và <code>useDeferredValue</code> để tối ưu performance.</p>

        <h2 id="best-practices">✅ Key Best Practices</h2>
        <ul>
          <li>Use <code>useTransition</code> for expensive, non-urgent updates</li>
          <li>Use <code>useDeferredValue</code> for derived expensive computations</li>
          <li>Monitor performance impact with proper metrics</li>
        </ul>
      `,
      category: "react",
      author: "Senior React Engineer",
      date: "2024-01-15",
      readTime: 15,
      tags: ["React 18", "Concurrent Features", "Performance", "useTransition"],
      difficulty: "Advanced",
      views: 12500,
      likes: 890,
      image: "https://images.unsplash.com/photo-1633356122544-f134324a6cee?w=600&h=300&fit=crop&crop=center",
    },
    {
      id: 2,
      title:
        "CSS Grid vs Flexbox: Advanced Layout Strategies & Performance Analysis",
      excerpt:
        "Deep dive vào CSS Grid và Flexbox với real-world examples, performance benchmarks, và advanced techniques cho responsive design. Bao gồm subgrid, container queries và layout optimization.",
      content: `
        <div class="table-of-contents">
          <h3>📋 Nội dung bài viết</h3>
          <ul>
            <li><a href="#fundamental-differences">1. Fundamental Differences: 1D vs 2D</a></li>
            <li><a href="#performance-analysis">2. Performance Analysis & Benchmarks</a></li>
            <li><a href="#advanced-grid">3. Advanced Grid Techniques</a></li>
            <li><a href="#flexbox-mastery">4. Flexbox Mastery Patterns</a></li>
            <li><a href="#responsive-strategies">5. Responsive Design Strategies</a></li>
            <li><a href="#real-world-examples">6. Real-World Implementation Examples</a></li>
          </ul>
        </div>

        <h2 id="fundamental-differences">🎯 Fundamental Differences: Beyond 1D vs 2D</h2>
        
        <p>Mặc dù thường được giải thích là "Flexbox cho 1D, Grid cho 2D", thực tế phức tạp hơn nhiều. Hãy phân tích sâu về cách chúng hoạt động.</p>

        <h3>🔧 Layout Algorithm Comparison</h3>
        
        <pre><code>/* Flexbox: Content-Based Sizing */
.flex-container {
  display: flex;
  gap: 1rem;
}

.flex-item {
  flex: 1; /* Grows based on available space */
  min-width: 0; /* Prevent overflow */
}

/* Grid: Container-Based Sizing */
.grid-container {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 1rem;
}

.grid-item {
  /* Size determined by grid track */
}</code></pre>

        <h3>📊 When Content Drives Layout (Flexbox)</h3>
        <pre><code>/* Dynamic navigation based on content */
.dynamic-nav {
  display: flex;
  gap: 0.5rem;
  padding: 1rem;
}

.nav-item {
  padding: 0.5rem 1rem;
  white-space: nowrap;
  flex-shrink: 0; /* Prevent text wrapping */
}

.nav-item:last-child {
  margin-left: auto; /* Push to end */
}

/* Responsive card layout with content-driven sizing */
.card-container {
  display: flex;
  flex-wrap: wrap;
  gap: 1rem;
}

.card {
  flex: 1 1 300px; /* grow | shrink | basis */
  max-width: 500px;
  min-width: 250px;
}</code></pre>

        <h3>🏗️ When Layout Drives Content (Grid)</h3>
        <pre><code>/* Complex dashboard layout */
.dashboard {
  display: grid;
  grid-template-areas: 
    "header header header"
    "sidebar main aside"
    "footer footer footer";
  grid-template-columns: 200px 1fr 300px;
  grid-template-rows: 60px 1fr 40px;
  min-height: 100vh;
}

.header { grid-area: header; }
.sidebar { grid-area: sidebar; }
.main { grid-area: main; }
.aside { grid-area: aside; }
.footer { grid-area: footer; }

/* Magazine-style layout */
.magazine-layout {
  display: grid;
  grid-template-columns: repeat(12, 1fr);
  gap: 1rem;
}

.hero-article {
  grid-column: 1 / 9;
  grid-row: 1 / 3;
}

.side-article {
  grid-column: 9 / 13;
  grid-row: 1;
}

.featured {
  grid-column: 9 / 13;
  grid-row: 2;
}</code></pre>

        <h2 id="performance-analysis">⚡ Performance Analysis & Benchmarks</h2>

        <h3>Rendering Performance Comparison</h3>
        <table>
          <thead>
            <tr>
              <th>Layout Type</th>
              <th>Items</th>
              <th>Flexbox (ms)</th>
              <th>Grid (ms)</th>
              <th>Winner</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>Simple list</td>
              <td>100</td>
              <td>2.3</td>
              <td>3.1</td>
              <td>Flexbox</td>
            </tr>
            <tr>
              <td>Card grid</td>
              <td>50</td>
              <td>8.7</td>
              <td>4.2</td>
              <td>Grid</td>
            </tr>
            <tr>
              <td>Complex dashboard</td>
              <td>20</td>
              <td>15.4</td>
              <td>6.8</td>
              <td>Grid</td>
            </tr>
            <tr>
              <td>Dynamic sizing</td>
              <td>30</td>
              <td>4.1</td>
              <td>7.3</td>
              <td>Flexbox</td>
            </tr>
          </tbody>
        </table>

        <h3>🔍 Performance Optimization Techniques</h3>
        <pre><code>/* Optimize Flexbox performance */
.optimized-flex {
  display: flex;
  /* Avoid flex-basis: auto for better performance */
  flex-basis: 0;
  
  /* Use will-change for animations */
  will-change: transform;
  
  /* Contain layout calculations */
  contain: layout style;
}

/* Optimize Grid performance */
.optimized-grid {
  display: grid;
  /* Use fixed units when possible */
  grid-template-columns: repeat(4, 250px);
  
  /* Avoid auto-sizing for better performance */
  grid-auto-rows: 200px;
  
  /* Contain layout calculations */
  contain: layout;
}</code></pre>

        <h2 id="advanced-grid">🚀 Advanced Grid Techniques</h2>

        <h3>Subgrid (Firefox Support)</h3>
        <pre><code>/* Parent grid */
.card-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 2rem;
}

/* Child inherits parent's column tracks */
.card {
  display: grid;
  grid-template-rows: auto 1fr auto;
  grid-row: span 2; /* Span multiple parent rows */
  
  /* Align with parent's column grid */
  grid-template-columns: subgrid;
}

.card-header { grid-row: 1; }
.card-content { grid-row: 2; }
.card-footer { grid-row: 3; }</code></pre>

        <h3>Dynamic Grid Areas</h3>
        <pre><code>/* JavaScript-driven layout */
function createDynamicGrid(items) {
  const container = document.querySelector('.dynamic-grid');
  
  // Calculate optimal columns based on container width
  const containerWidth = container.offsetWidth;
  const itemMinWidth = 250;
  const gap = 16;
  const columns = Math.floor((containerWidth + gap) / (itemMinWidth + gap));
  
  // Update CSS custom properties
  container.style.setProperty('--columns', columns);
  container.style.setProperty('--rows', Math.ceil(items.length / columns));
  
  // Apply dynamic grid areas
  items.forEach((item, index) => {
    const row = Math.floor(index / columns) + 1;
    const col = (index % columns) + 1;
    item.style.gridArea = \`\${row} / \${col}\`;
  });
}

/* CSS */
.dynamic-grid {
  display: grid;
  grid-template-columns: repeat(var(--columns), 1fr);
  grid-template-rows: repeat(var(--rows), auto);
  gap: 1rem;
}</code></pre>

        <h2 id="flexbox-mastery">💪 Flexbox Mastery Patterns</h2>

        <h3>Advanced Flex Patterns</h3>
        <pre><code>/* Holy Grail Layout with Flexbox */
.holy-grail {
  display: flex;
  flex-direction: column;
  min-height: 100vh;
}

.holy-grail-body {
  display: flex;
  flex: 1; /* Fill remaining space */
}

.holy-grail-content {
  flex: 1;
  order: 2; /* Content first on mobile */
}

.holy-grail-nav {
  flex: 0 0 200px; /* Fixed width */
  order: 1;
}

.holy-grail-aside {
  flex: 0 0 200px;
  order: 3;
}

/* Responsive: Stack on mobile */
@media (max-width: 768px) {
  .holy-grail-body {
    flex-direction: column;
  }
  
  .holy-grail-nav,
  .holy-grail-aside {
    flex: 0 0 auto;
  }
}</code></pre>

        <h3>Smart Flex Item Sizing</h3>
        <pre><code>/* Intelligent flex basis calculation */
.smart-flex-container {
  display: flex;
  gap: 1rem;
}

.smart-flex-item {
  /* Calculate basis considering gap */
  flex: 1 1 calc((100% - 2rem) / 3);
  max-width: calc((100% - 2rem) / 3);
}

/* Aspect ratio preservation */
.aspect-flex-item {
  flex: 1 1 300px;
  aspect-ratio: 16 / 9;
  object-fit: cover;
}

/* Content-aware sizing */
.content-aware-item {
  flex: 1 1 auto;
  min-width: min-content; /* Shrink to content */
  max-width: max-content; /* Grow to content */
}</code></pre>

        <h2 id="responsive-strategies">📱 Advanced Responsive Strategies</h2>

        <h3>Container Queries với Grid/Flexbox</h3>
        <pre><code>/* Container query setup */
.responsive-container {
  container-type: inline-size;
  container-name: card-container;
}

/* Grid to Flexbox based on container width */
.adaptive-layout {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 1rem;
}

@container card-container (max-width: 600px) {
  .adaptive-layout {
    display: flex;
    flex-direction: column;
  }
}

/* Dynamic column count based on container size */
@container card-container (min-width: 800px) {
  .adaptive-layout {
    grid-template-columns: repeat(3, 1fr);
  }
}

@container card-container (min-width: 1200px) {
  .adaptive-layout {
    grid-template-columns: repeat(4, 1fr);
  }
}</code></pre>

        <h2 id="real-world-examples">🌍 Real-World Implementation Examples</h2>

        <h3>E-commerce Product Grid</h3>
        <pre><code>/* Responsive product grid with fallbacks */
.product-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
  gap: 2rem 1rem;
  padding: 2rem;
}

/* Fallback for older browsers */
@supports not (display: grid) {
  .product-grid {
    display: flex;
    flex-wrap: wrap;
    margin: -0.5rem;
  }
  
  .product-card {
    flex: 1 1 280px;
    margin: 0.5rem;
    max-width: calc(33.333% - 1rem);
  }
}

/* Advanced product card with internal grid */
.product-card {
  display: grid;
  grid-template-rows: auto 1fr auto auto;
  border-radius: 8px;
  overflow: hidden;
  transition: transform 0.2s ease;
}

.product-card:hover {
  transform: translateY(-4px);
}

.product-image { grid-row: 1; }
.product-info { grid-row: 2; }
.product-price { grid-row: 3; }
.product-actions { grid-row: 4; }</code></pre>

        <h3>Complex Dashboard Layout</h3>
        <pre><code>/* Multi-level grid system */
.dashboard {
  display: grid;
  grid-template-areas:
    "header header header"
    "sidebar main widgets"
    "sidebar charts widgets";
  grid-template-columns: 250px 1fr 300px;
  grid-template-rows: 60px 1fr 300px;
  gap: 1rem;
  min-height: 100vh;
  padding: 1rem;
}

/* Nested flex layouts within grid areas */
.main-content {
  grid-area: main;
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.content-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1rem;
  background: var(--surface);
  border-radius: 8px;
}

.content-body {
  flex: 1;
  display: grid;
  grid-template-columns: 2fr 1fr;
  gap: 1rem;
}

/* Responsive dashboard */
@media (max-width: 1024px) {
  .dashboard {
    grid-template-areas:
      "header"
      "main"
      "sidebar"
      "widgets"
      "charts";
    grid-template-columns: 1fr;
    grid-template-rows: 60px auto auto auto auto;
  }
}</code></pre>

        <h3>🎯 Decision Matrix: Grid vs Flexbox</h3>
        
        <table>
          <thead>
            <tr>
              <th>Use Case</th>
              <th>Recommended</th>
              <th>Reason</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>Navigation bars</td>
              <td>Flexbox</td>
              <td>Content-driven, dynamic sizing</td>
            </tr>
            <tr>
              <td>Card grids</td>
              <td>Grid</td>
              <td>Consistent alignment, 2D control</td>
            </tr>
            <tr>
              <td>Form layouts</td>
              <td>Grid</td>
              <td>Precise alignment, label positioning</td>
            </tr>
            <tr>
              <td>Button groups</td>
              <td>Flexbox</td>
              <td>Content-based sizing</td>
            </tr>
            <tr>
              <td>Page layouts</td>
              <td>Grid</td>
              <td>Complex positioning, named areas</td>
            </tr>
            <tr>
              <td>Media objects</td>
              <td>Flexbox</td>
              <td>Content alignment, flexible sizing</td>
            </tr>
          </tbody>
        </table>

        <div class="author-note">
          <p><strong>💡 Pro Tip:</strong> Don't think "Grid OR Flexbox" - think "Grid AND Flexbox". The most powerful layouts combine both: Grid for the overall structure, Flexbox for component-level alignment and distribution.</p>
        </div>

        <h3>✅ Key Takeaways</h3>
        <ul>
          <li><strong>Performance:</strong> Grid excels with complex 2D layouts, Flexbox wins for simple 1D arrangements</li>
          <li><strong>Maintainability:</strong> Grid provides more predictable layouts, Flexbox offers more flexibility</li>
          <li><strong>Browser Support:</strong> Both have excellent support, but Grid subgrid is still limited</li>
          <li><strong>Learning Curve:</strong> Flexbox is more intuitive, Grid requires understanding of track-based layouts</li>
          <li><strong>Future-Proof:</strong> Container Queries work excellently with both approaches</li>
        </ul>
      `,
      category: "css",
      author: "CSS Architecture Specialist",
      date: "2024-01-10",
      readTime: 18,
      tags: ["CSS Grid", "Flexbox", "Responsive Design", "Performance"],
      difficulty: "Intermediate",
      views: 15200,
      likes: 1240,
      image: "https://images.unsplash.com/photo-1523437113738-bbd3cc89fb19?w=600&h=300&fit=crop&crop=center",
    },
    {
      id: 3,
      title: "Node.js Performance: Tối ưu hóa ứng dụng backend",
      excerpt:
        "Các kỹ thuật tối ưu hóa performance cho ứng dụng Node.js, từ caching đến database optimization.",
      content: `
        <h2>Tối ưu hóa Node.js Performance</h2>
        <p>Performance là yếu tố quan trọng trong phát triển backend...</p>
        <h3>Caching Strategies</h3>
        <p>Sử dụng Redis và Memory caching...</p>
        <h3>Database Optimization</h3>
        <p>Indexing và query optimization...</p>
      `,
      category: "nodejs",
      author: "Professional Developer",
      date: "2024-01-05",
      readTime: 12,
      image: "https://images.unsplash.com/photo-1627398242454-45a1465c2479?w=600&h=300&fit=crop&crop=center",
      tags: ["Node.js", "Performance", "Backend"],
    },
    {
      id: 4,
      title: "TypeScript: Từ JavaScript đến Type Safety",
      excerpt:
        "Hướng dẫn chuyển đổi từ JavaScript sang TypeScript và những lợi ích của type safety.",
      content: `
        <h2>TypeScript mang lại type safety cho JavaScript</h2>
        <p>TypeScript giúp developers viết code an toàn hơn...</p>
        <h3>Cài đặt và cấu hình</h3>
        <p>Bắt đầu với TypeScript trong dự án...</p>
        <h3>Advanced Types</h3>
        <p>Generics, Union types, và Intersection types...</p>
      `,
      category: "typescript",
      author: "Professional Developer",
      date: "2023-12-28",
      readTime: 10,
      image: "https://images.unsplash.com/photo-1516259762381-22954d7d3ad2?w=600&h=300&fit=crop&crop=center",
      tags: ["TypeScript", "JavaScript", "Type Safety"],
    },
    {
      id: 5,
      title: "Modern CSS: Variables, Nesting và Container Queries",
      excerpt:
        "Khám phá những tính năng CSS hiện đại giúp viết stylesheet hiệu quả và dễ maintain.",
      content: `
        <h2>CSS hiện đại với nhiều tính năng mới</h2>
        <p>CSS đã phát triển rất nhiều trong những năm gần đây...</p>
        <h3>CSS Custom Properties</h3>
        <p>Sử dụng CSS variables để tạo theme system...</p>
        <h3>Container Queries</h3>
        <p>Responsive design dựa trên container size...</p>
      `,
      category: "css",
      author: "Professional Developer",
      date: "2023-12-20",
      readTime: 7,
      image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=600&h=300&fit=crop&crop=center",
      tags: ["CSS", "Modern CSS", "Responsive"],
    },
    {
      id: 6,
      title: "Web Performance: Core Web Vitals và Optimization",
      excerpt:
        "Tối ưu hóa website performance với Core Web Vitals, lazy loading, và code splitting.",
      content: `
        <h2>Web Performance và User Experience</h2>
        <p>Performance ảnh hưởng trực tiếp đến user experience...</p>
        <h3>Core Web Vitals</h3>
        <p>LCP, FID, và CLS - những metrics quan trọng...</p>
        <h3>Optimization Techniques</h3>
        <p>Image optimization, code splitting, lazy loading...</p>
      `,
      category: "performance",
      author: "Professional Developer",
      date: "2023-12-15",
      readTime: 9,
      image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=600&h=300&fit=crop&crop=center",
      tags: ["Performance", "Web Vitals", "Optimization"],
    },
  ];

  const categories = [
    { id: "all", label: t('blog.filters.all'), count: blogPosts.length },
    {
      id: "react",
      label: t('blog.filters.react'),
      count: blogPosts.filter((p) => p.category === "react").length,
    },
    {
      id: "css",
      label: t('blog.filters.css'),
      count: blogPosts.filter((p) => p.category === "css").length,
    },
    {
      id: "nodejs",
      label: t('blog.filters.nodejs'),
      count: blogPosts.filter((p) => p.category === "nodejs").length,
    },
    {
      id: "typescript",
      label: t('blog.filters.typescript'),
      count: blogPosts.filter((p) => p.category === "typescript").length,
    },
    {
      id: "performance",
      label: t('blog.filters.performance'),
      count: blogPosts.filter((p) => p.category === "performance").length,
    },
  ];

  useEffect(() => {
    let filtered = blogPosts;

    if (selectedCategory !== "all") {
      filtered = filtered.filter((post) => post.category === selectedCategory);
    }

    if (searchTerm) {
      filtered = filtered.filter(
        (post) =>
          post.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
          post.excerpt.toLowerCase().includes(searchTerm.toLowerCase()) ||
          post.tags.some((tag) =>
            tag.toLowerCase().includes(searchTerm.toLowerCase())
          )
      );
    }

    setFilteredPosts(filtered);
  }, [selectedCategory, searchTerm]);

  const formatDate = (dateString) => {
    const options = { year: "numeric", month: "long", day: "numeric" };
    return new Date(dateString).toLocaleDateString("vi-VN", options);
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { y: 50, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        type: "spring",
        stiffness: 100,
        damping: 12,
      },
    },
  };

  const cardVariants = {
    hidden: { scale: 0.8, opacity: 0 },
    visible: {
      scale: 1,
      opacity: 1,
      transition: {
        type: "spring",
        stiffness: 100,
        damping: 15,
      },
    },
  };

  // Không cần handlePostClick nữa vì sẽ dùng Link component

  return (
    <section id="blog" className="blog">
      <div className="container">
        <motion.div
          className="blog__header"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
        >
          <motion.div className="blog__title-section" variants={itemVariants}>
            <h2 className="blog__title">
              <span className="blog__title-highlight">{t('blog.title')} </span>
              <span>&</span>
              <span className="blog__title-highlight"> {t('blog.subtitle')}</span>
            </h2>
            <p className="blog__description">
              {t('blog.description')}
            </p>
          </motion.div>

          <motion.div className="blog__controls" variants={itemVariants}>
            <div className="blog__search">
              <FiSearch className="blog__search-icon" />
              <input
                type="text"
                placeholder="Tìm kiếm bài viết..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="blog__search-input"
              />
            </div>

            <div className="blog__filter">
              <FiFilter className="blog__filter-icon" />
              <select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="blog__filter-select"
              >
                {categories.map((category) => (
                  <option key={category.id} value={category.id}>
                    {category.label} ({category.count})
                  </option>
                ))}
              </select>
            </div>
          </motion.div>
        </motion.div>

        <motion.div className="blog__categories" variants={itemVariants}>
          {categories.map((category) => (
            <motion.button
              key={category.id}
              className={`blog__category ${
                selectedCategory === category.id ? "blog__category--active" : ""
              }`}
              onClick={() => setSelectedCategory(category.id)}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              {category.label}
              <span className="blog__category-count">{category.count}</span>
            </motion.button>
          ))}
        </motion.div>

        <motion.div
          className="blog__grid"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.1 }}
        >
          <AnimatePresence mode="wait">
            {filteredPosts.map((post) => (
              <motion.article
                key={post.id}
                className="blog__card"
                variants={cardVariants}
                initial="hidden"
                animate="visible"
                exit="hidden"
                layout
                whileHover={{
                  y: -10,
                  transition: { type: "spring", stiffness: 300, damping: 20 },
                }}
                as={Link}
                to={`/v1/blog/${post.id}`}
              >
                <div className="blog__card-image">
                  <img src={post.image} alt={post.title} />
                  <div className="blog__card-overlay">
                    <FiArrowRight className="blog__card-icon" />
                  </div>
                </div>

                <div className="blog__card-content">
                  <div className="blog__card-meta">
                    <div className="blog__meta-item">
                      <FiCalendar />
                      <span>{formatDate(post.date)}</span>
                    </div>
                    <div className="blog__meta-item">
                      <FiClock />
                      <span>{post.readTime} phút</span>
                    </div>
                  </div>

                  <h3 className="blog__card-title">{post.title}</h3>
                  <p className="blog__card-excerpt">{post.excerpt}</p>

                  <div className="blog__card-tags">
                    {post.tags.slice(0, 3).map((tag, index) => (
                      <span key={index} className="blog__tag">
                        <FiTag />
                        {tag}
                      </span>
                    ))}
                  </div>

                  <div className="blog__card-footer">
                    <div className="blog__card-author">
                      <FiUser />
                      <span>{post.author}</span>
                    </div>
                    <motion.button
                      className="blog__card-read-more"
                      whileHover={{ x: 5 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      Đọc thêm <FiArrowRight />
                    </motion.button>
                  </div>
                </div>
              </motion.article>
            ))}
          </AnimatePresence>
        </motion.div>

        {filteredPosts.length === 0 && (
          <motion.div
            className="blog__no-results"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
          >
            <h3>Không tìm thấy bài viết nào</h3>
            <p>Hãy thử tìm kiếm với từ khóa khác hoặc chọn danh mục khác.</p>
          </motion.div>
        )}
      </div>
    </section>
  );
}

export default Blog;
