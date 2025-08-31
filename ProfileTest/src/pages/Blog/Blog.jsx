import React from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { FiCalendar, FiClock, FiArrowRight } from 'react-icons/fi';
import './Blog.scss';

const Blog = () => {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  const blogPosts = [
    {
      id: 1,
      title: 'Building Modern React Applications',
      excerpt: 'Learn how to build scalable and maintainable React applications using modern development practices and tools.',
      date: '2024-01-15',
      readTime: '5 min read',
      category: 'React',
      image: '/api/placeholder/400/250',
    },
    {
      id: 2,
      title: 'The Future of Web Development',
      excerpt: 'Exploring emerging trends and technologies that will shape the future of web development in the coming years.',
      date: '2024-01-10',
      readTime: '8 min read',
      category: 'Technology',
      image: '/api/placeholder/400/250',
    },
    {
      id: 3,
      title: 'CSS Grid vs Flexbox: When to Use What',
      excerpt: 'A comprehensive guide to understanding the differences between CSS Grid and Flexbox and when to use each.',
      date: '2024-01-05',
      readTime: '6 min read',
      category: 'CSS',
      image: '/api/placeholder/400/250',
    },
    {
      id: 4,
      title: 'JavaScript Performance Optimization',
      excerpt: 'Tips and techniques for optimizing JavaScript performance and creating faster web applications.',
      date: '2023-12-28',
      readTime: '7 min read',
      category: 'JavaScript',
      image: '/api/placeholder/400/250',
    },
    {
      id: 5,
      title: 'Getting Started with TypeScript',
      excerpt: 'A beginner-friendly introduction to TypeScript and how it can improve your JavaScript development workflow.',
      date: '2023-12-20',
      readTime: '4 min read',
      category: 'TypeScript',
      image: '/api/placeholder/400/250',
    },
    {
      id: 6,
      title: 'Node.js Best Practices',
      excerpt: 'Essential best practices for building robust and secure Node.js applications that scale effectively.',
      date: '2023-12-15',
      readTime: '9 min read',
      category: 'Node.js',
      image: '/api/placeholder/400/250',
    },
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        delayChildren: 0.3,
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.5,
      },
    },
  };

  const formatDate = (dateString) => {
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  return (
    <div className="blog-page" ref={ref}>
      {/* Hero Section */}
      <section className="blog-hero">
        <div className="container mx-auto px-4">
          <motion.div
            className="hero-content"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <h1 className="hero-title">Blog</h1>
            <p className="hero-subtitle">
              Thoughts, tutorials, and insights about web development and technology
            </p>
          </motion.div>
        </div>
      </section>

      {/* Blog Posts */}
      <section className="blog-content section">
        <div className="container mx-auto px-4">
          <motion.div
            className="blog-grid"
            variants={containerVariants}
            initial="hidden"
            animate={inView ? "visible" : "hidden"}
          >
            {blogPosts.map((post) => (
              <motion.article
                key={post.id}
                className="blog-card"
                variants={itemVariants}
                whileHover={{ y: -10 }}
              >
                <div className="blog-image">
                  <div className="image-placeholder">
                    <span>Blog Image</span>
                  </div>
                  <div className="blog-category">{post.category}</div>
                </div>

                <div className="blog-content">
                  <div className="blog-meta">
                    <div className="meta-item">
                      <FiCalendar size={16} />
                      <span>{formatDate(post.date)}</span>
                    </div>
                    <div className="meta-item">
                      <FiClock size={16} />
                      <span>{post.readTime}</span>
                    </div>
                  </div>

                  <h3 className="blog-title">{post.title}</h3>
                  <p className="blog-excerpt">{post.excerpt}</p>

                  <button className="read-more-btn">
                    <span>Read More</span>
                    <FiArrowRight className="arrow-icon" />
                  </button>
                </div>
              </motion.article>
            ))}
          </motion.div>

          {/* Load More Button */}
          <motion.div
            className="load-more-section"
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.8 }}
          >
            <button className="load-more-btn">
              Load More Posts
            </button>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default Blog;
