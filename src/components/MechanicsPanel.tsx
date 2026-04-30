import React, { useMemo, useState } from 'react'
import type { GeneratedMechanics, GeneratedPoolEntry } from '../types'
import { formatMetadataLabel, formatMetadataValue, matchesGeneratedEntry } from '../lib/generatedEntryUtils'
import { CategoryDisclosure } from './ui/CategoryDisclosure'
import { PanelSearch } from './ui/PanelSearch'

type MechanicSectionKey = keyof GeneratedMechanics

interface MechanicsPanelProps {
  mechanics: GeneratedMechanics
}

type MechanicSection = {
  key: MechanicSectionKey
  title: string
  label: string
  description: string
  empty: string
  badgeClass: string
}

const MECHANIC_SECTIONS: readonly MechanicSection[] = [
  {
    key: 'feats',
    title: 'Character Feats',
    label: 'Feats',
    description: 'Trained edges and hard-earned capabilities.',
    empty: 'No character feats were generated.',
    badgeClass: 'border-blue-500/30 text-blue-300',
  },
  {
    key: 'achievements',
    title: 'Character Achievements',
    label: 'Achievements',
    description: 'Deeds, milestones, and remembered accomplishments.',
    empty: 'No character achievements were generated.',
    badgeClass: 'border-emerald-500/30 text-emerald-300',
  },
  {
    key: 'afflictions',
    title: 'Character Afflictions',
    label: 'Afflictions',
    description: 'Lingering wounds, diseases, curses, or other consequences.',
    empty: 'No character afflictions were generated.',
    badgeClass: 'border-red-500/30 text-red-300',
  },
  {
    key: 'crimes',
    title: 'Character Crimes',
    label: 'Crimes',
    description: 'Known offenses, warrants, and legal trouble from the journey.',
    empty: 'No character crimes were generated.',
    badgeClass: 'border-amber-500/30 text-amber-300',
  },
  {
    key: 'martialArts',
    title: 'Martial Discipline',
    label: 'Martial',
    description: 'Fighting forms, stances, and practiced combat techniques.',
    empty: 'No martial discipline was generated.',
    badgeClass: 'border-purple-500/30 text-purple-300',
  },
]

function countTotal(mechanics: GeneratedMechanics): number {
  return MECHANIC_SECTIONS.reduce((total, section) => total + mechanics[section.key].length, 0)
}

function Badge({ children, className = '' }: { children: React.ReactNode; className?: string }) {
  return (
    <span className={`inline-flex rounded border px-1.5 py-0.5 text-[9px] font-bold uppercase tracking-[0.14em] ${className}`}>
      {children}
    </span>
  )
}

function EmptyState({ children }: { children: React.ReactNode }) {
  return <p className="py-8 text-center text-sm italic text-text-muted">{children}</p>
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

function MechanicCard({ entry, section }: { entry: GeneratedPoolEntry; section: MechanicSection }) {
  const metadataEntries = Object.entries(entry.metadata ?? {}).filter(([, value]) => value !== null && value !== undefined)

  return (
    <article className="rounded-md border border-gold-900/15 bg-obsidian-900/28 p-3">
      <div className="flex items-start justify-between gap-3">
        <div className="min-w-0">
          <h4 className="font-serif text-sm font-bold text-parchment-100">{entry.name}</h4>
          {entry.category ? <p className="mt-0.5 text-[11px] uppercase tracking-[0.14em] text-gold-500/62">{entry.category}</p> : null}
        </div>
        <div className="flex flex-wrap justify-end gap-1">
          <Badge className={section.badgeClass}>{section.label}</Badge>
          {entry.tier ? <Badge className="border-gold-500/25 text-gold-200">Tier {entry.tier}</Badge> : null}
          {entry.rarity ? <Badge className="border-parchment-300/20 text-parchment-200">{entry.rarity}</Badge> : null}
        </div>
      </div>

      {entry.description ? <p className="mt-2 text-[12px] leading-5 text-parchment-200/68">{entry.description}</p> : null}
      {entry.benefit ? <p className="mt-2 text-[11px] leading-5 text-gold-300/72">{entry.benefit}</p> : null}
      {entry.effect ? <p className="mt-2 text-[11px] leading-5 text-red-200/72">{entry.effect}</p> : null}
      {entry.mechanicalEffect ? <p className="mt-2 text-[11px] leading-5 text-blue-200/72">{entry.mechanicalEffect}</p> : null}

      {metadataEntries.length > 0 ? (
        <dl className="mt-3 grid grid-cols-1 gap-2 sm:grid-cols-2">
          {metadataEntries.map(([key, value]) => (
            <div key={key} className="rounded border border-gold-900/12 bg-black/16 px-2.5 py-2">
              <dt className="text-[9px] font-bold uppercase tracking-[0.14em] text-gold-500/65">{formatMetadataLabel(key)}</dt>
              <dd className="mt-1 text-[12px] leading-5 text-parchment-200/68">{formatMetadataValue(value)}</dd>
            </div>
          ))}
        </dl>
      ) : null}
    </article>
  )
}

export const MechanicsPanel: React.FC<MechanicsPanelProps> = ({ mechanics }) => {
  const [search, setSearch] = useState('')
  const total = countTotal(mechanics)
  const consequenceTotal = mechanics.afflictions.length + mechanics.crimes.length
  const visibleSections = useMemo(
    () =>
      MECHANIC_SECTIONS.map((section) => ({
        ...section,
        entries: mechanics[section.key].filter((entry) => matchesGeneratedEntry(search, entry)),
      })),
    [mechanics, search],
  )
  const shownTotal = visibleSections.reduce((totalShown, section) => totalShown + section.entries.length, 0)

  return (
    <div className="w-full space-y-5 animate-fade-in">
      <header className="border-b border-gold-900/10 pb-4">
        <h3 className="font-serif text-2xl font-bold text-parchment-100">Character Mechanics</h3>
        <p className="mt-1 text-sm text-text-muted">
          Feats, achievements, consequences, and practiced forms that belong to this character's journey.
        </p>
      </header>

      <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 xl:grid-cols-4">
        <SummaryCard label="Known" value={String(total)} detail={`${shownTotal} shown by current search`} />
        <SummaryCard label="Feats" value={String(mechanics.feats.length)} detail="Character capabilities" />
        <SummaryCard label="Achievements" value={String(mechanics.achievements.length)} detail="Journey milestones" />
        <SummaryCard label="Consequences" value={String(consequenceTotal)} detail="Afflictions and crimes" />
      </div>

      <PanelSearch
        id="mechanics-search"
        label="Search mechanics"
        title="Search character mechanics"
        value={search}
        onChange={setSearch}
        placeholder="Search mechanics..."
        shownCount={shownTotal}
        totalCount={total}
        clearLabel="Clear mechanics search"
      />

      {total === 0 ? (
        <EmptyState>No mechanics were generated for this character.</EmptyState>
      ) : (
        <div className="space-y-4">
          {visibleSections.map((section) => (
            <CategoryDisclosure
              key={section.key}
              title={section.title}
              detail={`${section.entries.length}/${mechanics[section.key].length} shown`}
              defaultOpen={mechanics[section.key].length > 0}
            >
              {section.entries.length === 0 ? (
                <EmptyState>{search ? `No ${section.label.toLowerCase()} match this search.` : section.empty}</EmptyState>
              ) : (
                <div className="grid grid-cols-1 gap-3 xl:grid-cols-2">
                  {section.entries.map((entry) => <MechanicCard key={entry.id} entry={entry} section={section} />)}
                </div>
              )}
            </CategoryDisclosure>
          ))}
        </div>
      )}
    </div>
  )
}
