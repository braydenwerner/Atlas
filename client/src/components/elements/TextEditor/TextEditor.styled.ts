import styled from 'styled-components'

export const EditorContainer = styled.div`
  cursor: text;
  width: 98%;
  height: 100%;
  color: ${(props) => props.theme.primaryText};
`

interface EditorOverlayProps {
  width: number
}
export const EditorOverlay = styled.div<EditorOverlayProps>`
  position: absolute;
  height: 82px;
  cursor: initial;
  width: ${(props) => props.width}px;
`
