import React, { useMemo, useState } from 'react'
import type { Character, GeneratedPoolEntry } from '../types'
import type { Deity, Landmark, Language } from '../data/world'
import { matchesGeneratedEntry, matchesSearch, metadataText } from '../lib/generatedEntryUtils'
import { usePersistedTab } from '../hooks/usePersistedTab'
import { SecondaryTabs, type SecondaryTabItem } from './ui/SecondaryTabs'
import { CategoryDisclosure } from './ui/CategoryDisclosure'
import { PanelSearch } from './ui/PanelSearch'
import { buildWorldPanelPools, type CustomPoolItem, type FactionPoolItem, type HistoricalEraPoolItem } from './worldPanelPools'

type WorldSubTab = 'affiliations' | 'culture' | 'pantheon' | 'history' | 'landmarks' | 'hazard'

interface WorldPanelProps {
  character: Character
}

const WORLD_TABS: readonly SecondaryTabItem<WorldSubTab>[] = [
  { id: 'affiliations', label: 'Affiliations', title: 'Regional ties and factions' },
  { id: 'culture', label: 'Culture', title: 'Languages and customs' },
  { id: 'pantheon', label: 'Pantheon', title: 'Gods and divine ties' },
  { id: 'history', label: 'History', title: 'Historical context' },
  { id: 'landmarks', label: 'Landmarks', title: 'Known places and sites' },
  { id: 'hazard', label: 'Hazard', title: 'Known hazard' },
]

const LANGUAGE_CLASS: Record<Language['type'], string> = {
  Common: 'border-green-500/30 text-green-300',
  Exotic: 'border-blue-500/30 text-blue-300',
  Secret: 'border-purple-500/30 text-purple-300',
  Dead: 'border-red-500/30 text-red-300',
}

const DANGER_CLASS: Record<Landmark['dangerLevel'], string> = {
  Low: 'border-green-500/30 text-green-300',
  Medium: 'border-amber-500/30 text-amber-300',
  High: 'border-orange-500/30 text-orange-300',
  Extreme: 'border-red-500/30 bg-red-500/8 text-red-300',
}

const HAZARD_SEVERITY_CLASS: Record<string, string> = {
  Minor: 'border-green-500/30 text-green-300',
  Moderate: 'border-amber-500/30 text-amber-300',
  Severe: 'border-orange-500/30 text-orange-300',
  Lethal: 'border-red-500/30 bg-red-500/8 text-red-300',
}

const DEITY_TIER: Record<Deity['tier'], string> = {
  1: 'Lesser',
  2: 'Greater',
  3: 'Prime',
}

function isKnownLanguage(language: Language, entries: GeneratedPoolEntry[]): boolean {
  return entries.some((entry) => entry.id === language.id || entry.name === language.name)
}

function isCustomRelevant(character: Character, custom: CustomPoolItem): boolean {
  return custom.associatedGroups.some(
    (group) => group === character.race || group === character.region || group === character.guild || group === character.faction,
  )
}

function listPreview(values: string[], limit = 6) {
  const visible = values.slice(0, limit)
  const hiddenCount = Math.max(0, values.length - limit)
  return { visible, hiddenCount }
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

function SectionHeader({ title, detail }: { title: string; detail?: string }) {
  return (
    <div className="mb-3 flex items-end justify-between gap-3">
      <h3 className="font-serif text-xs font-bold uppercase tracking-[0.18em] text-gold-500/78">{title}</h3>
      {detail ? <span className="text-[11px] text-text-muted">{detail}</span> : null}
    </div>
  )
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
          {entry.category ? <p className="mt-0.5 text-[11px] uppercase tracking-[0.14em] text-gold-500/62">{entry.category}</p> : null}
        </div>
        {entry.tier ? <Badge className="border-gold-500/25 text-gold-200">{entry.tier}</Badge> : null}
      </div>
      {entry.description ? <p className="mt-2 text-[12px] leading-5 text-parchment-200/68">{entry.description}</p> : null}
    </article>
  )
}

