import styled from 'styled-components'

export const ImageSectionContainer = styled.div`
  margin: 0px 15px 0px 15px;
  overflow: hidden;
`

export const ImagesHeader = styled.div`
  font-size: 1.5rem;
  padding: 0.2em;
  color: ${(props) => props.theme.primaryText};
  user-select: none;
`

export const ImagesSubHeader = styled.div`
  font-size: 1.1rem;
  padding: 0.2em;
  color: ${(props) => props.theme.primaryText};
  user-select: none;
`

export const RandomImageContainer = styled.div`
  display: flex;
  margin: 15px 0px 0px 25px;
  margin-top: 15px;
  width: 88%;
  justify-content: space-between;
`

export const ImageSelectorContainer = styled.div`
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
