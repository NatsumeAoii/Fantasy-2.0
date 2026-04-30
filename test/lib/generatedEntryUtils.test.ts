import { describe, expect, it } from 'vitest'
import {
  formatMetadataLabel,
  formatMetadataValue,
  matchesGeneratedEntry,
  uniqueGeneratedEntries,
} from '../../src/lib/generatedEntryUtils'
import type { GeneratedPoolEntry } from '../../src/types'

const entry: GeneratedPoolEntry = {
  id: 'draconic_oath',
  name: 'Draconic Oath',
  category: 'Bond',
  type: 'Secret',
  tier: 2,
  rarity: 'Rare',
  description: 'A vow sealed beneath old ruins.',
  variant: {
    name: 'Ash-Signed',
    description: 'The character carries a blackened sigil.',
  },
  metadata: {
    dangerLevel: 'High',
    isKnown: true,
  },
}

describe('generatedEntryUtils', () => {
  it('matches generated entries across display fields, variants, and metadata', () => {
    expect(matchesGeneratedEntry('ash signed', entry)).toBe(true)
    expect(matchesGeneratedEntry('danger', entry)).toBe(false)
    expect(matchesGeneratedEntry('high', entry)).toBe(true)
    expect(matchesGeneratedEntry('missing term', entry)).toBe(false)
  })

  it('deduplicates generated entries by id while preserving first-seen order', () => {
    expect(uniqueGeneratedEntries([entry, null, { ...entry, name: 'Duplicate' }, { id: 'second', name: 'Second' }])).toEqual([
      entry,
      { id: 'second', name: 'Second' },
    ])
  })

  it('formats metadata labels and values for display', () => {
    expect(formatMetadataLabel('dangerLevel')).toBe('Danger Level')
    expect(formatMetadataLabel('mount_id')).toBe('Mount Id')
    expect(formatMetadataValue(true)).toBe('Yes')
    expect(formatMetadataValue(false)).toBe('No')
    expect(formatMetadataValue(null)).toBe('Unknown')
  })
})
