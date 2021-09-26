import { TiArrowBack } from 'react-icons/ti'
import styled from 'styled-components'

import { ContainerColorProps } from '../../../styles/constantStyles'

export const StocksContainer = styled.div<ContainerColorProps>`
  position: absolute;
  z-index: 1;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 730px;
  height: 470px;
  border-radius: 10px;
  opacity: 0.8;
  user-select: none;
  padding: 0.3em;
  background-color: ${(props) => props.theme.primaryContainer};
  background-color: ${(props) => props.containerColor};
`

export const BackIcon = styled(TiArrowBack)`
  margin: auto;
  color: ${(props) => props.theme.primaryText};
  filter: brightness(85%);

  &:hover {
    filter: brightness(100%);
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
