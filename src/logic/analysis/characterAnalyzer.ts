/**
 * Character Analyzer — Deep analysis engine for generated characters.
 *
 * Provides rich analytical data about a character's build quality,
 * strengths, weaknesses, and notable features. Used by the UI to
 * display insights, tooltips, and comparison data.
 *
 * This is a pure logic module (no state) — it operates on Character objects.
 */
import type { Character } from '../../types'
import { selectBuildArchetype, selectCombatStyle, selectEffectivePowerRating } from './sharedSelectors'

// ============================================================
// Types
// ============================================================

export interface StatAnalysis {
  name: string
  value: number
  /** Percentile relative to the stat's theoretical range at this level */
  percentile: number
  /** Whether this stat is notably high or low for the character's role */
  isStrength: boolean
  isWeakness: boolean
}

export interface BuildStrength {
  label: string
  description: string
  /** 1-5 rating of how impactful this strength is */
  magnitude: number
}

export interface BuildWeakness {
  label: string
  description: string
  /** Suggested mitigation */
  suggestion: string
}

export interface EquipmentGap {
  slot: string
  label: string
  impact: 'critical' | 'moderate' | 'minor'
}

export interface CharacterAnalysis {
  powerRating: number
  archetype: string
  combatStyle: string
  level: number

  /** Stat breakdown with percentiles */
  statAnalysis: StatAnalysis[]
  /** Identified build strengths */
  strengths: BuildStrength[]
  /** Identified build weaknesses */
  weaknesses: BuildWeakness[]
  /** Missing equipment that would improve the build */
  equipmentGaps: EquipmentGap[]
  /** Overall build quality score (0-100) */
  buildQuality: number
  /** Narrative flavor text describing the build */
  buildSummary: string
}

// ============================================================
// Analysis Functions
// ============================================================

function analyzeStats(character: Character): StatAnalysis[] {
  const stats = character.stats.base
  const entries = Object.entries(stats)
  if (entries.length === 0) return []

  const max = Math.max(...entries.map(([, v]) => v))
  const min = Math.min(...entries.map(([, v]) => v))
  const range = Math.max(max - min, 1)
  const avg = entries.reduce((sum, [, v]) => sum + v, 0) / entries.length

  return entries.map(([name, value]) => ({
    name: name.replace(/([A-Z])/g, ' $1').trim(),
    value,
    percentile: Math.round(((value - min) / range) * 100),
    isStrength: value > avg * 1.3,
    isWeakness: value < avg * 0.7,
  }))
}

function identifyStrengths(character: Character): BuildStrength[] {
  const strengths: BuildStrength[] = []
  const { base, combat, defensive, resource } = character.stats

  // High health pool
  if ((resource.health ?? 0) > character.level * 80) {
    strengths.push({
      label: 'Exceptional Vitality',
      description: 'Health pool far exceeds level expectations.',
      magnitude: 4,
    })
  }

  // High crit chance
  if ((combat.critChance ?? 0) > 30) {
    strengths.push({
      label: 'Deadly Precision',
      description: 'Critical strike chance is dangerously high.',
      magnitude: 3,
    })
  }

  // High evasion
  if ((defensive.evasion ?? 0) > (defensive.defense ?? 0) * 1.5) {
    strengths.push({
      label: 'Untouchable',
      description: 'Evasion-focused defense makes this character hard to hit.',
      magnitude: 3,
    })
  }

  // Many skills
  if (character.skills.length > 20) {
    strengths.push({
      label: 'Vast Repertoire',
      description: `Commands ${character.skills.length} techniques — a true master of many arts.`,
      magnitude: 4,
    })
  }

  // High-rank skills
  const eliteSkills = character.skills.filter((s) =>
    ['Legendary', 'Mythic', 'EX', 'SSSS', 'SSS'].includes(s.rank),
  )
  if (eliteSkills.length > 0) {
    strengths.push({
      label: 'Legendary Techniques',
      description: `Possesses ${eliteSkills.length} skill(s) of legendary rank or higher.`,
      magnitude: 5,
    })
  }

  // Balanced stats
  const values = Object.values(base)
  const max = Math.max(...values)
  const min = Math.min(...values)
  if (max / Math.max(min, 1) < 1.5 && character.level > 50) {
    strengths.push({
      label: 'Well-Rounded',
      description: 'No glaring weaknesses — adaptable to any situation.',
      magnitude: 2,
    })
  }

  return strengths.sort((a, b) => b.magnitude - a.magnitude)
}

