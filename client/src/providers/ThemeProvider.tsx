import { createContext, useContext, useMemo } from 'react'
import { ThemeProvider as StyledThemeProvider } from 'styled-components'

import { theme } from '../styles/index'
import { useLocalStorage } from '../hooks/useLocalStorage'
import { SignedInContext } from '.'

export const ThemeContext = createContext({
  themeMode: 'dark',
  currentFont: 'Open Sans',
  setTheme: (theme: string) => {
    return
  },
  setCurrentFont: (theme: string) => {
    return
  },
})

export const ThemeProvider: React.FC = ({ children }) => {
  const { hasPaid } = useContext(SignedInContext)

  const [themeMode, setThemeMode] = useLocalStorage('theme', 'dark')
  const [currentFont, setCurrentFont] = useLocalStorage('font', 'Open Sans')

  const setTheme = (theme: string) => {
    setThemeMode(theme)
  }

  const currentTheme = (theme as any)[themeMode]

  const themeValue = useMemo(
    () => ({ themeMode, currentFont, setTheme, setCurrentFont }),
    [themeMode, currentFont]
  )

  //  user should not be able to get access to premium features
  //  by changing local storage, so this check is necessary
  return (
    <div style={{ fontFamily: hasPaid ? currentFont : '' }}>
      <ThemeContext.Provider value={themeValue}>
        <StyledThemeProvider theme={currentTheme}>
          {children}
        </StyledThemeProvider>
      </ThemeContext.Provider>
    </div>
  )
}
