import React from 'react';
import { motion } from 'framer-motion';
import { 
  FiDatabase, 
  FiServer, 
  FiCloud,
  FiMonitor,
  FiBookOpen,
  FiAward,
  FiCalendar,
  FiMapPin
} from 'react-icons/fi';

function About() {
  const technologies = [
    {
      category: 'Frontend',
      icon: FiMonitor,
      skills: ['React', 'Next.js', 'Vue.js', 'TypeScript', 'Tailwind CSS', 'Framer Motion'],
      color: 'from-blue-500 to-cyan-500'
    },
    {
      category: 'Backend',
      icon: FiServer,
      skills: ['Node.js', 'Express', 'NestJS', 'Python', 'Django', 'Spring Boot'],
      color: 'from-green-500 to-emerald-500'
    },
    {
      category: 'Database',
      icon: FiDatabase,
      skills: ['PostgreSQL', 'MongoDB', 'Redis', 'MySQL', 'Prisma', 'TypeORM'],
      color: 'from-purple-500 to-pink-500'
    },
    {
      category: 'DevOps & Tools',
      icon: FiCloud,
      skills: ['Docker', 'AWS', 'CI/CD', 'Git', 'Linux', 'Kubernetes'],
      color: 'from-orange-500 to-red-500'
    }
  ];

  const experiences = [
    {
      title: 'Senior Full-Stack Developer',
      company: 'Tech Solutions Inc.',
      period: '2023 - Present',
      location: 'Ho Chi Minh City, VN',
      description: 'Leading development of enterprise web applications using React, Node.js, and cloud technologies.',
      achievements: [
        'Improved application performance by 40%',
        'Led a team of 5 developers',
        'Implemented microservices architecture'
      ]
    },
    {
      title: 'Full-Stack Developer',
      company: 'Digital Agency',
      period: '2022 - 2023',
      location: 'Remote',
      description: 'Developed responsive web applications and RESTful APIs for various clients.',
      achievements: [
        'Delivered 15+ successful projects',
        'Reduced load times by 60%',
        'Implemented automated testing'
      ]
    },
    {
      title: 'Frontend Developer',
      company: 'Startup Co.',
      period: '2021 - 2022',
      location: 'Ho Chi Minh City, VN',
      description: 'Built modern user interfaces and collaborated with design teams.',
      achievements: [
        'Developed component library',
        'Improved user engagement by 35%',
        'Mentored junior developers'
      ]
    }
  ];

  const education = [
    {
      degree: 'Bachelor of Computer Science',
      school: 'Ho Chi Minh City University of Technology',
      period: '2018 - 2022',
      gpa: '3.8/4.0',
      achievements: ['Magna Cum Laude', 'Dean\'s List', 'Outstanding Student Award']
    }
  ];

  const certifications = [
    { name: 'AWS Certified Solutions Architect', issuer: 'Amazon', year: '2023' },
    { name: 'Google Cloud Professional', issuer: 'Google', year: '2023' },
    { name: 'React Developer Certification', issuer: 'Meta', year: '2022' },
    { name: 'MongoDB Certified Developer', issuer: 'MongoDB', year: '2022' }
  ];

  return (
    <div className="min-h-screen pt-20">
      {/* Hero Section */}
      <section className="py-20 bg-gradient-to-br from-primary-50 via-white to-secondary-50 dark:from-neutral-950 dark:via-neutral-900 dark:to-neutral-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6">
              <span className="bg-gradient-to-r from-primary-600 to-secondary-600 bg-clip-text text-transparent">
                About Me
              </span>
            </h1>
            <p className="text-xl md:text-2xl text-neutral-600 dark:text-neutral-400 max-w-3xl mx-auto leading-relaxed">
              Passionate developer with a love for creating innovative solutions that make a difference
            </p>
          </motion.div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="space-y-6"
            >
              <div className="prose prose-lg dark:prose-invert">
                <p className="text-neutral-700 dark:text-neutral-300 leading-relaxed">
                  Hi there! I'm NH Dinh, a passionate full-stack developer with over 3 years of experience 
                  building modern web applications. I specialize in creating scalable, user-friendly solutions 
                  that solve real-world problems.
                </p>
                <p className="text-neutral-700 dark:text-neutral-300 leading-relaxed">
                  My journey in software development started during my university years, and since then, 
                  I've been constantly learning and adapting to new technologies. I believe in writing 
                  clean, maintainable code and following best practices.
                </p>
                <p className="text-neutral-700 dark:text-neutral-300 leading-relaxed">
                  When I'm not coding, you can find me exploring new technologies, contributing to open-source 
                  projects, or sharing knowledge with the developer community.
                </p>
              </div>

              <div className="flex flex-wrap gap-4">
                <div className="flex items-center space-x-2 text-neutral-600 dark:text-neutral-400">
                  <FiMapPin className="w-4 h-4 text-primary-500" />
                  <span>Ho Chi Minh City, Vietnam</span>
                </div>
                <div className="flex items-center space-x-2 text-neutral-600 dark:text-neutral-400">
                  <FiCalendar className="w-4 h-4 text-primary-500" />
                  <span>Available for freelance</span>
                </div>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="relative"
            >
              <div className="relative mx-auto w-80 h-80 rounded-3xl overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-br from-primary-500 to-secondary-500 rounded-3xl rotate-6" />
                <div className="relative bg-white dark:bg-neutral-900 rounded-3xl p-2 rotate-3 transform hover:rotate-0 transition-transform duration-300">
                  <img
                    src="/api/placeholder/300/300"
                    alt="NH Dinh"
                    className="w-full h-full object-cover rounded-2xl"
                  />
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Technologies Section */}
      <section className="py-20 bg-white dark:bg-neutral-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-neutral-900 dark:text-white mb-4">
              Technologies & Skills
            </h2>
            <p className="text-lg text-neutral-600 dark:text-neutral-400 max-w-2xl mx-auto">
              A comprehensive toolkit for building modern, scalable applications
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {technologies.map((tech, index) => (
              <motion.div
                key={tech.category}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="bg-gradient-to-br from-neutral-50 to-neutral-100 dark:from-neutral-800 dark:to-neutral-900 p-6 rounded-2xl border border-neutral-200 dark:border-neutral-700 hover:shadow-lg transition-shadow duration-300"
              >
                <div className={`w-12 h-12 bg-gradient-to-br ${tech.color} rounded-xl flex items-center justify-center text-white mb-4`}>
                  <tech.icon className="w-6 h-6" />
                </div>
                <h3 className="text-lg font-semibold text-neutral-900 dark:text-white mb-3">
                  {tech.category}
                </h3>
                <div className="space-y-2">
                  {tech.skills.map((skill) => (
                    <span
                      key={skill}
                      className="inline-block bg-white dark:bg-neutral-800 text-neutral-700 dark:text-neutral-300 px-3 py-1 rounded-lg text-sm font-medium mr-2 mb-2 border border-neutral-200 dark:border-neutral-700"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Experience Section */}
      <section className="py-20 bg-gradient-to-br from-neutral-50 to-neutral-100 dark:from-neutral-950 dark:to-neutral-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-neutral-900 dark:text-white mb-4">
              Work Experience
            </h2>
            <p className="text-lg text-neutral-600 dark:text-neutral-400">
              My professional journey and achievements
            </p>
          </motion.div>

          <div className="relative">
            {/* Timeline line */}
            <div className="absolute left-4 md:left-1/2 transform md:-translate-x-px top-0 bottom-0 w-0.5 bg-gradient-to-b from-primary-500 to-secondary-500" />

            <div className="space-y-12">
              {experiences.map((exp, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: index % 2 === 0 ? -20 : 20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.2 }}
                  className={`relative flex items-center ${
                    index % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'
                  }`}
                >
                  {/* Timeline dot */}
                  <div className="absolute left-4 md:left-1/2 transform -translate-x-1/2 w-4 h-4 bg-gradient-to-br from-primary-500 to-secondary-500 rounded-full border-4 border-white dark:border-neutral-900 z-10" />

                  <div className={`w-full md:w-5/12 ${index % 2 === 0 ? 'md:pr-8' : 'md:pl-8'} pl-12 md:pl-0`}>
                    <div className="bg-white dark:bg-neutral-800 p-6 rounded-2xl shadow-lg border border-neutral-200 dark:border-neutral-700">
                      <div className="flex items-start justify-between mb-4">
                        <div>
                          <h3 className="text-xl font-bold text-neutral-900 dark:text-white">
                            {exp.title}
                          </h3>
                          <p className="text-primary-600 dark:text-primary-400 font-semibold">
                            {exp.company}
                          </p>
                        </div>
                        <span className="text-sm text-neutral-500 dark:text-neutral-400 bg-neutral-100 dark:bg-neutral-700 px-3 py-1 rounded-lg">
                          {exp.period}
                        </span>
                      </div>
                      
                      <div className="flex items-center space-x-2 mb-3">
                        <FiMapPin className="w-4 h-4 text-neutral-400" />
                        <span className="text-sm text-neutral-600 dark:text-neutral-400">{exp.location}</span>
                      </div>

                      <p className="text-neutral-700 dark:text-neutral-300 mb-4">
                        {exp.description}
                      </p>

                      <div className="space-y-2">
                        {exp.achievements.map((achievement, i) => (
                          <div key={i} className="flex items-start space-x-2">
                            <div className="w-1.5 h-1.5 bg-primary-500 rounded-full mt-2 flex-shrink-0" />
                            <span className="text-sm text-neutral-600 dark:text-neutral-400">
                              {achievement}
                            </span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Education & Certifications */}
      <section className="py-20 bg-white dark:bg-neutral-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Education */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
            >
              <div className="flex items-center space-x-3 mb-8">
                <div className="w-12 h-12 bg-gradient-to-br from-primary-500 to-secondary-500 rounded-xl flex items-center justify-center text-white">
                  <FiBookOpen className="w-6 h-6" />
                </div>
                <h2 className="text-2xl md:text-3xl font-bold text-neutral-900 dark:text-white">
                  Education
                </h2>
              </div>

              {education.map((edu, index) => (
                <div key={index} className="bg-gradient-to-br from-neutral-50 to-neutral-100 dark:from-neutral-800 dark:to-neutral-900 p-6 rounded-2xl border border-neutral-200 dark:border-neutral-700">
                  <h3 className="text-xl font-bold text-neutral-900 dark:text-white mb-2">
                    {edu.degree}
                  </h3>
                  <p className="text-primary-600 dark:text-primary-400 font-semibold mb-1">
                    {edu.school}
                  </p>
                  <p className="text-neutral-600 dark:text-neutral-400 mb-3">
                    {edu.period} • GPA: {edu.gpa}
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {edu.achievements.map((achievement) => (
                      <span
                        key={achievement}
                        className="bg-primary-100 dark:bg-primary-900/30 text-primary-700 dark:text-primary-300 px-3 py-1 rounded-lg text-sm font-medium"
                      >
                        {achievement}
                      </span>
                    ))}
                  </div>
                </div>
              ))}
            </motion.div>

            {/* Certifications */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              <div className="flex items-center space-x-3 mb-8">
                <div className="w-12 h-12 bg-gradient-to-br from-secondary-500 to-accent-500 rounded-xl flex items-center justify-center text-white">
                  <FiAward className="w-6 h-6" />
                </div>
                <h2 className="text-2xl md:text-3xl font-bold text-neutral-900 dark:text-white">
                  Certifications
                </h2>
              </div>

              <div className="space-y-4">
                {certifications.map((cert, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 10 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.4, delay: index * 0.1 }}
                    className="bg-gradient-to-br from-neutral-50 to-neutral-100 dark:from-neutral-800 dark:to-neutral-900 p-4 rounded-xl border border-neutral-200 dark:border-neutral-700 hover:shadow-lg transition-shadow duration-300"
                  >
                    <div className="flex items-center justify-between">
                      <div>
                        <h3 className="font-semibold text-neutral-900 dark:text-white">
                          {cert.name}
                        </h3>
                        <p className="text-neutral-600 dark:text-neutral-400 text-sm">
                          {cert.issuer}
                        </p>
                      </div>
                      <span className="text-primary-600 dark:text-primary-400 font-semibold">
                        {cert.year}
                      </span>
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default About;