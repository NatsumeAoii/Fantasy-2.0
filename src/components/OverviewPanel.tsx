import { useMemo } from 'react'
import { replaceSpecialPowerIds } from '../lib/specialPowerText'
import type { Character, Dps } from '../types'
import { PanelActionBar } from './ui/PanelActionBar'

interface OverviewPanelProps {
  character: Character
  onShare: () => void
  onExport: () => void
  onNewCharacter: () => void
  onNavigateToLore: () => void
}

export function OverviewPanel({
  character,
  onShare,
  onExport,
  onNewCharacter,
  onNavigateToLore,
}: OverviewPanelProps) {
  const [topStatName, topStatValue] = useMemo(() => {
    const entries = Object.entries(character.stats.base)
    if (entries.length === 0) return ['N/A', 0] as const

    entries.sort(([, a], [, b]) => b - a)
    const [rawName, value] = entries[0]
    const displayName = rawName.replace(/([A-Z])/g, ' $1').trim()

    return [displayName, value] as const
  }, [character.stats.base])

  const dps = character.stats.combat.dps as Dps | undefined
  const storyExcerpt = character.backstory?.paragraphs[0]
    ? replaceSpecialPowerIds(character.backstory.paragraphs[0])
    : null

  const skillLabel = useMemo(() => {
    const spellCount = character.skills.filter((s) => s.source === 'spell').length
    const skillCount = character.skills.length - spellCount
    if (spellCount > 0 && skillCount > 0) return 'Warrior-Mage'
    if (spellCount > skillCount) return 'Arcane Focus'
    return 'Battle Ready'
  }, [character.skills])

  return (
    <div className="mx-auto flex w-full max-w-5xl flex-col gap-6 p-4 md:p-5">
      <PanelActionBar
        eyebrow="Character Summary"
        title="Overview"
        actions={[
          { label: 'Share Destiny', onClick: onShare, tone: 'secondary' },
          { label: 'Export Sheet', onClick: onExport, tone: 'secondary' },
          { label: 'New Character', onClick: onNewCharacter, tone: 'ghost' },
        ]}
      />

      <div className="grid grid-cols-1 gap-3 md:grid-cols-2 xl:grid-cols-4">
        <div className="cathedral-panel rounded-md p-4">
          <div className="text-xs uppercase tracking-[0.22em] text-health-text">Health</div>
          <div className="mt-2 text-2xl font-mono text-health-text">
            {character.stats.resource.health}
            <span className="ml-1 text-sm text-text-muted">/ {character.stats.resource.health}</span>
          </div>
          <div className="mt-3 h-1.5 rounded-full bg-health-bg">
            <div className="h-full w-full rounded-full bg-health-bar shadow-accent animate-pulse-slow" />
          </div>
        </div>

        <div className="cathedral-panel rounded-md p-4">
          <div className="text-xs uppercase tracking-[0.22em] text-mana-text">Mana</div>
          <div className="mt-2 text-2xl font-mono text-mana-text">
            {character.stats.resource.mana || 0}
            <span className="ml-1 text-sm text-text-muted">/ {character.stats.resource.mana || 0}</span>
          </div>
          <div className="mt-3 h-1.5 rounded-full bg-mana-bg">
            <div className="h-full w-full rounded-full bg-mana-bar animate-pulse-slow" />
          </div>
        </div>

        <div className="cathedral-panel rounded-md p-4">
          <div className="text-xs uppercase tracking-[0.22em] text-stamina-text">Stamina</div>
          <div className="mt-2 text-2xl font-mono text-stamina-text">
            {character.stats.resource.stamina || 0}
            <span className="ml-1 text-sm text-text-muted">/ {character.stats.resource.stamina || 0}</span>
          </div>
          <div className="mt-3 h-1.5 rounded-full bg-stamina-bg">
            <div className="h-full w-full rounded-full bg-stamina-bar animate-pulse-slow" />
          </div>
        </div>

        <div className="cathedral-panel rounded-md p-4">
          <div className="text-xs uppercase tracking-[0.22em] text-dps-text">Combat Rating</div>
          {dps ? (
            <div className="mt-2 text-2xl font-mono text-dps-text">
              {dps.min.toLocaleString()}
              <span className="mx-1 text-dps-text/50">-</span>
              {dps.max.toLocaleString()}
            </div>
          ) : (
            <div className="mt-2 text-2xl font-mono text-dps-text">N/A</div>
          )}
          <p className="mt-3 text-[11px] uppercase tracking-[0.18em] text-text-muted">DPS Range</p>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-3 md:grid-cols-2">
        <div className="cathedral-panel flex items-center justify-between rounded-md p-4">
          <div>
            <div className="text-xs uppercase tracking-[0.22em] text-text-secondary">Highest Attribute</div>
            <div className="mt-2 text-xl font-serif text-parchment-100">{topStatName.toUpperCase()}</div>
          </div>
          <div className="text-3xl font-mono text-gold-500">{topStatValue}</div>
        </div>

        <div className="cathedral-panel flex items-center justify-between rounded-md p-4">
          <div>
            <div className="text-xs uppercase tracking-[0.22em] text-text-secondary">Known Techniques</div>
            <div className="mt-2 text-xl font-serif text-parchment-100">{skillLabel}</div>
          </div>
          <div className="text-3xl font-mono text-skill-text">{character.skills.length}</div>
        </div>
      </div>

      {storyExcerpt ? (
        <div className="cathedral-panel relative overflow-hidden rounded-md p-5">
          <div
            aria-hidden="true"
            className="absolute inset-x-10 top-0 h-px bg-gradient-to-r from-transparent via-gold-500/35 to-transparent"
          />
          <p className="text-[14px] leading-7 text-parchment-200/85">
            "{storyExcerpt}..."
          </p>
          <button
            type="button"
            onClick={onNavigateToLore}
            title="Read the full character chronicle"
            className="cathedral-button-secondary mt-3 rounded-md px-4 py-2 text-xs uppercase tracking-[0.22em]"
          >
            Read Full Chronicle
          </button>
        </div>
      ) : null}
    </div>
  )
}
