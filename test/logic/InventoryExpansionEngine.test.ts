import { describe, expect, it } from 'vitest'
import { generateCharacter } from '../../src/lib'
import { InventoryExpansionEngine } from '../../src/logic/InventoryExpansionEngine'

describe('InventoryExpansionEngine', () => {
  it('covers non-loadout inventory data as display-ready character context', () => {
    const character = generateCharacter({ seed: 'inventory-context-source', name: 'Nemeia' })
    const context = InventoryExpansionEngine.generate(character)

    expect(context.curios.length).toBeGreaterThanOrEqual(1)
    expect(context.cuisine.length).toBeGreaterThanOrEqual(1)
    expect(context.enchantments.length).toBeGreaterThanOrEqual(1)
    expect(context.instruments.length).toBeGreaterThanOrEqual(1)
    expect(context.merchandise.length).toBeGreaterThanOrEqual(1)
    expect(context.recipes.length).toBeGreaterThanOrEqual(1)

    const [curio] = context.curios
    const [recipe] = context.recipes

    expect(curio).toEqual(expect.objectContaining({
      id: expect.any(String),
      name: expect.any(String),
      category: 'Curio',
      description: expect.any(String),
    }))
    expect(recipe).toEqual(expect.objectContaining({
      id: expect.any(String),
      name: expect.any(String),
      category: expect.any(String),
      metadata: expect.objectContaining({
        station: expect.any(String),
        materials: expect.any(String),
      }),
    }))
  })
})
