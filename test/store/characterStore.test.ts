import { beforeEach, describe, expect, it } from 'vitest'
import { makeTestCharacter } from '../makeTestCharacter'
import type { GeneratedBestiary, Item } from '../../src/types'
import { useCharacterStore } from '../../src/store/characterStore'

function makeItem(overrides: Partial<Item>): Item {
  return {
    id: overrides.id ?? 'item-1',
    defId: overrides.defId ?? 'health_potion',
    name: overrides.name ?? 'Health Potion',
    type: overrides.type ?? 'CONSUMABLE',
    rarity: overrides.rarity ?? 'COMMON',
    icon: overrides.icon ?? 'GiRoundBottomFlask',
    weight: overrides.weight ?? 0.5,
    tags: overrides.tags ?? [],
    ...overrides,
  }
}

describe('useCharacterStore.generate', () => {
  beforeEach(() => {
    useCharacterStore.getState().reset()
  })

  it('regenerates from the URL seed and resets the active tab to overview', async () => {
    const store = useCharacterStore.getState()

    store.setTab('lore')
    await store.generate('alpha-seed', 'Lyra')

    const firstCharacter = useCharacterStore.getState().character

    store.setTab('skills')
    await store.generate('beta-seed', 'Lyra')

    const nextState = useCharacterStore.getState()

    expect(firstCharacter).not.toBeNull()
    expect(nextState.character).not.toBeNull()
    expect(nextState.character?.id).not.toBe(firstCharacter?.id)
    expect(nextState.activeTab).toBe('overview')
    expect(nextState.generationError).toBeNull()
  })

  it('rebuilds the character when the same URL seed is requested again', async () => {
    const store = useCharacterStore.getState()

    await store.generate('alpha-seed', 'Lyra')
    const firstCharacter = useCharacterStore.getState().character

    store.setTab('inventory')
    await store.generate('alpha-seed', 'Lyra')
    const nextState = useCharacterStore.getState()

    expect(firstCharacter).not.toBeNull()
    expect(nextState.character).not.toBe(firstCharacter)
    expect(nextState.character?.name).toBe(firstCharacter?.name)
    expect(nextState.activeTab).toBe('overview')
  })

  it('moves inventory items through the centralized character state', () => {
    const potion = makeItem({ id: 'potion-1' })
    useCharacterStore.setState({
      character: makeTestCharacter({
        inventory: {
          equipment: {},
          backpack: [potion],
          currency: { crown: 0, gold: 0, silver: 0, copper: 0, shard: 0 },
          weight: { current: 0.5, max: 100 },
        },
      }),
      currentSeed: 'inventory-move-seed',
    })
    const store = useCharacterStore.getState()

    const result = store.moveInventoryItem({
      source: { type: 'backpack', itemId: potion.id },
      target: { type: 'equipment', slot: 'POTION' },
    })

    const nextState = useCharacterStore.getState()

    expect(result.status).toBe('moved')
    expect(nextState.character?.inventory.equipment.POTION?.id).toBe(potion.id)
    expect(nextState.character?.inventory.backpack.some((item) => item.id === potion.id)).toBe(false)
  })

  it('returns a user-safe rejection when moving inventory without a character', () => {
    const result = useCharacterStore.getState().moveInventoryItem({
      source: { type: 'backpack', itemId: 'missing' },
      target: { type: 'equipment', slot: 'POTION' },
    })

    expect(result).toEqual({
      status: 'rejected',
      character: null,
      reason: 'missing-character',
      details: undefined,
    })
  })

  it('updates the display name without mutating nested character data', () => {
    const potion = makeItem({ id: 'potion-1' })
    const character = makeTestCharacter({
      name: 'Old Name',
      inventory: {
        equipment: {},
        backpack: [potion],
        currency: { crown: 0, gold: 0, silver: 0, copper: 0, shard: 0 },
        weight: { current: 0.5, max: 100 },
      },
    })

    useCharacterStore.setState({ character })
    useCharacterStore.getState().updateName('<b>New Name</b>')

    const updated = useCharacterStore.getState().character

    expect(updated?.name).toBe('New Name')
    expect(updated?.inventory).toBe(character.inventory)
    expect(Object.isFrozen(updated)).toBe(true)
  })

  it('updates bestiary companions through the centralized character state', () => {
    const bestiary: GeneratedBestiary = {
      mounts: [],
      mountBags: [],
      pets: [],
      summons: [],
      mount: {
        id: 'draft_beasts',
        name: 'Riding Horse',
        category: 'BEAST',
      },
      mountBag: null,
      pet: null,
      summon: null,
      favoriteMount: null,
      favoritePet: null,
    }
    const character = makeTestCharacter({ bestiary })

    useCharacterStore.setState({ character })
    useCharacterStore.getState().updateBestiary({
      mount: {
        id: 'scourge_runners',
        name: 'Scourge Runners',
        category: 'BEAST',
      },
    })

    const updated = useCharacterStore.getState().character

    expect(updated?.bestiary.mount?.id).toBe('scourge_runners')
    expect(updated?.bestiary.mountBag).toBeNull()
    expect(updated).not.toBe(character)
    expect(Object.isFrozen(updated)).toBe(true)
  })
})
