import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import api from '../services/api';
import '../styles/Home.css';

const Home = () => {
  const [personalInfo, setPersonalInfo] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await api.getPersonalInfo();
        setPersonalInfo(response.data);
      } catch (error) {
        console.error('Error fetching personal info:', error);
      }
    };

    fetchData();
  }, []);

  return (
    <section className="home-section">
      <motion.div
        className="hero"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
      >
        <motion.h1
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
        >
          {personalInfo?.fullName || 'Welcome'}
        </motion.h1>
        <motion.h2
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
        >
          {personalInfo?.title || 'Software Developer'}
        </motion.h2>
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6 }}
          className="bio"
        >
          {personalInfo?.bio || 'Loading...'}
        </motion.p>
        <motion.div
          className="cta-buttons"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8 }}
        >
          <a href="#contact" className="button primary">Get in Touch</a>
          <a href={personalInfo?.resumeUrl} className="button secondary" target="_blank" rel="noopener noreferrer">
            View Resume
          </a>
        </motion.div>
      </motion.div>
    </section>
  );
};

export default Home;
