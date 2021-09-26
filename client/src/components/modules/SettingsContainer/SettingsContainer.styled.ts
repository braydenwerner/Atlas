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
