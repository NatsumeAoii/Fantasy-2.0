import {
  ACCESSORIES,
  ARMORS,
  CONSUMABLES,
  CONTAINERS,
  QUICK_FOODS,
  QUICK_POTIONS,
  THROWABLES,
  TORCHES,
  WEAPONS,
} from '../../data/inventory'
import { isItemSlot } from '../../data/inventory/slots'
import type { Character, Inventory, Item, ItemSlot, Stats } from '../../types'
import { calculateMaxWeight } from './CapacityUtils'
import {
  buildSatchelCapacityRejectDetails,
  getEquipmentWithoutSlot,
  getSatchelCapacityState,
  type RemovedStorageItem,
  type SatchelCapacityRejectDetails,
} from './inventorySatchelState'

export { getInventoryCapacity } from './inventorySatchelState'

export type InventoryMoveSource =
  | { type: 'backpack'; itemId: string }
  | { type: 'equipment'; slot: ItemSlot }

export type InventoryMoveTarget =
  | { type: 'backpack' }
  | { type: 'equipment'; slot: ItemSlot }

export type InventoryMoveRequest = {
  source: InventoryMoveSource
  target: InventoryMoveTarget
}

export type InventoryMoveRejectReason = 'missing-item' | 'incompatible-slot' | 'satchel-full' | 'same-location'
export type InventoryMoveRejectDetails = SatchelCapacityRejectDetails

export type InventoryMoveResult =
  | { status: 'moved'; character: Character }
  | { status: 'rejected'; character: Character; reason: InventoryMoveRejectReason; details?: InventoryMoveRejectDetails }

const ARMOR_SLOT_BY_ID = new Map(ARMORS.map((item) => [item.id, item.slot]))
const ACCESSORY_SLOT_BY_ID = new Map(ACCESSORIES.map((item) => [item.id, item.slot]))
const CONTAINER_SLOT_BY_ID = new Map(CONTAINERS.map((item) => [item.id, item.slot]))
const WEAPON_IDS = new Set(WEAPONS.map((item) => item.id))
const THROWABLE_IDS = new Set(THROWABLES.map((item) => item.id))
const TORCH_IDS = new Set(TORCHES.map((item) => item.id))
const QUICK_POTION_IDS = new Set(QUICK_POTIONS.map((item) => item.id))
const QUICK_FOOD_IDS = new Set(QUICK_FOODS.map((item) => item.id))
const POTION_IDS = new Set(CONSUMABLES.filter((item) => item.type === 'POTION').map((item) => item.id))
const FOOD_IDS = new Set(CONSUMABLES.filter((item) => item.type === 'FOOD').map((item) => item.id))
const THROWABLE_CONSUMABLE_TYPES = new Set(['AMMO', 'BOMB', 'POISON', 'TRAP'])

// Pre-built lookup for consumable type by ID — avoids O(n) .find() on every resolveQuickSlots call
const CONSUMABLE_TYPE_BY_ID = new Map(CONSUMABLES.map((item) => [item.id, item.type]))

function isTwoHanded(item: Item | null | undefined): boolean {
  return item?.type === 'WEAPON' && item.tags?.includes('2H') === true
}

function flattenStats(character: Character): Stats {
  const { dps: _dps, ...combatStats } = character.stats.combat
  return {
    ...character.stats.base,
    ...combatStats,
    ...character.stats.resource,
  }
}

function recalculateWeight(character: Character, inventory: Inventory): Inventory['weight'] {
  const current = [...Object.values(inventory.equipment), ...inventory.backpack].reduce(
    (sum, item) => sum + (item?.weight ?? 0),
    0,
  )

  return {
    current: Math.round(current * 10) / 10,
    max: calculateMaxWeight(flattenStats(character), inventory.equipment),
  }
}

function resolveAccessorySlots(item: Item): ItemSlot[] {
  const slot = ACCESSORY_SLOT_BY_ID.get(item.defId)
  if (slot === 'RING') return ['RING', 'RING_2']
  if (slot === 'NECK') return ['NECK']
  if (slot === 'WAIST') return ['BELT', 'WAIST']
  if (slot === 'EAR') return ['EAR']
  return []
}

function resolveArmorSlots(item: Item): ItemSlot[] {
  const slot = ARMOR_SLOT_BY_ID.get(item.defId)
  if (slot === 'HANDS') return ['HANDS', 'HANDS_2']
  return slot ? [slot] : []
}

function resolveContainerSlots(item: Item): ItemSlot[] {
  const slot = CONTAINER_SLOT_BY_ID.get(item.defId)
  return slot ? [slot] : []
}

function resolveWeaponSlots(item: Item): ItemSlot[] {
  if (!WEAPON_IDS.has(item.defId) && item.type !== 'WEAPON') return []
  return isTwoHanded(item) ? ['MAIN_HAND'] : ['MAIN_HAND', 'OFF_HAND']
}

function resolveQuickSlots(item: Item): ItemSlot[] {
  const slots: ItemSlot[] = []
  const consumableType = CONSUMABLE_TYPE_BY_ID.get(item.defId)

  if (THROWABLE_IDS.has(item.defId) || (consumableType && THROWABLE_CONSUMABLE_TYPES.has(consumableType))) {
    slots.push('THROWABLE')
  }
  if (TORCH_IDS.has(item.defId)) {
    slots.push('TORCH')
  }
  if (QUICK_POTION_IDS.has(item.defId) || POTION_IDS.has(item.defId)) {
    slots.push('POTION')
  }
  if (QUICK_FOOD_IDS.has(item.defId) || FOOD_IDS.has(item.defId)) {
    slots.push('FOOD')
  }

  return slots
}

