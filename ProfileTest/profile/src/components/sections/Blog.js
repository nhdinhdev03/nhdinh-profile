import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence, useAnimation } from 'framer-motion';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { 
  faCalendarAlt, 
  faClock, 
  faTag, 
  faArrowRight, 
  faSearch,
  faBookOpen,
  faFire,
  faHeart,
  faShare,
  faBookmark,
  faComment,
  faEye,
  faStar,
  faLightbulb,
  faCode,
  faRocket,
  faBolt,
  faGem,
  faMagic,
  faAtom,
  faBrain,
  faFlask,
  faInfinity
} from '@fortawesome/free-solid-svg-icons';
import { 
  faReact, 
  faNodeJs, 
  faDocker, 
  faPython,
  faJs,
  faGithub
} from '@fortawesome/free-brands-svg-icons';
import { useInView } from 'react-intersection-observer';

const Blog = () => {
  const [ref, inView] = useInView({
    threshold: 0.1,
    triggerOnce: true,
  });

  const [selectedPost, setSelectedPost] = useState(null);
  const [readingMode, setReadingMode] = useState(false);
  const [activeView, setActiveView] = useState('grid'); // 'grid', 'timeline', 'masonry'
  const [isNeuroMode, setIsNeuroMode] = useState(false);
  const canvasRef = useRef(null);
  const controls = useAnimation();

  // 📚 LEGENDARY BLOG POSTS - Bài viết công nghệ cực đỉnh
  const [blogPosts] = useState([
    {
      id: 1,
      title: "Neural Networks in Web Development: The Future is Now",
      slug: "neural-networks-web-development-future",
      subtitle: "Building AI-Powered Frontend Experiences",
      description: "Khám phá cách tích hợp neural networks vào web applications để tạo ra những trải nghiệm người dùng thông minh và adaptive. Từ real-time personalization đến predictive UI.",
      longDescription: "Trong era AI 4.0, việc tích hợp neural networks vào web development không còn là khoa học viễn tưởng. Bài viết này sẽ hướng dẫn bạn cách xây dựng các web applications với AI capabilities, từ natural language processing cho chatbots đến computer vision cho image recognition.",
      thumbnail: "/images/neural-web-dev.jpg",
      content: "Full article content here...",
      author: {
        name: "Nguyen Hoang Dinh",
        avatar: "/images/avatar.jpg",
        title: "AI & Full-Stack Developer"
      },
      publishedAt: "2024-01-20",
      updatedAt: "2024-01-22",
      readTime: "15 phút đọc",
      difficulty: "advanced",
      category: "AI/ML",
      tags: [
        { name: "Neural Networks", icon: faBrain, color: "#FF6B6B" },
        { name: "Web Development", icon: faCode, color: "#4ECDC4" },
        { name: "Machine Learning", icon: faAtom, color: "#45B7D1" },
        { name: "TensorFlow.js", icon: faFlask, color: "#FF9F43" },
        { name: "React", icon: faReact, color: "#61DAFB" }
      ],
      metrics: {
        views: 12750,
        likes: 845,
        comments: 67,
        bookmarks: 234,
        shares: 89
      },
      readingStats: {
        avgTime: 12,
        completionRate: 87,
        engagement: 94
      },
      isPopular: true,
      isFeatured: true,
      codeSnippets: 12,
      images: 8,
      estimatedSize: "2.4 MB"
    },
    {
      id: 2,
      title: "Quantum Computing meets React: Superposition State Management",
      slug: "quantum-computing-react-superposition-state",
      subtitle: "Revolutionary State Management Paradigms",
      description: "Áp dụng nguyên lý quantum superposition vào React state management để tạo ra những patterns hoàn toàn mới. Khám phá quantum-inspired algorithms cho optimal performance.",
      longDescription: "Lấy cảm hứng từ quantum computing, chúng ta sẽ khám phá cách áp dụng quantum principles như superposition và entanglement vào React state management, tạo ra những patterns mới cho multi-dimensional state handling.",
      thumbnail: "/images/quantum-react.jpg",
      content: "Full article content here...",
      author: {
        name: "Nguyen Hoang Dinh",
        avatar: "/images/avatar.jpg",
        title: "Quantum Software Architect"
      },
      publishedAt: "2024-01-18",
      updatedAt: "2024-01-19",
      readTime: "20 phút đọc",
      difficulty: "expert",
      category: "Frontend",
      tags: [
        { name: "Quantum Computing", icon: faAtom, color: "#8E44AD" },
        { name: "React", icon: faReact, color: "#61DAFB" },
        { name: "State Management", icon: faInfinity, color: "#E74C3C" },
        { name: "Advanced Patterns", icon: faGem, color: "#F39C12" },
        { name: "Performance", icon: faBolt, color: "#2ECC71" }
      ],
      metrics: {
        views: 18420,
        likes: 1247,
        comments: 156,
        bookmarks: 389,
        shares: 203
      },
      readingStats: {
        avgTime: 18,
        completionRate: 76,
        engagement: 91
      },
      isPopular: true,
      isFeatured: true,
      codeSnippets: 18,
      images: 12,
      estimatedSize: "3.8 MB"
    },
    {
      id: 3,
      title: "Holographic UI Design: Beyond Flat Design",
      slug: "holographic-ui-design-beyond-flat",
      subtitle: "The Next Dimension of User Experience",
      description: "Thiết kế giao diện holographic với CSS 3D transforms, WebGL và AR/VR integration. Tạo ra những experiences truly immersive cho users trong kỷ nguyên spatial computing.",
      longDescription: "Bước vào thế giới thiết kế UI 3 chiều với holographic effects, spatial computing principles, và immersive interactions. Học cách tạo ra những giao diện không chỉ đẹp mà còn có chiều sâu thực sự.",
      thumbnail: "/images/holographic-ui.jpg",
      content: "Full article content here...",
      author: {
        name: "Nguyen Hoang Dinh",
        avatar: "/images/avatar.jpg",
        title: "3D UI/UX Designer"
      },
      publishedAt: "2024-01-15",
      updatedAt: "2024-01-16",
      readTime: "12 phút đọc",
      difficulty: "intermediate",
      category: "Design",
      tags: [
        { name: "3D Design", icon: faGem, color: "#9B59B6" },
        { name: "CSS 3D", icon: faMagic, color: "#3498DB" },
        { name: "WebGL", icon: faRocket, color: "#E67E22" },
        { name: "AR/VR", icon: faInfinity, color: "#1ABC9C" },
        { name: "Spatial Computing", icon: faAtom, color: "#F1C40F" }
      ],
      metrics: {
        views: 9856,
        likes: 567,
        comments: 89,
        bookmarks: 234,
        shares: 112
      },
      readingStats: {
        avgTime: 11,
        completionRate: 92,
        engagement: 88
      },
      isPopular: false,
      isFeatured: true,
      codeSnippets: 15,
      images: 20,
      estimatedSize: "4.2 MB"
    },
    {
      id: 4,
      title: "Blockchain-Powered Real-time Analytics: Web3 Data Revolution",
      slug: "blockchain-realtime-analytics-web3-data",
      subtitle: "Decentralized Data Processing at Scale",
      description: "Xây dựng hệ thống analytics real-time trên blockchain với smart contracts, IPFS storage, và decentralized computing. The future of data ownership và privacy.",
      longDescription: "Khám phá cách xây dựng analytics systems hoàn toàn decentralized với blockchain technology, smart contracts cho data processing, và crypto-economic incentives cho data contributors.",
      thumbnail: "/images/blockchain-analytics.jpg",
      content: "Full article content here...",
      author: {
        name: "Nguyen Hoang Dinh",
        avatar: "/images/avatar.jpg",
        title: "Blockchain Architect"
      },
      publishedAt: "2024-01-12",
      updatedAt: "2024-01-13",
      readTime: "25 phút đọc",
      difficulty: "expert",
      category: "Blockchain",
      tags: [
        { name: "Blockchain", icon: faGem, color: "#F39C12" },
        { name: "Smart Contracts", icon: faCode, color: "#8E44AD" },
        { name: "Web3", icon: faInfinity, color: "#3498DB" },
        { name: "IPFS", icon: faAtom, color: "#2ECC71" },
        { name: "Solidity", icon: faFlask, color: "#E74C3C" }
      ],
      metrics: {
        views: 15674,
        likes: 923,
        comments: 201,
        bookmarks: 445,
        shares: 167
      },
      readingStats: {
        avgTime: 23,
        completionRate: 68,
        engagement: 95
      },
      isPopular: true,
      isFeatured: false,
      codeSnippets: 22,
      images: 15,
      estimatedSize: "5.1 MB"
    },
    {
      id: 5,
      title: "Serverless Edge Computing: The Death of Traditional Servers",
      slug: "serverless-edge-computing-death-traditional-servers",
      subtitle: "Distributed Computing at Lightning Speed",
      description: "Khám phá kiến trúc serverless edge computing với Cloudflare Workers, Deno Deploy, và Vercel Edge Functions. Latency zero và infinite scalability cho modern applications.",
      longDescription: "Cuộc cách mạng serverless edge computing đang thay đổi cách chúng ta deploy và scale applications. Học cách tận dụng global edge networks để đạt được performance chưa từng có.",
      thumbnail: "/images/serverless-edge.jpg",
      content: "Full article content here...",
      author: {
        name: "Nguyen Hoang Dinh",
        avatar: "/images/avatar.jpg",
        title: "Cloud Architecture Expert"
      },
      publishedAt: "2024-01-08",
      updatedAt: "2024-01-09",
      readTime: "18 phút đọc",
      difficulty: "advanced",
      category: "Backend",
      tags: [
        { name: "Serverless", icon: faBolt, color: "#FF6B6B" },
        { name: "Edge Computing", icon: faRocket, color: "#4ECDC4" },
        { name: "Cloudflare", icon: faCode, color: "#F39C12" },
        { name: "Performance", icon: faAtom, color: "#8E44AD" },
        { name: "Scalability", icon: faInfinity, color: "#2ECC71" }
      ],
      metrics: {
        views: 11234,
        likes: 678,
        comments: 134,
        bookmarks: 289,
        shares: 98
      },
      readingStats: {
        avgTime: 16,
        completionRate: 85,
        engagement: 89
      },
      isPopular: false,
      isFeatured: true,
      codeSnippets: 14,
      images: 10,
      estimatedSize: "2.9 MB"
    },
    {
      id: 6,
      title: "Neomorphic Design with CSS: Beyond Material Design",
      slug: "neomorphic-design-css-beyond-material",
      subtitle: "Soft UI Revolution in Modern Interfaces",
      description: "Tạo ra neomorphic design systems với pure CSS. Khám phá soft shadows, depth layering, và tactile interfaces cho generation mới của digital experiences.",
      longDescription: "Neomorphism đang tạo ra một làn sóng mới trong UI design với aesthetic realistic và tactile. Học cách implement neomorphic components với CSS advanced techniques.",
      thumbnail: "/images/neomorphic-design.jpg",
      content: "Full article content here...",
      author: {
        name: "Nguyen Hoang Dinh",
        avatar: "/images/avatar.jpg",
        title: "Creative Frontend Developer"
      },
      publishedAt: "2024-01-05",
      updatedAt: "2024-01-06",
      readTime: "14 phút đọc",
      difficulty: "intermediate",
      category: "Design",
      tags: [
        { name: "Neomorphism", icon: faGem, color: "#95A5A6" },
        { name: "CSS Advanced", icon: faMagic, color: "#3498DB" },
        { name: "UI Design", icon: faLightbulb, color: "#F1C40F" },
        { name: "Modern CSS", icon: faCode, color: "#E74C3C" },
        { name: "Design Systems", icon: faAtom, color: "#9B59B6" }
      ],
      metrics: {
        views: 8945,
        likes: 456,
        comments: 78,
        bookmarks: 167,
        shares: 89
      },
      readingStats: {
        avgTime: 13,
        completionRate: 89,
        engagement: 82
      },
      isPopular: false,
      isFeatured: false,
      codeSnippets: 10,
      images: 16,
      estimatedSize: "3.2 MB"
    }
  ]);

  const [categories] = useState([
    { name: "All", icon: faBookOpen, count: blogPosts.length },
    { name: "AI/ML", icon: faBrain, count: blogPosts.filter(p => p.category === "AI/ML").length },
    { name: "Frontend", icon: faReact, count: blogPosts.filter(p => p.category === "Frontend").length },
    { name: "Backend", icon: faNodeJs, count: blogPosts.filter(p => p.category === "Backend").length },
    { name: "Design", icon: faGem, count: blogPosts.filter(p => p.category === "Design").length },
    { name: "Blockchain", icon: faAtom, count: blogPosts.filter(p => p.category === "Blockchain").length }
  ]);

  const [activeCategory, setActiveCategory] = useState("All");
  const [filteredPosts, setFilteredPosts] = useState(blogPosts);
  const [searchTerm, setSearchTerm] = useState("");

  // Neural Network Background Effect
  useEffect(() => {
    if (isNeuroMode && canvasRef.current) {
      const canvas = canvasRef.current;
      const ctx = canvas.getContext('2d');
      
      const resizeCanvas = () => {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
      };
      
      resizeCanvas();
      window.addEventListener('resize', resizeCanvas);

      const nodes = [];
      const connections = [];
      const nodeCount = 50;

      // Create nodes
      for (let i = 0; i < nodeCount; i++) {
        nodes.push({
          x: Math.random() * canvas.width,
          y: Math.random() * canvas.height,
          vx: (Math.random() - 0.5) * 2,
          vy: (Math.random() - 0.5) * 2,
          radius: Math.random() * 3 + 2
        });
      }

      const animate = () => {
        ctx.fillStyle = 'rgba(0, 0, 0, 0.05)';
        ctx.fillRect(0, 0, canvas.width, canvas.height);

        // Update and draw nodes
        nodes.forEach((node, i) => {
          // Update position
          node.x += node.vx;
          node.y += node.vy;

          // Bounce off edges
          if (node.x < 0 || node.x > canvas.width) node.vx *= -1;
          if (node.y < 0 || node.y > canvas.height) node.vy *= -1;

          // Draw node
          ctx.beginPath();
          ctx.arc(node.x, node.y, node.radius, 0, Math.PI * 2);
          ctx.fillStyle = '#4ECDC4';
          ctx.fill();

          // Draw connections
          nodes.forEach((otherNode, j) => {
            if (i !== j) {
              const distance = Math.sqrt(
                Math.pow(node.x - otherNode.x, 2) + Math.pow(node.y - otherNode.y, 2)
              );
              if (distance < 100) {
                ctx.beginPath();
                ctx.moveTo(node.x, node.y);
                ctx.lineTo(otherNode.x, otherNode.y);
                ctx.strokeStyle = `rgba(78, 205, 196, ${1 - distance / 100})`;
                ctx.stroke();
              }
            }
          });
        });

        requestAnimationFrame(animate);
      };

      animate();

      return () => {
        window.removeEventListener('resize', resizeCanvas);
      };
    }
  }, [isNeuroMode]);

  // Filter posts
  useEffect(() => {
    let filtered = blogPosts;
    
    if (activeCategory !== "All") {
      filtered = filtered.filter(post => post.category === activeCategory);
    }
    
    if (searchTerm) {
      filtered = filtered.filter(post => 
        post.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        post.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
        post.tags.some(tag => tag.name.toLowerCase().includes(searchTerm.toLowerCase()))
      );
    }
    
    setFilteredPosts(filtered);
  }, [activeCategory, searchTerm, blogPosts]);

  // Difficulty colors
  const getDifficultyColor = (difficulty) => {
    switch (difficulty) {
      case 'expert': return 'from-red-500 to-pink-600';
      case 'advanced': return 'from-orange-500 to-red-500';
      case 'intermediate': return 'from-yellow-500 to-orange-500';
      default: return 'from-green-500 to-blue-500';
    }
  };

  // Format date
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('vi-VN', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  // 🔥 HOLOGRAPHIC BLOG CARD - Card bài viết với hiệu ứng holographic cực đỉnh
  const HolographicBlogCard = ({ post, index }) => {
    const [isHovered, setIsHovered] = useState(false);
    const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
    const cardRef = useRef(null);

    const handleMouseMove = (e) => {
      if (cardRef.current) {
        const rect = cardRef.current.getBoundingClientRect();
        const x = (e.clientX - rect.left) / rect.width;
        const y = (e.clientY - rect.top) / rect.height;
        setMousePosition({ x, y });
      }
    };

    return (
      <motion.article
        ref={cardRef}
        className="group relative holographic-blog-card cursor-pointer"
        variants={{
          hidden: { opacity: 0, y: 50, rotateX: -15 },
          visible: {
            opacity: 1,
            y: 0,
            rotateX: 0,
            transition: {
              duration: 0.6,
              delay: index * 0.1,
              ease: "easeOut"
            }
          }
        }}
        style={{
          transform: isHovered 
            ? `perspective(1000px) rotateX(${(mousePosition.y - 0.5) * 8}deg) rotateY(${(mousePosition.x - 0.5) * 8}deg) scale3d(1.03, 1.03, 1.03)`
            : 'perspective(1000px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)',
          transition: 'transform 0.3s ease-out'
        }}
        onMouseMove={handleMouseMove}
        onHoverStart={() => setIsHovered(true)}
        onHoverEnd={() => setIsHovered(false)}
        onClick={() => setSelectedPost(post)}
      >
        {/* Holographic Background */}
        <div className="absolute inset-0 bg-gradient-to-br from-white/10 via-white/5 to-transparent rounded-3xl backdrop-blur-xl border border-white/20 shadow-2xl">
          <div className="absolute inset-0 bg-gradient-to-br from-blue-500/10 via-purple-500/10 to-cyan-500/10 rounded-3xl opacity-60" />
          <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent rounded-3xl" />
        </div>

        {/* Status Badges */}
        <div className="absolute top-6 left-6 z-20 flex flex-wrap gap-2">
          {post.isFeatured && (
            <div className="px-3 py-1 bg-gradient-to-r from-yellow-500 to-orange-500 rounded-full text-white text-xs font-bold shadow-lg">
              <FontAwesomeIcon icon={faStar} className="mr-1" />
              FEATURED
            </div>
          )}
          {post.isPopular && (
            <div className="px-3 py-1 bg-gradient-to-r from-red-500 to-pink-500 rounded-full text-white text-xs font-bold shadow-lg">
              <FontAwesomeIcon icon={faFire} className="mr-1" />
              HOT
            </div>
          )}
        </div>

        {/* Difficulty Badge */}
        <div className={`absolute top-6 right-6 z-20 px-3 py-1 bg-gradient-to-r ${getDifficultyColor(post.difficulty)} rounded-full text-white text-xs font-bold shadow-lg`}>
          {post.difficulty.toUpperCase()}
        </div>

        {/* Thumbnail Area */}
        <div className="relative h-48 bg-gradient-to-br from-blue-600/20 via-purple-600/20 to-cyan-600/20 rounded-t-3xl overflow-hidden">
          {/* Category Icon Background */}
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="w-20 h-20 bg-white/10 rounded-2xl flex items-center justify-center backdrop-blur-sm border border-white/20">
              <FontAwesomeIcon 
                icon={categories.find(c => c.name === post.category)?.icon || faBookOpen} 
                className="text-4xl text-white/80" 
              />
            </div>
          </div>

          {/* Tags Floating */}
          <div className="absolute bottom-4 left-4 right-4">
            <div className="flex flex-wrap gap-2">
              {post.tags.slice(0, 3).map((tag, i) => (
                <motion.div
                  key={i}
                  className="px-2 py-1 bg-black/40 backdrop-blur-sm border border-white/20 rounded-lg text-xs text-white font-medium flex items-center"
                  initial={{ opacity: 0, scale: 0 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: index * 0.1 + i * 0.1 }}
                >
                  <FontAwesomeIcon icon={tag.icon} className="mr-1" style={{ color: tag.color }} />
                  {tag.name}
                </motion.div>
              ))}
              {post.tags.length > 3 && (
                <div className="px-2 py-1 bg-black/40 backdrop-blur-sm border border-white/20 rounded-lg text-xs text-gray-300">
                  +{post.tags.length - 3}
                </div>
              )}
            </div>
          </div>

          {/* Hover Overlay */}
          <motion.div
            className="absolute inset-0 bg-black/80 flex items-center justify-center"
            initial={{ opacity: 0 }}
            animate={{ opacity: isHovered ? 1 : 0 }}
            transition={{ duration: 0.3 }}
          >
            <motion.div
              className="w-16 h-16 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center text-white shadow-xl"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
            >
              <FontAwesomeIcon icon={faBookOpen} className="text-xl" />
            </motion.div>
          </motion.div>
        </div>

        {/* Content */}
        <div className="relative z-10 p-8">
          {/* Header Info */}
          <div className="flex items-center justify-between text-sm text-gray-400 mb-4">
            <div className="flex items-center">
              <FontAwesomeIcon icon={faCalendarAlt} className="mr-2" />
              {formatDate(post.publishedAt)}
            </div>
            <div className="flex items-center">
              <FontAwesomeIcon icon={faClock} className="mr-2" />
              {post.readTime}
            </div>
          </div>

          {/* Title & Subtitle */}
          <div className="mb-4">
            <h3 className="text-xl font-bold text-white mb-2 group-hover:text-transparent group-hover:bg-gradient-to-r group-hover:from-blue-400 group-hover:to-purple-400 group-hover:bg-clip-text transition-all duration-300 line-clamp-2">
              {post.title}
            </h3>
            <p className="text-blue-400 font-medium text-sm">{post.subtitle}</p>
          </div>

          {/* Description */}
          <p className="text-gray-300 text-sm leading-relaxed mb-6 line-clamp-3">
            {post.description}
          </p>

          {/* Metrics */}
          <div className="grid grid-cols-4 gap-2 mb-6 text-xs">
            <div className="text-center">
              <div className="flex items-center justify-center mb-1">
                <FontAwesomeIcon icon={faEye} className="text-blue-400 mr-1" />
                <span className="text-white font-bold">{post.metrics.views.toLocaleString()}</span>
              </div>
              <div className="text-gray-400">Views</div>
            </div>
            <div className="text-center">
              <div className="flex items-center justify-center mb-1">
                <FontAwesomeIcon icon={faHeart} className="text-red-400 mr-1" />
                <span className="text-white font-bold">{post.metrics.likes}</span>
              </div>
              <div className="text-gray-400">Likes</div>
            </div>
            <div className="text-center">
              <div className="flex items-center justify-center mb-1">
                <FontAwesomeIcon icon={faComment} className="text-green-400 mr-1" />
                <span className="text-white font-bold">{post.metrics.comments}</span>
              </div>
              <div className="text-gray-400">Comments</div>
            </div>
            <div className="text-center">
              <div className="flex items-center justify-center mb-1">
                <FontAwesomeIcon icon={faBookmark} className="text-yellow-400 mr-1" />
                <span className="text-white font-bold">{post.metrics.bookmarks}</span>
              </div>
              <div className="text-gray-400">Saved</div>
            </div>
          </div>

          {/* Reading Progress */}
          <div className="mb-6">
            <div className="flex justify-between items-center mb-2">
              <span className="text-xs text-gray-400">Engagement Rate</span>
              <span className="text-xs text-white font-bold">{post.readingStats.engagement}%</span>
            </div>
            <div className="w-full bg-white/10 rounded-full h-2">
              <motion.div
                className="h-2 bg-gradient-to-r from-green-500 to-blue-500 rounded-full"
                initial={{ width: 0 }}
                animate={{ width: `${post.readingStats.engagement}%` }}
                transition={{ delay: index * 0.1 + 0.5, duration: 1 }}
              />
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex space-x-3">
            <motion.button
              className="flex-1 bg-gradient-to-r from-blue-500 to-purple-600 text-white py-3 px-4 rounded-xl font-semibold hover:from-blue-600 hover:to-purple-700 transition-all duration-300 shadow-lg"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={(e) => {
                e.stopPropagation();
                setSelectedPost(post);
              }}
            >
              <FontAwesomeIcon icon={faBookOpen} className="mr-2" />
              Đọc ngay
            </motion.button>
            <motion.button
              className="px-4 py-3 bg-white/10 border border-white/20 text-white rounded-xl hover:bg-white/20 transition-all duration-300"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={(e) => {
                e.stopPropagation();
                // Bookmark functionality
              }}
            >
              <FontAwesomeIcon icon={faBookmark} />
            </motion.button>
            <motion.button
              className="px-4 py-3 bg-white/10 border border-white/20 text-white rounded-xl hover:bg-white/20 transition-all duration-300"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={(e) => {
                e.stopPropagation();
                // Share functionality
              }}
            >
              <FontAwesomeIcon icon={faShare} />
            </motion.button>
          </div>
        </div>
      </motion.article>
    );
  };

  // 📖 BLOG POST DETAIL MODAL - Modal chi tiết bài viết cực đỉnh
  const BlogPostModal = ({ post }) => {
    if (!post) return null;

    return (
      <motion.div
        className="fixed inset-0 z-50 flex items-center justify-center p-4"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
      >
        {/* Backdrop */}
        <motion.div
          className="absolute inset-0 bg-black/90 backdrop-blur-xl"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={() => setSelectedPost(null)}
        />

        {/* Modal Content */}
        <motion.div
          className="relative max-w-4xl w-full max-h-[90vh] overflow-y-auto bg-gradient-to-br from-gray-900/95 via-blue-900/95 to-purple-900/95 backdrop-blur-xl rounded-3xl border border-white/20 shadow-2xl"
          initial={{ scale: 0.5, opacity: 0, y: 100 }}
          animate={{ scale: 1, opacity: 1, y: 0 }}
          exit={{ scale: 0.5, opacity: 0, y: 100 }}
          transition={{ type: "spring", damping: 20, stiffness: 300 }}
        >
          {/* Close Button */}
          <button
            className="absolute top-6 right-6 z-10 w-12 h-12 bg-white/10 hover:bg-white/20 rounded-full flex items-center justify-center text-white transition-all duration-300"
            onClick={() => setSelectedPost(null)}
          >
            ×
          </button>

          <div className="p-8">
            {/* Header */}
            <div className="text-center mb-8">
              <div className="flex items-center justify-center gap-4 mb-4">
                {post.isFeatured && (
                  <span className="px-3 py-1 bg-gradient-to-r from-yellow-500 to-orange-500 rounded-full text-white text-xs font-bold">
                    <FontAwesomeIcon icon={faStar} className="mr-1" />
                    FEATURED
                  </span>
                )}
                <span className={`px-3 py-1 bg-gradient-to-r ${getDifficultyColor(post.difficulty)} rounded-full text-white text-xs font-bold`}>
                  {post.difficulty.toUpperCase()}
                </span>
              </div>
              
              <h1 className="text-3xl md:text-4xl font-bold text-white mb-2">{post.title}</h1>
              <p className="text-xl text-blue-400 mb-6">{post.subtitle}</p>
              
              {/* Author & Meta */}
              <div className="flex items-center justify-center space-x-8 text-sm text-gray-400">
                <div className="flex items-center">
                  <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center text-white font-bold mr-2">
                    {post.author.name.charAt(0)}
                  </div>
                  <div>
                    <div className="text-white font-medium">{post.author.name}</div>
                    <div className="text-xs">{post.author.title}</div>
                  </div>
                </div>
                <span>📅 {formatDate(post.publishedAt)}</span>
                <span>⏱️ {post.readTime}</span>
                <span>📊 {post.category}</span>
              </div>
            </div>

            {/* Content */}
            <div className="mb-8">
              <h3 className="text-xl font-bold text-white mb-4">📖 Nội dung chi tiết</h3>
              <p className="text-gray-300 leading-relaxed mb-6">{post.longDescription}</p>
              
              {/* Content Stats */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
                <div className="bg-white/5 border border-white/10 rounded-xl p-4 text-center">
                  <div className="text-2xl font-bold text-blue-400 mb-1">{post.codeSnippets}</div>
                  <div className="text-sm text-gray-400">Code Examples</div>
                </div>
                <div className="bg-white/5 border border-white/10 rounded-xl p-4 text-center">
                  <div className="text-2xl font-bold text-green-400 mb-1">{post.images}</div>
                  <div className="text-sm text-gray-400">Illustrations</div>
                </div>
                <div className="bg-white/5 border border-white/10 rounded-xl p-4 text-center">
                  <div className="text-2xl font-bold text-purple-400 mb-1">{post.readingStats.avgTime}m</div>
                  <div className="text-sm text-gray-400">Avg Read Time</div>
                </div>
                <div className="bg-white/5 border border-white/10 rounded-xl p-4 text-center">
                  <div className="text-2xl font-bold text-orange-400 mb-1">{post.estimatedSize}</div>
                  <div className="text-sm text-gray-400">Article Size</div>
                </div>
              </div>
            </div>

            {/* Tags */}
            <div className="mb-8">
              <h3 className="text-xl font-bold text-white mb-4">🏷️ Công nghệ & Chủ đề</h3>
              <div className="flex flex-wrap gap-3">
                {post.tags.map((tag, index) => (
                  <motion.div
                    key={index}
                    className="px-4 py-2 bg-white/5 border border-white/10 rounded-xl hover:bg-white/10 transition-all duration-300 flex items-center"
                    initial={{ opacity: 0, scale: 0 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: index * 0.1 }}
                  >
                    <FontAwesomeIcon icon={tag.icon} className="mr-2" style={{ color: tag.color }} />
                    <span className="text-white font-medium">{tag.name}</span>
                  </motion.div>
                ))}
              </div>
            </div>

            {/* Metrics */}
            <div className="mb-8">
              <h3 className="text-xl font-bold text-white mb-4">📊 Thống kê bài viết</h3>
              <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
                {Object.entries(post.metrics).map(([key, value], index) => (
                  <motion.div
                    key={key}
                    className="bg-white/5 border border-white/10 rounded-xl p-4 text-center"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                  >
                    <div className="text-2xl font-bold text-white mb-1">{value.toLocaleString()}</div>
                    <div className="text-sm text-gray-400 capitalize">{key}</div>
                  </motion.div>
                ))}
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 pt-6 border-t border-white/10">
              <motion.button
                className="flex-1 bg-gradient-to-r from-blue-500 to-purple-600 text-white py-4 px-6 rounded-xl font-semibold hover:from-blue-600 hover:to-purple-700 transition-all duration-300 shadow-lg"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <FontAwesomeIcon icon={faBookOpen} className="mr-2" />
                Đọc toàn bộ bài viết
              </motion.button>
              <motion.button
                className="flex-1 bg-gradient-to-r from-green-500 to-blue-500 text-white py-4 px-6 rounded-xl font-semibold hover:from-green-600 hover:to-blue-600 transition-all duration-300 shadow-lg"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <FontAwesomeIcon icon={faGithub} className="mr-2" />
                Xem Source Code
              </motion.button>
            </div>
          </div>
        </motion.div>
      </motion.div>
    );
  };

  return (
    <section className="relative py-20 lg:py-32 overflow-hidden">
      {/* Neural Network Background */}
      {isNeuroMode && (
        <canvas
          ref={canvasRef}
          className="absolute inset-0 z-0 opacity-30"
          style={{ mixBlendMode: 'screen' }}
        />
      )}

      {/* Background Gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-gray-900 via-purple-900/20 to-blue-900/20" />
      <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />

      {/* Floating Particles */}
      <div className="absolute inset-0 overflow-hidden">
        {[...Array(15)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-3 h-3 bg-blue-400/20 rounded-full"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
            animate={{
              y: [0, -50, 0],
              opacity: [0.2, 1, 0.2],
              scale: [1, 1.5, 1],
            }}
            transition={{
              duration: 4 + Math.random() * 2,
              repeat: Infinity,
              delay: Math.random() * 2,
            }}
          />
        ))}
      </div>

      <div ref={ref} className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* 🎯 LEGENDARY HEADER - Header với hiệu ứng đặc biệt */}
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: -50 }}
          animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: -50 }}
          transition={{ duration: 0.8 }}
        >
          <motion.div
            className="inline-flex items-center justify-center px-6 py-3 bg-gradient-to-r from-purple-500/20 to-blue-500/20 border border-purple-500/30 rounded-full mb-6"
            initial={{ scale: 0 }}
            animate={inView ? { scale: 1 } : { scale: 0 }}
            transition={{ delay: 0.2, type: "spring", damping: 20 }}
          >
            <FontAwesomeIcon icon={faBookOpen} className="text-purple-400 mr-2" />
            <span className="text-purple-400 font-semibold">TECH KNOWLEDGE BASE</span>
          </motion.div>

          <motion.h2
            className="text-5xl md:text-6xl lg:text-7xl font-bold mb-6"
            initial={{ opacity: 0, scale: 0.5 }}
            animate={inView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.5 }}
            transition={{ delay: 0.4, duration: 0.8 }}
          >
            <span className="bg-gradient-to-r from-purple-400 via-blue-400 to-cyan-400 bg-clip-text text-transparent">
              📚 Neural Blog
            </span>
            <br />
            <span className="text-white">Archives</span>
          </motion.h2>

          <motion.p
            className="text-xl md:text-2xl text-gray-300 max-w-4xl mx-auto mb-8"
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ delay: 0.6 }}
          >
            Khám phá <span className="text-transparent bg-gradient-to-r from-purple-400 to-blue-400 bg-clip-text font-semibold">kiến thức công nghệ tiên tiến</span> và insights về programming, AI, blockchain trong kỷ nguyên số
          </motion.p>

          {/* Control Panel */}
          <motion.div
            className="flex flex-wrap items-center justify-center gap-4"
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ delay: 0.8 }}
          >
            {/* Search */}
            <div className="relative">
              <FontAwesomeIcon icon={faSearch} className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" />
              <input
                type="text"
                placeholder="Tìm kiếm bài viết..."
                className="pl-12 pr-4 py-3 w-64 bg-white/10 border border-white/20 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:border-purple-500 focus:bg-white/20 transition-all duration-300"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>

            {/* Neural Mode Toggle */}
            <motion.button
              className={`px-6 py-3 rounded-xl font-semibold transition-all duration-300 ${
                isNeuroMode 
                  ? 'bg-gradient-to-r from-purple-500 to-blue-500 text-white' 
                  : 'bg-white/10 border border-white/20 text-white hover:bg-white/20'
              }`}
              onClick={() => setIsNeuroMode(!isNeuroMode)}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              🧠 Neural Mode
            </motion.button>

            {/* Reading Mode Toggle */}
            <motion.button
              className={`px-6 py-3 rounded-xl font-semibold transition-all duration-300 ${
                readingMode 
                  ? 'bg-gradient-to-r from-green-500 to-blue-500 text-white' 
                  : 'bg-white/10 border border-white/20 text-white hover:bg-white/20'
              }`}
              onClick={() => setReadingMode(!readingMode)}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              📖 Reading Mode
            </motion.button>
          </motion.div>
        </motion.div>

        {/* 🏷️ CATEGORY FILTERS - Bộ lọc danh mục với hiệu ứng đặc biệt */}
        <motion.div
          className="flex flex-wrap justify-center gap-4 mb-16"
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ delay: 1 }}
        >
          {categories.map((category, index) => (
            <motion.button
              key={category.name}
              onClick={() => setActiveCategory(category.name)}
              className={`group relative px-6 py-4 rounded-2xl font-semibold transition-all duration-500 ${
                activeCategory === category.name
                  ? 'bg-gradient-to-r from-purple-500 to-blue-600 text-white shadow-2xl scale-105'
                  : 'bg-white/5 text-gray-400 border border-white/10 hover:bg-white/10 hover:text-white hover:border-white/30'
              }`}
              initial={{ opacity: 0, scale: 0 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 1 + index * 0.1 }}
              whileHover={{ scale: 1.05, y: -2 }}
              whileTap={{ scale: 0.95 }}
            >
              {/* Icon */}
              <FontAwesomeIcon icon={category.icon} className="mr-3" />
              {category.name}
              
              {/* Count Badge */}
              <span className={`ml-2 px-2 py-1 rounded-full text-xs font-bold ${
                activeCategory === category.name
                  ? 'bg-white/20 text-white'
                  : 'bg-white/10 text-gray-500 group-hover:bg-white/20 group-hover:text-gray-300'
              }`}>
                {category.count}
              </span>

              {/* Hover Effect */}
              <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-purple-500/20 to-blue-500/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 -z-10" />
            </motion.button>
          ))}
        </motion.div>

        {/* 📚 BLOG POSTS SHOWCASE - Khu vực hiển thị bài viết */}
        <AnimatePresence mode="wait">
          <motion.div
            key={`${activeCategory}-${activeView}`}
            className="grid lg:grid-cols-2 xl:grid-cols-3 gap-8"
            variants={{
              hidden: { opacity: 0 },
              visible: {
                opacity: 1,
                transition: {
                  delayChildren: 0.2,
                  staggerChildren: 0.1
                }
              }
            }}
            initial="hidden"
            animate="visible"
            exit="hidden"
          >
            {filteredPosts.length > 0 ? (
              filteredPosts.map((post, index) => (
                <HolographicBlogCard key={post.id} post={post} index={index} />
              ))
            ) : (
              <motion.div
                className="col-span-full text-center py-20"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
              >
                <FontAwesomeIcon icon={faSearch} className="text-6xl text-gray-600 mb-4" />
                <h3 className="text-2xl font-bold text-white mb-2">Không tìm thấy bài viết</h3>
                <p className="text-gray-400">Thử thay đổi từ khóa tìm kiếm hoặc danh mục khác</p>
              </motion.div>
            )}
          </motion.div>
        </AnimatePresence>

        {/* 🎯 CALL TO ACTION - Kêu gọi hành động */}
        <motion.div
          className="text-center mt-20"
          initial={{ opacity: 0, y: 50 }}
          animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
          transition={{ delay: 1.5 }}
        >
          <motion.div
            className="inline-flex flex-col sm:flex-row items-center gap-6"
            whileHover={{ scale: 1.02 }}
          >
            <motion.button
              className="group inline-flex items-center px-8 py-4 bg-gradient-to-r from-purple-500 to-blue-600 text-white rounded-2xl font-bold text-lg shadow-2xl hover:from-purple-600 hover:to-blue-700 transition-all duration-300"
              whileHover={{ scale: 1.05, boxShadow: "0 20px 40px rgba(147, 51, 234, 0.3)" }}
              whileTap={{ scale: 0.95 }}
            >
              <FontAwesomeIcon icon={faBookOpen} className="mr-3 text-xl group-hover:rotate-12 transition-transform duration-300" />
              Đăng ký Newsletter
              <motion.div
                className="ml-2"
                animate={{ x: [0, 5, 0] }}
                transition={{ duration: 1.5, repeat: Infinity }}
              >
                →
              </motion.div>
            </motion.button>

            <motion.button
              className="group inline-flex items-center px-8 py-4 bg-white/10 border border-white/20 text-white rounded-2xl font-bold text-lg hover:bg-white/20 transition-all duration-300"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <FontAwesomeIcon icon={faRocket} className="mr-3 text-xl group-hover:rotate-12 transition-transform duration-300" />
              Suggest a Topic
            </motion.button>
          </motion.div>

          {/* Stats */}
          <motion.div
            className="grid grid-cols-2 md:grid-cols-4 gap-8 mt-12 max-w-3xl mx-auto"
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ delay: 1.7 }}
          >
            {[
              { icon: faBookOpen, value: "50+", label: "Tech Articles" },
              { icon: faBrain, value: "1M+", label: "Knowledge Shared" },
              { icon: faCode, value: "500+", label: "Code Examples" },
              { icon: faRocket, value: "24/7", label: "Learning Journey" }
            ].map((stat, index) => (
              <motion.div
                key={index}
                className="text-center group"
                initial={{ opacity: 0, scale: 0 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 1.7 + index * 0.1 }}
              >
                <div className="w-16 h-16 bg-gradient-to-r from-purple-500/20 to-blue-500/20 border border-purple-500/30 rounded-full flex items-center justify-center mx-auto mb-3 group-hover:scale-110 transition-transform duration-300">
                  <FontAwesomeIcon icon={stat.icon} className="text-2xl text-purple-400" />
                </div>
                <div className="text-2xl font-bold text-white mb-1">{stat.value}</div>
                <div className="text-sm text-gray-400">{stat.label}</div>
              </motion.div>
            ))}
          </motion.div>
        </motion.div>
      </div>

      {/* 📖 BLOG POST DETAIL MODAL - Modal chi tiết bài viết */}
      <AnimatePresence>
        {selectedPost && <BlogPostModal post={selectedPost} />}
      </AnimatePresence>
    </section>
  );
};

export default Blog;
