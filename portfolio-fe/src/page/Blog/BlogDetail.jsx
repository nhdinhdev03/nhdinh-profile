import React, { useState, useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { useParams, useNavigate } from "react-router-dom";
import {
  FiCalendar,
  FiClock,
  FiUser,
  FiArrowLeft,
  FiShare2,
  FiBookmark,
  FiThumbsUp,
  FiEye,
  FiHeart,
  FiList,
} from "react-icons/fi";
import ScrollToTop from "../../components/Scroll/ScrollToTop/ScrollToTop";
import { ROUTES } from "../../router/routeConstants";
import "./BlogDetail.scss";

function BlogDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [post, setPost] = useState(null);
  const [readingProgress, setReadingProgress] = useState(0);
  const [showTableOfContents, setShowTableOfContents] = useState(false);
  const [activeSection, setActiveSection] = useState("");
  const contentRef = useRef(null);
  
  // Demo data - trong ứng dụng thực tế sẽ được lấy từ API
  const blogPosts = [
    {
      id: "1",
      title: "React 18 Concurrent Features: Deep Dive vào Render Behavior",
      excerpt: "Phân tích sâu về Concurrent Rendering trong React 18",
      content: `<div>
        <p>React 18 đánh dấu bước ngoặt lớn với Concurrent Rendering - khả năng React có thể tạm dừng, tiếp tục, hoặc hủy bỏ render work để duy trì responsiveness.</p>
        <h2>Concurrent Rendering Overview</h2>
        <p>Đây là một thay đổi cách React xử lý updates.</p>
      </div>`,
      author: "Nhật Đình",
      date: "2023-11-20",
      readTime: 8,
      category: "react"
    },
    {
      id: "2",
      title: "Next.js 13 App Router: Chuyển đổi từ Pages Router",
      excerpt: "App Router là một thay đổi lớn trong Next.js 13",
      content: `<div>
        <p>App Router là một thay đổi lớn trong Next.js 13</p>
        <h2>Server Components</h2>
        <p>Một trong những tính năng chính của App Router</p>
      </div>`,
      author: "Nhật Đình",
      date: "2023-11-15",
      readTime: 6,
      category: "nextjs"
    }
  ];

  // Lấy bài viết dựa trên ID
  useEffect(() => {
    const foundPost = blogPosts.find(p => p.id === id);
    if (foundPost) {
      setPost(foundPost);
    }
    
    // Scroll to top khi blog detail được mở với hiệu ứng mượt hơn
    // Sử dụng kết hợp requestAnimationFrame để đảm bảo scroll hoạt động sau khi DOM đã render
    requestAnimationFrame(() => {
      setTimeout(() => {
        window.scrollTo({
          top: 0,
          behavior: "smooth"
        });
      }, 100); // Thêm một độ trễ nhỏ để đảm bảo DOM đã render xong
    });
  }, [id]);

  // Reading progress tracking
  useEffect(() => {
    if (!post) return;
    
    const handleScroll = () => {
      if (!contentRef.current) return;
      
      const element = contentRef.current;
      const windowHeight = window.innerHeight;
      const documentHeight = element.scrollHeight;
      const scrollTop = window.scrollY;
      
      const progress = Math.min((scrollTop / (documentHeight - windowHeight)) * 100, 100);
      setReadingProgress(progress);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [post]);

  // Active section tracking for table of contents
  useEffect(() => {
    if (!post) return;
    
    const sections = document.querySelectorAll("h2[id], h3[id]");
    
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveSection(entry.target.id);
          }
        });
      },
      { 
        rootMargin: "-20% 0% -35% 0%",
        threshold: 0.5
      }
    );

    sections.forEach((section) => observer.observe(section));
    return () => observer.disconnect();
  }, [post?.content]);
  
  if (!post) return null;

  const formatDate = (dateString) => {
    const options = { year: "numeric", month: "long", day: "numeric" };
    return new Date(dateString).toLocaleDateString("vi-VN", options);
  };

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: post.title,
        text: post.excerpt,
        url: window.location.href,
      });
    } else {
      // Fallback: copy to clipboard
      navigator.clipboard.writeText(window.location.href);
      alert("Link đã được sao chép vào clipboard!");
    }
  };

  const handleBookmark = () => {
    // Simulate bookmark functionality
    alert("Đã lưu bài viết vào bookmark!");
  };

  const handleLike = () => {
    // Simulate like functionality
    alert("Đã thích bài viết!");
  };

  return (
    <section className="blog-detail" ref={contentRef}>
      {/* Reading Progress Bar */}
      <motion.div
        className="blog-detail__progress-bar"
        style={{ scaleX: readingProgress / 100 }}
        initial={{ scaleX: 0 }}
        animate={{ scaleX: readingProgress / 100 }}
        transition={{ duration: 0.1 }}
      />

      {/* Table of Contents Toggle */}
      <motion.button
        className="blog-detail__toc-toggle"
        onClick={() => setShowTableOfContents(!showTableOfContents)}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        initial={{ opacity: 0, x: 20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 1 }}
      >
        <FiList />
      </motion.button>

      {/* Table of Contents Sidebar */}
      <motion.div
        className={`blog-detail__toc ${showTableOfContents ? 'blog-detail__toc--visible' : ''}`}
        initial={{ opacity: 0, x: 300 }}
        animate={{ 
          opacity: showTableOfContents ? 1 : 0,
          x: showTableOfContents ? 0 : 300
        }}
        transition={{ type: "spring", stiffness: 300, damping: 30 }}
      >
        <h4>Mục lục</h4>
        <div className="blog-detail__toc-content">
          {/* TOC will be populated by parsing content */}
        </div>
      </motion.div>

      <div className="container">
        {/* Navigation */}
        <motion.div
          className="blog-detail__nav"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <motion.button
            className="blog-detail__back-btn"
            onClick={() => navigate(ROUTES.BLOG)}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <FiArrowLeft />
            Quay lại Blog
          </motion.button>

          <div className="blog-detail__actions">
            <motion.button
              className="blog-detail__action-btn"
              onClick={handleShare}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              title="Chia sẻ"
            >
              <FiShare2 />
            </motion.button>
            <motion.button
              className="blog-detail__action-btn"
              onClick={handleBookmark}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              title="Lưu bài viết"
            >
              <FiBookmark />
            </motion.button>
            <motion.button
              className="blog-detail__action-btn"
              onClick={handleLike}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              title="Thích"
            >
              <FiThumbsUp />
            </motion.button>
          </div>
        </motion.div>

        {/* Article */}
        <motion.article
          className="blog-detail__article"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          {/* Hero Section */}
          <div className="blog-detail__hero">
            <motion.img
              src={post.image}
              alt={post.title}
              className="blog-detail__hero-image"
              initial={{ scale: 1.1, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.8 }}
            />
            <div className="blog-detail__hero-overlay">
              <div className="blog-detail__hero-content">
                <div className="blog-detail__tags">
                  {post.tags.map((tag, index) => (
                    <motion.span
                      key={index}
                      className="blog-detail__tag"
                      initial={{ opacity: 0, scale: 0.8 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ delay: 0.4 + index * 0.1 }}
                    >
                      {tag}
                    </motion.span>
                  ))}
                </div>
                <motion.h1
                  className="blog-detail__title"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.6 }}
                >
                  {post.title}
                </motion.h1>
                <motion.div
                  className="blog-detail__meta"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.8 }}
                >
                  <div className="blog-detail__meta-row">
                    <div className="blog-detail__meta-item">
                      <FiUser />
                      <span>{post.author}</span>
                    </div>
                    <div className="blog-detail__meta-item">
                      <FiCalendar />
                      <span>{formatDate(post.date)}</span>
                    </div>
                    <div className="blog-detail__meta-item">
                      <FiClock />
                      <span>{post.readTime} phút đọc</span>
                    </div>
                  </div>
                  {post.difficulty && (
                    <div className="blog-detail__meta-row">
                      <div className="blog-detail__meta-item">
                        <span className={`blog-detail__difficulty blog-detail__difficulty--${post.difficulty.toLowerCase()}`}>
                          {post.difficulty}
                        </span>
                      </div>
                      {post.views && (
                        <div className="blog-detail__meta-item">
                          <FiEye />
                          <span>{post.views.toLocaleString()} lượt xem</span>
                        </div>
                      )}
                      {post.likes && (
                        <div className="blog-detail__meta-item">
                          <FiHeart />
                          <span>{post.likes.toLocaleString()} lượt thích</span>
                        </div>
                      )}
                    </div>
                  )}
                </motion.div>
              </div>
            </div>
          </div>

          {/* Content */}
          <motion.div
            className="blog-detail__content"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1 }}
          >
            <div className="blog-detail__excerpt">
              {post.excerpt}
            </div>
            <div
              className="blog-detail__body"
              dangerouslySetInnerHTML={{ __html: post.content }}
            />
          </motion.div>

          {/* Footer Actions */}
          <motion.div
            className="blog-detail__footer"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.2 }}
          >
            <div className="blog-detail__footer-actions">
              <motion.button
                className="blog-detail__footer-btn blog-detail__footer-btn--like"
                onClick={handleLike}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <FiThumbsUp />
                Thích bài viết
              </motion.button>
              <motion.button
                className="blog-detail__footer-btn blog-detail__footer-btn--bookmark"
                onClick={handleBookmark}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <FiBookmark />
                Lưu bài viết
              </motion.button>
              <motion.button
                className="blog-detail__footer-btn blog-detail__footer-btn--share"
                onClick={handleShare}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <FiShare2 />
                Chia sẻ
              </motion.button>
            </div>
          </motion.div>
        </motion.article>

        {/* Related Articles Placeholder */}
        <motion.div
          className="blog-detail__related"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.4 }}
        >
          <h3>Bài viết liên quan</h3>
          <p>Các bài viết liên quan sẽ được hiển thị ở đây...</p>
        </motion.div>
      </div>
      
      {/* Scroll to Top Button */}
      <ScrollToTop />
    </section>
  );
}

export default BlogDetail;
