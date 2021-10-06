import { useState, useContext } from 'react'
import { Formik, Form, Field } from 'formik'
import { Snackbar } from '@material-ui/core'

import {
  useCreateUserMutation,
  useUpdateUserMutation,
  useLoginMutation,
} from '../../../generated/graphql'
import { auth } from '../../../config/firebaseConfig'
import { SignedInContext } from '../../../providers'
import { CustomTextField } from '../../elements/index'
import * as Styled from './Login.styled'
import { Alert } from '@material-ui/lab'
import { BiErrorCircle } from 'react-icons/bi'

interface FormSubmitData {
  name: string
  email: string
  password: string
}

type errorResponse = { error: string }

export const Login: React.FC = () => {
  //	three steps: a user is asked for a name, then email, then password
  //	if the user already exists, sign them in, otherwise create a new account
  const [loginStep, setLoginStep] = useState<string>('EnterName')
  const [email, setEmail] = useState('')
  const [snackbarOpen, setSnackBarOpen] = useState(false)
  const [errorSnackbarOpen, setErrorSnackBarOpen] = useState(false)
  const [errorMessage, setErrorMessage] = useState()

  const { updateTokenAttached } = useContext(SignedInContext)

  const [login] = useLoginMutation()
  const [createUser] = useCreateUserMutation()
  const [updateUser] = useUpdateUserMutation()

  const createNewUser = async (data: FormSubmitData) => {
    await auth
      .createUserWithEmailAndPassword(data.email, data.password)
      .then(async (user) => {
        if (user?.user) {
          const response = await createUser({
            variables: {
              data: {
                uid: user.user.uid,
                email: data.email,
                name: data.name,
                photoURL: user.user.photoURL,
                greetingMessage: `Hello, ${data.name}`,
                lastLoggedIn: new Date(),
              },
            },
          })
          if (response.data?.createUser.token) {
            //  save the jwt token in localstorage
            localStorage.setItem('token', response.data.createUser.token)
            updateTokenAttached(true)
          }
        } else {
          console.error('User object does not exist, cannot create user')
        }
      })
      .catch((err) => {
        console.error(err)
      })
  }

  //  create a user and send a verification email
  const handleSubmit = async (
    data: FormSubmitData
  ): Promise<errorResponse | null> => {
    let response = null

    // attempt to log in the user
    await auth
      .signInWithEmailAndPassword(data.email, data.password)
      .then(async (user) => {
        if (user.user?.uid) {
          const response = await login({ variables: { uid: user.user.uid } })
          //  save the jwt token in localstorage
          if (response.data?.login.token) {
            localStorage.setItem('token', response.data.login.token)
            updateTokenAttached(true)
          }
        }
      })
      .then(() => {
        updateUser({
          variables: {
            data: {
              name: data.name,
              lastLoggedIn: new Date(),
            },
          },
        })
      })
      .catch((error) => {
        //   if the accout does not exist, create it
        if (error.code === 'auth/user-not-found') {
          createNewUser(data)
        } else {
          response = { error: error.message }
        }
      })

    return response
  }

  const handleResetPassword = (email: string) => {
    auth
      .sendPasswordResetEmail(email)
      .then(() => {
        setEmail(email)
        setSnackBarOpen(true)
      })
      .catch((error) => {
        setErrorSnackBarOpen(true)
        setErrorMessage(error.message)
      })
  }

  const handleLoginStep = (step: string) => {
    if (step === 'increment') {
      switch (loginStep) {
        case 'EnterName':
          setLoginStep('EnterEmail')
          break
        case 'EnterEmail':
          setLoginStep('EnterPassword')
          break
      }
    } else if (step === 'decrement') {
      switch (loginStep) {
        case 'EnterPassword':
          setLoginStep('EnterEmail')
          break
        case 'EnterEmail':
          setLoginStep('EnterName')
          break
      }
    }
  }

  return (
    <>
      <Styled.FormContainer>
        <Formik
          validateOnChange={false}
          validateOnBlur={false}
          initialValues={{
            name: '',
            email: '',
            password: '',
          }}
          onSubmit={async (data, { setSubmitting, setFieldError }) => {
            if (
              data.name.length === 0 ||
              data.email.length === 0 ||
              data.password.length === 0
            )
              return

            setSubmitting(true)

            const res: errorResponse | null = await handleSubmit(data)

            //  if there is an error such as email already exists, display it
            if (res?.error) {
              setFieldError('password', res.error)
              setSubmitting(false)
            }
          }}
          validate={(values) => {
            handleLoginStep('increment')

            const errors: Record<string, string> = {}

            if (loginStep === 'EnterName' && values.name.length === 0) {
              errors.name = 'Please enter a name'
            } else if (
              loginStep === 'EnterEmail' &&
              values.email.length === 0
            ) {
              errors.name = 'Please enter an email'
            } else if (
              loginStep === 'EnterPassword' &&
              values.password.length === 0
            ) {
              errors.password = 'Please enter a password'
            }

            if (values.name.length < 1 && values.name.length !== 0) {
              errors.name = 'Names must be at least 1 characters long'
            } else if (values.name.length > 36 && values.name.length !== 0) {
              errors.name = 'Names must be at most 36 characters long'
            }

            const re =
              /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i
            if (!re.test(values.email) && values.email.length !== 0) {
              errors.email = 'Invalid email formatting'
            }

            if (values.password.length < 8 && values.password.length !== 0) {
              errors.password = 'Passwords must be at least 8 characters long'
            }

            return errors
          }}
        >
          {({ values, errors }) => (
            <Form>
              <Styled.LoginPromptContainer>
                {loginStep === 'EnterName' && (
                  <>
                    <Styled.StepHeader>
                      What&apos;s your name?
                    </Styled.StepHeader>
                    <Field name="name" component={CustomTextField} />
                  </>
                )}
                {loginStep === 'EnterEmail' && (
                  <>
                    <Styled.StepHeader>
                      What&apos;s your email?
                    </Styled.StepHeader>
                    <Field name="email" component={CustomTextField} />
                  </>
                )}
                {loginStep === 'EnterPassword' && (
                  <>
                    <Styled.StepHeader>Enter a password</Styled.StepHeader>
                    <Field
                      name="password"
                      type={'password'}
                      component={CustomTextField}
                    />
                    <Styled.ForgotPasswordButton
                      onClick={() => {
                        if (values.email.length > 0) {
                          handleResetPassword(values.email)
                        }
                      }}
                    >
                      Forgot Password?
                    </Styled.ForgotPasswordButton>
                  </>
                )}
                <Styled.ButtonContainer>
                  {loginStep !== 'EnterName' && (
                    <Styled.LoginButton
                      onClick={() => handleLoginStep('decrement')}
                    >
                      Go Back
                    </Styled.LoginButton>
                  )}
                </Styled.ButtonContainer>
              </Styled.LoginPromptContainer>
              <Styled.ErrorMessageContainer>
                <Styled.ErrorMessageInnerContainer>
                  {errors.name && <BiErrorCircle color="white" size={32} />}
                  <Styled.ErrorMessage>{errors.name}</Styled.ErrorMessage>
                </Styled.ErrorMessageInnerContainer>
              </Styled.ErrorMessageContainer>
              <Styled.ErrorMessageContainer>
                <Styled.ErrorMessageInnerContainer>
                  {errors.email && <BiErrorCircle color="white" size={32} />}
                  <Styled.ErrorMessage>{errors.email}</Styled.ErrorMessage>
                </Styled.ErrorMessageInnerContainer>
              </Styled.ErrorMessageContainer>
              <Styled.ErrorMessageContainer>
                <Styled.ErrorMessageInnerContainer>
                  {errors.password && <BiErrorCircle color="white" size={32} />}
                  <Styled.ErrorMessage>{errors.password}</Styled.ErrorMessage>
                </Styled.ErrorMessageInnerContainer>
              </Styled.ErrorMessageContainer>
            </Form>
          )}
        </Formik>
      </Styled.FormContainer>
      <Snackbar
        open={snackbarOpen}
        autoHideDuration={4000}
        onClose={() => setSnackBarOpen(false)}
      >
        <Alert severity="success">
          An email has been sent to {email} to reset your password
        </Alert>
      </Snackbar>
      <Snackbar
        open={errorSnackbarOpen}
        autoHideDuration={4000}
        onClose={() => setErrorSnackBarOpen(false)}
      >
        <Alert severity="warning">{errorMessage}</Alert>
      </Snackbar>
    </>
  )
}
