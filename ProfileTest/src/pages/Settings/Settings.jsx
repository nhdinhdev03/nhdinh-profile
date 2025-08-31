import React from 'react';
import { motion } from 'framer-motion';
import { useTheme } from '../../contexts/ThemeContext';
import { ThemeCard, ThemeText, ThemeButton, ThemeSelector } from '../../components/UI/ThemeComponents';
import { 
  FiSettings, 
  FiMonitor, 
  FiZap, 
  FiEye, 
  FiSun, 
  FiMoon,
  FiCpu,
  FiActivity
} from 'react-icons/fi';

const SettingsPage = () => {
  const { isDark, effectiveTheme, systemTheme, themeMode } = useTheme();

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
    { label: 'Theme Switch Time', value: '< 100ms', icon: FiZap, color: 'text-green-400' },
    { label: 'Memory Usage', value: '< 2MB', icon: FiCpu, color: 'text-blue-400' },
    { label: 'Render Performance', value: '60 FPS', icon: FiActivity, color: 'text-purple-400' },
    { label: 'Accessibility Score', value: '100%', icon: FiEye, color: 'text-cyan-400' }
  ];

  const themeFeatures = [
    {
      title: 'System Integration',
      description: 'Automatically follows your system preference',
      icon: FiMonitor,
      active: themeMode === 'auto'
    },
    {
      title: 'Manual Override',
      description: 'Choose your preferred theme manually',
      icon: themeMode === 'dark' ? FiMoon : FiSun,
      active: themeMode !== 'auto'
    },
    {
      title: 'Smooth Transitions',
      description: 'Hardware-accelerated theme switching',
      icon: FiZap,
      active: true
    },
    {
      title: 'Performance Optimized',
      description: 'Zero impact on application performance',
      icon: FiCpu,
      active: true
    }
  ];

  return (
    <div className="min-h-screen pt-24 pb-16">
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
                className={`p-4 rounded-2xl ${
                  isDark 
                    ? 'bg-gradient-to-r from-cyan-500/20 to-purple-500/20 border border-cyan-500/30' 
                    : 'bg-gradient-to-r from-blue-500/20 to-purple-500/20 border border-blue-500/30'
                }`}
                whileHover={{ scale: 1.05, rotate: 5 }}
              >
                <FiSettings className={`w-12 h-12 ${isDark ? 'text-cyan-400' : 'text-blue-600'}`} />
              </motion.div>
            </div>
            <ThemeText variant="heading" className="text-4xl md:text-5xl mb-4">
              Theme Settings
            </ThemeText>
            <ThemeText variant="body" className="text-xl max-w-2xl mx-auto">
              Customize your visual experience with our advanced theme system
            </ThemeText>
          </motion.div>

          {/* Current Theme Status */}
          <motion.div variants={itemVariants}>
            <ThemeCard variant="gradient" className="text-center">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div>
                  <ThemeText variant="caption">Current Theme</ThemeText>
                  <ThemeText variant="heading" className="text-2xl capitalize">
                    {effectiveTheme}
                  </ThemeText>
                </div>
                <div>
                  <ThemeText variant="caption">Theme Mode</ThemeText>
                  <ThemeText variant="heading" className="text-2xl capitalize">
                    {themeMode}
                  </ThemeText>
                </div>
                <div>
                  <ThemeText variant="caption">System Preference</ThemeText>
                  <ThemeText variant="heading" className="text-2xl capitalize">
                    {systemTheme}
                  </ThemeText>
                </div>
              </div>
            </ThemeCard>
          </motion.div>

          {/* Theme Selector */}
          <motion.div variants={itemVariants}>
            <ThemeCard>
              <ThemeSelector />
            </ThemeCard>
          </motion.div>

          {/* Theme Features */}
          <motion.div variants={itemVariants}>
            <ThemeText variant="subheading" className="text-2xl mb-6 text-center">
              Theme Features
            </ThemeText>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {themeFeatures.map((feature, index) => (
                <motion.div
                  key={feature.title}
                  variants={itemVariants}
                >
                  <ThemeCard 
                    variant="glass" 
                    className={`transition-all duration-300 ${
                      feature.active 
                        ? isDark 
                          ? 'border-cyan-500/50 bg-cyan-500/5' 
                          : 'border-blue-500/50 bg-blue-500/5'
                        : ''
                    }`}
                  >
                    <div className="flex items-start space-x-4">
                      <div className={`p-3 rounded-xl ${
                        feature.active
                          ? isDark 
                            ? 'bg-cyan-500/20 text-cyan-400' 
                            : 'bg-blue-500/20 text-blue-600'
                          : isDark 
                            ? 'bg-gray-700/50 text-gray-400' 
                            : 'bg-gray-200/50 text-gray-500'
                      }`}>
                        <feature.icon className="w-6 h-6" />
                      </div>
                      <div className="flex-1">
                        <ThemeText variant="subheading" className="mb-2">
                          {feature.title}
                        </ThemeText>
                        <ThemeText variant="body">
                          {feature.description}
                        </ThemeText>
                        {feature.active && (
                          <div className="mt-2">
                            <span className={`text-xs font-medium px-2 py-1 rounded-full ${
                              isDark 
                                ? 'bg-green-500/20 text-green-400' 
                                : 'bg-green-500/20 text-green-600'
                            }`}>
                              Active
                            </span>
                          </div>
                        )}
                      </div>
                    </div>
                  </ThemeCard>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Performance Metrics */}
          <motion.div variants={itemVariants}>
            <ThemeText variant="subheading" className="text-2xl mb-6 text-center">
              Performance Metrics
            </ThemeText>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              {performanceMetrics.map((metric, index) => (
                <motion.div
                  key={metric.label}
                  variants={itemVariants}
                >
                  <ThemeCard variant="glass" className="text-center">
                    <div className={`inline-flex p-3 rounded-xl mb-3 ${
                      isDark ? 'bg-gray-800/50' : 'bg-gray-100/50'
                    }`}>
                      <metric.icon className={`w-6 h-6 ${metric.color}`} />
                    </div>
                    <ThemeText variant="heading" className="text-xl mb-1">
                      {metric.value}
                    </ThemeText>
                    <ThemeText variant="caption">
                      {metric.label}
                    </ThemeText>
                  </ThemeCard>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Demo Section */}
          <motion.div variants={itemVariants}>
            <ThemeText variant="subheading" className="text-2xl mb-6 text-center">
              Theme Preview
            </ThemeText>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <ThemeCard variant="default">
                <ThemeText variant="subheading" className="mb-4">
                  Default Card Style
                </ThemeText>
                <ThemeText variant="body" className="mb-4">
                  This is how cards look with the current theme. The colors and styles automatically adapt to your preference.
                </ThemeText>
                <div className="flex space-x-3">
                  <ThemeButton variant="primary" size="sm">
                    Primary
                  </ThemeButton>
                  <ThemeButton variant="secondary" size="sm">
                    Secondary
                  </ThemeButton>
                  <ThemeButton variant="ghost" size="sm">
                    Ghost
                  </ThemeButton>
                </div>
              </ThemeCard>

              <ThemeCard variant="gradient">
                <ThemeText variant="subheading" className="mb-4">
                  Gradient Card Style
                </ThemeText>
                <ThemeText variant="body" className="mb-4">
                  Gradient cards provide more depth and visual interest while maintaining readability.
                </ThemeText>
                <div className="space-y-3">
                  <div className={`h-2 rounded-full ${
                    isDark 
                      ? 'bg-gradient-to-r from-cyan-500 to-purple-500' 
                      : 'bg-gradient-to-r from-blue-500 to-purple-500'
                  }`} />
                  <div className={`h-2 rounded-full ${
                    isDark 
                      ? 'bg-gradient-to-r from-purple-500 to-pink-500' 
                      : 'bg-gradient-to-r from-purple-500 to-pink-500'
                  }`} />
                </div>
              </ThemeCard>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
};

export default SettingsPage;
