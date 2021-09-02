import { gql } from '@apollo/client'
import * as Apollo from '@apollo/client'
export type Maybe<T> = T | null
export type Exact<T extends { [key: string]: unknown }> = {
  [K in keyof T]: T[K]
}
export type MakeOptional<T, K extends keyof T> = Omit<T, K> &
  { [SubKey in K]?: Maybe<T[SubKey]> }
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> &
  { [SubKey in K]: Maybe<T[SubKey]> }
const defaultOptions = {}
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string
  String: string
  Boolean: boolean
  Int: number
  Float: number
  /** The javascript `Date` as string. Type represents date and time as the ISO Date string. */
  DateTime: any
  /** The `Upload` scalar type represents a file upload. */
  Upload: any
}

export type CreateUserInput = {
  uid: Scalars['String']
  name?: Maybe<Scalars['String']>
  email?: Maybe<Scalars['String']>
  country?: Maybe<Scalars['String']>
  photoURL?: Maybe<Scalars['String']>
  selectedUserBackground?: Maybe<Scalars['String']>
  greetingMessage?: Maybe<Scalars['String']>
  lastLoggedIn?: Maybe<Scalars['DateTime']>
}

export type Drawing = {
  __typename?: 'Drawing'
  id: Scalars['Float']
  uid: Scalars['String']
  imageData?: Maybe<Scalars['String']>
  isFavorite: Scalars['Boolean']
  createdAt: Scalars['String']
  updatedAt: Scalars['String']
}

export type FieldError = {
  __typename?: 'FieldError'
  field: Scalars['String']
  message: Scalars['String']
}

export type Image = {
  __typename?: 'Image'
  id: Scalars['Float']
  uid: Scalars['String']
  title: Scalars['String']
  URL: Scalars['String']
  isFavorite: Scalars['Boolean']
  createdAt: Scalars['String']
}

export type ImageResponse = {
  __typename?: 'ImageResponse'
  errors?: Maybe<Array<FieldError>>
  images?: Maybe<Array<Image>>
}

export type Mutation = {
  __typename?: 'Mutation'
  uploadImages?: Maybe<ImageResponse>
  deleteImages?: Maybe<ImageResponse>
  updateImages?: Maybe<Scalars['Boolean']>
  createUser: UserResponse
  login: UserResponse
  updateUser: Scalars['Boolean']
  createTodo: Todo
  updateTodo: Scalars['Boolean']
  deleteTodo: Scalars['Boolean']
  createNote: Note
  updateNote: Scalars['Boolean']
  deleteNote: Scalars['Boolean']
  uploadVideos?: Maybe<VideoResponse>
  deleteVideos?: Maybe<VideoResponse>
  updateVideos?: Maybe<Scalars['Boolean']>
  createDrawing: Drawing
  updateDrawing: Scalars['Boolean']
  deleteDrawing: Scalars['Boolean']
}

export type MutationUploadImagesArgs = {
  files: Array<Scalars['Upload']>
}

export type MutationDeleteImagesArgs = {
  urls: Array<Scalars['String']>
}

export type MutationUpdateImagesArgs = {
  isFavoriteArr: Array<Scalars['Boolean']>
  ids: Array<Scalars['Int']>
}

export type MutationCreateUserArgs = {
  data: CreateUserInput
}

export type MutationLoginArgs = {
  uid: Scalars['String']
}

export type MutationUpdateUserArgs = {
  data: UpdateUserInput
}

export type MutationCreateTodoArgs = {
  title: Scalars['String']
}

export type MutationUpdateTodoArgs = {
  data: UpdateTodoInput
  id: Scalars['Int']
}

export type MutationDeleteTodoArgs = {
  id: Scalars['Int']
}

export type MutationUpdateNoteArgs = {
  data: UpdateNoteInput
  id: Scalars['Int']
}

export type MutationDeleteNoteArgs = {
  id: Scalars['Int']
}

export type MutationUploadVideosArgs = {
  files: Array<Scalars['Upload']>
}

export type MutationDeleteVideosArgs = {
  urls: Array<Scalars['String']>
}

export type MutationUpdateVideosArgs = {
  isFavoriteArr: Array<Scalars['Boolean']>
  ids: Array<Scalars['Int']>
}

export type MutationUpdateDrawingArgs = {
  data: UpdateDrawingInput
  id: Scalars['Int']
}

export type MutationDeleteDrawingArgs = {
  id: Scalars['Int']
}

export type Note = {
  __typename?: 'Note'
  id: Scalars['Float']
  uid: Scalars['String']
  body?: Maybe<Scalars['String']>
  isFavorite: Scalars['Boolean']
  createdAt: Scalars['String']
  updatedAt: Scalars['String']
}

export type Query = {
  __typename?: 'Query'
  getImages?: Maybe<Array<Image>>
  getUser?: Maybe<UserAccount>
  getTodos?: Maybe<Array<Todo>>
  getNotes?: Maybe<Array<Note>>
  getVideos?: Maybe<Array<Video>>
  getDrawings?: Maybe<Array<Drawing>>
}

export type Todo = {
  __typename?: 'Todo'
  id: Scalars['Float']
  uid: Scalars['String']
  title: Scalars['String']
  isChecked: Scalars['Boolean']
  checkedAt: Scalars['DateTime']
  createdAt: Scalars['String']
  updatedAt: Scalars['String']
}

export type UpdateDrawingInput = {
  imageData?: Maybe<Scalars['String']>
  isFavorite?: Maybe<Scalars['Boolean']>
}

export type UpdateNoteInput = {
  body?: Maybe<Scalars['String']>
  isFavorite?: Maybe<Scalars['Boolean']>
}

export type UpdateTodoInput = {
  title?: Maybe<Scalars['String']>
  isChecked?: Maybe<Scalars['Boolean']>
}

