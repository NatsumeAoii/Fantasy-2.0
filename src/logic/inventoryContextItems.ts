import { resolveIconName } from '../data/inventory/icons'
import type { GeneratedInventoryContext, GeneratedPoolEntry, Inventory, Item, ItemRarity, ItemType } from '../types'
import { getInventoryCapacity } from './inventorySatchelState'

type InventoryContextItemSection = Exclude<keyof GeneratedInventoryContext, 'recipes'>

type SectionItemConfig = {
  label: string
  type: ItemType
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

function normalizeRarity(rarity: string | number | undefined): ItemRarity {
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
  return INVENTORY_CONTEXT_ITEM_SECTIONS.flatMap((section) =>
    context[section].map((entry) => contextEntryToItem(entry, section)),
  )
}

function calculateCurrentWeight(inventory: Inventory): number {
  const current = [...Object.values(inventory.equipment), ...inventory.backpack].reduce(
    (sum, item) => sum + (item?.weight ?? 0),
    0,
  )

  return Math.round(current * 10) / 10
}

export function addInventoryContextItemsToSatchel(
  inventory: Inventory,
  context: GeneratedInventoryContext,
): Inventory {
  const additions = buildInventoryContextSatchelItems(context)
  if (additions.length === 0) return inventory

  const capacity = getInventoryCapacity(inventory.equipment)
  const carriedAdditions = additions.slice(0, capacity)
  const retainedBackpack = inventory.backpack.slice(0, Math.max(0, capacity - carriedAdditions.length))

  const nextInventory = {
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
