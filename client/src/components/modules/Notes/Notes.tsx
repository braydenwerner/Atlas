import { RefObject, useContext, useEffect, useRef, useState } from 'react'

import useLocalStorage from '../../../hooks/useLocalStorage'
import {
  GetNotesDocument,
  useCreateNoteMutation,
  useDeleteNoteMutation,
  useGetNotesLazyQuery,
} from '../../../generated/graphql'
import { OtherSettingsContext, SignedInContext } from '../../../providers'
import { DynamicContainer } from '../'
import { NotePreview, TextEditor } from '../../elements'

import { noteType } from '../../../types'
import { useMediaQuery } from '../../../hooks/useMediaQuery'
import * as Styled from './Notes.styled'

export type Notes = noteType[]

export const Notes: React.FC = () => {
  const { tokenAttached } = useContext(SignedInContext)
  const { containerColor } = useContext(OtherSettingsContext)

  const [minimizeNotes, setMinimizeNotes] = useLocalStorage(
    'minimizeNotes',
    true
  )

  const [notes, setNotes] = useState<Notes | null>([])
  const [filteredNotes, setFilteredNotes] = useState<Notes | null>([])
  const [selectedNote, setSelectedNote] = useState<noteType | null>()
  const [notesInput, setNotesInput] = useState('')
  const [fullscreen, setFullscreen] = useState(false)
  const [draggableDisabled, setDraggableDisabled] = useState(false)

  const [getNotes, { data }] = useGetNotesLazyQuery()
  const notesData = data && data.getNotes

  const [createNoteMutation] = useCreateNoteMutation()
  const [deleteNoteMutation] = useDeleteNoteMutation()

  const searchRef = useRef() as RefObject<HTMLInputElement> | null | undefined

  useEffect(() => {
    //  only want to make this query once the user is signed in and the session cookie is attached
    if (tokenAttached) {
      getNotes()
    }
  }, [tokenAttached])

  useEffect(() => {
    if (notesData) {
      setNotes(
        [...notesData].sort(
          (
            a: noteType & { createdAt: string },
            b: noteType & { createdAt: string }
          ) => parseInt(b.updatedAt) - parseInt(a.updatedAt)
        )
      )
    }
  }, [notesData])

  useEffect(() => {
    if (!searchRef || !searchRef.current) return
    const val = searchRef.current.value

    if (notes) {
      setFilteredNotes(
        notes.filter((notesObj) => {
          return (
            // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
            JSON.parse(notesObj.body!)
              ?.blocks[0]?.text.toLowerCase()
              .indexOf(val.toLocaleLowerCase()) >= 0
          )
        })
      )
    }
  }, [notes, notesInput])

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.currentTarget.value
    setNotesInput(val)
  }

  const fullScreenWidth = useMediaQuery('(max-width: 1250px)')
  const fullScreenHeight = useMediaQuery('(max-height: 720px)')
  return (
    <>
      {!minimizeNotes && (
        <Styled.NotesWrapper>
          <DynamicContainer
            nodeTitle="Notes"
            defaultLocation={{ x: 0, y: 0 }}
            draggableDisabled={draggableDisabled}
            fullscreen={fullscreen}
          >
            <Styled.NotesContainer
              containerColor={containerColor}
              fullscreen={fullscreen || fullScreenWidth || fullScreenHeight}
            >
              <Styled.SidebarContainer fullscreen={fullscreen}>
                <Styled.SearchBar>
                  <Styled.SearchIconContainer>
                    <Styled.SearchIcon size={24} />
                  </Styled.SearchIconContainer>
                  <Styled.SearchNoteInput
                    ref={searchRef}
                    placeholder="Search"
                    onChange={handleSearch}
                  />
                </Styled.SearchBar>
                {filteredNotes && filteredNotes.length > 0
                  ? filteredNotes.map(
                      (note: noteType, i) =>
                        note && (
                          <NotePreview
                            key={i}
                            note={note}
                            notes={filteredNotes}
                            index={i}
                            setSelectedNote={setSelectedNote}
                            isSelected={selectedNote?.id === note.id}
                          />
                        )
                    )
                  : notes &&
                    notes.map(
                      (note: noteType, i) =>
                        note && (
                          <NotePreview
                            key={i}
                            note={note}
                            notes={notes}
                            index={i}
                            setSelectedNote={setSelectedNote}
                            isSelected={selectedNote?.id === note.id}
                          />
                        )
                    )}
              </Styled.SidebarContainer>
              <Styled.EditorContainer fullscreen={fullscreen}>
                {selectedNote && (
                  <TextEditor
                    note={selectedNote}
                    fullscreen={fullscreen}
                    setDraggableDisabled={setDraggableDisabled}
                  />
                )}
                <Styled.IconContainer>
                  <Styled.CreateNoteIcon
                    size={32}
                    onClick={async () => {
                      const note = await createNoteMutation({
                        refetchQueries: [{ query: GetNotesDocument }],
                      })
                      if (note && note.data?.createNote) {
                        setSelectedNote(note.data.createNote as noteType)
                      }
                    }}
                  />
                  <Styled.DeleteNoteIcon
                    size={32}
                    onClick={async () => {
                      if (selectedNote) {
                        await deleteNoteMutation({
                          variables: { id: selectedNote.id },
                          refetchQueries: [{ query: GetNotesDocument }],
                        })
                        setSelectedNote(null)
                      }
                    }}
                  />
                  {fullscreen
                    ? !fullScreenWidth &&
                      !fullScreenHeight && (
                        <Styled.MinimizeNoteIcon
                          size={30}
                          onClick={() => {
                            setDraggableDisabled(false)
                            setFullscreen(false)
                          }}
                        />
                      )
                    : !fullScreenWidth &&
                      !fullScreenHeight && (
                        <Styled.MaximizeNoteIcon
                          size={30}
                          onClick={() => {
                            setDraggableDisabled(true)
                            setFullscreen(true)
                          }}
                        />
                      )}
                  {(fullScreenWidth || fullScreenHeight) && (
                    <Styled.CloseNotesIcon
                      size={30}
                      onClick={() => {
                        setSelectedNote(null)
                        setMinimizeNotes((oldMinimizeNote) => !oldMinimizeNote)
                      }}
                    />
                  )}
                </Styled.IconContainer>
              </Styled.EditorContainer>
            </Styled.NotesContainer>
          </DynamicContainer>
          <Styled.NotesOverlay onClick={() => setMinimizeNotes(true)} />
        </Styled.NotesWrapper>
      )}
      <Styled.MinimizeNotesButton
        minimizeNotes={minimizeNotes}
        onClick={() => {
          setSelectedNote(null)
          setMinimizeNotes((oldMinimizeNote) => !oldMinimizeNote)
        }}
      >
        Notes
      </Styled.MinimizeNotesButton>
    </>
  )
}
