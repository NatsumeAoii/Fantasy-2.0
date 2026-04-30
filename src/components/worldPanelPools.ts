import { CUSTOMS, DEITIES, FACTIONS, HISTORICAL_TIMEFRAMES, LANDMARKS, LANGUAGES, RACE_REGIONS, REGION_GUILDS } from '../data/world'
import type { Custom, CustomVariation, Deity, HistoricalEra, Landmark, Language } from '../data/world'
import { WORLD_CONFIG } from '../config'
import type { Character, GeneratedPoolEntry } from '../types'

const NONE_VALUE = 'None'
const { POOL_LIMITS } = WORLD_CONFIG.ATLAS

type CountRange = {
  min: number
  max: number
}

export interface NamedPoolItem {
  id: string
  name: string
  detail?: string
  isCurrent?: boolean
}

export interface FactionPoolItem {
  name: string
  territories: string[]
  isCurrent: boolean
  isRegionLinked: boolean
  isGuildLinked: boolean
}

export type CustomPoolItem = Omit<Custom, 'variations'> & {
  associatedGroups: string[]
  variations: CustomVariation[]
}

export type HistoricalEraPoolItem = HistoricalEra & {
  timeframeName: string
  timeframeRange: string
  isCurrent: boolean
}

export interface WorldPanelPools {
  homeRegions: NamedPoolItem[]
  regionGuilds: NamedPoolItem[]
  factions: FactionPoolItem[]
  languages: Language[]
  customs: CustomPoolItem[]
  deities: Deity[]
  history: HistoricalEraPoolItem[]
  landmarks: Landmark[]
}

