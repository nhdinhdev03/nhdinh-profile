import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { 
  faExternalLinkAlt, 
  faCode,
  faFilter
} from '@fortawesome/free-solid-svg-icons';
import { faGithub } from '@fortawesome/free-brands-svg-icons';

const Projects = () => {
  const [activeFilter, setActiveFilter] = useState('all');

  const projects = [
    {
      id: 1,
      title: 'E-Commerce Platform',
      description: 'A full-stack e-commerce solution with React, Node.js, and MongoDB. Features include user authentication, payment integration, and admin dashboard.',
      image: '/api/placeholder/400/250',
      technologies: ['React', 'Node.js', 'MongoDB', 'Stripe'],
      category: 'fullstack',
      github: 'https://github.com/nhdinhdev03/ecommerce',
      live: 'https://ecommerce-demo.com',
      featured: true
    },
    {
      id: 2,
      title: 'Task Management App',
      description: 'A modern task management application with real-time updates, drag-and-drop functionality, and team collaboration features.',
      image: '/api/placeholder/400/250',
      technologies: ['React', 'Firebase', 'Material-UI'],
      category: 'frontend',
      github: 'https://github.com/nhdinhdev03/task-manager',
      live: 'https://taskmanager-demo.com',
      featured: true
    },
    {
      id: 3,
      title: 'Weather Dashboard',
      description: 'A responsive weather dashboard that displays current weather conditions and forecasts for multiple cities worldwide.',
      image: '/api/placeholder/400/250',
      technologies: ['Vue.js', 'API Integration', 'Chart.js'],
      category: 'frontend',
      github: 'https://github.com/nhdinhdev03/weather-dashboard',
      live: 'https://weather-dashboard-demo.com',
      featured: false
    },
    {
      id: 4,
      title: 'RESTful API Service',
      description: 'A scalable RESTful API built with Express.js and PostgreSQL, featuring JWT authentication and comprehensive documentation.',
      image: '/api/placeholder/400/250',
      technologies: ['Node.js', 'Express', 'PostgreSQL', 'JWT'],
      category: 'backend',
      github: 'https://github.com/nhdinhdev03/api-service',
      live: null,
      featured: false
    },
    {
      id: 5,
      title: 'Social Media Dashboard',
      description: 'A comprehensive social media management dashboard with analytics, post scheduling, and multi-platform integration.',
      image: '/api/placeholder/400/250',
      technologies: ['React', 'Python', 'Django', 'PostgreSQL'],
      category: 'fullstack',
      github: 'https://github.com/nhdinhdev03/social-dashboard',
      live: 'https://social-dashboard-demo.com',
      featured: true
    },
    {
      id: 6,
      title: 'Mobile Fitness App',
      description: 'A cross-platform mobile app for fitness tracking with workout plans, progress monitoring, and social features.',
      image: '/api/placeholder/400/250',
      technologies: ['React Native', 'Firebase', 'Redux'],
      category: 'mobile',
      github: 'https://github.com/nhdinhdev03/fitness-app',
      live: null,
      featured: false
    }
  ];

  const categories = [
    { key: 'all', label: 'All Projects' },
    { key: 'fullstack', label: 'Full Stack' },
    { key: 'frontend', label: 'Frontend' },
    { key: 'backend', label: 'Backend' },
    { key: 'mobile', label: 'Mobile' }
  ];

  const filteredProjects = activeFilter === 'all' 
    ? projects 
    : projects.filter(project => project.category === activeFilter);

  const fadeInUp = {
    initial: { opacity: 0, y: 60 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.6 }
  };

  return (
    <div className="pt-20">
      {/* Hero Section */}
      <section className="py-20 bg-gradient-to-br from-blue-50 to-indigo-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h1 className="text-4xl sm:text-5xl font-bold text-gray-900 mb-6">
              My <span className="text-blue-600">Projects</span>
            </h1>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              A collection of projects I've worked on, showcasing my skills in 
              full-stack development, frontend design, and mobile applications.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Filter Tabs */}
      <section className="py-8 bg-white border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="flex flex-wrap justify-center gap-4"
          >
            {categories.map((category) => (
              <button
                key={category.key}
                onClick={() => setActiveFilter(category.key)}
                className={`px-6 py-3 rounded-full font-medium transition-all duration-300 ${
                  activeFilter === category.key
                    ? 'bg-blue-600 text-white shadow-lg'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                {category.label}
              </button>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Projects Grid */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            layout
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
          >
            {filteredProjects.map((project, index) => (
              <motion.div
                key={project.id}
                layout
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className={`bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 ${
                  project.featured ? 'ring-2 ring-blue-500' : ''
                }`}
              >
                {project.featured && (
                  <div className="bg-blue-600 text-white text-xs font-semibold px-3 py-1 absolute top-4 left-4 rounded-full z-10">
                    Featured
                  </div>
                )}
                
                <div className="relative overflow-hidden">
                  <img
                    src={project.image}
                    alt={project.title}
                    className="w-full h-48 object-cover transition-transform duration-300 hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-black bg-opacity-40 opacity-0 hover:opacity-100 transition-opacity duration-300 flex items-center justify-center space-x-4">
                    {project.github && (
                      <a
                        href={project.github}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="w-10 h-10 bg-white rounded-full flex items-center justify-center text-gray-900 hover:bg-gray-100 transition-colors duration-200"
                      >
                        <FontAwesomeIcon icon={faGithub} className="w-5 h-5" />
                      </a>
                    )}
                    {project.live && (
                      <a
                        href={project.live}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="w-10 h-10 bg-blue-600 rounded-full flex items-center justify-center text-white hover:bg-blue-700 transition-colors duration-200"
                      >
                        <FontAwesomeIcon icon={faExternalLinkAlt} className="w-4 h-4" />
                      </a>
                    )}
                  </div>
                </div>

                <div className="p-6">
                  <h3 className="text-xl font-semibold text-gray-900 mb-3">
                    {project.title}
                  </h3>
                  <p className="text-gray-600 text-sm mb-4 leading-relaxed">
                    {project.description}
                  </p>
                  
                  <div className="flex flex-wrap gap-2 mb-4">
                    {project.technologies.map((tech, techIndex) => (
                      <span
                        key={techIndex}
                        className="px-3 py-1 bg-blue-100 text-blue-700 text-xs rounded-full"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>

                  <div className="flex justify-between items-center">
                    <div className="flex space-x-3">
                      {project.github && (
                        <a
                          href={project.github}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-gray-600 hover:text-gray-900 transition-colors duration-200"
                        >
                          <FontAwesomeIcon icon={faCode} className="w-4 h-4" />
                        </a>
                      )}
                      {project.live && (
                        <a
                          href={project.live}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-blue-600 hover:text-blue-700 transition-colors duration-200"
                        >
                          <FontAwesomeIcon icon={faExternalLinkAlt} className="w-4 h-4" />
                        </a>
                      )}
                    </div>
                    <span className="text-xs text-gray-400 capitalize">
                      {project.category}
                    </span>
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>

          {filteredProjects.length === 0 && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-center py-20"
            >
              <FontAwesomeIcon icon={faFilter} className="w-16 h-16 text-gray-300 mb-4" />
              <h3 className="text-xl font-semibold text-gray-600 mb-2">
                No projects found
              </h3>
              <p className="text-gray-500">
                Try selecting a different category to see more projects.
              </p>
            </motion.div>
          )}
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-blue-600 to-purple-600">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            {...fadeInUp}
            className="space-y-6"
          >
            <h2 className="text-3xl sm:text-4xl font-bold text-white">
              Have a Project in Mind?
            </h2>
            <p className="text-xl text-blue-100 max-w-2xl mx-auto">
              I'm always interested in new opportunities and exciting projects. 
              Let's discuss how we can work together.
            </p>
            <a
              href="/contact"
              className="inline-flex items-center px-8 py-4 bg-white text-blue-600 font-semibold rounded-lg hover:bg-gray-100 transition-colors duration-200"
            >
              Start a Project
              <FontAwesomeIcon icon={faExternalLinkAlt} className="ml-2 w-4 h-4" />
            </a>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default Projects;