function FactionCard({ faction }: { faction: FactionPoolItem }) {
  const preview = listPreview(faction.territories)

  return (
    <article className="rounded-md border border-gold-900/15 bg-obsidian-900/28 p-3">
      <div className="flex items-start justify-between gap-3">
        <div className="min-w-0">
          <h4 className="font-serif text-sm font-bold text-parchment-100">{faction.name}</h4>
          <p className="mt-0.5 text-[11px] text-text-muted">{faction.territories.length} linked regions or guilds</p>
        </div>
        <div className="flex flex-wrap justify-end gap-1">
          {faction.isCurrent ? <Badge className="border-gold-500/30 bg-gold-500/10 text-gold-100">Current</Badge> : null}
          {faction.isGuildLinked ? <Badge className="border-blue-500/30 text-blue-300">Guild</Badge> : null}
          {faction.isRegionLinked ? <Badge className="border-green-500/30 text-green-300">Region</Badge> : null}
        </div>
      </div>
      <div className="mt-3 flex flex-wrap gap-1.5">
        {preview.visible.map((territory) => (
          <span key={territory} className="rounded border border-gold-900/12 bg-black/16 px-2 py-1 text-[11px] text-parchment-200/72">
            {territory}
          </span>
        ))}
        {preview.hiddenCount > 0 ? (
          <span className="rounded border border-gold-900/12 bg-black/16 px-2 py-1 text-[11px] text-gold-500/70">
            +{preview.hiddenCount} more
          </span>
        ) : null}
      </div>
    </article>
  )
}

function LanguageCard({ language, isKnown }: { language: Language; isKnown: boolean }) {
  return (
    <article className="rounded-md border border-gold-900/15 bg-obsidian-900/28 p-3">
      <div className="flex items-start justify-between gap-3">
        <div>
          <h4 className="font-serif text-sm font-bold text-parchment-100">{language.name}</h4>
          <p className="mt-0.5 text-[11px] text-gold-500/62">{language.script}</p>
        </div>
        <div className="flex flex-wrap justify-end gap-1">
          <Badge className={LANGUAGE_CLASS[language.type]}>{language.type}</Badge>
          {isKnown ? <Badge className="border-gold-500/30 bg-gold-500/10 text-gold-100">Known</Badge> : null}
        </div>
      </div>
      <p className="mt-2 text-[12px] leading-5 text-parchment-200/68">{language.description}</p>
      <div className="mt-2 flex flex-wrap gap-1.5">
        <span className="rounded border border-gold-900/12 bg-black/16 px-2 py-0.5 text-[10px] text-parchment-200/64">
          Difficulty {language.difficulty}
        </span>
        <span className={`rounded border border-gold-900/12 bg-black/16 px-2 py-0.5 text-[10px] ${language.learnable ? 'text-green-300/75' : 'text-red-300/75'}`}>
          {language.learnable ? 'Learnable' : 'Not learnable'}
        </span>
      </div>
    </article>
  )
}

function CustomCard({ custom, relevant }: { custom: CustomPoolItem; relevant: boolean }) {
  return (
    <article className="rounded-md border border-gold-900/15 bg-obsidian-900/28 p-3">
      <div className="flex items-start justify-between gap-3">
        <div className="min-w-0">
          <h4 className="font-serif text-sm font-bold text-parchment-100">{custom.type}</h4>
          <p className="mt-0.5 truncate text-[11px] text-text-muted">{custom.associatedGroups.join(', ')}</p>
        </div>
        {relevant ? <Badge className="border-gold-500/30 bg-gold-500/10 text-gold-100">Relevant</Badge> : null}
      </div>
      <div className="mt-3 space-y-2">
        {custom.variations.map((variation) => (
          <div key={variation.name} className="rounded border border-gold-900/12 bg-black/16 px-2.5 py-2">
            <p className="font-serif text-xs font-bold text-parchment-100">{variation.name}</p>
            <p className="mt-1 text-[12px] leading-5 text-parchment-200/65">{variation.desc}</p>
          </div>
        ))}
      </div>
    </article>
  )
}

