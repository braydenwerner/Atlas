import React from 'react'
import { FieldProps } from 'formik'
import * as Styled from './CustomTextField.styled'

type CustomTextFieldProps = {
  placeholder?: string
  type?: string
} & FieldProps

export const CustomTextField: React.FC<CustomTextFieldProps> = ({
  placeholder,
  type,
  field,
  form: { touched, errors },
  ...props
}) => {
  return (
    <>
      <Styled.TextInput
        type={type === 'password' ? 'password' : undefined}
        autoComplete="true"
        autoFocus
        {...field}
        {...props}
      />
    </>
  )
}