export type UpdateUserInput = {
  name?: Maybe<Scalars['String']>
  email?: Maybe<Scalars['String']>
  country?: Maybe<Scalars['String']>
  photoURL?: Maybe<Scalars['String']>
  selectedUserBackground?: Maybe<Scalars['String']>
  colorTheme?: Maybe<Scalars['String']>
  greetingMessage?: Maybe<Scalars['String']>
  lastLoggedIn?: Maybe<Scalars['DateTime']>
}

export type UserAccount = {
  __typename?: 'UserAccount'
  id: Scalars['Float']
  uid: Scalars['String']
  name?: Maybe<Scalars['String']>
  email?: Maybe<Scalars['String']>
  country?: Maybe<Scalars['String']>
  photoURL?: Maybe<Scalars['String']>
  selectedUserBackground?: Maybe<Scalars['String']>
  colorTheme?: Maybe<Scalars['String']>
  greetingMessage?: Maybe<Scalars['String']>
  lastLoggedIn?: Maybe<Scalars['String']>
  createdAt: Scalars['String']
  updatedAt: Scalars['String']
}

export type UserResponse = {
  __typename?: 'UserResponse'
  errors?: Maybe<Array<FieldError>>
  user?: Maybe<UserAccount>
  token?: Maybe<Scalars['String']>
}

export type Video = {
  __typename?: 'Video'
  id: Scalars['Float']
  uid: Scalars['String']
  title: Scalars['String']
  URL: Scalars['String']
  isFavorite: Scalars['Boolean']
  createdAt: Scalars['String']
}

export type VideoResponse = {
  __typename?: 'VideoResponse'
  errors?: Maybe<Array<FieldError>>
  Videos?: Maybe<Array<Video>>
}

export type CreateDrawingMutationVariables = Exact<{ [key: string]: never }>

export type CreateDrawingMutation = { __typename?: 'Mutation' } & {
  createDrawing: { __typename?: 'Drawing' } & Pick<
    Drawing,
    'id' | 'imageData' | 'isFavorite' | 'updatedAt' | 'createdAt'
  >
}

export type CreateNoteMutationVariables = Exact<{ [key: string]: never }>

export type CreateNoteMutation = { __typename?: 'Mutation' } & {
  createNote: { __typename?: 'Note' } & Pick<
    Note,
    'id' | 'body' | 'isFavorite' | 'updatedAt' | 'createdAt'
  >
}

export type CreateTodoMutationVariables = Exact<{
  title: Scalars['String']
}>

export type CreateTodoMutation = { __typename?: 'Mutation' } & {
  createTodo: { __typename?: 'Todo' } & Pick<Todo, 'id'>
}

export type CreateUserMutationVariables = Exact<{
  data: CreateUserInput
}>

export type CreateUserMutation = { __typename?: 'Mutation' } & {
  createUser: { __typename?: 'UserResponse' } & Pick<UserResponse, 'token'> & {
      errors?: Maybe<
        Array<
          { __typename?: 'FieldError' } & Pick<FieldError, 'field' | 'message'>
        >
      >
    }
}

export type DeleteDrawingMutationVariables = Exact<{
  id: Scalars['Int']
}>

export type DeleteDrawingMutation = { __typename?: 'Mutation' } & Pick<
  Mutation,
  'deleteDrawing'
>

export type DeleteImagesMutationVariables = Exact<{
  urls: Array<Scalars['String']> | Scalars['String']
}>

export type DeleteImagesMutation = { __typename?: 'Mutation' } & {
  deleteImages?: Maybe<
    { __typename?: 'ImageResponse' } & {
      errors?: Maybe<
        Array<
          { __typename?: 'FieldError' } & Pick<FieldError, 'field' | 'message'>
        >
      >
    }
  >
}

export type DeleteNoteMutationVariables = Exact<{
  id: Scalars['Int']
}>

export type DeleteNoteMutation = { __typename?: 'Mutation' } & Pick<
  Mutation,
  'deleteNote'
>

export type DeleteTodoMutationVariables = Exact<{
  id: Scalars['Int']
}>

export type DeleteTodoMutation = { __typename?: 'Mutation' } & Pick<
  Mutation,
  'deleteTodo'
>

export type DeleteVideosMutationVariables = Exact<{
  urls: Array<Scalars['String']> | Scalars['String']
}>

export type DeleteVideosMutation = { __typename?: 'Mutation' } & {
  deleteVideos?: Maybe<
    { __typename?: 'VideoResponse' } & {
      errors?: Maybe<
        Array<
          { __typename?: 'FieldError' } & Pick<FieldError, 'field' | 'message'>
        >
      >
    }
  >
}

export type LoginMutationVariables = Exact<{
  uid: Scalars['String']
}>

export type LoginMutation = { __typename?: 'Mutation' } & {
  login: { __typename?: 'UserResponse' } & Pick<UserResponse, 'token'> & {
      errors?: Maybe<
        Array<{ __typename?: 'FieldError' } & Pick<FieldError, 'message'>>
      >
    }
}

export type UpdateDrawingMutationVariables = Exact<{
  id: Scalars['Int']
  data: UpdateDrawingInput
}>

export type UpdateDrawingMutation = { __typename?: 'Mutation' } & Pick<
  Mutation,
  'updateDrawing'
>

export type UpdateImagesMutationVariables = Exact<{
  ids: Array<Scalars['Int']> | Scalars['Int']
  isFavoriteArr: Array<Scalars['Boolean']> | Scalars['Boolean']
}>

export type UpdateImagesMutation = { __typename?: 'Mutation' } & Pick<
  Mutation,
  'updateImages'
>

export type UpdateNoteMutationVariables = Exact<{
  id: Scalars['Int']
  data: UpdateNoteInput
}>

