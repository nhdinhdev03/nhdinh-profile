import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useTheme } from '../../contexts/ThemeContext';
import { generateThemeClasses } from '../../utils/themeUtils';
import { 
  FiZap as Zap, 
  FiCode as Code, 
  FiDatabase as Database, 
  FiShield as Shield, 
  FiSearch as Search, 
  FiCalendar as Calendar, 
  FiArrowRight as ArrowRight,
  FiEye as Eye,
  FiHeart as Heart,
  FiMessageCircle as MessageCircle,
  FiBookOpen as BookOpen,
  FiTrendingUp as TrendingUp,
  FiStar as Sparkles,
  FiCpu as Brain,
  FiLayers as Layers
} from 'react-icons/fi';

const ModernBlog = () => {
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [searchTerm, setSearchTerm] = useState("");
  const [featuredPost, setFeaturedPost] = useState(0);
  const { theme } = useTheme();
  const themeClasses = generateThemeClasses(theme);
  
  // Removed custom loading hook outside src; simple local loading state if needed
  const [isLoading] = useState(false);

  // Rotate featured post
  useEffect(() => {
    const interval = setInterval(() => {
      setFeaturedPost((prev) => (prev + 1) % 3);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  const categories = [
    { name: "All", icon: BookOpen, color: "from-blue-500 to-purple-500" },
    { name: "AI & ML", icon: Brain, color: "from-purple-500 to-pink-500" },
    { name: "Web Dev", icon: Code, color: "from-green-500 to-blue-500" },
    { name: "Cloud", icon: Database, color: "from-cyan-500 to-indigo-500" },
    { name: "Security", icon: Shield, color: "from-red-500 to-orange-500" },
    { name: "Trends", icon: TrendingUp, color: "from-yellow-500 to-red-500" }
  ];

  const blogPosts = [
    {
      id: 1,
      title: "The Future of AI in Web Development",
      slug: "ai-web-development-future",
      excerpt: "Exploring how artificial intelligence is revolutionizing the way we build and interact with web applications.",
      content: "Artificial Intelligence is transforming web development in unprecedented ways...",
      category: "AI & ML",
      author: "Nguyen Hoang Dinh",
      date: "2024-01-15",
      readTime: "8 min read",
      tags: ["AI", "Web Development", "Machine Learning", "Future Tech"],
      image: "/api/placeholder/800/400",
      views: 2847,
      likes: 156,
      comments: 23,
      featured: true,
      complexity: "Advanced",
      techStack: ["TensorFlow.js", "React", "Node.js", "Python"]
    },
    {
      id: 2,
      title: "Building Quantum-Safe Encryption Systems",
      slug: "quantum-safe-encryption",
      excerpt: "Preparing for the post-quantum era with advanced cryptographic implementations.",
      content: "With quantum computing on the horizon, traditional encryption methods face unprecedented challenges...",
      category: "Security",
      author: "Nguyen Hoang Dinh",
      date: "2024-01-10",
      readTime: "12 min read",
      tags: ["Quantum Computing", "Cryptography", "Security", "Blockchain"],
      image: "/api/placeholder/800/400",
      views: 1923,
      likes: 89,
      comments: 15,
      featured: true,
      complexity: "Expert",
      techStack: ["Rust", "OpenSSL", "NIST Standards", "Lattice Cryptography"]
    },
    {
      id: 3,
      title: "Micro-Frontend Architecture at Scale",
      slug: "micro-frontend-architecture",
      excerpt: "Implementing scalable micro-frontend solutions for enterprise applications.",
      content: "Micro-frontends represent the next evolution in frontend architecture...",
      category: "Web Dev",
      author: "Nguyen Hoang Dinh", 
      date: "2024-01-08",
      readTime: "10 min read",
      tags: ["Micro-frontends", "Architecture", "Scalability", "Enterprise"],
      image: "/api/placeholder/800/400",
      views: 3156,
      likes: 203,
      comments: 31,
      featured: true,
      complexity: "Advanced",
      techStack: ["Module Federation", "React", "Docker", "Kubernetes"]
    },
    {
      id: 4,
      title: "Cloud-Native Development Patterns",
      slug: "cloud-native-patterns",
      excerpt: "Modern patterns for building resilient cloud-native applications.",
      content: "Cloud-native development requires a fundamental shift in how we architect applications...",
      category: "Cloud",
      author: "Nguyen Hoang Dinh",
      date: "2024-01-05",
      readTime: "15 min read",
      tags: ["Cloud Native", "Microservices", "DevOps", "Containers"],
      image: "/api/placeholder/800/400",
      views: 2734,
      likes: 178,
      comments: 27,
      complexity: "Intermediate",
      techStack: ["Kubernetes", "Docker", "Istio", "Prometheus"]
    },
    {
      id: 5,
      title: "Neural Networks in Edge Computing",
      slug: "neural-networks-edge",
      excerpt: "Deploying AI models at the edge for real-time inference and processing.",
      content: "Edge computing is bringing AI closer to data sources, enabling real-time decisions...",
      category: "AI & ML",
      author: "Nguyen Hoang Dinh",
      date: "2024-01-03",
      readTime: "11 min read",
      tags: ["Edge Computing", "Neural Networks", "IoT", "Real-time AI"],
      image: "/api/placeholder/800/400",
      views: 1867,
      likes: 142,
      comments: 19,
      complexity: "Advanced",
      techStack: ["TensorFlow Lite", "ONNX", "ARM Processors", "WebAssembly"]
    },
    {
      id: 6,
      title: "The Rise of WebAssembly in 2024",
      slug: "webassembly-2024",
      excerpt: "How WebAssembly is changing the landscape of web performance and capabilities.",
      content: "WebAssembly continues to push the boundaries of what's possible in web browsers...",
      category: "Trends",
      author: "Nguyen Hoang Dinh",
      date: "2024-01-01",
      readTime: "9 min read",
      tags: ["WebAssembly", "Performance", "Web Standards", "Cross-platform"],
      image: "/api/placeholder/800/400",
      views: 2456,
      likes: 195,
      comments: 34,
      complexity: "Intermediate",
      techStack: ["WASM", "Rust", "C++", "Emscripten"]
    }
  ];

  const filteredPosts = blogPosts.filter((post) => {
    const matchesCategory = selectedCategory === "All" || post.category === selectedCategory;
    const matchesSearch = post.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         post.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()));
    return matchesCategory && matchesSearch;
  });

  const featuredPosts = blogPosts.filter(post => post.featured);

  // Floating Particle Component
  const FloatingParticle = ({ delay = 0 }) => (
    <motion.div
      className="absolute w-1 h-1 bg-cyan-400 rounded-full opacity-30"
      animate={{
        y: [-20, -100],
        opacity: [0, 1, 0],
      }}
      transition={{
        duration: 3,
        repeat: Infinity,
        delay,
        ease: "easeOut",
      }}
      style={{
        left: Math.random() * 100 + "%",
      }}
    />
  );

  if (isLoading) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center">
        <motion.div
          className="relative"
          animate={{ rotate: 360 }}
          transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
        >
          <div className="w-16 h-16 border-2 border-cyan-400 border-t-transparent rounded-full" />
          <motion.div
            className="absolute inset-0 w-16 h-16 border border-purple-500 border-b-transparent rounded-full"
            animate={{ rotate: -360 }}
            transition={{ duration: 1.5, repeat: Infinity, ease: "linear" }}
          />
        </motion.div>
      </div>
    );
  }

  return (
    <div className={themeClasses.container}>
      {/* Animated Background */}
      <div className={`fixed inset-0 ${themeClasses.opacity}`}>
        <div className={`absolute inset-0 ${themeClasses.heroBackground}`} />
        {/* Floating Particles */}
        {[...Array(50)].map((_, i) => (
          <FloatingParticle key={i} delay={i * 0.1} />
        ))}
        
        {/* Neural Network Grid */}
        <div className="absolute inset-0">
          {[...Array(20)].map((_, i) => (
            <motion.div
              key={i}
              className={`absolute w-px h-full ${
                theme === 'dark' 
                  ? 'bg-gradient-to-b from-transparent via-cyan-500/10 to-transparent' 
                  : 'bg-gradient-to-b from-transparent via-blue-500/10 to-transparent'
              }`}
              style={{ left: `${(i + 1) * 5}%` }}
              animate={{ opacity: [0.1, 0.3, 0.1] }}
              transition={{ duration: 4, repeat: Infinity, delay: i * 0.2 }}
            />
          ))}
          {[...Array(15)].map((_, i) => (
            <motion.div
              key={i}
              className={`absolute h-px w-full ${
                theme === 'dark' 
                  ? 'bg-gradient-to-r from-transparent via-purple-500/10 to-transparent' 
                  : 'bg-gradient-to-r from-transparent via-purple-500/10 to-transparent'
              }`}
              style={{ top: `${(i + 1) * 6.67}%` }}
              animate={{ opacity: [0.1, 0.3, 0.1] }}
              transition={{ duration: 3, repeat: Infinity, delay: i * 0.15 }}
            />
          ))}
        </div>
      </div>



      <div className="relative z-10">
        {/* Header Section */}
        <motion.section
          className="pt-24 pb-16"
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <motion.div
                className="inline-flex items-center space-x-2 bg-gradient-to-r from-cyan-500/10 to-purple-500/10 border border-cyan-500/20 rounded-full px-6 py-2 mb-6"
                whileHover={{ scale: 1.05 }}
                transition={{ type: "spring", stiffness: 400, damping: 25 }}
              >
                <Sparkles className="w-4 h-4 text-cyan-400" />
                <span className="text-cyan-300 text-sm font-medium">Tech Blog & Insights</span>
              </motion.div>
              
              <motion.h1
                className={`text-5xl md:text-7xl font-bold mb-6 transition-colors duration-300 ${
                  theme === 'dark' ? 'text-white' : 'text-gray-900'
                }`}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2, duration: 0.8 }}
              >
                <span className="bg-gradient-to-r from-cyan-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
                  Digital
                </span>
                <br />
                <span className={theme === 'dark' ? 'text-white' : 'text-gray-900'}>Insights</span>
              </motion.h1>
              
              <motion.p
                className={`text-xl max-w-3xl mx-auto leading-relaxed transition-colors duration-300 ${
                  theme === 'dark' ? 'text-gray-300' : 'text-gray-600'
                }`}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4, duration: 0.8 }}
              >
                Exploring the intersection of technology, innovation, and future possibilities through in-depth articles and technical insights.
              </motion.p>
            </div>

            {/* Search and Filter */}
            <div className="flex flex-col lg:flex-row gap-6 items-center justify-between mb-12">
              {/* Search Bar */}
              <motion.div
                className="relative w-full lg:w-96"
                initial={{ opacity: 0, x: -30 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.6, duration: 0.6 }}
              >
                <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-cyan-400 w-5 h-5" />
                <input
                  type="text"
                  placeholder="Search articles, tags, or topics..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className={`w-full backdrop-blur-sm border rounded-2xl pl-12 pr-4 py-4 focus:outline-none focus:ring-2 focus:ring-cyan-400/20 transition-all duration-300 ${
                    theme === 'dark' 
                      ? 'bg-gray-900/80 border-gray-700 text-white placeholder-gray-400 focus:border-cyan-400' 
                      : 'bg-white/80 border-gray-200 text-gray-900 placeholder-gray-500 focus:border-blue-400'
                  }`}
                />
              </motion.div>

              {/* Category Filter */}
              <motion.div
                className="flex flex-wrap gap-3"
                initial={{ opacity: 0, x: 30 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.8, duration: 0.6 }}
              >
                {categories.map((category, index) => {
                  const Icon = category.icon;
                  return (
                    <motion.button
                      key={category.name}
                      onClick={() => setSelectedCategory(category.name)}
                      className={`flex items-center space-x-2 px-4 py-2 rounded-xl border transition-all duration-300 ${
                        selectedCategory === category.name
                          ? `bg-gradient-to-r ${category.color} text-white border-transparent shadow-lg shadow-cyan-500/25`
                          : theme === 'dark'
                            ? "bg-gray-900/50 border-gray-700 text-gray-300 hover:border-cyan-400/50 hover:text-white"
                            : "bg-white/70 border-gray-200 text-gray-600 hover:border-blue-400/50 hover:text-gray-900"
                      }`}
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.8 + index * 0.1, duration: 0.5 }}
                    >
                      <Icon className="w-4 h-4" />
                      <span className="text-sm font-medium">{category.name}</span>
                    </motion.button>
                  );
                })}
              </motion.div>
            </div>
          </div>
        </motion.section>

        {/* Featured Posts Carousel */}
        <motion.section
          className="py-16"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1, duration: 0.8 }}
        >
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex items-center space-x-3 mb-8">
              <div className="w-2 h-2 bg-cyan-400 rounded-full animate-pulse" />
              <h2 className="text-2xl font-bold text-white">Featured Articles</h2>
            </div>

            <div className="relative h-96 rounded-2xl overflow-hidden">
              <AnimatePresence mode="wait">
                <motion.div
                  key={featuredPost}
                  className="absolute inset-0"
                  initial={{ opacity: 0, x: 300 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -300 }}
                  transition={{ duration: 0.5 }}
                >
                  <div className="relative h-full bg-gradient-to-r from-gray-900 via-gray-800 to-gray-900 rounded-2xl overflow-hidden border border-gray-700">
                    <div className="absolute inset-0 bg-gradient-to-r from-cyan-500/10 to-purple-500/10" />
                    
                    <div className="relative z-10 h-full flex items-center p-8 lg:p-12">
                      <div className="w-full lg:w-1/2">
                        <div className="flex items-center space-x-3 mb-4">
                          <span className="px-3 py-1 bg-gradient-to-r from-cyan-500 to-purple-500 rounded-full text-xs font-medium text-white">
                            {featuredPosts[featuredPost]?.complexity}
                          </span>
                          <span className="text-cyan-400 text-sm">{featuredPosts[featuredPost]?.category}</span>
                        </div>
                        
                        <h3 className="text-3xl lg:text-4xl font-bold text-white mb-4 leading-tight">
                          {featuredPosts[featuredPost]?.title}
                        </h3>
                        
                        <p className="text-gray-300 mb-6 text-lg leading-relaxed">
                          {featuredPosts[featuredPost]?.excerpt}
                        </p>
                        
                        <div className="flex items-center space-x-6 mb-6">
                          <div className="flex items-center space-x-2">
                            <Eye className="w-4 h-4 text-gray-400" />
                            <span className="text-gray-400 text-sm">{featuredPosts[featuredPost]?.views.toLocaleString()}</span>
                          </div>
                          <div className="flex items-center space-x-2">
                            <Heart className="w-4 h-4 text-gray-400" />
                            <span className="text-gray-400 text-sm">{featuredPosts[featuredPost]?.likes}</span>
                          </div>
                          <div className="flex items-center space-x-2">
                            <MessageCircle className="w-4 h-4 text-gray-400" />
                            <span className="text-gray-400 text-sm">{featuredPosts[featuredPost]?.comments}</span>
                          </div>
                        </div>
                        
                        <motion.button
                          className="inline-flex items-center space-x-2 bg-gradient-to-r from-cyan-500 to-purple-500 text-white px-6 py-3 rounded-xl font-medium hover:from-cyan-400 hover:to-purple-400 transition-all duration-300 shadow-lg shadow-cyan-500/25"
                          whileHover={{ scale: 1.05, y: -2 }}
                          whileTap={{ scale: 0.95 }}
                        >
                          <span>Read Article</span>
                          <ArrowRight className="w-4 h-4" />
                        </motion.button>
                      </div>
                      
                      <div className="hidden lg:block w-1/2 pl-8">
                        <div className="bg-gray-800/50 backdrop-blur-sm border border-gray-700 rounded-xl p-6">
                          <h4 className="text-white font-semibold mb-4">Tech Stack</h4>
                          <div className="flex flex-wrap gap-2">
                            {featuredPosts[featuredPost]?.techStack.map((tech, index) => (
                              <span
                                key={index}
                                className="px-3 py-1 bg-gray-700 text-cyan-300 rounded-lg text-sm"
                              >
                                {tech}
                              </span>
                            ))}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </motion.div>
              </AnimatePresence>

              {/* Carousel Indicators */}
              <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2">
                {featuredPosts.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => setFeaturedPost(index)}
                    className={`w-3 h-3 rounded-full transition-all duration-300 ${
                      index === featuredPost
                        ? "bg-cyan-400 shadow-lg shadow-cyan-400/50"
                        : "bg-gray-600 hover:bg-gray-500"
                    }`}
                  />
                ))}
              </div>
            </div>
          </div>
        </motion.section>

        {/* Blog Posts Grid */}
        <motion.section
          className="py-16"
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.2, duration: 0.8 }}
        >
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex items-center justify-between mb-12">
              <div className="flex items-center space-x-3">
                <div className="w-2 h-2 bg-purple-400 rounded-full animate-pulse" />
                <h2 className="text-2xl font-bold text-white">Latest Articles</h2>
              </div>
              <div className="text-gray-400 text-sm">
                {filteredPosts.length} article{filteredPosts.length !== 1 ? 's' : ''} found
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredPosts.map((post, index) => (
                <motion.article
                  key={post.id}
                  className="group bg-gradient-to-br from-gray-900 to-gray-800 rounded-2xl overflow-hidden border border-gray-700 hover:border-cyan-400/50 transition-all duration-500 hover:shadow-2xl hover:shadow-cyan-500/10"
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 1.4 + index * 0.1, duration: 0.6 }}
                  whileHover={{ y: -10 }}
                >
                  {/* Post Image */}
                  <div className="relative h-48 bg-gradient-to-br from-cyan-500/20 to-purple-500/20 overflow-hidden">
                    <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/10 via-purple-500/10 to-pink-500/10" />
                    <div className="absolute top-4 left-4">
                      <span className="px-3 py-1 bg-black/50 backdrop-blur-sm text-cyan-300 rounded-full text-xs font-medium">
                        {post.category}
                      </span>
                    </div>
                    <div className="absolute top-4 right-4">
                      <span className="px-2 py-1 bg-black/50 backdrop-blur-sm text-white rounded-lg text-xs">
                        {post.complexity}
                      </span>
                    </div>
                    
                    {/* Animated Tech Stack Icons */}
                    <div className="absolute inset-0 flex items-center justify-center">
                      <motion.div
                        className="text-6xl text-cyan-400/30"
                        animate={{ rotate: 360 }}
                        transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                      >
                        {post.category === "AI & ML" && <Brain />}
                        {post.category === "Web Dev" && <Code />}
                        {post.category === "Cloud" && <Database />}
                        {post.category === "Security" && <Shield />}
                        {post.category === "Trends" && <TrendingUp />}
                      </motion.div>
                    </div>
                  </div>

                  {/* Post Content */}
                  <div className="p-6">
                    <div className="flex items-center space-x-4 mb-3 text-sm text-gray-400">
                      <div className="flex items-center space-x-1">
                        <Calendar className="w-4 h-4" />
                        <span>{new Date(post.date).toLocaleDateString()}</span>
                      </div>
                      <span>•</span>
                      <span>{post.readTime}</span>
                    </div>

                    <h3 className="text-xl font-bold text-white mb-3 group-hover:text-cyan-300 transition-colors duration-300 line-clamp-2">
                      {post.title}
                    </h3>

                    <p className="text-gray-300 mb-4 line-clamp-3 text-sm leading-relaxed">
                      {post.excerpt}
                    </p>

                    {/* Tags */}
                    <div className="flex flex-wrap gap-2 mb-4">
                      {post.tags.slice(0, 3).map((tag, tagIndex) => (
                        <span
                          key={tagIndex}
                          className="px-2 py-1 bg-gray-800 text-cyan-300 rounded-md text-xs"
                        >
                          #{tag}
                        </span>
                      ))}
                    </div>

                    {/* Post Stats */}
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-4 text-xs text-gray-400">
                        <div className="flex items-center space-x-1">
                          <Eye className="w-3 h-3" />
                          <span>{post.views.toLocaleString()}</span>
                        </div>
                        <div className="flex items-center space-x-1">
                          <Heart className="w-3 h-3" />
                          <span>{post.likes}</span>
                        </div>
                        <div className="flex items-center space-x-1">
                          <MessageCircle className="w-3 h-3" />
                          <span>{post.comments}</span>
                        </div>
                      </div>

                      <motion.button
                        className="flex items-center space-x-1 text-cyan-400 hover:text-cyan-300 transition-colors duration-300"
                        whileHover={{ x: 5 }}
                      >
                        <span className="text-sm font-medium">Read</span>
                        <ArrowRight className="w-4 h-4" />
                      </motion.button>
                    </div>
                  </div>
                </motion.article>
              ))}
            </div>

            {/* Load More Button */}
            {filteredPosts.length >= 6 && (
              <motion.div
                className="text-center mt-12"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 2, duration: 0.6 }}
              >
                <motion.button
                  className="inline-flex items-center space-x-2 bg-gradient-to-r from-gray-800 to-gray-700 text-white px-8 py-4 rounded-xl font-medium border border-gray-600 hover:border-cyan-400/50 hover:from-gray-700 hover:to-gray-600 transition-all duration-300"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <span>Load More Articles</span>
                  <Layers className="w-4 h-4" />
                </motion.button>
              </motion.div>
            )}
          </div>
        </motion.section>

        {/* Newsletter Section */}
        <motion.section
          className="py-16"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 2.2, duration: 0.8 }}
        >
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="bg-gradient-to-r from-gray-900 via-gray-800 to-gray-900 rounded-2xl border border-gray-700 p-8 lg:p-12 text-center">
              <motion.div
                className="inline-flex items-center space-x-2 bg-gradient-to-r from-cyan-500/10 to-purple-500/10 border border-cyan-500/20 rounded-full px-6 py-2 mb-6"
                whileHover={{ scale: 1.05 }}
              >
                <Zap className="w-4 h-4 text-cyan-400" />
                <span className="text-cyan-300 text-sm font-medium">Stay Updated</span>
              </motion.div>

              <h2 className="text-3xl lg:text-4xl font-bold text-white mb-4">
                Get the latest <span className="bg-gradient-to-r from-cyan-400 to-purple-400 bg-clip-text text-transparent">tech insights</span>
              </h2>
              
              <p className="text-gray-300 mb-8 text-lg leading-relaxed">
                Subscribe to receive weekly updates on cutting-edge technologies, development trends, and exclusive technical content.
              </p>

              <div className="flex flex-col sm:flex-row gap-4 justify-center max-w-md mx-auto">
                <input
                  type="email"
                  placeholder="Enter your email"
                  className="flex-1 bg-gray-800 border border-gray-700 rounded-xl px-4 py-3 text-white placeholder-gray-400 focus:outline-none focus:border-cyan-400 focus:ring-2 focus:ring-cyan-400/20 transition-all duration-300"
                />
                <motion.button
                  className="bg-gradient-to-r from-cyan-500 to-purple-500 text-white px-6 py-3 rounded-xl font-medium hover:from-cyan-400 hover:to-purple-400 transition-all duration-300 shadow-lg shadow-cyan-500/25"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  Subscribe
                </motion.button>
              </div>

              <p className="text-gray-400 text-sm mt-4">
                No spam, unsubscribe at any time. We respect your privacy.
              </p>
            </div>
          </div>
        </motion.section>
      </div>
    </div>
  );
};

export default ModernBlog;
