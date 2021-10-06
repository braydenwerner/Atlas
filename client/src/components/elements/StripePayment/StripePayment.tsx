import { Dispatch, SetStateAction, SyntheticEvent, useState } from 'react'
import { CardElement, useStripe, useElements } from '@stripe/react-stripe-js'
import { CircularProgress } from '@material-ui/core'

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
  const [loading, setLoading] = useState(false)
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
      setLoading(true)
      const response = await subscribe({
        variables: { paymentId: paymentMethod.id },
        refetchQueries: [{ query: GetUserDocument }],
      })
      setLoading(false)
      if (response.data && response.data.subscribe.errors) {
        setError(response.data.subscribe.errors[0].message)
      }
      setShowingPayment(false)
    }
  }

  const cardElementOptions: StripeCardElementOptions = {
    style: {
      base: {
        iconColor: '#c4f0ff',
        color: '#fff',
        fontWeight: '500',
        fontFamily: 'Roboto, Open Sans, Segoe UI, sans-serif',
        fontSize: '20px',
        fontSmoothing: 'antialiased',
        ':-webkit-autofill': {
          color: '#fce883',
        },
        '::placeholder': {
          color: 'white',
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
            <Styled.StockIcon size={68} />
            <Styled.Label>Interative Stocks Widget</Styled.Label>
          </Styled.IconLabelContainer>
          <Styled.IconLabelContainer>
            <Styled.FontIcon size={68} />
            <Styled.Label>Unlock fonts</Styled.Label>
          </Styled.IconLabelContainer>
        </Styled.IconContainer>
        <Styled.SubTitle>
          Unlock the features above for only $1.00/month
        </Styled.SubTitle>
        {!loading ? (
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
        ) : (
          <Styled.LoadingContainer>
            <CircularProgress size={100} />
          </Styled.LoadingContainer>
        )}
      </Styled.PaymentContainer>
      <Styled.PaymentOverlay onClick={() => setShowingPayment(false)} />
    </>
  )
}
