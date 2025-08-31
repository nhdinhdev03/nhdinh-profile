/** @type {import('tailwindcss').Config} */
const defaultTheme = require('tailwindcss/defaultTheme')

module.exports = {
  content: ['./src/**/*.{js,jsx,ts,tsx}'],
  darkMode: 'class',
  theme: {
    extend: {
      fontFamily: {
        sans: ['Inter', ...defaultTheme.fontFamily.sans],
        display: ['Space Grotesk', ...defaultTheme.fontFamily.sans],
      },
      colors: {
        primary: {
          50: '#f0f9ff',
          100: '#e0f2fe',
          200: '#bae6fd',
          300: '#7dd3fc',
          400: '#38bdf8',
          500: '#0ea5e9',
          600: '#0284c7',
          700: '#0369a1',
          800: '#075985',
          900: '#0c4a6e',
        },
        secondary: {
          50: '#fdf4ff',
          100: '#fae8ff',
          200: '#f5d0fe',
          300: '#f0abfc',
          400: '#e879f9',
          500: '#d946ef',
          600: '#c026d3',
          700: '#a21caf',
          800: '#86198f',
          900: '#701a75',
        },
      },
      animation: {
        'fade-in': 'fadeIn 0.5s ease-in-out',
        'slide-up': 'slideUp 0.5s ease-out',
        'slide-down': 'slideDown 0.5s ease-out',
        'bounce-slight': 'bounceSlightly 2s infinite',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        slideUp: {
          '0%': { transform: 'translateY(20px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
        slideDown: {
          '0%': { transform: 'translateY(-20px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
        bounceSlightly: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-10px)' },
        },
      },
      backdropFilter: {
        'none': 'none',
        'blur': 'blur(20px)',
      },
    },
  },
  plugins: [
    require('@tailwindcss/forms'),
    require('@tailwindcss/typography'),
    require('@tailwindcss/aspect-ratio'),
  ],
}
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        // Modern gradient color palette
        primary: {
          50: '#f0f9ff',
          100: '#e0f2fe',
          200: '#bae6fd',
          300: '#7dd3fc',
          400: '#38bdf8',
          500: '#0ea5e9',
          600: '#0284c7',
          700: '#0369a1',
          800: '#075985',
          900: '#0c4a6e',
          950: '#082f49',
        },
        secondary: {
          50: '#fdf4ff',
          100: '#fae8ff',
          200: '#f5d0fe',
          300: '#f0abfc',
          400: '#e879f9',
          500: '#d946ef',
          600: '#c026d3',
          700: '#a21caf',
          800: '#86198f',
          900: '#701a75',
          950: '#4a044e',
        },
        accent: {
          50: '#fefce8',
          100: '#fef9c3',
          200: '#fef08a',
          300: '#fde047',
          400: '#facc15',
          500: '#eab308',
          600: '#ca8a04',
          700: '#a16207',
          800: '#854d0e',
          900: '#713f12',
          950: '#422006',
        },
        // Glassmorphism colors
        glass: {
          light: 'rgba(255, 255, 255, 0.1)',
          medium: 'rgba(255, 255, 255, 0.2)',
          dark: 'rgba(0, 0, 0, 0.1)',
        },
        // Neon colors for effects
        neon: {
          cyan: '#00ffff',
          pink: '#ff00ff',
          green: '#00ff00',
          yellow: '#ffff00',
          purple: '#8b5cf6',
        },
        // Enhanced gray scale
        neutral: {
          50: '#fafafa',
          100: '#f5f5f5',
          200: '#e5e5e5',
          300: '#d4d4d4',
          400: '#a3a3a3',
          500: '#737373',
          600: '#525252',
          700: '#404040',
          800: '#262626',
          900: '#171717',
          950: '#0a0a0a',
        }
      },
      fontFamily: {
        'heading': ['Poppins', 'sans-serif'],
        'body': ['Inter', 'sans-serif'],
        'display': ['Space Grotesk', 'sans-serif'],
        'mono': ['JetBrains Mono', 'Fira Code', 'monospace'],
      },
      fontSize: {
        'xs': ['0.75rem', { lineHeight: '1rem' }],
        'sm': ['0.875rem', { lineHeight: '1.25rem' }],
        'base': ['1rem', { lineHeight: '1.5rem' }],
        'lg': ['1.125rem', { lineHeight: '1.75rem' }],
        'xl': ['1.25rem', { lineHeight: '1.75rem' }],
        '2xl': ['1.5rem', { lineHeight: '2rem' }],
        '3xl': ['1.875rem', { lineHeight: '2.25rem' }],
        '4xl': ['2.25rem', { lineHeight: '2.5rem' }],
        '5xl': ['3rem', { lineHeight: '1' }],
        '6xl': ['3.75rem', { lineHeight: '1' }],
        '7xl': ['4.5rem', { lineHeight: '1' }],
        '8xl': ['6rem', { lineHeight: '1' }],
        '9xl': ['8rem', { lineHeight: '1' }],
        '10xl': ['10rem', { lineHeight: '1' }],
      },
      spacing: {
        '18': '4.5rem',
        '88': '22rem',
        '128': '32rem',
        '144': '36rem',
      },
      borderRadius: {
        '4xl': '2rem',
        '5xl': '2.5rem',
        '6xl': '3rem',
      },
      boxShadow: {
        'glass': '0 8px 32px 0 rgba(31, 38, 135, 0.37)',
        'glow': '0 0 20px rgba(59, 130, 246, 0.5)',
        'neon': '0 0 5px currentColor, 0 0 10px currentColor, 0 0 15px currentColor',
        'inner-glow': 'inset 0 2px 4px 0 rgba(255, 255, 255, 0.1)',
        'brutal': '8px 8px 0px 0px rgba(0,0,0,1)',
        'soft': '0 2px 15px -3px rgba(0, 0, 0, 0.07), 0 10px 20px -2px rgba(0, 0, 0, 0.04)',
      },
      backdropBlur: {
        xs: '2px',
      },
      animation: {
        'fade-in': 'fadeIn 0.5s ease-in-out',
        'slide-up': 'slideUp 0.5s ease-out',
        'slide-down': 'slideDown 0.5s ease-out',
        'slide-left': 'slideLeft 0.5s ease-out',
        'slide-right': 'slideRight 0.5s ease-out',
        'bounce-in': 'bounceIn 0.6s ease-out',
        'float': 'float 3s ease-in-out infinite',
        'glow': 'glow 2s ease-in-out infinite alternate',
        'pulse-slow': 'pulse 3s ease-in-out infinite',
        'spin-slow': 'spin 3s linear infinite',
        'wiggle': 'wiggle 1s ease-in-out infinite',
        'heartbeat': 'heartbeat 1.5s ease-in-out infinite',
        'typewriter': 'typewriter 3s steps(40) infinite',
        'gradient': 'gradient 3s ease infinite',
        'tilt': 'tilt 1s ease-in-out infinite alternate',
        'flip': 'flip 1s ease-in-out',
        'zoom-in': 'zoomIn 0.5s ease-out',
        'zoom-out': 'zoomOut 0.5s ease-out',
        'shake': 'shake 0.5s ease-in-out',
        'neon-pulse': 'neonPulse 2s ease-in-out infinite alternate',
        'matrix': 'matrix 2s linear infinite',
        'morpheus': 'morpheus 4s ease-in-out infinite',
        'glitch': 'glitch 2s linear infinite',
        'hologram': 'hologram 3s ease-in-out infinite',
        'cyber-grid': 'cyberGrid 4s linear infinite',
        'data-stream': 'dataStream 3s linear infinite',
        'neural-pulse': 'neuralPulse 2s ease-in-out infinite',
        'quantum': 'quantum 5s ease-in-out infinite',
        'plasma': 'plasma 4s ease-in-out infinite',
        'aurora': 'aurora 8s ease-in-out infinite',
        'nebula': 'nebula 6s ease-in-out infinite',
        'stellar': 'stellar 10s ease-in-out infinite',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        slideUp: {
          '0%': { transform: 'translateY(20px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
        slideDown: {
          '0%': { transform: 'translateY(-20px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
        slideLeft: {
          '0%': { transform: 'translateX(20px)', opacity: '0' },
          '100%': { transform: 'translateX(0)', opacity: '1' },
        },
        slideRight: {
          '0%': { transform: 'translateX(-20px)', opacity: '0' },
          '100%': { transform: 'translateX(0)', opacity: '1' },
        },
        bounceIn: {
          '0%': { transform: 'scale(0.3)', opacity: '0' },
          '50%': { transform: 'scale(1.05)' },
          '70%': { transform: 'scale(0.9)' },
          '100%': { transform: 'scale(1)', opacity: '1' },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-10px)' },
        },
        glow: {
          '0%': { boxShadow: '0 0 5px #3b82f6' },
          '100%': { boxShadow: '0 0 20px #3b82f6, 0 0 30px #3b82f6' },
        },
        wiggle: {
          '0%, 100%': { transform: 'rotate(-3deg)' },
          '50%': { transform: 'rotate(3deg)' },
        },
        heartbeat: {
          '0%, 100%': { transform: 'scale(1)' },
          '50%': { transform: 'scale(1.1)' },
        },
        typewriter: {
          '0%': { width: '0' },
          '100%': { width: '100%' },
        },
        gradient: {
          '0%, 100%': { backgroundPosition: '0% 50%' },
          '50%': { backgroundPosition: '100% 50%' },
        },
        tilt: {
          '0%': { transform: 'rotateY(-10deg)' },
          '100%': { transform: 'rotateY(10deg)' },
        },
        flip: {
          '0%': { transform: 'rotateY(0)' },
          '100%': { transform: 'rotateY(180deg)' },
        },
        zoomIn: {
          '0%': { transform: 'scale(0)', opacity: '0' },
          '100%': { transform: 'scale(1)', opacity: '1' },
        },
        zoomOut: {
          '0%': { transform: 'scale(1)', opacity: '1' },
          '100%': { transform: 'scale(0)', opacity: '0' },
        },
        shake: {
          '0%, 100%': { transform: 'translateX(0)' },
          '25%': { transform: 'translateX(-5px)' },
          '75%': { transform: 'translateX(5px)' },
        },
        neonPulse: {
          '0%': { 
            boxShadow: '0 0 5px currentColor, 0 0 10px currentColor',
            filter: 'brightness(1)',
          },
          '100%': { 
            boxShadow: '0 0 10px currentColor, 0 0 20px currentColor, 0 0 30px currentColor',
            filter: 'brightness(1.2)',
          },
        },
        matrix: {
          '0%': { transform: 'translateY(-100%)' },
          '100%': { transform: 'translateY(100vh)' },
        },
        morpheus: {
          '0%, 100%': { 
            transform: 'perspective(1000px) rotateX(0deg) rotateY(0deg)',
            filter: 'hue-rotate(0deg)',
          },
          '25%': { 
            transform: 'perspective(1000px) rotateX(90deg) rotateY(0deg)',
            filter: 'hue-rotate(90deg)',
          },
          '50%': { 
            transform: 'perspective(1000px) rotateX(90deg) rotateY(90deg)',
            filter: 'hue-rotate(180deg)',
          },
          '75%': { 
            transform: 'perspective(1000px) rotateX(0deg) rotateY(90deg)',
            filter: 'hue-rotate(270deg)',
          },
        },
        glitch: {
          '0%, 100%': { transform: 'translate(0)' },
          '20%': { transform: 'translate(-2px, 2px)' },
          '40%': { transform: 'translate(-2px, -2px)' },
          '60%': { transform: 'translate(2px, 2px)' },
          '80%': { transform: 'translate(2px, -2px)' },
        },
        hologram: {
          '0%, 100%': { 
            opacity: '1',
            filter: 'brightness(1) contrast(1)',
          },
          '25%': { 
            opacity: '0.8',
            filter: 'brightness(1.2) contrast(1.1)',
          },
          '50%': { 
            opacity: '0.6',
            filter: 'brightness(0.8) contrast(1.2)',
          },
          '75%': { 
            opacity: '0.9',
            filter: 'brightness(1.1) contrast(0.9)',
          },
        },
        cyberGrid: {
          '0%': { 
            backgroundPosition: '0 0',
            filter: 'hue-rotate(0deg)',
          },
          '100%': { 
            backgroundPosition: '40px 40px',
            filter: 'hue-rotate(360deg)',
          },
        },
        dataStream: {
          '0%': { transform: 'translateX(-100%)' },
          '100%': { transform: 'translateX(100vw)' },
        },
        neuralPulse: {
          '0%, 100%': { 
            boxShadow: '0 0 0 0 rgba(59, 130, 246, 0.7)',
            transform: 'scale(1)',
          },
          '50%': { 
            boxShadow: '0 0 0 20px rgba(59, 130, 246, 0)',
            transform: 'scale(1.05)',
          },
        },
        quantum: {
          '0%, 100%': { 
            transform: 'scale(1) rotate(0deg)',
            opacity: '1',
          },
          '25%': { 
            transform: 'scale(1.1) rotate(90deg)',
            opacity: '0.8',
          },
          '50%': { 
            transform: 'scale(0.9) rotate(180deg)',
            opacity: '0.6',
          },
          '75%': { 
            transform: 'scale(1.05) rotate(270deg)',
            opacity: '0.8',
          },
        },
        plasma: {
          '0%, 100%': { 
            background: 'linear-gradient(45deg, #ff006e, #8338ec, #3a86ff)',
          },
          '33%': { 
            background: 'linear-gradient(45deg, #8338ec, #3a86ff, #ff006e)',
          },
          '66%': { 
            background: 'linear-gradient(45deg, #3a86ff, #ff006e, #8338ec)',
          },
        },
        aurora: {
          '0%, 100%': { 
            background: 'linear-gradient(45deg, #ff9a00, #ff0084, #00d4ff)',
            transform: 'translateX(0) skewX(0deg)',
          },
          '25%': { 
            background: 'linear-gradient(45deg, #ff0084, #00d4ff, #ff9a00)',
            transform: 'translateX(10px) skewX(5deg)',
          },
          '50%': { 
            background: 'linear-gradient(45deg, #00d4ff, #ff9a00, #ff0084)',
            transform: 'translateX(-10px) skewX(-5deg)',
          },
          '75%': { 
            background: 'linear-gradient(45deg, #ff9a00, #ff0084, #00d4ff)',
            transform: 'translateX(5px) skewX(2deg)',
          },
        },
        nebula: {
          '0%, 100%': { 
            filter: 'blur(0px) brightness(1) saturate(1)',
            transform: 'scale(1)',
          },
          '50%': { 
            filter: 'blur(2px) brightness(1.2) saturate(1.5)',
            transform: 'scale(1.1)',
          },
        },
        stellar: {
          '0%': { 
            transform: 'rotate(0deg) scale(1)',
            filter: 'brightness(1) hue-rotate(0deg)',
          },
          '25%': { 
            transform: 'rotate(90deg) scale(1.1)',
            filter: 'brightness(1.2) hue-rotate(90deg)',
          },
          '50%': { 
            transform: 'rotate(180deg) scale(0.9)',
            filter: 'brightness(0.8) hue-rotate(180deg)',
          },
          '75%': { 
            transform: 'rotate(270deg) scale(1.05)',
            filter: 'brightness(1.1) hue-rotate(270deg)',
          },
          '100%': { 
            transform: 'rotate(360deg) scale(1)',
            filter: 'brightness(1) hue-rotate(360deg)',
          },
        },
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic': 'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
        'gradient-mesh': 'radial-gradient(ellipse 80% 50% at 50% -20%, rgba(120, 119, 198, 0.3), transparent)',
        'cyber-grid': 'linear-gradient(rgba(0,255,255,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(0,255,255,0.1) 1px, transparent 1px)',
        'neon-grid': 'radial-gradient(circle at 1px 1px, rgba(255,255,255,0.15) 1px, transparent 0)',
        'hologram': 'repeating-linear-gradient(90deg, transparent, transparent 2px, rgba(0,255,255,0.1) 2px, rgba(0,255,255,0.1) 4px)',
        'matrix': 'linear-gradient(to bottom, transparent, rgba(0,255,0,0.1))',
        'neural': 'radial-gradient(ellipse at center, rgba(139, 92, 246, 0.15) 0%, transparent 50%)',
        'plasma': 'linear-gradient(45deg, #ff006e 0%, #8338ec 25%, #3a86ff 50%, #06ffa5 75%, #ffbe0b 100%)',
        'aurora': 'linear-gradient(45deg, #ff9a00 0%, #ff0084 25%, #00d4ff 50%, #a8ff3e 75%, #ff006e 100%)',
        'cosmic': 'radial-gradient(ellipse at top, #000428 0%, #004e92 100%)',
        'nebula': 'radial-gradient(ellipse at center, #1a1a2e 0%, #16213e 25%, #0f3460 50%, #533483 100%)',
        'stellar': 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
        'quantum': 'conic-gradient(from 90deg at 50% 50%, #ff006e 0deg, #8338ec 72deg, #3a86ff 144deg, #06ffa5 216deg, #ffbe0b 288deg, #ff006e 360deg)',
      },
      // Glass morphism utilities
      backdropFilter: {
        'none': 'none',
        'blur': 'blur(20px)',
      },
      // Custom utilities
      transitionTimingFunction: {
        'bounce-in': 'cubic-bezier(0.68, -0.55, 0.265, 1.55)',
        'smooth': 'cubic-bezier(0.4, 0, 0.2, 1)',
        'cyber': 'cubic-bezier(0.25, 0.46, 0.45, 0.94)',
      },
      scale: {
        '200': '2',
        '300': '3',
      },
      zIndex: {
        '100': '100',
        '999': '999',
        '9999': '9999',
      },
    },
  },
  plugins: [
    function({ addUtilities, theme }) {
      const newUtilities = {
        // Glass morphism
        '.glass': {
          background: 'rgba(255, 255, 255, 0.1)',
          backdropFilter: 'blur(10px)',
          border: '1px solid rgba(255, 255, 255, 0.2)',
        },
        '.glass-dark': {
          background: 'rgba(0, 0, 0, 0.1)',
          backdropFilter: 'blur(10px)',
          border: '1px solid rgba(255, 255, 255, 0.1)',
        },
        // Neon effects
        '.neon': {
          textShadow: '0 0 5px currentColor, 0 0 10px currentColor, 0 0 15px currentColor',
        },
        '.neon-box': {
          boxShadow: '0 0 5px currentColor, 0 0 10px currentColor, 0 0 15px currentColor, 0 0 20px currentColor',
        },
        // Cyber effects
        '.cyber-border': {
          position: 'relative',
          '&::before': {
            content: '""',
            position: 'absolute',
            top: '-2px',
            left: '-2px',
            right: '-2px',
            bottom: '-2px',
            background: 'linear-gradient(45deg, #00ffff, #ff00ff, #00ffff)',
            borderRadius: 'inherit',
            zIndex: '-1',
          },
        },
        // Hologram effect
        '.hologram': {
          background: 'linear-gradient(45deg, transparent 30%, rgba(0,255,255,0.1) 50%, transparent 70%)',
          backgroundSize: '20px 20px',
          animation: 'hologram 3s ease-in-out infinite',
        },
        // Gradient text
        '.gradient-text': {
          background: 'linear-gradient(45deg, #ff006e, #8338ec, #3a86ff)',
          backgroundClip: 'text',
          '-webkit-background-clip': 'text',
          '-webkit-text-fill-color': 'transparent',
          backgroundSize: '200% 200%',
          animation: 'gradient 3s ease infinite',
        },
        // Animated background
        '.animated-bg': {
          background: 'linear-gradient(-45deg, #ee7752, #e73c7e, #23a6d5, #23d5ab)',
          backgroundSize: '400% 400%',
          animation: 'gradient 15s ease infinite',
        },
        // Particle effect container
        '.particle-container': {
          position: 'relative',
          overflow: 'hidden',
          '&::before': {
            content: '""',
            position: 'absolute',
            top: '0',
            left: '0',
            right: '0',
            bottom: '0',
            background: 'radial-gradient(circle, rgba(255,255,255,0.1) 1px, transparent 1px)',
            backgroundSize: '50px 50px',
            animation: 'float 20s linear infinite',
          },
        },
      }
      addUtilities(newUtilities)
    }
  ],
}
