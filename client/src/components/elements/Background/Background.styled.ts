import styled from 'styled-components'

export const BackgroundImageContainer = styled.div`
  position: fixed;
  top: -50%;
  left: -50%;
  width: 200%;
  height: 200%;
  z-index: -1;
`

interface BackgroundImageProps {
  image?: string
}
export const BackgroundImage = styled.img<BackgroundImageProps>`
  position: absolute;
  top: -1px;
  left: -1px;
  width: 101%;
  height: 101%;
  background-position: center center;
  background-repeat: no-repeat;
  background-size: cover;
  z-index: -1;
  background-image: url('${(props) => props.image}');
  user-select: none;
`

export const Video = styled.video`
  position: fixed;
  right: 0;
  bottom: 0;
  z-index: -1;
  min-width: 100%;
  min-height: 100%;
`
