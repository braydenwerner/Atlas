import styled from 'styled-components'

export const PaymentContainer = styled.div`
  position: absolute;
  width: 650px;
  height: 550px;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  z-index: 6;
  opacity: 0.98;
  border-radius: 15px;
  background-color: ${(props) => props.theme.primaryContainer};

  @media (max-width: 1075px) {
    width: 95%;
  }
`
