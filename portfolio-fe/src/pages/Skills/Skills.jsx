import {
  AnimatePresence,
  motion,
} from "framer-motion";
import React, { useEffect, useMemo, useRef, useState } from "react";
import { useTranslation } from "react-i18next";
import { FiCode, FiDatabase, FiLayers, FiServer, FiTool } from "react-icons/fi";
import {
  SiAmazonaws,
  SiAngular,
  SiDocker,
  SiExpress,
  SiGit,
  SiGraphql,
  SiJavascript,
  SiMicrosoftsqlserver,
  SiMongodb,
  SiMysql,
  SiNodedotjs,
  SiOpenjdk,
  SiPostgresql,
  SiPython,
  SiReact,
  SiRedis,
  SiSass,
  SiTailwindcss,
  SiTypescript,
  SiVuedotjs,
} from "react-icons/si";
import { useInView } from "react-intersection-observer";

import "./Skills.scss";
import TechMarquee from "./TechMarquee/TechMarquee";


function Skills() {
  const { t } = useTranslation();
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.05, // Giảm threshold để trigger sớm hơn
    rootMargin: "50px 0px", // Thêm margin để trigger sớm hơn
  });

  const [activeCategory, setActiveCategory] = useState("frontend");
  const [skillsData, setSkillsData] = useState({});
  const skillsRef = useRef(null);

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
        staggerChildren: 0.08,
        delayChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { y: 30, opacity: 0, scale: 0.98 },
    visible: {
      y: 0,
      opacity: 1,
      scale: 1,
      transition: {
        type: "spring",
        stiffness: 150,
        damping: 20,
        mass: 0.8,
      },
    },
  };

  const skillVariants = {
    hidden: { x: -20, opacity: 0, rotateY: -15 },
    visible: {
      x: 0,
      opacity: 1,
      rotateY: 0,
      transition: {
        type: "spring",
        stiffness: 180,
        damping: 25,
      },
    },
  };

  return (
    <section id="skills" className="skills section" ref={skillsRef}>
      <div className="container">
        <motion.div
          ref={ref}
          className="skills__content"
          variants={containerVariants}
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
        >
          <motion.div className="section-title" variants={itemVariants}>
            <h2>
              <span className="skills__title-highlight">
                {t('skills.title')}
              </span>
            </h2>
            <p>
              Các công nghệ và công cụ tôi sử dụng để tạo ra những sản phẩm
              tuyệt vời
            </p>
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
              <div
                key={activeCategory}
                className="skills__display"
                style={{
                  opacity: 1,
                  transform: "none"
                }}
              >
                <div className="skills__display-header">
                  <motion.div
                    className="skills__display-icon"
                    style={{
                      background: skillsData[activeCategory].gradient,
                    }}
                  >
                    {React.createElement(skillsData[activeCategory].icon)}
                  </motion.div>
                  <div className="skills__display-info">
                    <h3>{skillsData[activeCategory].title}</h3>
                    <p>{skillsData[activeCategory].description}</p>
                  </div>
                </div>

                <div
                  className="skills__grid"
                  style={{
                    opacity: 1,
                    transform: "none"
                  }}
                >
                  {skillsData[activeCategory].skills.map((skill, index) => {
                    const IconComponent = skill.icon;
                    return (
                      <motion.div
                        key={skill.name}
                        className="skills__item glass-card"
                        variants={skillVariants}
                        whileHover={{
                          scale: 1.02,
                          transition: {
                            duration: 0.2,
                          },
                        }}
                      >
                        {/* Simple Skill Display */}
                        <div className="skills__item-content">
                          <div
                            className="skills__item-icon"
                            style={{
                              color: skill.color,
                            }}
                          >
                            <IconComponent />
                          </div>
                          <h4 className="skills__item-name">{skill.name}</h4>
                        </div>
                      </motion.div>
                    );
                  })}
                </div>
              </div>
            )}
          </AnimatePresence>
        </motion.div>
      </div>
    </section>
  );
};

export default Skills;