export type UpdateNoteMutation = { __typename?: 'Mutation' } & Pick<
  Mutation,
  'updateNote'
>

export type UpdateTodoMutationVariables = Exact<{
  id: Scalars['Int']
  data: UpdateTodoInput
}>

export type UpdateTodoMutation = { __typename?: 'Mutation' } & Pick<
  Mutation,
  'updateTodo'
>

export type UpdateUserMutationVariables = Exact<{
  data: UpdateUserInput
}>

export type UpdateUserMutation = { __typename?: 'Mutation' } & Pick<
  Mutation,
  'updateUser'
>

export type UpdateVideosMutationVariables = Exact<{
  ids: Array<Scalars['Int']> | Scalars['Int']
  isFavoriteArr: Array<Scalars['Boolean']> | Scalars['Boolean']
}>

export type UpdateVideosMutation = { __typename?: 'Mutation' } & Pick<
  Mutation,
  'updateVideos'
>

export type UploadImagesMutationVariables = Exact<{
  files: Array<Scalars['Upload']> | Scalars['Upload']
}>

export type UploadImagesMutation = { __typename?: 'Mutation' } & {
  uploadImages?: Maybe<
    { __typename?: 'ImageResponse' } & {
      errors?: Maybe<
        Array<
          { __typename?: 'FieldError' } & Pick<FieldError, 'field' | 'message'>
        >
      >
    }
  >
}

export type UploadVideosMutationVariables = Exact<{
  files: Array<Scalars['Upload']> | Scalars['Upload']
}>

export type UploadVideosMutation = { __typename?: 'Mutation' } & {
  uploadVideos?: Maybe<
    { __typename?: 'VideoResponse' } & {
      errors?: Maybe<
        Array<
          { __typename?: 'FieldError' } & Pick<FieldError, 'field' | 'message'>
        >
      >
    }
  >
}

export type GetDrawingsQueryVariables = Exact<{ [key: string]: never }>

export type GetDrawingsQuery = { __typename?: 'Query' } & {
  getDrawings?: Maybe<
    Array<
      { __typename?: 'Drawing' } & Pick<
        Drawing,
        'id' | 'imageData' | 'isFavorite' | 'updatedAt' | 'createdAt'
      >
    >
  >
}

export type GetImagesQueryVariables = Exact<{ [key: string]: never }>

export type GetImagesQuery = { __typename?: 'Query' } & {
  getImages?: Maybe<
    Array<
      { __typename?: 'Image' } & Pick<
        Image,
        'id' | 'title' | 'URL' | 'isFavorite'
      >
    >
  >
}

export type GetNotesQueryVariables = Exact<{ [key: string]: never }>

export type GetNotesQuery = { __typename?: 'Query' } & {
  getNotes?: Maybe<
    Array<
      { __typename?: 'Note' } & Pick<
        Note,
        'id' | 'body' | 'isFavorite' | 'updatedAt' | 'createdAt'
      >
    >
  >
}

export type GetTodosQueryVariables = Exact<{ [key: string]: never }>

export type GetTodosQuery = { __typename?: 'Query' } & {
  getTodos?: Maybe<
    Array<
      { __typename?: 'Todo' } & Pick<
        Todo,
        'id' | 'title' | 'isChecked' | 'createdAt'
      >
    >
  >
}

export type GetUserQueryVariables = Exact<{ [key: string]: never }>

export type GetUserQuery = { __typename?: 'Query' } & {
  getUser?: Maybe<
    { __typename?: 'UserAccount' } & Pick<
      UserAccount,
      | 'name'
      | 'email'
      | 'country'
      | 'photoURL'
      | 'selectedUserBackground'
      | 'colorTheme'
      | 'greetingMessage'
    >
  >
}

export type GetVideosQueryVariables = Exact<{ [key: string]: never }>

export type GetVideosQuery = { __typename?: 'Query' } & {
  getVideos?: Maybe<
    Array<
      { __typename?: 'Video' } & Pick<
        Video,
        'id' | 'title' | 'URL' | 'isFavorite'
      >
    >
  >
}

export const CreateDrawingDocument = gql`
  mutation createDrawing {
    createDrawing {
      id
      imageData
      isFavorite
      updatedAt
      createdAt
    }
  }
`
export type CreateDrawingMutationFn = Apollo.MutationFunction<
  CreateDrawingMutation,
  CreateDrawingMutationVariables
>

/**
 * __useCreateDrawingMutation__
 *
 * To run a mutation, you first call `useCreateDrawingMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreateDrawingMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createDrawingMutation, { data, loading, error }] = useCreateDrawingMutation({
 *   variables: {
 *   },
 * });
 */
export function useCreateDrawingMutation(
  baseOptions?: Apollo.MutationHookOptions<
    CreateDrawingMutation,
    CreateDrawingMutationVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions }
  return Apollo.useMutation<
    CreateDrawingMutation,
    CreateDrawingMutationVariables
  >(CreateDrawingDocument, options)
}
export type CreateDrawingMutationHookResult = ReturnType<
  typeof useCreateDrawingMutation
>
export type CreateDrawingMutationResult =
  Apollo.MutationResult<CreateDrawingMutation>
export type CreateDrawingMutationOptions = Apollo.BaseMutationOptions<
  CreateDrawingMutation,
  CreateDrawingMutationVariables
>
export const CreateNoteDocument = gql`
  mutation createNote {
    createNote {
      id
      body
      isFavorite
      updatedAt
      createdAt
    }
  }
`
export type CreateNoteMutationFn = Apollo.MutationFunction<
  CreateNoteMutation,
  CreateNoteMutationVariables
>

