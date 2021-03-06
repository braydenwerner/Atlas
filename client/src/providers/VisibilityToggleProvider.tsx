import { createContext, useContext, useEffect, useMemo } from 'react'
import { SignedInContext } from '.'

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
  const { hasPaid } = useContext(SignedInContext)

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

  useEffect(() => {
    //  if the user unsubscribes, disable the paid features
    if (componentVisiblity.showingStocksWidget && !hasPaid) {
      toggleVisibility('StocksWidget')
    }
  }, [])

  const toggleVisibility = (component: string | undefined) => {
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
