/**
 * Shared Selectors — Pure functions used by both the store and analysis engines.
 *
 * These live in the logic layer because they are pure computation over
 * Character objects. The store re-exports them for convenience so UI
 * components can use them with Zustand's selector pattern.
 *
 * Canonical location: src/logic/analysis/sharedSelectors.ts
 */
import type { Character } from '../../types'

// ============================================================
// Combat Selectors
// ============================================================

export function selectEffectivePowerRating(character: Character | null): number {
  if (!character) return 0
  const { combat, defensive } = character.stats
  const dps = combat.dps
  const avgDps = dps ? (dps.min + dps.max) / 2 : 0
  const defense = defensive.defense ?? 0
  const magicResist = defensive.magicResist ?? 0
  const health = character.stats.resource.health ?? 0

  // Weighted formula: offense contributes 40%, survivability 60%
  const offenseScore = avgDps * 0.4
  const survivalScore = (health * 0.3 + defense * 0.15 + magicResist * 0.15)

  return Math.round(offenseScore + survivalScore)
}

export function selectCombatStyle(character: Character | null): 'melee' | 'ranged' | 'caster' | 'hybrid' | 'unknown' {
  if (!character) return 'unknown'
  const { combat } = character.stats
  const attackPower = combat.attackPower ?? 0
  const magicPower = combat.magicPower ?? 0

  const mainWeapon = character.inventory.equipment.MAIN_HAND
  const isRanged = mainWeapon?.tags?.includes('2H') && (mainWeapon.defId === 'bow' || mainWeapon.defId === 'crossbow')

  if (isRanged) return 'ranged'
  if (magicPower > attackPower * 1.5) return 'caster'
  if (attackPower > magicPower * 1.5) return 'melee'
  return 'hybrid'
}

// ============================================================
// Build Archetype
// ============================================================

export type BuildArchetype =
  | 'Glass Cannon'
  | 'Tank'
  | 'Battlemage'
  | 'Rogue'
  | 'Support'
  | 'Generalist'
  | 'Berserker'
  | 'Spellsword'

export function selectBuildArchetype(character: Character | null): BuildArchetype {
  if (!character) return 'Generalist'

  const { base, combat, defensive, resource } = character.stats
  const str = base.strength ?? 0
  const agi = base.agility ?? 0
  const int = base.intelligence ?? 0
  const end = base.endurance ?? 0
  const wis = base.wisdom ?? 0
  const cha = base.charisma ?? 0

  const attackPower = combat.attackPower ?? 0
  const magicPower = combat.magicPower ?? 0
  const defense = defensive.defense ?? 0
  const health = resource.health ?? 0
  const evasion = defensive.evasion ?? 0

  // High offense, low defense
  if (attackPower > defense * 2 && health < 500) return 'Glass Cannon'
  // High defense, high health
  if (defense > attackPower && health > 1000 && end > str) return 'Tank'
  // High str + high offense + low defense
  if (str > int && attackPower > defense * 1.5 && end > agi) return 'Berserker'
  // High magic + high defense
  if (magicPower > attackPower && defense > magicPower * 0.5) return 'Battlemage'
  // Balanced magic + physical
  if (Math.abs(attackPower - magicPower) < attackPower * 0.3 && int > 50) return 'Spellsword'
  // High agility + evasion
  if (agi > str && evasion > defense) return 'Rogue'
  // High wisdom + charisma
  if (wis > str && cha > agi) return 'Support'

  return 'Generalist'
}
