import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { FiGithub, FiExternalLink, FiCode, FiSmartphone, FiGlobe } from 'react-icons/fi';
import './Projects.scss';

const Projects = () => {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  const [activeFilter, setActiveFilter] = useState('all');

  const projects = [
    {
      id: 1,
      title: 'E-Commerce Platform',
      description: 'A modern e-commerce platform built with React and Node.js',
      image: '/api/placeholder/400/300',
      technologies: ['React', 'Node.js', 'MongoDB', 'Stripe'],
      category: 'web',
      github: 'https://github.com',
      demo: 'https://demo.com',
    },
    {
      id: 2,
      title: 'Mobile Banking App',
      description: 'Secure mobile banking application with biometric authentication',
      image: '/api/placeholder/400/300',
      technologies: ['React Native', 'Firebase', 'Redux'],
      category: 'mobile',
      github: 'https://github.com',
      demo: 'https://demo.com',
    },
    {
      id: 3,
      title: 'Portfolio Website',
      description: 'Personal portfolio website with modern design and animations',
      image: '/api/placeholder/400/300',
      technologies: ['React', 'SCSS', 'Framer Motion'],
      category: 'web',
      github: 'https://github.com',
      demo: 'https://demo.com',
    },
    {
      id: 4,
      title: 'Task Management Tool',
      description: 'Collaborative task management tool for teams',
      image: '/api/placeholder/400/300',
      technologies: ['Vue.js', 'Express', 'PostgreSQL'],
      category: 'web',
      github: 'https://github.com',
      demo: 'https://demo.com',
    },
  ];

  const categories = [
    { key: 'all', label: 'All Projects', icon: FiCode },
    { key: 'web', label: 'Web Apps', icon: FiGlobe },
    { key: 'mobile', label: 'Mobile Apps', icon: FiSmartphone },
  ];

  const filteredProjects = activeFilter === 'all' 
    ? projects 
    : projects.filter(project => project.category === activeFilter);

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
    <div className="projects-page" ref={ref}>
      {/* Hero Section */}
      <section className="projects-hero">
        <div className="container mx-auto px-4">
          <motion.div
            className="hero-content"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <h1 className="hero-title">My Projects</h1>
            <p className="hero-subtitle">
              A showcase of my recent work and creative solutions
            </p>
          </motion.div>
        </div>
      </section>

      {/* Projects Section */}
      <section className="projects-content section">
        <div className="container mx-auto px-4">
          {/* Filter Buttons */}
          <motion.div
            className="filter-buttons"
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6 }}
          >
            {categories.map((category) => (
              <button
                key={category.key}
                className={`filter-btn ${activeFilter === category.key ? 'active' : ''}`}
                onClick={() => setActiveFilter(category.key)}
              >
                <category.icon className="filter-icon" />
                <span>{category.label}</span>
              </button>
            ))}
          </motion.div>

          {/* Projects Grid */}
          <motion.div
            className="projects-grid"
            variants={containerVariants}
            initial="hidden"
            animate={inView ? "visible" : "hidden"}
          >
            {filteredProjects.map((project) => (
              <motion.div
                key={project.id}
                className="project-card"
                variants={itemVariants}
                layout
                whileHover={{ y: -10 }}
              >
                <div className="project-image">
                  <div className="image-placeholder">
                    <span>Project Image</span>
                  </div>
                  <div className="project-overlay">
                    <div className="overlay-buttons">
                      <a
                        href={project.github}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="overlay-btn"
                      >
                        <FiGithub size={20} />
                      </a>
                      <a
                        href={project.demo}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="overlay-btn"
                      >
                        <FiExternalLink size={20} />
                      </a>
                    </div>
                  </div>
                </div>

                <div className="project-content">
                  <h3 className="project-title">{project.title}</h3>
                  <p className="project-description">{project.description}</p>
                  
                  <div className="project-technologies">
                    {project.technologies.map((tech, index) => (
                      <span key={index} className="tech-tag">
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default Projects;
