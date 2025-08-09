import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import api from '../services/api';
import '../styles/About.css';

const About = () => {
  const [personalInfo, setPersonalInfo] = useState(null);
  const [skills, setSkills] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [infoResponse, skillsResponse] = await Promise.all([
          api.getPersonalInfo(),
          api.getSkills()
        ]);
        setPersonalInfo(infoResponse.data);
        setSkills(skillsResponse.data);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);

  return (
    <section className="about-section container">
      <motion.h1
        className="section-title"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        About Me
      </motion.h1>

      <div className="about-content">
        <motion.div
          className="about-text"
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <p>{personalInfo?.bio}</p>
          <div className="social-links">
            {personalInfo?.githubUrl && (
              <a href={personalInfo.githubUrl} target="_blank" rel="noopener noreferrer">
                GitHub
              </a>
            )}
            {personalInfo?.linkedinUrl && (
              <a href={personalInfo.linkedinUrl} target="_blank" rel="noopener noreferrer">
                LinkedIn
              </a>
            )}
          </div>
        </motion.div>

        <motion.div
          className="skills-section"
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
        >
          <h2>Skills</h2>
          <div className="skills-grid">
            {skills.map((skill) => (
              <motion.div
                key={skill.id}
                className="skill-card"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                {skill.iconUrl && <img src={skill.iconUrl} alt={skill.name} />}
                <h3>{skill.name}</h3>
                <div className="skill-level">
                  <div 
                    className="skill-progress"
                    style={{ width: `${skill.proficiency}%` }}
                  />
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default About;
