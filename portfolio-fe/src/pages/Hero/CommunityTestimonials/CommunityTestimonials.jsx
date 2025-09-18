import { motion } from "framer-motion";
import { memo, useMemo } from "react";
import { useTranslation } from "react-i18next";
import { FiHeart, FiStar, FiUsers } from "react-icons/fi";

import "./CommunityTestimonials.scss";

const CommunityTestimonials = memo(() => {
  const { t } = useTranslation();
  
  // Memoize testimonials data để tối ưu performance
  const testimonials = useMemo(() => [
    {
      id: 1,
      name: "Sarah Chen",
      role: "Lead Developer at TechCorp",
      avatar: "https://images.unsplash.com/photo-1494790108755-2616b612b14c?w=150&h=150&fit=crop&crop=face",
      content: "Outstanding developer! Delivered high-quality code and exceeded expectations. Highly recommended!",
      rating: 5,
      company: "TechCorp"
    },
    {
      id: 2,
      name: "Michael Rodriguez",
      role: "Product Manager",
      avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face",
      content: "Incredible attention to detail and problem-solving skills. Made our project a huge success!",
      rating: 5,
      company: "StartupXYZ"
    },
    {
      id: 3,
      name: "Emily Johnson",
      role: "CTO at InnovateLab",
      avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop&crop=face",
      content: "Professional, efficient, and creative. The best developer we've worked with!",
      rating: 5,
      company: "InnovateLab"
    },
    {
      id: 4,
      name: "David Kim",
      role: "Senior Engineer",
      avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face",
      content: "Clean code, great communication, and always meets deadlines. A pleasure to work with!",
      rating: 5,
      company: "DevStudio"
    },
    {
      id: 5,
      name: "Lisa Wang",
      role: "UI/UX Designer",
      avatar: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=150&h=150&fit=crop&crop=face",
      content: "Brilliant developer who understands both technical and design aspects perfectly!",
      rating: 5,
      company: "DesignCo"
    },
    {
      id: 6,
      name: "Alex Thompson",
      role: "Startup Founder",
      avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&h=150&fit=crop&crop=face",
      content: "Transformed our ideas into reality with exceptional skill and creativity!",
      rating: 5,
      company: "NextGen Solutions"
    }
  ], []);

  // Memoize animation variants
  const containerVariants = useMemo(() => ({
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        delayChildren: 0.2,
        staggerChildren: 0.1
      }
    }
  }), []);

  const itemVariants = useMemo(() => ({
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.6,
        ease: "easeOut"
      }
    }
  }), []);

  const cardVariants = useMemo(() => ({
    hidden: { 
      scale: 0.9, 
      opacity: 0,
      rotateY: -15
    },
    visible: {
      scale: 1,
      opacity: 1,
      rotateY: 0,
      transition: {
        duration: 0.8,
        ease: "easeOut"
      }
    },
    hover: {
      scale: 1.05,
      rotateY: 5,
      z: 50,
      transition: {
        duration: 0.3,
        ease: "easeOut"
      }
    }
  }), []);

  return (
    <motion.section 
      className="community-testimonials"
      variants={containerVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.3 }}
    >
      <div className="community-testimonials__container">
        <motion.div 
          className="community-testimonials__header"
          variants={itemVariants}
        >
          <motion.div
            className="community-testimonials__badge"
            whileHover={{ scale: 1.1, rotate: [0, -5, 5, 0] }}
            transition={{ duration: 0.5 }}
          >
            <FiHeart className="community-testimonials__badge-icon" />
            <span>{t('testimonials.subtitle')}</span>
          </motion.div>
          
          <motion.h2 
            className="community-testimonials__title"
            variants={itemVariants}
          >
            {t('testimonials.title')}
          </motion.h2>
          
          <motion.p 
            className="community-testimonials__subtitle"
            variants={itemVariants}
          >
            {t('testimonials.description')}
          </motion.p>         
          
           <motion.div 
            className="community-testimonials__stats"
            variants={itemVariants}
          >
            <div className="community-testimonials__stat">
              <FiUsers className="stat-icon" />
              <span className="stat-number">50+</span>
              <span className="stat-label">Happy Clients</span>
            </div>
            <div className="community-testimonials__stat">
              <FiStar className="stat-icon" />
              <span className="stat-number">5.0</span>
              <span className="stat-label">Average Rating</span>
            </div>
            <div className="community-testimonials__stat">
              <FiHeart className="stat-icon" />
              <span className="stat-number">100%</span>
              <span className="stat-label">Satisfaction</span>
            </div>
          </motion.div>
        </motion.div>

        <motion.div 
          className="community-testimonials__grid"
          variants={itemVariants}
        >
          {testimonials.map((testimonial, index) => (
            <motion.div
              key={testimonial.id}
              className="community-testimonials__card"
              variants={cardVariants}
              whileHover="hover"
              style={{ 
                transformStyle: "preserve-3d",
                perspective: "1000px"
              }}
              custom={index}
            >
              <div className="community-testimonials__card-inner">
                <div className="community-testimonials__card-header">
                  <motion.img
                    src={testimonial.avatar}
                    alt={testimonial.name}
                    className="community-testimonials__avatar"
                    whileHover={{ scale: 1.1 }}
                    transition={{ duration: 0.3 }}
                  />
                  <div className="community-testimonials__user-info">
                    <h4 className="community-testimonials__name">
                      {testimonial.name}
                    </h4>
                    <p className="community-testimonials__role">
                      {testimonial.role}
                    </p>
                    <p className="community-testimonials__company">
                      {testimonial.company}
                    </p>
                  </div>
                </div>

                <div className="community-testimonials__rating">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <motion.div
                      key={i}
                      initial={{ opacity: 0, scale: 0 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ 
                        delay: index * 0.1 + i * 0.1,
                        duration: 0.3 
                      }}
                    >
                      <FiStar className="star-icon filled" />
                    </motion.div>
                  ))}
                </div>

                <motion.p 
                  className="community-testimonials__content"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: index * 0.1 + 0.3 }}
                >
                  "{testimonial.content}"
                </motion.p>
              </div>
            </motion.div>
          ))}
        </motion.div>

        <motion.div 
          className="community-testimonials__footer"
          variants={itemVariants}
        >
          <motion.p
            className="community-testimonials__cta"
            whileHover={{ scale: 1.05 }}
          >
            {t('testimonials.join_community')}
          </motion.p>
        </motion.div>
      </div>
    </motion.section>
  );
});

CommunityTestimonials.displayName = 'CommunityTestimonials';

export default CommunityTestimonials;