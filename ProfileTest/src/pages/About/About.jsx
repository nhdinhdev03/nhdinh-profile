import React from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { 
  FiCode, 
  FiDownload, 
  FiAward,
  FiBookOpen,
  FiUsers,
  FiTarget
} from 'react-icons/fi';
import './About.scss';

const About = () => {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  const skills = [
    { name: 'JavaScript', level: 95 },
    { name: 'React', level: 90 },
    { name: 'Node.js', level: 85 },
    { name: 'TypeScript', level: 80 },
    { name: 'Python', level: 75 },
    { name: 'UI/UX Design', level: 70 },
  ];

  const experiences = [
    {
      title: 'Senior Frontend Developer',
      company: 'Tech Company',
      period: '2022 - Present',
      description: 'Leading frontend development for multiple high-traffic applications.',
      icon: FiCode,
    },
    {
      title: 'Full Stack Developer',
      company: 'Startup Inc.',
      period: '2020 - 2022',
      description: 'Built and maintained full-stack applications using modern technologies.',
      icon: FiTarget,
    },
    {
      title: 'Junior Developer',
      company: 'Digital Agency',
      period: '2019 - 2020',
      description: 'Developed responsive websites and web applications for various clients.',
      icon: FiBookOpen,
    },
  ];

  const achievements = [
    {
      icon: FiAward,
      title: 'Best Developer Award',
      description: 'Recognized for outstanding performance and innovation',
    },
    {
      icon: FiUsers,
      title: 'Team Leadership',
      description: 'Successfully led a team of 5 developers',
    },
    {
      icon: FiBookOpen,
      title: 'Continuous Learning',
      description: 'Completed 10+ professional certifications',
    },
  ];

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
    <div className="about-page" ref={ref}>
      {/* Hero Section */}
      <section className="about-hero">
        <div className="container mx-auto px-4">
          <motion.div
            className="hero-content"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <h1 className="hero-title">About Me</h1>
            <p className="hero-subtitle">
              Passionate developer with a love for creating innovative solutions
            </p>
          </motion.div>
        </div>
      </section>

      {/* About Content */}
      <section className="about-content section">
        <div className="container mx-auto px-4">
          <div className="content-grid">
            {/* Personal Info */}
            <motion.div
              className="personal-info"
              variants={containerVariants}
              initial="hidden"
              animate={inView ? "visible" : "hidden"}
            >
              <motion.div variants={itemVariants} className="info-card">
                <div className="profile-image">
                  <div className="image-placeholder">
                    <span>Your Photo</span>
                  </div>
                </div>
                
                <div className="info-content">
                  <h3 className="name">Your Name</h3>
                  <p className="role gradient-text">Full Stack Developer</p>
                  
                  <p className="bio">
                    I'm a passionate developer with 3+ years of experience in creating 
                    modern web applications. I love turning complex problems into simple, 
                    beautiful and intuitive solutions.
                  </p>
                  
                  <div className="info-details">
                    <div className="detail-item">
                      <span className="label">Location:</span>
                      <span className="value">Your City, Country</span>
                    </div>
                    <div className="detail-item">
                      <span className="label">Email:</span>
                      <span className="value">your.email@example.com</span>
                    </div>
                    <div className="detail-item">
                      <span className="label">Phone:</span>
                      <span className="value">+1 (555) 123-4567</span>
                    </div>
                  </div>
                  
                  <button className="download-cv-btn">
                    <FiDownload />
                    <span>Download CV</span>
                  </button>
                </div>
              </motion.div>
            </motion.div>

            {/* Skills */}
            <motion.div
              className="skills-section"
              variants={itemVariants}
              initial="hidden"
              animate={inView ? "visible" : "hidden"}
            >
              <h3 className="section-title">Skills & Expertise</h3>
              <div className="skills-grid">
                {skills.map((skill, index) => (
                  <motion.div
                    key={skill.name}
                    className="skill-item"
                    initial={{ opacity: 0, x: -20 }}
                    animate={inView ? { opacity: 1, x: 0 } : {}}
                    transition={{ delay: index * 0.1 }}
                  >
                    <div className="skill-header">
                      <span className="skill-name">{skill.name}</span>
                      <span className="skill-percentage">{skill.level}%</span>
                    </div>
                    <div className="skill-bar">
                      <motion.div
                        className="skill-progress"
                        initial={{ width: 0 }}
                        animate={inView ? { width: `${skill.level}%` } : {}}
                        transition={{ delay: index * 0.1 + 0.5, duration: 1 }}
                      />
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Experience */}
      <section className="experience-section section">
        <div className="container mx-auto px-4">
          <motion.div
            className="section-header"
            initial={{ opacity: 0, y: 30 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6 }}
          >
            <h2 className="section-title">Professional Experience</h2>
          </motion.div>

          <div className="timeline">
            {experiences.map((exp, index) => (
              <motion.div
                key={index}
                className="timeline-item"
                initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
                animate={inView ? { opacity: 1, x: 0 } : {}}
                transition={{ delay: index * 0.2 }}
              >
                <div className="timeline-icon">
                  <exp.icon size={24} />
                </div>
                <div className="timeline-content">
                  <h4 className="timeline-title">{exp.title}</h4>
                  <h5 className="timeline-company">{exp.company}</h5>
                  <span className="timeline-period">{exp.period}</span>
                  <p className="timeline-description">{exp.description}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Achievements */}
      <section className="achievements-section section">
        <div className="container mx-auto px-4">
          <motion.div
            className="section-header"
            initial={{ opacity: 0, y: 30 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6 }}
          >
            <h2 className="section-title">Achievements</h2>
          </motion.div>

          <motion.div
            className="achievements-grid"
            variants={containerVariants}
            initial="hidden"
            animate={inView ? "visible" : "hidden"}
          >
            {achievements.map((achievement, index) => (
              <motion.div
                key={index}
                className="achievement-card"
                variants={itemVariants}
                whileHover={{ scale: 1.05 }}
              >
                <div className="achievement-icon">
                  <achievement.icon size={32} />
                </div>
                <h4 className="achievement-title">{achievement.title}</h4>
                <p className="achievement-description">{achievement.description}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default About;
