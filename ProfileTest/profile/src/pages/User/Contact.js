import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { 
  faEnvelope, 
  faPhone, 
  faMapMarkerAlt,
  faPaperPlane,
  faUser,
  faCommentDots,
  faCheckCircle
} from '@fortawesome/free-solid-svg-icons';
import {
  faGithub,
  faLinkedin,
  faFacebook,
  faTwitter
} from '@fortawesome/free-brands-svg-icons';
import '../../styles/smooth-effects.scss';

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const contactInfo = [
    {
      icon: faEnvelope,
      label: 'Email',
      value: 'nhdinh.dev@gmail.com',
      href: 'mailto:nhdinh.dev@gmail.com',
      color: 'text-blue-400'
    },
    {
      icon: faPhone,
      label: 'Điện thoại',
      value: '+84 123 456 789',
      href: 'tel:+84123456789',
      color: 'text-green-400'
    },
    {
      icon: faMapMarkerAlt,
      label: 'Địa chỉ',
      value: 'Hà Nội, Việt Nam',
      href: '#',
      color: 'text-red-400'
    }
  ];

  const socialLinks = [
    {
      icon: faGithub,
      label: 'GitHub',
      href: 'https://github.com/nhdinhdev03',
      color: 'hover:text-gray-400'
    },
    {
      icon: faLinkedin,
      label: 'LinkedIn',
      href: 'https://linkedin.com/in/nhdinh',
      color: 'hover:text-blue-500'
    },
    {
      icon: faFacebook,
      label: 'Facebook',
      href: 'https://facebook.com/nhdinh.dev',
      color: 'hover:text-blue-600'
    },
    {
      icon: faTwitter,
      label: 'Twitter',
      href: 'https://twitter.com/nhdinh_dev',
      color: 'hover:text-sky-400'
    }
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

    // Simulate form submission
    await new Promise(resolve => setTimeout(resolve, 2000));

    setIsSubmitting(false);
    setIsSubmitted(true);

    // Reset form after 3 seconds
    setTimeout(() => {
      setIsSubmitted(false);
      setFormData({
        name: '',
        email: '',
        subject: '',
        message: ''
      });
    }, 3000);
  };

  return (
    <section className="min-h-screen relative overflow-hidden contact-bg">
      <div className="relative z-10 container mx-auto px-4 py-20">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            <span className="text-gradient">Liên Hệ</span>
          </h2>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            Hãy kết nối với tôi! Tôi luôn sẵn sàng thảo luận về các dự án mới, 
            cơ hội hợp tác hoặc chỉ đơn giản là trò chuyện về công nghệ.
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-12">
          {/* Contact Information */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="space-y-8"
          >
            <h3 className="text-2xl font-bold text-white mb-6">
              <FontAwesomeIcon icon={faCommentDots} className="mr-3 text-green-400" />
              Thông tin liên hệ
            </h3>

            {/* Contact Cards */}
            <div className="space-y-4">
              {contactInfo.map((contact, index) => (
                <motion.a
                  key={contact.label}
                  href={contact.href}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  className="card-professional p-6 flex items-center space-x-4 group"
                >
                  <div className={`icon-professional text-2xl ${contact.color}`}>
                    <FontAwesomeIcon icon={contact.icon} />
                  </div>
                  <div>
                    <h4 className="text-lg font-semibold text-white group-hover:text-blue-400 transition-colors">
                      {contact.label}
                    </h4>
                    <p className="text-gray-300">{contact.value}</p>
                  </div>
                </motion.a>
              ))}
            </div>

            {/* Social Links */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="card-professional p-6"
            >
              <h4 className="text-lg font-semibold text-white mb-4">Kết nối với tôi</h4>
              <div className="flex space-x-4">
                {socialLinks.map((social, index) => (
                  <motion.a
                    key={social.label}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    initial={{ opacity: 0, scale: 0 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.3, delay: 0.5 + (index * 0.1) }}
                    className={`icon-professional text-2xl text-gray-400 ${social.color} transition-all duration-300 transform hover:scale-110`}
                    aria-label={social.label}
                  >
                    <FontAwesomeIcon icon={social.icon} />
                  </motion.a>
                ))}
              </div>
            </motion.div>

            {/* Quick Stats */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.6 }}
              className="grid grid-cols-2 gap-4"
            >
              {[
                { label: 'Response Time', value: '< 24h' },
                { label: 'Projects Completed', value: '20+' },
                { label: 'Happy Clients', value: '15+' },
                { label: 'Years Experience', value: '3+' }
              ].map((stat, index) => (
                <div key={stat.label} className="card-professional p-4 text-center">
                  <div className="text-2xl font-bold text-green-400 mb-1">{stat.value}</div>
                  <div className="text-sm text-gray-400">{stat.label}</div>
                </div>
              ))}
            </motion.div>
          </motion.div>

          {/* Contact Form */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="card-professional p-8"
          >
            <h3 className="text-2xl font-bold text-white mb-6">
              <FontAwesomeIcon icon={faPaperPlane} className="mr-3 text-blue-400" />
              Gửi tin nhắn
            </h3>

            {isSubmitted ? (
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className="text-center py-8"
              >
                <FontAwesomeIcon icon={faCheckCircle} className="text-5xl text-green-400 mb-4" />
                <h4 className="text-xl font-bold text-white mb-2">Gửi thành công!</h4>
                <p className="text-gray-300">Cảm ơn bạn đã liên hệ. Tôi sẽ phản hồi sớm nhất có thể.</p>
              </motion.div>
            ) : (
              <form onSubmit={handleSubmit} className="form-professional space-y-6">
                <div className="grid md:grid-cols-2 gap-4">
                  <div className="form-group">
                    <label htmlFor="name" className="form-label">
                      <FontAwesomeIcon icon={faUser} className="mr-2" />
                      Họ và tên *
                    </label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      value={formData.name}
                      onChange={handleInputChange}
                      required
                      className="form-input"
                      placeholder="Nhập họ và tên của bạn"
                    />
                  </div>

                  <div className="form-group">
                    <label htmlFor="email" className="form-label">
                      <FontAwesomeIcon icon={faEnvelope} className="mr-2" />
                      Email *
                    </label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      required
                      className="form-input"
                      placeholder="your.email@example.com"
                    />
                  </div>
                </div>

                <div className="form-group">
                  <label htmlFor="subject" className="form-label">
                    Chủ đề
                  </label>
                  <input
                    type="text"
                    id="subject"
                    name="subject"
                    value={formData.subject}
                    onChange={handleInputChange}
                    className="form-input"
                    placeholder="Chủ đề tin nhắn"
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="message" className="form-label">
                    Tin nhắn *
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleInputChange}
                    required
                    rows={5}
                    className="form-input resize-none"
                    placeholder="Nhập nội dung tin nhắn của bạn..."
                  />
                </div>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="btn-professional btn-primary w-full"
                >
                  {isSubmitting ? (
                    <>
                      <div className="loading-professional mr-2">
                        <div className="dot"></div>
                        <div className="dot"></div>
                        <div className="dot"></div>
                      </div>
                      Đang gửi...
                    </>
                  ) : (
                    <>
                      <FontAwesomeIcon icon={faPaperPlane} className="mr-2" />
                      Gửi tin nhắn
                    </>
                  )}
                </button>
              </form>
            )}
          </motion.div>
        </div>

        {/* CTA Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mt-16"
        >
          <div className="card-professional p-8 max-w-2xl mx-auto">
            <h3 className="text-2xl font-bold text-white mb-4">
              Sẵn sàng bắt đầu dự án của bạn?
            </h3>
            <p className="text-gray-300 mb-6">
              Hãy cùng nhau biến ý tưởng thành hiện thực. 
              Liên hệ ngay để thảo luận về dự án tiếp theo!
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a href="mailto:nhdinh.dev@gmail.com" className="btn-professional btn-primary">
                <FontAwesomeIcon icon={faEnvelope} className="mr-2" />
                Email ngay
              </a>
              <a href="tel:+84123456789" className="btn-professional btn-secondary">
                <FontAwesomeIcon icon={faPhone} className="mr-2" />
                Gọi điện
              </a>
            </div>
          </div>
        </motion.div>
      </div>

      {/* Background Elements */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="float-smooth absolute top-20 right-10 w-12 h-12 bg-green-500 opacity-10 rounded-full"></div>
        <div className="float-smooth absolute bottom-32 left-16 w-16 h-16 bg-blue-500 opacity-15 rounded-lg transform rotate-12"></div>
        <div className="pulse-glow absolute top-1/2 right-1/4 w-8 h-8 bg-purple-500 opacity-20 rounded-full"></div>
      </div>
    </section>
  );
};

export default Contact;
