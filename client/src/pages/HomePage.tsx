import { useState, useEffect, useContext } from 'react'
import { MdSettings } from 'react-icons/md'
import styled, { keyframes, css } from 'styled-components'

import { useGetUserLazyQuery } from '../generated/graphql'
import {
  Background,
  Greeting,
  SearchBar,
  WeatherWidget,
  Drawings,
  StocksWidget,
} from '../components/elements'
import { useLocalStorage } from '../hooks/useLocalStorage'
import { TodoList, SettingsContainer, Notes } from '../components/modules'
import {
  ThemeContext,
  SignedInContext,
  VisiblityToggleContext,
} from '../providers'

export const HomePage: React.FC = () => {
  const { tokenAttached, setHasPaid } = useContext(SignedInContext)
  const { setTheme } = useContext(ThemeContext)
  const { componentVisiblity } = useContext(VisiblityToggleContext)

  const [name, setName] = useLocalStorage('name', '')
  const [selectedBackground, setSelectedBackground] = useLocalStorage<
    string | undefined
  >('selectedBackground', undefined)
  const [greetingMessage, setGreetingMessage] = useLocalStorage(
    'greetingMessage',
    ''
  )

  const [showingSettings, setShowingSettings] = useState(false)

  const [getUser, { data }] = useGetUserLazyQuery()
  const userData = data && data.getUser

  useEffect(() => {
    //  only want to make this query once the user is signed in and the session cookie is attached
    if (tokenAttached) {
      getUser()
    }
  }, [tokenAttached])

  useEffect(() => {
    if (userData?.name) setName(userData.name)

    if (userData?.selectedUserBackground)
      setSelectedBackground(userData.selectedUserBackground)

    if (userData?.colorTheme) setTheme(userData.colorTheme)

    if (userData?.greetingMessage) setGreetingMessage(userData.greetingMessage)

    if (userData?.paymentType === 'paid') setHasPaid(true)
  }, [userData])

  return (
    <>
      <SettingsIconContainer>
        <SettingsIcon
          onClick={() =>
            setShowingSettings((oldShowingSettings) => !oldShowingSettings)
          }
          $showingSettings={showingSettings}
          size={30}
        />
      </SettingsIconContainer>
      {showingSettings && (
        <>
          <SettingsContainer
            selectedBackground={selectedBackground}
            setSelectedBackground={setSelectedBackground}
          />
          <SettingsContainerOverlay onClick={() => setShowingSettings(false)} />
        </>
      )}
      <DynamicContainerWrapper>
        {componentVisiblity.showingGreeting && (
          <Greeting
            name={name}
            greetingMessage={greetingMessage}
            setGreetingMessage={setGreetingMessage}
          />
        )}
        {componentVisiblity.showingTodoList && <TodoList />}
        {componentVisiblity.showingWeatherWidget && <WeatherWidget />}
        {componentVisiblity.showingNotes && <Notes />}
        {componentVisiblity.showingSearchbar && <SearchBar />}
        {componentVisiblity.showingDrawings && <Drawings />}
        {componentVisiblity.showingStocksWidget && <StocksWidget />}
      </DynamicContainerWrapper>
      <Background selectedBackground={selectedBackground} />
    </>
  )
}

const SettingsContainerOverlay = styled.div`
  position: absolute;
  z-index: 1;
  width: 100%;
  height: 100%;
  user-select: none;
`

const SettingsIconRotateAnimationIn = keyframes`
  100% {
    width: 35px;
    height: 35px;
    transform: rotate(40deg);
  }
`

const SettingsIconRotateAnimationOut = keyframes`
  100% {
    width: 30px;
    height: 30px;
    transform: rotate(-40deg);
  }
`

const SettingsIconContainer = styled.div`
  position: absolute;
  z-index: 2;
  display: flex;
  justify-content: center;
  align-items: center;
  left: 15px;
  bottom: 15px;
  width: 50px;
  height: 50px;
`

interface SettingsIconProps {
  $showingSettings: boolean
}

const SettingsIcon = styled(MdSettings)<SettingsIconProps>`
  color: ${(props) => props.theme.primaryText};
  animation-duration: 0.15s;
  animation-fill-mode: forwards;
  filter: brightness(85%);
  cursor: pointer;

  ${(props) =>
    props.$showingSettings
      ? css`
          animation-name: ${SettingsIconRotateAnimationIn};
        `
      : css`
          animation-name: ${SettingsIconRotateAnimationOut};
        `}

  &:hover {
    filter: brightness(100%);
  }
`

const DynamicContainerWrapper = styled.div`
  position: absolute;
  height: 100%;
  width: 100%;
`
