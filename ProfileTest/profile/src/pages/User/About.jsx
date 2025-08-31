import React from 'react';
import { motion } from 'framer-motion';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { 
  faGraduationCap, 
  faBriefcase, 
  faAward,
  faCode,
  faDatabase,
  faCloud,
  faMobile
} from '@fortawesome/free-solid-svg-icons';

const About = () => {
  const experience = [
    {
      title: 'Senior Full-Stack Developer',
      company: 'Tech Solutions Inc.',
      period: '2022 - Present',
      description: 'Leading development of enterprise web applications using React, Node.js, and cloud technologies.'
    },
    {
      title: 'Full-Stack Developer',
      company: 'Digital Agency Co.',
      period: '2020 - 2022',
      description: 'Developed responsive web applications and mobile apps for various clients using modern frameworks.'
    },
    {
      title: 'Frontend Developer',
      company: 'StartUp Hub',
      period: '2019 - 2020',
      description: 'Built user interfaces for web applications using React, Vue.js, and modern CSS frameworks.'
    }
  ];

  const education = [
    {
      degree: 'Bachelor of Computer Science',
      school: 'University of Technology',
      period: '2015 - 2019',
      description: 'Graduated with honors, specialized in Software Engineering and Web Development.'
    }
  ];

  const skills = [
    {
      category: 'Frontend',
      icon: faCode,
      items: ['React', 'Vue.js', 'Angular', 'TypeScript', 'Tailwind CSS', 'SASS']
    },
    {
      category: 'Backend',
      icon: faDatabase,
      items: ['Node.js', 'Express', 'Python', 'Django', 'Java', 'Spring Boot']
    },
    {
      category: 'Database',
      icon: faDatabase,
      items: ['MongoDB', 'PostgreSQL', 'MySQL', 'Redis', 'Firebase']
    },
    {
      category: 'Cloud & DevOps',
      icon: faCloud,
      items: ['AWS', 'Docker', 'Kubernetes', 'CI/CD', 'Git', 'Linux']
    },
    {
      category: 'Mobile',
      icon: faMobile,
      items: ['React Native', 'Flutter', 'iOS', 'Android']
    }
  ];

  const achievements = [
    'Led team of 5 developers in successful delivery of 10+ projects',
    'Optimized application performance resulting in 40% faster load times',
    'Implemented CI/CD pipeline reducing deployment time by 60%',
    'Mentored 3 junior developers helping them advance their careers'
  ];

  const fadeInUp = {
    initial: { opacity: 0, y: 60 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.6 }
  };

  return (
    <div className="pt-20">
      {/* Hero Section */}
      <section className="py-20 bg-gradient-to-br from-blue-50 to-indigo-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
            >
              <h1 className="text-4xl sm:text-5xl font-bold text-gray-900 mb-6">
                About <span className="text-blue-600">Me</span>
              </h1>
              <p className="text-lg text-gray-600 leading-relaxed mb-6">
                I'm a passionate full-stack developer with over 5 years of experience 
                creating innovative digital solutions. I love turning complex problems 
                into simple, beautiful, and intuitive solutions.
              </p>
              <p className="text-lg text-gray-600 leading-relaxed">
                When I'm not coding, you can find me exploring new technologies, 
                contributing to open-source projects, or sharing knowledge with the 
                developer community through blogs and tutorials.
              </p>
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="flex justify-center"
            >
              <div className="relative">
                <img
                  src="/api/placeholder/400/500"
                  alt="NH Dinh"
                  className="rounded-2xl shadow-2xl w-80 h-96 object-cover"
                />
                <div className="absolute inset-0 rounded-2xl bg-gradient-to-t from-blue-600/20 to-transparent"></div>
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
              Technical Skills
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              I work with a diverse set of technologies to create robust and scalable solutions.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {skills.map((skill, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="bg-gray-50 rounded-lg p-6 hover:shadow-lg transition-shadow duration-300"
              >
                <div className="flex items-center mb-4">
                  <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mr-4">
                    <FontAwesomeIcon icon={skill.icon} className="w-6 h-6 text-blue-600" />
                  </div>
                  <h3 className="text-xl font-semibold text-gray-900">{skill.category}</h3>
                </div>
                <div className="flex flex-wrap gap-2">
                  {skill.items.map((item, itemIndex) => (
                    <span
                      key={itemIndex}
                      className="px-3 py-1 bg-blue-100 text-blue-700 text-sm rounded-full"
                    >
                      {item}
                    </span>
                  ))}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Experience Section */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            {...fadeInUp}
            className="text-center mb-16"
          >
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
              Work Experience
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              My journey through various roles has shaped my expertise in full-stack development.
            </p>
          </motion.div>

          <div className="space-y-8">
            {experience.map((exp, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="bg-white rounded-lg p-6 shadow-md hover:shadow-lg transition-shadow duration-300"
              >
                <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-4">
                  <div>
                    <h3 className="text-xl font-semibold text-gray-900">{exp.title}</h3>
                    <p className="text-blue-600 font-medium">{exp.company}</p>
                  </div>
                  <span className="text-gray-500 text-sm mt-2 md:mt-0">{exp.period}</span>
                </div>
                <p className="text-gray-600">{exp.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Education Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            {...fadeInUp}
            className="text-center mb-16"
          >
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
              Education
            </h2>
          </motion.div>

          <div className="max-w-3xl mx-auto">
            {education.map((edu, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                viewport={{ once: true }}
                className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-lg p-8"
              >
                <div className="flex items-start">
                  <div className="w-12 h-12 bg-blue-600 rounded-lg flex items-center justify-center mr-6">
                    <FontAwesomeIcon icon={faGraduationCap} className="w-6 h-6 text-white" />
                  </div>
                  <div className="flex-1">
                    <h3 className="text-xl font-semibold text-gray-900 mb-2">{edu.degree}</h3>
                    <p className="text-blue-600 font-medium mb-2">{edu.school}</p>
                    <p className="text-gray-500 text-sm mb-3">{edu.period}</p>
                    <p className="text-gray-600">{edu.description}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Achievements Section */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            {...fadeInUp}
            className="text-center mb-16"
          >
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
              Key Achievements
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Some highlights from my professional journey.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {achievements.map((achievement, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="bg-white rounded-lg p-6 shadow-md hover:shadow-lg transition-shadow duration-300"
              >
                <div className="flex items-start">
                  <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center mr-4 mt-1">
                    <FontAwesomeIcon icon={faAward} className="w-4 h-4 text-green-600" />
                  </div>
                  <p className="text-gray-700 flex-1">{achievement}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default About;