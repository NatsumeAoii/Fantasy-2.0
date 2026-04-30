import { describe, expect, it } from 'vitest'
import { setSeed } from '../../src/lib'
import { PoolEngine } from '../../src/logic/PoolEngine'

describe('PoolEngine', () => {
  it('picks weighted entries without replacement and preserves deterministic seeded output', () => {
    const pool = [
      { id: 'low', name: 'Low', weight: 1 },
      { id: 'mid', name: 'Mid', weight: 5 },
      { id: 'high', name: 'High', weight: 10 },
    ]

    setSeed('pool-seed')
    const first = PoolEngine.pickManyWeighted(pool, 2, (item) => item.weight)
    setSeed('pool-seed')
    const second = PoolEngine.pickManyWeighted(pool, 2, (item) => item.weight)
    setSeed(null)

    expect(first.map((item) => item.id)).toEqual(second.map((item) => item.id))
    expect(new Set(first.map((item) => item.id)).size).toBe(first.length)
  })

  it('falls back when the primary candidate pool is empty', () => {
    const selected = PoolEngine.pickManyWeighted(
      [],
      1,
      (item: { weight?: number }) => item.weight,
      { fallbackPool: [{ id: 'backup', name: 'Backup', weight: 1 }] },
    )

    expect(selected).toHaveLength(1)
    expect(selected[0].id).toBe('backup')
  })

  it('ignores invalid weights and clamps counts for unique selection', () => {
    const selected = PoolEngine.pickManyWeighted(
      [
        { id: 'zero', weight: 0 },
        { id: 'bad', weight: Number.NaN },
        { id: 'valid', weight: 2 },
      ],
      20,
      (item) => item.weight,
    )

    expect(selected).toEqual([{ id: 'valid', weight: 2 }])
  })
})
