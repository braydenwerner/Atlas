import { Dispatch, SetStateAction, SyntheticEvent, useState } from 'react'
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
        <div>{error}</div>
      </form>
    </Styled.PaymentContainer>
  )
}
