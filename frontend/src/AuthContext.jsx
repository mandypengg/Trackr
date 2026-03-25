import { createContext, useContext, useState, useEffect } from "react"

const AuthContext = createContext(null)

function parseTokenPayload(token) {
  try {
    const base64 = token.split(".")[1].replace(/-/g, "+").replace(/_/g, "/")
    return JSON.parse(atob(base64))
  } catch {
    return null
  }
}

export function AuthProvider({ children }) {
  const [token, setToken] = useState(() => localStorage.getItem("token"))
  const [user, setUser] = useState(() => {
    const t = localStorage.getItem("token")
    return t ? parseTokenPayload(t) : null
  })

  function login(newToken) {
    localStorage.setItem("token", newToken)
    setToken(newToken)
    setUser(parseTokenPayload(newToken))
  }

  function logout() {
    localStorage.removeItem("token")
    setToken(null)
    setUser(null)
  }

  return (
    <AuthContext.Provider value={{ token, user, login, logout }}>
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  return useContext(AuthContext)
}
