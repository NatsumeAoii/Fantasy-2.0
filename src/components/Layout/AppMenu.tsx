import React, { useEffect, useId, useRef, useState } from 'react'
import { usePreferencesStore } from '../../store/preferencesStore'
import { useTheme } from './ThemeContext'
import { ChangelogDrawer } from './ChangelogDrawer'
import { currentVersion } from 'virtual:changelog'

type MenuView = 'main' | 'settings' | 'about' | 'license' | 'credits' | 'changelog'

const APP_VERSION = currentVersion
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

function ForgeIcon() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.6} stroke="currentColor" className="h-3.5 w-3.5" aria-hidden="true">
      <path strokeLinecap="round" strokeLinejoin="round" d="M9.594 3.94c.09-.542.56-.94 1.11-.94h2.593c.55 0 1.02.398 1.11.94l.213 1.281c.063.374.313.686.645.87.074.04.147.083.22.127.325.196.72.257 1.075.124l1.217-.456a1.125 1.125 0 0 1 1.37.49l1.296 2.247a1.125 1.125 0 0 1-.26 1.431l-1.003.827c-.293.241-.438.613-.43.992a7.723 7.723 0 0 1 0 .255c-.008.378.137.75.43.991l1.004.827c.424.35.534.955.26 1.43l-1.298 2.247a1.125 1.125 0 0 1-1.369.491l-1.217-.456c-.355-.133-.75-.072-1.076.124a6.47 6.47 0 0 1-.22.128c-.331.183-.581.495-.644.869l-.213 1.281c-.09.543-.56.94-1.11.94h-2.594c-.55 0-1.019-.398-1.11-.94l-.213-1.281c-.062-.374-.312-.686-.644-.87a6.52 6.52 0 0 1-.22-.127c-.325-.196-.72-.257-1.076-.124l-1.217.456a1.125 1.125 0 0 1-1.369-.49l-1.297-2.247a1.125 1.125 0 0 1 .26-1.431l1.004-.827c.292-.24.437-.613.43-.991a6.932 6.932 0 0 1 0-.255c.007-.38-.138-.751-.43-.992l-1.004-.827a1.125 1.125 0 0 1-.26-1.43l1.297-2.247a1.125 1.125 0 0 1 1.37-.491l1.216.456c.356.133.751.072 1.076-.124.072-.044.146-.086.22-.128.332-.183.582-.495.644-.869l.214-1.28Z" />
      <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
    </svg>
  )
}

function ArrowLeftIcon() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.8} stroke="currentColor" className="h-3.5 w-3.5" aria-hidden="true">
      <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5 8.25 12l7.5-7.5" />
    </svg>
  )
}

function ExternalMenuItem({ href, label, title = label }: { href: string; label: string; title?: string }) {
  return (
    <a
      role="menuitem"
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      title={title}
      className="group flex items-center gap-2.5 rounded-md border border-transparent px-2.5 py-2 text-left transition-colors hover:border-gold-500/16 hover:bg-gold-500/8 focus-visible:border-gold-500/30 focus-visible:bg-gold-500/10 focus-visible:outline-none"
    >
      <span className="text-[11px] uppercase tracking-[0.15em] text-parchment-200/70 transition-colors group-hover:text-gold-100">
        {label}
      </span>
      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="ml-auto h-3 w-3 shrink-0 text-parchment-300/30 group-hover:text-gold-500/60" aria-hidden="true">
        <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 6H5.25A2.25 2.25 0 0 0 3 8.25v10.5A2.25 2.25 0 0 0 5.25 21h10.5A2.25 2.25 0 0 0 18 18.75V10.5m-10.5 6L21 3m0 0h-5.25M21 3v5.25" />
      </svg>
    </a>
  )
}

