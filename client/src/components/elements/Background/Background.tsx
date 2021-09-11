import React, {
  useContext,
  useRef,
  useEffect,
  useState,
  RefObject,
} from 'react'
import moment from 'moment'

import { OtherSettingsContext } from '../../../providers'
import { getWallpaperData } from '../../../api/UnsplashAPI'
import defaultBackground from '../../../images/atlas-background.jpg'
import * as Styled from './Background.styled'
import useLocalStorage from '../../../hooks/useLocalStorage'

interface BackgroundProps {
  selectedBackground?: string
}

export const Background: React.FC<BackgroundProps> = React.memo(
  ({ selectedBackground }) => {
    const { componentToggleState, randomWallpaperURL, setRandomWallpaperURL } =
      useContext(OtherSettingsContext)

    const [lastFetched, setLastFetched] = useLocalStorage(
      'wallpaperLastFetched',
      ''
    )

    const [randomWallpaper, setRandomWallpaper] = useState<string>()
    const [, setFetching] = useState(false)
    const [errors, setErrors] = useState(false)

    const videoRef = useRef() as RefObject<HTMLVideoElement> | null | undefined

    useEffect(() => {
      if (componentToggleState.usingRandomWallpaper) {
        const date = new Date()

        //  if the random wallpaper does not exist, or a day has passed
        if (
          !randomWallpaperURL ||
          lastFetched === '' ||
          moment(
            `${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()}`
          ).diff(moment(lastFetched), 'days') >= 1
        ) {
          fetchWallpaper()
          //  use the preexisting random wallpaper
        } else {
          setRandomWallpaper(randomWallpaperURL)
        }
      }
    }, [componentToggleState.usingRandomWallpaper])

    const fetchWallpaper = async () => {
      setFetching(true)
      const { data, errors } = await getWallpaperData()

      if (data && errors.length === 0) {
        const date = new Date()
        setLastFetched(
          `${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()}`
        )
        setRandomWallpaper(data.urls.full)
        setRandomWallpaperURL(data.urls.full)
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

    if (
      randomWallpaper &&
      componentToggleState.usingRandomWallpaper &&
      !errors
    ) {
      return <Styled.BackgroundImage image={randomWallpaper} />
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
