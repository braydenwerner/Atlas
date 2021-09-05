import { Dispatch, SetStateAction, useEffect, useState } from 'react'

import { UploadFile } from '../index'
import { UserImages } from '../index'
import { useGetImagesQuery } from '../../../generated/graphql'
import * as Styled from './ImageSection.styled'
import { ToggleSwitch } from '../../elements'
import {
  ScrollDownContainer,
  ScrollDownIndicator,
} from '../../../styles/constantStyles'

interface ImageSectionProps {
  selectedImageOption: string
  setSelectedImageOption: Dispatch<SetStateAction<string>>
  selectedBackground: string | undefined
  setSelectedBackground: Dispatch<SetStateAction<string | undefined>>
}

export const ImageSection: React.FC<ImageSectionProps> = ({
  selectedImageOption,
  setSelectedImageOption,
  selectedBackground,
  setSelectedBackground,
}) => {
  const [hasScrolled, setHasScrolled] = useState(false)

  useEffect(() => {
    const handleScroll = () => setHasScrolled(true)

    window.addEventListener('scroll', handleScroll, true)

    return () => {
      window.removeEventListener('scroll', handleScroll)
    }
  }, [])

  const { data } = useGetImagesQuery()
  const imageData = data && data.getImages

  return (
    <Styled.ImageSectionContainer>
      <Styled.ImagesHeader>Images</Styled.ImagesHeader>
      <Styled.RandomImageContainer>
        <Styled.ImagesSubHeader>Enable Random Images</Styled.ImagesSubHeader>
        <ToggleSwitch component={'usingRandomWallpaper'} />
      </Styled.RandomImageContainer>

      <Styled.ImageSelectorContainer>
        <Styled.SelectionOption
          isSelected={selectedImageOption === 'My Images'}
          onClick={() => setSelectedImageOption('My Images')}
        >
          My Images
        </Styled.SelectionOption>
        <Styled.SelectionOption
          isSelected={selectedImageOption === 'Favorites'}
          onClick={() => setSelectedImageOption('Favorites')}
        >
          Favorites
        </Styled.SelectionOption>
      </Styled.ImageSelectorContainer>
      {selectedImageOption === 'My Images' && (
        <Styled.ContentContainer>
          <UploadFile fileType="image" />
          {imageData && imageData.length > 0 && !hasScrolled && (
            <ScrollDownContainer>
              <ScrollDownIndicator size={28} />
            </ScrollDownContainer>
          )}
          <UserImages
            imageData={imageData}
            selectedBackground={selectedBackground}
            setSelectedBackground={setSelectedBackground}
            filter="My Images"
          />
        </Styled.ContentContainer>
      )}
      {selectedImageOption === 'Favorites' && (
        <Styled.ContentContainer>
          <UserImages
            imageData={imageData}
            selectedBackground={selectedBackground}
            setSelectedBackground={setSelectedBackground}
            filter="Favorites"
          />
        </Styled.ContentContainer>
      )}
    </Styled.ImageSectionContainer>
  )
}
