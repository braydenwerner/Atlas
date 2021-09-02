import { Dispatch, SetStateAction } from 'react'

import { UploadFile } from '../index'
import { UserImages } from '../index'
import { useGetImagesQuery } from '../../../generated/graphql'
import * as Styled from './ImageSection.styled'
import { ToggleSwitch } from '../../elements'

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
