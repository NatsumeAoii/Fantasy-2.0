import type { CharacterCore, CharacterExpansions } from '../types'
import { BestiaryEngine } from './BestiaryEngine'
import { IdentityEngine } from './IdentityEngine'
import { InventoryExpansionEngine } from './InventoryExpansionEngine'
import { MagicEngine } from './MagicEngine'
import { MechanicsEngine } from './MechanicsEngine'
import { WorldEngine } from './WorldEngine'
import { safeGenerateSection } from './ExpansionErrorHandler'

type ExpansionGenerators = {
  identity: (character: CharacterCore) => CharacterExpansions['identity']
  world: (character: CharacterCore) => CharacterExpansions['world']
  magic: (character: CharacterCore) => CharacterExpansions['magic']
  mechanics: (character: CharacterCore) => CharacterExpansions['mechanics']
  bestiary: (character: CharacterCore) => CharacterExpansions['bestiary']
  inventoryContext: (character: CharacterCore) => CharacterExpansions['inventoryContext']
}

const EXPANSION_FALLBACKS = {
  identity: () => ({ bonds: [], quirks: [], secrets: [], psychologicalTraits: [] }),
  world: () => ({ languages: [], deity: null, customs: [], landmarks: [], history: null }),
  magic: () => ({ spells: [], hazards: [] }),
  mechanics: () => ({ feats: [], achievements: [], afflictions: [], crimes: [], martialArts: [] }),
  bestiary: () => ({
    mounts: [],
    mountBags: [],
    pets: [],
    summons: [],
    mount: null,
    mountBag: null,
    pet: null,
    summon: null,
    favoriteMount: null,
    favoritePet: null,
  }),
  inventoryContext: () => ({
    curios: [],
    cuisine: [],
    enchantments: [],
    instruments: [],
    merchandise: [],
    recipes: [],
  }),
} satisfies { [Key in keyof ExpansionGenerators]: () => ReturnType<ExpansionGenerators[Key]> }

export const DEFAULT_EXPANSION_GENERATORS: ExpansionGenerators = {
  identity: IdentityEngine.generate,
  world: WorldEngine.generate,
  magic: MagicEngine.generate,
  mechanics: MechanicsEngine.generate,
  bestiary: BestiaryEngine.generate,
  inventoryContext: InventoryExpansionEngine.generate,
}

/** Generates all optional character expansion sections with per-section fallbacks. */
export function generateCharacterExpansions(
  character: CharacterCore,
  overrides: Partial<ExpansionGenerators> = {},
): CharacterExpansions {
  const generators = { ...DEFAULT_EXPANSION_GENERATORS, ...overrides }

  return {
    identity: safeGenerateSection('identity', EXPANSION_FALLBACKS.identity, () => generators.identity(character)),
    world: safeGenerateSection('world', EXPANSION_FALLBACKS.world, () => generators.world(character)),
    magic: safeGenerateSection('magic', EXPANSION_FALLBACKS.magic, () => generators.magic(character)),
    mechanics: safeGenerateSection('mechanics', EXPANSION_FALLBACKS.mechanics, () => generators.mechanics(character)),
    bestiary: safeGenerateSection('bestiary', EXPANSION_FALLBACKS.bestiary, () => generators.bestiary(character)),
    inventoryContext: safeGenerateSection(
      'inventoryContext',
      EXPANSION_FALLBACKS.inventoryContext,
      () => generators.inventoryContext(character),
    ),
  }
}

export const CharacterExpansionEngine = {
  generate: generateCharacterExpansions,
}
