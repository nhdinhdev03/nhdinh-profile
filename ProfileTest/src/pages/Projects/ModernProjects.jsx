import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useTheme } from '../../contexts/ThemeContext';
import { generateThemeClasses, getThemeGradient, getThemeParticleColor } from '../../utils/themeUtils';
import { 
  FiExternalLink, 
  FiGithub, 

  FiSearch,
  FiCalendar,
  FiUsers,
  FiCode,

  FiCpu,

  FiCloud,
  FiShield,
  FiZap,
  FiTrendingUp,
  FiActivity,
  FiTarget,
  FiLayers,
  FiGlobe,
  FiServer,
  FiSmartphone,

} from 'react-icons/fi';

function ModernProjects() {
  const [selectedFilter, setSelectedFilter] = useState('All');
  const [searchTerm, setSearchTerm] = useState('');
  const [hoveredProject, setHoveredProject] = useState(null);
  const { theme } = useTheme();
  const themeClasses = generateThemeClasses(theme);

  const categories = [
    { name: 'All', icon: FiLayers, color: 'from-blue-500 to-cyan-500' },
    { name: 'AI/ML', icon: FiCpu, color: 'from-purple-500 to-pink-500' },
    { name: 'Web3', icon: FiGlobe, color: 'from-green-500 to-emerald-500' },
    { name: 'Cloud', icon: FiCloud, color: 'from-orange-500 to-red-500' },
    { name: 'Mobile', icon: FiSmartphone, color: 'from-teal-500 to-blue-500' },
    { name: 'DevOps', icon: FiServer, color: 'from-indigo-500 to-purple-500' }
  ];

  const projects = [
    {
      id: 1,
      title: 'Neural Network Optimizer',
      description: 'Advanced AI system for automatically optimizing neural network architectures using genetic algorithms and reinforcement learning.',
      image: '/api/placeholder/500/300',
      category: 'AI/ML',
      technologies: ['TensorFlow', 'PyTorch', 'Python', 'CUDA', 'Docker', 'Kubernetes'],
      githubUrl: 'https://github.com/nhdinhdev03/neural-optimizer',
      liveUrl: 'https://neural-optimizer.nhdinh.dev',
      featured: true,
      status: 'In Development',
      year: '2024',
      team: 'AI Research Team',
      duration: '6 months',
      complexity: 'Expert',
      performance: '99.7%',
      icon: FiCpu,
      gradient: 'from-purple-600 via-pink-600 to-red-600'
    },
    {
      id: 2,
      title: 'DeFi Trading Bot',
      description: 'Sophisticated Web3 trading bot with ML-powered market analysis, smart contract integration, and multi-chain support.',
      image: '/api/placeholder/500/300',
      category: 'Web3',
      technologies: ['Solidity', 'Web3.js', 'Node.js', 'React', 'MongoDB', 'Ethereum'],
      githubUrl: 'https://github.com/nhdinhdev03/defi-bot',
      liveUrl: 'https://defi-bot.nhdinh.dev',
      featured: true,
      status: 'Live',
      year: '2024',
      team: 'Blockchain Team',
      duration: '4 months',
      complexity: 'Expert',
      performance: '85.2%',
      icon: FiTrendingUp,
      gradient: 'from-green-600 via-emerald-600 to-teal-600'
    },
    {
      id: 3,
      title: 'Quantum Cloud Infrastructure',
      description: 'Scalable quantum computing platform with hybrid classical-quantum algorithms for cryptography and optimization.',
      image: '/api/placeholder/500/300',
      category: 'Cloud',
      technologies: ['Qiskit', 'AWS', 'Kubernetes', 'Python', 'Redis', 'GraphQL'],
      githubUrl: 'https://github.com/nhdinhdev03/quantum-cloud',
      liveUrl: 'https://quantum.nhdinh.dev',
      featured: true,
      status: 'Beta',
      year: '2024',
      team: 'Quantum Computing Lab',
      duration: '8 months',
      complexity: 'Expert',
      performance: '78.9%',
      icon: FiZap,
      gradient: 'from-blue-600 via-cyan-600 to-purple-600'
    },
    {
      id: 4,
      title: 'AR Neural Interface',
      description: 'Augmented reality application with brain-computer interface integration for hands-free interaction using neural signals.',
      image: '/api/placeholder/500/300',
      category: 'Mobile',
      technologies: ['Unity', 'ARCore', 'C#', 'OpenBCI', 'TensorFlow Lite', 'Android'],
      githubUrl: 'https://github.com/nhdinhdev03/ar-neural',
      liveUrl: 'https://ar-neural.nhdinh.dev',
      featured: false,
      status: 'Research',
      year: '2024',
      team: 'AR Research Lab',
      duration: '12 months',
      complexity: 'Expert',
      performance: '92.4%',
      icon: FiTarget,
      gradient: 'from-orange-600 via-red-600 to-pink-600'
    },
    {
      id: 5,
      title: 'AI-Powered DevOps Platform',
      description: 'Intelligent CI/CD platform with predictive analytics, automated testing, and self-healing infrastructure.',
      image: '/api/placeholder/500/300',
      category: 'DevOps',
      technologies: ['Docker', 'Kubernetes', 'Jenkins', 'Terraform', 'Prometheus', 'Python'],
      githubUrl: 'https://github.com/nhdinhdev03/ai-devops',
      liveUrl: 'https://devops.nhdinh.dev',
      featured: false,
      status: 'Live',
      year: '2024',
      team: 'DevOps Team',
      duration: '5 months',
      complexity: 'Advanced',
      performance: '96.8%',
      icon: FiServer,
      gradient: 'from-indigo-600 via-purple-600 to-blue-600'
    },
    {
      id: 6,
      title: 'Cybersecurity AI Guardian',
      description: 'Real-time threat detection system using deep learning for network security, anomaly detection, and incident response.',
      image: '/api/placeholder/500/300',
      category: 'AI/ML',
      technologies: ['Python', 'Scikit-learn', 'Elasticsearch', 'Kibana', 'FastAPI', 'Redis'],
      githubUrl: 'https://github.com/nhdinhdev03/security-ai',
      liveUrl: 'https://security.nhdinh.dev',
      featured: false,
      status: 'Live',
      year: '2024',
      team: 'Security Team',
      duration: '7 months',
      complexity: 'Expert',
      performance: '99.1%',
      icon: FiShield,
      gradient: 'from-red-600 via-orange-600 to-yellow-600'
    }
  ];

  const filteredProjects = projects.filter(project => {
    const matchesFilter = selectedFilter === 'All' || project.category === selectedFilter;
    const matchesSearch = project.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         project.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         project.technologies.some(tech => tech.toLowerCase().includes(searchTerm.toLowerCase()));
    return matchesFilter && matchesSearch;
  });

  const featuredProjects = projects.filter(project => project.featured);

  return (
    <div className={themeClasses.container}>
      {/* Dynamic Background */}
      <div className="absolute inset-0">
        {/* Base gradient */}
        <div className={`absolute inset-0 ${themeClasses.heroBackground}`} />
        
        {/* Neural network grid */}
        <div 
          className={`absolute inset-0 ${themeClasses.opacity}`}
          style={{
            background: getThemeGradient(theme, 'neural'),
            backgroundSize: '50px 50px'
          }}
        />
        
        {/* Floating particles */}
        {Array.from({ length: 30 }).map((_, i) => (
          <motion.div
            key={i}
            className={`absolute w-1 h-1 rounded-full ${getThemeParticleColor(theme)}`}
            animate={{
              x: [Math.random() * window.innerWidth, Math.random() * window.innerWidth],
              y: [Math.random() * window.innerHeight, Math.random() * window.innerHeight],
              opacity: [0, 1, 0]
            }}
            transition={{
              duration: 10 + Math.random() * 10,
              repeat: Infinity,
              ease: 'linear',
              delay: Math.random() * 5
            }}
            style={{
              left: Math.random() * window.innerWidth,
              top: Math.random() * window.innerHeight
            }}
          />
        ))}
      </div>



      <div className="relative z-20 pt-24 pb-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Hero Section */}
          <motion.section
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-20"
          >
            <motion.h1 
              className="text-5xl md:text-7xl font-bold mb-6"
              whileHover={{ scale: 1.02 }}
            >
              <span className="bg-gradient-to-r from-blue-400 via-purple-400 to-cyan-400 bg-clip-text text-transparent">
                Project Portfolio
              </span>
            </motion.h1>
            <motion.p
              className={`text-xl max-w-3xl mx-auto leading-relaxed mb-8 transition-colors duration-300 ${
                theme === 'dark' ? 'text-gray-400' : 'text-gray-600'
              }`}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
            >
              Cutting-edge solutions leveraging AI, blockchain, quantum computing, and advanced software engineering
            </motion.p>

            {/* Tech Stats */}
            <motion.div
              className="flex flex-wrap justify-center gap-8 mt-12"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
            >
              {[
                { label: 'AI Models Deployed', value: '50+', icon: FiCpu },
                { label: 'Smart Contracts', value: '25+', icon: FiCode },
                { label: 'Cloud Solutions', value: '100+', icon: FiCloud },
                { label: 'Open Source', value: '30+', icon: FiGithub }
              ].map((stat, index) => (
                <motion.div
                  key={stat.label}
                  className={`flex items-center space-x-3 px-6 py-3 rounded-2xl backdrop-blur-sm border transition-all duration-300 ${
                    theme === 'dark' 
                      ? 'bg-gray-900/50 border-gray-700/50 text-white' 
                      : 'bg-white/70 border-gray-200/50 text-gray-900'
                  }`}
                  whileHover={{ scale: 1.05, y: -5 }}
                  animate={{
                    borderColor: theme === 'dark' 
                      ? ['rgba(75, 85, 99, 0.5)', 'rgba(59, 130, 246, 0.5)', 'rgba(75, 85, 99, 0.5)']
                      : ['rgba(229, 231, 235, 0.5)', 'rgba(59, 130, 246, 0.5)', 'rgba(229, 231, 235, 0.5)'],
                  }}
                  transition={{
                    borderColor: { duration: 3, repeat: Infinity, delay: index * 0.5 }
                  }}
                >
                  <stat.icon className={`w-5 h-5 ${
                    theme === 'dark' ? 'text-blue-400' : 'text-blue-600'
                  }`} />
                  <div>
                    <div className={`font-bold ${
                      theme === 'dark' ? 'text-white' : 'text-gray-900'
                    }`}>{stat.value}</div>
                    <div className={`text-sm ${
                      theme === 'dark' ? 'text-gray-400' : 'text-gray-600'
                    }`}>{stat.label}</div>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </motion.section>

          {/* Featured Projects Carousel */}
          <motion.section
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="mb-20"
          >
            <motion.h2 
              className="text-3xl md:text-4xl font-bold text-center mb-12"
              whileHover={{ scale: 1.02 }}
            >
              <span className="bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
                Featured Projects
              </span>
            </motion.h2>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              {featuredProjects.map((project, index) => (
                <motion.div
                  key={project.id}
                  className="group relative"
                  initial={{ opacity: 0, y: 50 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.2 }}
                  whileHover={{ y: -10, scale: 1.02 }}
                  onHoverStart={() => setHoveredProject(project.id)}
                  onHoverEnd={() => setHoveredProject(null)}
                >
                  {/* Project Card */}
                  <div className={`relative h-96 rounded-3xl overflow-hidden backdrop-blur-sm border transition-all duration-300 ${
                    theme === 'dark' 
                      ? 'bg-gray-900/50 border-gray-800' 
                      : 'bg-white/70 border-gray-200'
                  }`}>
                    {/* Background Gradient */}
                    <motion.div
                      className={`absolute inset-0 bg-gradient-to-br ${project.gradient} opacity-20 group-hover:opacity-30 transition-opacity duration-500`}
                    />

                    {/* Image */}
                    <div className="relative h-48 overflow-hidden">
                      <img
                        src={project.image}
                        alt={project.title}
                        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                      />
                      
                      {/* Overlay */}
                      <div className={`absolute inset-0 ${
                        theme === 'dark' 
                          ? 'bg-gradient-to-t from-gray-900 via-transparent to-transparent' 
                          : 'bg-gradient-to-t from-white via-transparent to-transparent'
                      }`} />
                      
                      {/* Status Badge */}
                      <motion.div
                        className={`absolute top-4 right-4 px-3 py-1 rounded-full text-xs font-bold ${
                          project.status === 'Live' ? 'bg-green-500 text-white' :
                          project.status === 'Beta' ? 'bg-yellow-500 text-black' :
                          project.status === 'In Development' ? 'bg-blue-500 text-white' :
                          'bg-purple-500 text-white'
                        }`}
                        whileHover={{ scale: 1.1 }}
                      >
                        {project.status}
                      </motion.div>

                      {/* Project Icon */}
                      <motion.div
                        className={`absolute top-4 left-4 w-12 h-12 rounded-2xl bg-gradient-to-br ${project.gradient} flex items-center justify-center text-white`}
                        whileHover={{ rotate: 360, scale: 1.1 }}
                        transition={{ duration: 0.6 }}
                      >
                        <project.icon className="w-6 h-6" />
                      </motion.div>
                    </div>

                    {/* Content */}
                    <div className="p-6">
                      <h3 className={`text-xl font-bold mb-2 transition-colors ${
                        theme === 'dark' 
                          ? 'text-white group-hover:text-cyan-400' 
                          : 'text-gray-900 group-hover:text-blue-600'
                      }`}>
                        {project.title}
                      </h3>
                      <p className={`text-sm mb-4 line-clamp-2 ${
                        theme === 'dark' ? 'text-gray-400' : 'text-gray-600'
                      }`}>
                        {project.description}
                      </p>

                      {/* Tech Stack */}
                      <div className="flex flex-wrap gap-2 mb-4">
                        {project.technologies.slice(0, 3).map((tech) => (
                          <span
                            key={tech}
                            className={`px-2 py-1 text-xs rounded-lg border transition-colors ${
                              theme === 'dark' 
                                ? 'bg-gray-800/50 text-gray-300 border-gray-700' 
                                : 'bg-gray-100 text-gray-700 border-gray-300'
                            }`}
                          >
                            {tech}
                          </span>
                        ))}
                        {project.technologies.length > 3 && (
                          <span className={`px-2 py-1 text-xs rounded-lg border transition-colors ${
                            theme === 'dark' 
                              ? 'bg-gray-800/50 text-gray-400 border-gray-700' 
                              : 'bg-gray-100 text-gray-500 border-gray-300'
                          }`}>
                            +{project.technologies.length - 3} more
                          </span>
                        )}
                      </div>

                      {/* Actions */}
                      <div className="flex items-center justify-between">
                        <div className="flex space-x-3">
                          <motion.a
                            href={project.githubUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className={`w-10 h-10 rounded-xl flex items-center justify-center transition-colors ${
                              theme === 'dark' 
                                ? 'bg-gray-800 hover:bg-gray-700 text-gray-400 hover:text-white' 
                                : 'bg-gray-200 hover:bg-gray-300 text-gray-600 hover:text-gray-900'
                            }`}
                            whileHover={{ scale: 1.1, rotate: 5 }}
                            whileTap={{ scale: 0.95 }}
                          >
                            <FiGithub className="w-5 h-5" />
                          </motion.a>
                          {project.liveUrl && (
                            <motion.a
                              href={project.liveUrl}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="w-10 h-10 rounded-xl bg-blue-600 hover:bg-blue-700 flex items-center justify-center text-white transition-colors"
                              whileHover={{ scale: 1.1, rotate: -5 }}
                              whileTap={{ scale: 0.95 }}
                            >
                              <FiExternalLink className="w-5 h-5" />
                            </motion.a>
                          )}
                        </div>

                        {/* Performance Score */}
                        <div className="flex items-center space-x-2">
                          <FiActivity className="w-4 h-4 text-green-400" />
                          <span className="text-green-400 text-sm font-mono">{project.performance}</span>
                        </div>
                      </div>
                    </div>

                    {/* Hover Glow Effect */}
                    <motion.div
                      className={`absolute inset-0 rounded-3xl bg-gradient-to-br ${project.gradient} opacity-0 group-hover:opacity-20 blur-xl transition-opacity duration-500 -z-10`}
                      animate={{
                        scale: hoveredProject === project.id ? [1, 1.05, 1] : 1,
                      }}
                      transition={{
                        duration: 2,
                        repeat: hoveredProject === project.id ? Infinity : 0,
                        ease: "easeInOut"
                      }}
                    />
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.section>

          {/* Filters and Search */}
          <motion.section
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="mb-12"
          >
            <div className="flex flex-col lg:flex-row items-center justify-between gap-6">
              {/* Category Filters */}
              <div className="flex flex-wrap gap-3">
                {categories.map((category) => (
                  <motion.button
                    key={category.name}
                    onClick={() => setSelectedFilter(category.name)}
                    className={`flex items-center space-x-2 px-6 py-3 rounded-2xl font-medium transition-all duration-300 ${
                      selectedFilter === category.name
                        ? 'bg-gradient-to-r from-blue-500 to-purple-500 text-white shadow-lg'
                        : theme === 'dark'
                          ? 'bg-gray-900/50 text-gray-400 hover:text-white hover:bg-gray-800/50 border border-gray-700/50'
                          : 'bg-white/70 text-gray-600 hover:text-gray-900 hover:bg-white/90 border border-gray-200/50'
                    }`}
                    whileHover={{ scale: 1.05, y: -2 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <category.icon className="w-4 h-4" />
                    <span>{category.name}</span>
                  </motion.button>
                ))}
              </div>

              {/* Search */}
              <motion.div
                className="relative"
                whileHover={{ scale: 1.02 }}
              >
                <FiSearch className={`absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 ${
                  theme === 'dark' ? 'text-gray-400' : 'text-gray-500'
                }`} />
                <input
                  type="text"
                  placeholder="Search projects..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className={`pl-12 pr-4 py-3 w-80 rounded-2xl border transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                    theme === 'dark' 
                      ? 'bg-gray-900/50 border-gray-700/50 text-white placeholder-gray-400' 
                      : 'bg-white/70 border-gray-200/50 text-gray-900 placeholder-gray-500'
                  }`}
                />
              </motion.div>
            </div>
          </motion.section>

          {/* All Projects Grid */}
          <motion.section
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <motion.h2 
              className={`text-3xl md:text-4xl font-bold text-center mb-12 transition-colors duration-300 ${
                theme === 'dark' ? 'text-white' : 'text-gray-900'
              }`}
              whileHover={{ scale: 1.02 }}
            >
              <span className="bg-gradient-to-r from-cyan-400 to-blue-400 bg-clip-text text-transparent">
                All Projects
              </span>
            </motion.h2>

            <AnimatePresence>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {filteredProjects.map((project, index) => (
                  <motion.div
                    key={project.id}
                    layout
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.8 }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                    whileHover={{ y: -8, scale: 1.02 }}
                    className="group relative"
                    onHoverStart={() => setHoveredProject(project.id)}
                    onHoverEnd={() => setHoveredProject(null)}
                  >
                    {/* Project Card */}
                    <div className={`relative h-[400px] rounded-3xl overflow-hidden backdrop-blur-sm border transition-all duration-300 ${
                      theme === 'dark' 
                        ? 'bg-gray-900/50 border-gray-800' 
                        : 'bg-white/70 border-gray-200'
                    }`}>
                      {/* Background Gradient */}
                      <motion.div
                        className={`absolute inset-0 bg-gradient-to-br ${project.gradient} opacity-10 group-hover:opacity-20 transition-opacity duration-500`}
                      />

                      {/* Image */}
                      <div className="relative h-40 overflow-hidden">
                        <img
                          src={project.image}
                          alt={project.title}
                          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                        />
                        
                        {/* Overlay */}
                        <div className={`absolute inset-0 ${
                          theme === 'dark' 
                            ? 'bg-gradient-to-t from-gray-900 via-transparent to-transparent' 
                            : 'bg-gradient-to-t from-white via-transparent to-transparent'
                        }`} />
                        
                        {/* Status Badge */}
                        <motion.div
                          className={`absolute top-3 right-3 px-2 py-1 rounded-full text-xs font-bold ${
                            project.status === 'Live' ? 'bg-green-500 text-white' :
                            project.status === 'Beta' ? 'bg-yellow-500 text-black' :
                            project.status === 'In Development' ? 'bg-blue-500 text-white' :
                            'bg-purple-500 text-white'
                          }`}
                          whileHover={{ scale: 1.1 }}
                        >
                          {project.status}
                        </motion.div>

                        {/* Project Icon */}
                        <motion.div
                          className={`absolute top-3 left-3 w-10 h-10 rounded-xl bg-gradient-to-br ${project.gradient} flex items-center justify-center text-white`}
                          whileHover={{ rotate: 360, scale: 1.1 }}
                          transition={{ duration: 0.6 }}
                        >
                          <project.icon className="w-5 h-5" />
                        </motion.div>
                      </div>

                      {/* Content */}
                      <div className="p-5">
                        <h3 className={`text-lg font-bold mb-2 transition-colors ${
                          theme === 'dark' 
                            ? 'text-white group-hover:text-cyan-400' 
                            : 'text-gray-900 group-hover:text-blue-600'
                        }`}>
                          {project.title}
                        </h3>
                        <p className={`text-sm mb-3 line-clamp-2 ${
                          theme === 'dark' ? 'text-gray-400' : 'text-gray-600'
                        }`}>
                          {project.description}
                        </p>

                        {/* Project Info */}
                        <div className={`flex items-center justify-between text-xs mb-3 ${
                          theme === 'dark' ? 'text-gray-500' : 'text-gray-600'
                        }`}>
                          <span className="flex items-center space-x-1">
                            <FiCalendar className="w-3 h-3" />
                            <span>{project.year}</span>
                          </span>
                          <span className="flex items-center space-x-1">
                            <FiUsers className="w-3 h-3" />
                            <span>{project.team}</span>
                          </span>
                        </div>

                        {/* Tech Stack */}
                        <div className="flex flex-wrap gap-1 mb-4">
                          {project.technologies.slice(0, 4).map((tech) => (
                            <span
                              key={tech}
                              className={`px-2 py-1 text-xs rounded-lg border transition-colors ${
                                theme === 'dark' 
                                  ? 'bg-gray-800/50 text-gray-300 border-gray-700' 
                                  : 'bg-gray-100 text-gray-700 border-gray-300'
                              }`}
                            >
                              {tech}
                            </span>
                          ))}
                        </div>

                        {/* Actions */}
                        <div className="flex items-center justify-between">
                          <div className="flex space-x-2">
                            <motion.a
                              href={project.githubUrl}
                              target="_blank"
                              rel="noopener noreferrer"
                              className={`w-8 h-8 rounded-lg flex items-center justify-center transition-colors ${
                                theme === 'dark' 
                                  ? 'bg-gray-800 hover:bg-gray-700 text-gray-400 hover:text-white' 
                                  : 'bg-gray-200 hover:bg-gray-300 text-gray-600 hover:text-gray-900'
                              }`}
                              whileHover={{ scale: 1.1, rotate: 5 }}
                              whileTap={{ scale: 0.95 }}
                            >
                              <FiGithub className="w-4 h-4" />
                            </motion.a>
                            {project.liveUrl && (
                              <motion.a
                                href={project.liveUrl}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="w-8 h-8 rounded-lg bg-blue-600 hover:bg-blue-700 flex items-center justify-center text-white transition-colors"
                                whileHover={{ scale: 1.1, rotate: -5 }}
                                whileTap={{ scale: 0.95 }}
                              >
                                <FiExternalLink className="w-4 h-4" />
                              </motion.a>
                            )}
                          </div>

                          {/* Complexity Badge */}
                          <div className={`px-2 py-1 rounded-lg text-xs font-bold ${
                            project.complexity === 'Expert' ? 'bg-red-500/20 text-red-400' :
                            project.complexity === 'Advanced' ? 'bg-orange-500/20 text-orange-400' :
                            'bg-green-500/20 text-green-400'
                          }`}>
                            {project.complexity}
                          </div>
                        </div>
                      </div>

                      {/* Hover Glow Effect */}
                      <motion.div
                        className={`absolute inset-0 rounded-3xl bg-gradient-to-br ${project.gradient} opacity-0 group-hover:opacity-10 blur-xl transition-opacity duration-500 -z-10`}
                        animate={{
                          scale: hoveredProject === project.id ? [1, 1.05, 1] : 1,
                        }}
                        transition={{
                          duration: 2,
                          repeat: hoveredProject === project.id ? Infinity : 0,
                          ease: "easeInOut"
                        }}
                      />
                    </div>
                  </motion.div>
                ))}
              </div>
            </AnimatePresence>

            {filteredProjects.length === 0 && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="text-center py-20"
              >
                <FiSearch className="w-16 h-16 text-gray-600 mx-auto mb-4" />
                <h3 className="text-2xl font-bold text-gray-400 mb-2">No projects found</h3>
                <p className="text-gray-500">Try adjusting your search or filter criteria</p>
              </motion.div>
            )}
          </motion.section>
        </div>
      </div>
    </div>
  );
}

export default ModernProjects;
