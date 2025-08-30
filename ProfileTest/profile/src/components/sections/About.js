import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUserTie, faCode, faBrain, faTrophy, faChartLine, faServer, faMobile, faCloud, faTools, faLightbulb } from '@fortawesome/free-solid-svg-icons';
import { useInView } from 'react-intersection-observer';
import AboutSkillsEffect from '../effects3D/AboutSkillsEffect';

// Modern About Section (Rebuilt)
const tabs = [
  { key: 'overview', label: 'Tổng quan', icon: faUserTie },
  { key: 'skills', label: 'Kỹ năng', icon: faCode },
  { key: 'achievements', label: 'Thành tựu', icon: faTrophy },
  { key: 'stats', label: 'Chỉ số', icon: faChartLine },
];

const skillGroups = [
  {
    title: 'Frontend',
    icon: faCode,
    skills: [
      { name: 'React / Next.js', level: 95 },
      { name: 'TypeScript', level: 90 },
      { name: 'Tailwind / SCSS', level: 92 },
      { name: 'Framer Motion', level: 85 },
    ],
  },
  {
    title: 'Backend',
    icon: faServer,
    skills: [
      { name: 'Node.js / Express', level: 93 },
      { name: 'REST / GraphQL', level: 88 },
      { name: 'PostgreSQL / MongoDB', level: 86 },
      { name: 'Redis / RabbitMQ', level: 80 },
    ],
  },
  {
    title: 'Cloud & DevOps',
    icon: faCloud,
    skills: [
      { name: 'Docker / K8s', level: 82 },
      { name: 'CI/CD', level: 85 },
      { name: 'AWS / GCP', level: 78 },
      { name: 'Monitoring & Logging', level: 80 },
    ],
  },
];

const achievements = [
  { icon: faLightbulb, title: 'Ý tưởng đổi mới', value: '25+', desc: 'Giải pháp tối ưu quy trình' },
  { icon: faBrain, title: 'Dự án AI tích hợp', value: '10+', desc: 'Ứng dụng ML thực tế' },
  { icon: faTrophy, title: 'Giải thưởng nội bộ', value: '05', desc: 'Vinh danh kỹ thuật' },
  { icon: faTools, title: 'Thư viện tái sử dụng', value: '12', desc: 'Tối ưu thời gian dev' },
];

const stats = [
  { label: 'Năm kinh nghiệm', value: '7+' },
  { label: 'Dự án hoàn thành', value: '150+' },
  { label: 'Khách hàng hài lòng', value: '50+' },
  { label: 'Công nghệ thành thạo', value: '25+' },
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.1 },
  },
};

const itemVariants = {
  hidden: { y: 20, opacity: 0 },
  visible: { y: 0, opacity: 1, transition: { duration: 0.5 } },
};

