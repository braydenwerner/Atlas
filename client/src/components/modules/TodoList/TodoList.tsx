import React, { useContext, useEffect, useRef, useState } from 'react'

import {
  useCreateTodoMutation,
  useDeleteTodoMutation,
  useUpdateTodoMutation,
  useGetTodosLazyQuery,
} from '../../../generated/graphql'
import { OtherSettingsContext, SignedInContext } from '../../../providers/'
import { DynamicContainer } from '../'
import { Todo } from '../../elements'
import { useLocalStorage } from '../../../hooks/useLocalStorage'
import * as Styled from './TodoList.styled'

type TodoList = TodoType[]

export interface TodoType {
  id: number
  title: string
  isChecked: boolean
}

//  Two Optimization Strategies:
//  1. Use localstorage to cache the data so there is still data being rendered
//  while the data is being fetched from the database.
//  2. Reflect changes (CRUD operations) client-side and update the database alongside and separately
//  so every time a change is made, we do not need to wait for the database to return the updated todos
export const TodoList: React.FC = () => {
  const { tokenAttached, user } = useContext(SignedInContext)
  const { containerColor } = useContext(OtherSettingsContext)

  const [draggableDisabled, setDraggableDisabled] = useState(false)

  //  an option to hide todos even if they are set to visible in the visibility context
  //  ex. a user wants quick access to todos (does not want to go to settings to toggle)
  //  but does not want it showing at the moment
  const [minimizeTodos, setMinimizeTodos] = useLocalStorage(
    'minimizeTodos',
    true
  )

  const [todos, setTodos] = useLocalStorage<TodoList | null>('todos', [])

  const [getTodos, { data }] = useGetTodosLazyQuery()
  const todosData = data && data.getTodos

  const [createTodoMutation] = useCreateTodoMutation()
  const [updateTodoMutation] = useUpdateTodoMutation()
  const [deleteTodoMutation] = useDeleteTodoMutation()

  useEffect(() => {
    //  only want to make this query once the user is signed in and the session cookie is attached
    if (tokenAttached) {
      getTodos()
    }
  }, [tokenAttached])

  useEffect(() => {
    if (todosData) {
      setTodos(
        [...todosData].sort(
          (
            a: TodoType & { createdAt: string },
            b: TodoType & { createdAt: string }
          ) => parseInt(a.createdAt) - parseInt(b.createdAt)
        )
      )
    }
  }, [todosData])

  const formRef = useRef() as React.MutableRefObject<HTMLInputElement>

  const addTodo = (formTitleValue: string) => {
    //  maximum of 15 todos
    if (todos && todos.length === 15) return

    setTodos((oldTodos) => {
      if (!oldTodos) return null

      return [
        ...oldTodos,
        {
          id: oldTodos.length > 0 ? oldTodos[oldTodos.length - 1].id + 1 : 1,
          title: formTitleValue,
          isChecked: false,
          checkedAt: null,
        },
      ]
    })

    if (user) {
      createTodoMutation({
        variables: { title: formTitleValue },
      })
    }
  }

  const deleteTodo = (id: number) => {
    setTodos((oldTodos) => {
      if (!oldTodos) return null

      return oldTodos.filter((todo: TodoType) => todo.id !== id)
    })

    if (user) {
      deleteTodoMutation({
        variables: { id },
      })
    }
  }

  const updateTodo = (id: number, newTitle: string) => {
    setTodos((oldTodos) => {
      if (!oldTodos) return null

      return oldTodos.map((todo: TodoType) =>
        todo.id === id ? { ...todo, title: newTitle } : todo
      )
    })

    if (user) {
      updateTodoMutation({
        variables: { id, data: { title: newTitle } },
      })
    }
  }

  const toggleChecked = (id: number) => {
    //	if a todo is checked, it will still show for 5 seconds before deleting itself
    const todo = todos?.find((todo) => todo.id === id)

    setTodos((oldTodos) => {
      if (!oldTodos) return null

      return oldTodos.map((todo: TodoType) =>
        todo.id === id
          ? { ...todo, isChecked: !todo.isChecked, checkedAt: Date.now() }
          : todo
      )
    })

    if (user && todo) {
      updateTodoMutation({
        variables: {
          id,
          data: {
            isChecked: !todo.isChecked,
          },
        },
      })
    }
  }

  const handleFormSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    if (!formRef || !formRef.current) return

    const formValue = formRef.current.value

    //	whatever string validation you want here
    if (formValue.length > 0 && formValue.length < 100) addTodo(formValue)

    formRef.current.value = ''
  }

  return (
    <>
      {!minimizeTodos && (
        <DynamicContainer
          draggableDisabled={draggableDisabled}
          nodeTitle="TodoList"
          defaultLocation={{
            x: 0.001,
            y: 0.005,
          }}
        >
          <Styled.TodoListContainer containerColor={containerColor}>
            {todos &&
              todos.map((todo: TodoType, i) => (
                <Todo
                  key={i}
                  todo={todo}
                  deleteTodo={deleteTodo}
                  updateTodo={updateTodo}
                  toggleChecked={toggleChecked}
                  setDraggableDisabled={setDraggableDisabled}
                />
              ))}
            <Styled.TodoForm onSubmit={handleFormSubmit}>
              <Styled.TodoInput
                ref={formRef}
                placeholder="New Todo"
                containerColor={containerColor}
              />
            </Styled.TodoForm>
          </Styled.TodoListContainer>
        </DynamicContainer>
      )}
      <Styled.MinimizeTodosButton
        minimizeTodos={minimizeTodos}
        onClick={() => setMinimizeTodos((oldMinimizeTodo) => !oldMinimizeTodo)}
      >
        Todos
      </Styled.MinimizeTodosButton>
    </>
  )
}
