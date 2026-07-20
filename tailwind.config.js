/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        mint: {
          400: 'var(--accent-color, #00E5FF)',
          500: 'var(--accent-color, #00E5FF)',
          glow: 'var(--accent-glow, rgba(0,229,255,0.35))',
        },
        cyan: {
          primary: '#00E5FF',
          secondary: '#009DFF',
          highlight: '#7DF9FF',
          glow: 'rgba(0,229,255,0.35)',
        },
        dark: {
          950: 'var(--dark-bg, #05070D)',
          900: 'var(--dark-secondary, #0A101A)',
          800: 'var(--card-bg, #111827)',
          700: '#1C2433',
        }
      },
      fontFamily: {
        sans: ['Sora', 'Inter', 'sans-serif'],
        display: ['Sora', 'Poppins', 'sans-serif'],
        mono: ['JetBrains Mono', 'monospace'],
      },
      backgroundImage: {
        'cyan-gradient': 'linear-gradient(90deg, #00E5FF, #009DFF)',
        'cyan-gradient-135': 'linear-gradient(135deg, #7DF9FF, #00E5FF, #009DFF)',
      },
      animation: {
        'spin-slow': 'spin 20s linear infinite',
        'spin-slower': 'spin 35s linear infinite',
        'pulse-slow': 'pulse 4s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'float': 'float 5s ease-in-out infinite',
        'glow-pulse': 'glow-pulse 3s ease-in-out infinite',
        'ring-pulse': 'ring-pulse 2s ease-out infinite',
        'ping-slow': 'ping 3s cubic-bezier(0, 0, 0.2, 1) infinite',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-10px)' },
        },
        'glow-pulse': {
          '0%, 100%': { boxShadow: '0 0 20px rgba(0, 229, 255, 0.3)' },
          '50%': { boxShadow: '0 0 50px rgba(0, 229, 255, 0.6), 0 0 80px rgba(0, 229, 255, 0.2)' },
        },
        'ring-pulse': {
          '0%': { transform: 'scale(1)', opacity: '0.6' },
          '100%': { transform: 'scale(1.6)', opacity: '0' },
        },
      },
      boxShadow: {
        'cyan-glow': '0 0 25px rgba(0,229,255,0.20)',
        'cyan-glow-lg': '0 0 50px rgba(0,229,255,0.35)',
        'inner-cyan': 'inset 0 0 20px rgba(0,229,255,0.1)',
      },
      borderColor: {
        'cyan-border': 'rgba(0,255,255,0.08)',
      }
    },
  },
  plugins: [],
}
