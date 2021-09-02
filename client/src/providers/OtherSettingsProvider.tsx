import { createContext, useMemo } from 'react'

import { useLocalStorage } from '../hooks/useLocalStorage'

export const OtherSettingsContext = createContext({
  usingDigitalClock: true,
  greetingColor: '#FFFFFF',
  containerColor: '',
  usingRandomWallpaper: true,
  toggleUsingDigitalClock: () => {
    return
  },
  switchGreetingColor: (color: string) => {
    return
  },
  switchContainerColor: (color: string) => {
    return
  },
  toggleUsingRandomWallpaper: () => {
    return
  },
})

export const OtherSettingsProvider: React.FC = ({ children }) => {
  const [usingDigitalClock, setUsingDigitalClock] = useLocalStorage(
    'usingDigitalClock',
    true
  )
  const [greetingColor, setGreetingColor] = useLocalStorage(
    'greetingColor',
    '#FFFFFF'
  )
  const [containerColor, setContainerColor] = useLocalStorage(
    'containerColor',
    ''
  )
  const [usingRandomWallpaper, setUsingRandomWallpaper] = useLocalStorage(
    'randomWallpaper',
    true
  )

  const toggleUsingDigitalClock = () => {
    setUsingDigitalClock((oldUsingDigitalClock) => !oldUsingDigitalClock)
  }

  const switchGreetingColor = (color: string) => {
    setGreetingColor(color)
  }

  const switchContainerColor = (color: string) => {
    setContainerColor(color)
  }

  const toggleUsingRandomWallpaper = () => {
    setUsingRandomWallpaper(
      (oldUsingRandomWallpaper) => !oldUsingRandomWallpaper
    )
  }

  const settingsValue = useMemo(
    () => ({
      usingDigitalClock,
      greetingColor,
      containerColor,
      usingRandomWallpaper,
      toggleUsingDigitalClock,
      switchGreetingColor,
      switchContainerColor,
      toggleUsingRandomWallpaper,
    }),
    [usingDigitalClock, greetingColor, containerColor, usingRandomWallpaper]
  )
  return (
    <OtherSettingsContext.Provider value={settingsValue}>
      {children}
    </OtherSettingsContext.Provider>
  )
}
