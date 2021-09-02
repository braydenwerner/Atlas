import {
  useRef,
  useContext,
  useState,
  useEffect,
  SetStateAction,
  Dispatch,
} from 'react'
import Draft, { convertFromRaw, convertToRaw, EditorState } from 'draft-js'
import { Editor } from 'react-draft-wysiwyg'
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css'

import {
  useUpdateNoteMutation,
  GetNotesDocument,
} from '../../../generated/graphql'
import { ThemeContext } from '../../../providers/ThemeProvider'
import { noteType } from '../../../types'
import { MAX_EDITOR_CHARACTER_COUNT } from '../../../util/constants'
import { OtherSettingsContext } from '../../../providers'
import * as Styled from './TextEditor.styled'
import './TextEditor.css'

interface TextEditorProps {
  note: noteType
  fullscreen: boolean
  setDraggableDisabled: Dispatch<SetStateAction<boolean>>
}

export const TextEditor: React.FC<TextEditorProps> = ({
  note,
  fullscreen,
  setDraggableDisabled,
}) => {
  const { themeMode } = useContext(ThemeContext)
  const { containerColor } = useContext(OtherSettingsContext)

  const [editorState, setEditorState] = useState(() =>
    EditorState.createEmpty()
  )
  const [containerDimensions, setContainerDimensions] = useState({
    width: 0,
    height: 0,
  })
  const [, setPrevState] = useState()

  const [updateNote] = useUpdateNoteMutation()

  const containerRef = useRef() as
    | React.RefObject<HTMLDivElement>
    | null
    | undefined

  useEffect(() => {
    if (note.body && note.body.length > 0) {
      const rawNote = convertFromRaw(JSON.parse(note.body))
      if (rawNote) {
        const contentState = EditorState.createWithContent(rawNote)
        setEditorState(EditorState.moveFocusToEnd(contentState))
      }
    } else {
      //  the note is empty
      const contentState = EditorState.createEmpty()
      setEditorState(EditorState.moveFocusToEnd(contentState))
    }
    //  save every one second
    const save = setInterval(saveContent, 1000)

    return () => clearInterval(save)
  }, [note])

  useEffect(() => {
    if (containerRef?.current) {
      setContainerDimensions({
        width: containerRef.current.clientWidth,
        height: containerRef.current.clientHeight,
      })
    }
  }, [containerRef, fullscreen])

  const saveContent = () => {
    let editorStateUpdated
    let prevState
    //  since it is being used in the an callback, the most recent state is not being obtained
    setEditorState((oldEditorState) => {
      editorStateUpdated = JSON.stringify(
        convertToRaw(oldEditorState.getCurrentContent())
      )
      return oldEditorState
    })

    setPrevState((oldPrevState) => {
      prevState = oldPrevState
      return oldPrevState
    })

    //  if they are the same, there is no need to send an update
    if (editorStateUpdated !== prevState) {
      updateNote({
        variables: {
          id: note.id,
          data: {
            body: editorStateUpdated,
          },
        },
        refetchQueries: [{ query: GetNotesDocument }],
      })
    }
    setPrevState(editorStateUpdated)
  }

  const handleEditorChange = (newState: Draft.EditorState) => {
    const contentState = newState.getCurrentContent()
    const oldContent = editorState.getCurrentContent()
    if (
      contentState === oldContent ||
      contentState.getPlainText().length <= MAX_EDITOR_CHARACTER_COUNT
    ) {
      setEditorState(newState)
    } else {
      setEditorState(
        Draft.EditorState.undo(
          Draft.EditorState.push(
            editorState,
            Draft.ContentState.createFromText(oldContent.getPlainText()),
            'delete-character'
          )
        )
      )
    }
  }

  return (
    <>
      <Styled.EditorOverlay
        width={containerDimensions.width}
        onMouseEnter={() => setDraggableDisabled(false)}
      />
      <Styled.EditorContainer
        ref={containerRef}
        onMouseEnter={() => setDraggableDisabled(true)}
        onMouseLeave={() => setDraggableDisabled(false)}
      >
        <Editor
          editorState={editorState}
          onEditorStateChange={handleEditorChange}
          wrapperClassName={`wrapper-class-${themeMode}`}
          editorClassName={`editor-class-${themeMode}`}
          toolbarClassName={`toolbar-class-${themeMode}`}
          editorStyle={{
            fontSize: '24px',
            marginLeft: '15px',
            height: containerDimensions.height - 117 + 'px',
            backgroundColor: containerColor,
          }}
          toolbarStyle={{
            marginTop: '14px',
            justifyContent: 'center',
            backgroundColor: containerColor,
          }}
          wrapperStyle={{
            backgroundColor: containerColor,
          }}
        />
      </Styled.EditorContainer>
    </>
  )
}
