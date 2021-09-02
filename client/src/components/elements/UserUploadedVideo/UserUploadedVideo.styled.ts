import styled from 'styled-components'

export const VideoContainer = styled.div``

interface VideoProps {
  currentBackground: boolean
  selected: boolean | undefined
  favorite: boolean
  videoLoading: boolean
}
export const Video = styled.video<VideoProps>`
  position: relative;
  width: auto;
  height: auto;
  max-width: 100px;
  max-height: 100px;
  cursor: pointer;
  z-index: 2;
  display: ${(props) => (props.videoLoading ? 'none' : 'initial')};
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
