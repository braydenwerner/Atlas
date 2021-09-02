import { Drawing, Image, Note, Video } from './generated/graphql'

export interface isSelectedProps {
  isSelected?: boolean
}

export type imageDataType =
  | ({
      __typename?: 'Image' | undefined
    } & Pick<Image, 'id' | 'isFavorite' | 'title' | 'URL'>)[]
  | undefined
  | null

export type imageType = {
  __typename?: 'Image' | undefined
} & Pick<Image, 'id' | 'isFavorite' | 'title' | 'URL'>

export type noteType = { __typename?: 'Note' } & Pick<
  Note,
  'id' | 'body' | 'isFavorite' | 'updatedAt' | 'createdAt'
>

export type videoDataType =
  | ({
      __typename?: 'Video' | undefined
    } & Pick<Video, 'id' | 'isFavorite' | 'title' | 'URL'>)[]
  | undefined
  | null

export type videoType = {
  __typename?: 'Video' | undefined
} & Pick<Video, 'id' | 'isFavorite' | 'title' | 'URL'>

export type drawingsType = {
  __typename?: 'Drawing'
} & Pick<Drawing, 'id' | 'imageData' | 'isFavorite' | 'updatedAt' | 'createdAt'>
