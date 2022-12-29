import React, { createContext, useContext, useState, useEffect } from 'react'
import { auth } from '../firebase'
import { sendPasswordResetEmail, createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut, onAuthStateChanged } from 'firebase/auth'

const AuthContext = createContext()

export function useAuth() {
  return useContext(AuthContext)
}

export default function AuthProvider({ children }) {
    const [currentUser, setCurrentUser] = useState(auth.currentUser) 
    const [loading, setLoading] = useState(true)

    function signup(email, password) {
        return createUserWithEmailAndPassword(auth, email, password)
    }

    function login(email, password) {
        return signInWithEmailAndPassword(auth, email, password)
    }

    function logout() {
        return signOut(auth)
    }

    function resetPassword(email) {
        return sendPasswordResetEmail(auth, email)
    }

    useEffect(() => {
        return onAuthStateChanged(auth, (user) => {
            setCurrentUser(user)
            setLoading(false)
        })
    }, [])

  return (
    <AuthContext.Provider value={{
      currentUser,
      signup,
      login,
      logout,
      resetPassword,
    }}>
      {!loading && children}
    </AuthContext.Provider>
  )
}
