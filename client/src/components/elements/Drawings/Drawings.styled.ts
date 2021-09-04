import styled from 'styled-components'
import { ReactSketchCanvas } from 'react-sketch-canvas'
import { FaUndo, FaRedo } from 'react-icons/fa'
import { IoIosTrash, IoIosArrowBack, IoIosArrowForward } from 'react-icons/io'

import { BiEraser } from 'react-icons/bi'
import { TwitterPicker } from 'react-color'
import { ContainerColorProps } from '../../../styles/constantStyles'

interface ToggleViewProps {
  showCard: boolean
}
export const ToggleView = styled.div<ToggleViewProps>`
  position: relative;
  width: 450px;
  height: 380px;
  visibility: ${(props) => (props.showCard ? 'hidden' : 'visible')};
  z-index: 1;
`

export const DrawingCard = styled.div<ContainerColorProps>`
  position: absolute;
  z-index: 1;
  display: flex;
  flex-direction: column;
  justify-content: center;
  width: 450px;
  padding-bottom: 20px;
  align-items: center;
  border-radius: 10px;
  opacity: 0.8;
  text-align: center;
  user-select: none;
  background-color: ${(props) => props.theme.primaryContainer};
  background-color: ${(props) => props.containerColor};
`
export const ButtonsContainer = styled.div`
  display: flex;
  width: 50%;
  justify-content: space-around;
  align-items: center;
  margin: 20px 0 10px 0;
`

interface ColorPickerIconProps {
  backgroundColor: string
}
export const ColorPickerIcon = styled.div<ColorPickerIconProps>`
  position: relative;
  float: left;
  width: 19px;
  height: 19px;
  outline: solid 2px white;
  background-color: ${(props) => props.backgroundColor};
`

export const ColorPickerContainer = styled.div``

export const ColorPicker = styled(TwitterPicker)`
  position: absolute !important;
  top: 55px;
  right: 149px;
`

export const ColorSelector = styled.div`
  cursor: pointer;
`

export const WidthSelector = styled.div``

interface EraserIconProps {
  $isErasing: boolean
}
export const EraserIcon = styled(BiEraser)<EraserIconProps>`
  positon: relative;
  margin-right: 5px;
  color: ${(props) =>
    props.$isErasing ? 'pink' : `${props.theme.primaryText}`};
  cursor: pointer;
`

export const UndoIcon = styled(FaUndo)`
  color: ${(props) => props.theme.primaryText};
  position: relative;
  color: white;
  cursor: pointer;
`

export const RedoIcon = styled(FaRedo)`
  position: relative;
  color: ${(props) => props.theme.primaryText};

  cursor: pointer;
`

export const TrashIcon = styled(IoIosTrash)`
  color: ${(props) => props.theme.primaryText};
  cursor: pointer;
`

export const DrawingContainer = styled.div``

interface WhiteboardProps {
  background: string
}
export const Whiteboard = styled(ReactSketchCanvas)<WhiteboardProps>`
  svg {
    border-radius: 10px;
    background: ${(props) => `url(${props.background})`};
  }
`

export const PaginationContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`

export const LeftPageArrow = styled(IoIosArrowBack)`
  color: ${(props) => props.theme.primaryText};
  cursor: pointer;
  margin-right: 5px;
`

export const RightPageArrow = styled(IoIosArrowForward)`
  color: ${(props) => props.theme.primaryText};
  cursor: pointer;
  margin-left: 5px;
`

export const PaginationLabel = styled.p`
  color: ${(props) => props.theme.primaryText};
  font-size: 1 rem;
`

interface MinimizeDrawingsButtonProps {
  minimizeDrawings: boolean
}
export const MinimizeDrawingsButton = styled.button<MinimizeDrawingsButtonProps>`
  position: absolute;
  bottom: 20px;
  right: 157px;
  cursor: pointer;
  font-size: 1.2rem;
  border: none;
  user-select: none;
  background-color: transparent;
  z-index: 1;
  color: ${(props) =>
    props.minimizeDrawings
      ? props.theme.minimizeButton
      : props.theme.primaryText};

  &:hover {
    filter: brightness(150%);
  }
`
