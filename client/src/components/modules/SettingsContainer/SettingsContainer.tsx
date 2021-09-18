import { useContext, useState, Dispatch, SetStateAction } from 'react'
import { loadStripe } from '@stripe/stripe-js'
import { Elements } from '@stripe/react-stripe-js'

import { auth } from '../../../config/firebaseConfig'
import { OtherSettingsContext, SignedInContext } from '../../../providers'
import { Donate, StripePayment } from '../../elements'
import { ImageSection, GeneralSection, ShortcutSection } from '../index'
import { VideoSection } from '../VideoSection/VideoSection'
import { dev } from '../../../config/config'
import * as Styled from './SettingsContainer.styled'

interface SettingsContainerProps {
  selectedBackground: string | undefined
  setSelectedBackground: Dispatch<SetStateAction<string | undefined>>
}

const stripePromise = loadStripe(
  dev
    ? process.env.REACT_APP_STRIPE_PUBLISHABLE_TEST!
    : process.env.REACT_APP_STRIPE_PUBLISHABLE_PROD!
)

export const SettingsContainer: React.FC<SettingsContainerProps> = ({
  selectedBackground,
  setSelectedBackground,
}) => {
  const { containerColor } = useContext(OtherSettingsContext)
  const { hasPaid } = useContext(SignedInContext)

  const [selectedSettingsOption, setSelectedSettingsOption] =
    useState('general')
  const [selectedImageOption, setSelectedImageOption] = useState('My Images')
  const [selectedVideoOption, setSelectedVideoOption] = useState('My Videos')
  const [showingDonate, setShowingDonate] = useState(false)
  const [showingPayment, setShowingPayment] = useState(false)

  const signOut = async () => {
    localStorage.removeItem('greetingMessage')
    localStorage.removeItem('theme')
    localStorage.removeItem('name')
    localStorage.removeItem('todos')
    localStorage.removeItem('selectedBackground')
    localStorage.removeItem('token')

    await auth.signOut().catch((error) => {
      console.log(error)
    })

    //  TODO: do not reload the window, instead invalidate Apollo cache.
    //  When a user signs out and signs back in, apollo uses outdated queries, reloading the window
    //  is a lazy way to fix this
    window.location.reload()
  }

  return (
    <>
      <Styled.SettingsArrowIcon size={28} $containerColor={containerColor} />
      <Styled.SettingsWrapper containerColor={containerColor}>
        <Styled.SettingsSelectorColumn>
          <div>
            <Styled.SettingsSelectorItem
              isSelected={selectedSettingsOption === 'general'}
              onClick={() => setSelectedSettingsOption('general')}
            >
              General
            </Styled.SettingsSelectorItem>
            <Styled.SettingsSelectorItem
              isSelected={selectedSettingsOption === 'images'}
              onClick={() => setSelectedSettingsOption('images')}
            >
              Images
            </Styled.SettingsSelectorItem>
            <Styled.SettingsSelectorItem
              isSelected={selectedSettingsOption === 'videos'}
              onClick={() => {
                if (hasPaid) {
                  setSelectedSettingsOption('videos')
                } else {
                  setShowingPayment(true)
                }
              }}
            >
              Videos <Styled.PremiumMarker>Premium ⭐</Styled.PremiumMarker>
            </Styled.SettingsSelectorItem>
            {/* <Styled.SettingsSelectorItem
              isSelected={selectedSettingsOption === 'shortcuts'}
              onClick={() => setSelectedSettingsOption('shortcuts')}
            >
              Shortcuts
            </Styled.SettingsSelectorItem> */}
          </div>
          <Styled.BottomSelectorContainer>
            <Styled.SettingsSelectorItem
              onClick={() => setShowingPayment(true)}
              small={true}
            >
              Get Premium
            </Styled.SettingsSelectorItem>
            <Styled.SettingsSelectorItem small={true}>
              <Styled.FeedbackLink
                href="https://docs.google.com/forms/d/17C8gtHkEb4NTWNB4DezZx2Zg3hcaI81XXOD1OAYG4TM/edit"
                target="_blank"
                aria-label="feedback-link"
              >
                Give Feedback
              </Styled.FeedbackLink>
            </Styled.SettingsSelectorItem>
            <Styled.SettingsSelectorItem
              onClick={() => setShowingDonate(true)}
              small={true}
            >
              Donate
            </Styled.SettingsSelectorItem>
            <Styled.SettingsSelectorItem onClick={signOut} small={true}>
              Sign out
            </Styled.SettingsSelectorItem>
          </Styled.BottomSelectorContainer>
        </Styled.SettingsSelectorColumn>
        <Styled.SettingsDisplayColumn containerColor={containerColor}>
          {selectedSettingsOption === 'general' && <GeneralSection />}
          {selectedSettingsOption === 'images' && (
            <ImageSection
              selectedImageOption={selectedImageOption}
              setSelectedImageOption={setSelectedImageOption}
              selectedBackground={selectedBackground}
              setSelectedBackground={setSelectedBackground}
            />
          )}
          {selectedSettingsOption === 'videos' && (
            <VideoSection
              selectedVideoOption={selectedVideoOption}
              setSelectedVideoOption={setSelectedVideoOption}
              selectedBackground={selectedBackground}
              setSelectedBackground={setSelectedBackground}
            />
          )}
          {selectedSettingsOption === 'shortcuts' && <ShortcutSection />}
        </Styled.SettingsDisplayColumn>
      </Styled.SettingsWrapper>
      {showingDonate && <Donate setShowingDonate={setShowingDonate} />}
      {showingPayment && (
        <Elements stripe={stripePromise}>
          <StripePayment setShowingPayment={setShowingPayment} />
        </Elements>
      )}
    </>
  )
}
