import React from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { 
  FiCode, 
  FiSmartphone, 
  FiLayers, 
  FiZap, 
  FiHeart, 
  FiTrendingUp 
} from 'react-icons/fi';
import './FeaturesSection.scss';

const FeaturesSection = () => {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  const features = [
    {
      icon: FiCode,
      title: 'Clean Code',
      description: 'Writing maintainable, scalable, and efficient code following best practices and modern standards.',
      color: '#3b82f6',
    },
    {
      icon: FiSmartphone,
      title: 'Responsive Design',
      description: 'Creating beautiful interfaces that work seamlessly across all devices and screen sizes.',
      color: '#6366f1',
    },
    {
      icon: FiLayers,
      title: 'Modern Stack',
      description: 'Utilizing cutting-edge technologies and frameworks to build future-proof applications.',
      color: '#8b5cf6',
    },
    {
      icon: FiZap,
      title: 'Performance',
      description: 'Optimizing applications for speed, efficiency, and excellent user experience.',
      color: '#f59e0b',
    },
    {
      icon: FiHeart,
      title: 'User-Centric',
      description: 'Focusing on user needs and creating intuitive, accessible, and delightful experiences.',
      color: '#ef4444',
    },
    {
      icon: FiTrendingUp,
      title: 'Growth Mindset',
      description: 'Continuously learning and adapting to new technologies and industry trends.',
      color: '#10b981',
    },
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        delayChildren: 0.3,
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.5,
      },
    },
  };

  return (
    <section className="features-section section" ref={ref}>
      <div className="container mx-auto px-4">
        <motion.div
          className="section-header"
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
        >
          <h2 className="section-title">What I Bring to the Table</h2>
          <p className="section-description">
            Combining technical expertise with creative problem-solving to deliver
            exceptional digital solutions.
          </p>
        </motion.div>

        <motion.div
          className="features-grid"
          variants={containerVariants}
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
        >
          {features.map((feature, index) => (
            <motion.div
              key={index}
              className="feature-card"
              variants={itemVariants}
              whileHover={{ 
                scale: 1.05,
                transition: { duration: 0.2 }
              }}
            >
              <div className="feature-content">
                <div 
                  className="feature-icon"
                  style={{ '--icon-color': feature.color }}
                >
                  <feature.icon size={32} />
                </div>
                
                <h3 className="feature-title">{feature.title}</h3>
                <p className="feature-description">{feature.description}</p>
              </div>
              
              <div 
                className="feature-decoration"
                style={{ '--decoration-color': feature.color }}
              />
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default FeaturesSection;
