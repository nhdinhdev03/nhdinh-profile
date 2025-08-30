import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { 
  faPaperPlane, 
  faUser, 
  faEnvelope, 
  faHeading, 
  faMessage,
  faPhone,
  faMapMarkerAlt,
  faCheckCircle
} from '@fortawesome/free-solid-svg-icons';
import { faGithub, faLinkedin, faFacebook, faTelegram } from '@fortawesome/free-brands-svg-icons';
import { useInView } from 'react-intersection-observer';
import ContactEnvelopeEffect from '../effects3D/ContactEnvelopeEffect';

const Contact = () => {
  const [ref, inView] = useInView({
    threshold: 0.1,
    triggerOnce: true,
  });

  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    subject: '',
    content: ''
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const contactInfo = [
    {
      icon: faEnvelope,
      label: "Email",
      value: "nhdinh.dev@gmail.com",
      link: "mailto:nhdinh.dev@gmail.com"
    },
    {
      icon: faPhone,
      label: "Điện thoại",
      value: "+84 123 456 789",
      link: "tel:+84123456789"
    },
    {
      icon: faMapMarkerAlt,
      label: "Địa chỉ",
      value: "Hà Nội, Việt Nam",
      link: "https://maps.google.com"
    }
  ];

  const socialLinks = [
    { icon: faGithub, url: "https://github.com/nhdinhdev03", label: "GitHub", color: "hover:text-gray-400" },
    { icon: faLinkedin, url: "https://linkedin.com/in/nhdinh", label: "LinkedIn", color: "hover:text-blue-400" },
    { icon: faFacebook, url: "https://facebook.com/nhdinh.dev", label: "Facebook", color: "hover:text-blue-500" },
    { icon: faTelegram, url: "https://t.me/nhdinh", label: "Telegram", color: "hover:text-cyan-400" },
  ];

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

    // Simulate API call
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSubmitted(true);
      setFormData({
        fullName: '',
        email: '',
        subject: '',
        content: ''
      });

      // Reset success message after 5 seconds
      setTimeout(() => {
        setIsSubmitted(false);
      }, 5000);
    }, 2000);
  };

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

  return (
    <section id="contact" className="relative py-20 lg:py-32 overflow-hidden">
      {/* 3D Interactive Envelope Effect */}
      <ContactEnvelopeEffect className="opacity-70" />
      
      {/* Background Elements */}
      <div className="absolute inset-0 bg-gradient-to-br from-gray-900 via-blue-900/10 to-purple-900/10" />
      
      {/* Animated Background Shapes */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <motion.div
          className="absolute top-1/4 left-10 w-72 h-72 bg-blue-500/5 rounded-full blur-3xl"
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.3, 0.5, 0.3],
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
        <motion.div
          className="absolute bottom-1/4 right-10 w-96 h-96 bg-purple-500/5 rounded-full blur-3xl"
          animate={{
            scale: [1.2, 1, 1.2],
            opacity: [0.5, 0.3, 0.5],
          }}
          transition={{
            duration: 10,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
      </div>

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
            Liên hệ <span className="bg-gradient-to-r from-blue-400 to-purple-600 bg-clip-text text-transparent">với tôi</span>
          </motion.h2>
          <motion.p
            className="text-xl text-gray-400 max-w-3xl mx-auto"
            variants={itemVariants}
          >
            Hãy kết nối và cùng nhau tạo ra những điều tuyệt vời
          </motion.p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-16 items-start">
          {/* Left Column - Contact Info */}
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate={inView ? "visible" : "hidden"}
            className="space-y-8"
          >
            {/* Contact Information */}
            <motion.div
              className="bg-white/5 backdrop-blur-lg border border-white/10 rounded-3xl p-8"
              variants={itemVariants}
            >
              <h3 className="text-2xl font-bold text-white mb-8">Thông tin liên hệ</h3>
              
              <div className="space-y-6">
                {contactInfo.map((info, index) => (
                  <motion.a
                    key={index}
                    href={info.link}
                    target={info.link.startsWith('http') ? '_blank' : '_self'}
                    rel={info.link.startsWith('http') ? 'noopener noreferrer' : ''}
                    className="flex items-center p-4 bg-white/5 border border-white/10 rounded-xl hover:bg-white/10 hover:border-white/20 transition-all duration-300 group"
                    whileHover={{ x: 5 }}
                  >
                    <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center mr-4 group-hover:scale-110 transition-transform duration-300">
                      <FontAwesomeIcon icon={info.icon} className="text-white" />
                    </div>
                    <div>
                      <p className="text-gray-400 text-sm">{info.label}</p>
                      <p className="text-white font-medium">{info.value}</p>
                    </div>
                  </motion.a>
                ))}
              </div>
            </motion.div>

            {/* Social Links */}
            <motion.div
              className="bg-white/5 backdrop-blur-lg border border-white/10 rounded-3xl p-8"
              variants={itemVariants}
            >
              <h3 className="text-2xl font-bold text-white mb-8">Kết nối với tôi</h3>
              
              <div className="grid grid-cols-2 gap-4">
                {socialLinks.map((social, index) => (
                  <motion.a
                    key={index}
                    href={social.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`flex items-center justify-center p-4 bg-white/5 border border-white/10 rounded-xl text-gray-400 ${social.color} transition-all duration-300 group`}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <FontAwesomeIcon icon={social.icon} className="text-2xl mr-3" />
                    <span className="font-medium">{social.label}</span>
                  </motion.a>
                ))}
              </div>
            </motion.div>

            {/* Quick Stats */}
            <motion.div
              className="bg-white/5 backdrop-blur-lg border border-white/10 rounded-3xl p-8"
              variants={itemVariants}
            >
              <h3 className="text-2xl font-bold text-white mb-8">Thống kê nhanh</h3>
              
              <div className="grid grid-cols-2 gap-6">
                {[
                  { number: "24h", label: "Thời gian phản hồi" },
                  { number: "100%", label: "Tỷ lệ hoàn thành" },
                  { number: "5+", label: "Năm kinh nghiệm" },
                  { number: "50+", label: "Dự án thành công" }
                ].map((stat, index) => (
                  <motion.div
                    key={index}
                    className="text-center"
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={inView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.8 }}
                    transition={{ delay: index * 0.1 }}
                  >
                    <div className="text-2xl font-bold text-blue-400 mb-1">{stat.number}</div>
                    <div className="text-sm text-gray-400">{stat.label}</div>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </motion.div>

          {/* Right Column - Contact Form */}
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate={inView ? "visible" : "hidden"}
          >
            <motion.div
              className="bg-white/5 backdrop-blur-lg border border-white/10 rounded-3xl p-8"
              variants={itemVariants}
            >
              <h3 className="text-2xl font-bold text-white mb-8">Gửi tin nhắn</h3>

              {/* Success Message */}
              {isSubmitted && (
                <motion.div
                  className="mb-6 p-4 bg-green-500/20 border border-green-500/30 rounded-xl flex items-center text-green-400"
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.8 }}
                >
                  <FontAwesomeIcon icon={faCheckCircle} className="mr-3" />
                  Tin nhắn đã được gửi thành công! Tôi sẽ phản hồi sớm nhất có thể.
                </motion.div>
              )}

              <form onSubmit={handleSubmit} className="space-y-6">
                {/* Full Name */}
                <div>
                  <label className="block text-gray-400 text-sm font-medium mb-2">
                    Họ và tên *
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
                      className="w-full pl-12 pr-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:border-blue-500 focus:bg-white/10 transition-all duration-300"
                      placeholder="Nhập họ và tên của bạn"
                    />
                  </div>
                </div>

                {/* Email */}
                <div>
                  <label className="block text-gray-400 text-sm font-medium mb-2">
                    Email *
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
                      className="w-full pl-12 pr-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:border-blue-500 focus:bg-white/10 transition-all duration-300"
                      placeholder="Nhập email của bạn"
                    />
                  </div>
                </div>

                {/* Subject */}
                <div>
                  <label className="block text-gray-400 text-sm font-medium mb-2">
                    Chủ đề
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
                      className="w-full pl-12 pr-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:border-blue-500 focus:bg-white/10 transition-all duration-300"
                      placeholder="Chủ đề tin nhắn"
                    />
                  </div>
                </div>

                {/* Message */}
                <div>
                  <label className="block text-gray-400 text-sm font-medium mb-2">
                    Nội dung *
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
                      rows={5}
                      className="w-full pl-12 pr-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:border-blue-500 focus:bg-white/10 transition-all duration-300 resize-none"
                      placeholder="Nhập nội dung tin nhắn của bạn..."
                    />
                  </div>
                </div>

                {/* Submit Button */}
                <motion.button
                  type="submit"
                  disabled={isSubmitting}
                  className={`w-full py-4 px-6 rounded-xl font-semibold text-white transition-all duration-300 flex items-center justify-center ${
                    isSubmitting
                      ? 'bg-gray-500 cursor-not-allowed'
                      : 'bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 shadow-lg hover:shadow-xl'
                  }`}
                  whileHover={!isSubmitting ? { scale: 1.02 } : {}}
                  whileTap={!isSubmitting ? { scale: 0.98 } : {}}
                >
                  {isSubmitting ? (
                    <>
                      <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-3"></div>
                      Đang gửi...
                    </>
                  ) : (
                    <>
                      <FontAwesomeIcon icon={faPaperPlane} className="mr-3" />
                      Gửi tin nhắn
                    </>
                  )}
                </motion.button>
              </form>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
