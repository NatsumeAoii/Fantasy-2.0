import { describe, expect, it } from 'vitest'
import { setSeed } from '../../src/lib'
import { InventoryEngine } from '../../src/logic/inventory/InventoryEngine'
import { getInventoryCapacity } from '../../src/logic/inventory/InventoryMoveEngine'

describe('InventoryEngine guardrails', () => {
  it('falls back to a known material when a material group is unavailable', () => {
    const material = InventoryEngine.getMaterial('UNKNOWN' as never, 3)

    expect(material).toEqual(expect.objectContaining({
      name: expect.any(String),
      tier: expect.any(Number),
    }))
  })

  it('keeps artifact names readable when grammar pools are missing at runtime', () => {
    const name = InventoryEngine.generateArtifactName('Sword', {
      prefixes: [],
      suffixes: [],
      quotes: [],
    })

    expect(name.name).toBe('Ancient Sword Relic')
    expect(name.description).toBe('"Its origin has been lost to time."')
  })

  it('does not generate more backpack items than the equipped satchel can hold', () => {
    setSeed('inventory-audit-seed-2')

    const inventory = InventoryEngine.generateLoadout('Mercenary', 657)
    const capacity = getInventoryCapacity(inventory.equipment)

    expect(inventory.backpack.length).toBeLessThanOrEqual(capacity)
  })
})
