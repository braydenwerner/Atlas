import { useState, useContext, SetStateAction, Dispatch } from 'react'
import { ColorResult, SliderPicker } from 'react-color'

import { OtherSettingsContext } from '../../../providers/index'
import { useUpdateUserMutation } from '../../../generated/graphql'
import { ThemeContext } from '../../../providers/index'
import { ToggleSwitch } from '../../elements/index'
import * as Styled from './GeneralSection.styled'
import { PremiumMarker } from '../../../styles/constantStyles'

interface GeneralSectionProps {
  hasPaid: boolean
  setShowingPayment: Dispatch<SetStateAction<boolean>>
}

export const GeneralSection: React.FC<GeneralSectionProps> = ({
  hasPaid,
  setShowingPayment,
}) => {
  const { themeMode, setTheme, setCurrentFont } = useContext(ThemeContext)
  const {
    usingDigitalClock,
    setUsingDigitalClock,
    greetingColor,
    setGreetingColor,
    containerColor,
    setContainerColor,
  } = useContext(OtherSettingsContext)

  const [showCustomThemeSelection, setShowCustomThemeSelection] =
    useState(false)
  //  have to store in local state as well, bug with using localstorage
  const [_greetingColor, _setGreetingColor] = useState(greetingColor)
  const [_containerColor, _setContainerColor] = useState(containerColor)
  const [colorInfo, setColorInfo] = useState<ColorResult>()

  const [updateUser] = useUpdateUserMutation()

  const handleResetContainerPositions = () => {
    localStorage.removeItem('Greeting-location')
    localStorage.removeItem('TodoList-location')
    localStorage.removeItem('Notes-location')
    localStorage.removeItem('WeatherWidget-location')
    localStorage.removeItem('SearchBar-location')
    localStorage.removeItem('Drawings-location')
    localStorage.removeItem('StocksWidget-location')

    // TODO: useContext and change variable globally to update instead
    window.location.reload()
  }

  return (
    <>
      <Styled.GeneralSectionContainer>
        <Styled.GeneralHeader>General</Styled.GeneralHeader>
        <Styled.GeneralSubHeader>Show</Styled.GeneralSubHeader>
        <Styled.CustomizationContainer>
          <Styled.CustomizationRow disableBorderTop={true}>
            <Styled.CustomizationLabel>Todos</Styled.CustomizationLabel>
            <Styled.SubOptionContainer>
              <ToggleSwitch
                visiblityComponent="showingTodoList"
                isVisibilityToggle={true}
              />
            </Styled.SubOptionContainer>
          </Styled.CustomizationRow>
          <Styled.CustomizationRow>
            <Styled.CustomizationLabel>Greeting</Styled.CustomizationLabel>
            <Styled.SubOptionContainer>
              <ToggleSwitch
                visiblityComponent="showingGreeting"
                isVisibilityToggle={true}
              />
            </Styled.SubOptionContainer>
          </Styled.CustomizationRow>
          <Styled.CustomizationRow>
            <Styled.CustomizationLabel>Notes</Styled.CustomizationLabel>
            <Styled.SubOptionContainer>
              <ToggleSwitch
                visiblityComponent="showingNotes"
                isVisibilityToggle={true}
              />
            </Styled.SubOptionContainer>
          </Styled.CustomizationRow>
          <Styled.CustomizationRow>
            <Styled.CustomizationLabel>Drawings</Styled.CustomizationLabel>
            <Styled.SubOptionContainer>
              <ToggleSwitch
                visiblityComponent="showingDrawings"
                isVisibilityToggle={true}
              />
            </Styled.SubOptionContainer>
          </Styled.CustomizationRow>
          <Styled.CustomizationRow>
            <Styled.CustomizationLabel>Weather</Styled.CustomizationLabel>
            <Styled.SubOptionContainer>
              <ToggleSwitch
                visiblityComponent="showingWeatherWidget"
                isVisibilityToggle={true}
              />
            </Styled.SubOptionContainer>
          </Styled.CustomizationRow>
          <Styled.CustomizationRow
            onClick={() => {
              if (!hasPaid) {
                setShowingPayment(true)
              }
            }}
          >
            <Styled.CustomizationLabel>
              Stocks <PremiumMarker>Premium ⭐</PremiumMarker>
            </Styled.CustomizationLabel>
            <Styled.SubOptionContainer>
              <ToggleSwitch
                visiblityComponent="showingStocksWidget"
                isVisibilityToggle={true}
                disabled={!hasPaid}
              />
            </Styled.SubOptionContainer>
          </Styled.CustomizationRow>
          {/* <Styled.CustomizationRow>
          <Styled.CustomizationLabel>Search Bar</Styled.CustomizationLabel>
          <Styled.SubOptionContainer>
            <ToggleSwitch component="showingSearchbar" />
          </Styled.SubOptionContainer>
        </Styled.CustomizationRow> */}
        </Styled.CustomizationContainer>
        <Styled.GeneralSubHeader>Customization</Styled.GeneralSubHeader>
        <Styled.CustomizationContainer>
          <Styled.CustomizationColumn>
            <Styled.CustomizationRow disableBorderTop={true}>
              <Styled.CustomizationLabel style={{ marginLeft: '10px' }}>
                Theme
              </Styled.CustomizationLabel>
              <Styled.SubOptionContainer>
                <Styled.SubOption
                  isSelected={themeMode === 'dark' && !showCustomThemeSelection}
                  onClick={() => {
                    setTheme('dark')
                    setShowCustomThemeSelection(false)
                    //  set to empty string, will default to either dark or light
                    _setContainerColor('')
                    setContainerColor('')

                    updateUser({
                      variables: { data: { colorTheme: 'dark' } },
                    })
                  }}
                >
                  Dark
                </Styled.SubOption>
                <Styled.SubOption
                  isSelected={
                    themeMode === 'light' && !showCustomThemeSelection
                  }
                  onClick={() => {
                    setTheme('light')
                    setShowCustomThemeSelection(false)
                    //  set to empty string, will default to either dark or light
                    _setContainerColor('')
                    setContainerColor('')

                    updateUser({
                      variables: { data: { colorTheme: 'light' } },
                    })
                  }}
                >
                  Light
                </Styled.SubOption>
                {/* <Styled.SubOption
                isSelected={showCustomThemeSelection}
                onClick={() =>
                  setShowCustomThemeSelection(
                    (oldCustomThemeSelection) => !oldCustomThemeSelection
                  )
                }
              >
                Custom
              </Styled.SubOption> */}
              </Styled.SubOptionContainer>
            </Styled.CustomizationRow>
            <Styled.ThemeColorSliderContainer>
              {showCustomThemeSelection && (
                <Styled.SelectionWrapper>
                  <Styled.SliderPickerContainer>
                    <SliderPicker
                      color={_containerColor}
                      onChangeComplete={(color) => {
                        _setContainerColor(color.hex)
                        setColorInfo(color)
                        setContainerColor(color.hex)
                      }}
                    />
                  </Styled.SliderPickerContainer>
                  <Styled.SliderInfoContainer>
                    {colorInfo && (
                      <>
                        <Styled.ColorValue>{colorInfo.hex}</Styled.ColorValue>
                        <Styled.ColorValue>
                          ({colorInfo.rgb.r}, {colorInfo.rgb.g},{' '}
                          {colorInfo.rgb.b}, {colorInfo.rgb.a})
                        </Styled.ColorValue>
                      </>
                    )}
                  </Styled.SliderInfoContainer>
                </Styled.SelectionWrapper>
              )}
            </Styled.ThemeColorSliderContainer>
          </Styled.CustomizationColumn>
          <Styled.CustomizationRow>
            <Styled.CustomizationLabel>Font</Styled.CustomizationLabel>
            <Styled.SubOptionContainer>
              <Styled.SubOption
                isSelected={usingDigitalClock}
                onClick={() => setCurrentFont('Gemunu Libre')}
              >
                Simple
              </Styled.SubOption>
              <Styled.SubOption
                style={{ marginRight: '12px' }}
                isSelected={!usingDigitalClock}
                onClick={() => setCurrentFont('Open Sans')}
              >
                Startup
              </Styled.SubOption>
            </Styled.SubOptionContainer>
          </Styled.CustomizationRow>
          <Styled.CustomizationRow>
            <Styled.CustomizationLabel>
              Greeting Clock
            </Styled.CustomizationLabel>
            <Styled.SubOptionContainer>
              <Styled.SubOption
                isSelected={usingDigitalClock}
                onClick={() => setUsingDigitalClock(true)}
              >
                Digital
              </Styled.SubOption>
              <Styled.SubOption
                style={{ marginRight: '12px' }}
                isSelected={!usingDigitalClock}
                onClick={() => setUsingDigitalClock(false)}
              >
                Analog
              </Styled.SubOption>
            </Styled.SubOptionContainer>
          </Styled.CustomizationRow>
          {usingDigitalClock && (
            <Styled.SelectionWrapper>
              <Styled.CustomizationRow>
                <Styled.CustomizationLabel style={{ marginLeft: '12px' }}>
                  24-Hour Clock
                </Styled.CustomizationLabel>
                <Styled.SubOptionContainer>
                  <ToggleSwitch
                    otherSettingsComponent="usingArmyTime"
                    isVisibilityToggle={false}
                  />
                </Styled.SubOptionContainer>
              </Styled.CustomizationRow>
            </Styled.SelectionWrapper>
          )}
          <Styled.CustomizationRow>
            <Styled.CustomizationLabel style={{ marginTop: '20px' }}>
              Greeting Color
            </Styled.CustomizationLabel>
            <Styled.SliderPickerContainer style={{ marginTop: '40px' }}>
              <SliderPicker
                color={_greetingColor}
                onChangeComplete={(color) => {
                  _setGreetingColor(color.hex)
                  setGreetingColor(color.hex)
                }}
              />
            </Styled.SliderPickerContainer>
          </Styled.CustomizationRow>
        </Styled.CustomizationContainer>
        <Styled.GeneralSubHeader style={{ marginTop: '25px' }}>
          Other
        </Styled.GeneralSubHeader>
        <Styled.CustomizationContainer>
          <Styled.CustomizationRow disableBorderTop={true}>
            <Styled.CustomizationButton onClick={handleResetContainerPositions}>
              Reset Container Positions
            </Styled.CustomizationButton>
          </Styled.CustomizationRow>
        </Styled.CustomizationContainer>
      </Styled.GeneralSectionContainer>
    </>
  )
}
