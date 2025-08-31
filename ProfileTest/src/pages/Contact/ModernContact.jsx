import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useTheme } from '../../contexts/ThemeContext';
import { generateThemeClasses, getThemeGradient, getThemeParticleColor } from '../../utils/themeUtils';
import { 
  FiMail,
  FiLinkedin,
  FiGithub,
  FiTwitter,
  FiMapPin,
  FiPhone,
  FiClock,
  FiSend,
  FiUser,
  FiMessageSquare,
  FiZap,
  FiActivity,
  FiWifi,
  FiShield,
  FiGlobe,
  FiCpu
} from 'react-icons/fi';

function ModernContact() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const { theme } = useTheme();
  const themeClasses = generateThemeClasses(theme);

  useEffect(() => {
    const handleMouseMove = (e) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    setIsSubmitting(false);
    setSubmitted(true);
    setFormData({ name: '', email: '', subject: '', message: '' });
    
    // Reset submitted state after 3 seconds
    setTimeout(() => setSubmitted(false), 3000);
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const contactInfo = [
    {
      icon: FiMail,
      label: 'Email',
      value: 'contact@nhdinh.dev',
      href: 'mailto:contact@nhdinh.dev',
      gradient: 'from-blue-500 to-cyan-500',
      description: 'Primary communication channel'
    },
    {
      icon: FiLinkedin,
      label: 'LinkedIn',
      value: 'linkedin.com/in/nhdinh',
      href: 'https://linkedin.com/in/nhdinh',
      gradient: 'from-blue-600 to-blue-800',
      description: 'Professional network'
    },
    {
      icon: FiGithub,
      label: 'GitHub',
      value: 'github.com/nhdinhdev03',
      href: 'https://github.com/nhdinhdev03',
      gradient: 'from-gray-600 to-gray-800',
      description: 'Open source projects'
    },
    {
      icon: FiMapPin,
      label: 'Location',
      value: 'San Francisco, CA',
      href: '#',
      gradient: 'from-green-500 to-emerald-500',
      description: 'Available for remote work'
    }
  ];

  const quickActions = [
    {
      title: 'Schedule a Call',
      description: 'Book a 30-minute consultation',
      icon: FiPhone,
      gradient: 'from-purple-500 to-pink-500',
      action: () => window.open('https://calendly.com/nhdinh', '_blank')
    },
    {
      title: 'View Portfolio',
      description: 'Explore my latest projects',
      icon: FiGlobe,
      gradient: 'from-orange-500 to-red-500',
      action: () => window.location.href = '/projects'
    },
    {
      title: 'Download Resume',
      description: 'Get my detailed CV',
      icon: FiUser,
      gradient: 'from-teal-500 to-cyan-500',
      action: () => window.open('/resume.pdf', '_blank')
    }
  ];

  const statusIndicators = [
    { label: 'Response Time', value: '< 24h', icon: FiClock, color: 'text-green-400' },
    { label: 'Availability', value: 'Open', icon: FiActivity, color: 'text-green-400' },
    { label: 'Time Zone', value: 'PST', icon: FiGlobe, color: 'text-blue-400' },
    { label: 'Status', value: 'Online', icon: FiWifi, color: 'text-green-400' }
  ];

  return (
    <div className={themeClasses.container}>
      {/* Dynamic Background */}
      <div className="absolute inset-0">
        <div className={`absolute inset-0 ${themeClasses.heroBackground}`} />
        
        {/* Neural network grid */}
        <div 
          className={`absolute inset-0 ${themeClasses.opacity}`}
          style={{
            background: getThemeGradient(theme, 'neural'),
            backgroundSize: '50px 50px'
          }}
        />
        
        {/* Communication signals */}
        {Array.from({ length: 15 }).map((_, i) => (
          <motion.div
            key={i}
            className={`absolute w-2 h-2 rounded-full ${getThemeParticleColor(theme)}`}
            animate={{
              x: [Math.random() * window.innerWidth, Math.random() * window.innerWidth],
              y: [Math.random() * window.innerHeight, Math.random() * window.innerHeight],
              opacity: [0, 1, 0],
              scale: [0.5, 2, 0.5]
            }}
            transition={{
              duration: 6 + Math.random() * 6,
              repeat: Infinity,
              ease: 'easeInOut',
              delay: Math.random() * 3
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
            <motion.h1 
              className={`text-5xl md:text-7xl font-bold mb-6 transition-colors duration-300 ${
                theme === 'dark' ? 'text-white' : 'text-gray-900'
              }`}
              whileHover={{ scale: 1.02 }}
            >
              <span className="bg-gradient-to-r from-purple-400 via-pink-400 to-cyan-400 bg-clip-text text-transparent">
                Let's Connect
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
              Ready to discuss innovative AI solutions, collaborate on cutting-edge projects, 
              or explore new opportunities? I'm here to help bring your ideas to life.
            </motion.p>

            {/* Status Dashboard */}
            <motion.div
              className="flex flex-wrap justify-center gap-6 mt-12"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
            >
              {statusIndicators.map((status, index) => (
                <motion.div
                  key={status.label}
                  className={`flex items-center space-x-3 px-4 py-3 rounded-2xl border backdrop-blur-sm transition-all duration-300 ${
                    theme === 'dark' 
                      ? 'bg-gray-900/50 border-gray-700/50' 
                      : 'bg-white/70 border-gray-200/50'
                  }`}
                  whileHover={{ scale: 1.05, y: -5 }}
                  animate={{
                    borderColor: theme === 'dark' 
                      ? ['rgba(75, 85, 99, 0.5)', 'rgba(139, 92, 246, 0.5)', 'rgba(75, 85, 99, 0.5)']
                      : ['rgba(229, 231, 235, 0.5)', 'rgba(139, 92, 246, 0.5)', 'rgba(229, 231, 235, 0.5)'],
                  }}
                  transition={{
                    borderColor: { duration: 3, repeat: Infinity, delay: index * 0.5 }
                  }}
                >
                  <status.icon className={`w-4 h-4 ${status.color}`} />
                  <div>
                    <div className="text-white font-medium text-sm">{status.value}</div>
                    <div className="text-gray-400 text-xs">{status.label}</div>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </motion.section>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Contact Form */}
            <motion.section
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
            >
              <motion.h2 
                className="text-3xl font-bold mb-8"
                whileHover={{ scale: 1.02 }}
              >
                <span className="bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent">
                  Send a Message
                </span>
              </motion.h2>

              <AnimatePresence mode="wait">
                {submitted ? (
                  <motion.div
                    key="success"
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.8 }}
                    className="p-8 rounded-3xl bg-green-500/10 border border-green-500/30 text-center"
                  >
                    <motion.div
                      animate={{ rotate: 360 }}
                      transition={{ duration: 2, repeat: Infinity, ease: 'linear' }}
                      className="w-16 h-16 mx-auto mb-4 rounded-full bg-green-500 flex items-center justify-center"
                    >
                      <FiZap className="w-8 h-8 text-white" />
                    </motion.div>
                    <h3 className="text-xl font-bold text-green-400 mb-2">Message Sent!</h3>
                    <p className="text-gray-400">Thanks for reaching out. I'll get back to you soon!</p>
                  </motion.div>
                ) : (
                  <motion.form
                    key="form"
                    onSubmit={handleSubmit}
                    className="space-y-6"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                  >
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <motion.div
                        whileFocus={{ scale: 1.02 }}
                        className="relative"
                      >
                        <FiUser className="absolute left-4 top-4 text-gray-400 w-5 h-5" />
                        <input
                          type="text"
                          name="name"
                          value={formData.name}
                          onChange={handleChange}
                          required
                          className="w-full pl-12 pr-4 py-4 rounded-2xl bg-gray-900/50 border border-gray-700/50 text-white placeholder-gray-400 focus:outline-none focus:border-purple-500 focus:bg-gray-900/70 transition-all duration-300"
                          placeholder="Your Name"
                        />
                      </motion.div>

                      <motion.div
                        whileFocus={{ scale: 1.02 }}
                        className="relative"
                      >
                        <FiMail className="absolute left-4 top-4 text-gray-400 w-5 h-5" />
                        <input
                          type="email"
                          name="email"
                          value={formData.email}
                          onChange={handleChange}
                          required
                          className="w-full pl-12 pr-4 py-4 rounded-2xl bg-gray-900/50 border border-gray-700/50 text-white placeholder-gray-400 focus:outline-none focus:border-purple-500 focus:bg-gray-900/70 transition-all duration-300"
                          placeholder="Your Email"
                        />
                      </motion.div>
                    </div>

                    <motion.div
                      whileFocus={{ scale: 1.02 }}
                      className="relative"
                    >
                      <FiMessageSquare className="absolute left-4 top-4 text-gray-400 w-5 h-5" />
                      <input
                        type="text"
                        name="subject"
                        value={formData.subject}
                        onChange={handleChange}
                        required
                        className="w-full pl-12 pr-4 py-4 rounded-2xl bg-gray-900/50 border border-gray-700/50 text-white placeholder-gray-400 focus:outline-none focus:border-purple-500 focus:bg-gray-900/70 transition-all duration-300"
                        placeholder="Subject"
                      />
                    </motion.div>

                    <motion.div
                      whileFocus={{ scale: 1.02 }}
                      className="relative"
                    >
                      <textarea
                        name="message"
                        value={formData.message}
                        onChange={handleChange}
                        required
                        rows={6}
                        className="w-full p-4 rounded-2xl bg-gray-900/50 border border-gray-700/50 text-white placeholder-gray-400 focus:outline-none focus:border-purple-500 focus:bg-gray-900/70 transition-all duration-300 resize-none"
                        placeholder="Your message..."
                      />
                    </motion.div>

                    <motion.button
                      type="submit"
                      disabled={isSubmitting}
                      className="w-full relative overflow-hidden bg-gradient-to-r from-purple-500 to-pink-500 text-white py-4 rounded-2xl font-semibold text-lg shadow-2xl hover:shadow-purple-500/25 transition-all duration-300 disabled:opacity-50"
                      whileHover={{ scale: 1.02, rotateX: 5 }}
                      whileTap={{ scale: 0.98 }}
                    >
                      <AnimatePresence mode="wait">
                        {isSubmitting ? (
                          <motion.div
                            key="loading"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            className="flex items-center justify-center space-x-2"
                          >
                            <motion.div
                              animate={{ rotate: 360 }}
                              transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
                            >
                              <FiCpu className="w-5 h-5" />
                            </motion.div>
                            <span>Processing...</span>
                          </motion.div>
                        ) : (
                          <motion.div
                            key="send"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            className="flex items-center justify-center space-x-2"
                          >
                            <FiSend className="w-5 h-5" />
                            <span>Send Message</span>
                          </motion.div>
                        )}
                      </AnimatePresence>

                      {/* Animated background */}
                      <motion.div
                        className="absolute inset-0 bg-gradient-to-r from-pink-500 to-purple-500 opacity-0 hover:opacity-100 transition-opacity duration-300"
                        animate={{
                          x: ['-100%', '100%'],
                        }}
                        transition={{
                          duration: 2,
                          repeat: Infinity,
                          ease: 'linear',
                        }}
                      />
                    </motion.button>
                  </motion.form>
                )}
              </AnimatePresence>
            </motion.section>

            {/* Contact Info */}
            <motion.section
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              className="space-y-8"
            >
              <motion.h2 
                className="text-3xl font-bold mb-8"
                whileHover={{ scale: 1.02 }}
              >
                <span className="bg-gradient-to-r from-green-400 to-emerald-400 bg-clip-text text-transparent">
                  Contact Information
                </span>
              </motion.h2>

              {/* Contact Cards */}
              <div className="space-y-6">
                {contactInfo.map((info, index) => (
                  <motion.a
                    key={info.label}
                    href={info.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="block p-6 rounded-2xl bg-gray-900/50 border border-gray-800 backdrop-blur-sm hover:border-gray-600 transition-all duration-300 group"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                    whileHover={{ y: -5, scale: 1.02 }}
                  >
                    <div className="flex items-center space-x-4">
                      <motion.div
                        className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${info.gradient} flex items-center justify-center text-white`}
                        whileHover={{ rotate: 360, scale: 1.1 }}
                        transition={{ duration: 0.8 }}
                      >
                        <info.icon className="w-8 h-8" />
                      </motion.div>
                      <div className="flex-1">
                        <h3 className="text-xl font-bold text-white group-hover:text-cyan-400 transition-colors">
                          {info.label}
                        </h3>
                        <p className="text-gray-400 mb-1">{info.value}</p>
                        <p className="text-gray-500 text-sm">{info.description}</p>
                      </div>
                    </div>
                  </motion.a>
                ))}
              </div>

              {/* Quick Actions */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 }}
              >
                <h3 className="text-xl font-bold text-white mb-6">Quick Actions</h3>
                <div className="space-y-4">
                  {quickActions.map((action, index) => (
                    <motion.button
                      key={action.title}
                      onClick={action.action}
                      className="w-full p-4 rounded-2xl bg-gray-900/30 border border-gray-800 hover:border-gray-600 text-left group transition-all duration-300"
                      whileHover={{ x: 10, scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                    >
                      <div className="flex items-center space-x-4">
                        <motion.div
                          className={`w-12 h-12 rounded-xl bg-gradient-to-br ${action.gradient} flex items-center justify-center text-white`}
                          whileHover={{ rotate: 180 }}
                          transition={{ duration: 0.6 }}
                        >
                          <action.icon className="w-6 h-6" />
                        </motion.div>
                        <div>
                          <h4 className="font-semibold text-white group-hover:text-cyan-400 transition-colors">
                            {action.title}
                          </h4>
                          <p className="text-gray-400 text-sm">{action.description}</p>
                        </div>
                      </div>
                    </motion.button>
                  ))}
                </div>
              </motion.div>

              {/* Social Media Links */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.7 }}
              >
                <h3 className="text-xl font-bold text-white mb-6">Follow Me</h3>
                <div className="flex space-x-4">
                  {[
                    { icon: FiGithub, href: 'https://github.com/nhdinhdev03', label: 'GitHub', color: 'hover:text-gray-400' },
                    { icon: FiLinkedin, href: 'https://linkedin.com/in/nhdinh', label: 'LinkedIn', color: 'hover:text-blue-400' },
                    { icon: FiTwitter, href: 'https://twitter.com/nhdinhdev', label: 'Twitter', color: 'hover:text-cyan-400' },
                    { icon: FiMail, href: 'mailto:contact@nhdinh.dev', label: 'Email', color: 'hover:text-red-400' }
                  ].map((social, index) => (
                    <motion.a
                      key={social.label}
                      href={social.href}
                      target="_blank"
                      rel="noopener noreferrer"
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
                </div>
              </motion.div>
            </motion.section>
          </div>

          {/* Security Notice */}
          <motion.section
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="mt-20 text-center"
          >
            <motion.div
              className="inline-flex items-center space-x-3 px-6 py-3 rounded-2xl bg-gray-900/50 border border-gray-700/50"
              whileHover={{ scale: 1.05 }}
            >
              <FiShield className="w-5 h-5 text-green-400" />
              <span className="text-gray-400">Your information is secure and encrypted</span>
            </motion.div>
          </motion.section>
        </div>
      </div>
    </div>
  );
}

export default ModernContact;