/**
 * __useCreateNoteMutation__
 *
 * To run a mutation, you first call `useCreateNoteMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreateNoteMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createNoteMutation, { data, loading, error }] = useCreateNoteMutation({
 *   variables: {
 *   },
 * });
 */
export function useCreateNoteMutation(
  baseOptions?: Apollo.MutationHookOptions<
    CreateNoteMutation,
    CreateNoteMutationVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions }
  return Apollo.useMutation<CreateNoteMutation, CreateNoteMutationVariables>(
    CreateNoteDocument,
    options
  )
}
export type CreateNoteMutationHookResult = ReturnType<
  typeof useCreateNoteMutation
>
export type CreateNoteMutationResult = Apollo.MutationResult<CreateNoteMutation>
export type CreateNoteMutationOptions = Apollo.BaseMutationOptions<
  CreateNoteMutation,
  CreateNoteMutationVariables
>
export const CreateTodoDocument = gql`
  mutation createTodo($title: String!) {
    createTodo(title: $title) {
      id
    }
  }
`
export type CreateTodoMutationFn = Apollo.MutationFunction<
  CreateTodoMutation,
  CreateTodoMutationVariables
>

/**
 * __useCreateTodoMutation__
 *
 * To run a mutation, you first call `useCreateTodoMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreateTodoMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createTodoMutation, { data, loading, error }] = useCreateTodoMutation({
 *   variables: {
 *      title: // value for 'title'
 *   },
 * });
 */
export function useCreateTodoMutation(
  baseOptions?: Apollo.MutationHookOptions<
    CreateTodoMutation,
    CreateTodoMutationVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions }
  return Apollo.useMutation<CreateTodoMutation, CreateTodoMutationVariables>(
    CreateTodoDocument,
    options
  )
}
export type CreateTodoMutationHookResult = ReturnType<
  typeof useCreateTodoMutation
>
export type CreateTodoMutationResult = Apollo.MutationResult<CreateTodoMutation>
export type CreateTodoMutationOptions = Apollo.BaseMutationOptions<
  CreateTodoMutation,
  CreateTodoMutationVariables
>
export const CreateUserDocument = gql`
  mutation createUser($data: CreateUserInput!) {
    createUser(data: $data) {
      token
      errors {
        field
        message
      }
    }
  }
`
export type CreateUserMutationFn = Apollo.MutationFunction<
  CreateUserMutation,
  CreateUserMutationVariables
>

/**
 * __useCreateUserMutation__
 *
 * To run a mutation, you first call `useCreateUserMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreateUserMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createUserMutation, { data, loading, error }] = useCreateUserMutation({
 *   variables: {
 *      data: // value for 'data'
 *   },
 * });
 */
export function useCreateUserMutation(
  baseOptions?: Apollo.MutationHookOptions<
    CreateUserMutation,
    CreateUserMutationVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions }
  return Apollo.useMutation<CreateUserMutation, CreateUserMutationVariables>(
    CreateUserDocument,
    options
  )
}
export type CreateUserMutationHookResult = ReturnType<
  typeof useCreateUserMutation
>
export type CreateUserMutationResult = Apollo.MutationResult<CreateUserMutation>
export type CreateUserMutationOptions = Apollo.BaseMutationOptions<
  CreateUserMutation,
  CreateUserMutationVariables
>
export const DeleteDrawingDocument = gql`
  mutation deleteDrawing($id: Int!) {
    deleteDrawing(id: $id)
  }
`
export type DeleteDrawingMutationFn = Apollo.MutationFunction<
  DeleteDrawingMutation,
  DeleteDrawingMutationVariables
>

/**
 * __useDeleteDrawingMutation__
 *
 * To run a mutation, you first call `useDeleteDrawingMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useDeleteDrawingMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [deleteDrawingMutation, { data, loading, error }] = useDeleteDrawingMutation({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useDeleteDrawingMutation(
  baseOptions?: Apollo.MutationHookOptions<
    DeleteDrawingMutation,
    DeleteDrawingMutationVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions }
  return Apollo.useMutation<
    DeleteDrawingMutation,
    DeleteDrawingMutationVariables
  >(DeleteDrawingDocument, options)
}
export type DeleteDrawingMutationHookResult = ReturnType<
  typeof useDeleteDrawingMutation
>
export type DeleteDrawingMutationResult =
  Apollo.MutationResult<DeleteDrawingMutation>
export type DeleteDrawingMutationOptions = Apollo.BaseMutationOptions<
  DeleteDrawingMutation,
  DeleteDrawingMutationVariables
>
export const DeleteImagesDocument = gql`
  mutation deleteImages($urls: [String!]!) {
    deleteImages(urls: $urls) {
      errors {
        field
        message
      }
    }
  }
`
export type DeleteImagesMutationFn = Apollo.MutationFunction<
  DeleteImagesMutation,
  DeleteImagesMutationVariables
>

/**
 * __useDeleteImagesMutation__
 *
 * To run a mutation, you first call `useDeleteImagesMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useDeleteImagesMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [deleteImagesMutation, { data, loading, error }] = useDeleteImagesMutation({
 *   variables: {
 *      urls: // value for 'urls'
 *   },
 * });
 */
export function useDeleteImagesMutation(
  baseOptions?: Apollo.MutationHookOptions<
    DeleteImagesMutation,
    DeleteImagesMutationVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions }
  return Apollo.useMutation<
    DeleteImagesMutation,
    DeleteImagesMutationVariables
  >(DeleteImagesDocument, options)
}
export type DeleteImagesMutationHookResult = ReturnType<
  typeof useDeleteImagesMutation
>
export type DeleteImagesMutationResult =
  Apollo.MutationResult<DeleteImagesMutation>
export type DeleteImagesMutationOptions = Apollo.BaseMutationOptions<
  DeleteImagesMutation,
  DeleteImagesMutationVariables
