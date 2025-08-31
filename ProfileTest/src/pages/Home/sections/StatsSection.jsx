import React, { useState, useEffect } from "react";
import { motion, useAnimation, useMotionValue, useSpring } from "framer-motion";
import { useInView } from "react-intersection-observer";
import {
  FiTrendingUp,
  FiUsers,
  FiAward,
  FiCode,
  FiGitBranch,
  FiStar,
  FiCoffee,
  FiZap,
  FiTarget,
  FiHeart,
  FiGlobe,
  FiLayers,
} from "react-icons/fi";
import "./StatsSection.scss";

// Animated Counter Component
const AnimatedCounter = ({
  value,
  duration = 2,
  prefix = "",
  suffix = "",
  decimals = 0,
}) => {
  const motionValue = useMotionValue(0);
  const springValue = useSpring(motionValue, { duration: duration * 1000 });
  const [displayValue, setDisplayValue] = useState(0);

  useEffect(() => {
    motionValue.set(value);
  }, [value, motionValue]);

  useEffect(() => {
    const unsubscribe = springValue.onChange((latest) => {
      setDisplayValue(latest);
    });
    return unsubscribe;
  }, [springValue]);

  return (
    <span>
      {prefix}
      {displayValue.toFixed(decimals)}
      {suffix}
    </span>
  );
};

