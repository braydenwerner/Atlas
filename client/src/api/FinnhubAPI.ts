export {}
// //  stock quote: https://finnhub.io/api/v1/quote?symbol=${stock}&token=${process.env.REACT_APP_FINNHUB_API_KEY}
// //  stock candle: https://finnhub.io/api/v1/stock/candle?symbol=${stock}&resolution={res}&from={from}&to={to}&token={process.env.REACT_APP_FINNHUB_API_KEY}
// //  crpto quote: none
// //  crypto candle: https://finnhub.io/api/v1/crypto/candle?symbol={symbol}&resolution={res}&from={from}&to={to}&={process.env.REACT_APP_FINNHUB_API_KEY}

// export const getStockQuote = async (stock: string) => {
//   console.log(process.env.REACT_APP_FINNHUB_API_KEY)
//   let data
//   const errors = []
//   try {
//     const res = await fetch(
//       `https://finnhub.io/api/v1/quote?symbol=${stock}&token=${process.env.REACT_APP_FINNHUB_API_KEY}`
//     )
//     data = await res.json().catch((err: string) => errors.push(err))
//   } catch (err) {
//     errors.push(err)
//   }

//   return { data, errors }
// }

// export const getStockCandleInfo = async (
//   stock: string,
//   from: number,
//   to: number
// ) => {
//   console.log(stock)
//   console.log(from)
//   console.log(to)
//   let data
//   const errors = []
//   try {
//     const res: any = await fetch(
//       `https://finnhub.io/api/v1/stock/candle?symbol=${stock}&resolution=D&from=${from}&to=${to}&token=${process.env.REACT_APP_FINNHUB_API_KEY}`
//     )
//     data = await res.json().catch((err: string) => errors.push(err))
//   } catch (err) {
//     errors.push(err)
//   }

//   return { data, errors }
// }

// export const getCryptoCandleInfo = async (
//   stock: string,
//   res: string,
//   from: number,
//   to: number
// ) => {
//   let data
//   const errors = []
//   try {
//     const res: any = await fetch(
//       `https://finnhub.io/api/v1/crypto/candle?symbol=BINANCE:${stock}USDT&resolution=${res}&from=${from}&to=${to}&=${process.env.REACT_APP_FINNHUB_API_KEY}`
//     )
//     data = await res.json().catch((err: string) => errors.push(err))
//   } catch (err) {
//     errors.push(err)
//   }

//   return { data, errors }
// }
