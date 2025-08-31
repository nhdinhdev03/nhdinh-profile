import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { 
  faEnvelope, 
  faPhone, 
  faMapMarkerAlt,
  faPaperPlane,
  faCheckCircle
} from '@fortawesome/free-solid-svg-icons';
import { faGithub, faLinkedin, faTwitter } from '@fortawesome/free-brands-svg-icons';

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate form submission
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSubmitted(true);
      setFormData({ name: '', email: '', subject: '', message: '' });
      
      // Reset success message after 5 seconds
      setTimeout(() => setIsSubmitted(false), 5000);
    }, 2000);
  };

  const contactInfo = [
    {
      icon: faEnvelope,
      title: 'Email',
      value: 'nhdinh.dev@gmail.com',
      link: 'mailto:nhdinh.dev@gmail.com'
    },
    {
      icon: faPhone,
      title: 'Phone',
      value: '+84 123 456 789',
      link: 'tel:+84123456789'
    },
    {
      icon: faMapMarkerAlt,
      title: 'Location',
      value: 'Ho Chi Minh City, Vietnam',
      link: null
    }
  ];

  const socialLinks = [
    { icon: faGithub, href: 'https://github.com/nhdinhdev03', label: 'GitHub' },
    { icon: faLinkedin, href: 'https://linkedin.com/in/nhdinh', label: 'LinkedIn' },
    { icon: faTwitter, href: 'https://twitter.com/nhdinh', label: 'Twitter' }
  ];

  const fadeInUp = {
    initial: { opacity: 0, y: 60 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.6 }
  };

  return (
    <div className="pt-20">
      {/* Hero Section */}
      <section className="py-20 bg-gradient-to-br from-blue-50 to-indigo-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h1 className="text-4xl sm:text-5xl font-bold text-gray-900 mb-6">
              Get In <span className="text-blue-600">Touch</span>
            </h1>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              I'm always open to discussing new opportunities, interesting projects, 
              or just having a chat about technology and development.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Contact Form & Info Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Contact Form */}
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              className="bg-white rounded-2xl shadow-xl p-8"
            >
              <h2 className="text-2xl font-bold text-gray-900 mb-6">
                Send me a message
              </h2>
              
              {isSubmitted && (
                <motion.div
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="mb-6 p-4 bg-green-100 border border-green-300 rounded-lg flex items-center"
                >
                  <FontAwesomeIcon icon={faCheckCircle} className="w-5 h-5 text-green-600 mr-3" />
                  <span className="text-green-700">Message sent successfully! I'll get back to you soon.</span>
                </motion.div>
              )}

              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label htmlFor="name" className="form-label">
                      Name *
                    </label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      required
                      className="form-input"
                      placeholder="Your full name"
                    />
                  </div>
                  <div>
                    <label htmlFor="email" className="form-label">
                      Email *
                    </label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      required
                      className="form-input"
                      placeholder="your.email@example.com"
                    />
                  </div>
                </div>

                <div>
                  <label htmlFor="subject" className="form-label">
                    Subject *
                  </label>
                  <input
                    type="text"
                    id="subject"
                    name="subject"
                    value={formData.subject}
                    onChange={handleChange}
                    required
                    className="form-input"
                    placeholder="What is this about?"
                  />
                </div>

                <div>
                  <label htmlFor="message" className="form-label">
                    Message *
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    required
                    rows={6}
                    className="form-textarea"
                    placeholder="Tell me about your project or just say hello..."
                  />
                </div>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full btn-primary flex items-center justify-center disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isSubmitting ? (
                    "Sending..."
                  ) : (
                    <>
                      Send Message
                      <FontAwesomeIcon icon={faPaperPlane} className="ml-2 w-4 h-4" />
                    </>
                  )}
                </button>
              </form>
            </motion.div>

            {/* Contact Information */}
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="space-y-8"
            >
              <div>
                <h2 className="text-2xl font-bold text-gray-900 mb-6">
                  Contact Information
                </h2>
                <p className="text-gray-600 mb-8">
                  Feel free to reach out through any of these channels. 
                  I'm always happy to connect and discuss new opportunities.
                </p>
              </div>

              {/* Contact Details */}
              <div className="space-y-6">
                {contactInfo.map((info, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.3 + index * 0.1 }}
                    className="flex items-center p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors duration-200"
                  >
                    <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mr-4">
                      <FontAwesomeIcon icon={info.icon} className="w-5 h-5 text-blue-600" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-gray-900">{info.title}</h3>
                      {info.link ? (
                        <a
                          href={info.link}
                          className="text-blue-600 hover:text-blue-700 transition-colors duration-200"
                        >
                          {info.value}
                        </a>
                      ) : (
                        <p className="text-gray-600">{info.value}</p>
                      )}
                    </div>
                  </motion.div>
                ))}
              </div>

              {/* Social Media */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.6 }}
                className="pt-8"
              >
                <h3 className="text-lg font-semibold text-gray-900 mb-4">
                  Follow me on social media
                </h3>
                <div className="flex space-x-4">
                  {socialLinks.map((social, index) => (
                    <a
                      key={index}
                      href={social.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-12 h-12 bg-gray-900 text-white rounded-full flex items-center justify-center hover:bg-blue-600 transition-colors duration-200"
                      aria-label={social.label}
                    >
                      <FontAwesomeIcon icon={social.icon} className="w-5 h-5" />
                    </a>
                  ))}
                </div>
              </motion.div>

              {/* Availability */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.8 }}
                className="p-6 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-xl border border-blue-100"
              >
                <h3 className="text-lg font-semibold text-gray-900 mb-2">
                  Currently Available
                </h3>
                <p className="text-gray-600 text-sm">
                  I'm open to new opportunities and interesting projects. 
                  Let's discuss how we can work together!
                </p>
              </motion.div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            {...fadeInUp}
            className="text-center mb-16"
          >
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
              Frequently Asked Questions
            </h2>
            <p className="text-lg text-gray-600">
              Here are some common questions I get asked.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="space-y-6"
          >
            {[
              {
                question: "What's your typical response time?",
                answer: "I usually respond to emails within 24 hours during weekdays."
              },
              {
                question: "Are you available for freelance projects?",
                answer: "Yes, I'm open to freelance opportunities. Let's discuss your project requirements."
              },
              {
                question: "What technologies do you specialize in?",
                answer: "I specialize in React, Node.js, Python, and modern web technologies. Check out my skills page for more details."
              },
              {
                question: "Do you work remotely?",
                answer: "Yes, I'm comfortable working remotely and have experience collaborating with distributed teams."
              }
            ].map((faq, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="bg-white rounded-lg p-6 shadow-md"
              >
                <h3 className="text-lg font-semibold text-gray-900 mb-2">
                  {faq.question}
                </h3>
                <p className="text-gray-600">
                  {faq.answer}
                </p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default Contact;