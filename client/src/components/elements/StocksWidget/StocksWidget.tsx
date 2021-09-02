export {}
// import { useState, useEffect, useRef } from 'react'
// import {
//   getStockQuote,
//   getStockCandleInfo,
//   getCryptoCandleInfo,
// } from '../../../api/FinnhubAPI'
// import { DynamicContainer } from '../../modules'

// import * as Styled from './StocksWidget.styled'

// export const StocksWidget: React.FC = () => {
//   //https://www.alphavantage.co/query?function=TIME_SERIES_DAILY_ADJUSTED&symbol=IBM&apikey=demo
//   const [stockData, setStockData] = useState([])
//   const [stock, setStock] = useState('IBM')

//   const canvasRef = useRef() as any

//   useEffect(() => {
//     getStockData()
//   }, [symbol])

//   useEffect(() => {
//     const ctx = canvasRef.current
//     const lineChart = new Chart(ctx, {
//       type: 'line',
//       data: {
//         labels: [...Array(stockData.length).keys()].map(() => ''),
//         datasets: [
//           {
//             label: '',
//             data: stockData,
//             borderColor: 'rgb(158, 228, 147)',
//           },
//         ],
//       },
//       options: {
//         legend: {
//           display: false,
//         },
//         scales: {
//           yAxes: [
//             {
//               ticks: {
//                 suggestedMin: Math.min(...stockData) * 0.95,
//                 suggestedMax: Math.max(...stockData) * 1.05,
//                 fontColor: 'WHITE',
//               },
//               scaleLabel: {
//                 display: true,
//                 fontColor: 'WHITE',
//                 fontSize: 18,
//                 labelString: 'Price',
//               },
//             },
//           ],
//           xAxes: [
//             {
//               ticks: {
//                 fontColor: 'WHITE',
//               },
//               scaleLabel: {
//                 display: true,
//                 fontColor: 'WHITE',
//                 fontSize: 18,
//                 labelString: '',
//               },
//             },
//           ],
//         },
//       },
//     })

//     return () => {
//       lineChart.destroy()
//     }
//   }, [stockData])

//   const getStockData = async () => {
//     const stockData = await getStockData()
//     console.log(stockData)
//   }

//   return (
//     <DynamicContainer
//       nodeTitle="StocksWidget"
//       defaultLocation={{ x: 0.3, y: 0.3 }}
//     >
//       <Styled.StocksContainer>
//         <div>stocks</div>
//         <canvas id="chart" ref={canvasRef} width="900px" height="600px" />
//       </Styled.StocksContainer>
//     </DynamicContainer>
//   )
// }