>
export const DeleteNoteDocument = gql`
  mutation deleteNote($id: Int!) {
    deleteNote(id: $id)
  }
`
export type DeleteNoteMutationFn = Apollo.MutationFunction<
  DeleteNoteMutation,
  DeleteNoteMutationVariables
>

/**
 * __useDeleteNoteMutation__
 *
 * To run a mutation, you first call `useDeleteNoteMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useDeleteNoteMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [deleteNoteMutation, { data, loading, error }] = useDeleteNoteMutation({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useDeleteNoteMutation(
  baseOptions?: Apollo.MutationHookOptions<
    DeleteNoteMutation,
    DeleteNoteMutationVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions }
  return Apollo.useMutation<DeleteNoteMutation, DeleteNoteMutationVariables>(
    DeleteNoteDocument,
    options
  )
}
export type DeleteNoteMutationHookResult = ReturnType<
  typeof useDeleteNoteMutation
>
export type DeleteNoteMutationResult = Apollo.MutationResult<DeleteNoteMutation>
export type DeleteNoteMutationOptions = Apollo.BaseMutationOptions<
  DeleteNoteMutation,
  DeleteNoteMutationVariables
>
export const DeleteTodoDocument = gql`
  mutation deleteTodo($id: Int!) {
    deleteTodo(id: $id)
  }
`
export type DeleteTodoMutationFn = Apollo.MutationFunction<
  DeleteTodoMutation,
  DeleteTodoMutationVariables
>

/**
 * __useDeleteTodoMutation__
 *
 * To run a mutation, you first call `useDeleteTodoMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useDeleteTodoMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [deleteTodoMutation, { data, loading, error }] = useDeleteTodoMutation({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useDeleteTodoMutation(
  baseOptions?: Apollo.MutationHookOptions<
    DeleteTodoMutation,
    DeleteTodoMutationVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions }
  return Apollo.useMutation<DeleteTodoMutation, DeleteTodoMutationVariables>(
    DeleteTodoDocument,
    options
  )
}
export type DeleteTodoMutationHookResult = ReturnType<
  typeof useDeleteTodoMutation
>
export type DeleteTodoMutationResult = Apollo.MutationResult<DeleteTodoMutation>
export type DeleteTodoMutationOptions = Apollo.BaseMutationOptions<
  DeleteTodoMutation,
  DeleteTodoMutationVariables
>
export const DeleteVideosDocument = gql`
  mutation deleteVideos($urls: [String!]!) {
    deleteVideos(urls: $urls) {
      errors {
        field
        message
      }
    }
  }
`
export type DeleteVideosMutationFn = Apollo.MutationFunction<
  DeleteVideosMutation,
  DeleteVideosMutationVariables
>

/**
 * __useDeleteVideosMutation__
 *
 * To run a mutation, you first call `useDeleteVideosMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useDeleteVideosMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [deleteVideosMutation, { data, loading, error }] = useDeleteVideosMutation({
 *   variables: {
 *      urls: // value for 'urls'
 *   },
 * });
 */
export function useDeleteVideosMutation(
  baseOptions?: Apollo.MutationHookOptions<
    DeleteVideosMutation,
    DeleteVideosMutationVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions }
  return Apollo.useMutation<
    DeleteVideosMutation,
    DeleteVideosMutationVariables
  >(DeleteVideosDocument, options)
}
export type DeleteVideosMutationHookResult = ReturnType<
  typeof useDeleteVideosMutation
>
export type DeleteVideosMutationResult =
  Apollo.MutationResult<DeleteVideosMutation>
export type DeleteVideosMutationOptions = Apollo.BaseMutationOptions<
  DeleteVideosMutation,
  DeleteVideosMutationVariables
>
export const LoginDocument = gql`
  mutation login($uid: String!) {
    login(uid: $uid) {
      token
      errors {
        message
      }
    }
  }
`
export type LoginMutationFn = Apollo.MutationFunction<
  LoginMutation,
  LoginMutationVariables
>

/**
 * __useLoginMutation__
 *
 * To run a mutation, you first call `useLoginMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useLoginMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [loginMutation, { data, loading, error }] = useLoginMutation({
 *   variables: {
 *      uid: // value for 'uid'
 *   },
 * });
 */
export function useLoginMutation(
  baseOptions?: Apollo.MutationHookOptions<
    LoginMutation,
    LoginMutationVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions }
  return Apollo.useMutation<LoginMutation, LoginMutationVariables>(
    LoginDocument,
    options
  )
}
export type LoginMutationHookResult = ReturnType<typeof useLoginMutation>
export type LoginMutationResult = Apollo.MutationResult<LoginMutation>
export type LoginMutationOptions = Apollo.BaseMutationOptions<
  LoginMutation,
  LoginMutationVariables
>
export const UpdateDrawingDocument = gql`
  mutation updateDrawing($id: Int!, $data: UpdateDrawingInput!) {
    updateDrawing(id: $id, data: $data)
  }
`
export type UpdateDrawingMutationFn = Apollo.MutationFunction<
  UpdateDrawingMutation,
  UpdateDrawingMutationVariables
>

/**
 * __useUpdateDrawingMutation__
 *
 * To run a mutation, you first call `useUpdateDrawingMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUpdateDrawingMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [updateDrawingMutation, { data, loading, error }] = useUpdateDrawingMutation({
 *   variables: {
 *      id: // value for 'id'
 *      data: // value for 'data'
 *   },
 * });
 */
export function useUpdateDrawingMutation(
  baseOptions?: Apollo.MutationHookOptions<
    UpdateDrawingMutation,
    UpdateDrawingMutationVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions }
  return Apollo.useMutation<
    UpdateDrawingMutation,
    UpdateDrawingMutationVariables
  >(UpdateDrawingDocument, options)
}
export type UpdateDrawingMutationHookResult = ReturnType<
  typeof useUpdateDrawingMutation
