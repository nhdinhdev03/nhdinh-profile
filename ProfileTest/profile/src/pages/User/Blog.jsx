import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { 
  faCalendar, 
  faClock, 
  faUser,
  faSearch,
  faTag,
  faArrowRight
} from '@fortawesome/free-solid-svg-icons';

const Blog = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');

  const blogPosts = [
    {
      id: 1,
      title: 'Building Scalable React Applications',
      excerpt: 'Learn how to structure and build scalable React applications with modern best practices, state management, and performance optimization techniques.',
      content: 'Full content here...',
      author: 'NH Dinh',
      date: '2024-01-15',
      readTime: '8 min read',
      category: 'React',
      tags: ['React', 'JavaScript', 'Performance'],
      image: '/api/placeholder/400/250',
      featured: true
    },
    {
      id: 2,
      title: 'Node.js Performance Optimization',
      excerpt: 'Discover advanced techniques for optimizing Node.js applications, including memory management, async patterns, and monitoring strategies.',
      content: 'Full content here...',
      author: 'NH Dinh',
      date: '2024-01-10',
      readTime: '10 min read',
      category: 'Node.js',
      tags: ['Node.js', 'Performance', 'Backend'],
      image: '/api/placeholder/400/250',
      featured: false
    },
    {
      id: 3,
      title: 'Database Design Patterns',
      excerpt: 'Explore common database design patterns and when to use them in your applications for optimal performance and maintainability.',
      content: 'Full content here...',
      author: 'NH Dinh',
      date: '2024-01-05',
      readTime: '12 min read',
      category: 'Database',
      tags: ['Database', 'SQL', 'Design Patterns'],
      image: '/api/placeholder/400/250',
      featured: false
    },
    {
      id: 4,
      title: 'Modern CSS Techniques',
      excerpt: 'Master modern CSS features like Grid, Flexbox, custom properties, and animation techniques to create stunning user interfaces.',
      content: 'Full content here...',
      author: 'NH Dinh',
      date: '2023-12-28',
      readTime: '6 min read',
      category: 'CSS',
      tags: ['CSS', 'Frontend', 'Design'],
      image: '/api/placeholder/400/250',
      featured: true
    },
    {
      id: 5,
      title: 'API Security Best Practices',
      excerpt: 'Essential security practices for building secure APIs, including authentication, authorization, rate limiting, and data validation.',
      content: 'Full content here...',
      author: 'NH Dinh',
      date: '2023-12-20',
      readTime: '9 min read',
      category: 'Security',
      tags: ['Security', 'API', 'Backend'],
      image: '/api/placeholder/400/250',
      featured: false
    },
    {
      id: 6,
      title: 'Docker for Developers',
      excerpt: 'A comprehensive guide to using Docker in development workflows, from basic concepts to advanced deployment strategies.',
      content: 'Full content here...',
      author: 'NH Dinh',
      date: '2023-12-15',
      readTime: '15 min read',
      category: 'DevOps',
      tags: ['Docker', 'DevOps', 'Deployment'],
      image: '/api/placeholder/400/250',
      featured: false
    }
  ];

  const categories = [
    'all',
    'React',
    'Node.js',
    'Database',
    'CSS',
    'Security',
    'DevOps'
  ];

  const filteredPosts = blogPosts.filter(post => {
    const matchesSearch = post.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         post.excerpt.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         post.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()));
    
    const matchesCategory = selectedCategory === 'all' || post.category === selectedCategory;
    
    return matchesSearch && matchesCategory;
  });

  const featuredPosts = blogPosts.filter(post => post.featured);
  const recentPosts = blogPosts.slice(0, 3);

  const formatDate = (dateString) => {
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  const fadeInUp = {
    initial: { opacity: 0, y: 60 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.6 }
  };

  return (
    <div className="pt-20">
      {/* Hero Section */}
      <section className="py-20 bg-gradient-to-br from-blue-50 to-indigo-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h1 className="text-4xl sm:text-5xl font-bold text-gray-900 mb-6">
              My <span className="text-blue-600">Blog</span>
            </h1>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Thoughts, tutorials, and insights about web development, 
              programming, and technology trends.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Search and Filter */}
      <section className="py-8 bg-white border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
            {/* Search */}
            <div className="relative flex-1 max-w-md">
              <FontAwesomeIcon 
                icon={faSearch} 
                className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" 
              />
              <input
                type="text"
                placeholder="Search articles..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>

            {/* Category Filter */}
            <div className="flex flex-wrap gap-2">
              {categories.map((category) => (
                <button
                  key={category}
                  onClick={() => setSelectedCategory(category)}
                  className={`px-4 py-2 rounded-full text-sm font-medium transition-colors duration-200 ${
                    selectedCategory === category
                      ? 'bg-blue-600 text-white'
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                >
                  {category === 'all' ? 'All' : category}
                </button>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Featured Posts */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            {...fadeInUp}
            className="text-center mb-16"
          >
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
              Featured Articles
            </h2>
            <p className="text-lg text-gray-600">
              Hand-picked articles covering the latest in web development.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-20">
            {featuredPosts.map((post, index) => (
              <motion.article
                key={post.id}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-2xl transition-shadow duration-300"
              >
                <div className="relative">
                  <img
                    src={post.image}
                    alt={post.title}
                    className="w-full h-48 object-cover"
                  />
                  <div className="absolute top-4 left-4">
                    <span className="bg-blue-600 text-white text-xs font-semibold px-3 py-1 rounded-full">
                      Featured
                    </span>
                  </div>
                </div>
                <div className="p-6">
                  <div className="flex items-center text-sm text-gray-500 mb-3">
                    <FontAwesomeIcon icon={faCalendar} className="w-4 h-4 mr-2" />
                    <span>{formatDate(post.date)}</span>
                    <span className="mx-2">•</span>
                    <FontAwesomeIcon icon={faClock} className="w-4 h-4 mr-2" />
                    <span>{post.readTime}</span>
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 mb-3">
                    {post.title}
                  </h3>
                  <p className="text-gray-600 mb-4 leading-relaxed">
                    {post.excerpt}
                  </p>
                  <div className="flex flex-wrap gap-2 mb-4">
                    {post.tags.map((tag, tagIndex) => (
                      <span
                        key={tagIndex}
                        className="bg-gray-100 text-gray-700 text-xs px-2 py-1 rounded"
                      >
                        #{tag}
                      </span>
                    ))}
                  </div>
                  <button className="text-blue-600 font-medium hover:text-blue-700 transition-colors duration-200 flex items-center">
                    Read More
                    <FontAwesomeIcon icon={faArrowRight} className="ml-2 w-4 h-4" />
                  </button>
                </div>
              </motion.article>
            ))}
          </div>
        </div>
      </section>

      {/* All Posts */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            {...fadeInUp}
            className="text-center mb-16"
          >
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
              All Articles
            </h2>
            <p className="text-lg text-gray-600">
              {filteredPosts.length} {filteredPosts.length === 1 ? 'article' : 'articles'} found
            </p>
          </motion.div>

          {filteredPosts.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredPosts.map((post, index) => (
                <motion.article
                  key={post.id}
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  className="bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300 overflow-hidden"
                >
                  <img
                    src={post.image}
                    alt={post.title}
                    className="w-full h-40 object-cover"
                  />
                  <div className="p-6">
                    <div className="flex items-center text-sm text-gray-500 mb-3">
                      <FontAwesomeIcon icon={faCalendar} className="w-4 h-4 mr-2" />
                      <span>{formatDate(post.date)}</span>
                      <span className="mx-2">•</span>
                      <FontAwesomeIcon icon={faClock} className="w-4 h-4 mr-2" />
                      <span>{post.readTime}</span>
                    </div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-2 line-clamp-2">
                      {post.title}
                    </h3>
                    <p className="text-gray-600 text-sm mb-4 line-clamp-3">
                      {post.excerpt}
                    </p>
                    <div className="flex items-center justify-between">
                      <span className="bg-blue-100 text-blue-700 text-xs px-2 py-1 rounded">
                        {post.category}
                      </span>
                      <button className="text-blue-600 hover:text-blue-700 transition-colors duration-200 text-sm font-medium">
                        Read More →
                      </button>
                    </div>
                  </div>
                </motion.article>
              ))}
            </div>
          ) : (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-center py-20"
            >
              <FontAwesomeIcon icon={faSearch} className="w-16 h-16 text-gray-300 mb-4" />
              <h3 className="text-xl font-semibold text-gray-600 mb-2">
                No articles found
              </h3>
              <p className="text-gray-500 mb-4">
                Try adjusting your search terms or filter criteria.
              </p>
              <button
                onClick={() => {
                  setSearchTerm('');
                  setSelectedCategory('all');
                }}
                className="btn-primary"
              >
                Clear Filters
              </button>
            </motion.div>
          )}
        </div>
      </section>

      {/* Newsletter Signup */}
      <section className="py-20 bg-gradient-to-r from-blue-600 to-purple-600">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            {...fadeInUp}
            className="space-y-6"
          >
            <h2 className="text-3xl sm:text-4xl font-bold text-white">
              Stay Updated
            </h2>
            <p className="text-xl text-blue-100">
              Subscribe to get notified about new articles and tutorials.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
              <input
                type="email"
                placeholder="Enter your email"
                className="flex-1 px-4 py-3 rounded-lg border border-transparent focus:ring-2 focus:ring-white focus:border-transparent"
              />
              <button className="px-6 py-3 bg-white text-blue-600 font-semibold rounded-lg hover:bg-gray-100 transition-colors duration-200">
                Subscribe
              </button>
            </div>
            <p className="text-blue-200 text-sm">
              No spam, unsubscribe at any time.
            </p>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default Blog;