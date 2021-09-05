import { createContext, useMemo } from 'react'

import { useLocalStorage } from '../hooks/useLocalStorage'

export const OtherSettingsContext = createContext({
  usingDigitalClock: true,
  greetingColor: '#FFFFFF',
  containerColor: '',
  usingRandomWallpaper: true,
  setUsingDigitalClock: (_usingDigitalClock: boolean) => {
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
  const [usingDigitalClock, _setUsingDigitalClock] = useLocalStorage(
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

  const setUsingDigitalClock = (_usingDigitalClock: boolean) => {
    _setUsingDigitalClock(_usingDigitalClock)
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
      setUsingDigitalClock,
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
