import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence, useAnimation } from 'framer-motion';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { 
  faExternalLinkAlt, 
  faCode, 
  faEye, 
  faFilter, 
  faStar, 
  faRocket,
  faPlay,
  faGlobe,
  faMobile,
  faDatabase,
  faBrain,
  faChartLine,
  faShieldAlt,
  faSearch,
  faHeart,
  faDownload,
  faShareAlt
} from '@fortawesome/free-solid-svg-icons';
import { 
  faGithub, 
  faReact, 
  faNodeJs, 
  faVuejs, 
  faPython,
  faAws,
  faDocker
} from '@fortawesome/free-brands-svg-icons';
import { useInView } from 'react-intersection-observer';

const Projects = () => {
  const [ref, inView] = useInView({
    threshold: 0.1,
    triggerOnce: true,
  });

  const [selectedProject, setSelectedProject] = useState(null);
  const [isMatrixMode, setIsMatrixMode] = useState(false);
  const [activeView, setActiveView] = useState('grid'); // 'grid', '3d', 'timeline'
  const canvasRef = useRef(null);
  const controls = useAnimation();

  // 🚀 LEGENDARY PROJECTS DATA - Thông tin dự án ultra-premium
  const [projects] = useState([
    {
      id: 1,
      title: "NeuraLink Portfolio",
      subtitle: "AI-Powered Digital Experience",
      description: "Nền tảng portfolio thế hệ mới với AI chatbot, machine learning analytics, và real-time collaboration. Tích hợp blockchain để verify skill và achievements.",
      longDescription: "Một hệ sinh thái hoàn chỉnh cho việc showcase kỹ năng và dự án với công nghệ AI tiên tiến. Platform này sử dụng deep learning để phân tích visitor behavior, tự động optimize content, và cung cấp insights thông minh cho career development.",
      imageUrl: "/images/neuralink-portfolio.jpg",
      demoUrl: "https://neuralink.nhdinh.dev",
      sourceUrl: "https://github.com/nhdinhdev03/neuralink-portfolio",
      category: "AI/ML",
      status: "live",
      difficulty: "legendary",
      completionRate: 98,
      likes: 2847,
      downloads: 1532,
      views: 15420,
      technologies: [
        { name: "React 18", icon: faReact, level: 95, color: "#61DAFB" },
        { name: "TensorFlow", icon: faBrain, level: 92, color: "#FF6F00" },
        { name: "Node.js", icon: faNodeJs, level: 88, color: "#339933" },
        { name: "WebGL", icon: faRocket, level: 85, color: "#990000" },
        { name: "Blockchain", icon: faShieldAlt, level: 78, color: "#F7931E" }
      ],
      features: [
        "🧠 AI-Powered Content Generation",
        "🌐 Real-time Collaboration",
        "🔒 Blockchain Verification",
        "📊 Advanced Analytics",
        "🎨 Dynamic Theme Engine"
      ],
      metrics: {
        performance: 96,
        security: 94,
        accessibility: 98,
        seo: 92
      },
      teamSize: 1,
      duration: "6 months",
      highlights: [
        "Featured on GitHub Trending",
        "AI Model Accuracy: 94.7%",
        "Sub-second Load Times",
        "99.9% Uptime"
      ]
    },
    {
      id: 2,
      title: "Quantum E-Commerce",
      subtitle: "Next-Gen Shopping Experience",
      description: "Platform thương mại điện tử với AR/VR integration, quantum-inspired algorithms cho recommendation engine, và blockchain-based loyalty system.",
      longDescription: "Một cuộc cách mạng trong thương mại điện tử với công nghệ AR/VR cho virtual try-on, AI recommendations cực kỳ chính xác, và hệ thống thanh toán cryptocurrency tích hợp.",
      imageUrl: "/images/quantum-ecommerce.jpg",
      demoUrl: "https://quantum.nhdinh.dev",
      sourceUrl: "https://github.com/nhdinhdev03/quantum-ecommerce",
      category: "Full-Stack",
      status: "live",
      difficulty: "epic",
      completionRate: 95,
      likes: 1984,
      downloads: 876,
      views: 12350,
      technologies: [
        { name: "Vue.js 3", icon: faVuejs, level: 93, color: "#4FC08D" },
        { name: "Three.js", icon: faRocket, level: 89, color: "#000000" },
        { name: "Express", icon: faNodeJs, level: 91, color: "#339933" },
        { name: "MongoDB", icon: faDatabase, level: 87, color: "#47A248" },
        { name: "Docker", icon: faDocker, level: 85, color: "#2496ED" }
      ],
      features: [
        "🥽 AR/VR Virtual Try-On",
        "🤖 Quantum ML Recommendations",
        "💎 Blockchain Loyalty Points",
        "📱 Progressive Web App",
        "🌍 Multi-language Support"
      ],
      metrics: {
        performance: 94,
        security: 96,
        accessibility: 91,
        seo: 89
      },
      teamSize: 2,
      duration: "8 months",
      highlights: [
        "AR Features Used by 78% Users",
        "45% Increase in Conversion",
        "Real-time 3D Rendering",
        "Crypto Payment Integration"
      ]
    },
    {
      id: 3,
      title: "CyberSec Dashboard",
      subtitle: "Advanced Security Analytics",
      description: "Dashboard bảo mật thế hệ mới với real-time threat detection, AI-powered anomaly detection, và blockchain audit trails.",
      longDescription: "Hệ thống giám sát và phân tích bảo mật toàn diện với khả năng detect threats trong thời gian thực, machine learning để identify patterns, và visualization tools cực kỳ intuitive.",
      imageUrl: "/images/cybersec-dashboard.jpg",
      demoUrl: "https://cybersec.nhdinh.dev",
      sourceUrl: "https://github.com/nhdinhdev03/cybersec-dashboard",
      category: "Security",
      status: "live",
      difficulty: "legendary",
      completionRate: 92,
      likes: 3421,
      downloads: 2156,
      views: 18750,
      technologies: [
        { name: "React", icon: faReact, level: 96, color: "#61DAFB" },
        { name: "Python", icon: faPython, level: 94, color: "#3776AB" },
        { name: "TensorFlow", icon: faBrain, level: 91, color: "#FF6F00" },
        { name: "AWS", icon: faAws, level: 88, color: "#232F3E" },
        { name: "Kubernetes", icon: faRocket, level: 84, color: "#326CE5" }
      ],
      features: [
        "🛡️ Real-time Threat Detection",
        "🧠 AI Anomaly Analysis",
        "📊 Interactive Visualizations",
        "🔐 Zero-Trust Architecture",
        "⚡ Sub-second Response Time"
      ],
      metrics: {
        performance: 98,
        security: 99,
        accessibility: 94,
        seo: 87
      },
      teamSize: 3,
      duration: "10 months",
      highlights: [
        "99.7% Threat Detection Rate",
        "0.02% False Positive Rate",
        "Enterprise Security Certified",
        "ISO 27001 Compliant"
      ]
    },
    {
      id: 4,
      title: "MetaVerse Social",
      subtitle: "3D Social Platform",
      description: "Nền tảng mạng xã hội 3D với virtual worlds, NFT integration, và real-time voice/video communication trong môi trường 3D.",
      longDescription: "Một metaverse hoàn chỉnh nơi users có thể tạo avatars, build virtual spaces, trade NFTs, và socialize trong môi trường 3D immersive với physics engine realistic.",
      imageUrl: "/images/metaverse-social.jpg",
      demoUrl: "https://metaverse.nhdinh.dev",
      sourceUrl: "https://github.com/nhdinhdev03/metaverse-social",
      category: "3D/VR",
      status: "beta",
      difficulty: "mythical",
      completionRate: 88,
      likes: 5673,
      downloads: 3421,
      views: 28940,
      technologies: [
        { name: "Three.js", icon: faRocket, level: 97, color: "#000000" },
        { name: "WebXR", icon: faGlobe, level: 92, color: "#FF6B6B" },
        { name: "Socket.io", icon: faNodeJs, level: 95, color: "#339933" },
        { name: "WebGL", icon: faRocket, level: 93, color: "#990000" },
        { name: "WebRTC", icon: faPlay, level: 89, color: "#4285F4" }
      ],
      features: [
        "🌐 Immersive 3D Worlds",
        "👥 Real-time Multiplayer",
        "🎨 NFT Avatar System",
        "🗣️ Spatial Audio Chat",
        "🏗️ World Building Tools"
      ],
      metrics: {
        performance: 91,
        security: 93,
        accessibility: 87,
        seo: 85
      },
      teamSize: 4,
      duration: "12 months",
      highlights: [
        "10K+ Concurrent Users",
        "500+ Custom Worlds",
        "VR/AR Compatible",
        "Cross-platform Support"
      ]
    },
    {
      id: 5,
      title: "Neural Analytics",
      subtitle: "AI Data Intelligence",
      description: "Platform phân tích dữ liệu với neural networks, predictive modeling, và real-time data visualization với khả năng process big data.",
      longDescription: "Hệ thống analytics cực kỳ powerful với machine learning pipelines, real-time data processing, và AI-generated insights để help businesses make data-driven decisions.",
      imageUrl: "/images/neural-analytics.jpg",
      demoUrl: "https://analytics.nhdinh.dev",
      sourceUrl: "https://github.com/nhdinhdev03/neural-analytics",
      category: "AI/ML",
      status: "live",
      difficulty: "epic",
      completionRate: 96,
      likes: 2156,
      downloads: 1234,
      views: 16780,
      technologies: [
        { name: "Python", icon: faPython, level: 98, color: "#3776AB" },
        { name: "TensorFlow", icon: faBrain, level: 95, color: "#FF6F00" },
        { name: "React", icon: faReact, level: 92, color: "#61DAFB" },
        { name: "Apache Spark", icon: faChartLine, level: 88, color: "#E25A1C" },
        { name: "Elasticsearch", icon: faSearch, level: 86, color: "#005571" }
      ],
      features: [
        "🧠 Deep Learning Models",
        "📊 Real-time Dashboards",
        "🔮 Predictive Analytics",
        "📈 Big Data Processing",
        "🤖 Auto ML Pipelines"
      ],
      metrics: {
        performance: 95,
        security: 92,
        accessibility: 96,
        seo: 90
      },
      teamSize: 2,
      duration: "7 months",
      highlights: [
        "Processes 1TB+ Daily",
        "95.8% Prediction Accuracy",
        "Real-time Insights",
        "Enterprise Ready"
      ]
    },
    {
      id: 6,
      title: "Blockchain DeFi",
      subtitle: "Decentralized Finance Platform",
      description: "Platform DeFi hoàn chỉnh với smart contracts, yield farming, NFT marketplace, và cross-chain bridge functionality.",
      longDescription: "Một ecosystem DeFi comprehensive với các tính năng lending/borrowing, staking, governance token, và advanced trading tools built trên multiple blockchains.",
      imageUrl: "/images/blockchain-defi.jpg",
      demoUrl: "https://defi.nhdinh.dev",
      sourceUrl: "https://github.com/nhdinhdev03/blockchain-defi",
      category: "Blockchain",
      status: "live",
      difficulty: "legendary",
      completionRate: 94,
      likes: 4892,
      downloads: 2876,
      views: 32150,
      technologies: [
        { name: "Solidity", icon: faShieldAlt, level: 94, color: "#363636" },
        { name: "Web3.js", icon: faGlobe, level: 92, color: "#F16822" },
        { name: "React", icon: faReact, level: 95, color: "#61DAFB" },
        { name: "Node.js", icon: faNodeJs, level: 90, color: "#339933" },
        { name: "IPFS", icon: faDatabase, level: 87, color: "#65C2CB" }
      ],
      features: [
        "💰 Yield Farming Pools",
        "🏪 NFT Marketplace",
        "🌉 Cross-chain Bridge",
        "🗳️ DAO Governance",
        "📱 Mobile DApp"
      ],
      metrics: {
        performance: 93,
        security: 98,
        accessibility: 89,
        seo: 88
      },
      teamSize: 3,
      duration: "9 months",
      highlights: [
        "$50M+ TVL",
        "Zero Security Incidents",
        "Multi-chain Support",
        "DAO Governance Active"
      ]
    }
  ]);

  const [categories] = useState([
    { name: "All", icon: faGlobe, count: projects.length },
    { name: "AI/ML", icon: faBrain, count: projects.filter(p => p.category === "AI/ML").length },
    { name: "Full-Stack", icon: faRocket, count: projects.filter(p => p.category === "Full-Stack").length },
    { name: "Security", icon: faShieldAlt, count: projects.filter(p => p.category === "Security").length },
    { name: "3D/VR", icon: faGlobe, count: projects.filter(p => p.category === "3D/VR").length },
    { name: "Blockchain", icon: faShieldAlt, count: projects.filter(p => p.category === "Blockchain").length }
  ]);

  const [activeCategory, setActiveCategory] = useState("All");
  const [filteredProjects, setFilteredProjects] = useState(projects);
  const [searchTerm, setSearchTerm] = useState("");

  // Matrix Rain Effect
  useEffect(() => {
    if (isMatrixMode && canvasRef.current) {
      const canvas = canvasRef.current;
      const ctx = canvas.getContext('2d');
      
      const resizeCanvas = () => {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
      };
      
      resizeCanvas();
      window.addEventListener('resize', resizeCanvas);

      const matrix = "ABCDEFGHIJKLMNOPQRSTUVWXYZ123456789@#$%^&*()*&^%+-/~{[|`]}";
      const matrixArray = matrix.split("");
      const fontSize = 10;
      const columns = canvas.width / fontSize;
      const drops = [];

      for (let x = 0; x < columns; x++) {
        drops[x] = 1;
      }

      const draw = () => {
        ctx.fillStyle = 'rgba(0, 0, 0, 0.04)';
        ctx.fillRect(0, 0, canvas.width, canvas.height);
        
        ctx.fillStyle = '#0F4';
        ctx.font = fontSize + 'px monospace';

        for (let i = 0; i < drops.length; i++) {
          const text = matrixArray[Math.floor(Math.random() * matrixArray.length)];
          ctx.fillText(text, i * fontSize, drops[i] * fontSize);
          
          if (drops[i] * fontSize > canvas.height && Math.random() > 0.975) {
            drops[i] = 0;
          }
          drops[i]++;
        }
      };

      const interval = setInterval(draw, 35);
      return () => {
        clearInterval(interval);
        window.removeEventListener('resize', resizeCanvas);
      };
    }
  }, [isMatrixMode]);

  // Filter projects
  useEffect(() => {
    let filtered = projects;
    
    if (activeCategory !== "All") {
      filtered = filtered.filter(project => project.category === activeCategory);
    }
    
    if (searchTerm) {
      filtered = filtered.filter(project => 
        project.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        project.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
        project.technologies.some(tech => tech.name.toLowerCase().includes(searchTerm.toLowerCase()))
      );
    }
    
    setFilteredProjects(filtered);
  }, [activeCategory, searchTerm, projects]);

  // Difficulty colors
  const getDifficultyColor = (difficulty) => {
    switch (difficulty) {
      case 'legendary': return 'from-orange-500 to-red-600';
      case 'epic': return 'from-purple-500 to-pink-600';
      case 'mythical': return 'from-cyan-500 to-blue-600';
      default: return 'from-green-500 to-blue-600';
    }
  };

  // 🎯 HOLOGRAPHIC PROJECT CARD - Card dự án với hiệu ứng holographic cực đỉnh
  const HolographicProjectCard = ({ project, index }) => {
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
      <motion.div
        ref={cardRef}
        className="group relative holographic-card"
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
            ? `perspective(1000px) rotateX(${(mousePosition.y - 0.5) * 10}deg) rotateY(${(mousePosition.x - 0.5) * 10}deg) scale3d(1.05, 1.05, 1.05)`
            : 'perspective(1000px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)',
          transition: 'transform 0.3s ease-out'
        }}
        onMouseMove={handleMouseMove}
        onHoverStart={() => setIsHovered(true)}
        onHoverEnd={() => setIsHovered(false)}
        onClick={() => setSelectedProject(project)}
      >
        {/* Holographic Background */}
        <div className="absolute inset-0 bg-gradient-to-br from-white/10 via-white/5 to-transparent rounded-3xl backdrop-blur-xl border border-white/20 shadow-2xl">
          <div className="absolute inset-0 bg-gradient-to-br from-blue-500/10 via-purple-500/10 to-cyan-500/10 rounded-3xl opacity-60" />
          <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent rounded-3xl" />
        </div>

        {/* Difficulty Badge */}
        <div className={`absolute top-6 left-6 z-20 px-4 py-2 bg-gradient-to-r ${getDifficultyColor(project.difficulty)} rounded-full text-white text-sm font-bold shadow-lg`}>
          <FontAwesomeIcon icon={faStar} className="mr-2" />
          {project.difficulty.toUpperCase()}
        </div>

        {/* Status Badge */}
        <div className={`absolute top-6 right-6 z-20 px-3 py-1 rounded-full text-xs font-semibold ${
          project.status === 'live' ? 'bg-green-500/20 text-green-400 border border-green-500/30' :
          project.status === 'beta' ? 'bg-yellow-500/20 text-yellow-400 border border-yellow-500/30' :
          'bg-blue-500/20 text-blue-400 border border-blue-500/30'
        }`}>
          {project.status.toUpperCase()}
        </div>

        {/* Project Image Area */}
        <div className="relative h-64 bg-gradient-to-br from-blue-600/20 via-purple-600/20 to-cyan-600/20 rounded-t-3xl overflow-hidden">
          {/* Tech Stack Floating Icons */}
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="grid grid-cols-3 gap-4">
              {project.technologies.slice(0, 6).map((tech, i) => (
                <motion.div
                  key={i}
                  className="w-12 h-12 bg-white/10 rounded-xl flex items-center justify-center backdrop-blur-sm border border-white/20"
                  initial={{ scale: 0, rotate: -180 }}
                  animate={{ scale: 1, rotate: 0 }}
                  transition={{ delay: index * 0.1 + i * 0.1, duration: 0.5 }}
                  whileHover={{ scale: 1.2, rotate: 10 }}
                >
                  <FontAwesomeIcon icon={tech.icon} className="text-xl" style={{ color: tech.color }} />
                </motion.div>
              ))}
            </div>
          </div>

          {/* Hover Overlay */}
          <motion.div
            className="absolute inset-0 bg-black/80 flex items-center justify-center space-x-6"
            initial={{ opacity: 0 }}
            animate={{ opacity: isHovered ? 1 : 0 }}
            transition={{ duration: 0.3 }}
          >
            <motion.button
              className="w-16 h-16 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center text-white shadow-xl"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              onClick={(e) => {
                e.stopPropagation();
                window.open(project.demoUrl, '_blank');
              }}
            >
              <FontAwesomeIcon icon={faPlay} className="text-xl ml-1" />
            </motion.button>
            <motion.button
              className="w-16 h-16 bg-gradient-to-r from-gray-700 to-gray-600 rounded-full flex items-center justify-center text-white shadow-xl"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              onClick={(e) => {
                e.stopPropagation();
                window.open(project.sourceUrl, '_blank');
              }}
            >
              <FontAwesomeIcon icon={faGithub} className="text-xl" />
            </motion.button>
          </motion.div>
        </div>

        {/* Project Info */}
        <div className="relative z-10 p-8">
          {/* Title & Subtitle */}
          <div className="mb-6">
            <h3 className="text-2xl font-bold text-white mb-2 group-hover:text-transparent group-hover:bg-gradient-to-r group-hover:from-blue-400 group-hover:to-purple-400 group-hover:bg-clip-text transition-all duration-300">
              {project.title}
            </h3>
            <p className="text-blue-400 font-medium text-sm">{project.subtitle}</p>
          </div>

          {/* Description */}
          <p className="text-gray-300 text-sm leading-relaxed mb-6 line-clamp-3">
            {project.description}
          </p>

          {/* Metrics */}
          <div className="grid grid-cols-3 gap-4 mb-6">
            <div className="text-center">
              <div className="flex items-center justify-center mb-1">
                <FontAwesomeIcon icon={faHeart} className="text-red-400 mr-1" />
                <span className="text-white font-bold">{project.likes.toLocaleString()}</span>
              </div>
              <div className="text-xs text-gray-400">Likes</div>
            </div>
            <div className="text-center">
              <div className="flex items-center justify-center mb-1">
                <FontAwesomeIcon icon={faEye} className="text-blue-400 mr-1" />
                <span className="text-white font-bold">{project.views.toLocaleString()}</span>
              </div>
              <div className="text-xs text-gray-400">Views</div>
            </div>
            <div className="text-center">
              <div className="flex items-center justify-center mb-1">
                <FontAwesomeIcon icon={faDownload} className="text-green-400 mr-1" />
                <span className="text-white font-bold">{project.downloads.toLocaleString()}</span>
              </div>
              <div className="text-xs text-gray-400">Downloads</div>
            </div>
          </div>

          {/* Progress Bar */}
          <div className="mb-6">
            <div className="flex justify-between items-center mb-2">
              <span className="text-xs text-gray-400">Completion</span>
              <span className="text-xs text-white font-bold">{project.completionRate}%</span>
            </div>
            <div className="w-full bg-white/10 rounded-full h-2">
              <motion.div
                className="h-2 bg-gradient-to-r from-green-500 to-blue-500 rounded-full"
                initial={{ width: 0 }}
                animate={{ width: `${project.completionRate}%` }}
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
                setSelectedProject(project);
              }}
            >
              <FontAwesomeIcon icon={faRocket} className="mr-2" />
              Chi tiết
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
              <FontAwesomeIcon icon={faShareAlt} />
            </motion.button>
          </div>
        </div>
      </motion.div>
    );
  };

  // 🌟 PROJECT DETAIL MODAL - Modal chi tiết dự án với hiệu ứng cực đỉnh
  const ProjectDetailModal = ({ project }) => {
    if (!project) return null;

    return (
      <motion.div
        className="fixed inset-0 z-50 flex items-center justify-center p-4"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
      >
        {/* Backdrop */}
        <motion.div
          className="absolute inset-0 bg-black/80 backdrop-blur-xl"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={() => setSelectedProject(null)}
        />

        {/* Modal Content */}
        <motion.div
          className="relative max-w-6xl w-full max-h-[90vh] overflow-y-auto bg-gradient-to-br from-gray-900/95 via-blue-900/95 to-purple-900/95 backdrop-blur-xl rounded-3xl border border-white/20 shadow-2xl"
          initial={{ scale: 0.5, opacity: 0, y: 100 }}
          animate={{ scale: 1, opacity: 1, y: 0 }}
          exit={{ scale: 0.5, opacity: 0, y: 100 }}
          transition={{ type: "spring", damping: 20, stiffness: 300 }}
        >
          {/* Close Button */}
          <button
            className="absolute top-6 right-6 z-10 w-12 h-12 bg-white/10 hover:bg-white/20 rounded-full flex items-center justify-center text-white transition-all duration-300"
            onClick={() => setSelectedProject(null)}
          >
            ×
          </button>

          <div className="p-8">
            {/* Header */}
            <div className="text-center mb-8">
              <h2 className="text-4xl font-bold text-white mb-2">{project.title}</h2>
              <p className="text-xl text-blue-400 mb-4">{project.subtitle}</p>
              <div className="flex items-center justify-center space-x-6 text-sm text-gray-400">
                <span>👥 Team: {project.teamSize} people</span>
                <span>⏱️ Duration: {project.duration}</span>
                <span>📊 Status: {project.status}</span>
              </div>
            </div>

            {/* Description */}
            <div className="mb-8">
              <h3 className="text-xl font-bold text-white mb-4">📖 Mô tả chi tiết</h3>
              <p className="text-gray-300 leading-relaxed">{project.longDescription}</p>
            </div>

            {/* Technologies */}
            <div className="mb-8">
              <h3 className="text-xl font-bold text-white mb-4">🛠️ Công nghệ sử dụng</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {project.technologies.map((tech, index) => (
                  <motion.div
                    key={index}
                    className="bg-white/5 border border-white/10 rounded-xl p-4 hover:bg-white/10 transition-all duration-300"
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.1 }}
                  >
                    <div className="flex items-center mb-3">
                      <FontAwesomeIcon icon={tech.icon} className="text-2xl mr-3" style={{ color: tech.color }} />
                      <span className="text-white font-semibold">{tech.name}</span>
                    </div>
                    <div className="w-full bg-white/10 rounded-full h-2">
                      <motion.div
                        className="h-2 rounded-full"
                        style={{ backgroundColor: tech.color }}
                        initial={{ width: 0 }}
                        animate={{ width: `${tech.level}%` }}
                        transition={{ delay: index * 0.1 + 0.5, duration: 1 }}
                      />
                    </div>
                    <div className="text-right text-xs text-gray-400 mt-1">{tech.level}%</div>
                  </motion.div>
                ))}
              </div>
            </div>

            {/* Features */}
            <div className="mb-8">
              <h3 className="text-xl font-bold text-white mb-4">✨ Tính năng nổi bật</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {project.features.map((feature, index) => (
                  <motion.div
                    key={index}
                    className="flex items-center bg-white/5 border border-white/10 rounded-xl p-4 hover:bg-white/10 transition-all duration-300"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                  >
                    <span className="text-white">{feature}</span>
                  </motion.div>
                ))}
              </div>
            </div>

            {/* Metrics */}
            <div className="mb-8">
              <h3 className="text-xl font-bold text-white mb-4">📊 Chỉ số hiệu suất</h3>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {Object.entries(project.metrics).map(([key, value], index) => (
                  <motion.div
                    key={key}
                    className="text-center bg-white/5 border border-white/10 rounded-xl p-4"
                    initial={{ opacity: 0, scale: 0.5 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: index * 0.1 }}
                  >
                    <div className="text-2xl font-bold text-white mb-1">{value}%</div>
                    <div className="text-sm text-gray-400 capitalize">{key}</div>
                  </motion.div>
                ))}
              </div>
            </div>

            {/* Highlights */}
            <div className="mb-8">
              <h3 className="text-xl font-bold text-white mb-4">🏆 Điểm nổi bật</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {project.highlights.map((highlight, index) => (
                  <motion.div
                    key={index}
                    className="flex items-center bg-gradient-to-r from-green-500/10 to-blue-500/10 border border-green-500/20 rounded-xl p-4"
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.1 }}
                  >
                    <FontAwesomeIcon icon={faStar} className="text-yellow-400 mr-3" />
                    <span className="text-white">{highlight}</span>
                  </motion.div>
                ))}
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 pt-6 border-t border-white/10">
              <motion.a
                href={project.demoUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex-1 bg-gradient-to-r from-blue-500 to-purple-600 text-white py-4 px-6 rounded-xl font-semibold text-center hover:from-blue-600 hover:to-purple-700 transition-all duration-300 shadow-lg"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <FontAwesomeIcon icon={faRocket} className="mr-2" />
                Xem Demo Live
              </motion.a>
              <motion.a
                href={project.sourceUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex-1 bg-gradient-to-r from-gray-700 to-gray-600 text-white py-4 px-6 rounded-xl font-semibold text-center hover:from-gray-600 hover:to-gray-500 transition-all duration-300 shadow-lg"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <FontAwesomeIcon icon={faGithub} className="mr-2" />
                Source Code
              </motion.a>
            </div>
          </div>
        </motion.div>
      </motion.div>
    );
  };

  return (
    <section className="relative py-20 lg:py-32 overflow-hidden">
      {/* Matrix Background */}
      {isMatrixMode && (
        <canvas
          ref={canvasRef}
          className="absolute inset-0 z-0 opacity-20"
          style={{ mixBlendMode: 'screen' }}
        />
      )}

      {/* Background Gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-gray-900 via-blue-900/20 to-purple-900/20" />
      <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />

      {/* Floating Particles */}
      <div className="absolute inset-0 overflow-hidden">
        {[...Array(20)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-2 h-2 bg-blue-400/30 rounded-full"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
            animate={{
              y: [0, -100, 0],
              opacity: [0.3, 1, 0.3],
            }}
            transition={{
              duration: 3 + Math.random() * 2,
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
            className="inline-flex items-center justify-center px-6 py-3 bg-gradient-to-r from-blue-500/20 to-purple-500/20 border border-blue-500/30 rounded-full mb-6"
            initial={{ scale: 0 }}
            animate={inView ? { scale: 1 } : { scale: 0 }}
            transition={{ delay: 0.2, type: "spring", damping: 20 }}
          >
            <FontAwesomeIcon icon={faRocket} className="text-blue-400 mr-2" />
            <span className="text-blue-400 font-semibold">LEGENDARY PROJECTS</span>
          </motion.div>

          <motion.h2
            className="text-5xl md:text-6xl lg:text-7xl font-bold mb-6"
            initial={{ opacity: 0, scale: 0.5 }}
            animate={inView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.5 }}
            transition={{ delay: 0.4, duration: 0.8 }}
          >
            <span className="bg-gradient-to-r from-blue-400 via-purple-400 to-cyan-400 bg-clip-text text-transparent">
              📂 Masterpiece
            </span>
            <br />
            <span className="text-white">Collection</span>
          </motion.h2>

          <motion.p
            className="text-xl md:text-2xl text-gray-300 max-w-4xl mx-auto mb-8"
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ delay: 0.6 }}
          >
            Khám phá những dự án <span className="text-transparent bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text font-semibold">đột phá công nghệ</span> được tạo ra với đam mê và sự sáng tạo không giới hạn
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
                placeholder="Tìm kiếm dự án..."
                className="pl-12 pr-4 py-3 bg-white/10 border border-white/20 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:border-blue-500 focus:bg-white/20 transition-all duration-300"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>

            {/* Matrix Mode Toggle */}
            <motion.button
              className={`px-6 py-3 rounded-xl font-semibold transition-all duration-300 ${
                isMatrixMode 
                  ? 'bg-green-500 text-black' 
                  : 'bg-white/10 border border-white/20 text-white hover:bg-white/20'
              }`}
              onClick={() => setIsMatrixMode(!isMatrixMode)}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              🔄 Matrix Mode
            </motion.button>

            {/* View Toggle */}
            <div className="flex bg-white/10 border border-white/20 rounded-xl overflow-hidden">
              {['grid', '3d', 'timeline'].map((view) => (
                <motion.button
                  key={view}
                  className={`px-4 py-3 font-semibold transition-all duration-300 ${
                    activeView === view 
                      ? 'bg-blue-500 text-white' 
                      : 'text-gray-400 hover:text-white hover:bg-white/10'
                  }`}
                  onClick={() => setActiveView(view)}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  {view === 'grid' ? '⚏' : view === '3d' ? '🎲' : '📅'}
                </motion.button>
              ))}
            </div>
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
                  ? 'bg-gradient-to-r from-blue-500 to-purple-600 text-white shadow-2xl scale-105'
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
              <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-blue-500/20 to-purple-500/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 -z-10" />
            </motion.button>
          ))}
        </motion.div>

        {/* 🎮 PROJECTS SHOWCASE - Khu vực hiển thị dự án */}
        <AnimatePresence mode="wait">
          <motion.div
            key={`${activeCategory}-${activeView}`}
            className={
              activeView === 'grid' ? 'grid lg:grid-cols-2 xl:grid-cols-3 gap-8' :
              activeView === '3d' ? 'perspective-1000' :
              'space-y-8'
            }
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
            {filteredProjects.length > 0 ? (
              filteredProjects.map((project, index) => (
                <HolographicProjectCard key={project.id} project={project} index={index} />
              ))
            ) : (
              <motion.div
                className="col-span-full text-center py-20"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
              >
                <FontAwesomeIcon icon={faSearch} className="text-6xl text-gray-600 mb-4" />
                <h3 className="text-2xl font-bold text-white mb-2">Không tìm thấy dự án</h3>
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
            <motion.a
              href="https://github.com/nhdinhdev03"
              target="_blank"
              rel="noopener noreferrer"
              className="group inline-flex items-center px-8 py-4 bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-2xl font-bold text-lg shadow-2xl hover:from-blue-600 hover:to-purple-700 transition-all duration-300"
              whileHover={{ scale: 1.05, boxShadow: "0 20px 40px rgba(59, 130, 246, 0.3)" }}
              whileTap={{ scale: 0.95 }}
            >
              <FontAwesomeIcon icon={faGithub} className="mr-3 text-xl group-hover:rotate-12 transition-transform duration-300" />
              Explore More on GitHub
              <motion.div
                className="ml-2"
                animate={{ x: [0, 5, 0] }}
                transition={{ duration: 1.5, repeat: Infinity }}
              >
                →
              </motion.div>
            </motion.a>

            <motion.button
              className="group inline-flex items-center px-8 py-4 bg-white/10 border border-white/20 text-white rounded-2xl font-bold text-lg hover:bg-white/20 transition-all duration-300"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => window.scrollTo({ top: document.getElementById('contact').offsetTop, behavior: 'smooth' })}
            >
              <FontAwesomeIcon icon={faRocket} className="mr-3 text-xl group-hover:rotate-12 transition-transform duration-300" />
              Start a Project
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
              { icon: faRocket, value: "50+", label: "Projects Built" },
              { icon: faBrain, value: "99%", label: "Client Satisfaction" },
              { icon: faChartLine, value: "2M+", label: "Lines of Code" },
              { icon: faGlobe, value: "24/7", label: "Availability" }
            ].map((stat, index) => (
              <motion.div
                key={index}
                className="text-center group"
                initial={{ opacity: 0, scale: 0 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 1.7 + index * 0.1 }}
              >
                <div className="w-16 h-16 bg-gradient-to-r from-blue-500/20 to-purple-500/20 border border-blue-500/30 rounded-full flex items-center justify-center mx-auto mb-3 group-hover:scale-110 transition-transform duration-300">
                  <FontAwesomeIcon icon={stat.icon} className="text-2xl text-blue-400" />
                </div>
                <div className="text-2xl font-bold text-white mb-1">{stat.value}</div>
                <div className="text-sm text-gray-400">{stat.label}</div>
              </motion.div>
            ))}
          </motion.div>
        </motion.div>
      </div>

      {/* 🌟 PROJECT DETAIL MODAL - Modal chi tiết dự án */}
      <AnimatePresence>
        {selectedProject && <ProjectDetailModal project={selectedProject} />}
      </AnimatePresence>
    </section>
  );
};

export default Projects;
