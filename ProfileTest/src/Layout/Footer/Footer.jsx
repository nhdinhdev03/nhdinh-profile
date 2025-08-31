import React from 'react';
import { motion } from 'framer-motion';
import { 
  FiGithub, 
  FiLinkedin, 
  FiTwitter, 
  FiMail, 
  FiPhone, 
  FiMapPin,
  FiHeart,
  FiArrowUp
} from 'react-icons/fi';

const Footer = () => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const socialLinks = [
    { name: 'GitHub', icon: FiGithub, href: 'https://github.com/nhdinhdev03', color: 'hover:bg-[#333333]' },
    { name: 'LinkedIn', icon: FiLinkedin, href: 'https://linkedin.com/in/nhdinh', color: 'hover:bg-[#0077B5]' },
    { name: 'Twitter', icon: FiTwitter, href: 'https://twitter.com/nhdinh', color: 'hover:bg-[#1DA1F2]' },
    { name: 'Email', icon: FiMail, href: 'mailto:contact@nhdinh.dev', color: 'hover:bg-primary-500' },
  ];

  const quickLinks = [
    { name: 'Home', href: '/' },
    { name: 'About', href: '/about' },
    { name: 'Projects', href: '/projects' },
    { name: 'Blog', href: '/blog' },
    { name: 'Contact', href: '/contact' },
  ];

  return (
    <footer className="relative bg-gradient-to-br from-neutral-50 to-neutral-100 dark:from-neutral-900 dark:to-neutral-950 border-t border-neutral-200 dark:border-neutral-800">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-30">
        <div className="absolute inset-0 bg-gradient-to-r from-primary-500/10 to-secondary-500/10" />
        <div className="absolute inset-0 bg-neon-grid bg-repeat opacity-20" />
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Main Footer Content */}
        <div className="py-12 lg:py-16">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12">
            {/* Brand Section */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="lg:col-span-2"
            >
              <div className="flex items-center space-x-3 mb-6">
                <div className="w-12 h-12 bg-gradient-to-br from-primary-500 to-secondary-500 rounded-2xl flex items-center justify-center text-white font-bold text-xl">
                  N
                </div>
                <div>
                  <h3 className="text-2xl font-bold bg-gradient-to-r from-primary-600 to-secondary-600 bg-clip-text text-transparent">
                    NH Dinh
                  </h3>
                  <p className="text-sm text-neutral-600 dark:text-neutral-400">
                    Full-Stack Developer
                  </p>
                </div>
              </div>
              
              <p className="text-neutral-600 dark:text-neutral-400 mb-6 max-w-md leading-relaxed">
                Crafting elegant solutions through code. I specialize in creating seamless digital experiences 
                that combine innovation with practicality. Let's turn your ideas into reality.
              </p>

              {/* Contact Info */}
              <div className="space-y-3">
                <div className="flex items-center space-x-3 text-neutral-600 dark:text-neutral-400">
                  <FiMail className="w-4 h-4 text-primary-500" />
                  <span className="text-sm">contact@nhdinh.dev</span>
                </div>
                <div className="flex items-center space-x-3 text-neutral-600 dark:text-neutral-400">
                  <FiPhone className="w-4 h-4 text-primary-500" />
                  <span className="text-sm">+84 123 456 789</span>
                </div>
                <div className="flex items-center space-x-3 text-neutral-600 dark:text-neutral-400">
                  <FiMapPin className="w-4 h-4 text-primary-500" />
                  <span className="text-sm">Ho Chi Minh City, Vietnam</span>
                </div>
              </div>
            </motion.div>

            {/* Quick Links */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
            >
              <h4 className="text-lg font-semibold text-neutral-900 dark:text-white mb-6">
                Quick Links
              </h4>
              <ul className="space-y-3">
                {quickLinks.map((link) => (
                  <li key={link.name}>
                    <a
                      href={link.href}
                      className="text-neutral-600 dark:text-neutral-400 hover:text-primary-600 dark:hover:text-primary-400 transition-colors duration-200 text-sm"
                    >
                      {link.name}
                    </a>
                  </li>
                ))}
              </ul>
            </motion.div>

            {/* Social & Newsletter */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              <h4 className="text-lg font-semibold text-neutral-900 dark:text-white mb-6">
                Connect
              </h4>
              
              {/* Social Links */}
              <div className="flex flex-wrap gap-3 mb-6">
                {socialLinks.map((social) => (
                  <motion.a
                    key={social.name}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    whileHover={{ scale: 1.1, y: -2 }}
                    whileTap={{ scale: 0.95 }}
                    className={`w-10 h-10 bg-neutral-200 dark:bg-neutral-800 rounded-xl flex items-center justify-center text-neutral-600 dark:text-neutral-400 hover:text-white transition-all duration-200 ${social.color}`}
                    aria-label={social.name}
                  >
                    <social.icon className="w-5 h-5" />
                  </motion.a>
                ))}
              </div>

              {/* Newsletter */}
              <div className="space-y-3">
                <p className="text-sm text-neutral-600 dark:text-neutral-400 mb-2">
                  Stay updated with my latest tech insights and projects
                </p>
                <form className="flex flex-col space-y-3">
                  <input
                    type="email"
                    placeholder="Your email"
                    className="w-full px-4 py-2.5 text-sm bg-white dark:bg-neutral-800 border border-neutral-300 dark:border-neutral-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                    required
                  />
                  <button 
                    type="submit"
                    className="w-full px-4 py-2.5 bg-gradient-to-r from-primary-500 to-secondary-500 hover:from-primary-600 hover:to-secondary-600 text-white text-sm font-medium rounded-lg transition-all duration-200 transform hover:-translate-y-0.5"
                  >
                    Subscribe to Newsletter
                  </button>
                </form>
              </div>
            </motion.div>
          </div>
        </div>

        {/* Bottom Bar */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="border-t border-neutral-200 dark:border-neutral-800 py-6"
        >
          <div className="flex flex-col-reverse sm:flex-row items-center justify-between space-y-4 space-y-reverse sm:space-y-0">
            <div className="flex flex-col sm:flex-row items-center sm:space-x-4 space-y-2 sm:space-y-0">
              <div className="flex items-center space-x-2 text-sm text-neutral-600 dark:text-neutral-400">
                <span>© 2025 NH Dinh. Made with</span>
                <motion.div
                  animate={{ scale: [1, 1.2, 1] }}
                  transition={{ duration: 1.5, repeat: Infinity }}
                >
                  <FiHeart className="w-4 h-4 text-red-500" />
                </motion.div>
                <span>in Vietnam</span>
              </div>
              <span className="hidden sm:block text-neutral-400">•</span>
              <span className="text-sm text-neutral-600 dark:text-neutral-400">
                Built with React & Tailwind CSS
              </span>
            </div>

            <motion.button
              onClick={scrollToTop}
              whileHover={{ scale: 1.1, y: -2 }}
              whileTap={{ scale: 0.95 }}
              className="p-2.5 bg-gradient-to-r from-primary-500 to-secondary-500 hover:from-primary-600 hover:to-secondary-600 text-white rounded-xl transition-all duration-200 shadow-lg hover:shadow-xl"
              aria-label="Scroll to top"
            >
              <FiArrowUp className="w-4 h-4" />
            </motion.button>
          </div>
        </motion.div>
      </div>
    </footer>
  );
};

export default Footer;