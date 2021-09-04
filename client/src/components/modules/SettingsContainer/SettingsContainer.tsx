import { useContext, useState, Dispatch, SetStateAction } from 'react'

import { auth } from '../../../config/firebaseConfig'
import { OtherSettingsContext } from '../../../providers'
import { Donate } from '../../elements'
import { ImageSection, GeneralSection, ShortcutSection } from '../index'
import { VideoSection } from '../VideoSection/VideoSection'
import * as Styled from './SettingsContainer.styled'

interface SettingsContainerProps {
  selectedBackground: string | undefined
  setSelectedBackground: Dispatch<SetStateAction<string | undefined>>
}

export const SettingsContainer: React.FC<SettingsContainerProps> = ({
  selectedBackground,
  setSelectedBackground,
}) => {
  const { containerColor } = useContext(OtherSettingsContext)
  const [selectedSettingsOption, setSelectedSettingsOption] =
    useState('general')
  const [selectedImageOption, setSelectedImageOption] = useState('My Images')
  const [selectedVideoOption, setSelectedVideoOption] = useState('My Videos')
  const [showingDonate, setShowingDonate] = useState(false)

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
              onClick={() => setSelectedSettingsOption('videos')}
            >
              Videos
            </Styled.SettingsSelectorItem>
            {/* <Styled.SettingsSelectorItem
              isSelected={selectedSettingsOption === 'shortcuts'}
              onClick={() => setSelectedSettingsOption('shortcuts')}
            >
              Shortcuts
            </Styled.SettingsSelectorItem> */}
          </div>
          <Styled.BottomSelectorContainer>
            <Styled.SettingsSelectorItem onClick={() => setShowingDonate(true)}>
              Donate
            </Styled.SettingsSelectorItem>
            <Styled.SettingsSelectorItem onClick={signOut}>
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
    </>
  )
}