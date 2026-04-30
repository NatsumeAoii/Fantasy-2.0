import { IDENTITY_CONFIG } from '../config'
import { BONDS, PSYCHOLOGICAL_TRAITS, QUIRKS, SECRETS } from '../data/identity'
import type { BondDef, PsychologicalTrait, Quirk, Secret } from '../data/identity'
import type { VariantDef } from '../data/inventory/types'
import type { Character, GeneratedPoolEntry } from '../types'

const { POOL_LIMITS } = IDENTITY_CONFIG.ATLAS

type IdentityPoolItem<T extends { variants: readonly VariantDef[] }> = Omit<T, 'variants'> & {
  variants: VariantDef[]
  isKnown: boolean
}

export type IdentityBondPoolItem = IdentityPoolItem<BondDef>
export type IdentityQuirkPoolItem = IdentityPoolItem<Quirk>
export type IdentitySecretPoolItem = IdentityPoolItem<Secret>
export type IdentityPsychologyPoolItem = IdentityPoolItem<PsychologicalTrait>

export interface IdentityPanelPools {
  bonds: IdentityBondPoolItem[]
  quirks: IdentityQuirkPoolItem[]
  secrets: IdentitySecretPoolItem[]
  psychologicalTraits: IdentityPsychologyPoolItem[]
}

function normalize(value: string): string {
  return value.trim().toLowerCase()
}

function slugify(value: string): string {
  return normalize(value).replace(/[^a-z0-9]+/g, '_').replace(/^_+|_+$/g, '')
}

function hashString(value: string): number {
  let hash = 2166136261

  for (let index = 0; index < value.length; index += 1) {
    hash ^= value.charCodeAt(index)
    hash = Math.imul(hash, 16777619)
  }

  return hash >>> 0
}

function score(seed: string, key: string): number {
  return hashString(`${seed}:${key}`)
}

function identitySeed(character: Character): string {
  return [character.id, character.name, character.level, character.race, character.role, character.region, character.guild, character.faction].join('|')
}

function uniqueBy<T>(items: readonly T[], getKey: (item: T) => string): T[] {
  const seen = new Set<string>()

  return items.filter((item) => {
    const key = getKey(item)
    if (seen.has(key)) return false
    seen.add(key)
    return true
  })
}

function seededSlice<T>(items: readonly T[], seed: string, limit: number, getKey: (item: T) => string, pinned: readonly T[] = []): T[] {
  const pinnedItems = uniqueBy(pinned, getKey).slice(0, limit)
  const pinnedKeys = new Set(pinnedItems.map(getKey))
  const remainingItems = uniqueBy(items, getKey)
    .filter((item) => !pinnedKeys.has(getKey(item)))
    .sort((left, right) => score(seed, getKey(left)) - score(seed, getKey(right)) || getKey(left).localeCompare(getKey(right)))

  return [...pinnedItems, ...remainingItems].slice(0, limit)
}

function matchesGeneratedEntry(entry: GeneratedPoolEntry | null | undefined, idOrName: string): boolean {
  if (!entry) return false
  const normalized = normalize(idOrName)

  return normalize(entry.id) === normalized || normalize(entry.name) === normalized || slugify(entry.name) === normalized || slugify(entry.name) === slugify(idOrName)
}

function isKnown(item: { id: string; name: string }, generatedEntries: readonly GeneratedPoolEntry[]): boolean {
  return generatedEntries.some((entry) => matchesGeneratedEntry(entry, item.id) || matchesGeneratedEntry(entry, item.name))
}

function knownVariantNames(item: { id: string; name: string }, generatedEntries: readonly GeneratedPoolEntry[]): Set<string> {
  const names = generatedEntries
    .filter((entry) => matchesGeneratedEntry(entry, item.id) || matchesGeneratedEntry(entry, item.name))
    .map((entry) => entry.variant?.name)
    .filter((name): name is string => Boolean(name))

  return new Set(names.map(normalize))
}

function revealVariants<T extends { id: string; name: string; variants: readonly VariantDef[] }>(
  item: T,
  generatedEntries: readonly GeneratedPoolEntry[],
  seed: string,
): VariantDef[] {
  const knownNames = knownVariantNames(item, generatedEntries)
  const pinned = item.variants.filter((variant) => knownNames.has(normalize(variant.name)))

  return seededSlice(item.variants, `${seed}:variants:${item.id}`, POOL_LIMITS.variants, (variant) => variant.name, pinned)
}

function buildPool<T extends { id: string; name: string; variants: readonly VariantDef[] }>(
  items: readonly T[],
  generatedEntries: readonly GeneratedPoolEntry[],
  seed: string,
  limit: number,
): IdentityPoolItem<T>[] {
  const pinned = items.filter((item) => isKnown(item, generatedEntries))

  return seededSlice(items, seed, limit, (item) => item.id, pinned).map((item) => ({
    ...item,
    variants: revealVariants(item, generatedEntries, seed),
    isKnown: isKnown(item, generatedEntries),
  }))
}

export function buildIdentityPanelPools(character: Character): IdentityPanelPools {
  const seed = identitySeed(character)

  return {
    bonds: buildPool(BONDS, character.identity.bonds, `${seed}:bonds`, POOL_LIMITS.bonds),
    quirks: buildPool(QUIRKS, character.identity.quirks, `${seed}:quirks`, POOL_LIMITS.quirks),
    secrets: buildPool(SECRETS, character.identity.secrets, `${seed}:secrets`, POOL_LIMITS.secrets),
    psychologicalTraits: buildPool(PSYCHOLOGICAL_TRAITS, character.identity.psychologicalTraits, `${seed}:psychology`, POOL_LIMITS.psychologicalTraits),
  }
}
