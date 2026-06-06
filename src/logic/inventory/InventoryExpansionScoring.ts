import { INVENTORY_EXPANSION_CONFIG } from '../../config'
import type { CharacterCore } from '../../types'
import { includesValue, matchingRuleWeight, resolveChoice } from '../ExpansionUtils'
import type { Cuisine, Enchantment, Instrument, Merchandise, Recipe } from './InventoryExpansionFormatters'

export const RARITY_RANK = {
  Common: 1,
  Uncommon: 2,
  Rare: 3,
  Epic: 4,
  Legendary: 5,
  Mythic: 6,
} as const

export type RarityName = keyof typeof RARITY_RANK

/** Resolves the highest enchantment rarity allowed for a character level. */
export function resolveMaxRarity(level: number): RarityName {
  return resolveChoice(
    INVENTORY_EXPANSION_CONFIG.ENCHANTMENTS.MAX_RARITY_BY_LEVEL,
    level,
    'rarities',
    'Common',
  )
}

/** Resolves the hardest recipe difficulty allowed for a character level. */
export function resolveMinDifficulty(level: number): number {
  return resolveChoice(
    INVENTORY_EXPANSION_CONFIG.RECIPES.MIN_DIFFICULTY_BY_LEVEL,
    level,
    'difficultyModifiers',
    0,
  )
}

function priceWeight(price: number | undefined, level: number): number {
  if (!Number.isFinite(price)) return 1

  const affordableCeiling = Math.max(5, level * 2)
  if ((price ?? 0) <= affordableCeiling) return 1.6
  if ((price ?? 0) <= affordableCeiling * 4) return 1
  return 0.45
}

/** Scores cuisine toward role flavor, usefulness, and plausible affordability. */
export function cuisineWeight(cuisine: Cuisine, character: CharacterCore): number {
  const roleWeight = matchingRuleWeight(
    character.role,
    INVENTORY_EXPANSION_CONFIG.CUISINE.ROLE_TYPE_WEIGHTS,
    (rule) => includesValue(rule.types, cuisine.type),
  )
  const effectWeight = cuisine.effect ? 1.35 : 1
  const variantPrice = cuisine.variants[0]?.price ?? cuisine.price

  return roleWeight * effectWeight * priceWeight(variantPrice, character.level)
}

/** Scores enchantments toward rarity limits, role targets, and owned gear. */
export function enchantmentWeight(enchantment: Enchantment, character: CharacterCore, maxRarity: RarityName): number {
  const rarityHeadroom = RARITY_RANK[maxRarity] - RARITY_RANK[enchantment.rarity]
  const rarityWeight = Math.max(0.35, rarityHeadroom + 1)
  const targetWeight = matchingRuleWeight(
    character.role,
    INVENTORY_EXPANSION_CONFIG.ENCHANTMENTS.ROLE_TARGET_WEIGHTS,
    (rule) => includesValue(rule.targets, enchantment.target),
  )
  const hasMatchingEquipment = Object.values(character.inventory.equipment)
    .some((item) => item?.type === enchantment.target.toUpperCase())

  return rarityWeight * targetWeight * (hasMatchingEquipment ? 1.4 : 1)
}

/** Scores instruments toward role flavor and plausible affordability. */
export function instrumentWeight(instrument: Instrument, character: CharacterCore): number {
  return matchingRuleWeight(
    character.role,
    INVENTORY_EXPANSION_CONFIG.INSTRUMENTS.ROLE_CATEGORY_WEIGHTS,
    (rule) => includesValue(rule.categories, instrument.category),
  ) * priceWeight(instrument.basePrice, character.level)
}

/** Scores trade goods toward role flavor and plausible affordability. */
export function merchandiseWeight(item: Merchandise, character: CharacterCore): number {
  return matchingRuleWeight(
    character.role,
    INVENTORY_EXPANSION_CONFIG.MERCHANDISE.ROLE_CATEGORY_WEIGHTS,
    (rule) => includesValue(rule.categories, item.category),
  ) * priceWeight(item.basePrice, character.level)
}

/** Scores recipes toward role flavor, difficulty, and failure risk. */
export function recipeWeight(recipe: Recipe, character: CharacterCore): number {
  const roleWeight = matchingRuleWeight(
    character.role,
    INVENTORY_EXPANSION_CONFIG.RECIPES.ROLE_CATEGORY_WEIGHTS,
    (rule) => includesValue(rule.categories, recipe.category),
  )
  const difficultyWeight = Math.max(0.5, 1 + Math.abs(recipe.difficultyModifier) / Math.max(8, character.level / 16))

  return roleWeight * difficultyWeight * Math.max(0.35, 1 - recipe.failureChance / 100)
}
