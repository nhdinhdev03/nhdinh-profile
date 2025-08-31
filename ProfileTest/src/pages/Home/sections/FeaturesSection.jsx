import React, { useState, useEffect } from "react";
import { motion, useMotionValue, useTransform } from "framer-motion";
import { useInView } from "react-intersection-observer";
import {
  FiCode,
  FiSmartphone,
  FiLayers,
  FiZap,
  FiHeart,
  FiTrendingUp,
  FiCpu,
  FiShield,
  FiGlobe,
  FiTarget,
  FiEye,
} from "react-icons/fi";
import "./FeaturesSection.scss";

// 3D Card Component with advanced animations
const Feature3DCard = ({ feature, index, mouseX, mouseY }) => {
  const [isHovered, setIsHovered] = useState(false);
  const [cardRef, setCardRef] = useState(null);

  const rotateX = useTransform(mouseY, (value) => {
    if (!cardRef || !isHovered) return 0;
    const rect = cardRef.getBoundingClientRect();
    const centerY = rect.top + rect.height / 2;
    const rotateValue = ((value - centerY) / rect.height) * -10;
    return Math.max(-15, Math.min(15, rotateValue));
  });

  const rotateY = useTransform(mouseX, (value) => {
    if (!cardRef || !isHovered) return 0;
    const rect = cardRef.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const rotateValue = ((value - centerX) / rect.width) * 10;
    return Math.max(-15, Math.min(15, rotateValue));
  });

  const scale = useTransform(mouseY, () => (isHovered ? 1.05 : 1));

  const cardVariants = {
    hidden: {
      opacity: 0,
      y: 50,
      rotateX: -30,
      scale: 0.8,
    },
    visible: {
      opacity: 1,
      y: 0,
      rotateX: 0,
      scale: 1,
      transition: {
        type: "spring",
        stiffness: 100,
        damping: 15,
        delay: index * 0.2,
      },
    },
  };

  const iconVariants = {
    rest: { scale: 1, rotate: 0 },
    hover: {
      scale: 1.2,
      rotate: 360,
      transition: { duration: 0.5, ease: "backOut" },
    },
  };

  const glowVariants = {
    rest: { opacity: 0, scale: 0.8 },
    hover: {
      opacity: 1,
      scale: 1.2,
      transition: { duration: 0.3 },
    },
  };

  return (
    <motion.div
      ref={setCardRef}
      variants={cardVariants}
      className="relative group perspective-1000"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      style={{
        rotateX,
        rotateY,
        scale,
        transformStyle: "preserve-3d",
      }}
    >
      {/* Main Card */}
      <motion.div
        className="relative p-8 rounded-3xl glass backdrop-blur-xl border border-white/10 hover:border-white/20 transition-all duration-500 h-full"
        style={{
          transformStyle: "preserve-3d",
          transform: "translateZ(0)",
        }}
      >
        {/* Animated Background Gradient */}
        <motion.div
          className="absolute inset-0 rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"
          style={{
            background: `linear-gradient(135deg, ${feature.color}15, ${
              feature.secondaryColor || feature.color
            }25)`,
            transform: "translateZ(-1px)",
          }}
          animate={
            isHovered
              ? {
                  background: [
                    `linear-gradient(135deg, ${feature.color}15, ${
                      feature.secondaryColor || feature.color
                    }25)`,
                    `linear-gradient(135deg, ${
                      feature.secondaryColor || feature.color
                    }25, ${feature.color}15)`,
                    `linear-gradient(135deg, ${feature.color}15, ${
                      feature.secondaryColor || feature.color
                    }25)`,
                  ],
                }
              : {}
          }
          transition={{ duration: 3, repeat: Infinity }}
        />

        {/* Floating particles effect */}
        <div className="absolute inset-0 overflow-hidden rounded-3xl pointer-events-none">
          {[...Array(5)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute w-1 h-1 bg-white/30 rounded-full"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
              }}
              animate={
                isHovered
                  ? {
                      y: [0, -20, 0],
                      opacity: [0, 1, 0],
                      scale: [0, 1, 0],
                    }
                  : {}
              }
              transition={{
                duration: 2,
                delay: i * 0.2,
                repeat: Infinity,
                ease: "easeInOut",
              }}
            />
          ))}
        </div>

        {/* Icon Container */}
        <motion.div
          className="relative mb-6"
          variants={iconVariants}
          initial="rest"
          animate={isHovered ? "hover" : "rest"}
          style={{ transformStyle: "preserve-3d" }}
        >
          {/* Glow Effect */}
          <motion.div
            variants={glowVariants}
            className="absolute inset-0 rounded-2xl blur-xl"
            style={{
              background: `linear-gradient(135deg, ${feature.color}, ${
                feature.secondaryColor || feature.color
              })`,
              transform: "translateZ(-2px)",
            }}
          />

          {/* Icon Background */}
          <motion.div
            className="relative w-16 h-16 rounded-2xl flex items-center justify-center"
            style={{
              background: `linear-gradient(135deg, ${feature.color}, ${
                feature.secondaryColor || feature.color
              })`,
              transform: "translateZ(20px)",
            }}
            whileHover={{
              boxShadow: `0 20px 40px ${feature.color}40`,
              transform: "translateZ(30px)",
            }}
          >
            <feature.icon className="text-2xl text-white" />
          </motion.div>
        </motion.div>

        {/* Content */}
        <motion.div
          className="relative z-10"
          style={{ transform: "translateZ(10px)" }}
        >
          {/* Category Badge */}
          <motion.div
            className="inline-block px-3 py-1 rounded-full text-xs font-medium mb-4 border"
            style={{
              backgroundColor: `${feature.color}20`,
              borderColor: `${feature.color}40`,
              color: feature.color,
            }}
            whileHover={{ scale: 1.05 }}
          >
            {feature.category}
          </motion.div>

          {/* Title */}
          <motion.h3
            className="text-xl font-bold text-white mb-4 group-hover:gradient-text transition-all duration-300"
            style={{ transform: "translateZ(15px)" }}
          >
            {feature.title}
          </motion.h3>

          {/* Description */}
          <motion.p
            className="text-gray-300 leading-relaxed mb-6"
            style={{ transform: "translateZ(5px)" }}
          >
            {feature.description}
          </motion.p>

          {/* Technologies */}
          <motion.div
            className="flex flex-wrap gap-2"
            style={{ transform: "translateZ(8px)" }}
          >
            {feature.technologies.map((tech, techIndex) => (
              <motion.span
                key={tech}
                className="px-2 py-1 text-xs bg-white/10 backdrop-blur-sm rounded-lg border border-white/10 text-gray-300"
                whileHover={{
                  scale: 1.1,
                  backgroundColor: `${feature.color}20`,
                  color: feature.color,
                  borderColor: `${feature.color}40`,
                }}
                transition={{ delay: techIndex * 0.05 }}
              >
                {tech}
              </motion.span>
            ))}
          </motion.div>

          {/* Stats */}
          <motion.div
            className="mt-6 pt-4 border-t border-white/10"
            style={{ transform: "translateZ(5px)" }}
          >
            <div className="flex items-center justify-between text-sm">
              <span className="text-gray-400">{feature.statLabel}</span>
              <motion.span
                className="font-bold"
                style={{ color: feature.color }}
                animate={isHovered ? { scale: [1, 1.1, 1] } : {}}
                transition={{ duration: 0.5 }}
              >
                {feature.statValue}
              </motion.span>
            </div>
          </motion.div>
        </motion.div>

        {/* Hover Effects */}
        <motion.div
          className="absolute inset-0 rounded-3xl pointer-events-none"
          animate={
            isHovered
              ? {
                  boxShadow: [
                    `0 0 0 0 ${feature.color}00`,
                    `0 0 0 8px ${feature.color}20`,
                    `0 0 0 0 ${feature.color}00`,
                  ],
                }
              : {}
          }
          transition={{ duration: 1.5, repeat: Infinity }}
        />
      </motion.div>
    </motion.div>
  );
};

