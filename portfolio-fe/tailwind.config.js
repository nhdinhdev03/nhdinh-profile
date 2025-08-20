module.exports = {
  darkMode: 'class',
  content: [
    './index.html',
    './src/**/*.{js,jsx,ts,tsx}',
  ],
  theme: {
    extend: {
      boxShadow: {
        neon: '0 0 0 1px rgba(56,189,248,.35), 0 8px 24px rgba(56,189,248,.15)',
      },
    },
  },
  plugins: [],
}