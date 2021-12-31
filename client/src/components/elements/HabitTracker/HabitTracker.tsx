import React, {
  useEffect,
  useState,
  useRef,
  SetStateAction,
  Dispatch,
} from 'react'
import { BsTrashFill } from 'react-icons/bs'
import { AiFillEdit } from 'react-icons/ai'

import { TodoType } from '../../modules/TodoList/TodoList'
import * as Styled from './HabitTracker.styled'

interface TodoProps {
  todo: TodoType
  deleteTodo: (id: number) => void
  updateTodo: (id: number, newTitle: string) => void
  toggleChecked: (id: number) => void
  setDraggableDisabled: Dispatch<SetStateAction<boolean>>
}

export const Todo: React.FC<TodoProps> = ({
  todo,
  deleteTodo,
  updateTodo,
  toggleChecked,
  setDraggableDisabled,
}) => {
  //  when they hover, we want to show them and edit and a delete icon
  const [isHoveringTodo, setIsHoveringTodo] = useState<boolean>(false)
  //  this will be conditionally rendered and will take the place of the todo title when true
  const [isTodoEditorOpen, setIsTodoEditorOpen] = useState<boolean>(false)
  const [inputHeight, setInputHeight] = useState(0)

  const titleRef = useRef() as
    | React.RefObject<HTMLDivElement>
    | null
    | undefined
  const editorFormRef = useRef() as
    | React.RefObject<HTMLTextAreaElement>
    | null
    | undefined

  useEffect(() => {
    if (titleRef && titleRef.current) {
      setInputHeight(titleRef.current.clientHeight)
    }
  }, [titleRef])

  //  when you click the edit icon, the input should be focused
  useEffect(() => {
    if (isTodoEditorOpen && editorFormRef && editorFormRef.current) {
      editorFormRef.current.focus()
      editorFormRef.current.value = todo.title
    }
  }, [isTodoEditorOpen])

  const handleEditorSubmit = (e: any) => {
    e.preventDefault()
    if (!todo || !editorFormRef || !editorFormRef.current) return

    const formValue = editorFormRef.current.value

    //	whatever string validation you want here, probably same as in TodoList
    //  so you might want to create a validation form helper function for both
    if (formValue.length > 0 && formValue.length < 100)
      updateTodo(todo.id, formValue)

    editorFormRef.current.value = ''
    setIsTodoEditorOpen(false)
  }

  return (
    <Styled.TodoContainer
      onMouseEnter={() => setIsHoveringTodo(true)}
      onMouseLeave={() => setIsHoveringTodo(false)}
    >
      <Styled.Checkbox
        checked={todo.isChecked}
        onClick={() => toggleChecked(todo.id)}
        readOnly={true}
      />
      {isTodoEditorOpen ? (
        <Styled.EditorInput
          ref={editorFormRef}
          onMouseEnter={() => setDraggableDisabled(true)}
          onMouseLeave={() => setDraggableDisabled(false)}
          style={{ height: `${inputHeight}px` }}
          onKeyDown={(e) => {
            if (e.key === 'Enter') {
              handleEditorSubmit(e)
            }
          }}
        />
      ) : (
        <Styled.TodoTitle checked={todo.isChecked} ref={titleRef}>
          {todo.title}
        </Styled.TodoTitle>
      )}
      {isHoveringTodo && (
        <Styled.DeleteEditContainer>
          <BsTrashFill
            style={{ cursor: 'pointer' }}
            size={15}
            onClick={() => deleteTodo(todo.id)}
          />
          <AiFillEdit
            style={{ cursor: 'pointer' }}
            size={15}
            onClick={() => {
              setIsTodoEditorOpen((oldIsTodoEditorOpen) => !oldIsTodoEditorOpen)
            }}
          />
        </Styled.DeleteEditContainer>
      )}
    </Styled.TodoContainer>
  )
}
