import type { PropsWithChildren } from 'react'
import { useEffect } from 'react'
import { usePreferencesStore } from '../../store/preferencesStore'
import { ThemeContext } from './ThemeContext'

export function ThemeProvider({ children }: PropsWithChildren) {
  const theme = usePreferencesStore((state) => state.theme)
  const toggleTheme = usePreferencesStore((state) => state.toggleTheme)

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme)
  }, [theme])

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  )
}
