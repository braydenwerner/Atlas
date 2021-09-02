import { BiRefresh } from 'react-icons/bi'
import { TiArrowBack } from 'react-icons/ti'
import { FaThermometerHalf } from 'react-icons/fa'
import styled, { keyframes } from 'styled-components'

import { ContainerColorProps } from '../../../styles/constantStyles'

export const WeatherWidgetContainer = styled.div<ContainerColorProps>`
  position: absolute;
  z-index: 1;
  display: flex;
  flex-direction: column;
  justify-content: center;
  width: 200px;
  padding-bottom: 20px;
  align-items: center;
  border-radius: 10px;
  opacity: 0.8;
  text-align: center;
  user-select: none;
  background-color: ${(props) => props.theme.primaryContainer};
  background-color: ${(props) => props.containerColor};
`

export const WeatherWidgetHeader = styled.div`
  font-size: 1.5rem;
  font-weight: 700;
  padding: 1em;
  user-select: none;
  color: ${(props) => props.theme.primaryText};
`

export const WeatherWidgetRow = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  margin-bottom: 15px;
`

export const WeatherWidgetItem = styled.div`
  color: ${(props) => props.theme.primaryText};
`

const IconAnimation = keyframes`
  100% {
    transform: translate(0,-2px);
  }
`

export const RefetchIcon = styled(BiRefresh)`
  margin: auto;
  color: ${(props) => props.theme.primaryText};
  filter: brightness(85%);

  &:hover {
    filter: brightness(100%);
    animation-name: ${IconAnimation};
    animation-duration: 0.1s;
    animation-fill-mode: forwards;
  }
`
export const BackIcon = styled(TiArrowBack)`
  margin: auto;
  color: ${(props) => props.theme.primaryText};
  filter: brightness(85%);

  &:hover {
    filter: brightness(100%);
    animation-name: ${IconAnimation};
    animation-duration: 0.1s;
    animation-fill-mode: forwards;
  }
`

export const TemperatureIcon = styled(FaThermometerHalf)`
  margin: auto;
  color: ${(props) => props.theme.primaryText};
  filter: brightness(85%);

  &:hover {
    filter: brightness(100%);
    animation-name: ${IconAnimation};
    animation-duration: 0.1s;
    animation-fill-mode: forwards;
  }
`

export const Input = styled.input<ContainerColorProps>`
  font-size: 1rem;
  width: 170px;
  height: 30px;
  border-radius: 7px;
  outline: none;
  border: none;
  color: ${(props) => props.theme.primaryText};
  background-color: ${(props) => props.theme.primaryContainer};
  background-color: ${(props) => props.containerColor};
`
export const IconWrapper = styled.div`
  width: 90%;
  display: flex;
  flex-direction: space-between;
  margin: auto;
`
