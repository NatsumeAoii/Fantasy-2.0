import { describe, expect, it } from 'vitest'
import { ICON_REGISTRY } from '../../src/data/inventory/icons'
import { generateCharacter } from '../../src/lib'
import type { GeneratedPoolEntry } from '../../src/types'
import { generateCharacterExpansions } from '../../src/logic/CharacterExpansionEngine'
import { BestiaryEngine } from '../../src/logic/BestiaryEngine'
import { makeTestCharacter } from '../makeTestCharacter'

function collectEntries(character: ReturnType<typeof generateCharacter>): GeneratedPoolEntry[] {
  return [
    ...character.identity.bonds,
    ...character.identity.quirks,
    ...character.identity.secrets,
    ...character.identity.psychologicalTraits,
    ...character.world.languages,
    ...(character.world.deity ? [character.world.deity] : []),
    ...character.world.customs,
    ...character.world.landmarks,
    ...(character.world.history ? [character.world.history] : []),
    ...character.magic.spells,
    ...character.magic.hazards,
    ...character.mechanics.feats,
    ...character.mechanics.achievements,
    ...character.mechanics.afflictions,
    ...character.mechanics.crimes,
    ...character.mechanics.martialArts,
    ...(character.bestiary.mount ? [character.bestiary.mount] : []),
    ...(character.bestiary.mountBag ? [character.bestiary.mountBag] : []),
    ...(character.bestiary.pet ? [character.bestiary.pet] : []),
    ...(character.bestiary.summon ? [character.bestiary.summon] : []),
    ...(character.bestiary.favoriteMount ? [character.bestiary.favoriteMount] : []),
    ...(character.bestiary.favoritePet ? [character.bestiary.favoritePet] : []),
    ...character.bestiary.mounts,
    ...character.bestiary.mountBags,
    ...character.bestiary.pets,
    ...character.bestiary.summons,
    ...character.inventoryContext.curios,
    ...character.inventoryContext.cuisine,
    ...character.inventoryContext.enchantments,
    ...character.inventoryContext.instruments,
    ...character.inventoryContext.merchandise,
    ...character.inventoryContext.recipes,
  ]
}

describe('CharacterExpansionEngine', () => {
  it('adds deterministic normalized expansions to generated characters', () => {
    const first = generateCharacter({ seed: 'expansion-seed', name: 'Astra' })
    const second = generateCharacter({ seed: 'expansion-seed', name: 'Astra' })

    expect(first.identity.bonds.length).toBeGreaterThan(0)
    expect(first.identity.quirks.length).toBeGreaterThan(0)
    expect(first.world.languages.length).toBeGreaterThan(0)
    expect(first.mechanics.feats.length).toBeGreaterThan(0)
    expect(first.magic.spells.length).toBeGreaterThanOrEqual(0)
    expect(first.bestiary).toHaveProperty('mount')
    expect(first.bestiary.mounts).toEqual(expect.any(Array))
    expect(first.bestiary.mountBags).toEqual(expect.any(Array))
    expect(first.bestiary.pets).toEqual(expect.any(Array))
    expect(first.bestiary.summons).toEqual(expect.any(Array))
    expect(first.bestiary.favoriteMount).toEqual(expect.objectContaining({
      id: expect.any(String),
      name: expect.any(String),
    }))
    expect(first.bestiary.favoritePet).toEqual(expect.objectContaining({
      id: expect.any(String),
      name: expect.any(String),
    }))
    expect(first.inventoryContext.curios.length).toBeGreaterThan(0)
    expect(first.inventoryContext.cuisine.length).toBeGreaterThan(0)
    expect(first.inventoryContext.enchantments.length).toBeGreaterThan(0)
    expect(first.inventoryContext.instruments.length).toBeGreaterThan(0)
    expect(first.inventoryContext.merchandise.length).toBeGreaterThan(0)
    expect(first.inventoryContext.recipes.length).toBeGreaterThan(0)

    expect(first.identity).toEqual(second.identity)
    expect(first.world).toEqual(second.world)
    expect(first.magic).toEqual(second.magic)
    expect(first.mechanics).toEqual(second.mechanics)
    expect(first.bestiary).toEqual(second.bestiary)
    expect(first.inventoryContext).toEqual(second.inventoryContext)
  })

  it('scales owned bestiary rosters upward for very high level characters', () => {
    const bestiary = BestiaryEngine.generate(makeTestCharacter({
      level: 9999,
      race: 'Human',
      role: 'Arch Summoner',
    }))

    expect(bestiary.mounts.length).toBeGreaterThanOrEqual(3)
    expect(bestiary.pets.length).toBeGreaterThanOrEqual(4)
    expect(bestiary.summons.length).toBeGreaterThanOrEqual(3)
    expect(bestiary.mount?.id).toBe(bestiary.mounts[0]?.id)
    expect(bestiary.pet?.id).toBe(bestiary.pets[0]?.id)
    expect(bestiary.summon?.id).toBe(bestiary.summons[0]?.id)
  })

  it('keeps expansion entries lightweight and display-ready', () => {
    const character = generateCharacter({ seed: 'display-ready-expansion', name: 'Mira' })
    const [bond] = character.identity.bonds
    const [language] = character.world.languages

    expect(bond).toEqual(expect.objectContaining({
      id: expect.any(String),
      name: expect.any(String),
      category: expect.any(String),
    }))
    expect(bond.variant?.name).toEqual(expect.any(String))
    expect(language).toEqual(expect.objectContaining({
      id: expect.any(String),
      name: expect.any(String),
    }))
  })

  it('adds registered icons to every generated expansion entry', () => {
    const character = generateCharacter({ seed: 'full-expansion-icon-coverage', name: 'Aster' })
    const entries = collectEntries(character)

    expect(entries.length).toBeGreaterThan(10)
    for (const generatedEntry of entries) {
      expect(generatedEntry.icon, `${generatedEntry.id}: ${generatedEntry.name}`).toBeTruthy()
      expect(
        ICON_REGISTRY[generatedEntry.icon as keyof typeof ICON_REGISTRY],
        `${generatedEntry.id}: ${generatedEntry.icon}`,
      ).toBeTypeOf('function')
    }
  })

  it('keeps generating other expansion sections when one section fails', () => {
    const character = generateCharacter({ seed: 'safe-expansion-fallback', name: 'Sable' })
    const expansions = generateCharacterExpansions(character, {
      identity: () => {
        throw new Error('identity pool unavailable')
      },
    })

    expect(expansions.identity).toEqual({
      bonds: [],
      quirks: [],
      secrets: [],
      psychologicalTraits: [],
    })
    expect(expansions.world.languages.length).toBeGreaterThan(0)
    expect(expansions.inventoryContext.curios.length).toBeGreaterThan(0)
  })
})