>
export type UpdateDrawingMutationResult =
  Apollo.MutationResult<UpdateDrawingMutation>
export type UpdateDrawingMutationOptions = Apollo.BaseMutationOptions<
  UpdateDrawingMutation,
  UpdateDrawingMutationVariables
>
export const UpdateImagesDocument = gql`
  mutation updateImages($ids: [Int!]!, $isFavoriteArr: [Boolean!]!) {
    updateImages(ids: $ids, isFavoriteArr: $isFavoriteArr)
  }
`
export type UpdateImagesMutationFn = Apollo.MutationFunction<
  UpdateImagesMutation,
  UpdateImagesMutationVariables
>

/**
 * __useUpdateImagesMutation__
 *
 * To run a mutation, you first call `useUpdateImagesMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUpdateImagesMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [updateImagesMutation, { data, loading, error }] = useUpdateImagesMutation({
 *   variables: {
 *      ids: // value for 'ids'
 *      isFavoriteArr: // value for 'isFavoriteArr'
 *   },
 * });
 */
export function useUpdateImagesMutation(
  baseOptions?: Apollo.MutationHookOptions<
    UpdateImagesMutation,
    UpdateImagesMutationVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions }
  return Apollo.useMutation<
    UpdateImagesMutation,
    UpdateImagesMutationVariables
  >(UpdateImagesDocument, options)
}
export type UpdateImagesMutationHookResult = ReturnType<
  typeof useUpdateImagesMutation
>
export type UpdateImagesMutationResult =
  Apollo.MutationResult<UpdateImagesMutation>
export type UpdateImagesMutationOptions = Apollo.BaseMutationOptions<
  UpdateImagesMutation,
  UpdateImagesMutationVariables
>
export const UpdateNoteDocument = gql`
  mutation updateNote($id: Int!, $data: UpdateNoteInput!) {
    updateNote(id: $id, data: $data)
  }
`
export type UpdateNoteMutationFn = Apollo.MutationFunction<
  UpdateNoteMutation,
  UpdateNoteMutationVariables
>

/**
 * __useUpdateNoteMutation__
 *
 * To run a mutation, you first call `useUpdateNoteMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUpdateNoteMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [updateNoteMutation, { data, loading, error }] = useUpdateNoteMutation({
 *   variables: {
 *      id: // value for 'id'
 *      data: // value for 'data'
 *   },
 * });
 */
export function useUpdateNoteMutation(
  baseOptions?: Apollo.MutationHookOptions<
    UpdateNoteMutation,
    UpdateNoteMutationVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions }
  return Apollo.useMutation<UpdateNoteMutation, UpdateNoteMutationVariables>(
    UpdateNoteDocument,
    options
  )
}
export type UpdateNoteMutationHookResult = ReturnType<
  typeof useUpdateNoteMutation
>
export type UpdateNoteMutationResult = Apollo.MutationResult<UpdateNoteMutation>
export type UpdateNoteMutationOptions = Apollo.BaseMutationOptions<
  UpdateNoteMutation,
  UpdateNoteMutationVariables
>
export const UpdateTodoDocument = gql`
  mutation updateTodo($id: Int!, $data: UpdateTodoInput!) {
    updateTodo(id: $id, data: $data)
  }
`
export type UpdateTodoMutationFn = Apollo.MutationFunction<
  UpdateTodoMutation,
  UpdateTodoMutationVariables
>

/**
 * __useUpdateTodoMutation__
 *
 * To run a mutation, you first call `useUpdateTodoMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUpdateTodoMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [updateTodoMutation, { data, loading, error }] = useUpdateTodoMutation({
 *   variables: {
 *      id: // value for 'id'
 *      data: // value for 'data'
 *   },
 * });
 */
export function useUpdateTodoMutation(
  baseOptions?: Apollo.MutationHookOptions<
    UpdateTodoMutation,
    UpdateTodoMutationVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions }
  return Apollo.useMutation<UpdateTodoMutation, UpdateTodoMutationVariables>(
    UpdateTodoDocument,
    options
  )
}
export type UpdateTodoMutationHookResult = ReturnType<
  typeof useUpdateTodoMutation
>
export type UpdateTodoMutationResult = Apollo.MutationResult<UpdateTodoMutation>
export type UpdateTodoMutationOptions = Apollo.BaseMutationOptions<
  UpdateTodoMutation,
  UpdateTodoMutationVariables
>
export const UpdateUserDocument = gql`
  mutation updateUser($data: UpdateUserInput!) {
    updateUser(data: $data)
  }
`
export type UpdateUserMutationFn = Apollo.MutationFunction<
  UpdateUserMutation,
  UpdateUserMutationVariables
>

/**
 * __useUpdateUserMutation__
 *
 * To run a mutation, you first call `useUpdateUserMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUpdateUserMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [updateUserMutation, { data, loading, error }] = useUpdateUserMutation({
 *   variables: {
 *      data: // value for 'data'
 *   },
 * });
 */
export function useUpdateUserMutation(
  baseOptions?: Apollo.MutationHookOptions<
    UpdateUserMutation,
    UpdateUserMutationVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions }
  return Apollo.useMutation<UpdateUserMutation, UpdateUserMutationVariables>(
    UpdateUserDocument,
    options
  )
}
export type UpdateUserMutationHookResult = ReturnType<
  typeof useUpdateUserMutation
>
export type UpdateUserMutationResult = Apollo.MutationResult<UpdateUserMutation>
export type UpdateUserMutationOptions = Apollo.BaseMutationOptions<
  UpdateUserMutation,
  UpdateUserMutationVariables
