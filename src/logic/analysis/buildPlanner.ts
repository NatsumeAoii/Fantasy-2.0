/**
 * Build Planner — "What-if" simulation and level projection.
 *
 * Allows users to explore hypothetical scenarios:
 * - "What would my stats look like at level 500?"
 * - "What if I swapped my weapon for a staff?"
 * - "How does my build compare to an ideal tank?"
 *
 * All operations are pure — no state mutation. Returns projected
 * Character snapshots for comparison.
 */
import type { Character, Stats } from '../../types'
import { selectBuildArchetype, selectEffectivePowerRating } from './sharedSelectors'

// ============================================================
// Types
// ============================================================

export interface LevelProjection {
  level: number
  health: number
  mana: number
  attackPower: number
  magicPower: number
  defense: number
  powerRating: number
}

export interface BuildComparison {
  current: { archetype: string; powerRating: number; stats: Stats }
  projected: { archetype: string; powerRating: number; stats: Stats }
  deltas: Stats
}

export interface IdealBuildProfile {
  name: string
  description: string
  /** Stat weights (higher = more important for this build) */
  weights: Partial<Record<string, number>>
  /** How well the current character matches this ideal (0-100) */
  matchScore: number
}

// ============================================================
// Level Projection
// ============================================================

/**
 * Project what a character's key stats would look like at different levels.
 * Uses the same growth formulas as StatEngine but without re-rolling randomness.
 */
export function projectLevelCurve(character: Character, levels: number[]): LevelProjection[] {
  const currentLevel = character.level
  const { resource, combat, defensive } = character.stats

  const currentHealth = resource.health ?? 200
  const currentMana = resource.mana ?? 100
  const currentAttack = combat.attackPower ?? 0
  const currentMagic = combat.magicPower ?? 0
  const currentDefense = defensive.defense ?? 0

  return levels.map((targetLevel) => {
    const ratio = targetLevel / Math.max(currentLevel, 1)
    // Apply diminishing returns for very high level projections
    const scaleFactor = ratio <= 2 ? ratio : 2 + Math.sqrt(ratio - 2) * 0.5

    const health = Math.round(currentHealth * scaleFactor)
    const mana = Math.round(currentMana * scaleFactor)
    const attackPower = Math.round(currentAttack * scaleFactor)
    const magicPower = Math.round(currentMagic * scaleFactor)
    const defense = Math.round(currentDefense * scaleFactor)

    // Rough power rating projection
    const avgDps = (attackPower + magicPower) / 2
    const powerRating = Math.round(avgDps * 0.4 + health * 0.3 + defense * 0.15 + defense * 0.15)

    return { level: targetLevel, health, mana, attackPower, magicPower, defense, powerRating }
  })
}

/** Standard level milestones for projection charts. */
export const PROJECTION_MILESTONES = [1, 25, 50, 100, 250, 500, 1000, 3000, 5000, 9999]

// ============================================================
// Ideal Build Profiles
// ============================================================

const IDEAL_BUILDS: Omit<IdealBuildProfile, 'matchScore'>[] = [
  {
    name: 'Pure Tank',
    description: 'Maximum survivability — endurance and defense above all.',
    weights: { endurance: 3, strength: 1.5, resolve: 2, willpower: 1.5, agility: 0.5 },
  },
  {
    name: 'Glass Cannon',
    description: 'Maximum damage output at the cost of survivability.',
    weights: { strength: 3, dexterity: 2, agility: 1.5, intelligence: 1, endurance: 0.3 },
  },
  {
    name: 'Archmage',
    description: 'Pure magical power — intelligence and wisdom dominate.',
    weights: { intelligence: 3, wisdom: 2.5, willpower: 2, charisma: 1, strength: 0.3 },
  },
  {
    name: 'Shadow Operative',
    description: 'Stealth, speed, and precision — the unseen blade.',
    weights: { agility: 3, dexterity: 2.5, luck: 2, intelligence: 1, endurance: 0.5 },
  },
  {
    name: 'Paladin',
    description: 'Balanced warrior-healer with strong defenses and willpower.',
    weights: { strength: 2, endurance: 2, willpower: 2.5, wisdom: 2, charisma: 1.5 },
  },
  {
    name: 'Berserker',
    description: 'Raw physical power with reckless aggression.',
    weights: { strength: 3, endurance: 2, agility: 1.5, resolve: 1.5, wisdom: 0.3 },
  },
  {
    name: 'Diplomat',
    description: 'Social mastery — charisma and wisdom over brute force.',
    weights: { charisma: 3, wisdom: 2.5, intelligence: 2, luck: 1.5, strength: 0.5 },
  },
  {
    name: 'Battlemage',
    description: 'Balanced physical and magical combat capability.',
    weights: { intelligence: 2, strength: 2, willpower: 1.5, endurance: 1.5, dexterity: 1.5 },
  },
]

function calculateBuildMatch(character: Character, profile: Omit<IdealBuildProfile, 'matchScore'>): number {
  const stats = character.stats.base
  const values = Object.values(stats)
  if (values.length === 0) return 0

  const totalStats = values.reduce((sum, v) => sum + v, 0)
  if (totalStats === 0) return 0

  let weightedScore = 0
  let maxPossibleScore = 0

  for (const [stat, weight] of Object.entries(profile.weights)) {
    const statValue = stats[stat] ?? 0
    const normalizedValue = statValue / totalStats // Proportion of total
    weightedScore += normalizedValue * (weight ?? 1)
    maxPossibleScore += (weight ?? 1) / Object.keys(profile.weights).length
  }

  return Math.min(100, Math.round((weightedScore / Math.max(maxPossibleScore, 0.01)) * 100))
}

/** Evaluate how well a character matches each ideal build profile. */
export function evaluateBuildProfiles(character: Character): IdealBuildProfile[] {
  return IDEAL_BUILDS
    .map((profile) => ({
      ...profile,
      matchScore: calculateBuildMatch(character, profile),
    }))
    .sort((a, b) => b.matchScore - a.matchScore)
}

// ============================================================
// What-If Simulation
// ============================================================

/**
 * Simulate what happens if specific base stats are modified.
 * Returns a comparison between current and projected builds.
 */
export function simulateStatChange(character: Character, statDeltas: Partial<Stats>): BuildComparison {
  const currentStats = { ...character.stats.base }
  const projectedStats = { ...currentStats }

  for (const [stat, delta] of Object.entries(statDeltas)) {
    projectedStats[stat] = Math.max(0, (projectedStats[stat] ?? 0) + (delta ?? 0))
  }

  // Create a shallow projected character for analysis
  const projectedCharacter: Character = {
    ...character,
    stats: {
      ...character.stats,
      base: projectedStats,
    },
  }

  const deltas: Stats = {}
  for (const key of Object.keys(projectedStats)) {
    deltas[key] = (projectedStats[key] ?? 0) - (currentStats[key] ?? 0)
  }

  return {
    current: {
      archetype: selectBuildArchetype(character),
      powerRating: selectEffectivePowerRating(character),
      stats: currentStats,
    },
    projected: {
      archetype: selectBuildArchetype(projectedCharacter),
      powerRating: selectEffectivePowerRating(projectedCharacter),
      stats: projectedStats,
    },
    deltas,
  }
}

/** Get the closest matching ideal build for a character. */
export function getClosestBuild(character: Character): IdealBuildProfile {
  const profiles = evaluateBuildProfiles(character)
  return profiles[0]
}
