import { describe, expect, it } from 'vitest'
import {
  ACCESSORIES,
  ARMORS,
  CONSUMABLES,
  CONTAINERS,
  CURIOS,
  CUISINE,
  ENCHANTMENTS,
  INSTRUMENTS,
  MATERIAL_GROUPS,
  MERCHANDISE,
  QUICK_FOODS,
  QUICK_POTIONS,
  RECIPES,
  THROWABLES,
  TORCHES,
  WEAPONS,
} from '../../../src/data/inventory/index'

function collectNames(value: unknown, names: Set<string> = new Set<string>()): Set<string> {
  if (Array.isArray(value)) {
    for (const entry of value) collectNames(entry, names)
    return names
  }

  if (!value || typeof value !== 'object') return names

  const record = value as Record<string, unknown>
  if (typeof record.name === 'string') names.add(record.name)

  for (const nested of Object.values(record)) {
    collectNames(nested, names)
  }

  return names
}

const INVENTORY_CATALOG_NAMES = collectNames([
  WEAPONS,
  ARMORS,
  ACCESSORIES,
  CURIOS,
  CONSUMABLES,
  CONTAINERS,
  CUISINE,
  ENCHANTMENTS,
  INSTRUMENTS,
  MERCHANDISE,
  THROWABLES,
  TORCHES,
  QUICK_POTIONS,
  QUICK_FOODS,
  MATERIAL_GROUPS,
])

describe('RECIPES catalog integrity', () => {
  it('keeps every recipe category at 30 entries', () => {
    const counts = RECIPES.reduce<Record<string, number>>((accumulator, recipe) => {
      accumulator[recipe.category] = (accumulator[recipe.category] ?? 0) + 1
      return accumulator
    }, {})

    expect(counts).toEqual({
      Alchemy: 30,
      Weapon: 30,
      Armor: 30,
      Tool: 30,
      Cooking: 30,
      Enchanting: 30,
    })
  })

  it('uses only existing inventory-data names for recipe outputs and materials', () => {
    const invalidOutputs = RECIPES
      .filter((recipe) => !INVENTORY_CATALOG_NAMES.has(recipe.outputItem))
      .map((recipe) => `${recipe.id}:${recipe.outputItem}`)

    const invalidMaterials = RECIPES.flatMap((recipe) =>
      recipe.materialsRequired
        .filter((material) => !INVENTORY_CATALOG_NAMES.has(material))
        .map((material) => `${recipe.id}:${material}`),
    )

    expect(invalidOutputs).toEqual([])
    expect(invalidMaterials).toEqual([])
  })

  it('keeps recipe ids unique', () => {
    const duplicateIds = RECIPES
      .map((recipe) => recipe.id)
      .filter((id, index, values) => values.indexOf(id) !== index)

    expect(duplicateIds).toEqual([])
  })
})
