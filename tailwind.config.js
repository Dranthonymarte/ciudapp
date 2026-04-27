/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        'bg-primary':    '#0A0C10',
        'bg-secondary':  '#111318',
        'bg-tertiary':   '#1A1D24',
        'bg-elevated':   '#222631',
        brand:           '#3B82F6',
        'brand-hover':   '#1D4ED8',
        accent:          '#F59E0B',
        'text-primary':  '#F0F2F5',
        'text-secondary':'#8B95A5',
        'text-muted':    '#4B5563',
      },
      fontFamily: {
        display: ["'Syne'", 'sans-serif'],
        body:    ["'DM Sans'", 'sans-serif'],
        mono:    ["'JetBrains Mono'", 'monospace'],
      },
      borderRadius: {
        sm: '8px', md: '12px', lg: '16px', xl: '24px',
      },
    },
  },
  plugins: [],
}
