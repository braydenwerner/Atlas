/* eslint-disable @typescript-eslint/no-non-null-assertion */
import { Dispatch, SetStateAction, SyntheticEvent, useState } from 'react'
// import StripeCheckout from 'react-stripe-checkout'
import { CardElement, useStripe, useElements } from '@stripe/react-stripe-js'

import {
  GetUserDocument,
  useSubscribeMutation,
} from '../../../generated/graphql'
import * as Styled from './StripePayment.styled'
import './StripePayment.css'

interface StripePaymentProps {
  setShowingPayment: Dispatch<SetStateAction<boolean>>
}

export const StripePayment: React.FC<StripePaymentProps> = ({
  setShowingPayment,
}) => {
  const [error, setError] = useState()

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

    console.log('payment method: ', paymentMethod)
    if (error) {
      console.error(error)
    } else {
      //  send information to backend
      if (paymentMethod) {
        const response = await subscribe({
          variables: { paymentId: paymentMethod.id },
          refetchQueries: [{ query: GetUserDocument }],
        })
        console.log(response)
      }
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
