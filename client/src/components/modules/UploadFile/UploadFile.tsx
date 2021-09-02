import { useState, useEffect } from 'react'
import { useDropzone } from 'react-dropzone'
import { CircularProgress, Snackbar } from '@material-ui/core'
import { Alert } from '@material-ui/lab'

import { auth } from '../../../config/firebaseConfig'
import {
  GetImagesDocument,
  GetVideosDocument,
  useUploadImagesMutation,
  useUploadVideosMutation,
} from '../../../generated/graphql'
import * as Styled from './UploadFile.styled'
import { MAX_FILE_SIZE } from '../../../util/constants'

interface UploadFile {
  fileType: string
}

export const UploadFile: React.FC<UploadFile> = ({ fileType }) => {
  const [snackbarOpen, setSnackBarOpen] = useState(false)
  const [errorMessage, setErrorMessage] = useState<string>('')

  const [uploadImage, imageData] = useUploadImagesMutation({
    refetchQueries: [
      {
        query: GetImagesDocument,
      },
    ],
  })
  const imageLoading = imageData.loading

  const [uploadVideo, videoData] = useUploadVideosMutation({
    refetchQueries: [
      {
        query: GetVideosDocument,
      },
    ],
  })
  const videoLoading = videoData.loading

  const onDrop = async (files: File[]) => {
    if (auth.currentUser?.uid) {
      if (fileType === 'image') {
        const response: any = await uploadImage({ variables: { files } })
        const errors = response.data.uploadImages.errors

        if (errors && errors[0].message) {
          setSnackBarOpen(true)
          setErrorMessage(errors[0].message)
        }
      } else {
        const response: any = await uploadVideo({ variables: { files } })
        const errors = response.data.uploadVideos.errors

        if (errors && errors[0].message) {
          setSnackBarOpen(true)
          setErrorMessage(errors[0].message)
        }
      }
    } else {
      console.error('User is not authenticated')
    }
  }

  const { getRootProps, getInputProps, isDragActive, fileRejections } =
    useDropzone({
      onDrop,
      maxFiles: fileType === 'image' ? 10 : 2,
      maxSize: MAX_FILE_SIZE,
      accept: fileType === 'image' ? 'image/jpeg, image/png' : 'video/mp4',
    })

  useEffect(() => {
    if (fileRejections.length > 0 && fileRejections[0].errors[0].message) {
      console.log(fileRejections[0].errors[0].message)
      setSnackBarOpen(true)
      setErrorMessage(fileRejections[0].errors[0].message)
    }
  }, [fileRejections])

  const fileUploadText = () => {
    if (!imageLoading && !videoLoading) {
      if (isDragActive) {
        return <p style={{ userSelect: 'none' }}>Drop files here ...</p>
      } else {
        return (
          <p style={{ userSelect: 'none' }}>
            Drag files here or click to select files
          </p>
        )
      }
    } else {
      return <CircularProgress />
    }
  }

  return (
    <>
      <Styled.DropContainer {...getRootProps()}>
        <input {...getInputProps()} />
        {fileUploadText()}
      </Styled.DropContainer>
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
