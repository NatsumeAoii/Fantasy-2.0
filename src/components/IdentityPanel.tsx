import React, { useMemo, useState } from 'react'
import type { Character, GeneratedPoolEntry } from '../types'
import { matchesGeneratedEntry, matchesSearch } from '../lib/generatedEntryUtils'
import { usePersistedTab } from '../hooks/usePersistedTab'
import { SecondaryTabs, type SecondaryTabItem } from './ui/SecondaryTabs'
import { CategoryDisclosure } from './ui/CategoryDisclosure'
import { PanelSearch } from './ui/PanelSearch'
import {
  buildIdentityPanelPools,
  type IdentityBondPoolItem,
  type IdentityPsychologyPoolItem,
  type IdentityQuirkPoolItem,
  type IdentitySecretPoolItem,
} from './identityPanelPools'

type IdentitySubTab = 'bonds' | 'quirks' | 'secrets' | 'psychology'

interface IdentityPanelProps {
  character: Character
  embedded?: boolean
}

const IDENTITY_TABS: readonly SecondaryTabItem<IdentitySubTab>[] = [
  { id: 'bonds', label: 'Bonds', title: 'Relationships and obligations' },
  { id: 'quirks', label: 'Quirks', title: 'Habits and behavioral hooks' },
  { id: 'secrets', label: 'Secrets', title: 'Hidden truths and risks' },
  { id: 'psychology', label: 'Psychology', title: 'Fears, manias, and obsessions' },
]

const SECRET_CLASS: Record<IdentitySecretPoolItem['severity'], string> = {
  Minor: 'border-green-500/30 text-green-300',
  Moderate: 'border-amber-500/30 text-amber-300',
  Severe: 'border-orange-500/30 text-orange-300',
  Deadly: 'border-red-500/30 bg-red-500/8 text-red-300',
}

