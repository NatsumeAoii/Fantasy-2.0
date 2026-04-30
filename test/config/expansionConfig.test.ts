import { describe, expect, it } from 'vitest'
import * as CONFIG_EXPORTS from '../../src/config/index'
import {
  BESTIARY_CONFIG,
  CHARACTER_CONFIG,
  IDENTITY_CONFIG,
  INVENTORY_CONFIG,
  INVENTORY_EXPANSION_CONFIG,
  MAGIC_CONFIG,
  MECHANICS_CONFIG,
  WORLD_CONFIG,
} from '../../src/config/index'

type CountBracket = { maxLevel: number; count: { min: number; max: number }; chance?: number; fallbackCount?: unknown }
type ChanceBracket = { maxLevel: number; chance: number }
type CountRollBracket = CountBracket & { chance: number; fallbackCount: { min: number; max: number } }
type RangeBracket = { maxLevel: number; range: { min: number; max: number } }
type VariableQualityBracket = { maxLevel: number } & Record<string, unknown>

const EXPECTED_LEVEL_BANDS = [10, 25, 50, 69, 100, 249, 499, 999, 2999, Infinity]

const regularCountTables: Array<{ name: string; brackets: readonly CountBracket[] }> = [
  { name: 'identity.bonds', brackets: IDENTITY_CONFIG.BONDS.COUNT_BY_LEVEL },
  { name: 'identity.quirks', brackets: IDENTITY_CONFIG.QUIRKS.COUNT_BY_LEVEL },
  { name: 'identity.secrets', brackets: IDENTITY_CONFIG.SECRETS.COUNT_BY_LEVEL },
  { name: 'identity.psychology', brackets: IDENTITY_CONFIG.PSYCHOLOGY.COUNT_BY_LEVEL },
  { name: 'world.languages', brackets: WORLD_CONFIG.LANGUAGES.COUNT_BY_LEVEL },
  { name: 'world.customs', brackets: WORLD_CONFIG.CUSTOMS.COUNT_BY_LEVEL },
  { name: 'world.landmarks', brackets: WORLD_CONFIG.LANDMARKS.COUNT_BY_LEVEL },
  { name: 'magic.spells', brackets: MAGIC_CONFIG.SPELLS.COUNT_BY_LEVEL },
  { name: 'magic.hazards', brackets: MAGIC_CONFIG.HAZARDS.COUNT_BY_LEVEL },
  { name: 'mechanics.feats', brackets: MECHANICS_CONFIG.FEATS.COUNT_BY_LEVEL },
  { name: 'mechanics.achievements', brackets: MECHANICS_CONFIG.ACHIEVEMENTS.COUNT_BY_LEVEL },
  { name: 'inventory.curios', brackets: INVENTORY_EXPANSION_CONFIG.CURIOS.COUNT_BY_LEVEL },
  { name: 'inventory.cuisine', brackets: INVENTORY_EXPANSION_CONFIG.CUISINE.COUNT_BY_LEVEL },
  { name: 'inventory.enchantments', brackets: INVENTORY_EXPANSION_CONFIG.ENCHANTMENTS.COUNT_BY_LEVEL },
  { name: 'inventory.instruments', brackets: INVENTORY_EXPANSION_CONFIG.INSTRUMENTS.COUNT_BY_LEVEL },
  { name: 'inventory.merchandise', brackets: INVENTORY_EXPANSION_CONFIG.MERCHANDISE.COUNT_BY_LEVEL },
  { name: 'inventory.recipes', brackets: INVENTORY_EXPANSION_CONFIG.RECIPES.COUNT_BY_LEVEL },
]

const bestiaryCountTables: Array<{ name: string; brackets: readonly CountBracket[] }> = [
  { name: 'bestiary.mounts', brackets: BESTIARY_CONFIG.MOUNTS.COUNT_BY_LEVEL },
  { name: 'bestiary.mountBags', brackets: BESTIARY_CONFIG.MOUNT_BAGS.COUNT_BY_LEVEL },
  { name: 'bestiary.pets', brackets: BESTIARY_CONFIG.PETS.COUNT_BY_LEVEL },
  { name: 'bestiary.summons', brackets: BESTIARY_CONFIG.SUMMONS.COUNT_BY_LEVEL },
]

