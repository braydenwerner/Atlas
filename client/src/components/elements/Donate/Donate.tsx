import React, { Dispatch, SetStateAction } from 'react'

import * as Styled from './Donate.styled'

interface DonateProps {
  setShowingDonate: Dispatch<SetStateAction<boolean>>
}

export const Donate: React.FC<DonateProps> = ({ setShowingDonate }) => {
  return (
    <>
      <Styled.DonateContainer>
        <Styled.DonateHeader>Support Innodesk</Styled.DonateHeader>
        <Styled.DonateDescription>
          Thank you for thinking about supporting this project!
          <br />
          It would not be possible without you and your continued support.
        </Styled.DonateDescription>
        <Styled.PaymentOptionContainer>
          <Styled.PaymentOption
            href="https://www.buymeacoffee.com/AtlasExtension"
            target="_blank"
            aria-label="buy-me-a-coffee"
          >
            <Styled.BuyMeACoffeeIcon size={150} />
            <Styled.IconLabel>Buy me a coffee</Styled.IconLabel>
          </Styled.PaymentOption>
        </Styled.PaymentOptionContainer>
      </Styled.DonateContainer>
      <Styled.DonateOverlay onClick={() => setShowingDonate(false)} />
    </>
  )
}
