import { Dispatch, SetStateAction, SyntheticEvent, useState } from 'react'
import { CardElement, useStripe, useElements } from '@stripe/react-stripe-js'

import {
  GetUserDocument,
  useSubscribeMutation,
} from '../../../generated/graphql'
import * as Styled from './StripePayment.styled'
import { StripeCardElementOptions } from '@stripe/stripe-js'

interface StripePaymentProps {
  setShowingPayment: Dispatch<SetStateAction<boolean>>
}

export const StripePayment: React.FC<StripePaymentProps> = ({
  setShowingPayment,
}) => {
  const [error, setError] = useState<string | undefined | null>()

  const stripe = useStripe()
  const elements = useElements()

  const [subscribe] = useSubscribeMutation()

  const handleSubmit = async (event: SyntheticEvent) => {
    event.preventDefault()

    if (elements == null) {
      return
    }

    const { error, paymentMethod } = await stripe!.createPaymentMethod({
      type: 'card',
      card: elements.getElement(CardElement)!,
    })

    if (error) {
      setError(error.message)
      return
    }

    if (paymentMethod) {
      const response = await subscribe({
        variables: { paymentId: paymentMethod.id },
        refetchQueries: [{ query: GetUserDocument }],
      })
      if (response.data && response.data.subscribe.errors) {
        setError(response.data.subscribe.errors[0].message)
      }
    }
  }

  const cardElementOptions: StripeCardElementOptions = {
    style: {
      base: {
        iconColor: '#c4f0ff',
        color: '#fff',
        fontWeight: '500',
        fontFamily: 'Roboto, Open Sans, Segoe UI, sans-serif',
        fontSize: '16px',
        fontSmoothing: 'antialiased',
        ':-webkit-autofill': {
          color: '#fce883',
        },
        '::placeholder': {
          color: '#87BBFD',
        },
      },
      invalid: {
        iconColor: '#FFC7EE',
        color: '#FFC7EE',
      },
    },
    hidePostalCode: true,
  }

  return (
    <>
      <Styled.PaymentContainer>
        <Styled.Header>Upgrade to Atlas Premium</Styled.Header>
        <Styled.IconContainer>
          <Styled.IconLabelContainer>
            <Styled.VideoIcon size={68} />
            <Styled.Label>Video Uploads</Styled.Label>
          </Styled.IconLabelContainer>
          <Styled.IconLabelContainer>
            <Styled.CalenderIcon size={68} />
            <Styled.Label>Google Calender Widget</Styled.Label>
          </Styled.IconLabelContainer>
          <Styled.IconLabelContainer>
            <Styled.GmailIcon size={68} />
            <Styled.Label>Gmail Widget</Styled.Label>
          </Styled.IconLabelContainer>
        </Styled.IconContainer>
        <Styled.SubTitle>
          Unlock the features above for only $1.00/month
        </Styled.SubTitle>
        <Styled.PaymentForm onSubmit={handleSubmit}>
          <CardElement options={cardElementOptions} />
          <Styled.ErrorMessage>{error}</Styled.ErrorMessage>
          <Styled.ButtonContainer>
            <Styled.PayButton type="submit" disabled={!stripe || !elements}>
              Upgrade
            </Styled.PayButton>
            <Styled.BackButton onClick={() => setShowingPayment(false)}>
              No Thanks
            </Styled.BackButton>
          </Styled.ButtonContainer>
        </Styled.PaymentForm>
      </Styled.PaymentContainer>
      <Styled.PaymentOverlay onClick={() => setShowingPayment(false)} />
    </>
  )
}
