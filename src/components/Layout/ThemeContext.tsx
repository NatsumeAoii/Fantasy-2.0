import { createContext, useContext } from 'react'

export type AppTheme = 'dark' | 'light'

export interface ThemeContextValue {
  theme: AppTheme
  toggleTheme: () => void
}

export const ThemeContext = createContext<ThemeContextValue | null>(null)

export function useTheme() {
  const value = useContext(ThemeContext)

  if (!value) {
    throw new Error('useTheme must be used inside ThemeProvider')
  }

  return value
}
