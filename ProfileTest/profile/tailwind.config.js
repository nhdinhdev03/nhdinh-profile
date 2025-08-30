/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
    "./public/index.html",
  ],
  theme: {
    extend: {
      screens: {
        'xs': '475px',
        '3xl': '1600px',
        '4xl': '1920px',
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
        dark: {
          50: '#18181b',
          100: '#27272a',
          200: '#3f3f46',
          300: '#52525b',
          400: '#71717a',
          500: '#a1a1aa',
          600: '#d4d4d8',
          700: '#e4e4e7',
          800: '#f4f4f5',
          900: '#fafafa',
        },
        accent: {
          50: '#fef7ff',
          100: '#feeffe',
          200: '#fce7fe',
          300: '#f8d4fe',
          400: '#f1b4fc',
          500: '#e879f9',
          600: '#d946ef',
          700: '#be185d',
          800: '#9d174d',
          900: '#831843',
        },
      },
   fontFamily: {
  sans: ['Inter', 'system-ui', 'sans-serif'],
  mono: ['Fira Code', 'JetBrains Mono', 'monospace'],
  display: ['Sour Gummy', 'Inter', 'system-ui', 'sans-serif'], // Thêm Sour Gummy
  'sour-gummy': ['Sour Gummy', 'sans-serif'], // Hoặc tạo class riêng
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
        'fluid-sm': ['clamp(0.875rem, 2vw, 1.125rem)', { lineHeight: '1.5' }],
        'fluid-base': ['clamp(1rem, 2.5vw, 1.25rem)', { lineHeight: '1.5' }],
        'fluid-lg': ['clamp(1.125rem, 3vw, 1.5rem)', { lineHeight: '1.4' }],
        'fluid-xl': ['clamp(1.25rem, 4vw, 2rem)', { lineHeight: '1.3' }],
        'fluid-2xl': ['clamp(1.5rem, 5vw, 3rem)', { lineHeight: '1.2' }],
        'fluid-3xl': ['clamp(2rem, 6vw, 4rem)', { lineHeight: '1.1' }],
        'fluid-4xl': ['clamp(2.5rem, 8vw, 6rem)', { lineHeight: '1' }],
      },
      spacing: {
        '18': '4.5rem',
        '88': '22rem',
        '128': '32rem',
        '144': '36rem',
      },
      maxWidth: {
        '8xl': '88rem',
        '9xl': '96rem',
        'screen-2xl': '1536px',
      },
      minHeight: {
        'screen-small': '100dvh',
        'screen-large': '100lvh',
      },
      animation: {
        'gradient': 'gradient 8s linear infinite',
        'float': 'float 6s ease-in-out infinite',
        'glow': 'glow 2s ease-in-out infinite alternate',
        'typing': 'typing 3.5s steps(40, end), blink-caret 0.75s step-end infinite',
        'pulse-slow': 'pulse 4s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'bounce-slow': 'bounce 3s infinite',
        'spin-slow': 'spin 3s linear infinite',
        'wiggle': 'wiggle 1s ease-in-out infinite',
        'fade-in': 'fadeIn 0.5s ease-in-out',
        'fade-up': 'fadeUp 0.8s ease-out',
        'scale-in': 'scaleIn 0.5s ease-out',
        'slide-left': 'slideLeft 0.6s ease-out',
        'slide-right': 'slideRight 0.6s ease-out',
      },
      keyframes: {
        gradient: {
          '0%, 100%': {
            'background-size': '200% 200%',
            'background-position': 'left center'
          },
          '50%': {
            'background-size': '200% 200%',
            'background-position': 'right center'
          },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-20px)' },
        },
        glow: {
          from: { 'box-shadow': '0 0 20px #0ea5e9' },
          to: { 'box-shadow': '0 0 30px #0ea5e9, 0 0 40px #0ea5e9' },
        },
        typing: {
          from: { width: '0' },
          to: { width: '100%' },
        },
        'blink-caret': {
          'from, to': { 'border-color': 'transparent' },
          '50%': { 'border-color': '#0ea5e9' },
        },
        wiggle: {
          '0%, 100%': { transform: 'rotate(-3deg)' },
          '50%': { transform: 'rotate(3deg)' },
        },
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        fadeUp: {
          '0%': { opacity: '0', transform: 'translateY(30px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        scaleIn: {
          '0%': { opacity: '0', transform: 'scale(0.9)' },
          '100%': { opacity: '1', transform: 'scale(1)' },
        },
        slideLeft: {
          '0%': { opacity: '0', transform: 'translateX(-30px)' },
          '100%': { opacity: '1', transform: 'translateX(0)' },
        },
        slideRight: {
          '0%': { opacity: '0', transform: 'translateX(30px)' },
          '100%': { opacity: '1', transform: 'translateX(0)' },
        },
      },
      backdropBlur: {
        xs: '2px',
        '4xl': '72px',
      },
      perspective: {
        '1000': '1000px',
        '2000': '2000px',
      },
      container: {
        center: true,
        padding: {
          DEFAULT: '1rem',
          sm: '2rem',
          lg: '4rem',
          xl: '5rem',
          '2xl': '6rem',
        },
      },
      aspectRatio: {
        'auto': 'auto',
        'square': '1 / 1',
        'video': '16 / 9',
        'portrait': '3 / 4',
        'landscape': '4 / 3',
      },
    },
  },
  plugins: [
    function({ addUtilities }) {
      const newUtilities = {
        '.text-balance': {
          'text-wrap': 'balance',
        },
        '.text-pretty': {
          'text-wrap': 'pretty',
        },
        '.perspective-1000': {
          'perspective': '1000px',
        },
        '.preserve-3d': {
          'transform-style': 'preserve-3d',
        },
        '.backface-hidden': {
          'backface-visibility': 'hidden',
        },
        '.scrollbar-hidden': {
          'scrollbar-width': 'none',
          '-ms-overflow-style': 'none',
          '&::-webkit-scrollbar': {
            'display': 'none',
          },
        },
        '.container-fluid': {
          'width': '100%',
          'padding-left': '15px',
          'padding-right': '15px',
          'margin-left': 'auto',
          'margin-right': 'auto',
        },
        '@media (min-width: 576px)': {
          '.container-fluid': {
            'max-width': '540px',
          },
        },
        '@media (min-width: 768px)': {
          '.container-fluid': {
            'max-width': '720px',
          },
        },
        '@media (min-width: 992px)': {
          '.container-fluid': {
            'max-width': '960px',
          },
        },
        '@media (min-width: 1200px)': {
          '.container-fluid': {
            'max-width': '1140px',
          },
        },
        '@media (min-width: 1400px)': {
          '.container-fluid': {
            'max-width': '1320px',
          },
        },
      }
      addUtilities(newUtilities);
    }
  ],
}
