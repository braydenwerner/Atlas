import signInBackground from '../../../images/innodesk-signin-homepage.jpg'
import styled, { keyframes } from 'styled-components'

export const FormContainer = styled.div`
  display: flex;
  width: 100%;
  height: 100vh;
  justify-content: center;
  align-items: center;
  background: url(${signInBackground});
  background-repeat: no-repeat;
  background-size: cover;
`

export const LoginPromptContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`

export const StepHeader = styled.div`
  font-size: 3.5rem;
  color: white;
`

export const ButtonContainer = styled.div`
  position: absolute;
  bottom: 70px;
  display: flex;
  justify-content: space-around;
  width: 100%;
`

export const LoginButton = styled.div`
  position: absolute;
  cursor: pointer;
  background-color: none;
  border: 1px solid rgba(255, 255, 255, 0.8);
  width: 150px;
  text-align: center;
  color: white;
  font-size: 1.3rem;
  padding: 0.2em;
  border-radius: 20px;

  color: ${(props) => props.theme.primaryText};

  &:hover {
    border: 1px solid white;
    background-color: rgba(255, 255, 255, 0.05);
  }
`

export const ForgotPasswordButton = styled.div`
  position: relative;
  top: 5px;
  left: 135px;
  color: black;
  font-size: 1rem;
  cursor: pointer;

  &:hover {
    text-decoration: underline;
  }
`

const ErrorMessageAnimationIn = keyframes`
  0% {
    opacity: 0;
  }
`

export const ErrorMessageContainer = styled.div`
  display: flex;
  flex-direction: column;
  position: absolute;
  margin-top: 40px;
  justify-content: center;
  left: 0;
  width: 100%;
  align-items: center;
  animation: ${ErrorMessageAnimationIn} 0.2s forwards;
  animation-fill-mode: forwards;
`

export const ErrorMessage = styled.div`
  positon: relative;
  color: black;
  margin-bottom: 10px;
`
