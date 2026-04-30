import { describe, expect, it } from 'vitest'
import { ICON_REGISTRY } from '../../src/data/inventory/icons'
import { entry } from '../../src/logic/ExpansionUtils'

describe('ExpansionUtils icon enrichment', () => {
  it('adds a registered icon to normalized generated entries from broad descriptor fields', () => {
    const generated = entry({
      id: 'shield_master',
      name: 'Unmarked Talent',
      category: 'Combat',
      benefit: 'The character can use their shield to shove enemies and brace behind it.',
    })

    expect(generated.icon).toBe('GiShield')
    expect(ICON_REGISTRY[generated.icon as keyof typeof ICON_REGISTRY], generated.name).toBeTypeOf('function')
  })
})