>
export const UpdateVideosDocument = gql`
  mutation updateVideos($ids: [Int!]!, $isFavoriteArr: [Boolean!]!) {
    updateVideos(ids: $ids, isFavoriteArr: $isFavoriteArr)
  }
`
export type UpdateVideosMutationFn = Apollo.MutationFunction<
  UpdateVideosMutation,
  UpdateVideosMutationVariables
>

/**
 * __useUpdateVideosMutation__
 *
 * To run a mutation, you first call `useUpdateVideosMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUpdateVideosMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [updateVideosMutation, { data, loading, error }] = useUpdateVideosMutation({
 *   variables: {
 *      ids: // value for 'ids'
 *      isFavoriteArr: // value for 'isFavoriteArr'
 *   },
 * });
 */
export function useUpdateVideosMutation(
  baseOptions?: Apollo.MutationHookOptions<
    UpdateVideosMutation,
    UpdateVideosMutationVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions }
  return Apollo.useMutation<
    UpdateVideosMutation,
    UpdateVideosMutationVariables
  >(UpdateVideosDocument, options)
}
export type UpdateVideosMutationHookResult = ReturnType<
  typeof useUpdateVideosMutation
>
export type UpdateVideosMutationResult =
  Apollo.MutationResult<UpdateVideosMutation>
export type UpdateVideosMutationOptions = Apollo.BaseMutationOptions<
  UpdateVideosMutation,
  UpdateVideosMutationVariables
>
export const UploadImagesDocument = gql`
  mutation uploadImages($files: [Upload!]!) {
    uploadImages(files: $files) {
      errors {
        field
        message
      }
    }
  }
`
export type UploadImagesMutationFn = Apollo.MutationFunction<
  UploadImagesMutation,
  UploadImagesMutationVariables
>

/**
 * __useUploadImagesMutation__
 *
 * To run a mutation, you first call `useUploadImagesMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUploadImagesMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [uploadImagesMutation, { data, loading, error }] = useUploadImagesMutation({
 *   variables: {
 *      files: // value for 'files'
 *   },
 * });
 */
export function useUploadImagesMutation(
  baseOptions?: Apollo.MutationHookOptions<
    UploadImagesMutation,
    UploadImagesMutationVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions }
  return Apollo.useMutation<
    UploadImagesMutation,
    UploadImagesMutationVariables
  >(UploadImagesDocument, options)
}
export type UploadImagesMutationHookResult = ReturnType<
  typeof useUploadImagesMutation
>
export type UploadImagesMutationResult =
  Apollo.MutationResult<UploadImagesMutation>
export type UploadImagesMutationOptions = Apollo.BaseMutationOptions<
  UploadImagesMutation,
  UploadImagesMutationVariables
>
export const UploadVideosDocument = gql`
  mutation uploadVideos($files: [Upload!]!) {
    uploadVideos(files: $files) {
      errors {
        field
        message
      }
    }
  }
`
export type UploadVideosMutationFn = Apollo.MutationFunction<
  UploadVideosMutation,
  UploadVideosMutationVariables
>

/**
 * __useUploadVideosMutation__
 *
 * To run a mutation, you first call `useUploadVideosMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUploadVideosMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [uploadVideosMutation, { data, loading, error }] = useUploadVideosMutation({
 *   variables: {
 *      files: // value for 'files'
 *   },
 * });
 */
export function useUploadVideosMutation(
  baseOptions?: Apollo.MutationHookOptions<
    UploadVideosMutation,
    UploadVideosMutationVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions }
  return Apollo.useMutation<
    UploadVideosMutation,
    UploadVideosMutationVariables
  >(UploadVideosDocument, options)
}
export type UploadVideosMutationHookResult = ReturnType<
  typeof useUploadVideosMutation
>
export type UploadVideosMutationResult =
  Apollo.MutationResult<UploadVideosMutation>
export type UploadVideosMutationOptions = Apollo.BaseMutationOptions<
  UploadVideosMutation,
  UploadVideosMutationVariables
>
export const GetDrawingsDocument = gql`
  query getDrawings {
    getDrawings {
      id
      imageData
      isFavorite
      updatedAt
      createdAt
    }
  }
`

/**
 * __useGetDrawingsQuery__
 *
 * To run a query within a React component, call `useGetDrawingsQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetDrawingsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetDrawingsQuery({
 *   variables: {
 *   },
 * });
 */
export function useGetDrawingsQuery(
  baseOptions?: Apollo.QueryHookOptions<
    GetDrawingsQuery,
    GetDrawingsQueryVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions }
  return Apollo.useQuery<GetDrawingsQuery, GetDrawingsQueryVariables>(
    GetDrawingsDocument,
    options
  )
}
export function useGetDrawingsLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<
    GetDrawingsQuery,
    GetDrawingsQueryVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions }
  return Apollo.useLazyQuery<GetDrawingsQuery, GetDrawingsQueryVariables>(
    GetDrawingsDocument,
    options
  )
}
export type GetDrawingsQueryHookResult = ReturnType<typeof useGetDrawingsQuery>
export type GetDrawingsLazyQueryHookResult = ReturnType<
  typeof useGetDrawingsLazyQuery
>
export type GetDrawingsQueryResult = Apollo.QueryResult<
  GetDrawingsQuery,
  GetDrawingsQueryVariables
>
export const GetImagesDocument = gql`
  query getImages {
    getImages {
      id
      title
      URL
      isFavorite
    }
  }
`

/**
 * __useGetImagesQuery__
 *
 * To run a query within a React component, call `useGetImagesQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetImagesQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetImagesQuery({
 *   variables: {
 *   },
 * });
 */
