import { describe, expect, it } from 'vitest'
import { setSeed } from '../../src/lib'
import { InventoryEngine } from '../../src/logic/inventory/InventoryEngine'

describe('InventoryEngine icon resolution', () => {
  it('keeps generated quickslot variant icons tied to their base data id', () => {
    for (let index = 0; index < 40; index += 1) {
      setSeed(`quickslot-torch-icon-${index}`)
      const inventory = InventoryEngine.generateLoadout('Mage', 100)
      const torchSlot = inventory.equipment.TORCH

      if (torchSlot?.defId === 'torch') {
        expect(torchSlot.icon).toBe('GiTorch')
        setSeed(null)
        return
      }
    }

    setSeed(null)
    throw new Error('No deterministic test seed produced a torch quickslot.')
  })
})
