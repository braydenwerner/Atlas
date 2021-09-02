import { FiSearch } from 'react-icons/fi'
import styled from 'styled-components'

import { ContainerColorProps } from '../../../styles/constantStyles'

export const SearchBarContainer = styled.div<ContainerColorProps>`
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

export const SearchBarForm = styled.form`
  display: flex;
  align-items: center;
  width: 90%;
  margin-top: 2px;
`

export const SearchIconContainer = styled.div`
  background-color: ${(props) => props.theme.secondaryContainer};
  border-top-left-radius: 15px;
  border-bottom-left-radius: 15px;
  height: 36px;
  width: 20%;
`

export const SearchIcon = styled(FiSearch)`
  position: relative;
  top: 5px;
  left: 8px;
  cursor: pointer;
  filter: brightness(85%);
  color: ${(props) => props.theme.primaryText};

  &:hover {
    filter: brightness(150%);
  }
`

export const SearchNoteInput = styled.input`
  font-size: 1.15rem;
  padding: 0.4em;
  margin: 15px 0px 15px 0px;
  border-top-right-radius: 15px;
  border-bottom-right-radius: 15px;
  border: none;
  outline: none;
  width: 80%;
  height: 21px;
  color: ${(props) => props.theme.primaryText};
  background-color: ${(props) => props.theme.secondaryContainer};
`
