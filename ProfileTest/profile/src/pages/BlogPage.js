import React from 'react';
import { motion } from 'framer-motion';
import Blog from '../components/sections/Blog';
import SEO from '../components/SEO/SEO';
import SectionWrapper from '../components/UI/SectionWrapper';

const pageVariants = {
  initial: {
    opacity: 0,
    scale: 1.1,
    filter: "blur(10px)"
  },
  in: {
    opacity: 1,
    scale: 1,
    filter: "blur(0px)"
  },
  out: {
    opacity: 0,
    scale: 0.9,
    filter: "blur(10px)"
  }
};

const pageTransition = {
  type: "tween",
  ease: "anticipate",
  duration: 0.8
};

const BlogPage = () => {
  return (
    <>
      <SEO 
        title="Blog"
        description="Read NHDINH's latest articles and insights about web development, technology trends, programming tips, and industry best practices."
        keywords="blog, articles, web development, programming, technology, tutorials, tips, NHDINH"
        url="/blog"
      />
      <SectionWrapper className="pt-36 bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
        <motion.div
          initial="initial"
          animate="in"
          exit="out"
          variants={pageVariants}
          transition={pageTransition}
        >
          <Blog />
        </motion.div>
      </SectionWrapper>
    </>
  );
};

export default BlogPage;
