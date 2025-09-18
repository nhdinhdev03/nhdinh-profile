import { motion } from 'framer-motion';
import React, { useDeferredValue, useId, useTransition } from 'react';
import {
    FaAward,
    FaBook,
    FaCalendarAlt,
    FaCertificate,
    FaChevronDown,
    FaChevronUp,
    FaExternalLinkAlt,
    FaGraduationCap,
    FaMapMarkerAlt,
    FaMedal
} from 'react-icons/fa';
import { useInView } from 'react-intersection-observer';


import './Education.scss';
import withPerformanceOptimization from 'components/PerformanceOptimization';
import useDeviceCapability from 'hooks/useDeviceCapability';

const Education = () => {
  const [isPending, startTransition] = useTransition();
  const { isLowPerformance, isMobile } = useDeviceCapability();
  const [expandedItems, setExpandedItems] = React.useState(new Set());
  
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
    rootMargin: '-50px 0px',
  });

  // Educational background data
  const educationData = {
    formal: [
      {
        id: 'university-1',
        degree: 'Bachelor of Computer Science',
        field: 'Software Engineering',
        institution: 'University of Technology',
        location: 'Ho Chi Minh City, Vietnam',
        period: '2018 - 2022',
        gpa: '3.8/4.0',
        status: 'Completed',
        description: 'Comprehensive study of software engineering principles, algorithms, data structures, and modern development methodologies. Specialized in web technologies and system design.',
        coursework: [
          'Data Structures & Algorithms',
          'Software Engineering',
          'Database Management Systems',
          'Computer Networks',
          'Web Development',
          'Mobile Application Development',
          'System Analysis & Design',
          'Artificial Intelligence'
        ],
        projects: [
          {
            name: 'E-commerce Management System',
            description: 'Full-stack web application with React and Node.js',
            technologies: ['React', 'Node.js', 'MongoDB', 'Express'],
            grade: 'A+'
          },
          {
            name: 'Mobile Expense Tracker',
            description: 'Cross-platform mobile app using React Native',
            technologies: ['React Native', 'Firebase', 'Redux'],
            grade: 'A'
          }
        ],
        achievements: [
          'Dean\'s List - 4 semesters',
          'Outstanding Student Award 2021',
          'Best Capstone Project Award',
          'Academic Excellence Scholarship'
        ]
      }
    ],
    certifications: [
      {
        id: 'cert-1',
        name: 'AWS Certified Solutions Architect',
        issuer: 'Amazon Web Services',
        date: '2023',
        validUntil: '2026',
        credentialId: 'AWS-SAA-2023-001',
        description: 'Validates expertise in designing distributed systems on AWS platform',
        skills: ['Cloud Architecture', 'AWS Services', 'Security', 'Cost Optimization'],
        link: '#'
      },
      {
        id: 'cert-2',
        name: 'Google Cloud Professional Developer',
        issuer: 'Google Cloud',
        date: '2023',
        validUntil: '2025',
        credentialId: 'GCP-PD-2023-002',
        description: 'Demonstrates ability to build scalable applications on Google Cloud',
        skills: ['GCP Services', 'Microservices', 'CI/CD', 'Monitoring'],
        link: '#'
      },
      {
        id: 'cert-3',
        name: 'Microsoft Azure Fundamentals',
        issuer: 'Microsoft',
        date: '2022',
        validUntil: 'Lifetime',
        credentialId: 'AZ-900-2022-003',
        description: 'Foundation-level understanding of cloud services and Azure',
        skills: ['Azure Services', 'Cloud Concepts', 'Security', 'Compliance'],
        link: '#'
      },
      {
        id: 'cert-4',
        name: 'React Developer Certification',
        issuer: 'Meta',
        date: '2022',
        validUntil: '2025',
        credentialId: 'META-RD-2022-004',
        description: 'Advanced React development skills and best practices',
        skills: ['React', 'Redux', 'Testing', 'Performance Optimization'],
        link: '#'
      }
    ],
    courses: [
      {
        id: 'course-1',
        title: 'Advanced React Patterns',
        provider: 'Epic React by Kent C. Dodds',
        completedDate: '2023',
        duration: '40 hours',
        skills: ['Advanced React', 'Hooks', 'Performance', 'Testing']
      },
      {
        id: 'course-2',
        title: 'System Design Interview',
        provider: 'ByteByteGo',
        completedDate: '2023',
        duration: '30 hours',
        skills: ['System Design', 'Scalability', 'Architecture', 'Databases']
      },
      {
        id: 'course-3',
        title: 'AWS Solutions Architect',
        provider: 'A Cloud Guru',
        completedDate: '2023',
        duration: '50 hours',
        skills: ['AWS', 'Cloud Architecture', 'DevOps', 'Security']
      }
    ]
  };

  const deferredEducationData = useDeferredValue(educationData);

  const toggleExpanded = (itemId) => {
    startTransition(() => {
      setExpandedItems(prev => {
        const newSet = new Set(prev);
        if (newSet.has(itemId)) {
          newSet.delete(itemId);
        } else {
          newSet.add(itemId);
        }
        return newSet;
      });
    });
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: !isLowPerformance ? 0.2 : 0,
        delayChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { 
      opacity: 0, 
      y: !isLowPerformance ? 30 : 0 
    },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: !isLowPerformance ? 0.6 : 0.3,
        ease: [0.4, 0, 0.2, 1],
      },
    },
  };

  const performanceClass = `${isLowPerformance ? 'low-performance' : ''} ${isMobile ? 'mobile-optimized' : ''}`.trim();

  return (
    <motion.section 
      className={`education ${performanceClass}`}
      variants={containerVariants}
      initial="hidden"
      animate={inView ? "visible" : "hidden"}
      ref={ref}
    >
      <div className="container">
        {/* Section Header */}
        <motion.div className="section-header" variants={itemVariants}>
          <h2 className="section-title">
            <FaGraduationCap className="title-icon" />
            Education & Certifications
          </h2>
          <p className="section-description">
            My academic background and professional certifications that shape my expertise in software development and technology.
          </p>
        </motion.div>

        {/* Formal Education */}
        <motion.div className="education-section formal-education" variants={itemVariants}>
          <h3 className="subsection-title">
            <FaGraduationCap className="subsection-icon" />
            Formal Education
          </h3>
          
          <div className="education-grid">
            {deferredEducationData.formal.map((education) => (
              <motion.div
                key={education.id}
                className={`education-card ${expandedItems.has(education.id) ? 'expanded' : ''}`}
                variants={itemVariants}
                whileHover={!isLowPerformance ? { y: -5 } : {}}
              >
                <div className="card-header">
                  <div className="education-meta">
                    <div className="degree-section">
                      <h4 className="degree-title">{education.degree}</h4>
                      <div className="institution-info">
                        <span className="institution-name">{education.institution}</span>
                        <span className="field-badge">{education.field}</span>
                      </div>
                    </div>
                    
                    <div className="education-details">
                      <div className="period">
                        <FaCalendarAlt className="detail-icon" />
                        <span>{education.period}</span>
                      </div>
                      <div className="location">
                        <FaMapMarkerAlt className="detail-icon" />
                        <span>{education.location}</span>
                      </div>
                      <div className="gpa">
                        <FaMedal className="detail-icon" />
                        <span>GPA: {education.gpa}</span>
                      </div>
                    </div>
                  </div>

                  <div className="status-badge completed">
                    <FaAward />
                    {education.status}
                  </div>
                </div>

                <div className="card-content">
                  <p className="education-description">{education.description}</p>

                  {expandedItems.has(education.id) && (
                    <motion.div
                      className="expanded-content"
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: 'auto' }}
                      exit={{ opacity: 0, height: 0 }}
                      transition={{ duration: 0.3 }}
                    >
                      <div className="coursework-section">
                        <h5>Key Coursework</h5>
                        <div className="coursework-grid">
                          {education.coursework.map((course, index) => (
                            <span key={index} className="course-tag">
                              {course}
                            </span>
                          ))}
                        </div>
                      </div>

                      <div className="projects-section">
                        <h5>Notable Projects</h5>
                        <div className="projects-list">
                          {education.projects.map((project, index) => (
                            <div key={index} className="project-item">
                              <div className="project-header">
                                <span className="project-name">{project.name}</span>
                                <span className="project-grade">{project.grade}</span>
                              </div>
                              <p className="project-description">{project.description}</p>
                              <div className="project-tech">
                                {project.technologies.map((tech, techIndex) => (
                                  <span key={techIndex} className="tech-tag">
                                    {tech}
                                  </span>
                                ))}
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>

                      <div className="achievements-section">
                        <h5>Academic Achievements</h5>
                        <ul className="achievements-list">
                          {education.achievements.map((achievement, index) => (
                            <li key={index}>
                              <FaAward className="achievement-icon" />
                              {achievement}
                            </li>
                          ))}
                        </ul>
                      </div>
                    </motion.div>
                  )}

                  <button
                    className="expand-button"
                    onClick={() => toggleExpanded(education.id)}
                    disabled={isPending}
                  >
                    {expandedItems.has(education.id) ? (
                      <>
                        <FaChevronUp />
                        Show Less
                      </>
                    ) : (
                      <>
                        <FaChevronDown />
                        View Details
                      </>
                    )}
                  </button>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Certifications */}
        <motion.div className="education-section certifications" variants={itemVariants}>
          <h3 className="subsection-title">
            <FaCertificate className="subsection-icon" />
            Professional Certifications
          </h3>
          
          <div className="certifications-grid">
            {deferredEducationData.certifications.map((cert) => (
              <motion.div
                key={cert.id}
                className="certification-card"
                variants={itemVariants}
                whileHover={!isLowPerformance ? { y: -3 } : {}}
              >
                <div className="cert-header">
                  <div className="cert-icon">
                    <FaCertificate />
                  </div>
                  <div className="cert-meta">
                    <h4 className="cert-name">{cert.name}</h4>
                    <p className="cert-issuer">{cert.issuer}</p>
                  </div>
                  {cert.link && (
                    <a href={cert.link} className="cert-link" target="_blank" rel="noopener noreferrer">
                      <FaExternalLinkAlt />
                    </a>
                  )}
                </div>

                <div className="cert-content">
                  <p className="cert-description">{cert.description}</p>
                  
                  <div className="cert-details">
                    <div className="cert-dates">
                      <span className="cert-date">
                        <FaCalendarAlt />
                        Issued: {cert.date}
                      </span>
                      <span className="cert-validity">
                        Valid until: {cert.validUntil}
                      </span>
                    </div>
                    
                    <div className="credential-id">
                      <strong>ID:</strong> {cert.credentialId}
                    </div>
                  </div>

                  <div className="cert-skills">
                    <h5>Skills Validated</h5>
                    <div className="skills-list">
                      {cert.skills.map((skill, index) => (
                        <span key={index} className="skill-tag">
                          {skill}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Online Courses */}
        <motion.div className="education-section online-courses" variants={itemVariants}>
          <h3 className="subsection-title">
            <FaBook className="subsection-icon" />
            Continuous Learning
          </h3>
          
          <div className="courses-grid">
            {deferredEducationData.courses.map((course) => (
              <motion.div
                key={course.id}
                className="course-card"
                variants={itemVariants}
                whileHover={!isLowPerformance ? { scale: 1.02 } : {}}
              >
                <div className="course-header">
                  <h4 className="course-title">{course.title}</h4>
                  <p className="course-provider">{course.provider}</p>
                </div>

                <div className="course-content">
                  <div className="course-meta">
                    <span className="completion-date">
                      <FaCalendarAlt />
                      Completed: {course.completedDate}
                    </span>
                    <span className="course-duration">
                      Duration: {course.duration}
                    </span>
                  </div>

                  <div className="course-skills">
                    {course.skills.map((skill, index) => (
                      <span key={index} className="skill-tag">
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Education Summary */}
        <motion.div className="education-summary" variants={itemVariants}>
          <div className="summary-stats">
            <div className="stat-item">
              <div className="stat-icon">
                <FaGraduationCap />
              </div>
              <div className="stat-content">
                <span className="stat-number">1</span>
                <span className="stat-label">Degree</span>
              </div>
            </div>

            <div className="stat-item">
              <div className="stat-icon">
                <FaCertificate />
              </div>
              <div className="stat-content">
                <span className="stat-number">{educationData.certifications.length}</span>
                <span className="stat-label">Certifications</span>
              </div>
            </div>

            <div className="stat-item">
              <div className="stat-icon">
                <FaBook />
              </div>
              <div className="stat-content">
                <span className="stat-number">{educationData.courses.length}</span>
                <span className="stat-label">Courses</span>
              </div>
            </div>

            <div className="stat-item">
              <div className="stat-icon">
                <FaAward />
              </div>
              <div className="stat-content">
                <span className="stat-number">3.8</span>
                <span className="stat-label">GPA</span>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </motion.section>
  );
};

export default withPerformanceOptimization(Education);