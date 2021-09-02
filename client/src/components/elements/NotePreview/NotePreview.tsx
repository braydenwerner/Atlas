import { Dispatch, SetStateAction } from 'react'
import moment from 'moment'

import { noteType } from '../../../types'
import { isToday } from '../../../util/constants'
import * as Styled from './NotePreview.styled'

interface NoteProps {
  note: noteType
  notes: noteType[]
  index: number
  setSelectedNote: Dispatch<SetStateAction<noteType | undefined | null>>
  isSelected: boolean
}

export const NotePreview: React.FC<NoteProps> = ({
  note,
  notes,
  index,
  setSelectedNote,
  isSelected,
}) => {
  const date = new Date(parseInt(note.updatedAt))

  let title = note.body
    ? JSON.parse(note.body).blocks[0]?.text
    : 'Untitled Note'
  title = title.length > 0 ? title : 'Untitled Note'
  const subTitle = note.body ? JSON.parse(note.body).blocks[1]?.text : null

  const dateOrTime = isToday(parseInt(note.updatedAt))
    ? moment(date.getHours() + ':' + date.getMinutes(), 'HH:mm').format(
        'h:mm A'
      )
    : date.toLocaleDateString()

  return (
    <Styled.NotePreviewContainer
      isSelected={isSelected}
      onClick={() => setSelectedNote(notes[index])}
    >
      <Styled.TitleTimeStampRow>
        <Styled.NoteTitle>{title}</Styled.NoteTitle>
        <Styled.Timestamp>{dateOrTime}</Styled.Timestamp>
      </Styled.TitleTimeStampRow>
      {subTitle && <Styled.NoteSubTitle>{subTitle}</Styled.NoteSubTitle>}
    </Styled.NotePreviewContainer>
  )
}
