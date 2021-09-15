/* eslint-disable @typescript-eslint/no-non-null-assertion */
import { Dispatch, SetStateAction, SyntheticEvent } from 'react'
// import StripeCheckout from 'react-stripe-checkout'
import { CardElement, useStripe, useElements } from '@stripe/react-stripe-js'

import * as Styled from './StripePayment.styled'
import './StripePayment.css'

interface StripePaymentProps {
  setShowingPayment: Dispatch<SetStateAction<boolean>>
}

export const StripePayment: React.FC<StripePaymentProps> = ({
  setShowingPayment,
}) => {
  const stripe = useStripe()
  const elements = useElements()

  const handleSubmit = async (event: SyntheticEvent) => {
    event.preventDefault()

    if (elements == null) {
      return
    }

    const { error, paymentMethod } = await stripe!.createPaymentMethod({
      type: 'card',
      card: elements.getElement(CardElement)!,
    })

    console.log('payment method: ', paymentMethod)
    if (error) {
      console.log(error)
    }
  }

  const cardElementOptions = {
    style: {},
    hidePostalCode: true,
  }

  return (
    <Styled.PaymentContainer>
      <form onSubmit={handleSubmit}>
        <CardElement options={cardElementOptions} />
        <button type="submit" disabled={!stripe || !elements}>
          Pay
        </button>
      </form>
    </Styled.PaymentContainer>
  )
}
