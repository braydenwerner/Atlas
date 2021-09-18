import { createContext, useState, useEffect, useMemo } from 'react'

import useLocalStorage from '../hooks/useLocalStorage'
import { auth, User } from '../config/firebaseConfig'

interface UserCallback {
  signedIn: boolean
}

export const SignedInContext = createContext({
  signedIn: false,
  user: null as User,
  tokenAttached: false,
  hasPaid: false,
  setHasPaid: (hasPaid: boolean) => {
    return
  },
  updateTokenAttached: (attached: boolean) => {
    return
  },
})

export const SignedInProvider: React.FC = ({ children }) => {
  const [user, setUser] = useState<User | null>(null)
  const [tokenAttached, setTokenAttached] = useState(false)
  const [hasPaid, setHasPaid] = useState(false)

  const [signedIn, setSignedIn] = useLocalStorage('signedIn', false)

  useEffect(() => {
    if (signedIn) setTokenAttached(true)
  }, [])

  useEffect(() => {
    const unsubscribe = onAuthStateChanged((response: UserCallback) => {
      response.signedIn ? setSignedIn(true) : setSignedIn(false)
    })

    return () => unsubscribe()
  }, [])

  //  have to use callbacks, setting state within the listener does not work
  const onAuthStateChanged = (callback: (response: UserCallback) => void) => {
    return auth.onAuthStateChanged((user) => {
      if (user) {
        setUser(user)
        callback({ signedIn: true })
      } else {
        setUser(null)
        callback({ signedIn: false })
      }
    })
  }

  const updateTokenAttached = (attached: boolean) => {
    setTokenAttached(attached)
  }

  const signedInValue = useMemo(
    () => ({
      signedIn,
      user,
      tokenAttached,
      hasPaid,
      setHasPaid,
      updateTokenAttached,
    }),
    [signedIn, user, tokenAttached, hasPaid, setHasPaid, updateTokenAttached]
  )
  return (
    <SignedInContext.Provider value={signedInValue}>
      {children}
    </SignedInContext.Provider>
  )
}
