import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faExternalLinkAlt, faCode, faEye, faFilter, faStar } from '@fortawesome/free-solid-svg-icons';
import { faGithub } from '@fortawesome/free-brands-svg-icons';
import { useInView } from 'react-intersection-observer';

const Projects = () => {
  const [ref, inView] = useInView({
    threshold: 0.1,
    triggerOnce: true,
  });

  const [projects, setProjects] = useState([
    {
      id: 1,
      title: "E-Commerce Platform",
      description: "Nền tảng thương mại điện tử hoàn chỉnh với React, Node.js và MongoDB. Tích hợp thanh toán, quản lý đơn hàng và dashboard admin.",
      imageUrl: "/images/project1.jpg",
      demoUrl: "https://demo.nhdinh.dev/ecommerce",
      sourceUrl: "https://github.com/nhdinhdev03/ecommerce-platform",
      category: "Frontend",
      tags: ["React", "Node.js", "MongoDB", "Stripe", "JWT"],
      isFeatured: true,
      status: "published",
      viewCount: 1250
    },
    {
      id: 2,
      title: "Task Management App",
      description: "Ứng dụng quản lý công việc với tính năng real-time collaboration, drag & drop, và notification system.",
      imageUrl: "/images/project2.jpg",
      demoUrl: "https://demo.nhdinh.dev/taskmanager",
      sourceUrl: "https://github.com/nhdinhdev03/task-manager",
      category: "Full-Stack",
      tags: ["React", "Express", "Socket.io", "PostgreSQL", "Redis"],
      isFeatured: true,
      status: "published",
      viewCount: 980
    },
    {
      id: 3,
      title: "AI Chatbot Dashboard",
      description: "Dashboard quản lý AI chatbot với analytics, training data management và conversation monitoring.",
      imageUrl: "/images/project3.jpg",
      demoUrl: "https://demo.nhdinh.dev/chatbot",
      sourceUrl: "https://github.com/nhdinhdev03/ai-chatbot",
      category: "AI/ML",
      tags: ["React", "Python", "FastAPI", "TensorFlow", "Docker"],
      isFeatured: false,
      status: "published",
      viewCount: 756
    },
    {
      id: 4,
      title: "Cryptocurrency Tracker",
      description: "Ứng dụng theo dõi giá cryptocurrency với charts, portfolio tracking và price alerts.",
      imageUrl: "/images/project4.jpg",
      demoUrl: "https://demo.nhdinh.dev/crypto",
      sourceUrl: "https://github.com/nhdinhdev03/crypto-tracker",
      category: "Frontend",
      tags: ["Vue.js", "Chart.js", "REST API", "WebSocket", "PWA"],
      isFeatured: false,
      status: "published",
      viewCount: 654
    },
    {
      id: 5,
      title: "Social Media Analytics",
      description: "Platform phân tích social media với data visualization, sentiment analysis và reporting tools.",
      imageUrl: "/images/project5.jpg",
      demoUrl: "https://demo.nhdinh.dev/analytics",
      sourceUrl: "https://github.com/nhdinhdev03/social-analytics",
      category: "Backend",
      tags: ["Node.js", "D3.js", "MongoDB", "ML", "AWS"],
      isFeatured: true,
      status: "published",
      viewCount: 892
    },
    {
      id: 6,
      title: "Real Estate Portal",
      description: "Portal bất động sản với search filters, map integration, virtual tours và contact system.",
      imageUrl: "/images/project6.jpg",
      demoUrl: "https://demo.nhdinh.dev/realestate",
      sourceUrl: "https://github.com/nhdinhdev03/realestate-portal",
      category: "Full-Stack",
      tags: ["React", "Node.js", "Maps API", "MySQL", "Cloudinary"],
      isFeatured: false,
      status: "published",
      viewCount: 543
    }
  ]);

  const [categories] = useState([
    "All",
    "Frontend", 
    "Backend",
    "Full-Stack",
    "AI/ML"
  ]);

  const [activeCategory, setActiveCategory] = useState("All");
  const [filteredProjects, setFilteredProjects] = useState(projects);

  useEffect(() => {
    if (activeCategory === "All") {
      setFilteredProjects(projects);
    } else {
      setFilteredProjects(projects.filter(project => project.category === activeCategory));
    }
  }, [activeCategory, projects]);

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

  const ProjectCard = ({ project, index }) => {
    const [isHovered, setIsHovered] = useState(false);

    return (
      <motion.div
        className="group relative bg-white/5 backdrop-blur-lg border border-white/10 rounded-2xl overflow-hidden"
        variants={itemVariants}
        initial={{ opacity: 0, y: 50 }}
        animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
        transition={{ delay: index * 0.1 }}
        whileHover={{ y: -10, transition: { duration: 0.3 } }}
        onHoverStart={() => setIsHovered(true)}
        onHoverEnd={() => setIsHovered(false)}
      >
        {/* Featured Badge */}
        {project.isFeatured && (
          <div className="absolute top-4 left-4 z-10 bg-gradient-to-r from-yellow-500 to-orange-500 text-white px-3 py-1 rounded-full text-xs font-semibold flex items-center">
            <FontAwesomeIcon icon={faStar} className="mr-1" />
            Featured
          </div>
        )}

        {/* Project Image */}
        <div className="relative h-48 bg-gradient-to-br from-blue-500/20 to-purple-600/20 overflow-hidden">
          {/* Placeholder for project image */}
          <div className="absolute inset-0 flex items-center justify-center text-6xl font-bold text-white/20">
            {project.title.charAt(0)}
          </div>
          
          {/* Overlay on hover */}
          <motion.div
            className="absolute inset-0 bg-black/60 flex items-center justify-center space-x-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: isHovered ? 1 : 0 }}
            transition={{ duration: 0.3 }}
          >
            <motion.a
              href={project.demoUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="w-12 h-12 bg-blue-500 rounded-full flex items-center justify-center text-white hover:bg-blue-600 transition-colors"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
            >
              <FontAwesomeIcon icon={faExternalLinkAlt} />
            </motion.a>
            <motion.a
              href={project.sourceUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="w-12 h-12 bg-gray-700 rounded-full flex items-center justify-center text-white hover:bg-gray-600 transition-colors"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
            >
              <FontAwesomeIcon icon={faGithub} />
            </motion.a>
          </motion.div>
        </div>

        {/* Project Content */}
        <div className="p-6">
          {/* Category & Views */}
          <div className="flex items-center justify-between mb-3">
            <span className="px-2 py-1 bg-blue-500/20 text-blue-400 rounded-md text-xs font-medium">
              {project.category}
            </span>
            <div className="flex items-center text-gray-400 text-xs">
              <FontAwesomeIcon icon={faEye} className="mr-1" />
              {project.viewCount.toLocaleString()}
            </div>
          </div>

          {/* Title */}
          <h3 className="text-xl font-bold text-white mb-3 group-hover:text-blue-400 transition-colors">
            {project.title}
          </h3>

          {/* Description */}
          <p className="text-gray-400 text-sm leading-relaxed mb-4 line-clamp-3">
            {project.description}
          </p>

          {/* Tags */}
          <div className="flex flex-wrap gap-2 mb-4">
            {project.tags.map((tag, tagIndex) => (
              <span
                key={tagIndex}
                className="px-2 py-1 bg-white/5 text-gray-300 rounded text-xs border border-white/10"
              >
                {tag}
              </span>
            ))}
          </div>

          {/* Action Buttons */}
          <div className="flex space-x-3">
            <motion.a
              href={project.demoUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex-1 bg-gradient-to-r from-blue-500 to-purple-600 text-white py-2 px-4 rounded-lg font-medium text-center hover:from-blue-600 hover:to-purple-700 transition-all duration-300"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              Xem Demo
            </motion.a>
            <motion.a
              href={project.sourceUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="px-4 py-2 border border-white/20 text-gray-300 rounded-lg hover:bg-white/5 hover:text-white transition-all duration-300"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <FontAwesomeIcon icon={faCode} />
            </motion.a>
          </div>
        </div>
      </motion.div>
    );
  };

  return (
    <section id="projects" className="relative py-20 lg:py-32 overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0 bg-gradient-to-br from-gray-900 via-purple-900/10 to-blue-900/10" />
      
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
            Dự án <span className="bg-gradient-to-r from-blue-400 to-purple-600 bg-clip-text text-transparent">Nổi bật</span>
          </motion.h2>
          <motion.p
            className="text-xl text-gray-400 max-w-3xl mx-auto"
            variants={itemVariants}
          >
            Khám phá những dự án tôi đã xây dựng với đam mê và sự tận tâm
          </motion.p>
        </motion.div>

        {/* Category Filter */}
        <motion.div
          className="flex flex-wrap justify-center gap-4 mb-12"
          variants={containerVariants}
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
        >
          {categories.map((category) => (
            <motion.button
              key={category}
              onClick={() => setActiveCategory(category)}
              className={`px-6 py-3 rounded-full font-medium transition-all duration-300 ${
                activeCategory === category
                  ? 'bg-gradient-to-r from-blue-500 to-purple-600 text-white shadow-lg'
                  : 'bg-white/5 text-gray-400 border border-white/10 hover:bg-white/10 hover:text-white'
              }`}
              variants={itemVariants}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <FontAwesomeIcon icon={faFilter} className="mr-2" />
              {category}
            </motion.button>
          ))}
        </motion.div>

        {/* Projects Grid */}
        <AnimatePresence mode="wait">
          <motion.div
            key={activeCategory}
            className="grid md:grid-cols-2 lg:grid-cols-3 gap-8"
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            exit="hidden"
          >
            {filteredProjects.map((project, index) => (
              <ProjectCard key={project.id} project={project} index={index} />
            ))}
          </motion.div>
        </AnimatePresence>

        {/* Call to Action */}
        <motion.div
          className="text-center mt-16"
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ delay: 0.8 }}
        >
          <motion.a
            href="https://github.com/nhdinhdev03"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center px-8 py-4 bg-white/5 border border-white/20 text-white rounded-full font-semibold hover:bg-white/10 transition-all duration-300"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <FontAwesomeIcon icon={faGithub} className="mr-3 text-xl" />
            Xem thêm trên GitHub
          </motion.a>
        </motion.div>
      </div>
    </section>
  );
};

export default Projects;
