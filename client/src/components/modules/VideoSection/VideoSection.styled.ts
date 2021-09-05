import { BsChevronDoubleDown } from 'react-icons/bs'
import styled, { keyframes } from 'styled-components'

export const VideoSectionContainer = styled.div`
  margin: 0px 15px 0px 15px;
  overflow: hidden;
`

export const VideosHeader = styled.div`
  font-size: 1.5rem;
  padding: 0.2em;
  color: ${(props) => props.theme.primaryText};
  user-select: none;
`

export const VideoSelectorContainer = styled.div`
  display: flex;
  justify-content: space-around;
  width: 100%;
  margin-top: 10px; 
  padding: 0.5em 0 em 0;
  user-select: none;
  }
`

interface SelectionOptionProps {
  isSelected: boolean
}
export const SelectionOption = styled.div<SelectionOptionProps>`
  font-size: 1.2rem;
  padding: 1em;
  cursor: pointer;
  filter: brightness(85%);
  color: ${(props) =>
    props.isSelected ? props.theme.primaryText : props.theme.secondaryText};

  &:hover {
    filter: brightness(100%);
  }
`

export const ContentContainer = styled.div`
  min-height: 300px;
`