function DeityCard({ deity, favored }: { deity: Deity; favored: boolean }) {
  return (
    <article className="rounded-md border border-gold-900/15 bg-obsidian-900/28 p-3">
      <div className="flex items-start justify-between gap-3">
        <div>
          <h4 className="font-serif text-sm font-bold text-parchment-100">{deity.name}</h4>
          <p className="mt-0.5 text-[11px] text-gold-500/62">{deity.alignment}</p>
        </div>
        <div className="flex flex-wrap justify-end gap-1">
          <Badge className="border-parchment-300/20 text-parchment-200">{DEITY_TIER[deity.tier]}</Badge>
          {favored ? <Badge className="border-gold-500/30 bg-gold-500/10 text-gold-100">Favored</Badge> : null}
        </div>
      </div>
      <p className="mt-2 text-[12px] leading-5 text-parchment-200/68">{deity.description}</p>
      <p className="mt-2 text-[11px] text-text-muted">{deity.symbol}</p>
      <div className="mt-2 flex flex-wrap gap-1.5">
        {deity.domains.map((domain) => (
          <span key={domain} className="rounded border border-gold-900/12 bg-black/16 px-2 py-0.5 text-[10px] text-gold-300/72">
            {domain}
          </span>
        ))}
      </div>
    </article>
  )
}

function EraCard({ era }: { era: HistoricalEraPoolItem }) {
  return (
    <article className="rounded-md border border-gold-900/15 bg-obsidian-900/28 p-3">
      <div className="flex items-start justify-between gap-3">
        <div>
          <h4 className="font-serif text-sm font-bold text-parchment-100">{era.eraName}</h4>
          <p className="mt-0.5 text-[11px] text-gold-500/62">{era.timeframeName}</p>
          <p className="mt-0.5 text-[11px] text-text-muted">{era.yearRange}</p>
        </div>
        {era.isCurrent ? <Badge className="border-gold-500/30 bg-gold-500/10 text-gold-100">Current</Badge> : null}
      </div>
      <p className="mt-2 text-[12px] leading-5 text-parchment-200/68">{era.description}</p>
      <div className="mt-2 flex flex-wrap gap-1.5">
        {era.keyEvents.map((event) => (
          <span key={event} className="rounded border border-gold-900/12 bg-black/16 px-2 py-0.5 text-[10px] text-parchment-200/64">
            {event}
          </span>
        ))}
      </div>
      <details className="mt-3">
        <summary title="Show historical sources" className="cursor-pointer font-serif text-xs text-gold-300 hover:text-gold-100">Sources ({era.sources.length})</summary>
        <div className="mt-2 space-y-2">
          {era.sources.map((source) => (
            <blockquote key={`${era.eraName}-${source.source}`} className="rounded border border-gold-900/12 bg-black/16 px-2.5 py-2">
              <p className="text-[10px] font-bold uppercase tracking-[0.14em] text-gold-500/65">{source.source}</p>
              <p className="mt-1 text-[12px] leading-5 text-parchment-200/65">{source.text}</p>
            </blockquote>
          ))}
        </div>
      </details>
    </article>
  )
}

function LandmarkCard({ landmark, nearby }: { landmark: Landmark; nearby: boolean }) {
  return (
    <article className="rounded-md border border-gold-900/15 bg-obsidian-900/28 p-3">
      <div className="flex items-start justify-between gap-3">
        <div>
          <h4 className="font-serif text-sm font-bold text-parchment-100">{landmark.name}</h4>
          <p className="mt-0.5 text-[11px] text-gold-500/62">{landmark.region}</p>
        </div>
        <div className="flex flex-wrap justify-end gap-1">
          <Badge className="border-parchment-300/20 text-parchment-200">{landmark.type}</Badge>
          <Badge className={DANGER_CLASS[landmark.dangerLevel]}>{landmark.dangerLevel}</Badge>
          {nearby ? <Badge className="border-gold-500/30 bg-gold-500/10 text-gold-100">Journey site</Badge> : null}
        </div>
      </div>
      <p className="mt-2 text-[12px] leading-5 text-parchment-200/68">{landmark.description}</p>
    </article>
  )
}

