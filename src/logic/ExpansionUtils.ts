import { getRandomElement, getRandomNumber } from '../lib/randomUtils'
import { resolveIconName } from '../data/inventory/icons'
import type { GeneratedPoolEntry, GeneratedVariant } from '../types'
import { PoolEngine } from './PoolEngine'

// Re-export bracket types from their canonical config-level location.
// Logic engines and consumers that previously imported these from here continue to work.
export type { CountBracket, CountRollBracket, ChanceBracket, TierBracket, LevelBracket } from '../config/bracketTypes'
import type { CountBracket, CountRollBracket, ChanceBracket, TierBracket, LevelBracket } from '../config/bracketTypes'

type VariantLike = {
  name: string
  desc?: string
  description?: string
  price?: number
}

type RoleWeightedRule = {
  keywords: readonly string[]
  weight: number
}

type PickGeneratedEntriesOptions<T> = {
  pool: readonly T[]
  count: number
  normalize: (item: T) => GeneratedPoolEntry
  weight?: (item: T) => number | undefined
  chance?: number
  fallbackPool?: readonly T[]
  allowDuplicates?: boolean
}

/** Resolves the first level bracket matching the supplied level. */
export function resolveLevelBracket<T extends LevelBracket>(brackets: readonly T[], level: number): T | undefined {
  return brackets.find((entry) => level <= entry.maxLevel) ?? brackets[brackets.length - 1]
}

/** Resolves a random count from a level-bracketed min/max count table. */
export function resolveCount(brackets: readonly CountBracket[], level: number): number {
  const bracket = resolveLevelBracket(brackets, level)
  if (!bracket) return 0
  return getRandomNumber(bracket.count.min, bracket.count.max)
}

/** Resolves a level-bracketed count with a primary chance and fallback range. */
export function resolveCountRoll(brackets: readonly CountRollBracket[], level: number): number {
  const bracket = resolveLevelBracket(brackets, level)
  if (!bracket) return 0

  const chance = Math.max(0, Math.min(1, Number.isFinite(bracket.chance) ? bracket.chance : 0))
  const range = PoolEngine.rollChance(chance) ? bracket.count : bracket.fallbackCount
  return getRandomNumber(range.min, range.max)
}

/** Resolves a normalized 0..1 chance from a level-bracketed chance table. */
export function resolveChance(brackets: readonly ChanceBracket[], level: number): number {
  const bracket = resolveLevelBracket(brackets, level)
  if (!bracket || !Number.isFinite(bracket.chance)) return 0
  return Math.max(0, Math.min(1, bracket.chance))
}

/** Resolves a numeric tier from a level-bracketed tier table. */
export function resolveTier(brackets: readonly TierBracket[], level: number): number {
  const bracket = resolveLevelBracket(brackets, level)
  return getRandomElement(bracket?.tiers ?? []) ?? 1
}

/** Resolves one value from a level-bracketed choice table. */
export function resolveChoice<T, Key extends string>(
  brackets: readonly (LevelBracket & Record<Key, readonly T[]>)[],
  level: number,
  choicesKey: Key,
  fallback: T,
): T {
  const bracket = resolveLevelBracket(brackets, level)
  return getRandomElement(bracket?.[choicesKey] ?? []) ?? fallback
}

/** Checks whether a role contains any of the configured role keywords. */
export function roleMatches(role: string, keywords: readonly string[]): boolean {
  const normalizedRole = role.toLowerCase()
  return keywords.some((keyword) => normalizedRole.includes(keyword.toLowerCase()))
}

/** Performs a case-insensitive exact match against a candidate list. */
export function listIncludes(value: string, candidates?: readonly string[]): boolean {
  if (!candidates || candidates.length === 0) return false
  const normalized = value.toLowerCase()
  return candidates.some((candidate) => candidate.toLowerCase() === normalized)
}

/** Performs a case-sensitive includes check without over-narrowing readonly literal arrays. */
export function includesValue(values: readonly string[], value: string): boolean {
  return values.includes(value)
}

/** Matches either a single association value or any value in an association list. */
export function matchesAssociation(value: string, association: string | readonly string[]): boolean {
  if (typeof association !== 'string') return listIncludes(value, association)
  return association.toLowerCase() === value.toLowerCase()
}

/** Converts a display label into a safe id fragment. */
export function slugify(value: string): string {
  return value
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '_')
    .replace(/^_+|_+$/g, '') || 'entry'
}

/** Picks and normalizes one display variant from a variant-style data list. */
export function pickVariant(variants?: readonly VariantLike[]): GeneratedVariant | undefined {
  const variant = variants && variants.length > 0 ? getRandomElement(variants) : undefined
  if (!variant) return undefined

  return {
    name: variant.name,
    description: variant.desc ?? variant.description ?? '',
    price: variant.price,
  }
}

/** Ensures generated display entries always have an id. */
export function entry(input: GeneratedPoolEntry): GeneratedPoolEntry {
  const id = input.id || slugify(input.name)

  return {
    ...input,
    id,
    icon: resolveIconName({
      explicitIcon: input.icon,
      id,
      name: input.name,
      category: input.category,
      description: input.description,
      effect: input.effect,
      benefit: input.benefit,
      mechanicalEffect: input.mechanicalEffect,
      type: input.type,
      variant: input.variant,
      metadata: input.metadata,
    }),
  }
}

/** Resolves the strongest role-weighted rule matching both the item and character role. */
export function matchingRuleWeight<T extends RoleWeightedRule>(
  role: string,
  rules: readonly T[],
  matchesRule: (rule: T) => boolean,
): number {
  return rules.reduce((weight, rule) => {
    if (!matchesRule(rule)) return weight
    return roleMatches(role, rule.keywords) ? Math.max(weight, rule.weight) : weight
  }, 1)
}

/** Picks weighted data records and maps them into display-ready generated entries. */
export function pickGeneratedEntries<T>(options: PickGeneratedEntriesOptions<T>): GeneratedPoolEntry[] {
  if (options.chance !== undefined && !PoolEngine.rollChance(options.chance)) return []

  return PoolEngine
    .pickManyWeighted(options.pool, options.count, options.weight, {
      fallbackPool: options.fallbackPool,
      allowDuplicates: options.allowDuplicates,
    })
    .map(options.normalize)
}
