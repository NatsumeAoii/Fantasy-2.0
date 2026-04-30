import { getRandom } from '../lib/randomUtils'

type WeightGetter<T> = (item: T) => number | undefined

const DEFAULT_WEIGHT = 1

function getImplicitWeight<T>(item: T): number | undefined {
  if (typeof item !== 'object' || item === null || !('weight' in item)) {
    return DEFAULT_WEIGHT
  }

  return Number((item as { weight?: unknown }).weight)
}

function normalizeWeight<T>(item: T, getWeight?: WeightGetter<T>): number {
  const rawWeight = getWeight?.(item) ?? getImplicitWeight(item)

  if (typeof rawWeight !== 'number' || !Number.isFinite(rawWeight) || rawWeight <= 0) {
    return 0
  }

  return rawWeight
}

function weightedCandidates<T>(pool: readonly T[], getWeight?: WeightGetter<T>): Array<{ item: T; weight: number }> {
  return pool
    .map((item) => ({ item, weight: normalizeWeight(item, getWeight) }))
    .filter((candidate) => candidate.weight > 0)
}

function pickWeightedCandidate<T>(candidates: readonly { item: T; weight: number }[]): T | undefined {
  const totalWeight = candidates.reduce((sum, candidate) => sum + candidate.weight, 0)

  if (totalWeight <= 0) return undefined

  let cursor = getRandom() * totalWeight
  for (const candidate of candidates) {
    cursor -= candidate.weight
    if (cursor <= 0) {
      return candidate.item
    }
  }

  return candidates[candidates.length - 1]?.item
}

export const PoolEngine = {
  rollChance(chance: number): boolean {
    if (!Number.isFinite(chance)) return false
    if (chance <= 0) return false
    if (chance >= 1) return true
    return getRandom() < chance
  },

  clampCount(count: number, poolLength: number, allowDuplicates = false): number {
    if (!Number.isFinite(count) || count <= 0 || poolLength <= 0) return 0

    const integerCount = Math.floor(count)
    return allowDuplicates ? integerCount : Math.min(integerCount, poolLength)
  },

  pickWeighted<T>(pool: readonly T[], getWeight?: WeightGetter<T>): T | undefined {
    const candidates = weightedCandidates(pool, getWeight)
    return pickWeightedCandidate(candidates)
  },

  pickManyWeighted<T>(
    pool: readonly T[],
    count: number,
    getWeight?: WeightGetter<T>,
    options: { fallbackPool?: readonly T[]; allowDuplicates?: boolean } = {},
  ): T[] {
    const primaryCandidates = weightedCandidates(pool, getWeight)
    const fallbackCandidates = primaryCandidates.length > 0
      ? []
      : weightedCandidates(options.fallbackPool ?? [], getWeight)
    const candidates = primaryCandidates.length > 0 ? primaryCandidates : fallbackCandidates
    const targetCount = this.clampCount(count, candidates.length, options.allowDuplicates)

    if (targetCount === 0) return []

    if (options.allowDuplicates) {
      return Array.from({ length: targetCount }, () => pickWeightedCandidate(candidates))
        .filter((item): item is T => item !== undefined)
    }

    const available = [...candidates]
    const selected: T[] = []

    while (selected.length < targetCount && available.length > 0) {
      const totalWeight = available.reduce((sum, candidate) => sum + candidate.weight, 0)
      if (totalWeight <= 0) break

      let cursor = getRandom() * totalWeight
      const selectedIndex = available.findIndex((candidate) => {
        cursor -= candidate.weight
        return cursor <= 0
      })

      const index = selectedIndex >= 0 ? selectedIndex : available.length - 1
      const [candidate] = available.splice(index, 1)
      selected.push(candidate.item)
    }

    return selected
  },
}
