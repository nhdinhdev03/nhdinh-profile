import React, { useEffect, useRef, useState, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { ROUTES } from 'router/routeConstants';
import AOS from 'aos';
import 'aos/dist/aos.css';
import { useResponsive } from 'utils/responsive';
import './QuantumHome.scss';

const QuantumHome = () => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [typewriterText, setTypewriterText] = useState('');
  const [currentIndex, setCurrentIndex] = useState(0);
  const [backgroundEffects, setBackgroundEffects] = useState(true);
  
  const canvasRef = useRef(null);
  const particleCanvasRef = useRef(null);
  const threeCanvasRef = useRef(null);
  const navigate = useNavigate();
  
  // Use responsive utilities
  const { deviceInfo, settings } = useResponsive();
  const { isMobile, isTablet, isSmallMobile } = deviceInfo;
  
  const texts = useMemo(() => [
    'FULL-STACK DEVELOPER',
    'REACT SPECIALIST', 
    'NODE.JS EXPERT',
    'UI/UX DESIGNER',
    'CLOUD ARCHITECT',
    'CODE CRAFTSMAN'
  ], []);

  // Adjust background effects based on device capability
  useEffect(() => {
    if (isSmallMobile) {
      setBackgroundEffects(false);
    }
  }, [isSmallMobile]);

  // Enhanced quantum typewriter effect with responsive timing
  useEffect(() => {
    const typeText = async () => {
      const text = texts[currentIndex];
      
      // Use settings from responsive utilities
      const typingSpeed = settings.ui.typewriterSpeed.typing;
      const eraseSpeed = settings.ui.typewriterSpeed.erasing;
      const holdDuration = settings.ui.typewriterSpeed.holdDuration;
      
      // Typing phase with dynamic speed
      for (let i = 0; i <= text.length; i++) {
        setTypewriterText(text.slice(0, i));
        // Vary typing speed for more natural feel
        const speed = Math.random() * 30 + typingSpeed;
        await new Promise(resolve => setTimeout(resolve, speed));
      }
      
      // Hold text for display (shorter on mobile)
      await new Promise(resolve => setTimeout(resolve, holdDuration));
      
      // Erase text with consistent fast speed
      for (let i = text.length; i >= 0; i--) {
        setTypewriterText(text.slice(0, i));
        await new Promise(resolve => setTimeout(resolve, eraseSpeed));
      }
      
      // Brief pause before next text
      await new Promise(resolve => setTimeout(resolve, 300));
      
      setCurrentIndex((prev) => (prev + 1) % texts.length);
    };

    if (isLoaded) {
      typeText();
    }
  }, [currentIndex, isLoaded, texts, settings.ui.typewriterSpeed]);

  // Optimized Matrix rain effect with responsive settings
  useEffect(() => {
    if (!backgroundEffects || isMobile) return; // Skip on mobile for performance
    
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    let animationId;
    
    // Enhanced matrix characters
    const matrix = "ABCDEFGHIJKLMNOPQRSTUVWXYZ123456789@#$%^&*()*&^%+-/~{[|`]}ﾊﾐﾋｰｳｼﾅﾓﾆｻﾜﾂｵﾘｱﾎﾃﾏｹﾒｴｶｷﾑﾕﾗｾﾈｽﾀﾇﾍ";
    const matrixArray = matrix.split("");

    // Responsive settings from utilities
    const matrixSettings = settings.matrix;
    const fontSize = matrixSettings.fontSize;
    const animationSpeed = matrixSettings.animationSpeed;
    
    let columns, drops;
    
    const initCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      columns = Math.floor(canvas.width / fontSize);
      drops = new Array(columns).fill(1);
    };

    initCanvas();

    function draw() {
      // Adjust overlay opacity based on device
      const overlayOpacity = isTablet ? 0.06 : 0.04;
      ctx.fillStyle = `rgba(10, 10, 10, ${overlayOpacity})`;
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      // Brighter color for better visibility on smaller screens
      ctx.fillStyle = isTablet ? '#00e6ff' : '#00d4e6';
      ctx.font = `${fontSize}px 'JetBrains Mono', monospace`;
      ctx.textAlign = 'start';

      for (let i = 0; i < columns; i++) {
        const text = matrixArray[Math.floor(Math.random() * matrixArray.length)];
        const x = i * fontSize;
        const y = drops[i] * fontSize;
        
        // Reduced glow frequency for performance
        if (Math.random() > 0.98) {
          ctx.shadowColor = '#00d4e6';
          ctx.shadowBlur = isTablet ? 3 : 5;
        } else {
          ctx.shadowBlur = 0;
        }
        
        ctx.fillText(text, x, y);

        // Reset drop timing
        if (y > canvas.height && Math.random() > 0.975) {
          drops[i] = 0;
        }
        drops[i]++;
      }

      animationId = setTimeout(draw, animationSpeed);
    }

    const handleResize = () => {
      initCanvas();
    };

    draw();
    window.addEventListener('resize', handleResize);

    return () => {
      clearTimeout(animationId);
      window.removeEventListener('resize', handleResize);
    };
  }, [backgroundEffects, settings.matrix, isMobile, isTablet]);

  // Advanced particle system
  useEffect(() => {
    if (!backgroundEffects) return;
    
    const canvas = particleCanvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    let animationId;
    
    const initCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    initCanvas();

    // Enhanced particle system like test.html (với số lượng giảm)
    const particleCount = window.innerWidth < 768 ? 40 : 60; // Giảm từ 80/120
    const particlesArray = [];
    
    // Màu sắc subtler
    const colors = ['#00d4e6', '#9900cc', '#cc0066', '#2dd10f'];

    class Particle {
      constructor() {
        this.x = Math.random() * canvas.width;
        this.y = Math.random() * canvas.height;
        this.size = Math.random() * 2 + 0.5; // Giảm size
        this.speedX = (Math.random() - 0.5) * 1; // Giảm speed
        this.speedY = (Math.random() - 0.5) * 1;
        this.color = colors[Math.floor(Math.random() * colors.length)];
        this.life = Math.random() * 100 + 100;
        this.decay = Math.random() * 0.3 + 0.2; // Giảm decay
        this.opacity = Math.random() * 0.4 + 0.1; // Giảm opacity
      }

      update() {
        this.x += this.speedX;
        this.y += this.speedY;
        
        // Bounce off edges
        if (this.x < 0 || this.x > canvas.width) this.speedX *= -1;
        if (this.y < 0 || this.y > canvas.height) this.speedY *= -1;
        
        // Pulsing animation
        this.life -= this.decay;
        if (this.life <= 0) {
          this.life = Math.random() * 100 + 100;
          this.opacity = Math.random() * 0.8 + 0.2;
        }
      }

      draw() {
        ctx.save();
        ctx.globalAlpha = this.opacity * (this.life / 100);
        
        // Draw particle với glow nhẹ hơn
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.fillStyle = this.color;
        ctx.shadowColor = this.color;
        ctx.shadowBlur = 3; // Giảm từ 10 xuống 3
        ctx.fill();
        
        ctx.restore();
      }
    }

    // Initialize particles
    for (let i = 0; i < particleCount; i++) {
      particlesArray.push(new Particle());
    }

    function animateParticles() {
      // Clear canvas with slight transparency for trail effect like test.html
      ctx.fillStyle = 'rgba(5, 5, 5, 0.02)';
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      
      particlesArray.forEach((particle, index) => {
        particle.update();
        particle.draw();
        
        // Draw connection lines subtler than test.html
        for (let j = index + 1; j < particlesArray.length; j++) {
          const dx = particle.x - particlesArray[j].x;
          const dy = particle.y - particlesArray[j].y;
          const distance = Math.sqrt(dx * dx + dy * dy);
          
          // Connect particles với khoảng cách ngắn hơn và opacity thấp hơn
          if (distance < 120) { // Giảm từ 150 xuống 120
            const opacity = 0.15 * (1 - distance / 120); // Giảm opacity
            
            ctx.save();
            ctx.globalAlpha = opacity;
            ctx.beginPath();
            ctx.strokeStyle = '#00d4e6'; // Màu subtler
            ctx.lineWidth = 0.5; // Giảm từ 1 xuống 0.5
            ctx.moveTo(particle.x, particle.y);
            ctx.lineTo(particlesArray[j].x, particlesArray[j].y);
            ctx.stroke();
            ctx.restore();
          }
        }
      });
      
      animationId = requestAnimationFrame(animateParticles);
    }

    animateParticles();


    const handleResize = () => {
      initCanvas();
    };

    window.addEventListener('resize', handleResize);

    return () => {
      cancelAnimationFrame(animationId);
      window.removeEventListener('resize', handleResize);
    };
  }, [backgroundEffects]);

  // Enhanced floating shapes subtler version
  useEffect(() => {
    if (!backgroundEffects) return;
    
    const container = document.querySelector('.quantum-background');
    if (!container) return;

    const shapes = [];
    const shapeCount = 8; // Giảm từ 15 xuống 8

    for (let i = 0; i < shapeCount; i++) {
      const shape = document.createElement('div');
      shape.className = 'floating-shape';
      
      // Random shape type
      const shapeTypes = ['circle', 'square', 'triangle', 'diamond'];
      const shapeType = shapeTypes[Math.floor(Math.random() * shapeTypes.length)];
      shape.classList.add(shapeType);
      
      // Random properties với opacity thấp hơn
      const size = Math.random() * 40 + 15; // Giảm size
      const left = Math.random() * 100;
      const animationDuration = Math.random() * 25 + 20; // Chậm hơn
      const delay = Math.random() * 8;
      
      shape.style.cssText = `
        position: absolute;
        left: ${left}%;
        top: 100%;
        width: ${size}px;
        height: ${size}px;
        opacity: ${Math.random() * 0.15 + 0.05}; /* Opacity rất thấp */
        animation: floatUp ${animationDuration}s linear infinite;
        animation-delay: ${delay}s;
        z-index: 1;
      `;
      
      container.appendChild(shape);
      shapes.push(shape);
    }

    return () => {
      shapes.forEach(shape => {
        if (shape.parentNode) {
          shape.parentNode.removeChild(shape);
        }
      });
    };
  }, [backgroundEffects]);

  // Quantum loading and AOS initialization
  useEffect(() => {
    // Initialize AOS
    AOS.init({
      duration: 800,
      once: true,
      easing: 'ease-out-cubic'
    });

    const timer = setTimeout(() => {
      setIsLoaded(true);
    }, 1000);

    return () => clearTimeout(timer);
  }, []);

  // Scroll progress bar
  useEffect(() => {
    const handleScroll = () => {
      const scrolled = window.scrollY;
      const maxHeight = document.documentElement.scrollHeight - window.innerHeight;
      const scrollProgress = (scrolled / maxHeight) * 100;
      
      const progressBar = document.querySelector('.quantum-progress');
      if (progressBar) {
        progressBar.style.width = `${scrollProgress}%`;
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Keyboard shortcuts
  useEffect(() => {
    const handleKeyDown = (e) => {
      // Space bar for effects toggle
      if (e.code === 'Space' && !e.target.matches('input, textarea')) {
        e.preventDefault();
        setBackgroundEffects(!backgroundEffects);
      }
      
      // ESC key to scroll to top
      if (e.code === 'Escape') {
        window.scrollTo({ top: 0, behavior: 'smooth' });
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    return () => {
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [backgroundEffects]);

  const skills = [
    'React.js', 'Node.js', 'TypeScript', 'Python', 'Docker', 'AWS',
    'PostgreSQL', 'GraphQL', 'Redis', 'Kubernetes', 'Next.js', 'MongoDB'
  ];

  return (
    <div className="quantum-home">
      {/* Quantum Loading */}
      {!isLoaded && (
        <div className="quantum-loader">
          <div className="loader-ring"></div>
          <div className="loader-text">INITIALIZING QUANTUM INTERFACE</div>
        </div>
      )}

      {/* Quantum Scroll Progress */}
      <div className="quantum-progress"></div>

      {/* Background Effects */}
      {backgroundEffects && (
        <>
          {/* Matrix Canvas */}
          <canvas ref={canvasRef} className="matrix-canvas" />
          
          {/* Particle System Canvas */}
          <canvas ref={particleCanvasRef} className="particle-canvas" />
          
          {/* 3D Background */}
          <canvas ref={threeCanvasRef} className="three-canvas" />
          
          <div className="holographic-bg"></div>
          <div className="quantum-grid"></div>
          
          <div className="floating-shapes">
            <div className="shape shape-1"></div>
            <div className="shape shape-2"></div>
            <div className="shape shape-3"></div>
            <div className="shape shape-4"></div>
          </div>

          {/* Data Streams */}
          <div className="quantum-data-streams">
            <div className="quantum-data-stream"></div>
            <div className="quantum-data-stream"></div>
            <div className="quantum-data-stream"></div>
            <div className="quantum-data-stream"></div>
            <div className="quantum-data-stream"></div>
          </div>
        </>
      )}

      {/* Effects Toggle Button */}
      <div className="effects-toggle">
        <button 
          className="toggle-btn"
          onClick={() => setBackgroundEffects(!backgroundEffects)}
          title={backgroundEffects ? "Disable Effects (Space)" : "Enable Effects (Space)"}
        >
          <i className={`fas ${backgroundEffects ? 'fa-eye-slash' : 'fa-eye'}`}></i>
        </button>
      </div>

      {/* Keyboard Hints */}
      <div className="keyboard-hints">
        <div className="hint">
          <kbd>Space</kbd> Toggle Effects
        </div>
        <div className="hint">
          <kbd>Esc</kbd> Scroll to Top
        </div>
      </div>

      {/* Main Content */}
      <main className={`quantum-content ${isLoaded ? 'loaded' : ''}`}>
        {/* Hero Section */}
        <section id="home" className="min-h-screen flex items-center justify-center relative overflow-hidden">
          {/* Matrix Rain Background */}
          <canvas ref={canvasRef} className="matrix-canvas absolute inset-0 w-full h-full opacity-20"></canvas>
          
          {/* Quantum Particles */}
          <canvas ref={particleCanvasRef} className="particle-canvas absolute inset-0"></canvas>
          
          {/* Hero Content */}
          <div className="container mx-auto px-4 text-center text-white relative z-10" data-aos="fade-up" data-aos-duration="1000">
            {/* Greeting Text */}
            <div className="mb-12" data-aos="fade-in" data-aos-delay="200">
              <p className="text-xl md:text-3xl text-gray-300 font-space mb-4">
                Xin chào, tôi là:
              </p>
            </div>

            {/* Quantum Title */}
            <h1 className="text-5xl md:text-8xl font-black mb-8 font-cyber" data-aos="fade-up" data-aos-delay="300">
              <span className="relative">
                <span className="text-white">NHDINH</span>
                <span className="absolute inset-0 bg-gradient-to-r from-cyan-400 via-purple-500 to-pink-500 bg-clip-text text-transparent animate-pulse">NHDINH</span>
              </span>
            </h1>

            {/* Quantum Typewriter */}
            <div className="text-2xl md:text-4xl mb-8 text-cyan-300 font-space font-bold" data-aos="fade-up" data-aos-delay="400">
              <span className="font-mono">{typewriterText}</span>
              <span className="animate-pulse text-cyan-400">|</span>
            </div>

            {/* Mission Statement */}
            <p className="text-lg md:text-2xl mb-12 text-gray-300 max-w-4xl mx-auto leading-relaxed font-space" data-aos="fade-up" data-aos-delay="500">
              🚀 Tạo ra những <span className="text-cyan-400 font-bold">trải nghiệm số</span> vượt thời gian với công nghệ 
              <span className="text-purple-400 font-bold"> tiên tiến</span> và tư duy <span className="text-pink-400 font-bold">sáng tạo</span>
            </p>

            {/* Quantum CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-6 justify-center mb-16" data-aos="fade-up" data-aos-delay="600">
              <button 
                className="quantum-cta px-12 py-5 rounded-2xl font-bold text-lg inline-flex items-center space-x-4 group"
                onClick={() => navigate(ROUTES.PROJECTS)}
              >
                <i className="fas fa-rocket group-hover:animate-bounce"></i>
                <span>KHÁM PHÁ DỰ ÁN</span>
                <i className="fas fa-arrow-right group-hover:translate-x-1 transition-transform"></i>
              </button>
              <button 
                className="cyber-glass-strong border-2 border-cyan-500/50 px-12 py-5 rounded-2xl font-bold text-lg hover:bg-cyan-500/20 transition-all duration-300 inline-flex items-center space-x-4 group"
                onClick={() => navigate(ROUTES.CONTACT)}
              >
                <i className="fas fa-satellite-dish group-hover:animate-spin"></i>
                <span>KẾT NỐI NGAY</span>
                <i className="fas fa-external-link-alt text-sm group-hover:animate-pulse"></i>
              </button>
            </div>
            
            {/* Quantum Stats Dashboard */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8 max-w-5xl mx-auto" data-aos="fade-up" data-aos-delay="700">
              <div className="cyber-glass-strong p-8 rounded-3xl text-center group hover:scale-105 transition-all duration-500">
                <div className="text-4xl md:text-5xl font-black text-cyan-400 mb-3 font-cyber">50+</div>
                <div className="text-sm text-gray-300 font-space font-semibold">DỰ ÁN HOÀN THÀNH</div>
                <i className="fas fa-project-diagram text-cyan-400/50 text-2xl mt-3 group-hover:animate-pulse"></i>
              </div>
              <div className="cyber-glass-strong p-8 rounded-3xl text-center group hover:scale-105 transition-all duration-500">
                <div className="text-4xl md:text-5xl font-black text-purple-400 mb-3 font-cyber">5+</div>
                <div className="text-sm text-gray-300 font-space font-semibold">NĂM KINH NGHIỆM</div>
                <i className="fas fa-calendar-alt text-purple-400/50 text-2xl mt-3 group-hover:animate-pulse"></i>
              </div>
              <div className="cyber-glass-strong p-8 rounded-3xl text-center group hover:scale-105 transition-all duration-500">
                <div className="text-4xl md:text-5xl font-black text-pink-400 mb-3 font-cyber">99%</div>
                <div className="text-sm text-gray-300 font-space font-semibold">KHÁCH HÀNG HÀI LÒNG</div>
                <i className="fas fa-heart text-pink-400/50 text-2xl mt-3 group-hover:animate-bounce"></i>
              </div>
              <div className="cyber-glass-strong p-8 rounded-3xl text-center group hover:scale-105 transition-all duration-500">
                <div className="text-4xl md:text-5xl font-black text-green-400 mb-3 font-cyber">24/7</div>
                <div className="text-sm text-gray-300 font-space font-semibold">HỖ TRỢ</div>
                <i className="fas fa-clock text-green-400/50 text-2xl mt-3 group-hover:animate-spin"></i>
              </div>
            </div>
            
 
           
          </div>
        </section>

        {/* Skills Marquee */}
      
      </main>
    </div>
  );
};

export default QuantumHome;