const optionalChanceTables: Array<{ name: string; brackets: readonly ChanceBracket[] }> = [
  { name: 'identity.secrets', brackets: IDENTITY_CONFIG.SECRETS.CHANCE_BY_LEVEL },
  { name: 'identity.psychology', brackets: IDENTITY_CONFIG.PSYCHOLOGY.CHANCE_BY_LEVEL },
  { name: 'world.deities', brackets: WORLD_CONFIG.DEITIES.CHANCE_BY_LEVEL },
  { name: 'world.history', brackets: WORLD_CONFIG.HISTORY.CHANCE_BY_LEVEL },
  { name: 'mechanics.afflictions', brackets: MECHANICS_CONFIG.AFFLICTIONS.CHANCE_BY_LEVEL },
  { name: 'mechanics.crimes', brackets: MECHANICS_CONFIG.CRIMES.CHANCE_BY_LEVEL },
  { name: 'mechanics.martialArts', brackets: MECHANICS_CONFIG.MARTIAL_ARTS.CHANCE_BY_LEVEL },
]

const progressionTables: Array<{ name: string; brackets: readonly { maxLevel: number }[] }> = [
  { name: 'inventory.equipmentTier', brackets: INVENTORY_CONFIG.TIER_RANGES },
  { name: 'inventory.equipmentGuarantee', brackets: INVENTORY_CONFIG.EQUIPMENT_GUARANTEE },
  { name: 'inventory.grade', brackets: INVENTORY_CONFIG.GRADE_BY_LEVEL },
  { name: 'inventory.potionTier', brackets: INVENTORY_CONFIG.POTION_TIER_RANGES },
  { name: 'magic.spellLevel', brackets: MAGIC_CONFIG.SPELLS.MAX_SPELL_LEVEL_BY_CHARACTER_LEVEL },
  { name: 'mechanics.featTier', brackets: MECHANICS_CONFIG.FEATS.MAX_TIER_BY_LEVEL },
  { name: 'bestiary.mountTier', brackets: BESTIARY_CONFIG.MOUNTS.MAX_TIER_BY_LEVEL },
  { name: 'bestiary.petTier', brackets: BESTIARY_CONFIG.PETS.MAX_TIER_BY_LEVEL },
  { name: 'bestiary.summonTier', brackets: BESTIARY_CONFIG.SUMMONS.MAX_TIER_BY_LEVEL },
  { name: 'inventory.enchantmentRarity', brackets: INVENTORY_EXPANSION_CONFIG.ENCHANTMENTS.MAX_RARITY_BY_LEVEL },
  { name: 'inventory.recipeDifficulty', brackets: INVENTORY_EXPANSION_CONFIG.RECIPES.MIN_DIFFICULTY_BY_LEVEL },
]

const rangeTables: Array<{ name: string; brackets: readonly RangeBracket[] }> = [
  { name: 'inventory.equipmentTier', brackets: INVENTORY_CONFIG.TIER_RANGES },
  { name: 'inventory.backpackQuantity', brackets: INVENTORY_CONFIG.BACKPACK_QUANTITY },
]

const variableQualityTables: Array<{
  name: string
  brackets: readonly VariableQualityBracket[]
  choicesKey: string
  legacyKeys: readonly string[]
}> = [
  {
    name: 'magic.spellLevel',
    brackets: MAGIC_CONFIG.SPELLS.MAX_SPELL_LEVEL_BY_CHARACTER_LEVEL,
    choicesKey: 'spellLevels',
    legacyKeys: ['spellLevel'],
  },
  {
    name: 'mechanics.featTier',
    brackets: MECHANICS_CONFIG.FEATS.MAX_TIER_BY_LEVEL,
    choicesKey: 'tiers',
    legacyKeys: ['tier'],
  },
  {
    name: 'bestiary.mountTier',
    brackets: BESTIARY_CONFIG.MOUNTS.MAX_TIER_BY_LEVEL,
    choicesKey: 'tiers',
    legacyKeys: ['tier'],
  },
  {
    name: 'bestiary.petTier',
    brackets: BESTIARY_CONFIG.PETS.MAX_TIER_BY_LEVEL,
    choicesKey: 'tiers',
    legacyKeys: ['tier'],
  },
  {
    name: 'bestiary.summonTier',
    brackets: BESTIARY_CONFIG.SUMMONS.MAX_TIER_BY_LEVEL,
    choicesKey: 'tiers',
    legacyKeys: ['tier'],
  },
  {
    name: 'inventory.enchantmentRarity',
    brackets: INVENTORY_EXPANSION_CONFIG.ENCHANTMENTS.MAX_RARITY_BY_LEVEL,
    choicesKey: 'rarities',
    legacyKeys: ['rarity'],
  },
  {
    name: 'inventory.recipeDifficulty',
    brackets: INVENTORY_EXPANSION_CONFIG.RECIPES.MIN_DIFFICULTY_BY_LEVEL,
    choicesKey: 'difficultyModifiers',
    legacyKeys: ['difficultyModifier'],
  },
]

