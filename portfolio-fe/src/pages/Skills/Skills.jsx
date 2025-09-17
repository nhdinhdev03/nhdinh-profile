import React, { useState, useEffect, useRef, useMemo } from "react";
import {
  motion,
  AnimatePresence,
  useMotionValue,
  useSpring,
  useTransform,
} from "framer-motion";
import { useInView } from "react-intersection-observer";
import { FiCode, FiDatabase, FiServer, FiTool, FiLayers } from "react-icons/fi";
import {
  SiReact,
  SiJavascript,
  SiTypescript,
  SiNodedotjs,
  SiPython,
  SiOpenjdk,
  SiMongodb,
  SiPostgresql,
  SiRedis,
  SiDocker,
  SiAmazonaws,
  SiGit,
  SiTailwindcss,
  SiSass,
  SiVuedotjs,
  SiExpress,
  SiGraphql,
  SiMysql,
  SiMicrosoftsqlserver,
  SiAngular,
} from "react-icons/si";
import { useTranslation } from "react-i18next";
import TechMarquee from "../../components/Skills/TechMarquee/TechMarquee";
import "./Skills.scss";


function Skills() {
  const { t } = useTranslation();
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  const [activeCategory, setActiveCategory] = useState("frontend");
  const [hoveredSkill, setHoveredSkill] = useState(null);
  const [particles, setParticles] = useState([]);
  const [skillsData, setSkillsData] = useState({});
  const skillsRef = useRef(null);

  // Mouse tracking for interactive effects
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const rotateX = useSpring(useTransform(mouseY, [-300, 300], [5, -5]), {
    stiffness: 100,
    damping: 30,
  });
  const rotateY = useSpring(useTransform(mouseX, [-300, 300], [-5, 5]), {
    stiffness: 100,
    damping: 30,
  });

  // Enhanced skills data with more details
  const skillCategories = useMemo(
    () => ({
      frontend: {
        title: t('skills.categories.frontend.title'),
        icon: FiCode,
        color: "#61DAFB",
        gradient: "linear-gradient(135deg, #61DAFB 0%, #21D4FD 100%)",
        description: t('skills.categories.frontend.description'),
        skills: [
          {
            name: "React",
            icon: SiReact,
            color: "#61DAFB",
          },
          {
            name: "JavaScript",
            icon: SiJavascript,
            color: "#F7DF1E",
          },
          {
            name: "TypeScript",
            icon: SiTypescript,
            color: "#3178C6",
          },
          {
            name: "Angular",
            icon: SiAngular,
            color: "#DD0031",
          },
          {
            name: "Vue.js",
            icon: SiVuedotjs,
            color: "#4FC08D",
          },
          {
            name: "Tailwind CSS",
            icon: SiTailwindcss,
            color: "#06B6D4",
          },
          {
            name: "Sass/SCSS",
            icon: SiSass,
            color: "#CC6699",
          },
        ],
      },
      backend: {
        title: t('skills.categories.backend.title'),
        icon: FiServer,
        color: "#339933",
        gradient: "linear-gradient(135deg, #339933 0%, #68D391 100%)",
        description: t('skills.categories.backend.description'),
        skills: [
          {
            name: "Node.js",
            icon: SiNodedotjs,
            color: "#339933",
          },
          {
            name: "Express.js",
            icon: SiExpress,
            color: "#000000",
          },
          {
            name: "Python",
            icon: SiPython,
            color: "#3776AB",
          },
          {
            name: "Java",
            icon: SiOpenjdk,
            color: "#ED8B00",
          },
          {
            name: "GraphQL",
            icon: SiGraphql,
            color: "#E10098",
          },
        ],
      },
      database: {
        title: t('skills.categories.database.title'),
        icon: FiDatabase,
        color: "#336791",
        gradient: "linear-gradient(135deg, #336791 0%, #4A90E2 100%)",
        description: t('skills.categories.database.description'),
        skills: [
          {
            name: "MongoDB",
            icon: SiMongodb,
            color: "#47A248",
          },
          {
            name: "PostgreSQL",
            icon: SiPostgresql,
            color: "#336791",
          },
          {
            name: "MySQL",
            icon: SiMysql,
            color: "#4479A1",
          },
          {
            name: "SQL Server",
            icon: SiMicrosoftsqlserver,
            color: "#CC2927",
          },
          {
            name: "Redis",
            icon: SiRedis,
            color: "#DC382D",
          },
        ],
      },
      devops: {
        title: t('skills.categories.tools.title'),
        icon: FiTool,
        color: "#FF9900",
        gradient: "linear-gradient(135deg, #FF9900 0%, #FF6B6B 100%)",
        description: t('skills.categories.tools.description'),
        skills: [
          {
            name: "Docker",
            icon: SiDocker,
            color: "#2496ED",
          },
          {
            name: "AWS",
            icon: SiAmazonaws,
            color: "#FF9900",
          },
          {
            name: "Git",
            icon: SiGit,
            color: "#F05032",
          },
        ],
      },
    }),
    [t]
  );

  // Initialize particles for background effect
  useEffect(() => {
    const particleCount = 20;
    const newParticles = [];

    for (let i = 0; i < particleCount; i++) {
      newParticles.push({
        id: i,
        x: Math.random() * 100,
        y: Math.random() * 100,
        size: Math.random() * 6 + 2,
        speed: Math.random() * 2 + 1,
        opacity: Math.random() * 0.3 + 0.1,
        color: ["#61DAFB", "#339933", "#336791", "#FF9900"][
          Math.floor(Math.random() * 4)
        ],
      });
    }

    setParticles(newParticles);
  }, []);

  // Mouse move handler for 3D effects
  useEffect(() => {
    const handleMouseMove = (event) => {
      if (skillsRef.current) {
        const rect = skillsRef.current.getBoundingClientRect();
        const centerX = rect.left + rect.width / 2;
        const centerY = rect.top + rect.height / 2;

        mouseX.set(event.clientX - centerX);
        mouseY.set(event.clientY - centerY);
      }
    };

    const skillsElement = skillsRef.current;
    if (skillsElement) {
      skillsElement.addEventListener("mousemove", handleMouseMove);
      return () =>
        skillsElement.removeEventListener("mousemove", handleMouseMove);
    }
  }, []);

  // Simulate loading skills data
  useEffect(() => {
    const timer = setTimeout(() => {
      setSkillsData(skillCategories);
    }, 500);
    return () => clearTimeout(timer);
  }, [skillCategories]);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
        delayChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { y: 60, opacity: 0, scale: 0.95 },
    visible: {
      y: 0,
      opacity: 1,
      scale: 1,
      transition: {
        type: "spring",
        stiffness: 100,
        damping: 15,
        mass: 1,
      },
    },
  };

  const skillVariants = {
    hidden: { x: -50, opacity: 0, rotateY: -45 },
    visible: {
      x: 0,
      opacity: 1,
      rotateY: 0,
      transition: {
        type: "spring",
        stiffness: 120,
        damping: 20,
      },
    },
  };

  return (
    <section id="skills" className="skills section" ref={skillsRef}>
      {/* Animated Particles Background */}
      <div className="skills__particles">
        {particles.map((particle) => (
          <motion.div
            key={particle.id}
            className="skills__particle"
            initial={{
              x: `${particle.x}%`,
              y: `${particle.y}%`,
              opacity: 0,
              scale: 0,
            }}
            animate={{
              x: [
                `${particle.x}%`,
                `${(particle.x + 20) % 100}%`,
                `${particle.x}%`,
              ],
              y: [
                `${particle.y}%`,
                `${(particle.y + 15) % 100}%`,
                `${particle.y}%`,
              ],
              opacity: [0, particle.opacity, 0],
              scale: [0, 1, 0],
              rotate: [0, 360],
            }}
            transition={{
              duration: particle.speed * 10,
              repeat: Infinity,
              ease: "easeInOut",
            }}
            style={{
              width: particle.size,
              height: particle.size,
              background: particle.color,
              borderRadius: "50%",
              position: "absolute",
              pointerEvents: "none",
            }}
          />
        ))}
      </div>

      <div className="container">
        <motion.div
          ref={ref}
          className="skills__content"
          variants={containerVariants}
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
          style={{
            perspective: 1000,
            transformStyle: "preserve-3d",
          }}
        >
          <motion.div className="section-title" variants={itemVariants}>
            <motion.h2
              style={{
                rotateX,
                rotateY,
                transformStyle: "preserve-3d",
              }}
            >
              <span className="skills__title-highlight">
                {t('skills.title')}
              </span>
            </motion.h2>
            <motion.p
              style={{
                transform: "translateZ(20px)",
              }}
            >
              Các công nghệ và công cụ tôi sử dụng để tạo ra những sản phẩm
              tuyệt vời
            </motion.p>
          </motion.div>

          {/* Enhanced Tech Marquee */}
          <motion.div
            className="skills__marquee-wrapper"
            variants={itemVariants}
          >
            <TechMarquee showHeader={false} compact direction="ltr" />
          </motion.div>

          {/* Skills Categories Navigation */}
          <motion.div className="skills__categories" variants={itemVariants}>
            <div className="skills__categories-header">
              <FiLayers className="skills__categories-icon" />
              <h3>{t('skills.expertise_title')}</h3>
            </div>
            <div className="skills__categories-nav">
              {Object.entries(skillsData).map(([key, category]) => {
                const IconComponent = category.icon;
                return (
                  <motion.button
                    key={key}
                    className={`skills__category-btn ${
                      activeCategory === key
                        ? "skills__category-btn--active"
                        : ""
                    }`}
                    onClick={() => setActiveCategory(key)}
                    whileHover={{ scale: 1.05, y: -2 }}
                    whileTap={{ scale: 0.98 }}
                    style={{
                      background:
                        activeCategory === key ? category.gradient : undefined,
                    }}
                  >
                    <motion.div
                      className="skills__category-icon"
                      animate={{
                        rotate: activeCategory === key ? [0, 10, -10, 0] : 0,
                        scale: activeCategory === key ? [1, 1.1, 1] : 1,
                      }}
                      transition={{
                        duration: 0.6,
                        repeat: activeCategory === key ? Infinity : 0,
                        repeatDelay: 2,
                      }}
                    >
                      <IconComponent />
                    </motion.div>
                    <span className="skills__category-title">
                      {category.title}
                    </span>
                    <span className="skills__category-count">
                      {category.skills.length} skills
                    </span>
                  </motion.button>
                );
              })}
            </div>
          </motion.div>

          {/* Skills Display */}
          <AnimatePresence mode="wait">
            {skillsData[activeCategory] && (
              <motion.div
                key={activeCategory}
                className="skills__display"
                variants={itemVariants}
                initial="hidden"
                animate="visible"
                exit={{ opacity: 0, y: -30, scale: 0.95 }}
                transition={{ duration: 0.3 }}
              >
                <div className="skills__display-header">
                  <motion.div
                    className="skills__display-icon"
                    style={{
                      background: skillsData[activeCategory].gradient,
                    }}
                    animate={{
                      boxShadow: [
                        `0 0 20px ${skillsData[activeCategory].color}40`,
                        `0 0 40px ${skillsData[activeCategory].color}60`,
                        `0 0 20px ${skillsData[activeCategory].color}40`,
                      ],
                    }}
                    transition={{
                      duration: 2,
                      repeat: Infinity,
                      ease: "easeInOut",
                    }}
                  >
                    {React.createElement(skillsData[activeCategory].icon)}
                  </motion.div>
                  <div className="skills__display-info">
                    <h3>{skillsData[activeCategory].title}</h3>
                    <p>{skillsData[activeCategory].description}</p>
                  </div>
                </div>

                <motion.div
                  className="skills__grid"
                  variants={containerVariants}
                  initial="hidden"
                  animate="visible"
                >
                  {skillsData[activeCategory].skills.map((skill, index) => {
                    const IconComponent = skill.icon;
                    return (
                      <motion.div
                        key={skill.name}
                        className="skills__item glass-card"
                        variants={skillVariants}
                        whileHover={{
                          scale: 1.1,
                          y: -5,
                          transition: {
                            type: "spring",
                            stiffness: 300,
                            damping: 20,
                          },
                        }}
                        onMouseEnter={() => setHoveredSkill(skill.name)}
                        onMouseLeave={() => setHoveredSkill(null)}
                      >
                        {/* Simple Skill Display */}
                        <div className="skills__item-content">
                          <motion.div
                            className="skills__item-icon"
                            style={{
                              color: skill.color,
                            }}
                            animate={{
                              rotate:
                                hoveredSkill === skill.name ? [0, 360] : 0,
                              scale:
                                hoveredSkill === skill.name ? [1, 1.2, 1] : 1,
                            }}
                            transition={{
                              duration: 0.8,
                              ease: "easeInOut",
                            }}
                          >
                            <IconComponent />
                          </motion.div>
                          <h4 className="skills__item-name">{skill.name}</h4>
                        </div>

                        {/* Hover Effect Overlay */}
                        <motion.div
                          className="skills__item-overlay"
                          initial={{ opacity: 0 }}
                          whileHover={{ opacity: 1 }}
                          style={{
                            background: `linear-gradient(135deg, ${skill.color}10, ${skill.color}20)`,
                          }}
                        />
                      </motion.div>
                    );
                  })}
                </motion.div>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      </div>
    </section>
  );
};

export default Skills;
