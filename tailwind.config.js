/** @type {import('tailwindcss').Config} */
export default {
  darkMode: 'class', // Enable class-based dark mode
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        primary: '#FFD700',
        'primary-hover': '#E6C200',
        'background-light': '#FFFFFF',
        'background-dark': '#0F172A',
        'surface-light': '#F8FAFC',
        'surface-dark': '#1E293B',
        'ai-blue': '#3B82F6',
        'ai-green': '#10B981',
      },
      backgroundImage: {
        'tech-grid':
          'linear-gradient(to right, rgba(59, 130, 246, 0.1) 1px, transparent 1px), linear-gradient(to bottom, rgba(59, 130, 246, 0.1) 1px, transparent 1px)',
        'tech-grid-dark':
          'linear-gradient(to right, rgba(255, 255, 255, 0.05) 1px, transparent 1px), linear-gradient(to bottom, rgba(255, 255, 255, 0.05) 1px, transparent 1px)',
      },
    },
  },
  plugins: [],
};
