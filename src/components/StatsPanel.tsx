import type React from 'react'
import { specialPowersConfig } from '../data/character/specialPowers'
import { usePersistedTab } from '../hooks/usePersistedTab'
import type { Character, Dps, Stats } from '../types'
import { StatsRadar } from './StatsRadar'
import { SecondaryTabs, type SecondaryTabItem } from './ui/SecondaryTabs'

interface StatsPanelProps {
  character: Character
}

type StatCategory = 'base' | 'offensive' | 'defensive' | 'resource' | 'utility'

type StatCategoryConfig = SecondaryTabItem<StatCategory> & {
  heading: string
  summary: string
}

const STAT_CATEGORIES: readonly StatCategoryConfig[] = [
  {
    id: 'base',
    label: 'Core',
    title: 'Core attributes',
    heading: 'Core Attributes',
    summary: 'The foundation of this character: body, reflexes, mind, and presence.',
  },
  {
    id: 'offensive',
    label: 'Battle',
    title: 'Battle profile',
    heading: 'Battle Profile',
    summary: 'Weapon pressure, attack rhythm, and direct combat output.',
  },
  {
    id: 'defensive',
    label: 'Guard',
    title: 'Guard profile',
    heading: 'Guard Profile',
    summary: 'How well this character absorbs, avoids, or survives danger.',
  },
  {
    id: 'resource',
    label: 'Reserves',
    title: 'Vital reserves',
    heading: 'Vital Reserves',
    summary: 'Health, stamina, mana, and other reserves that keep the character moving.',
  },
  {
    id: 'utility',
    label: 'Aptitudes',
    title: 'Field aptitudes',
    heading: 'Field Aptitudes',
    summary: 'Travel, perception, interaction, and practical advantages outside raw combat.',
  },
]

const SPECIAL_POWER_BY_ID = new Map(specialPowersConfig.map((power) => [power.id, power]))

function formatLabel(value: string): string {
  return value
    .replace(/_/g, ' ')
    .replace(/([a-z0-9])([A-Z])/g, '$1 $2')
    .replace(/\b\w/g, (letter) => letter.toUpperCase())
}

function formatTier(value: string): string {
  return formatLabel(value.toLowerCase())
}

function getActiveStats(character: Character, activeCategory: StatCategory): Stats {
  switch (activeCategory) {
    case 'base':
      return character.stats.base
    case 'offensive':
      return character.stats.combat
    case 'defensive':
      return character.stats.defensive
    case 'resource':
      return character.stats.resource
    case 'utility':
      return character.stats.utility
  }
}

function SummaryCard({ label, value, detail }: { label: string; value: string; detail: string }) {
  return (
    <article className="rounded-md border border-gold-900/20 bg-obsidian-900/30 p-3">
      <div className="text-[9px] font-bold uppercase tracking-[0.18em] text-gold-500/70">{label}</div>
      <div className="mt-1 truncate font-serif text-base text-parchment-100">{value}</div>
      <p className="mt-1 text-[11px] text-text-muted">{detail}</p>
    </article>
  )
}

function StatCard({ name, value }: { name: string; value: number }) {
  return (
    <article className="group rounded-md border border-gold-900/20 bg-obsidian-900/40 p-3 transition-colors hover:border-gold-500/30">
      <div className="mb-1 flex items-baseline justify-between gap-3">
        <h4 className="text-xs font-bold uppercase tracking-widest text-gold-500 transition-colors group-hover:text-gold-400">
          {formatLabel(name)}
        </h4>
      </div>
      <div className="font-mono text-lg text-parchment-100 transition-all group-hover:text-white group-hover:drop-shadow-accent">
        {value.toLocaleString()}
      </div>
      <div className="mt-2 h-1 w-full overflow-hidden rounded-full bg-obsidian-950">
        <div
          className="h-full bg-gold-600/50 transition-all duration-500 group-hover:bg-gold-500"
          style={{ width: `${Math.min(100, Math.max(5, value > 100 ? (value / 500) * 100 : (value / 50) * 100))}%` }}
        />
      </div>
    </article>
  )
}

function DamageWindow({ dps }: { dps: Dps }) {
  return (
    <article className="mb-3 flex items-center justify-between gap-3 rounded-md border border-dps-border bg-gradient-to-r from-dps-text/10 to-transparent p-3 md:col-span-2 lg:col-span-3">
      <div>
        <h4 className="font-serif text-xs font-bold uppercase tracking-widest text-dps-text">Damage Window</h4>
        <p className="text-xs font-bold text-parchment-200/80">Projected battle pressure from this character's current combat record.</p>
      </div>
      <div className="shrink-0 font-mono text-2xl font-bold text-dps-text">
        {dps.min} <span className="text-dps-text/50">-</span> {dps.max}
      </div>
    </article>
  )
}

