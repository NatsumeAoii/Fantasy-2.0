import { describe, expect, it } from 'vitest'
import { INVENTORY_CONFIG } from '../../src/config/inventoryConfig'
import {
  applyItemMechanicModifier,
  getItemDefinitionMetadata,
  selectItemMechanicModifierTier,
} from '../../src/logic/inventory/inventoryItemMetadata'

describe('inventory item mechanic modifiers', () => {
  it('weights low item tiers toward degraded mechanics and high tiers toward enhanced mechanics', () => {
    const expectedQualityTiers = ['DAMAGED', 'WORN', 'STANDARD', 'FINE', 'SUPERIOR']
    const tierPools = Object.values(INVENTORY_CONFIG.MECHANIC_QUALITY.TIER_POOLS)

    expect(tierPools).toHaveLength(8)
    for (const pool of tierPools) {
      expect(pool.map(entry => entry.tier)).toEqual(expectedQualityTiers)
    }

    expect(INVENTORY_CONFIG.MECHANIC_QUALITY.TIER_POOLS[1]).toEqual([
      { tier: 'DAMAGED', weight: 49 },
      { tier: 'WORN', weight: 30 },
      { tier: 'STANDARD', weight: 15 },
      { tier: 'FINE', weight: 5 },
      { tier: 'SUPERIOR', weight: 1 },
    ])
    expect(INVENTORY_CONFIG.MECHANIC_QUALITY.TIER_POOLS[8]).toEqual([
      { tier: 'DAMAGED', weight: 1 },
      { tier: 'WORN', weight: 4 },
      { tier: 'STANDARD', weight: 10 },
      { tier: 'FINE', weight: 35 },
      { tier: 'SUPERIOR', weight: 50 },
    ])

    expect(selectItemMechanicModifierTier(1, 0.1)).toBe('DAMAGED')
    expect(selectItemMechanicModifierTier(1, 0.7)).toBe('WORN')
    expect(selectItemMechanicModifierTier(1, 0.95)).toBe('FINE')

    expect(selectItemMechanicModifierTier(8, 0.05)).toBe('STANDARD')
    expect(selectItemMechanicModifierTier(8, 0.3)).toBe('FINE')
    expect(selectItemMechanicModifierTier(8, 0.75)).toBe('SUPERIOR')
  })

  it('reduces beneficial values and worsens penalties for damaged items', () => {
    const metadata = applyItemMechanicModifier({
      baseDamage: 12,
      baseDefense: 6,
      capacity: 12,
      extraSlots: 4,
      duration: 100,
      cooldown: 40,
      effect: { stat: 'luck', value: 2, type: 'flat' },
      movementPenalty: 10,
      stealthPenalty: 20,
      durability: 80,
    }, 'DAMAGED')

    expect(metadata).toEqual(expect.objectContaining({
      mechanicTier: 'DAMAGED',
      baseDamage: 9,
      baseDefense: 5,
      capacity: 9,
      extraSlots: 3,
      duration: 75,
      cooldown: 50,
      effect: { stat: 'luck', value: 1, type: 'flat' },
      movementPenalty: 13,
      stealthPenalty: 25,
      durability: 52,
    }))
  })

  it('enhances beneficial values and softens penalties for superior items', () => {
    const metadata = applyItemMechanicModifier({
      baseDamage: 12,
      baseDefense: 6,
      capacity: 12,
      extraSlots: 4,
      duration: 100,
      cooldown: 40,
      effect: { stat: 'luck', value: 2, type: 'flat' },
      movementPenalty: 10,
      stealthPenalty: 20,
      durability: 80,
    }, 'SUPERIOR')

    expect(metadata).toEqual(expect.objectContaining({
      mechanicTier: 'SUPERIOR',
      baseDamage: 16,
      baseDefense: 8,
      capacity: 16,
      extraSlots: 5,
      duration: 135,
      cooldown: 30,
      effect: { stat: 'luck', value: 3, type: 'flat' },
      movementPenalty: 8,
      stealthPenalty: 15,
      durability: 100,
    }))
  })

  it('extracts shared inventory definition parameters from all item data shapes', () => {
    const metadata = getItemDefinitionMetadata({
      baseCooldown: 30,
      baseDuration: 90,
      capacity: 12,
      extraSlots: 3,
      group: 'METAL',
      handedness: '1H',
      slot: 'MAIN_HAND',
      type: 'BOMB',
      validRoles: ['Warrior', 'Mercenary'],
    })

    expect(metadata).toEqual(expect.objectContaining({
      capacity: 12,
      cooldown: 30,
      definitionType: 'BOMB',
      duration: 90,
      equipmentSlot: 'MAIN_HAND',
      extraSlots: 3,
      handedness: '1H',
      materialGroup: 'METAL',
      validRoles: ['Warrior', 'Mercenary'],
    }))
  })
})
