import React, {
  useContext,
  useRef,
  useEffect,
  useState,
  RefObject,
} from 'react'

import { OtherSettingsContext } from '../../../providers'
import { getWallpaperData } from '../../../api/UnsplashAPI'
import defaultBackground from '../../../images/atlas-background.jpg'
import * as Styled from './Background.styled'

interface BackgroundProps {
  selectedBackground?: string
}

export const Background: React.FC<BackgroundProps> = React.memo(
  ({ selectedBackground }) => {
    const { usingRandomWallpaper, setRandomWallpaperURL } =
      useContext(OtherSettingsContext)

    const [wallpaper, setWallpaper] = useState<string>()
    const [, setFetching] = useState(false)
    const [errors, setErrors] = useState(false)

    const videoRef = useRef() as RefObject<HTMLVideoElement> | null | undefined

    useEffect(() => {
      if (usingRandomWallpaper) fetchWallpaper()
    }, [usingRandomWallpaper])

    const fetchWallpaper = async () => {
      setFetching(true)
      const { data, errors } = await getWallpaperData()

      if (data && errors.length === 0) {
        setWallpaper(data.urls.full)
      }

      if (errors?.length > 0) {
        setErrors(true)
      }

      setFetching(false)
    }

    useEffect(() => {
      if (selectedBackground && selectedBackground.endsWith('mp4')) {
        if (videoRef && videoRef.current) {
          videoRef.current.load()
        }
      }
    }, [selectedBackground])

    if (wallpaper && usingRandomWallpaper && !errors) {
      if (typeof wallpaper === 'string') setRandomWallpaperURL(wallpaper)

      return <Styled.BackgroundImage image={wallpaper} />
    } else {
      if (selectedBackground && selectedBackground.endsWith('mp4')) {
        return (
          <Styled.Video ref={videoRef} autoPlay={true} loop muted>
            <source src={selectedBackground} type="video/mp4" />
          </Styled.Video>
        )
      } else if (
        selectedBackground &&
        (selectedBackground.endsWith('jpeg') ||
          selectedBackground.endsWith('png') ||
          selectedBackground.startsWith('https://images.unsplash.com'))
      ) {
        return <Styled.BackgroundImage image={selectedBackground} />
      } else {
        return (
          <Styled.BackgroundImageContainer>
            <Styled.BackgroundImage src={defaultBackground} />
          </Styled.BackgroundImageContainer>
        )
      }
    }
  }
)
