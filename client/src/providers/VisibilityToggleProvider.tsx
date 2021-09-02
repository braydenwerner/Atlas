import { createContext, useMemo } from 'react'

import useLocalStorage from '../hooks/useLocalStorage'

export const VisiblityToggleContext = createContext({
  componentVisiblity: {
    showingTodoList: true,
    showingGreeting: true,
    showingNotes: true,
    showingWeatherWidget: false,
    showingSearchbar: false,
    showingDrawings: true,
    showingStocksWidget: false,
  },
  toggleVisibility: (component: string) => {
    return
  },
})

export const VisibilityToggleProvider: React.FC = ({ children }) => {
  const [componentVisiblity, setComponentVisiblity] = useLocalStorage(
    'componentVisibility',
    {
      showingTodoList: true,
      showingGreeting: true,
      showingNotes: true,
      showingWeatherWidget: false,
      showingSearchbar: false,
      showingDrawings: true,
      showingStocksWidget: false,
    }
  )

  const toggleVisibility = (component: string) => {
    switch (component) {
      case 'TodoList':
        setComponentVisiblity((oldComponentVisiblity) => {
          const showingTodoList = !oldComponentVisiblity.showingTodoList

          return { ...oldComponentVisiblity, showingTodoList }
        })
        break
      case 'Greeting':
        setComponentVisiblity((oldComponentVisiblity) => {
          const showingGreeting = !oldComponentVisiblity.showingGreeting

          return { ...oldComponentVisiblity, showingGreeting }
        })
        break
      case 'Notes':
        setComponentVisiblity((oldComponentVisiblity) => {
          const showingNotes = !oldComponentVisiblity.showingNotes

          return { ...oldComponentVisiblity, showingNotes }
        })
        break
      case 'WeatherWidget':
        setComponentVisiblity((oldComponentVisiblity) => {
          const showingWeatherWidget =
            !oldComponentVisiblity.showingWeatherWidget

          return { ...oldComponentVisiblity, showingWeatherWidget }
        })
        break
      case 'SearchBar':
        setComponentVisiblity((oldComponentVisiblity) => {
          const showingSearchbar = !oldComponentVisiblity.showingSearchbar

          return { ...oldComponentVisiblity, showingSearchbar }
        })
        break
      case 'Drawings':
        setComponentVisiblity((oldComponentVisiblity) => {
          const showingDrawings = !oldComponentVisiblity.showingDrawings

          return { ...oldComponentVisiblity, showingDrawings }
        })
        break
      case 'StocksWidget':
        setComponentVisiblity((oldComponentVisiblity) => {
          const showingStocksWidget = !oldComponentVisiblity.showingStocksWidget

          return { ...oldComponentVisiblity, showingStocksWidget }
        })
        break
    }
  }

  const componentVisibilityValue = useMemo(
    () => ({
      componentVisiblity,
      toggleVisibility,
    }),
    [componentVisiblity, toggleVisibility]
  )
  return (
    <VisiblityToggleContext.Provider value={componentVisibilityValue}>
      {children}
    </VisiblityToggleContext.Provider>
  )
}
