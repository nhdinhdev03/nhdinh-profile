import { motion } from "framer-motion";
import { useDeviceCapability } from "hooks/useDeviceCapability";
import { memo, useCallback, useEffect, useMemo, useState } from "react";
import { useTranslation } from "react-i18next";
import {
  FiBriefcase,
  FiChevronLeft,
  FiChevronRight,
  FiMapPin,
  FiStar,
} from "react-icons/fi";
import { useInView } from "react-intersection-observer";

import "./CommunityTestimonials.scss";

const CommunityTestimonials = memo(() => {
  const { t } = useTranslation();
  const { isLowPerformance, isMobile } = useDeviceCapability();
  const [ref, inView] = useInView({ threshold: 0.1, triggerOnce: true });
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isAutoPlay, setIsAutoPlay] = useState(true);

  // Memoize testimonials data với structured data để SEO tốt hơn
  const testimonials = useMemo(
    () => [
      {
        id: 1,
        name: "Sarah Chen",
        role: "Lead Developer",
        avatar:
          "https://images.unsplash.com/photo-1494790108755-2616b612b14c?w=150&h=150&fit=crop&crop=face",
        content:
          "Outstanding developer! Delivered high-quality code and exceeded expectations. The attention to detail and problem-solving approach is exceptional.",
        rating: 5,
        company: "TechCorp",
        location: "San Francisco, CA",
        projectType: "E-commerce Platform",
        dateWorked: "2024",
        linkedIn: "https://linkedin.com/in/sarahchen",
      },
      {
        id: 2,
        name: "Michael Rodriguez",
        role: "Product Manager",
        avatar:
          "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face",
        content:
          "Incredible attention to detail and problem-solving skills. The technical expertise combined with business understanding made our project a huge success!",
        rating: 5,
        company: "StartupXYZ",
        location: "New York, NY",
        projectType: "SaaS Dashboard",
        dateWorked: "2024",
        linkedIn: "https://linkedin.com/in/michaelrodriguez",
      },
      {
        id: 3,
        name: "Emily Johnson",
        role: "Chief Technology Officer",
        avatar:
          "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop&crop=face",
        content:
          "Professional, efficient, and creative. The architectural decisions and code quality exceeded our expectations. Definitely the best developer we've worked with!",
        rating: 5,
        company: "InnovateLab",
        location: "Austin, TX",
        projectType: "AI-Powered Analytics",
        dateWorked: "2023-2024",
        linkedIn: "https://linkedin.com/in/emilyjohnson",
      },
      {
        id: 4,
        name: "David Kim",
        role: "Senior Engineer",
        avatar:
          "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face",
        content:
          "Clean code, great communication, and always meets deadlines. A pleasure to work with!",
        rating: 5,
        company: "DevStudio",
      },
      {
        id: 5,
        name: "Lisa Wang",
        role: "UI/UX Designer",
        avatar:
          "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=150&h=150&fit=crop&crop=face",
        content:
          "Brilliant developer who understands both technical and design aspects perfectly!",
        rating: 5,
        company: "DesignCo",
      },
      {
        id: 6,
        name: "Alex Thompson",
        role: "Startup Founder",
        avatar:
          "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&h=150&fit=crop&crop=face",
        content:
          "Transformed our ideas into reality with exceptional skill and creativity!",
        rating: 5,
        company: "NextGen Solutions",
      },
    ],
    []
  );

  // Memoize animation variants
  const containerVariants = useMemo(
    () => ({
      hidden: { opacity: 0 },
      visible: {
        opacity: 1,
        transition: {
          delayChildren: 0.2,
          staggerChildren: 0.1,
        },
      },
    }),
    []
  );

  const itemVariants = useMemo(
    () => ({
      hidden: { y: 20, opacity: 0 },
      visible: {
        y: 0,
        opacity: 1,
        transition: {
          duration: 0.6,
          ease: "easeOut",
        },
      },
    }),
    []
  );

  const cardVariants = useMemo(
    () => ({
      hidden: {
        scale: 0.9,
        opacity: 0,
        rotateY: -15,
      },
      visible: {
        scale: 1,
        opacity: 1,
        rotateY: 0,
        transition: {
          duration: 0.8,
          ease: "easeOut",
        },
      },
      hover: {
        scale: 1.05,
        rotateY: 5,
        z: 50,
        transition: {
          duration: 0.3,
          ease: "easeOut",
        },
      },
    }),
    []
  );

  // Auto-play functionality
  useEffect(() => {
    if (!isAutoPlay || !inView) return;

    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % testimonials.length);
    }, 5000);

    return () => clearInterval(interval);
  }, [isAutoPlay, inView, testimonials.length]);

  // Navigation handlers
  const handlePrevSlide = useCallback(() => {
    setCurrentSlide(
      (prev) => (prev - 1 + testimonials.length) % testimonials.length
    );
    setIsAutoPlay(false);
  }, [testimonials.length]);

  const handleNextSlide = useCallback(() => {
    setCurrentSlide((prev) => (prev + 1) % testimonials.length);
    setIsAutoPlay(false);
  }, [testimonials.length]);

  const handleDotClick = useCallback((index) => {
    setCurrentSlide(index);
    setIsAutoPlay(false);
  }, []);

  // Pause auto-play on hover
  const handleMouseEnter = useCallback(() => {
    setIsAutoPlay(false);
  }, []);

  const handleMouseLeave = useCallback(() => {
    setIsAutoPlay(true);
  }, []);

  // Get visible testimonials for current view
  const getVisibleTestimonials = useMemo(() => {
    const itemsPerView = isMobile ? 1 : 3;
    const visibleItems = [];

    for (let i = 0; i < itemsPerView; i++) {
      const index = (currentSlide + i) % testimonials.length;
      visibleItems.push(testimonials[index]);
    }

    return visibleItems;
  }, [currentSlide, testimonials, isMobile]);

  return (
    <motion.section
      ref={ref}
      className={`community-testimonials ${
        isLowPerformance ? "low-performance" : ""
      }`}
      variants={containerVariants}
      initial="hidden"
      animate={inView ? "visible" : "hidden"}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      aria-label={t("testimonials.title")}
      role="region"
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
          ></motion.div>

          <motion.h2
            className="community-testimonials__title"
            variants={itemVariants}
          >
            {t("testimonials.title")}
          </motion.h2>

          <motion.p
            className="community-testimonials__subtitle"
            variants={itemVariants}
          >
            {t("testimonials.description")}
          </motion.p>
        </motion.div>

        {/* Navigation Controls */}
        <motion.div
          className="community-testimonials__navigation"
          variants={itemVariants}
        >
          <button
            className="community-testimonials__nav-btn community-testimonials__nav-btn--prev"
            onClick={handlePrevSlide}
            aria-label={t("common.previous")}
            disabled={isLowPerformance}
          >
            <FiChevronLeft />
          </button>

          <div className="community-testimonials__dots">
            {testimonials.map((_, index) => (
              <button
                key={index}
                className={`community-testimonials__dot ${
                  index === currentSlide ? "active" : ""
                }`}
                onClick={() => handleDotClick(index)}
                aria-label={`${t("testimonials.slide")} ${index + 1}`}
              />
            ))}
          </div>

          <button
            className="community-testimonials__nav-btn community-testimonials__nav-btn--next"
            onClick={handleNextSlide}
            aria-label={t("common.next")}
            disabled={isLowPerformance}
          >
            <FiChevronRight />
          </button>
        </motion.div>

        <motion.div
          className="community-testimonials__grid"
          variants={itemVariants}
          key={currentSlide} // Force re-render on slide change
        >
          {getVisibleTestimonials.map((testimonial, index) => (
            <motion.div
              key={testimonial.id}
              className="community-testimonials__card"
              variants={cardVariants}
              whileHover="hover"
              style={{
                transformStyle: "preserve-3d",
                perspective: "1000px",
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
                      <FiBriefcase className="community-testimonials__role-icon" />
                      {testimonial.role}
                    </p>
                    <p className="community-testimonials__company">
                      {testimonial.company}
                    </p>
                    {testimonial.location && (
                      <p className="community-testimonials__location">
                        <FiMapPin className="community-testimonials__location-icon" />
                        {testimonial.location}
                      </p>
                    )}
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
                        duration: 0.3,
                      }}
                    >
                      <FiStar className="star-icon filled" />
                    </motion.div>
                  ))}
                </div>

                <motion.div className="community-testimonials__body">
                  <motion.p
                    className="community-testimonials__content"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: index * 0.1 + 0.3 }}
                  >
                    "{testimonial.content}"
                  </motion.p>

                  {testimonial.projectType && (
                    <div className="community-testimonials__project-info">
                      <span className="community-testimonials__project-label">
                        {t("testimonials.project")}:
                      </span>
                      <span className="community-testimonials__project-type">
                        {testimonial.projectType}
                      </span>
                      <span className="community-testimonials__date">
                        ({testimonial.dateWorked})
                      </span>
                    </div>
                  )}
                </motion.div>
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
            {t("testimonials.join_community")}
          </motion.p>

          <div className="community-testimonials__stats">
            <div className="community-testimonials__stat">
              <span className="community-testimonials__stat-number">
                {testimonials.length}+
              </span>
              <span className="community-testimonials__stat-label">
                {t("testimonials.satisfied_clients")}
              </span>
            </div>
            <div className="community-testimonials__stat">
              <span className="community-testimonials__stat-number">5.0</span>
              <span className="community-testimonials__stat-label">
                {t("testimonials.average_rating")}
              </span>
            </div>
            <div className="community-testimonials__stat">
              <span className="community-testimonials__stat-number">100%</span>
              <span className="community-testimonials__stat-label">
                {t("testimonials.satisfaction_rate")}
              </span>
            </div>
          </div>
        </motion.div>
      </div>

      {/* Structured Data for SEO */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Person",
            name: "Nguyen Hoang Dinh",
            review: testimonials.map((testimonial) => ({
              "@type": "Review",
              author: {
                "@type": "Person",
                name: testimonial.name,
                jobTitle: testimonial.role,
                worksFor: {
                  "@type": "Organization",
                  name: testimonial.company,
                },
              },
              reviewRating: {
                "@type": "Rating",
                ratingValue: testimonial.rating,
                bestRating: "5",
              },
              reviewBody: testimonial.content,
              datePublished: testimonial.dateWorked,
            })),
          }),
        }}
      />
    </motion.section>
  );
});

CommunityTestimonials.displayName = "CommunityTestimonials";

export default CommunityTestimonials;
