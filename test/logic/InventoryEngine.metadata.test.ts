import { describe, expect, it } from 'vitest'
import { ACCESSORIES, ARMORS, CONTAINERS, WEAPONS } from '../../src/data/inventory'
import { setSeed } from '../../src/lib'
import { InventoryEngine } from '../../src/logic/InventoryEngine'

describe('InventoryEngine item metadata', () => {
  it('keeps inventory definition metadata on generated equipment', () => {
    const ring = ACCESSORIES.find(item => item.id === 'ring')
    const sword = WEAPONS.find(item => item.id === 'sword')
    const robe = ARMORS.find(item => item.id === 'robe')
    const backpack = CONTAINERS.find(item => item.id === 'small_backpack')

    if (!ring || !sword || !robe || !backpack) {
      throw new Error('Expected inventory fixtures are missing.')
    }

    const generatedRing = InventoryEngine.generateItem(ring, 1, 'ACCESSORY')
    const generatedSword = InventoryEngine.generateItem(sword, 1, 'WEAPON', 'MAIN_HAND')
    const generatedRobe = InventoryEngine.generateItem(robe, 1, 'ARMOR')
    const generatedBackpack = InventoryEngine.generateContainer(backpack, 1)

    expect(generatedRing).toEqual(expect.objectContaining({
      mechanicTier: expect.any(String),
      effect: expect.objectContaining({ stat: 'luck', value: expect.any(Number), type: 'flat' }),
      durability: expect.any(Number),
    }))
    expect(generatedSword).toEqual(expect.objectContaining({
      mechanicTier: expect.any(String),
      baseDamage: expect.any(Number),
      damageType: 'slashing',
      equipmentSlot: 'MAIN_HAND',
      handedness: '1H',
      materialGroup: 'METAL',
      durability: expect.any(Number),
    }))
    expect(generatedSword.validRoles).toContain('Warrior')
    expect(generatedRobe).toEqual(expect.objectContaining({
      mechanicTier: expect.any(String),
      baseDefense: expect.any(Number),
      definitionType: 'LIGHT',
      equipmentSlot: 'BODY',
      materialGroup: 'FABRIC',
      noiseLevel: 'silent',
      durability: expect.any(Number),
    }))
    expect(generatedBackpack).toEqual(expect.objectContaining({
      mechanicTier: expect.any(String),
      equipmentSlot: 'BACK',
      capacity: expect.any(Number),
      durability: expect.any(Number),
      extraSlots: expect.any(Number),
    }))
  })

  it('applies definition metadata to quickslot items too', () => {
    const inventory = InventoryEngine.generateLoadout('Warrior', 100)

    expect(inventory.equipment.THROWABLE).toEqual(expect.objectContaining({
      mechanicTier: expect.any(String),
      equipmentSlot: 'THROWABLE',
    }))
    expect(inventory.equipment.TORCH).toEqual(expect.objectContaining({
      mechanicTier: expect.any(String),
      equipmentSlot: 'TORCH',
    }))
    expect(inventory.equipment.POTION).toEqual(expect.objectContaining({
      mechanicTier: expect.any(String),
      equipmentSlot: 'POTION',
      potionStats: expect.objectContaining({ type: 'restore' }),
    }))
    expect(inventory.equipment.FOOD).toEqual(expect.objectContaining({
      mechanicTier: expect.any(String),
      equipmentSlot: 'FOOD',
      effect: expect.any(String),
    }))
  })

  it('keeps duration metadata on generated torch quickslot items', () => {
    setSeed('torch-quickslot-duration')

    const inventory = InventoryEngine.generateLoadout('Mage', 100)

    expect(inventory.equipment.TORCH).toEqual(expect.objectContaining({
      mechanicTier: expect.any(String),
      equipmentSlot: 'TORCH',
      duration: expect.any(Number),
    }))
    expect(inventory.equipment.TORCH?.duration).toBeGreaterThan(0)

    setSeed(null)
  })

  it('keeps duration metadata on backpack torch tools', () => {
    for (let index = 0; index < 200; index += 1) {
      setSeed(`backpack-torch-duration-${index}`)
      const inventory = InventoryEngine.generateLoadout('Rogue', 100)
      const torch = inventory.backpack.find(item => item.defId === 'torch')

      if (!torch) {
        continue
      }

      expect(torch.duration).toEqual(expect.any(Number))
      expect(torch.duration).toBeGreaterThan(0)
      setSeed(null)
      return
    }

    setSeed(null)
    throw new Error('No deterministic test seed produced a backpack torch.')
  })
})
