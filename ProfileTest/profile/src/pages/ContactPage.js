import React from 'react';
import { motion } from 'framer-motion';
import Contact from '../components/sections/Contact';
import SEO from '../components/SEO/SEO';
import SectionWrapper from '../components/UI/SectionWrapper';

const pageVariants = {
  initial: {
    opacity: 0,
    x: 100,
    rotateX: -15
  },
  in: {
    opacity: 1,
    x: 0,
    rotateX: 0
  },
  out: {
    opacity: 0,
    x: -100,
    rotateX: 15
  }
};

const pageTransition = {
  type: "spring",
  stiffness: 260,
  damping: 20,
  duration: 0.6
};

const ContactPage = () => {
  return (
    <>
      <SEO 
        title="Contact"
        description="Get in touch with NHDINH for web development projects, collaborations, or professional inquiries. Let's create something amazing together!"
        keywords="contact, hire developer, web development services, collaboration, freelance, NHDINH"
        url="/contact"
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
          <Contact />
        </motion.div>
      </SectionWrapper>
    </>
  );
};

export default ContactPage;
