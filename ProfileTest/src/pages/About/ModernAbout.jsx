import React, { useState, useEffect, useMemo } from 'react';
import { motion, AnimatePresence, LazyMotion, domAnimation } from 'framer-motion';
import { useTheme } from '../../contexts/ThemeContext';
import { 
  FiCpu,
  FiCode,
  FiCloud,
  FiTrendingUp,
  FiActivity,
  FiTarget,
  FiLayers,
  FiGlobe,
  FiServer,
  FiDownload,
  FiMail,
  FiLinkedin,
  FiGithub,
  FiAward,
  FiBook,
  FiUsers
} from 'react-icons/fi';

// Static data moved outside component
const SKILL_CATEGORIES = [
  {
    title: 'AI & Machine Learning',
    icon: FiCpu,
    gradient: 'from-purple-600 to-pink-600',
    skills: [
      { name: 'TensorFlow', level: 95, color: 'from-orange-500 to-red-500' },
      { name: 'PyTorch', level: 92, color: 'from-red-500 to-pink-500' },
        { name: 'OpenAI GPT', level: 88, color: 'from-green-500 to-emerald-500' },
        { name: 'Computer Vision', level: 85, color: 'from-blue-500 to-cyan-500' },
        { name: 'NLP', level: 90, color: 'from-purple-500 to-indigo-500' },
        { name: 'MLOps', level: 87, color: 'from-yellow-500 to-orange-500' }
      ]
    },
    {
      title: 'Cloud & DevOps',
      icon: FiCloud,
      gradient: 'from-blue-600 to-cyan-600',
      skills: [
        { name: 'AWS', level: 93, color: 'from-orange-500 to-yellow-500' },
        { name: 'Docker', level: 95, color: 'from-blue-500 to-cyan-500' },
        { name: 'Kubernetes', level: 89, color: 'from-purple-500 to-pink-500' },
        { name: 'Terraform', level: 86, color: 'from-green-500 to-emerald-500' },
        { name: 'Jenkins', level: 84, color: 'from-red-500 to-orange-500' },
        { name: 'Prometheus', level: 82, color: 'from-indigo-500 to-purple-500' }
      ]
    },
    {
      title: 'Full-Stack Development',
      icon: FiLayers,
      gradient: 'from-green-600 to-emerald-600',
      skills: [
        { name: 'React', level: 97, color: 'from-cyan-500 to-blue-500' },
        { name: 'Node.js', level: 94, color: 'from-green-500 to-emerald-500' },
        { name: 'TypeScript', level: 91, color: 'from-blue-500 to-indigo-500' },
        { name: 'GraphQL', level: 88, color: 'from-pink-500 to-purple-500' },
        { name: 'Next.js', level: 93, color: 'from-gray-600 to-gray-800' },
        { name: 'PostgreSQL', level: 89, color: 'from-blue-600 to-cyan-600' }
      ]
    },
    {
      title: 'Blockchain & Web3',
      icon: FiGlobe,
      gradient: 'from-yellow-600 to-orange-600',
      skills: [
        { name: 'Solidity', level: 85, color: 'from-gray-600 to-gray-800' },
        { name: 'Web3.js', level: 88, color: 'from-orange-500 to-yellow-500' },
        { name: 'Ethereum', level: 86, color: 'from-blue-500 to-purple-500' },
        { name: 'Smart Contracts', level: 83, color: 'from-green-500 to-emerald-500' },
        { name: 'DeFi', level: 80, color: 'from-purple-500 to-pink-500' },
        { name: 'IPFS', level: 78, color: 'from-cyan-500 to-blue-500' }
      ]
    }
  ];

