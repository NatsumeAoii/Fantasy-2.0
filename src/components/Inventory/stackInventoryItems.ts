import type { Item } from '../../types'

export interface StackedInventoryItem {
  item: Item
  count: number
  signature: string
}

/**
 * Generates a stack signature using string concatenation of key fields.
 * This is significantly faster than the previous recursive stableSerialize approach
 * because it avoids creating intermediate objects, sorting entries, and JSON.stringify
 * for each value. Items with identical display-relevant properties stack together.
 */
function getStackSignature(item: Item): string {
  // Use pipe delimiter (never appears in item field values) for O(1) string building.
  // Tags are joined with comma since they're already sorted/short arrays.
  return `${item.defId}|${item.name}|${item.type}|${item.rarity}|${item.icon}|${item.description ?? ''}|${item.grade ?? ''}|${(item.tags ?? []).join(',')}|${item.value ?? ''}|${item.weight}|${item.capacity ?? ''}|${item.extraSlots ?? ''}|${item.duration ?? ''}|${item.cooldown ?? ''}|${item.mechanicTier ?? ''}|${item.definitionType ?? ''}|${item.equipmentSlot ?? ''}|${item.materialGroup ?? ''}|${item.handedness ?? ''}|${(item.validRoles ?? []).join(',')}|${item.baseDamage ?? ''}|${item.damageType ?? ''}|${item.attackSpeed ?? ''}|${item.reach ?? ''}|${item.baseDefense ?? ''}|${item.movementPenalty ?? ''}|${item.stealthPenalty ?? ''}|${item.noiseLevel ?? ''}|${item.effect ?? ''}|${item.durability ?? ''}|${item.potionStats ? JSON.stringify(item.potionStats) : ''}`
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
