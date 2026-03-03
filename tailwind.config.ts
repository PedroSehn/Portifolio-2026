import type { Config } from 'tailwindcss'

export default {
  content: ['./index.html', './src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        win: {
          gray:   '#c0c0c0',
          dark:   '#808080',
          darker: '#404040',
          white:  '#ffffff',
          black:  '#000000',
          navy:   '#000080',
          teal:   '#008080',
          blue:   '#1084d0',
        },
      },
      fontFamily: {
        win: ['Tahoma', 'MS Sans Serif', 'Arial', 'sans-serif'],
      },
      fontSize: {
        '10': '10px',
        '11': '11px',
        '12': '12px',
        '13': '13px',
      },
      boxShadow: {
        'raised': [
          'inset -1px -1px 0 #404040',
          'inset  1px  1px 0 #ffffff',
          'inset -2px -2px 0 #808080',
          'inset  2px  2px 0 #dfdfdf',
        ].join(', '),
        'sunken': [
          'inset  1px  1px 0 #404040',
          'inset -1px -1px 0 #ffffff',
          'inset  2px  2px 0 #808080',
          'inset -2px -2px 0 #dfdfdf',
        ].join(', '),
        'win-outer': '2px 2px 0 #000000',
        'groupbox':  'inset 1px 1px 0 #ffffff',
      },
      backgroundImage: {
        progress: 'repeating-linear-gradient(90deg, #000080 0px, #000080 8px, #1084d0 8px, #1084d0 12px)',
        titlebar: 'linear-gradient(90deg, #000080, #1084d0)',
        photo:    'linear-gradient(145deg, #a0a0a0, #d0d0d0)',
      },
      keyframes: {
        windowOpen: {
          from: { transform: 'scale(0.97) translateY(6px)', opacity: '0.5' },
          to:   { transform: 'scale(1) translateY(0)',      opacity: '1'   },
        },
        fadeUp: {
          from: { transform: 'translateY(10px)', opacity: '0' },
          to:   { transform: 'translateY(0)',    opacity: '1' },
        },
        menuPop: {
          from: { transform: 'scaleY(0.6)', opacity: '0' },
          to:   { transform: 'scaleY(1)',   opacity: '1' },
        },
        blink: {
          '0%, 100%': { opacity: '1' },
          '50%':      { opacity: '0' },
        },
        pulseDot: {
          '0%, 100%': { boxShadow: '0 0 0 0 rgba(0,204,68,0.6)' },
          '50%':      { boxShadow: '0 0 0 5px rgba(0,204,68,0)'  },
        },
      },
      animation: {
        'window-open': 'windowOpen 0.18s ease-out',
        'fade-up':     'fadeUp 0.4s ease forwards',
        'menu-pop':    'menuPop 0.12s ease-out',
        blink:         'blink 1.1s step-end infinite',
        'pulse-dot':   'pulseDot 2s ease-in-out infinite',
      },
    },
  },
  plugins: [],
} satisfies Config