const ModernAbout = React.memo(() => {
  const [activeSkill, setActiveSkill] = useState(null);
  const [mousePosition, setMousePosition] = useState({ x: -100, y: -100 });
  const [selectedTimeline, setSelectedTimeline] = useState('career');
  const { isDark } = useTheme();

  // Optimized mouse tracking
  useEffect(() => {
    let frame;
    const handleMouseMove = (e) => {
      if (!frame) {
        frame = requestAnimationFrame(() => {
          setMousePosition({ x: e.clientX, y: e.clientY });
          frame = null;
        });
      }
    };
    window.addEventListener('pointermove', handleMouseMove, { passive: true });
    return () => {
      window.removeEventListener('pointermove', handleMouseMove);
      if (frame) cancelAnimationFrame(frame);
    };
  }, []);

  const skillCategories = SKILL_CATEGORIES;

  const timeline = useMemo(() => ({
    career: [
      {
        year: '2024',
        title: 'Senior AI Engineer',
        company: 'TechCorp Innovations',
        description: 'Leading AI research team, developing cutting-edge machine learning models for autonomous systems.',
        icon: FiCpu,
        gradient: 'from-purple-600 to-pink-600'
      },
      {
        year: '2023',
        title: 'Full-Stack Developer',
        company: 'Web3 Dynamics',
        description: 'Built scalable blockchain applications and DeFi platforms with modern web technologies.',
        icon: FiGlobe,
        gradient: 'from-green-600 to-emerald-600'
      },
      {
        year: '2022',
        title: 'Cloud Solutions Architect',
        company: 'CloudTech Solutions',
        description: 'Designed and implemented enterprise-level cloud infrastructure and DevOps pipelines.',
        icon: FiCloud,
        gradient: 'from-blue-600 to-cyan-600'
      },
      {
        year: '2021',
        title: 'Software Engineer',
        company: 'StartupLab Inc.',
        description: 'Developed full-stack applications and contributed to open-source projects.',
        icon: FiCode,
        gradient: 'from-orange-600 to-red-600'
      }
    ],
    education: [
      {
        year: '2021',
        title: 'M.S. Computer Science',
        company: 'Stanford University',
        description: 'Specialized in Artificial Intelligence and Machine Learning with focus on neural networks.',
        icon: FiBook,
        gradient: 'from-red-600 to-pink-600'
      },
      {
        year: '2019',
        title: 'B.S. Software Engineering',
        company: 'MIT',
        description: 'Graduated Summa Cum Laude with specialization in distributed systems and algorithms.',
        icon: FiAward,
        gradient: 'from-blue-600 to-indigo-600'
      },
      {
        year: '2018',
        title: 'AI Research Internship',
        company: 'Google DeepMind',
        description: 'Contributed to groundbreaking research in reinforcement learning and neural architecture search.',
        icon: FiCpu,
        gradient: 'from-purple-600 to-blue-600'
      }
    ]
  }), []);

  const certifications = useMemo(() => [
    { name: 'AWS Solutions Architect', issuer: 'Amazon', year: '2024', icon: FiCloud },
    { name: 'Certified Kubernetes Administrator', issuer: 'CNCF', year: '2024', icon: FiServer },
    { name: 'TensorFlow Developer Certificate', issuer: 'Google', year: '2023', icon: FiCpu },
    { name: 'Blockchain Developer', issuer: 'Ethereum Foundation', year: '2023', icon: FiGlobe }
  ], []);

  return (
    <LazyMotion features={domAnimation}>
    <div className={`min-h-screen relative overflow-hidden transition-colors duration-500 ${
      isDark ? 'bg-black' : 'bg-gradient-to-br from-gray-50 to-white'
    }`}>
      {/* Dynamic Background */}
      <div className="absolute inset-0">
        <div className={`absolute inset-0 transition-all duration-500 ${
          isDark 
            ? 'bg-gradient-to-br from-gray-900 via-black to-blue-900' 
            : 'bg-gradient-to-br from-blue-50/30 via-white to-purple-50/30'
        }`} />
        
        {/* Neural network grid */}
        <div 
          className={`absolute inset-0 transition-opacity duration-500 ${
            isDark ? 'opacity-20' : 'opacity-10'
          }`}
          style={{
            backgroundImage: isDark 
              ? `
                linear-gradient(90deg, rgba(59, 130, 246, 0.1) 1px, transparent 1px),
                linear-gradient(rgba(59, 130, 246, 0.1) 1px, transparent 1px)
              `
              : `
                linear-gradient(90deg, rgba(59, 130, 246, 0.05) 1px, transparent 1px),
                linear-gradient(rgba(59, 130, 246, 0.05) 1px, transparent 1px)
              `,
            backgroundSize: '50px 50px'
          }}
        />
        
        {/* Floating AI nodes */}
        {Array.from({ length: 20 }).map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-2 h-2 bg-blue-400 rounded-full"
            animate={{
              x: [Math.random() * window.innerWidth, Math.random() * window.innerWidth],
              y: [Math.random() * window.innerHeight, Math.random() * window.innerHeight],
              opacity: [0, 1, 0],
              scale: [0.5, 1.5, 0.5]
            }}
            transition={{
              duration: 8 + Math.random() * 8,
              repeat: Infinity,
              ease: 'easeInOut',
              delay: Math.random() * 5
            }}
            style={{
              left: Math.random() * window.innerWidth,
              top: Math.random() * window.innerHeight
            }}
          />
        ))}
      </div>

      {/* Mouse follower glow */}
      <motion.div
        className="fixed pointer-events-none w-96 h-96 rounded-full z-10"
        style={{
          background: 'radial-gradient(circle, rgba(139, 92, 246, 0.15) 0%, transparent 70%)',
          left: mousePosition.x - 192,
          top: mousePosition.y - 192,
        }}
        animate={{
          x: mousePosition.x - 192,
          y: mousePosition.y - 192,
        }}
        transition={{ type: "spring", damping: 30, stiffness: 200 }}
      />

      <div className="relative z-20 pt-24 pb-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Hero Section */}
          <motion.section
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-20"
          >
            {/* Profile Image with Holographic Effect */}
            <motion.div
              className="relative mx-auto w-48 h-48 mb-8"
              whileHover={{ scale: 1.05 }}
            >
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 20, repeat: Infinity, ease: 'linear' }}
                className="absolute inset-0 rounded-full bg-gradient-to-r from-blue-500 via-purple-500 to-cyan-500 p-1"
              >
                <div className="w-full h-full rounded-full bg-black p-2">
                  <img
                    src="/api/placeholder/200/200"
                    alt="NH Dinh - AI Engineer"
                    className="w-full h-full rounded-full object-cover"
                  />
                </div>
              </motion.div>
              
              {/* AI Status Indicators */}
              <motion.div
                animate={{
                  scale: [1, 1.2, 1],
                  opacity: [0.7, 1, 0.7],
                }}
                transition={{ duration: 2, repeat: Infinity }}
                className="absolute -top-2 -right-2 w-8 h-8 bg-green-400 rounded-full border-4 border-black shadow-lg flex items-center justify-center"
              >
                <FiActivity className="w-4 h-4 text-black" />
              </motion.div>
              
              <motion.div
                animate={{
                  scale: [1, 1.3, 1],
                  opacity: [0.5, 1, 0.5],
                }}
                transition={{ duration: 3, repeat: Infinity, delay: 1 }}
                className="absolute -bottom-2 -left-2 w-6 h-6 bg-blue-400 rounded-full border-2 border-black"
              />
            </motion.div>

            <motion.h1 
              className="text-5xl md:text-7xl font-bold mb-6"
              whileHover={{ scale: 1.02 }}
            >
              <span className="bg-gradient-to-r from-blue-400 via-purple-400 to-cyan-400 bg-clip-text text-transparent">
                About Me
              </span>
            </motion.h1>
            
            <motion.p
              className="text-xl text-gray-400 max-w-4xl mx-auto leading-relaxed mb-8"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
            >
              I'm a passionate AI Engineer and Full-Stack Developer with expertise in machine learning, 
              blockchain technology, and cloud computing. I build intelligent systems that solve real-world 
              problems and push the boundaries of what's possible with modern technology.
            </motion.p>

            {/* Quick Stats */}
            <motion.div
              className="flex flex-wrap justify-center gap-8 mt-12"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
            >
              {[
                { label: 'Years of Experience', value: '5+', icon: FiTrendingUp },
                { label: 'AI Models Built', value: '50+', icon: FiCpu },
                { label: 'Projects Completed', value: '100+', icon: FiTarget },
                { label: 'Team Members Led', value: '15+', icon: FiUsers }
              ].map((stat, index) => (
                <motion.div
                  key={stat.label}
                  className="flex items-center space-x-3 px-6 py-3 rounded-2xl bg-gray-900/50 border border-gray-700/50"
                  whileHover={{ scale: 1.05, y: -5 }}
                  animate={{
                    borderColor: ['rgba(75, 85, 99, 0.5)', 'rgba(139, 92, 246, 0.5)', 'rgba(75, 85, 99, 0.5)'],
                  }}
                  transition={{
                    borderColor: { duration: 3, repeat: Infinity, delay: index * 0.5 }
                  }}
                >
                  <stat.icon className="w-5 h-5 text-purple-400" />
                  <div>
                    <div className="text-white font-bold">{stat.value}</div>
                    <div className="text-gray-400 text-sm">{stat.label}</div>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </motion.section>

          {/* Skills Matrix */}
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
                Technical Expertise
              </span>
            </motion.h2>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {skillCategories.map((category, categoryIndex) => (
                <motion.div
                  key={category.title}
                  className="relative"
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: categoryIndex * 0.2 }}
                  whileHover={{ scale: 1.02, rotateY: 5 }}
                >
                  <div className="p-8 rounded-3xl bg-gray-900/50 border border-gray-800 backdrop-blur-sm relative overflow-hidden">
                    {/* Background Gradient */}
                    <motion.div
                      className={`absolute inset-0 bg-gradient-to-br ${category.gradient} opacity-10`}
                      animate={{
                        scale: [1, 1.1, 1],
                      }}
                      transition={{
                        duration: 4,
                        repeat: Infinity,
                        ease: "easeInOut"
                      }}
                    />

                    {/* Header */}
                    <div className="flex items-center space-x-4 mb-6 relative z-10">
                      <motion.div
                        className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${category.gradient} flex items-center justify-center text-white`}
                        whileHover={{ rotate: 360, scale: 1.1 }}
                        transition={{ duration: 0.8 }}
                      >
                        <category.icon className="w-8 h-8" />
                      </motion.div>
                      <h3 className="text-2xl font-bold text-white">{category.title}</h3>
                    </div>

                    {/* Skills */}
                    <div className="space-y-4 relative z-10">
                      {category.skills.map((skill, skillIndex) => (
                        <motion.div
                          key={skill.name}
                          className="group"
                          initial={{ opacity: 0, x: -20 }}
                          whileInView={{ opacity: 1, x: 0 }}
                          transition={{ delay: skillIndex * 0.1 }}
                          onHoverStart={() => setActiveSkill(`${categoryIndex}-${skillIndex}`)}
                          onHoverEnd={() => setActiveSkill(null)}
                        >
                          <div className="flex items-center justify-between mb-2">
                            <span className="text-gray-300 font-medium group-hover:text-white transition-colors">
                              {skill.name}
                            </span>
                            <span className={`text-sm font-bold bg-gradient-to-r ${skill.color} bg-clip-text text-transparent`}>
                              {skill.level}%
                            </span>
                          </div>
                          
                          <div className="relative h-2 bg-gray-800 rounded-full overflow-hidden">
                            <motion.div
                              initial={{ width: 0 }}
                              whileInView={{ width: `${skill.level}%` }}
                              transition={{ duration: 1.5, delay: skillIndex * 0.1 }}
                              className={`h-full bg-gradient-to-r ${skill.color} rounded-full relative`}
                            >
                              {/* Animated shine effect */}
                              <motion.div
                                className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent"
                                animate={{
                                  x: activeSkill === `${categoryIndex}-${skillIndex}` ? ['-100%', '100%'] : '-100%',
                                }}
                                transition={{
                                  duration: 1.5,
                                  repeat: activeSkill === `${categoryIndex}-${skillIndex}` ? Infinity : 0,
                                  ease: 'easeInOut'
                                }}
                              />
                            </motion.div>
                          </div>
                        </motion.div>
                      ))}
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.section>

          {/* Timeline Section */}
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
              <span className="bg-gradient-to-r from-cyan-400 to-blue-400 bg-clip-text text-transparent">
                Journey Timeline
              </span>
            </motion.h2>

            {/* Timeline Selector */}
            <div className="flex justify-center mb-12">
              <div className="flex space-x-4 p-2 rounded-2xl bg-gray-900/50 border border-gray-700/50">
                {['career', 'education'].map((type) => (
                  <motion.button
                    key={type}
                    onClick={() => setSelectedTimeline(type)}
                    className={`px-6 py-3 rounded-xl font-medium transition-all duration-300 ${
                      selectedTimeline === type
                        ? 'bg-gradient-to-r from-blue-500 to-purple-500 text-white'
                        : 'text-gray-400 hover:text-white'
                    }`}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    {type.charAt(0).toUpperCase() + type.slice(1)}
                  </motion.button>
                ))}
              </div>
            </div>

            {/* Timeline Items */}
            <AnimatePresence mode="wait">
              <motion.div
                key={selectedTimeline}
                initial={{ opacity: 0, x: 50 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -50 }}
                transition={{ duration: 0.5 }}
                className="relative"
              >
                {/* Timeline Line */}
                <div className="absolute left-8 top-0 bottom-0 w-0.5 bg-gradient-to-b from-blue-500 via-purple-500 to-cyan-500" />

                <div className="space-y-8">
                  {timeline[selectedTimeline].map((item, index) => (
                    <motion.div
                      key={index}
                      className="relative flex items-start space-x-6"
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.2 }}
                      whileHover={{ scale: 1.02, x: 10 }}
                    >
                      {/* Timeline Node */}
                      <motion.div
                        className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${item.gradient} flex items-center justify-center text-white shadow-lg z-10`}
                        whileHover={{ rotate: 360, scale: 1.1 }}
                        transition={{ duration: 0.8 }}
                      >
                        <item.icon className="w-8 h-8" />
                      </motion.div>

                      {/* Content */}
                      <motion.div
                        className="flex-1 p-6 rounded-2xl bg-gray-900/50 border border-gray-800 backdrop-blur-sm"
                        whileHover={{ backgroundColor: 'rgba(17, 24, 39, 0.7)' }}
                      >
                        <div className="flex items-center justify-between mb-2">
                          <h3 className="text-xl font-bold text-white">{item.title}</h3>
                          <span className="text-blue-400 font-mono text-sm">{item.year}</span>
                        </div>
                        <p className="text-purple-400 font-medium mb-3">{item.company}</p>
                        <p className="text-gray-400 leading-relaxed">{item.description}</p>
                      </motion.div>
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            </AnimatePresence>
          </motion.section>

          {/* Certifications */}
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
              <span className="bg-gradient-to-r from-green-400 to-emerald-400 bg-clip-text text-transparent">
                Certifications
              </span>
            </motion.h2>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {certifications.map((cert, index) => (
                <motion.div
                  key={cert.name}
                  className="p-6 rounded-2xl bg-gray-900/50 border border-gray-800 backdrop-blur-sm text-center"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  whileHover={{ y: -8, scale: 1.05 }}
                >
                  <motion.div
                    className="w-16 h-16 mx-auto mb-4 rounded-2xl bg-gradient-to-br from-green-500 to-emerald-500 flex items-center justify-center text-white"
                    whileHover={{ rotate: 360 }}
                    transition={{ duration: 0.8 }}
                  >
                    <cert.icon className="w-8 h-8" />
                  </motion.div>
                  <h3 className="text-white font-bold mb-2">{cert.name}</h3>
                  <p className="text-gray-400 text-sm mb-1">{cert.issuer}</p>
                  <p className="text-green-400 text-sm font-mono">{cert.year}</p>
                </motion.div>
              ))}
            </div>
          </motion.section>

          {/* Contact CTA */}
          <motion.section
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center"
          >
            <motion.h2 
              className="text-3xl md:text-4xl font-bold mb-6"
              whileHover={{ scale: 1.02 }}
            >
              <span className="bg-gradient-to-r from-orange-400 to-red-400 bg-clip-text text-transparent">
                Let's Build the Future Together
              </span>
            </motion.h2>
            <p className="text-xl text-gray-400 mb-8 max-w-2xl mx-auto">
              Ready to collaborate on groundbreaking AI projects or discuss innovative tech solutions?
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-6">
              <motion.a
                href="/contact"
                className="inline-flex items-center space-x-3 bg-gradient-to-r from-blue-500 to-purple-600 text-white px-8 py-4 rounded-2xl font-semibold text-lg shadow-2xl hover:shadow-blue-500/25 transition-all duration-300"
                whileHover={{ scale: 1.05, rotateX: 5 }}
                whileTap={{ scale: 0.95 }}
              >
                <FiMail className="w-5 h-5" />
                <span>Get In Touch</span>
              </motion.a>
              
              <motion.a
                href="/resume.pdf"
                download
                className="inline-flex items-center space-x-3 bg-gray-900/50 text-white px-8 py-4 rounded-2xl font-semibold text-lg border border-gray-700 hover:border-cyan-400 transition-all duration-300"
                whileHover={{ scale: 1.05, rotateX: -5 }}
                whileTap={{ scale: 0.95 }}
              >
                <FiDownload className="w-5 h-5" />
                <span>Download Resume</span>
              </motion.a>
            </div>

            {/* Social Links */}
            <motion.div
              className="flex items-center justify-center space-x-6 mt-12"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
            >
              {[
                { icon: FiGithub, href: 'https://github.com/nhdinhdev03', label: 'GitHub', color: 'hover:text-gray-400' },
                { icon: FiLinkedin, href: 'https://linkedin.com/in/nhdinh', label: 'LinkedIn', color: 'hover:text-blue-400' },
                { icon: FiMail, href: 'mailto:contact@nhdinh.dev', label: 'Email', color: 'hover:text-red-400' }
              ].map((social, index) => (
                <motion.a
                  key={social.label}
                  href={social.href}
                  className={`w-16 h-16 rounded-2xl bg-gray-900/50 border border-gray-700 hover:border-cyan-400 flex items-center justify-center text-gray-400 ${social.color} transition-all duration-300`}
                  whileHover={{ 
                    y: -8, 
                    scale: 1.1,
                    rotateY: 15
                  }}
                  whileTap={{ scale: 0.95 }}
                  animate={{
                    y: [0, -5, 0],
                  }}
                  transition={{
                    y: { duration: 2, repeat: Infinity, delay: index * 0.3 }
                  }}
                  aria-label={social.label}
                >
                  <social.icon className="w-7 h-7" />
                </motion.a>
              ))}
            </motion.div>
          </motion.section>
        </div>
      </div>
    </div>
    </LazyMotion>
  );
});

export default ModernAbout;
