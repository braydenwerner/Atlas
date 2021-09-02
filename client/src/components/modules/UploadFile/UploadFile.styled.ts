import styled from 'styled-components'

export const DropContainer = styled.div`
  position: relative;
  font-size: 1rem;
  height: 52px;
  text-align: center;
  padding: 5em;
  border: 3px dashed ${(props) => props.theme.primaryText};
  color: ${(props) => props.theme.primaryText};
  margin: 5px; 0px 5px 0px;
  z-index: 1;
`
