import { createRootRoute, Outlet } from '@tanstack/react-router'
import { Suspense } from 'react'
import { AppChrome } from '../components/Layout/AppChrome'
import { ThemeProvider } from '../components/Layout/ThemeProvider'

export const Route = createRootRoute({
    component: RootLayout,
})

function AppFallback() {
  return (
    <div className="flex min-h-[50vh] w-full items-center justify-center px-4">
      <div className="cathedral-panel h-24 w-full max-w-md animate-pulse rounded-md" aria-label="Loading application" />
    </div>
  )
}

function RootLayout() {
  return (
    <ThemeProvider>
      <AppChrome>
        <Suspense fallback={<AppFallback />}>
          <Outlet />
        </Suspense>
      </AppChrome>
    </ThemeProvider>
  )
}
