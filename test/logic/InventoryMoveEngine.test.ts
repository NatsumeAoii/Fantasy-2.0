import { describe, expect, it } from 'vitest'
import { makeTestCharacter } from '../makeTestCharacter'
import type { Character, Inventory, Item } from '../../src/types'
import {
  canEquipItemToSlot,
  getInventoryCapacity,
  moveInventoryItem,
} from '../../src/logic/inventory/InventoryMoveEngine'

function makeItem(overrides: Partial<Item>): Item {
  return {
    id: overrides.id ?? 'item-1',
    defId: overrides.defId ?? 'sword',
    name: overrides.name ?? 'Iron Sword',
    type: overrides.type ?? 'WEAPON',
    rarity: overrides.rarity ?? 'COMMON',
    icon: overrides.icon ?? 'GiBroadsword',
    weight: overrides.weight ?? 1,
    tags: overrides.tags ?? ['1H'],
    ...overrides,
  }
}

function makeCharacter(inventory: Inventory): Character {
  return makeTestCharacter({ inventory })
}

describe('InventoryMoveEngine', () => {
  it('equips one satchel item into a compatible empty slot', () => {
    const sword = makeItem({ id: 'sword-1', defId: 'sword' })
    const character = makeCharacter({
      equipment: {},
      backpack: [sword],
      currency: { crown: 0, gold: 0, silver: 0, copper: 0, shard: 0 },
      weight: { current: 1, max: 100 },
    })

    const result = moveInventoryItem(character, {
      source: { type: 'backpack', itemId: 'sword-1' },
      target: { type: 'equipment', slot: 'MAIN_HAND' },
    })

    expect(result.status).toBe('moved')
    expect(result.character.inventory.equipment.MAIN_HAND?.id).toBe('sword-1')
    expect(result.character.inventory.backpack).toEqual([])
    expect(character.inventory.backpack).toHaveLength(1)
  })

  it('returns an equipped item to the satchel when capacity allows it', () => {
    const torch = makeItem({ id: 'torch-1', defId: 'torch', name: 'Torch', type: 'MISC', tags: [] })
    const character = makeCharacter({
      equipment: { TORCH: torch },
      backpack: [],
      currency: { crown: 0, gold: 0, silver: 0, copper: 0, shard: 0 },
      weight: { current: 1, max: 100 },
    })

    const result = moveInventoryItem(character, {
      source: { type: 'equipment', slot: 'TORCH' },
      target: { type: 'backpack' },
    })

    expect(result.status).toBe('moved')
    expect(result.character.inventory.equipment.TORCH).toBeNull()
    expect(result.character.inventory.backpack.map((item) => item.id)).toEqual(['torch-1'])
  })

  it('swaps an occupied equipment slot back into the satchel', () => {
    const newRing = makeItem({ id: 'ring-new', defId: 'ring', name: 'New Ring', type: 'ACCESSORY' })
    const oldRing = makeItem({ id: 'ring-old', defId: 'signet', name: 'Old Signet', type: 'ACCESSORY' })
    const character = makeCharacter({
      equipment: { RING: oldRing },
      backpack: [newRing],
      currency: { crown: 0, gold: 0, silver: 0, copper: 0, shard: 0 },
      weight: { current: 0.2, max: 100 },
    })

    const result = moveInventoryItem(character, {
      source: { type: 'backpack', itemId: 'ring-new' },
      target: { type: 'equipment', slot: 'RING' },
    })

    expect(result.status).toBe('moved')
    expect(result.character.inventory.equipment.RING?.id).toBe('ring-new')
    expect(result.character.inventory.backpack.map((item) => item.id)).toEqual(['ring-old'])
  })

  it('rejects incompatible slot drops without changing inventory', () => {
    const potion = makeItem({
      id: 'potion-1',
      defId: 'health_potion',
      name: 'Health Potion',
      type: 'CONSUMABLE',
      icon: 'GiRoundBottomFlask',
      tags: [],
    })
    const character = makeCharacter({
      equipment: {},
      backpack: [potion],
      currency: { crown: 0, gold: 0, silver: 0, copper: 0, shard: 0 },
      weight: { current: 0.5, max: 100 },
    })

    expect(canEquipItemToSlot(potion, 'HEAD', character.inventory.equipment)).toBe(false)

    const result = moveInventoryItem(character, {
      source: { type: 'backpack', itemId: 'potion-1' },
      target: { type: 'equipment', slot: 'HEAD' },
    })

    expect(result.status).toBe('rejected')
    if (result.status !== 'rejected') throw new Error('Expected incompatible slot drop to be rejected')
    expect(result.reason).toBe('incompatible-slot')
    expect(result.character).toBe(character)
  })

  it('includes satchel-capacity details when removing a storage item would overfill the backpack', () => {
    const scrollCase = makeItem({
      id: 'scroll-case-1',
      defId: 'scroll_case',
      name: 'Scroll Case',
      type: 'MISC',
      icon: 'GiScrollUnfurled',
      extraSlots: 6,
      tags: [],
    })
    const backpackItems = Array.from({ length: 18 }, (_, index) => makeItem({
      id: `satchel-item-${index}`,
      defId: `satchel-item-${index}`,
      name: `Satchel Item ${index}`,
      type: 'CONSUMABLE',
      icon: 'GiRoundBottomFlask',
      tags: [],
    }))
    const character = makeCharacter({
      equipment: { BELT: scrollCase },
      backpack: backpackItems,
      currency: { crown: 0, gold: 0, silver: 0, copper: 0, shard: 0 },
      weight: { current: 7, max: 100 },
    })

    const result = moveInventoryItem(character, {
      source: { type: 'equipment', slot: 'BELT' },
      target: { type: 'backpack' },
    })

    expect(result.status).toBe('rejected')
    if (result.status !== 'rejected') throw new Error('Expected satchel overflow rejection')
    expect(result.reason).toBe('satchel-full')
    expect(result.details).toEqual({
      kind: 'satchel-capacity',
      capacity: 16,
      requiredSlots: 19,
      overflowSlots: 3,
      removedStorage: [
        {
          name: 'Scroll Case',
          slot: 'BELT',
          extraSlots: 6,
        },
      ],
    })
  })

  it('rejects equipment swaps that only fit before a displaced storage item loses its bonus slots', () => {
    const beltCharm = makeItem({
      id: 'belt-charm-1',
      defId: 'belt_charm',
      name: 'Belt Charm',
      type: 'ACCESSORY',
      icon: 'GiBeltArmor',
      tags: [],
    })
    const scrollCase = makeItem({
      id: 'scroll-case-1',
      defId: 'scroll_case',
      name: 'Scroll Case',
      type: 'MISC',
      icon: 'GiScrollUnfurled',
      extraSlots: 6,
      tags: [],
    })
    const fillerItems = Array.from({ length: 17 }, (_, index) => makeItem({
      id: `satchel-item-${index}`,
      defId: `satchel-item-${index}`,
      name: `Satchel Item ${index}`,
      type: 'CONSUMABLE',
      icon: 'GiRoundBottomFlask',
      tags: [],
    }))
    const character = makeCharacter({
      equipment: { BELT: scrollCase },
      backpack: [beltCharm, ...fillerItems],
      currency: { crown: 0, gold: 0, silver: 0, copper: 0, shard: 0 },
      weight: { current: 6.5, max: 100 },
    })

    const result = moveInventoryItem(character, {
      source: { type: 'backpack', itemId: 'belt-charm-1' },
      target: { type: 'equipment', slot: 'BELT' },
    })

    expect(result.status).toBe('rejected')
    if (result.status !== 'rejected') throw new Error('Expected displaced storage rejection')
    expect(result.reason).toBe('satchel-full')
    expect(result.details).toEqual({
      kind: 'satchel-capacity',
      capacity: 16,
      requiredSlots: 18,
      overflowSlots: 2,
      removedStorage: [
        {
          name: 'Scroll Case',
          slot: 'BELT',
          extraSlots: 6,
        },
      ],
    })
  })

  it('uses equipped containers to calculate satchel capacity', () => {
    const pack = makeItem({
      id: 'pack-1',
      defId: 'small_backpack',
      name: 'Small Backpack',
      type: 'MISC',
      extraSlots: 8,
    })

    expect(getInventoryCapacity({ BACK: pack })).toBe(24)
  })
})
