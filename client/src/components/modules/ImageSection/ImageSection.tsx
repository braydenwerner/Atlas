import {
  Dispatch,
  SetStateAction,
  useContext,
  useEffect,
  useState,
} from 'react'
import { Snackbar } from '@material-ui/core'
import { Alert } from '@material-ui/lab'

import { UploadFile } from '../index'
import { UserImages } from '../index'
import {
  GetImagesDocument,
  useAddImageMutation,
  useGetImagesQuery,
} from '../../../generated/graphql'
import { ToggleSwitch } from '../../elements'
import { OtherSettingsContext } from '../../../providers'
import {
  ScrollDownContainer,
  ScrollDownIndicator,
} from '../../../styles/constantStyles'
import * as Styled from './ImageSection.styled'

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
  const { usingRandomWallpaper, randomWallpaperURL } =
    useContext(OtherSettingsContext)

  const [hasScrolled, setHasScrolled] = useState(false)
  const [snackbarOpen, setSnackBarOpen] = useState(false)
  const [errorMessage, setErrorMessage] = useState<string>('')

  const [addImage] = useAddImageMutation()

  useEffect(() => {
    const handleScroll = () => setHasScrolled(true)

    window.addEventListener('scroll', handleScroll, true)

    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const { data } = useGetImagesQuery()
  const imageData = data && data.getImages

  return (
    <>
      <Styled.ImageSectionContainer>
        <Styled.ImagesHeader>Images</Styled.ImagesHeader>
        <Styled.RandomImageContainer>
          <Styled.ImagesSubHeader>Enable Random Images</Styled.ImagesSubHeader>
          <ToggleSwitch component={'usingRandomWallpaper'} />
        </Styled.RandomImageContainer>
        {usingRandomWallpaper && randomWallpaperURL && (
          <Styled.SaveWallpaperContainer
            onClick={async () => {
              const response: any = await addImage({
                variables: { url: randomWallpaperURL },
                refetchQueries: [{ query: GetImagesDocument }],
              })
              const errors = response.data.addImage.errors

              if (errors && errors[0].message) {
                setSnackBarOpen(true)
                setErrorMessage(errors[0].message)
              }
            }}
          >
            <Styled.SaveWallpaperText>
              Save Current Background Image
            </Styled.SaveWallpaperText>
          </Styled.SaveWallpaperContainer>
        )}

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
      <Snackbar
        open={snackbarOpen}
        autoHideDuration={4000}
        onClose={() => {
          setSnackBarOpen(false)
          setErrorMessage('')
        }}
      >
        <Alert severity="error">{errorMessage}</Alert>
      </Snackbar>
    </>
  )
}
