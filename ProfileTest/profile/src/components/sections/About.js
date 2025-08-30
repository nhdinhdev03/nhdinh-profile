import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence, useAnimation } from 'framer-motion';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { 
  faUser,
  faCode,
  faGraduationCap,
  faTrophy,
  faRocket,
  faStar,
  faHeart,
  faLightbulb,
  faBolt,
  faAtom,
  faInfinity,
  faGem,
  faMagic,
  faShieldAlt,
  faEye,
  faDownload,
  faShare,
  faCalendarAlt,
  faMapMarkerAlt,
  faCoffee,
  faGamepad,
  faMusic,
  faCamera,
  faBookOpen,
  faPalette,
  faGlobe,
  faBrain,
  faFlask,
  faChartLine
} from '@fortawesome/free-solid-svg-icons';
import { 
  faReact, 
  faNodeJs, 
  faDocker, 
  faPython,
  faJs,
  faVuejs,
  faGithub,
  faLinkedin,
  faAws,
  faGoogle
} from '@fortawesome/free-brands-svg-icons';
import { useInView } from 'react-intersection-observer';

const About = () => {
  const [ref, inView] = useInView({
    threshold: 0.1,
    triggerOnce: true,
  });

  const [activeTab, setActiveTab] = useState('overview');
  const [isHologramMode, setIsHologramMode] = useState(false);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const canvasRef = useRef(null);
  const controls = useAnimation();

  // 🎯 PERSONAL DATA - Thông tin cá nhân ultra-detailed
  const personalInfo = {
    name: "Nguyen Hoang Dinh",
    title: "Full-Stack Developer & AI Enthusiast",
    location: "Ha Noi, Vietnam",
    experience: "5+ years",
    projectsCompleted: "50+",
    clientSatisfaction: "100%",
    avatar: "/images/avatar.jpg",
    bio: "Passionate full-stack developer specializing in cutting-edge web technologies, AI/ML integration, and creating exceptional digital experiences. I transform complex ideas into elegant, scalable solutions that drive real business value.",
    mission: "To bridge the gap between innovative technology and human-centered design, creating digital solutions that not only perform exceptionally but also inspire and delight users.",
    vision: "Building the future of web development through AI-powered applications, sustainable code practices, and breakthrough user experiences.",
    values: ["Innovation", "Quality", "Collaboration", "Continuous Learning", "User-Centric Design"],
    languages: ["Vietnamese (Native)", "English (Fluent)", "Japanese (Basic)"],
    timezone: "UTC+7 (Indochina Time)",
    availability: "Available for freelance projects",
    workStyle: "Remote-first, Agile methodologies, Test-driven development"
  };

  // 💪 SKILLS MATRIX - Ma trận kỹ năng với level detail
  const skillGroups = [
    {
      category: "Frontend Development",
      icon: faPalette,
      color: "from-blue-500 to-cyan-400",
      skills: [
        { name: "React.js", level: 95, icon: faReact, experience: "4 years", projects: 25, color: "#61DAFB" },
        { name: "Vue.js", level: 88, icon: faVuejs, experience: "3 years", projects: 15, color: "#4FC08D" },
        { name: "TypeScript", level: 92, icon: faCode, experience: "3 years", projects: 20, color: "#3178C6" },
        { name: "Next.js", level: 90, icon: faRocket, experience: "2 years", projects: 12, color: "#000000" },
        { name: "Tailwind CSS", level: 96, icon: faMagic, experience: "3 years", projects: 30, color: "#06B6D4" },
        { name: "SCSS/SASS", level: 94, icon: faPalette, experience: "4 years", projects: 35, color: "#CF649A" }
      ]
    },
    {
      category: "Backend Development", 
      icon: faGem,
      color: "from-green-500 to-emerald-400",
      skills: [
        { name: "Node.js", level: 93, icon: faNodeJs, experience: "4 years", projects: 28, color: "#339933" },
        { name: "Python", level: 87, icon: faPython, experience: "3 years", projects: 18, color: "#3776AB" },
        { name: "Express.js", level: 95, icon: faRocket, experience: "4 years", projects: 25, color: "#000000" },
        { name: "MongoDB", level: 89, icon: faFlask, experience: "3 years", projects: 20, color: "#47A248" },
        { name: "PostgreSQL", level: 85, icon: faShieldAlt, experience: "2 years", projects: 15, color: "#336791" },
        { name: "GraphQL", level: 82, icon: faAtom, experience: "2 years", projects: 10, color: "#E10098" }
      ]
    },
    {
      category: "AI/ML & Data Science",
      icon: faBrain,
      color: "from-purple-500 to-pink-400", 
      skills: [
        { name: "TensorFlow", level: 78, icon: faBrain, experience: "2 years", projects: 8, color: "#FF6F00" },
        { name: "Machine Learning", level: 75, icon: faFlask, experience: "2 years", projects: 10, color: "#FF9900" },
        { name: "Data Analysis", level: 80, icon: faChartLine, experience: "2 years", projects: 12, color: "#4CAF50" },
        { name: "Neural Networks", level: 72, icon: faAtom, experience: "1.5 years", projects: 6, color: "#9C27B0" },
        { name: "Computer Vision", level: 70, icon: faEye, experience: "1 year", projects: 4, color: "#FF5722" },
        { name: "NLP", level: 68, icon: faBookOpen, experience: "1 year", projects: 5, color: "#607D8B" }
      ]
    },
    {
      category: "DevOps & Cloud",
      icon: faRocket,
      color: "from-orange-500 to-red-400",
      skills: [
        { name: "Docker", level: 88, icon: faDocker, experience: "3 years", projects: 22, color: "#2496ED" },
        { name: "AWS", level: 85, icon: faAws, experience: "2 years", projects: 15, color: "#232F3E" },
        { name: "CI/CD", level: 83, icon: faRocket, experience: "2 years", projects: 18, color: "#326CE5" },
        { name: "Linux", level: 90, icon: faShieldAlt, experience: "4 years", projects: 30, color: "#FCC624" },
        { name: "Nginx", level: 86, icon: faGlobe, experience: "3 years", projects: 20, color: "#009639" },
        { name: "Kubernetes", level: 75, icon: faInfinity, experience: "1 year", projects: 8, color: "#326CE5" }
      ]
    }
  ];

  // 🏆 ACHIEVEMENTS - Thành tựu đáng tự hào
  const achievements = [
    {
      id: 1,
      title: "🚀 Top 1% Developer on GitHub",
      description: "Ranked in top 1% of developers globally based on contributions and project quality",
      date: "2024",
      category: "Recognition",
      metrics: {
        stars: "2.5K",
        forks: "890", 
        followers: "1.2K"
      },
      icon: faGithub,
      color: "from-gray-700 to-gray-900"
    },
    {
      id: 2,
      title: "🏅 AWS Certified Solutions Architect",
      description: "Professional certification in designing distributed systems on AWS cloud platform",
      date: "2023",
      category: "Certification",
      metrics: {
        score: "95%",
        validity: "3 years",
        level: "Professional"
      },
      icon: faAws,
      color: "from-orange-500 to-yellow-400"
    },
    {
      id: 3,
      title: "💎 50+ Projects Delivered",
      description: "Successfully completed 50+ web applications with 100% client satisfaction rate",
      date: "2024",
      category: "Milestone",
      metrics: {
        projects: "50+",
        clients: "30+",
        satisfaction: "100%"
      },
      icon: faTrophy,
      color: "from-yellow-500 to-orange-400"
    },
    {
      id: 4,
      title: "🧠 AI/ML Specialist Certification",
      description: "Advanced certification in Machine Learning and Neural Network development",
      date: "2023",
      category: "Certification", 
      metrics: {
        models: "25+",
        accuracy: "94.7%",
        datasets: "100+"
      },
      icon: faBrain,
      color: "from-purple-500 to-pink-400"
    },
    {
      id: 5,
      title: "🌟 Open Source Contributor",
      description: "Active contributor to major open source projects with 500+ commits",
      date: "2024",
      category: "Community",
      metrics: {
        commits: "500+",
        repos: "15+",
        impact: "High"
      },
      icon: faHeart,
      color: "from-pink-500 to-red-400"
    },
    {
      id: 6,
      title: "⚡ Performance Optimization Expert", 
      description: "Specialized in optimizing web applications for maximum speed and efficiency",
      date: "2023",
      category: "Expertise",
      metrics: {
        improvements: "60%",
        projects: "20+",
        techniques: "Advanced"
      },
      icon: faBolt,
      color: "from-blue-500 to-cyan-400"
    }
  ];

  // 💼 EXPERIENCE TIMELINE - Lịch sử công việc chi tiết
  const experienceTimeline = [
    {
      id: 1,
      position: "Senior Full-Stack Developer",
      company: "TechCorp Solutions",
      location: "Ha Noi, Vietnam",
      duration: "2022 - Present",
      type: "Full-time",
      responsibilities: [
        "🚀 Lead development of enterprise web applications using React.js and Node.js",
        "🤖 Integrate AI/ML models into production applications for enhanced user experience", 
        "⚡ Optimize application performance resulting in 60% faster load times",
        "👥 Mentor junior developers and conduct code reviews",
        "🔧 Architect scalable microservices using Docker and Kubernetes"
      ],
      technologies: ["React", "Node.js", "TypeScript", "AWS", "Docker", "MongoDB"],
      achievements: [
        "Reduced server costs by 40% through optimization",
        "Led team of 5 developers on major project",
        "Implemented CI/CD pipeline reducing deployment time by 80%"
      ],
      companyLogo: "/images/techcorp-logo.png",
      companySize: "500+ employees",
      industry: "Technology Consulting"
    },
    {
      id: 2,
      position: "Full-Stack Developer",
      company: "StartupX Innovation",
      location: "Remote",
      duration: "2021 - 2022", 
      type: "Contract",
      responsibilities: [
        "🌐 Developed responsive web applications from concept to deployment",
        "📊 Built data visualization dashboards using D3.js and Chart.js",
        "🔐 Implemented secure authentication systems with JWT and OAuth",
        "📱 Created mobile-responsive interfaces with modern CSS frameworks",
        "🧪 Established testing frameworks and quality assurance processes"
      ],
      technologies: ["Vue.js", "Express.js", "PostgreSQL", "Redis", "Docker"],
      achievements: [
        "Delivered 3 major projects on time and under budget",
        "Improved user engagement by 85% through UX enhancements",
        "Established development workflow adopted company-wide"
      ],
      companyLogo: "/images/startupx-logo.png",
      companySize: "50-100 employees",
      industry: "Financial Technology"
    },
    {
      id: 3,
      position: "Frontend Developer",
      company: "DigitalCraft Agency",
      location: "Ha Noi, Vietnam",
      duration: "2020 - 2021",
      type: "Full-time",
      responsibilities: [
        "🎨 Created stunning user interfaces for client projects",
        "⚡ Optimized frontend performance and accessibility standards",
        "🤝 Collaborated closely with designers and backend developers",
        "📚 Maintained comprehensive documentation for all projects",
        "🔄 Implemented modern build tools and development workflows"
      ],
      technologies: ["React", "SCSS", "Webpack", "Bootstrap", "jQuery"],
      achievements: [
        "Completed 15+ client projects with excellent feedback",
        "Reduced page load times by average of 45%",
        "Mentored 2 junior developers in modern frontend practices"
      ],
      companyLogo: "/images/digitalcraft-logo.png", 
      companySize: "20-50 employees",
      industry: "Digital Marketing"
    },
    {
      id: 4,
      position: "Junior Web Developer",
      company: "WebSolutions Ltd",
      location: "Ha Noi, Vietnam", 
      duration: "2019 - 2020",
      type: "Full-time",
      responsibilities: [
        "💻 Developed and maintained company websites and web applications",
        "🐛 Fixed bugs and implemented new features based on client feedback",
        "📝 Wrote clean, well-documented code following best practices",
        "🎓 Participated in code reviews and team learning sessions",
        "🔧 Assisted in server maintenance and deployment processes"
      ],
      technologies: ["HTML5", "CSS3", "JavaScript", "PHP", "MySQL"],
      achievements: [
        "Successfully completed training program in 3 months",
        "Contributed to 10+ client projects",
        "Learned modern development practices and tools"
      ],
      companyLogo: "/images/websolutions-logo.png",
      companySize: "10-20 employees", 
      industry: "Web Development Services"
    }
  ];

  // Hologram Effect
  useEffect(() => {
    if (isHologramMode && canvasRef.current) {
      const canvas = canvasRef.current;
      const ctx = canvas.getContext('2d');
      
      const resizeCanvas = () => {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
      };
      
      resizeCanvas();
      window.addEventListener('resize', resizeCanvas);

      const particles = [];
      const particleCount = 150;

      for (let i = 0; i < particleCount; i++) {
        particles.push({
          x: Math.random() * canvas.width,
          y: Math.random() * canvas.height,
          vx: (Math.random() - 0.5) * 2,
          vy: (Math.random() - 0.5) * 2,
          radius: Math.random() * 2 + 1,
          hue: Math.random() * 360,
          life: Math.random() * 100 + 50
        });
      }

      const animate = () => {
        ctx.fillStyle = 'rgba(0, 0, 0, 0.05)';
        ctx.fillRect(0, 0, canvas.width, canvas.height);

        particles.forEach((particle, index) => {
          particle.x += particle.vx;
          particle.y += particle.vy;
          particle.life--;

          if (particle.x < 0) particle.x = canvas.width;
          if (particle.x > canvas.width) particle.x = 0;
          if (particle.y < 0) particle.y = canvas.height;
          if (particle.y > canvas.height) particle.y = 0;

          ctx.beginPath();
          ctx.arc(particle.x, particle.y, particle.radius, 0, Math.PI * 2);
          
          const gradient = ctx.createRadialGradient(
            particle.x, particle.y, 0,
            particle.x, particle.y, particle.radius * 4
          );
          gradient.addColorStop(0, `hsla(${particle.hue}, 100%, 60%, 0.8)`);
          gradient.addColorStop(1, `hsla(${particle.hue}, 100%, 60%, 0)`);
          
          ctx.fillStyle = gradient;
          ctx.fill();

          if (particle.life <= 0) {
            particles[index] = {
              x: Math.random() * canvas.width,
              y: Math.random() * canvas.height,
              vx: (Math.random() - 0.5) * 2,
              vy: (Math.random() - 0.5) * 2,
              radius: Math.random() * 2 + 1,
              hue: Math.random() * 360,
              life: Math.random() * 100 + 50
            };
          }
        });

        requestAnimationFrame(animate);
      };

      animate();

      return () => {
        window.removeEventListener('resize', resizeCanvas);
      };
    }
  }, [isHologramMode]);

  // Handle mouse movement
  const handleMouseMove = (e) => {
    setMousePosition({ x: e.clientX, y: e.clientY });
  };

  // 💎 HOLOGRAPHIC CARD COMPONENT - Component card holographic
  const HolographicCard = ({ children, className = "", delay = 0, ...props }) => {
    const [isHovered, setIsHovered] = useState(false);
    const cardRef = useRef(null);

    return (
      <motion.div
        ref={cardRef}
        className={`group relative ${className}`}
        initial={{ opacity: 0, y: 50, rotateX: -15 }}
        animate={inView ? { opacity: 1, y: 0, rotateX: 0 } : { opacity: 0, y: 50, rotateX: -15 }}
        transition={{ delay, duration: 0.6 }}
        onHoverStart={() => setIsHovered(true)}
        onHoverEnd={() => setIsHovered(false)}
        style={{
          transform: isHovered 
            ? `perspective(1000px) rotateX(${(mousePosition.y - window.innerHeight/2) * 0.01}deg) rotateY(${(mousePosition.x - window.innerWidth/2) * 0.01}deg) scale3d(1.02, 1.02, 1.02)`
            : 'perspective(1000px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)',
          transition: 'transform 0.3s ease-out'
        }}
        {...props}
      >
        {/* Holographic Background */}
        <div className="absolute inset-0 bg-gradient-to-br from-white/10 via-white/5 to-transparent rounded-3xl backdrop-blur-xl border border-white/20 shadow-2xl">
          <div className="absolute inset-0 bg-gradient-to-br from-blue-500/10 via-purple-500/10 to-cyan-500/10 rounded-3xl opacity-60" />
          <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent rounded-3xl" />
        </div>

        {/* Content */}
        <div className="relative z-10 p-8">
          {children}
        </div>
      </motion.div>
    );
  };

  return (
    <section id="about" className="relative py-20 lg:py-32 overflow-hidden" onMouseMove={handleMouseMove}>
      {/* Hologram Background */}
      {isHologramMode && (
        <canvas
          ref={canvasRef}
          className="absolute inset-0 z-0 opacity-30"
          style={{ mixBlendMode: 'screen' }}
        />
      )}

      {/* Background Gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-gray-900 via-blue-900/20 to-purple-900/20" />
      <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />

      {/* Floating Particles */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {[...Array(20)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-2 h-2 bg-blue-400/30 rounded-full"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
            animate={{
              y: [0, -100, 0],
              opacity: [0.3, 1, 0.3],
            }}
            transition={{
              duration: 3 + Math.random() * 2,
              repeat: Infinity,
              delay: Math.random() * 2,
            }}
          />
        ))}
      </div>

      <div ref={ref} className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* 🎯 LEGENDARY HEADER */}
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: -50 }}
          animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: -50 }}
          transition={{ duration: 0.8 }}
        >
          <motion.div
            className="inline-flex items-center justify-center px-6 py-3 bg-gradient-to-r from-blue-500/20 to-purple-500/20 border border-blue-500/30 rounded-full mb-6"
            initial={{ scale: 0 }}
            animate={inView ? { scale: 1 } : { scale: 0 }}
            transition={{ delay: 0.2, type: "spring", damping: 20 }}
          >
            <FontAwesomeIcon icon={faUser} className="text-blue-400 mr-2" />
            <span className="text-blue-400 font-semibold">PERSONAL PROFILE</span>
          </motion.div>

          <motion.h2
            className="text-5xl md:text-6xl lg:text-7xl font-bold mb-6"
            initial={{ opacity: 0, scale: 0.5 }}
            animate={inView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.5 }}
            transition={{ delay: 0.4, duration: 0.8 }}
          >
            <span className="bg-gradient-to-r from-blue-400 via-purple-400 to-cyan-400 bg-clip-text text-transparent">
              👨‍💻 About Me
            </span>
            <br />
            <span className="text-white">& My Journey</span>
          </motion.h2>

          <motion.p
            className="text-xl md:text-2xl text-gray-300 max-w-4xl mx-auto mb-8"
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ delay: 0.6 }}
          >
            Discover my <span className="text-transparent bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text font-semibold">professional journey</span>, technical expertise, và những thành tựu đáng tự hào
          </motion.p>

          {/* Control Panel */}
          <motion.div
            className="flex flex-wrap items-center justify-center gap-4"
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ delay: 0.8 }}
          >
            {/* Hologram Mode Toggle */}
            <motion.button
              className={`px-6 py-3 rounded-xl font-semibold transition-all duration-300 ${
                isHologramMode 
                  ? 'bg-gradient-to-r from-blue-500 to-purple-500 text-white' 
                  : 'bg-white/10 border border-white/20 text-white hover:bg-white/20'
              }`}
              onClick={() => setIsHologramMode(!isHologramMode)}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              ✨ Hologram Mode
            </motion.button>
          </motion.div>
        </motion.div>

        {/* 📋 TAB NAVIGATION */}
        <motion.div
          className="flex flex-wrap justify-center gap-4 mb-16"
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ delay: 1 }}
        >
          {[
            { id: 'overview', label: '🔍 Overview', icon: faUser },
            { id: 'skills', label: '💪 Skills', icon: faCode },
            { id: 'achievements', label: '🏆 Achievements', icon: faTrophy },
            { id: 'experience', label: '💼 Experience', icon: faGraduationCap }
          ].map((tab, index) => (
            <motion.button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`group relative px-6 py-4 rounded-2xl font-semibold transition-all duration-500 ${
                activeTab === tab.id
                  ? 'bg-gradient-to-r from-blue-500 to-purple-600 text-white shadow-2xl scale-105'
                  : 'bg-white/5 text-gray-400 border border-white/10 hover:bg-white/10 hover:text-white hover:border-white/30'
              }`}
              initial={{ opacity: 0, scale: 0 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 1 + index * 0.1 }}
              whileHover={{ scale: 1.05, y: -2 }}
              whileTap={{ scale: 0.95 }}
            >
              <FontAwesomeIcon icon={tab.icon} className="mr-3" />
              {tab.label}
              <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-blue-500/20 to-purple-500/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 -z-10" />
            </motion.button>
          ))}
        </motion.div>

        {/* 📱 TAB CONTENT */}
        <AnimatePresence mode="wait">
          {activeTab === 'overview' && (
            <motion.div
              key="overview"
              initial={{ opacity: 0, x: -100 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 100 }}
              transition={{ duration: 0.5 }}
              className="grid lg:grid-cols-2 gap-8"
            >
              {/* Personal Info Card */}
              <HolographicCard delay={0.1}>
                <div className="text-center mb-8">
                  <div className="w-32 h-32 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center mx-auto mb-6 text-6xl">
                    👨‍💻
                  </div>
                  <h3 className="text-3xl font-bold text-white mb-2">{personalInfo.name}</h3>
                  <p className="text-blue-400 text-lg font-medium mb-4">{personalInfo.title}</p>
                  <div className="flex items-center justify-center text-gray-400 mb-6">
                    <FontAwesomeIcon icon={faMapMarkerAlt} className="mr-2" />
                    {personalInfo.location}
                  </div>
                </div>

                <div className="space-y-4">
                  <p className="text-gray-300 leading-relaxed">{personalInfo.bio}</p>
                  
                  <div className="grid grid-cols-2 gap-4 pt-4 border-t border-white/10">
                    <div className="text-center">
                      <div className="text-2xl font-bold text-blue-400">{personalInfo.experience}</div>
                      <div className="text-sm text-gray-400">Experience</div>
                    </div>
                    <div className="text-center">
                      <div className="text-2xl font-bold text-green-400">{personalInfo.projectsCompleted}</div>
                      <div className="text-sm text-gray-400">Projects</div>
                    </div>
                  </div>
                </div>
              </HolographicCard>

              {/* Mission & Vision Card */}
              <HolographicCard delay={0.2}>
                <div className="space-y-6">
                  <div>
                    <h3 className="text-2xl font-bold text-white mb-4 flex items-center">
                      <FontAwesomeIcon icon={faRocket} className="mr-3 text-blue-400" />
                      Mission
                    </h3>
                    <p className="text-gray-300 leading-relaxed">{personalInfo.mission}</p>
                  </div>

                  <div>
                    <h3 className="text-2xl font-bold text-white mb-4 flex items-center">
                      <FontAwesomeIcon icon={faLightbulb} className="mr-3 text-purple-400" />
                      Vision
                    </h3>
                    <p className="text-gray-300 leading-relaxed">{personalInfo.vision}</p>
                  </div>

                  <div>
                    <h3 className="text-2xl font-bold text-white mb-4 flex items-center">
                      <FontAwesomeIcon icon={faHeart} className="mr-3 text-red-400" />
                      Core Values
                    </h3>
                    <div className="flex flex-wrap gap-2">
                      {personalInfo.values.map((value, index) => (
                        <span
                          key={index}
                          className="px-3 py-1 bg-white/10 border border-white/20 rounded-full text-sm text-white"
                        >
                          {value}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </HolographicCard>
            </motion.div>
          )}

          {activeTab === 'skills' && (
            <motion.div
              key="skills"
              initial={{ opacity: 0, x: -100 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 100 }}
              transition={{ duration: 0.5 }}
              className="space-y-8"
            >
              {skillGroups.map((group, groupIndex) => (
                <HolographicCard key={group.category} delay={groupIndex * 0.1}>
                  <div className="mb-6">
                    <h3 className={`text-2xl font-bold text-white mb-4 flex items-center`}>
                      <div className={`w-10 h-10 bg-gradient-to-r ${group.color} rounded-xl flex items-center justify-center mr-4`}>
                        <FontAwesomeIcon icon={group.icon} className="text-white" />
                      </div>
                      {group.category}
                    </h3>
                  </div>

                  <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {group.skills.map((skill, skillIndex) => (
                      <motion.div
                        key={skill.name}
                        className="bg-white/5 border border-white/10 rounded-xl p-4 hover:bg-white/10 transition-all duration-300"
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: groupIndex * 0.1 + skillIndex * 0.05 }}
                        whileHover={{ scale: 1.05 }}
                      >
                        <div className="flex items-center mb-3">
                          <FontAwesomeIcon 
                            icon={skill.icon} 
                            className="text-2xl mr-3" 
                            style={{ color: skill.color }} 
                          />
                          <div>
                            <h4 className="text-white font-semibold">{skill.name}</h4>
                            <p className="text-xs text-gray-400">{skill.experience}</p>
                          </div>
                        </div>

                        <div className="mb-3">
                          <div className="flex justify-between items-center mb-1">
                            <span className="text-xs text-gray-400">Proficiency</span>
                            <span className="text-xs text-white font-bold">{skill.level}%</span>
                          </div>
                          <div className="w-full bg-white/10 rounded-full h-2">
                            <motion.div
                              className="h-2 rounded-full"
                              style={{ backgroundColor: skill.color }}
                              initial={{ width: 0 }}
                              animate={{ width: `${skill.level}%` }}
                              transition={{ delay: groupIndex * 0.1 + skillIndex * 0.05 + 0.5, duration: 1 }}
                            />
                          </div>
                        </div>

                        <div className="text-xs text-gray-400">
                          {skill.projects} projects completed
                        </div>
                      </motion.div>
                    ))}
                  </div>
                </HolographicCard>
              ))}
            </motion.div>
          )}

          {activeTab === 'achievements' && (
            <motion.div
              key="achievements"
              initial={{ opacity: 0, x: -100 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 100 }}
              transition={{ duration: 0.5 }}
              className="grid md:grid-cols-2 lg:grid-cols-3 gap-6"
            >
              {achievements.map((achievement, index) => (
                <HolographicCard key={achievement.id} delay={index * 0.1}>
                  <div className="text-center">
                    <motion.div
                      className={`w-16 h-16 bg-gradient-to-r ${achievement.color} rounded-xl flex items-center justify-center mx-auto mb-4`}
                      animate={{ rotate: 360 }}
                      transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                    >
                      <FontAwesomeIcon icon={achievement.icon} className="text-2xl text-white" />
                    </motion.div>

                    <h3 className="text-xl font-bold text-white mb-3">{achievement.title}</h3>
                    <p className="text-gray-300 text-sm mb-4 leading-relaxed">{achievement.description}</p>
                    
                    <div className="text-sm text-gray-400 mb-4">
                      <span className="inline-flex items-center px-2 py-1 bg-white/10 rounded-full">
                        <FontAwesomeIcon icon={faCalendarAlt} className="mr-1" />
                        {achievement.date}
                      </span>
                    </div>

                    <div className="grid grid-cols-1 gap-2">
                      {Object.entries(achievement.metrics).map(([key, value]) => (
                        <div key={key} className="flex justify-between text-sm">
                          <span className="text-gray-400 capitalize">{key}:</span>
                          <span className="text-white font-semibold">{value}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </HolographicCard>
              ))}
            </motion.div>
          )}

          {activeTab === 'experience' && (
            <motion.div
              key="experience"
              initial={{ opacity: 0, x: -100 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 100 }}
              transition={{ duration: 0.5 }}
              className="space-y-8"
            >
              {experienceTimeline.map((experience, index) => (
                <HolographicCard key={experience.id} delay={index * 0.1}>
                  <div className="grid lg:grid-cols-3 gap-6">
                    {/* Company Info */}
                    <div className="lg:col-span-1">
                      <div className="text-center lg:text-left">
                        <div className="w-16 h-16 bg-gradient-to-r from-blue-500 to-purple-600 rounded-xl flex items-center justify-center mx-auto lg:mx-0 mb-4 text-2xl">
                          🏢
                        </div>
                        <h3 className="text-xl font-bold text-white mb-2">{experience.position}</h3>
                        <p className="text-blue-400 font-medium mb-2">{experience.company}</p>
                        <div className="text-sm text-gray-400 space-y-1">
                          <div className="flex items-center justify-center lg:justify-start">
                            <FontAwesomeIcon icon={faMapMarkerAlt} className="mr-2" />
                            {experience.location}
                          </div>
                          <div className="flex items-center justify-center lg:justify-start">
                            <FontAwesomeIcon icon={faCalendarAlt} className="mr-2" />
                            {experience.duration}
                          </div>
                          <div className="inline-flex items-center px-2 py-1 bg-white/10 rounded-full">
                            {experience.type}
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Responsibilities & Achievements */}
                    <div className="lg:col-span-2">
                      <div className="space-y-6">
                        <div>
                          <h4 className="text-lg font-bold text-white mb-3">Key Responsibilities</h4>
                          <ul className="space-y-2">
                            {experience.responsibilities.map((responsibility, i) => (
                              <li key={i} className="text-gray-300 text-sm flex items-start">
                                <span className="mr-2 mt-1">•</span>
                                {responsibility}
                              </li>
                            ))}
                          </ul>
                        </div>

                        <div>
                          <h4 className="text-lg font-bold text-white mb-3">Technologies Used</h4>
                          <div className="flex flex-wrap gap-2">
                            {experience.technologies.map((tech, i) => (
                              <span
                                key={i}
                                className="px-3 py-1 bg-white/10 border border-white/20 rounded-full text-sm text-white"
                              >
                                {tech}
                              </span>
                            ))}
                          </div>
                        </div>

                        <div>
                          <h4 className="text-lg font-bold text-white mb-3">Key Achievements</h4>
                          <ul className="space-y-2">
                            {experience.achievements.map((achievement, i) => (
                              <li key={i} className="text-green-400 text-sm flex items-start">
                                <FontAwesomeIcon icon={faStar} className="mr-2 mt-1" />
                                {achievement}
                              </li>
                            ))}
                          </ul>
                        </div>
                      </div>
                    </div>
                  </div>
                </HolographicCard>
              ))}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
};

export default About;