import { WORLD_CONFIG } from '../config'
import { CUSTOMS, DEITIES, HISTORICAL_TIMEFRAMES, LANDMARKS, LANGUAGES } from '../data/world'
import type { CharacterCore, GeneratedPoolEntry, GeneratedWorldContext } from '../types'
import { entry, listIncludes, matchesAssociation, pickVariant, resolveChance, resolveCount, slugify } from './ExpansionUtils'
import { PoolEngine } from './PoolEngine'

function languageWeight(language: (typeof LANGUAGES)[number], character: CharacterCore): number {
  if (listIncludes(character.race, language.speakers)) return 8
  if (language.type === 'Common') return 4
  if (language.learnable) return 1.5
  return 0.25
}

function normalizeLanguage(language: (typeof LANGUAGES)[number]): GeneratedPoolEntry {
  return entry({
    id: language.id,
    name: language.name,
    category: language.type,
    description: language.description,
    metadata: {
      script: language.script,
      difficulty: language.difficulty,
      learnable: language.learnable,
    },
  })
}

function normalizeDeity(deity: (typeof DEITIES)[number]): GeneratedPoolEntry {
  return entry({
    id: deity.id,
    name: deity.name,
    category: deity.alignment,
    tier: deity.tier,
    description: deity.description,
    metadata: {
      domains: deity.domains.join(', '),
      symbol: deity.symbol,
    },
  })
}

function normalizeCustom(custom: (typeof CUSTOMS)[number]): GeneratedPoolEntry {
  const variant = pickVariant(custom.variations)
  return entry({
    id: `custom_${slugify(custom.type)}_${slugify(variant?.name ?? 'variation')}`,
    name: variant?.name ?? custom.type,
    category: custom.type,
    description: variant?.description,
    variant,
  })
}

function normalizeLandmark(landmark: (typeof LANDMARKS)[number]): GeneratedPoolEntry {
  return entry({
    id: `landmark_${slugify(landmark.name)}`,
    name: landmark.name,
    category: landmark.type,
    tier: landmark.dangerLevel,
    description: landmark.description,
    metadata: { region: landmark.region },
  })
}

function pickHistory(level: number): GeneratedPoolEntry | null {
  if (!PoolEngine.rollChance(resolveChance(WORLD_CONFIG.HISTORY.CHANCE_BY_LEVEL, level))) return null

  const timeframe = PoolEngine.pickWeighted(HISTORICAL_TIMEFRAMES)
  const era = timeframe ? PoolEngine.pickWeighted(timeframe.eras) : undefined
  const source = era ? PoolEngine.pickWeighted(era.sources) : undefined

  if (!timeframe || !era) return null

  return entry({
    id: `history_${slugify(timeframe.timeframeName)}_${slugify(era.eraName)}`,
    name: era.eraName,
    category: timeframe.timeframeName,
    description: source?.text ?? era.description,
    metadata: {
      timeframeRange: timeframe.timeframeRange,
      yearRange: era.yearRange,
      source: source?.source,
      keyEvents: era.keyEvents.join(', '),
    },
  })
}

export const WorldEngine = {
  generate(character: CharacterCore): GeneratedWorldContext {
    const languageCount = resolveCount(WORLD_CONFIG.LANGUAGES.COUNT_BY_LEVEL, character.level)
    const languages = PoolEngine
      .pickManyWeighted(LANGUAGES, languageCount, (language) => languageWeight(language, character))
      .map(normalizeLanguage)

    const deityCandidates = DEITIES.filter(
      (deity) => listIncludes(character.race, deity.favoredRaces) || listIncludes(character.role, deity.favoredRoles),
    )
    const deity = PoolEngine.rollChance(resolveChance(WORLD_CONFIG.DEITIES.CHANCE_BY_LEVEL, character.level))
      ? PoolEngine.pickWeighted(deityCandidates, undefined) ?? PoolEngine.pickWeighted(DEITIES)
      : null

    const customCandidates = CUSTOMS.filter(
      (custom) =>
        matchesAssociation(character.race, custom.associatedRaceOrFaction) ||
        matchesAssociation(character.guild, custom.associatedRaceOrFaction) ||
        matchesAssociation(character.faction, custom.associatedRaceOrFaction),
    )
    const customs = PoolEngine
      .pickManyWeighted(
        customCandidates,
        resolveCount(WORLD_CONFIG.CUSTOMS.COUNT_BY_LEVEL, character.level),
        undefined,
        { fallbackPool: CUSTOMS },
      )
      .map(normalizeCustom)

    const landmarkCandidates = LANDMARKS.filter((landmark) => landmark.region === character.region)
    const landmarks = PoolEngine
      .pickManyWeighted(
        landmarkCandidates,
        resolveCount(WORLD_CONFIG.LANDMARKS.COUNT_BY_LEVEL, character.level),
        undefined,
        { fallbackPool: LANDMARKS },
      )
      .map(normalizeLandmark)

    return {
      languages,
      deity: deity ? normalizeDeity(deity) : null,
      customs,
      landmarks,
      history: pickHistory(character.level),
    }
  },
}
