import { INVENTORY_EXPANSION_CONFIG } from '../config'
import { CURIOS, CUISINE, ENCHANTMENTS, INSTRUMENTS, MERCHANDISE, RECIPES } from '../data/inventory'
import type { CharacterCore, GeneratedInventoryContext, GeneratedPoolEntry } from '../types'
import { pickGeneratedEntries, resolveCount } from './ExpansionUtils'
import { safeGenerateSection } from './ExpansionErrorHandler'
import {
  normalizeCuisine,
  normalizeCurio,
  normalizeEnchantment,
  normalizeInstrument,
  normalizeMerchandise,
  normalizeRecipe,
} from './InventoryExpansionFormatters'
import {
  cuisineWeight,
  enchantmentWeight,
  instrumentWeight,
  merchandiseWeight,
  RARITY_RANK,
  recipeWeight,
  resolveMaxRarity,
  resolveMinDifficulty,
} from './InventoryExpansionScoring'

function buildCurios(character: CharacterCore): GeneratedPoolEntry[] {
  return pickGeneratedEntries({
    pool: CURIOS,
    count: resolveCount(INVENTORY_EXPANSION_CONFIG.CURIOS.COUNT_BY_LEVEL, character.level),
    normalize: normalizeCurio,
  })
}

function buildCuisine(character: CharacterCore): GeneratedPoolEntry[] {
  return pickGeneratedEntries({
    pool: CUISINE,
    count: resolveCount(INVENTORY_EXPANSION_CONFIG.CUISINE.COUNT_BY_LEVEL, character.level),
    weight: (item) => cuisineWeight(item, character),
    normalize: normalizeCuisine,
  })
}

function buildEnchantments(character: CharacterCore): GeneratedPoolEntry[] {
  const maxRarity = resolveMaxRarity(character.level)
  const enchantmentCandidates = ENCHANTMENTS.filter(
    (enchantment) => RARITY_RANK[enchantment.rarity] <= RARITY_RANK[maxRarity],
  )

  return pickGeneratedEntries({
    pool: enchantmentCandidates,
    count: resolveCount(INVENTORY_EXPANSION_CONFIG.ENCHANTMENTS.COUNT_BY_LEVEL, character.level),
    fallbackPool: ENCHANTMENTS,
    weight: (item) => enchantmentWeight(item, character, maxRarity),
    normalize: normalizeEnchantment,
  })
}

function buildInstruments(character: CharacterCore): GeneratedPoolEntry[] {
  return pickGeneratedEntries({
    pool: INSTRUMENTS,
    count: resolveCount(INVENTORY_EXPANSION_CONFIG.INSTRUMENTS.COUNT_BY_LEVEL, character.level),
    weight: (item) => instrumentWeight(item, character),
    normalize: normalizeInstrument,
  })
}

function buildMerchandise(character: CharacterCore): GeneratedPoolEntry[] {
  return pickGeneratedEntries({
    pool: MERCHANDISE,
    count: resolveCount(INVENTORY_EXPANSION_CONFIG.MERCHANDISE.COUNT_BY_LEVEL, character.level),
    weight: (item) => merchandiseWeight(item, character),
    normalize: normalizeMerchandise,
  })
}

function buildRecipes(character: CharacterCore): GeneratedPoolEntry[] {
  const minDifficulty = resolveMinDifficulty(character.level)
  const recipeCandidates = RECIPES.filter((recipe) => recipe.difficultyModifier >= minDifficulty)

  return pickGeneratedEntries({
    pool: recipeCandidates,
    count: resolveCount(INVENTORY_EXPANSION_CONFIG.RECIPES.COUNT_BY_LEVEL, character.level),
    fallbackPool: RECIPES,
    weight: (item) => recipeWeight(item, character),
    normalize: normalizeRecipe,
  })
}

/** Generates non-loadout inventory context with section-level fallbacks. */
export function generateInventoryContext(character: CharacterCore): GeneratedInventoryContext {
  return {
    curios: safeGenerateSection('inventoryContext.curios', () => [], () => buildCurios(character)),
    cuisine: safeGenerateSection('inventoryContext.cuisine', () => [], () => buildCuisine(character)),
    enchantments: safeGenerateSection('inventoryContext.enchantments', () => [], () => buildEnchantments(character)),
    instruments: safeGenerateSection('inventoryContext.instruments', () => [], () => buildInstruments(character)),
    merchandise: safeGenerateSection('inventoryContext.merchandise', () => [], () => buildMerchandise(character)),
    recipes: safeGenerateSection('inventoryContext.recipes', () => [], () => buildRecipes(character)),
  }
}

export const InventoryExpansionEngine = {
  generate: generateInventoryContext,
}
