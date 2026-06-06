import { describe, expect, it } from 'vitest'
import { setSeed } from '../../src/lib'
import { CharacterGenerator } from '../../src/logic/CharacterGenerator'
import { getInventoryCapacity } from '../../src/logic/inventory/InventoryMoveEngine'

describe('CharacterGenerator', () => {
  it('adds generated magic spells to the character skill list', () => {
    setSeed('magic-skills-integration')

    const character = CharacterGenerator.generate('Astra', 100)

    expect(character.magic.spells.length).toBeGreaterThan(0)
    for (const spell of character.magic.spells) {
      expect(character.skills).toContainEqual(expect.objectContaining({
        name: spell.name,
        description: spell.description,
        source: 'spell',
      }))
    }
  })

  it('materializes generated inventory goods into the satchel', () => {
    setSeed('inventory-context-satchel')

    const character = CharacterGenerator.generate('Astra', 0)
    const generatedGoods = [
      ...character.inventoryContext.curios,
      ...character.inventoryContext.cuisine,
      ...character.inventoryContext.enchantments,
      ...character.inventoryContext.instruments,
      ...character.inventoryContext.merchandise,
    ]
    const backpackDefIds = new Set(character.inventory.backpack.map((item) => item.defId))

    expect(generatedGoods.length).toBeGreaterThan(0)
    for (const entry of generatedGoods) {
      expect(character.inventory.backpack).toContainEqual(expect.objectContaining({
        defId: entry.id,
        name: entry.name,
      }))
    }
    for (const recipe of character.inventoryContext.recipes) {
      expect(backpackDefIds).not.toContain(recipe.id)
    }
  })

  it('keeps generated satchel contents within available inventory slots', () => {
    setSeed('audit-seed-1')

    const character = CharacterGenerator.generate('Audit 1', 100)
    const capacity = getInventoryCapacity(character.inventory.equipment)

    expect(character.inventory.backpack.length).toBeLessThanOrEqual(capacity)
  })

  it('prioritizes generated inventory goods over generic filler when satchel slots are limited', () => {
    setSeed('audit-seed-1')

    const character = CharacterGenerator.generate('Audit 1', 100)
    const capacity = getInventoryCapacity(character.inventory.equipment)
    const generatedGoods = [
      ...character.inventoryContext.curios,
      ...character.inventoryContext.cuisine,
      ...character.inventoryContext.enchantments,
      ...character.inventoryContext.instruments,
      ...character.inventoryContext.merchandise,
    ]
    const backpackDefIds = new Set(character.inventory.backpack.map((item) => item.defId))
    const carriedGeneratedGoods = generatedGoods.filter((entry) => backpackDefIds.has(entry.id))

    expect(generatedGoods.length).toBeGreaterThan(0)
    expect(carriedGeneratedGoods).toHaveLength(Math.min(generatedGoods.length, capacity))
  })
})