const AboutNew = () => {
  const [activeTab, setActiveTab] = useState('overview');
  const [ref, inView] = useInView({ threshold: 0.1, triggerOnce: true });

  useEffect(() => {
    if (inView && activeTab === 'overview') {
      // Future: analytics event
    }
  }, [inView, activeTab]);

  return (
    <section id="about" ref={ref} className="relative py-24 lg:py-32 overflow-hidden">
      {/* 3D Skills Cards Background Effect */}
      {activeTab === 'skills' && <AboutSkillsEffect skillGroups={skillGroups} />}
      
      {/* Background gradient + shapes */}
      <div className="absolute inset-0 bg-gradient-to-br from-slate-900 via-purple-900/10 to-slate-900/40" />
      <div className="absolute -top-32 -right-32 w-[500px] h-[500px] bg-purple-500/20 rounded-full blur-3xl animate-pulse" />
      <div className="absolute -bottom-32 -left-32 w-[600px] h-[600px] bg-blue-500/10 rounded-full blur-3xl" />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          className="text-center mb-16"
          variants={containerVariants}
          initial="hidden"
            animate={inView ? 'visible' : 'hidden'}
        >
          <motion.h2
            className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6"
            variants={itemVariants}
          >
            Về <span className="bg-gradient-to-r from-blue-400 to-purple-600 bg-clip-text text-transparent">Tôi</span>
          </motion.h2>
          <motion.p
            className="text-xl text-gray-400 max-w-3xl mx-auto"
            variants={itemVariants}
          >
            Hành trình phát triển phần mềm với khát vọng tạo ra sản phẩm chất lượng, hiệu năng và thân thiện.
          </motion.p>
        </motion.div>

        {/* Tabs */}
        <div className="flex flex-wrap justify-center gap-4 mb-12">
          {tabs.map(t => (
            <button
              key={t.key}
              onClick={() => setActiveTab(t.key)}
              className={`px-6 py-3 rounded-full font-medium flex items-center space-x-2 transition-all duration-300 border backdrop-blur-sm ${
                activeTab === t.key
                  ? 'bg-gradient-to-r from-blue-500 to-purple-600 text-white border-white/20 shadow-lg shadow-blue-500/20'
                  : 'bg-white/5 text-gray-300 border-white/10 hover:bg-white/10 hover:text-white'
              }`}
            >
              <FontAwesomeIcon icon={t.icon} className="text-sm" />
              <span>{t.label}</span>
            </button>
          ))}
        </div>

        {/* Tab Content */}
        <div className="min-h-[420px]">
          <AnimatePresence mode="wait">
            {activeTab === 'overview' && (
              <motion.div
                key="tab-overview"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.5 }}
                className="grid lg:grid-cols-2 gap-16 items-center"
              >
                <div className="space-y-6">
                  <h3 className="text-3xl font-bold text-white">Tôi là ai?</h3>
                  <p className="text-gray-300 leading-relaxed">
                    Tôi là một <span className="text-blue-400 font-medium">Senior Full-Stack Developer</span> chuyên xây dựng hệ thống web hiệu năng cao, trải nghiệm người dùng mượt mà và tích hợp công nghệ mới như AI/ML.
                  </p>
                  <p className="text-gray-300 leading-relaxed">
                    Tư duy "product mindset" giúp tôi không chỉ viết code mà còn tối ưu kiến trúc, quy trình CI/CD và chất lượng tổng thể.
                  </p>
                  <div className="grid sm:grid-cols-2 gap-6 pt-4">
                    {stats.map(s => (
                      <div key={s.label} className="p-4 rounded-xl bg-white/5 border border-white/10 backdrop-blur-md hover:bg-white/10 transition-colors">
                        <div className="text-3xl font-bold text-blue-400 mb-1">{s.value}</div>
                        <div className="text-xs tracking-wide uppercase text-gray-400">{s.label}</div>
                      </div>
                    ))}
                  </div>
                </div>
                <div className="relative">
                  <motion.div
                    className="aspect-square max-w-sm mx-auto rounded-3xl bg-gradient-to-br from-blue-500/20 via-purple-600/20 to-pink-500/20 border border-white/10 backdrop-blur-xl flex items-center justify-center text-6xl font-bold text-white"
                    animate={{ rotate: [0, 3, -3, 0], scale: [1, 1.02, 1] }}
                    transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut' }}
                  >
                    NH
                  </motion.div>
                  <div className="absolute -inset-4 rounded-[2.5rem] bg-gradient-to-r from-blue-500/30 to-purple-600/30 blur-3xl opacity-20" />
                </div>
              </motion.div>
            )}

            {activeTab === 'skills' && (
              <motion.div
                key="tab-skills"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.5 }}
                className="grid md:grid-cols-3 gap-8"
              >
                {skillGroups.map(group => (
                  <div key={group.title} className="p-6 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-md">
                    <div className="flex items-center space-x-3 mb-5">
                      <FontAwesomeIcon icon={group.icon} className="text-blue-400" />
                      <h4 className="text-lg font-semibold text-white">{group.title}</h4>
                    </div>
                    <div className="space-y-4">
                      {group.skills.map(skill => (
                        <div key={skill.name}>
                          <div className="flex justify-between text-xs mb-1">
                            <span className="text-gray-400">{skill.name}</span>
                            <span className="text-blue-400 font-medium">{skill.level}%</span>
                          </div>
                          <div className="h-2 w-full bg-white/5 rounded-full overflow-hidden">
                            <motion.div
                              className="h-full bg-gradient-to-r from-blue-500 to-purple-600"
                              initial={{ width: 0 }}
                              animate={{ width: inView ? skill.level + '%' : 0 }}
                              transition={{ duration: 1, delay: 0.2 }}
                            />
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </motion.div>
            )}

            {activeTab === 'achievements' && (
              <motion.div
                key="tab-achievements"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.5 }}
                className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6"
              >
                {achievements.map(a => (
                  <motion.div
                    key={a.title}
                    className="p-6 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-md hover:bg-white/10 transition-colors flex flex-col items-start"
                    whileHover={{ y: -5 }}
                  >
                    <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center mb-4">
                      <FontAwesomeIcon icon={a.icon} className="text-white" />
                    </div>
                    <div className="text-3xl font-bold text-blue-400 mb-1">{a.value}</div>
                    <div className="text-white font-medium mb-1">{a.title}</div>
                    <div className="text-xs text-gray-400">{a.desc}</div>
                  </motion.div>
                ))}
              </motion.div>
            )}

            {activeTab === 'stats' && (
              <motion.div
                key="tab-stats"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.5 }}
                className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6"
              >
                {stats.map(s => (
                  <motion.div
                    key={s.label}
                    className="p-6 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-md hover:bg-white/10 transition-colors"
                    whileHover={{ scale: 1.05 }}
                  >
                    <div className="text-4xl font-bold bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent mb-2">{s.value}</div>
                    <div className="text-sm text-gray-400 uppercase tracking-wide">{s.label}</div>
                  </motion.div>
                ))}
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
};

export default AboutNew;
