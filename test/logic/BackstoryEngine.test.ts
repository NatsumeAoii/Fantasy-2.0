import { describe, expect, it } from 'vitest'
import { generateCharacter, setSeed } from '../../src/lib'
import { BackstoryEngine } from '../../src/logic/BackstoryEngine'

describe('BackstoryEngine', () => {
  it('adds faction-specific story fragments for affiliated characters', () => {
    const base = generateCharacter({ seed: 'faction-story-base', name: 'Ilyra' })
    const character = {
      ...base,
      name: 'Ilyra',
      role: 'Mage',
      level: 80,
      guild: 'Silver Archive',
      faction: 'Arcane Circle',
    }

    setSeed('faction-story-fragment')
    const story = BackstoryEngine.generate(character)
    setSeed(null)

    expect(story.paragraphs).toHaveLength(6)
    expect(story.paragraphs[3]).toContain('Arcane Circle')
    expect(story.paragraphs[3]).toContain('Silver Archive')
  })

  it('keeps unaffiliated backstories compact', () => {
    const base = generateCharacter({ seed: 'lone-story-base', name: 'Rook' })
    const character = {
      ...base,
      guild: 'None',
      faction: 'None',
    }

    const story = BackstoryEngine.generate(character)

    expect(story.paragraphs).toHaveLength(5)
  })

  it('uses special power names instead of raw power ids in generated story text', () => {
    const base = generateCharacter({ seed: 'draconic-power-story-base', name: 'Sareth' })
    const character = {
      ...base,
      name: 'Sareth',
      race: 'Draconic',
      role: 'Dragon Knight',
      specialPowers: {
        draconicPower_ultimate: 91,
      },
    }

    setSeed('draconic-power-story')
    const story = BackstoryEngine.generate(character)
    setSeed(null)

    const fullText = [story.summary, ...story.paragraphs].join(' ')

    expect(fullText).toContain('Aspect of the Wyrm')
    expect(fullText).not.toContain('draconicPower_ultimate')
  })
})
