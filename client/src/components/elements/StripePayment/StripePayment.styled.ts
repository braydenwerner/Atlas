import { RiVideoUploadFill } from 'react-icons/ri'
import { AiOutlineFontSize } from 'react-icons/ai'
import { MdTrendingUp } from 'react-icons/md'
import styled from 'styled-components'

export const Header = styled.div`
  font-size: 2.2rem;
  margin-top: 25px;
  color: ${(props) => props.theme.primaryText};
`

export const SubTitle = styled.div`
  font-size: 1rem;
  margin-top: 25px;
  color: ${(props) => props.theme.secondaryText};
`

export const PaymentContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
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

export const PaymentOverlay = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100vh;
  z-index: 5;
  background-color: rgba(0, 0, 0, 0.75);
`

export const PaymentForm = styled.form`
  margin-top: 70px;
  width: 400px;
  border-radius: 5px;
`

export const ButtonContainer = styled.div`
  display: flex;
  justify-content: space-around;
`

export const PayButton = styled.button`
  margin-top: 80px;
  cursor: pointer;
  border: 1px solid rgba(255, 255, 255, 0.8);
  width: 150px;
  text-align: center;
  color: white;
  font-size: 1.3rem;
  padding: 0.2em;
  border-radius: 20px;
  background-color: rgba(255, 255, 255, 0.05);

  color: ${(props) => props.theme.primaryText};

  &:hover {
    border: 1px solid white;
  }
`

export const BackButton = styled.div`
  margin-top: 80px;
  cursor: pointer;
  border: 1px solid rgba(255, 255, 255, 0.8);
  width: 150px;
  text-align: center;
  color: white;
  font-size: 1.3rem;
  padding: 0.2em;
  border-radius: 20px;
  background-color: rgba(255, 255, 255, 0.05);

  color: ${(props) => props.theme.primaryText};

  &:hover {
    border: 1px solid white;
  }
`

export const IconContainer = styled.div`
  display: flex;
  justify-content: space-around;
  width: 100%;
  margin-top: 50px;
`

export const IconLabelContainer = styled.div``

export const Label = styled.div`
  font-size: 1rem;
  color: ${(props) => props.theme.primaryText};
`

export const VideoIcon = styled(RiVideoUploadFill)`
  margin: auto;
  color: ${(props) => props.theme.primaryText};
  filter: brightness(85%);

  &:hover {
    filter: brightness(100%);
  }
`

export const StockIcon = styled(MdTrendingUp)`
  margin: auto;
  color: ${(props) => props.theme.primaryText};
  filter: brightness(85%);

  &:hover {
    filter: brightness(100%);
  }
`

export const FontIcon = styled(AiOutlineFontSize)`
  margin: auto;
  color: ${(props) => props.theme.primaryText};
  filter: brightness(85%);

  &:hover {
    filter: brightness(100%);
  }
`

export const ErrorMessage = styled.div`
  font-size: 1rem;
  margin-top: 20px;
  color: ${(props) => props.theme.primaryText};
  align-self: center;
`

export const LoadingContainer = styled.div`
  margin-top: 75px;
`
