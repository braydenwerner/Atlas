import styled from 'styled-components'

import { ContainerColorProps } from '../../../styles/constantStyles'

export const TodoListContainer = styled.div<ContainerColorProps>`
  position: absolute;
  z-index: 1;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 330px;
  border-radius: 10px;
  opacity: 0.8;
  user-select: none;
  padding: 0.3em;
  background-color: ${(props) => props.theme.primaryContainer};
  background-color: ${(props) => props.containerColor};
`

export const TodoForm = styled.form`
  display: flex;
  align-items: center;
  width: 280px;
  color: white;
`

export const TodoInput = styled.input<ContainerColorProps>`
  position: relative;
  right: 13px;
  outline: none;
  border: none;
  height: 35px;
  font-size: 1rem;
  opacity: 0.98;
  color: ${(props) => props.theme.primaryText};
  background-color: ${(props) => props.theme.primaryContainer};
  background-color: ${(props) => props.containerColor};

  ::placeholder {
    font-family: 'Open Sans', sans-serif;
  }
`

interface MinimizeTodoButtonProps {
  minimizeTodos: boolean
}

export const MinimizeTodosButton = styled.button<MinimizeTodoButtonProps>`
  position: absolute;
  z-index: 1;
  bottom: 20px;
  right: 25px;
  cursor: pointer;
  font-size: 1.2rem;
  border: none;
  user-select: none;
  color: ${(props) =>
    props.minimizeTodos ? props.theme.minimizeButton : props.theme.primaryText};
  background-color: transparent;

  &:hover {
    filter: brightness(150%);
  }
`
