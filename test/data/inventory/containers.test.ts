import { describe, expect, it } from 'vitest'
import { CONTAINERS } from '../../../src/data/inventory/containers'

describe('CONTAINERS', () => {
  it('keeps container satchel slot bonuses increased by two slots', () => {
    expect(Object.fromEntries(CONTAINERS.map((container) => [container.id, container.extraSlots]))).toEqual({
      small_backpack: 10,
      large_backpack: 18,
      belt_pouch: 4,
      utility_belt: 6,
      scroll_case: 8,
      quiver: 5,
      saddlebag: 12,
    })
  })
})
