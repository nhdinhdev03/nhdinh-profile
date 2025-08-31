import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence, useAnimation } from 'framer-motion';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { 
  faPaperPlane, 
  faUser, 
  faEnvelope, 
  faHeading, 
  faMessage,
  faPhone,
  faMapMarkerAlt,
  faCheckCircle,
  faRocket,
  faGlobe,
  faMagic,
  faHeart,
  faStar,
  faLightbulb,
  faCode,
  faCoffee,
  faCalendarAlt,
  faComments,
  faBolt,
  faAtom,
  faInfinity,
  faGem,
  faShieldAlt,
  faEye,
  faDownload,
  faShare
} from '@fortawesome/free-solid-svg-icons';
import { 
  faGithub, 
  faLinkedin, 
  faFacebook, 
  faTelegram,
  faTwitter,
  faInstagram,
  faYoutube,
  faDiscord,
  faSlack,
  faWhatsapp
} from '@fortawesome/free-brands-svg-icons';
import { useInView } from 'react-intersection-observer';

const Contact = () => {
  const [ref, inView] = useInView({
    threshold: 0.1,
    triggerOnce: true,
  });

  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    company: '',
    projectType: '',
    budget: '',
    timeline: '',
    subject: '',
    content: '',
    priority: 'normal',
    contactMethod: 'email'
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isQuantumMode, setIsQuantumMode] = useState(false);
  const [activeTab, setActiveTab] = useState('contact');
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const canvasRef = useRef(null);
  const formRef = useRef(null);

  // 📞 QUANTUM CONTACT INFORMATION - Thông tin liên hệ cực đỉnh
  const contactMethods = [
    {
      id: 'primary',
      icon: faEnvelope,
      label: "Primary Email",
      value: "nhdinh.dev@gmail.com",
      link: "mailto:nhdinh.dev@gmail.com",
      description: "Best for project inquiries & collaborations",
      responseTime: "< 6 hours",
      availability: "24/7",
      priority: "high",
      color: "from-blue-500 to-purple-600"
    },
    {
      id: 'business',
      icon: faRocket,
      label: "Business Inquiries",
      value: "business@nhdinh.dev",
      link: "mailto:business@nhdinh.dev",
      description: "Enterprise projects & partnerships",
      responseTime: "< 2 hours",
      availability: "9 AM - 10 PM",
      priority: "urgent",
      color: "from-green-500 to-blue-600"
    },
    {
      id: 'phone',
      icon: faPhone,
      label: "Direct Phone",
      value: "+84 123 456 789",
      link: "tel:+84123456789",
      description: "Urgent matters & voice consultations",
      responseTime: "Immediate",
      availability: "9 AM - 9 PM",
      priority: "emergency",
      color: "from-red-500 to-pink-600"
    },
    {
      id: 'location',
      icon: faMapMarkerAlt,
      label: "Location",
      value: "Ha Noi, Vietnam",
      link: "https://goo.gl/maps/hanoi",
      description: "Available for in-person meetings",
      responseTime: "By appointment",
      availability: "Weekdays",
      priority: "normal",
      color: "from-purple-500 to-cyan-600"
    }
  ];

  // 🌐 SOCIAL MEDIA MATRIX - Mạng xã hội với hiệu ứng đặc biệt
  const socialPlatforms = [
    {
      platform: "GitHub",
      icon: faGithub,
      url: "https://github.com/nhdinhdev03",
      followers: "2.5K",
      engagement: "95%",
      description: "Open source projects & code repositories",
      color: "#333333",
      specialEffect: "matrix"
    },
    {
      platform: "LinkedIn",
      icon: faLinkedin,
      url: "https://linkedin.com/in/nhdinh",
      followers: "5.2K",
      engagement: "87%",
      description: "Professional network & career updates",
      color: "#0077B5",
      specialEffect: "professional"
    },
    {
      platform: "Twitter",
      icon: faTwitter,
      url: "https://twitter.com/nhdinhdev",
      followers: "1.8K",
      engagement: "92%",
      description: "Tech insights & daily thoughts",
      color: "#1DA1F2",
      specialEffect: "pulse"
    },
    {
      platform: "Instagram",
      icon: faInstagram,
      url: "https://instagram.com/nhdinh.dev",
      followers: "3.1K",
      engagement: "94%",
      description: "Behind the scenes & lifestyle",
      color: "#E4405F",
      specialEffect: "gradient"
    },
    {
      platform: "YouTube",
      icon: faYoutube,
      url: "https://youtube.com/@nhdinhdev",
      followers: "12.5K",
      engagement: "89%",
      description: "Coding tutorials & tech reviews",
      color: "#FF0000",
      specialEffect: "video"
    },
    {
      platform: "Discord",
      icon: faDiscord,
      url: "https://discord.gg/nhdinhdev",
      followers: "892",
      engagement: "96%",
      description: "Real-time coding discussions",
      color: "#7289DA",
      specialEffect: "gaming"
    }
  ];

  // 💼 PROJECT TYPES - Loại dự án
  const projectTypes = [
    { value: 'web-app', label: '🌐 Web Application', price: '$2,000 - $10,000' },
    { value: 'mobile-app', label: '📱 Mobile Application', price: '$3,000 - $15,000' },
    { value: 'ai-ml', label: '🤖 AI/ML Solution', price: '$5,000 - $25,000' },
    { value: 'blockchain', label: '⛓️ Blockchain DApp', price: '$10,000 - $50,000' },
    { value: 'consulting', label: '💡 Technical Consulting', price: '$150 - $300/hour' },
    { value: 'custom', label: '🎯 Custom Solution', price: 'Quote on request' }
  ];

  // ⚡ PRIORITY LEVELS - Mức độ ưu tiên
  const priorityLevels = [
    { value: 'low', label: '🟢 Low Priority', responseTime: '48-72 hours' },
    { value: 'normal', label: '🟡 Normal Priority', responseTime: '12-24 hours' },
    { value: 'high', label: '🟠 High Priority', responseTime: '4-8 hours' },
    { value: 'urgent', label: '🔴 Urgent', responseTime: '1-2 hours' },
    { value: 'emergency', label: '🚨 Emergency', responseTime: 'Immediate' }
  ];

  // Quantum Particle Effect
  useEffect(() => {
    if (isQuantumMode && canvasRef.current) {
      const canvas = canvasRef.current;
      const ctx = canvas.getContext('2d');
      
      const resizeCanvas = () => {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
      };
      
      resizeCanvas();
      window.addEventListener('resize', resizeCanvas);

      const particles = [];
      const particleCount = 100;

      // Create quantum particles
      for (let i = 0; i < particleCount; i++) {
        particles.push({
          x: Math.random() * canvas.width,
          y: Math.random() * canvas.height,
          vx: (Math.random() - 0.5) * 4,
          vy: (Math.random() - 0.5) * 4,
          radius: Math.random() * 2 + 1,
          hue: Math.random() * 360,
          life: Math.random() * 100 + 50
        });
      }

      const animate = () => {
        ctx.fillStyle = 'rgba(0, 0, 0, 0.1)';
        ctx.fillRect(0, 0, canvas.width, canvas.height);

        particles.forEach((particle, index) => {
          // Update particle
          particle.x += particle.vx;
          particle.y += particle.vy;
          particle.life--;

          // Quantum tunneling effect
          if (particle.x < 0) particle.x = canvas.width;
          if (particle.x > canvas.width) particle.x = 0;
          if (particle.y < 0) particle.y = canvas.height;
          if (particle.y > canvas.height) particle.y = 0;

          // Draw particle with quantum glow
          ctx.beginPath();
          ctx.arc(particle.x, particle.y, particle.radius, 0, Math.PI * 2);
          
          const gradient = ctx.createRadialGradient(
            particle.x, particle.y, 0,
            particle.x, particle.y, particle.radius * 3
          );
          gradient.addColorStop(0, `hsla(${particle.hue}, 100%, 70%, 0.8)`);
          gradient.addColorStop(1, `hsla(${particle.hue}, 100%, 70%, 0)`);
          
          ctx.fillStyle = gradient;
          ctx.fill();

          // Respawn particle
          if (particle.life <= 0) {
            particles[index] = {
              x: Math.random() * canvas.width,
              y: Math.random() * canvas.height,
              vx: (Math.random() - 0.5) * 4,
              vy: (Math.random() - 0.5) * 4,
              radius: Math.random() * 2 + 1,
              hue: Math.random() * 360,
              life: Math.random() * 100 + 50
            };
          }
        });

        requestAnimationFrame(animate);
      };

      animate();

      return () => {
        window.removeEventListener('resize', resizeCanvas);
      };
    }
  }, [isQuantumMode]);

  // Handle mouse movement for holographic effects
  const handleMouseMove = (e) => {
    setMousePosition({ x: e.clientX, y: e.clientY });
  };

  // Form handling
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Simulate quantum processing
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSubmitted(true);
      setFormData({
        fullName: '',
        email: '',
        company: '',
        projectType: '',
        budget: '',
        timeline: '',
        subject: '',
        content: '',
        priority: 'normal',
        contactMethod: 'email'
      });

      // Reset success message after 5 seconds
      setTimeout(() => {
        setIsSubmitted(false);
      }, 5000);
    }, 2000);
  };

  // 🌟 HOLOGRAPHIC CONTACT CARD - Card liên hệ với hiệu ứng holographic
  const HolographicContactCard = ({ contact, index }) => {
    const [isHovered, setIsHovered] = useState(false);

    return (
      <motion.div
        className="group relative"
        initial={{ opacity: 0, y: 50, rotateX: -15 }}
        animate={inView ? { opacity: 1, y: 0, rotateX: 0 } : { opacity: 0, y: 50, rotateX: -15 }}
        transition={{ delay: index * 0.1, duration: 0.6 }}
        onHoverStart={() => setIsHovered(true)}
        onHoverEnd={() => setIsHovered(false)}
      >
        {/* Holographic Background */}
        <div className="absolute inset-0 bg-gradient-to-br from-white/10 via-white/5 to-transparent rounded-2xl backdrop-blur-xl border border-white/20 shadow-2xl">
          <div className={`absolute inset-0 bg-gradient-to-br ${contact.color} opacity-20 rounded-2xl`} />
        </div>

        {/* Priority Badge */}
        <div className={`absolute -top-2 -right-2 px-2 py-1 rounded-full text-xs font-bold z-10 ${
          contact.priority === 'urgent' ? 'bg-red-500 text-white' :
          contact.priority === 'high' ? 'bg-orange-500 text-white' :
          contact.priority === 'emergency' ? 'bg-red-600 text-white animate-pulse' :
          'bg-blue-500 text-white'
        }`}>
          {contact.priority.toUpperCase()}
        </div>

        <motion.a
          href={contact.link}
          target={contact.link.startsWith('http') ? '_blank' : '_self'}
          rel={contact.link.startsWith('http') ? 'noopener noreferrer' : ''}
          className="relative z-10 block p-6 hover:scale-105 transition-transform duration-300"
          style={{
            transform: isHovered 
              ? `perspective(1000px) rotateX(${(mousePosition.y - window.innerHeight/2) * 0.01}deg) rotateY(${(mousePosition.x - window.innerWidth/2) * 0.01}deg)`
              : 'perspective(1000px) rotateX(0deg) rotateY(0deg)'
          }}
        >
          {/* Icon */}
          <div className={`w-16 h-16 bg-gradient-to-br ${contact.color} rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300`}>
            <FontAwesomeIcon icon={contact.icon} className="text-2xl text-white" />
          </div>

          {/* Content */}
          <div className="space-y-2">
            <h3 className="text-white font-bold text-lg">{contact.label}</h3>
            <p className="text-blue-400 font-medium">{contact.value}</p>
            <p className="text-gray-400 text-sm">{contact.description}</p>
            
            {/* Stats */}
            <div className="flex justify-between text-xs text-gray-500 pt-2 border-t border-white/10">
              <span>⚡ {contact.responseTime}</span>
              <span>🕐 {contact.availability}</span>
            </div>
          </div>
        </motion.a>
      </motion.div>
    );
  };

  // 🌐 SOCIAL PLATFORM CARD - Card mạng xã hội đặc biệt
  const SocialPlatformCard = ({ platform, index }) => {
    const [isHovered, setIsHovered] = useState(false);

    return (
      <motion.div
        className="group relative"
        initial={{ opacity: 0, scale: 0, rotate: -180 }}
        animate={inView ? { opacity: 1, scale: 1, rotate: 0 } : { opacity: 0, scale: 0, rotate: -180 }}
        transition={{ delay: index * 0.1, duration: 0.6, type: "spring" }}
        onHoverStart={() => setIsHovered(true)}
        onHoverEnd={() => setIsHovered(false)}
      >
        <motion.a
          href={platform.url}
          target="_blank"
          rel="noopener noreferrer"
          className="relative block p-6 bg-white/5 backdrop-blur-lg border border-white/10 rounded-2xl hover:bg-white/10 transition-all duration-300"
          whileHover={{ scale: 1.05, y: -5 }}
          whileTap={{ scale: 0.95 }}
        >
          {/* Platform Icon */}
          <div 
            className="w-16 h-16 rounded-xl flex items-center justify-center mb-4 transition-all duration-300"
            style={{ backgroundColor: platform.color + '20', border: `1px solid ${platform.color}30` }}
          >
            <FontAwesomeIcon 
              icon={platform.icon} 
              className="text-3xl transition-transform duration-300 group-hover:scale-125" 
              style={{ color: platform.color }} 
            />
          </div>

          {/* Platform Info */}
          <div className="space-y-2">
            <h3 className="text-white font-bold text-lg">{platform.platform}</h3>
            <p className="text-gray-400 text-sm">{platform.description}</p>
            
            {/* Stats */}
            <div className="grid grid-cols-2 gap-3 pt-3 border-t border-white/10">
              <div className="text-center">
                <div className="text-lg font-bold text-white">{platform.followers}</div>
                <div className="text-xs text-gray-400">Followers</div>
              </div>
              <div className="text-center">
                <div className="text-lg font-bold text-green-400">{platform.engagement}</div>
                <div className="text-xs text-gray-400">Engagement</div>
              </div>
            </div>
          </div>

          {/* Special Effect Indicator */}
          <div className="absolute top-2 right-2 w-3 h-3 rounded-full bg-green-400 animate-pulse" />
        </motion.a>
      </motion.div>
    );
  };

  // 📋 QUANTUM CONTACT FORM - Form liên hệ với hiệu ứng quantum
  const QuantumContactForm = () => {
    return (
      <motion.div
        ref={formRef}
        className="relative bg-gradient-to-br from-white/10 via-white/5 to-transparent backdrop-blur-xl border border-white/20 rounded-3xl p-8 shadow-2xl"
        initial={{ opacity: 0, scale: 0.8 }}
        animate={inView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.8 }}
        transition={{ duration: 0.8 }}
      >
        {/* Form Header */}
        <div className="text-center mb-8">
          <motion.div
            className="w-20 h-20 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center mx-auto mb-4"
            animate={{ rotate: 360 }}
            transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
          >
            <FontAwesomeIcon icon={faRocket} className="text-3xl text-white" />
          </motion.div>
          <h3 className="text-3xl font-bold text-white mb-2">🚀 Start Your Project</h3>
          <p className="text-gray-400">Let's build something extraordinary together</p>
        </div>

        {/* Success Message */}
        <AnimatePresence>
          {isSubmitted && (
            <motion.div
              className="mb-8 p-6 bg-gradient-to-r from-green-500/20 to-blue-500/20 border border-green-500/30 rounded-2xl"
              initial={{ opacity: 0, scale: 0.8, y: -20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.8, y: -20 }}
            >
              <div className="flex items-center text-green-400 mb-2">
                <FontAwesomeIcon icon={faCheckCircle} className="mr-3 text-2xl" />
                <h4 className="text-lg font-bold">Message Sent Successfully!</h4>
              </div>
              <p className="text-gray-300">🚀 Your message has been quantum-encrypted and sent to my priority inbox. I'll respond within the timeframe specified by your priority level.</p>
            </motion.div>
          )}
        </AnimatePresence>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Personal Information */}
          <div className="grid md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <label className="block text-gray-400 text-sm font-medium">
                Full Name *
              </label>
              <div className="relative">
                <FontAwesomeIcon 
                  icon={faUser} 
                  className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" 
                />
                <input
                  type="text"
                  name="fullName"
                  value={formData.fullName}
                  onChange={handleInputChange}
                  required
                  className="w-full pl-12 pr-4 py-4 bg-white/5 border border-white/10 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:border-blue-500 focus:bg-white/10 focus:ring-2 focus:ring-blue-500/20 transition-all duration-300"
                  placeholder="Your full name"
                />
              </div>
            </div>

            <div className="space-y-2">
              <label className="block text-gray-400 text-sm font-medium">
                Email Address *
              </label>
              <div className="relative">
                <FontAwesomeIcon 
                  icon={faEnvelope} 
                  className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" 
                />
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  required
                  className="w-full pl-12 pr-4 py-4 bg-white/5 border border-white/10 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:border-blue-500 focus:bg-white/10 focus:ring-2 focus:ring-blue-500/20 transition-all duration-300"
                  placeholder="your.email@example.com"
                />
              </div>
            </div>
          </div>

          {/* Project Details */}
          <div className="grid md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <label className="block text-gray-400 text-sm font-medium">
                Company/Organization
              </label>
              <input
                type="text"
                name="company"
                value={formData.company}
                onChange={handleInputChange}
                className="w-full px-4 py-4 bg-white/5 border border-white/10 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:border-blue-500 focus:bg-white/10 focus:ring-2 focus:ring-blue-500/20 transition-all duration-300"
                placeholder="Your company name"
              />
            </div>

            <div className="space-y-2">
              <label className="block text-gray-400 text-sm font-medium">
                Project Type *
              </label>
              <select
                name="projectType"
                value={formData.projectType}
                onChange={handleInputChange}
                required
                className="w-full px-4 py-4 bg-white/5 border border-white/10 rounded-xl text-white focus:outline-none focus:border-blue-500 focus:bg-white/10 focus:ring-2 focus:ring-blue-500/20 transition-all duration-300"
              >
                <option value="" className="bg-gray-800">Select project type</option>
                {projectTypes.map((type) => (
                  <option key={type.value} value={type.value} className="bg-gray-800">
                    {type.label} ({type.price})
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* Budget & Timeline */}
          <div className="grid md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <label className="block text-gray-400 text-sm font-medium">
                Estimated Budget
              </label>
              <input
                type="text"
                name="budget"
                value={formData.budget}
                onChange={handleInputChange}
                className="w-full px-4 py-4 bg-white/5 border border-white/10 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:border-blue-500 focus:bg-white/10 focus:ring-2 focus:ring-blue-500/20 transition-all duration-300"
                placeholder="e.g., $5,000 - $10,000"
              />
            </div>

            <div className="space-y-2">
              <label className="block text-gray-400 text-sm font-medium">
                Project Timeline
              </label>
              <input
                type="text"
                name="timeline"
                value={formData.timeline}
                onChange={handleInputChange}
                className="w-full px-4 py-4 bg-white/5 border border-white/10 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:border-blue-500 focus:bg-white/10 focus:ring-2 focus:ring-blue-500/20 transition-all duration-300"
                placeholder="e.g., 2-3 months"
              />
            </div>
          </div>

          {/* Priority Level */}
          <div className="space-y-2">
            <label className="block text-gray-400 text-sm font-medium">
              Priority Level
            </label>
            <div className="grid grid-cols-1 md:grid-cols-5 gap-3">
              {priorityLevels.map((priority) => (
                <motion.label
                  key={priority.value}
                  className={`relative cursor-pointer p-3 rounded-xl border transition-all duration-300 ${
                    formData.priority === priority.value
                      ? 'border-blue-500 bg-blue-500/20'
                      : 'border-white/10 bg-white/5 hover:border-white/20'
                  }`}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <input
                    type="radio"
                    name="priority"
                    value={priority.value}
                    checked={formData.priority === priority.value}
                    onChange={handleInputChange}
                    className="sr-only"
                  />
                  <div className="text-center">
                    <div className="text-sm font-medium text-white mb-1">{priority.label}</div>
                    <div className="text-xs text-gray-400">{priority.responseTime}</div>
                  </div>
                </motion.label>
              ))}
            </div>
          </div>

          {/* Subject */}
          <div className="space-y-2">
            <label className="block text-gray-400 text-sm font-medium">
              Subject
            </label>
            <div className="relative">
              <FontAwesomeIcon 
                icon={faHeading} 
                className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" 
              />
              <input
                type="text"
                name="subject"
                value={formData.subject}
                onChange={handleInputChange}
                className="w-full pl-12 pr-4 py-4 bg-white/5 border border-white/10 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:border-blue-500 focus:bg-white/10 focus:ring-2 focus:ring-blue-500/20 transition-all duration-300"
                placeholder="Project subject or inquiry type"
              />
            </div>
          </div>

          {/* Message */}
          <div className="space-y-2">
            <label className="block text-gray-400 text-sm font-medium">
              Project Details *
            </label>
            <div className="relative">
              <FontAwesomeIcon 
                icon={faMessage} 
                className="absolute left-4 top-4 text-gray-400" 
              />
              <textarea
                name="content"
                value={formData.content}
                onChange={handleInputChange}
                required
                rows={6}
                className="w-full pl-12 pr-4 py-4 bg-white/5 border border-white/10 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:border-blue-500 focus:bg-white/10 focus:ring-2 focus:ring-blue-500/20 transition-all duration-300 resize-none"
                placeholder="Describe your project requirements, goals, and any specific features you need. The more details you provide, the better I can understand and help with your project."
              />
            </div>
          </div>

          {/* Submit Button */}
          <motion.button
            type="submit"
            disabled={isSubmitting}
            className={`relative w-full py-6 px-8 rounded-2xl font-bold text-lg text-white transition-all duration-500 overflow-hidden ${
              isSubmitting
                ? 'bg-gray-600 cursor-not-allowed'
                : 'bg-gradient-to-r from-blue-500 via-purple-600 to-cyan-500 hover:from-blue-600 hover:via-purple-700 hover:to-cyan-600 shadow-2xl hover:shadow-blue-500/25'
            }`}
            whileHover={!isSubmitting ? { scale: 1.02, y: -2 } : {}}
            whileTap={!isSubmitting ? { scale: 0.98 } : {}}
          >
            {/* Button Background Effect */}
            <div className="absolute inset-0 bg-gradient-to-r from-blue-500 via-purple-600 to-cyan-500 opacity-0 hover:opacity-100 transition-opacity duration-500" />
            
            <div className="relative flex items-center justify-center">
              {isSubmitting ? (
                <>
                  <motion.div
                    className="w-6 h-6 border-2 border-white border-t-transparent rounded-full mr-3"
                    animate={{ rotate: 360 }}
                    transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                  />
                  Quantum Processing...
                </>
              ) : (
                <>
                  <FontAwesomeIcon icon={faRocket} className="mr-3 text-xl" />
                  Launch Project
                  <motion.div
                    className="ml-3"
                    animate={{ x: [0, 5, 0] }}
                    transition={{ duration: 1.5, repeat: Infinity }}
                  >
                    🚀
                  </motion.div>
                </>
              )}
            </div>
          </motion.button>
        </form>
      </motion.div>
    );
  };

  return (
    <section className="relative py-20 lg:py-32 overflow-hidden" onMouseMove={handleMouseMove}>
      {/* Quantum Background */}
      {isQuantumMode && (
        <canvas
          ref={canvasRef}
          className="absolute inset-0 z-0 opacity-30"
          style={{ mixBlendMode: 'screen' }}
        />
      )}

      {/* Background Gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-gray-900 via-cyan-900/20 to-purple-900/20" />
      <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />

      {/* Floating Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {[...Array(12)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-4 h-4 bg-cyan-400/20 rounded-full"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
            animate={{
              y: [0, -100, 0],
              opacity: [0.2, 1, 0.2],
              scale: [1, 2, 1],
            }}
            transition={{
              duration: 6 + Math.random() * 4,
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
            className="inline-flex items-center justify-center px-6 py-3 bg-gradient-to-r from-cyan-500/20 to-purple-500/20 border border-cyan-500/30 rounded-full mb-6"
            initial={{ scale: 0 }}
            animate={inView ? { scale: 1 } : { scale: 0 }}
            transition={{ delay: 0.2, type: "spring", damping: 20 }}
          >
            <FontAwesomeIcon icon={faRocket} className="text-cyan-400 mr-2" />
            <span className="text-cyan-400 font-semibold">QUANTUM CONTACT PORTAL</span>
          </motion.div>

          <motion.h2
            className="text-5xl md:text-6xl lg:text-7xl font-bold mb-6"
            initial={{ opacity: 0, scale: 0.5 }}
            animate={inView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.5 }}
            transition={{ delay: 0.4, duration: 0.8 }}
          >
            <span className="bg-gradient-to-r from-cyan-400 via-blue-400 to-purple-400 bg-clip-text text-transparent">
              🚀 Let's Connect
            </span>
            <br />
            <span className="text-white">& Create Magic</span>
          </motion.h2>

          <motion.p
            className="text-xl md:text-2xl text-gray-300 max-w-4xl mx-auto mb-8"
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ delay: 0.6 }}
          >
            Ready to transform your ideas into <span className="text-transparent bg-gradient-to-r from-cyan-400 to-purple-400 bg-clip-text font-semibold">digital reality</span>? Let's discuss your next breakthrough project
          </motion.p>

          {/* Control Panel */}
          <motion.div
            className="flex flex-wrap items-center justify-center gap-4"
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ delay: 0.8 }}
          >
            {/* Tab Navigation */}
            <div className="flex bg-white/10 border border-white/20 rounded-xl overflow-hidden">
              {[
                { id: 'contact', label: '📞 Contact', icon: faPhone },
                { id: 'social', label: '🌐 Social', icon: faGlobe },
                { id: 'form', label: '📋 Project', icon: faRocket }
              ].map((tab) => (
                <motion.button
                  key={tab.id}
                  className={`px-6 py-3 font-semibold transition-all duration-300 ${
                    activeTab === tab.id 
                      ? 'bg-gradient-to-r from-cyan-500 to-purple-600 text-white' 
                      : 'text-gray-400 hover:text-white hover:bg-white/10'
                  }`}
                  onClick={() => setActiveTab(tab.id)}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <FontAwesomeIcon icon={tab.icon} className="mr-2" />
                  {tab.label}
                </motion.button>
              ))}
            </div>

            {/* Quantum Mode Toggle */}
            <motion.button
              className={`px-6 py-3 rounded-xl font-semibold transition-all duration-300 ${
                isQuantumMode 
                  ? 'bg-gradient-to-r from-cyan-500 to-purple-500 text-white' 
                  : 'bg-white/10 border border-white/20 text-white hover:bg-white/20'
              }`}
              onClick={() => setIsQuantumMode(!isQuantumMode)}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              ⚛️ Quantum Mode
            </motion.button>
          </motion.div>
        </motion.div>

        {/* 📱 TAB CONTENT - Nội dung tab */}
        <AnimatePresence mode="wait">
          {activeTab === 'contact' && (
            <motion.div
              key="contact"
              initial={{ opacity: 0, x: -100 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 100 }}
              transition={{ duration: 0.5 }}
            >
              <div className="text-center mb-12">
                <h3 className="text-3xl font-bold text-white mb-4">🔗 Multiple Ways to Reach Me</h3>
                <p className="text-gray-400 text-lg">Choose your preferred communication method</p>
              </div>
              
              <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
                {contactMethods.map((contact, index) => (
                  <HolographicContactCard key={contact.id} contact={contact} index={index} />
                ))}
              </div>

              {/* Quick Stats */}
              <motion.div
                className="mt-12 grid grid-cols-2 md:grid-cols-4 gap-6"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 }}
              >
                {[
                  { icon: faBolt, value: "< 2 hours", label: "Avg Response Time" },
                  { icon: faGlobe, value: "24/7", label: "Availability" },
                  { icon: faHeart, value: "100%", label: "Client Satisfaction" },
                  { icon: faRocket, value: "50+", label: "Projects Delivered" }
                ].map((stat, index) => (
                  <motion.div
                    key={index}
                    className="text-center bg-white/5 backdrop-blur-lg border border-white/10 rounded-2xl p-6"
                    initial={{ opacity: 0, scale: 0 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.5 + index * 0.1 }}
                  >
                    <div className="w-12 h-12 bg-gradient-to-r from-cyan-500 to-purple-600 rounded-xl flex items-center justify-center mx-auto mb-3">
                      <FontAwesomeIcon icon={stat.icon} className="text-xl text-white" />
                    </div>
                    <div className="text-2xl font-bold text-white mb-1">{stat.value}</div>
                    <div className="text-sm text-gray-400">{stat.label}</div>
                  </motion.div>
                ))}
              </motion.div>
            </motion.div>
          )}

          {activeTab === 'social' && (
            <motion.div
              key="social"
              initial={{ opacity: 0, x: -100 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 100 }}
              transition={{ duration: 0.5 }}
            >
              <div className="text-center mb-12">
                <h3 className="text-3xl font-bold text-white mb-4">🌐 Social Media Universe</h3>
                <p className="text-gray-400 text-lg">Follow my journey across different platforms</p>
              </div>
              
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {socialPlatforms.map((platform, index) => (
                  <SocialPlatformCard key={platform.platform} platform={platform} index={index} />
                ))}
              </div>

              {/* Social Stats */}
              <motion.div
                className="mt-12 text-center bg-white/5 backdrop-blur-lg border border-white/10 rounded-3xl p-8"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.8 }}
              >
                <h4 className="text-2xl font-bold text-white mb-6">📊 Combined Social Impact</h4>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                  <div>
                    <div className="text-3xl font-bold text-cyan-400 mb-1">25.8K</div>
                    <div className="text-sm text-gray-400">Total Followers</div>
                  </div>
                  <div>
                    <div className="text-3xl font-bold text-purple-400 mb-1">92%</div>
                    <div className="text-sm text-gray-400">Avg Engagement</div>
                  </div>
                  <div>
                    <div className="text-3xl font-bold text-blue-400 mb-1">1.2M</div>
                    <div className="text-sm text-gray-400">Total Reach</div>
                  </div>
                  <div>
                    <div className="text-3xl font-bold text-green-400 mb-1">365</div>
                    <div className="text-sm text-gray-400">Days Active</div>
                  </div>
                </div>
              </motion.div>
            </motion.div>
          )}

          {activeTab === 'form' && (
            <motion.div
              key="form"
              initial={{ opacity: 0, x: -100 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 100 }}
              transition={{ duration: 0.5 }}
            >
              <QuantumContactForm />
            </motion.div>
          )}
        </AnimatePresence>

        {/* 🎯 CALL TO ACTION - Kêu gọi hành động cuối */}
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
            <motion.div
              className="text-center"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1.7 }}
            >
              <h4 className="text-2xl font-bold text-white mb-4">Ready to Start Your Digital Journey?</h4>
              <p className="text-gray-400 mb-6 max-w-2xl">
                Join the ranks of successful businesses and entrepreneurs who've transformed their ideas into digital reality. 
                Let's create something that not only works beautifully but also drives real results.
              </p>
              
              <div className="flex flex-wrap justify-center gap-4">
                <motion.a
                  href="mailto:nhdinh.dev@gmail.com"
                  className="group inline-flex items-center px-8 py-4 bg-gradient-to-r from-cyan-500 to-purple-600 text-white rounded-2xl font-bold text-lg shadow-2xl hover:from-cyan-600 hover:to-purple-700 transition-all duration-300"
                  whileHover={{ scale: 1.05, boxShadow: "0 20px 40px rgba(6, 182, 212, 0.3)" }}
                  whileTap={{ scale: 0.95 }}
                >
                  <FontAwesomeIcon icon={faEnvelope} className="mr-3 text-xl group-hover:rotate-12 transition-transform duration-300" />
                  Send Email Now
                  <motion.div
                    className="ml-2"
                    animate={{ x: [0, 5, 0] }}
                    transition={{ duration: 1.5, repeat: Infinity }}
                  >
                    📧
                  </motion.div>
                </motion.a>

                <motion.a
                  href="tel:+84123456789"
                  className="group inline-flex items-center px-8 py-4 bg-white/10 border border-white/20 text-white rounded-2xl font-bold text-lg hover:bg-white/20 transition-all duration-300"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <FontAwesomeIcon icon={faPhone} className="mr-3 text-xl group-hover:rotate-12 transition-transform duration-300" />
                  Quick Call
                </motion.a>
              </div>
            </motion.div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default Contact;
