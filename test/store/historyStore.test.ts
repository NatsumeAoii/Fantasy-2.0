import { beforeEach, describe, expect, it } from 'vitest'
import { useHistoryStore } from '../../src/store/historyStore'
import type { CharacterSnapshot } from '../../src/store/historyStore'

function makeSnapshot(overrides: Partial<CharacterSnapshot> = {}): Omit<CharacterSnapshot, 'timestamp' | 'isFavorite'> {
  return {
    seed: overrides.seed ?? 'test-seed',
    name: overrides.name ?? 'Test Character',
    race: overrides.race ?? 'Human',
    role: overrides.role ?? 'Warrior',
    level: overrides.level ?? 50,
    region: overrides.region ?? 'The Ashfields',
    topStat: overrides.topStat ?? 'Strength',
    dpsRange: overrides.dpsRange ?? '100-120',
  }
}

describe('historyStore', () => {
  beforeEach(() => {
    useHistoryStore.setState({ entries: [], comparison: null })
  })

  it('adds a new entry with a timestamp and isFavorite: false', () => {
    const before = Date.now()
    useHistoryStore.getState().addEntry(makeSnapshot({ seed: 'seed-1' }))
    const after = Date.now()

    const entries = useHistoryStore.getState().entries
    expect(entries).toHaveLength(1)
    expect(entries[0].seed).toBe('seed-1')
    expect(entries[0].isFavorite).toBe(false)
    expect(entries[0].timestamp).toBeGreaterThanOrEqual(before)
    expect(entries[0].timestamp).toBeLessThanOrEqual(after)
  })

  it('deduplicates by seed — updates existing entry and moves it to front', () => {
    useHistoryStore.getState().addEntry(makeSnapshot({ seed: 'seed-1', name: 'First' }))
    useHistoryStore.getState().addEntry(makeSnapshot({ seed: 'seed-2', name: 'Second' }))
    useHistoryStore.getState().addEntry(makeSnapshot({ seed: 'seed-1', name: 'First Updated' }))

    const entries = useHistoryStore.getState().entries
    expect(entries).toHaveLength(2)
    expect(entries[0].seed).toBe('seed-1')
    expect(entries[0].name).toBe('First Updated')
  })

  it('preserves isFavorite when deduplicating', () => {
    useHistoryStore.getState().addEntry(makeSnapshot({ seed: 'seed-1' }))
    useHistoryStore.getState().toggleFavorite('seed-1')
    useHistoryStore.getState().addEntry(makeSnapshot({ seed: 'seed-1', name: 'Updated' }))

    const entry = useHistoryStore.getState().entries.find((e) => e.seed === 'seed-1')
    expect(entry?.isFavorite).toBe(true)
  })

  it('removes an entry by seed', () => {
    useHistoryStore.getState().addEntry(makeSnapshot({ seed: 'seed-1' }))
    useHistoryStore.getState().addEntry(makeSnapshot({ seed: 'seed-2' }))
    useHistoryStore.getState().removeEntry('seed-1')

    const entries = useHistoryStore.getState().entries
    expect(entries).toHaveLength(1)
    expect(entries[0].seed).toBe('seed-2')
  })

  it('toggles favorite on and off', () => {
    useHistoryStore.getState().addEntry(makeSnapshot({ seed: 'seed-1' }))
    useHistoryStore.getState().toggleFavorite('seed-1')
    expect(useHistoryStore.getState().entries[0].isFavorite).toBe(true)

    useHistoryStore.getState().toggleFavorite('seed-1')
    expect(useHistoryStore.getState().entries[0].isFavorite).toBe(false)
  })

  it('clearHistory removes non-favorites but keeps favorites', () => {
    useHistoryStore.getState().addEntry(makeSnapshot({ seed: 'seed-1' }))
    useHistoryStore.getState().addEntry(makeSnapshot({ seed: 'seed-2' }))
    useHistoryStore.getState().toggleFavorite('seed-1')
    useHistoryStore.getState().clearHistory()

    const entries = useHistoryStore.getState().entries
    expect(entries).toHaveLength(1)
    expect(entries[0].seed).toBe('seed-1')
  })

  it('clears comparison when a compared entry is removed', () => {
    useHistoryStore.getState().addEntry(makeSnapshot({ seed: 'left' }))
    useHistoryStore.getState().addEntry(makeSnapshot({ seed: 'right' }))
    const [left, right] = useHistoryStore.getState().entries
    useHistoryStore.getState().setComparison(left, right)

    expect(useHistoryStore.getState().comparison).not.toBeNull()

    useHistoryStore.getState().removeEntry('left')
    expect(useHistoryStore.getState().comparison).toBeNull()
  })

  it('getRecent returns the N most recent entries', () => {
    for (let i = 0; i < 5; i++) {
      useHistoryStore.getState().addEntry(makeSnapshot({ seed: `seed-${i}` }))
    }
    const recent = useHistoryStore.getState().getRecent(3)
    expect(recent).toHaveLength(3)
    // Most recent is first (seed-4 was added last)
    expect(recent[0].seed).toBe('seed-4')
  })

  it('getFavorites returns only favorited entries', () => {
    useHistoryStore.getState().addEntry(makeSnapshot({ seed: 'seed-1' }))
    useHistoryStore.getState().addEntry(makeSnapshot({ seed: 'seed-2' }))
    useHistoryStore.getState().toggleFavorite('seed-1')

    const favorites = useHistoryStore.getState().getFavorites()
    expect(favorites).toHaveLength(1)
    expect(favorites[0].seed).toBe('seed-1')
  })
})
