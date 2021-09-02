import React, { RefObject, useEffect, useRef, useState } from 'react'
import { CircularProgress } from '@material-ui/core'
import { SelectableGroup } from 'react-selectable'

import {
  useDeleteVideosMutation,
  GetVideosDocument,
  useUpdateVideosMutation,
} from '../../../generated/graphql'
import { UserUploadedVideo } from '../../elements'
import { videoDataType } from '../../../types'
import * as Styled from './UserVideos.styled'

interface UserUploadProps {
  videoData: videoDataType
  selectedBackground: string | undefined
  setSelectedBackground: React.Dispatch<
    React.SetStateAction<string | undefined>
  >
  filter?: string
}

export const UserVideos: React.FC<UserUploadProps> = ({
  videoData,
  selectedBackground,
  setSelectedBackground,
  filter,
}) => {
  const [videos, setVideos] = useState<videoDataType>()
  const [selecting, setSelecting] = useState(false)
  const [selectedVideos, setSelectedVideos] = useState<videoDataType>([])
  const [deletingVideos, setDeletingVideos] = useState(false)

  const [updateVideos] = useUpdateVideosMutation()
  const [deleteVideos] = useDeleteVideosMutation()

  const videoContainerRef = useRef() as
    | RefObject<HTMLDivElement>
    | null
    | undefined

  useEffect(() => {
    //  a user's favorite Videos should appear first
    if (videoData) {
      const tempVideos = [...videoData].sort((a, b) =>
        a.isFavorite === b.isFavorite ? 0 : a.isFavorite ? -1 : 1
      )

      if (filter === 'Favorites') {
        setVideos(tempVideos.filter((video) => video.isFavorite))
      } else {
        setVideos(tempVideos)
      }
    }
  }, [videoData])

  const handleSelection = (selectedImgs: videoDataType) => {
    if (selectedVideos && selectedImgs && selectedImgs.length > 0) {
      setSelecting(selectedImgs.length > 0)
      setSelectedVideos(selectedImgs)
    }
  }

  return (
    <>
      {filter === 'My Videos' && videos && videos.length > 0 && (
        <>
          {selecting && (
            <Styled.SelectionOverlay
              height={130}
              onClick={() => {
                setSelecting(false)
                setSelectedVideos([])
              }}
            />
          )}
          <Styled.SelectionContainer>
            <Styled.SelectVideoTitle>
              {!selecting
                ? 'Drag Or Click To Select'
                : selectedVideos && selectedVideos.length + ' Videos Selected'}
            </Styled.SelectVideoTitle>
            <Styled.SelectionOptions>
              <Styled.SelectAndSelectAllContainer>
                {!selecting && (
                  <Styled.SelectVideosButton
                    onClick={() => {
                      setSelecting(true)
                    }}
                  >
                    Select Videos
                  </Styled.SelectVideosButton>
                )}
                {selecting && (
                  <Styled.SelectVideosButton
                    onClick={() => {
                      setSelecting(false)
                      setSelectedVideos([])
                    }}
                  >
                    Stop Selecting
                  </Styled.SelectVideosButton>
                )}
                <Styled.SelectVideosButton
                  onClick={() => {
                    setSelecting(true)
                    setSelectedVideos(videos)
                  }}
                >
                  Select All
                </Styled.SelectVideosButton>
              </Styled.SelectAndSelectAllContainer>
              <Styled.SelectOptionIconContainer>
                {!deletingVideos ? (
                  selectedVideos &&
                  selectedVideos.length > 0 && (
                    <Styled.DeleteSelectedIcon
                      size={28}
                      onClick={async () => {
                        setDeletingVideos(true)
                        try {
                          await deleteVideos({
                            variables: {
                              urls: selectedVideos.map((img) => img.URL),
                            },
                            refetchQueries: [
                              {
                                query: GetVideosDocument,
                              },
                            ],
                          })
                        } catch (err) {
                          console.error(err)
                        }
                        setSelecting(false)
                        setSelectedVideos([])
                        setDeletingVideos(false)
                      }}
                    />
                  )
                ) : (
                  <CircularProgress size={28} />
                )}
                {selectedVideos && selectedVideos.length > 0 && (
                  <Styled.StarSelectedIcon
                    size={28}
                    onClick={() => {
                      updateVideos({
                        variables: {
                          ids: selectedVideos.map((img) => img.id),
                          isFavoriteArr: selectedVideos.map(
                            (img) => !img.isFavorite
                          ),
                        },
                        refetchQueries: [
                          {
                            query: GetVideosDocument,
                          },
                        ],
                      })
                      setSelecting(false)
                      setSelectedVideos([])
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
        enabled={filter === 'My Videos'}
      >
        <Styled.VideosContainer ref={videoContainerRef}>
          {videos &&
            videos.map((video, i) => (
              <UserUploadedVideo
                key={i}
                selectableKey={video}
                video={video}
                selectedVideos={selectedVideos}
                selectedBackground={selectedBackground}
                selecting={selecting}
                setSelectedBackground={setSelectedBackground}
                setSelectedVideos={setSelectedVideos}
              />
            ))}
        </Styled.VideosContainer>
      </SelectableGroup>
    </>
  )
}
