import { Dispatch, SetStateAction } from 'react'

import { useGetVideosQuery } from '../../../generated/graphql'
import { UploadFile, UserVideos } from '../index'
import * as Styled from './VideoSection.styled'

interface ImageSectionProps {
  selectedVideoOption: string
  setSelectedVideoOption: Dispatch<SetStateAction<string>>
  selectedBackground: string | undefined
  setSelectedBackground: Dispatch<SetStateAction<string | undefined>>
}

export const VideoSection: React.FC<ImageSectionProps> = ({
  selectedVideoOption,
  setSelectedVideoOption,
  selectedBackground,
  setSelectedBackground,
}) => {
  const { data } = useGetVideosQuery()
  const videoData = data && data.getVideos

  return (
    <Styled.VideoSectionContainer>
      <Styled.VideosHeader>Videos</Styled.VideosHeader>
      <Styled.VideoSelectorContainer>
        <Styled.SelectionOption
          isSelected={selectedVideoOption === 'My Videos'}
          onClick={() => setSelectedVideoOption('My Videos')}
        >
          My Videos
        </Styled.SelectionOption>
        <Styled.SelectionOption
          isSelected={selectedVideoOption === 'Favorites'}
          onClick={() => setSelectedVideoOption('Favorites')}
        >
          Favorites
        </Styled.SelectionOption>
      </Styled.VideoSelectorContainer>
      {selectedVideoOption === 'My Videos' && (
        <Styled.ContentContainer>
          <UploadFile fileType="video" />
          <UserVideos
            videoData={videoData}
            selectedBackground={selectedBackground}
            setSelectedBackground={setSelectedBackground}
            filter="My Videos"
          />
        </Styled.ContentContainer>
      )}
      {selectedVideoOption === 'Favorites' && (
        <Styled.ContentContainer>
          <UserVideos
            videoData={videoData}
            selectedBackground={selectedBackground}
            setSelectedBackground={setSelectedBackground}
            filter="Favorites"
          />
        </Styled.ContentContainer>
      )}
    </Styled.VideoSectionContainer>
  )
}
