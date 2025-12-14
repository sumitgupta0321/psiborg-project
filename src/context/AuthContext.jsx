import { createContext, useContext, useState, useEffect } from 'react'

const AuthContext = createContext(null)

export const AuthProvider = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(() => {
    return sessionStorage.getItem('isLoggedIn') === 'true'
  })

  const login = (username, password) => {
    if (username === 'admin@gmail.com' && password === 'admin') {
      setIsLoggedIn(true)
      sessionStorage.setItem('isLoggedIn', 'true')
      return true
    }
    return false
  }

  const logout = () => {
    setIsLoggedIn(false)
    sessionStorage.removeItem('isLoggedIn')
  }

  return (
    <AuthContext.Provider value={{ isLoggedIn, login, logout }}>
      {children}
    </AuthContext.Provider>
  )
}

export const useAuth = () => {
  const context = useContext(AuthContext)
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider')
  }
  return context
}
