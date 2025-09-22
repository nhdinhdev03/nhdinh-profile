import { motion } from "framer-motion";
import PropTypes from "prop-types";
import { memo } from "react";
import { useTranslation } from "react-i18next";
import {
  FiGithub, FiLinkedin, FiMail
} from "react-icons/fi";

import "./ContactSection.scss";

const ContactSection = memo(({ profile, light }) => {
  const { t } = useTranslation();
  
  return (
    <motion.section 
      className="contact-section"
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.2, type: 'spring', stiffness: 100 }}
      whileHover={{ 
        scale: 1.01,
        transition: { type: 'spring', stiffness: 400 }
      }}
    >
      <motion.h3
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3, type: 'spring', stiffness: 120 }}
      >
        {t('about.connect_title')}
      </motion.h3>
      <motion.p
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4, type: 'spring', stiffness: 120 }}
      >
        {t('about.connect_description')}
      </motion.p>
      <motion.div 
        className="contact-actions"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5, type: 'spring', stiffness: 100 }}
      >
        <motion.a
          href="mailto:nhdinhdev03@gmail.com"
          className="btn btn-primary"
          whileHover={{ scale: 1.05, y: -3 }}
          whileTap={{ scale: 0.95 }}
        >
          <FiMail style={{ marginRight: '8px' }} />
          {t('about.email')}
        </motion.a>
        <motion.a
          href={profile?.html_url}
          target="_blank"
          rel="noopener noreferrer"
          className="btn btn-secondary"
          whileHover={{ scale: 1.05, y: -3 }}
          whileTap={{ scale: 0.95 }}
        >
          <FiGithub style={{ marginRight: '8px' }} />
          {t('about.github')}
        </motion.a>
        <motion.a
          href="https://linkedin.com/in/nhdinhdev03"
          target="_blank"
          rel="noopener noreferrer"
          className="btn btn-outline"
          whileHover={{ scale: 1.05, y: -3 }}
          whileTap={{ scale: 0.95 }}
        >
          <FiLinkedin style={{ marginRight: '8px' }} />
          {t('about.linkedin')}
        </motion.a>
      </motion.div>
      <motion.div 
        className="theme-indicator"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.7, duration: 0.5 }}
      >
        <motion.div 
          className="theme-status"
          animate={{
            opacity: [0.7, 1, 0.7]
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
            ease: 'easeInOut'
          }}
        >
          {light
            ? t('about.light_mode_active')
            : t('about.dark_mode_active')}
        </motion.div>
      </motion.div>
    </motion.section>
  );
});

ContactSection.propTypes = {
  profile: PropTypes.shape({
    html_url: PropTypes.string,
  }),
  light: PropTypes.bool.isRequired,
};

export default ContactSection;