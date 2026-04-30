import type { Item } from '../../types'

export interface StackedInventoryItem {
  item: Item
  count: number
  signature: string
}

function stableSerialize(value: unknown): string {
  if (value === null || value === undefined) return 'null'
  if (Array.isArray(value)) return `[${value.map(stableSerialize).join(',')}]`
  if (typeof value === 'object') {
    const entries = Object.entries(value as Record<string, unknown>).sort(([left], [right]) => left.localeCompare(right))
    return `{${entries.map(([key, nestedValue]) => `${JSON.stringify(key)}:${stableSerialize(nestedValue)}`).join(',')}}`
  }
  return JSON.stringify(value)
}

function getStackSignature(item: Item): string {
  return stableSerialize({
    defId: item.defId,
    name: item.name,
    type: item.type,
    rarity: item.rarity,
    icon: item.icon,
    description: item.description ?? null,
    grade: item.grade ?? null,
    tags: item.tags ?? [],
    value: item.value ?? null,
    weight: item.weight,
    capacity: item.capacity ?? null,
    extraSlots: item.extraSlots ?? null,
    duration: item.duration ?? null,
    cooldown: item.cooldown ?? null,
    mechanicTier: item.mechanicTier ?? null,
    definitionType: item.definitionType ?? null,
    equipmentSlot: item.equipmentSlot ?? null,
    materialGroup: item.materialGroup ?? null,
    handedness: item.handedness ?? null,
    validRoles: item.validRoles ?? [],
    baseDamage: item.baseDamage ?? null,
    damageType: item.damageType ?? null,
    attackSpeed: item.attackSpeed ?? null,
    reach: item.reach ?? null,
    baseDefense: item.baseDefense ?? null,
    movementPenalty: item.movementPenalty ?? null,
    stealthPenalty: item.stealthPenalty ?? null,
    noiseLevel: item.noiseLevel ?? null,
    effect: item.effect ?? null,
    durability: item.durability ?? null,
    potionStats: item.potionStats ?? null,
  })
}

export function stackInventoryItems(backpack: readonly Item[]): StackedInventoryItem[] {
  const stacks = new Map<string, StackedInventoryItem>()

  backpack.forEach((item) => {
    const signature = getStackSignature(item)
    const existing = stacks.get(signature)

    if (existing) {
      existing.count += 1
      return
    }

    stacks.set(signature, {
      item,
      count: 1,
      signature,
    })
  })

  return Array.from(stacks.values())
}
