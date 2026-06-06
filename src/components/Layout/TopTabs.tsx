import React, { useCallback } from 'react'
import { useTheme } from './ThemeContext'
import { AppMenu } from './AppMenu'

export type TabId = 'overview' | 'lore' | 'world' | 'stats' | 'skills' | 'inventory'

interface TopTabsProps {
  activeTab: TabId
  onChange: (tab: TabId) => void
  onBack?: () => void
}

const TABS: { id: TabId; label: string; hint: string }[] = [
  { id: 'overview', label: 'Overview', hint: 'Character summary' },
  { id: 'lore', label: 'Chronicle', hint: 'Backstory & traits' },
  { id: 'world', label: 'Atlas', hint: 'World lore & affiliations' },
  { id: 'stats', label: 'Codex', hint: 'Stats & attributes' },
  { id: 'skills', label: 'Arcana', hint: 'Skills & abilities' },
  { id: 'inventory', label: 'Vault', hint: 'Equipment & items' },
]

const TabIcons: Record<TabId, React.ReactNode> = {
  overview: (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.6} stroke="currentColor" className="h-3.5 w-3.5">
      <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
    </svg>
  ),
  lore: (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.6} stroke="currentColor" className="h-3.5 w-3.5">
      <path strokeLinecap="round" strokeLinejoin="round" d="M6.75 4.5A2.25 2.25 0 0 0 4.5 6.75v10.5A2.25 2.25 0 0 0 6.75 19.5h10.5A2.25 2.25 0 0 0 19.5 17.25V6.75A2.25 2.25 0 0 0 17.25 4.5H6.75Z" />
      <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 8.25h7.5m-7.5 3h7.5m-7.5 3h4.5" />
    </svg>
  ),
  world: (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.6} stroke="currentColor" className="h-3.5 w-3.5">
      <path strokeLinecap="round" strokeLinejoin="round" d="M12 21a9 9 0 1 0 0-18 9 9 0 0 0 0 18Z" />
      <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 9h16.5M3.75 15h16.5M12 3c2.1 2.2 3.15 5.2 3.15 9S14.1 18.8 12 21M12 3C9.9 5.2 8.85 8.2 8.85 12S9.9 18.8 12 21" />
    </svg>
  ),
  stats: (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.6} stroke="currentColor" className="h-3.5 w-3.5">
      <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 19.5h15M7.5 16.5v-6m4.5 6V4.5m4.5 12v-9" />
    </svg>
  ),
  skills: (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.6} stroke="currentColor" className="h-3.5 w-3.5">
      <path strokeLinecap="round" strokeLinejoin="round" d="m14.25 6.087 4.252 4.252m-11.313 0 7.424-7.425a1.5 1.5 0 0 1 2.121 0l4.243 4.243a1.5 1.5 0 0 1 0 2.121L13.6 16.704a4.5 4.5 0 0 1-1.897 1.13l-4.215 1.204 1.204-4.215a4.5 4.5 0 0 1 1.13-1.897Z" />
    </svg>
  ),
  inventory: (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.6} stroke="currentColor" className="h-3.5 w-3.5">
      <path strokeLinecap="round" strokeLinejoin="round" d="M20.25 7.5H3.75m15 0v9A2.25 2.25 0 0 1 16.5 18.75h-9A2.25 2.25 0 0 1 5.25 16.5v-9m15 0-1.172-2.344A2.25 2.25 0 0 0 17.064 3.75H6.936a2.25 2.25 0 0 0-2.014 1.406L3.75 7.5" />
      <path strokeLinecap="round" strokeLinejoin="round" d="M9 10.5h6" />
    </svg>
  ),
}

