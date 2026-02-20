export const theme = {
  colors: {
    background: '#fffdf9',
    surface1: '#ffffff',
    surface2: '#fff7ef',
    foreground: '#1f1f1f',
    muted: '#5a5248',
    border: '#e8e1d8',
    primary: '#f97316',
    primaryStrong: '#ea580c',
    primarySoft: '#ffedd5'
  },
  spacing: {
    1: '4px',
    2: '8px',
    3: '12px',
    4: '16px',
    6: '24px',
    8: '32px',
    12: '48px',
    16: '64px',
    24: '96px',
    section: '3rem'
  },
  layout: {
    container: '1120px',
    reading: '720px'
  },
  radius: {
    sm: '8px',
    md: '12px',
    lg: '16px'
  },
  shadow: {
    sm: '0 1px 2px rgb(0 0 0 / 6%)',
    md: '0 8px 24px rgb(0 0 0 / 10%)'
  }
} as const;
