import { generateCharacter } from '../src/lib/generator'
import type { Character } from '../src/types'

export function makeTestCharacter(overrides: Partial<Character> = {}): Character {
  const base = generateCharacter({
    seed: 'cathedral-brass-fixture',
    name: 'Lyra Ashdown',
  })

  return {
    ...base,
    ...overrides,
    stats: overrides.stats ?? base.stats,
    inventory: overrides.inventory ?? base.inventory,
    backstory: overrides.backstory ?? base.backstory,
  }
}
