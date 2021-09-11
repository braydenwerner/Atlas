import { isSelectedProps } from '../../../types'
import styled, { keyframes } from 'styled-components'

export const GeneralSectionContainer = styled.div`
  margin: 0px 15px 0px 15px;
`

export const GeneralHeader = styled.div`
  font-size: 1.5rem;
  margin-left: 7px;
  padding: 0.2em;
  user-select: none;
  color: ${(props) => props.theme.primaryText};
`

export const GeneralSubHeader = styled.div`
  font-size: 1.2rem;
  padding: 0.2em;
  margin: 20px 0px 0px 10px;
  user-select: none;
  color: ${(props) => props.theme.primaryText};
`

export const CustomizationContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  user-select: none;
`

interface CustomizationRowProps {
  disableBorderTop?: boolean
}
export const CustomizationRow = styled.div<CustomizationRowProps>`
  display: flex;
  align-items: center;
  font-size: 1.3 rem;
  height: 40px;
  width: 95%;
  margin: 10px 0px 10px 0px;
  ${(props) =>
    !props.disableBorderTop && `border-top: ${props.theme.dividerLine}`};
`

export const CustomizationColumn = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
`

export const CustomizationLabel = styled.div`
  position: relative;
  font-size: 1rem;
  top: 8px;
  left: 15px;
  width: 50%;
  color: ${(props) => props.theme.primaryText};
`

export const SubOptionContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-end;
  margin-top: 18px;
  width: 50%;
`

export const SubOption = styled.div<isSelectedProps>`
  font-size: 1rem;
  padding: 0.5em;
  cursor: pointer;
  color: ${(props) =>
    props.isSelected ? props.theme.primaryText : props.theme.secondaryText};

  &:hover {
    filter: ${(props) =>
      props.theme.theme === 'dark' ? 'brightness(150%)' : 'brightness(75%)'};
  }
`

export const CustomizationButton = styled.div`
  font-size: 1rem;
  cursor: pointer;
  margin-left: 15px;
  filter: brightness(75%);
  color: ${(props) => props.theme.primaryText};

  &:hover {
    filter: brightness(150%);
  }
`

const SelectionWrapperAnimationIn = keyframes`
0% {
  height: 5px;
  opacity: 0;
}
100% {
  opacity: 1;
  height: 70px;
}
`

export const SelectionWrapper = styled.div`
  display: flex;
  animation: ${SelectionWrapperAnimationIn} 0.1s linear;
  animation-fill-mode: forwards;
  width: 100%;
`

export const SliderPickerContainer = styled.div`
  margin-top: 15px;
  width: 60%;
`

export const ThemeColorSliderContainer = styled.div`
  display: flex;
  width: 95%;
  margin-left: 30px;
`

export const SliderInfoContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 40%;
  justify-content: center;
  align-items: center;
  margin-top: 5px;
`

export const ColorValue = styled.div`
  font-size: 1rem;
  color: white;
`
