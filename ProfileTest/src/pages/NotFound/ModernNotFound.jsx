import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  FiHome as Home, 
  FiArrowLeft as ArrowLeft, 
  FiSearch as Search, 
  FiAlertTriangle as AlertTriangle,
  FiRefreshCcw as RefreshCw,
  FiNavigation as Navigation,
  FiMapPin as MapPin,
  FiCompass as Compass,
  FiWifi as Wifi,
  FiWifiOff as WifiOff,
  FiActivity as Activity
} from 'react-icons/fi';
import { useNavigate } from "react-router-dom";

const ModernNotFound = () => {
  const [glitchActive, setGlitchActive] = useState(false);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [scannerPosition, setScannerPosition] = useState(0);
  const [systemStatus, setSystemStatus] = useState("scanning");
  const navigate = useNavigate();

  // Track mouse for interactive effects
  useEffect(() => {
    const handleMouseMove = (e) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };
    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  // Glitch effect
  useEffect(() => {
    const interval = setInterval(() => {
      setGlitchActive(true);
      setTimeout(() => setGlitchActive(false), 150);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  // Scanner animation
  useEffect(() => {
    const interval = setInterval(() => {
      setScannerPosition((prev) => (prev + 1) % 100);
    }, 50);
    return () => clearInterval(interval);
  }, []);

  // System status simulation
  useEffect(() => {
    const statuses = ["scanning", "analyzing", "not_found", "error"];
    let currentIndex = 0;
    
    const interval = setInterval(() => {
      currentIndex = (currentIndex + 1) % statuses.length;
      setSystemStatus(statuses[currentIndex]);
    }, 2000);
    
    return () => clearInterval(interval);
  }, []);

  // Floating Error Particles
  const ErrorParticle = ({ delay = 0 }) => (
    <motion.div
      className="absolute"
      initial={{ 
        x: Math.random() * window.innerWidth,
        y: window.innerHeight + 50,
        opacity: 0,
        scale: 0
      }}
      animate={{
        y: -50,
        opacity: [0, 1, 1, 0],
        scale: [0, 1, 1, 0],
        rotate: 360
      }}
      transition={{
        duration: 4,
        repeat: Infinity,
        delay,
        ease: "easeOut",
      }}
    >
      <div className="w-2 h-2 bg-red-500 rounded-full shadow-lg shadow-red-500/50" />
    </motion.div>
  );

  // Circuit Pattern Component
  const CircuitPattern = () => (
    <div className="absolute inset-0 opacity-10">
      <svg className="w-full h-full" viewBox="0 0 400 400">
        <defs>
          <pattern id="circuit" x="0" y="0" width="100" height="100" patternUnits="userSpaceOnUse">
            <path
              d="M20 20h60v20h-60zM20 60h20v20h-20zM60 60h20v20h-20z"
              fill="none"
              stroke="currentColor"
              strokeWidth="1"
            />
            <circle cx="30" cy="30" r="3" fill="currentColor" />
            <circle cx="70" cy="70" r="3" fill="currentColor" />
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill="url(#circuit)" className="text-cyan-400" />
      </svg>
    </div>
  );

  const getStatusColor = () => {
    switch (systemStatus) {
      case "scanning": return "text-cyan-400";
      case "analyzing": return "text-yellow-400";
      case "not_found": return "text-red-400";
      case "error": return "text-red-500";
      default: return "text-gray-400";
    }
  };

  const getStatusIcon = () => {
    switch (systemStatus) {
      case "scanning": return <Search className="w-4 h-4" />;
      case "analyzing": return <Activity className="w-4 h-4 animate-pulse" />;
      case "not_found": return <WifiOff className="w-4 h-4" />;
      case "error": return <AlertTriangle className="w-4 h-4" />;
      default: return <Wifi className="w-4 h-4" />;
    }
  };

  return (
    <div className="min-h-screen bg-black text-white relative overflow-hidden">
      {/* Animated Background */}
      <div className="fixed inset-0">
        {/* Base gradient */}
        <div className="absolute inset-0 bg-gradient-to-br from-red-900/20 via-gray-900 to-purple-900/20" />
        
        {/* Circuit Pattern */}
        <CircuitPattern />
        
        {/* Floating Error Particles */}
        {[...Array(15)].map((_, i) => (
          <ErrorParticle key={i} delay={i * 0.3} />
        ))}
        
        {/* Scanning Lines */}
        <div className="absolute inset-0">
          <motion.div
            className="absolute w-full h-1 bg-gradient-to-r from-transparent via-red-500/50 to-transparent"
            style={{ top: `${scannerPosition}%` }}
            animate={{ opacity: [0.3, 1, 0.3] }}
            transition={{ duration: 1, repeat: Infinity }}
          />
          <motion.div
            className="absolute h-full w-1 bg-gradient-to-b from-transparent via-cyan-500/30 to-transparent"
            style={{ left: `${(scannerPosition + 30) % 100}%` }}
            animate={{ opacity: [0.2, 0.8, 0.2] }}
            transition={{ duration: 1.5, repeat: Infinity }}
          />
        </div>

        {/* Grid Lines */}
        <div className="absolute inset-0 opacity-20">
          {[...Array(20)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute w-px h-full bg-gradient-to-b from-transparent via-red-500/20 to-transparent"
              style={{ left: `${(i + 1) * 5}%` }}
              animate={{ opacity: [0.1, 0.3, 0.1] }}
              transition={{ duration: 4, repeat: Infinity, delay: i * 0.1 }}
            />
          ))}
          {[...Array(15)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute h-px w-full bg-gradient-to-r from-transparent via-cyan-500/20 to-transparent"
              style={{ top: `${(i + 1) * 6.67}%` }}
              animate={{ opacity: [0.1, 0.3, 0.1] }}
              transition={{ duration: 3, repeat: Infinity, delay: i * 0.15 }}
            />
          ))}
        </div>
      </div>

      {/* Mouse Follower */}
      <motion.div
        className="fixed w-8 h-8 border-2 border-red-400 rounded-full pointer-events-none z-50 mix-blend-difference"
        animate={{
          x: mousePosition.x - 16,
          y: mousePosition.y - 16,
        }}
        transition={{ type: "spring", stiffness: 500, damping: 30 }}
      >
        <div className="absolute inset-1 bg-red-400 rounded-full animate-pulse opacity-30" />
      </motion.div>

      <div className="relative z-10 min-h-screen flex items-center justify-center px-4">
        <div className="max-w-4xl mx-auto text-center">
          {/* System Status Panel */}
          <motion.div
            className="inline-flex items-center space-x-3 bg-gray-900/80 backdrop-blur-sm border border-gray-700 rounded-xl px-6 py-3 mb-8"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <div className="flex items-center space-x-2">
              <motion.div
                className={`${getStatusColor()}`}
                animate={{ scale: [1, 1.2, 1] }}
                transition={{ duration: 1, repeat: Infinity }}
              >
                {getStatusIcon()}
              </motion.div>
              <span className={`text-sm font-mono ${getStatusColor()}`}>
                SYSTEM STATUS: {systemStatus.toUpperCase().replace('_', ' ')}
              </span>
            </div>
            <div className="w-px h-4 bg-gray-600" />
            <div className="flex items-center space-x-2">
              <div className="w-2 h-2 bg-red-500 rounded-full animate-pulse" />
              <span className="text-xs text-gray-400">ERROR_404</span>
            </div>
          </motion.div>

          {/* Main Error Display */}
          <motion.div
            className={`relative ${glitchActive ? 'animate-pulse' : ''}`}
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.2, duration: 0.8 }}
          >
            {/* Glitch Effect Layers */}
            <AnimatePresence>
              {glitchActive && (
                <>
                  <motion.div
                    className="absolute inset-0 text-8xl md:text-9xl font-black text-red-500 opacity-70"
                    initial={{ x: 0 }}
                    animate={{ x: [-2, 2, -1, 1, 0] }}
                    exit={{ x: 0 }}
                    transition={{ duration: 0.15 }}
                  >
                    404
                  </motion.div>
                  <motion.div
                    className="absolute inset-0 text-8xl md:text-9xl font-black text-cyan-500 opacity-70"
                    initial={{ x: 0 }}
                    animate={{ x: [2, -2, 1, -1, 0] }}
                    exit={{ x: 0 }}
                    transition={{ duration: 0.15 }}
                  >
                    404
                  </motion.div>
                </>
              )}
            </AnimatePresence>

            {/* Main 404 Text */}
            <motion.h1
              className="text-8xl md:text-9xl font-black text-white mb-6 relative"
              animate={{ 
                textShadow: glitchActive 
                  ? ["0 0 10px #ff0000", "0 0 20px #00ffff", "0 0 10px #ff0000"]
                  : "0 0 20px rgba(255,255,255,0.5)"
              }}
              transition={{ duration: 0.15 }}
            >
              4
              <motion.span
                className="inline-block text-red-500"
                animate={{ rotate: glitchActive ? [0, 5, -5, 0] : 0 }}
                transition={{ duration: 0.15 }}
              >
                0
              </motion.span>
              4
            </motion.h1>
          </motion.div>

          {/* Error Messages */}
          <motion.div
            className="space-y-4 mb-12"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.6 }}
          >
            <h2 className="text-2xl md:text-3xl font-bold bg-gradient-to-r from-red-400 via-purple-400 to-cyan-400 bg-clip-text text-transparent">
              NEURAL PATHWAY NOT FOUND
            </h2>
            
            <p className="text-lg text-gray-300 max-w-2xl mx-auto leading-relaxed">
              The requested quantum resource has been displaced across the digital matrix. 
              Our AI systems are unable to locate the specified coordinates in the data stream.
            </p>

            {/* Technical Details */}
            <motion.div
              className="bg-gray-900/50 backdrop-blur-sm border border-gray-700 rounded-xl p-6 mt-8 font-mono text-left max-w-2xl mx-auto"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.6, duration: 0.6 }}
            >
              <div className="text-red-400 mb-2">ERROR_LOG:</div>
              <div className="text-gray-300 text-sm space-y-1">
                <div><span className="text-cyan-400">STATUS:</span> 404_RESOURCE_NOT_FOUND</div>
                <div><span className="text-cyan-400">TIMESTAMP:</span> {new Date().toISOString()}</div>
                <div><span className="text-cyan-400">LOCATION:</span> /unknown/path/to/resource</div>
                <div><span className="text-cyan-400">AI_PROTOCOL:</span> NEURAL_SCAN_COMPLETE</div>
                <div><span className="text-cyan-400">SUGGESTION:</span> RETURN_TO_BASE_STATION</div>
              </div>
            </motion.div>
          </motion.div>

          {/* Navigation Options */}
          <motion.div
            className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-3xl mx-auto"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8, duration: 0.6 }}
          >
            {/* Return Home */}
            <motion.button
              onClick={() => navigate("/")}
              className="group bg-gradient-to-r from-cyan-500 to-blue-500 hover:from-cyan-400 hover:to-blue-400 text-white p-6 rounded-xl transition-all duration-300 shadow-lg shadow-cyan-500/25"
              whileHover={{ scale: 1.05, y: -5 }}
              whileTap={{ scale: 0.95 }}
            >
              <Home className="w-8 h-8 mx-auto mb-3 group-hover:animate-bounce" />
              <h3 className="font-bold text-lg mb-2">Return to Base</h3>
              <p className="text-sm opacity-90">Navigate back to the main portal</p>
            </motion.button>

            {/* Go Back */}
            <motion.button
              onClick={() => navigate(-1)}
              className="group bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-400 hover:to-pink-400 text-white p-6 rounded-xl transition-all duration-300 shadow-lg shadow-purple-500/25"
              whileHover={{ scale: 1.05, y: -5 }}
              whileTap={{ scale: 0.95 }}
            >
              <ArrowLeft className="w-8 h-8 mx-auto mb-3 group-hover:animate-pulse" />
              <h3 className="font-bold text-lg mb-2">Previous Location</h3>
              <p className="text-sm opacity-90">Return to your last position</p>
            </motion.button>

            {/* Explore */}
            <motion.button
              onClick={() => navigate("/projects")}
              className="group bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-400 hover:to-red-400 text-white p-6 rounded-xl transition-all duration-300 shadow-lg shadow-orange-500/25"
              whileHover={{ scale: 1.05, y: -5 }}
              whileTap={{ scale: 0.95 }}
            >
              <Compass className="w-8 h-8 mx-auto mb-3 group-hover:animate-spin" />
              <h3 className="font-bold text-lg mb-2">Explore Projects</h3>
              <p className="text-sm opacity-90">Discover available resources</p>
            </motion.button>
          </motion.div>

          {/* System Recovery */}
          <motion.div
            className="mt-16"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1, duration: 0.6 }}
          >
            <div className="bg-gradient-to-r from-gray-900 via-gray-800 to-gray-900 border border-gray-700 rounded-xl p-8">
              <div className="flex items-center justify-center space-x-3 mb-6">
                <motion.div
                  animate={{ rotate: 360 }}
                  transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                >
                  <RefreshCw className="w-6 h-6 text-cyan-400" />
                </motion.div>
                <h3 className="text-xl font-bold text-white">System Recovery Options</h3>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-3">
                  <h4 className="font-semibold text-cyan-300 flex items-center space-x-2">
                    <Navigation className="w-4 h-4" />
                    <span>Quick Navigation</span>
                  </h4>
                  <div className="space-y-2 text-sm text-gray-300">
                    <button 
                      onClick={() => navigate("/")}
                      className="block w-full text-left hover:text-cyan-300 transition-colors duration-200"
                    >
                      → Home Portal
                    </button>
                    <button 
                      onClick={() => navigate("/about")}
                      className="block w-full text-left hover:text-cyan-300 transition-colors duration-200"
                    >
                      → About System
                    </button>
                    <button 
                      onClick={() => navigate("/projects")}
                      className="block w-full text-left hover:text-cyan-300 transition-colors duration-200"
                    >
                      → Project Database
                    </button>
                    <button 
                      onClick={() => navigate("/contact")}
                      className="block w-full text-left hover:text-cyan-300 transition-colors duration-200"
                    >
                      → Contact Interface
                    </button>
                  </div>
                </div>

                <div className="space-y-3">
                  <h4 className="font-semibold text-cyan-300 flex items-center space-x-2">
                    <MapPin className="w-4 h-4" />
                    <span>System Status</span>
                  </h4>
                  <div className="space-y-2 text-sm">
                    <div className="flex items-center justify-between">
                      <span className="text-gray-300">AI Navigation</span>
                      <span className="text-green-400">ONLINE</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-gray-300">Neural Networks</span>
                      <span className="text-green-400">ACTIVE</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-gray-300">Quantum Routing</span>
                      <span className="text-yellow-400">SCANNING</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-gray-300">Resource Location</span>
                      <span className="text-red-400">ERROR</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default ModernNotFound;
