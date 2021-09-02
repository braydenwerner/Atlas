import React, { RefObject, useEffect, useRef, useState } from 'react'
import { CircularProgress } from '@material-ui/core'
import { SelectableGroup } from 'react-selectable'

import {
  useUpdateUserMutation,
  useDeleteImagesMutation,
  GetImagesDocument,
  useUpdateImagesMutation,
} from '../../../generated/graphql'
import { imageDataType } from '../../../types'
import UserUploadedImage from '../../elements/UserUploadedImage/UserUploadedImage'
import * as Styled from './UserImages.styled'

interface UserUploadProps {
  imageData: imageDataType
  selectedBackground: string | undefined
  setSelectedBackground: React.Dispatch<
    React.SetStateAction<string | undefined>
  >
  filter?: string
}

export const UserImages: React.FC<UserUploadProps> = ({
  imageData,
  selectedBackground,
  setSelectedBackground,
  filter,
}) => {
  const [images, setImages] = useState<imageDataType>()
  const [selecting, setSelecting] = useState(false)
  const [selectedImages, setSelectedImages] = useState<imageDataType>([])
  const [deletingImages, setDeletingImages] = useState(false)

  const [updateImages] = useUpdateImagesMutation()
  const [deleteImages] = useDeleteImagesMutation()

  const imageContainerRef = useRef() as
    | RefObject<HTMLDivElement>
    | null
    | undefined

  useEffect(() => {
    //  a user's favorite images should appear first
    if (imageData) {
      const tempImages = [...imageData].sort((a, b) =>
        a.isFavorite === b.isFavorite ? 0 : a.isFavorite ? -1 : 1
      )

      if (filter === 'Favorites') {
        setImages(tempImages.filter((image) => image.isFavorite))
      } else {
        setImages(tempImages)
      }
    }
  }, [imageData])

  const handleSelection = (selectedImgs: imageDataType) => {
    if (selectedImages && selectedImgs && selectedImgs.length > 0) {
      setSelecting(selectedImgs.length > 0)
      setSelectedImages(selectedImgs)
    }
  }

  return (
    <>
      {filter === 'My Images' && images && images.length > 0 && (
        <>
          {selecting && (
            <Styled.SelectionOverlay
              height={130}
              onClick={() => {
                setSelecting(false)
                setSelectedImages([])
              }}
            />
          )}
          <Styled.SelectionContainer>
            <Styled.SelectImageTitle>
              {!selecting
                ? 'Drag Or Click To Select'
                : selectedImages && selectedImages.length + ' Images Selected'}
            </Styled.SelectImageTitle>
            <Styled.SelectionOptions>
              <Styled.SelectAndSelectAllContainer>
                {!selecting && (
                  <Styled.SelectImagesButton
                    onClick={() => {
                      setSelecting(true)
                    }}
                  >
                    Select Images
                  </Styled.SelectImagesButton>
                )}
                {selecting && (
                  <Styled.SelectImagesButton
                    onClick={() => {
                      setSelecting(false)
                      setSelectedImages([])
                    }}
                  >
                    Stop Selecting
                  </Styled.SelectImagesButton>
                )}
                <Styled.SelectImagesButton
                  onClick={() => {
                    setSelecting(true)
                    setSelectedImages(images)
                  }}
                >
                  Select All
                </Styled.SelectImagesButton>
              </Styled.SelectAndSelectAllContainer>
              <Styled.SelectOptionIconContainer>
                {!deletingImages ? (
                  selectedImages &&
                  selectedImages.length > 0 && (
                    <Styled.DeleteSelectedIcon
                      size={28}
                      onClick={async () => {
                        setDeletingImages(true)
                        try {
                          await deleteImages({
                            variables: {
                              urls: selectedImages.map((img) => img.URL),
                            },
                            refetchQueries: [
                              {
                                query: GetImagesDocument,
                              },
                            ],
                          })
                        } catch (err) {
                          console.error(err)
                        }
                        setSelecting(false)
                        setSelectedImages([])
                        setDeletingImages(false)
                      }}
                    />
                  )
                ) : (
                  <CircularProgress size={28} />
                )}
                {selectedImages && selectedImages.length > 0 && (
                  <Styled.StarSelectedIcon
                    size={28}
                    onClick={() => {
                      updateImages({
                        variables: {
                          ids: selectedImages.map((img) => img.id),
                          isFavoriteArr: selectedImages.map(
                            (img) => !img.isFavorite
                          ),
                        },
                        refetchQueries: [
                          {
                            query: GetImagesDocument,
                          },
                        ],
                      })
                      setSelecting(false)
                      setSelectedImages([])
                    }}
                  />
                )}
              </Styled.SelectOptionIconContainer>
            </Styled.SelectionOptions>
          </Styled.SelectionContainer>
        </>
      )}
      <SelectableGroup
        onSelection={handleSelection}
        enabled={filter === 'My Images'}
      >
        <Styled.ImagesContainer ref={imageContainerRef}>
          {images &&
            images.map((image, i) => (
              <UserUploadedImage
                key={i}
                selectableKey={image}
                image={image}
                selectedImages={selectedImages}
                selectedBackground={selectedBackground}
                selecting={selecting}
                setSelectedBackground={setSelectedBackground}
                setSelectedImages={setSelectedImages}
              />
            ))}
        </Styled.ImagesContainer>
      </SelectableGroup>
    </>
  )
}
