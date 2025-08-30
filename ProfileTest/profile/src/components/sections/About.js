import React, { useState, useRef, useEffect } from 'react';
import { motion, useInView, useMotionValue, useTransform, useAnimation } from 'framer-motion';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { 
  faCode, faLaptopCode, faMobile, faDatabase, faCloud, faRobot, 
  faGraduationCap, faTrophy, faCertificate, faHeart,
  faDownload, faEye, faChartLine, faLightbulb,
  faRocket, faGem, faAtom, faGlobe
} from '@fortawesome/free-solid-svg-icons';
import { faGithub, faLinkedin, faReact } from '@fortawesome/free-brands-svg-icons';

const About = () => {
  const [aboutData, setAboutData] = useState({
    overview: {
      title: "Về Tôi",
      subtitle: "Passionate Developer & Tech Innovator",
      description: `
        Tôi là một Senior Full-Stack Developer với đam mê mãnh liệt về việc tạo ra những 
        giải pháp công nghệ sáng tạo và có tác động tích cực. Với hơn 7 năm kinh nghiệm 
        trong ngành IT, tôi đã tham gia phát triển hàng trăm dự án từ startup đến enterprise, 
        luôn đặt chất lượng và trải nghiệm người dùng lên hàng đầu.
      `,
      personalInfo: {
        fullName: "Nguyễn Hoàng Dinh",
        email: "nhdinh.dev@gmail.com",
        phone: "+84 123 456 789",
        location: "Hồ Chí Minh, Việt Nam",
        experience: "7+ năm",
        projects: "150+ dự án",
        specialization: "Full-Stack Development & AI Integration"
      }
    },
    skills: [
      {
        category: "Frontend Development",
        icon: faCode,
        color: "#61DAFB",
        skills: [
          { name: "React/Next.js", level: 95, experience: "5+ years" },
          { name: "Vue.js/Nuxt.js", level: 88, experience: "3+ years" },
          { name: "TypeScript", level: 92, experience: "4+ years" },
          { name: "JavaScript ES6+", level: 98, experience: "7+ years" },
          { name: "HTML5/CSS3", level: 96, experience: "7+ years" },
          { name: "Tailwind CSS", level: 94, experience: "3+ years" },
          { name: "SCSS/SASS", level: 90, experience: "5+ years" },
          { name: "React Native", level: 85, experience: "2+ years" }
        ]
      },
      {
        category: "Backend Development",
        icon: faDatabase,
        color: "#68A063",
        skills: [
          { name: "Node.js/Express", level: 94, experience: "5+ years" },
          { name: "Python/Django", level: 89, experience: "3+ years" },
          { name: "Java/Spring Boot", level: 82, experience: "2+ years" },
          { name: "C#/.NET Core", level: 78, experience: "2+ years" },
          { name: "PostgreSQL", level: 91, experience: "4+ years" },
          { name: "MongoDB", level: 88, experience: "3+ years" },
          { name: "Redis", level: 85, experience: "2+ years" },
          { name: "GraphQL", level: 83, experience: "2+ years" }
        ]
      },
      {
        category: "DevOps & Cloud",
        icon: faCloud,
        color: "#FF9500",
        skills: [
          { name: "AWS Services", level: 87, experience: "3+ years" },
          { name: "Docker/Kubernetes", level: 84, experience: "2+ years" },
          { name: "CI/CD Pipelines", level: 86, experience: "3+ years" },
          { name: "Terraform", level: 79, experience: "1+ years" },
          { name: "Nginx/Apache", level: 88, experience: "4+ years" },
          { name: "Linux/Ubuntu", level: 92, experience: "5+ years" },
          { name: "Git/GitLab/GitHub", level: 96, experience: "7+ years" },
          { name: "Jenkins", level: 82, experience: "2+ years" }
        ]
      },
      {
        category: "AI & Machine Learning",
        icon: faRobot,
        color: "#E74C3C",
        skills: [
          { name: "OpenAI API", level: 88, experience: "2+ years" },
          { name: "LangChain", level: 85, experience: "1+ years" },
          { name: "TensorFlow", level: 78, experience: "1+ years" },
          { name: "Prompt Engineering", level: 92, experience: "2+ years" },
          { name: "RAG Systems", level: 84, experience: "1+ years" },
          { name: "Vector Databases", level: 81, experience: "1+ years" },
          { name: "AI Chatbots", level: 89, experience: "2+ years" },
          { name: "Computer Vision", level: 76, experience: "1+ years" }
        ]
      }
    ],
    achievements: [
      {
        title: "Top Performer Award",
        organization: "FPT Software",
        year: "2023",
        description: "Được vinh danh là nhân viên xuất sắc nhất của năm",
        icon: faTrophy,
        color: "#FFD700"
      },
      {
        title: "AWS Certified Developer",
        organization: "Amazon Web Services",
        year: "2022",
        description: "Chứng chỉ AWS Certified Developer - Associate",
        icon: faCertificate,
        color: "#FF9500"
      },
      {
        title: "React Expert Certification",
        organization: "Meta (Facebook)",
        year: "2021",
        description: "Chứng chỉ React Developer Expert từ Meta",
        icon: faReact,
        color: "#61DAFB"
      },
      {
        title: "Hackathon Winner",
        organization: "Tech Innovation 2020",
        year: "2020",
        description: "Giải nhất cuộc thi phát triển ứng dụng AI",
        icon: faLightbulb,
        color: "#4ECDC4"
      }
    ],
    hobbies: [
      { name: "Coding & Development", icon: faCode, color: "#61DAFB" },
      { name: "AI Research", icon: faRobot, color: "#E74C3C" },
      { name: "Open Source", icon: faGithub, color: "#24292E" },
      { name: "Tech Blogging", icon: faLightbulb, color: "#3776AB" },
      { name: "Photography", icon: faEye, color: "#8E44AD" },
      { name: "Gaming", icon: faGem, color: "#E67E22" }
    ]
  });

  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, threshold: 0.1 });
  const controls = useAnimation();
  
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const rotateX = useTransform(mouseY, [-300, 300], [5, -5]);
  const rotateY = useTransform(mouseX, [-300, 300], [-5, 5]);

  useEffect(() => {
    if (isInView) {
      controls.start("visible");
    }
  }, [isInView, controls]);

  useEffect(() => {
    const handleMouseMove = (e) => {
      if (ref.current) {
        const rect = ref.current.getBoundingClientRect();
        const centerX = rect.left + rect.width / 2;
        const centerY = rect.top + rect.height / 2;
        mouseX.set(e.clientX - centerX);
        mouseY.set(e.clientY - centerY);
      }
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, [mouseX, mouseY]);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        delayChildren: 0.3,
        staggerChildren: 0.2
      }
    }
  };

  const itemVariants = {
    hidden: { y: 50, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.8,
        ease: [0.6, -0.05, 0.01, 0.99]
      }
    }
  };

  const skillVariants = {
    hidden: { width: 0 },
    visible: (level) => ({
      width: `${level}%`,
      transition: {
        duration: 1.5,
        ease: "easeOut",
        delay: 0.5
      }
    })
  };

  return (
    <section 
      ref={ref}
      id="about" 
      className="relative min-h-screen py-20 overflow-hidden"
      style={{ 
        background: "linear-gradient(135deg, #0f0f23 0%, #1a1a3e 50%, #0f0f23 100%)" 
      }}
    >
      {/* Advanced Background Effects */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {/* Neural Network Background */}
        <motion.div
          className="absolute inset-0 opacity-10"
          style={{
            backgroundImage: `
              radial-gradient(circle at 20% 20%, rgba(59, 130, 246, 0.3) 0%, transparent 50%),
              radial-gradient(circle at 80% 80%, rgba(139, 92, 246, 0.3) 0%, transparent 50%),
              radial-gradient(circle at 40% 60%, rgba(16, 185, 129, 0.2) 0%, transparent 50%)
            `
          }}
          animate={{
            scale: [1, 1.1, 1],
            rotate: [0, 5, 0]
          }}
          transition={{
            duration: 20,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />

        {/* Floating Code Blocks */}
        {[...Array(6)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-20 h-20 opacity-5"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              background: "linear-gradient(45deg, rgba(59, 130, 246, 0.2), rgba(139, 92, 246, 0.2))"
            }}
            animate={{
              y: [0, -100, 0],
              rotate: [0, 360],
              scale: [1, 1.2, 1]
            }}
            transition={{
              duration: 10 + i * 2,
              repeat: Infinity,
              ease: "easeInOut",
              delay: i * 2
            }}
          />
        ))}
      </div>

      <div className="relative z-10 max-w-8xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Enhanced Header */}
        <motion.div
          className="text-center mb-20"
          variants={containerVariants}
          initial="hidden"
          animate={controls}
        >
          <motion.h2
            className="text-6xl md:text-8xl font-bold mb-8"
            variants={itemVariants}
          >
            <span className="gradient-text">Về Tôi</span>
          </motion.h2>
          <motion.p
            className="text-2xl md:text-3xl text-blue-400 font-medium tracking-wide animate-glow"
            variants={itemVariants}
          >
            {aboutData.overview.subtitle}
          </motion.p>
          <motion.div
            className="w-32 h-1 bg-gradient-to-r from-blue-500 to-purple-600 mx-auto mt-8 rounded-full"
            variants={itemVariants}
            animate={{
              scaleX: [1, 1.5, 1],
              opacity: [0.5, 1, 0.5]
            }}
            transition={{
              duration: 3,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          />
        </motion.div>

        {/* Enhanced Overview Section */}
        <motion.div
          className="grid lg:grid-cols-2 gap-20 items-center mb-32"
          variants={containerVariants}
          initial="hidden"
          animate={controls}
        >
          {/* Left: 3D Profile Card */}
          <motion.div
            className="relative"
            style={{ rotateX, rotateY, transformStyle: "preserve-3d" }}
            variants={itemVariants}
          >
            <div className="relative perspective-1000">
              {/* Main Profile Card */}
              <motion.div
                className="glass-effect-strong rounded-3xl p-10 relative overflow-hidden"
                whileHover={{ scale: 1.02, z: 50 }}
                animate={{
                  boxShadow: [
                    "0 0 50px rgba(59, 130, 246, 0.3)",
                    "0 0 100px rgba(139, 92, 246, 0.5)",
                    "0 0 50px rgba(59, 130, 246, 0.3)"
                  ]
                }}
                transition={{ duration: 4, repeat: Infinity }}
              >
                {/* Dynamic Background Pattern */}
                <motion.div
                  className="absolute inset-0 opacity-10"
                  style={{
                    background: "conic-gradient(from 0deg, transparent, rgba(59, 130, 246, 0.5), transparent, rgba(139, 92, 246, 0.5), transparent)"
                  }}
                  animate={{ rotate: 360 }}
                  transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
                />

                {/* Profile Avatar */}
                <motion.div
                  className="w-48 h-48 mx-auto mb-8 relative"
                  whileHover={{ scale: 1.1 }}
                >
                  <motion.div
                    className="w-full h-full rounded-full bg-gradient-to-br from-blue-500/30 via-purple-600/30 to-green-500/30 flex items-center justify-center text-6xl font-bold text-white relative overflow-hidden"
                    animate={{
                      background: [
                        "linear-gradient(135deg, rgba(59, 130, 246, 0.3), rgba(139, 92, 246, 0.3))",
                        "linear-gradient(135deg, rgba(139, 92, 246, 0.3), rgba(16, 185, 129, 0.3))",
                        "linear-gradient(135deg, rgba(16, 185, 129, 0.3), rgba(59, 130, 246, 0.3))"
                      ]
                    }}
                    transition={{ duration: 6, repeat: Infinity }}
                  >
                    NH
                    {/* Scanning Effect */}
                    <motion.div
                      className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-transparent via-cyan-400 to-transparent"
                      animate={{ y: [0, 192, 0] }}
                      transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
                    />
                  </motion.div>
                  
                  {/* Orbiting Icons */}
                  {[faCode, faLaptopCode, faDatabase, faCloud].map((icon, index) => (
                    <motion.div
                      key={index}
                      className="absolute w-12 h-12 glass-effect rounded-full flex items-center justify-center text-blue-400"
                      style={{
                        top: '50%',
                        left: '50%',
                        transformOrigin: '6px 6px'
                      }}
                      animate={{
                        rotate: 360,
                        x: Math.cos(index * Math.PI / 2) * 120,
                        y: Math.sin(index * Math.PI / 2) * 120
                      }}
                      transition={{
                        rotate: { duration: 10, repeat: Infinity, ease: "linear" },
                        x: { duration: 8 + index, repeat: Infinity, ease: "easeInOut" },
                        y: { duration: 8 + index, repeat: Infinity, ease: "easeInOut" }
                      }}
                    >
                      <FontAwesomeIcon icon={icon} />
                    </motion.div>
                  ))}
                </motion.div>

                {/* Personal Info */}
                <div className="space-y-4 relative z-10">
                  <h3 className="text-3xl font-bold text-white text-center gradient-text">
                    {aboutData.overview.personalInfo.fullName}
                  </h3>
                  <p className="text-blue-400 text-xl text-center font-medium">
                    {aboutData.overview.personalInfo.specialization}
                  </p>
                  
                  <div className="grid grid-cols-2 gap-4 mt-8">
                    {Object.entries(aboutData.overview.personalInfo).slice(3).map(([key, value], index) => (
                      <motion.div
                        key={key}
                        className="glass-effect rounded-xl p-4 text-center"
                        whileHover={{ scale: 1.05, y: -5 }}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: index * 0.2 }}
                      >
                        <div className="text-2xl font-bold gradient-text">{value}</div>
                        <div className="text-sm text-gray-400 capitalize">{key.replace(/([A-Z])/g, ' $1')}</div>
                      </motion.div>
                    ))}
                  </div>
                </div>
              </motion.div>

              {/* Contact Quick Actions */}
              <motion.div
                className="flex justify-center space-x-6 mt-8"
                variants={itemVariants}
              >
                <motion.a
                  href="mailto:nhdinh.dev@gmail.com"
                  className="btn-primary"
                  whileHover={{ scale: 1.05, y: -2 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <FontAwesomeIcon icon={faDownload} className="mr-2" />
                  Tải CV
                </motion.a>
                <motion.a
                  href="https://linkedin.com/in/nhdinh"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-secondary"
                  whileHover={{ scale: 1.05, y: -2 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <FontAwesomeIcon icon={faLinkedin} className="mr-2" />
                  LinkedIn
                </motion.a>
              </motion.div>
            </div>
          </motion.div>

          {/* Right: Enhanced Description */}
          <motion.div className="space-y-8" variants={itemVariants}>
            <motion.div
              className="glass-effect rounded-2xl p-8"
              whileHover={{ scale: 1.02 }}
            >
              <h3 className="text-4xl font-bold text-white mb-6 gradient-text">
                Câu Chuyện Của Tôi
              </h3>
              <p className="text-gray-300 text-xl leading-relaxed mb-6">
                {aboutData.overview.description}
              </p>
              
              {/* Key Highlights */}
              <div className="grid grid-cols-2 gap-4">
                {[
                  { icon: faRocket, text: "150+ Dự án thành công", color: "#4ECDC4" },
                  { icon: faGlobe, text: "7+ Năm kinh nghiệm", color: "#FF6B6B" },
                  { icon: faAtom, text: "AI & ML Expert", color: "#9B59B6" },
                  { icon: faGem, text: "Full-Stack Master", color: "#F39C12" }
                ].map((item, index) => (
                  <motion.div
                    key={index}
                    className="flex items-center space-x-3 p-4 glass-effect rounded-xl"
                    whileHover={{ scale: 1.05, x: 10 }}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.2 }}
                  >
                    <FontAwesomeIcon 
                      icon={item.icon} 
                      className="text-2xl"
                      style={{ color: item.color }}
                    />
                    <span className="text-white font-medium">{item.text}</span>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </motion.div>
        </motion.div>

        {/* Enhanced Skills Section */}
        <motion.div
          className="mb-32"
          variants={containerVariants}
          initial="hidden"
          animate={controls}
        >
          <motion.h3
            className="text-5xl md:text-6xl font-bold text-center mb-16 gradient-text"
            variants={itemVariants}
          >
            Kỹ Năng Chuyên Môn
          </motion.h3>

          <div className="grid md:grid-cols-2 gap-12">
            {aboutData.skills.map((category, categoryIndex) => (
              <motion.div
                key={categoryIndex}
                className="glass-effect-strong rounded-2xl p-8"
                variants={itemVariants}
                whileHover={{ scale: 1.02, rotateX: 5 }}
                style={{ transformStyle: "preserve-3d" }}
              >
                <div className="flex items-center mb-8">
                  <div
                    className="w-16 h-16 rounded-2xl flex items-center justify-center mr-4"
                    style={{ backgroundColor: `${category.color}20` }}
                  >
                    <FontAwesomeIcon 
                      icon={category.icon} 
                      className="text-3xl"
                      style={{ color: category.color }}
                    />
                  </div>
                  <h4 className="text-3xl font-bold text-white">{category.category}</h4>
                </div>

                <div className="space-y-6">
                  {category.skills.map((skill, skillIndex) => (
                    <motion.div
                      key={skillIndex}
                      className="skill-item"
                      initial={{ opacity: 0, x: -50 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: skillIndex * 0.1 }}
                      whileHover={{ x: 10 }}
                    >
                      <div className="flex justify-between items-center mb-2">
                        <span className="text-white font-semibold text-lg">{skill.name}</span>
                        <div className="flex items-center space-x-3">
                          <span className="text-blue-400 text-sm">{skill.experience}</span>
                          <span className="text-white font-bold">{skill.level}%</span>
                        </div>
                      </div>
                      <div className="w-full bg-gray-700/50 rounded-full h-3 overflow-hidden">
                        <motion.div
                          className="h-full rounded-full relative overflow-hidden"
                          style={{
                            background: `linear-gradient(90deg, ${category.color}, ${category.color}80)`
                          }}
                          variants={skillVariants}
                          initial="hidden"
                          animate="visible"
                          custom={skill.level}
                        >
                          <motion.div
                            className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent"
                            animate={{ x: ["-100%", "100%"] }}
                            transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
                          />
                        </motion.div>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Enhanced Achievements Section */}
        <motion.div
          className="mb-32"
          variants={containerVariants}
          initial="hidden"
          animate={controls}
        >
          <motion.h3
            className="text-5xl md:text-6xl font-bold text-center mb-16 gradient-text"
            variants={itemVariants}
          >
            Thành Tựu & Chứng Chỉ
          </motion.h3>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {aboutData.achievements.map((achievement, index) => (
              <motion.div
                key={index}
                className="glass-effect-strong rounded-2xl p-6 text-center relative overflow-hidden group"
                variants={itemVariants}
                whileHover={{ 
                  scale: 1.05, 
                  rotateY: 10,
                  boxShadow: `0 20px 40px ${achievement.color}30`
                }}
                style={{ transformStyle: "preserve-3d" }}
              >
                {/* Background glow effect */}
                <motion.div
                  className="absolute inset-0 opacity-0 group-hover:opacity-20 transition-opacity duration-300"
                  style={{ background: `radial-gradient(circle, ${achievement.color}, transparent)` }}
                />

                <motion.div
                  className="w-20 h-20 mx-auto mb-6 rounded-2xl flex items-center justify-center relative z-10"
                  style={{ backgroundColor: `${achievement.color}20` }}
                  animate={{
                    rotateY: [0, 360],
                    scale: [1, 1.1, 1]
                  }}
                  transition={{
                    rotateY: { duration: 10, repeat: Infinity, ease: "linear" },
                    scale: { duration: 3, repeat: Infinity, ease: "easeInOut" }
                  }}
                >
                  <FontAwesomeIcon 
                    icon={achievement.icon} 
                    className="text-4xl"
                    style={{ color: achievement.color }}
                  />
                </motion.div>

                <h4 className="text-xl font-bold text-white mb-3 relative z-10">
                  {achievement.title}
                </h4>
                <p className="text-blue-400 font-medium mb-2 relative z-10">
                  {achievement.organization}
                </p>
                <p className="text-gray-400 text-sm mb-4 relative z-10">
                  {achievement.year}
                </p>
                <p className="text-gray-300 text-sm relative z-10">
                  {achievement.description}
                </p>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Enhanced Hobbies Section */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={controls}
        >
          <motion.h3
            className="text-5xl md:text-6xl font-bold text-center mb-16 gradient-text"
            variants={itemVariants}
          >
            Sở Thích & Đam Mê
          </motion.h3>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">
            {aboutData.hobbies.map((hobby, index) => (
              <motion.div
                key={index}
                className="glass-effect rounded-2xl p-6 text-center group relative overflow-hidden"
                variants={itemVariants}
                whileHover={{ 
                  scale: 1.1, 
                  rotateZ: 5,
                  y: -10
                }}
                whileTap={{ scale: 0.95 }}
              >
                <motion.div
                  className="w-16 h-16 mx-auto mb-4 rounded-2xl flex items-center justify-center"
                  style={{ backgroundColor: `${hobby.color}20` }}
                  animate={{
                    rotate: [0, 10, -10, 0],
                    scale: [1, 1.1, 1]
                  }}
                  transition={{
                    duration: 4,
                    repeat: Infinity,
                    ease: "easeInOut",
                    delay: index * 0.5
                  }}
                >
                  <FontAwesomeIcon 
                    icon={hobby.icon} 
                    className="text-2xl"
                    style={{ color: hobby.color }}
                  />
                </motion.div>
                <p className="text-white font-medium text-sm">{hobby.name}</p>
                
                {/* Hover effect */}
                <motion.div
                  className="absolute inset-0 opacity-0 group-hover:opacity-10 transition-opacity duration-300 rounded-2xl"
                  style={{ background: `radial-gradient(circle, ${hobby.color}, transparent)` }}
                />
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default About;
