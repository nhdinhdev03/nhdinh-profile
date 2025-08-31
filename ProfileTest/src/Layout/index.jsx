import React, { memo } from 'react';
import { useTheme } from '../contexts/ThemeContext';
import ModernHeader from './ModernHeader';
import Footer from './Footer/Footer';

const Layout = memo(({ children }) => {
  const { theme } = useTheme();

  return (
    <div className={`min-h-screen relative overflow-hidden theme-background-transition theme-scrollbar ${
      theme === 'dark' 
        ? 'bg-gray-900' 
        : 'bg-gradient-to-br from-gray-50 via-white to-blue-50'
    }`}>
      {/* Theme-aware background effects with performance optimizations */}
      <div className="absolute inset-0 will-change-auto gpu-accelerated">
        {/* Base gradient with hardware acceleration */}
        <div className={`absolute inset-0 transform-gpu theme-background-transition ${
          theme === 'dark' 
            ? 'bg-gradient-to-br from-gray-900 via-black to-purple-900/20 opacity-100' 
            : 'bg-gradient-to-br from-blue-50/30 via-white to-purple-50/30 opacity-100'
        }`} />
        
        {/* Theme-aware neural network pattern */}
        <div 
          className={`absolute inset-0 neural-pattern will-change-transform theme-opacity-transition ${
            theme === 'dark' ? 'opacity-20' : 'opacity-10'
          }`}
          style={{
            backgroundImage: theme === 'dark' 
              ? `
                radial-gradient(circle at 25% 25%, rgba(59, 130, 246, 0.1) 0%, transparent 50%),
                radial-gradient(circle at 75% 75%, rgba(139, 92, 246, 0.1) 0%, transparent 50%),
                linear-gradient(90deg, rgba(59, 130, 246, 0.05) 1px, transparent 1px),
                linear-gradient(rgba(59, 130, 246, 0.05) 1px, transparent 1px)
              `
              : `
                radial-gradient(circle at 25% 25%, rgba(59, 130, 246, 0.05) 0%, transparent 50%),
                radial-gradient(circle at 75% 75%, rgba(139, 92, 246, 0.05) 0%, transparent 50%),
                linear-gradient(90deg, rgba(59, 130, 246, 0.02) 1px, transparent 1px),
                linear-gradient(rgba(59, 130, 246, 0.02) 1px, transparent 1px)
              `,
            backgroundSize: '100% 100%, 100% 100%, 50px 50px, 50px 50px'
          }}
        />
        
        {/* Theme-aware animated orbs */}
        <div className={`absolute top-1/4 left-1/4 w-96 h-96 rounded-full blur-3xl animate-pulse will-change-transform theme-color-transition ${
          theme === 'dark' 
            ? 'bg-blue-500/10' 
            : 'bg-blue-400/5'
        }`} />
        <div 
          className={`absolute bottom-1/4 right-1/4 w-96 h-96 rounded-full blur-3xl animate-pulse will-change-transform theme-color-transition ${
            theme === 'dark' 
              ? 'bg-purple-500/10' 
              : 'bg-purple-400/5'
          }`}
          style={{ animationDelay: '1s' }} 
        />
        
        {/* Theme transition indicator */}
        <div className={`absolute top-4 left-4 px-3 py-1 rounded-full text-xs font-mono theme-transition ${
          theme === 'dark' 
            ? 'bg-gray-800/50 text-cyan-400 border border-gray-700' 
            : 'bg-white/50 text-blue-600 border border-gray-200'
        }`}>
          {theme} mode
        </div>
      </div>
      
      <ModernHeader />
      <main className="relative z-10 min-h-screen contain-layout">
        {children}
      </main>
      <Footer />
    </div>
  );
});

Layout.displayName = 'Layout';

export default Layout;
