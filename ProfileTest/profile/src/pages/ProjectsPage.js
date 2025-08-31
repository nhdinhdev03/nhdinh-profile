import React from 'react';
import { motion } from 'framer-motion';
import Projects from '../components/sections/Projects';
import SEO from '../components/SEO/SEO';
import SectionWrapper from '../components/UI/SectionWrapper';

const pageVariants = {
  initial: {
    opacity: 0,
    rotateY: -15,
    scale: 0.98
  },
  in: {
    opacity: 1,
    rotateY: 0,
    scale: 1
  },
  out: {
    opacity: 0,
    rotateY: 15,
    scale: 0.98
  }
};

const pageTransition = {
  type: "tween",
  ease: "anticipate",
  duration: 0.7
};

const ProjectsPage = () => {
  return (
    <>
      <SEO 
        title="Projects"
        description="Explore NHDINH's portfolio of innovative web development projects featuring modern technologies, creative solutions, and exceptional user experiences."
        keywords="projects, portfolio, web development, React projects, Node.js, JavaScript applications, NHDINH"
        url="/projects"
      />
      <SectionWrapper className="pt-36 bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
        <motion.div
          initial="initial"
          animate="in"
          exit="out"
          variants={pageVariants}
          transition={pageTransition}
          style={{ perspective: 1000 }}
        >
          <Projects />
        </motion.div>
      </SectionWrapper>
    </>
  );
};

export default ProjectsPage;
