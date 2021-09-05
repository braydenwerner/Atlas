export type ThemeType = typeof theme['light']

const theme = {
  light: {
    theme: 'light',
    primaryContainer: '#ffff',
    secondaryContainer: '#D1D1D1',
    primaryText: '#000000',
    secondaryText: '#808080',
    primaryContrast: '',
    dividerLine: '2px solid rgba(0,0,0,0.1)',
    minimizeButton: '#222222',
  },
  dark: {
    theme: 'dark',
    primaryContainer: '#181818',
    secondaryContainer: '#3F3F3F',
    primaryText: '#FFFFFF',
    secondaryText: '#808080',
    primaryContrast: '',
    dividerLine: '2px solid rgba(255,255,255,0.1)',
    minimizeButton: '#d3d3d3',
  },
}

export const commonColors = {
  red: '#C6493A',
}

export default theme
