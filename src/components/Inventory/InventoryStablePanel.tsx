import React, { useMemo } from 'react'
import type { BestiaryProfile } from '../../logic/bestiaryCatalog'
import type { GeneratedBestiary, GeneratedPoolEntry } from '../../types'
import { metadataString, metadataValue, uniqueGeneratedEntries } from '../../lib/generatedEntryUtils'
import { CategoryDisclosure } from '../ui/CategoryDisclosure'

interface InventoryStablePanelProps {
  bestiary: GeneratedBestiary
  characterProfile: BestiaryProfile
  onBestiaryChange?: (updates: Partial<GeneratedBestiary>) => void
}

type CompanionMetric = {
  label: string
  value: string
}

function entryGroupId(entry: GeneratedPoolEntry | null | undefined, key: 'mountId' | 'petId'): string | null {
  return metadataString(entry, key) ?? entry?.id ?? null
}

function formatTier(value: string | number | undefined): string | null {
  if (value === undefined) return null
  return `Tier ${value}`
}

function joinMetrics(metrics: (CompanionMetric | null)[]): CompanionMetric[] {
  return metrics.filter((metric): metric is CompanionMetric => Boolean(metric?.value))
}

function mountMetrics(entry: GeneratedPoolEntry | null): CompanionMetric[] {
  return joinMetrics([
    entry?.category ? { label: 'Class', value: entry.category } : null,
    entry?.tier ? { label: 'Tier', value: formatTier(entry.tier) ?? '' } : null,
    entry?.rarity ? { label: 'Rarity', value: entry.rarity } : null,
    metadataValue(entry, 'speed') ? { label: 'Speed', value: metadataValue(entry, 'speed') ?? '' } : null,
    metadataValue(entry, 'hp') ? { label: 'HP', value: metadataValue(entry, 'hp') ?? '' } : null,
    metadataValue(entry, 'defenseRating') ? { label: 'Defense', value: metadataValue(entry, 'defenseRating') ?? '' } : null,
  ])
}

function gearMetrics(entry: GeneratedPoolEntry | null): CompanionMetric[] {
  return joinMetrics([
    entry?.rarity ? { label: 'Rarity', value: entry.rarity } : null,
    metadataValue(entry, 'extraSlots') ? { label: 'Extra Slots', value: metadataValue(entry, 'extraSlots') ?? '' } : null,
    metadataValue(entry, 'weight') ? { label: 'Weight', value: metadataValue(entry, 'weight') ?? '' } : null,
  ])
}

function petMetrics(entry: GeneratedPoolEntry | null): CompanionMetric[] {
  const bonusStat = metadataValue(entry, 'bonusStat')
  const bonusValue = metadataValue(entry, 'bonusValue')
  const bonusType = metadataValue(entry, 'bonusType')

  return joinMetrics([
    entry?.category ? { label: 'Class', value: entry.category } : null,
    entry?.tier ? { label: 'Tier', value: formatTier(entry.tier) ?? '' } : null,
    entry?.rarity ? { label: 'Rarity', value: entry.rarity } : null,
    metadataValue(entry, 'loyalty') ? { label: 'Loyalty', value: metadataValue(entry, 'loyalty') ?? '' } : null,
    metadataValue(entry, 'diet') ? { label: 'Diet', value: metadataValue(entry, 'diet') ?? '' } : null,
    bonusStat && bonusValue ? { label: 'Bonus', value: `${bonusStat} ${bonusValue}${bonusType === 'percent' ? '%' : ''}` } : null,
  ])
}

function EmptyState({ children }: { children: React.ReactNode }) {
  return <p className="py-6 text-center text-sm italic text-text-muted">{children}</p>
}

function FavoriteLine({
  ariaLabel,
  name,
  onSelect,
}: {
  ariaLabel: string
  name: string
  onSelect?: () => void
}) {
  const content = (
    <>
      <span
        aria-label={ariaLabel}
        title={ariaLabel}
        className="inline-flex h-5 min-w-5 items-center justify-center rounded border border-gold-500/30 bg-gold-500/12 px-1 text-[10px] font-bold text-gold-100"
      >
        F
      </span>
      <span className="truncate">{name}</span>
    </>
  )

  if (onSelect) {
    return (
      <button
        type="button"
        aria-label={`Select ${ariaLabel.toLowerCase()}: ${name}`}
        title={`Select ${ariaLabel.toLowerCase()}: ${name}`}
        onClick={(event) => {
          event.preventDefault()
          event.stopPropagation()
          onSelect()
        }}
        className="mt-2 flex min-h-8 w-full items-center gap-1.5 rounded border border-transparent px-1 text-left text-[11px] text-parchment-200/70 transition-colors hover:border-gold-500/22 hover:bg-gold-500/8 hover:text-gold-100 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold-400"
      >
        {content}
      </button>
    )
  }

  return (
    <p className="mt-2 flex items-center gap-1.5 text-[11px] text-parchment-200/70">
      {content}
    </p>
  )
}

