import { useContext, useState, Dispatch, SetStateAction } from 'react'
import { createSelectable } from 'react-selectable'
import { Skeleton } from '@material-ui/lab'

import { useUpdateUserMutation } from '../../../generated/graphql'
import { OtherSettingsContext } from '../../../providers'
import { videoType, videoDataType } from '../../../types'
import * as Styled from './UserUploadedVideo.styled'

interface SelectableVideoProps {
  video: videoType
  selectedVideos: videoDataType
  selectedBackground: string | undefined
  selecting: boolean
  setSelectedBackground: Dispatch<SetStateAction<string | undefined>>
  setSelectedVideos: Dispatch<SetStateAction<videoDataType>>
}

const UserUploadedVideo: React.FC<SelectableVideoProps> = ({
  video,
  selectedVideos,
  selectedBackground,
  selecting,
  setSelectedBackground,
  setSelectedVideos,
}) => {
  const { usingRandomWallpaper, toggleUsingRandomWallpaper } =
    useContext(OtherSettingsContext)

  const [videoLoading, setVideoLoading] = useState(true)

  const [updateUser] = useUpdateUserMutation()

  return (
    <>
      {video && (
        <Styled.VideoContainer>
          {videoLoading && <Skeleton variant="rect" width={100} height={60} />}
          <Styled.Video
            onLoadedData={() => setVideoLoading(false)}
            currentBackground={selectedBackground === video.URL}
            selected={selectedVideos?.includes(video)}
            favorite={video.isFavorite}
            videoLoading={videoLoading}
            onClick={() => {
              if (!selecting) {
                setSelectedBackground(video.URL)

                // allow the user to use the video they clicked on, override random wallpapers
                if (usingRandomWallpaper) toggleUsingRandomWallpaper()

                //  set the background in the database
                updateUser({
                  variables: {
                    data: { selectedUserBackground: video.URL },
                  },
                })
              } else {
                //  select theVideo
                if (selectedVideos) {
                  if (!selectedVideos.includes(video)) {
                    setSelectedVideos((oldSelectedVideos) => {
                      if (Array.isArray(oldSelectedVideos)) {
                        return [...oldSelectedVideos].concat(video)
                      }
                    })
                    //  unselect theVideo
                  } else {
                    setSelectedVideos((oldSelectedVideos) => {
                      if (Array.isArray(oldSelectedVideos)) {
                        return [...oldSelectedVideos].filter(
                          (vid) => vid !== video
                        )
                      }
                    })
                  }
                }
              }
            }}
          >
            <source src={video.URL} type="video/mp4" />
          </Styled.Video>
        </Styled.VideoContainer>
      )}
    </>
  )
}
export default createSelectable(UserUploadedVideo)
