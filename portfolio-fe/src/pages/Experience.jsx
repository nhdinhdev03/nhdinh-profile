import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import api from '../services/api';
import '../styles/Experience.css';

const Experience = () => {
  const [experiences, setExperiences] = useState([]);

  useEffect(() => {
    const fetchExperiences = async () => {
      try {
        const response = await api.getExperiences();
        setExperiences(response.data);
      } catch (error) {
        console.error('Error fetching experiences:', error);
      }
    };

    fetchExperiences();
  }, []);

  return (
    <section className="experience-section container">
      <motion.h1
        className="section-title"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        Work Experience
      </motion.h1>

      <motion.div
        className="timeline"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5, delay: 0.2 }}
      >
        {experiences.map((exp, index) => (
          <motion.div
            key={exp.id}
            className="timeline-item"
            initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
          >
            <div className="timeline-content">
              <div className="experience-date">
                {new Date(exp.startDate).toLocaleDateString('en-US', { 
                  month: 'long',
                  year: 'numeric'
                })}
                {' - '}
                {exp.current ? 'Present' : new Date(exp.endDate).toLocaleDateString('en-US', {
                  month: 'long',
                  year: 'numeric'
                })}
              </div>
              <h3 className="experience-title">{exp.position}</h3>
              <h4 className="experience-company">
                <a href={exp.companyUrl} target="_blank" rel="noopener noreferrer">
                  {exp.company}
                </a>
                {exp.location && <span className="experience-location"> · {exp.location}</span>}
              </h4>
              <p className="experience-description">{exp.description}</p>
            </div>
          </motion.div>
        ))}
      </motion.div>
    </section>
  );
};

export default Experience;
