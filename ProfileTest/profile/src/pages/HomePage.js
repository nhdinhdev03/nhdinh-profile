import React from 'react';
import { motion } from 'framer-motion';
import Home from '../components/sections/Home';
import SEO from '../components/SEO/SEO';
import SectionWrapper from '../components/UI/SectionWrapper';

const pageVariants = {
  initial: {
    opacity: 0,
    x: -50,
    scale: 0.98
  },
  in: {
    opacity: 1,
    x: 0,
    scale: 1
  },
  out: {
    opacity: 0,
    x: 50,
    scale: 0.98
  }
};

const pageTransition = {
  type: "tween",
  ease: "anticipate",
  duration: 0.6
};

const HomePage = () => {
  return (
    <>
      <SEO 
        title="Home"
        description="Welcome to NHDINH's portfolio - Full-Stack Developer specializing in modern web technologies, React, Node.js, and innovative digital solutions."
        keywords="full-stack developer, web development, React, Node.js, JavaScript, portfolio, NHDINH"
        url="/"
      />
      <SectionWrapper>
        <motion.div
          initial="initial"
          animate="in"
          exit="out"
          variants={pageVariants}
          transition={pageTransition}
        >
          <Home />
        </motion.div>
      </SectionWrapper>
    </>
  );
};

export default HomePage;
