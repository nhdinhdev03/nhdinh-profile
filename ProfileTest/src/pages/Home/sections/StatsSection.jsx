import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import './StatsSection.scss';

const StatsSection = () => {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.3,
  });

  const stats = [
    { number: 50, label: 'Projects Completed', suffix: '+' },
    { number: 3, label: 'Years Experience', suffix: '+' },
    { number: 25, label: 'Happy Clients', suffix: '+' },
    { number: 99, label: 'Success Rate', suffix: '%' },
  ];

  const AnimatedNumber = ({ targetNumber, suffix, inView }) => {
    const [currentNumber, setCurrentNumber] = useState(0);

    useEffect(() => {
      if (inView) {
        const duration = 2000; // 2 seconds
        const steps = 60;
        const increment = targetNumber / steps;
        let current = 0;
        
        const timer = setInterval(() => {
          current += increment;
          if (current >= targetNumber) {
            setCurrentNumber(targetNumber);
            clearInterval(timer);
          } else {
            setCurrentNumber(Math.floor(current));
          }
        }, duration / steps);

        return () => clearInterval(timer);
      }
    }, [targetNumber, inView]);

    return (
      <span>
        {currentNumber}
        {suffix}
      </span>
    );
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        delayChildren: 0.3,
        staggerChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { scale: 0.8, opacity: 0 },
    visible: {
      scale: 1,
      opacity: 1,
      transition: {
        duration: 0.5,
        ease: "easeOut",
      },
    },
  };

  return (
    <section className="stats-section section" ref={ref}>
      <div className="stats-bg">
        <div className="bg-pattern" />
        <div className="bg-overlay" />
      </div>

      <div className="container mx-auto px-4">
        <motion.div
          className="section-header"
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
        >
          <h2 className="section-title">Numbers That Speak</h2>
          <p className="section-description">
            A glimpse into my journey and achievements in the world of development.
          </p>
        </motion.div>

        <motion.div
          className="stats-grid"
          variants={containerVariants}
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
        >
          {stats.map((stat, index) => (
            <motion.div
              key={index}
              className="stat-card"
              variants={itemVariants}
              whileHover={{ 
                scale: 1.05,
                transition: { duration: 0.2 }
              }}
            >
              <div className="stat-content">
                <div className="stat-number">
                  <AnimatedNumber 
                    targetNumber={stat.number} 
                    suffix={stat.suffix}
                    inView={inView}
                  />
                </div>
                <div className="stat-label">{stat.label}</div>
              </div>
              
              <div className="stat-decoration">
                <div className="decoration-circle" />
                <div className="decoration-ring" />
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Call to Action */}
        <motion.div
          className="stats-cta"
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.8 }}
        >
          <h3 className="cta-title">Ready to Start Your Next Project?</h3>
          <p className="cta-description">
            Let's work together to bring your ideas to life with cutting-edge technology and creative solutions.
          </p>
          <motion.button
            className="cta-button"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            Get Started Today
          </motion.button>
        </motion.div>
      </div>
    </section>
  );
};

export default StatsSection;
