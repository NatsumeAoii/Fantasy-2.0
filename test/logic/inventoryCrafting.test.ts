import { describe, expect, it } from 'vitest'
import type { GeneratedPoolEntry, Inventory, Item } from '../../src/types'
import { buildInventoryCraftingState } from '../../src/logic/inventoryCrafting'

function makeItem(overrides: Partial<Item>): Item {
  return {
    id: overrides.id ?? 'item-1',
    defId: overrides.defId ?? 'item-1',
    name: overrides.name ?? 'Item',
    type: overrides.type ?? 'CONSUMABLE',
    rarity: overrides.rarity ?? 'COMMON',
    icon: overrides.icon ?? 'GiPlainCircle',
    weight: overrides.weight ?? 1,
    tags: overrides.tags ?? [],
    ...overrides,
  }
}

function makeInventory(backpack: Item[]): Inventory {
  return {
    equipment: {},
    backpack,
    currency: { crown: 0, gold: 0, silver: 0, copper: 0, shard: 0 },
    weight: { current: backpack.reduce((sum, item) => sum + item.weight, 0), max: 100 },
  }
}

function makeRecipeEntry(overrides: Partial<GeneratedPoolEntry>): GeneratedPoolEntry {
  return {
    id: overrides.id ?? 'crude_health_potion',
    name: overrides.name ?? 'Crude Health Potion',
    category: overrides.category ?? 'Alchemy',
    type: overrides.type ?? 'Recipe',
    description: overrides.description ?? 'Recipe',
    metadata: overrides.metadata ?? {},
    ...overrides,
  }
}

describe('buildInventoryCraftingState', () => {
  it('maps known recipe ids to recipe definitions and marks fully supplied recipes as craftable', () => {
    const state = buildInventoryCraftingState(
      makeInventory([
        makeItem({ id: 'healweed-1', name: 'Healweed' }),
        makeItem({ id: 'water-1', name: 'Fresh Water' }),
        makeItem({ id: 'shard-1', name: 'Crystal Shard' }),
      ]),
      [makeRecipeEntry({ id: 'crude_health_potion' })],
    )

    expect(state).toHaveLength(1)
    expect(state[0].recipe.outputItem).toBe('Crude Health Potion')
    expect(state[0].isCraftable).toBe(true)
    expect(state[0].materials).toEqual([
      { name: 'Healweed', required: 1, available: 1, missing: 0 },
      { name: 'Fresh Water', required: 1, available: 1, missing: 0 },
      { name: 'Crystal Shard', required: 1, available: 1, missing: 0 },
    ])
  })

  it('counts duplicate ingredient requirements when a recipe needs the same material multiple times', () => {
    const state = buildInventoryCraftingState(
      makeInventory([
        makeItem({ id: 'canvas-1', name: 'Canvas Sheet' }),
        makeItem({ id: 'pine-1', name: 'Pine Board' }),
        makeItem({ id: 'hemp-1', name: 'Hemp Weave' }),
      ]),
      [makeRecipeEntry({ id: 'tent', name: 'Canvas Tent', category: 'Tool' })],
    )

    expect(state).toHaveLength(1)
    expect(state[0].isCraftable).toBe(false)
    expect(state[0].missingMaterials).toBe(1)
    expect(state[0].materials[0]).toEqual({
      name: 'Canvas Sheet',
      required: 2,
      available: 1,
      missing: 1,
    })
  })
})
