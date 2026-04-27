export const theme = {
  colors: {
    bg: {
      primary:   '#0A0C10',
      secondary: '#111318',
      tertiary:  '#1A1D24',
      elevated:  '#222631',
    },
    brand: {
      primary:   '#3B82F6',
      secondary: '#1D4ED8',
      accent:    '#F59E0B',
      glow:      'rgba(59,130,246,0.15)',
    },
    status: {
      nuevo:      '#3B82F6',
      en_proceso: '#F59E0B',
      resuelto:   '#10B981',
      rechazado:  '#6B7280',
      emergencia: '#EF4444',
    },
    cat: {
      seguridad:  '#EF4444',
      vialidad:   '#F97316',
      servicios:  '#EAB308',
      animales:   '#22C55E',
      salud:      '#A855F7',
      desastre:   '#3B82F6',
      emergencia: '#DC2626',
      otro:       '#6B7280',
    },
    text: {
      primary:   '#F0F2F5',
      secondary: '#8B95A5',
      muted:     '#4B5563',
      inverse:   '#0A0C10',
    },
    border: {
      subtle:  'rgba(255,255,255,0.06)',
      default: 'rgba(255,255,255,0.10)',
      focus:   'rgba(59,130,246,0.50)',
    },
  },

  radius: {
    sm: '8px', md: '12px', lg: '16px', xl: '24px', full: '9999px',
  },

  shadow: {
    card:    '0 1px 3px rgba(0,0,0,0.4), 0 1px 2px rgba(0,0,0,0.3)',
    modal:   '0 20px 60px rgba(0,0,0,0.6)',
    glow:    '0 0 20px rgba(59,130,246,0.25)',
    colored: (color) => `0 4px 20px ${color}40`,
  },

  spacing: {
    1: '4px',  2: '8px',  3: '12px', 4: '16px',
    5: '20px', 6: '24px', 8: '32px', 10: '40px',
    12: '48px', 16: '64px',
  },

  breakpoints: {
    mobile:  '390px',
    tablet:  '768px',
    desktop: '1280px',
  },

  transition: {
    fast:   'all 0.15s cubic-bezier(0.4, 0, 0.2, 1)',
    normal: 'all 0.25s cubic-bezier(0.4, 0, 0.2, 1)',
    spring: 'all 0.35s cubic-bezier(0.34, 1.56, 0.64, 1)',
  },
}
