import { motion } from 'framer-motion'
import { memo, useCallback, useDeferredValue, useId, useMemo, useTransition } from 'react'
import { useTranslation } from 'react-i18next'
import {
  FiArrowRight,
  FiCalendar,
  FiCode,
  FiMapPin,
  FiStar,
  FiTrendingUp,
  FiZap
} from 'react-icons/fi'
import { useInView } from 'react-intersection-observer'

import './Experience.scss'
import useDeviceCapability from 'hooks/useDeviceCapability'
import withPerformanceOptimization from 'components/PerformanceOptimization'


const Experience = memo(() => {
  const { t } = useTranslation()
  const { isLowPerformance, isMobile } = useDeviceCapability()
  const [isPending] = useTransition()
  // Note: startTransition is available for future dynamic updates
  const componentId = useId()
  
  // Deferred values for better performance during updates
  const deferredIsLowPerformance = useDeferredValue(isLowPerformance)
  const deferredIsMobile = useDeferredValue(isMobile)
  
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: deferredIsLowPerformance ? 0.05 : 0.1,
    rootMargin: deferredIsMobile ? '50px' : '100px'
  })

  // Memoize experiences data với performance optimization và i18n support
  const experiences = useMemo(() => [
    {
      id: 1,
      title: t('experience.jobs.webDeveloper.title', 'Web Developer'),
      company: t('experience.jobs.webDeveloper.company', 'Freelance Projects'),
      period: t('experience.jobs.webDeveloper.period', '2023 - Hiện tại'),
      location: t('experience.jobs.webDeveloper.location', 'Hậu Giang, Việt Nam'),
      description: t('experience.jobs.webDeveloper.description', 'Phát triển các website và ứng dụng web sử dụng công nghệ hiện đại. Chuyên về React, java và các framework JavaScript. Tham gia xây dựng các dự án từ nhỏ đến trung bình.'),
      achievements: [
        t('experience.jobs.webDeveloper.achievements.0', 'Hoàn thành 10+ dự án web thành công'),
        t('experience.jobs.webDeveloper.achievements.1', 'Thực hiện React, Java và SQL Server'),
        t('experience.jobs.webDeveloper.achievements.2', 'Triển khai website với responsive design 100%')
      ],
      technologies: ['React', 'Java', 'JavaScript', 'HTML5', 'CSS3', 'SQL Server'],
      icon: FiCode,
      color: '#6366f1',
      bgColor: '#f0f9ff',
      priority: 'high'
    },
    {
      id: 2,
      title: t('experience.jobs.javaDeveloper.title', 'Java Desktop Developer'),
      company: t('experience.jobs.javaDeveloper.company', 'Personal Projects'),
      period: t('experience.jobs.javaDeveloper.period', '2023 - 2024'),
      location: t('experience.jobs.javaDeveloper.location', 'Hậu Giang, Việt Nam'),
      description: t('experience.jobs.javaDeveloper.description', 'Phát triển các ứng dụng desktop bằng Java Swing. Tạo ra các phần mềm quản lý và ứng dụng tiện ích với giao diện người dùng thân thiện và hiệu quả.'),
      achievements: [
        t('experience.jobs.javaDeveloper.achievements.0', 'Phát triển 5+ ứng dụng Java Swing hoàn chỉnh'),
        t('experience.jobs.javaDeveloper.achievements.1', 'Thiết kế UI/UX cho desktop applications'),
        t('experience.jobs.javaDeveloper.achievements.2', 'Tích hợp database với ứng dụng Java')
      ],
      technologies: ['Java', 'Swing', 'MySQL', 'NetBeans', 'Eclipse'],
      icon: FiTrendingUp,
      color: '#ec4899',
      bgColor: '#fdf2f8',
      priority: 'medium'
    },
    {
      id: 3,
      title: t('experience.jobs.frontendFoundation.title', 'Frontend Foundation'),
      company: t('experience.jobs.frontendFoundation.company', 'Self-taught Learning'),
      period: t('experience.jobs.frontendFoundation.period', '2022 - 2023'),
      location: t('experience.jobs.frontendFoundation.location', 'Hậu Giang, Việt Nam'),
      description: t('experience.jobs.frontendFoundation.description', 'Bắt đầu hành trình lập trình với việc tìm hiểu HTML, CSS và JavaScript. Xây dựng nền tảng vững chắc về frontend development và responsive web design.'),
      achievements: [
        t('experience.jobs.frontendFoundation.achievements.0', 'Nắm vững HTML5, CSS3 và JavaScript ES6+'),
        t('experience.jobs.frontendFoundation.achievements.1', 'Tạo ra các website static responsive'),
        t('experience.jobs.frontendFoundation.achievements.2', 'Hiểu sâu về DOM manipulation và Events')
      ],
      technologies: ['HTML5', 'CSS3', 'JavaScript', 'Bootstrap', 'jQuery'],
      icon: FiZap,
      color: '#06b6d4',
      bgColor: '#f0fdfa',
      priority: 'low'
    }
  ], [t])

  // Performance-optimized animation variants
  const containerVariants = useMemo(() => ({
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: deferredIsLowPerformance ? 0.1 : 0.2,
        delayChildren: deferredIsLowPerformance ? 0.05 : 0.1,
        when: "beforeChildren"
      }
    }
  }), [deferredIsLowPerformance])

  const cardVariants = useMemo(() => ({
    hidden: { 
      opacity: 0, 
      y: deferredIsLowPerformance ? 20 : 50,
      scale: deferredIsLowPerformance ? 1 : 0.95
    },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        type: deferredIsLowPerformance ? 'tween' : 'spring',
        stiffness: deferredIsLowPerformance ? undefined : 100,
        damping: deferredIsLowPerformance ? undefined : 15,
        duration: deferredIsLowPerformance ? 0.3 : undefined,
        ease: deferredIsLowPerformance ? [0.4, 0, 0.2, 1] : undefined
      }
    }
  }), [deferredIsLowPerformance])

  // Optimized hover variants for performance
  const hoverVariants = useMemo(() => {
    if (deferredIsLowPerformance || deferredIsMobile) {
      return {}
    }
    return {
      y: -10,
      scale: 1.02,
      transition: { type: "spring", stiffness: 300, damping: 25 }
    }
  }, [deferredIsLowPerformance, deferredIsMobile])

  // Memoized render functions for performance
  const renderExperienceCard = useCallback((exp, index) => {
    const cardId = `${componentId}-card-${exp.id}`
    
    return (
      <motion.article
        key={exp.id}
        id={cardId}
        className={`experience__card ${deferredIsLowPerformance ? 'low-performance' : ''} ${deferredIsMobile ? 'mobile-optimized' : ''}`}
        variants={cardVariants}
        whileHover={hoverVariants}
        aria-labelledby={`${cardId}-title`}
        aria-describedby={`${cardId}-description`}
        tabIndex={0}
      >
        {/* Card Header */}
        <header className="experience__card-header">
          <div 
            className="experience__icon-wrapper" 
            style={{ backgroundColor: exp.bgColor }}
            aria-label={`${exp.title} icon`}
          >
            <exp.icon 
              className="experience__icon"
              style={{ color: exp.color }}
              aria-hidden="true"
            />
          </div>
          <div className="experience__period">
            <FiCalendar className="experience__period-icon" aria-hidden="true" />
            <time dateTime={exp.period}>{exp.period}</time>
          </div>
        </header>

        {/* Job Info */}
        <div className="experience__job-info">
          <h3 id={`${cardId}-title`} className="experience__job-title">
            {exp.title}
          </h3>
          <div 
            className="experience__company"
            style={{ backgroundColor: exp.color }}
          >
            {exp.company}
          </div>
          <div className="experience__location">
            <FiMapPin className="experience__location-icon" aria-hidden="true" />
            <span>{exp.location}</span>
          </div>
        </div>

        {/* Description */}
        <p id={`${cardId}-description`} className="experience__job-description">
          {exp.description}
        </p>

        {/* Achievements */}
        <section className="experience__achievements" aria-labelledby={`${cardId}-achievements`}>
          <h4 id={`${cardId}-achievements`} className="experience__achievements-title">
            <FiStar className="experience__achievements-icon" aria-hidden="true" />
            {t('experience.achievements.title', 'Thành tựu chính')}
          </h4>
          <ul className="experience__achievements-list">
            {exp.achievements.map((achievement, i) => (
              <li key={i} className="experience__achievement">
                <FiArrowRight className="experience__achievement-icon" aria-hidden="true" />
                {achievement}
              </li>
            ))}
          </ul>
        </section>

        {/* Technologies */}
        <fieldset className="experience__technologies">
          <legend id={`${cardId}-technologies`} className="sr-only">
            {t('experience.technologies.label', 'Công nghệ sử dụng')}
          </legend>
          {exp.technologies.map((tech, i) => (
            <button 
              key={i} 
              className="experience__tech-tag"
              style={{ borderColor: exp.color }}
              aria-label={`${tech} technology`}
              type="button"
            >
              {tech}
            </button>
          ))}
        </fieldset>
      </motion.article>
    )
  }, [cardVariants, hoverVariants, deferredIsLowPerformance, deferredIsMobile, componentId, t])

  return (
    <section 
      id="experience" 
      className={`experience ${deferredIsLowPerformance ? 'low-performance' : ''} ${isPending ? 'updating' : ''}`}
      aria-labelledby="experience-title"
      aria-describedby="experience-description"
    >
      <div className="container">
        <motion.div
          ref={ref}
          className="experience__content"
          variants={containerVariants}
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
        >
          {/* Section Header */}
          <motion.header 
            className="experience__header"
            variants={cardVariants}
          >
            <span className="experience__subtitle">
              {t('experience.subtitle', 'Professional Journey')}
            </span>
            <h2 id="experience-title" className="experience__title">
              {t('experience.title', 'Work Experience')}
            </h2>
            <p id="experience-description" className="experience__description">
              {t('experience.description', 'My professional development journey and key achievements')}
            </p>
          </motion.header>

          {/* Experience Cards */}
          <ul 
            className="experience__grid"
            aria-label={t('experience.grid.label', 'Work experience timeline')}
          >
            {experiences.map((exp, index) => (
              <li key={exp.id}>
                {renderExperienceCard(exp, index)}
              </li>
            ))}
          </ul>

          {/* Loading Indicator for Transitions */}
          {isPending && (
            <motion.div 
              className="experience__loading"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              aria-live="polite"
              aria-label={t('experience.loading', 'Updating experience data')}
            >
              <div className="experience__loading-spinner" />
            </motion.div>
          )}
        </motion.div>
      </div>
    </section>
  )
})

Experience.displayName = 'Experience'

// Apply performance optimization HOC
const OptimizedExperience = withPerformanceOptimization(Experience, {
  enableAnimations: true,
  enableParticles: false,
  enableParallax: false,
  name: 'Experience'
})

export default OptimizedExperience
