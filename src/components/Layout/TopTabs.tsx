import React, { useCallback, useEffect, useId, useRef, useState } from 'react'
import { useLocalStorage } from '../../hooks'
import { useTheme } from './ThemeContext'

export type TabId = 'overview' | 'lore' | 'world' | 'stats' | 'skills' | 'inventory'
type MenuView = 'main' | 'settings' | 'about' | 'license' | 'credits'
type VisualDensity = 'comfortable' | 'compact'
type VisualMotion = 'standard' | 'reduced'
type PanelScale = 'tall' | 'short'

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

const APP_VERSION = '5.4.1'
const GITHUB_REPO_URL = 'https://github.com/NatsumeAoii/Aetheris-CharGen'
const GITHUB_LICENSE_URL = `${GITHUB_REPO_URL}/blob/main/LICENSE.md`
const BUG_REPORT_URL = `${GITHUB_REPO_URL}/issues/new?title=${encodeURIComponent('Bug: ')}&body=${encodeURIComponent(
  [
    '## What happened?',
    '',
    '## Expected behavior',
    '',
    '## Steps to reproduce',
    '1.',
    '2.',
    '3.',
    '',
    '## Environment',
    `- App version: ${APP_VERSION}`,
    `- URL: ${typeof window === 'undefined' ? '' : window.location.href}`,
    `- Browser: ${typeof navigator === 'undefined' ? '' : navigator.userAgent}`,
  ].join('\n'),
)}`

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

function isVisualDensity(value: unknown): value is VisualDensity {
  return value === 'comfortable' || value === 'compact'
}

function isVisualMotion(value: unknown): value is VisualMotion {
  return value === 'standard' || value === 'reduced'
}

function isPanelScale(value: unknown): value is PanelScale {
  return value === 'tall' || value === 'short'
}

function ThemeIcon({ theme }: { theme: 'dark' | 'light' }) {
  return theme === 'dark' ? (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      strokeWidth={1.6}
      stroke="currentColor"
      className="h-3.5 w-3.5"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M12 3v2.25m6.364.386-1.591 1.591M21 12h-2.25m-.386 6.364-1.591-1.591M12 18.75V21m-4.773-4.227-1.591 1.591M5.25 12H3m4.227-4.773L5.636 5.636M15.75 12a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0z"
      />
    </svg>
  ) : (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      strokeWidth={1.6}
      stroke="currentColor"
      className="h-3.5 w-3.5"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M21.752 15.002A9.718 9.718 0 0 1 18 15.75c-5.385 0-9.75-4.365-9.75-9.75 0-1.33.266-2.597.748-3.752A9.753 9.753 0 0 0 3 11.25C3 16.635 7.365 21 12.75 21a9.753 9.753 0 0 0 9.002-5.998z"
      />
    </svg>
  )
}

function MenuIcon() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      strokeWidth={1.8}
      stroke="currentColor"
      className="h-3.5 w-3.5"
    >
      <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 7h15M4.5 12h15M4.5 17h15" />
    </svg>
  )
}

function ArrowLeftIcon() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      strokeWidth={1.8}
      stroke="currentColor"
      className="h-3.5 w-3.5"
      aria-hidden="true"
    >
      <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5 8.25 12l7.5-7.5" />
    </svg>
  )
}

function ExternalMenuItem({
  href,
  label,
  title = label,
}: {
  href: string
  label: string
  title?: string
}) {
  return (
    <a
      role="menuitem"
      href={href}
      target="_blank"
      rel="noreferrer"
      title={title}
      className="group block rounded-md border border-transparent px-2.5 py-2 text-left transition-colors hover:border-gold-500/16 hover:bg-gold-500/8 focus-visible:border-gold-500/30 focus-visible:bg-gold-500/10 focus-visible:outline-none"
    >
      <span className="block text-[11px] font-bold uppercase tracking-[0.15em] text-parchment-100 group-hover:text-gold-100">
        {label}
      </span>
    </a>
  )
}

function InternalMenuItem({
  label,
  onSelect,
  title = label,
}: {
  label: string
  onSelect: () => void
  title?: string
}) {
  return (
    <button
      type="button"
      role="menuitem"
      className="group w-full rounded-md border border-transparent px-2.5 py-2 text-left transition-colors hover:border-gold-500/16 hover:bg-gold-500/8 focus-visible:border-gold-500/30 focus-visible:bg-gold-500/10 focus-visible:outline-none"
      onClick={onSelect}
      title={title}
    >
      <span className="block text-[11px] font-bold uppercase tracking-[0.15em] text-parchment-100 group-hover:text-gold-100">
        {label}
      </span>
    </button>
  )
}

