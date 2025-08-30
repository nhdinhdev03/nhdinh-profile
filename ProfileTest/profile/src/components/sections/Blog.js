import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCalendarAlt, faClock, faTag, faArrowRight, faSearch } from '@fortawesome/free-solid-svg-icons';
import { useInView } from 'react-intersection-observer';
import BlogPapersEffect from '../effects3D/BlogPapersEffect';

const Blog = () => {
  const [ref, inView] = useInView({
    threshold: 0.1,
    triggerOnce: true,
  });

  const [blogPosts, setBlogPosts] = useState([
    {
      id: 1,
      title: "Xây dựng API RESTful với Node.js và Express",
      slug: "xay-dung-api-restful-nodejs-express",
      description: "Hướng dẫn chi tiết cách xây dựng API RESTful hiệu quả với Node.js, Express và MongoDB. Bao gồm authentication, validation và best practices.",
      thumbnail: "/images/blog1.jpg",
      content: "Content here...",
      createdAt: "2024-01-15",
      readTime: "8 phút đọc",
      tags: ["Node.js", "Express", "MongoDB", "API", "Backend"]
    },
    {
      id: 2,
      title: "React Hooks: Từ cơ bản đến nâng cao",
      slug: "react-hooks-co-ban-den-nang-cao",
      description: "Khám phá sức mạnh của React Hooks từ useState, useEffect cho đến việc tạo custom hooks để tối ưu hóa code React của bạn.",
      thumbnail: "/images/blog2.jpg",
      content: "Content here...",
      createdAt: "2024-01-10",
      readTime: "12 phút đọc",
      tags: ["React", "Hooks", "Frontend", "JavaScript"]
    },
    {
      id: 3,
      title: "Tối ưu hóa hiệu suất ứng dụng React",
      slug: "toi-uu-hoa-hieu-suat-ung-dung-react",
      description: "Các kỹ thuật và best practices để cải thiện hiệu suất ứng dụng React: lazy loading, memoization, code splitting và nhiều hơn nữa.",
      thumbnail: "/images/blog3.jpg",
      content: "Content here...",
      createdAt: "2024-01-05",
      readTime: "15 phút đọc",
      tags: ["React", "Performance", "Optimization", "Frontend"]
    },
    {
      id: 4,
      title: "Microservices với Docker và Kubernetes",
      slug: "microservices-docker-kubernetes",
      description: "Hướng dẫn triển khai kiến trúc microservices sử dụng Docker containers và orchestration với Kubernetes trong môi trường production.",
      thumbnail: "/images/blog4.jpg",
      content: "Content here...",
      createdAt: "2023-12-28",
      readTime: "20 phút đọc",
      tags: ["Microservices", "Docker", "Kubernetes", "DevOps"]
    },
    {
      id: 5,
      title: "GraphQL vs REST API: So sánh chi tiết",
      slug: "graphql-vs-rest-api-so-sanh",
      description: "Phân tích ưu nhược điểm của GraphQL và REST API, khi nào nên sử dụng từng loại và cách implement hiệu quả.",
      thumbnail: "/images/blog5.jpg",
      content: "Content here...",
      createdAt: "2023-12-20",
      readTime: "10 phút đọc",
      tags: ["GraphQL", "REST", "API", "Backend"]
    },
    {
      id: 6,
      title: "TypeScript cho React Developers",
      slug: "typescript-cho-react-developers",
      description: "Làm chủ TypeScript trong React: types, interfaces, generics và cách tận dụng type safety để xây dựng ứng dụng robust.",
      thumbnail: "/images/blog6.jpg",
      content: "Content here...",
      createdAt: "2023-12-15",
      readTime: "14 phút đọc",
      tags: ["TypeScript", "React", "JavaScript", "Frontend"]
    }
  ]);

  const [searchTerm, setSearchTerm] = useState("");
  const [filteredPosts, setFilteredPosts] = useState(blogPosts);
  const [allTags, setAllTags] = useState([]);

  useEffect(() => {
    // Extract all unique tags
    const tags = [...new Set(blogPosts.flatMap(post => post.tags))];
    setAllTags(tags);
  }, [blogPosts]);

  useEffect(() => {
    // Filter posts based on search term
    const filtered = blogPosts.filter(post => 
      post.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      post.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
      post.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()))
    );
    setFilteredPosts(filtered);
  }, [searchTerm, blogPosts]);

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('vi-VN', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        delayChildren: 0.3,
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.5
      }
    }
  };

  const BlogCard = ({ post, index }) => {
    return (
      <motion.article
        className="group bg-white/5 backdrop-blur-lg border border-white/10 rounded-2xl overflow-hidden hover:bg-white/10 transition-all duration-300"
        variants={itemVariants}
        initial={{ opacity: 0, y: 50 }}
        animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
        transition={{ delay: index * 0.1 }}
        whileHover={{ y: -5, transition: { duration: 0.3 } }}
      >
        {/* Thumbnail */}
        <div className="relative h-48 bg-gradient-to-br from-blue-500/20 to-purple-600/20 overflow-hidden">
          {/* Placeholder for blog thumbnail */}
          <div className="absolute inset-0 flex items-center justify-center text-6xl font-bold text-white/20">
            {post.title.charAt(0)}
          </div>
          
          {/* Overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
          
          {/* Date Badge */}
          <div className="absolute top-4 left-4 bg-blue-500 text-white px-3 py-1 rounded-full text-sm font-medium">
            {formatDate(post.createdAt)}
          </div>
        </div>

        {/* Content */}
        <div className="p-6">
          {/* Tags */}
          <div className="flex flex-wrap gap-2 mb-3">
            {post.tags.slice(0, 3).map((tag, tagIndex) => (
              <span
                key={tagIndex}
                className="px-2 py-1 bg-blue-500/20 text-blue-400 rounded text-xs font-medium"
              >
                <FontAwesomeIcon icon={faTag} className="mr-1" />
                {tag}
              </span>
            ))}
            {post.tags.length > 3 && (
              <span className="px-2 py-1 bg-gray-500/20 text-gray-400 rounded text-xs">
                +{post.tags.length - 3}
              </span>
            )}
          </div>

          {/* Title */}
          <h3 className="text-xl font-bold text-white mb-3 group-hover:text-blue-400 transition-colors line-clamp-2">
            {post.title}
          </h3>

          {/* Description */}
          <p className="text-gray-400 text-sm leading-relaxed mb-4 line-clamp-3">
            {post.description}
          </p>

          {/* Meta Info */}
          <div className="flex items-center justify-between text-gray-500 text-sm mb-4">
            <div className="flex items-center">
              <FontAwesomeIcon icon={faClock} className="mr-1" />
              {post.readTime}
            </div>
            <div className="flex items-center">
              <FontAwesomeIcon icon={faCalendarAlt} className="mr-1" />
              {formatDate(post.createdAt)}
            </div>
          </div>

          {/* Read More Button */}
          <motion.button
            className="w-full bg-gradient-to-r from-blue-500 to-purple-600 text-white py-3 px-4 rounded-lg font-medium flex items-center justify-center hover:from-blue-600 hover:to-purple-700 transition-all duration-300"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            Đọc bài viết
            <FontAwesomeIcon icon={faArrowRight} className="ml-2" />
          </motion.button>
        </div>
      </motion.article>
    );
  };

  return (
    <section id="blog" className="relative py-20 lg:py-32 overflow-hidden">
      {/* 3D Flying Paper Cards Effect */}
      <BlogPapersEffect className="opacity-60" />
      
      {/* Background Elements */}
      <div className="absolute inset-0 bg-gradient-to-br from-gray-900 via-green-900/10 to-blue-900/10" />
      
      <div ref={ref} className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <motion.div
          className="text-center mb-16"
          variants={containerVariants}
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
        >
          <motion.h2
            className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6"
            variants={itemVariants}
          >
            Blog <span className="bg-gradient-to-r from-blue-400 to-purple-600 bg-clip-text text-transparent">Kỹ thuật</span>
          </motion.h2>
          <motion.p
            className="text-xl text-gray-400 max-w-3xl mx-auto"
            variants={itemVariants}
          >
            Chia sẻ kiến thức và kinh nghiệm trong lập trình và công nghệ
          </motion.p>
        </motion.div>

        {/* Search Bar */}
        <motion.div
          className="max-w-md mx-auto mb-12"
          variants={itemVariants}
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
        >
          <div className="relative">
            <FontAwesomeIcon 
              icon={faSearch} 
              className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" 
            />
            <input
              type="text"
              placeholder="Tìm kiếm bài viết..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-12 pr-4 py-3 bg-white/5 border border-white/10 rounded-full text-white placeholder-gray-400 focus:outline-none focus:border-blue-500 focus:bg-white/10 transition-all duration-300"
            />
          </div>
        </motion.div>

        {/* Popular Tags */}
        <motion.div
          className="flex flex-wrap justify-center gap-3 mb-12"
          variants={containerVariants}
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
        >
          {allTags.slice(0, 8).map((tag, index) => (
            <motion.button
              key={tag}
              onClick={() => setSearchTerm(tag)}
              className="px-4 py-2 bg-white/5 border border-white/10 text-gray-300 rounded-full text-sm hover:bg-blue-500/20 hover:text-blue-400 hover:border-blue-500/30 transition-all duration-300"
              variants={itemVariants}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <FontAwesomeIcon icon={faTag} className="mr-1" />
              {tag}
            </motion.button>
          ))}
        </motion.div>

        {/* Blog Posts Grid */}
        <motion.div
          className="grid md:grid-cols-2 lg:grid-cols-3 gap-8"
          variants={containerVariants}
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
        >
          {filteredPosts.map((post, index) => (
            <BlogCard key={post.id} post={post} index={index} />
          ))}
        </motion.div>

        {/* No Results */}
        {filteredPosts.length === 0 && searchTerm && (
          <motion.div
            className="text-center py-12"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
          >
            <p className="text-gray-400 text-xl mb-4">
              Không tìm thấy bài viết nào cho "{searchTerm}"
            </p>
            <button
              onClick={() => setSearchTerm("")}
              className="text-blue-400 hover:text-blue-300 transition-colors"
            >
              Xem tất cả bài viết
            </button>
          </motion.div>
        )}

        {/* Call to Action */}
        <motion.div
          className="text-center mt-16"
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ delay: 0.8 }}
        >
          <motion.button
            className="inline-flex items-center px-8 py-4 bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-full font-semibold shadow-lg hover:shadow-xl transition-all duration-300"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            Xem thêm bài viết
            <FontAwesomeIcon icon={faArrowRight} className="ml-2" />
          </motion.button>
        </motion.div>
      </div>
    </section>
  );
};

export default Blog;
