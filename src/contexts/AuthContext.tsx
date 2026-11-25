import { createContext, useContext, useState, type ReactNode } from 'react'
import type { User } from '../types'

interface AuthContextValue {
  user: User | null
  login: (username: string, password: string) => boolean
  logout: () => void
}

const AuthContext = createContext<AuthContextValue | undefined>(undefined)

function getInitialUser(): User | null {
  const username = window.localStorage.getItem('shopmini-user')
  return username ? { username } : null
}

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(getInitialUser)

  const login = (username: string, password: string): boolean => {
    const normalizedUsername = username.trim()
    if (!normalizedUsername || password !== '123456') return false

    const nextUser = { username: normalizedUsername }
    window.localStorage.setItem('shopmini-user', normalizedUsername)
    setUser(nextUser)
    return true
  }

  const logout = () => {
    window.localStorage.removeItem('shopmini-user')
    setUser(null)
  }

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth(): AuthContextValue {
  const context = useContext(AuthContext)
  if (!context) throw new Error('useAuth phải được dùng bên trong AuthProvider.')
  return context
}
