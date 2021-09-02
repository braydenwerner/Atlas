import { FaStar } from 'react-icons/fa'
import { IoIosTrash } from 'react-icons/io'
import styled from 'styled-components'

export const SelectionContainer = styled.div`
  display: flex;
  flex-direction: column;
  height: 90px;
  align-items: center;
  justify-content: space-around;
  user-select: none;
  margin-top: 44px;
`

export const SelectionOptions = styled.div`
  position: relative;
  display: flex;
  width: 100%;
  height: 50px;
  top: 15px;
`

export const SelectAndSelectAllContainer = styled.div`
  display: flex;
  width: 60%;
  align-items: center;
  height: 40px;
`

export const SelectImageTitle = styled.div`
  position: relative;
  font-size: 1.25rem;
  color: ${(props) => props.theme.primaryText};
`

export const SelectOptionIconContainer = styled.div`
  display: flex;
  justify-content: flex-end;
  align-items: center;
  width: 40%;
`

export const DeleteSelectedIcon = styled(IoIosTrash)`
  cursor: pointer;
  margin: 0px 10px 0px 10px;
  filter: brightness(85%);
  color: ${(props) => props.theme.primaryText};

  &:hover {
    filter: brightness(100%);
  }
`

export const StarSelectedIcon = styled(FaStar)`
  cursor: pointer;
  margin: 0px 10px 0px 10px;
  filter: brightness(85%);
  color: ${(props) => props.theme.primaryText};

  &:hover {
    filter: brightness(100%);
  }
`

export const SelectImagesButton = styled.div`
  font-size: 1rem;
  cursor: pointer;
  font-size: 1rem;
  cursor: pointer;
  margin-left: 25px;
  filter: brightness(75%);
  color: ${(props) => props.theme.primaryText};

  &:hover {
    filter: brightness(150%);
  }
`

export const ImagesContainer = styled.div`
  display: grid;
  align-items: center;
  justify-items: center;
  padding: 2em 0em 2em 0em;
  grid-gap: 2px;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  grid-template-columns: repeat(auto-fit, minmax(100px, 1fr));
  user-select: none;
`

interface FavoriteIconProps {
  $isFavorite: boolean
}
export const FavoriteIcon = styled(FaStar)<FavoriteIconProps>`
  ${(props) => props.$isFavorite && `color: yellow`}
`

interface SelectionOverlayProps {
  height: number
}
export const SelectionOverlay = styled.div<SelectionOverlayProps>`
  position: absolute;
  width: 96%;
  z-index: 0;
  height: ${(props) => props.height}px;
`