function PowerCard({ id, potency }: { id: string; potency: number }) {
  const power = SPECIAL_POWER_BY_ID.get(id)
  const name = power?.name ?? formatLabel(id)
  const tier = power?.tier ? formatTier(power.tier) : null

  return (
    <article className="rounded-md border border-special-border bg-special-bg p-3">
      <div className="flex items-start justify-between gap-3">
        <div className="min-w-0">
          <h4 className="font-serif text-sm font-bold text-special-text">{name}</h4>
          {tier ? <p className="mt-0.5 text-[11px] uppercase tracking-[0.14em] text-special-text/70">{tier}</p> : null}
        </div>
        <span className="shrink-0 rounded border border-special-border bg-black/10 px-2 py-1 font-mono text-[11px] font-bold text-special-text">
          Potency {potency}
        </span>
      </div>
      {power?.description ? <p className="mt-2 text-[12px] leading-5 text-parchment-200/70">{power.description}</p> : null}
      {power?.effect ? <p className="mt-2 text-[11px] leading-5 text-special-text/78">{power.effect}</p> : null}
      {power && power.cooldown > 0 ? <p className="mt-2 text-[11px] text-text-muted">Cooldown: {power.cooldown}s</p> : null}
    </article>
  )
}

export const StatsPanel: React.FC<StatsPanelProps> = ({ character }) => {
  const [activeCategory, setActiveCategory] = usePersistedTab<StatCategory>('cathedral.codex.activeTab', 'base', STAT_CATEGORIES)
  const activeConfig = STAT_CATEGORIES.find((category) => category.id === activeCategory) ?? STAT_CATEGORIES[0]
  const activeStats = getActiveStats(character, activeCategory)
  const dps = activeCategory === 'offensive' ? (activeStats as Stats & { dps?: Dps }).dps : undefined
  const innatePowers = Object.entries(character.specialPowers)

  return (
    <div className="space-y-5">
      <header className="border-b border-gold-900/10 pb-4">
        <h2 className="font-serif text-3xl font-bold text-parchment-100">Character Codex</h2>
        <p className="mt-1 text-sm text-text-muted">
          {character.name}'s recorded attributes, battle profile, reserves, and field aptitudes.
        </p>
      </header>

      <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 xl:grid-cols-4">
        <SummaryCard label="Lineage" value={character.race} detail="Recorded ancestry" />
        <SummaryCard label="Path" value={character.role} detail={`Level ${character.level}`} />
        <SummaryCard label="Region" value={character.region} detail="Known origin" />
        <SummaryCard label="Innate" value={String(innatePowers.length)} detail="Character-born gifts" />
      </div>

      <SecondaryTabs<StatCategory>
        ariaLabel="Codex categories"
        activeId={activeCategory}
        idPrefix="stats-category-tab"
        items={STAT_CATEGORIES}
        onChange={setActiveCategory}
        panelIdPrefix="stats-category-panel"
      />

      <div
        id={`stats-category-panel-${activeCategory}`}
        role="tabpanel"
        aria-labelledby={`stats-category-tab-${activeCategory}`}
        className="min-h-[400px]"
      >
        <header className="mb-4">
          <h3 className="font-serif text-xl font-bold text-parchment-100">{activeConfig.heading}</h3>
          <p className="mt-1 text-sm text-text-muted">{activeConfig.summary}</p>
        </header>

        {activeCategory === 'base' ? (
          <div className="mb-6 rounded-md border border-gold-900/20 bg-obsidian-900/30 p-3">
            <StatsRadar stats={character.stats.base} />
          </div>
        ) : null}

        <div className="grid grid-cols-1 gap-3 animate-fade-in md:grid-cols-2 lg:grid-cols-3">
          {dps ? <DamageWindow dps={dps} /> : null}
          {Object.entries(activeStats).map(([key, value]) => {
            if (key === 'dps' || typeof value !== 'number') return null
            return <StatCard key={key} name={key} value={value} />
          })}
        </div>

        {innatePowers.length > 0 && activeCategory === 'base' ? (
          <section className="mt-6 border-t border-gold-900/20 pt-6 animate-fade-in">
            <h3 className="mb-3 flex items-center gap-2 font-serif text-lg font-bold text-special-text">
              <span className="h-2 w-2 rounded-full bg-special-text" />
              Innate Gifts
            </h3>
            <div className="grid grid-cols-1 gap-3 md:grid-cols-2">
              {innatePowers.map(([power, potency]) => <PowerCard key={power} id={power} potency={potency} />)}
            </div>
          </section>
        ) : null}
      </div>
    </div>
  )
}
