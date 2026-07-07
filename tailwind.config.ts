import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        cream: '#F5F3EF',
        'of-black': '#111111',
        'of-dark': '#1A1A1A',
        'of-gray': '#888888',
        'of-border': '#E0DDD8',
        'of-accent': '#C8A96A',
        'of-accent-dark': '#A88848',
      },
      fontFamily: {
        sans: ['var(--font-noto)', 'Apple SD Gothic Neo', 'Malgun Gothic', 'sans-serif'],
      },
      letterSpacing: {
        widest: '0.2em',
      },
      keyframes: {
        'fade-in-up': {
          '0%': { opacity: '0', transform: 'translateY(24px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        'fade-in': {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
      },
      animation: {
        'fade-in-up': 'fade-in-up 0.9s cubic-bezier(0.22, 1, 0.36, 1) both',
        'fade-in': 'fade-in 1.2s ease-out both',
      },
    },
  },
  plugins: [],
}

export default config
