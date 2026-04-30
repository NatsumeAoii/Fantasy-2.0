import { BESTIARY_CONFIG } from '../config'
import {
  MOUNT_BAGS,
  MOUNTS,
  PETS,
  type MountAvailability,
  type MountBagDef,
  type MountBagTier,
  type MountDef,
  type MountVariantDef,
  type PetAvailability,
  type PetDef,
  type PetVariantDef,
} from '../data/bestiary'
import type { CharacterCore, GeneratedPoolEntry, GeneratedVariant } from '../types'
import { entry, listIncludes, resolveLevelBracket, slugify } from './ExpansionUtils'

export type BestiaryProfile = Pick<CharacterCore, 'level' | 'race' | 'role'>

type Availability = MountAvailability | PetAvailability

function maxTierForLevel(brackets: readonly { maxLevel: number; tiers: readonly number[] }[], level: number): number {
  const bracket = resolveLevelBracket(brackets, level)
  return Math.max(...(bracket?.tiers ?? [1]))
}

function isAvailable(
  availability: Availability,
  validRaces: readonly string[] | undefined,
  validRoles: readonly string[] | undefined,
  profile: BestiaryProfile,
): boolean {
  if (availability === 'ALL_ROLES' || availability === 'ALL_RACES') return true
  if (availability === 'SPECIFIC_RACE') return listIncludes(profile.race, validRaces)
  if (availability === 'SPECIFIC_ROLE') return listIncludes(profile.role, validRoles)
  return false
}

function variantFromData(variant: MountVariantDef | PetVariantDef | undefined): GeneratedVariant | undefined {
  if (!variant) return undefined

  return {
    name: variant.name,
    description: variant.desc ?? '',
    price: variant.price,
  }
}

export function createMountEntry(mount: MountDef, variantIndex = 0): GeneratedPoolEntry {
  const variant = mount.variants[variantIndex] ?? mount.variants[0]
  const name = variant?.name ?? mount.name

  return entry({
    id: `${mount.id}_${slugify(name)}`,
    name,
    category: mount.mountClass,
    tier: mount.tier,
    rarity: mount.rarity,
    description: variant?.desc,
    variant: variantFromData(variant),
    metadata: {
      mountId: mount.id,
      group: mount.name,
      availability: mount.availability,
      hp: variant?.baseStats.hp ?? mount.baseStats.hp,
      speed: variant?.baseStats.speed ?? mount.baseStats.speed,
      defenseRating: variant?.baseStats.defenseRating ?? mount.baseStats.defenseRating,
    },
  })
}

export function createPetEntry(pet: PetDef, variantIndex = 0): GeneratedPoolEntry {
  const variant = pet.variants[variantIndex] ?? pet.variants[0]
  const name = variant?.name ?? pet.name
  const bonus = variant?.passiveBonus ?? pet.groupBonus

  return entry({
    id: `${pet.id}_${slugify(name)}`,
    name,
    category: pet.petClass,
    tier: pet.tier,
    rarity: pet.rarity,
    description: variant?.desc,
    variant: variantFromData(variant),
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

function variantIndexes(length: number): number[] {
  return Array.from({ length: Math.max(1, length) }, (_, index) => index)
}

function createMountBagEntry(mountBag: MountBagDef, tier: MountBagTier, variantIndex: number): GeneratedPoolEntry {
  const rawVariant = tier.variants[variantIndex]
  const variant = {
    name: rawVariant.name,
    description: rawVariant.desc,
    price: rawVariant.price,
  }

  return entry({
    id: `mount_bag_${mountBag.mountId}_${slugify(rawVariant.name)}`,
    name: rawVariant.name,
    category: 'Mount Gear',
    rarity: tier.rarity,
    description: rawVariant.desc,
    variant,
    metadata: {
      mountId: mountBag.mountId,
      extraSlots: rawVariant.extraSlots,
      weight: rawVariant.weight,
    },
  })
}

export function getAvailableMountEntries(profile: BestiaryProfile): GeneratedPoolEntry[] {
  const maxMountTier = maxTierForLevel(BESTIARY_CONFIG.MOUNTS.MAX_TIER_BY_LEVEL, profile.level)

  return MOUNTS
    .filter((mount) =>
      mount.tier <= maxMountTier &&
      isAvailable(mount.availability, mount.validRaces, mount.validRoles, profile),
    )
    .flatMap((mount) => variantIndexes(mount.variants.length).map((index) => createMountEntry(mount, index)))
}

export function getAvailablePetEntries(profile: BestiaryProfile): GeneratedPoolEntry[] {
  const maxPetTier = maxTierForLevel(BESTIARY_CONFIG.PETS.MAX_TIER_BY_LEVEL, profile.level)

  return PETS
    .filter((pet) =>
      pet.tier <= maxPetTier &&
      isAvailable(pet.availability, pet.validRaces, pet.validRoles, profile),
    )
    .flatMap((pet) => variantIndexes(pet.variants.length).map((index) => createPetEntry(pet, index)))
}

export function getMountGearEntries(mountId: string | null | undefined, level: number): GeneratedPoolEntry[] {
  if (!mountId) return []

  const mountBag = MOUNT_BAGS.find((bag) => bag.mountId === mountId)
  if (!mountBag) return []

  const maxMountTier = maxTierForLevel(BESTIARY_CONFIG.MOUNTS.MAX_TIER_BY_LEVEL, level)
  const visibleTiers = mountBag.tiers.slice(0, Math.max(1, Math.min(maxMountTier, mountBag.tiers.length)))

  return visibleTiers.flatMap((tier) => tier.variants.map((_, index) => createMountBagEntry(mountBag, tier, index)))
}
