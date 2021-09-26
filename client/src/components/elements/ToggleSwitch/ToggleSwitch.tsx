import { useContext } from 'react'
import { MdCancel, MdCheckCircle } from 'react-icons/md'
import Switch from 'react-switch'

import {
  ThemeContext,
  OtherSettingsContext,
  VisiblityToggleContext,
} from '../../../providers/index'

interface ToggleVisibilitySwitchProps {
  visiblityComponent?: keyof {
    showingTodoList: boolean
    showingGreeting: boolean
    showingNotes: boolean
    showingWeatherWidget: boolean
    showingSearchbar: boolean
    showingDrawings: boolean
    showingStocksWidget: boolean
  }
  otherSettingsComponent?: keyof {
    usingRandomWallpaper: boolean
    usingArmyTime: boolean
  }
  isVisibilityToggle: boolean
  disabled?: boolean
}

export const ToggleSwitch: React.FC<ToggleVisibilitySwitchProps> = ({
  visiblityComponent,
  otherSettingsComponent,
  isVisibilityToggle,
  disabled,
}) => {
  const { themeMode } = useContext(ThemeContext)
  const { componentVisiblity, toggleVisibility } = useContext(
    VisiblityToggleContext
  )
  const { componentToggleState, toggle } = useContext(OtherSettingsContext)

  return (
    <Switch
      disabled={disabled}
      checked={
        isVisibilityToggle
          ? visiblityComponent
            ? componentVisiblity[visiblityComponent]
            : false
          : otherSettingsComponent
          ? componentToggleState[otherSettingsComponent]
          : false
      }
      height={25}
      width={60}
      handleDiameter={10}
      activeBoxShadow="false"
      onHandleColor={themeMode === 'dark' ? '#FFFFFF' : '#000000'}
      offHandleColor={themeMode === 'dark' ? '#FFFFFF' : '#000000'}
      onColor={themeMode === 'dark' ? '#222222' : '#D1D1D1'}
      offColor={themeMode === 'dark' ? '#222222' : '#D1D1D1'}
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
          color={themeMode === 'dark' ? 'gray' : 'black'}
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
          color={themeMode === 'dark' ? 'gray' : 'black'}
        />
      }
      onChange={() => {
        if (visiblityComponent === 'showingGreeting')
          toggleVisibility('Greeting')
        else if (visiblityComponent === 'showingTodoList') {
          //  when user re-opens, should no longer be minimized
          localStorage.removeItem('minimizeTodo')
          toggleVisibility('TodoList')
        } else if (visiblityComponent === 'showingNotes') {
          toggleVisibility('Notes')
        } else if (visiblityComponent === 'showingWeatherWidget') {
          toggleVisibility('WeatherWidget')
        } else if (visiblityComponent === 'showingSearchbar') {
          toggleVisibility('SearchBar')
        } else if (visiblityComponent === 'showingDrawings') {
          toggleVisibility('Drawings')
        } else if (visiblityComponent === 'showingStocksWidget') {
          toggleVisibility('StocksWidget')
        } else if (otherSettingsComponent === 'usingRandomWallpaper') {
          toggle('RandomWallpaper')
        } else if (otherSettingsComponent === 'usingArmyTime') {
          toggle('ArmyTime')
        }
      }}
    />
  )
}
