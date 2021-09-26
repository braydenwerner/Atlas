import { BsChevronDoubleDown } from 'react-icons/bs'
import styled, { keyframes } from 'styled-components'

export interface ContainerColorProps {
  containerColor?: string
}

export const ScrollDownContainer = styled.div`
  display: flex;
  justify-content: center;
`

const ScrollDownIndicatorAnimation = keyframes`
  50% {
    opacity: .6;
  }
`

export const ScrollDownIndicator = styled(BsChevronDoubleDown)`
  position: relative;
  margin-top: 15px;
  color: ${(props) => props.theme.primaryText};
  animation: ${ScrollDownIndicatorAnimation};
  animation-fill-mode: forwards;
  animation-duration: 0.9s;
  animation-iteration-count: infinite;
`

export const PremiumMarker = styled.span`
  font-size: 0.7rem;
  margin-left: 10px;
  padding: 2px;
  border-radius: 3px;
  color: ${(props) => props.theme.primaryText};
  background-color: ${(props) => props.theme.secondaryContainer};
`
