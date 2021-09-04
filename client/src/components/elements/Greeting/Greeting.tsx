import {
  useState,
  useContext,
  useRef,
  Dispatch,
  SetStateAction,
  useEffect,
} from 'react'
import { TwitterPicker } from 'react-color'
import Clock from 'react-clock'
import Moment from 'react-moment'
import 'react-clock/dist/Clock.css'

import { OtherSettingsContext, ThemeContext } from '../../../providers/index'
import { useUpdateUserMutation } from '../../../generated/graphql'
import { DynamicContainer } from '../../modules/index'
import * as Styled from './Greeting.styled'
import './Greeting.css'

interface GreetingProps {
  name: string
  greetingMessage?: string
  setGreetingMessage: Dispatch<SetStateAction<string>>
}

export const Greeting: React.FC<GreetingProps> = ({
  name,
  greetingMessage,
  setGreetingMessage,
}) => {
  const { themeMode } = useContext(ThemeContext)
  const {
    usingDigitalClock,
    greetingColor,
    switchGreetingColor,
    containerColor,
  } = useContext(OtherSettingsContext)

  const [hoveringGreeting, setHoveringGreeting] = useState(false)
  const [updatingMessage, setUpdatingMessage] = useState(false)
  const [displayColorPicker, setDisplayColorPicker] = useState(false)
  const [draggableDisabled, setDraggableDisabled] = useState(false)

  const [updateUser] = useUpdateUserMutation()

  const messageFormRef = useRef() as React.MutableRefObject<HTMLInputElement>

  const [value, setValue] = useState(new Date())

  useEffect(() => {
    if (!usingDigitalClock) {
      const interval = setInterval(() => setValue(new Date()), 1000)

      return () => {
        clearInterval(interval)
      }
    }
  }, [])

  const handleMessageFormSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    if (!messageFormRef || !messageFormRef.current) return

    setUpdatingMessage(false)
    setGreetingMessage(messageFormRef.current.value)

    updateUser({
      variables: {
        data: { greetingMessage: messageFormRef.current.value },
      },
    })
  }

  return (
    <>
      {updatingMessage ||
        (displayColorPicker && (
          <Styled.Overlay
            onClick={() => {
              setUpdatingMessage(false)
              setDisplayColorPicker(false)
            }}
          />
        ))}
      <DynamicContainer
        nodeTitle="Greeting"
        defaultLocation={{
          x: 0.4,
          y: 0.4,
        }}
        draggableDisabled={draggableDisabled}
      >
        <Styled.GreetingsContainer
          $usingDigitalClock={usingDigitalClock}
          onMouseEnter={() => setHoveringGreeting(true)}
          onMouseLeave={() => {
            setHoveringGreeting(false)
          }}
        >
          <Styled.TimeContainer color={greetingColor}>
            {usingDigitalClock ? (
              <Moment format="h:mm" interval={1} />
            ) : (
              <Clock
                value={value}
                renderNumbers={true}
                size={200}
                className="react-clock"
              />
            )}
          </Styled.TimeContainer>
          <Styled.GreetingMessageContainer>
            {!updatingMessage ? (
              <Styled.GreetingMessage color={greetingColor}>
                {greetingMessage !== 'null' ? greetingMessage : 'Hello,' + name}
              </Styled.GreetingMessage>
            ) : (
              <Styled.UpdatingGreetingMessageForm
                onSubmit={handleMessageFormSubmit}
              >
                <Styled.UpdatingGreetingMessageInput
                  color={greetingColor}
                  ref={messageFormRef}
                  maxLength={50}
                  autoFocus
                  placeholder={
                    greetingMessage !== 'null'
                      ? greetingMessage
                      : 'Hello,' + name
                  }
                />
              </Styled.UpdatingGreetingMessageForm>
            )}
            {((hoveringGreeting && !updatingMessage) || displayColorPicker) && (
              <Styled.GreetingIconsContainer
                $usingDigitalClock={usingDigitalClock}
              >
                <Styled.EditGreetingIcon
                  color={greetingColor}
                  size={35}
                  onClick={() => {
                    setUpdatingMessage(true)
                  }}
                />
                <Styled.EditColorIcon
                  color={greetingColor}
                  size={35}
                  onClick={() =>
                    setDisplayColorPicker(
                      (oldDisplayColorPicker) => !oldDisplayColorPicker
                    )
                  }
                />
              </Styled.GreetingIconsContainer>
            )}
          </Styled.GreetingMessageContainer>
          {displayColorPicker && (
            <Styled.ColorPickerContainer
              onMouseEnter={() => setDraggableDisabled(true)}
              onMouseLeave={() => setDraggableDisabled(false)}
            >
              <Styled.TriangleIcon
                containerColor={containerColor}
                $usingDigitalClock={usingDigitalClock}
                size={28}
              />
              <TwitterPicker
                className={`color-picker-${themeMode}`}
                triangle="hide"
                onChangeComplete={(color) => switchGreetingColor(color.hex)}
              />
            </Styled.ColorPickerContainer>
          )}
        </Styled.GreetingsContainer>
      </DynamicContainer>
    </>
  )
}