const TRAIT_CLASS: Record<IdentityPsychologyPoolItem['type'], string> = {
  Phobia: 'border-blue-500/30 text-blue-300',
  Mania: 'border-red-500/30 text-red-300',
  Obsession: 'border-purple-500/30 text-purple-300',
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

function GeneratedEntryCard({ entry }: { entry: GeneratedPoolEntry }) {
  return (
    <article className="rounded-md border border-gold-900/15 bg-black/12 p-3">
      <div className="flex items-start justify-between gap-3">
        <div className="min-w-0">
          <p className="truncate font-serif text-sm font-bold text-parchment-100">{entry.name}</p>
          {entry.variant ? <p className="mt-0.5 text-[11px] uppercase tracking-[0.14em] text-gold-500/62">{entry.variant.name}</p> : null}
        </div>
        <div className="flex flex-wrap justify-end gap-1">
          {entry.category ? <Badge className="border-parchment-300/20 text-parchment-200">{entry.category}</Badge> : null}
          {entry.type ? <Badge className="border-blue-500/30 text-blue-300">{entry.type}</Badge> : null}
          {entry.tier ? <Badge className="border-gold-500/25 text-gold-200">{entry.tier}</Badge> : null}
        </div>
      </div>
      {entry.variant?.description ? (
        <p className="mt-2 text-[12px] leading-5 text-parchment-200/68">{entry.variant.description}</p>
      ) : entry.description ? (
        <p className="mt-2 text-[12px] leading-5 text-parchment-200/68">{entry.description}</p>
      ) : null}
      {entry.mechanicalEffect ? <p className="mt-2 text-[11px] text-gold-300/70">{entry.mechanicalEffect}</p> : null}
    </article>
  )
}

function VariantList({ variants }: { variants: Array<{ name: string; desc: string }> }) {
  return (
    <div className="mt-3 space-y-2">
      {variants.map((variant) => (
        <div key={variant.name} className="rounded border border-gold-900/12 bg-black/16 px-2.5 py-2">
          <p className="font-serif text-xs font-bold text-parchment-100">{variant.name}</p>
          <p className="mt-1 text-[12px] leading-5 text-parchment-200/65">{variant.desc}</p>
        </div>
      ))}
    </div>
  )
}

function BondCard({ bond }: { bond: IdentityBondPoolItem }) {
  return (
    <article className="rounded-md border border-gold-900/15 bg-obsidian-900/28 p-3">
      <div className="flex items-start justify-between gap-3">
        <div className="min-w-0">
          <h4 className="font-serif text-sm font-bold text-parchment-100">{bond.name}</h4>
          <p className="mt-0.5 text-[11px] text-gold-500/62">{bond.target}</p>
        </div>
        <div className="flex flex-wrap justify-end gap-1">
          <Badge className="border-parchment-300/20 text-parchment-200">{bond.target}</Badge>
          {bond.isKnown ? <Badge className="border-gold-500/30 bg-gold-500/10 text-gold-100">Known</Badge> : null}
        </div>
      </div>
      {bond.mechanicalEffect ? <p className="mt-2 text-[11px] text-gold-300/70">{bond.mechanicalEffect}</p> : null}
      <VariantList variants={bond.variants} />
    </article>
  )
}

function QuirkCard({ quirk }: { quirk: IdentityQuirkPoolItem }) {
  return (
    <article className="rounded-md border border-gold-900/15 bg-obsidian-900/28 p-3">
      <div className="flex items-start justify-between gap-3">
        <div className="min-w-0">
          <h4 className="font-serif text-sm font-bold text-parchment-100">{quirk.name}</h4>
          <p className="mt-0.5 text-[11px] text-gold-500/62">{quirk.type}</p>
        </div>
        <div className="flex flex-wrap justify-end gap-1">
          <Badge className="border-blue-500/30 text-blue-300">{quirk.type}</Badge>
          {quirk.isKnown ? <Badge className="border-gold-500/30 bg-gold-500/10 text-gold-100">Known</Badge> : null}
        </div>
      </div>
      <p className="mt-2 text-[12px] leading-5 text-parchment-200/68">{quirk.description}</p>
      {quirk.mechanicalEffect ? <p className="mt-2 text-[11px] text-gold-300/70">{quirk.mechanicalEffect}</p> : null}
      <VariantList variants={quirk.variants} />
    </article>
  )
}

function SecretCard({ secret }: { secret: IdentitySecretPoolItem }) {
  return (
    <article className="rounded-md border border-gold-900/15 bg-obsidian-900/28 p-3">
      <div className="flex items-start justify-between gap-3">
        <div className="min-w-0">
          <h4 className="font-serif text-sm font-bold text-parchment-100">{secret.name}</h4>
          <p className="mt-0.5 text-[11px] text-gold-500/62">{secret.category}</p>
        </div>
        <div className="flex flex-wrap justify-end gap-1">
          <Badge className={SECRET_CLASS[secret.severity]}>{secret.severity}</Badge>
          {secret.isKnown ? <Badge className="border-gold-500/30 bg-gold-500/10 text-gold-100">Known</Badge> : null}
        </div>
      </div>
      <p className="mt-2 text-[12px] leading-5 text-parchment-200/68">{secret.description}</p>
      {secret.mechanicalEffect ? <p className="mt-2 text-[11px] text-gold-300/70">{secret.mechanicalEffect}</p> : null}
      <VariantList variants={secret.variants} />
    </article>
  )
}

function PsychologyCard({ trait }: { trait: IdentityPsychologyPoolItem }) {
  return (
    <article className="rounded-md border border-gold-900/15 bg-obsidian-900/28 p-3">
      <div className="flex items-start justify-between gap-3">
        <div className="min-w-0">
          <h4 className="font-serif text-sm font-bold text-parchment-100">{trait.name}</h4>
          <p className="mt-0.5 text-[11px] text-gold-500/62">{trait.category}</p>
        </div>
        <div className="flex flex-wrap justify-end gap-1">
          <Badge className={TRAIT_CLASS[trait.type]}>{trait.type}</Badge>
          {trait.isKnown ? <Badge className="border-gold-500/30 bg-gold-500/10 text-gold-100">Known</Badge> : null}
        </div>
      </div>
      <p className="mt-2 text-[12px] leading-5 text-parchment-200/68">{trait.description}</p>
      <p className="mt-2 text-[11px] text-text-muted">Trigger: {trait.trigger}</p>
      {trait.mechanicalEffect ? <p className="mt-2 text-[11px] text-gold-300/70">{trait.mechanicalEffect}</p> : null}
      <VariantList variants={trait.variants} />
    </article>
  )
}

export const IdentityPanel: React.FC<IdentityPanelProps> = ({ character, embedded = false }) => {
  const [activeTab, setActiveTab] = usePersistedTab<IdentitySubTab>('cathedral.identity.activeTab', 'bonds', IDENTITY_TABS)
  const [search, setSearch] = useState('')
  const pools = useMemo(() => buildIdentityPanelPools(character), [character])

  const filteredGeneratedBonds = character.identity.bonds.filter((bond) => matchesGeneratedEntry(search, bond))
  const filteredGeneratedQuirks = character.identity.quirks.filter((quirk) => matchesGeneratedEntry(search, quirk))
  const filteredGeneratedSecrets = character.identity.secrets.filter((secret) => matchesGeneratedEntry(search, secret))
  const filteredGeneratedPsychology = character.identity.psychologicalTraits.filter((trait) => matchesGeneratedEntry(search, trait))

  const filteredBonds = pools.bonds.filter((bond) =>
    matchesSearch(search, bond.name, bond.target, bond.mechanicalEffect, bond.variants.map((variant) => variant.name), bond.variants.map((variant) => variant.desc)),
  )
  const filteredQuirks = pools.quirks.filter((quirk) =>
    matchesSearch(
      search,
      quirk.name,
      quirk.type,
      quirk.description,
      quirk.mechanicalEffect,
      quirk.variants.map((variant) => variant.name),
      quirk.variants.map((variant) => variant.desc),
    ),
  )
  const filteredSecrets = pools.secrets.filter((secret) =>
    matchesSearch(
      search,
      secret.name,
      secret.category,
      secret.severity,
      secret.description,
      secret.mechanicalEffect,
      secret.variants.map((variant) => variant.name),
      secret.variants.map((variant) => variant.desc),
    ),
  )
  const filteredPsychology = pools.psychologicalTraits.filter((trait) =>
    matchesSearch(
      search,
      trait.name,
      trait.type,
      trait.category,
      trait.trigger,
      trait.description,
      trait.mechanicalEffect,
      trait.variants.map((variant) => variant.name),
      trait.variants.map((variant) => variant.desc),
    ),
  )
  const searchCounts: Record<IdentitySubTab, { shown: number; total: number }> = {
    bonds: {
      shown: filteredGeneratedBonds.length + filteredBonds.length,
      total: character.identity.bonds.length + pools.bonds.length,
    },
    quirks: {
      shown: filteredGeneratedQuirks.length + filteredQuirks.length,
      total: character.identity.quirks.length + pools.quirks.length,
    },
    secrets: {
      shown: filteredGeneratedSecrets.length + filteredSecrets.length,
      total: character.identity.secrets.length + pools.secrets.length,
    },
    psychology: {
      shown: filteredGeneratedPsychology.length + filteredPsychology.length,
      total: character.identity.psychologicalTraits.length + pools.psychologicalTraits.length,
    },
  }
  const activeSearchCount = searchCounts[activeTab]

  const handleTabChange = (tab: IdentitySubTab) => {
    setActiveTab(tab)
    setSearch('')
  }

  return (
    <div className={embedded ? 'w-full space-y-5 animate-fade-in' : 'mx-auto w-full max-w-6xl space-y-5 p-4 animate-fade-in md:p-5'}>
      {!embedded ? (
        <header className="border-b border-gold-900/10 pb-4">
          <h2 className="text-3xl font-serif font-bold text-parchment-100">Identity</h2>
          <p className="mt-1 text-sm text-text-muted">
            {character.name}'s known bonds, habits, secrets, and psychological hooks.
          </p>
        </header>
      ) : null}

      <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 xl:grid-cols-4">
        <SummaryCard label="Bonds" value={String(character.identity.bonds.length)} detail={`${pools.bonds.length} bond hooks revealed`} />
        <SummaryCard label="Quirks" value={String(character.identity.quirks.length)} detail={`${pools.quirks.length} behavior hooks revealed`} />
        <SummaryCard label="Secrets" value={String(character.identity.secrets.length)} detail={`${pools.secrets.length} hidden truths revealed`} />
        <SummaryCard label="Psychology" value={String(character.identity.psychologicalTraits.length)} detail={`${pools.psychologicalTraits.length} trait hooks revealed`} />
      </div>

      <SecondaryTabs
        ariaLabel="Identity sections"
        activeId={activeTab}
        idPrefix="identity-tab"
        panelIdPrefix="identity-panel"
        items={IDENTITY_TABS}
        onChange={handleTabChange}
      />

      <PanelSearch
        id="identity-search"
        label="Search identity"
        title="Search identity hooks"
        value={search}
        onChange={setSearch}
        placeholder={`Search ${IDENTITY_TABS.find((tab) => tab.id === activeTab)?.label.toLowerCase() ?? 'identity'}...`}
        shownCount={activeSearchCount.shown}
        totalCount={activeSearchCount.total}
        clearLabel="Clear identity search"
      />

      <div id={`identity-panel-${activeTab}`} role="tabpanel" aria-labelledby={`identity-tab-${activeTab}`} className="min-h-[28rem]">
        {activeTab === 'bonds' ? (
          <section className="space-y-4">
            {character.identity.bonds.length > 0 ? (
              <CategoryDisclosure title="Character Bonds" detail={`${filteredGeneratedBonds.length} shown`} defaultOpen>
                {filteredGeneratedBonds.length === 0 ? (
                  <EmptyState>No character bonds match this search.</EmptyState>
                ) : (
                  <div className="grid grid-cols-1 gap-3 md:grid-cols-2">
                    {filteredGeneratedBonds.map((bond) => <GeneratedEntryCard key={bond.id} entry={bond} />)}
                  </div>
                )}
              </CategoryDisclosure>
            ) : null}
            <CategoryDisclosure title="Known Bonds" detail={`${filteredBonds.length} shown`} defaultOpen={character.identity.bonds.length === 0}>
              {filteredBonds.length === 0 ? (
                <EmptyState>No bonds match this search.</EmptyState>
              ) : (
                <div className="grid grid-cols-1 gap-3 xl:grid-cols-2">
                  {filteredBonds.map((bond) => <BondCard key={bond.id} bond={bond} />)}
                </div>
              )}
            </CategoryDisclosure>
          </section>
        ) : null}

        {activeTab === 'quirks' ? (
          <section className="space-y-4">
            {character.identity.quirks.length > 0 ? (
              <CategoryDisclosure title="Character Quirks" detail={`${filteredGeneratedQuirks.length} shown`} defaultOpen>
                {filteredGeneratedQuirks.length === 0 ? (
                  <EmptyState>No character quirks match this search.</EmptyState>
                ) : (
                  <div className="grid grid-cols-1 gap-3 md:grid-cols-2">
                    {filteredGeneratedQuirks.map((quirk) => <GeneratedEntryCard key={quirk.id} entry={quirk} />)}
                  </div>
                )}
              </CategoryDisclosure>
            ) : null}
            <CategoryDisclosure title="Known Quirks" detail={`${filteredQuirks.length} shown`} defaultOpen={character.identity.quirks.length === 0}>
              {filteredQuirks.length === 0 ? (
                <EmptyState>No quirks match this search.</EmptyState>
              ) : (
                <div className="grid grid-cols-1 gap-3 xl:grid-cols-2">
                  {filteredQuirks.map((quirk) => <QuirkCard key={quirk.id} quirk={quirk} />)}
                </div>
              )}
            </CategoryDisclosure>
          </section>
        ) : null}

        {activeTab === 'secrets' ? (
          <section className="space-y-4">
            {character.identity.secrets.length > 0 ? (
              <CategoryDisclosure title="Character Secrets" detail={`${filteredGeneratedSecrets.length} shown`} defaultOpen>
                {filteredGeneratedSecrets.length === 0 ? (
                  <EmptyState>No character secrets match this search.</EmptyState>
                ) : (
                  <div className="grid grid-cols-1 gap-3 md:grid-cols-2">
                    {filteredGeneratedSecrets.map((secret) => <GeneratedEntryCard key={secret.id} entry={secret} />)}
                  </div>
                )}
              </CategoryDisclosure>
            ) : null}
            <CategoryDisclosure title="Known Secrets" detail={`${filteredSecrets.length} shown`} defaultOpen={character.identity.secrets.length === 0}>
              {filteredSecrets.length === 0 ? (
                <EmptyState>No secrets match this search.</EmptyState>
              ) : (
                <div className="grid grid-cols-1 gap-3 xl:grid-cols-2">
                  {filteredSecrets.map((secret) => <SecretCard key={secret.id} secret={secret} />)}
                </div>
              )}
            </CategoryDisclosure>
          </section>
        ) : null}

        {activeTab === 'psychology' ? (
          <section className="space-y-4">
            {character.identity.psychologicalTraits.length > 0 ? (
              <CategoryDisclosure title="Character Psychology" detail={`${filteredGeneratedPsychology.length} shown`} defaultOpen>
                {filteredGeneratedPsychology.length === 0 ? (
                  <EmptyState>No character psychology matches this search.</EmptyState>
                ) : (
                  <div className="grid grid-cols-1 gap-3 md:grid-cols-2">
                    {filteredGeneratedPsychology.map((trait) => <GeneratedEntryCard key={trait.id} entry={trait} />)}
                  </div>
                )}
              </CategoryDisclosure>
            ) : null}
            <CategoryDisclosure title="Psychological Hooks" detail={`${filteredPsychology.length} shown`} defaultOpen={character.identity.psychologicalTraits.length === 0}>
              {filteredPsychology.length === 0 ? (
                <EmptyState>No psychological traits match this search.</EmptyState>
              ) : (
                <div className="grid grid-cols-1 gap-3 xl:grid-cols-2">
                  {filteredPsychology.map((trait) => <PsychologyCard key={trait.id} trait={trait} />)}
                </div>
              )}
            </CategoryDisclosure>
          </section>
        ) : null}
      </div>
    </div>
  )
}
