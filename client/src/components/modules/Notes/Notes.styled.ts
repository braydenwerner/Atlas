import { IoIosAddCircleOutline, IoIosTrash } from 'react-icons/io'
import { FiMinimize2, FiMaximize2, FiSearch } from 'react-icons/fi'
import styled from 'styled-components'
import { AiOutlineMinus } from 'react-icons/ai'

import { ContainerColorProps } from '../../../styles/constantStyles'

export const NotesWrapper = styled.div`
  position: absolute;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100%;
`

interface FullScreenProps {
  fullscreen: boolean
}
export const NotesContainer = styled.div<FullScreenProps & ContainerColorProps>`
  position: absolute;
  display: flex;
  opacity: 0.95;
  align-items: center;
  user-select: none;
  z-index: ${(props) => (props.fullscreen ? 3 : 2)};
  border-radius: ${(props) => (props.fullscreen ? '0px' : '20px')};
  height: ${(props) => (props.fullscreen ? '100%' : '700px')};
  width: ${(props) => (props.fullscreen ? '100%' : '1230px')};
  background-color: ${(props) => props.theme.primaryContainer};
  background-color: ${(props) => props.containerColor};
`

export const SidebarContainer = styled.div<FullScreenProps>`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 20%;
  height: 100%;
  border-right: ${(props) => props.theme.dividerLine};
  overflow-x: hidden;
  *::-webkit-scrollbar {
    width: 12px;
  }

  *::-webkit-scrollbar-track {
    background: #ffffff;
  }

  *::-webkit-scrollbar-thumb {
    background-color: #79757a;
    border-radius: 10px;
    border: 3px solid #ffffff;
  }
`

export const SearchBar = styled.div`
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
  color: ${(props) => props.theme.primaryText};
  background-color: ${(props) => props.theme.secondaryContainer};
`

export const EditorContainer = styled.div<FullScreenProps>`
  display: flex;
  flex-direction: column;
  width: 80%;
  height: 100%;
`

export const IconContainer = styled.div`
  position: absolute;
  bottom: 10px;
  right: 45px;
  display: flex;
  width: 100%;
  height: 50px;
  justify-content: flex-end;
  align-items: center;
`

export const CreateNoteIcon = styled(IoIosAddCircleOutline)`
  cursor: pointer;
  margin: 0px 10px 0px 10px;
  filter: brightness(85%);
  color: ${(props) => props.theme.primaryText};

  &:hover {
    filter: brightness(150%);
  }
`

export const DeleteNoteIcon = styled(IoIosTrash)`
  cursor: pointer;
  margin: 0px 10px 0px 10px;
  filter: brightness(85%);
  color: ${(props) => props.theme.primaryText};

  &:hover {
    filter: brightness(100%);
  }
`

export const MinimizeNoteIcon = styled(FiMinimize2)`
  cursor: pointer;
  margin: 0px 10px 0px 10px;
  filter: brightness(85%);
  color: ${(props) => props.theme.primaryText};

  &:hover {
    filter: brightness(100%);
  }
`

export const MaximizeNoteIcon = styled(FiMaximize2)`
  cursor: pointer;
  margin: 0px 10px 0px 10px;
  filter: brightness(85%);
  color: ${(props) => props.theme.primaryText};

  &:hover {
    filter: brightness(100%);
  }
`

export const CloseNotesIcon = styled(AiOutlineMinus)`
  cursor: pointer;
  margin: 0px 10px 0px 10px;
  filter: brightness(85%);
  color: ${(props) => props.theme.primaryText};

  &:hover {
    filter: brightness(100%);
  }
`

export const NotesOverlay = styled.div`
  position: absolute;
  width: 100%;
  height: 100%;
`

interface MinimizeNoteButtonProps {
  minimizeNotes: boolean
}
export const MinimizeNotesButton = styled.button<MinimizeNoteButtonProps>`
  position: absolute;
  bottom: 20px;
  right: 90px;
  cursor: pointer;
  font-size: 1.2rem;
  border: none;
  user-select: none;
  background-color: transparent;
  z-index: 1;
  color: ${(props) =>
    props.minimizeNotes ? props.theme.minimizeButton : props.theme.primaryText};

  &:hover {
    filter: brightness(150%);
  }
`