function InfoBadge({ children }: { children: React.ReactNode }) {
  return (
    <span className="rounded border border-gold-500/20 bg-gold-500/10 px-1.5 py-1 text-[9px] font-bold uppercase tracking-[0.13em] text-gold-100">
      {children}
    </span>
  )
}

function InfoCard({
  title,
  children,
}: {
  title: string
  children: React.ReactNode
}) {
  return (
    <div className="rounded-md border border-gold-900/20 bg-black/10 px-2.5 py-2">
      <div className="text-[9px] uppercase tracking-[0.18em] text-gold-500">{title}</div>
      <div className="mt-1 text-[11px] leading-4 text-parchment-200/82">{children}</div>
    </div>
  )
}

function VisualOption({
  label,
  ariaLabel,
  isActive,
  onSelect,
}: {
  label: string
  ariaLabel?: string
  isActive: boolean
  onSelect: () => void
}) {
  return (
    <button
      type="button"
      aria-label={ariaLabel ?? label}
      aria-pressed={isActive}
      onClick={onSelect}
      title={ariaLabel ?? label}
      className={[
        'min-h-7 min-w-0 whitespace-nowrap rounded-md border px-2 py-1.5 text-center text-[10px] font-bold uppercase leading-none tracking-[0.1em] transition-colors',
        isActive
          ? 'border-gold-500/35 bg-gold-500/14 text-gold-100'
          : 'border-gold-900/22 bg-black/10 text-text-muted hover:border-gold-500/24 hover:text-parchment-100',
      ].join(' ')}
    >
      {label}
    </button>
  )
}

function VisualSettingGroup({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="space-y-1.5 rounded-md border border-gold-900/20 bg-black/10 px-2 py-1.5">
      <div className="text-[9px] uppercase tracking-[0.18em] text-gold-500">{title}</div>
      <div className="grid grid-cols-2 gap-1.5">{children}</div>
    </div>
  )
}

function SubmenuFrame({
  title,
  children,
  onBack,
}: {
  title: string
  children: React.ReactNode
  onBack: () => void
}) {
  return (
    <div className="animate-fade-in">
      <div className="border-b border-gold-900/20 px-1.5 pb-1.5 pt-0.5">
        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={onBack}
            aria-label="Back to application menu"
            title="Back to application menu"
            className="cathedral-button-ghost flex h-7 w-7 shrink-0 items-center justify-center rounded-md text-text-muted hover:text-gold-100"
          >
            <ArrowLeftIcon />
          </button>
          <div className="min-w-0 font-serif text-sm text-parchment-100">{title}</div>
        </div>
      </div>
      <section role="region" aria-label={title} className="px-2 py-2 text-[11px] leading-4 text-parchment-200/82">
        {children}
      </section>
    </div>
  )
}

