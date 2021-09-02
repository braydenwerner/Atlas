import styled from 'styled-components'

export const TodoContainer = styled.div`
  display: flex;
  align-items: center;
  width: 100%;
  min-height: 30px;
  font-size: 1rem;
  color: ${(props) => props.theme.primaryText};
`

export const EditorInput = styled.textarea`
  position: relative;
  left: 10px;
  font-family: 'Open Sans', sans-serif;
  width: 210px;
  padding-left: 0.2em;
  padding-top: 0.2em;
  padding-bottom: 0;
  word-wrap: break-word;
  outline: none;
  border: none;
  font-size: 1rem;
  opacity: 0.98;
  background-color: #222222;
  border-radius: 5px;
  resize: none;
  overflow: hidden;
  color: ${(props) => props.theme.primaryText};
`

interface TodoTitleProps {
  checked: boolean
}
export const TodoTitle = styled.div<TodoTitleProps>`
  position: relative;
  left: 10px;
  width: 210px;
  padding: 0.2em;
  word-wrap: break-word;
  text-decoration: ${(props) => (props.checked ? ' line-through' : 'none')};
`

export const Checkbox = styled.input.attrs({ type: 'checkbox' })`
  position: relative;
  left: 10px;
  outline: none;
  width: 12px;
  height: 12px;
  border-radius: 3px;
  cursor: pointer;
`

export const DeleteEditContainer = styled.div`
  position: absolute;
  display: flex;
  right: 0px;
  justify-content: space-around;
  width: 60px;
`
