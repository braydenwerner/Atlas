import styled from 'styled-components'

import { ContainerColorProps } from '../../../styles/constantStyles'

export const StocksContainer = styled.div<ContainerColorProps>`
  position: absolute;
  z-index: 1;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 330px;
  border-radius: 10px;
  opacity: 0.8;
  user-select: none;
  padding: 0.3em;
  background-color: ${(props) => props.theme.primaryContainer};
  background-color: ${(props) => props.containerColor};
`
