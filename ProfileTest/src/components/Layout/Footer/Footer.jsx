import React from 'react';
import { motion } from 'framer-motion';
import { FiGithub, FiLinkedin, FiTwitter, FiMail, FiHeart } from 'react-icons/fi';
import './Footer.scss';

const Footer = () => {
  const socialLinks = [
    { icon: FiGithub, href: 'https://github.com', label: 'GitHub' },
    { icon: FiLinkedin, href: 'https://linkedin.com', label: 'LinkedIn' },
    { icon: FiTwitter, href: 'https://twitter.com', label: 'Twitter' },
    { icon: FiMail, href: 'mailto:contact@example.com', label: 'Email' },
  ];

  return (
    <footer className="footer">
      <div className="container mx-auto px-4">
        <div className="footer-content">
          {/* Social Links */}
          <div className="social-links">
            {socialLinks.map((link, index) => (
              <motion.a
                key={link.label}
                href={link.href}
                target="_blank"
                rel="noopener noreferrer"
                className="social-link"
                whileHover={{ scale: 1.2, rotate: 5 }}
                whileTap={{ scale: 0.9 }}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
              >
                <link.icon size={20} />
                <span className="sr-only">{link.label}</span>
              </motion.a>
            ))}
          </div>

          {/* Copyright */}
          <motion.div
            className="copyright"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
          >
            <p className="copyright-text">
              Made with <FiHeart className="heart-icon" /> by{' '}
              <span className="gradient-text">Your Name</span>
            </p>
            <p className="year">© {new Date().getFullYear()} All rights reserved.</p>
          </motion.div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
