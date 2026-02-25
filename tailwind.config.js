/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      fontFamily: {
        display: ['"Orbitron"', 'sans-serif'],
        mono: ['"IBM Plex Mono"', 'monospace'],
        body: ['"Exo 2"', 'sans-serif'],
      },
      colors: {
        seismic: {
          bg:       '#080c18',
          panel:    '#0d1224',
          border:   '#1e2a45',
          amber:    '#f59e0b',
          emerald:  '#10b981',
          red:      '#ef4444',
          blue:     '#3b82f6',
          muted:    '#4a5568',
        },
      },
      boxShadow: {
        'glow-amber': '0 0 16px rgba(245,158,11,0.35)',
        'glow-red':   '0 0 16px rgba(239,68,68,0.35)',
        'glow-green': '0 0 16px rgba(16,185,129,0.3)',
      },
    },
  },
  plugins: [require('daisyui')],
  daisyui: {
    themes: [
      {
        seismic: {
          'primary':         '#f59e0b',
          'primary-content': '#080c18',
          'secondary':       '#10b981',
          'accent':          '#3b82f6',
          'neutral':         '#1e2a45',
          'base-100':        '#080c18',
          'base-200':        '#0d1224',
          'base-300':        '#141d35',
          'base-content':    '#e2e8f0',
          'error':           '#ef4444',
          'warning':         '#f59e0b',
          'success':         '#10b981',
          'info':            '#3b82f6',
        },
      },
    ],
  },
};
