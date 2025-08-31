import React, { memo } from 'react';
import ModernHeader from './ModernHeader';
import Footer from './Footer/Footer';

const Layout = memo(({ children }) => {
  return (
    <div className="min-h-screen bg-black relative overflow-hidden">
      {/* Ultra-modern background effects with performance optimizations */}
      <div className="absolute inset-0 will-change-auto">
        {/* Base gradient with hardware acceleration */}
        <div className="absolute inset-0 bg-gradient-to-br from-gray-900 via-black to-gray-900 transform-gpu" />
        
        {/* Optimized neural network pattern */}
        <div 
          className="absolute inset-0 opacity-20 neural-pattern will-change-transform"
          style={{
            backgroundImage: `
              radial-gradient(circle at 25% 25%, rgba(59, 130, 246, 0.1) 0%, transparent 50%),
              radial-gradient(circle at 75% 75%, rgba(139, 92, 246, 0.1) 0%, transparent 50%),
              linear-gradient(90deg, rgba(59, 130, 246, 0.05) 1px, transparent 1px),
              linear-gradient(rgba(59, 130, 246, 0.05) 1px, transparent 1px)
            `,
            backgroundSize: '100% 100%, 100% 100%, 50px 50px, 50px 50px'
          }}
        />
        
        {/* Optimized animated orbs */}
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl animate-pulse will-change-transform" />
        <div 
          className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl animate-pulse will-change-transform" 
          style={{ animationDelay: '1s' }} 
        />
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
