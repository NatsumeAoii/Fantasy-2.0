import type { PropsWithChildren } from 'react'
import { useEffect } from 'react'
import { useLocalStorage } from '../../hooks'
import { ThemeContext, type AppTheme } from './ThemeContext'

function isAppTheme(value: unknown): value is AppTheme {
  return value === 'dark' || value === 'light'
}

export function ThemeProvider({ children }: PropsWithChildren) {
  const [theme, setTheme] = useLocalStorage<AppTheme>('theme', 'dark', { validate: isAppTheme, version: 1 })

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme)
  }, [theme])

  return (
    <ThemeContext.Provider
      value={{
        theme,
        toggleTheme: () => setTheme((prev) => (prev === 'dark' ? 'light' : 'dark')),
      }}
    >
      {children}
    </ThemeContext.Provider>
  )
}
