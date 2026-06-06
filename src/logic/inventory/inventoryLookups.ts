/**
 * Pre-computed Inventory Lookups — Static data indexed for O(1) access.
 *
 * These lookups are built once at module load time from the static data arrays.
 * They eliminate repeated .filter() calls that scan the same arrays on every
 * character generation. The underlying data never changes at runtime, so these
 * are safe to cache indefinitely.
 *
 * Performance impact: eliminates ~12 array scans per generateLoadout() call.
 */
import {
  ARMORS,
  ACCESSORIES,
  CONTAINERS,
  CONSUMABLES,
  WEAPONS,
} from '../../data/inventory'
import type { ArmorType, ArmorSlot } from '../../data/inventory/armors'

// ============================================================
// Armor lookups: indexed by slot+type for O(1) access
// ============================================================

type ArmorKey = `${ArmorSlot}:${ArmorType}`

function buildArmorLookup() {
  const map = new Map<ArmorKey, typeof ARMORS>()
  for (const armor of ARMORS) {
    const key: ArmorKey = `${armor.slot}:${armor.type}`
    const existing = map.get(key)
    if (existing) {
      existing.push(armor)
    } else {
      map.set(key, [armor])
    }
  }
  return map
}

const ARMOR_BY_SLOT_TYPE = buildArmorLookup()

/** Get armors filtered by slot and type — O(1) lookup instead of O(n) filter. */
export function getArmorsBySlotAndType(slot: ArmorSlot, type: ArmorType): typeof ARMORS {
  return ARMOR_BY_SLOT_TYPE.get(`${slot}:${type}`) ?? []
}

// Shoulder armors (no type filter — all shoulder items are cloaks)
const SHOULDER_ARMORS = ARMORS.filter(a => a.slot === 'SHOULDER')
export function getShoulderArmors(): typeof ARMORS { return SHOULDER_ARMORS }

// ============================================================
// Accessory lookups: indexed by slot
// ============================================================

const ACCESSORIES_BY_SLOT = new Map<string, typeof ACCESSORIES>()
for (const acc of ACCESSORIES) {
  const existing = ACCESSORIES_BY_SLOT.get(acc.slot)
  if (existing) {
    existing.push(acc)
  } else {
    ACCESSORIES_BY_SLOT.set(acc.slot, [acc])
  }
}

export function getAccessoriesBySlot(slot: string): typeof ACCESSORIES {
  return ACCESSORIES_BY_SLOT.get(slot) ?? []
}

// ============================================================
// Container lookups: indexed by slot
// ============================================================

const CONTAINERS_BY_SLOT = new Map<string, typeof CONTAINERS>()
for (const container of CONTAINERS) {
  const existing = CONTAINERS_BY_SLOT.get(container.slot)
  if (existing) {
    existing.push(container)
  } else {
    CONTAINERS_BY_SLOT.set(container.slot, [container])
  }
}

export function getContainersBySlot(slot: string): typeof CONTAINERS {
  return CONTAINERS_BY_SLOT.get(slot) ?? []
}

// ============================================================
// Weapon lookups: indexed by validRoles (lowercased)
// ============================================================

// Pre-compute a Map from lowercased role keyword → weapons that match
const WEAPON_BY_ROLE_KEYWORD = new Map<string, typeof WEAPONS>()
for (const weapon of WEAPONS) {
  for (const role of weapon.validRoles) {
    const key = role.toLowerCase()
    const existing = WEAPON_BY_ROLE_KEYWORD.get(key)
    if (existing) {
      existing.push(weapon)
    } else {
      WEAPON_BY_ROLE_KEYWORD.set(key, [weapon])
    }
  }
}

/** Get weapons valid for a given role — uses pre-built keyword index. */
export function getWeaponsForRole(role: string): typeof WEAPONS {
  const roleLower = role.toLowerCase()
  const matches: typeof WEAPONS = []
  const seen = new Set<string>()

  for (const [keyword, weapons] of WEAPON_BY_ROLE_KEYWORD) {
    if (roleLower.includes(keyword)) {
      for (const w of weapons) {
        if (!seen.has(w.id)) {
          seen.add(w.id)
          matches.push(w)
        }
      }
    }
  }

  // Also include Mercenary weapons (universal fallback)
  const mercenaryWeapons = WEAPON_BY_ROLE_KEYWORD.get('mercenary') ?? []
  for (const w of mercenaryWeapons) {
    if (!seen.has(w.id)) {
      seen.add(w.id)
      matches.push(w)
    }
  }

  return matches
}

// ============================================================
// Consumable lookups: non-potion consumables cached
// ============================================================

const NON_POTION_CONSUMABLES = CONSUMABLES.filter(c => c.type !== 'POTION')
const POTION_CONSUMABLES = CONSUMABLES.filter(c => c.type === 'POTION')

// Pre-index potions by their ID prefix (tier prefix)
const POTIONS_BY_PREFIX = new Map<string, typeof CONSUMABLES>()
for (const potion of POTION_CONSUMABLES) {
  const prefix = potion.id.split('_')[0]
  const existing = POTIONS_BY_PREFIX.get(prefix)
  if (existing) {
    existing.push(potion)
  } else {
    POTIONS_BY_PREFIX.set(prefix, [potion])
  }
}

/** Get consumables filtered by available potion tiers — pre-indexed. */
export function getFilteredConsumables(availableTiers: string[]): typeof CONSUMABLES {
  if (availableTiers.length === 0) return NON_POTION_CONSUMABLES

  const tierSet = new Set(availableTiers)
  const result: typeof CONSUMABLES[number][] = []

  // Avoid spreading NON_POTION_CONSUMABLES — push each directly
  for (const item of NON_POTION_CONSUMABLES) {
    result.push(item)
  }

  for (const potion of POTION_CONSUMABLES) {
    const prefix = potion.id.split('_')[0]
    if (tierSet.has(prefix) || tierSet.has(potion.id)) {
      result.push(potion)
    }
  }

  return result
}

// ============================================================
// Offhand weapon lookups: pre-filtered for common offhand selections
// ============================================================

/** All 1H weapons available for generic offhand use. */
export const ONE_HANDED_WEAPONS = WEAPONS.filter(w => w.handedness === '1H')

/** Dual-wield offhand options: dagger, short_sword, handaxe. */
export const DUAL_WIELD_OFFHANDS = WEAPONS.filter(w =>
  w.handedness === '1H' && (w.id === 'dagger' || w.id === 'short_sword' || w.id === 'handaxe')
)

/** Pre-found dagger weapon for caster offhand. */
export const DAGGER_WEAPON = WEAPONS.find(w => w.id === 'dagger')
