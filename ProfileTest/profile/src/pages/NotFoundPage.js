import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHome, faRocket, faExclamationTriangle } from '@fortawesome/free-solid-svg-icons';
import SEO from '../components/SEO/SEO';

const NotFoundPage = () => {
  const containerVariants = {
    initial: { opacity: 0, scale: 0.9 },
    animate: { 
      opacity: 1, 
      scale: 1,
      transition: {
        duration: 0.6,
        ease: "easeOut",
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    initial: { opacity: 0, y: 20 },
    animate: { 
      opacity: 1, 
      y: 0,
      transition: { duration: 0.5, ease: "easeOut" }
    }
  };

  return (
    <>
      <SEO 
        title="Page Not Found"
        description="The page you're looking for doesn't exist. Return to NHDINH's portfolio homepage or contact for assistance."
        keywords="404, page not found, error, NHDINH"
      />
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 px-4 pt-20">
      <motion.div
        variants={containerVariants}
        initial="initial"
        animate="animate"
        className="text-center max-w-2xl mx-auto"
      >
        {/* 404 Animation */}
        <motion.div
          variants={itemVariants}
          className="mb-8"
        >
          <motion.div
            animate={{ 
              rotate: [0, 10, -10, 0],
              scale: [1, 1.05, 1]
            }}
            transition={{ 
              duration: 2,
              repeat: Infinity,
              ease: "easeInOut"
            }}
            className="text-8xl md:text-9xl font-bold bg-gradient-to-r from-red-500 via-yellow-500 to-red-500 bg-clip-text text-transparent mb-4"
          >
            404
          </motion.div>
          
          <motion.div
            animate={{ y: [0, -10, 0] }}
            transition={{ 
              duration: 2,
              repeat: Infinity,
              ease: "easeInOut"
            }}
            className="text-6xl mb-6"
          >
            🚀
          </motion.div>
        </motion.div>

        {/* Error Message */}
        <motion.div variants={itemVariants} className="mb-8">
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
            Oops! Page Not Found
          </h1>
          <p className="text-xl text-gray-300 mb-2">
            Looks like this page went on a space mission and got lost!
          </p>
          <p className="text-gray-400">
            Don't worry, let's get you back to the right orbit.
          </p>
        </motion.div>

        {/* Action Buttons */}
        <motion.div 
          variants={itemVariants}
          className="flex flex-col sm:flex-row gap-4 justify-center items-center"
        >
          <Link to="/">
            <motion.button
              whileHover={{ scale: 1.05, y: -2 }}
              whileTap={{ scale: 0.95 }}
              className="bg-gradient-to-r from-blue-500 via-purple-600 to-pink-500 text-white font-semibold px-8 py-4 rounded-xl hover:shadow-lg hover:shadow-purple-500/25 transition-all duration-300 flex items-center space-x-3"
            >
              <FontAwesomeIcon icon={faHome} className="text-lg" />
              <span>Return Home</span>
            </motion.button>
          </Link>

          <Link to="/contact">
            <motion.button
              whileHover={{ scale: 1.05, y: -2 }}
              whileTap={{ scale: 0.95 }}
              className="bg-white/10 backdrop-blur-sm text-white font-semibold px-8 py-4 rounded-xl border border-white/20 hover:bg-white/20 transition-all duration-300 flex items-center space-x-3"
            >
              <FontAwesomeIcon icon={faRocket} className="text-lg" />
              <span>Contact Me</span>
            </motion.button>
          </Link>
        </motion.div>

        {/* Floating Elements */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          {[...Array(8)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute w-1 h-1 bg-white rounded-full opacity-20"
              animate={{
                x: [0, Math.random() * 800 - 400],
                y: [0, Math.random() * 600 - 300],
                scale: [0, 1, 0],
                opacity: [0, 0.5, 0]
              }}
              transition={{
                duration: 4 + Math.random() * 3,
                repeat: Infinity,
                delay: Math.random() * 3,
                ease: "easeInOut"
              }}
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
              }}
            />
          ))}
        </div>
      </motion.div>
    </div>
    </>
  );
};

export default NotFoundPage;
