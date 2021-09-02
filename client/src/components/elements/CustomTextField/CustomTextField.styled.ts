import styled, { keyframes } from 'styled-components'

export const TextInput = styled.input.attrs(({ type }) => ({
  type: type,
}))`
  width: 400px;
  height: 80px;
  font-size: 3.5rem;
  color: white;
  text-align: center;
  outline: none;
  background-color: transparent;
  border: none;
  border-bottom: 5px solid white;
`