function CompanionCard({
  entry,
  empty,
  iconLabel,
  metrics,
}: {
  entry: GeneratedPoolEntry | null
  empty: string
  iconLabel: string
  metrics: CompanionMetric[]
}) {
  if (!entry) return <EmptyState>{empty}</EmptyState>

  return (
    <article className="rounded-md border border-gold-900/15 bg-obsidian-900/28 p-3">
      <div className="flex items-start gap-3">
        <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-md border border-gold-500/20 bg-black/20 text-2xl text-gold-300/82">
          <span aria-hidden="true" className="font-serif text-sm font-bold tracking-[0.16em]">{iconLabel}</span>
        </div>
        <div className="min-w-0 flex-1">
          <h4 className="font-serif text-base font-bold text-parchment-100">{entry.name}</h4>
          {entry.description ? <p className="mt-1 text-[12px] leading-5 text-parchment-200/68">{entry.description}</p> : null}
        </div>
      </div>

      {metrics.length > 0 ? (
        <dl className="mt-3 grid grid-cols-2 gap-2 md:grid-cols-3">
          {metrics.map((metric) => (
            <div key={`${entry.id}-${metric.label}`} className="rounded border border-gold-900/12 bg-black/16 px-2.5 py-2">
              <dt className="text-[9px] font-bold uppercase tracking-[0.14em] text-gold-500/65">{metric.label}</dt>
              <dd className="mt-1 text-[12px] leading-5 text-parchment-200/72">{metric.value}</dd>
            </div>
          ))}
        </dl>
      ) : null}
    </article>
  )
}

