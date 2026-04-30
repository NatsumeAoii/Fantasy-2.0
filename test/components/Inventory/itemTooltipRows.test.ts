import { describe, expect, it } from 'vitest'
import { getItemMechanicalRows } from '../../../src/components/Inventory/itemTooltipRows'

describe('getItemMechanicalRows', () => {
  it('formats accessory effect and durability rows for inventory popups', () => {
    const rows = getItemMechanicalRows({
      id: 'item-1',
      defId: 'ring',
      name: 'Iron Loop',
      type: 'ACCESSORY',
      rarity: 'COMMON',
      icon: 'GiRing',
      weight: 0.1,
      mechanicTier: 'DAMAGED',
      definitionType: 'ACCESSORY',
      equipmentSlot: 'RING',
      materialGroup: 'METAL',
      validRoles: ['Warrior', 'Mercenary'],
      effect: { stat: 'luck', value: 2, type: 'flat' },
      durability: 80,
    })

    expect(rows.map(({ label, value }) => [label, value])).toEqual([
      ['Quality', 'Damaged'],
      ['Kind', 'Accessory'],
      ['Slot', 'Ring'],
      ['Material', 'Metal'],
      ['Roles', 'Warrior, Mercenary'],
      ['Effect', '+2 Luck'],
      ['Durability', '80'],
    ])
  })

  it('formats prose food effects without treating them like stat modifiers', () => {
    const rows = getItemMechanicalRows({
      id: 'item-2',
      defId: 'stew',
      name: 'Hearty Stew',
      type: 'CONSUMABLE',
      rarity: 'COMMON',
      icon: 'GiHotMeal',
      weight: 1,
      definitionType: 'FOOD',
      effect: 'Reduces hunger and restores a modest amount of vitality.',
    })

    expect(rows.map(({ label, value }) => [label, value])).toEqual([
      ['Kind', 'Food'],
      ['Effect', 'Reduces hunger and restores a modest amount of vitality.'],
    ])
  })

  it('formats potion stats as explicit potion effects', () => {
    const rows = getItemMechanicalRows({
      id: 'item-3',
      defId: 'health_potion',
      name: 'Health Potion',
      type: 'CONSUMABLE',
      rarity: 'COMMON',
      icon: 'GiRoundBottomFlask',
      weight: 0.5,
      definitionType: 'POTION',
      potionStats: { type: 'restore', stats: { resource: 'health', baseRestore: 100, percentRestore: 0.1 } },
    })

    expect(rows.map(({ label, value }) => [label, value])).toEqual([
      ['Kind', 'Potion'],
      ['Potion Effect', 'Restores 100 + 10% max Health'],
    ])
  })
})
