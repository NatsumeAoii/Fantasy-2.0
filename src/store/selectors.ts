/**
 * Derived Selectors — Computed views over the character store.
 *
 * These are pure functions that derive display-ready data from
 * the raw Character object. They can be used with Zustand's
 * selector pattern for memoized subscriptions.
 *
 * Usage:
 *   const powerRating = useCharacterStore(selectEffectivePowerRating)
 *   const buildArchetype = useCharacterStore(selectBuildArchetype)
 */
import type { Character, Item, RankedItem } from '../types'

// Re-export shared selectors from their canonical location in the logic layer.
// These pure functions are used by both analysis engines and UI components.
export {
  selectEffectivePowerRating,
  selectCombatStyle,
  selectBuildArchetype,
  type BuildArchetype,
} from '../logic/analysis/sharedSelectors'

import { selectBuildArchetype } from '../logic/analysis/sharedSelectors'
import { selectEffectivePowerRating } from '../logic/analysis/sharedSelectors'
import { selectCombatStyle } from '../logic/analysis/sharedSelectors'

// ============================================================
// Stat Selectors
// ============================================================

export function selectTopStats(character: Character | null, count = 3): { name: string; value: number }[] {
  if (!character) return []
  return Object.entries(character.stats.base)
    .sort(([, a], [, b]) => b - a)
    .slice(0, count)
    .map(([name, value]) => ({ name: name.replace(/([A-Z])/g, ' $1').trim(), value }))
}

export function selectStatBalance(character: Character | null): 'balanced' | 'specialized' | 'hybrid' {
  if (!character) return 'balanced'
  const values = Object.values(character.stats.base)
  if (values.length === 0) return 'balanced'

  const max = Math.max(...values)
  const min = Math.min(...values)
  const ratio = max / Math.max(min, 1)

  if (ratio > 3) return 'specialized'
  if (ratio > 1.8) return 'hybrid'
  return 'balanced'
}

export function selectTotalStatPoints(character: Character | null): number {
  if (!character) return 0
  return Object.values(character.stats.base).reduce((sum, v) => sum + v, 0)
}

// ============================================================
// Inventory Selectors
// ============================================================

export function selectInventoryValue(character: Character | null): number {
  if (!character) return 0
  const { equipment, backpack } = character.inventory

  let total = 0
  for (const item of Object.values(equipment)) {
    if (item?.value) total += item.value
  }
  for (const item of backpack) {
    if (item.value) total += item.value
  }
  return total
}

export function selectEquipmentCompleteness(character: Character | null): number {
  if (!character) return 0
  const coreSlots = ['HEAD', 'BODY', 'HANDS', 'LEGS', 'FEET', 'MAIN_HAND', 'BACK'] as const
  const filled = coreSlots.filter((slot) => character.inventory.equipment[slot] != null).length
  return Math.round((filled / coreSlots.length) * 100)
}

export function selectRarityDistribution(character: Character | null): Record<string, number> {
  if (!character) return {}
  const dist: Record<string, number> = {}
  const allItems = [
    ...Object.values(character.inventory.equipment).filter(Boolean) as Item[],
    ...character.inventory.backpack,
  ]
  for (const item of allItems) {
    dist[item.rarity] = (dist[item.rarity] ?? 0) + 1
  }
  return dist
}

export function selectWeightUtilization(character: Character | null): number {
  if (!character) return 0
  const { current, max } = character.inventory.weight
  if (max <= 0) return 0
  return Math.round((current / max) * 100)
}

// ============================================================
// Identity & Lore Selectors
// ============================================================

export function selectIdentityRichness(character: Character | null): number {
  if (!character) return 0
  let score = 0
  score += character.identity.bonds.length * 2
  score += character.identity.quirks.length * 1.5
  score += character.identity.secrets.length * 3
  score += character.identity.psychologicalTraits.length * 2
  score += character.backstory.traits.length
  score += character.backstory.personality.length
  return Math.round(score)
}

export function selectSkillsByRank(character: Character | null): Map<string, RankedItem[]> {
  if (!character) return new Map()
  const grouped = new Map<string, RankedItem[]>()
  for (const skill of character.skills) {
    const existing = grouped.get(skill.rank) ?? []
    existing.push(skill)
    grouped.set(skill.rank, existing)
  }
  return grouped
}

export function selectHighestRankSkills(character: Character | null, count = 5): RankedItem[] {
  if (!character) return []
  // Skills are already sorted by rank in the generation pipeline
  return character.skills.slice(0, count)
}

// ============================================================
// Composite Selectors (combine multiple dimensions)
// ============================================================

/** Full character summary for display in history/comparison views. */
export function selectCharacterSummary(character: Character | null) {
  if (!character) return null

  return {
    name: character.name,
    race: character.race,
    role: character.role,
    level: character.level,
    age: character.age,
    region: character.region,
    archetype: selectBuildArchetype(character),
    powerRating: selectEffectivePowerRating(character),
    combatStyle: selectCombatStyle(character),
    statBalance: selectStatBalance(character),
    equipmentCompleteness: selectEquipmentCompleteness(character),
    inventoryValue: selectInventoryValue(character),
    identityRichness: selectIdentityRichness(character),
    topStats: selectTopStats(character),
    skillCount: character.skills.length,
    titleCount: character.titles.length,
  }
}
