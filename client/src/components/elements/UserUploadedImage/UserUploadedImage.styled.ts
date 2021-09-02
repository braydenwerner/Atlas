import styled from 'styled-components'

export const ImageContainer = styled.div``

interface ImageProps {
  currentBackground: boolean
  selected: boolean | undefined
  favorite: boolean
  imageLoading: boolean
}
export const Image = styled.img<ImageProps>`
  position: relative;
  width: auto;
  height: auto;
  max-width: 100px;
  max-height: 100px;
  cursor: pointer;
  z-index: 2;
  display: ${(props) => (props.imageLoading ? 'none' : 'initial')};
  ${(props) => props.favorite && `border: 1px solid yellow;`}
  ${(props) => props.currentBackground && `border: 2px solid green;`}
  ${(props) =>
    props.selected &&
    `border: 2px solid #324FFD;
    filter: brightness(65%);

  `}

  &:hover {
    filter: brightness(85%);
  }
`
