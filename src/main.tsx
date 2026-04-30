import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { RouterProvider, createRouter, createHashHistory } from '@tanstack/react-router'
import './styles/theme.css'
import './styles/customization.css'
import './styles/cathedral.css'
import './index.css'

import { routeTree } from './routeTree.gen'
import { resetCharacterRouteOnReload } from './routes/-resetCharacterRouteOnReload'

resetCharacterRouteOnReload()

const hashHistory = createHashHistory()
const router = createRouter({ routeTree, history: hashHistory })

// Register the router instance for type safety
declare module '@tanstack/react-router' {
  interface Register {
    router: typeof router
  }
}

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>,
)