function ThemeIcon({ theme }: { theme: 'dark' | 'light' }) {
  return theme === 'dark' ? (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.6} stroke="currentColor" className="h-3.5 w-3.5">
      <path strokeLinecap="round" strokeLinejoin="round" d="M12 3v2.25m6.364.386-1.591 1.591M21 12h-2.25m-.386 6.364-1.591-1.591M12 18.75V21m-4.773-4.227-1.591 1.591M5.25 12H3m4.227-4.773L5.636 5.636M15.75 12a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0z" />
    </svg>
  ) : (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.6} stroke="currentColor" className="h-3.5 w-3.5">
      <path strokeLinecap="round" strokeLinejoin="round" d="M21.752 15.002A9.718 9.718 0 0 1 18 15.75c-5.385 0-9.75-4.365-9.75-9.75 0-1.33.266-2.597.748-3.752A9.753 9.753 0 0 0 3 11.25C3 16.635 7.365 21 12.75 21a9.753 9.753 0 0 0 9.002-5.998z" />
    </svg>
  )
}

export const TopTabs: React.FC<TopTabsProps> = ({ activeTab, onChange, onBack }) => {
  const { theme, toggleTheme } = useTheme()
  const nextTheme = theme === 'dark' ? 'Light' : 'Dark'

  const handleKeyDown = useCallback(
    (event: React.KeyboardEvent<HTMLElement>) => {
      const currentIndex = TABS.findIndex((tab) => tab.id === activeTab)
      if (currentIndex === -1) return

      let nextIndex = -1
      if (event.key === 'ArrowRight') nextIndex = (currentIndex + 1) % TABS.length
      else if (event.key === 'ArrowLeft') nextIndex = (currentIndex - 1 + TABS.length) % TABS.length
      else if (event.key === 'Home') nextIndex = 0
      else if (event.key === 'End') nextIndex = TABS.length - 1

      if (nextIndex >= 0) {
        event.preventDefault()
        onChange(TABS[nextIndex].id)
        const buttons = event.currentTarget.querySelectorAll<HTMLButtonElement>('[role="tab"]')
        buttons[nextIndex]?.focus()
      }
    },
    [activeTab, onChange],
  )

  return (
    <div data-testid="top-nav-bar" className="cathedral-panel relative rounded-md px-1.5 py-1.5">
      <div className="flex items-center gap-1 sm:gap-1.5">
        {onBack ? (
          <button
            onClick={onBack}
            className="cathedral-button-ghost flex h-9 w-9 items-center justify-center rounded-md"
            aria-label="Return to forge"
            title="Return to forge"
          >
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="h-3.5 w-3.5">
              <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5L8.25 12l7.5-7.5" />
            </svg>
          </button>
        ) : null}

        <nav
          className="no-scrollbar flex flex-1 items-center gap-0.5 overflow-x-auto"
          role="tablist"
          aria-label="Character sheet tabs. Use arrow keys to navigate."
          onKeyDown={handleKeyDown}
        >
          {TABS.map((tab) => {
            const isActive = activeTab === tab.id
            return (
              <button
                key={tab.id}
                role="tab"
                id={`tab-${tab.id}`}
                aria-selected={isActive}
                aria-controls={`panel-${tab.id}`}
                aria-label={tab.label}
                tabIndex={isActive ? 0 : -1}
                onClick={() => onChange(tab.id)}
                title={tab.hint}
                className={[
                  'group relative flex h-9 items-center gap-1.5 rounded-md px-2 text-[11px] uppercase tracking-[0.18em] transition-all duration-200 lg:px-3',
                  isActive
                    ? 'border border-gold-500/30 bg-gold-500/12 text-gold-100 shadow-[inset_0_1px_0_rgba(255,255,255,0.06)]'
                    : 'border border-transparent text-parchment-300/75 hover:border-gold-500/14 hover:bg-white/4 hover:text-gold-100',
                ].join(' ')}
              >
                <span className={isActive ? 'text-gold-400' : 'text-parchment-300/50 group-hover:text-gold-500'}>
                  {TabIcons[tab.id]}
                </span>
                <span className="hidden lg:inline">{tab.label}</span>
              </button>
            )
          })}
        </nav>

        <button
          type="button"
          onClick={toggleTheme}
          className="cathedral-button-ghost ml-0.5 flex h-9 w-9 shrink-0 items-center justify-center rounded-md"
          title={`Switch to ${nextTheme} Mode`}
          aria-pressed={theme === 'dark'}
          aria-label={`Switch to ${nextTheme} Mode`}
        >
          <ThemeIcon theme={theme} />
        </button>

        <AppMenu />
      </div>
    </div>
  )
}
