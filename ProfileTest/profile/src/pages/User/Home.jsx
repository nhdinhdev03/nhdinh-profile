import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { 
  faCode, 
  faServer, 
  faMobile, 
  faDatabase,
  faArrowRight,
  faDownload
} from '@fortawesome/free-solid-svg-icons';
import { faGithub, faLinkedin } from '@fortawesome/free-brands-svg-icons';

const Home = () => {
  const skills = [
    { icon: faCode, name: 'Frontend Development', desc: 'React, Vue.js, Angular' },
    { icon: faServer, name: 'Backend Development', desc: 'Node.js, Python, Java' },
    { icon: faMobile, name: 'Mobile Development', desc: 'React Native, Flutter' },
    { icon: faDatabase, name: 'Database', desc: 'MongoDB, PostgreSQL, MySQL' }
  ];

  const fadeInUp = {
    initial: { opacity: 0, y: 60 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.6 }
  };

  const staggerContainer = {
    animate: {
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  return (
    <div className="home">
      {/* Hero Section */}
      <section className="home__hero">
        <div className="hero__container">
          <div className="hero__content">
            {/* Text Content */}
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              className="hero__text"
            >
              <motion.h1 
                className="hero__title"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2, duration: 0.6 }}
              >
                Hi, I'm{' '}
                <span className="highlight">NH Dinh</span>
              </motion.h1>
              
              <motion.p 
                className="hero__subtitle"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4, duration: 0.6 }}
              >
                Full-Stack Developer & Digital Innovator
              </motion.p>
              
              <motion.p 
                className="hero__subtitle"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.6, duration: 0.6 }}
              >
                I create innovative digital solutions that combine beautiful design 
                with powerful functionality. Passionate about building scalable 
                applications that make a difference.
              </motion.p>

              {/* CTA Buttons */}
              <motion.div 
                className="flex flex-col sm:flex-row gap-4 pt-6"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.8, duration: 0.6 }}
              >
                <Link
                  to="/projects"
                  className="inline-flex items-center px-6 py-3 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 transition-colors duration-200"
                >
                  View My Work
                  <FontAwesomeIcon icon={faArrowRight} className="ml-2 w-4 h-4" />
                </Link>
                <a
                  href="/resume.pdf"
                  download
                  className="inline-flex items-center px-6 py-3 border-2 border-blue-600 text-blue-600 font-medium rounded-lg hover:bg-blue-600 hover:text-white transition-colors duration-200"
                >
                  Download CV
                  <FontAwesomeIcon icon={faDownload} className="ml-2 w-4 h-4" />
                </a>
              </motion.div>

              {/* Social Links */}
              <motion.div 
                className="flex space-x-4 pt-4"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1, duration: 0.6 }}
              >
                <a
                  href="https://github.com/nhdinhdev03"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-12 h-12 bg-gray-900 text-white rounded-full flex items-center justify-center hover:bg-gray-700 transition-colors duration-200"
                >
                  <FontAwesomeIcon icon={faGithub} className="w-6 h-6" />
                </a>
                <a
                  href="https://linkedin.com/in/nhdinh"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-12 h-12 bg-blue-600 text-white rounded-full flex items-center justify-center hover:bg-blue-700 transition-colors duration-200"
                >
                  <FontAwesomeIcon icon={faLinkedin} className="w-6 h-6" />
                </a>
              </motion.div>
            </motion.div>

            {/* Profile Image */}
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.3 }}
              className="flex justify-center lg:justify-end"
            >
              <div className="relative">
                <div className="w-80 h-80 bg-gradient-to-br from-blue-400 to-purple-500 rounded-full p-2">
                  <div className="w-full h-full bg-gray-200 rounded-full overflow-hidden">
                    <img
                      src="/api/placeholder/300/300"
                      alt="NH Dinh"
                      className="w-full h-full object-cover"
                    />
                  </div>
                </div>
                {/* Floating elements */}
                <motion.div
                  animate={{ y: [0, -10, 0] }}
                  transition={{ duration: 2, repeat: Infinity }}
                  className="absolute -top-4 -right-4 w-16 h-16 bg-blue-500 rounded-full flex items-center justify-center text-white shadow-lg"
                >
                  <FontAwesomeIcon icon={faCode} className="w-8 h-8" />
                </motion.div>
                <motion.div
                  animate={{ y: [0, 10, 0] }}
                  transition={{ duration: 2, repeat: Infinity, delay: 0.5 }}
                  className="absolute -bottom-4 -left-4 w-12 h-12 bg-purple-500 rounded-full flex items-center justify-center text-white shadow-lg"
                >
                  <FontAwesomeIcon icon={faServer} className="w-6 h-6" />
                </motion.div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Skills Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            {...fadeInUp}
            className="text-center mb-16"
          >
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
              What I Do
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              I specialize in full-stack development with expertise across 
              modern technologies and frameworks.
            </p>
          </motion.div>

          <motion.div
            variants={staggerContainer}
            initial="initial"
            whileInView="animate"
            viewport={{ once: true }}
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8"
          >
            {skills.map((skill, index) => (
              <motion.div
                key={index}
                variants={fadeInUp}
                className="text-center group hover:transform hover:scale-105 transition-all duration-300"
              >
                <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:bg-blue-600 transition-colors duration-300">
                  <FontAwesomeIcon 
                    icon={skill.icon} 
                    className="w-8 h-8 text-blue-600 group-hover:text-white transition-colors duration-300" 
                  />
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">
                  {skill.name}
                </h3>
                <p className="text-gray-600 text-sm">
                  {skill.desc}
                </p>
              </motion.div>
            ))}
          </motion.div>
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
              Ready to Start Your Project?
            </h2>
            <p className="text-xl text-blue-100 max-w-2xl mx-auto">
              Let's work together to bring your ideas to life with cutting-edge technology.
            </p>
            <Link
              to="/contact"
              className="inline-flex items-center px-8 py-4 bg-white text-blue-600 font-semibold rounded-lg hover:bg-gray-100 transition-colors duration-200"
            >
              Get In Touch
              <FontAwesomeIcon icon={faArrowRight} className="ml-2 w-5 h-5" />
            </Link>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default Home;