function HazardCard({ hazard }: { hazard: GeneratedPoolEntry }) {
  const trigger = metadataText(hazard, 'trigger')
  const damageType = metadataText(hazard, 'damageType')
  const tier = hazard.tier ? String(hazard.tier) : null
  const severityClass = tier ? HAZARD_SEVERITY_CLASS[tier] ?? 'border-parchment-300/20 text-parchment-200' : null

  return (
    <article className="rounded-md border border-gold-900/15 bg-obsidian-900/28 p-3" title="Known hazard">
      <div className="flex items-start justify-between gap-3">
        <div className="min-w-0">
          <h4 className="font-serif text-sm font-bold text-parchment-100">{hazard.name}</h4>
          {hazard.category ? <p className="mt-0.5 text-[11px] uppercase tracking-[0.14em] text-gold-500/62">{hazard.category}</p> : null}
        </div>
        <div className="flex flex-wrap justify-end gap-1">
          <Badge className="border-gold-500/30 bg-gold-500/10 text-gold-100">Known hazard</Badge>
          {tier && severityClass ? <Badge className={severityClass}>{tier}</Badge> : null}
        </div>
      </div>
      {hazard.description ? <p className="mt-2 text-[12px] leading-5 text-parchment-200/68">{hazard.description}</p> : null}
      <div className="mt-3 grid grid-cols-1 gap-2 sm:grid-cols-2">
        {trigger ? (
          <div className="rounded border border-gold-900/12 bg-black/16 px-2.5 py-2">
            <p className="text-[9px] font-bold uppercase tracking-[0.14em] text-gold-500/65">Trigger</p>
            <p className="mt-1 text-[12px] leading-5 text-parchment-200/68">{trigger}</p>
          </div>
        ) : null}
        {damageType ? (
          <div className="rounded border border-gold-900/12 bg-black/16 px-2.5 py-2">
            <p className="text-[9px] font-bold uppercase tracking-[0.14em] text-gold-500/65">Damage</p>
            <p className="mt-1 text-[12px] leading-5 text-parchment-200/68">{damageType}</p>
          </div>
        ) : null}
      </div>
      {hazard.effect ? <p className="mt-3 text-[12px] leading-5 text-parchment-200/68">{hazard.effect}</p> : null}
    </article>
  )
}