function identifyWeaknesses(character: Character): BuildWeakness[] {
  const weaknesses: BuildWeakness[] = []
  const { base, defensive, resource } = character.stats

  // Low health for level
  if ((resource.health ?? 0) < character.level * 30 && character.level > 10) {
    weaknesses.push({
      label: 'Fragile Constitution',
      description: 'Health pool is dangerously low for this level.',
      suggestion: 'Prioritize endurance-boosting equipment or consumables.',
    })
  }

  // No magic resist
  if ((defensive.magicResist ?? 0) < (defensive.defense ?? 0) * 0.3) {
    weaknesses.push({
      label: 'Vulnerable to Magic',
      description: 'Magic resistance is far below physical defense.',
      suggestion: 'Seek enchantments or accessories with magic resistance.',
    })
  }

  // Very low agility
  const avg = Object.values(base).reduce((s, v) => s + v, 0) / Object.values(base).length
  if ((base.agility ?? 0) < avg * 0.5) {
    weaknesses.push({
      label: 'Sluggish',
      description: 'Agility is well below average — slow to react.',
      suggestion: 'Light armor and agility-boosting accessories would help.',
    })
  }

  // Overweight
  const { current, max } = character.inventory.weight
  if (max > 0 && current / max > 0.9) {
    weaknesses.push({
      label: 'Overburdened',
      description: 'Carrying capacity is nearly maxed out.',
      suggestion: 'Drop heavy items or equip a larger backpack.',
    })
  }

  return weaknesses
}

function findEquipmentGaps(character: Character): EquipmentGap[] {
  const gaps: EquipmentGap[] = []
  const eq = character.inventory.equipment

  const criticalSlots: [string, string][] = [
    ['BODY', 'Body Armor'],
    ['MAIN_HAND', 'Main Weapon'],
  ]
  const moderateSlots: [string, string][] = [
    ['HEAD', 'Helmet'],
    ['BACK', 'Backpack'],
    ['FEET', 'Boots'],
  ]
  const minorSlots: [string, string][] = [
    ['RING', 'Ring'],
    ['NECK', 'Necklace'],
    ['BELT', 'Belt Pouch'],
  ]

  for (const [slot, label] of criticalSlots) {
    if (!eq[slot as keyof typeof eq]) {
      gaps.push({ slot, label, impact: 'critical' })
    }
  }
  for (const [slot, label] of moderateSlots) {
    if (!eq[slot as keyof typeof eq]) {
      gaps.push({ slot, label, impact: 'moderate' })
    }
  }
  for (const [slot, label] of minorSlots) {
    if (!eq[slot as keyof typeof eq]) {
      gaps.push({ slot, label, impact: 'minor' })
    }
  }

  return gaps
}

function calculateBuildQuality(character: Character, analysis: Omit<CharacterAnalysis, 'buildQuality' | 'buildSummary'>): number {
  let score = 50 // Base score

  // Strengths add points
  score += analysis.strengths.reduce((sum, s) => sum + s.magnitude * 3, 0)

  // Weaknesses subtract points
  score -= analysis.weaknesses.length * 8

  // Equipment gaps subtract
  score -= analysis.equipmentGaps.filter((g) => g.impact === 'critical').length * 15
  score -= analysis.equipmentGaps.filter((g) => g.impact === 'moderate').length * 5

  // Level bonus (higher level characters tend to be more complete)
  score += Math.min(character.level / 50, 20)

  // Skill count bonus
  score += Math.min(character.skills.length, 15)

  return Math.max(0, Math.min(100, Math.round(score)))
}

function generateBuildSummary(character: Character, archetype: string, combatStyle: string): string {
  const level = character.level
  const tierLabel = level >= 3000 ? 'godlike' : level >= 500 ? 'legendary' : level >= 100 ? 'veteran' : level >= 50 ? 'seasoned' : 'fledgling'

  return `A ${tierLabel} ${character.race} ${character.role} who fights as a ${combatStyle} ${archetype.toLowerCase()}. ` +
    `${character.skills.length} techniques mastered across ${character.titles.length} earned titles.`
}

// ============================================================
// Public API
// ============================================================

/** Perform a full analysis of a character's build. */
export function analyzeCharacter(character: Character): CharacterAnalysis {
  const archetype = selectBuildArchetype(character)
  const combatStyle = selectCombatStyle(character)
  const powerRating = selectEffectivePowerRating(character)
  const statAnalysis = analyzeStats(character)
  const strengths = identifyStrengths(character)
  const weaknesses = identifyWeaknesses(character)
  const equipmentGaps = findEquipmentGaps(character)

  const partial = {
    powerRating,
    archetype,
    combatStyle,
    level: character.level,
    statAnalysis,
    strengths,
    weaknesses,
    equipmentGaps,
  }

  return {
    ...partial,
    buildQuality: calculateBuildQuality(character, partial),
    buildSummary: generateBuildSummary(character, archetype, combatStyle),
  }
}

/** Quick power comparison between two characters. */
export function compareCharacters(a: Character, b: Character) {
  const analysisA = analyzeCharacter(a)
  const analysisB = analyzeCharacter(b)

  return {
    left: analysisA,
    right: analysisB,
    powerDelta: analysisA.powerRating - analysisB.powerRating,
    qualityDelta: analysisA.buildQuality - analysisB.buildQuality,
    winner: analysisA.powerRating > analysisB.powerRating ? 'left' as const : 'right' as const,
  }
}
