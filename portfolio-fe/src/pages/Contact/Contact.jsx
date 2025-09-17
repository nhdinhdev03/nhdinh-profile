import React, { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import { useTranslation } from 'react-i18next'
import { 
  FiMail, FiPhone, FiMapPin, FiSend, FiUser, FiMessageSquare, 
  FiCheck, FiX, FiAlertCircle, FiCalendar, FiClock,
  FiLinkedin, FiGithub, FiTwitter, FiInstagram, FiZap, FiStar
} from 'react-icons/fi'
import './Contact.scss'

function Contact() {
  const { t } = useTranslation();
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1
  })

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
    budget: '',
    timeline: '',
    projectType: ''
  })

  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitStatus, setSubmitStatus] = useState(null) // 'success', 'error', null
  const [formErrors, setFormErrors] = useState({})
  const [particles, setParticles] = useState([])
  const [isTyping, setIsTyping] = useState(false)


  // Enhanced contact info with more details
  const contactInfo = [
    {
      icon: FiMail,
      title: 'Email',
      value: 'nhdinh.dev03@gmail.com',
      link: 'mailto:nhdinh.dev03@gmail.com',
      description: t('contact.response_commitment'),
      color: '#EA4335'
    },
    {
      icon: FiPhone,
      title: t('contact.phone'),
      value: '+84 389307257',
      link: 'tel:+84123456789',
      description: t('contact.timelines'),
      color: '#34A853'
    },
    {
      icon: FiMapPin,
      title: t('contact.location'),
      value: 'Hậu Giang, Việt Nam',
      link: 'https://maps.google.com',
      description: 'GMT+7 (ICT)',
      color: '#FBBC05'
    },
    {
      icon: FiCalendar,
      title: t('contact.appointment_schedule'),
      value: t('contact.book'),
      link: '#',
      description: t('contact.schedule a consultation'),
      color: '#4285F4'
    }
  ]

  const socialLinks = [
    { icon: FiGithub, name: 'GitHub', url: 'https://github.com/nhdinhdev03', color: '#333' },
    { icon: FiLinkedin, name: 'LinkedIn', url: 'https://linkedin.com/in/nhdinhdev03', color: '#0A66C2' },
    { icon: FiTwitter, name: 'Twitter', url: 'https://twitter.com', color: '#1DA1F2' },
    { icon: FiInstagram, name: 'Instagram', url: 'https://instagram.com', color: '#E4405F' }
  ]

  const projectTypes = [
    'Website Development',
    'Web Application',
    'E-commerce Platform',
    'Mobile App',
    'API Development',
    'UI/UX Design',
    'Technical Consulting',
    'Other'
  ]

  const budgetRanges = [
    'Under $1,000',
    '$1,000 - $5,000',
    '$5,000 - $10,000',
    '$10,000 - $25,000',
    '$25,000+',
    'Let\'s discuss'
  ]

  const timelines = [
    'ASAP (Rush)',
    '1-2 weeks',
    '1 month',
    '2-3 months',
    '3+ months',
    'Flexible'
  ]

  // Initialize particles for background effect
  useEffect(() => {
    const particleCount = 15
    const newParticles = []
    
    for (let i = 0; i < particleCount; i++) {
      newParticles.push({
        id: i,
        x: Math.random() * 100,
        y: Math.random() * 100,
        size: Math.random() * 4 + 2,
        speed: Math.random() * 2 + 1,
        opacity: Math.random() * 0.3 + 0.1,
        color: ['#6366f1', '#8b5cf6', '#ec4899', '#10b981'][Math.floor(Math.random() * 4)]
      })
    }
    
    setParticles(newParticles)
  }, [])

  // Form validation
  const validateForm = () => {
    const errors = {}
    
    if (!formData.name.trim()) {
      errors.name = 'Tên là bắt buộc'
    } else if (formData.name.length < 2) {
      errors.name = 'Tên phải có ít nhất 2 ký tự'
    }
    
    if (!formData.email.trim()) {
      errors.email = 'Email là bắt buộc'
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      errors.email = 'Email không hợp lệ'
    }
    
    if (!formData.subject.trim()) {
      errors.subject = 'Chủ đề là bắt buộc'
    }
    
    if (!formData.message.trim()) {
      errors.message = 'Tin nhắn là bắt buộc'
    } else if (formData.message.length < 10) {
      errors.message = 'Tin nhắn phải có ít nhất 10 ký tự'
    }
    
    return errors
  }

  const handleInputChange = (e) => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))
    
    // Clear specific error when user starts typing
    if (formErrors[name]) {
      setFormErrors(prev => ({ ...prev, [name]: '' }))
    }
    
    // Show typing indicator using debouncing
    setIsTyping(true)
    // Use requestIdleCallback or setTimeout replacement if needed
    const typingTimeout = requestAnimationFrame(() => {
      requestAnimationFrame(() => setIsTyping(false));
    });
    return () => cancelAnimationFrame(typingTimeout);
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    
    // Validate form
    const errors = validateForm()
    if (Object.keys(errors).length > 0) {
      setFormErrors(errors)
      return
    }
    
    setIsSubmitting(true)
    setSubmitStatus(null)
    
    try {
      // Simulate form submission with promise-based delay
      await new Promise(resolve => {
        // Use requestAnimationFrame for better performance
        let frames = 0;
        const animate = () => {
          frames++;
          if (frames < 120) { // ~2 seconds at 60fps
            requestAnimationFrame(animate);
          } else {
            resolve();
          }
        };
        requestAnimationFrame(animate);
      });
      
      // Simulate random success/failure for demo
      if (Math.random() > 0.1) { // 90% success rate
        setSubmitStatus('success')
        setFormData({ 
          name: '', email: '', subject: '', message: '',
          budget: '', timeline: '', projectType: ''
        })
        setFormErrors({})
      } else {
        throw new Error('Submission failed')
      }
    } catch (error) {
      setSubmitStatus('error')
    } finally {
      setIsSubmitting(false)
      
      // Auto-hide status using requestAnimationFrame
      let hideFrames = 0;
      const hideStatus = () => {
        hideFrames++;
        if (hideFrames < 300) { // ~5 seconds at 60fps
          requestAnimationFrame(hideStatus);
        } else {
          setSubmitStatus(null);
        }
      };
      requestAnimationFrame(hideStatus);
    }
  }

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.2
      }
    }
  }

  const itemVariants = {
    hidden: { y: 50, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        type: 'spring',
        stiffness: 100,
        damping: 12
      }
    }
  }

  return (
    <section id="contact" className="contact section">
      <div className="container">
        <motion.div
          ref={ref}
          className="contact__content"
          variants={containerVariants}
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
        >
          {/* Animated particles background */}
          <div className="contact__particles">
            {particles.map((particle) => (
              <motion.div
                key={particle.id}
                className="contact__particle"
                initial={{
                  x: `${particle.x}%`,
                  y: `${particle.y}%`,
                  opacity: 0,
                  scale: 0
                }}
                animate={{
                  x: [`${particle.x}%`, `${(particle.x + 30) % 100}%`, `${particle.x}%`],
                  y: [`${particle.y}%`, `${(particle.y + 20) % 100}%`, `${particle.y}%`],
                  opacity: [0, particle.opacity, 0],
                  scale: [0, 1, 0],
                  rotate: [0, 360]
                }}
                transition={{
                  duration: particle.speed * 12,
                  repeat: Infinity,
                  ease: "easeInOut"
                }}
                style={{
                  width: particle.size,
                  height: particle.size,
                  background: particle.color,
                  borderRadius: '50%',
                  position: 'absolute',
                  pointerEvents: 'none'
                }}
              />
            ))}
          </div>

          <motion.div className="section-title" variants={itemVariants}>
            <motion.h2
              initial={{ backgroundPosition: '0% 50%' }}
              animate={{ backgroundPosition: '100% 50%' }}
              transition={{ duration: 3, repeat: Infinity, ease: 'linear' }}
              style={{
                background: 'linear-gradient(90deg, var(--text-primary), var(--primary-light), var(--secondary-light), var(--text-primary))',
                backgroundSize: '200% auto',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text'
              }}
            >
              {t('contact.title')}
            </motion.h2>
            <p>{t('contact.description')}</p>
          </motion.div>

          <div className="contact__wrapper">
            <motion.div className="contact__info" variants={itemVariants}>
              <div className="contact__info-header">
                <motion.div
                  className="contact__info-avatar"
                  whileHover={{ scale: 1.1, rotate: 5 }}
                  transition={{ type: 'spring', stiffness: 300 }}
                >
                  <div className="contact__avatar-image">
                    <span>HD</span>
                  </div>
                  <motion.div
                    className="contact__avatar-ring"
                    animate={{ rotate: 360 }}
                    transition={{ duration: 10, repeat: Infinity, ease: 'linear' }}
                  />
                </motion.div>
                <div className="contact__info-intro">
                  <h3>{t('contact.info_title')}</h3>
                  <p>
                    {t('contact.info_description')}
                  </p>
                </div>
              </div>

              <div className="contact__info-list">
                {contactInfo.map((info, index) => {
                  const IconComponent = info.icon
                  return (
                    <motion.a
                      key={index}
                      href={info.link}
                      className="contact__info-item glass-card"
                      whileHover={{ scale: 1.02, y: -3 }}
                      transition={{ type: 'spring', stiffness: 200, damping: 20 }}
                      initial={{ opacity: 0, x: -30 }}
                      animate={{ opacity: 1, x: 0 }}
                      style={{ animationDelay: `${index * 0.1}s` }}
                    >
                      <motion.div 
                        className="contact__info-icon"
                        style={{ color: info.color }}
                        whileHover={{ scale: 1.2, rotate: 10 }}
                        transition={{ type: 'spring', stiffness: 400 }}
                      >
                        <IconComponent />
                      </motion.div>
                      <div className="contact__info-content">
                        <span className="contact__info-title">{info.title}</span>
                        <span className="contact__info-value">{info.value}</span>
                        <span className="contact__info-description">{info.description}</span>
                      </div>
                      <motion.div
                        className="contact__info-arrow"
                        initial={{ x: 0 }}
                        whileHover={{ x: 5 }}
                        transition={{ type: 'spring', stiffness: 400 }}
                      >
                        →
                      </motion.div>
                    </motion.a>
                  )
                })}
              </div>

              {/* Social Links */}
              <div className="contact__social">
                <h4>Mạng Xã Hội</h4>
                <div className="contact__social-links">
                  {socialLinks.map((social, index) => {
                    const IconComponent = social.icon
                    return (
                      <motion.a
                        key={index}
                        href={social.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="contact__social-link"
                        whileHover={{ 
                          scale: 1.1, 
                          rotate: [0, -5, 5, 0],
                          backgroundColor: social.color 
                        }}
                        whileTap={{ scale: 0.9 }}
                        transition={{ type: 'spring', stiffness: 400 }}
                        title={social.name}
                      >
                        <IconComponent />
                      </motion.a>
                    )
                  })}
                </div>
              </div>

              <div className="contact__availability">
                <div className="contact__status">
                  <motion.div 
                    className="contact__status-dot"
                    animate={{
                      scale: [1, 1.2, 1],
                      opacity: [1, 0.7, 1]
                    }}
                    transition={{
                      duration: 2,
                      repeat: Infinity,
                      ease: 'easeInOut'
                    }}
                  />
                  <div className="contact__status-info">
                    <span className="contact__status-text">{t('contact.availability')}</span>
                    <span className="contact__status-subtext">{t('contact.response_time')}</span>
                  </div>
                </div>
                
                <motion.div 
                  className="contact__response-time"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.5 }}
                >
                  <FiClock className="contact__clock-icon" />
                  <span>Thường phản hồi trong vòng 2-4 giờ</span>
                </motion.div>
              </div>
            </motion.div>

            <motion.div className="contact__form-wrapper" variants={itemVariants}>
              {/* Success/Error Messages */}
              <AnimatePresence>
                {submitStatus && (
                  <motion.div
                    className={`contact__status-message contact__status-message--${submitStatus}`}
                    initial={{ opacity: 0, y: -20, scale: 0.95 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: -20, scale: 0.95 }}
                    transition={{ type: 'spring', stiffness: 400, damping: 25 }}
                  >
                    <div className="contact__status-icon">
                      {submitStatus === 'success' ? <FiCheck /> : <FiX />}
                    </div>
                    <div className="contact__status-content">
                      <h4>
                        {submitStatus === 'success' 
                          ? 'Tin nhắn đã được gửi!' 
                          : 'Có lỗi xảy ra!'}
                      </h4>
                      <p>
                        {submitStatus === 'success'
                          ? t('contact.success_message')
                          : t('contact.error_message')}
                      </p>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>

              <form className="contact__form glass-card" onSubmit={handleSubmit}>
                <div className="contact__form-header">
                  <motion.div
                    className="contact__form-icon"
                    animate={{
                      rotate: isTyping ? [0, 10, -10, 0] : 0,
                      scale: isTyping ? [1, 1.1, 1] : 1
                    }}
                    transition={{ duration: 0.3 }}
                  >
                    <FiSend />
                  </motion.div>
                  <div className="contact__form-title">
                    <h3>{t('contact.form_title')}</h3>
                    <p>Hãy chia sẻ chi tiết về dự án của bạn</p>
                  </div>
                </div>
                
                <div className="contact__form-grid">
                  <motion.div 
                    className="contact__form-group"
                    whileFocus={{ scale: 1.02 }}
                    transition={{ type: 'spring', stiffness: 300 }}
                  >
                    <label htmlFor="name">
                      <FiUser /> {t('contact.name_required')}
                    </label>
                    <motion.input
                      type="text"
                      id="name"
                      name="name"
                      value={formData.name}
                      onChange={handleInputChange}
                      placeholder={t('contact.name')}
                      className={formErrors.name ? 'error' : ''}
                      whileFocus={{ 
                        borderColor: 'var(--primary-light)',
                        boxShadow: '0 0 0 3px rgba(99, 102, 241, 0.1)' 
                      }}
                      transition={{ duration: 0.2 }}
                    />
                    <AnimatePresence>
                      {formErrors.name && (
                        <motion.span 
                          className="contact__form-error"
                          initial={{ opacity: 0, y: -10 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, y: -10 }}
                        >
                          <FiAlertCircle /> {formErrors.name}
                        </motion.span>
                      )}
                    </AnimatePresence>
                  </motion.div>

                  <motion.div 
                    className="contact__form-group"
                    whileFocus={{ scale: 1.02 }}
                    transition={{ type: 'spring', stiffness: 300 }}
                  >
                    <label htmlFor="email">
                      <FiMail /> {t('contact.email_required')}
                    </label>
                    <motion.input
                      type="email"
                      id="email"
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      placeholder={t('contact.email')}
                      className={formErrors.email ? 'error' : ''}
                      whileFocus={{ 
                        borderColor: 'var(--primary-light)',
                        boxShadow: '0 0 0 3px rgba(99, 102, 241, 0.1)' 
                      }}
                      transition={{ duration: 0.2 }}
                    />
                    <AnimatePresence>
                      {formErrors.email && (
                        <motion.span 
                          className="contact__form-error"
                          initial={{ opacity: 0, y: -10 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, y: -10 }}
                        >
                          <FiAlertCircle /> {formErrors.email}
                        </motion.span>
                      )}
                    </AnimatePresence>
                  </motion.div>
                </div>

                <div className="contact__form-grid">
                  <div className="contact__form-group">
                    <label htmlFor="projectType">
                      <FiZap /> {t('contact.project_type')}
                    </label>
                    <select
                      id="projectType"
                      name="projectType"
                      value={formData.projectType}
                      onChange={handleInputChange}
                    >
                      <option value="">{t('contact.project_type_placeholder')}</option>
                      {projectTypes.map((type, index) => (
                        <option key={index} value={type}>{type}</option>
                      ))}
                    </select>
                  </div>

                  <div className="contact__form-group">
                    <label htmlFor="budget">
                      <FiStar /> {t('contact.budget')}
                    </label>
                    <select
                      id="budget"
                      name="budget"
                      value={formData.budget}
                      onChange={handleInputChange}
                    >
                      <option value="">{t('contact.budget_placeholder')}</option>
                      {budgetRanges.map((range, index) => (
                        <option key={index} value={range}>{range}</option>
                      ))}
                    </select>
                  </div>
                </div>

                <div className="contact__form-grid">
                  <motion.div 
                    className="contact__form-group"
                    whileFocus={{ scale: 1.02 }}
                    transition={{ type: 'spring', stiffness: 300 }}
                  >
                    <label htmlFor="subject">
                      <FiMessageSquare /> {t('contact.subject_required')}
                    </label>
                    <motion.input
                      type="text"
                      id="subject"
                      name="subject"
                      value={formData.subject}
                      onChange={handleInputChange}
                      placeholder={t('contact.subject')}
                      className={formErrors.subject ? 'error' : ''}
                      whileFocus={{ 
                        borderColor: 'var(--primary-light)',
                        boxShadow: '0 0 0 3px rgba(99, 102, 241, 0.1)' 
                      }}
                      transition={{ duration: 0.2 }}
                    />
                    <AnimatePresence>
                      {formErrors.subject && (
                        <motion.span 
                          className="contact__form-error"
                          initial={{ opacity: 0, y: -10 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, y: -10 }}
                        >
                          <FiAlertCircle /> {formErrors.subject}
                        </motion.span>
                      )}
                    </AnimatePresence>
                  </motion.div>

                  <div className="contact__form-group">
                    <label htmlFor="timeline">
                      <FiCalendar /> {t('contact.timeline')}
                    </label>
                    <select
                      id="timeline"
                      name="timeline"
                      value={formData.timeline}
                      onChange={handleInputChange}
                    >
                      <option value="">{t('contact.timeline_placeholder')}</option>
                      {timelines.map((time, index) => (
                        <option key={index} value={time}>{time}</option>
                      ))}
                    </select>
                  </div>
                </div>

                <motion.div 
                  className="contact__form-group contact__form-group--full"
                  whileFocus={{ scale: 1.01 }}
                  transition={{ type: 'spring', stiffness: 300 }}
                >
                  <label htmlFor="message">
                    <FiMessageSquare /> {t('contact.message_required')}
                  </label>
                  <motion.textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleInputChange}
                    placeholder={t('contact.message')}
                    rows={8}
                    className={formErrors.message ? 'error' : ''}
                    whileFocus={{ 
                      borderColor: 'var(--primary-light)',
                      boxShadow: '0 0 0 3px rgba(99, 102, 241, 0.1)' 
                    }}
                    transition={{ duration: 0.2 }}
                  />
                  <div className="contact__form-counter">
                    <span className={formData.message.length < 10 ? 'error' : ''}>
                      {formData.message.length}/1000 {t('contact.character_count')}
                    </span>
                  </div>
                  <AnimatePresence>
                    {formErrors.message && (
                      <motion.span 
                        className="contact__form-error"
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -10 }}
                      >
                        <FiAlertCircle /> {formErrors.message}
                      </motion.span>
                    )}
                  </AnimatePresence>
                </motion.div>

                <motion.div className="contact__form-actions">
                  <motion.button
                    type="submit"
                    className={`contact__form-submit ${isSubmitting ? 'loading' : ''}`}
                    disabled={isSubmitting}
                    whileHover={!isSubmitting ? { 
                      scale: 1.02,
                      boxShadow: '0 10px 30px rgba(99, 102, 241, 0.3)'
                    } : {}}
                    whileTap={!isSubmitting ? { scale: 0.98 } : {}}
                    transition={{ type: 'spring', stiffness: 400, damping: 25 }}
                  >
                    <motion.div
                      className="contact__form-submit-content"
                      animate={{
                        x: isSubmitting ? [-2, 2, -2, 2, 0] : 0
                      }}
                      transition={{ duration: 0.4 }}
                    >
                      {isSubmitting ? (
                        <>
                          <motion.div 
                            className="contact__form-spinner"
                            animate={{ rotate: 360 }}
                            transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
                          >
                            <FiZap />
                          </motion.div>
                          {t('contact.sending')}
                        </>
                      ) : (
                        <>
                          <FiSend />
                          {t('contact.send')}
                        </>
                      )}
                    </motion.div>
                    
                    <motion.div
                      className="contact__form-submit-glow"
                      animate={{
                        opacity: [0.5, 1, 0.5],
                        scale: [1, 1.05, 1]
                      }}
                      transition={{
                        duration: 2,
                        repeat: Infinity,
                        ease: 'easeInOut'
                      }}
                    />
                  </motion.button>
                  
                  <motion.div 
                    className="contact__form-note"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.3 }}
                  >
                    <FiCheck className="contact__form-note-icon" />
                    <span>{t('contact.response_commitment')}</span>
                  </motion.div>
                </motion.div>
              </form>
              
              {/* Quick Contact Options */}
              <motion.div 
                className="contact__quick-options"
                variants={itemVariants}
                initial="hidden"
                animate="visible"
              >
                <h4>{t('contact.quick_contact')}</h4>
                <div className="contact__quick-links">
                  <motion.a
                    href="mailto:nhdinh.dev03@gmail.com"
                    className="contact__quick-link"
                    whileHover={{ scale: 1.05, y: -2 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <FiMail />
                    <span>Email</span>
                  </motion.a>
                  <motion.a
                    href="tel:+84123456789"
                    className="contact__quick-link"
                    whileHover={{ scale: 1.05, y: -2 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <FiPhone />
                    <span>{t('contact.phone')}</span>
                  </motion.a>
                  <motion.a
                    href="https://linkedin.com/in/nhdinhdev03"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="contact__quick-link"
                    whileHover={{ scale: 1.05, y: -2 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <FiLinkedin />
                    <span>LinkedIn</span>
                  </motion.a>
                </div>
              </motion.div>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}

export default Contact
