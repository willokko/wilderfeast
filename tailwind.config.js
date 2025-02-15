/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        wilder: {
          100: '#E2E8F0', // Texto claro
          200: '#CBD5E1', // Texto secundário
          300: '#94A3B8', // Texto desabilitado
          400: '#64748B', // Bordas claras
          500: '#475569', // Bordas e elementos interativos
          600: '#334155', // Elementos de fundo secundários
          700: '#1E293B', // Elementos de fundo primários
          800: '#0F172A', // Fundo de cards
          900: '#020617', // Fundo principal
        },
        mystic: {
          red: '#7f1d1d',    // Vermelho místico para monstros
          green: '#1a4731',  // Verde musgo para elementos naturais
          brown: '#78350f',  // Marrom para elementos terrosos
          gold: '#854d0e',   // Dourado envelhecido para elementos especiais
        }
      },
      fontFamily: {
        title: ['Cinzel', 'serif'],
        sans: ['Merriweather', 'serif']
      },
      boxShadow: {
        'inner-lg': 'inset 0 2px 4px 0 rgb(0 0 0 / 0.25)',
        'mystic': '0 4px 14px -2px rgba(7, 11, 15, 0.5)',
      },
      backgroundImage: {
        'texture': "url('/textures/paper-texture.png')",
        'wood': "url('/textures/wood-texture.png')",
      },
      scale: {
        '102': '1.02',
      }
    },
  },
  plugins: [],
} 