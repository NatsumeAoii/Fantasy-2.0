import { BESTIARY_CONFIG } from '../config'
import { MOUNT_BAGS, MOUNTS, PETS, SUMMONS } from '../data/bestiary'
import type { CharacterCore, GeneratedBestiary, GeneratedPoolEntry } from '../types'
import { entry, listIncludes, pickVariant, resolveCount, resolveTier, roleMatches, slugify } from './ExpansionUtils'
import { getRandomElement } from '../lib/randomUtils'
import { PoolEngine } from './PoolEngine'

type Availability = 'ALL_ROLES' | 'ALL_RACES' | 'SPECIFIC_ROLE' | 'SPECIFIC_RACE'

function isAvailable(
  availability: Availability,
  validRaces: readonly string[] | undefined,
  validRoles: readonly string[] | undefined,
  character: CharacterCore,
): boolean {
  if (availability === 'ALL_ROLES' || availability === 'ALL_RACES') return true
  if (availability === 'SPECIFIC_RACE') return listIncludes(character.race, validRaces)
  if (availability === 'SPECIFIC_ROLE') return listIncludes(character.role, validRoles)
  return false
}

function normalizeMount(mount: (typeof MOUNTS)[number]): GeneratedPoolEntry {
  const rawVariant = getRandomElement(mount.variants)
  const variant = rawVariant ? {
    name: rawVariant.name,
    description: rawVariant.desc ?? '',
    price: rawVariant.price,
  } : undefined
  const stats = rawVariant?.baseStats ?? mount.baseStats
  const name = variant?.name ?? mount.name

  return entry({
    id: `${mount.id}_${slugify(name)}`,
    name,
    category: mount.mountClass,
    tier: mount.tier,
    rarity: mount.rarity,
    description: variant?.description,
    variant,
    metadata: {
      mountId: mount.id,
      group: mount.name,
      availability: mount.availability,
      hp: stats.hp,
      speed: stats.speed,
      defenseRating: stats.defenseRating,
    },
  })
}

function normalizePet(pet: (typeof PETS)[number]): GeneratedPoolEntry {
  const rawVariant = getRandomElement(pet.variants)
  const variant = rawVariant ? {
    name: rawVariant.name,
    description: rawVariant.desc ?? '',
    price: rawVariant.price,
  } : undefined
  const bonus = rawVariant?.passiveBonus ?? pet.groupBonus
  const name = variant?.name ?? pet.name

  return entry({
    id: `${pet.id}_${slugify(name)}`,
    name,
    category: pet.petClass,
    tier: pet.tier,
    rarity: pet.rarity,
    description: variant?.description,
    variant,
    metadata: {
      petId: pet.id,
      group: pet.name,
      availability: pet.availability,
      loyalty: pet.loyalty,
      diet: pet.diet,
      bonusStat: bonus.stat,
      bonusValue: bonus.value,
      bonusType: pet.groupBonus.type,
    },
  })
}

function normalizeSummon(summon: (typeof SUMMONS)[number]): GeneratedPoolEntry {
  const variant = pickVariant(summon.variants)
  return entry({
    id: summon.id,
    name: variant?.name ?? summon.name,
    category: summon.summonClass,
    tier: summon.tier,
    rarity: summon.rarity,
    description: variant?.description,
    variant,
    metadata: {
      group: summon.name,
      availability: summon.availability,
      duration: summon.duration,
      manaCost: summon.manaCost,
    },
  })
}

function normalizeMountBag(bag: (typeof MOUNT_BAGS)[number], maxTier: number): GeneratedPoolEntry | null {
  const tierLimit = Math.max(1, Math.min(maxTier, bag.tiers.length))
  const tier = PoolEngine.pickWeighted(bag.tiers.slice(0, tierLimit))
  if (!tier || tier.variants.length === 0) return null

  // Pick the raw variant directly so we retain extraSlots/weight
  const rawVariant = getRandomElement(tier.variants)
  if (!rawVariant) return null

  const variant = {
    name: rawVariant.name,
    description: rawVariant.desc ?? '',
    price: rawVariant.price,
  }

  return entry({
    id: `mount_bag_${bag.mountId}_${slugify(variant.name)}`,
    name: variant.name,
    category: 'Mount Bag',
    rarity: tier.rarity,
    description: variant.description,
    variant,
    metadata: {
      mountId: bag.mountId,
      extraSlots: rawVariant.extraSlots,
      weight: rawVariant.weight,
    },
  })
}

