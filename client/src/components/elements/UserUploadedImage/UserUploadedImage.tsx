import { useState, useContext, Dispatch, SetStateAction } from 'react'
import { createSelectable } from 'react-selectable'
import { Skeleton } from '@material-ui/lab'

import { useUpdateUserMutation } from '../../../generated/graphql'
import { OtherSettingsContext } from '../../../providers'
import { imageType, imageDataType } from '../../../types'
import * as Styled from './UserUploadedImage.styled'

interface SelectableImageProps {
  image: imageType
  selectedImages: imageDataType
  selectedBackground: string | undefined
  selecting: boolean
  setSelectedBackground: Dispatch<SetStateAction<string | undefined>>
  setSelectedImages: Dispatch<SetStateAction<imageDataType>>
}

const UserUploadedImage: React.FC<SelectableImageProps> = ({
  image,
  selectedImages,
  selectedBackground,
  selecting,
  setSelectedBackground,
  setSelectedImages,
}) => {
  const { componentToggleState, toggle } = useContext(OtherSettingsContext)

  const [imageLoading, setImageLoading] = useState(true)

  const [updateUser] = useUpdateUserMutation()

  return (
    <>
      {image && (
        <Styled.ImageContainer>
          {imageLoading && <Skeleton variant="rect" width={100} height={60} />}
          <Styled.Image
            width={0}
            height={0}
            src={image.URL}
            alt={image.title}
            currentBackground={selectedBackground === image.URL}
            selected={selectedImages?.includes(image)}
            favorite={image.isFavorite}
            imageLoading={imageLoading}
            onLoad={() => setImageLoading(false)}
            onClick={() => {
              if (!selecting) {
                setSelectedBackground(image.URL)

                // allow the user to use the image they clicked on, override random wallpapers
                if (componentToggleState.usingRandomWallpaper)
                  toggle('RandomWallpaper')

                //  set the background in the database
                updateUser({
                  variables: {
                    data: { selectedUserBackground: image.URL },
                  },
                })
              } else {
                //  select the image
                if (selectedImages) {
                  if (!selectedImages.includes(image)) {
                    setSelectedImages((oldSelectedImages) => {
                      if (Array.isArray(oldSelectedImages)) {
                        return [...oldSelectedImages].concat(image)
                      }
                    })
                    //  unselect the image
                  } else {
                    setSelectedImages((oldSelectedImages) => {
                      if (Array.isArray(oldSelectedImages)) {
                        return [...oldSelectedImages].filter(
                          (img) => img !== image
                        )
                      }
                    })
                  }
                }
              }
            }}
          />
        </Styled.ImageContainer>
      )}
    </>
  )
}
export default createSelectable(UserUploadedImage)
