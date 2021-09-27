import { isSelectedProps } from '../../../types'
import { AiFillCaretDown } from 'react-icons/ai'
import styled, { keyframes } from 'styled-components'

import { ContainerColorProps } from '../../../styles/constantStyles'

const settingsWrapperAnimationIn = keyframes`
  0% {
    bottom: 65px;
    opacity: 0;
  }
`

interface SettingsArrowIconProps {
  $containerColor: string
}
export const SettingsArrowIcon = styled(
  AiFillCaretDown
)<SettingsArrowIconProps>`
  position: absolute;
  opacity: 0.85;
  left: 27px;
  bottom: 51px;
  z-index: 5;
  color: ${(props) => props.theme.primaryContainer};
  color: ${(props) => props.$containerColor};
  animation: ${settingsWrapperAnimationIn} 0.1s linear;
  animation-fill-mode: forwards;
`

export const SettingsWrapper = styled.div<ContainerColorProps>`
  display: flex;
  position: absolute;
  width: 650px;
  height: 400px;
  left: 15px;
  bottom: 70px;
  z-index: 3;
  border-radius: 8px;
  opacity: 0.9;
  background-color: ${(props) => props.theme.primaryContainer};
  background-color: ${(props) => props.containerColor};
  animation: ${settingsWrapperAnimationIn} 0.1s linear;
  animation-fill-mode: forwards;
`

export const SettingsSelectorColumn = styled.div`
  width: 25%;
  opacity: 0.97;
  user-select: none;
  position: relative;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  border-right: ${(props) => props.theme.dividerLine};
`

interface SettingsSelectorItemProps {
  small?: boolean
}
export const SettingsSelectorItem = styled.li<
  isSelectedProps & SettingsSelectorItemProps
>`
  font-size: ${(props) => (props.small ? '.95rem' : '1.2rem')};
  padding: 0.5em;
  cursor: pointer;
  list-style: none;
  filter: brightness(85%);
  color: ${(props) =>
    props.isSelected ? props.theme.primaryText : props.theme.secondaryText};

  &:hover {
    filter: brightness(100%);
  }
`

export const BottomSelectorContainer = styled.div``

export const SettingsDisplayColumn = styled.div<ContainerColorProps>`
  position: relative;
  width: 75%;
  overflow: auto;
  opacity: 0.95;
  margin: 4px 5px 4px 0px;
  background-color: ${(props) => props.theme.primaryContainer};
  background-color: ${(props) => props.containerColor};
`

export const FeedbackLink = styled.a`
  font-size: 0.95rem;

  text-decoration: none;
  color: ${(props) => props.theme.secondaryText};
`

export const UnsubscribePayment = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  position: absolute;
  width: 450px;
  height: 150px;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  z-index: 6;
  opacity: 0.98;
  border-radius: 15px;
  background-color: ${(props) => props.theme.primaryContainer};
`

export const UnsubscribeHeader = styled.div`
  font-size: 1rem;
  padding: 1em;
  color: ${(props) => props.theme.primaryText};
`

export const CancelSubscriptionOverlay = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100vh;
  z-index: 5;
  background-color: rgba(0, 0, 0, 0.75);
`

export const ButtonContainer = styled.div`
  display: flex;
  width: 90%;
  justify-content: space-around;
`

export const CancelButton = styled.button`
  margin-top: 10px;
  cursor: pointer;
  border: 1px solid rgba(255, 255, 255, 0.8);
  width: 150px;
  text-align: center;
  color: white;
  font-size: 1.3rem;
  padding: 0.2em;
  border-radius: 20px;
  background-color: rgba(255, 255, 255, 0.05);

  color: ${(props) => props.theme.primaryText};

  &:hover {
    border: 1px solid white;
  }
`

export const ConfirmButton = styled.button`
  margin-top: 10px;
  cursor: pointer;
  border: 1px solid rgba(255, 255, 255, 0.8);
  width: 150px;
  text-align: center;
  color: white;
  font-size: 1.3rem;
  padding: 0.2em;
  border-radius: 20px;
  background-color: rgba(255, 255, 255, 0.05);

  color: ${(props) => props.theme.primaryText};

  &:hover {
    border: 1px solid white;
  }
`