// 3D Stat Card Component
const StatCard = ({ stat, index, mousePosition }) => {
  const [isHovered, setIsHovered] = useState(false);
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.3,
  });

  const cardVariants = {
    hidden: {
      opacity: 0,
      y: 60,
      rotateX: -45,
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
    rest: {
      scale: 1,
      rotate: 0,
      filter: "brightness(1)",
    },
    hover: {
      scale: 1.3,
      rotate: 360,
      filter: "brightness(1.2)",
      transition: { duration: 0.6, ease: "backOut" },
    },
  };

  // Calculate 3D transform based on mouse position
  const getCardTransform = () => {
    if (!isHovered || !mousePosition) return {};

    const rotateX = (mousePosition.y - 0.5) * -10;
    const rotateY = (mousePosition.x - 0.5) * 10;

    return {
      rotateX: `${rotateX}deg`,
      rotateY: `${rotateY}deg`,
      scale: 1.05,
      z: 50,
    };
  };

  return (
    <motion.div
      ref={ref}
      variants={cardVariants}
      initial="hidden"
      animate={inView ? "visible" : "hidden"}
      className="relative perspective-1000"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <motion.div
        className="relative group"
        style={{
          transformStyle: "preserve-3d",
          ...getCardTransform(),
        }}
        transition={{ type: "spring", stiffness: 300, damping: 30 }}
      >
        {/* Main Card */}
        <motion.div
          className="relative p-8 rounded-3xl glass backdrop-blur-xl border border-white/10 hover:border-white/20 transition-all duration-500"
          style={{
            background: `linear-gradient(135deg, ${stat.color}10, ${
              stat.secondaryColor || stat.color
            }20)`,
            transformStyle: "preserve-3d",
          }}
        >
          {/* Animated Background Particles */}
          <div className="absolute inset-0 overflow-hidden rounded-3xl">
            {[...Array(8)].map((_, i) => (
              <motion.div
                key={i}
                className="absolute w-2 h-2 rounded-full opacity-30"
                style={{
                  backgroundColor: stat.color,
                  left: `${Math.random() * 100}%`,
                  top: `${Math.random() * 100}%`,
                }}
                animate={
                  isHovered
                    ? {
                        y: [0, -30, 0],
                        opacity: [0.3, 1, 0.3],
                        scale: [1, 1.5, 1],
                      }
                    : {}
                }
                transition={{
                  duration: 2,
                  delay: i * 0.1,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
              />
            ))}
          </div>

          {/* Glowing Border Effect */}
          <motion.div
            className="absolute inset-0 rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"
            style={{
              boxShadow: `0 0 30px ${stat.color}40, inset 0 0 30px ${stat.color}10`,
            }}
          />

          {/* Icon Container */}
          <motion.div
            className="relative mb-6 flex justify-center"
            variants={iconVariants}
            initial="rest"
            animate={isHovered ? "hover" : "rest"}
            style={{ transformStyle: "preserve-3d" }}
          >
            {/* Icon Glow */}
            <motion.div
              className="absolute inset-0 rounded-2xl blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"
              style={{
                background: `linear-gradient(135deg, ${stat.color}, ${
                  stat.secondaryColor || stat.color
                })`,
                transform: "translateZ(-5px)",
              }}
            />

            {/* Icon Background */}
            <motion.div
              className="relative w-20 h-20 rounded-2xl flex items-center justify-center"
              style={{
                background: `linear-gradient(135deg, ${stat.color}, ${
                  stat.secondaryColor || stat.color
                })`,
                transform: "translateZ(20px)",
              }}
              whileHover={{
                boxShadow: `0 25px 50px ${stat.color}50`,
                transform: "translateZ(30px)",
              }}
            >
              <stat.icon className="text-3xl text-white" />

              {/* Icon Reflection */}
              <motion.div
                className="absolute inset-0 rounded-2xl"
                style={{
                  background:
                    "linear-gradient(135deg, rgba(255,255,255,0.2) 0%, transparent 50%)",
                  transform: "translateZ(1px)",
                }}
              />
            </motion.div>
          </motion.div>

          {/* Stats Content */}
          <motion.div
            className="relative z-10 text-center"
            style={{ transform: "translateZ(10px)" }}
          >
            {/* Category Badge */}
            <motion.div
              className="inline-block px-3 py-1 rounded-full text-xs font-medium mb-4 border"
              style={{
                backgroundColor: `${stat.color}20`,
                borderColor: `${stat.color}40`,
                color: stat.color,
              }}
              whileHover={{ scale: 1.05 }}
            >
              {stat.category}
            </motion.div>

            {/* Main Value */}
            <motion.div
              className="text-4xl md:text-5xl font-bold mb-2"
              style={{ color: stat.color }}
              animate={
                inView && isHovered
                  ? {
                      textShadow: [
                        `0 0 10px ${stat.color}80`,
                        `0 0 20px ${stat.color}80`,
                        `0 0 10px ${stat.color}80`,
                      ],
                    }
                  : {}
              }
              transition={{ duration: 1, repeat: Infinity }}
            >
              {inView ? (
                <AnimatedCounter
                  value={stat.value}
                  duration={2.5}
                  prefix={stat.prefix}
                  suffix={stat.suffix}
                  decimals={stat.decimals || 0}
                />
              ) : (
                `${stat.prefix || ""}0${stat.suffix || ""}`
              )}
            </motion.div>

            {/* Label */}
            <motion.h3
              className="text-lg font-semibold text-white mb-3"
              style={{ transform: "translateZ(15px)" }}
            >
              {stat.label}
            </motion.h3>

            {/* Description */}
            <motion.p
              className="text-sm text-gray-300 leading-relaxed mb-4"
              style={{ transform: "translateZ(5px)" }}
            >
              {stat.description}
            </motion.p>

            {/* Progress Bar */}
            <motion.div className="relative">
              <div className="w-full h-2 bg-white/10 rounded-full overflow-hidden">
                <motion.div
                  className="h-full rounded-full"
                  style={{
                    background: `linear-gradient(90deg, ${stat.color}, ${
                      stat.secondaryColor || stat.color
                    })`,
                  }}
                  initial={{ width: 0 }}
                  animate={
                    inView
                      ? { width: `${stat.percentage || 100}%` }
                      : { width: 0 }
                  }
                  transition={{
                    duration: 2,
                    delay: index * 0.2,
                    ease: "easeOut",
                  }}
                />
              </div>
              <motion.div
                className="absolute top-0 left-0 w-full h-full rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                style={{
                  background: `linear-gradient(90deg, ${stat.color}40, transparent)`,
                  filter: "blur(4px)",
                }}
              />
            </motion.div>

            {/* Achievement Badge */}
            {stat.achievement && (
              <motion.div
                className="mt-4 inline-flex items-center gap-2 px-3 py-2 rounded-full bg-gradient-to-r from-yellow-500/20 to-orange-500/20 border border-yellow-500/30"
                whileHover={{ scale: 1.05 }}
                initial={{ opacity: 0, scale: 0 }}
                animate={inView ? { opacity: 1, scale: 1 } : {}}
                transition={{ delay: 1.5 + index * 0.1 }}
              >
                <FiStar className="text-yellow-400 text-sm" />
                <span className="text-xs text-yellow-300 font-medium">
                  {stat.achievement}
                </span>
              </motion.div>
            )}
          </motion.div>

          {/* 3D Depth Layers */}
          <motion.div
            className="absolute inset-0 rounded-3xl opacity-20 pointer-events-none"
            style={{
              background: `linear-gradient(135deg, ${stat.color}20, transparent)`,
              transform: "translateZ(-5px)",
            }}
          />
        </motion.div>
      </motion.div>
    </motion.div>
  );
};

