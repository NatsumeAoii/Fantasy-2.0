import type { PropsWithChildren, ReactNode } from 'react'
import type { Character } from '../../types'
import { IdentityRail } from './IdentityRail'

interface CharacterShellProps extends PropsWithChildren {
  character: Character
  tabs: ReactNode
}

export function CharacterShell({ character, tabs, children }: CharacterShellProps) {
  return (
    <div className="w-full min-w-0" data-character-shell="true">
      <div data-testid="character-top-nav-slot" className="fixed left-0 right-0 top-6 z-40">
        <div className="mx-auto max-w-7xl px-4">{tabs}</div>
      </div>

      <div
        data-testid="character-shell-grid"
        className="grid w-full min-w-0 grid-cols-1 gap-3 pb-4 pt-10 lg:grid-cols-[minmax(260px,300px)_minmax(0,1fr)] lg:items-start lg:pb-0"
      >
        <IdentityRail character={character} />
        <section
          data-testid="character-content-frame"
          className="cathedral-panel character-content-frame flex min-w-0 overflow-hidden rounded-md"
        >
          <div
            data-testid="character-content-scroll"
            className="h-full min-h-0 w-full min-w-0 overflow-y-auto overscroll-contain"
          >
            {children}
          </div>
        </section>
      </div>
    </div>
  )
}