function hasValue(value: string | undefined): value is string {
  return Boolean(value && value !== NONE_VALUE)
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

function seededRatio(seed: string, key: string): number {
  return score(seed, key) / 0xffffffff
}

function seededCount(seed: string, key: string, range: CountRange): number {
  const min = Math.max(0, Math.floor(range.min))
  const max = Math.max(min, Math.floor(range.max))
  const span = max - min + 1

  return min + (score(seed, key) % span)
}

function resolveByLevel<T extends { maxLevel: number }>(entries: readonly T[], level: number): T {
  return entries.find((entry) => level <= entry.maxLevel) ?? entries[entries.length - 1]
}

function identitySeed(character: Character): string {
  return [character.id, character.name, character.race, character.role, character.region, character.guild, character.faction].join('|')
}

function toGroups(value: string | string[]): string[] {
  return Array.isArray(value) ? value : [value]
}

function uniqueBy<T>(items: T[], getKey: (item: T) => string): T[] {
  const seen = new Set<string>()

  return items.filter((item) => {
    const key = getKey(item)
    if (seen.has(key)) return false
    seen.add(key)
    return true
  })
}

function seededSlice<T>(items: T[], seed: string, limit: number, getKey: (item: T) => string, pinned: T[] = []): T[] {
  const pinnedItems = uniqueBy(pinned, getKey).slice(0, limit)
  const pinnedKeys = new Set(pinnedItems.map(getKey))
  const remainingItems = uniqueBy(items, getKey)
    .filter((item) => !pinnedKeys.has(getKey(item)))
    .sort((left, right) => score(seed, getKey(left)) - score(seed, getKey(right)) || getKey(left).localeCompare(getKey(right)))

  return [...pinnedItems, ...remainingItems].slice(0, limit)
}

function namedItem(name: string, detail?: string, isCurrent = false): NamedPoolItem {
  return {
    id: slugify(name),
    name,
    detail,
    isCurrent,
  }
}

function matchesGeneratedEntry(entry: GeneratedPoolEntry | null | undefined, idOrName: string): boolean {
  if (!entry) return false
  const normalized = normalize(idOrName)

  return normalize(entry.id) === normalized || normalize(entry.name) === normalized || slugify(entry.name) === normalized || slugify(entry.name) === slugify(idOrName)
}

function buildHomeRegions(character: Character, seed: string): NamedPoolItem[] {
  const raceRegions = RACE_REGIONS[character.race] ?? []
  const regionNames = hasValue(character.region) ? [character.region, ...raceRegions] : raceRegions
  const regions = uniqueBy(regionNames, (region) => region).map((region) =>
    namedItem(region, region === character.region ? 'Current region' : `${character.race} homeland`, region === character.region),
  )
  const pinned = regions.filter((region) => region.isCurrent)

  return seededSlice(regions, `${seed}:home-regions`, POOL_LIMITS.homeRegions, (region) => region.name, pinned)
}

function buildRegionGuilds(character: Character, seed: string): NamedPoolItem[] {
  const guildNames = (REGION_GUILDS[character.region] ?? []).filter((guild) => guild !== NONE_VALUE)
  const allGuilds = uniqueBy(hasValue(character.guild) ? [character.guild, ...guildNames] : guildNames, (guild) => guild).map((guild) =>
    namedItem(guild, guild === character.guild ? 'Current guild' : character.region, guild === character.guild),
  )
  const pinned = allGuilds.filter((guild) => guild.isCurrent)

  return seededSlice(allGuilds, `${seed}:region-guilds`, POOL_LIMITS.regionGuilds, (guild) => guild.name, pinned)
}

function buildFactions(character: Character, seed: string, homeRegions: NamedPoolItem[]): FactionPoolItem[] {
  const homeRegionNames = new Set(homeRegions.map((region) => region.name))
  const factions = Object.entries(FACTIONS).map(([name, territories]) => ({
    name,
    territories,
    isCurrent: hasValue(character.faction) && name === character.faction,
    isRegionLinked:
      (hasValue(character.region) && territories.includes(character.region)) ||
      territories.some((territory) => homeRegionNames.has(territory)),
    isGuildLinked: hasValue(character.guild) && territories.includes(character.guild),
  }))
  const relatedFactions = factions.filter((faction) => faction.isCurrent || faction.isGuildLinked || faction.isRegionLinked)
  const pinned = factions.filter((faction) => faction.isCurrent)

  return seededSlice(relatedFactions.length > 0 ? relatedFactions : factions, `${seed}:factions`, POOL_LIMITS.factions, (faction) => faction.name, pinned)
}

function buildLanguages(character: Character, seed: string): Language[] {
  const generatedLanguages = character.world.languages
  const pinned = LANGUAGES.filter((language) => generatedLanguages.some((entry) => matchesGeneratedEntry(entry, language.id) || matchesGeneratedEntry(entry, language.name)))
  const candidates = LANGUAGES.filter(
    (language) =>
      pinned.includes(language) ||
      language.type === 'Common' ||
      language.speakers.includes(character.race) ||
      language.speakers.includes(character.faction) ||
      language.speakers.includes(character.guild),
  )

  return seededSlice(candidates.length > 0 ? candidates : LANGUAGES, `${seed}:languages`, POOL_LIMITS.languages, (language) => language.id, pinned)
}

function buildCustoms(character: Character, seed: string): CustomPoolItem[] {
  const customs = CUSTOMS.map((custom) => ({
    ...custom,
    associatedGroups: toGroups(custom.associatedRaceOrFaction),
    variations: seededSlice(custom.variations, `${seed}:custom:${custom.type}:${toGroups(custom.associatedRaceOrFaction).join('|')}`, POOL_LIMITS.customVariations, (variation) => variation.name),
  }))
  const candidates = customs.filter((custom) =>
    custom.associatedGroups.some(
      (group) => group === character.race || group === character.region || group === character.guild || group === character.faction,
    ),
  )
  const generatedNames = new Set(character.world.customs.map((entry) => normalize(entry.name)))
  const pinned = customs.filter((custom) => custom.variations.some((variation) => generatedNames.has(normalize(variation.name))))

  return seededSlice(candidates.length > 0 ? candidates : customs, `${seed}:customs`, POOL_LIMITS.customs, (custom) => `${custom.type}:${custom.associatedGroups.join('|')}`, pinned)
}

function buildDeities(character: Character, seed: string): Deity[] {
  const pinned = DEITIES.filter((deity) => matchesGeneratedEntry(character.world.deity, deity.id) || matchesGeneratedEntry(character.world.deity, deity.name))
  const candidates = DEITIES.filter(
    (deity) =>
      pinned.includes(deity) ||
      deity.favoredRaces.includes(character.race) ||
      deity.favoredRoles.includes(character.role),
  )

  return seededSlice(candidates.length > 0 ? candidates : DEITIES, `${seed}:deities`, POOL_LIMITS.deities, (deity) => deity.id, pinned)
}

function buildHistory(character: Character, seed: string): HistoricalEraPoolItem[] {
  const latestTimeframe = HISTORICAL_TIMEFRAMES.at(-1)
  const latestEra = latestTimeframe?.eras.at(-1)
  const sourceReveal = resolveByLevel(WORLD_CONFIG.HISTORY.SOURCE_REVEAL_BY_LEVEL, character.level)
  const eras = HISTORICAL_TIMEFRAMES.flatMap((timeframe) =>
    timeframe.eras.map((era) => {
      const eraKey = `${timeframe.timeframeName}:${era.eraName}`
      const sourceCountRange = seededRatio(seed, `${eraKey}:source-tier`) < sourceReveal.chance
        ? sourceReveal.count
        : sourceReveal.fallbackCount
      const sourceCount = seededCount(seed, `${eraKey}:source-count`, sourceCountRange)

      return {
        ...era,
        sources: seededSlice(era.sources, `${seed}:history-sources:${eraKey}`, sourceCount, (source) => source.source),
        timeframeName: timeframe.timeframeName,
        timeframeRange: timeframe.timeframeRange,
        isCurrent: latestTimeframe?.timeframeName === timeframe.timeframeName && latestEra?.eraName === era.eraName,
      }
    }),
  )
  const pinned = eras.filter(
    (era) =>
      matchesGeneratedEntry(character.world.history, era.eraName) ||
      (character.world.history?.category ? normalize(character.world.history.category) === normalize(era.timeframeName) : false),
  )

  return seededSlice(eras, `${seed}:history`, POOL_LIMITS.history, (era) => `${era.timeframeName}:${era.eraName}`, pinned)
}

function buildLandmarks(character: Character, seed: string, homeRegions: NamedPoolItem[]): Landmark[] {
  const homeRegionNames = new Set(homeRegions.map((region) => region.name))
  const pinned = LANDMARKS.filter((landmark) => character.world.landmarks.some((entry) => matchesGeneratedEntry(entry, `landmark_${slugify(landmark.name)}`) || matchesGeneratedEntry(entry, landmark.name)))
  const candidates = LANDMARKS.filter(
    (landmark) =>
      pinned.includes(landmark) ||
      landmark.region === character.region ||
      homeRegionNames.has(landmark.region),
  )

  return seededSlice(candidates.length > 0 ? candidates : LANDMARKS, `${seed}:landmarks`, POOL_LIMITS.landmarks, (landmark) => `${landmark.name}:${landmark.region}`, pinned)
}

export function buildWorldPanelPools(character: Character): WorldPanelPools {
  const seed = identitySeed(character)
  const homeRegions = buildHomeRegions(character, seed)

  return {
    homeRegions,
    regionGuilds: buildRegionGuilds(character, seed),
    factions: buildFactions(character, seed, homeRegions),
    languages: buildLanguages(character, seed),
    customs: buildCustoms(character, seed),
    deities: buildDeities(character, seed),
    history: buildHistory(character, seed),
    landmarks: buildLandmarks(character, seed, homeRegions),
  }
}
