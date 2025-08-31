import React from 'react';
import { motion } from 'framer-motion';
import { FiCpu, FiZap } from 'react-icons/fi';

// Optimized loading skeleton for different components
export const SkeletonLoader = ({ variant = 'default', className = '' }) => {
  const variants = {
    default: (
      <div className={`animate-pulse ${className}`}>
        <div className="h-4 bg-gray-700 rounded mb-2"></div>
        <div className="h-4 bg-gray-700 rounded w-3/4"></div>
      </div>
    ),
    card: (
      <div className={`animate-pulse p-6 bg-gray-800/50 rounded-xl border border-gray-700 ${className}`}>
        <div className="flex items-center space-x-4 mb-4">
          <div className="w-12 h-12 bg-gray-700 rounded-xl"></div>
          <div className="flex-1">
            <div className="h-4 bg-gray-700 rounded mb-2"></div>
            <div className="h-3 bg-gray-700 rounded w-2/3"></div>
          </div>
        </div>
        <div className="space-y-2">
          <div className="h-3 bg-gray-700 rounded"></div>
          <div className="h-3 bg-gray-700 rounded w-5/6"></div>
        </div>
      </div>
    ),
    hero: (
      <div className={`animate-pulse text-center ${className}`}>
        <div className="h-12 bg-gray-700 rounded mb-4 mx-auto max-w-md"></div>
        <div className="h-6 bg-gray-700 rounded mb-6 mx-auto max-w-lg"></div>
        <div className="flex justify-center space-x-4">
          <div className="h-12 bg-gray-700 rounded w-32"></div>
          <div className="h-12 bg-gray-700 rounded w-32"></div>
        </div>
      </div>
    )
  };

  return variants[variant] || variants.default;
};

// Enhanced loading component with progress
export const SmartLoader = ({ 
  progress = 0, 
  status = 'Loading...', 
  showProgress = true,
  showStats = false 
}) => {
  return (
    <div className="fixed inset-0 bg-black flex items-center justify-center z-50">
      {/* Animated background */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-gradient-to-br from-gray-900 via-black to-gray-900" />
        
        {/* Dynamic neural network */}
        <div className="absolute inset-0 opacity-20">
          {Array.from({ length: 12 }).map((_, i) => (
            <motion.div
              key={i}
              className="absolute w-1 h-1 bg-cyan-400 rounded-full"
              animate={{
                x: [Math.random() * window.innerWidth, Math.random() * window.innerWidth],
                y: [Math.random() * window.innerHeight, Math.random() * window.innerHeight],
                opacity: [0, 1, 0],
                scale: [0.5, 1, 0.5]
              }}
              transition={{
                duration: 4 + Math.random() * 4,
                repeat: Infinity,
                ease: 'easeInOut',
                delay: i * 0.3
              }}
            />
          ))}
        </div>
        
        {/* Flowing particles */}
        <div className="absolute inset-0">
          {Array.from({ length: 8 }).map((_, i) => (
            <motion.div
              key={i}
              className="absolute w-2 h-2 bg-purple-400/40 rounded-full blur-sm"
              animate={{
                x: [0, window.innerWidth],
                opacity: [0, 0.8, 0]
              }}
              transition={{
                duration: 6,
                repeat: Infinity,
                ease: 'linear',
                delay: i * 0.8
              }}
              style={{
                top: 50 + (i * 10) + Math.random() * 20 + '%'
              }}
            />
          ))}
        </div>
      </div>
      
      {/* Loading content */}
      <div className="relative z-10 text-center max-w-md mx-auto px-6">
        {/* AI Brain Icon */}
        <motion.div
          className="mb-8 relative"
          animate={{ 
            scale: [1, 1.1, 1],
            rotateY: [0, 180, 360]
          }}
          transition={{ 
            duration: 3, 
            repeat: Infinity, 
            ease: 'easeInOut' 
          }}
        >
          <div className="w-24 h-24 mx-auto bg-gradient-to-r from-cyan-500 to-purple-500 rounded-2xl flex items-center justify-center relative overflow-hidden">
            <motion.div
              className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent"
              animate={{ x: [-100, 200] }}
              transition={{ duration: 2, repeat: Infinity, ease: 'linear' }}
            />
            <FiCpu className="w-12 h-12 text-white relative z-10" />
          </div>
          
          {/* Orbiting elements */}
          {Array.from({ length: 3 }).map((_, i) => (
            <motion.div
              key={i}
              className="absolute top-1/2 left-1/2 w-3 h-3"
              animate={{ 
                rotate: [0, 360],
                scale: [0.8, 1.2, 0.8]
              }}
              transition={{ 
                duration: 2 + i * 0.5, 
                repeat: Infinity, 
                ease: 'linear' 
              }}
              style={{
                transformOrigin: `${30 + i * 10}px 0px`,
                marginLeft: `-6px`,
                marginTop: `-6px`
              }}
            >
              <div className="w-3 h-3 bg-cyan-400 rounded-full shadow-lg shadow-cyan-400/50" />
            </motion.div>
          ))}
        </motion.div>

        {/* Status text */}
        <motion.h2
          className="text-2xl font-bold mb-4 bg-gradient-to-r from-cyan-400 to-purple-400 bg-clip-text text-transparent"
          animate={{ opacity: [0.7, 1, 0.7] }}
          transition={{ duration: 2, repeat: Infinity }}
        >
          Initializing Neural Networks
        </motion.h2>

        <motion.p
          className="text-gray-300 mb-8 font-light"
          animate={{ opacity: [0.5, 1, 0.5] }}
          transition={{ duration: 1.5, repeat: Infinity, delay: 0.5 }}
        >
          {status}
        </motion.p>

        {/* Progress bar */}
        {showProgress && (
          <div className="mb-6">
            <div className="flex justify-between text-sm text-gray-400 mb-2">
              <span>Loading Resources</span>
              <span>{Math.round(progress)}%</span>
            </div>
            <div className="w-full bg-gray-800 rounded-full h-2 overflow-hidden">
              <motion.div
                className="h-2 bg-gradient-to-r from-cyan-500 to-purple-500 rounded-full"
                initial={{ width: '0%' }}
                animate={{ width: `${progress}%` }}
                transition={{ duration: 0.5, ease: 'easeOut' }}
              />
            </div>
          </div>
        )}

        {/* Performance stats */}
        {showStats && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="grid grid-cols-2 gap-4 text-sm"
          >
            <div className="bg-gray-800/50 rounded-lg p-3 border border-gray-700">
              <div className="flex items-center space-x-2 mb-1">
                <FiZap className="w-4 h-4 text-yellow-400" />
                <span className="text-gray-400">Speed</span>
              </div>
              <span className="text-cyan-400 font-semibold">Optimized</span>
            </div>
            <div className="bg-gray-800/50 rounded-lg p-3 border border-gray-700">
              <div className="flex items-center space-x-2 mb-1">
                <FiCpu className="w-4 h-4 text-purple-400" />
                <span className="text-gray-400">AI Ready</span>
              </div>
              <span className="text-green-400 font-semibold">Active</span>
            </div>
          </motion.div>
        )}

        {/* Loading dots */}
        <div className="flex justify-center space-x-1 mt-8">
          {Array.from({ length: 3 }).map((_, i) => (
            <motion.div
              key={i}
              className="w-2 h-2 bg-cyan-400 rounded-full"
              animate={{
                scale: [1, 1.5, 1],
                opacity: [0.5, 1, 0.5]
              }}
              transition={{
                duration: 1.5,
                repeat: Infinity,
                delay: i * 0.2
              }}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default SmartLoader;
