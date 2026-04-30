import type { Inventory, ItemSlot } from '../types'

const BASE_SATCHEL_SLOTS = 12

export interface RemovedStorageItem {
  name: string
  slot: ItemSlot
  extraSlots: number
}

export interface SatchelCapacityState {
  capacity: number
  usedSlots: number
  freeSlots: number
  overflowSlots: number
}

export interface SatchelCapacityRejectDetails {
  kind: 'satchel-capacity'
  capacity: number
  requiredSlots: number
  overflowSlots: number
  removedStorage: RemovedStorageItem[]
}

export function getInventoryCapacity(equipment: Inventory['equipment']): number {
  const extraSlots = Object.values(equipment).reduce((sum, item) => sum + (item?.extraSlots ?? 0), 0)
  return BASE_SATCHEL_SLOTS + extraSlots
}

export function getEquipmentWithoutSlot(
  equipment: Inventory['equipment'],
  slot: ItemSlot,
): Inventory['equipment'] {
  if (!equipment[slot]) {
    return equipment
  }

  return {
    ...equipment,
    [slot]: null,
  }
}

export function getSatchelCapacityState(
  backpackCount: number,
  equipment: Inventory['equipment'],
  addedItems = 0,
): SatchelCapacityState {
  const capacity = getInventoryCapacity(equipment)
  const usedSlots = backpackCount + addedItems

  return {
    capacity,
    usedSlots,
    freeSlots: Math.max(0, capacity - usedSlots),
    overflowSlots: Math.max(0, usedSlots - capacity),
  }
}

export function buildSatchelCapacityRejectDetails(
  backpackCount: number,
  equipment: Inventory['equipment'],
  addedItems: number,
  removedStorage: RemovedStorageItem[],
): SatchelCapacityRejectDetails {
  const state = getSatchelCapacityState(backpackCount, equipment, addedItems)

  return {
    kind: 'satchel-capacity',
    capacity: state.capacity,
    requiredSlots: state.usedSlots,
    overflowSlots: state.overflowSlots,
    removedStorage,
  }
}
