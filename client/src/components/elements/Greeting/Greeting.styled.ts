import styled from 'styled-components'
import { BiPencil } from 'react-icons/bi'
import { IoIosColorPalette } from 'react-icons/io'
import { VscTriangleUp } from 'react-icons/vsc'

import { ContainerColorProps } from '../../../styles/constantStyles'

interface ColorProps {
  color: string
}

interface ClockProps {
  $usingDigitalClock: boolean
}

export const Overlay = styled.div`
  position: absolute;
  width: 100%;
  height: 100%;
  z-index: 0;
`

export const GreetingsContainer = styled.div<ClockProps>`
  position: absolute;
  z-index: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  border-radius: 10px;
  opacity: 0.98;
  width: 320px;
  max-height: 300px;
  user-select: none;
  height: ${(props) => (props.$usingDigitalClock ? '270px' : '320px')};
`

export const TimeContainer = styled.div<ColorProps>`
  font-size: 8.5rem;
  color: ${(props) => props.color};
`

export const GreetingMessageContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
`

export const GreetingMessage = styled.div<ColorProps>`
  position: absolute;
  font-size: 3rem;
  text-align: center;
  width: 1000px;
  margin-top: 15px;
  color: ${(props) => props.color};
`

export const UpdatingGreetingMessageForm = styled.form`
  position: absolute;
  text-align: center;
  width: 1000px;
  margin-top: 15px;
`

export const UpdatingGreetingMessageInput = styled.input<ColorProps>`
  font-size: 3rem;
  font-family: 'Open Sans', sans-serif;
  text-align: center;
  border: none;
  background-color: orange;
  max-width: 300px;
  outline: none;
  color: ${(props) => props.color};
  background-color: transparent;
`

export const GreetingIconsContainer = styled.div<ClockProps>`
  display: flex;
  position: absolute;
  justify-content: space-around;
  width: 100px;
  margin-top: 55px;
  top: ${(props) => (props.$usingDigitalClock ? '205px' : '260px')};
`

export const EditGreetingIcon = styled(BiPencil)<ColorProps>`
  cursor: pointer;
  color: ${(props) => props.color};
`

export const EditColorIcon = styled(IoIosColorPalette)<ColorProps>`
  cursor: pointer;
  color: ${(props) => props.color};
`

export const ColorPickerContainer = styled.div``

export const TriangleIcon = styled(VscTriangleUp)<
  ClockProps & ContainerColorProps
>`
  position: absolute;
  right: 118px;
  opacity: 0.8;
  top: ${(props) => (props.$usingDigitalClock ? '262px' : '312px')};
  color: ${(props) => props.theme.primaryContainer};
  color: ${(props) => props.containerColor};
`