function InternalMenuItem({ label, onSelect, title = label, hint }: { label: string; onSelect: () => void; title?: string; hint?: string }) {
  return (
    <button
      type="button"
      role="menuitem"
      className="group flex w-full items-center gap-2.5 rounded-md border border-transparent px-2.5 py-2 text-left transition-colors hover:border-gold-500/16 hover:bg-gold-500/8 focus-visible:border-gold-500/30 focus-visible:bg-gold-500/10 focus-visible:outline-none"
      onClick={onSelect}
      title={title}
    >
      <span className="text-[11px] uppercase tracking-[0.15em] text-parchment-200/70 transition-colors group-hover:text-gold-100">
        {label}
      </span>
      {hint ? (
        <span className="ml-auto text-[10px] text-text-muted">{hint}</span>
      ) : (
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="ml-auto h-3 w-3 shrink-0 text-parchment-300/20 group-hover:text-gold-500/50" aria-hidden="true">
          <path strokeLinecap="round" strokeLinejoin="round" d="m8.25 4.5 7.5 7.5-7.5 7.5" />
        </svg>
      )}
    </button>
  )
}

function MenuDivider() {
  return <div className="my-1 h-px bg-gold-900/20" aria-hidden="true" />
}

function InfoBadge({ children }: { children: React.ReactNode }) {
  return (
    <span className="rounded border border-gold-500/20 bg-gold-500/10 px-1.5 py-0.5 text-[9px] font-bold uppercase tracking-[0.13em] text-gold-100">
      {children}
    </span>
  )
}

function InfoCard({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="rounded-md border border-gold-900/20 bg-black/10 px-2.5 py-2">
      <div className="text-[9px] uppercase tracking-[0.18em] text-gold-500/80">{title}</div>
      <div className="mt-1 text-[11px] leading-4 text-parchment-200/75">{children}</div>
    </div>
  )
}

function VisualOption({ label, ariaLabel, isActive, onSelect }: { label: string; ariaLabel?: string; isActive: boolean; onSelect: () => void }) {
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
      <div className="text-[9px] uppercase tracking-[0.18em] text-gold-500/80">{title}</div>
      <div className="grid grid-cols-2 gap-1.5">{children}</div>
    </div>
  )
}

function SubmenuFrame({ title, children, onBack }: { title: string; children: React.ReactNode; onBack: () => void }) {
  return (
    <div className="animate-fade-in">
      <div className="flex items-center gap-2 border-b border-gold-900/20 px-1.5 pb-2 pt-1">
        <button
          type="button"
          onClick={onBack}
          aria-label="Back"
          title="Back"
          className="cathedral-button-ghost flex h-7 w-7 shrink-0 items-center justify-center rounded-md text-text-muted hover:text-gold-100"
        >
          <ArrowLeftIcon />
        </button>
        <span className="font-serif text-sm text-parchment-100">{title}</span>
      </div>
      <section role="region" aria-label={title} className="px-1.5 py-2 text-[11px] leading-4 text-parchment-200/82">
        {children}
      </section>
    </div>
  )
}

