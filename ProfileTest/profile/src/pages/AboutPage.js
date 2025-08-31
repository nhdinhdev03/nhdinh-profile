import React from 'react';
import { motion } from 'framer-motion';
import About from '../components/sections/About';
import SEO from '../components/SEO/SEO';
import SectionWrapper from '../components/UI/SectionWrapper';

const pageVariants = {
  initial: {
    opacity: 0,
    y: 30,
    scale: 0.98
  },
  in: {
    opacity: 1,
    y: 0,
    scale: 1
  },
  out: {
    opacity: 0,
    y: -30,
    scale: 0.98
  }
};

const pageTransition = {
  type: "tween",
  ease: "anticipate",
  duration: 0.6
};

const AboutPage = () => {
  return (
    <>
      <SEO 
        title="About Me"
        description="Learn more about NHDINH - Passionate Full-Stack Developer with expertise in modern web technologies, creative problem-solving, and building exceptional digital experiences."
        keywords="about, biography, skills, experience, full-stack developer, web developer, NHDINH"
        url="/about"
      />
      <SectionWrapper className="pt-36 bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
        <motion.div
          initial="initial"
          animate="in"
          exit="out"
          variants={pageVariants}
          transition={pageTransition}
        >
          <About />
        </motion.div>
      </SectionWrapper>
    </>
  );
};

export default AboutPage;
