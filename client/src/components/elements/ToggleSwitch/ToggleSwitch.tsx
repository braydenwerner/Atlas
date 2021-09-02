import { useContext } from 'react'
import { MdCancel, MdCheckCircle } from 'react-icons/md'
import Switch from 'react-switch'

import {
  OtherSettingsContext,
  VisiblityToggleContext,
} from '../../../providers/index'

interface ToggleVisibilitySwitchProps {
  component: keyof {
    showingTodoList: boolean
    showingGreeting: boolean
    showingNotes: boolean
    showingWeatherWidget: boolean
    showingSearchbar: boolean
    showingDrawings: boolean
    usingRandomWallpaper: boolean
    showingStocksWidget: boolean
  }
}

export const ToggleSwitch: React.FC<ToggleVisibilitySwitchProps> = ({
  component,
}) => {
  const { componentVisiblity, toggleVisibility } = useContext(
    VisiblityToggleContext
  )
  const { usingRandomWallpaper, toggleUsingRandomWallpaper } =
    useContext(OtherSettingsContext)

  return (
    <Switch
      checked={
        component !== 'usingRandomWallpaper'
          ? componentVisiblity[component]
          : usingRandomWallpaper
      }
      height={25}
      width={60}
      handleDiameter={10}
      activeBoxShadow="false"
      onColor="#222222"
      offColor="#222222"
      checkedIcon={
        <MdCancel
          style={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            height: '100%',
            fontSize: 18,
            paddingLeft: 5,
          }}
          color="gray"
        />
      }
      uncheckedIcon={
        <MdCheckCircle
          style={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            height: '100%',
            fontSize: 18,
            paddingLeft: 14,
          }}
          color="gray"
        />
      }
      onChange={() => {
        if (component === 'showingGreeting') toggleVisibility('Greeting')
        else if (component === 'showingTodoList') {
          //  when user re-opens, should no longer be minimized
          localStorage.removeItem('minimizeTodo')
          toggleVisibility('TodoList')
        } else if (component === 'showingNotes') {
          toggleVisibility('Notes')
        } else if (component === 'showingWeatherWidget') {
          toggleVisibility('WeatherWidget')
        } else if (component === 'showingSearchbar') {
          toggleVisibility('SearchBar')
        } else if (component === 'showingDrawings') {
          toggleVisibility('Drawings')
        } else if (component === 'showingStocksWidget') {
          toggleVisibility('StocksWidget')
        } else if (component === 'usingRandomWallpaper') {
          toggleUsingRandomWallpaper()
        }
      }}
    />
  )
}
