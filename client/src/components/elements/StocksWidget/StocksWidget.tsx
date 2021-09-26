import { useRef } from 'react'
import useLocalStorage from '../../../hooks/useLocalStorage'
// import {
//   getStockQuote,
//   getStockCandleInfo,
//   // getCryptoCandleInfo,
// } from '../../../api/FinnhubAPI'
import { DynamicContainer } from '../../modules'

import * as Styled from './StocksWidget.styled'

export const StocksWidget: React.FC = () => {
  const [stock, setStock] = useLocalStorage('selectedStock', 'TSLA')

  const formRef = useRef() as React.MutableRefObject<HTMLInputElement>

  const handleFormSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    if (!formRef || !formRef.current) return

    setStock(formRef.current.value)
    formRef.current.value = ''
  }

  return (
    <DynamicContainer
      nodeTitle="StocksWidget"
      defaultLocation={{ x: 0.3, y: 0.3 }}
    >
      <Styled.StocksContainer>
        <iframe
          width="100%"
          frameBorder="0"
          height="400"
          style={{ marginTop: '30px' }}
          src={`https://widget.finnhub.io/widgets/stocks/chart?symbol=${stock}&watermarkColor=%231db954&backgroundColor=%23222222&textColor=white`}
        />
        <form onSubmit={handleFormSubmit}>
          <Styled.Input
            ref={formRef}
            placeholder="Enter Stock Ticker"
            // containerColor={containerColor}
          />
        </form>
      </Styled.StocksContainer>
    </DynamicContainer>
  )
}
