import React from 'react';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { 
  faGithub, 
  faLinkedin, 
  faTwitter, 
  faFacebook 
} from '@fortawesome/free-brands-svg-icons';
import { faEnvelope, faPhone } from '@fortawesome/free-solid-svg-icons';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  const socialLinks = [
    { icon: faGithub, href: 'https://github.com/nhdinhdev03', label: 'GitHub' },
    { icon: faLinkedin, href: 'https://linkedin.com/in/nhdinh', label: 'LinkedIn' },
    { icon: faTwitter, href: 'https://twitter.com/nhdinh', label: 'Twitter' },
    { icon: faFacebook, href: 'https://facebook.com/nhdinh', label: 'Facebook' }
  ];

  const quickLinks = [
    { name: 'Home', path: '/' },
    { name: 'About', path: '/about' },
    { name: 'Projects', path: '/projects' },
    { name: 'Blog', path: '/blog' },
    { name: 'Contact', path: '/contact' }
  ];

  return (
    <footer className="footer">
      <div className="footer__container">
        {/* Main content */}
        <div className="footer__main">
          {/* Brand section */}
          <div className="footer__brand">
            <div className="footer__logo">
              <span>NH<span className="text-gradient">Dinh</span></span>
            </div>
            <p className="footer__description">
              Passionate developer creating amazing web experiences with modern technologies. 
              Let's build something great together!
            </p>
            <div className="footer__social">
              {socialLinks.map((social) => (
                <a
                  key={social.label}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={social.label}
                >
                  <FontAwesomeIcon icon={social.icon} className="icon" />
                </a>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div className="footer__column">
            <h3 className="footer__title">Quick Links</h3>
            <ul className="footer__links">
              {quickLinks.map((link) => (
                <li key={link.path}>
                  <Link to={link.path}>{link.name}</Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Services */}
          <div className="footer__column">
            <h3 className="footer__title">Services</h3>
            <ul className="footer__links">
              <li><a href="#web-development">Web Development</a></li>
              <li><a href="#mobile-development">Mobile Development</a></li>
              <li><a href="#ui-ux-design">UI/UX Design</a></li>
              <li><a href="#consulting">Consulting</a></li>
            </ul>
          </div>

          {/* Newsletter */}
          <div className="footer__newsletter">
            <h3 className="footer__newsletter-title">Stay Updated</h3>
            <p className="footer__newsletter-desc">
              Subscribe to get the latest news and updates about my projects.
            </p>
            <form className="footer__newsletter-form" onSubmit={(e) => e.preventDefault()}>
              <input
                type="email"
                placeholder="Enter your email"
                required
              />
              <button type="submit">Subscribe</button>
            </form>
          </div>
        </div>

        {/* Bottom section */}
        <div className="footer__bottom">
          <p className="footer__copyright">
            © {currentYear} NHDinh. All rights reserved.
          </p>
          <div className="footer__legal">
            <a href="/privacy">Privacy Policy</a>
            <a href="/terms">Terms of Service</a>
            <a href="/cookies">Cookie Policy</a>
          </div>
        </div>
      </div>

      {/* Back to top button */}
      <button
        className="footer__back-to-top"
        onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
        aria-label="Back to top"
      >
        <span className="icon">↑</span>
      </button>
    </footer>
  );
};

export default Footer;