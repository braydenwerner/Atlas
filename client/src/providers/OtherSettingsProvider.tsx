import { createContext, useMemo } from 'react'

import { useLocalStorage } from '../hooks/useLocalStorage'

export const OtherSettingsContext = createContext({
  usingDigitalClock: true,
  greetingColor: '#FFFFFF',
  containerColor: '',
  usingRandomWallpaper: true,
  randomWallpaperURL: '',
  setUsingDigitalClock: (usingDigitalClock: boolean) => {
    return
  },
  setGreetingColor: (color: string) => {
    return
  },
  setContainerColor: (color: string) => {
    return
  },
  toggleUsingRandomWallpaper: () => {
    return
  },
  setRandomWallpaperURL: (url: string) => {
    return
  },
})

export const OtherSettingsProvider: React.FC = ({ children }) => {
  const [usingDigitalClock, setUsingDigitalClock] = useLocalStorage(
    'usingDigitalClock',
    true
  )
  const [greetingColor, _setGreetingColor] = useLocalStorage(
    'greetingColor',
    '#FFFFFF'
  )
  const [containerColor, _setContainerColor] = useLocalStorage(
    'containerColor',
    ''
  )
  const [usingRandomWallpaper, setUsingRandomWallpaper] = useLocalStorage(
    'randomWallpaper',
    true
  )
  const [randomWallpaperURL, _setRandomWallpaperURL] = useLocalStorage(
    'randomWallpaperURL',
    ''
  )

  //  passing the setState directly into the memo gives error:
  //  Cannot update a component (`OtherSettingsProvider`) while rendering a different component
  const setGreetingColor = (color: string) => {
    _setGreetingColor(color)
  }

  const setContainerColor = (color: string) => {
    _setContainerColor(color)
  }

  const setRandomWallpaperURL = (url: string) => {
    _setRandomWallpaperURL(url)
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
      randomWallpaperURL,
      setUsingDigitalClock,
      setGreetingColor,
      setContainerColor,
      toggleUsingRandomWallpaper,
      setRandomWallpaperURL,
    }),
    [
      usingDigitalClock,
      greetingColor,
      containerColor,
      usingRandomWallpaper,
      randomWallpaperURL,
    ]
  )
  return (
    <OtherSettingsContext.Provider value={settingsValue}>
      {children}
    </OtherSettingsContext.Provider>
  )
}
