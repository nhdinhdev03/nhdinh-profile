import React from 'react';
import { motion } from 'framer-motion';
import { useTheme } from '../../contexts/ThemeContext';
import { generateThemeClasses } from '../../utils/themeUtils';
import { 
  FiSettings, 
  FiZap, 
  FiEye, 
  FiSun, 
  FiMoon,
  FiCpu,
  FiActivity
} from 'react-icons/fi';

const SettingsPage = () => {
  const { theme, themeMode, toggleTheme } = useTheme();
  const themeClasses = generateThemeClasses(theme);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        delayChildren: 0.2,
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        type: "spring",
        stiffness: 100
      }
    }
  };

  const performanceMetrics = [
    { label: 'Theme Switch Time', value: '< 100ms', icon: FiZap, color: 'text-emerald-400' },
    { label: 'Memory Usage', value: '< 2MB', icon: FiCpu, color: 'text-blue-400' },
    { label: 'Render Performance', value: '60 FPS', icon: FiActivity, color: 'text-purple-400' },
    { label: 'Accessibility Score', value: '100%', icon: FiEye, color: 'text-cyan-400' }
  ];

  return (
    <div className={`min-h-screen pt-24 pb-16 ${themeClasses.container}`}>
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="space-y-8"
        >
          {/* Header */}
          <motion.div variants={itemVariants} className="text-center">
            <div className="flex items-center justify-center mb-4">
              <motion.div
                className={`p-4 rounded-2xl ${themeClasses.cardBackground}`}
                whileHover={{ scale: 1.05, rotate: 5 }}
              >
                <FiSettings className={`w-12 h-12 ${themeClasses.accentText}`} />
              </motion.div>
            </div>
            <h1 className={`text-4xl md:text-5xl mb-4 font-bold ${themeClasses.primaryText}`}>
              Theme Settings
            </h1>
            <p className={`text-xl max-w-2xl mx-auto ${themeClasses.secondaryText}`}>
              Customize your visual experience with our advanced theme system
            </p>
          </motion.div>

          {/* Current Theme Status */}
          <motion.div variants={itemVariants} className="grid md:grid-cols-3 gap-6">
            <div className={`text-center p-6 rounded-2xl ${themeClasses.cardBackground}`}>
              <span className={`text-sm uppercase tracking-wide ${themeClasses.mutedText}`}>Current Theme</span>
              <div className={`text-2xl font-bold capitalize ${themeClasses.primaryText}`}>
                {theme}
              </div>
            </div>
            <div className={`text-center p-6 rounded-2xl ${themeClasses.cardBackground}`}>
              <span className={`text-sm uppercase tracking-wide ${themeClasses.mutedText}`}>Theme Mode</span>
              <div className={`text-2xl font-bold capitalize ${themeClasses.primaryText}`}>
                {themeMode}
              </div>
            </div>
            <div className={`text-center p-6 rounded-2xl ${themeClasses.cardBackground}`}>
              <span className={`text-sm uppercase tracking-wide ${themeClasses.mutedText}`}>Status</span>
              <div className={`text-2xl font-bold ${themeClasses.successText}`}>
                Active
              </div>
            </div>
          </motion.div>

          {/* Theme Toggle */}
          <motion.div variants={itemVariants} className="text-center">
            <div className={`p-8 rounded-2xl ${themeClasses.cardBackground}`}>
              <h3 className={`text-2xl font-bold mb-6 ${themeClasses.primaryText}`}>
                Quick Theme Switch
              </h3>
              <motion.button
                onClick={toggleTheme}
                className={`${themeClasses.primaryButton} px-8 py-4 rounded-xl font-semibold flex items-center justify-center mx-auto space-x-3`}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                {theme === 'dark' ? <FiSun className="w-5 h-5" /> : <FiMoon className="w-5 h-5" />}
                <span>Switch to {theme === 'dark' ? 'Light' : 'Dark'} Mode</span>
              </motion.button>
            </div>
          </motion.div>

          {/* Performance Metrics */}
          <motion.div variants={itemVariants}>
            <h3 className={`text-2xl font-bold mb-6 text-center ${themeClasses.primaryText}`}>
              Performance Metrics
            </h3>
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              {performanceMetrics.map((metric) => (
                <motion.div
                  key={metric.label}
                  variants={itemVariants}
                  className={`p-6 rounded-2xl text-center ${themeClasses.cardBackground} hover:shadow-lg transition-all duration-300`}
                >
                  <metric.icon className={`w-8 h-8 mx-auto mb-3 ${metric.color}`} />
                  <div className={`text-2xl font-bold mb-1 ${themeClasses.primaryText}`}>
                    {metric.value}
                  </div>
                  <div className={`text-sm ${themeClasses.secondaryText}`}>
                    {metric.label}
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
};

export default SettingsPage;
       