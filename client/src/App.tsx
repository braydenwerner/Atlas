import { useContext } from 'react'

import { SignedInContext } from './providers'
import { HomePage } from './pages/HomePage'
import { LoginPage } from './pages/LoginPage'

const App = () => {
  const { signedIn } = useContext(SignedInContext)
  return <div className="App">{signedIn ? <HomePage /> : <LoginPage />}</div>
}

export default App
