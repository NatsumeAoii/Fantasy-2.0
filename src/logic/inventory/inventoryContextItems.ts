import { resolveIconName } from '../../data/inventory/icons'
import type { GeneratedInventoryContext, GeneratedPoolEntry, Inventory, Item, ItemRarity } from '../../types'
import { getInventoryCapacity } from './inventorySatchelState'

type InventoryContextItemSection = Exclude<keyof GeneratedInventoryContext, 'recipes'>

type SectionItemConfig = {
  label: string
  type: Item['type']
  defaultWeight: number
  defaultValue: number
}

const ITEM_RARITIES: readonly ItemRarity[] = [
  'COMMON',
  'UNCOMMON',
  'RARE',
  'EPIC',
  'LEGENDARY',
  'MYTHIC',
  'DIVINE',
  'ARTIFACT',
]

/** Maps numeric tier values (1-8) to their rarity label. */
const NUMERIC_TIER_TO_RARITY: Record<number, ItemRarity> = {
  1: 'COMMON',
  2: 'UNCOMMON',
  3: 'RARE',
  4: 'EPIC',
  5: 'LEGENDARY',
  6: 'MYTHIC',
  7: 'DIVINE',
  8: 'ARTIFACT',
}

const SECTION_ITEM_CONFIG: Record<InventoryContextItemSection, SectionItemConfig> = {
  curios: { label: 'Curio', type: 'MISC', defaultWeight: 1, defaultValue: 10 },
  cuisine: { label: 'Cuisine', type: 'CONSUMABLE', defaultWeight: 0.5, defaultValue: 3 },
  enchantments: { label: 'Enchantment', type: 'MISC', defaultWeight: 0.1, defaultValue: 25 },
  instruments: { label: 'Instrument', type: 'MISC', defaultWeight: 2, defaultValue: 15 },
  merchandise: { label: 'Merchandise', type: 'MISC', defaultWeight: 1, defaultValue: 8 },
}

const INVENTORY_CONTEXT_ITEM_SECTIONS: readonly InventoryContextItemSection[] = [
  'curios',
  'cuisine',
  'enchantments',
  'instruments',
  'merchandise',
]

/**
 * Normalizes a rarity value (string or numeric tier) into a valid ItemRarity.
 * Handles: "Rare" → "RARE", 3 → "RARE", undefined → "COMMON"
 */
function normalizeRarity(rarity: string | number | undefined): ItemRarity {
  if (typeof rarity === 'number') {
    return NUMERIC_TIER_TO_RARITY[rarity] ?? 'COMMON'
  }

  const normalized = String(rarity ?? '').toUpperCase()
  return ITEM_RARITIES.includes(normalized as ItemRarity) ? normalized as ItemRarity : 'COMMON'
}

function metadataNumber(entry: GeneratedPoolEntry, keys: readonly string[]): number | null {
  for (const key of keys) {
    const value = entry.metadata?.[key]
    if (typeof value === 'number' && Number.isFinite(value)) {
      return value
    }
  }

  return null
}

function entryValue(entry: GeneratedPoolEntry, fallback: number): number {
  const value = entry.variant?.price ?? metadataNumber(entry, ['price', 'basePrice', 'baseCost', 'value'])
  return typeof value === 'number' && Number.isFinite(value) ? Math.max(1, Math.round(value)) : fallback
}

function entryWeight(entry: GeneratedPoolEntry, fallback: number): number {
  const weight = metadataNumber(entry, ['weight'])
  return weight !== null ? Math.max(0.1, Math.round(weight * 10) / 10) : fallback
}

function entryDescription(entry: GeneratedPoolEntry): string | undefined {
  return entry.description ?? entry.variant?.description ?? entry.effect ?? entry.mechanicalEffect
}

function contextEntryToItem(entry: GeneratedPoolEntry, section: InventoryContextItemSection): Item {
  const config = SECTION_ITEM_CONFIG[section]
  const description = entryDescription(entry)

  return {
    id: `inventory_context_${entry.id}`,
    defId: entry.id,
    name: entry.name,
    type: config.type,
    rarity: normalizeRarity(entry.rarity),
    icon: entry.icon ?? resolveIconName({
      id: entry.id,
      name: entry.name,
      category: entry.category,
      description,
      effect: entry.effect,
      type: config.type,
      tags: [config.label, entry.category ?? ''],
    }),
    description,
    tags: [config.label, entry.category, entry.type].filter((tag): tag is string => Boolean(tag)),
    value: entryValue(entry, config.defaultValue),
    weight: entryWeight(entry, config.defaultWeight),
    definitionType: entry.type ?? config.label,
    effect: entry.effect ?? entry.mechanicalEffect,
    duration: metadataNumber(entry, ['duration']) ?? undefined,
    cooldown: metadataNumber(entry, ['cooldown']) ?? undefined,
  }
}

export function buildInventoryContextSatchelItems(context: GeneratedInventoryContext): Item[] {
  const seen = new Set<string>()
  const items: Item[] = []

  for (const section of INVENTORY_CONTEXT_ITEM_SECTIONS) {
    for (const entry of context[section]) {
      const itemId = `inventory_context_${entry.id}`
      if (seen.has(itemId)) continue
      seen.add(itemId)
      items.push(contextEntryToItem(entry, section))
    }
  }

  return items
}

function calculateCurrentWeight(inventory: Inventory): number {
  let total = 0

  for (const item of Object.values(inventory.equipment)) {
    if (item) total += item.weight
  }
  for (const item of inventory.backpack) {
    total += item.weight
  }

  return Math.round(total * 10) / 10
}

/**
 * Merges generated context items (cuisine, enchantments, instruments, etc.)
 * into the character's backpack.
 *
 * Context items take priority over generic consumable filler from the loadout
 * generator. Existing backpack items are retained only in remaining slots
 * after context items are placed.
 */
export function addInventoryContextItemsToSatchel(
  inventory: Inventory,
  context: GeneratedInventoryContext,
): Inventory {
  const additions = buildInventoryContextSatchelItems(context)
  if (additions.length === 0) return inventory

  const capacity = getInventoryCapacity(inventory.equipment)

  // Context items take priority — fill capacity with them first
  const carriedAdditions = additions.slice(0, capacity)
  const remainingSlots = Math.max(0, capacity - carriedAdditions.length)

  // Retain as many existing backpack items as remaining capacity allows
  const retainedBackpack = inventory.backpack.slice(0, remainingSlots)

  const nextInventory: Inventory = {
    ...inventory,
    backpack: [...retainedBackpack, ...carriedAdditions],
  }

  return {
    ...nextInventory,
    weight: {
      ...nextInventory.weight,
      current: calculateCurrentWeight(nextInventory),
    },
  }
}