// Main Stats Section Component
const StatsSection = () => {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  const [mousePosition, setMousePosition] = useState({ x: 0.5, y: 0.5 });

  useEffect(() => {
    const handleMouseMove = (e) => {
      setMousePosition({
        x: e.clientX / window.innerWidth,
        y: e.clientY / window.innerHeight,
      });
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  const stats = [
    {
      icon: FiCode,
      value: 50000,
      label: "Lines of Code",
      description:
        "Clean, efficient code written across multiple projects and technologies",
      color: "#00d4ff",
      secondaryColor: "#0099cc",
      category: "Development",
      suffix: "+",
      percentage: 95,
      achievement: "Code Master",
    },
    {
      icon: FiGitBranch,
      value: 500,
      label: "Git Commits",
      description:
        "Consistent contributions and version control across various repositories",
      color: "#06ffa5",
      secondaryColor: "#00cc84",
      category: "Version Control",
      suffix: "+",
      percentage: 88,
      achievement: "Git Expert",
    },
    {
      icon: FiUsers,
      value: 25,
      label: "Happy Clients",
      description:
        "Satisfied clients who trust my expertise for their digital solutions",
      color: "#8b5cf6",
      secondaryColor: "#7c3aed",
      category: "Client Work",
      suffix: "+",
      percentage: 100,
      achievement: "Client Favorite",
    },
    {
      icon: FiTrendingUp,
      value: 98.5,
      label: "Success Rate",
      description:
        "Project completion rate with high quality and client satisfaction",
      color: "#ffd60a",
      secondaryColor: "#ffbe0b",
      category: "Performance",
      suffix: "%",
      decimals: 1,
      percentage: 98,
      achievement: "Excellence",
    },
    {
      icon: FiGlobe,
      value: 15,
      label: "Countries Served",
      description:
        "Global reach with clients from different continents and cultures",
      color: "#ff006e",
      secondaryColor: "#d90368",
      category: "Global Impact",
      suffix: "+",
      percentage: 75,
      achievement: "Global Reach",
    },
    {
      icon: FiCoffee,
      value: 1000,
      label: "Cups of Coffee",
      description:
        "Fuel for countless hours of coding, debugging, and problem-solving",
      color: "#3a86ff",
      secondaryColor: "#2563eb",
      category: "Dedication",
      suffix: "+",
      percentage: 90,
      achievement: "Caffeinated Coder",
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
    <section
      ref={ref}
      className="relative py-32 overflow-hidden"
      style={{
        background:
          "linear-gradient(135deg, #0f0f23 0%, #1a1a2e 50%, #16213e 100%)",
      }}
    >
      {/* Animated Background */}
      <motion.div
        className="absolute inset-0 opacity-20"
        animate={{
          background: [
            "radial-gradient(circle at 25% 25%, #00d4ff20 0%, transparent 50%), radial-gradient(circle at 75% 75%, #8b5cf620 0%, transparent 50%)",
            "radial-gradient(circle at 75% 25%, #06ffa520 0%, transparent 50%), radial-gradient(circle at 25% 75%, #ff006e20 0%, transparent 50%)",
            "radial-gradient(circle at 50% 50%, #ffd60a20 0%, transparent 50%), radial-gradient(circle at 0% 100%, #3a86ff20 0%, transparent 50%)",
          ],
        }}
        transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
      />

      {/* Geometric Patterns */}
      <div className="absolute inset-0 overflow-hidden">
        <svg className="w-full h-full opacity-10">
          <defs>
            <pattern
              id="grid"
              width="40"
              height="40"
              patternUnits="userSpaceOnUse"
            >
              <path
                d="M 40 0 L 0 0 0 40"
                fill="none"
                stroke="#00d4ff"
                strokeWidth="1"
                opacity="0.3"
              />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#grid)" />
        </svg>
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
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
            <span className="text-sm font-medium text-cyan-300">
              By the Numbers
            </span>
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
            Proven Track Record
          </motion.h2>

          <motion.p
            className="text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed"
            variants={headerVariants}
          >
            Numbers that speak to my commitment, expertise, and the value I
            bring to every project. Each metric represents countless hours of
            dedication and passion for excellence.
          </motion.p>
        </motion.div>

        {/* Stats Grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
        >
          {stats.map((stat, index) => (
            <StatCard
              key={stat.label}
              stat={stat}
              index={index}
              mousePosition={mousePosition}
            />
          ))}
        </motion.div>

        {/* Bottom CTA */}
        <motion.div
          className="text-center mt-20"
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 2, duration: 0.8 }}
        >
          <motion.div
            className="inline-flex items-center gap-4 px-8 py-4 rounded-2xl glass backdrop-blur-xl border border-white/10"
            whileHover={{ scale: 1.05 }}
          >
            <FiTarget className="text-2xl text-cyan-400" />
            <div className="text-left">
              <h3 className="text-lg font-semibold text-white">
                Ready to add to these numbers?
              </h3>
              <p className="text-sm text-gray-300">
                Let's build something amazing together
              </p>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default StatsSection;