export const BestiaryEngine = {
  generate(character: CharacterCore): GeneratedBestiary {
    const maxMountTier = resolveTier(BESTIARY_CONFIG.MOUNTS.MAX_TIER_BY_LEVEL, character.level)
    const mountCandidates = MOUNTS.filter(
      (mount) =>
        mount.tier <= maxMountTier &&
        isAvailable(mount.availability, mount.validRaces, mount.validRoles, character),
    )
    const mountCount = resolveCount(BESTIARY_CONFIG.MOUNTS.COUNT_BY_LEVEL, character.level)
    const mountDefs = PoolEngine.pickManyWeighted(
      mountCandidates,
      mountCount,
      (candidate) => maxMountTier + 1 - candidate.tier,
    )
    const mounts = mountDefs.map(normalizeMount)
    const mount = mounts[0] ?? null
    const favoriteMount = getRandomElement(mounts) ?? null

    const maxPetTier = resolveTier(BESTIARY_CONFIG.PETS.MAX_TIER_BY_LEVEL, character.level)
    const petCandidates = PETS.filter(
      (pet) =>
        pet.tier <= maxPetTier &&
        isAvailable(pet.availability, pet.validRaces, pet.validRoles, character),
    )
    const petCount = resolveCount(BESTIARY_CONFIG.PETS.COUNT_BY_LEVEL, character.level)
    const petDefs = PoolEngine.pickManyWeighted(
      petCandidates,
      petCount,
      (candidate) => maxPetTier + 1 - candidate.tier,
    )
    const pets = petDefs.map(normalizePet)
    const pet = pets[0] ?? null
    const favoritePet = getRandomElement(pets) ?? null

    const maxSummonTier = resolveTier(BESTIARY_CONFIG.SUMMONS.MAX_TIER_BY_LEVEL, character.level)
    const canSummon = roleMatches(character.role, BESTIARY_CONFIG.SUMMONS.ROLE_KEYWORDS)
    const summonCandidates = SUMMONS.filter(
      (summon) =>
        summon.tier <= maxSummonTier &&
        isAvailable(summon.availability, summon.validRaces, summon.validRoles, character),
    )
    const baseSummonCount = resolveCount(BESTIARY_CONFIG.SUMMONS.COUNT_BY_LEVEL, character.level)
    const summonCount = canSummon ? Math.max(1, baseSummonCount) : baseSummonCount
    const summonDefs = PoolEngine.pickManyWeighted(
      summonCandidates,
      summonCount,
      (candidate) => maxSummonTier + 1 - candidate.tier,
    )
    const summons = summonDefs.map(normalizeSummon)
    const summon = summons[0] ?? null

    const mountBags = mountDefs.flatMap((mountDef) => {
      const mountBagDef = MOUNT_BAGS.find((bag) => bag.mountId === mountDef.id)
      const mountBagCount = mountBagDef
        ? resolveCount(BESTIARY_CONFIG.MOUNT_BAGS.COUNT_BY_LEVEL, character.level)
        : 0
      const mountBag = mountBagDef && mountBagCount > 0
        ? normalizeMountBag(mountBagDef, maxMountTier)
        : null
      return mountBag ? [mountBag] : []
    })
    const mountBag = mount
      ? mountBags.find((bag) => bag.metadata?.mountId === mount.metadata?.mountId) ?? null
      : null

    return {
      mounts,
      mountBags,
      pets,
      summons,
      mount,
      mountBag,
      pet,
      summon,
      favoriteMount,
      favoritePet,
    }
  },
}