export const WorldPanel: React.FC<WorldPanelProps> = ({ character }) => {
  const [activeTab, setActiveTab] = usePersistedTab<WorldSubTab>('cathedral.world.activeTab', 'affiliations', WORLD_TABS)
  const [search, setSearch] = useState('')
  const pools = useMemo(() => buildWorldPanelPools(character), [character])

  const filteredFactions = pools.factions.filter((faction) => matchesSearch(search, faction.name, faction.territories))
  const filteredGeneratedLanguages = character.world.languages.filter((language) => matchesGeneratedEntry(search, language))
  const filteredGeneratedCustoms = character.world.customs.filter((custom) => matchesGeneratedEntry(search, custom))
  const filteredLanguages = pools.languages.filter((language) => matchesSearch(search, language.name, language.type, language.script, language.speakers, language.description))
  const filteredCustoms = pools.customs.filter((custom) =>
    matchesSearch(
      search,
      custom.type,
      custom.associatedGroups,
      custom.variations.map((variation) => variation.name),
      custom.variations.map((variation) => variation.desc),
    ),
  )
  const filteredDeity = character.world.deity && matchesGeneratedEntry(search, character.world.deity) ? character.world.deity : null
  const filteredDeities = pools.deities.filter((deity) =>
    matchesSearch(search, deity.name, deity.alignment, deity.domains, deity.symbol, deity.description, deity.favoredRaces, deity.favoredRoles),
  )
  const filteredHistoryEntry = character.world.history && matchesGeneratedEntry(search, character.world.history) ? character.world.history : null
  const filteredHistory = pools.history.filter((era) =>
    matchesSearch(
      search,
      era.timeframeName,
      era.timeframeRange,
      era.eraName,
      era.yearRange,
      era.description,
      era.keyEvents,
      era.sources.map((source) => source.source),
      era.sources.map((source) => source.text),
    ),
  )
  const filteredGeneratedLandmarks = character.world.landmarks.filter((landmark) => matchesGeneratedEntry(search, landmark))
  const filteredLandmarks = pools.landmarks.filter((landmark) => matchesSearch(search, landmark.name, landmark.region, landmark.type, landmark.dangerLevel, landmark.description))
  const filteredHazards = character.magic.hazards.filter((hazard) => matchesGeneratedEntry(search, hazard))
  const nearbyLandmarks = new Set(pools.landmarks.map((landmark) => `${landmark.name}:${landmark.region}`))
  const searchCounts: Record<WorldSubTab, { shown: number; total: number }> = {
    affiliations: { shown: filteredFactions.length, total: pools.factions.length },
    culture: {
      shown: filteredGeneratedLanguages.length + filteredGeneratedCustoms.length + filteredLanguages.length + filteredCustoms.length,
      total: character.world.languages.length + character.world.customs.length + pools.languages.length + pools.customs.length,
    },
    pantheon: {
      shown: (filteredDeity ? 1 : 0) + filteredDeities.length,
      total: (character.world.deity ? 1 : 0) + pools.deities.length,
    },
    history: {
      shown: (filteredHistoryEntry ? 1 : 0) + filteredHistory.length,
      total: (character.world.history ? 1 : 0) + pools.history.length,
    },
    landmarks: {
      shown: filteredGeneratedLandmarks.length + filteredLandmarks.length,
      total: character.world.landmarks.length + pools.landmarks.length,
    },
    hazard: { shown: filteredHazards.length, total: character.magic.hazards.length },
  }
  const activeSearchCount = searchCounts[activeTab]

  const handleTabChange = (tab: WorldSubTab) => {
    setActiveTab(tab)
    setSearch('')
  }

  return (
    <div className="mx-auto w-full max-w-6xl space-y-5 p-4 animate-fade-in md:p-5">
      <header className="border-b border-gold-900/10 pb-4">
        <h2 className="text-3xl font-serif font-bold text-parchment-100">World Atlas</h2>
        <p className="mt-1 text-sm text-text-muted">
          {character.name}'s known world context, regional ties, and landmarks from the journey.
        </p>
      </header>

      <div className="grid grid-cols-1 gap-3 sm:grid-cols-3">
        <SummaryCard label="Region" value={character.region} detail={`${pools.homeRegions.length} homeland ties revealed`} />
        <SummaryCard label="Guild" value={character.guild} detail={`${pools.regionGuilds.length} regional guild hooks`} />
        <SummaryCard label="Faction" value={character.faction} detail={`${pools.factions.length} related factions`} />
      </div>

      <SecondaryTabs
        ariaLabel="World atlas sections"
        activeId={activeTab}
        idPrefix="world-tab"
        panelIdPrefix="world-panel"
        items={WORLD_TABS}
        onChange={handleTabChange}
      />

      <PanelSearch
        id="world-atlas-search"
        label="Search world atlas"
        title="Search world atlas"
        value={search}
        onChange={setSearch}
        placeholder={`Search ${WORLD_TABS.find((tab) => tab.id === activeTab)?.label.toLowerCase() ?? 'world'}...`}
        shownCount={activeSearchCount.shown}
        totalCount={activeSearchCount.total}
        clearLabel="Clear world atlas search"
      />

      <div id={`world-panel-${activeTab}`} role="tabpanel" aria-labelledby={`world-tab-${activeTab}`} className="min-h-[28rem]">
        {activeTab === 'affiliations' ? (
          <div className="space-y-5">
            <CategoryDisclosure title="Homeland Ties" detail={`${pools.homeRegions.length} revealed`} defaultOpen>
              <div className="flex flex-wrap gap-1.5">
                {pools.homeRegions.map((region) => (
                  <span
                    key={region.name}
                    className={`rounded-md border px-2.5 py-1.5 text-xs ${region.isCurrent ? 'border-gold-500/30 bg-gold-500/10 text-gold-100' : 'border-gold-900/15 bg-black/12 text-parchment-200/72'}`}
                  >
                    {region.name}
                  </span>
                ))}
              </div>
            </CategoryDisclosure>

            <CategoryDisclosure title="Regional Guilds" detail={character.region}>
              {pools.regionGuilds.length === 0 ? (
                <EmptyState>No guild hooks revealed for this region.</EmptyState>
              ) : (
                <div className="grid grid-cols-1 gap-2 sm:grid-cols-2 xl:grid-cols-3">
                  {pools.regionGuilds.map((guild) => (
                    <div
                      key={guild.name}
                      className={`rounded-md border p-3 ${guild.isCurrent ? 'border-gold-500/30 bg-gold-500/10 text-gold-100' : 'border-gold-900/15 bg-obsidian-900/28 text-parchment-200/72'}`}
                    >
                      <p className="font-serif text-sm font-bold">{guild.name}</p>
                      {guild.detail ? <p className="mt-1 text-[11px] text-gold-500/70">{guild.detail}</p> : null}
                    </div>
                  ))}
                </div>
              )}
            </CategoryDisclosure>

            <CategoryDisclosure title="Related Factions" detail={`${filteredFactions.length} shown`}>
              {filteredFactions.length === 0 ? (
                <EmptyState>No faction hooks match this search.</EmptyState>
              ) : (
                <div className="grid grid-cols-1 gap-3 xl:grid-cols-2">
                  {filteredFactions.map((faction) => <FactionCard key={faction.name} faction={faction} />)}
                </div>
              )}
            </CategoryDisclosure>
          </div>
        ) : null}

        {activeTab === 'culture' ? (
          <div className="space-y-5">
            {character.world.languages.length > 0 ? (
              <CategoryDisclosure title="Character Languages" detail={`${filteredGeneratedLanguages.length} known`} defaultOpen>
                {filteredGeneratedLanguages.length === 0 ? (
                  <EmptyState>No character languages match this search.</EmptyState>
                ) : (
                  <div className="grid grid-cols-1 gap-3 md:grid-cols-2">
                    {filteredGeneratedLanguages.map((language) => <GeneratedEntryCard key={language.id} entry={language} />)}
                  </div>
                )}
              </CategoryDisclosure>
            ) : null}

            {character.world.customs.length > 0 ? (
              <CategoryDisclosure title="Character Customs" detail={`${filteredGeneratedCustoms.length} known`} defaultOpen={character.world.languages.length === 0}>
                {filteredGeneratedCustoms.length === 0 ? (
                  <EmptyState>No character customs match this search.</EmptyState>
                ) : (
                  <div className="grid grid-cols-1 gap-3 md:grid-cols-2">
                    {filteredGeneratedCustoms.map((custom) => <GeneratedEntryCard key={custom.id} entry={custom} />)}
                  </div>
                )}
              </CategoryDisclosure>
            ) : null}

            <CategoryDisclosure title="Known Languages" detail={`${filteredLanguages.length} shown`} defaultOpen={character.world.languages.length === 0 && character.world.customs.length === 0}>
              {filteredLanguages.length === 0 ? (
                <EmptyState>No languages match this search.</EmptyState>
              ) : (
                <div className="grid grid-cols-1 gap-3 xl:grid-cols-2">
                  {filteredLanguages.map((language) => <LanguageCard key={language.id} language={language} isKnown={isKnownLanguage(language, character.world.languages)} />)}
                </div>
              )}
            </CategoryDisclosure>

            <CategoryDisclosure title="Cultural Customs" detail={`${filteredCustoms.length} shown`}>
              {filteredCustoms.length === 0 ? (
                <EmptyState>No customs match this search.</EmptyState>
              ) : (
                <div className="grid grid-cols-1 gap-3 xl:grid-cols-2">
                  {filteredCustoms.map((custom, index) => (
                    <CustomCard key={`${custom.type}-${custom.associatedGroups.join('-')}-${index}`} custom={custom} relevant={isCustomRelevant(character, custom)} />
                  ))}
                </div>
              )}
            </CategoryDisclosure>
          </div>
        ) : null}

        {activeTab === 'pantheon' ? (
          <section className="space-y-5">
            {character.world.deity ? (
              <CategoryDisclosure title="Character Deity" detail={filteredDeity ? '1 known' : '0 shown'} defaultOpen>
                {filteredDeity ? <GeneratedEntryCard entry={filteredDeity} /> : <EmptyState>No character deity matches this search.</EmptyState>}
              </CategoryDisclosure>
            ) : null}
            <CategoryDisclosure title="Divine Ties" detail={`${filteredDeities.length} shown`} defaultOpen={!character.world.deity}>
              {filteredDeities.length === 0 ? (
                <EmptyState>No deities match this search.</EmptyState>
              ) : (
                <div className="grid grid-cols-1 gap-3 xl:grid-cols-2">
                  {filteredDeities.map((deity) => (
                    <DeityCard key={deity.id} deity={deity} favored={deity.favoredRaces.includes(character.race) || deity.favoredRoles.includes(character.role)} />
                  ))}
                </div>
              )}
            </CategoryDisclosure>
          </section>
        ) : null}

        {activeTab === 'history' ? (
          <section className="space-y-5">
            {character.world.history ? (
              <CategoryDisclosure title="Character History" detail={filteredHistoryEntry ? '1 known' : '0 shown'} defaultOpen>
                {filteredHistoryEntry ? <GeneratedEntryCard entry={filteredHistoryEntry} /> : <EmptyState>No character history matches this search.</EmptyState>}
              </CategoryDisclosure>
            ) : null}
            <CategoryDisclosure title="Historical Context" detail={`${filteredHistory.length} shown`} defaultOpen={!character.world.history}>
              {filteredHistory.length === 0 ? (
                <EmptyState>No historical entries match this search.</EmptyState>
              ) : (
                <div className="grid grid-cols-1 gap-3">
                  {filteredHistory.map((era) => <EraCard key={`${era.timeframeName}-${era.eraName}`} era={era} />)}
                </div>
              )}
            </CategoryDisclosure>
          </section>
        ) : null}

        {activeTab === 'landmarks' ? (
          <section className="space-y-5">
            {character.world.landmarks.length > 0 ? (
              <CategoryDisclosure title="Character Landmarks" detail={`${filteredGeneratedLandmarks.length} known`} defaultOpen>
                {filteredGeneratedLandmarks.length === 0 ? (
                  <EmptyState>No character landmarks match this search.</EmptyState>
                ) : (
                  <div className="grid grid-cols-1 gap-3 md:grid-cols-2">
                    {filteredGeneratedLandmarks.map((landmark) => <GeneratedEntryCard key={landmark.id} entry={landmark} />)}
                  </div>
                )}
              </CategoryDisclosure>
            ) : null}
            <CategoryDisclosure title="Known Landmarks" detail={`${filteredLandmarks.length} journey ${filteredLandmarks.length === 1 ? 'site' : 'sites'}`} defaultOpen={!character.world.landmarks.length}>
              {filteredLandmarks.length === 0 ? (
                <EmptyState>No landmarks match this search.</EmptyState>
              ) : (
                <div className="grid grid-cols-1 gap-3 xl:grid-cols-2">
                  {filteredLandmarks.map((landmark) => (
                    <LandmarkCard key={`${landmark.name}-${landmark.region}`} landmark={landmark} nearby={nearbyLandmarks.has(`${landmark.name}:${landmark.region}`)} />
                  ))}
                </div>
              )}
            </CategoryDisclosure>
          </section>
        ) : null}

        {activeTab === 'hazard' ? (
          <section>
            <SectionHeader title="Known Hazard" detail={`${filteredHazards.length} shown`} />
            {filteredHazards.length === 0 ? (
              <EmptyState>No known hazards match this search.</EmptyState>
            ) : (
              <div className="grid grid-cols-1 gap-3 xl:grid-cols-2">
                {filteredHazards.map((hazard) => <HazardCard key={hazard.id} hazard={hazard} />)}
              </div>
            )}
          </section>
        ) : null}
      </div>
    </div>
  )
}
