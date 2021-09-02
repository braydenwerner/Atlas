import styled from 'styled-components'
import { BiCoffeeTogo } from 'react-icons/bi'

export const DonateContainer = styled.div`
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

export const DonateOverlay = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100vh;
  z-index: 5;
  background-color: rgba(0, 0, 0, 0.75);
`

export const DonateHeader = styled.div`
  font-size: 45px;
  color: ${(props) => props.theme.primaryText};
  padding: 25px 0px 0px 35px;
`

export const DonateDescription = styled.div`
  font-size: 22px;
  color: ${(props) => props.theme.primaryText};
  padding: 25px 0px 0px 35px;
`

export const PaymentOptionContainer = styled.div`
  display: flex;
  justify-content: space-around;
  margin-top: 50px;
`

export const PaymentOption = styled.a`
  display: flex;
  flex-direction: column;
  width: 250px;
  height: 200px;
  justify-content: center;
  align-items: center;
  padding: 15px 15px 15px 15px;
  border-radius: 5px;
  cursor: pointer;
  text-decoration: none;
  background-color: ${(props) => props.theme.secondaryContainer};

  &:hover {
    filter: invert();
  }
`

export const BuyMeACoffeeIcon = styled(BiCoffeeTogo)`
  color: ${(props) => props.theme.primaryText};
`

export const IconLabel = styled.div`
  font-size: 22px;
  color: ${(props) => props.theme.primaryText};
`
