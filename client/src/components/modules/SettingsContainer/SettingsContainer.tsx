import { useContext, useState, Dispatch, SetStateAction } from 'react'
import { loadStripe } from '@stripe/stripe-js'
import { Elements } from '@stripe/react-stripe-js'

import { auth } from '../../../config/firebaseConfig'
import { OtherSettingsContext, SignedInContext } from '../../../providers'
import { Donate, StripePayment } from '../../elements'
import { ImageSection, GeneralSection, ShortcutSection } from '../index'
import { VideoSection } from '../VideoSection/VideoSection'
import { dev } from '../../../config/config'
import { PremiumMarker } from '../../../styles/constantStyles'
import {
  GetUserDocument,
  useUnsubscribeMutation,
} from '../../../generated/graphql'
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
  const [signOutConfirmation, setSignOutConfirmation] = useState()
  const [showUnsubscribePopup, setShowUnsubscribePopup] = useState(false)

  const [unsubscribe] = useUnsubscribeMutation()

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

  console.log('hasPaid: ', hasPaid)

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
              Videos <PremiumMarker>Premium ⭐</PremiumMarker>
            </Styled.SettingsSelectorItem>
            {/* <Styled.SettingsSelectorItem
              isSelected={selectedSettingsOption === 'shortcuts'}
              onClick={() => setSelectedSettingsOption('shortcuts')}
            >
              Shortcuts
            </Styled.SettingsSelectorItem> */}
          </div>
          <Styled.BottomSelectorContainer>
            {!hasPaid ? (
              <Styled.SettingsSelectorItem
                onClick={() => setShowingPayment(true)}
                small={true}
              >
                Get Premium
              </Styled.SettingsSelectorItem>
            ) : (
              <Styled.SettingsSelectorItem
                onClick={() => setShowUnsubscribePopup(true)}
                small={true}
              >
                Unsubscribe
              </Styled.SettingsSelectorItem>
            )}
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
          {selectedSettingsOption === 'general' && (
            <GeneralSection
              hasPaid={hasPaid}
              setShowingPayment={setShowingPayment}
            />
          )}
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
      {showUnsubscribePopup && (
        <>
          <Styled.UnsubscribePayment>
            <Styled.UnsubscribeHeader>
              Are you sure you want to unsubscribe from Atlas Premium?
            </Styled.UnsubscribeHeader>
            <Styled.ButtonContainer>
              <Styled.CancelButton
                onClick={() => setShowUnsubscribePopup(false)}
              >
                Cancel
              </Styled.CancelButton>
              <Styled.ConfirmButton
                onClick={async () => {
                  const response = await unsubscribe({
                    refetchQueries: [{ query: GetUserDocument }],
                  })
                  console.log(response.data?.unsubscribe.errors)
                  setShowUnsubscribePopup(false)
                }}
              >
                Confirm
              </Styled.ConfirmButton>
            </Styled.ButtonContainer>
          </Styled.UnsubscribePayment>
          <Styled.CancelSubscriptionOverlay
            onClick={() => setShowUnsubscribePopup(false)}
          />
        </>
      )}
    </>
  )
}
