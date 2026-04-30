import { describe, expect, it } from 'vitest'
import { resolveCountRoll } from '../../src/logic/ExpansionUtils'

describe('ExpansionUtils', () => {
  it('resolves the primary count range when the chance roll succeeds', () => {
    const count = resolveCountRoll([
      { maxLevel: 50, chance: 1, count: { min: 4, max: 4 }, fallbackCount: { min: 1, max: 1 } },
    ], 20)

    expect(count).toBe(4)
  })

  it('resolves the fallback count range when the chance roll misses', () => {
    const count = resolveCountRoll([
      { maxLevel: 50, chance: 0, count: { min: 4, max: 4 }, fallbackCount: { min: 1, max: 1 } },
    ], 20)

    expect(count).toBe(1)
  })
})
