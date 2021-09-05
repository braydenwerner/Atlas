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
