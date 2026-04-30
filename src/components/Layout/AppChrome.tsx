import type { PropsWithChildren } from 'react'
import { Toaster } from 'sonner'
import { CommandMenu } from '../CommandMenu'
import { useTheme } from './ThemeContext'

export function AppChrome({ children }: PropsWithChildren) {
  const { theme } = useTheme()

  return (
    <div
      data-testid="app-chrome"
      className="cathedral-atmosphere min-h-screen overflow-x-hidden font-serif text-parchment-100"
    >
      <div className="cathedral-atmosphere__backdrop" aria-hidden="true" />
      <div className="cathedral-frame" aria-hidden="true" />

      <main className="relative z-10 mx-auto flex min-h-screen w-full max-w-7xl flex-col items-center px-4 pb-10 pt-12">
        {children}
      </main>

      <CommandMenu />
      <Toaster
        position="bottom-center"
        theme={theme}
        toastOptions={{ className: 'cathedral-toast' }}
      />
    </div>
  )
}
