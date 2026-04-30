import { describe, expect, it } from 'vitest'
import { ICON_REGISTRY } from '../../src/data/inventory/icons'
import { setSeed } from '../../src/lib/randomUtils'
import { LoreEngine } from '../../src/logic/LoreEngine'

describe('LoreEngine icon enrichment', () => {
  it('adds registered semantic icons to generated skills and titles', () => {
    setSeed('semantic-lore-icons')

    const { skills, titles } = LoreEngine.generateSkillsAndTitles('Archmage', 100, false)
    const generatedEntries = [...skills, ...titles]

    expect(generatedEntries.length).toBeGreaterThan(0)
    for (const entry of generatedEntries) {
      expect(entry.icon, entry.name).toBeTruthy()
      expect(ICON_REGISTRY[entry.icon as keyof typeof ICON_REGISTRY], entry.name).toBeTypeOf('function')
    }
  })
})