export const TopTabs: React.FC<TopTabsProps> = ({ activeTab, onChange, onBack }) => {
  const { theme, toggleTheme } = useTheme()
  const nextTheme = theme === 'dark' ? 'Light' : 'Dark'
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [menuView, setMenuView] = useState<MenuView>('main')
  const [visualDensity, setVisualDensity] = useLocalStorage<VisualDensity>(
    'visual-density',
    'comfortable',
    { validate: isVisualDensity, version: 1 },
  )
  const [visualMotion, setVisualMotion] = useLocalStorage<VisualMotion>(
    'visual-motion',
    'standard',
    { validate: isVisualMotion, version: 1 },
  )
  const [panelScale, setPanelScale] = useLocalStorage<PanelScale>(
    'panel-scale',
    'tall',
    { validate: isPanelScale, version: 1 },
  )
  const menuRef = useRef<HTMLDivElement>(null)
  const menuId = useId()

  useEffect(() => {
    document.documentElement.setAttribute('data-ui-density', visualDensity)
  }, [visualDensity])

  useEffect(() => {
    document.documentElement.setAttribute('data-motion', visualMotion)
  }, [visualMotion])

  useEffect(() => {
    document.documentElement.setAttribute('data-panel-scale', panelScale)
  }, [panelScale])

  useEffect(() => {
    if (!isMenuOpen) return

    const handlePointerDown = (event: PointerEvent) => {
      if (!menuRef.current?.contains(event.target as Node)) {
        setIsMenuOpen(false)
        setMenuView('main')
      }
    }

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setIsMenuOpen(false)
        setMenuView('main')
      }
    }

    window.addEventListener('pointerdown', handlePointerDown)
    window.addEventListener('keydown', handleKeyDown)

    return () => {
      window.removeEventListener('pointerdown', handlePointerDown)
      window.removeEventListener('keydown', handleKeyDown)
    }
  }, [isMenuOpen])

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
          aria-label="Character sheet tabs"
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

        <div ref={menuRef} className="relative shrink-0">
          <button
            type="button"
            onClick={() => {
              setIsMenuOpen((open) => {
                const nextOpen = !open
                if (nextOpen) setMenuView('main')
                return nextOpen
              })
            }}
            className="cathedral-button-ghost flex h-9 w-9 shrink-0 items-center justify-center rounded-md"
            aria-label="Open application menu"
            aria-haspopup="menu"
            aria-expanded={isMenuOpen}
            aria-controls={menuId}
            title="Open application menu"
          >
            <MenuIcon />
          </button>

          {isMenuOpen ? (
            <div
              id={menuId}
              role="menu"
              aria-label="Application menu"
              className="cathedral-panel cathedral-menu-popover absolute right-0 top-[calc(100%+0.5rem)] z-50 w-[min(16rem,calc(100vw-1rem))] rounded-md p-1.5 shadow-2xl animate-fade-in"
            >
              {menuView === 'main' ? (
                <>
                  <div className="border-b border-gold-900/20 px-2.5 pb-1.5 pt-1">
                    <div className="text-[10px] uppercase tracking-[0.2em] text-gold-500">Application</div>
                    <div className="mt-0.5 font-serif text-sm text-parchment-100">Aetheris CharGen</div>
                  </div>

                  <div className="py-1.5">
                    <InternalMenuItem
                      label="Visual Settings"
                      title="Visual Settings"
                      onSelect={() => setMenuView('settings')}
                    />
                    <InternalMenuItem
                      label="About"
                      title="About"
                      onSelect={() => setMenuView('about')}
                    />
                    <InternalMenuItem
                      label="License"
                      title="License"
                      onSelect={() => setMenuView('license')}
                    />
                    <InternalMenuItem
                      label="Credits"
                      title="Credits"
                      onSelect={() => setMenuView('credits')}
                    />
                    <ExternalMenuItem href={GITHUB_REPO_URL} label="GitHub Repository" title="GitHub Repository" />
                    <ExternalMenuItem href={BUG_REPORT_URL} label="Report a Bug" title="Report a Bug" />
                  </div>
                </>
              ) : null}

              {menuView === 'settings' ? (
                <SubmenuFrame title="Visual Settings" onBack={() => setMenuView('main')}>
                  <div className="space-y-2">
                    <VisualSettingGroup title="Theme">
                      <VisualOption
                        label="Dark"
                        ariaLabel="Dark Mode"
                        isActive={theme === 'dark'}
                        onSelect={() => {
                          if (theme !== 'dark') toggleTheme()
                        }}
                      />
                      <VisualOption
                        label="Light"
                        ariaLabel="Light Mode"
                        isActive={theme === 'light'}
                        onSelect={() => {
                          if (theme !== 'light') toggleTheme()
                        }}
                      />
                    </VisualSettingGroup>

                    <VisualSettingGroup title="Density">
                      <VisualOption
                        label="Comfort"
                        ariaLabel="Comfortable Density"
                        isActive={visualDensity === 'comfortable'}
                        onSelect={() => setVisualDensity('comfortable')}
                      />
                      <VisualOption
                        label="Compact"
                        ariaLabel="Compact Density"
                        isActive={visualDensity === 'compact'}
                        onSelect={() => setVisualDensity('compact')}
                      />
                    </VisualSettingGroup>

                    <VisualSettingGroup title="Motion">
                      <VisualOption
                        label="Standard"
                        ariaLabel="Standard Motion"
                        isActive={visualMotion === 'standard'}
                        onSelect={() => setVisualMotion('standard')}
                      />
                      <VisualOption
                        label="Reduce"
                        ariaLabel="Reduce Motion"
                        isActive={visualMotion === 'reduced'}
                        onSelect={() => setVisualMotion('reduced')}
                      />
                    </VisualSettingGroup>

                    <VisualSettingGroup title="Panel Height">
                      <VisualOption
                        label="Tall"
                        ariaLabel="Tall Panel"
                        isActive={panelScale === 'tall'}
                        onSelect={() => setPanelScale('tall')}
                      />
                      <VisualOption
                        label="Short"
                        ariaLabel="Short Panel"
                        isActive={panelScale === 'short'}
                        onSelect={() => setPanelScale('short')}
                      />
                    </VisualSettingGroup>
                  </div>

                  <div className="mt-2 rounded-md border border-gold-500/20 bg-gold-500/8 px-2 py-1.5">
                    <div className="text-[9px] uppercase tracking-[0.18em] text-gold-500">Preview</div>
                    <div className="mt-1.5 grid grid-cols-[2.25rem_1fr] gap-1.5">
                      <div className="h-6 rounded-sm border border-gold-500/20 bg-black/20" />
                      <div className="space-y-1">
                        <div className="h-1.5 rounded bg-gold-500/30" />
                        <div className="h-1.5 w-2/3 rounded bg-parchment-200/15" />
                      </div>
                    </div>
                  </div>

                  <button
                    type="button"
                    onClick={() => {
                      setVisualDensity('comfortable')
                      setVisualMotion('standard')
                      setPanelScale('tall')
                    }}
                    title="Reset visual settings"
                    className="mt-2 w-full rounded-md border border-gold-900/25 px-2.5 py-1.5 text-[10px] uppercase tracking-[0.16em] text-text-muted transition-colors hover:border-gold-500/25 hover:text-gold-100"
                  >
                    Reset
                  </button>
                </SubmenuFrame>
              ) : null}

              {menuView === 'about' ? (
                <SubmenuFrame title="About" onBack={() => setMenuView('main')}>
                  <div className="space-y-2">
                    <div className="rounded-md border border-gold-500/20 bg-gold-500/8 px-2.5 py-2">
                      <p className="font-serif text-sm text-parchment-100">Character Fantasy Generator</p>
                      <div className="mt-2 flex flex-wrap gap-1.5">
                        <InfoBadge>Version {APP_VERSION}</InfoBadge>
                        <InfoBadge>Aetheris</InfoBadge>
                      </div>
                      <p className="mt-2 text-text-muted">
                        A lore-first fantasy character generator built for readable sheets, dramatic identity, and fast
                        rerolls.
                      </p>
                    </div>

                    <div className="grid grid-cols-2 gap-1.5">
                      <InfoCard title="Lore-first">Story, traits, titles, and character flavor stay front and center.</InfoCard>
                      <InfoCard title="Premium UI">Cathedral brass styling with compact panels and controlled motion.</InfoCard>
                    </div>
                  </div>
                </SubmenuFrame>
              ) : null}

              {menuView === 'license' ? (
                <SubmenuFrame title="License" onBack={() => setMenuView('main')}>
                  <div className="space-y-2">
                    <InfoCard title="MIT License">
                      Permissive open-source terms for using, copying, modifying, and sharing the project.
                    </InfoCard>

                    <div className="grid grid-cols-3 gap-1.5">
                      <InfoBadge>Use</InfoBadge>
                      <InfoBadge>Modify</InfoBadge>
                      <InfoBadge>Share</InfoBadge>
                    </div>

                    <InfoCard title="No Warranty">
                      The software is provided as-is; review the full license before redistribution.
                    </InfoCard>
                  </div>

                  <a
                    href={GITHUB_LICENSE_URL}
                    target="_blank"
                    rel="noreferrer"
                    title="View full license"
                    className="mt-3 inline-flex rounded-md border border-gold-500/20 px-3 py-2 text-[11px] uppercase tracking-[0.18em] text-gold-100 transition-colors hover:bg-gold-500/10"
                  >
                    View full license
                  </a>
                </SubmenuFrame>
              ) : null}

              {menuView === 'credits' ? (
                <SubmenuFrame title="Credits" onBack={() => setMenuView('main')}>
                  <div className="space-y-2">
                    <InfoCard title="Creator">
                      Created by <span className="text-gold-100">NatsumeAoii</span>.
                    </InfoCard>

                    <InfoCard title="Interface direction">
                      Cathedral brass, restrained premium contrast, compact controls, and subtle motion.
                    </InfoCard>

                    <InfoCard title="Built with">
                      React, TanStack Router, Vite, and Tailwind CSS.
                    </InfoCard>
                  </div>
                </SubmenuFrame>
              ) : null}
            </div>
          ) : null}
        </div>
      </div>
    </div>
  )
}
