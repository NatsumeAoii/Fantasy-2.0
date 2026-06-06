/**
 * Equipment Optimizer — Suggests optimal equipment arrangements.
 *
 * Analyzes the character's current loadout and backpack to suggest
 * better equipment configurations. Does NOT mutate state — returns
 * suggestions that the UI can present to the user.
 */
import type { Character, Inventory, Item, ItemSlot } from '../../types'
import { canEquipItemToSlot, getValidEquipmentSlots } from '../inventory/InventoryMoveEngine'

// ============================================================
// Types
// ============================================================

export interface EquipmentSuggestion {
  /** The item being suggested */
  item: Item
  /** Where it should go */
  targetSlot: ItemSlot
  /** What it would replace (null if slot is empty) */
  replacedItem: Item | null
  /** Why this is better */
  reason: string
  /** Estimated improvement score (higher = better) */
  improvement: number
}

export interface OptimizationResult {
  suggestions: EquipmentSuggestion[]
  /** Overall score improvement if all suggestions are applied */
  totalImprovement: number
  /** Current loadout score */
  currentScore: number
  /** Projected score after optimization */
  projectedScore: number
}

// ============================================================
// Scoring
// ============================================================

function scoreItem(item: Item): number {
  let score = 0

  // Rarity contributes heavily
  const rarityScores: Record<string, number> = {
    COMMON: 1, UNCOMMON: 3, RARE: 6, EPIC: 10, LEGENDARY: 16, MYTHIC: 24, DIVINE: 35, ARTIFACT: 50,
  }
  score += rarityScores[item.rarity] ?? 1

  // Value is a proxy for quality
  score += Math.log2(Math.max(item.value ?? 1, 1)) * 2

  // Mechanic tier bonus
  const mechanicScores: Record<string, number> = {
    DAMAGED: -3, WORN: -1, STANDARD: 0, FINE: 3, SUPERIOR: 6,
  }
  if (item.mechanicTier) {
    score += mechanicScores[item.mechanicTier] ?? 0
  }

  // Stat effects
  if (item.baseDamage) score += item.baseDamage * 0.5
  if (item.baseDefense) score += item.baseDefense * 0.5
  if (item.extraSlots) score += item.extraSlots * 4
  if (item.capacity && item.capacity > 0) score += item.capacity * 0.3

  return Math.round(score * 10) / 10
}

function scoreLoadout(equipment: Inventory['equipment']): number {
  let total = 0
  for (const item of Object.values(equipment)) {
    if (item) total += scoreItem(item)
  }
  return Math.round(total * 10) / 10
}

// ============================================================
// Optimization Logic
// ============================================================

function findUpgrades(character: Character): EquipmentSuggestion[] {
  const suggestions: EquipmentSuggestion[] = []
  const { equipment, backpack } = character.inventory

  for (const backpackItem of backpack) {
    const validSlots = getValidEquipmentSlots(backpackItem)
    if (validSlots.length === 0) continue

    const backpackScore = scoreItem(backpackItem)

    for (const slot of validSlots) {
      if (!canEquipItemToSlot(backpackItem, slot, equipment)) continue

      const currentItem = equipment[slot]
      const currentScore = currentItem ? scoreItem(currentItem) : 0
      const improvement = backpackScore - currentScore

      if (improvement > 2) { // Only suggest meaningful upgrades
        suggestions.push({
          item: backpackItem,
          targetSlot: slot,
          replacedItem: currentItem ?? null,
          reason: currentItem
            ? `${backpackItem.name} (score ${backpackScore}) is stronger than ${currentItem.name} (score ${currentScore})`
            : `${backpackItem.name} fills an empty ${slot} slot`,
          improvement,
        })
      }
    }
  }

  // Sort by improvement descending, deduplicate items (pick best slot per item)
  suggestions.sort((a, b) => b.improvement - a.improvement)

  const usedItems = new Set<string>()
  const usedSlots = new Set<string>()
  const deduped: EquipmentSuggestion[] = []

  for (const suggestion of suggestions) {
    if (usedItems.has(suggestion.item.id) || usedSlots.has(suggestion.targetSlot)) continue
    usedItems.add(suggestion.item.id)
    usedSlots.add(suggestion.targetSlot)
    deduped.push(suggestion)
  }

  return deduped.slice(0, 5) // Max 5 suggestions
}

// ============================================================
// Public API
// ============================================================

/** Analyze the character's equipment and suggest improvements from their backpack. */
export function optimizeEquipment(character: Character): OptimizationResult {
  const suggestions = findUpgrades(character)
  const currentScore = scoreLoadout(character.inventory.equipment)
  const totalImprovement = suggestions.reduce((sum, s) => sum + s.improvement, 0)

  return {
    suggestions,
    totalImprovement: Math.round(totalImprovement * 10) / 10,
    currentScore,
    projectedScore: Math.round((currentScore + totalImprovement) * 10) / 10,
  }
}

/** Score a single item for display purposes. */
export function getItemScore(item: Item): number {
  return scoreItem(item)
}

/** Score the entire current loadout. */
export function getLoadoutScore(character: Character): number {
  return scoreLoadout(character.inventory.equipment)
}
