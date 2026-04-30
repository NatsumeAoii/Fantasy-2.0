import { describe, expect, it } from 'vitest'
import { safeGenerateSection } from '../../src/logic/ExpansionErrorHandler'

describe('ExpansionErrorHandler', () => {
  it('returns a typed fallback when a section generator fails', () => {
    const fallback = { items: [] as string[] }
    const result = safeGenerateSection('inventoryContext.cuisine', () => fallback, () => {
      throw new Error('bad pool')
    })

    expect(result).toEqual(fallback)
  })
})
