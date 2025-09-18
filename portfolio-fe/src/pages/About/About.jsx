import { motion } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import { useTranslation } from "react-i18next";
import { useInView } from "react-intersection-observer";

import "./About.scss";
import ContactSection from "./ContactSection";
import Education from "./Education";
import ExperienceTimeline from "./ExperienceTimeline";
import ProfileHero from "./ProfileHero";

// Optimized GitHub profile hook
function useGithubProfile() {
  const [profile, setProfile] = useState(null);

  useEffect(() => {
    let ignore = false;
    const ctrl = new AbortController();

    async function fetchProfile() {
      try {
        const profileRes = await fetch("https://api.github.com/users/nhdinhdev03", {
          signal: ctrl.signal,
          headers: { Accept: "application/vnd.github+json" },
        });
        
        if (!profileRes.ok) throw new Error("Failed to fetch");
        const profileData = await profileRes.json();

        if (!ignore) {
          setProfile(profileData);
        }
      } catch (error) {
        if (!ignore && error.name !== "AbortError") {
          console.warn("Failed to fetch GitHub profile:", error);
        }
      }
    }

    fetchProfile();
    return () => {
      ignore = true;
      ctrl.abort();
    };
  }, []);

  return profile;
};

// Main About Component
function About() {
  const profile = useGithubProfile();
  const [particles, setParticles] = useState([])
  const aboutRef = useRef(null)
  const { t } = useTranslation();
  const light =
    typeof document !== "undefined" &&
    document.documentElement.getAttribute("data-theme") === "light";

  // Reveal-on-scroll like other sections
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.1 });

  // Initialize background particles
  useEffect(() => {
    const particleCount = 15
    const newParticles = []
    
    for (let i = 0; i < particleCount; i++) {
      newParticles.push({
        id: i,
        x: Math.random() * 100,
        y: Math.random() * 100,
        size: Math.random() * 4 + 2,
        speed: Math.random() * 2 + 1,
        opacity: Math.random() * 0.2 + 0.05,
        color: ['#6366f1', '#8b5cf6', '#ec4899', '#10b981', '#f59e0b'][Math.floor(Math.random() * 5)]
      })
    }
    
    setParticles(newParticles)
  }, [])

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.2, delayChildren: 0.1 },
    },
  };

  const itemVariants = {
    hidden: { y: 30, opacity: 0, scale: 0.98 },
    visible: {
      y: 0,
      opacity: 1,
      scale: 1,
      transition: { type: "spring", stiffness: 120, damping: 12 },
    },
  };

  return (
    <section id="about" className="about section" ref={aboutRef}>
      {/* Animated Background Particles */}
      <div className="about__particles">
        {particles.map((particle) => (
          <motion.div
            key={particle.id}
            className="about__particle"
            initial={{
              x: `${particle.x}%`,
              y: `${particle.y}%`,
              opacity: 0,
              scale: 0
            }}
            animate={{
              x: [`${particle.x}%`, `${(particle.x + 20) % 100}%`, `${particle.x}%`],
              y: [`${particle.y}%`, `${(particle.y + 15) % 100}%`, `${particle.y}%`],
              opacity: [0, particle.opacity, 0],
              scale: [0, 1, 0],
              rotate: [0, 360]
            }}
            transition={{
              duration: particle.speed * 12,
              repeat: Infinity,
              ease: "easeInOut"
            }}
            style={{
              width: particle.size,
              height: particle.size,
              background: particle.color,
              borderRadius: '50%',
              position: 'absolute',
              pointerEvents: 'none',
              filter: 'blur(1px)',
              boxShadow: `0 0 ${particle.size * 2}px ${particle.color}`
            }}
          />
        ))}
      </div>
      
      <div className="container">
        <motion.div
          ref={ref}
          className="section-title"
          variants={containerVariants}
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
        >
          <motion.h2 
            variants={itemVariants}
            style={{
              background: 'linear-gradient(90deg, var(--text-primary), var(--primary-light), var(--secondary-light), var(--text-primary))',
              backgroundSize: '300% auto',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text'
            }}
            animate={{
              backgroundPosition: ['0% 50%', '100% 50%', '0% 50%']
            }}
            transition={{
              duration: 5,
              repeat: Infinity,
              ease: 'linear'
            }}
          >
            {t('about.title')}
          </motion.h2>
          <motion.p variants={itemVariants}>
            {t('about.description')}
          </motion.p>
        </motion.div>

        <motion.div
          className={`about-page ${light ? "light" : ""}`}
          variants={containerVariants}
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
        >
          <motion.div 
            className="gradient-line" 
            aria-hidden="true"
            initial={{ width: 0 }}
            animate={{ width: '100%' }}
            transition={{ delay: 0.3, duration: 1.2, ease: 'easeOut' }}
          />
          
          <motion.div variants={itemVariants}>
            <ProfileHero profile={profile} light={light} />
          </motion.div>
          
          <motion.div variants={itemVariants}>
            <ExperienceTimeline light={light} />
          </motion.div>
          
          <motion.div 
            className="gradient-line" 
            aria-hidden="true"
            initial={{ width: 0 }}
            animate={{ width: '100%' }}
            transition={{ delay: 1.2, duration: 1.2, ease: 'easeOut' }}
          />
          
          <motion.div variants={itemVariants}>
            <Education light={light} />
          </motion.div>
          
          <motion.div 
            className="gradient-line" 
            aria-hidden="true"
            initial={{ width: 0 }}
            animate={{ width: '100%' }}
            transition={{ delay: 1.5, duration: 1.2, ease: 'easeOut' }}
          />
          
          <motion.div variants={itemVariants}>
            <ContactSection profile={profile} light={light} />
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default About;