function expectAscendingLevelBands(name: string, brackets: readonly { maxLevel: number }[]) {
  expect(brackets.map((bracket) => bracket.maxLevel), name).toEqual(EXPECTED_LEVEL_BANDS)

  for (let index = 1; index < brackets.length; index += 1) {
    expect(brackets[index].maxLevel, name).toBeGreaterThan(brackets[index - 1].maxLevel)
  }
}

function expectGenerousAfterLevel50(name: string, brackets: readonly CountBracket[]) {
  const level50 = brackets.find((bracket) => bracket.maxLevel === 50)
  const afterLevel50 = brackets.find((bracket) => bracket.maxLevel > 50)

  expect(level50, name).toBeDefined()
  expect(afterLevel50, name).toBeDefined()
  expect(afterLevel50!.count.max, name).toBeGreaterThan(level50!.count.max)
}

function expectRangeGenerousAfterLevel50(name: string, brackets: readonly RangeBracket[]) {
  const level50 = brackets.find((bracket) => bracket.maxLevel === 50)
  const afterLevel50 = brackets.find((bracket) => bracket.maxLevel > 50)

  expect(level50, name).toBeDefined()
  expect(afterLevel50, name).toBeDefined()
  expect(afterLevel50!.range.max, name).toBeGreaterThan(level50!.range.max)
}