export function getValidEquipmentSlots(item: Item): ItemSlot[] {
  return Array.from(new Set([
    ...resolveArmorSlots(item),
    ...resolveAccessorySlots(item),
    ...resolveContainerSlots(item),
    ...resolveWeaponSlots(item),
    ...resolveQuickSlots(item),
  ]))
}

export function canEquipItemToSlot(item: Item, slot: ItemSlot, equipment: Inventory['equipment']): boolean {
  if (!getValidEquipmentSlots(item).includes(slot)) return false
  if (slot === 'OFF_HAND' && isTwoHanded(equipment.MAIN_HAND)) return false
  if (slot === 'MAIN_HAND' && isTwoHanded(item) && equipment.OFF_HAND) return false
  return true
}

function getRemovedStorageItem(item: Item | null | undefined, slot: ItemSlot): RemovedStorageItem[] {
  if (!item?.extraSlots || item.extraSlots <= 0) {
    return []
  }

  return [{
    name: item.name,
    slot,
    extraSlots: item.extraSlots,
  }]
}

function reject(
  character: Character,
  reason: InventoryMoveRejectReason,
  details?: InventoryMoveRejectDetails,
): InventoryMoveResult {
  return { status: 'rejected', character, reason, details }
}

function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === 'object' && value !== null
}

function isInventoryMoveSource(value: unknown): value is InventoryMoveSource {
  if (!isRecord(value)) return false
  if (value.type === 'backpack') return typeof value.itemId === 'string' && value.itemId.length > 0
  if (value.type === 'equipment') return isItemSlot(value.slot)
  return false
}

function isInventoryMoveTarget(value: unknown): value is InventoryMoveTarget {
  if (!isRecord(value)) return false
  if (value.type === 'backpack') return true
  if (value.type === 'equipment') return isItemSlot(value.slot)
  return false
}

function isInventoryMoveRequest(value: unknown): value is InventoryMoveRequest {
  return isRecord(value) && isInventoryMoveSource(value.source) && isInventoryMoveTarget(value.target)
}

function sameLocation(source: InventoryMoveSource, target: InventoryMoveTarget): boolean {
  return source.type === 'equipment' && target.type === 'equipment' && source.slot === target.slot
}

function getSourceItem(
  inventory: Inventory,
  source: InventoryMoveSource,
): { item: Item | null; backpackIndex: number | null } {
  if (source.type === 'equipment') {
    return { item: inventory.equipment[source.slot] ?? null, backpackIndex: null }
  }

  const backpackIndex = inventory.backpack.findIndex((item) => item.id === source.itemId)
  return { item: backpackIndex >= 0 ? inventory.backpack[backpackIndex] : null, backpackIndex }
}

function buildCharacterWithInventory(character: Character, inventory: Inventory): Character {
  return {
    ...character,
    inventory: {
      ...inventory,
      weight: recalculateWeight(character, inventory),
    },
  }
}

export function moveInventoryItem(character: Character, request: InventoryMoveRequest): InventoryMoveResult {
  if (!isInventoryMoveRequest(request)) {
    return reject(character, 'missing-item')
  }

  if (sameLocation(request.source, request.target)) {
    return reject(character, 'same-location')
  }

  const sourceInventory = character.inventory
  const { item, backpackIndex } = getSourceItem(sourceInventory, request.source)
  if (!item) return reject(character, 'missing-item')

  const equipment: Inventory['equipment'] = { ...sourceInventory.equipment }
  const backpack = [...sourceInventory.backpack]

  if (request.source.type === 'backpack') {
    if (backpackIndex === null || backpackIndex < 0) return reject(character, 'missing-item')
    backpack.splice(backpackIndex, 1)
  } else {
    Object.assign(equipment, getEquipmentWithoutSlot(equipment, request.source.slot))
  }

  if (request.target.type === 'backpack') {
    const satchelState = getSatchelCapacityState(backpack.length, equipment, 1)
    if (satchelState.overflowSlots > 0) {
      const removedStorage = request.source.type === 'equipment'
        ? getRemovedStorageItem(item, request.source.slot)
        : []

      return reject(
        character,
        'satchel-full',
        buildSatchelCapacityRejectDetails(backpack.length, equipment, 1, removedStorage),
      )
    }
    backpack.push(item)
    return {
      status: 'moved',
      character: buildCharacterWithInventory(character, {
        ...sourceInventory,
        equipment,
        backpack,
      }),
    }
  }

  if (!canEquipItemToSlot(item, request.target.slot, equipment)) {
    return reject(character, 'incompatible-slot')
  }

  const displacedItem = equipment[request.target.slot]
  if (displacedItem) {
    const projectedEquipment: Inventory['equipment'] = {
      ...equipment,
      [request.target.slot]: item,
    }
    const satchelState = getSatchelCapacityState(backpack.length, projectedEquipment, 1)
    if (satchelState.overflowSlots > 0) {
      return reject(
        character,
        'satchel-full',
        buildSatchelCapacityRejectDetails(
          backpack.length,
          projectedEquipment,
          1,
          getRemovedStorageItem(displacedItem, request.target.slot),
        ),
      )
    }
    backpack.push(displacedItem)
  }

  equipment[request.target.slot] = item

  return {
    status: 'moved',
    character: buildCharacterWithInventory(character, {
      ...sourceInventory,
      equipment,
      backpack,
    }),
  }
}
