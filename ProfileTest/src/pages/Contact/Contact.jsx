import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { 
  FiMail, 
  FiPhone, 
  FiMapPin, 
  FiSend,
  FiUser,
  FiMessageSquare
} from 'react-icons/fi';
import './Contact.scss';

const Contact = () => {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });

  const [isSubmitting, setIsSubmitting] = useState(false);

  const contactInfo = [
    {
      icon: FiMail,
      title: 'Email',
      value: 'your.email@example.com',
      link: 'mailto:your.email@example.com'
    },
    {
      icon: FiPhone,
      title: 'Phone',
      value: '+1 (555) 123-4567',
      link: 'tel:+15551234567'
    },
    {
      icon: FiMapPin,
      title: 'Location',
      value: 'Your City, Country',
      link: '#'
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
    setTimeout(() => {
      setIsSubmitting(false);
      alert('Message sent successfully!');
      setFormData({
        name: '',
        email: '',
        subject: '',
        message: ''
      });
    }, 2000);
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        delayChildren: 0.3,
        staggerChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.5,
      },
    },
  };

  return (
    <div className="contact-page" ref={ref}>
      {/* Hero Section */}
      <section className="contact-hero">
        <div className="container mx-auto px-4">
          <motion.div
            className="hero-content"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <h1 className="hero-title">Get In Touch</h1>
            <p className="hero-subtitle">
              Have a project in mind? Let's work together to bring your ideas to life
            </p>
          </motion.div>
        </div>
      </section>

      {/* Contact Content */}
      <section className="contact-content section">
        <div className="container mx-auto px-4">
          <div className="contact-grid">
            {/* Contact Information */}
            <motion.div
              className="contact-info"
              variants={containerVariants}
              initial="hidden"
              animate={inView ? "visible" : "hidden"}
            >
              <motion.div variants={itemVariants} className="info-header">
                <h2 className="info-title">Let's Talk</h2>
                <p className="info-description">
                  I'm always interested in new opportunities and exciting projects.
                  Feel free to reach out if you'd like to discuss potential collaborations.
                </p>
              </motion.div>

              <div className="info-list">
                {contactInfo.map((info, index) => (
                  <motion.div
                    key={index}
                    className="info-item"
                    variants={itemVariants}
                    whileHover={{ scale: 1.05 }}
                  >
                    <div className="info-icon">
                      <info.icon size={24} />
                    </div>
                    <div className="info-content">
                      <h4 className="info-title">{info.title}</h4>
                      <a href={info.link} className="info-value">
                        {info.value}
                      </a>
                    </div>
                  </motion.div>
                ))}
              </div>

              <motion.div
                variants={itemVariants}
                className="social-section"
              >
                <h3 className="social-title">Follow Me</h3>
                <div className="social-links">
                  <a href="#" className="social-link">GitHub</a>
                  <a href="#" className="social-link">LinkedIn</a>
                  <a href="#" className="social-link">Twitter</a>
                </div>
              </motion.div>
            </motion.div>

            {/* Contact Form */}
            <motion.div
              className="contact-form-section"
              variants={itemVariants}
              initial="hidden"
              animate={inView ? "visible" : "hidden"}
            >
              <div className="form-container">
                <h2 className="form-title">Send Message</h2>
                
                <form className="contact-form" onSubmit={handleSubmit}>
                  <div className="form-row">
                    <div className="form-group">
                      <label htmlFor="name" className="form-label">
                        <FiUser className="label-icon" />
                        Name
                      </label>
                      <input
                        type="text"
                        id="name"
                        name="name"
                        value={formData.name}
                        onChange={handleInputChange}
                        className="form-input"
                        placeholder="Your name"
                        required
                      />
                    </div>

                    <div className="form-group">
                      <label htmlFor="email" className="form-label">
                        <FiMail className="label-icon" />
                        Email
                      </label>
                      <input
                        type="email"
                        id="email"
                        name="email"
                        value={formData.email}
                        onChange={handleInputChange}
                        className="form-input"
                        placeholder="your.email@example.com"
                        required
                      />
                    </div>
                  </div>

                  <div className="form-group">
                    <label htmlFor="subject" className="form-label">
                      <FiMessageSquare className="label-icon" />
                      Subject
                    </label>
                    <input
                      type="text"
                      id="subject"
                      name="subject"
                      value={formData.subject}
                      onChange={handleInputChange}
                      className="form-input"
                      placeholder="Project discussion"
                      required
                    />
                  </div>

                  <div className="form-group">
                    <label htmlFor="message" className="form-label">
                      <FiMessageSquare className="label-icon" />
                      Message
                    </label>
                    <textarea
                      id="message"
                      name="message"
                      value={formData.message}
                      onChange={handleInputChange}
                      className="form-textarea"
                      placeholder="Tell me about your project..."
                      rows="6"
                      required
                    />
                  </div>

                  <motion.button
                    type="submit"
                    className="submit-btn"
                    disabled={isSubmitting}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    {isSubmitting ? (
                      <div className="loading" />
                    ) : (
                      <>
                        <FiSend className="btn-icon" />
                        <span>Send Message</span>
                      </>
                    )}
                  </motion.button>
                </form>
              </div>
            </motion.div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Contact;