describe('expansion config', () => {
  it('exports domain configs without a dead shared pool config', () => {
    expect(CONFIG_EXPORTS).not.toHaveProperty('POOL_CONFIG')
    expect(CHARACTER_CONFIG.LEVEL.MAX).toBeGreaterThan(0)
    expect(CHARACTER_CONFIG.AGE.BRACKETS.length).toBeGreaterThanOrEqual(5)
  })

  it('keeps expansion counts finite and chance values normalized', () => {
    expect(IDENTITY_CONFIG.BONDS.COUNT_BY_LEVEL[0].count.min).toBeGreaterThanOrEqual(0)
    expect(IDENTITY_CONFIG.ATLAS.POOL_LIMITS.bonds).toBeGreaterThan(0)
    expect(IDENTITY_CONFIG.ATLAS.POOL_LIMITS.variants).toBeGreaterThan(0)
    expect(WORLD_CONFIG.LANGUAGES.COUNT_BY_LEVEL[0].count.min).toBeGreaterThanOrEqual(1)
    expect(WORLD_CONFIG.ATLAS.POOL_LIMITS.languages).toBeGreaterThan(0)
    expect(WORLD_CONFIG.HISTORY.SOURCE_REVEAL_BY_LEVEL[0].chance).toBeGreaterThanOrEqual(0)
    expect(WORLD_CONFIG.HISTORY.SOURCE_REVEAL_BY_LEVEL[0].chance).toBeLessThanOrEqual(1)
    expect(MAGIC_CONFIG.SPELLS.CASTER_ROLE_KEYWORDS.length).toBeGreaterThan(0)
    expect(MECHANICS_CONFIG.FEATS.COUNT_BY_LEVEL[0].count.max).toBeGreaterThan(0)
    expect(BESTIARY_CONFIG.MOUNTS.COUNT_BY_LEVEL[0].count.min).toBeGreaterThanOrEqual(1)
    expect(INVENTORY_EXPANSION_CONFIG.CURIOS.COUNT_BY_LEVEL[0].count.min).toBeGreaterThanOrEqual(1)
  })

  it('keeps ordinary amount pools as level-scaled min/max tables', () => {
    for (const { name, brackets } of regularCountTables) {
      expectAscendingLevelBands(name, brackets)
      expectGenerousAfterLevel50(name, brackets)

      for (const bracket of brackets) {
        expect(bracket.count.min, name).toBeLessThanOrEqual(bracket.count.max)
        expect(bracket.maxLevel, name).toBeGreaterThan(0)
        expect(bracket, name).not.toHaveProperty('chance')
        expect(bracket, name).not.toHaveProperty('fallbackCount')
      }
    }

    for (const { name, brackets } of rangeTables) {
      expectAscendingLevelBands(name, brackets)
      expectRangeGenerousAfterLevel50(name, brackets)

      for (const bracket of brackets) {
        expect(bracket.range.min, name).toBeLessThanOrEqual(bracket.range.max)
        expect(bracket.maxLevel, name).toBeGreaterThan(0)
      }
    }
  })

  it('uses the same ten level bands for level-gated pool quality', () => {
    for (const { name, brackets } of progressionTables) {
      expectAscendingLevelBands(name, brackets)
    }
  })

  it('keeps level-gated quality as variable choice pools instead of fixed values', () => {
    for (const { name, brackets, choicesKey, legacyKeys } of variableQualityTables) {
      expectAscendingLevelBands(name, brackets)

      for (const bracket of brackets) {
        const choices = bracket[choicesKey]

        expect(Array.isArray(choices), name).toBe(true)
        expect((choices as unknown[]).length, name).toBeGreaterThan(0)

        for (const legacyKey of legacyKeys) {
          expect(bracket, name).not.toHaveProperty(legacyKey)
        }
      }

      const afterLevel50 = brackets.filter((bracket) => bracket.maxLevel > 50)
      expect(
        afterLevel50.some((bracket) => (bracket[choicesKey] as unknown[]).length > 1),
        name,
      ).toBe(true)
    }
  })

  it('uses chance only for optional pools or special reveal rolls', () => {
    for (const { name, brackets } of optionalChanceTables) {
      expectAscendingLevelBands(name, brackets)

      for (const bracket of brackets) {
        expect(bracket.chance, name).toBeGreaterThanOrEqual(0)
        expect(bracket.chance, name).toBeLessThanOrEqual(1)
      }
    }

    expectAscendingLevelBands('world.historySources', WORLD_CONFIG.HISTORY.SOURCE_REVEAL_BY_LEVEL)

    for (const bracket of WORLD_CONFIG.HISTORY.SOURCE_REVEAL_BY_LEVEL as readonly CountRollBracket[]) {
      expect(bracket.count.min).toBeLessThanOrEqual(bracket.count.max)
      expect(bracket.fallbackCount.min).toBeLessThanOrEqual(bracket.fallbackCount.max)
      expect(bracket.count.max).toBeLessThanOrEqual(bracket.fallbackCount.max)
      expect(bracket.chance).toBeGreaterThanOrEqual(0)
      expect(bracket.chance).toBeLessThanOrEqual(1)
    }
  })

  it('keeps bestiary rolls as plain min/max count tables with fair high-level growth', () => {
    expect(BESTIARY_CONFIG.MOUNTS).not.toHaveProperty('CHANCE_BY_LEVEL')
    expect(BESTIARY_CONFIG.PETS).not.toHaveProperty('CHANCE_BY_LEVEL')
    expect(BESTIARY_CONFIG.SUMMONS).not.toHaveProperty('CHANCE_BY_LEVEL')

    for (const { name, brackets } of bestiaryCountTables) {
      expectAscendingLevelBands(name, brackets)

      for (const bracket of brackets) {
        expect(bracket.count.min, name).toBeLessThanOrEqual(bracket.count.max)
        expect(bracket.count.min, name).toBeGreaterThanOrEqual(1)
        expect(bracket.count.max, name).toBeLessThanOrEqual(name === 'bestiary.pets' ? 5 : 4)
        expect(bracket, name).not.toHaveProperty('chance')
        expect(bracket, name).not.toHaveProperty('fallbackCount')
      }
    }

    expect(BESTIARY_CONFIG.MOUNTS.COUNT_BY_LEVEL[0].count.max).toBe(1)
    expect(BESTIARY_CONFIG.MOUNTS.COUNT_BY_LEVEL.at(-1)?.count.min).toBeGreaterThan(1)
    expect(BESTIARY_CONFIG.PETS.COUNT_BY_LEVEL.at(-1)?.count.min).toBeGreaterThan(1)
    expect(BESTIARY_CONFIG.SUMMONS.COUNT_BY_LEVEL.at(-1)?.count.min).toBeGreaterThan(1)
    expect(BESTIARY_CONFIG.MOUNT_BAGS.COUNT_BY_LEVEL.at(-1)?.count.max).toBe(1)
  })
})
