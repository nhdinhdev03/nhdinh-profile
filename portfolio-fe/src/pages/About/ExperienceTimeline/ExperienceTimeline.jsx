import { motion } from "framer-motion";
import { memo, useCallback, useDeferredValue, useState } from "react";
import { useTranslation } from "react-i18next";
import {
  FiAward,
  FiBriefcase,
  FiCalendar,
  FiCheckCircle,
  FiClock,
  FiCode,
  FiExternalLink,
  FiLayers,
  FiMapPin,
  FiStar,
  FiTarget,
  FiTrendingUp,
  FiUsers,
  FiZap
} from "react-icons/fi";
import { useInView } from "react-intersection-observer";


import withPerformanceOptimization from "components/PerformanceOptimization";
import useDeviceCapability from "hooks/useDeviceCapability";
import "./ExperienceTimeline.scss";

const ExperienceTimeline = memo(() => {
  const { t } = useTranslation();
  const { isLowPerformance, isMobile } = useDeviceCapability();
  const [activeExperience, setActiveExperience] = useState(null);
  
  // Deferred values for performance
  const deferredIsLowPerformance = useDeferredValue(isLowPerformance);
  const deferredIsMobile = useDeferredValue(isMobile);
  
  // Intersection observer for performance
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: deferredIsLowPerformance ? 0.05 : 0.1,
    rootMargin: deferredIsMobile ? '50px' : '100px'
  });

  // Comprehensive experience data
  const experiences = [
    {
      id: 1,
      title: t('experience.freelancer.title', "Freelance Full-Stack Developer"),
      company: t('experience.freelancer.company', "Self-Employed"),
      type: "Freelance",
      duration: "2022 - Present",
      period: "2+ years",
      location: "Ho Chi Minh City, Vietnam",
      status: "current",
      description: t('experience.freelancer.description', 
        "Developing custom web applications and mobile solutions for various clients, specializing in React/Next.js ecosystems and modern UI/UX design."
      ),
      highlights: [
        t('experience.freelancer.highlight1', "Built 25+ responsive web applications"),
        t('experience.freelancer.highlight2', "Achieved 100% client satisfaction rate"),
        t('experience.freelancer.highlight3', "Specialized in React, Next.js, and Node.js"),
        t('experience.freelancer.highlight4', "Implemented modern CI/CD workflows")
      ],
      technologies: ["React", "Next.js", "Node.js", "TypeScript", "MongoDB", "AWS", "Vercel"],
      projects: [
        {
          name: "E-commerce Platform",
          description: "Full-stack e-commerce solution with payment integration",
          tech: ["Next.js", "Stripe", "MongoDB"],
          link: "#"
        },
        {
          name: "Portfolio Website",
          description: "Modern portfolio with animations and CMS integration",
          tech: ["React", "Framer Motion", "Sanity"],
          link: "#"
        }
      ],
      achievements: [
        { icon: FiAward, text: "Top-rated freelancer on multiple platforms" },
        { icon: FiUsers, text: "15+ satisfied clients worldwide" },
        { icon: FiTrendingUp, text: "300% year-over-year growth" }
      ]
    },
    {
      id: 2,
      title: t('experience.frontend.title', "Frontend Developer"),
      company: t('experience.frontend.company', "Tech Solutions Co."),
      type: "Full-time",
      duration: "2021 - 2022",
      period: "1 year",
      location: "Ho Chi Minh City, Vietnam",
      status: "completed",
      description: t('experience.frontend.description',
        "Developed and maintained responsive web applications using React and modern frontend technologies. Collaborated with design and backend teams to deliver high-quality user experiences."
      ),
      highlights: [
        t('experience.frontend.highlight1', "Led frontend development for 3 major projects"),
        t('experience.frontend.highlight2', "Improved application performance by 40%"),
        t('experience.frontend.highlight3', "Mentored 2 junior developers"),
        t('experience.frontend.highlight4', "Implemented automated testing workflows")
      ],
      technologies: ["React", "Vue.js", "JavaScript", "Sass", "Jest", "Cypress"],
      projects: [
        {
          name: "Dashboard Application",
          description: "Real-time analytics dashboard for business intelligence",
          tech: ["React", "D3.js", "WebSocket"],
          link: "#"
        },
        {
          name: "Mobile-First Website",
          description: "Responsive corporate website with CMS",
          tech: ["Vue.js", "Nuxt.js", "Strapi"],
          link: "#"
        }
      ],
      achievements: [
        { icon: FiCode, text: "Reduced bundle size by 35%" },
        { icon: FiCheckCircle, text: "99.9% uptime achievement" },
        { icon: FiStar, text: "Employee of the quarter Q4 2021" }
      ]
    },
    {
      id: 3,
      title: t('experience.junior.title', "Junior Web Developer"),
      company: t('experience.junior.company', "Digital Agency"),
      type: "Full-time",
      duration: "2020 - 2021",
      period: "1 year",
      location: "Ho Chi Minh City, Vietnam",
      status: "completed",
      description: t('experience.junior.description',
        "Started my professional journey building websites and learning modern web development practices. Gained experience in HTML, CSS, JavaScript, and basic backend development."
      ),
      highlights: [
        t('experience.junior.highlight1', "Built 10+ responsive websites"),
        t('experience.junior.highlight2', "Learned React and modern JavaScript"),
        t('experience.junior.highlight3', "Collaborated with senior developers"),
        t('experience.junior.highlight4', "Participated in code reviews and team meetings")
      ],
      technologies: ["HTML5", "CSS3", "JavaScript", "jQuery", "PHP", "MySQL"],
      projects: [
        {
          name: "Company Website",
          description: "Corporate website with contact forms and gallery",
          tech: ["HTML", "CSS", "JavaScript"],
          link: "#"
        },
        {
          name: "Blog Platform",
          description: "Simple blog platform with admin panel",
          tech: ["PHP", "MySQL", "Bootstrap"],
          link: "#"
        }
      ],
      achievements: [
        { icon: FiTarget, text: "Completed first project ahead of schedule" },
        { icon: FiLayers, text: "Learned 5+ new technologies" },
        { icon: FiZap, text: "Quick adaptation to team workflow" }
      ]
    }
  ];

  // Handle experience selection
  const handleExperienceSelect = useCallback((experienceId) => {
    setActiveExperience(activeExperience === experienceId ? null : experienceId);
  }, [activeExperience]);

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        delayChildren: 0.2,
        staggerChildren: 0.15
      }
    }
  };

  const timelineVariants = {
    hidden: { opacity: 0, x: -50 },
    visible: {
      opacity: 1,
      x: 0,
      transition: { type: 'spring', stiffness: 120, damping: 15 }
    }
  };

  const cardVariants = {
    hidden: { opacity: 0, y: 30, scale: 0.95 },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: { type: 'spring', stiffness: 120, damping: 12 }
    }
  };

  return (
    <motion.section 
      ref={ref}
      className={`experience-timeline ${deferredIsLowPerformance ? 'low-performance' : ''} ${deferredIsMobile ? 'mobile-optimized' : ''}`}
      variants={containerVariants}
      initial="hidden"
      animate={inView ? "visible" : "hidden"}
    >
      <div className="container">
        {/* Section Header */}
        <motion.div className="section-header" variants={timelineVariants}>
          <h2 className="section-title">
            <FiBriefcase className="title-icon" />
            {t('experience.title', "Professional Experience")}
          </h2>
          <p className="section-description">
            {t('experience.description', "My journey through different roles and companies, building expertise in web development and delivering impactful solutions.")}
          </p>
        </motion.div>

        {/* Timeline */}
        <div className="timeline-container">
          <motion.div 
            className="timeline-line"
            initial={{ height: 0 }}
            animate={{ height: inView ? '100%' : 0 }}
            transition={{ delay: 0.5, duration: 1.2, ease: 'easeOut' }}
          />

          {experiences.map((experience, index) => (
            <motion.div
              key={experience.id}
              className={`timeline-item ${experience.status} ${activeExperience === experience.id ? 'active' : ''}`}
              variants={cardVariants}
            >
              {/* Timeline Node */}
              <motion.div 
                className="timeline-node"
                whileHover={{ scale: deferredIsLowPerformance ? 1 : 1.2 }}
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: 0.8 + (index * 0.2), type: 'spring', stiffness: 200 }}
              >
                <FiBriefcase className="node-icon" />
                {experience.status === 'current' && (
                  <motion.div 
                    className="pulse-ring"
                    animate={{
                      scale: [1, 1.5, 1],
                      opacity: [0.7, 0, 0.7]
                    }}
                    transition={{
                      duration: 2,
                      repeat: Infinity,
                      ease: 'easeInOut'
                    }}
                  />
                )}
              </motion.div>

              {/* Experience Card */}
              <motion.div 
                className="experience-card"
                whileHover={{ scale: deferredIsLowPerformance ? 1 : 1.02, y: -5 }}
                onClick={() => handleExperienceSelect(experience.id)}
              >
                <div className="card-header">
                  <div className="experience-meta">
                    <div className="title-section">
                      <h3 className="job-title">{experience.title}</h3>
                      <div className="company-info">
                        <span className="company-name">{experience.company}</span>
                        <span className="job-type">{experience.type}</span>
                      </div>
                    </div>
                    <div className="duration-section">
                      <div className="duration">
                        <FiCalendar className="duration-icon" />
                        <span>{experience.duration}</span>
                      </div>
                      <div className="location">
                        <FiMapPin className="location-icon" />
                        <span>{experience.location}</span>
                      </div>
                    </div>
                  </div>
                  
                  {experience.status === 'current' && (
                    <motion.span 
                      className="current-badge"
                      animate={{
                        scale: [1, 1.05, 1],
                        boxShadow: [
                          '0 0 0 0 rgba(34, 197, 94, 0.7)',
                          '0 0 0 10px rgba(34, 197, 94, 0)',
                          '0 0 0 0 rgba(34, 197, 94, 0)'
                        ]
                      }}
                      transition={{
                        duration: 2,
                        repeat: Infinity,
                        ease: 'easeInOut'
                      }}
                    >
                      {t('experience.current', "Current")}
                    </motion.span>
                  )}
                </div>

                <div className="card-content">
                  <p className="job-description">{experience.description}</p>
                  
                  {/* Technologies */}
                  <div className="technologies">
                    <h4>{t('experience.technologies', "Technologies Used")}</h4>
                    <div className="tech-list">
                      {experience.technologies.map((tech, techIndex) => (
                        <motion.span
                          key={tech}
                          className="tech-tag"
                          initial={{ opacity: 0, scale: 0.8 }}
                          animate={{ opacity: 1, scale: 1 }}
                          transition={{ delay: 0.1 * techIndex }}
                          whileHover={{ scale: 1.05, y: -2 }}
                        >
                          {tech}
                        </motion.span>
                      ))}
                    </div>
                  </div>

                  {/* Highlights */}
                  <div className="highlights">
                    <h4>{t('experience.highlights', "Key Highlights")}</h4>
                    <ul className="highlights-list">
                      {experience.highlights.map((highlight, highlightIndex) => (
                        <motion.li
                          key={highlightIndex}
                          initial={{ opacity: 0, x: -20 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: 0.1 * highlightIndex }}
                        >
                          <FiCheckCircle className="highlight-icon" />
                          {highlight}
                        </motion.li>
                      ))}
                    </ul>
                  </div>

                  {/* Expandable Content */}
                  {activeExperience === experience.id && (
                    <motion.div
                      className="expanded-content"
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: 'auto' }}
                      exit={{ opacity: 0, height: 0 }}
                      transition={{ duration: 0.3 }}
                    >
                      {/* Projects */}
                      {experience.projects && (
                        <div className="projects-section">
                          <h4>{t('experience.key_projects', "Key Projects")}</h4>
                          <div className="projects-grid">
                            {experience.projects.map((project, projectIndex) => (
                              <div key={projectIndex} className="project-item">
                                <h5 className="project-name">{project.name}</h5>
                                <p className="project-description">{project.description}</p>
                                <div className="project-tech">
                                  {project.tech.map((tech, techIdx) => (
                                    <span key={techIdx} className="project-tech-tag">{tech}</span>
                                  ))}
                                </div>
                                {project.link && (
                                  <a href={project.link} className="project-link">
                                    <FiExternalLink />
                                    {t('experience.view_project', "View Project")}
                                  </a>
                                )}
                              </div>
                            ))}
                          </div>
                        </div>
                      )}

                      {/* Achievements */}
                      <div className="achievements-section">
                        <h4>{t('experience.achievements', "Achievements")}</h4>
                        <div className="achievements-list">
                          {experience.achievements.map((achievement, achIndex) => (
                            <div key={achIndex} className="achievement-item">
                              <achievement.icon className="achievement-icon" />
                              <span>{achievement.text}</span>
                            </div>
                          ))}
                        </div>
                      </div>
                    </motion.div>
                  )}

                  {/* Expand Button */}
                  <motion.button
                    className="expand-button"
                    onClick={(e) => {
                      e.stopPropagation();
                      handleExperienceSelect(experience.id);
                    }}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    {activeExperience === experience.id 
                      ? t('experience.show_less', "Show Less") 
                      : t('experience.show_more', "Show More")
                    }
                  </motion.button>
                </div>
              </motion.div>
            </motion.div>
          ))}
        </div>

        {/* Experience Summary */}
        <motion.div className="experience-summary" variants={timelineVariants}>
          <div className="summary-stats">
            <div className="stat-item">
              <FiClock className="stat-icon" />
              <div className="stat-content">
                <span className="stat-number">4+</span>
                <span className="stat-label">{t('experience.years_experience', "Years Experience")}</span>
              </div>
            </div>
            <div className="stat-item">
              <FiBriefcase className="stat-icon" />
              <div className="stat-content">
                <span className="stat-number">3</span>
                <span className="stat-label">{t('experience.companies', "Companies")}</span>
              </div>
            </div>
            <div className="stat-item">
              <FiAward className="stat-icon" />
              <div className="stat-content">
                <span className="stat-number">50+</span>
                <span className="stat-label">{t('experience.projects_delivered', "Projects Delivered")}</span>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </motion.section>
  );
});

ExperienceTimeline.displayName = 'ExperienceTimeline';

export default withPerformanceOptimization(ExperienceTimeline, {
  enableParticles: false,
  enableAnimations: true,
  enableParallax: false,
  name: 'ExperienceTimeline'
});