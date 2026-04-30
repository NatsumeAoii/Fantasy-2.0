import { MECHANICS_CONFIG } from '../config'
import { ACHIEVEMENTS, AFFLICTIONS, CRIMES, FEATS, MARTIAL_ARTS } from '../data/mechanics'
import type { CharacterCore, GeneratedMechanics, GeneratedPoolEntry, Stats } from '../types'
import { entry, resolveChance, resolveCount, resolveTier, roleMatches } from './ExpansionUtils'
import { PoolEngine } from './PoolEngine'

function mergedStats(character: CharacterCore): Stats {
  return {
    ...character.stats.base,
    ...character.stats.resource,
    ...character.stats.combat,
    ...character.stats.defensive,
    ...character.stats.utility,
  }
}

function statValue(stats: Stats, statName: string): number {
  const normalized = statName.toLowerCase().replace(/\s+/g, '')
  const match = Object.entries(stats).find(([key]) => key.toLowerCase().replace(/\s+/g, '') === normalized)
  return match?.[1] ?? 0
}

function meetsPrerequisite(prerequisite: string | null, character: CharacterCore): boolean {
  if (!prerequisite) return true

  const statMatch = prerequisite.match(/\b([A-Za-z]+)\s+(\d+)/i)
  if (!statMatch) return true

  const [, statName, requiredValue] = statMatch
  return statValue(mergedStats(character), statName) >= Number(requiredValue)
}

function normalizeFeat(feat: (typeof FEATS)[number]): GeneratedPoolEntry {
  return entry({
    id: feat.id,
    name: feat.name,
    category: feat.type,
    tier: feat.tier,
    description: feat.benefit,
    benefit: feat.benefit,
    metadata: { prerequisite: feat.prerequisite },
  })
}

function normalizeAchievement(achievement: (typeof ACHIEVEMENTS)[number]): GeneratedPoolEntry {
  return entry({
    id: achievement.id,
    name: achievement.title,
    category: achievement.category,
    tier: achievement.tier,
    description: achievement.requirement,
    metadata: {
      renownReward: achievement.renownReward,
      baseXP: achievement.baseXP,
      baseGold: achievement.baseGold,
      hidden: achievement.hidden,
    },
  })
}

function normalizeAffliction(affliction: (typeof AFFLICTIONS)[number]): GeneratedPoolEntry {
  return entry({
    id: affliction.id,
    name: affliction.name,
    category: affliction.type,
    tier: affliction.severity,
    description: affliction.effect,
    effect: affliction.effect,
    metadata: { transmission: affliction.transmission, cure: affliction.cure },
  })
}

function normalizeCrime(crime: (typeof CRIMES)[number]): GeneratedPoolEntry {
  return entry({
    id: crime.id,
    name: crime.offense,
    category: crime.severity,
    description: crime.typicalPunishment,
    metadata: {
      bountyMin: crime.bountyMin,
      bountyMax: crime.bountyMax,
      detectionDifficulty: crime.detectionDifficulty,
    },
  })
}

function normalizeMartialArt(art: (typeof MARTIAL_ARTS)[number]): GeneratedPoolEntry {
  return entry({
    id: art.id,
    name: art.name,
    category: art.weaponFocus,
    description: art.description,
    benefit: art.technique,
    metadata: { stance: art.stance, technique: art.technique },
  })
}

export const MechanicsEngine = {
  generate(character: CharacterCore): GeneratedMechanics {
    const maxFeatTier = resolveTier(MECHANICS_CONFIG.FEATS.MAX_TIER_BY_LEVEL, character.level)
    const featCandidates = FEATS.filter((feat) => feat.tier <= maxFeatTier && meetsPrerequisite(feat.prerequisite, character))
    const feats = PoolEngine
      .pickManyWeighted(
        featCandidates,
        resolveCount(MECHANICS_CONFIG.FEATS.COUNT_BY_LEVEL, character.level),
        (feat) => maxFeatTier + 1 - feat.tier,
        { fallbackPool: FEATS.filter((feat) => feat.tier <= maxFeatTier) },
      )
      .map(normalizeFeat)

    const maxAchievementTier = Math.min(3, Math.max(1, maxFeatTier))
    const achievements = PoolEngine
      .pickManyWeighted(
        ACHIEVEMENTS.filter((achievement) => achievement.tier <= maxAchievementTier),
        resolveCount(MECHANICS_CONFIG.ACHIEVEMENTS.COUNT_BY_LEVEL, character.level),
        (achievement) => achievement.hidden ? 0.35 : 1,
        { fallbackPool: ACHIEVEMENTS },
      )
      .map(normalizeAchievement)

    const afflictions = PoolEngine.rollChance(resolveChance(MECHANICS_CONFIG.AFFLICTIONS.CHANCE_BY_LEVEL, character.level))
      ? PoolEngine.pickManyWeighted(AFFLICTIONS, 1, (affliction) => Math.max(1, 7 - affliction.severity)).map(normalizeAffliction)
      : []

    const crimes = PoolEngine.rollChance(resolveChance(MECHANICS_CONFIG.CRIMES.CHANCE_BY_LEVEL, character.level))
      ? PoolEngine.pickManyWeighted(CRIMES, 1, (crime) => crime.detectionDifficulty).map(normalizeCrime)
      : []

    const martialChance = roleMatches(character.role, MECHANICS_CONFIG.MARTIAL_ARTS.ROLE_KEYWORDS)
      ? 1
      : resolveChance(MECHANICS_CONFIG.MARTIAL_ARTS.CHANCE_BY_LEVEL, character.level)
    const martialArts = PoolEngine.rollChance(martialChance)
      ? PoolEngine.pickManyWeighted(MARTIAL_ARTS, 1).map(normalizeMartialArt)
      : []

    return { feats, achievements, afflictions, crimes, martialArts }
  },
}