// Section Header Component
const SectionHeader = ({ inView }) => {
  const headerVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.8,
        ease: "easeOut",
      },
    },
  };

  return (
    <motion.div
      variants={headerVariants}
      initial="hidden"
      animate={inView ? "visible" : "hidden"}
      className="text-center mb-20"
    >
      <motion.div
        className="inline-block px-4 py-2 rounded-full bg-gradient-to-r from-cyan-500/20 to-purple-500/20 border border-cyan-400/30 mb-6"
        whileHover={{ scale: 1.05 }}
      >
        <span className="text-sm font-medium text-cyan-300">Core Features</span>
      </motion.div>

      <motion.h2
        className="text-4xl md:text-6xl font-bold gradient-text mb-6"
        animate={
          inView
            ? {
                backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"],
              }
            : {}
        }
        transition={{ duration: 5, repeat: Infinity }}
      >
        What I Bring to the Table
      </motion.h2>

      <motion.p
        className="text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed"
        variants={headerVariants}
      >
        Combining cutting-edge technology with creative problem-solving to
        deliver exceptional digital experiences that push boundaries and exceed
        expectations.
      </motion.p>
    </motion.div>
  );
};

// Main Features Section Component
const FeaturesSection = () => {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  useEffect(() => {
    const handleMouseMove = (e) => {
      mouseX.set(e.clientX);
      mouseY.set(e.clientY);
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, [mouseX, mouseY]);

  const features = [
    {
      icon: FiCode,
      title: "Clean Architecture",
      category: "Development",
      description:
        "Building scalable, maintainable applications with clean code principles, SOLID design patterns, and comprehensive testing strategies.",
      color: "#00d4ff",
      secondaryColor: "#0099cc",
      technologies: ["React", "TypeScript", "Node.js", "GraphQL"],
      statLabel: "Code Quality",
      statValue: "99%",
    },
    {
      icon: FiTarget,
      title: "AI Integration",
      category: "Innovation",
      description:
        "Implementing cutting-edge AI and machine learning solutions to create intelligent, adaptive user experiences and automated workflows.",
      color: "#8b5cf6",
      secondaryColor: "#7c3aed",
      technologies: ["TensorFlow", "OpenAI", "Python", "FastAPI"],
      statLabel: "AI Models",
      statValue: "15+",
    },
    {
      icon: FiSmartphone,
      title: "Responsive Design",
      category: "UI/UX",
      description:
        "Crafting pixel-perfect, responsive interfaces that provide seamless experiences across all devices with modern design systems.",
      color: "#06ffa5",
      secondaryColor: "#00cc84",
      technologies: ["Tailwind", "Framer Motion", "Figma", "CSS Grid"],
      statLabel: "Device Support",
      statValue: "100%",
    },
    {
      icon: FiZap,
      title: "Performance Optimization",
      category: "Optimization",
      description:
        "Delivering lightning-fast applications with advanced optimization techniques, lazy loading, and efficient state management.",
      color: "#ffd60a",
      secondaryColor: "#ffbe0b",
      technologies: ["Webpack", "Vite", "Redis", "CDN"],
      statLabel: "Speed Boost",
      statValue: "300%",
    },
    {
      icon: FiShield,
      title: "Security First",
      category: "Security",
      description:
        "Implementing robust security measures including authentication, authorization, data encryption, and vulnerability assessments.",
      color: "#ff006e",
      secondaryColor: "#d90368",
      technologies: ["JWT", "OAuth", "HTTPS", "Encryption"],
      statLabel: "Security Score",
      statValue: "A+",
    },
    {
      icon: FiGlobe,
      title: "Global Scale",
      category: "Infrastructure",
      description:
        "Building globally distributed applications with cloud infrastructure, microservices architecture, and auto-scaling capabilities.",
      color: "#3a86ff",
      secondaryColor: "#2563eb",
      technologies: ["AWS", "Docker", "Kubernetes", "Microservices"],
      statLabel: "Uptime",
      statValue: "99.9%",
    },
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.3,
      },
    },
  };

  return (
    <section
      ref={ref}
      className="relative py-32 overflow-hidden"
      style={{
        background:
          "linear-gradient(135deg, #0a0a0a 0%, #1a1a2e 50%, #16213e 100%)",
      }}
    >
      {/* Animated Background */}
      <div className="absolute inset-0">
        <motion.div
          className="absolute inset-0 opacity-30"
          style={{
            backgroundImage: `
              radial-gradient(circle at 20% 50%, #00d4ff20 0%, transparent 50%),
              radial-gradient(circle at 80% 20%, #8b5cf620 0%, transparent 50%),
              radial-gradient(circle at 40% 80%, #06ffa520 0%, transparent 50%)
            `,
          }}
          animate={{
            background: [
              `radial-gradient(circle at 20% 50%, #00d4ff20 0%, transparent 50%),
               radial-gradient(circle at 80% 20%, #8b5cf620 0%, transparent 50%),
               radial-gradient(circle at 40% 80%, #06ffa520 0%, transparent 50%)`,
              `radial-gradient(circle at 80% 20%, #00d4ff20 0%, transparent 50%),
               radial-gradient(circle at 40% 80%, #8b5cf620 0%, transparent 50%),
               radial-gradient(circle at 20% 50%, #06ffa520 0%, transparent 50%)`,
              `radial-gradient(circle at 40% 80%, #00d4ff20 0%, transparent 50%),
               radial-gradient(circle at 20% 50%, #8b5cf620 0%, transparent 50%),
               radial-gradient(circle at 80% 20%, #06ffa520 0%, transparent 50%)`,
            ],
          }}
          transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
        />
      </div>

      {/* Neural Network Background */}
      <div className="absolute inset-0 opacity-10">
        <svg className="w-full h-full">
          {[...Array(20)].map((_, i) => (
            <motion.circle
              key={i}
              cx={`${Math.random() * 100}%`}
              cy={`${Math.random() * 100}%`}
              r="2"
              fill="#00d4ff"
              animate={{
                opacity: [0, 1, 0],
                scale: [0, 1, 0],
              }}
              transition={{
                duration: 3,
                delay: i * 0.2,
                repeat: Infinity,
                ease: "easeInOut",
              }}
            />
          ))}
        </svg>
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeader inView={inView} />

        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
        >
          {features.map((feature, index) => (
            <Feature3DCard
              key={feature.title}
              feature={feature}
              index={index}
              mouseX={mouseX}
              mouseY={mouseY}
            />
          ))}
        </motion.div>

        {/* Call to Action */}
        <motion.div
          className="text-center mt-20"
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 1.5, duration: 0.8 }}
        >
          <motion.button
            className="group relative px-12 py-4 bg-gradient-to-r from-cyan-500 via-purple-500 to-pink-500 rounded-2xl font-semibold text-white text-lg overflow-hidden"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <motion.div
              className="absolute inset-0 bg-gradient-to-r from-cyan-400 via-purple-400 to-pink-400 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
              animate={{
                background: [
                  "linear-gradient(45deg, #06b6d4, #8b5cf6, #ec4899)",
                  "linear-gradient(45deg, #ec4899, #06b6d4, #8b5cf6)",
                  "linear-gradient(45deg, #8b5cf6, #ec4899, #06b6d4)",
                ],
              }}
              transition={{ duration: 3, repeat: Infinity }}
            />
            <span className="relative z-10 flex items-center gap-3">
              <FiTarget className="text-xl group-hover:animate-spin" />
              Explore My Projects
            </span>
          </motion.button>
        </motion.div>
      </div>
    </section>
  );
};

export default FeaturesSection;