export function useGetImagesQuery(
  baseOptions?: Apollo.QueryHookOptions<GetImagesQuery, GetImagesQueryVariables>
) {
  const options = { ...defaultOptions, ...baseOptions }
  return Apollo.useQuery<GetImagesQuery, GetImagesQueryVariables>(
    GetImagesDocument,
    options
  )
}
export function useGetImagesLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<
    GetImagesQuery,
    GetImagesQueryVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions }
  return Apollo.useLazyQuery<GetImagesQuery, GetImagesQueryVariables>(
    GetImagesDocument,
    options
  )
}
export type GetImagesQueryHookResult = ReturnType<typeof useGetImagesQuery>
export type GetImagesLazyQueryHookResult = ReturnType<
  typeof useGetImagesLazyQuery
>
export type GetImagesQueryResult = Apollo.QueryResult<
  GetImagesQuery,
  GetImagesQueryVariables
>
export const GetNotesDocument = gql`
  query getNotes {
    getNotes {
      id
      body
      isFavorite
      updatedAt
      createdAt
    }
  }
`

/**
 * __useGetNotesQuery__
 *
 * To run a query within a React component, call `useGetNotesQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetNotesQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetNotesQuery({
 *   variables: {
 *   },
 * });
 */
export function useGetNotesQuery(
  baseOptions?: Apollo.QueryHookOptions<GetNotesQuery, GetNotesQueryVariables>
) {
  const options = { ...defaultOptions, ...baseOptions }
  return Apollo.useQuery<GetNotesQuery, GetNotesQueryVariables>(
    GetNotesDocument,
    options
  )
}
export function useGetNotesLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<
    GetNotesQuery,
    GetNotesQueryVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions }
  return Apollo.useLazyQuery<GetNotesQuery, GetNotesQueryVariables>(
    GetNotesDocument,
    options
  )
}
export type GetNotesQueryHookResult = ReturnType<typeof useGetNotesQuery>
export type GetNotesLazyQueryHookResult = ReturnType<
  typeof useGetNotesLazyQuery
>
export type GetNotesQueryResult = Apollo.QueryResult<
  GetNotesQuery,
  GetNotesQueryVariables
>
export const GetTodosDocument = gql`
  query getTodos {
    getTodos {
      id
      title
      isChecked
      createdAt
    }
  }
`

/**
 * __useGetTodosQuery__
 *
 * To run a query within a React component, call `useGetTodosQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetTodosQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetTodosQuery({
 *   variables: {
 *   },
 * });
 */
export function useGetTodosQuery(
  baseOptions?: Apollo.QueryHookOptions<GetTodosQuery, GetTodosQueryVariables>
) {
  const options = { ...defaultOptions, ...baseOptions }
  return Apollo.useQuery<GetTodosQuery, GetTodosQueryVariables>(
    GetTodosDocument,
    options
  )
}
export function useGetTodosLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<
    GetTodosQuery,
    GetTodosQueryVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions }
  return Apollo.useLazyQuery<GetTodosQuery, GetTodosQueryVariables>(
    GetTodosDocument,
    options
  )
}
export type GetTodosQueryHookResult = ReturnType<typeof useGetTodosQuery>
export type GetTodosLazyQueryHookResult = ReturnType<
  typeof useGetTodosLazyQuery
>
export type GetTodosQueryResult = Apollo.QueryResult<
  GetTodosQuery,
  GetTodosQueryVariables
>
export const GetUserDocument = gql`
  query getUser {
    getUser {
      name
      email
      country
      photoURL
      selectedUserBackground
      colorTheme
      greetingMessage
    }
  }
`

/**
 * __useGetUserQuery__
 *
 * To run a query within a React component, call `useGetUserQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetUserQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetUserQuery({
 *   variables: {
 *   },
 * });
 */
export function useGetUserQuery(
  baseOptions?: Apollo.QueryHookOptions<GetUserQuery, GetUserQueryVariables>
) {
  const options = { ...defaultOptions, ...baseOptions }
  return Apollo.useQuery<GetUserQuery, GetUserQueryVariables>(
    GetUserDocument,
    options
  )
}
export function useGetUserLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<GetUserQuery, GetUserQueryVariables>
) {
  const options = { ...defaultOptions, ...baseOptions }
  return Apollo.useLazyQuery<GetUserQuery, GetUserQueryVariables>(
    GetUserDocument,
    options
  )
}
export type GetUserQueryHookResult = ReturnType<typeof useGetUserQuery>
export type GetUserLazyQueryHookResult = ReturnType<typeof useGetUserLazyQuery>
export type GetUserQueryResult = Apollo.QueryResult<
  GetUserQuery,
  GetUserQueryVariables
>
export const GetVideosDocument = gql`
  query getVideos {
    getVideos {
      id
      title
      URL
      isFavorite
    }
  }
`

/**
 * __useGetVideosQuery__
 *
 * To run a query within a React component, call `useGetVideosQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetVideosQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetVideosQuery({
 *   variables: {
 *   },
 * });
 */
export function useGetVideosQuery(
  baseOptions?: Apollo.QueryHookOptions<GetVideosQuery, GetVideosQueryVariables>
) {
  const options = { ...defaultOptions, ...baseOptions }
  return Apollo.useQuery<GetVideosQuery, GetVideosQueryVariables>(
    GetVideosDocument,
    options
  )
}
export function useGetVideosLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<
    GetVideosQuery,
    GetVideosQueryVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions }
  return Apollo.useLazyQuery<GetVideosQuery, GetVideosQueryVariables>(
    GetVideosDocument,
    options
  )
}
export type GetVideosQueryHookResult = ReturnType<typeof useGetVideosQuery>
export type GetVideosLazyQueryHookResult = ReturnType<
  typeof useGetVideosLazyQuery
>
export type GetVideosQueryResult = Apollo.QueryResult<
  GetVideosQuery,
  GetVideosQueryVariables
>
