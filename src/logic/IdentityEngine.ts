import { IDENTITY_CONFIG } from '../config'
import { BONDS, PSYCHOLOGICAL_TRAITS, QUIRKS, SECRETS } from '../data/identity'
import type { CharacterCore, GeneratedIdentity, GeneratedPoolEntry } from '../types'
import { entry, pickVariant, resolveChance, resolveCount } from './ExpansionUtils'
import { PoolEngine } from './PoolEngine'

function normalizeBond(bond: (typeof BONDS)[number]): GeneratedPoolEntry {
  return entry({
    id: bond.id,
    name: bond.name,
    category: bond.target,
    description: bond.variants[0]?.desc ?? bond.name,
    mechanicalEffect: bond.mechanicalEffect,
    variant: pickVariant(bond.variants),
    metadata: { weight: bond.weight },
  })
}

function normalizeQuirk(quirk: (typeof QUIRKS)[number]): GeneratedPoolEntry {
  return entry({
    id: quirk.id,
    name: quirk.name,
    category: quirk.type,
    description: quirk.description,
    mechanicalEffect: quirk.mechanicalEffect,
    variant: pickVariant(quirk.variants),
    metadata: { weight: quirk.weight },
  })
}

function normalizeSecret(secret: (typeof SECRETS)[number]): GeneratedPoolEntry {
  return entry({
    id: secret.id,
    name: secret.name,
    category: secret.category,
    tier: secret.severity,
    description: secret.description,
    mechanicalEffect: secret.mechanicalEffect,
    variant: pickVariant(secret.variants),
    metadata: { weight: secret.weight },
  })
}

function normalizePsychology(trait: (typeof PSYCHOLOGICAL_TRAITS)[number]): GeneratedPoolEntry {
  return entry({
    id: trait.id,
    name: trait.name,
    category: trait.category,
    type: trait.type,
    description: trait.description,
    mechanicalEffect: trait.mechanicalEffect,
    variant: pickVariant(trait.variants),
    metadata: { trigger: trait.trigger, weight: trait.weight },
  })
}

export const IdentityEngine = {
  generate(character: CharacterCore): GeneratedIdentity {
    const bonds = PoolEngine
      .pickManyWeighted(BONDS, resolveCount(IDENTITY_CONFIG.BONDS.COUNT_BY_LEVEL, character.level), (bond) => bond.weight)
      .map(normalizeBond)

    const quirks = PoolEngine
      .pickManyWeighted(QUIRKS, resolveCount(IDENTITY_CONFIG.QUIRKS.COUNT_BY_LEVEL, character.level), (quirk) => quirk.weight)
      .map(normalizeQuirk)

    const secretCount = PoolEngine.rollChance(resolveChance(IDENTITY_CONFIG.SECRETS.CHANCE_BY_LEVEL, character.level))
      ? resolveCount(IDENTITY_CONFIG.SECRETS.COUNT_BY_LEVEL, character.level)
      : 0
    const secrets = PoolEngine
      .pickManyWeighted(SECRETS, secretCount, (secret) => secret.weight)
      .map(normalizeSecret)

    const psychologicalCount = PoolEngine.rollChance(resolveChance(IDENTITY_CONFIG.PSYCHOLOGY.CHANCE_BY_LEVEL, character.level))
      ? resolveCount(IDENTITY_CONFIG.PSYCHOLOGY.COUNT_BY_LEVEL, character.level)
      : 0
    const psychologicalTraits = PoolEngine
      .pickManyWeighted(PSYCHOLOGICAL_TRAITS, psychologicalCount, (trait) => trait.weight)
      .map(normalizePsychology)

    return { bonds, quirks, secrets, psychologicalTraits }
  },
}
