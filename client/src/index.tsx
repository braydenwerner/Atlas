import ReactDOM from 'react-dom'
import { ApolloProvider } from '@apollo/client'
import { client } from './util/createApolloClient'
import { AppProvider } from './providers/AppProvider'

import App from './App'

ReactDOM.render(
  <ApolloProvider client={client}>
    <AppProvider>
      <App />
    </AppProvider>
  </ApolloProvider>,
  document.getElementById('root')
)
