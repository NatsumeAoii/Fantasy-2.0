import { describe, expect, it } from 'vitest'
import { setSeed } from '../../src/lib'
import { InventoryEngine } from '../../src/logic/inventory/InventoryEngine'

describe('InventoryEngine accessory generation', () => {
  it('fills ear and waist accessory slots on guaranteed accessory loadouts', () => {
    setSeed('guaranteed-accessory-slots')

    const inventory = InventoryEngine.generateLoadout('Warrior', 100)

    expect(inventory.equipment.EAR).toEqual(expect.objectContaining({
      equipmentSlot: 'EAR',
      type: 'ACCESSORY',
    }))
    expect(inventory.equipment.WAIST).toEqual(expect.objectContaining({
      equipmentSlot: 'WAIST',
      type: 'ACCESSORY',
    }))

    setSeed(null)
  })

  it('selects from the full neck accessory pool across deterministic seeds', () => {
    const neckDefIds = new Set<string>()

    for (let index = 0; index < 40; index += 1) {
      setSeed(`neck-accessory-${index}`)
      const inventory = InventoryEngine.generateLoadout('Warrior', 100)
      const neckItem = inventory.equipment.NECK

      if (neckItem?.defId) {
        neckDefIds.add(neckItem.defId)
      }
    }

    setSeed(null)

    expect(neckDefIds).toContain('amulet')
    expect(neckDefIds.size).toBeGreaterThan(1)
  })
})
