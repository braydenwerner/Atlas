import { createContext, useMemo } from 'react'

import { useLocalStorage } from '../hooks/useLocalStorage'

export const OtherSettingsContext = createContext({
  usingDigitalClock: true,
  greetingColor: '#FFFFFF',
  containerColor: '',
  randomWallpaperURL: '',
  componentToggleState: {
    usingRandomWallpaper: true,
    usingArmyTime: false,
  },
  setUsingDigitalClock: (usingDigitalClock: boolean) => {
    return
  },
  setGreetingColor: (color: string) => {
    return
  },
  setContainerColor: (color: string) => {
    return
  },
  setRandomWallpaperURL: (url: string) => {
    return
  },
  toggle: (component: string) => {
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
  const [randomWallpaperURL, setRandomWallpaperURL] = useLocalStorage(
    'randomWallpaperURL',
    ''
  )
  const [componentToggleState, setComponentToggleState] = useLocalStorage(
    'componentToggleState',
    {
      usingRandomWallpaper: true,
      usingArmyTime: false,
    }
  )

  const toggle = (component: string) => {
    switch (component) {
      case 'RandomWallpaper':
        setComponentToggleState((oldComponentToggleState) => {
          const usingRandomWallpaper =
            !oldComponentToggleState.usingRandomWallpaper

          return { ...oldComponentToggleState, usingRandomWallpaper }
        })
        break
      case 'ArmyTime':
        setComponentToggleState((oldComponentToggleState) => {
          const usingArmyTime = !oldComponentToggleState.usingArmyTime

          return { ...oldComponentToggleState, usingArmyTime }
        })
        break
    }
  }

  const settingsValue = useMemo(
    () => ({
      usingDigitalClock,
      greetingColor,
      containerColor,
      randomWallpaperURL,
      componentToggleState,
      setUsingDigitalClock,
      setGreetingColor,
      setContainerColor,
      setRandomWallpaperURL,
      toggle,
    }),
    [
      usingDigitalClock,
      greetingColor,
      containerColor,
      randomWallpaperURL,
      componentToggleState,
      toggle,
    ]
  )
  return (
    <OtherSettingsContext.Provider value={settingsValue}>
      {children}
    </OtherSettingsContext.Provider>
  )
}
