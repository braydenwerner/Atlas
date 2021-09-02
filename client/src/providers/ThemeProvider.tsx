import { createContext, useMemo } from 'react'
import { ThemeProvider as StyledThemeProvider } from 'styled-components'

import { theme } from '../styles/index'
import { useLocalStorage } from '../hooks/useLocalStorage'

export const ThemeContext = createContext({
  themeMode: 'dark',
  setTheme: (theme: string) => {
    return
  },
})

export const ThemeProvider: React.FC = ({ children }) => {
  const [themeMode, setThemeMode] = useLocalStorage('theme', 'dark')

  const setTheme = (theme: string) => {
    setThemeMode(theme)
  }

  const currentTheme = (theme as any)[themeMode]
  const themeValue = useMemo(() => ({ themeMode, setTheme }), [themeMode])
  return (
    <ThemeContext.Provider value={themeValue}>
      <StyledThemeProvider theme={currentTheme}>{children}</StyledThemeProvider>
    </ThemeContext.Provider>
  )
}
