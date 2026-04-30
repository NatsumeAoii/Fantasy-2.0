import { CURIOS, CUISINE, ENCHANTMENTS, INSTRUMENTS, MERCHANDISE, RECIPES } from '../data/inventory'
import type { GeneratedPoolEntry } from '../types'
import { entry, pickVariant, slugify } from './ExpansionUtils'

export type Curio = (typeof CURIOS)[number]
export type Cuisine = (typeof CUISINE)[number]
export type Enchantment = (typeof ENCHANTMENTS)[number]
export type Instrument = (typeof INSTRUMENTS)[number]
export type Merchandise = (typeof MERCHANDISE)[number]
export type Recipe = (typeof RECIPES)[number]

/** Converts a curio data record into a display-ready generated entry. */
export function normalizeCurio(curio: Curio): GeneratedPoolEntry {
  return entry({
    id: `curio_${slugify(curio.name)}`,
    name: curio.name,
    category: 'Curio',
    description: curio.desc,
  })
}

/** Converts a cuisine data record and one rolled variant into a generated entry. */
export function normalizeCuisine(cuisine: Cuisine): GeneratedPoolEntry {
  const variant = pickVariant(cuisine.variants)
  const displayName = variant?.name ?? cuisine.name

  return entry({
    id: `cuisine_${cuisine.id}_${slugify(displayName)}`,
    name: displayName,
    category: cuisine.type,
    type: cuisine.origin,
    description: variant?.description ?? cuisine.effect ?? '',
    effect: cuisine.effect ?? undefined,
    variant,
    metadata: {
      group: cuisine.name,
      origin: cuisine.origin,
      price: variant?.price ?? cuisine.price,
    },
  })
}

/** Converts an enchantment data record and one rolled variant into a generated entry. */
export function normalizeEnchantment(enchantment: Enchantment): GeneratedPoolEntry {
  const variant = pickVariant(enchantment.variants)
  const displayName = variant?.name ?? enchantment.name

  return entry({
    id: `enchantment_${enchantment.id}_${slugify(displayName)}`,
    name: displayName,
    category: enchantment.target,
    type: 'Enchantment',
    rarity: enchantment.rarity,
    description: variant?.description ?? enchantment.effect,
    effect: enchantment.effect,
    variant,
    metadata: {
      group: enchantment.name,
      baseCost: enchantment.baseCost,
      stat: enchantment.statBonus.stat,
      statBonus: enchantment.statBonus.value,
    },
  })
}

/** Converts an instrument data record and one rolled variant into a generated entry. */
export function normalizeInstrument(instrument: Instrument): GeneratedPoolEntry {
  const variant = pickVariant(instrument.variants)
  const displayName = variant?.name ?? instrument.name

  return entry({
    id: `instrument_${instrument.id}_${slugify(displayName)}`,
    name: displayName,
    category: instrument.category,
    type: 'Instrument',
    description: variant?.description ?? instrument.description,
    variant,
    metadata: {
      group: instrument.name,
      basePrice: instrument.basePrice,
      proficiencyRequired: instrument.proficiencyRequired,
      price: variant?.price,
    },
  })
}

/** Converts a merchandise data record and one rolled variant into a generated entry. */
export function normalizeMerchandise(item: Merchandise): GeneratedPoolEntry {
  const variant = pickVariant(item.variants)
  const displayName = variant?.name ?? item.name

  return entry({
    id: `merchandise_${item.id}_${slugify(displayName)}`,
    name: displayName,
    category: item.category,
    type: 'Merchandise',
    description: variant?.description ?? item.description,
    variant,
    metadata: {
      group: item.name,
      basePrice: item.basePrice,
      price: variant?.price,
      weight: item.weight,
    },
  })
}

/** Converts a crafting recipe into a display-ready generated entry. */
export function normalizeRecipe(recipe: Recipe): GeneratedPoolEntry {
  return entry({
    id: recipe.id,
    name: recipe.outputItem,
    category: recipe.category,
    type: 'Recipe',
    description: recipe.description,
    mechanicalEffect: `${recipe.materialsRequired.join(', ')} at ${recipe.craftingStation}`,
    metadata: {
      station: recipe.craftingStation,
      materials: recipe.materialsRequired.join(', '),
      difficultyModifier: recipe.difficultyModifier,
      craftingTime: recipe.craftingTime,
      outputQuantity: recipe.outputQuantity,
      failureChance: recipe.failureChance,
    },
  })
}
