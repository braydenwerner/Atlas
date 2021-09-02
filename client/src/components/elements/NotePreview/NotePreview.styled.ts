import styled from 'styled-components'

interface NotePreviewContainerProps {
  isSelected: boolean
}
export const NotePreviewContainer = styled.div<NotePreviewContainerProps>`
  padding: 1em;
  width: 100%;
  min-height: 55px;
  margin: 15px 15px 15px 15px;
  cursor: pointer;
  background-color: ${(props) =>
    props.isSelected && props.theme.secondaryContainer};
`

export const TitleTimeStampRow = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
`

export const NoteTitle = styled.div`
  font-size: 1.2rem;
  margin-left: 15px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  color: ${(props) => props.theme.primaryText};
`

export const NoteSubTitle = styled.div`
  font-size: 1rem;
  margin-left: 15px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  color: ${(props) => props.theme.secondaryText};
`

export const Timestamp = styled.span`
  font-size: 0.8rem;
  margin: 0px 15px 0px 15px;
  color: ${(props) => props.theme.secondaryText};
  min-width: 55px;
`
