import { describe, expect, it } from 'vitest'
import {
  buildCharacterDestination,
  createFallbackSeed,
  normalizeCharacterName,
  normalizeCharacterSeed,
} from '../../src/routes/buildCharacterDestination'

describe('buildCharacterDestination', () => {
  it('keeps an explicit seed and trims the optional name into search params', () => {
    const destination = buildCharacterDestination(
      { name: '  Lyra  ', seed: 'alpha-seed' },
      () => 0,
      () => 1710000000000,
    )

    expect(destination.params.id).toBe('alpha-seed')
    expect(destination.search).toEqual({ name: 'Lyra' })
  })

  it('leaves path parameter encoding to the router', () => {
    const destination = buildCharacterDestination(
      { name: 'Ward', seed: 'foo/bar seed%20' },
      () => 0,
      () => 1710000000000,
    )

    expect(destination.params.id).toBe('foo/bar seed%20')
  })

  it('generates a deterministic fallback seed when the field is blank', () => {
    const destination = buildCharacterDestination(
      { name: '', seed: '' },
      () => 0,
      () => 1710000000000,
    )

    expect(destination.params.id).toContain('ltk9ukg0')
    expect(destination.search).toEqual({})
  })

  it('normalizes route input without changing ordinary names and seeds', () => {
    expect(normalizeCharacterName('  Lyra <b>Bright</b>\n')).toBe('Lyra Bright')
    expect(normalizeCharacterName('x'.repeat(140))).toHaveLength(100)
    expect(normalizeCharacterSeed('  foo/bar seed%20\u0000  ')).toBe('foo/bar seed%20')
    expect(normalizeCharacterSeed('s'.repeat(600))).toHaveLength(512)
  })

  it('keeps fallback seeds bounded even with a long timestamp source', () => {
    const seed = createFallbackSeed(
      () => 0,
      () => Number.MAX_SAFE_INTEGER,
    )

    expect(seed.length).toBeLessThanOrEqual(128)
    expect(seed).toMatch(/^[A-Za-z0-9]+$/)
  })
})