export function AppMenu() {
  const { theme, toggleTheme } = useTheme()
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [menuView, setMenuView] = useState<MenuView>('main')
  const visualDensity = usePreferencesStore((state) => state.density)
  const setVisualDensity = usePreferencesStore((state) => state.setDensity)
  const visualMotion = usePreferencesStore((state) => state.motion)
  const setVisualMotion = usePreferencesStore((state) => state.setMotion)
  const panelScale = usePreferencesStore((state) => state.panelScale)
  const setPanelScale = usePreferencesStore((state) => state.setPanelScale)
  const resetVisual = usePreferencesStore((state) => state.resetVisual)
  const menuRef = useRef<HTMLDivElement>(null)
  const menuId = useId()

  useEffect(() => {
    if (!isMenuOpen) return
    const handlePointerDown = (event: PointerEvent) => {
      if (!menuRef.current?.contains(event.target as Node)) { setIsMenuOpen(false); setMenuView('main') }
    }
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') { setIsMenuOpen(false); setMenuView('main') }
    }
    window.addEventListener('pointerdown', handlePointerDown)
    window.addEventListener('keydown', handleKeyDown)
    return () => { window.removeEventListener('pointerdown', handlePointerDown); window.removeEventListener('keydown', handleKeyDown) }
  }, [isMenuOpen])

  const toggleMenu = () => {
    setIsMenuOpen((open) => {
      const next = !open
      if (next) setMenuView('main')
      return next
    })
  }

  return (
    <div ref={menuRef} className="relative shrink-0">
      {/* Trigger — same h-9 w-9 ghost button style as the theme toggle in TopTabs */}
      <button
        type="button"
        onClick={toggleMenu}
        className={[
          'group relative flex h-9 w-9 shrink-0 items-center justify-center rounded-md border transition-all duration-200',
          isMenuOpen
            ? 'border-gold-500/30 bg-gold-500/12 text-gold-100 shadow-[inset_0_1px_0_rgba(255,255,255,0.06)]'
            : 'border-transparent text-parchment-300/75 hover:border-gold-500/14 hover:bg-white/4 hover:text-gold-100',
        ].join(' ')}
        aria-label="Settings and information"
        aria-haspopup="menu"
        aria-expanded={isMenuOpen}
        aria-controls={menuId}
        title="Settings and information"
      >
        <ForgeIcon />
      </button>

      {isMenuOpen ? (
        <div
          id={menuId}
          role="menu"
          aria-label="Settings and information"
          className="cathedral-panel cathedral-menu-popover absolute right-0 top-[calc(100%+0.5rem)] z-50 w-[min(15rem,calc(100vw-1rem))] rounded-md p-1.5 shadow-2xl animate-fade-in"
        >
          {menuView === 'main' ? (
            <div className="animate-fade-in">
              {/* Identity strip — matches the tab bar's own compact label style */}
              <div className="flex items-center gap-2 px-2.5 pb-2 pt-1.5">
                <span className="text-[10px] uppercase tracking-[0.24em] text-gold-500/70">Aetheris</span>
                <button
                  type="button"
                  onClick={() => setMenuView('changelog')}
                  title="View changelog"
                  className="ml-auto rounded border border-gold-500/20 bg-gold-500/8 px-1.5 py-0.5 font-mono text-[9px] text-gold-100 transition-colors hover:border-gold-500/35 hover:bg-gold-500/14"
                >
                  v{APP_VERSION}
                </button>
              </div>
              <MenuDivider />
              <div className="py-0.5">
                <InternalMenuItem label="Visual Settings" onSelect={() => setMenuView('settings')} />
                <InternalMenuItem label="About" onSelect={() => setMenuView('about')} />
                <InternalMenuItem label="License" onSelect={() => setMenuView('license')} />
                <InternalMenuItem label="Credits" onSelect={() => setMenuView('credits')} />
              </div>
              <MenuDivider />
              <div className="py-0.5">
                <ExternalMenuItem href={GITHUB_REPO_URL} label="GitHub" title="Open GitHub repository" />
                <ExternalMenuItem href={BUG_REPORT_URL} label="Report a Bug" title="Open a bug report on GitHub" />
              </div>
            </div>
          ) : null}

          {menuView === 'settings' ? (
            <SubmenuFrame title="Visual Settings" onBack={() => setMenuView('main')}>
              <div className="space-y-2">
                <VisualSettingGroup title="Theme">
                  <VisualOption label="Dark" ariaLabel="Dark Mode" isActive={theme === 'dark'} onSelect={() => { if (theme !== 'dark') toggleTheme() }} />
                  <VisualOption label="Light" ariaLabel="Light Mode" isActive={theme === 'light'} onSelect={() => { if (theme !== 'light') toggleTheme() }} />
                </VisualSettingGroup>
                <VisualSettingGroup title="Density">
                  <VisualOption label="Comfort" ariaLabel="Comfortable Density" isActive={visualDensity === 'comfortable'} onSelect={() => setVisualDensity('comfortable')} />
                  <VisualOption label="Compact" ariaLabel="Compact Density" isActive={visualDensity === 'compact'} onSelect={() => setVisualDensity('compact')} />
                </VisualSettingGroup>
                <VisualSettingGroup title="Motion">
                  <VisualOption label="Standard" ariaLabel="Standard Motion" isActive={visualMotion === 'standard'} onSelect={() => setVisualMotion('standard')} />
                  <VisualOption label="Reduce" ariaLabel="Reduce Motion" isActive={visualMotion === 'reduced'} onSelect={() => setVisualMotion('reduced')} />
                </VisualSettingGroup>
                <VisualSettingGroup title="Panel Height">
                  <VisualOption label="Tall" ariaLabel="Tall Panel" isActive={panelScale === 'tall'} onSelect={() => setPanelScale('tall')} />
                  <VisualOption label="Short" ariaLabel="Short Panel" isActive={panelScale === 'short'} onSelect={() => setPanelScale('short')} />
                </VisualSettingGroup>
              </div>
              <button
                type="button"
                onClick={resetVisual}
                title="Reset visual settings to defaults"
                className="mt-2.5 w-full rounded-md border border-gold-900/25 px-2.5 py-1.5 text-[10px] uppercase tracking-[0.16em] text-text-muted transition-colors hover:border-gold-500/25 hover:text-gold-100"
              >
                Reset to defaults
              </button>
            </SubmenuFrame>
          ) : null}

          {menuView === 'about' ? (
            <SubmenuFrame title="About" onBack={() => setMenuView('main')}>
              <div className="space-y-2">
                <div className="rounded-md border border-gold-900/20 bg-black/10 px-2.5 py-2.5">
                  <p className="font-serif text-sm text-parchment-100">Aetheris Character Forge</p>
                  <p className="mt-1 text-[11px] leading-5 text-parchment-200/65">
                    A lore-first fantasy character generator built for readable sheets, dramatic identity, and fast rerolls.
                  </p>
                  <div className="mt-2.5 flex flex-wrap gap-1.5">
                    <InfoBadge>v{APP_VERSION}</InfoBadge>
                    <InfoBadge>MIT</InfoBadge>
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-1.5">
                  <InfoCard title="Lore-first">Story, traits, titles, and flavor stay front and center.</InfoCard>
                  <InfoCard title="Cathedral UI">Brass styling, compact panels, and controlled motion.</InfoCard>
                </div>
              </div>
            </SubmenuFrame>
          ) : null}

          {menuView === 'license' ? (
            <SubmenuFrame title="License" onBack={() => setMenuView('main')}>
              <div className="space-y-2">
                <InfoCard title="MIT License">Permissive open-source terms for using, copying, modifying, and sharing the project.</InfoCard>
                <div className="flex flex-wrap gap-1.5">
                  <InfoBadge>Use</InfoBadge>
                  <InfoBadge>Modify</InfoBadge>
                  <InfoBadge>Share</InfoBadge>
                </div>
                <InfoCard title="No Warranty">Provided as-is — review the full license before redistribution.</InfoCard>
              </div>
              <a
                href={GITHUB_LICENSE_URL}
                target="_blank"
                rel="noopener noreferrer"
                title="View full license on GitHub"
                className="mt-3 flex items-center gap-2 rounded-md border border-gold-500/20 px-3 py-2 text-[11px] uppercase tracking-[0.18em] text-gold-100 transition-colors hover:bg-gold-500/10"
              >
                <span>View full license</span>
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="ml-auto h-3 w-3 shrink-0 text-gold-500/50" aria-hidden="true">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 6H5.25A2.25 2.25 0 0 0 3 8.25v10.5A2.25 2.25 0 0 0 5.25 21h10.5A2.25 2.25 0 0 0 18 18.75V10.5m-10.5 6L21 3m0 0h-5.25M21 3v5.25" />
                </svg>
              </a>
            </SubmenuFrame>
          ) : null}

          {menuView === 'credits' ? (
            <SubmenuFrame title="Credits" onBack={() => setMenuView('main')}>
              <div className="space-y-2">
                <InfoCard title="Creator">Built by <span className="text-gold-100">NatsumeAoii</span>.</InfoCard>
                <InfoCard title="Design direction">Cathedral brass, restrained premium contrast, compact controls, and subtle motion.</InfoCard>
                <InfoCard title="Stack">React · TanStack Router · Vite · Tailwind CSS · Zustand</InfoCard>
              </div>
            </SubmenuFrame>
          ) : null}

          {menuView === 'changelog' ? (
            <ChangelogDrawer onClose={() => setMenuView('main')} />
          ) : null}
        </div>
      ) : null}
    </div>
  )
}