export const InventoryStablePanel: React.FC<InventoryStablePanelProps> = ({
  bestiary,
  onBestiaryChange,
}) => {
  const mountOptions = useMemo(
    () => uniqueGeneratedEntries([...(bestiary.mounts ?? []), bestiary.mount, bestiary.favoriteMount]),
    [bestiary.mounts, bestiary.mount, bestiary.favoriteMount],
  )
  const allMountGearOptions = useMemo(
    () => uniqueGeneratedEntries([...(bestiary.mountBags ?? []), bestiary.mountBag]),
    [bestiary.mountBags, bestiary.mountBag],
  )
  const petOptions = useMemo(
    () => uniqueGeneratedEntries([...(bestiary.pets ?? []), bestiary.pet, bestiary.favoritePet]),
    [bestiary.pets, bestiary.pet, bestiary.favoritePet],
  )
  const selectedMountGroupId = entryGroupId(bestiary.mount, 'mountId')
  const mountGearOptions = useMemo(
    () => selectedMountGroupId
      ? allMountGearOptions.filter((option) => entryGroupId(option, 'mountId') === selectedMountGroupId)
      : [],
    [allMountGearOptions, selectedMountGroupId],
  )
  const selectedMountId = bestiary.mount?.id ?? ''
  const selectedGearId = bestiary.mountBag?.id ?? ''
  const selectedPetId = bestiary.pet?.id ?? ''

  const handleMountChange = (mountId: string) => {
    const mount = mountOptions.find((option) => option.id === mountId) ?? null
    const mountGroupId = entryGroupId(mount, 'mountId')
    const nextGear = mountGroupId
      ? allMountGearOptions.find((option) => entryGroupId(option, 'mountId') === mountGroupId) ?? null
      : null
    onBestiaryChange?.({ mount, mountBag: nextGear })
  }

  const handleGearChange = (gearId: string) => {
    const mountBag = gearId ? mountGearOptions.find((option) => option.id === gearId) ?? null : null
    onBestiaryChange?.({ mountBag })
  }

  const handlePetChange = (petId: string) => {
    const pet = petId ? petOptions.find((option) => option.id === petId) ?? null : null
    onBestiaryChange?.({ pet })
  }

  return (
    <div className="w-full space-y-5 animate-fade-in">
      <header className="border-b border-gold-900/10 pb-4">
        <h3 className="font-serif text-2xl font-bold text-parchment-100">Character Stable</h3>
        <p className="mt-1 text-sm text-text-muted">
          Persistent companions, mount choice, and carried mount gear.
        </p>
      </header>

      <div className="grid grid-cols-1 gap-3 lg:grid-cols-3">
        <label className="block rounded-md border border-gold-900/18 bg-black/10 p-3">
          <span className="block text-[9px] font-bold uppercase tracking-[0.18em] text-gold-500/70">Mount</span>
          <select
            aria-label="Mount"
            value={selectedMountId}
            onChange={(event) => handleMountChange(event.target.value)}
            disabled={!onBestiaryChange || mountOptions.length === 0}
            title="Change mount"
            className="mt-2 w-full rounded-md border border-gold-900/22 bg-black/22 px-2.5 py-2 text-sm text-parchment-100 focus:border-gold-500/45 focus:outline-none disabled:cursor-not-allowed disabled:opacity-60"
          >
            <option value="">No mount</option>
            {mountOptions.map((option) => (
              <option key={option.id} value={option.id}>{option.name}</option>
            ))}
          </select>
          {bestiary.favoriteMount ? (
            <FavoriteLine
              ariaLabel="Favorite mount"
              name={bestiary.favoriteMount.name}
              onSelect={onBestiaryChange ? () => handleMountChange(bestiary.favoriteMount?.id ?? '') : undefined}
            />
          ) : null}
        </label>

        <label className="block rounded-md border border-gold-900/18 bg-black/10 p-3">
          <span className="block text-[9px] font-bold uppercase tracking-[0.18em] text-gold-500/70">Mount gear</span>
          <select
            aria-label="Mount gear"
            value={selectedGearId}
            onChange={(event) => handleGearChange(event.target.value)}
            disabled={!onBestiaryChange || mountGearOptions.length === 0}
            title="Change mount gear"
            className="mt-2 w-full rounded-md border border-gold-900/22 bg-black/22 px-2.5 py-2 text-sm text-parchment-100 focus:border-gold-500/45 focus:outline-none disabled:cursor-not-allowed disabled:opacity-60"
          >
            <option value="">No mount gear</option>
            {mountGearOptions.map((option) => (
              <option key={option.id} value={option.id}>{option.name}</option>
            ))}
          </select>
        </label>

        <label className="block rounded-md border border-gold-900/18 bg-black/10 p-3">
          <span className="block text-[9px] font-bold uppercase tracking-[0.18em] text-gold-500/70">Pet</span>
          <select
            aria-label="Pet"
            value={selectedPetId}
            onChange={(event) => handlePetChange(event.target.value)}
            disabled={!onBestiaryChange || petOptions.length === 0}
            title="Change pet"
            className="mt-2 w-full rounded-md border border-gold-900/22 bg-black/22 px-2.5 py-2 text-sm text-parchment-100 focus:border-gold-500/45 focus:outline-none disabled:cursor-not-allowed disabled:opacity-60"
          >
            <option value="">No pet</option>
            {petOptions.map((option) => (
              <option key={option.id} value={option.id}>{option.name}</option>
            ))}
          </select>
          {bestiary.favoritePet ? (
            <FavoriteLine
              ariaLabel="Favorite pet"
              name={bestiary.favoritePet.name}
              onSelect={onBestiaryChange ? () => handlePetChange(bestiary.favoritePet?.id ?? '') : undefined}
            />
          ) : null}
        </label>
      </div>

      <div className="space-y-4">
        <CategoryDisclosure title="Mount" detail={mountOptions.length ? `${mountOptions.length} owned` : '0 owned'} defaultOpen>
          <CompanionCard
            entry={bestiary.mount}
            empty="No mount is assigned to this character."
            iconLabel="M"
            metrics={mountMetrics(bestiary.mount)}
          />
        </CategoryDisclosure>

        <CategoryDisclosure title="Mount Gear" detail={allMountGearOptions.length ? `${allMountGearOptions.length} owned` : '0 owned'} defaultOpen={Boolean(bestiary.mountBag)}>
          <CompanionCard
            entry={bestiary.mountBag}
            empty="No mount gear is equipped."
            iconLabel="G"
            metrics={gearMetrics(bestiary.mountBag)}
          />
        </CategoryDisclosure>

        <CategoryDisclosure title="Pet Companion" detail={petOptions.length ? `${petOptions.length} bonded` : '0 bonded'} defaultOpen={Boolean(bestiary.pet)}>
          <CompanionCard
            entry={bestiary.pet}
            empty="No pet companion is bonded to this character."
            iconLabel="P"
            metrics={petMetrics(bestiary.pet)}
          />
        </CategoryDisclosure>
      </div>
    </div>
  )
}
