import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  FiCalendar, 
  FiClock, 
  FiUser, 
  FiTag,
  FiSearch,
  FiArrowRight,
  FiTrendingUp,
  FiBookOpen,
  FiHeart,
  FiMessageCircle
} from 'react-icons/fi';

function Blog() {
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [searchTerm, setSearchTerm] = useState('');

  const categories = ['All', 'Web Development', 'React', 'Node.js', 'Tutorial', 'Career'];

  const blogPosts = [
    {
      id: 1,
      title: 'Building Modern React Applications with TypeScript',
      excerpt: 'Learn how to set up and build scalable React applications using TypeScript. This comprehensive guide covers best practices, common patterns, and advanced techniques.',
      content: 'In this comprehensive guide, we\'ll explore how to build modern React applications using TypeScript...',
      image: '/api/placeholder/600/300',
      category: 'React',
      author: 'NH Dinh',
      publishDate: '2024-01-15',
      readTime: 8,
      tags: ['React', 'TypeScript', 'Frontend'],
      featured: true,
      likes: 42,
      comments: 12,
      views: 1250
    },
    {
      id: 2,
      title: 'REST API Design Best Practices',
      excerpt: 'Discover the essential principles and patterns for designing robust, scalable REST APIs that developers love to use.',
      content: 'When designing REST APIs, there are several key principles that can make the difference between a good API and a great one...',
      image: '/api/placeholder/600/300',
      category: 'Node.js',
      author: 'NH Dinh',
      publishDate: '2024-01-10',
      readTime: 12,
      tags: ['API', 'Backend', 'Node.js', 'Best Practices'],
      featured: true,
      likes: 38,
      comments: 8,
      views: 980
    },
    {
      id: 3,
      title: 'From Junior to Senior: My Journey in Tech',
      excerpt: 'A personal reflection on the lessons learned, challenges faced, and growth achieved during my transition from junior to senior developer.',
      content: 'Looking back at my journey from a junior developer to where I am today, there are several key insights I wish I had known earlier...',
      image: '/api/placeholder/600/300',
      category: 'Career',
      author: 'NH Dinh',
      publishDate: '2024-01-05',
      readTime: 6,
      tags: ['Career', 'Personal', 'Growth'],
      featured: false,
      likes: 89,
      comments: 24,
      views: 2100
    },
    {
      id: 4,
      title: 'CSS Grid vs Flexbox: When to Use Which',
      excerpt: 'Understanding the differences between CSS Grid and Flexbox, and knowing when to use each layout method for optimal results.',
      content: 'CSS Grid and Flexbox are both powerful layout systems, but they serve different purposes and excel in different scenarios...',
      image: '/api/placeholder/600/300',
      category: 'Web Development',
      author: 'NH Dinh',
      publishDate: '2023-12-28',
      readTime: 10,
      tags: ['CSS', 'Layout', 'Frontend'],
      featured: false,
      likes: 56,
      comments: 15,
      views: 1580
    },
    {
      id: 5,
      title: 'Introduction to Docker for Developers',
      excerpt: 'Get started with Docker and learn how containerization can improve your development workflow and deployment process.',
      content: 'Docker has revolutionized the way we develop, test, and deploy applications. In this tutorial, we\'ll explore the fundamentals...',
      image: '/api/placeholder/600/300',
      category: 'Tutorial',
      author: 'NH Dinh',
      publishDate: '2023-12-20',
      readTime: 15,
      tags: ['Docker', 'DevOps', 'Containerization'],
      featured: false,
      likes: 73,
      comments: 19,
      views: 1890
    },
    {
      id: 6,
      title: 'State Management in React: Redux vs Context',
      excerpt: 'A detailed comparison of Redux and React Context for state management, including when to use each approach.',
      content: 'State management is a crucial aspect of React applications. Two popular approaches are Redux and React Context...',
      image: '/api/placeholder/600/300',
      category: 'React',
      author: 'NH Dinh',
      publishDate: '2023-12-15',
      readTime: 11,
      tags: ['React', 'State Management', 'Redux'],
      featured: false,
      likes: 67,
      comments: 21,
      views: 1745
    }
  ];

  const filteredPosts = blogPosts.filter(post => {
    const matchesCategory = selectedCategory === 'All' || post.category === selectedCategory;
    const matchesSearch = post.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         post.excerpt.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         post.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()));
    return matchesCategory && matchesSearch;
  });

  const featuredPosts = blogPosts.filter(post => post.featured);
  const popularPosts = [...blogPosts].sort((a, b) => b.views - a.views).slice(0, 3);

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  return (
    <div className="min-h-screen pt-20">
      {/* Hero Section */}
      <section className="py-20 bg-gradient-to-br from-primary-50 via-white to-secondary-50 dark:from-neutral-950 dark:via-neutral-900 dark:to-neutral-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6">
              <span className="bg-gradient-to-r from-primary-600 to-secondary-600 bg-clip-text text-transparent">
                My Blog
              </span>
            </h1>
            <p className="text-xl md:text-2xl text-neutral-600 dark:text-neutral-400 max-w-3xl mx-auto leading-relaxed">
              Sharing insights, tutorials, and thoughts on web development, technology, and career growth
            </p>
          </motion.div>

          {/* Search and Filter */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="max-w-4xl mx-auto"
          >
            <div className="flex flex-col md:flex-row gap-4 mb-8">
              {/* Search */}
              <div className="relative flex-1">
                <FiSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-neutral-400 w-5 h-5" />
                <input
                  type="text"
                  placeholder="Search articles..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-10 pr-4 py-3 bg-white dark:bg-neutral-800 border border-neutral-200 dark:border-neutral-700 rounded-2xl focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all duration-200"
                />
              </div>

              {/* Categories */}
              <div className="flex flex-wrap gap-2">
                {categories.map((category) => (
                  <button
                    key={category}
                    onClick={() => setSelectedCategory(category)}
                    className={`px-4 py-2 rounded-xl font-medium transition-all duration-200 ${
                      selectedCategory === category
                        ? 'bg-primary-500 text-white shadow-lg'
                        : 'bg-white dark:bg-neutral-800 text-neutral-700 dark:text-neutral-300 border border-neutral-200 dark:border-neutral-700 hover:border-primary-300 dark:hover:border-primary-600'
                    }`}
                  >
                    {category}
                  </button>
                ))}
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Featured Posts */}
      <section className="py-20 bg-white dark:bg-neutral-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-neutral-900 dark:text-white mb-4">
              Featured Articles
            </h2>
            <p className="text-lg text-neutral-600 dark:text-neutral-400">
              Hand-picked articles that dive deep into important topics
            </p>
          </motion.div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {featuredPosts.map((post, index) => (
              <motion.article
                key={post.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.2 }}
                className="group cursor-pointer"
              >
                <div className="bg-gradient-to-br from-neutral-50 to-neutral-100 dark:from-neutral-800 dark:to-neutral-900 rounded-3xl overflow-hidden border border-neutral-200 dark:border-neutral-700 hover:shadow-2xl transition-all duration-300">
                  {/* Post Image */}
                  <div className="relative h-64 overflow-hidden">
                    <img
                      src={post.image}
                      alt={post.title}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
                    <div className="absolute top-4 left-4">
                      <span className="bg-primary-500 text-white px-3 py-1 rounded-full text-sm font-medium">
                        Featured
                      </span>
                    </div>
                    <div className="absolute top-4 right-4">
                      <span className="bg-white/90 text-neutral-800 px-3 py-1 rounded-full text-sm font-medium">
                        {post.category}
                      </span>
                    </div>
                  </div>

                  {/* Post Content */}
                  <div className="p-6">
                    <h3 className="text-xl font-bold text-neutral-900 dark:text-white mb-3 group-hover:text-primary-600 dark:group-hover:text-primary-400 transition-colors">
                      {post.title}
                    </h3>

                    <p className="text-neutral-600 dark:text-neutral-400 mb-4 line-clamp-2">
                      {post.excerpt}
                    </p>

                    {/* Post Meta */}
                    <div className="flex items-center justify-between text-sm text-neutral-500 dark:text-neutral-400 mb-4">
                      <div className="flex items-center space-x-4">
                        <div className="flex items-center space-x-1">
                          <FiCalendar className="w-4 h-4" />
                          <span>{formatDate(post.publishDate)}</span>
                        </div>
                        <div className="flex items-center space-x-1">
                          <FiClock className="w-4 h-4" />
                          <span>{post.readTime} min read</span>
                        </div>
                      </div>
                    </div>

                    {/* Tags */}
                    <div className="flex flex-wrap gap-2 mb-4">
                      {post.tags.slice(0, 3).map((tag) => (
                        <span
                          key={tag}
                          className="bg-white dark:bg-neutral-800 text-neutral-600 dark:text-neutral-400 px-2 py-1 rounded-lg text-xs font-medium border border-neutral-200 dark:border-neutral-700"
                        >
                          #{tag}
                        </span>
                      ))}
                    </div>

                    {/* Post Stats */}
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-4 text-sm text-neutral-500 dark:text-neutral-400">
                        <div className="flex items-center space-x-1">
                          <FiHeart className="w-4 h-4" />
                          <span>{post.likes}</span>
                        </div>
                        <div className="flex items-center space-x-1">
                          <FiMessageCircle className="w-4 h-4" />
                          <span>{post.comments}</span>
                        </div>
                        <div className="flex items-center space-x-1">
                          <FiBookOpen className="w-4 h-4" />
                          <span>{post.views}</span>
                        </div>
                      </div>
                      <motion.div
                        whileHover={{ x: 5 }}
                        className="flex items-center space-x-1 text-primary-600 dark:text-primary-400 font-medium"
                      >
                        <span>Read More</span>
                        <FiArrowRight className="w-4 h-4" />
                      </motion.div>
                    </div>
                  </div>
                </div>
              </motion.article>
            ))}
          </div>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-20 bg-gradient-to-br from-neutral-50 to-neutral-100 dark:from-neutral-950 dark:to-neutral-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
            {/* Blog Posts */}
            <div className="lg:col-span-2">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                className="mb-8"
              >
                <h2 className="text-2xl md:text-3xl font-bold text-neutral-900 dark:text-white mb-4">
                  All Articles
                </h2>
                <p className="text-neutral-600 dark:text-neutral-400">
                  {filteredPosts.length} article{filteredPosts.length !== 1 ? 's' : ''} found
                </p>
              </motion.div>

              <AnimatePresence mode="wait">
                <motion.div
                  key={selectedCategory + searchTerm}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.4 }}
                  className="space-y-8"
                >
                  {filteredPosts.map((post, index) => (
                    <motion.article
                      key={post.id}
                      initial={{ opacity: 0, scale: 0.95 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ duration: 0.4, delay: index * 0.1 }}
                      className="bg-white dark:bg-neutral-800 rounded-2xl overflow-hidden border border-neutral-200 dark:border-neutral-700 hover:shadow-xl transition-all duration-300 group cursor-pointer"
                    >
                      <div className="md:flex">
                        {/* Post Image */}
                        <div className="md:w-1/3 h-48 md:h-auto overflow-hidden">
                          <img
                            src={post.image}
                            alt={post.title}
                            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                          />
                        </div>

                        {/* Post Content */}
                        <div className="md:w-2/3 p-6">
                          <div className="flex items-center justify-between mb-3">
                            <span className="bg-primary-100 dark:bg-primary-900/30 text-primary-700 dark:text-primary-300 px-3 py-1 rounded-full text-sm font-medium">
                              {post.category}
                            </span>
                            {post.featured && (
                              <span className="bg-yellow-100 dark:bg-yellow-900/30 text-yellow-700 dark:text-yellow-300 px-2 py-1 rounded-full text-xs font-medium">
                                Featured
                              </span>
                            )}
                          </div>

                          <h3 className="text-lg md:text-xl font-bold text-neutral-900 dark:text-white mb-2 group-hover:text-primary-600 dark:group-hover:text-primary-400 transition-colors">
                            {post.title}
                          </h3>

                          <p className="text-neutral-600 dark:text-neutral-400 mb-4 line-clamp-2">
                            {post.excerpt}
                          </p>

                          {/* Post Meta */}
                          <div className="flex items-center justify-between text-sm text-neutral-500 dark:text-neutral-400 mb-3">
                            <div className="flex items-center space-x-4">
                              <div className="flex items-center space-x-1">
                                <FiUser className="w-3 h-3" />
                                <span>{post.author}</span>
                              </div>
                              <div className="flex items-center space-x-1">
                                <FiCalendar className="w-3 h-3" />
                                <span>{formatDate(post.publishDate)}</span>
                              </div>
                              <div className="flex items-center space-x-1">
                                <FiClock className="w-3 h-3" />
                                <span>{post.readTime} min</span>
                              </div>
                            </div>
                          </div>

                          {/* Tags and Stats */}
                          <div className="flex items-center justify-between">
                            <div className="flex flex-wrap gap-1">
                              {post.tags.slice(0, 2).map((tag) => (
                                <span
                                  key={tag}
                                  className="bg-neutral-100 dark:bg-neutral-700 text-neutral-600 dark:text-neutral-400 px-2 py-1 rounded text-xs"
                                >
                                  #{tag}
                                </span>
                              ))}
                            </div>

                            <div className="flex items-center space-x-3 text-xs text-neutral-500 dark:text-neutral-400">
                              <div className="flex items-center space-x-1">
                                <FiHeart className="w-3 h-3" />
                                <span>{post.likes}</span>
                              </div>
                              <div className="flex items-center space-x-1">
                                <FiMessageCircle className="w-3 h-3" />
                                <span>{post.comments}</span>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </motion.article>
                  ))}
                </motion.div>
              </AnimatePresence>

              {/* No Results */}
              {filteredPosts.length === 0 && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="text-center py-20"
                >
                  <div className="w-24 h-24 bg-neutral-200 dark:bg-neutral-700 rounded-full flex items-center justify-center mx-auto mb-6">
                    <FiSearch className="w-12 h-12 text-neutral-400" />
                  </div>
                  <h3 className="text-xl font-semibold text-neutral-900 dark:text-white mb-2">
                    No articles found
                  </h3>
                  <p className="text-neutral-600 dark:text-neutral-400 mb-6">
                    Try adjusting your search or filter criteria
                  </p>
                  <button
                    onClick={() => {
                      setSelectedCategory('All');
                      setSearchTerm('');
                    }}
                    className="bg-primary-500 hover:bg-primary-600 text-white px-6 py-3 rounded-xl font-medium transition-colors"
                  >
                    Clear Filters
                  </button>
                </motion.div>
              )}
            </div>

            {/* Sidebar */}
            <div className="space-y-8">
              {/* Popular Posts */}
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6 }}
                className="bg-white dark:bg-neutral-800 p-6 rounded-2xl border border-neutral-200 dark:border-neutral-700"
              >
                <div className="flex items-center space-x-2 mb-6">
                  <FiTrendingUp className="w-5 h-5 text-primary-500" />
                  <h3 className="text-lg font-bold text-neutral-900 dark:text-white">
                    Popular Posts
                  </h3>
                </div>

                <div className="space-y-4">
                  {popularPosts.map((post, index) => (
                    <div key={post.id} className="flex space-x-3 group cursor-pointer">
                      <div className="flex-shrink-0 w-16 h-16 rounded-lg overflow-hidden">
                        <img
                          src={post.image}
                          alt={post.title}
                          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                        />
                      </div>
                      <div className="flex-1 min-w-0">
                        <h4 className="text-sm font-medium text-neutral-900 dark:text-white group-hover:text-primary-600 dark:group-hover:text-primary-400 transition-colors line-clamp-2">
                          {post.title}
                        </h4>
                        <div className="flex items-center space-x-2 mt-1 text-xs text-neutral-500 dark:text-neutral-400">
                          <span>{formatDate(post.publishDate)}</span>
                          <span>•</span>
                          <span>{post.views} views</span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </motion.div>

              {/* Newsletter */}
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                className="bg-gradient-to-br from-primary-50 to-secondary-50 dark:from-primary-900/20 dark:to-secondary-900/20 p-6 rounded-2xl border border-primary-200 dark:border-primary-800"
              >
                <h3 className="text-lg font-bold text-neutral-900 dark:text-white mb-3">
                  Subscribe to Newsletter
                </h3>
                <p className="text-sm text-neutral-600 dark:text-neutral-400 mb-4">
                  Get the latest articles and insights delivered to your inbox
                </p>
                <div className="space-y-3">
                  <input
                    type="email"
                    placeholder="Your email address"
                    className="w-full px-3 py-2 text-sm bg-white dark:bg-neutral-800 border border-neutral-200 dark:border-neutral-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                  />
                  <button className="w-full bg-primary-500 hover:bg-primary-600 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors">
                    Subscribe
                  </button>
                </div>
              </motion.div>

              {/* Tags Cloud */}
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: 0.3 }}
                className="bg-white dark:bg-neutral-800 p-6 rounded-2xl border border-neutral-200 dark:border-neutral-700"
              >
                <div className="flex items-center space-x-2 mb-6">
                  <FiTag className="w-5 h-5 text-primary-500" />
                  <h3 className="text-lg font-bold text-neutral-900 dark:text-white">
                    Popular Tags
                  </h3>
                </div>

                <div className="flex flex-wrap gap-2">
                  {['React', 'TypeScript', 'Node.js', 'CSS', 'JavaScript', 'API', 'Career', 'Tutorial', 'Best Practices', 'Docker'].map((tag) => (
                    <button
                      key={tag}
                      onClick={() => setSearchTerm(tag)}
                      className="bg-neutral-100 dark:bg-neutral-700 text-neutral-600 dark:text-neutral-400 hover:bg-primary-100 dark:hover:bg-primary-900/30 hover:text-primary-600 dark:hover:text-primary-400 px-3 py-1 rounded-lg text-sm font-medium transition-colors"
                    >
                      #{tag}
                    </button>
                  ))}
                </div>
              </motion.div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Blog;